( function() {
    var {
        $$, haz, fconf, ssF, ssD, amode, stdMod, rg, toreg, nssvg
    } = window.b$l.apptree({
        stdModExportList : {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;

    
    //=========================================================
    // //\\ lemma custom addons
    //      - called every time model changes
    //      - all it seems to do is paint the arcs
    //      - the rest is drawn in src\base\lemma\media-model\media-upcreate.js
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //console.log('updating/creating arcs')
        rg.DLeft.pos[0] = -0.3; //extends tangent to the left
        //=================================================
        // //\\ manages legend CSS-visibility
        //      by essay-state
        //=================================================
        var rgMainLegend = haz( rg, 'main-legend' );
        if( rgMainLegend ) {
            var rgTeoTab = rgMainLegend[ amode.logic_phase ];
            if( amode.logic_phase === 'corollary' && amode.aspect === 'model' ) {
                $$.$( rgTeoTab.tableDom ).addClass( 'hidden' );
            } else {
                $$.$( rgTeoTab.tableDom ).removeClass( 'hidden' );
            }
        }
        //=================================================
        // \\// manages legend CSS-visibility
        //=================================================

        //vital for letters/picture conflict
        //see: model-point-dragger.js ... haz( sconf, 'dragHidesPictures' )
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        //: analytical derivative dy/dx
        var cfun = ssD.repoConf[ssD.repoConf.customFunction];
        
        //-------------------------------------------------
        // //\\ original arc and curve
        //-------------------------------------------------
        //must be in synch with rotation of AL
        //pointB      : rg.B,

        ssF.paintsCurve({
                //rgName    : will become 'arc-AB',
                fun         : cfun.fun,
                pointA      : rg.A,
                pointB      : rg.B,

                //-----------------------------------------
                // //\\ apparently this fixes
                //-----------------------------------------
                //      arc out of synch with B
                start       : rg.A.pos[0],
                step        : (rg.B.unrotatedParameterX - rg.A.pos[0] ) / 20,
                stepsCount  : 20,
                //-----------------------------------------
                // \\// apparently this fixes
                //-----------------------------------------

                mmedia      : stdMod.mmedia,
                addToStepCount : 1,
        });

        ssF.paintsCurve({
                rgName      : 'curve-AB',
                fun         : cfun.fun,

                //this makes curve's beginning tail going up - not good
                //pointA      : rg.curveStart,
                //so, we truncate it, but need to draw it separately later on,
                pointA      : rg.A,

                pointB      : rg.curveEnd,
                mmedia      : stdMod.mmedia,
                addToStepCount : 1,
        });

        ///left branch of original curve is a reflection against axis y
        ssF.paintsCurve({
                rgName      : 'left-curve-AB',
                fun         : ssD.repoConf[2].fun,

                pointA      : rg.A,
                pointB      : rg.curveLeftEnd,
                mmedia      : stdMod.mmedia,
                addToStepCount : 1,
        });
        //-------------------------------------------------
        // \\// original arc and curve
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ paints magnified curve
        //-------------------------------------------------
        var magnitude = rg.magnitude.value;
        //misleading notation: this is not ..._b, this is ..._B
        rg.derotated_b = toreg( 'derotated_b' )( 'pos', [rg.B.unrotatedParameterX,0] )();
        ssF.paintsCurve({
                rgName      : 'arc-Ab',
                fun         : cfun.fun, //for l8, cust fun = 0 = rotated fun
                pointA      : rg.A,
                pointB      : rg.derotated_b,
                mmedia      : stdMod.mmedia,
                magnitude,
                //addedCssClass: 'tp-arc-Ab tp-both-curves', 
                addedCssClass: 'tp-arc-Ab', 
                addToStepCount : 1,
                stepsCount : fconf.sappId === "b1sec1lemma8" ? 200 : null,
        });
        //-------------------------------------------------
        // \\// paints magnified curve
        //-------------------------------------------------

        //==========================================
        // //\\ fill areas (loosely adapted from L9)
        //==========================================

        // draw proof triangles first so they're on the bottom
        calculateTriangleArea('area-rAd', rg.A.medpos, rg.d.medpos, rg.r.medpos);
        paintArea( 'area-rAd', null, 'area-r_ad' );

        calculateTriangleArea('area-rAb', rg.A.medpos, rg.b.medpos, rg.r.medpos);
        paintArea( 'area-rAb', null, 'area-r_ab' );

        calculateCurvedTriangleArea('area-rAcb', 'tp-arc-_ab', rg.A.medpos, rg.b.medpos, rg.r.medpos);
        paintArea( 'area-rAcb', null, 'area-r_acb' );

        // draw claim triangles
        calculateTriangleArea('area-RAD', rg.A.medpos, rg.D.medpos, rg.R.medpos);
        paintArea( 'area-RAD', null, 'area-_r_a_d' );

        calculateTriangleArea('area-RAB', rg.A.medpos, rg.B.medpos, rg.R.medpos);
        paintArea( 'area-RAB', null, 'area-_r_a_b' );

        calculateCurvedTriangleArea('area-RACB', 'tp-arc-_a_b', rg.A.medpos, rg.B.medpos, rg.R.medpos);
        paintArea( 'area-RACB', null, 'area-_r_a_c_b' );

        function calculateTriangleArea(rgId, Apos, Bpos, Rpos) {
            var area = toreg(rgId)();
            area.startPoint = Apos;
            area.endPoint = Bpos;
            area.Rpos = Rpos;

            area.dd = `M${area.startPoint[0]} ${area.startPoint[1]} 
            L${area.endPoint[0]} ${area.endPoint[1]} 
            L${area.Rpos[0]} ${area.Rpos[1]} 
            Z`;
        }

        function calculateCurvedTriangleArea(rgId, arc, Apos, Bpos, Rpos) {
            var area = toreg(rgId)();

            // Clone the arc
            const originalPolyline = document.getElementsByClassName(arc)[0];
            const pointsArray = originalPolyline.getAttribute("points").split(" ").map(point => point.split(","));

            // Construct the `d` value for the path
            let dValue = `M${pointsArray[0][0]} ${pointsArray[0][1]}`;            
            for (let i = 1; i < pointsArray.length; i++) {
                dValue += ` L${pointsArray[i][0]} ${pointsArray[i][1]}`;
            }            
            dValue += ` L${Rpos[0]} ${Rpos[1]}`;            
            dValue += " Z"; // Close the path

            area.dd = dValue;
        }

        // todo: removing unused fullMode param turns triangles black - why??
        function paintArea(areaId, fullMode, topicGroup_decapitalized) {
            var area = rg[areaId];

            area.mediael = nssvg.u({
                svgel: area.mediael,
                type: 'path',
                d: area.dd,
                parent: stdMod.mmedia
            });

            $$.$(area.mediael)
                .cls(`tp-${topicGroup_decapitalized} tofill`)
                .toggleClass('undisplay', haz(area, 'undisplay'));
        }

        //==========================================
        // \\// fill areas
        //==========================================
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
