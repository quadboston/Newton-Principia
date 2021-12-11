//====================================================
// clones or filters common sconf into stdMod.sconf
//====================================================
( function() {
    var {
        nspaste,
        commonsconf,
        stdMod, sconf,
    } = window.b$l.apptree({
        SUB_MODEL : 'projectile_model',
        stdModExportList :
        {
            init_conf,
        },
    });
    return;









    function init_conf()
    {
        //nspaste( sconf, commonsconf );
        //sconf.bgImgAsp = 0.5;

        //------------------------------------
        // //\\ original model parameters
        //------------------------------------
        var ellipse_ax = 1;
        var ellipse_ay = 0.5;
        var t0 = 0.2; //where comparison begins
        var ellipseOrigin = [1.1,0];

        var projectileOrigin = [2.2,0];
        //------------------------------------
        // \\// original model parameters
        //------------------------------------


        //------------------------------------
        // //\\ original model view parameters
        //------------------------------------
        var pictureWidth = 1000;
        var pictureHeight = 800;

        var modorInPicX = 20;
        var modorInPicY = 780;

        //points
        //var P1 = Ellipse(t0);
        //var P2 = Projectile(t0);
        //------------------------------------
        // \\// original model view parameters
        //------------------------------------


        var MONITOR_Y_FLIP = -1;
        //four half ellipse-x-axes along screen width
        var mod2inn_scale = 200;

        Object.assign( sconf, {
            dontRun_ExpandConfig : true,
            modorInPicX,
            modorInPicY,
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
            innerMediaWidth     : pictureWidth,

            MONITOR_Y_FLIP,
            mod2inn_scale,
            inn2mod_scale       : 1 / mod2inn_scale,

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            enableStudylab : true,
            //hideProofSlider : true, //false,
            enableCapture : true,
            enableTools : true,
            //enableDataFunctionsRepository : true,
            //----------------------------------
            // \\// scenario
            //----------------------------------
        });

    };

}) ();

