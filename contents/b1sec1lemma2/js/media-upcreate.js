( function () {
var {
    sn, haz,
    fapp, ssD,
    sapp, sDomN,
    rg, amode, stdMod,
} = window.b$l.apptree({
    setModule,
    stdModExportList: {
        media_upcreate___before_basic_L2,
        //media_upcreate___after_basic,
        fixesZorder,
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
    guiup.paints_curve8axes();
    guiup.updatePtsRectsLabelsAreas();
    let lemmaD8D = haz( stdMod, 'lemmaD8D' );
    if( lemmaD8D ) {
        ////it may be not defined at application landing up
        lemmaD8D.updateAllDecPoints();
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

    if( dr.yVariations.changes.length > 1 ) {
        ssD.lastPopupButton.dom$.css( 'display', 'block' );
    } else {
        ssD.lastPopupButton.dom$.css( 'display', 'none' );
    }
}

function fixesZorder (){
    Object.values( rg ).forEach( rgX => {
        if( rgX.isPoint ){
            let svg = rgX.svgel;
            let parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );
        }
    });
    dr.rgCtrlPts.forEach( (rgX, ix) => {
        svg = rgX.dom;
        parent = svg.parentNode;
        svg.remove();
        parent.appendChild( svg );
    });
}
//======================================
// \\// view top-manager
//======================================
})();

