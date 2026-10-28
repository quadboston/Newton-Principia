{
    const { ns, tpelect, fconf, sconf, sf } =
        window.b$l.atree({ ssFList : { init_conf } });

    function init_conf(){
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
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.mediaMover_isDisabled   = true;
        //====================================================
        // \\// subapp regim switches
        //====================================================
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        sf.medWidth = 839;
        sf.medHeight = 563;
    }
}