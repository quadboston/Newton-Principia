( function() {
    var {
        sn, $$, nsmethods, haz, has, han, nssvg, eachprop,
        sconf, sDomF, sDomN, ssF, ssD, lcaseId2allLemTopics,
        studyMods, amode,
    } = window.b$l.apptree({
        ssFExportList :
        {
            pos2pointy,
            doPaintPoints,
            doPaintLetter8kernel,
        },
    });
    var ix2origPoint = sn( 'ix2origPoint', sconf, [] );
    //unlucky name: must be aka ssF.rgPos2svgPoint
    ssF.rgPos2rgMedia = pos2pointy; //modifies svg-dom, more sensible alias
    var ownProp = Object.prototype.hasOwnProperty;
    return;







    //==============================================
    // //\\ Adds DOM and decorations to pointRack
    //      creates or modifies svg-dom
    //==============================================
    ///Input:
    ///       required
    ///         pName - name of rg-namespace-rack
    ///         rg[ pName ].pos - must exist
    ///       optional:
    ///         attrs, 'tpclass',
    ///         haz( pt, 'svgel' )
    ///         attrs: see below: //optional attrs 
    ///Does:  main thing is adding coordinates converted
    ///       from model space to media-space
    ///       pt.medpos = //mod 2 inn//
    ///Twins: doPaintLetter8kernel( pname )
    ///       which does more work for this function
    ///Returns: rg[ pName ]
    function pos2pointy( pName, attrs, stdMod )
    {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;

        attrs = attrs || {};
        var pt = rg[ pName ];

        //if points are flagged as 'unscalable', then
        //they are immune to scaling when user scales diagram with mouse
        pt.medpos = haz( pt, 'unscalable' ) ? ssF.mod2inn_original( pt.pos, stdMod ) :
                                              ssF.mod2inn( pt.pos, stdMod );
        var dressed = ownProp.call( pt, 'pointIsAlreadyDressed' );
        if( !dressed ) {

            ////long, initial version of pos2pointy
            //c cc( 'dressing' + pName );
            var tpclass = nsmethods.topicIdUpperCase_2_underscore(
                          ( haz( attrs, 'tpclass' ) ) || pName
            );
            var cssClass = has( attrs, 'cssClass' ) ? attrs['cssClass'] + ' ' :  '';
            if( has( pt, 'classmark' ) ){
                cssClass += pt.classmark + ' ';
            }
            pt.pname                = pName;
            //optional attrs
            pt.stroke               = haz( pt, 'stroke' ) ||
                                      han( attrs, 'stroke', sDomF.getFixedColor( tpclass ) );
            pt.fill                 = haz( pt, 'fill' ) ||
                                      han( attrs, 'fill', sDomF.getFixedColor( tpclass ) );
            pt.initialStrokeWidth   = han( attrs, 'stroke-width', 0 );
            pt.initialR             = han( pt, 'initialR', han( attrs, 'r', 4 ) );
            pt.media                = stdMod.mmedia;
            pt.svgel                = null;

            var argsvg = {
                svgel   : pt.svgel,
                parent  : pt.media,
                type    : 'circle',
                'stroke-width' : pt.initialStrokeWidth * sconf.thickness,
                cx : pt.medpos[0],
                cy : pt.medpos[1],
                r  : pt.initialR * sconf.thickness,
                style : haz(pt, 'style'),
            };

            ///shapes without pName presribed in Topics do
            ///paint colors in own atributes
            var lowId = nsmethods.topicIdUpperCase_2_underscore( pName );
            var tpactive = haz( lcaseId2allLemTopics, lowId );
            if( !tpactive ) {
                argsvg.fill = pt.fill;
                argsvg.stroke = pt.stroke;
            };
            pt.svgel = nssvg.u( argsvg );
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

            ///this thing is static yet
            /*
            //fails
            if( has( pt, 'title' ) ) {;
                svgel$.ch( $$.c( 'title' ).html( pt.title ) );
                //svgel$.e( 'mouseover', 
            }
            */

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
        var pointWrap = haz( pt, 'pointWrap' );
        pointWrap && ( pointWrap.medpos = pt.medpos );
        //*****************************************************

        if( has( pt, 'undisplayAlways' ) ){
            //good but may be corrupts legacy lemmas
            //pt.undisplay = true; //fixes hiding of letters
            pt.svgel$.tgcls( 'undisplay', pt.undisplayAlways );
        } else {
            pt.svgel$.tgcls( 'undisplay',
                             !haz( pt, 'displayAlways' ) && haz( pt, 'undisplay' )
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





    ///-----------------------------------------------
    /// paints latin letters for points
    ///-----------------------------------------------
    function doPaintLetter8kernel( pname, stdMod )
    {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;

        var stdMod = studyMods[ amode.submodel ];
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
            var undisplay = haz( rg[pname], 'hideD8Dpoint' ) ||
                            haz( rg[pname], 'undisplay' );

            if( !has( rg, fakeName ) || !has( rg[fakeName], 'pos' ) ) {
                ////...decorates for the first time and updates
                var rgXX = toreg( fakeName )
                    ( 'pos', [ wp[0], wp[1] ]  )
                    ( 'undisplay', undisplay  )
                    ();

                if( haz( rg[pname], 'unscalable' ) ) {
                    rgXX.unscalable = rg[pname].unscalable;
                }
                pos2pointy(
                    fakeName,
                    {
                        //planned feature
                        //'stroke'        : han( rgX, 'kernelStroke' , rgX.pcolor, ),

                        'stroke'        : rgX.pcolor,

                        'fill'          : 'white',
                        //'stroke-width'  : 2,
                        r               : han( rgX, 'initialR' , sconf.handleRadius ),
                        tpclass         :
                                          pname +
                                          ' tp-' + fakeName + //possibly new feature
                                          ' tostroke hover-width'
                    },
                    stdMod,
                );
            } else {
                ////...updates
                rgXX.pos[0] = wp[0];
                rgXX.pos[1] = wp[1];
                rgXX.undisplay = undisplay;
                pos2pointy( fakeName, null, stdMod ); //updates
            }
        }
        if( rgX.doPaintPname && rgX.caption !== '' ) {
            var lpos = rgX.medpos.concat([]);
            var lposX = rgX.letterOffsetX + rgX.medpos[0];
            var lposY = rgX.letterOffsetY + rgX.medpos[1];

            var strokeCol   = haz( rgX, 'letterColor' ) || rgX.pcolor || 'black';
            var fillCol     = haz( rgX, 'letterColor' ) || rgX.pcolor || 'black';

            var txtstyle = {
                    'font-size' : rgX.fontSize.toFixed() + 'px',
                    'line-height' : '1',
                    stroke        : strokeCol, //fix
                    fill          : fillCol,
            };
            var lposX_rounded = lposX.toFixed();
            var lposY_rounded = lposY.toFixed();
            rgX.pnameLabelsvg = nssvg.printText({
                tpclass         : '',
                text            : rgX.caption || pname,
                //stroke          : strokeCol,
                //fill            : fillCol,
                "stroke-width"  : 1,
                svgel           : rgX.pnameLabelsvg,
                parent          : stdMod.mmedia,
                x               : lposX_rounded + 'px',
                y               : lposY_rounded + 'px',
                style           : txtstyle,
            });

            //--------------------------------------------------------------------------
            // //\\ textLineTurn can be applied ...
            //      https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
            //--------------------------------------------------------------------------
            var textLineTurn = haz( rgX, 'textLineTurn' );
            if( textLineTurn ) {
                rgX.pnameLabelsvg.setAttribute( 'transform', 'rotate(' +
                     textLineTurn + ',' + lposX_rounded + ',' + lposY_rounded + ' )'
                );
            }
            //--------------------------------------------------------------------------
            // \\// textLineTurn can be applied ...
            //--------------------------------------------------------------------------

            let $$$svg = $$.$( rgX.pnameLabelsvg );
            $$$svg.tgcls(
                'undisplay',
                rgX.hideCaption ||
                (
                    !haz( rgX, 'displayAlways' ) &&
                    ( haz( rg, 'allLettersAreHidden' ) || haz( rgX, 'undisplay' ) )
                )
            );

            let txtclass = haz( rgX, 'classmark' );
            if( txtclass ) {
                $$$svg.addClass( txtclass );
            }
            
            /*
            fails:
            if( has( rgX, 'hideCaption' ) ) {
                var undisp = rgX.hideCaption;
            } else {
                var undisp =
                (
                    !haz( rgX, 'displayAlways' ) &&
                    ( haz( rg, 'allLettersAreHidden' ) || haz( rgX, 'undisplay' ) )
                )
            }
            */

        } else {
            ////bug fix: June 3, 2021
            var wwSvg = haz( rgX, 'pnameLabelsvg' );
            $$.$( wwSvg ).tgcls( 'undisplay', true );
            /*
            rgX.hideCaption ||
            (
                !haz( rgX, 'displayAlways' ) &&
                ( haz( rg, 'allLettersAreHidden' ) || haz( rgX, 'undisplay' ) )
            )
            */
        }
    }



    //-------------------------------------------------
    // //\\ adds to points their media position
    //      and sets point's color
    //-------------------------------------------------
    function doPaintPoints( stdMod )
    {
        stdMod  = stdMod || studyMods[ amode.submodel ];
        var p2p = haz( sconf, 'pname2point' );
        if( !p2p ) return;
        if( ix2origPoint.length ) {
            ////makes svg-z-order
            ix2origPoint.forEach( op => {
                var pname = haz( op, 'kName' );
                if( !pname ) return;
                ssF.rgPos2rgMedia( pname, sconf.pointDecoration, stdMod, );
                doPaintLetter8kernel( pname, stdMod, );
            });
        } else {
            ////legacy paint with no svg-z-order,
            ////legacy preserves legacy projects,
            Object.keys( p2p ).forEach( pname => {
                ssF.rgPos2rgMedia( pname, sconf.pointDecoration, stdMod, );
                doPaintLetter8kernel( pname, stdMod, );
            });
        }
    }
    //-------------------------------------------------
    // \\// adds to points their media position
    //-------------------------------------------------

}) ();

