//expands sconf.js into rg,
//"unifies" and normalizes them,
(function(){

const {
    sn, haz, has, eachprop, own, nsmethods, nspaste,
    rg, fconf, sf, ssF, sDomF, tpid2arrc_elect,
    originalPoints, toreg, stdMod, ssD,
} = window.b$l.apptree({ ssFExportList : { doExpandConfig } });
const LETTER_ROTATION_RADIUS_PER_1000 = 30;
const LETTER_CENTER_X_PER_FONT_SIZE = 0.2;
const LETTER_CENTER_Y_PER_FONT_SIZE = 0.3;
const graphCss = sn( 'graphCss', sf );
const diagramCss = sn( 'diagramCss', sf );
return;


function doExpandConfig (){
    var {
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

        mod2med,
    } = sf;
    //c cc( 'expand'); //helps debugging landing scenario
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
    var pntRgid2rgx = sn( 'pntRgid2rgx', sf );

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

    //---------------------------------------------------------------------------
    // //\\ derives initial model parameters from picture's points
    //---------------------------------------------------------------------------
    var med2mod = 1/mod2med;

    ///adds point's color from tpid2arrc_elect if missed
    eachprop( originalPoints, (point,shpid) => {
        point.pcolor = haz( point, 'pcolor' ) || tpid2arrc_elect[ shpid ];
    });

    ///it is vital to set these pars now ...
    ///they are used in function calls a little below this block ...
    Object.assign( sf, {
        //----------------------------------
        // //\\ model-view parameters
        //----------------------------------
        MONITOR_Y_FLIP,

        mod2med,
        med2mod,

        //mod2med_scale_initial : mod2med,
        //med2mod_scale_initial : med2mod,

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

    var factor = MONITOR_Y_FLIP * med2mod;
    (function() {
        ///--------------------------------------------------
        ///equalizes repo and elected and makes place in rg
        ///--------------------------------------------------
        Object.keys( tpid2arrc_elect ).forEach( camelId => {
            toreg( camelId )( 'shpid', camelId );
        });

        //--------------------------------------------------
        // //\\ expands originalPoints placeholders
        //--------------------------------------------------
        ssD.curvePivots =
            haz( originalPoints, 'curvePivots' );

        eachprop( originalPoints, ( op, shpid ) => {
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
                    expandsOrPoint( opInArr, shpid + '-' + inIx );
                });
            } else {
                ////handles single originalPoint
                expandsOrPoint( op, shpid );
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

        ///apparently non-unified with shapes-points,
        //points have more properties
        eachprop( lines, ( gshape, shpid ) => {
            let rgX = sn( shpid, rg );
            rgX.shpid = shpid;
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
            //, but this is done via "str2line" which ignores
            //"everything" except
            //stroke, 'stroke-width', and 'caption'
            //here we create even more mess because adding alternative
            //stream for pcolor
            if( has( gshape, 'pcolor' ) ) {
                //concat() separates generic color-arrays from
                tpid2arrc_elect[ shpid ] = gshape.pcolor.concat();
                rgX.pcolor = sDomF.tpid0arrc_2_rgba( gshape.pcolor );
                rgX.opaqueColor = sDomF.tpid0arrc_2_rgba(
                                    gshape.pcolor, !!'makeOpacity1' );
            } else {
                rgX.pcolor = sDomF.tpid0arrc_2_rgba( shpid );
                rgX.opaqueColor = sDomF.tpid0arrc_2_rgba( shpid,
                                    !!'makeOpacity1' );
            }

            let gclass = haz( gshape, 'cssClass' );
            if( gclass ){
                if( gclass.indexOf( '--' )>0 ){
                    gclass += ' hidee';
                    gshape.cssClass = gclass;
                    //c cc( shpid +' gclass='+ gclass );
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
        function expandsOrPoint( op, shpid ){
            //todo ... non-readable: it tranfers properties from
            //??original points to here,
            //      this must be clearly written in code,
            op.own          = own;
            var pictureP    = op.own( 'pos' );  //=media pos
            var modelP      = op.own( 'mpos' );

            //at the moment for missing flag, doPaintPname === true,

            // //\\ todm: automate property transfer
            var doPaintPname = has( op, 'doPaintPname' ) ?
                                op.doPaintPname : true;
            var draggableX = has( op, 'draggableX' ) ? op.draggableX : false;
            var draggableY = has( op, 'draggableY' ) ? op.draggableY : false;
            // \\// todm: automate property transfer

            var pos = pictureP ?
                [ ( pictureP[0] - originX_onPicture ) * med2mod,
                  ( pictureP[1] - originY_onPicture ) * factor,
                ] :
                [0,0];
            //creates rgX or reuses existing one
            var rgX =
                op.rgX //used in curvePivots
                = ssF.populates__pos_medpos_rgX_p2p({
                    shpid, pos, caption : haz( op, 'caption' ),
                });
            rgX.isPoint = true;

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
                rgX.classmark //todo rid of
                = opclass;
            } else if( has( op, 'classmark' ) ) {
                if( op.classmark.indexOf( '--' )>0 ){
                    op.classmark += ' hidee';
                }
                rgX.classmark = op.classmark;
            }
            rgX.doPaintPname = doPaintPname;

            ///color precedence is:
            ///op.pcolor --> tpid2arrc_elect,
            ///moreover, existing op.pcolor overrides elected,
            if( has( op, 'pcolor' ) ) {
                tpid2arrc_elect[ shpid ] = op.pcolor.concat();
                rgX.pcolor = sDomF.tpid0arrc_2_rgba( op.pcolor );
                rgX.opaqueColor = sDomF.tpid0arrc_2_rgba(
                                  op.pcolor, !!'makeOpacity1' );
            } else {
                rgX.pcolor = sDomF.tpid0arrc_2_rgba( shpid );
                rgX.opaqueColor = sDomF.tpid0arrc_2_rgba(
                                  shpid, !!'makeOpacity1' );
            }
            rgX.undisplay = has( op, 'undisplay' ) ?
                op.undisplay : false;

            //todm ... make it a stand-alone function to
            //facilitate
            //dynamic points creation ... to avoid extra declaration
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
                rgX.letterColor = sDomF.tpid0arrc_2_rgba( letterColor );
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
    //---------------------------------------------------------------
    // \\// derives initial model parameters from picture's points
    //---------------------------------------------------------------

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
})();
