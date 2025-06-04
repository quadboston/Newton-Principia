( function() {
    var {
        $$, haz, fconf, ssF, ssD, sconf, amode, stdMod, rg, toreg, bezier, nssvg
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

        // draw proof triangles first so their on the bottom
        calculateTriangleArea('area-rAb', rg.A.medpos, rg.b.medpos, rg.r.medpos);
        paintArea( 'area-rAb', null, 'area-r_ab' );

        calculateTriangleArea('area-rAd', rg.A.medpos, rg.d.medpos, rg.r.medpos);
        paintArea( 'area-rAd', null, 'area-r_ad' );

        // draw claim triangles
        calculateTriangleArea('area-RAB', rg.A.medpos, rg.B.medpos, rg.R.medpos);
        paintArea( 'area-RAB', null, 'area-_r_a_b' );

        calculateTriangleArea('area-RAD', rg.A.medpos, rg.D.medpos, rg.R.medpos);
        paintArea( 'area-RAD', null, 'area-_r_a_d' );

        function calculateTriangleArea(rgId, Apos, Bpos, Rpos) {
            var area = toreg(rgId)();

            area.startPoint = Apos;
            area.endPoint = Bpos;
            area.Rpos = Rpos;
        }

        function paintArea(areaId, fullMode, topicGroup_decapitalized) {
            var area = rg[areaId];

            if (!area.startPoint || !area.endPoint || !area.Rpos) {
                console.error("Missing triangle coordinates");
                return;
            }

            var dd = `M${area.startPoint[0]} ${area.startPoint[1]} 
                    L${area.endPoint[0]} ${area.endPoint[1]} 
                    L${area.Rpos[0]} ${area.Rpos[1]} 
                    Z`;

            area.mediael = nssvg.u({
                svgel: area.mediael,
                type: 'path',
                d: dd,
                parent: stdMod.mmedia
            });

            $$.$(area.mediael)
                .cls(`tp-${topicGroup_decapitalized}${fullMode ? ' ' + fullMode : ''} tofill`)
                .tgcls('undisplay', haz(area, 'undisplay'));
        }

// function calculateCurvedArea(rgId, polyline, Rpos) {
//     var area = toreg(rgId)();

//     // Extract first and last points from the polyline
//     var points = polyline.animatedPoints; // Assuming polyline is an SVG element
//     var startPoint = [parseFloat(points[0].x), parseFloat(points[0].y)];
//     var endPoint = [parseFloat(points[points.length - 1].x), parseFloat(points[points.length - 1].y)];

//     area.startPoint = startPoint;
//     area.endPoint = endPoint;
//     area.Rpos = Rpos;
// }

// calculateCurvedArea(
//     'area-RAB',
//     rg['arc-Ab'].svg,
//     rg.R.medpos
// );

// paintArea( 'area-RAB', null, 'area-_r_a_b' );

// function paintArea(areaId, fullMode, topicGroup_decapitalized) {
//     var area = rg[areaId];

//     var dd = '';
//     dd += "M" + area.startPoint[0] + ' ' + area.startPoint[1] + ' ';
//     dd += "L" + area.endPoint[0] + ' ' + area.endPoint[1] + ' ';
//     dd += "L" + area.Rpos[0] + ' ' + area.Rpos[1] + ' ';
//     dd += "Z"; // Close the triangle

//     area.mediael = nssvg.u({
//         svgel: area.mediael,
//         type: 'path',
//         d: dd,
//         parent: stdMod.mmedia
//     });

//     $$.$(area.mediael)
//         .cls(' tp-' + topicGroup_decapitalized + (fullMode ? ' ' + fullMode : '') + ' tofill')
//         .tgcls('undisplay', haz(area, 'undisplay'));
// }

        // {
        //     var area = rg[ areaId ];

        //     var lowCurve = rg[ areaId ].curve;
            
        //     var dd = '';
        //     dd += "M" + area.startPoint[0] + ' ' +
        //                 area.startPoint[1] + ' ';
        //     dd += "Q" + 
        //           lowCurve[1][0].toFixed(2) + ' ' + lowCurve[1][1].toFixed(2) + ' ' +
        //           lowCurve[2][0].toFixed(2) + ' ' + lowCurve[2][1].toFixed(2) + ' ';
        //     dd += "L" + 
        //                 area.endPoint[0] + ' ' +
        //                 area.endPoint[1] + ' ';

        //     area.mediael = nssvg.u({
        //         svgel : area.mediael,
        //         type : 'path',
        //         d:dd,
        //         parent : stdMod.mmedia
        //     });
        //     //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
        //     fullMode = fullMode ? ' ' + fullMode : '';

        //     $$.$(area.mediael)
        //         .cls( ' tp-'+topicGroup_decapitalized + fullMode + ' tofill' )
        //         .tgcls( 'undisplay', haz( area, 'undisplay' ) )
        //         ;
        // }

        //==========================================
        // \\// fill areas
        //==========================================
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
