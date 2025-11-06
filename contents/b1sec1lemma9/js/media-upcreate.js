( function() {
    var {
        sn, $$, paste, haz, mat, bezier, nssvg,
        sconf, sDomF, ssD, ssF,
        stdMod, rg, toreg,
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
        // console.log('media-upcreate');

        //vital for letters/picture conflict
        //see: model-point-dragger.js ... haz( sconf, 'dragHidesPictures' )
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        //:study-pars
        var modCurvPivots   = ssD.curvePivots;    //curve params
        var tC              = ssD.tC;             //point C curve param = vanish param
        //:run-time-pars
        var tB              = ssF.tB;

        //var medCurvPivots      = modCurvPivots.map( mod2innCustom );
        //var medRemoteCurPivots = ssD.modRemoteCurPivots.map( mod2innCustom );
        var medCurvPivots      = modCurvPivots.map( pos => {
            return ssF.mod2inn( pos, stdMod );
        });
        var medRemoteCurPivots = ssD.modRemoteCurPivots.map( pos => {
            return ssF.mod2inn( pos, stdMod );
        });

        var pointA     = rg.A;
        var pointD     = rg.D;
        var pointE     = rg.E;
        var pointB     = rg.B;
        var pointC     = rg.C;
        
        rg.B.doWhiteKernel = true;
        rg.C.doWhiteKernel = true;
        rg.E.doWhiteKernel = true;

        var pointOd     = rg.d;
        var pointOe     = rg.e;
        var pointOb     = rg.b;
        var pointOc     = rg.c;
        var pointOg     = rg.g;
        var pointOf     = rg.f;
        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================


        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================

        // //\\ paints curve with pivot points
        var mainCurve = toreg( 'mainCurve' )();
        mainCurve.mediael = bezier.mediafy({
            mediael : mainCurve.mediael, //this is a rack, not svg: goal?: not to recreate DOM.
            parentSVG : stdMod.mmedia,
            pivots : medCurvPivots,
            bcurve :
            {
                'stroke-width' : 1 * sconf.thickness
            },
            //Ensure second paint pivot is hidden.  Otherwise a small dot will be in its location for the claim tab, since the point that would 
            //cover it for other tabs is hidden.
            paintPivots : {
                topaint : [ null, null, true ],
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

        var remoteCurve = toreg( 'remoteCurve' )();
        remoteCurve.mediael = bezier.mediafy({
            mediael : remoteCurve.mediael,
            parentSVG : stdMod.mmedia,
            pivots : medRemoteCurPivots,
            bcurve :
            {
                stroke : 'transparent', //todm add to bsl core
                'stroke-width' : 1 * sconf.thickness
            }
        });
        $$.$( remoteCurve.mediael.paintedCurve )
            .addClass( 'tostroke tp-_abc' )
            .tgcls( 'undisplay', haz( remoteCurve, 'undisplay' ) )
            ;
        // \\// paints curve with two pivot points

        //------------------------------------------
        //  //\\ proof curved areas
        //------------------------------------------
        var wCCA = ssF.calculateCurvedArea;
        //api:calculateCurvedArea( rgId, pivots, tend, startPoint, endPoint )
        wCCA( 'area-Ace', medRemoteCurPivots,  tC, pointA.medpos, pointOe.medpos );
        wCCA( 'area-Abd', medRemoteCurPivots,  tB, pointA.medpos, pointOd.medpos );
        paintCurveArea( 'area-Ace', 'logic_phase--proof', '_ace' );
        //.apparently makes this shape-element exclusively present in 
        //.'logic_phase--proof' mode
        paintCurveArea( 'area-Abd', 'logic_phase--proof', '_abd' );
        //------------------------------------------
        //  \\// proof curved areas
        //------------------------------------------

        //------------------------------------------
        //  //\\ given curved areas
        //------------------------------------------
        //console.log(medCurvPivots + '; ' + tC)
        wCCA( 'area-ACE', medCurvPivots,       tC, pointA.medpos, pointE.medpos );
        wCCA( 'area-ABD', medCurvPivots,       tB, pointA.medpos, pointD.medpos );
        //.null makes this element present in all(?) theoreons
        paintCurveArea( 'area-ACE', null, '_a_c_e' );
        paintCurveArea( 'area-ABD', null, '_a_b_d' );
        //------------------------------------------
        //  \\// given curved areas
        //------------------------------------------

        //------------------------------------------
        //  //\\ proof linear areas
        //------------------------------------------
        paintLikeAGE( 'Age', 'logic_phase--proof', '_age', 'tostroke' );
        paintLikeAGE( 'Afd', 'logic_phase--proof', '_afd', 'tostroke' );
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

        // init here to ensure all req'd vars are inited first
        // so we don't need to call media-upcreate() from init-sapp.js
        stdMod.initDragModel( stdMod.medD8D ); 

        return;
        // \\//\\// ends imperative part of the module


        //==========================================
        // //\\ curved areas
        //==========================================
        function paintCurveArea( areaId, fullMode, topicGroup_decapitalized )
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

            area.mediael = nssvg.u({
                svgel : area.mediael,
                type : 'path',
                d:dd,
                parent : stdMod.mmedia
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
            fullMode = fullMode ? ' ' + fullMode : '';

            $$.$(area.mediael)
                .cls( ' tp-'+topicGroup_decapitalized + fullMode + ' tofill' )
                .tgcls( 'undisplay', haz( area, 'undisplay' ) )
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
            var vertices = area.vertices.map( pos => {
                return ssF.mod2inn( pos, stdMod );
            });
            area.mediael = nssvg.polyline({
                pivots : vertices,
                svgel : area.mediael,
                parent : stdMod.mmedia
            });
            $$.$( area.mediael )
                .addClass(`tp-${topicGroup_decapitalized} tofill`)
                .tgcls( 'undisplay', haz( area, 'undisplay' ) )
                ;
        }
        //==========================================
        // \\// linear areas
        //==========================================

    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

}) ();

