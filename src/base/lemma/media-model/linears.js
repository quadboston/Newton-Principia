( function() {
    var {
        ns, sn, $$, sv, han, haz, has, mat,
        sconf, ssF, ssD, sDomF, sDomN,
        amode, studyMods,
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
    ///                     pivots[0].medpos, pivots[1].medpos
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
    ///         amode.submodel.mmedia
    ///
    /// Output: adds pivots-media-positions to line
    function pointies2line( pName, pivots, lineAttr, stdMod )
    {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;
        var lineAttr    = lineAttr || {};
        var line        = toreg( pName )();
        pivots          = pivots || haz( line, 'pivots' );
        var vectorTipIx = haz( line, 'vectorTipIx' );

        var strokeWidth = han( lineAttr, 'stroke-width', 1 );

        if( haz( pivots[0], 'unscalable' ) ) {
            pivots[0].medpos = ssF.mod2inn_original( pivots[0].pos, stdMod );
        }
        if( haz( pivots[1], 'unscalable' ) ) {
            pivots[1].medpos = ssF.mod2inn_original( pivots[1].pos, stdMod );
        }
        var pivotsMedPos= [ pivots[0].medpos, pivots[1].medpos ];

        ///this property helps to optimize svg painting
        var dressed = ownProp.call( line, 'pointIsAlreadyDressed' );
        if( !dressed ) {
            ////longer part of optimization: creates svg
            var tpclass = sDomF.topicIdUpperCase_2_underscore(
                          ( ns.haz( lineAttr, 'tpclass' ) ) || pName
            );
            var ww          = ns.haz( line, 'pcolor' ) || sDomF.getFixedColor( tpclass );
            var stroke      = han( lineAttr, 'stroke', ww );
            var cssClass    = ns.h( lineAttr, 'cssClass' ) ? lineAttr['cssClass'] + ' ' :  '';


            //adds params to line:
            var finalTp         = haz( line, 'notp' ) ? 'notp-' : 'tp-';
            line.finalCssClass  = cssClass + finalTp + tpclass;
            line.pname          = pName;
            line.pivotNames     = [ pivots[0].pname, pivots[1].pname ];
            line.svgel = sv.polyline({
                svgel   : ns.haz( line, 'svgel' ),
                stroke,

                parent  : stdMod.mmedia,
                //todm everywhere in this module:
                //parent  : studyMods[ amode['submodel' ].mmedia,

                pivots      : pivotsMedPos,
                'stroke-width' : strokeWidth * sconf.thickness, 
            });
            var svgel$ = line.svgel$ = $$.$(line.svgel);
            svgel$.cls( line.finalCssClass );

        } else {
            ////shorter part of optimization
            sv.updatePolyline({
                pivots      : pivotsMedPos,
                svgel       : line.svgel,
                'stroke-width' : strokeWidth * sconf.thickness, 
            });
        }
        if( vectorTipIx || vectorTipIx === 0 ) {
            paintsVectorTips({ vectorTipIx, pivots, line, stdMod });
        }

        line.svgel$.tgcls( 'undisplay', ns.haz( line, 'undisplay' ) );
        //updates pivots in line:
        line.pivots = [ pivots[0], pivots[1] ];
        line.pointIsAlreadyDressed = true;



        //=================================================
        // //\\ draws line caption
        //=================================================
        var caption = ns.haz( lineAttr, 'caption' ); //todo bad name: too generic
                                                 //hard to package-search

        if( caption ) {
            var fontSize = ns.haz( lineAttr, 'fontSize' ) || 20;

            var lposXSugar = 1.5;
            var pvs = pivotsMedPos,
            lposX = ( pvs[0][0] + pvs[1][0] ) / 2;
            lposY = ( pvs[0][1] + pvs[1][1] ) / 2;
            var dir = [ pvs[1][0] - pvs[0][0], pvs[1][1] - pvs[0][1] ];
            var segAngle = Math.atan( dir[1], dir[0] );
            var leftNormAngle = segAngle + Math.PI/2;
            var SHIFT_ABS = has( lineAttr, 'captionShiftY' ) ? lineAttr.captionShiftY : 60;
            var finalPosX = lposX + SHIFT_ABS*Math.cos( leftNormAngle ) - fontSize * lposXSugar;
            var finalPosY = lposY + SHIFT_ABS*Math.sin( leftNormAngle ) - fontSize * 0.2;

            line.pnameLabelsvg = ns.svg.printText({
                text            : caption,
                stroke          : line.pcolor,
                //fill            : line.pcolor,
                "stroke-width"  : 1,
                svgel           : line.pnameLabelsvg,
                parent          : stdMod.mmedia,
                x               : finalPosX.toFixed()+'px',
                y               : finalPosY.toFixed()+'px',
                style           : {
                    'font-size' : fontSize.toFixed() + 'px',
                    'line-height' : '1',
                },
            });
            line.pnameLabelsvg$ = $$.$( line.pnameLabelsvg )
                .cls( line.finalCssClass )
                .addClass( 'tobold' )
                .tgcls( 'undisplay', ns.haz( rg[ line.pname ], 'undisplay' ) )
                ;
        }
        //=================================================
        // \\// draws line caption
        //=================================================
        return line;
    }


    function paintsVectorTips({ vectorTipIx, pivots, line, stdMod })
    {
        var TIP_FRACTION = 0.2;
        var ARROW_TANGENT = 0.2;
        var vectEnd = pivots[ vectorTipIx ].medpos;
        var vectStart = pivots[ (vectorTipIx+1)%2 ].medpos;
        var { abs, norm, unit } = mat.vector2normalOrts( [vectEnd[0]-vectStart[0], vectEnd[1]-vectStart[1]] );
        var tipLength = TIP_FRACTION * abs;
        var tipStart = (1-TIP_FRACTION) * abs;
        var vecTipStart = [ vectStart[0] + unit[0] * tipStart, vectStart[1] + unit[1] * tipStart ];
        var tipHeight = Math.max( sconf.thickness*3, tipLength * ARROW_TANGENT );
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
        line.vectorArrowSvg$ = $$.$(line.vectorArrowSvg)
            .tgcls( 'undisplay', ns.haz( line, 'undisplay' ) )
            .cls( line.finalCssClass + ' tofill' )
            ;
    }


    ///a bit of proliferation
    ///adds "sugar" to pointies2line: point names
    function pointnames2line( name1, name2, cssClass, stdMod )
    {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;
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
    function pnames2line( name1, name2, cssClass, stdMod )
    {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;
        return pointies2line(
            name1 + name2,
            [ rg[ name1 ], rg[ name2 ] ],
            {
                cssClass        : 'tostroke thickable' +
                                   ( cssClass ? ' ' + cssClass : '' ),
                'stroke-width'  : 2,
            },
            stdMod,
        );
    }

    ///makes short line name: AB from A and B
    ///returns: rg element
    function str2line( str, cssClass, lineAttr, caption, stdMod )
    {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;
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
        if( has( lineAttr, 'captionShiftY' ) ) {
            lineAttrPassed.captionShiftY = lineAttr.captionShiftY;
        }
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
        stdMod,
    ){
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;
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
        if( typeof undisplay !== 'undisplay' ) {
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
    function poly_2_updatedPolyPos8undisplay( poly, stdMod ) {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;

        poly = poly || this;
        var CLOSED_POLYLINE = true;
        var pivots = poly.pNames.map( pname => rg[ pname ].medpos );
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
    ///         cssCls can be for 'theorion--proof'
    function paintTriangle( triangleId, cssCls, tpclass, defaultFill, stdMod )
    {
        stdMod          = stdMod || studyMods[ amode.submodel ];
        var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;
        var triang = rg[ triangleId ];
        var mod2inn = ssF.mod2inn;
        var vertices = triang.vertices.map( pos => {
            return mod2inn( pos, stdMod );
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
            cssCls = cssCls ? ' ' + cssCls : '';
            $$.$( triang.svgel ).cls( 'tofill' + cssCls + ' tp-' + tpclass );


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
    }
    //==========================================
    // \\// paints svg triangles
    //==========================================

}) ();

