{const{
    sn, apush, tpelect, CONST, sf, ssF, gshapes,
}=window.b$l.atree();
const el=tpelect;

ssF.init_conf_points=function({ V, A, D, E, R, k }){
    apush( gshapes, [
    {
        kind: CONST.POINT,
        rgn: 'nonSolvablePoint',
        medpos: [666,444], //will be calculated
        caption : 'Force is out of considered range.',
        fontSize : '20',
        pcolor : el.invalid,
        letterAngle : 90,
    },
    {
        rgn: 'C',
        pcolor : el.ro,
        letterAngle : -90,
    },
    //-------------------------
    // //\\ given
    //-------------------------
    {
        rgn: 'V',
        medpos : V,
        pcolor : el.ro,
        letterAngle : 140,
        letterRotRadius : 20,
    },

    // //\\ speed
    {
        rgn: 'v',
        caption: 'v',
        pcolor: el.body,
        letterAngle : 120,
        draggableX: true,
        draggableY: true,
    },
    {
        rgn: 'M',
        medpos: V, //sets model's pos[0]
        caption: '',
        pcolor: el.body,
    },
    /*
    {
        //todm do we need this? in addendum?
        rgn: 'Vangle',
        caption: 'ω',
        pcolor: body,
        letterAngle: 120,
        //draggableX: true,
        //draggableY: true,
        undisplayAlways : true,
        doPaintPname : false,
    },
    */
    //-------------------------
    // \\// speed
    // \\// given
    //-------------------------
    {
        rgn: 'A',
        caption: 'Drop point, A',
        medpos: A,
        pcolor: el.ro,
        letterAngle: 180,
        letterShift: [-120,-5],
    },
    {
        rgn: 'vgpoint',
        caption: 'v',
        medpos: A,
        //no effect: pcolor : tpelect.vgpoint,
        letterAngle: 45,
    },
    {
        rgn: 'Zgpoint',
        caption: 'Z',
        medpos: A,
        //pcolor : Zgraph,
        letterAngle: 45,
    },
    {
        rgn: 'Z',
        caption: '',
        pcolor: el.body,
    },
    {   rgn: 'B',
        caption: 'B',
        pcolor: el.force,
        letterAngle: -45,
    },
    {
        rgn: 'F',
        caption: 'F, ~dv²/dρ',
        pcolor: el.force,
        letterAngle: -45,
        cssClass : 'tostroke',
    },
    {
        rgn: 'D',
        medpos: D,
        pcolor: el.ro,
        letterAngle: 45,
        draggableY: true,
    },
    {
        rgn: 'E',
        medpos: E,
        pcolor: el.ro,
        letterAngle: 45,
    },
    {
        rgn: 'N',
        pcolor: el.shadow,
        letterAngle: 150,
    },
    {
        rgn: 'I',
        pcolor: el.body,
        letterAngle: 150,
    },
    {
        rgn: 'K',
        pcolor: el.body,
        letterAngle: 150,
    },
    {
        rgn: 'X',
        pcolor: el.shadow,
        letterAngle: 120,
    },
    {
        rgn: 'Y',
        pcolor: el.shadow,
        letterAngle: 120,
    },
    {
        rgn: 'R',
        medpos: R,
        pcolor: el.shadow,
        letterAngle: 180,
        cssClass: 'aspect--off-addendum',
    },
    {
        rgn: 'a',
        caption: '𝑎',
        pcolor: el.Fkernel,
        letterAngle: 120,
    },
    {
        rgn: 'b',
        caption: '𝑏, ~dt/dρ',
        pcolor: el.Tkernel,
        letterAngle: 120,
    },
    {
        rgn: 'c',
        caption: '𝑐, ~dφ/dρ',
        pcolor: el.Fkernel,
        letterAngle : 45,
    },
    {
        rgn: 'k',
        caption: '𝑘',
        medpos: k,
        pcolor: el.body,
        letterAngle: 120,
    },
    {
        rgn: 'x',
        caption: '𝑥',
        pcolor: el.Fkernel,
        letterAngle: 45,
    },
    {
        rgn: 'z',
        caption: '𝑧',
        pcolor: el.Tkernel,
        letterAngle: 120,
    },
    ].map( pt=>{
        pt.letterRotRadius = 20;
        return pt;
    }));
}}