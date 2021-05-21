// For b$l framework, creates and exports namespace tree
// variables ("placeholders") and useful functions.

( function() {
    var ns          = window.b$l;
    ns.nstree       = nstree;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var cssp        = ns.CSS_PREFIX;
    var nsheap      = sn('heap');
    var nsmethods   = sn('methods');
    var plugins     = sn('plugins');
    var html        = sn('html');
    var bezier      = sn('bezier');
    var mat         = sn('mat');
    var sv          = sn('svg');
    var nssvg       = sn('svg');
    var dpdec       = sn('drag-point-decorator');
    var d8d_p       = sn('d8d-point');
    return;






    function nstree()
    {
        var ret =
        {
            ns,
            nsd : ns.d,

            //:frequent functions
            sn,
            $$,
            own         : ns.own,
            haz         : ns.haz,
            ha          : ns.ha,
            has         : ns.h,
            haf         : ns.haf,
            haff        : ns.haff,
            hafb        : ns.hafb,
            han         : ns.han,
            globalCss   : ns.globalCss,
            url2conf    : ns.url2conf,
            eachprop    : ns.eachprop,
            paste       : ns.paste,           //todm: remove
            nspaste     : ns.paste,
            clonetree   : ns.clonetree,
            svgNS       : ns.svgNS,

            cssp,
            nsheap,
            nsmethods,
            html,
            bezier,
            mat,
            dpdec,
            sv,
            nssvg,
            d8d_p,
            plugins,
        };
        return ret;
    }

}) ();

