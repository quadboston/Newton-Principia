// For b$l framework, creates and exports namespace tree
// variables ("placeholders") and useful functions.
( function() {
    const ns        = window.b$l;
    const sn        = ns.sn;
    //simplifies adding test-modules designed for
    //master b$l application,
    const mat       = sn('mat');
    const fapp      = sn('fapp' );
    const fconf     = sn('fconf',fapp);
    const sconf     = sn('sconf',fconf);
    ns.nstree       = nstree;
    let ret = null;
    return;


    function nstree(){
        if( ret !== null ) return ret;

        //do this first:
        // var ret = Object( {}, ns );

        //why this function cannot be passed?:
        //let ow = Object.prototype.hasOwnProperty.call;

        let ow = Object.prototype.hasOwnProperty;
        ret = {
            ow          : function( ob, prop ) { return ow.call( ob, prop ); },
            ns,
            nsd         : ns.d,

            //:frequent functions
            sn,
            $$          : ns.$$,
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
            sv          : sn('svg'),
            nssvg       : sn('svg'),
            d8dp        : sn( 'd8dp' ),
            plugins     : sn('plugins'),
            tframes     : sn('tframes'),
 
            fapp,
            fconf,
            sconf,
            sf          : sconf, //just providing a shorter name,
            nsconf      : sn( 'conf' ),
        };
        return ret;
    }
})();
