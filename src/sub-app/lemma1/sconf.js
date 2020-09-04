// //\\// widget config
( function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp    = sn('fapp' ); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);
    var sapp    = sn('sapp'); 
    var srg_modules = sn('srg_modules', sapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_conf';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //0000000000000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.init_conf = init_conf;
    }


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        var MONITOR_Y_FLIP = -1;
        var innerMediaWidth = 1000;

        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        to_sconf =
        {
            EPSILON : 0.36,
            DELTA_FRACTION : 0.7,

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            innerMediaWidth     : innerMediaWidth,
            //innerMediaHeight    : innerMediaWidth+100,
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



        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        /*
        to_sconf.tfamilyColor =
        {
            generic         : to_sconf.GENERIC_COLOR,
            claim           : to_sconf.CORE_AREA_COLOR,
            proof           : to_sconf.REMOTE_AREA_COLOR,
            'primary-curve' : to_sconf.CORE_CURVE_COLOR
        };
        */
        //----------------------------------
        // \\// spawns to_conf
        // \\// prepares sconf data holder
        //----------------------------------------------------



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
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();

