{
    const{
        sn, apush, nspaste, tpelect, CONST, sf, ssF, gshapes,
    } = window.b$l.atree();
const el = tpelect;

ssF.init_conf_lines=function(){
    const {
        proof,attention,proofHidden,body,given,force,resultingOrbit,
        latusR,latusRgiven,result,context,
    }=el;
    apush( gshapes, [
    {
        kind: CONST.LINE,
        rgn: 'PH',
        pcolor: proof,
        vectorTipIx: 0,
        cssClass: 'logic_phase--proof subessay--corollary1',
    },
    {
        rgn: 'PK',
        pcolor: attention,
        cssClass: 'logic_phase--proof subessay--corollary1',
    },
    {
        rgn: 'SK',
        pcolor: proof,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'BH',
        pcolor: proof,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'SY',
        pcolor: proofHidden,
        captionShiftNorm: -28,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'S,Ys',
        pcolor: proofHidden,
        captionShiftNorm: -28,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'PY',
        pcolor: body,
        cssClass: 'logic_phase--claim',
    },
    {
        rgn: 'CS',
        pcolor: proof,
        cssClass: 'logic_phase--latin aspect--addendum',
    },
    {
        rgn: 'CH',
        pcolor: proof,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'P,omegaHandle',
        pcolor: context,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'ZR',
        pcolor: body,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'PR',
        pcolor: body,
        'stroke-width': 2,
        captionShiftNorm: -18,
        cssClass: 'logic_phase--none',
    },
    {
        rgn: 'P,vb',
        pcolor: body,
        'stroke-width': 2,
        captionShiftNorm: -18,
        vectorTipIx: 1,
        cssClass: 'tp-_p_r',
    },
    {
        rgn: 'p,vSample',
        pcolor: given, 'stroke-width': 1.1,
        captionShiftNorm: -18,
        vectorTipIx: 1
    },
    {
        rgn: 'p,f',
        pcolor: force,
        'stroke-width': 1.1,
        captionShiftNorm: -18,
        vectorTipIx: 1,
    },
    {
        rgn: 'DS',
        pcolor: proof,
                cssClass: 'logic_phase--corollary',
    },
    {
        rgn: 'SD',
        pcolor: proof,
                cssClass: 'logic_phase--none',
    },
    {
        rgn: 'DH',
        pcolor: resultingOrbit,
        cssClass: 'logic_phase--corollary',
    },
    {
        rgn: 'CB',
        pcolor: resultingOrbit,
        cssClass: 'logic_phase--proof',
    },
    {
        rgn: 'L,LL',
        pcolor: latusR,
        captionShiftNorm: 22,
        lposYSugar: 3,
        cssClass: 'logic_phase--proof subessay--corollary2',
    },
    {
        rgn: 'l,ll',
        pcolor: latusRgiven,
        captionShiftNorm: 44,
        lposYSugar: -5,
        cssClass: 'logic_phase--proof aspect--addendum',
    },
    {
        rgn: 'SP',
        pcolor: body,
        vectorTipIx: 1,
    },
    {
        rgn: 'Sp',
        pcolor: given,
        'stroke-width': 1.1,
        captionShiftNorm: -18,
        vectorTipIx: 1,
        cssClass: 'subessay--self-test logic_phase--claim',
    },
    //to comply p12
    {
        rgn: 'Tu',
        pcolor: proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'u,VV',
        pcolor: proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'uP',
        pcolor: proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'P,VV',
        pcolor: proof,
        cssClass: 'subessay--none',
    },
    {
        rgn: 'ZetaStart,ZetaEnd',
        pcolor: result,
        cssClass: 'logic_phase--proof',
    },
    ]);
}}