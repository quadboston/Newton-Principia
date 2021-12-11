( function() {
    var {
        sconf, ssF,
    } = window.b$l.apptree({
        setModule,
    });
    return;








    function setModule()
    {
        ssF.init_conf = init_conf;
    }


    ///====================================================
    /// inits and sets config pars
    ///====================================================
    function init_conf()
    {
        var MONITOR_Y_FLIP = -1;
        var innerMediaWidth = 1000;

        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        to_sconf =
        {
            dontRun_ExpandConfig : true,
            EPSILON : 0.36,
            DELTA_FRACTION : 0.7,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            innerMediaWidth     : innerMediaWidth,
            innerMediaHeight    : innerMediaWidth + sconf.SLIDERS_LEGEND_HEIGHT,

            mod2inn_scale       : innerMediaWidth,
            inn2mod_scale       : 1/innerMediaWidth,
            thickness           : 2,
            GENERIC_COLOR       : '0, 0, 0',
            CORE_CURVE_COLOR    : '160, 0, 0',
            CORE_AREA_COLOR     : '0,125,0',
            REMOTE_AREA_COLOR   : '0,0,255'
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------
        };



        //----------------------------------------------------
        // //\\ copy-pastes to sconf
        //----------------------------------------------------
        Object.keys( to_sconf ).forEach( function( key ) {
            sconf[ key ] = to_sconf[ key ];
        });
        //----------------------------------------------------
        // \\// copy-pastes to sconf
        //----------------------------------------------------
    };

}) ();

