( function() {
    var {
        ns,
        $$,
        sn,
        paste,
        mat,
        bezier,
        sv,
        sconf,
        sDomF,
        ssD,
        ssF,
        rg,
        toreg,
        stdMod,
    } = window.b$l.apptree({
        setModule,
    });
    var pointies2line;
    return;










    function setModule()
    {
        stdMod.media_upcreate___part_of_medupcr_basic =media_upcreate___part_of_medupcr_basic;
        pointies2line   = ssF.pointies2line;
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //vital for letters/picture conflict
        //see: model-point-dragger.js ... haz( sconf, 'dragHidesPictures' )
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        var tr              = ssF.tr;
        //:study-pars
        var modCurvPivots   = ssD.curvePivots;    //curve params
        var tC              = ssD.tC;             //point C curve param = vanish param
        //:run-time-pars
        var tB              = ssF.tB;





        var medCurvPivots      = modCurvPivots.map( mod2innCustom );
        var medRemoteCurPivots = ssD.modRemoteCurPivots.map( mod2innCustom );

        var pointA     = pos2pointy4lemma9( 'A',  null
                                      , 'skipSVG'
                                    );
        var pointD     = pos2pointy4lemma9( 'D', null
                                      , 'skipSVG'
                         );
        var pointE     = pos2pointy4lemma9( 'E',  null
                          , 'skipSVG'
                          );
        var pointB     = pos2pointy4lemma9( 'B',  null
                          , 'skipSVG'
                          );
        var pointC     = pos2pointy4lemma9( 'C',  null
                          , 'skipSVG'
                         );

        pointB.doWhiteKernel = true;
        pointC.doWhiteKernel = true;
        pointE.doWhiteKernel = true;

        var pointOd     = pos2pointy4lemma9('d', {cssClass:'tofill tostroke op1' }, 'skipSVG' );
        var pointOe     = pos2pointy4lemma9('e', {cssClass:'tofill tostroke op1' }, 'skipSVG'  );
        var pointOb     = pos2pointy4lemma9('b', {cssClass:'tofill tostroke op1' }, 'skipSVG'  );
        var pointOc     = pos2pointy4lemma9('c', {cssClass:'tofill tostroke op1' }, 'skipSVG'  );
        var pointOg     = pos2pointy4lemma9('g', {cssClass:'tofill tostroke op1' }, 'skipSVG'  );
        var pointOf     = pos2pointy4lemma9('f', {cssClass:'tofill tostroke op1' }, 'skipSVG'  );
        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================










        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================


        // //\\ paints curve with two pivot points
        var mainCurve = tr( 'mainCurve' );
        mainCurve.mediael = bezier.mediafy({
            mediael : mainCurve.mediael, //this is a rack, not svg: goal?: not to recreate DOM.
            svg : stdMod.mmedia,
            pivots : medCurvPivots,
            bcurve :
            {
                'stroke-width' : 1 * sconf.thickness
            },
            paintPivots : {
                topaint : [ null, true, true ],
                attrs :
                {
                    'stroke-width' : 1 * sconf.thickness,
                    //r : 4 * sconf.thickness
                    r : 0.7 * sconf.thickness
                }
            }
        });

        //--------------------------------------------------------------
        // //\\ helps to draw hollow dragee-points on diagram
        //--------------------------------------------------------------
        /*
        var w0 = 1;
        for( var w0=1; w0<3; w0++) {
            var ww = mainCurve.mediael.pivotPoints[w0].svgel;
            $$.$( ww ).addClass( 'tp-_a_b_c' +' tostroke' );
            //tr( 'pivotPoint'+w0, 'svgel', ww );
        }
        */
        $$.cls( 'tostroke', mainCurve.mediael.paintedCurve)
          .cls( 'tp-' + '_a_b_c')
          ;
        rg[ 'pivotPoint1' ].doWhiteKernel = true;
        rg[ 'pivotPoint2' ].doWhiteKernel = true;
        paste( rg.pivotPoint1.pos, modCurvPivots[1] );
        paste( rg.pivotPoint2.pos, modCurvPivots[2] );
        //--------------------------------------------------------------
        // \\// helps to draw hollow dragee-points on diagram
        //--------------------------------------------------------------

        var remoteCurve = tr( 'remoteCurve' );
        remoteCurve.mediael = bezier.mediafy({
            mediael : remoteCurve.mediael,
            svg : stdMod.mmedia,
            pivots : medRemoteCurPivots,
            bcurve :
            {
                stroke : 'transparent', //todm add to bsl core
                'stroke-width' : 1 * sconf.thickness
            }
        });
        $$.$( remoteCurve.mediael.paintedCurve )
            .addClass( 'tostroke tp-_abc' )
            .tgcls( 'undisplay', ns.haz( remoteCurve, 'undisplay' ) )
            ;
        // \\// paints curve with two pivot points




        //------------------------------------------
        //  //\\ proof curved areas
        //------------------------------------------
        var wCCA = ssF.calculateCurvedArea;
        //api:calculateCurvedArea( rgId, pivots, tend, startPoint, endPoint )
        wCCA( 'area-Ace', medRemoteCurPivots,  tC, pointA.medpos, pointOe.medpos );
        wCCA( 'area-Abd', medRemoteCurPivots,  tB, pointA.medpos, pointOd.medpos );
        paintCurvArea( 'area-Ace', 'theorion--proof', '_ace' );
        //.apparently makes this shape-element exclusively present in 
        //.'theorion--proof' mode
        paintCurvArea( 'area-Abd', 'theorion--proof', '_abd' );
        //------------------------------------------
        //  \\// proof curved areas
        //------------------------------------------

        //------------------------------------------
        //  //\\ given curved areas
        //------------------------------------------
        wCCA( 'area-ACE', medCurvPivots,       tC, pointA.medpos, pointE.medpos );
        wCCA( 'area-ABD', medCurvPivots,       tB, pointA.medpos, pointD.medpos );
        //.null makes this element present in all(?) theoreons
        paintCurvArea( 'area-ACE', null, '_a_c_e' );
        paintCurvArea( 'area-ABD', null, '_a_b_d' );
        //------------------------------------------
        //  \\// given curved areas
        //------------------------------------------

        //------------------------------------------
        //  //\\ proof linear areas
        //------------------------------------------
        paintLikeAGE( 'Age', 'theorion--proof', '_age', 'tostroke' );
        paintLikeAGE( 'Afd', 'theorion--proof', '_afd', 'tostroke' );
        //------------------------------------------
        //  \\// proof linear areas
        //------------------------------------------



        //==========================
        // //\\ prints areas values
        //==========================
        ssF.upcreate_mainLegend();
        //==========================
        // \\// prints areas values
        //==========================


        //==========================================
        // \\// does paint view
        //==========================================
        if( ssF.mediaModelInitialized ) {
            var ww = stdMod.medD8D;
            ww && ww.updateAllDecPoints();
        }
        return;
        // \\//\\// ends imperative part of the module



        //==========================================
        // //\\ curved areas
        //==========================================
        function paintCurvArea( areaId, fullMode, topicGroup_decapitalized )
        {
            var area = rg[ areaId ];

            var lowCurve = rg[ areaId ].curve;
            
            var dd = '';
            dd += "M" + area.startPoint[0] + ' ' +
                        area.startPoint[1] + ' ';
            dd += "Q" + 
                  lowCurve[1][0].toFixed(2) + ' ' + lowCurve[1][1].toFixed(2) + ' ' +
                  lowCurve[2][0].toFixed(2) + ' ' + lowCurve[2][1].toFixed(2) + ' ';
            dd += "L" + 
                        area.endPoint[0] + ' ' +
                        area.endPoint[1] + ' ';

            area.mediael = sv.u({
                svgel : area.mediael,
                type : 'path',
                d:dd,
                parent : stdMod.mmedia
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
            fullMode = fullMode ? ' ' + fullMode : '';

            $$.$(area.mediael)
                .cls( ' tp-'+topicGroup_decapitalized + fullMode + ' tofill' )
                .tgcls( 'undisplay', ns.haz( area, 'undisplay' ) )
                ;
        }
        //==========================================
        // \\// curved areas
        //==========================================




        //==========================================
        // //\\ linear areas
        //==========================================
        ///paints AGE-like area
        function paintLikeAGE( areaId, fullMode, topicGroup_decapitalized, stroke0fill )
        {
            var area = rg[ areaId ];
            var vertices = area.vertices.map( mod2innCustom );
            area.mediael = sv.polyline({
                pivots : vertices,
                svgel : area.mediael,
                parent : stdMod.mmedia
            });
            var ww$ = $$.$( area.mediael )
                        .addClass( 'tp-' + topicGroup_decapitalized )
                        .tgcls( 'undisplay', ns.haz( area, 'undisplay' ) )
                        ;
            stroke0fill && ww$.addClass( stroke0fill );
            fullMode && ww$.addClass( fullMode );
        }
        //==========================================
        // \\// linear areas
        //==========================================



        //==========================================
        // //\\ paint helpers
        //==========================================
        // //\\ pos to pos
        ///transforms model-coordinates to media-coordinates
        function mod2innCustom( pos )
        {
            if( !pos ) { pos = this; }
            return [ pos[0] * sconf.mod2inn_scale + sconf.activeAreaOffsetX,
                     pos[1] * sconf.mod2inn_scale * sconf.MONITOR_Y_FLIP +
                     sconf.activeAreaOffsetY ];
        }
        // \\// pos to pos


        ///converts model-pos and attributes to pointy
        function pos2pointy4lemma9( pName, attrs, skipSVG, customSWidth, medPosKnown )
        {
            var pt              = tr( pName );
            pt.pname            = pName;
            if( !medPosKnown ) {
                var pos         = rg[ pName ].pos;
                pt.pos          = pos;
                pt.medpos       = mod2innCustom( pt.pos );
            }
            if( skipSVG ) return pt;

            pt.svgel = sv.u({
                svgel   : pt.svgel,
                parent  : stdMod.mmedia,
                type    : 'circle',
                fill    : attrs && attrs.fill,
                stroke  : attrs && attrs.stroke,
                'stroke-width' : (( attrs && attrs[ 'stroke-width' ] ) || 0) * sconf.thickness,
                cx : pt.medpos[0],
                cy : pt.medpos[1],
                //.defines visible size of a dot on screen
                //r : 4 * sconf.thickness
                r : ( customSWidth || 0.7 ) * sconf.thickness * 8 //todo
            });
            var cssClass = attrs && attrs['cssClass'] && ( attrs['cssClass'] + ' ' );
            $$.$(pt.svgel).cls( cssClass + 'tp-' +  sDomF.topicIdUpperCase_2_underscore( pName ) );
            return pt;
        }
        //==========================================
        // \\// paint helpers
        //==========================================
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

}) ();

