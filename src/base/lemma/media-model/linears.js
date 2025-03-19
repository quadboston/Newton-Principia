( function() {
    var {
        ns, sn, $$, sv, nsmethods, han, haz, has, mat,
        sconf, ssF, ssD, sDomF, sDomN, lowId2topics, rg, toreg,
        stdMod, amode,
    } = window.b$l.apptree({
        ssFExportList :
        {
            pointies2line,
            pointnames2line,
            pnames2line,
            str2line,
            pnames2poly,
            paintTriangle,
            poly_2_updatedPolyPos8undisplay,
        },
    });
    var ownProp = Object.prototype.hasOwnProperty;
    return;









    //==============================================
    // //\\ creates svg-line or updates it if exists
    //==============================================
    ///
    ///API
    /// Returns: line with line.svgel,
    /// Sets:
    ///     line.svgel).cls( cssClass + 'tp-' + tpclass
    ///     line.svgel
    /// Input:
    ///     required:
    ///         pName - kname of line in rg,
    ///         pivots - as in args or in rg[ pName ], specifically:
    ///                     pivots[0].medpos, pv1.medpos
    ///
    ///     optional:
    ///         line as toreg( pName )
    ///         lineAttr.stroke
    ///         lineAttr[ 'stroke-width' ]
    ///         lineAttr.cssClass
    ///         lineAttr.tpclass
    ///
    ///     used external:
    ///         sconf.thickness
    ///
    /// Output: adds pivots-media-positions to line
    function pointies2line( pName, pivots, lineAttr )
    {
        var lineAttr    = lineAttr || {};
        var line        = toreg( pName )();
        pivots          = pivots || haz( line, 'pivots' );
        var vectorTipIx = haz( line, 'vectorTipIx' );
        var strokeWidth = han( lineAttr, 'stroke-width', 1 );
        line.finalStrokeWidth = strokeWidth * (sconf.thickness || 1);
        let pv0 = pivots[0];
        let pv1 = pivots[1];
        if( haz( pv0, 'unscalable' ) ) {
            pv0.medpos = ssF.mod2inn_original( pv0.pos );
        } else if( !has(pv0, 'medpos' ) ) {
            pv0.medpos = ssF.mod2inn( pv0.pos );
        }
        if( haz( pv1, 'unscalable' ) ) {
            pv1.medpos = ssF.mod2inn_original( pv1.pos );
        } else if( !has(pv1, 'medpos' ) ) {
            pv1.medpos = ssF.mod2inn( pv1.pos );
        }
        var pivotsMedPos= [ pv0.medpos, pv1.medpos ];
        
        //this is a wrong place for changing a model of a
        //line interval, so removing from media manager:
        //line.vector = mat.p1_to_p2(pv0,pv1);
        
        ///this property helps to optimize svg painting
        var dressed = ownProp.call( line, 'pointIsAlreadyDressed' );
        if( !dressed ) {
            ////longer part of optimization: creates svg
            var tpclass = sDomF.topicIdUpperCase_2_underscore(
                          ( ns.haz( lineAttr, 'tpclass' ) ) || pName
            );
            var ww          = sDomF.getFixedColor( tpclass );
            var stroke      = ns.haz( line, 'pcolor' ) || han( lineAttr, 'stroke', ww );
            var cssClass    = ns.h( lineAttr, 'cssClass' ) ? lineAttr['cssClass'] + ' ' :  '';

            //adds params to line:
            var finalTp         = haz( line, 'notp' ) ? 'notp-' : 'tp-';
            line.finalCssClass  = cssClass + finalTp + tpclass;
            line.pname          = pName;
            line.pivotNames     = [ pv0.pname, pv1.pname ];
            
            var argsvg = {
                svgel   : ns.haz( line, 'svgel' ),

                parent  : stdMod.mmedia,
                //todm everywhere in this module:
                //parent  : stdMod.mmedia,

                pivots      : pivotsMedPos,
                'stroke-width' : line.finalStrokeWidth.toFixed(4),
                'stroke-linecap' : 'round'
            }
            ///shapes without pName presribed in Topics do
            ///paint colors in own atributes
            var lowId = nsmethods.topicIdUpperCase_2_underscore( pName );
            var tpactive = haz( lowId2topics, lowId );
            if( !tpactive ) {
                argsvg.stroke = line.stroke;
            };
            line.svgel = sv.polyline(argsvg);
            var svgel$ = line.svgel$ = $$.$(line.svgel);

            svgel$.cls( line.finalCssClass );

        } else {
            ////shorter part of optimization
            sv.updatePolyline({
                pivots      : pivotsMedPos,
                svgel       : line.svgel,

                //todm apparent bug: rid of this line
                //'stroke-width' : line.finalStrokeWidth,

                //todm: this line is added to fix a bug: do
                //proofcheck does it break the legacy code:
                strokeWidth : line.finalStrokeWidth.toFixed(4),
            });
        }
        if( vectorTipIx || vectorTipIx === 0 ) {
            paintsVectorTips({ vectorTipIx, pivots, line, });
        }
        line.svgel$.tgcls( 'undisplay', ns.haz( line, 'undisplay' ) );
        //updates pivots in line:
        line.pivots = [ pv0, pv1 ];


        //=================================================
        // //\\ draws line caption
        //=================================================
        //todm bad name: too generic
        //hard to package-search
        var caption = ns.haz( lineAttr, 'caption' ) ||
                      ns.haz( line, 'caption' );
        if( caption ) {
            var fontSize = ns.haz( lineAttr, 'fontSize' ) || 20;

            var lposXSugar = 0.5;
            var lposYSugar = haz( lineAttr, 'lposYSugar' );
            var lposYSugar = lposYSugar || lposYSugar === 0 ? lposYSugar : -0.3; //1.5;
            var pvs = pivotsMedPos,
            lposX = ( pvs[0][0] + pvs[1][0] ) / 2;
            lposY = ( pvs[0][1] + pvs[1][1] ) / 2;
            var dir = [ pvs[1][0] - pvs[0][0], pvs[1][1] - pvs[0][1] ];
            var segAngle = Math.atan2(
                    dir[1] * sconf.MONITOR_Y_FLIP, //y, screen to model angle
                    dir[0]
            );
            var leftNormAngle = segAngle + Math.PI/2;
            var SHIFT = has( lineAttr, 'captionShiftNorm' ) ? lineAttr.captionShiftNorm : 18;

            var finalPosX = lposX + SHIFT * Math.cos( leftNormAngle )
                            - fontSize * lposXSugar;
            var finalPosY = lposY
                            //eye to screen view
                            + sconf.MONITOR_Y_FLIP * SHIFT * Math.sin( leftNormAngle )
                            - fontSize * lposYSugar;
            if( !line.pointIsAlreadyDressed ) {
                line.pnameLabelsvg = ns.svg.printText({
                    //text            : caption,
                    stroke          : stroke, //line.pcolor,
                    fill            : stroke, //line.pcolor,
                    "stroke-width"  : haz( lineAttr, "stroke-width" ) || 1,
                    svgel           : line.pnameLabelsvg,
                    parent          : stdMod.mmedia,
                    style           : {
                        'font-size' : fontSize.toFixed() + 'px',
                        'line-height' : '1',
                        'font-size' : line.fontSize + 'px',
                    },
                });
                line.pnameLabelsvg$ = $$.$( line.pnameLabelsvg )
                    .cls( line.finalCssClass )
                    .addClass( 'tofill hover-width' )
                    ;
            }
            line.pnameLabelsvg$
                .aNS( 'x', finalPosX.toFixed()+'px' )
                .aNS( 'y', finalPosY.toFixed()+'px' )
                .tgcls( 'undisplay', ns.haz( rg[ line.pname ], 'undisplay' ) )
                ;
            line.pnameLabelsvg$.tgcls(
                'undisplay',
                haz( line, 'hideCaption' ) ||
                (
                    !haz( line, 'displayAlways' ) &&
                    ( haz( rg, 'allLettersAreHidden' ) || haz( line, 'undisplay' ) )
                )
            );
            line.pnameLabelsvg.textContent = caption;


            //todo todo bug, must be out of this if-block
            //  the bug is that only lines with caption are being dressified,
            //  the others are never,
            line.pointIsAlreadyDressed = true;
        }
        //=================================================
        // \\// draws line caption
        //=================================================
        return line;
    }


    function paintsVectorTips({ vectorTipIx, pivots, line, })
    {
        let tipFraction = haz( line, 'tipFraction' );
        var TIP_FRACTION = Math.abs( tipFraction ) ||  0.2;
        var vectEnd = pivots[ vectorTipIx ].medpos;
        var vectStart = pivots[ (vectorTipIx+1)%2 ].medpos;
        var { abs, norm, unit } = mat.vector2normalOrts(
                [vectEnd[0]-vectStart[0], vectEnd[1]-vectStart[1]] );
        let tF = (TIP_FRACTION * abs ) || 1; //vector can be 0
        var tipLength =
                tipFraction ? tF :
                Math.min(
                    //min is sensetive to diagram scale
                    10 * sconf.pictureWidth * 0.0025, tF
                );
        var tipStart = abs-tipLength;
        var vecTipStart = [ vectStart[0] + unit[0] * tipStart, vectStart[1] + unit[1] * tipStart ];

        var ARROW_TANGENT = tipFraction < 0 ?
            0.15 :
            line.finalStrokeWidth * 1.5 / tipLength;
        var tipHeight = Math.max( sconf.thickness*1.5, tipLength * ARROW_TANGENT );

        var pivots = [
                [ vecTipStart[0] + norm[0]*tipHeight, vecTipStart[1] + norm[1]*tipHeight ],
                [ vecTipStart[0] - norm[0]*tipHeight, vecTipStart[1] - norm[1]*tipHeight ],
                vectEnd,
                //this point closes poly.
                [ vecTipStart[0] + norm[0]*tipHeight, vecTipStart[1] + norm[1]*tipHeight ],
        ];
        line.vectorArrowSvg = sv.polyline({
            svgel   : ns.haz( line, 'vectorArrowSvg' ),
            parent  : stdMod.mmedia,
            pivots,
            //'stroke-width' : strokeWidth * sconf.thickness, 
        });
        let tipFill = haz( line, 'tipFill' );
        if( tipFill ) {
            line.vectorArrowSvg.style.fill = tipFill;
            line.vectorArrowSvg.style.stroke = tipFill;
        }
        line.vectorArrowSvg$ = $$.$(line.vectorArrowSvg)
            .tgcls( 'undisplay', ns.haz( line, 'undisplay' ) )
            .cls( line.finalCssClass + ' tofill' )
            ;
    }


    ///a bit of proliferation
    ///adds "sugar" to pointies2line: point names
    function pointnames2line( name1, name2, cssClass, )
    {
        //line_rg =
        return pointies2line(
            'line-' + name1 + name2,
            [ rg[ name1 ], rg[ name2 ] ],
            {
                cssClass        : 'tostroke thickable' +
                                   ( cssClass ? ' ' + cssClass : '' ),
                'stroke-width'  : 2,
            }
        );
        
    }

    ///makes short line name: AB from A and B
    ///returns: rg element
    function pnames2line( name1, name2, tpCssClass, )
    {
        return pointies2line(
            name1 + name2,
            [ rg[ name1 ], rg[ name2 ] ],
            {
                cssClass        : 'tostroke thickable' +
                                   ( tpCssClass ? ' ' + tpCssClass : '' ),
                'stroke-width'  : 2,
            },
        );
    }

    ///makes short line name: AB from A and B
    ///returns: rg element
    function str2line( str, cssClass, lineAttr, caption, )
    {
        var splitToken = str.indexOf( ',' ) > -1 ? ',' : '';
        var lpoints = str.split( splitToken );
        cssClass = haz( lineAttr, 'cssClass' ) || cssClass;
        var lineAttrPassed =
        {
            cssClass        : 'tostroke thickable' +
                               ( cssClass ? ' ' + cssClass : '' ),
            'stroke-width'  : ns.sn( 'stroke-width', lineAttr, 2 ),
            stroke          : ns.sn( 'stroke',   lineAttr, 'black' ),
            //cssClass        : ns.sn( 'cssClass', lineAttr, 'tofill tostroke' ),
            //tpclass         : ns.sn( 'stroke', lineAttr, 'black' ),
            caption         : caption || haz( lineAttr, 'caption' ),
        };
        ///todm: this code is extremely non-automated:
        if( has( lineAttr, 'captionShiftNorm' ) ) {
            lineAttrPassed.captionShiftNorm = lineAttr.captionShiftNorm;
        }
        lineAttrPassed.lposYSugar = haz( lineAttr, 'lposYSugar' );

        return pointies2line(
            str,
            [ rg[ lpoints[0] ], rg[ lpoints[1] ] ],
            lineAttrPassed,
        );
    }
    //==============================================
    // \\// creates svg-line or updates it if exists
    //==============================================



    function pnames2poly(
        pNames,
        cssClass,
        correctJoin, //fix all lemmas and remove this par. then
        undisplay,   //optional
        tostroke,
    ){
        var CLOSED_POLYLINE = true;

        var pName = pNames.join( correctJoin ? '--' : '');
        var pivots = pNames.map( pname => rg[ pname ].medpos );

        if( CLOSED_POLYLINE ) {
            pivots.push( pivots[0] );
        }

        //todm ... this is so complex bs. we have to modify legacy code
        tostroke = typeof tostroke === 'undefined' ?
                        'tostroke ' : (
                            tostroke ? 'tostroke ' : ''
                        );
        var attr =
        {
            cssClass        : tostroke + 'thickable' +
                              ( cssClass ? ' ' + cssClass : '' ),
           'stroke-width'  : 2,
        };
        var tpclass = sDomF.topicIdUpperCase_2_underscore(
                      ( ns.haz( attr, 'tpclass' ) ) || pName
        );
        var cssClass    = ns.h( attr, 'cssClass' ) ? attr['cssClass'] + ' ' :  '';
        var stroke      = han( attr, 'stroke', sDomF.getFixedColor( tpclass ) );
        var strokeWidth = han( attr, 'stroke-width', 1 );
        var poly        = toreg( pName )();
        if( typeof undisplay !== 'undefined' && undisplay !== null ) { //was a bug
            poly.undisplay = undisplay;
        }
        poly.pname      = pName;
        poly.pivotNames = pNames.concat(); //clones array
        poly.pNames     = pNames;
        poly.poly_2_updatedPolyPos8undisplay = poly_2_updatedPolyPos8undisplay;
        poly.finalCssClass = cssClass + 'tp-' + tpclass;
        poly.svgel = sv.polyline({
            svgel   : ns.haz( poly, 'svgel' ),
            stroke,
            parent  : stdMod.mmedia,
            pivots,
            'stroke-width' : strokeWidth * sconf.thickness, 
        });
        poly.svgel$ = $$.$(poly.svgel)
            .tgcls( 'undisplay', ns.haz( poly, 'undisplay' ) )
            .cls( poly.finalCssClass )
            ;
        return poly;
    }
    //==============================================
    // \\// Adds DOM and decorations to pointRack
    //==============================================

    ///api: if poly is not supplied, then it must be "this",
    ///does update "undisplay",
    ///switch poly.UPDATE_MPOS_BEFORE_POLY does update mpos before pivots
    function poly_2_updatedPolyPos8undisplay( poly, ) {
        poly = poly || this;
        var CLOSED_POLYLINE = true;
        var pNames = poly.pNames;
        if( poly.UPDATE_MPOS_BEFORE_POLY ) {
            let mod2inn = ssF.mod2inn;
            pNames.forEach( pname => { rg[ pname ].medpos = mod2inn( rg[ pname ].pos ) } );
        }
        var pivots = pNames.map( pname => rg[ pname ].medpos );
        if( CLOSED_POLYLINE ) {
            pivots.push( pivots[0] );
        }
        poly.svgel = sv.polyline({
            svgel   : poly.svgel,
            pivots,
        });
        poly.svgel$.tgcls( 'undisplay', ns.haz( poly, 'undisplay' ) );
    }

    //==========================================
    // //\\ paints svg triangles
    //==========================================
    ///Input:   triang = rg[ triangleId ]
    ///         triang.vertices
    ///         cssCls can be for 'logic_phase--proof'
    function paintTriangle( triangleId, cssCls, tpclass, defaultFill, )
    {
        var triang = rg[ triangleId ];
        var mod2inn = ssF.mod2inn;
        var vertices = triang.vertices.map( pos => {
            return mod2inn( pos, );
        });
        var dressed = ownProp.call( triang, 'shapeIsAlreadyDressed' );
        if( !dressed ) {
            triang.mmedia = stdMod.mmedia;
            var svgarg = {
                pivots  : vertices,
                svgel   : triang.svgel,
                parent  : triang.mmedia,
            };
            if( defaultFill ) {
                svgarg.fill = defaultFill;
            }

            //important: use triang.svgel = ...
            //           not like triang.mediael = ...
            triang.svgel = sv.polyline( svgarg );
            triang.svgel$ = $$.$( triang.svgel );

            var tpclass = sDomF.topicIdUpperCase_2_underscore( tpclass || triangleId );
            cssCls = cssCls ? ' ' + cssCls + ' ' : ' ';
            $$.$( triang.svgel ).cls( 'tofill' + cssCls + 'tp-' + tpclass );


        } else {
            sv.updatePolyline({
                    pivots : vertices,
                    svgel : triang.svgel,
                    fill : defaultFill,
                    //strokeWidth, //stroke-width
            });
        }
        triang.shapeIsAlreadyDressed = true;
        triang.svgel$.tgcls( 'undisplay', ns.haz( triang, 'undisplay' ) );
        return triang;
    }
    //==========================================
    // \\// paints svg triangles
    //==========================================

}) ();

