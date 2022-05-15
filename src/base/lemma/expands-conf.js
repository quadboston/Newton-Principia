
( function() {
    var {
        sn, haz, has, eachprop, own,
        fconf, ssF, sDomF, fixedColors,
    } = window.b$l.apptree({
        ssFExportList :
        {
            doExpandConfig,
        }
    });

    var LETTER_ROTATION_RADIUS_PER_1000 = 30;
    var LETTER_CENTER_X_PER_FONT_SIZE = 0.2;
    var LETTER_CENTER_Y_PER_FONT_SIZE = 0.3;
    var super_default_highlight_tp_stroke_width = 10;
    return;






    ///==============================================
    /// only for common stdMod:
    ///                     1. expands sconf and
    //                      2. expnds sconf into rg
    ///==============================================
    function doExpandConfig( stdMod ) 
    {
        var toreg = stdMod.toreg;
        var sconf = stdMod.sconf;
        var {
            predefinedTopics,
            originalPoints,
            lines,
            linesArray,

            //required, part of sconf api,
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
        } = stdMod.sconf;


        //-----------------------------------------------------------
        // //\\ transition from poor name in legacy code
        //      , removing "pictureWidth", ...
        //-----------------------------------------------------------
        pictureWidth = ( svgModel_width || svgModel_width === 0 ) ?
                         svgModel_width : pictureWidth;
        sconf.pictureWidth = pictureWidth;
        sconf.svgModel_width = pictureWidth;

        pictureHeight = ( svgModel_height || svgModel_height === 0 ) ?
                          svgModel_height : pictureHeight;
        sconf.pictureHeight = pictureHeight;
        sconf.svgModel_height = pictureHeight;
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
        lines = lines || sn( 'lines', sconf, [] );
        originalPoints = originalPoints || sn( 'originalPoints', sconf );

        //todo: this thing also gets more members from "dragger engine": poor job,
        var pname2point = sn( 'pname2point', sconf );

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
        var MONITOR_Y_FLIP = -1 * fconf.mod2inn_scaleY;
        //----------------------------------
        // \\// MONITOR Y FLIP
        //----------------------------------



        //---------------------------------------------------------------------------
        // //\\ derives initial model parameters from picture's points
        //---------------------------------------------------------------------------
        var inn2mod_scale = 1/mod2inn_scale;


        ///adds point's color from predefinedTopics if missed
        eachprop( originalPoints, (point,pname) => {
            point.pcolor = haz( point, 'pcolor' ) || predefinedTopics[ pname ];
        });


        ///it is vital to set these pars now ...
        ///they are used in function calls a little below this block ...
        Object.assign( sconf, {
            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            MONITOR_Y_FLIP,

            mod2inn_scale,
            inn2mod_scale,

            mod2inn_scale_initial : mod2inn_scale,
            inn2mod_scale_initial : inn2mod_scale,

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
            innerMediaHeight    : pictureHeight + sconf.SLIDERS_LEGEND_HEIGHT,
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

            //--------------------------------------------------
            ///expands predefinedTopic colors into rg
            //--------------------------------------------------
            Object.keys( predefinedTopics ).forEach( topicKey => {
                toreg( topicKey )( 'pname', topicKey );
                var tk = sDomF.topicIdUpperCase_2_underscore( topicKey );
                fixedColors[ tk ] = predefinedTopics[ topicKey ];
            });

            //--------------------------------------------------
            // //\\ expands originalPoints placeholders
            //--------------------------------------------------
            eachprop( originalPoints, ( op, pname ) => {
                if( Array.isArray( op ) ) {
                    ////handles array of originalPoints

                    //allows set this props without setting them to each point in orig. def.
                    var doPaintPname = has( op, 'doPaintPname' ) ? op.doPaintPname : true;
                    var draggableX   = haz( op, 'draggableX' );
                    var draggableY   = haz( op, 'draggableY' );

                    op.forEach( ( opInArr, inIx ) => {
                        opInArr.draggableX = has( opInArr, 'draggableX' ) ?
                                             opInArr.draggableX : draggableX;
                        opInArr.draggableY = has( opInArr, 'draggableY' ) ?
                                             opInArr.draggableY : draggableY;
                        opInArr.doPaintPname = has( opInArr, 'doPaintPname' ) ?
                                             opInArr.doPaintPname : doPaintPname;
                        expandsOrPoints( opInArr, pname + '-' + inIx );
                    });
                } else {
                    ////handles single originalPoint
                    expandsOrPoints( op, pname );
                }
            });
            //--------------------------------------------------
            // \\// expands originalPoints placeholders
            //--------------------------------------------------

            function expandsOrPoints( op, pname )
            {
                //todo ... non-readable: it tranfers properties from ??original points to here,
                //      this must be clearly written in code,
                op.own          = own;
                var pictureP    = op.own( 'pos' );
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
                    //stdMod, //don't supply ... bs converters pick up
                    //coefficients from engine-level stdMod
                });

                // //\\ todm: automate property transfer
                //------------------------------------------------------
                // //\\ dragging
                //------------------------------------------------------
                if( has( op, 'hideD8Dpoint' ) ) {
                    //completely disables dragging
                    rgX.hideD8Dpoint = op.hideD8Dpoint;
                }
                if( has( op, 'nospinner' ) ) {
                    //keeps dragging but hides spinning drag overlay
                    rgX.nospinner = op.nospinner;
                }
                if( has( op, 'DRAGGEE_HALF_SIZE' ) ) {
                    rgX.DRAGGEE_HALF_SIZE = op.DRAGGEE_HALF_SIZE;
                }
                if( has( op, 'dragDecorColor' ) ) {
                    rgX.dragDecorColor = op.dragDecorColor;
                }

                if( has( op, 'individual_zindex' ) ) {
                    rgX.individual_zindex = op.individual_zindex;
                }

                rgX.draggableX = draggableX;
                rgX.draggableY = draggableY;


                //rgX.noKernel === true does remove "the bonus",
                //the bouns is an extra "fake" disk over dragger,
                if( has( op, 'noKernel' ) ) {
                    rgX.noKernel = op.noKernel;
                }

                /*
                if( has( op, 'ignore_hideD8Dpoint_for_CSS' ) ) {
                    rgX.ignore_hideD8Dpoint_for_CSS = op.ignore_hideD8Dpoint_for_CSS;
                }
                */

                //todm why was it disabled?
                //for d8d machinery overlay
                if( has( op, 'makeCentralDiskInvisible' ) ) {
                    rgX.makeCentralDiskInvisible = op.makeCentralDiskInvisible;
                }
                //------------------------------------------------------
                // \\// dragging
                //------------------------------------------------------


                if( has( op, 'notp' ) ) {
                    rgX.notp = op.notp;
                }
                if( has( op, 'undisplayAlways' ) ) {
                    rgX.undisplayAlways = op.undisplayAlways;
                }
                if( has( op, 'classmark' ) ) {
                    rgX.classmark = op.classmark;
                }
                if( has( op, 'displayAlways' ) ) {
                    rgX.displayAlways = op.displayAlways;
                }

                //initialR is simply a point-disk radius
                //before multiplication by initialR * sconf.thickness,
                if( has( op, 'initialR' ) ) {
                    rgX.initialR = op.initialR;
                }
                rgX.doPaintPname = doPaintPname;

                if( has( op, 'unscalable' ) ) {
                    rgX.unscalable = op.unscalable;
                }
                // \\// todm: automate property transfer


                if( has( op, 'pcolor' ) ) {
                    var tk = sDomF.topicIdUpperCase_2_underscore( pname );
                    fixedColors[ tk ] = op.pcolor;
                    rgX.pcolor = sDomF.getFixedColor( op.pcolor );
                    rgX.opaqueColor = sDomF.getFixedColor( op.pcolor, !!'makeOpacity1' );
                } else {
                    rgX.pcolor = sDomF.getFixedColor( pname );
                    rgX.opaqueColor = sDomF.getFixedColor( pname, !!'makeOpacity1' );
                }
                rgX.undisplay = has( op, 'undisplay' ) ? op.undisplay : false;

                //todm ... make it a stand-alone function to facilitate
                //         dynamic points creation ... to avoid extra declaration
                //----------------------------------------------------------
                // //\\ sets up point letters
                //----------------------------------------------------------
                rgX.caption         = haz( op, 'caption' );
                rgX.title           = haz( op, 'title' );
                rgX.hideCaption     = haz( op, 'hideCaption' );
                var letterOffset    = estimatesSizeScale * ( has( op, 'letterRotRadius' ) ?
                                      op.letterRotRadius : LETTER_ROTATION_RADIUS_PER_1000 );
                var fontSize        = estimatesSizeScale * ( has( op, 'fontSize' ) ?
                                      op.fontSize : fconf.LETTER_FONT_SIZE_PER_1000 );

                rgX.textLineTurn  = haz( op, 'textLineTurn' );
                var letterShift     = haz( op, 'letterShift' );
                if( letterShift ) {
                    rgX.letterOffsetX = letterShift[0];
                    rgX.letterOffsetY = letterShift[1];
                } else {
                    var letterAngle     = has( op, 'letterAngle' ) ? op.letterAngle : 0;
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
                    //rgX.letterColor     = haz( op, 'letterColor' ) || rgX.pcolor; 
                    rgX.letterColor = sDomF.getFixedColor( letterColor );
                }

                /*
                ccc(
                    pname,
                    'letterAngle=' + letterAngle.toFixed(3),
                    'letterOffsetX ' + rgX.letterOffsetX.toFixed(),
                    'letterOffsetY ' + rgX.letterOffsetY.toFixed()
                );
                */
                rgX.fontSize = fontSize;
                //----------------------------------------------------------
                // \\// sets up point letters
                //----------------------------------------------------------
            }

            //----------------------------------
            // //\\ expands lines placeholders
            //----------------------------------
            linesArray = haz( sconf, 'linesArray' );
            if( linesArray ) {
                lines = {};
                linesArray.forEach( (lineConf) => {
                    var lname = Object.keys( lineConf )[0];
                    lines[ lname ] = lineConf[ lname ];
                });
            }


            eachprop( lines, ( gshape, pname ) => {
                var rgX = toreg( pname )( 'pname', pname )();
                if( has( gshape, 'pcolor' ) ) {
                    var tk = sDomF.topicIdUpperCase_2_underscore( pname );
                    fixedColors[ tk ] = gshape.pcolor;
                }

                ///todm: this code is extremely non-automated:
                if( has( gshape, 'captionShiftY' ) ) {
                    rgX.captionShiftY = gshape.captionShiftY;
                }

                //---------------------------------------------------------
                // //\\ transfers properties from line-options to rg-lines:
                //      todo ... we stumbled upon this 100 times ...
                //               property transfer must automate ...
                //               every time we forget to transfer new
                //               property, we lose hours ...
                //---------------------------------------------------------
                if( has( gshape, 'undisplay' ) ) {
                    rgX.undisplay = gshape.undisplay;
                }

                //start here: add tp classes, tp shadows for rules and slider handles ...

                rgX.zOrderAfter = haz( gshape, 'zOrderAfter' ); //meaningful for lines yet
                rgX.notp        = haz( gshape, 'notp' );
                rgX.cssClass    = haz( gshape, 'cssClass' );
                if( has( gshape, 'vectorTipIx' ) ) {
                    rgX.vectorTipIx = gshape.vectorTipIx;
                }
                //---------------------------------------------------------
                // \\// transfers properties from line-options to rg-lines:
                //---------------------------------------------------------
            });
            //----------------------------------
            // \\// expands lines placeholders
            //----------------------------------
        })();
        //---------------------------------------------------------------------------
        // \\// derives initial model parameters from picture's points
        //---------------------------------------------------------------------------



        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        Object.assign( sconf, {
            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            thickness : 1,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------

            //----------------------------------
            // //\\ scenario
            //----------------------------------
            hideProofSlider                 : true, //false,
            enableCapture                   : true,
            enableDataFunctionsRepository   : false,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            default_tp_stroke_opacity   : 0.5, //2, todotodo bug everywhere
            default_tp_stroke_width     : haz( sconf, 'default_tp_stroke_width' ) ||
                                          super_default_highlight_tp_stroke_width,
            default_tp_lightness        : 40, //50 is full lightness
            defaultLineWidth            : 2,
        });
        sn( 'hover_width', sconf,
            Math.max( 1,  sconf.default_tp_stroke_width ) );
        sn( 'text_hover_width', sconf,
            Math.max( 1,  sconf.hover_width ) );
        sn( 'nonhover_width', sconf,
            Math.max( 1,  sconf.hover_width/2 ) );
        sn( 'text_nonhover_width', sconf,
            Math.max( 1,  sconf.text_hover_width/2 ) );

        if( !has( sconf, 'enableStudylab' ) ) {
            ////this way, the legacy lemmas are preserved,
            ////new lemmas must set this in own "sconf",
            sconf.enableStudylab = true;
        }
        if( !has( sconf, 'enableTools' ) ) {
            ////this way, the legacy lemmas are preserved,
            ////new lemmas must set this in own "sconf",
            sconf.enableTools = true;
        }
        //----------------------------------
        // \\// prepares sconf data holder
        //----------------------------------------------------
    }

}) ();

