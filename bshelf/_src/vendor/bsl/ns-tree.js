// For b$l framework, creates and exports namespace tree
// variables ("placeholders") and useful functions.
(function() {

const ns        = window.b$l;
const sn        = ns.sn;
//simplifies adding test-modules designed for
//master b$l application,
const mat       = sn('mat');
ns.nstree       = nstree;
let ret = null;
return;


function nstree(){
    if( ret !== null ) return ret;
    //do this first:
    // var ret = Object( {}, ns );

    //why this function cannot be passed?:
    //let ow = Object.prototype.hasOwnProperty.call;

    //pushes an array pusher to pushee arr
    //fails: Array.prototype.push.apply,
    ns.apush = function( arr, pusher ) {
        arr.push.apply( arr, pusher )
    };

    let ow = Object.prototype.hasOwnProperty;
    ret = {
        __proto__:null,
        ow          : function( ob, prop ) { return ow.call( ob, prop ); },
        ns,
        nsd         : ns.d,

        //:frequent functions
        sn,
        $$          : ns.$$,
        haz         : ns.haz,
        hob         : ns.hob,
        hazz        : ns.hazz,
        ha          : ns.ha,
        has         : ns.has,
        haf         : ns.haf,
        hafa        : ns.hafa,
        haff        : ns.haff,
        hafff       : ns.hafff,
        hafb        : ns.hafb,
        han         : ns.han,
        stripp  : ns.stripp,
        globalCss   : ns.globalCss,
        url2conf    : ns.url2conf,
        eachprop    : ns.eachprop,
        mapp        : ns.mapp,
        paste       : ns.paste,           //todm: remove
        nspaste     : ns.paste,
        arrover     : ns.arrover,
        clonetree   : ns.clonetree,
        svgNS       : ns.svgNS,
        objpath2value : ns.objpath2value,

        cssp        : ns.CSS_PREFIX,
        nsheap      : sn('heap'),
        nsmethods   : sn('methods'),
        html        : sn('html'),
        bezier      : sn('bezier'),
        mat,
        mcurve      : sn( 'mcurve', mat ),
        integral    : sn( 'integral', mat ),
        chemistry   : sn('chemistry'),
        dpdec       : sn('drag-point-decorator'),
        nssvg       : sn('svg'),
        d8dp        : sn( 'd8dp' ),
        plugins     : sn('plugins'),
        tframes     : sn('tframes'),

        fapp        : ns.fapp,
        sapp        : ns.sapp,
        fconf       : ns.fconf,
        sconf       : ns.sconf,
        sf          : ns.sconf, //just providing shorter alias,
        apush       : ns.apush,
    };
    return ret;
}
})();
