{const{
    sn, apush, tpelect, CONST, sf, ssF, gshapes,
}=window.b$l.atree();
const el=tpelect;

ssF.init_conf_lines=function(){
    apush( gshapes, [
    {
        kind: CONST.LINE,
        rgn: 'V,v',
        pcolor : el.body,
        vectorTipIx : 1,
    },
    {
        rgn: 'VM',
        pcolor: el.body, //[100,  0, 20, 0.01, 1],
        vectorTipIx: 1,
    },
    {
        rgn: 'IZ',
        pcolor: el.Zgraph, //[100,  0, 20, 0.01,  1],
        vectorTipIx: 1
    },
    /*
    {
        rgn: 'V,Vangle',
        pcolor: body,
    },
    */
    {
        rgn: 'CV',
        pcolor: el.ro,
    },
    {
        rgn: 'Dc',
        pcolor: el.Fkernel,
    },
    {
        rgn: 'Db',
        pcolor: el.Tkernel,
    },
    {
        rgn: 'Ex',
        pcolor : el.Fkernel,
    },
    {
        rgn: 'Ez',
        pcolor: el.Tkernel,
    },
    {
        rgn: 'Va',
        pcolor: el.Fkernel,
    },
    {
        rgn: 'VA',
        pcolor: el.shadow,
    },
    {
        rgn: 'AB',
        pcolor: el.shadow,
    },
    {
        rgn: 'CA',
        pcolor: el.ro,
    },
    {
        rgn: 'CX',
        pcolor: [50,  50,  50,    1] //shadow,
    },
    {
        rgn: 'CY',
        pcolor: el.shadow,
    },
    {
        rgn: 'CI',
        pcolor: el.ro,
        vectorTipIx: 1
    },
    {
        rgn: 'IN',
        pcolor: el.ro,
    },
    {
        rgn: 'CD',
        pcolor: el.ro,
    },
    {
        rgn: 'DF',
        pcolor: el.force,
    }]);
}}