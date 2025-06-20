( function() {
    var {
        $$, haz, fconf, ssF, ssD, sconf, amode, stdMod, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList : {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;


    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        rg.DLeft.pos[0] = -0.3; //extends tangent to the left
        //=================================================
        // //\\ manages legend CSS-visibility by essay-state
        //      called each time page state changes (tab button clicked, corollary chosen from list)
        //=================================================
        var rgMainLegend = haz( rg, 'main-legend' ); //haz returns param 2 from param 1
        if( rgMainLegend ) {
            var rgTeoTab = rgMainLegend[ amode.logic_phase ];
            //console.log(amode.logic_phase)
            if( amode.logic_phase === 'corollary' ) {
                //console.log(amode.subessay); // "cor-1", "cor-2", "cor-3"
                const rows = rgTeoTab.tableDom.querySelectorAll('tr');
                let visibleRows = [];
                switch(amode.subessay) {
                    // defined in main-legend.js as the array lemma7Data.corollary
                    case 'cor-1': visibleRows = [0, 1, 2, 3]; break;
                    case 'cor-2': visibleRows = [4, 5, 6, 7, 8, 9, 10, 11]; break;
                    case 'cor-3': visibleRows = [12, 13, 14, 15, 16, 17]; break;
                    default: break;
                }
                rows.forEach((row, index) => {
                    row.style.display = visibleRows.includes(index) ? 'table-row' : 'none';
                });
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
        if(magnitude > 100) magnitude = rg.magnitude.value = 100; // prevents Acb from going above Ad
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
