
( function() {
    var {
        ns, fconf, sconf,
        sDomN, //for patch
    } =
    window.b$l.apptree({ ssFExportList : { init_conf } });
    return;









    ///====================================================
    /// inits and sets config pars
    ///====================================================
    function init_conf()
    {
        //-------------------------------------------------
        // //\\ modifying fconf
        //-------------------------------------------------
        fconf.ESSAY_FRACTION_IN_WORKPANE            = 0.9;
        fconf.appDecor.helpButtonCaption            = '';

        //todm: this disables functionality ... not only CSS:
        fconf.appDecor.helpBox_opacity0             = true;
        fconf.appDecor.idleHelpButtonTooltip        = '';

        //setting this to "false" does hide slider
        //decoration spinning arrows
        fconf.NAVIGATION_DECORATIONS_ALWAYS_VISIBLE = false;


        //todm: the site css runs before this module,
        //      so some settings are skipped here,
        //      patch:
        ns.globalCss.update(
            `
                .top-media-controls .help-box {
                    opacity : 0;
                }
            `,
            'help-box-patch'
        );
        //-------------------------------------------------
        // \\// modifying fconf
        //-------------------------------------------------


        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.mediaMoverPointDisabled   = true;
        sconf.enableStudylab            = false;
        sconf.enableTools               = false;
        sconf.GENERIC_SLIDERS_COUNT     = 0;
        sconf.SLIDERS_LEGEND_HEIGHT     = 0;
        //====================================================
        // \\// subapp regim switches
        //====================================================


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
            mediaBgImage : "main-picture.png",
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

