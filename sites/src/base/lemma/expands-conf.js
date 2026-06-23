//expands sconf.js items into rg,
//"unifies" and normalizes items in rg,
(function(){
const {
        sn, ha, han, haz, has, eachprop, nsmethods, nspaste,
        stripp, CONST, rg, fconf, sf, ssF, sDomF, tpelect,
        originalPoints, toreg, stdMod, ssD, gshapes,
      } = window.b$l.atree({ ssFList: {
        doExpandConfig,
        doExtendPointsArray,
}});
const stripsExtraSpace = nsmethods.stripsExtraSpace;
const LETTER_ROTATION_RADIUS_PER_1000 = 30;
const LETTER_CENTER_X_PER_FONT_SIZE = 0.2;
const LETTER_CENTER_Y_PER_FONT_SIZE = 0.3;
const graphCss = sn( 'graphCss', sf );
const diagramCss = sn( 'diagramCss', sf );
const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
return;


function doExpandConfig (){
    var {
        lines,
        //required, part of sf api,
        //done in picture-system y-coord:
        //(pic.bottom-y=+picHeight)
        medposOfModOrigin_x,
        medposOfModOrigin_y,

        medWidth,   //todm: do phase out ... to svgModel_width
        medHeight,
        svgModel_width,
        svgModel_height,

        mod2med,
    } = sf;

    //spawns flag "kind"
    let kind = '';
    for( let ix=0; ix<gshapes.length; ix++){
        let gs = gshapes[ix] = stripp(gshapes[ix]);
        kind = gs.kind || kind;
        gs.kind = kind;
    }

    //expands to legacy version
    sn( 'shapesArray', sf, [] );
    sn( 'linesArray', sf, [] );
    gshapes.forEach( gs=>{
        switch (gs.kind){
            case POINT:
                sf.originalPoints[ gs.rgn ] = gs;
                break;
            case LINE:
                let el = {};
                el[gs.rgn] = gs;
                sf.linesArray.push( el );
                break;
            case ANGLE:
                gs.isAngle = true;
                sf.shapesArray.push(gs);
                break;
            case CURVE:
                gs.isCurve = true;
                sf.shapesArray.push(gs);
                break;
            default:
                sf.shapesArray.push(gs);
        }
    });

    //secures omitted settings placeholders
    //allocates missed placeholders
    lines = lines || sn( 'lines', sf, [] );
    const formulas = sn( 'SHOW_FORMULAS', sf, [] );
    const allFlagcss = sn( 'allFlagcss', ssD );
    //todo: this thing also gets more members from
    //"dragger engine": poor job,
    var pntRgid2rgx = sn( 'pntRgid2rgx', sf );

    //-----------------------------------------------------------
    // //\\ transition from poor name in legacy code,
    //      removing "medWidth", ...
    //-----------------------------------------------------------
    medWidth = ( svgModel_width || svgModel_width === 0 ) ?
                        svgModel_width : medWidth;
    sf.medWidth = medWidth;
    sf.svgModel_width = medWidth;
    medHeight = ( svgModel_height || svgModel_height === 0 ) ?
                        svgModel_height : medHeight;
    sf.medHeight = medHeight;
    sf.svgModel_height = medHeight;
    //-----------------------------------------------------------
    // \\// transition from poor name in legacy code,
    //-----------------------------------------------------------

    //----------------------------------
    // //\\ MONITOR Y FLIP
    //----------------------------------
    //  application coordinate Y
    //  -1 if it goes in opposite-to-screen
    //      direction starting from
    //      centerY_onPicture
    //  1  codirectional with the screen
    //     which means from screen-top to
    //      screen bottom
    var MONITOR_Y_FLIP = -1 * sf.mod2med_scaleY;
    //----------------------------------
    // \\// MONITOR Y FLIP
    //----------------------------------

    //------------------------------------------------------------
    // //\\ derives initial model parameters from picture's points
    //------------------------------------------------------------
    sf.med2mod = 1/mod2med;
    ///it is vital to set these pars now ...
    ///they are used in function calls a little below this block ...

    //for non-zoomable shapes
    sf.medposOfModOrigin_x_original = medposOfModOrigin_x;
    sf.medposOfModOrigin_y_original = medposOfModOrigin_y;
    sf.MONITOR_Y_FLIP = MONITOR_Y_FLIP;
    sf.medposOfModOrigin_x = medposOfModOrigin_x;
    sf.medposOfModOrigin_y = medposOfModOrigin_y;
    sf.innerMediaHeight = medHeight + sf.SLIDERS_LEGEND_HEIGHT;
    sf.innerMediaWidth = medWidth;

    var estimatedPictureSize = Math.max(
        medWidth,
        medHeight,
    );
    sf.estimatesSizeScale = estimatedPictureSize/1000;
    var factor = MONITOR_Y_FLIP * sf.med2mod;
    ///--------------------------------------------------
    ///equalizes repo and elected and makes place in rg
    ///--------------------------------------------------
    Object.keys( tpelect ).forEach( camelId => {
        toreg( camelId )( 'rgid', camelId );
    });
    //--------------------------------------------------
    // //\\ expands originalPoints placeholders
    //--------------------------------------------------
    if( sf.gshapes.length ){
        sf.gshapes.forEach( gs=>{
            if( gs.kind === POINT ){
                expandsOrPoint( gs, gs.rgn );
            }
        });
    } else {
        const opkeys = Object.keys( originalPoints );
        for( let kix=0; kix<opkeys.length; kix++ ){
            const rgid = opkeys[kix];
            let op = originalPoints[rgid];
            if( Array.isArray( op ) ) {
                doExtendPointsArray( op, rgid );
            } else {
                ////handles single originalPoint
                op = originalPoints[rgid] = stripp( op );
                expandsOrPoint( op, rgid );
            }
        }
    }
    //--------------------------------------------------
    // \\// expands originalPoints placeholders
    //--------------------------------------------------

    //----------------------------------
    // //\\ expands lines placeholders
    //----------------------------------
    linesArray = haz( sf, 'linesArray' );
    ///equalizes lines and linesArray from linesArray into lines:
    if( linesArray ) {
        lines = {};
        linesArray.forEach( (lineConf) => {
            var lname = Object.keys( lineConf )[0];
            lines[ lname ] = lineConf[ lname ];
        });
    }
    ///apparently non-unified with shapes-points,
    //points have more properties
    const linesKeys = Object.keys( lines );
    for( var lkeysIx=0; lkeysIx<linesKeys.length; lkeysIx++ ){
        const rgid = linesKeys[lkeysIx];
        const gs = lines[rgid] = stripp( lines[rgid] );
        let rgX = sn( rgid, rg );
        rgX.rgid = rgid;
        rgX.tostroke = true;
        rgX.isPoint = false;
        rgX.isLine = true;
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
            'stroke-width',
        ].forEach( propname => {
            if( propname === 'pivotNames' ){
                if( has(gs,propname) ){
                    rgX[propname] = gs[propname];
                }
            } else {
                has(gs,propname) && (rgX[propname] =
                    gs[propname]);
            }
        });

        //----------------------------------------------
        // //\\ gshape.pcolor
        //      has priority over tpelect,
        //----------------------------------------------
        //todm: mess: lines array elements attributes go into
        //line-maker in lemma-linerars-machine lineAttr
        //, but this is done via "str2line" which ignores
        //"everything" except
        //stroke, 'stroke-width', and 'caption'
        //here we create even more mess because adding alternative
        //stream for pcolor
        if( has( gs, 'pcolor' ) ){
            //*********************************************
            //recall how css is created for elected topics
            //in late landing:
            //eachprop( tpelect, ( colorArray, ...
            //    lowrgid_2_glocss8anchorRack[ lowId ] = {
            //*********************************************
            //concat() separates generic color-arrays from
            tpelect[ rgid ] = haz(tpelect, rgid) ||
                                      gs.pcolor.concat();
            rgX.pcolor = sDomF.rgid0arrc_2_rgba( gs.pcolor );
            rgX.opaqueColor = sDomF.rgid0arrc_2_rgba(
                              gs.pcolor, !!'makeOpacity1' );
        } else {
            rgX.pcolor = sDomF.rgid0arrc_2_rgba( rgid );
            rgX.opaqueColor = sDomF.rgid0arrc_2_rgba( rgid,
                              !!'makeOpacity1' );
        }
        //----------------------------------------------
        // \\// gshape.pcolor
        //----------------------------------------------
        let doAddHidee = false;
        let gclass = haz( gs, 'cssClass' ) || '';
        if( gclass && gclass.indexOf( '--' )>0 ){
            doAddHidee = true;
        }
        if( gs.flagcss ){
            doAddHidee = true;
            gclass += ' flagcss--'+gs.flagcss;
            allFlagcss[ gs.flagcss ] = true;
        }
        if( doAddHidee ){
            gclass += ' hidee';
        }
        gs.cssClass = rgX.cssClass =
            stripsExtraSpace(gclass);
        rgX.fontSize = sf.estimatesSizeScale * (
            has( gs, 'fontSize' ) ?
            gs.fontSize : sf.LETTER_FONT_SIZE_PER_1000 );
        //---------------------------------------------------------
        // \\// transfers properties from line-options to rg-lines:
        //---------------------------------------------------------
    }

    //----------------------------------
    // \\// expands lines placeholders
    //----------------------------------
    expandsShapes();
    //---------------------------------------------------------------
    // \\// derives initial model parameters from picture's points
    //---------------------------------------------------------------

    //----------------------------------------------------
    // //\\  prepares sf data holder
    //----------------------------------------------------
    sn( 'hideProofSlider', sf, true );
    sf.medsize = sf.medsize || ( sf.medWidth + sf.medHeight );
    const DIAGRAM_SCALE = sf.medsize / sf.medsize_standard;
    const GRAPH_SCALE = 4* sf.graphSvgSize / sf.medsize_standard;
    //=========================================
    // //\\ thickness
    //=========================================
    [
        'default_tp_stroke_width',
        'defaultLineWidth',
        'hover_width',
        'nonhover_width',
        'text_hover_width',
        'text_nonhover_width',
        'handleRadius',
    ]
    .forEach( pn => {
        diagramCss[pn] = ( sf[pn] * DIAGRAM_SCALE ).toFixed(2) + 'px';
        graphCss[pn] = ( sf[pn] * GRAPH_SCALE ).toFixed(2) + 'px';
        sf[pn] *= DIAGRAM_SCALE; //do remove
        sf[pn] = sf[pn].toFixed(2);
    });
    //this looks not very consistent because of
    //this object takes special attention:
    sf.pointDecoration.r *= DIAGRAM_SCALE;
    sf.pointDecoration['stroke-width'] *= DIAGRAM_SCALE;
    //=========================================
    // \\// thickness
    //=========================================
    //----------------------------------
    // \\// prepares sf data holder
    //----------------------------------
    //make isPoint a proper property
    const hasown = Object.prototype.hasOwnProperty;
    Object.values( rg ).forEach( rgX => {
        if( !hasown.call(rgX, 'isPoint') ){
            rgX.isPoint = false;
        }
    });
}



    ///rg becomes normalized expansion of originalPoints
    function expandsOrPoint( op, rgid ){
        //todo tmp
        var {
            lines,
            linesArray,
            //required, part of sf api,
            //done in picture-system y-coord:
            //(pic.bottom-y=+picHeight)
            medposOfModOrigin_x,
            medposOfModOrigin_y,

            medWidth,   //todm: do phase out ... to svgModel_width
            medHeight,
            svgModel_width,
            svgModel_height,

            mod2med,
        } = sf;

        var pictureP    = op.pos;  //=media pos
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
            [ ( pictureP[0] - medposOfModOrigin_x ) * sf.med2mod,
                ( pictureP[1] - medposOfModOrigin_y ) *
                MONITOR_Y_FLIP * sf.med2mod,
            ] :
            [0,0];
        //creates rgX or reuses existing one
        var rgX =
            op.rgX = op.rgShape = //used in cpivots
            ssF.populates__pos_medpos_rgX_p2p({
                rgid, pos, caption : haz( op, 'caption' ),
            });
        rgX.isPoint = true;

        //in some weird lemmas, rgX.draggableX is defined
        //in sf.js, don't erase it:
        sn( 'draggableX', rgX, draggableX );
        sn( 'draggableY', rgX, draggableY );

        let gclass = op.cssClass || '';
        let doAddHidee = '';
        if( gclass ){
            if( gclass.indexOf( '--' )>0 ){
                doAddHidee = true;
            }
        }
        if( op.flagcss ){
            doAddHidee = true;
            gclass += ' flagcss--'+op.flagcss;
            const allFlagcss = sn( 'allFlagcss', ssD );
            allFlagcss[ op.flagcss ] = true;
        }
        if( doAddHidee ){
            gclass += ' hidee';
        }
        let singleTpClass = op.singleTpClass ?
                            'tp-'+op.singleTpClass : '';
        gclass = gclass + ' '  + singleTpClass;
        op.cssClass =  rgX.cssClass =
            stripsExtraSpace(gclass);

        rgX.doPaintPname = doPaintPname;
        //----------------------------------------------
        // //\\ op.pcolor
        //      has priority over tpelect,
        //----------------------------------------------
        op.pcolor = op.pcolor || tpelect[ rgid ];
        if( has( op, 'pcolor' ) ) {
            if( !singleTpClass ){
                tpelect[ rgid ] =
                    tpelect[ rgid ] || op.pcolor.concat();
            }
            rgX.pcolor = sDomF.rgid0arrc_2_rgba( op.pcolor );
            rgX.opaqueColor = sDomF.rgid0arrc_2_rgba(
                              op.pcolor, !!'makeOpacity1' );
        } else {
            rgX.pcolor = sDomF.rgid0arrc_2_rgba( rgid );
            rgX.opaqueColor = sDomF.rgid0arrc_2_rgba(
                              rgid, !!'makeOpacity1' );
        }
        //----------------------------------------------
        // \\// op.pcolor
        //----------------------------------------------
        rgX.undisplay = has( op, 'undisplay' ) ?
                        op.undisplay : false;
        //todm ... make it a stand-alone function to
        //facilitate
        //dynamic points creation ... to avoid extra declaration
        //----------------------------------------------------------
        // //\\ sets up point letters
        //----------------------------------------------------------
        var letterOffset    = sf.estimatesSizeScale * (
            has( op, 'letterRotRadius' ) ?
            op.letterRotRadius :
            LETTER_ROTATION_RADIUS_PER_1000 );
        var fontSize        = sf.estimatesSizeScale * (
            has( op, 'fontSize' ) ?
                op.fontSize :
                sf.LETTER_FONT_SIZE_PER_1000 );
        var letterShift     = haz( op, 'letterShift' );
        if( letterShift ) {
            rgX.letterOffsetX = letterShift[0];
            rgX.letterOffsetY = letterShift[1];
        } else {
            var letterAngle     = has( op, 'letterAngle' ) ?
                                    op.letterAngle : 0;
            var rad             = letterAngle / 180 * Math.PI;
            rgX.letterOffsetX   = letterOffset * Math.cos( rad ) -
                fontSize*LETTER_CENTER_X_PER_FONT_SIZE;
            rgX.letterOffsetY   = letterOffset * Math.sin( rad ) -
                fontSize*LETTER_CENTER_Y_PER_FONT_SIZE;
        }
        rgX.letterOffsetY   *= -1; //for screen y-direction
        rgX.letterColor = haz( op, 'letterColor' ) &&
            sDomF.rgid0arrc_2_rgba( op.letterColor );
        rgX.fontSize = fontSize;
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
            has(op,propname) && (rgX[propname] = op[propname]);
        });
        [
            //'caption', //todm conflict with declare Geometric?
            'title',
            'hideCaption',
            'conditionalDrag',
            'style',
            'textLineTurn',
        ].forEach( propname => {
            rgX[propname] = haz(op,propname);
        });
    }

    function expandsShapes(){
        const MONITOR_Y_FLIP = -1 * sf.mod2med_scaleY;
        const med2mod = 1/sf.mod2med;
        const factor = MONITOR_Y_FLIP * med2mod;
        const sarr = sn( 'shapesArray', sf, [] );
        for( var ii=0; ii<sarr.length; ii++ ){
            const gs = sarr[ii]=stripp(sarr[ii]);
            const rgn = gs.rgn;
            if( !rgn ){
                ccc( 'this gshape has no rgn:', gs );
            }
            var rgShape = null;
            if( rgn ){
                var rgShape = gs.rgShape = sn( gs.rgn, rg );
                rgShape.rgid = gs.rgn; //todo rid
                rgShape.rgn = gs.rgn;
            }
            sn( 'initShapes', gs, _=>{} );
            //--------------------------------
            // //\\ css Class
            //--------------------------------
            var cssClass = gs.cssClass || '';
            if( rgn ){
                cssClass += ' tp-'+nsmethods.rgid2low( gs.rgn );
            }
            var doAddHidee = false;
            if( cssClass.indexOf( '--' )>0 ){
                doAddHidee = true;
            }
            if( gs.flagcss ){
                doAddHidee = true;
                cssClass += ' flagcss--'+gs.flagcss;
                const allFlagcss = sn( 'allFlagcss', ssD );
                allFlagcss[ gs.flagcss ] = true;
            }
            if( doAddHidee ){
                cssClass += ' hidee';
            }
            //--------------------------------
            // \\// css Class
            //--------------------------------

            //----------------------------------
            // //\\ adding to tpelect and pcolor
            //----------------------------------
            if( rgn ){
                if( gs.pcolor ){
                    const defaultColor = gs.pcolor || [0,0.0];
                    const finalColor = haz(tpelect, rgn) || defaultColor;
                    tpelect[ rgn ] = finalColor; //adds to elect if missed
                    /*
                    //todm the scenario is not yet done
                    rgShape.pcolor = sDomF.rgid0arrc_2_rgba( finalColor );
                    rgShape.opaqueColor = sDomF.rgid0arrc_2_rgba(
                            finalColor, !!'makeOpacity1' );
                    */
                } else {
                    const defaultColor = [0,0.0];
                    const finalColor = haz(tpelect, rgn) || defaultColor;
                    tpelect[ rgn ] = finalColor; //adds to elect if missed
                    /*
                    //todm the scenario is not yet done
                    rgShape.pcolor = sDomF.rgid0arrc_2_rgba( rgn );
                    rgShape.opaqueColor = sDomF.rgid0arrc_2_rgba(
                        rgn, !!'makeOpacity1' );
                    */
                }
            }
            //----------------------------------
            // \\// adding to tpelect and pcolor
            //----------------------------------

            if( gs.cpivots ){
                ssF.doExtendPointsArray(
                    gs.cpivots, rgn ); //must have rgn
                rgShape.cpivots = gs.cpivots;
            }
            if( gs.gshape2svg ){
                rgShape.gshape2svg = ()=>{ gs.gshape2svg(gs); };
            }
            const vertex_id = gs.vertex_id;
            if( vertex_id ){
                expandsOrPoint( gs, vertex_id );
                //todm: do remove alias rgX later as
                //gs.rgX = null;
                //rgVertex is needed for function drawAngle
                var rgVertex = gs.rgVertex = gs.rgX;
                rgVertex.doPaintPname = false;
                rgVertex.undisplayAlways = true;
            } else {
                var rgVertex = null;
            }
            if( gs.isCurve ){
                //todm possibly becomes redundant:
                cssClass += ' tostroke thickable';
            }
            if( cssClass ){
                cssClass = stripsExtraSpace( cssClass );
                rgn && (rgShape.cssClass = cssClass);
                rgVertex && (rgVertex.cssClass = cssClass);
            }
        }
    }

    function doExtendPointsArray( opArr, rgid ){
        ////handles array of originalPoints
        //prepares 3 properties for batch assignment
        var doPaintPname = has( opArr, 'doPaintPname' ) ?
                           opArr.doPaintPname : true;
        var draggableX   = haz( opArr, 'draggableX' );
        var draggableY   = haz( opArr, 'draggableY' );
        var singleTpClass = haz( opArr, 'singleTpClass' );
        if( singleTpClass ){
            const pcol = haz( opArr[0], 'pcolor' );
            tpelect[ singleTpClass ] =
                (pcol&&pcol.concat()) || [0,0,0,1];
        }
        for( let ixIn=0; ixIn<opArr.length; ixIn++ ){
            let pnt = opArr[ ixIn ] = stripp( opArr[ ixIn ] );
            pnt.singleTpClass = pnt.singleTpClass || singleTpClass;
            pnt.draggableX = pnt.draggableX || draggableX;
            pnt.draggableY =pnt.draggableY || draggableY;
            pnt.doPaintPname = has( pnt, 'doPaintPname' ) ?
                pnt.doPaintPname : doPaintPname;
            expandsOrPoint( pnt, rgid + '-' + ixIn );
        }
    }
})();