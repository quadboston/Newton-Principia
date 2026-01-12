//expands sconf.js into rg, topicColors_repo and
//"unifies" and normalizes them,
(function(){
    const {
        sn, haz, has, eachprop, own, nsmethods, nspaste,
        rg, fconf, sf, ssF, sDomF, topicColors_repo,
        topicColors_repo_camel2col,
        originalPoints, toreg, stdMod,
    } = window.b$l.apptree({ ssFExportList : { doExpandConfig } });
    const LETTER_ROTATION_RADIUS_PER_1000 = 30;
    const LETTER_CENTER_X_PER_FONT_SIZE = 0.2;
    const LETTER_CENTER_Y_PER_FONT_SIZE = 0.3;
    const graphCss = sn( 'graphCss', sf );
    const diagramCss = sn( 'diagramCss', sf );
    return;


function doExpandConfig (){
    var {
        topicColors_elected,
        lines,
        linesArray,

        //required, part of sf api,
        //done in picture-system y-coord:
        //(pic.bottom-y=+picHeight)
        modorInPicX,
        modorInPicY,

        //the same as above, but depricated:
        originX_onPicture,
        originY_onPicture,

        pictureWidth,   //todm: do phase out ... to svgModel_width
        pictureHeight,
        svgModel_width,
        svgModel_height,

        mod2inn_scale,
    } = sf;
    //secures omitted settings
    const formulas = sn( 'SHOW_FORMULAS', sf, [] );
    //-----------------------------------------------------------
    // //\\ transition from poor name in legacy code
    //      , removing "pictureWidth", ...
    //-----------------------------------------------------------
    pictureWidth = ( svgModel_width || svgModel_width === 0 ) ?
                        svgModel_width : pictureWidth;
    sf.pictureWidth = pictureWidth;
    sf.svgModel_width = pictureWidth;

    pictureHeight = ( svgModel_height || svgModel_height === 0 ) ?
                        svgModel_height : pictureHeight;
    sf.pictureHeight = pictureHeight;
    sf.svgModel_height = pictureHeight;
    //-----------------------------------------------------------
    // \\// transition from poor name in legacy code
    //-----------------------------------------------------------

    originX_onPicture = typeof modorInPicX === 'undefined' ?
                        originX_onPicture : modorInPicX;
    originY_onPicture = typeof modorInPicY === 'undefined' ?
                        originY_onPicture : modorInPicY;

    modorInPicX = originX_onPicture;
    modorInPicY = originY_onPicture;

    //allocates missed placeholders
    lines = lines || sn( 'lines', sf, [] );

    //todo: this thing also gets more members from "dragger engine": poor job,
    var pname2point = sn( 'pname2point', sf );

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
    var MONITOR_Y_FLIP = -1 * sf.mod2inn_scaleY;
    //----------------------------------
    // \\// MONITOR Y FLIP
    //----------------------------------

    //---------------------------------------------------------------------------
    // //\\ derives initial model parameters from picture's points
    //---------------------------------------------------------------------------
    var inn2mod_scale = 1/mod2inn_scale;

    ///adds point's color from topicColors_elected if missed
    eachprop( originalPoints, (point,pname) => {
        point.pcolor = haz( point, 'pcolor' ) || topicColors_elected[ pname ];
    });

    ///it is vital to set these pars now ...
    ///they are used in function calls a little below this block ...
    Object.assign( sf, {
        //----------------------------------
        // //\\ model-view parameters
        //----------------------------------
        MONITOR_Y_FLIP,

        mod2inn_scale,
        inn2mod_scale,

        //mod2inn_scale_initial : mod2inn_scale,
        //inn2mod_scale_initial : inn2mod_scale,

        //do use:
        modorInPicX,
        modorInPicY,
        //.......................................
        //do rid:
        //todm: too long to fix everywhere ...
        originX_onPicture : modorInPicX,
        originY_onPicture : modorInPicY,
        //.......................................

        // **api innerMediaHeight
        innerMediaHeight    : pictureHeight + sf.SLIDERS_LEGEND_HEIGHT,
        innerMediaWidth     : pictureWidth,
        //----------------------------------
        // \\// model-view parameters
        //----------------------------------
    });

    var estimatedPictureSize = Math.max(
        pictureWidth,
        pictureHeight,
    );
    var estimatesSizeScale = estimatedPictureSize/1000;

    var factor = MONITOR_Y_FLIP * inn2mod_scale;
    (function() {
        ///--------------------------------------------------
        ///equalizes repo and elected and makes place in rg
        ///--------------------------------------------------
        Object.keys( topicColors_elected ).forEach( camelId => {
            toreg( camelId )( 'pname', camelId );
            var lowId = sDomF.tpid2low( camelId );
            let tr = topicColors_repo[ lowId ] = topicColors_elected[ camelId ];
            topicColors_repo_camel2col[ camelId ] = tr;
        });

        //--------------------------------------------------
        // //\\ expands originalPoints placeholders
        //--------------------------------------------------
        eachprop( originalPoints, ( op, pname ) => {
            if( Array.isArray( op ) ) {
                ////handles array of originalPoints

                //prepares 3 properties for batch assignment
                var doPaintPname = has( op, 'doPaintPname' ) ?
                                    op.doPaintPname : true;
                var draggableX   = haz( op, 'draggableX' );
                var draggableY   = haz( op, 'draggableY' );

                op.forEach( ( opInArr, inIx ) => {
                    opInArr.draggableX = has( opInArr, 'draggableX' ) ?
                                            opInArr.draggableX : draggableX;
                    opInArr.draggableY = has( opInArr, 'draggableY' ) ?
                                            opInArr.draggableY : draggableY;
                    opInArr.doPaintPname = has( opInArr, 'doPaintPname' ) ?
                                            opInArr.doPaintPname : doPaintPname;
                    expandsOrPoint( opInArr, pname + '-' + inIx );
                });
            } else {
                ////handles single originalPoint
                expandsOrPoint( op, pname );
            }
        });
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

        ///apparently non-unified with shapes-points, points have more properties
        eachprop( lines, ( gshape, pname ) => {
            let rgX = sn( pname, rg );
            rgX.pname = pname;
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
                    if( has(gshape,propname) ){
                        rgX[propname] = gshape[propname];
                    }
                } else {
                    has(gshape,propname) && (rgX[propname] = gshape[propname]);
                }
            });
            
            //todm: mess: lines array elements attributes go into
            //line-maker in lemma-linerars-machine lineAttr
            //, but this is done via "str2line" which ignores "everything" except
            //stroke, 'stroke-width', and 'caption'
            //here we create even more mess because adding alternative stream for
            //pcolor
            if( has( gshape, 'pcolor' ) ) {
                var tk = sDomF.tpid2low( pname );
                //concat() separates generic color-arrays from
                let fc = topicColors_repo[ tk ] = gshape.pcolor.concat();
                topicColors_repo_camel2col[ pname ] = fc;
                rgX.pcolor = sDomF.tpname0arr_2_rgba( gshape.pcolor );
                rgX.opaqueColor = sDomF.tpname0arr_2_rgba(
                                    gshape.pcolor, !!'makeOpacity1' );
            } else {
                rgX.pcolor = sDomF.tpname0arr_2_rgba( pname );
                rgX.opaqueColor = sDomF.tpname0arr_2_rgba( pname,
                                    !!'makeOpacity1' );
            }

            let gclass = haz( gshape, 'cssClass' );
            if( gclass ){
                if( gclass.indexOf( '--' )>0 ){
                    gclass += ' hidee';
                    gshape.cssClass = gclass;
                    //c cc( pname +' gclass='+ gclass );
                }
            }
            rgX.cssClass = gclass;
            rgX.fontSize    = estimatesSizeScale * ( has( gshape, 'fontSize' ) ?
                                gshape.fontSize : sf.LETTER_FONT_SIZE_PER_1000 );
            //---------------------------------------------------------
            // \\// transfers properties from line-options to rg-lines:
            //---------------------------------------------------------
        });
        //----------------------------------
        // \\// expands lines placeholders
        //----------------------------------
        return;

        ///rg becomes normalized expansion of originalPoints
        function expandsOrPoint( op, pname ){
            //todo ... non-readable: it tranfers properties from
            //??original points to here,
            //      this must be clearly written in code,
            op.own          = own;
            var pictureP    = op.own( 'pos' );  //=media pos
            var modelP      = op.own( 'mpos' );

            //at the moment for missing flag, doPaintPname === true,

            // //\\ todm: automate property transfer
            var doPaintPname= has( op, 'doPaintPname' ) ?
                                op.doPaintPname : true;
            var draggableX = has( op, 'draggableX' ) ? op.draggableX : false;
            var draggableY = has( op, 'draggableY' ) ? op.draggableY : false;
            // \\// todm: automate property transfer

            var pos = pname2point[ pname ] = !pictureP ?
                [0,0] :
                [ ( pictureP[0] - originX_onPicture ) * inn2mod_scale,
                    ( pictureP[1] - originY_onPicture ) * factor,
                ];
            //creates rgX or reuses existing one
            var rgX = op.rgX = ssF.declareGeomtric({
                pname, pos, caption : haz( op, 'caption' ),
            });

            //in some weird lemmas, rgX.draggableX is defined
            //in sf.js, don't erase it:
            sn( 'draggableX', rgX, draggableX );
            sn( 'draggableY', rgX, draggableY );

            if( has( op, 'cssClass' ) ){
                let opclass = op.cssClass;
                if( opclass.indexOf( '--' )>0 ){
                    opclass += ' hidee';
                    op.cssClass = opclass;
                }
                rgX.classmark = opclass;
            } else if( has( op, 'classmark' ) ) {
                if( op.classmark.indexOf( '--' )>0 ){
                    op.classmark += ' hidee';
                }
                rgX.classmark = op.classmark;
            }
            rgX.doPaintPname = doPaintPname;

            if( has( op, 'pcolor' ) ) {
                var tk = sDomF.tpid2low( pname );
                let fc = topicColors_repo[ tk ] = op.pcolor; //low
                topicColors_repo_camel2col[ pname ] = fc;       //camel
                rgX.pcolor = sDomF.tpname0arr_2_rgba( op.pcolor );
                rgX.opaqueColor = sDomF.tpname0arr_2_rgba( op.pcolor,
                                    !!'makeOpacity1' );
            } else {
                rgX.pcolor = sDomF.tpname0arr_2_rgba( pname );
                rgX.opaqueColor = sDomF.tpname0arr_2_rgba( pname,
                                    !!'makeOpacity1' );
            }
            rgX.undisplay = has( op, 'undisplay' ) ? op.undisplay : false;

            //todm ... make it a stand-alone function to facilitate
            //         dynamic points creation ... to avoid extra declaration
            //----------------------------------------------------------
            // //\\ sets up point letters
            //----------------------------------------------------------
            var letterOffset    = estimatesSizeScale * (
                has( op, 'letterRotRadius' ) ?
                op.letterRotRadius :
                LETTER_ROTATION_RADIUS_PER_1000 );
            var fontSize        = estimatesSizeScale * (
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

            var letterColor = haz( op, 'letterColor' );
            if( letterColor ) {
                //todm ...
                //rgX.letterColor = haz( op, 'letterColor' ) || rgX.pcolor;
                rgX.letterColor = sDomF.tpname0arr_2_rgba( letterColor );
            }
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
            ].forEach( propname => {
                has(op,propname) && (rgX[propname] = op[propname]);
            });
            [
                'caption', //todm conflict with declare Geometric?
                'title',
                'hideCaption',
                'conditionalDrag',
                'style',
                'textLineTurn',
            ].forEach( propname => {
                rgX[propname] = haz(op,propname);
            });
        }
    })();
    //---------------------------------------------------------------------------
    // \\// derives initial model parameters from picture's points
    //---------------------------------------------------------------------------

    //----------------------------------------------------
    // //\\  prepares sf data holder
    //----------------------------------------------------
    sn( 'hideProofSlider', sf, true );
    Object.assign( sf, {
        //model-view parameter
        thickness : 1,
        //:scenario
        enableCapture                   : true,
        enableDataFunctionsRepository   : false,
    });
    sf.realSvgSize = sf.realSvgSize ||
        ( sf.pictureWidth + sf.pictureHeight );
    const DIAGRAM_SCALE = sf.realSvgSize / sf.standardSvgSize;
    const GRAPH_SCALE = 4* sf.graphSvgSize / sf.standardSvgSize;
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

    if( !has( sf, 'enableStudylab' ) ) {
        ////this way, the legacy lemmas are preserved,
        ////new lemmas must set this in own "sf",
        sf.enableStudylab = true;
    }
    if( !has( sf, 'enableTools' ) ) {
        ////this way, the legacy lemmas are preserved,
        ////new lemmas must set this in own "sf",
        sf.enableTools = true;
    }
    //----------------------------------
    // \\// prepares sf data holder
    //----------------------------------------------------
}
})();
