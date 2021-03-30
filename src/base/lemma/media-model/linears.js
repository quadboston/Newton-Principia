( function() {
    var {
        ns, sn, $$, sv,
        han,
        haz,
        sconf,
        rg,
        ssF, ssD,
        sDomF, sDomN, amode,
        stdMod,

    } = window.b$l.apptree({
        ssFExportList :
        {
            pointies2line,
            pointnames2line,
            pnames2line,
            str2line,
            pnames2poly,
            paintTriangle,
        },
        sDomNExportList :
        {
            mediaLeftMargin : 0,   //fake initial value before resize ran
            mediaWidth : 1000,     //fake initial value before resize ran
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
    ///         pName - name of line,
    ///         pivots[0].medpos, pivots[1].medpos
    ///
    ///     optional:
    ///         line as ssF.tr( pName )
    ///         attr.stroke
    ///         attr[ 'stroke-width' ]
    ///         attr.cssClass
    ///         attr.tpclass
    ///
    ///     used external:
    ///         sconf.thickness
    ///         stdMod.mmedia
    ///
    /// Output: adds pivots-media-positions to line
    function pointies2line( pName, pivots, attr )
    {
        var attr        = attr || {};
        var line        = ssF.toreg( pName )();
        var strokeWidth = han( attr, 'stroke-width', 1 );

        if( haz( pivots[0], 'unscalable' ) ) {
            pivots[0].medpos = ssF.mod2inn_original( pivots[0].pos );
        }
        if( haz( pivots[1], 'unscalable' ) ) {
            pivots[1].medpos = ssF.mod2inn_original( pivots[1].pos );
        }
        var pivotsMedPos= [ pivots[0].medpos, pivots[1].medpos ];

        ///this property helps to optimize svg painting
        var dressed = ownProp.call( line, 'pointIsAlreadyDressed' );
        if( !dressed ) {
            ////longer part of optimization: creates svg
            var tpclass = sDomF.topicIdUpperCase_2_underscore(
                          ( ns.haz( attr, 'tpclass' ) ) || pName
            );
            var ww          = ns.haz( line, 'pcolor' ) || sDomF.getFixedColor( tpclass );
            var stroke      = han( attr, 'stroke', ww );
            var cssClass    = ns.h( attr, 'cssClass' ) ? attr['cssClass'] + ' ' :  '';


            //adds params to line:
            var finalTp         = haz( line, 'notp' ) ? 'notp-' : 'tp-';
            line.finalCssClass  = cssClass + finalTp + tpclass;
            line.pname      = pName;
            line.pivotNames = [ pivots[0].pname, pivots[1].pname ];
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
        line.svgel$.tgcls( 'undisplay', ns.haz( line, 'undisplay' ) );
        //updates pivots in line:
        line.pivots = [ pivots[0], pivots[1] ];
        line.pointIsAlreadyDressed = true;



        //=================================================
        // //\\ draws line caption
        //=================================================
        var caption = ns.haz( attr, 'caption' );

        if( caption ) {
            var fontSize = ns.haz( attr, 'fontSize' ) || 20;

            var lposXSugar = 1.5;
            var pvs = pivotsMedPos,
            lposX = ( pvs[0][0] + pvs[1][0] ) / 2;
            lposY = ( pvs[0][1] + pvs[1][1] ) / 2;
            var dir = [ pvs[1][0] - pvs[0][0], pvs[1][1] - pvs[0][1] ];
            var segAngle = Math.atan( dir[1], dir[0] );
            var leftNormAngle = segAngle + Math.PI/2;
            var SHIFT_ABS = 60;
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
            var ww$ = $$.$( line.pnameLabelsvg );
            ww$.cls( line.finalCssClass );
            ww$.addClass( 'tobold' );
            $$.$( line.pnameLabelsvg )
                .tgcls( 'undisplay', ns.haz( rg[ line.pname ], 'undisplay' ) );
        }
        //=================================================
        // \\// draws line caption
        //=================================================
        return line;
    }

    ///a bit of proliferation
    ///adds "sugar" to pointies2line: point names
    function pointnames2line( name1, name2, cssClass )
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
    function pnames2line( name1, name2, cssClass )
    {
        return pointies2line(
            name1 + name2,
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
    function str2line( str, cssClass, lineConf, caption )
    {
        var splitToken = str.indexOf( ',' ) > -1 ? ',' : '';
        var lpoints = str.split( splitToken );
        return pointies2line(
            str,
            [ rg[ lpoints[0] ], rg[ lpoints[1] ] ],
            {
                cssClass        : 'tostroke thickable' +
                                   ( cssClass ? ' ' + cssClass : '' ),
                'stroke-width'  : ns.sn( 'stroke-width', lineConf, 2 ),
                caption         : caption,
            }
        );
    }
    //==============================================
    // \\// creates svg-line or updates it if exists
    //==============================================



    function pnames2poly(
        pNames,
        cssClass,
        correctJoin, //fix all lemmas and remove this par. then
    ){
        var CLOSED_POLYLINE = true;
        var pName = pNames.join( correctJoin ? '--' : '');
        var pivots = pNames.map( pname => rg[ pname ].medpos );

        if( CLOSED_POLYLINE ) {
            pivots.push( pivots[0] );
        }

        var attr =
        {
            cssClass        : 'tostroke thickable' +
                               ( cssClass ? ' ' + cssClass : '' ),
           'stroke-width'  : 2,
        };
        var tpclass = sDomF.topicIdUpperCase_2_underscore(
                      ( ns.haz( attr, 'tpclass' ) ) || pName
        );
        var cssClass    = ns.h( attr, 'cssClass' ) ? attr['cssClass'] + ' ' :  '';
        var stroke      = han( attr, 'stroke', sDomF.getFixedColor( tpclass ) );
        var strokeWidth = han( attr, 'stroke-width', 1 );
        var poly        = ssF.toreg( pName )();
        poly.pname      = pName;
        poly.pivotNames = pNames.concat();
        poly.svgel = sv.polyline({
            svgel   : ns.haz( poly, 'svgel' ),
            stroke,
            parent  : stdMod.mmedia,
            pivots,
            'stroke-width' : strokeWidth * sconf.thickness, 
        });
        var svgel$ = $$.$(poly.svgel);
        svgel$.tgcls( 'undisplay', ns.haz( poly, 'undisplay' ) );
        svgel$.cls( cssClass + 'tp-' + tpclass );
        //if( pName === 'ABS' ) ccc( pName, poly );
        return poly;
    }
    //==============================================
    // \\// Adds DOM and decorations to pointRack
    //==============================================





    //==========================================
    // //\\ paints svg triangles
    //==========================================
    ///Input:   triang = rg[ triangleId ]
    ///         triang.vertices
    ///         cssCls can be for 'theorion--proof'
    function paintTriangle( triangleId, cssCls, tpclass, defaultFill )
    {
        var triang = rg[ triangleId ];
        var mod2inn = ssF.mod2inn;
        var vertices = triang.vertices.map( mod2inn );

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
    }
    //==========================================
    // \\// paints svg triangles
    //==========================================

}) ();

