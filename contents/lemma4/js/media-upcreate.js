( function () {
    var { sn, haz, fapp, ssD, sapp, sconf, rg, amode, sData, stdMod, }
        = window.b$l.apptree({ setModule, stdModExportList : {
             media_upcreate___before_basic_L2,
        },
    });
    var stdL2   = sn('stdL2', fapp );
    var study   = sn('study', stdL2 );
    var gui     = sn('gui', stdL2 );
    var guicon  = sn('guiConstruct', gui );
    var sdata   = sn('sdata', study );
    // var dr      = sn('datareg', stdL2 );
    var guiup   = sn('guiUpdate', gui);
    return;


    function setModule()
    {
        ///same in meaning to legacy !view.isNewton property
        sapp.isLite = function()
        {
            return amode.aspect === 'video';
        };
    }
    
    //======================================
    // //\\ view top-manager
    //======================================
    function media_upcreate___before_basic_L2() {
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
        //TEMP
        [stdL2.datareg, stdL2.datareg2].forEach(dr => {
            guiup.paints_curve8axes(dr);
            guiup.updatePtsRectsLabelsAreas(dr);
        });
        let medD8D = haz( stdMod, 'medD8D' );
        if( medD8D ) {
            ////it may be not defined at application landing up
            medD8D.updateAllDecPoints();
        }
        //TEMP
        [stdL2.datareg, stdL2.datareg2].forEach(dr => {
            stdMod.syncPoints(dr);
            {
                //todm via global css by setting state on parent container
                let checked = sdata.view.isFigureChecked ? 'visible' : 'hidden';
                dr.curve_pre$.css( 'visibility', checked );
                dr.curve_middle$.css( 'visibility', checked );
                dr.curve_past$.css( 'visibility', checked );
            }
            guicon.reset_hollowPoints({
                dr,
                onCurve:true,
                onBase:true,
            });
        });

        //--------------------------------------
        // //\\ Show/hide message and parts of figure depending on if monotonic
        //--------------------------------------
        //TEMP
        const messageMonotonic = sData['proof-pop-up'];
        const messageSlope = sData['proof-pop-up-2'];
        //TEMP
        messageSlope.dom$.css( 'display', 'none' );
        let messageMonotonicVisibleTemp = false;
        //TEMP
        messageMonotonic.dom$.css( 'display', 'none' );
        // ssD.lastPopupButton.dom$.css( 'display', 'none' );

        //TEMP May be able to combine the following forEach with the above one
        [stdL2.datareg, stdL2.datareg2].forEach(dr => {
            const isMonotonic = dr.yVariations.changes.length <= 1;

            if(!isMonotonic) {
                //TEMP
                messageMonotonic.dom$.css( 'display', 'block' );
                messageMonotonicVisibleTemp = true;
                // ssD.lastPopupButton.dom$.css( 'display', 'block' );

                //TEMP Would showing and hiding here cause the code to be run
                //multiple times?  If so it could probably be improved.  Look
                //at code in "gui-update.js" eg. function "paints_curve8axes".
                guiup.setsVisibleRange(dr.InscrRects, false);
            } else {
                guiup.setsVisibleRange(dr.InscrRects, sdata.view.isInscribed);
            }

            rg[dr.pointLabels.basePtFirst].undisplay = !isMonotonic;
        });

        //TEMP
        if (messageMonotonicVisibleTemp)
            return;

        [stdL2.datareg, stdL2.datareg2].forEach(dr => {
            const isSlopeOk = stdL2.numModel.checkIfCurveSlopeOkTemp(dr);
            if(!isSlopeOk) {
                //TEMP
                messageSlope.dom$.css( 'display', 'block' );
                // ssD.lastPopupButton.dom$.css( 'display', 'block' );

                //TEMP Would showing and hiding here cause the code to be run
                //multiple times?  If so it could probably be improved.  Look
                //at code in "gui-update.js" eg. function "paints_curve8axes".
                guiup.setsVisibleRange(dr.InscrRects, false);
            } else {
                guiup.setsVisibleRange(dr.InscrRects, sdata.view.isInscribed);
            }

            rg[dr.pointLabels.basePtFirst].undisplay = !isSlopeOk;
        });
        //--------------------------------------
        // \\// Show/hide message and parts of figure depending on if monotonic
        //--------------------------------------
    }
    //======================================
    // \\// view top-manager
    //======================================

}) ();

