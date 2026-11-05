(function(){
const {
    sn, nsmethods, stripp, apush, arrover, mat, eachprop, nspaste,
    haf, has, tprepo, tpelect, sf, rg, ssF, sDomF, gshapes, CONST,
    globalCss
    } = window.b$l.atree({ ssFList:{
        newPos_2_val8pos,
        slider_val2pos,
        slider_conf2boundary,
        conf__points2sliders,
    }});
const el=tpelect;
return;

//===============================
// //\\ appends sliders
//===============================
function conf__points2sliders(arg){ let {
        sliderPoints,
        SLIDER_SIZE_PER_HEIGHT,
        SLIDERS_OFFSET_PER_HEIGHT,
        SLIDER_START_PER_WIDTH,
        SLIDER_END_PER_WIDTH,
    }=stripp(arg);
    SLIDERS_OFFSET_PER_HEIGHT = SLIDERS_OFFSET_PER_HEIGHT || 0.96;
    SLIDER_SIZE_PER_HEIGHT = SLIDER_SIZE_PER_HEIGHT || 0.07;
    SLIDER_START_PER_WIDTH = SLIDER_START_PER_WIDTH || 0.1;
    SLIDER_END_PER_WIDTH = SLIDER_END_PER_WIDTH || 0.7;

    //extends sliderPoints "inside" and "outside"
    const sliders = [];
    // //\\ extends basic shapes, sliderPoints, "inside"
    sliderPoints.forEach( (gs_origin,ix) => {
      gs_origin.kind = CONST.POINT;
      ///modifying basic definitor, f.e. "t"
      sliders[ix] = Object.assign( gs_origin, {
        cssClass: 'tp-' + sDomF.rgid2low(gs_origin.rgn) +
            ' ' + gs_origin.cssClass,
        medpos: [0, sf.medHeight *
            (SLIDERS_OFFSET_PER_HEIGHT - ix*SLIDER_SIZE_PER_HEIGHT)],
        draggableX: has( gs_origin, 'draggableX' ) ?
            gs_origin.draggableX : true,
        draggableY: has( gs_origin, 'draggableY' ) ?
            gs_origin.draggableY : false,
        doPaintPname: true,
        letterAngle: has( gs_origin, 'letterAngle' ) ?
                        gs_origin.letterAngle : 90,
        letterRotRadius: has( gs_origin, 'letterRotRadius' ) ?
                        gs_origin.letterRotRadius : 20,
        unscalable: !gs_origin.nonInLegendSlider,
        initShapes: (gs, rgn)=>{
            const rgShape = rg[rgn];
            ssF.slider_conf2boundary({rgn, gs});

            //missed when acceptPos is custom
            rgShape.val = gs.gconf.val;
            rgShape.slider_val2railsModQ = function( value ){
                return slider_val2railsModQ({value, gs});
            };
            ssF.slider_val2pos({rgShape, gs});
            rgShape.slider_val2pos=()=>{
                //gs_origin is for ranges c onf
                ssF.slider_val2pos({rgShape, gs});
            }
            rgShape.acceptPos = gs_origin.acceptPos || (
                ( newPos, dragMove ) => {
                    ssF.newPos_2_val8pos({newPos, rgn, gs});
                    return true;
                });
            if( gs_origin.animateDuration_flg ){
              ////adding props to basic rgX
              rgShape.animDuration = gs_origin.animateDuration_flg;
              rgShape.cbDownMoveUp_III__from_emulator = function(farg){
                ssF.cbDownMoveUp_III__from_emulator({
                  down_move_up: farg.down_move_up,
                  scaledMove: farg.scaledMove,
                  pointWrap: rgShape,
                });
              };
            }
            if( has( gs_origin, 'afterInitShapes' ) ){
                //for case if initShapes is preset before
                haf( gs_origin, 'afterInitShapes' )(gs_origin);
            }
        },
        gshape2svg: gs => {
            //core slider svg points override
            // *.caption with gs.c onf.caption
            const rgShape = gs.rgShape;
            //gs_origin
            if( typeof gs.gconf.caption === 'function' ){
                rgShape.caption = gs.gconf.caption(
                    rgShape.val,
                    gs.gconf.unit
                );
            } else {
                rgShape.caption = gs.gconf.caption +
                ' = ' + rgShape.val.toFixed(2) +
                ' ' + gs.gconf.unit;
            }
        },
      });//Object.assign
    }); //forEach
    // \\// extends basic shapes, sliderPoints, "inside"

    const rulers = [];
    sliders.forEach( (elem,ix) => {
        if( elem.nonInLegendSlider ) return;
        rulers.push({
            kind: CONST.LINE,
            rgn: elem.rgn + '-start,' + elem.rgn + '-end',
            cssClass: elem.cssClass,
        });
    });
    sliders.forEach( (elem,ix) => {
        if( !elem.nonInLegendSlider ) {
            rulers.push({
                kind: CONST.POINT,
                rgn: elem.rgn + '-start',
                pcolor: elem.pcolor,
                medpos: [ sf.medWidth * SLIDER_START_PER_WIDTH,
                    elem.medpos[1] ],
                doPaintPname: false,
                undisplayAlways: true,
                unscalable: true,
                cssClass: elem.cssClass,
            });
            rulers.push({
                rgn: elem.rgn + '-end',
                pcolor: elem.pcolor,
                medpos: [ sf.medWidth * SLIDER_END_PER_WIDTH,
                    elem.medpos[1] ],
                doPaintPname: false,
                undisplayAlways: true,
                unscalable: true,
                cssClass: elem.cssClass,
            });
        }
        ///well, this should be undone to do animation
        ///even for non-ruler sliders:
        if( elem.nonInLegendSlider ) return;

        if( elem.animateDuration_flg ){
            ////the anim. scenario:
            ////  gs ...-run is set up here ->
            ////  rgn[...-run] created -> in global init_sapp, event
            ////  ssF.startForwardAnimation attached to dom '...-run'
            ////adding props to appended difinitor
            const animRun = nspaste( {}, rulers[ rulers.length-1 ] );
            animRun.rgn = elem.rgn + '-run';
            animRun.medpos[0] += sf.medWidth *
                0.05; //todm: generalize
            animRun.doPaintPname = true;
            //animRun.cssClass += ' '  + // + elem.animateDuration_flg;
            //    nsmethods.camelName2cssName(elem.rgn);
            //will be not extended:
            //animRun.animDuration = elem.animateDuration_flg+10;
            animRun.undisplayAlways = true;
            animRun.caption = '<text> ▶ </text>';
            //non consistent, but effective: using rg in config code:
            const rgRun = sn( animRun.rgn, rg );
            const rgBase = sn( elem.rgn, rg );
            rgRun.labelClickHandler = _=>{
                ssF.startForwardAnimation(
                    rgBase.rgn,
                    rgBase.animDuration
                );
            };
            animRun.initShapes = (gs, rgn)=>{
                ////we use rgX expanded in expands-config-lib.js
                const rgX = rg[rgn];
                const fontSizeHover = Math.ceil(rgX.fontSize*1.5);
                const csstxt = `text.tp-${animRun.rgn}:hover {
                    font-size: ${fontSizeHover}px !important;
                    cursor: pointer !important;
                }`;
                globalCss.add8update( csstxt, 'anim-sliders' );
            };
            rulers.push( animRun );
        }
    });
    apush( gshapes, rulers.concat(sliders) );
}
//===============================
// \\// appends sliders
//===============================

//===============================
// //\\ sliders lib
//===============================
function newPos_2_val8pos({newPos, rgn, gs}){
    const rgShape = rg[rgn];
    let dX = gs.draggableX;
    let dY = gs.draggableY;
    if( !dX && !dY ){
        dX = true;
        ////nothing is set, assum linear slider along X
        newPos[1] = rgShape.pos[1];
    } else {
        !dX && ( newPos[0] = rgShape.pos[0] );
        !dY && ( newPos[1] = rgShape.pos[1] );
    }
    ///todo make 2d:
    if( dX  ){
        newPos[0] = Math.max( gs.modleft,
            Math.min( gs.modright, newPos[0] ) );
    }
    ///todo make 2d:
    rgShape.val = gs.valleft + gs.valrange *
        (newPos[0] - gs.modleft) * gs.modrange1;
}
///todm should be generalized to set 2d pos or
///pos on the curve
function slider_val2pos({rgShape, gs}){
    rgShape.pos[0] = slider_val2railsModQ({value:rgShape.val, gs});
}
///at given version, q means q=== pos[0]
function slider_val2railsModQ({value, gs}){
    return gs.modleft + gs.modrange *
           (value - gs.valleft) * gs.valrange1;
}
function slider_conf2boundary ({rgn, gs}) {
    if( gs.nonInLegendSlider ) return;
    gs.modleft = rg[ rgn + '-start'].pos[0];
    gs.modright = rg[ rgn + '-end'].pos[0];
    gs.valleft = gs.gconf.min;
    gs.valright = gs.gconf.max;
    gs.modrange = gs.modright - gs.modleft;
    gs.valrange = gs.valright - gs.valleft;
    gs.modrange1 = 1/gs.modrange;
    gs.valrange1 = 1/gs.valrange;
}
//===============================
// \\// sliders lib
//===============================
})();