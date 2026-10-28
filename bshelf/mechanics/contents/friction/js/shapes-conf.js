{const{
    sn, arrover, nssvg, apush, mat, eachprop, nspaste, tpelect,
    CONST, sf, amode, rg, stdMod, ssF, gshapes,
}=window.b$l.atree();

const { ANGLE, CURVE, GRAPH } = CONST;
const el=tpelect;


ssF.init_conf_shapes=function(){
    apush( gshapes, [
    {
        kind: CONST.SHAPE,
        rgn: 'borbit',
    },
    //------------------------------------
    // //\\ path line
    //------------------------------------
    {
        kind: CONST.POINT,
        rgn: 'borbit-start',
        undisplayAlways: true,
        doPaintPname : false,
    },
    {
        kind: CONST.POINT,
        rgn: 'borbit-end',
        undisplayAlways: true,
        doPaintPname : false,
    },
    {
        kind: CONST.LINE,
        rgn: 'borbit-start,borbit-end',
        caption: 'path',
        lposYSugar: -2,
        pcolor: el.borbit,
        fldo: 'solvable_orbit',
        cssClass: 'tp-borbit flcs--solvable_orbit' +
            ' logic_phase--off-phenomena logic_phase--off-problem',
    },
    //------------------------------------
    // \\// path line
    //------------------------------------

    {
        kind: CONST.GRAPH,
        rgn: 'graph',
        cssClass: 'flcs--solvable_orbit' +
            ' logic_phase--off-phenomena logic_phase--off-problem',
    },
    {
        kind: CONST.SHAPE,
        rgn: 'body',
        pcolor: arrover( el.body, [,,, 0.3] ),
        cssClass: 'logic_phase--solution logic_phase--problem',
        gshape2svg: (gs) => {
            const w = sf.BODY_SIZE[0] / 2;
            const h = sf.BODY_SIZE[1] / 2;
            const x = rg.c.pos[0];
            const y = rg.c.pos[1];
            nssvg.branch2svg(
                {
                    //rectangle
                    points:
                        [[x+w,y+h],[x-w,y+h],[x-w,y-h],[x+w,y-h]],
                    rgX: gs.rgShape,
                    svgel: gs.rgShape.svgel,
                    parent: stdMod.medScene,
                    type: 'polyline',
                    'class': gs.cssClass,
                    //style: { fill:},
                    // //\\ low precedence styles:
                    stroke: gs.rgShape.pcolor,
                    fill: gs.rgShape.pcolor,
                    // \\// low precedence styles:
                },
                !!'doClose',
            );
        }
    },
    {
        ////configures ground base with vertical color gradient,
        ////the body does rest on this base,
        kind: CONST.SHAPE,
        rgn: 'base',
        cssClass: 'logic_phase--solution logic_phase--problem',
        initShapes: (gshape, rgn) => {
            nssvg.creates_multiStopGrad({
                svgRoot:stdMod.medScene,
                gradId: rgn+'-grad',
                stops: [
                    {
                        color:'#bbbbbb',
                        offset:0,
                        x:0,
                        y:0,
                    },
                    {
                        color:'#ffffff',
                        offset:100,
                        x:0,
                        y:100,
                    },
                ],
            });
        },
        gshape2svg: (gs) => {
            const h = sf.BODY_SIZE[1] / 2;
            const width = sf.medWidth/sf.mod2med;
            const height = 0.5;
            const x = rg.c.pos[0];
            const y = rg.c.pos[1];
            const fill = 'url(#' + gs.rgn + '-grad' + ')';
            nssvg.branch2svg(
                {
                    //rectangle
                    points:
                        [[0,y-h],
                         [width,y-h],
                         [width,y-h-height],
                         [0,y-h-height]],
                    rgX: gs.rgShape,
                    svgel: gs.rgShape.svgel,
                    parent: stdMod.medScene,
                    type: 'polyline',
                    'class': gs.rgShape?.svgel?.class ||
                             gs.rgShape.cssClass,
                    //className: gs.cssClass,
                    //style: { fill:},
                    // //\\ low precedence styles:
                    stroke: 'transparent', //gs.rgShape.pcolor,
                    fill,
                    // \\// low precedence styles:
                },
                !!'doClose',
            );
        }
    },
    ]);
}}
