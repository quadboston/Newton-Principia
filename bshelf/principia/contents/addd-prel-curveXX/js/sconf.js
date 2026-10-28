{
    const { ns, nspaste, tpelect, fconf, sconf } =
    window.b$l.atree({ ssFList : { init_conf: ()=>{
        const el = tpelect;
        fconf.ESSAY_FRACTION_IN_WORKPANE = 0.7;
        fconf.timeToShowOriginalDiagram  = null;
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true; //false;
        sconf.GENERIC_SLIDERS_COUNT     = 0;
        sconf.SLIDERS_LEGEND_HEIGHT     = 0;
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //--------------------------------------
        // //\\ geometics parameters
        //--------------------------------------
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        sconf.default_tp_lightness = 30;
        var medWidth = 1500;
        var medHeight = 1200;

        var medposOfModOrigin_x = 400;
        var medposOfModOrigin_y = 150;

        var A       = [medposOfModOrigin_x, medposOfModOrigin_y];
        var B       = [medposOfModOrigin_x+400, medposOfModOrigin_y];
        var axisX   = [medposOfModOrigin_x, 1100];
        var axisY   = [1300, medposOfModOrigin_y];
        var T       = [1000, medposOfModOrigin_y];
        var Tleft   = [medposOfModOrigin_x-350, medposOfModOrigin_y];
        var X       = [1000, medposOfModOrigin_y+100];

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var context = [50,   0,   100,    1];
        var given   = [0,     150, 0,      1];
        var proof   = [0,     0,   255,    1];
        var result  = [200,   40,  0,      1];
        var hidden  = [0,     0,   0,      0];

        nspaste( el, { //need deep copy
            //:basic topics
            proof,
            given,
            result,
            hidden,
            curveIF             : given,
            curveCIF            : given,
            curveIFC            : given,
            curveIFCleft        : given,
            curveCircle         : given,
            curveLeftCircle     : given,
            curveRightCircle    : given,
            curveParabola       : given,
            curvatureCircle     : result,
        });
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        //model's spacial unit in pixels of the picture:
        var mod2med = 1000;

        ns.paste( sconf, {
            mediaBgImage : "lemma-theoremII-corollary1.jpg",
            medposOfModOrigin_x,
            medposOfModOrigin_y,
            medWidth,
            medHeight,
            mod2med,
            default_tp_stroke_width : 12,
        });
}}})}