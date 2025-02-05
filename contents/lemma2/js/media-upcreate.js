( function () {
    var {
        sn, haz,
        fapp,
        sapp, sDomN,
        amode, SUB_MODEL, stdMod,
    } = window.b$l.apptree({
        setModule,
        stdModExportList :
        {
             media_upcreate___before_basic_L2,
        },
    });
    var stdL2   = sn('stdL2', fapp );
    var study   = sn('study', stdL2 );
    var gui     = sn('gui', stdL2 );
    var guicon  = sn('guiConstruct', gui );
    var sdata   = sn('sdata', study );
    var dr      = sn('datareg', stdL2 );
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
        stdMod.mmedia$.cls( 'submodel-' + SUB_MODEL );
        
        guiup.paints_curve8axes();
        guiup.updatePtsRectsLabelsAreas();
        let medD8D = haz( stdMod, 'medD8D' );
        if( medD8D ) {
            ////it may be not defined at application landing up
            medD8D.updateAllDecPoints();
        }
        stdMod.syncPoints();
        {
            //todm via global css by setting state on parent container
            let checked = sdata.view.isFigureChecked ? 'visible' : 'hidden';
            sDomN.curve_pre$.css( 'visibility', checked );
            sDomN.curve_middle$.css( 'visibility', checked );
            sDomN.curve_past$.css( 'visibility', checked );
        }
        guicon.reset_hollowPoints({
            onCurve:true,
            onBase:true,
        });
    }
    //======================================
    // \\// view top-manager
    //======================================

}) ();

