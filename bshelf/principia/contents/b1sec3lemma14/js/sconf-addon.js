{
    const { //import from apptree
        ns,
        fconf,
        sconf,
    } = window.b$l.atree({ //export to apptree
        ssFExportList : { init_conf_addon }
    });

    function init_conf_addon()
    {
        sconf.mediaBgImage = "diagram.png";
    }
}