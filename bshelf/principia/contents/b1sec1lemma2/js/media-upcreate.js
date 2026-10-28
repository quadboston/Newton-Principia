( function () {
var {
    sn, haz,
    fapp, ssD,
    sapp, sDomN,
    rg, amode, stdMod,
} = window.b$l.atree({
    setModule,
    stdModList: {
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
let zordered = 0;
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
    if( zordered !== 2 ){
        fixesZorder();
    }
}

///overrides z-order of dragg points,
function fixesZorder (){
    //zordered can provide granular detection
    //of svgel presence, but in this lemma
    //granularity is not necessary, svgel
    //already exists,
    zordered = 2;
    Object.values( rg ).forEach( rgX => {
        //if( zordered === 1 ) return;
        if( rgX.isPoint ){
            let svg = rgX.svgel;
            //if( !has( rgX, 'svgel' )){
            //    zordered = 1;
            //    return;
            //}
            let parent = svg.parentNode;
            svg.remove();
            parent.appendChild( svg );
        }
    });
    dr.rgCtrlPts.forEach( (rgX, ix) => {
        //if( zordered === 1 ) return;
        //if( !has( rgX, 'dom' )){
        //    zordered = 1;
        //    return;
        //}
        var svg = rgX.dom;
        var parent = svg.parentNode;
        svg.remove();
        parent.appendChild( svg );
    });
}
//======================================
// \\// view top-manager
//======================================
})();

