( function() {
    var {
        ns, sn, $$, sv, haz, has, han,
        sconf,
        rg,
        ssF, ssD,
        sDomF, sDomN,
        stdMod,

    } = window.b$l.apptree({
        ssFExportList :
        {
            pos2pointy,
            setsPointsMedPos,
            doPaintPoints,
        },
    });
    var ownProp = Object.prototype.hasOwnProperty;
    return;







    //==============================================
    // //\\ Adds DOM and decorations to pointRack
    //==============================================
    ///Input:
    ///       required
    ///         pName - name of namespace rack
    ///         pos - point in rack must have these coordinates
    ///       optional:
    ///         attrs, 'tpclass',
    ///         ns.haz( pt, 'svgel' )
    ///         attrs: see below: //optional attrs 
    ///Does:  main thing is adding coordinates converted
    ///       from model space to media-space
    ///       pt.medpos = //mod 2 inn//
    ///Twins: doPaintLetter8kernel( pname )
    ///       which does more work for this function
    function pos2pointy( pName, attrs )
    {
        attrs = attrs || {};
        var pt = rg[ pName ];

        //if points are flagged as 'unscalable', then
        //they are immune to scaling when user scales diagram with mouse
        pt.medpos = haz( pt, 'unscalable' ) ? ssF.mod2inn_original( pt.pos ) :
                                              ssF.mod2inn( pt.pos );

        var dressed = ownProp.call( pt, 'pointIsAlreadyDressed' );
        if( !dressed ) {
            ////long, initial version of pos2pointy
            //c cc( 'dressing' + pName );
            var tpclass = sDomF.topicIdUpperCase_2_underscore(
                          ( ns.haz( attrs, 'tpclass' ) ) || pName
            );
            var cssClass = ns.h( attrs, 'cssClass' ) ? attrs['cssClass'] + ' ' :  '';
            if( has( pt, 'classmark' ) ){
                cssClass += pt.classmark + ' ';
            }

            pt.pname                = pName;
            //optional attrs
            pt.stroke               = han( attrs, 'stroke', sDomF.getFixedColor( tpclass ) );
            pt.fill                 = han( attrs, 'fill', sDomF.getFixedColor( tpclass ) );
            pt.initialStrokeWidth   = han( attrs, 'stroke-width', 0 );
            pt.initialR             = han( pt, 'initialR', han( attrs, 'r', 4 ) );
            pt.media                = stdMod.mmedia;
            pt.svgel                = null;
            pt.svgel = sv.u({
                svgel   : pt.svgel,
                parent  : pt.media,
                type    : 'circle',
                fill    : pt.fill,
                stroke  : pt.stroke,
                'stroke-width' : pt.initialStrokeWidth * sconf.thickness,
                cx : pt.medpos[0],
                cy : pt.medpos[1],
                r  : pt.initialR * sconf.thickness,
            });
            var svgel$ = pt.svgel$ = $$.$( pt.svgel );

            //todm patch which overrides tp-opacity model for points only,
            //but patches only for lemmas covered with this subroutine and this patch,
            svgel$().style[ 'fill-opacity' ] = '1';

            var finalTp = haz( pt, 'notp' ) ? 'notp' : 'tp';
            var wwClass = cssClass + finalTp + '-' +  tpclass;
            pt.svgel.setAttributeNS( null, 'class', wwClass );
            //if( pName === 'fret-0-0' ) {
            //    ccc( 'makes point ' + pName + ' cssclass=' + wwClass );
            //}

        } else {
            ////optimized, updating version of pos2pointy
            var svgel= pt.svgel;
            svgel.setAttributeNS( null, 'stroke-width',
                                  pt.initialStrokeWidth * sconf.thickness );
            svgel.setAttributeNS( null, 'cx', pt.medpos[0] );
            svgel.setAttributeNS( null, 'cy', pt.medpos[1] );
            svgel.setAttributeNS( null, 'r', pt.initialR * sconf.thickness );
        }



        //*****************************************************
        // todm: get rid of this
        //
        // this will got rid automatically as soon as
        // lemmas do stop using  pt.pointWrap
        //       possibly only one offender left: theorem1,
        //
        var pointWrap = ns.haz( pt, 'pointWrap' );
        pointWrap && ( pointWrap.medpos = pt.medpos );
        //*****************************************************

        if( has( pt, 'undisplayAlways' ) ){
            pt.svgel$.tgcls( 'undisplay', pt.undisplayAlways );
        } else {
            pt.svgel$.tgcls( 'undisplay',
                             !ns.haz( pt, 'displayAlways' ) && ns.haz( pt, 'undisplay' )
            );
        }

        if( pt.draggableX || pt.draggableY ) {
            if( haz( pointWrap, 'hideD8Dpoint' ) ||
                haz( pointWrap, 'd8d_find_is_LOCKED' )
            ){
                pt.svgel$.removeClass( 'grab' );
            } else {
                pt.svgel$.addClass( 'grab' );
            }
        }




        pt.pointIsAlreadyDressed = true;
        return pt;
    }
    //==============================================
    // \\// Adds DOM and decorations to pointRack
    //==============================================



    function setsPointsMedPos()
    {
        ns.eachprop( sconf.pname2point, (point,pname) => {
            var pointRg = rg[ pname ];
            pointRg.medpos = ssF.mod2inn( pointRg.pos );
        });
    }


    //-------------------------------------------------
    // //\\ adds to points their media position
    //      and sets point's color
    //-------------------------------------------------
    function doPaintPoints()
    {
        if( !haz( sconf, 'pname2point' ) ) return;
        Object.keys( sconf.pname2point ).forEach( pname => {
            pos2pointy( pname, sconf.pointDecoration, );
            doPaintLetter8kernel( pname );
        });
    }
    //-------------------------------------------------
    // \\// adds to points their media position
    //-------------------------------------------------


    ///-----------------------------------------------
    /// paints latin letters for points
    ///-----------------------------------------------
    function doPaintLetter8kernel( pname )
    {
        var rgX = rg[ pname ];

        ///adds fake points over draggable points to
        ///make white kernels drawn above lines
        ///move_2_updates is a flag of point for being a draggee
        if(
            !haz( rgX, 'noKernel' ) &&
            (
                has( rgX, 'move_2_updates' ) || has( rgX, 'doWhiteKernel' )
            )
        ){
            /*
            if( rgX.pname === 'fret-0-0' ) {
                ccc( 'sets kernel ' + rgX.pname + ' rgX.noKernel ', rgX.noKernel
                );
            }
            */
            var fakeName = pname+'-kernel';
            var wp = rg[pname].pos;
            var rgXX = rg[ fakeName ];

            //removes kernel visully if requested
            var undisplay = ns.haz( rg[pname], 'hideD8Dpoint' ) ||
                            ns.haz( rg[pname], 'undisplay' );

            if( !ns.h( rg, fakeName ) ) {
                ////...decorates for the first time and updates
                var rgXX = ssF.toreg( fakeName )
                    ( 'pos', [ wp[0], wp[1] ]  )
                    ( 'undisplay', undisplay  )
                    ;

                if( haz( rg[pname], 'unscalable' ) ) {
                    rgXX().unscalable = rg[pname].unscalable;
                }
                pos2pointy(
                    fakeName,
                    {
                        'stroke'        : rgX.pcolor,
                        'fill'          : 'white',
                        'stroke-width'  : 2,
                        r               : han( rgX, 'initialR' , sconf.handleRadius ),
                    }
                );
            } else {
                ////...updates
                rgXX.pos[0] = wp[0];
                rgXX.pos[1] = wp[1];
                rgXX.undisplay = undisplay;
                pos2pointy( fakeName ); //updates
            }
        }

        if( rgX.doPaintPname && rgX.caption !== '' ) {

            var lpos = rgX.medpos.concat([]);
            var lposX = rgX.letterOffsetX + rgX.medpos[0];
            var lposY = rgX.letterOffsetY + rgX.medpos[1];
            rgX.pnameLabelsvg = ns.svg.printText({
                tpclass         : '',
                text            : rgX.caption || pname,
                stroke          : haz( rgX, 'letterColor' ) || rgX.pcolor || 'black',
                fill            : haz( rgX, 'letterColor' ) || rgX.pcolor || 'black',
                "stroke-width"  : 1,
                svgel           : rgX.pnameLabelsvg,
                parent          : stdMod.mmedia,
                x               : lposX.toFixed()+'px',
                y               : lposY.toFixed()+'px',
                style           : {
                    'font-size' : rgX.fontSize.toFixed() + 'px',
                    'line-height' : '1',
                },
            });
            $$.$( rgX.pnameLabelsvg ).tgcls(
                    'undisplay',
                    !ns.haz( rgX, 'displayAlways' ) &&
                    ( ns.haz( rg, 'allLettersAreHidden' ) || ns.haz( rgX, 'undisplay' ) )
            );
        }

    }

}) ();

