//expands sconf.js items into rg,
//"unifies" and normalizes items in rg,
(function(){
const {
        sn, ha, han, haz, has, eachprop, nsmethods, nspaste, apush,
        stripp, CONST, rg, sf, ssF, ssD, sDomF, tpelect,
        toreg, stdMod, gshapes,
    } = window.b$l.atree({ ssFList: {
        expandsPoint,
        expandsShapes,
        expandsLines,
        expands_gs,
    }});
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
const stripsExtraSpace = nsmethods.stripsExtraSpace;
const LETTER_ROTATION_RADIUS_PER_1000 = 30;
const LETTER_CENTER_X_PER_FONT_SIZE = 0.2;
const LETTER_CENTER_Y_PER_FONT_SIZE = 0.3;

const expandConf = sn( 'expandConf', ssD );
const { rgn2gs, gsLines, new_gshapes } = expandConf;
return;


function expandsPoint( op, rgn ){
    //during development, gradually will be replaced with medpos
    var pictureP    = op.medpos || op.pos;
    var modelP      = op.mpos;

    //at the moment for missing flag, doPaintPname === true,

    // //\\ todm: automate property transfer
    var doPaintPname = has( op, 'doPaintPname' ) ?
                       op.doPaintPname : true;
    var draggableX = has( op, 'draggableX' ) ? op.draggableX : false;
    var draggableY = has( op, 'draggableY' ) ? op.draggableY : false;
    // \\// todm: automate property transfer

    const MONITOR_Y_FLIP = -1 * sf.mod2med_scaleY;
    var pos = pictureP ?
        [ ( pictureP[0] - sf.medposOfModOrigin_x ) * sf.med2mod,
            ( pictureP[1] - sf.medposOfModOrigin_y ) *
            MONITOR_Y_FLIP * sf.med2mod,
        ] :
        [0,0];

    //creates rgShape or reuses existing one
    var rgShape =
        op.rgX = op.rgShape = //used in cpivots
            ssF.upd__pos_medpos_rgn2rgx({
                rgn, pos, caption : haz( op, 'caption' ),
        });

    //used for setting opaque colors,
    //used in lemma 1 and prop 1,
    rgShape.isPoint = true;
    //in some weird lemmas, rgShape.draggableX is defined
    //in sf.js, don't erase it:
    sn( 'draggableX', rgShape, draggableX );
    sn( 'draggableY', rgShape, draggableY );
    makesCssClass (op);
    rgShape.doPaintPname = doPaintPname;
    //----------------------------------------------
    // //\\ op.pcolor
    //      has priority over tpelect,
    //----------------------------------------------
    op.pcolor = op.pcolor || tpelect[ rgn ];
    if( has( op, 'pcolor' ) ) {
        //op color adds up to tpelect if missed in tpelect
        tpelect[ rgn ] = tpelect[ rgn ] || op.pcolor.concat();
        rgShape.pcolor = sDomF.rgn0arrc_2_rgba( op.pcolor );
        rgShape.opaqueColor = sDomF.rgn0arrc_2_rgba(
                            op.pcolor, !!'makeOpacity1' );
    } else {
        rgShape.pcolor = sDomF.rgn0arrc_2_rgba( rgn );
        rgShape.opaqueColor = sDomF.rgn0arrc_2_rgba(
                            rgn, !!'makeOpacity1' );
    }
    //----------------------------------------------
    // \\// op.pcolor
    //----------------------------------------------
    rgShape.undisplay = has( op, 'undisplay' ) ?
                    op.undisplay : false;
    //todm ... make it a stand-alone function to
    //facilitate
    //dynamic points creation ... to avoid extra declaration
    //----------------------------------------------------------
    // //\\ sets up point letters
    //----------------------------------------------------------
    var letterOffset = sf.estimatesSizeScale * (
        has( op, 'letterRotRadius' ) ?
        op.letterRotRadius :
        LETTER_ROTATION_RADIUS_PER_1000 );
    var fontSize = sf.estimatesSizeScale * (
        has( op, 'fontSize' ) ?
            op.fontSize :
            sf.LETTER_FONT_SIZE_PER_1000 );
    const captionConf = haz( op,'captionConf' ) || [];
    captionConf.forEach( cc => {
        cc.fontSize = cc.fontSize || op.fontSize;
    });
    rgShape.captionConf = captionConf;
    const letterShift = haz( op, 'letterShift' );
    if( letterShift ) {
        rgShape.letterOffsetX = letterShift[0];
        rgShape.letterOffsetY = letterShift[1];
    } else {
        var letterAngle     = has( op, 'letterAngle' ) ?
                                op.letterAngle : 0;
        var rad             = letterAngle / 180 * Math.PI;
        rgShape.letterOffsetX   = letterOffset * Math.cos( rad ) -
            fontSize*LETTER_CENTER_X_PER_FONT_SIZE;
        rgShape.letterOffsetY   = letterOffset * Math.sin( rad ) -
            fontSize*LETTER_CENTER_Y_PER_FONT_SIZE;
    }
    rgShape.letterOffsetY   *= -1; //for screen y-direction
    rgShape.letterColor = haz( op, 'letterColor' ) &&
        sDomF.rgn0arrc_2_rgba( op.letterColor );
    rgShape.fontSize = fontSize;
    //----------------------------------------------------------
    // \\// sets up point letters
    //----------------------------------------------------------
    [
        // //\\ dragging
        'hideD8Dpoint',
        'nospinner',
        'dragDecorColor',
        'DRAGGEE_HALF_SIZE',
        'dragDecorColor',

        'fill',
        'individual_zindex',
        //an extra "fake" disk over dragger,
        'noKernel',
        'doWhiteKernel',
        //for d8d machinery overlay
        'makeCentralDiskInvisible',
        // \\// dragging

        'notp',
        'undisplayAlways',
        'displayAlways',
        //initialR is simply a point-disk radius
        //before multiplication by initialR * sf.thickness,
        'initialR',
        'unscalable',
        'stroke-width', //scaleless per picture
    ].forEach( propname => {
        has(op,propname) && (rgShape[propname] = op[propname]);
    });
    [
        //'caption', //todm conflict with declare Geometric?
        'title',
        'hideCaption',
        'conditionalDrag',
        'style',
        'textLineTurn',
    ].forEach( propname => {
        rgShape[propname] = haz(op,propname);
    });
}

function expandsShapes(){
    const MONITOR_Y_FLIP = -1 * sf.mod2med_scaleY;
    const med2mod = 1/sf.mod2med;
    const factor = MONITOR_Y_FLIP * med2mod;
    for( var ii=0; ii<gshapes.length; ii++ ){
        const gs = gshapes[ii];
        const rgn = gs.rgn;

        //establishing rgShape
        const rgShape = gs.rgShape = sn( rgn, rg );

        //todo lemma4 patch
        gs.rgX = rgShape;

        rgShape.rgn = rgn;
        rgShape.gconf = gs.gconf;
        sn( 'initShapes', gs, _=>{} );
        makesCssClass (gs);

        //=======================================
        // //\\ pivot like
        //=======================================
        if( gs.cpivots ){
            ////we assume gshape is missed for each
            ////cpivot and we add new_gshapes here:
            ////and apush new_gshapes later to gshapes
            adds_rgShapes_and_new_gshapes(
                gs.cpivots,
                gs.rgn,
            );
            rgShape.cpivots = gs.cpivots;
            //c cc( 'rgShape.cpivots=', rgShape.cpivots );
        }
        //--------------------------------------------
        // //\\ responsibility
        //--------------------------------------------
        //      for points in gshapes and rg
        ///must be taken in gsPoints entender which
        ///must merge rgPoint by rgn,
        if( gs.pivotNames ){
            gs.pivots = [];
            gs.pivotNames.forEach( pivotName => {
                const pivot = sn( pivotName, rg );
                pivot.rgn = pivotName; //for safety
                gs.pivots.push( pivot );
            });
        }
        if( gs.kind === LINE && !gs.pivots && !gs.cpivots ){
            //todm this fails for lemma4, needs workout
            if( rgn.indexOf( ',' ) > -1 ){
                ////legally built line name
                var splitToken = ',';
            } else if( rgn.length === 2 ){
                var splitToken = '';
            } else {
                throw new Error('Ambiguous line pivots name, rgn = "'
                + rgn + '"' );
            }
            var pns = rgn.split( splitToken );
            const p0 = sn(pns[0],rg);
            const p1 = sn(pns[1],rg);
            p0.rgn = pns[0];
            p1.rgn = pns[1];
            gs.pivots = [ p0, p1 ];
        }
        rgShape.pivots = gs.pivots;
        //--------------------------------------------
        // \\// responsibility
        // \\// pivot like
        //=======================================

        if( gs.gshape2svg ){
            //todo merge with gs, why two functions?, slow,
            //todo:
            //rgShape.gshape2svg = ()=>{ gs.gshape2svg(rgShape); };
            rgShape.gshape2svg = ()=>{ gs.gshape2svg(gs); };
        }
        //----------------------------------
        // //\\ normalizing pcolor
        //----------------------------------
        if( gs.pcolor ){
            //ownColor has a precedence
            if( gs.pcolor ){
                tpelect[ rgn ] = tpelect.rgn || gs.pcolor;
            }
            const finalColor =
                tpelect[ rgn ] ||
                gs.pcolor ||
                [0,0,0];
            //todm possibly duplicated work:
            rgShape.pcolor = sDomF.rgn0arrc_2_rgba(finalColor);

            rgShape.opaqueColor = sDomF.rgn0arrc_2_rgba(
                finalColor, !!'makeOpacity1' );
        }
        //----------------------------------
        // \\// normalizing pcolor
        //----------------------------------
        const vertex_id = gs.vertex_id;
        if( vertex_id ){
            expandsPoint( gs, vertex_id );
            //rgVertex is needed for function drawAngle
            var rgVertex = gs.rgVertex = gs.rgShape;
            rgVertex.doPaintPname = false;
            rgVertex.undisplayAlways = true;
        } else {
            var rgVertex = null;
        }
    }
}

function adds_rgShapes_and_new_gshapes(
    gp, //pivots gshapes
    rgn,
){
    //prepares 3 properties for batch assignment
    var doPaintPname = has( gp, 'doPaintPname' ) ?
                       gp.doPaintPname: true;
    var draggableX   = haz( gp, 'draggableX' );
    var draggableY   = haz( gp, 'draggableY' );
    for( let pix=0; pix<gp.length; pix++ ){
        //purifies pivots
        let gs = gp[ pix ] = stripp( gp[ pix ] );

        //todo need?
        gs.draggableX = gs.draggableX || draggableX;
        gs.draggableY = gs.draggableY || draggableY;
        gs.doPaintPname = has( gs, 'doPaintPname' ) ?
                          gs.doPaintPname: doPaintPname;
        const pivotRgn = gs.rgn = gs.rgn || rgn + '-' + pix;
        gs.kind = POINT;
        ssD.gsPoints.push( gs );
        new_gshapes.push( gs ); //gshapes.push( gs );
        rgn2gs[ pivotRgn ] = gs;
        expandsPoint( gs, gs.rgn )
    }
}

function expandsLines(){
    gsLines.forEach( gs => {
        const rgn = gs.rgn;
        let rgShape = sn( rgn, rg );
        rgShape.rgn = rgn;
        rgShape.tostroke = true;
        //used for opaque colors:
        rgShape.isLine = true;
        [
            //'cssClass', //converts later below
            //'pcolor',   //converts later below
            //'fontSize', //converts later
            'caption',
            'captionShiftNorm',
            'undisplay',
            'zOrderAfter',
            'notp',
            'vectorTipIx',
            'tipFraction',
            'tipFill',
            'pivotNames',
            'lposYSugar',
            'stroke-width',
        ].forEach( propname => {
            if( has(gs,propname) ){
                rgShape[propname] = gs[propname];
            }
        });
        //----------------------------------------------
        // //\\ gshape.pcolor
        //      has priority over tpelect,
        //----------------------------------------------
        if( has( gs, 'pcolor' ) ){
            tpelect[ rgn ] = haz(tpelect, rgn) || gs.pcolor.concat();
            rgShape.pcolor = sDomF.rgn0arrc_2_rgba( gs.pcolor );
            rgShape.opaqueColor = sDomF.rgn0arrc_2_rgba(
                              gs.pcolor, !!'makeOpacity1' );
        } else {
            rgShape.pcolor = sDomF.rgn0arrc_2_rgba( rgn );
            rgShape.opaqueColor = sDomF.rgn0arrc_2_rgba( rgn,
                              !!'makeOpacity1' );
        }
        //----------------------------------------------
        // \\// gshape.pcolor
        //----------------------------------------------
        makesCssClass (gs);
        rgShape.fontSize = sf.estimatesSizeScale * (
            has( gs, 'fontSize' ) ?
            gs.fontSize : sf.LETTER_FONT_SIZE_PER_1000 );
    });
}

function makesCssClass (gs){
    const flgNo= sn( 'flgNo', ssD );
    const flgYes= sn( 'flgYes', ssD );
    //const flgLessonYes= sn( 'flgLessonYes', ssD );
    //const flgLessonNo= sn( 'flgLessonNo', ssD );
    var cssClass = gs.cssClass || '';
    var doAddHidee = false;
    cssClass.split( /\s+/ ).forEach( cl => {
        if( cl.indexOf( '--off-' ) > 0 ){
            flgNo[ cl ] = true;
        } else if( cl.indexOf( '--' )>0 ){
            flgYes[cl] = true;
            doAddHidee = true;
        }
    });
    cssClass += doAddHidee ? ' hideefw' : '';
    //todm possibly becomes redundant:
    cssClass += gs.isCurve ? ' tostroke thickable' : '';
    cssClass += gs.rgn ? ' tp-'+nsmethods.rgid2low( gs.rgn ) : '';
    cssClass = stripsExtraSpace( cssClass );
    gs.cssClass = cssClass; //todo redundant
    gs.rgShape.cssClass = cssClass;
    gs.rgX && (gs.rgX.cssClass = cssClass);
    //todo overrides rgVertex own cls:
    gs.rgVertex && (gs.rgVertex.cssClass = cssClass);
}

function expands_gs( gs, kindWrap ){
    const { gsPoints, gsShapes } = expandConf;
    const rgn = gs.rgn;
    if( !rgn ){
        ccc( 'this gshape has no rgn:', gs );
        throw ('this gshape has no rgn: gs ix=', gix );
    }
    kindWrap.kind = gs.kind || kindWrap.kind;
    if( !kindWrap.kind ){
        const mess = 'gshape.kind is undefined: ix='+ix;
        ccc( mess, 'gs=', gs );
        throw (mess );
    }
    gs.kind = kindWrap.kind;
    rgn2gs[ rgn ] = gs;
    switch (gs.kind){
        case POINT:
            gsPoints.push(gs);
            break;
        case LINE:
            gsLines.push(gs);
            break;
        case ANGLE: gs.isAngle = true; //todo rid
        case CURVE: //todo rid
            gs.isCurve = true;
        default:
            gsShapes.push(gs);
    }
}
})();
