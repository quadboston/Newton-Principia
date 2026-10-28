{const {
        sn, apush, tpelect, CONST, sf, ssF, gshapes, rg, nspaste,
        sDomF,
       } = window.b$l.atree();
const el=tpelect;


//units: https://en.wikipedia.org/wiki/International_System_of_Units
ssF.init_conf_points=function(){
    const BODY_Y = 0.4;
    const ALARM_Y = 0.5;
    apush( gshapes, [
    {
        kind: CONST.POINT,
        rgn: 'c', //center mass
        pcolor: el.borbit,
        medpos: [ 0, sf.medHeight * BODY_Y ],
        doPaintPname: false,
        cssClass: 'logic_phase--solution logic_phase--problem',
        gconf: {
            startpos: 0.1,
        },
    },
    {
        rgn: 'alarm',
        caption: 'Maximum friction Qₘₐₓ exceeds applied force F.',
        pcolor: el['friction-k'],
        medpos: [ sf.mod2med*0.1, sf.medHeight * ALARM_Y ],
        cssClass: 'flcs--off-solvable_orbit ' +
                  'logic_phase--off-phenomena logic_phase--off-problem',
        fontSize : '25',
    },
    ]);

    //===============================
    // //\\ sliders c onf
    //===============================
    ssF.conf__points2sliders({
        sliderPoints: [
        {
            rgn: 't',
            pcolor: el.time,
            cssClass:
                'tp-time flcs--solvable_orbit' +
                ' logic_phase--off-phenomena' +
                ' logic_phase--off-problem',
            animateDuration_flg: 5000,
            gconf:{
                caption: 'time, t',
                unit: 's',
                val: 1,
                min: 0.00001,
                max: 60,
            },
        },
        {
            rgn: 'm',
            pcolor: el.mass,
            cssClass: 'tp-mass logic_phase--solution',
            gconf: {
                caption: 'mass, m',
                unit: 'kg',
                val: 1,
                min: 0.01,
                max: 1.5,
            },
        },
        {
            rgn: 'F',
            pcolor: el['applied-force'],
            cssClass: 'tp-applied-force logic_phase--solution ' +
                      'logic_phase--problem',
            gconf:{
                caption: 'applied force, F',
                unit: 'N',
                val: 5,
                min: 0.01,
                max: 20,
            },
        },
        {
            rgn: 'k',
            pcolor: el['friction-k'],
            cssClass: 'tp-friction-k ' +
                      'logic_phase--solution logic_phase--problem',
            gconf:{
                caption: 'friction-coef., 𝑘',
                unit: '',
                val: 0.3,
                min: 0.00000001,
                max: 1,
            },
        },
    ]});
    //===============================
    // \\// sliders c onf
    //===============================

    //===============================
    // //\\ vectors
    //===============================
    {
        const SHIFT_Y = sf.BODY_SIZE[1] * sf.mod2med / 2;
        ssF.conf__vectors({
            configVectors: [
            {
                rgn: 'Fv',
                caption: 'F',
                medpos: [ 0, sf.medHeight * BODY_Y - SHIFT_Y ],
                pcolor: el['applied-force'],
                cssClass: 'tp-applied-force ' +
                          'logic_phase--solution logic_phase--problem',
            },
            {
                rgn: 'Qv',
                caption: 'Q',
                medpos: [ 0, sf.medHeight * BODY_Y + SHIFT_Y ],
                pcolor: el['friction-force'],
                cssClass: 'tp-friction-force logic_phase--solution',
                letterAngle : 180,
            },
            {
                rgn: 'Rv',
                caption: 'R',
                medpos: [ 0, sf.medHeight * BODY_Y ],
                pcolor: el['result-force'],
                cssClass: 'tp-result-force ' +
                          'logic_phase--solution',
            },
            {
                rgn: 'Gv',
                caption: 'G',
                medpos: [ 0, 0 ], //placeholder
                pcolor: el['gravity-force'],
                letterAngle: -45,
                letterRotRadius: 15,
                cssClass: 'logic_phase--solution logic_phase--problem',
            },
            {
                rgn: 'Nv',
                caption: 'N',
                medpos: [ 0, 0 ], //placeholder
                pcolor: el['normal-force'],
                letterAngle: 45,
                letterRotRadius: 15,
                cssClass: 'logic_phase--solution',
            },
       ]});
    }
    //===============================
    // \\// vectors
    //===============================
 }}