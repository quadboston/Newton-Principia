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

        //==========================================
        // //\\ fill areas (adapted from L9)
        //==========================================

        // borrowed from L9 model-upcreate.js; todo: is there somewhere to put common functions?
        function calculateCurvedArea( rgId, pivots, tend, startPoint, endPoint )
        {
            var area        = toreg( rgId )();
            area.curve      = bezier.bezier2lower( pivots, tend );
            area.startPoint = startPoint;
            area.endPoint   = endPoint;
        }
        calculateCurvedArea( 
            'area-RAB', 
            sconf.givenCurve_pivots_inModel, 
            rg.C.pos[0], 
            rg.A.medpos, 
            rg.B.medpos 
        );
        console.log(rg.A.medpos) //todo: calc the correct vals for L8

        paintArea( 'area-RAB', null, 'area-_r_a_b' );
        function paintArea( areaId, fullMode, topicGroup_decapitalized )
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
        // \\// fill areas
        //==========================================


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
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
