{const{
    sn, apush, mat, eachprop, nspaste, tpelect,
    CONST, sf, amode, rg, stdMod, ssF, gshapes,
}=window.b$l.atree();

const { ANGLE, CURVE } = CONST;
const op=sn( 'orbitParameters', sf );
const el=tpelect;


ssF.init_conf_shapes=function( {forceStart, B, V} ){
    apush( gshapes, [
    {
        kind: ANGLE,
        rgn: 'rays-angle-fi', //todm automate this name:
        vertex_id: 'fi',
        vertexTwin_rgn: 'C',
        ABString: 'CV',
        CDString: 'CX',
        pcolor: [0,0,0,0.05],
        cssClass: 'tofill',
        ANGLE_SIZE_eval: '2*rg.V.pos[1]',
        angleCaption: 'φ',
        captionRadiusIncrease: 1.02,
    },
    {
        rgn: 'rays-angle-XCY', //todm automate this name:
        vertex_id: 'XCY',
        vertexTwin_rgn: 'C',
        ABString: 'CX',
        CDString: 'CY',
        pcolor: [0,0,0,0.05],
        cssClass: 'tofill',
        ANGLE_SIZE_eval: '2*rg.V.pos[1]',
        angleCaption: '',
    },
    {
        kind: CURVE,
        rgn: 'force',
        cpivots: [
            forceStart,
            B,
            [467,69],
            [484,147],
            [516, 245],

            [579, 347],

            [657,412],
        ].map( (pivot,ix) => ({
            medpos      : pivot,
            pcolor      : el.force,
            letterAngle : 45,
            draggableX  : true,
            draggableY  : true,
            doPaintPname : false,
        })),
        initShapes: (gshape, rgn)=>{
            rg[rgn].gshape2svg = ()=>{
                stdMod.pivotsDivDif_2_curve8svg({ rgn });
            };
            rg[rgn].cpivots_initial = nspaste( {},
                rg[rgn].cpivots );
            //this sub is half-standardized: it is not in
            //src/base, but
            //apparently similar to what is in many lemmas,
            stdMod.completesSlidersCreation(); //in-diagram sliders

            let omega = Math.sin( op.angleOmega );
            let vv = [
                //"-" bs x and y swapped in media-model
                -op.Kepler_v * omega,
                op.Kepler_v * Math.cos( op.angleOmega )
            ];
            //initial speed
            nspaste( rg.v.pos, mat.sm( rg.V.pos, vv ) );
        },
        resetsLesson: (gshape, rgn)=>{
            const { logic_phase, aspect, subessay } = amode;
            {
                ////restores original pivots positions
                let ini = rg[rgn].cpivots_initial;
                rg[rgn].cpivots.forEach( (cp,ix) => {
                    nspaste( cp.rgX.pos, ini[ix].rgX.pos );
                });
                //sets and paints initial orbit
                stdMod.pivotsDivDif_2_curve8svg({ rgn });
            }
            op.angleOmega = op.angleOmega_initial;
            op.Kepler_v   = op.Kepler_v_initial;
        },
    },
    ]);
}}