{
const {
        ns, tpelect, fconf, sconf, stripp,
    } = window.b$l.atree({ ssFList: { init_conf } });

function init_conf(){
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
    sconf.mediaMover_isDisabled   = true;
    sconf.enableStudylab            = false;
    sconf.enableTools               = false;
    sconf.SLIDERS_LEGEND_HEIGHT     = 0;
    //====================================================
    // \\// subapp regim switches
    //====================================================
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    var medWidth = 839;
    var medHeight = 563;

    var medposOfModOrigin_x = 140;
    var medposOfModOrigin_y = 61;

    //model's spacial unit in pixels of the picture:
    var mod2med = 1;
    ns.paste( sconf, {
        medposOfModOrigin_x,
        medposOfModOrigin_y,
        medWidth,
        medHeight,
        mod2med,
        default_tp_stroke_width : 12,
    });
}
}