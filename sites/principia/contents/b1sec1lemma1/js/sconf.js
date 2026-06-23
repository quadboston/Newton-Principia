(function(){
const {
        nspaste, sf,
      } = window.b$l.atree( { ssFList: {
        init_conf
}});
return;


///====================================================
/// inits and sets config pars
///====================================================
function init_conf(){
    var MONITOR_Y_FLIP = -1;
    var innerMediaWidth = 1000;

    //----------------------------------------------------
    // //\\  prepares sconf data holder
    //----------------------------------------------------
    nspaste( sf, {
        EPSILON : 0.36,
        DELTA_FRACTION : 0.7,

        //----------------------------------
        // //\\ model-view parameters
        //----------------------------------
        MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
        innerMediaWidth     : innerMediaWidth,
        innerMediaHeight    : innerMediaWidth + sf.SLIDERS_LEGEND_HEIGHT,

        mod2med       : innerMediaWidth,
        med2mod       : 1/innerMediaWidth,
        thickness           : 2,
        GENERIC_COLOR       : '0, 0, 0',
        CORE_CURVE_COLOR    : '160, 0, 0',
        CORE_AREA_COLOR     : '0,125,0',
        REMOTE_AREA_COLOR   : '0,0,255'
        //----------------------------------
        // \\// model-view parameters
        //----------------------------------
    });
    sf.medWidth = sf.innerMediaWidth;
    sf.medHeight = sf.innerMediaHeight;
};
})();