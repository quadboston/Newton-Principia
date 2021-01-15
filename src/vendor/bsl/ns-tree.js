// For b$l framework, creates and exports namespace tree
// variables ("placeholders") and useful functions.

( function() {
    var ns          = window.b$l;
    ns.nstree       = nstree;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var cssp        = ns.CSS_PREFIX;
    var nsmethods   = sn('methods');
    var html        = sn('html');
    var bezier      = sn('bezier');
    var mat         = sn('mat');
    var sv          = sn('svg');
    var dpdec       = sn('drag-point-decorator');
    var d8d_p       = sn('d8d-point');
    return;






    function nstree()
    {
        var ret =
        {
            ns,

            //:frequent functions
            sn,
            $$,
            own         : ns.own,
            haz         : ns.haz,
            has         : ns.h,
            haf         : ns.haf,
            haff        : ns.haff,
            han         : ns.han,
            globalCss   : ns.globalCss,
            url2conf    : ns.url2conf,
            eachprop    : ns.eachprop,
            paste       : ns.paste,           //todm: remove
            nspaste     : ns.paste,

            cssp,
            nsmethods,
            html,
            bezier,
            mat,
            dpdec,
            sv,
            d8d_p,
        };
        return ret;
    }

}) ();

