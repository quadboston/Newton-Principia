
( function() {
    var { ns, fconf, sconf } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;









    ///====================================================
    /// inits and sets config pars
    ///====================================================
    function init_conf()
    {
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 839;
        var pictureHeight = 563;

        var originX_onPicture = 140;
        var originY_onPicture = 61;

        //-----------------------------------
        // //\\ topic group colors,
        //      todm: possibly proliferation
        //-----------------------------------
        var predefinedTopics =
        {
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints =
        {
        };

        ///alternatively to this, you can set own colors for originalPoints
        ///by your own
        ns.eachprop( originalPoints, (point,pname) => {
            point.pcolor = ns.haz( point, 'pcolor' ) || predefinedTopics[ pname ];
        });

        //model's spacial unit in pixels of the picture:
        var mod2inn_scale = 1;

        var lines =
        {
        };

        ns.paste( sconf, {
            predefinedTopics,
            originalPoints,
            lines,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
            
            default_tp_stroke_width : 12,
        });
    }
}) ();

