// For b$l framework, creates and exports namespace tree
// variables ("placeholders") and useful functions.

( function() {
    var ns          = window.b$l;
    ns.nstree       = nstree;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var cssp        = ns.CSS_PREFIX;
    //won't work: if forgotten to place in
    //essential part: var d8d         = ns.d8d;
    var nsheap      = sn('heap');
    var nsmethods   = sn('methods');
    var plugins     = sn('plugins');
    var html        = sn('html');
    var bezier      = sn('bezier');
    var mat         = sn('mat');
    var chemistry   = sn('chemistry');
    var sv          = sn('svg');
    var nssvg       = sn('svg');
    var dpdec       = sn('drag-point-decorator');
    var d8d_p       = sn('d8d-point');
    var tframes     = sn('tframes');
    return;






    function nstree()
    {
        //do this first:
        // var ret = Object( {}, ns );
        var ret =
        {
            ns,
            nsd : ns.d,

            //:frequent functions
            sn,
            $$,
            own         : ns.own,
            haz         : ns.haz,
            hazz        : ns.hazz,
            ha          : ns.ha,
            has         : ns.h,
            haf         : ns.haf,
            hafa        : ns.hafa,
            haff        : ns.haff,
            hafff       : ns.hafff,
            hafb        : ns.hafb,
            han         : ns.han,
            globalCss   : ns.globalCss,
            url2conf    : ns.url2conf,
            eachprop    : ns.eachprop,
            mapp        : ns.mapp,
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
            chemistry,
            dpdec,
            sv,
            nssvg,
            d8d_p,
            plugins,
            tframes,
        };
        return ret;
    }

}) ();

