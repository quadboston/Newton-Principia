
( function() {
    var {
        ns, sn, haz, has,
        sconf, fconf,
        fixedColors,
        ssF, sDomF,
        rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            doExpandConfig,
        }
    });

    var LETTER_ROTATION_RADIUS_PER_1000 = 30;
    var LETTER_CENTER_X_PER_FONT_SIZE = 0.2;
    var LETTER_CENTER_Y_PER_FONT_SIZE = 0.3;
    return;






    ///==============================================
    ///==============================================
    function doExpandConfig() 
    {
        var {
            predefinedTopics,
            originalPoints,
            lines,
            linesArray,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
        } = sconf;
        lines = lines || [];
        originalPoints = originalPoints || {};
        var pname2point = {};

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
        var MONITOR_Y_FLIP = -1;
        //----------------------------------
        // \\// MONITOR Y FLIP
        //----------------------------------



        //---------------------------------------------------------------------------
        // //\\ derives initial model parameters from picture's points
        //---------------------------------------------------------------------------
        //appar. as by I.N.: difference between two first x-points:
        var inn2mod_scale = 1/mod2inn_scale;


        ///adds point's color from predefinedTopics if missed
        ns.eachprop( originalPoints, (point,pname) => {
            point.pcolor = ns.haz( point, 'pcolor' ) || predefinedTopics[ pname ];
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

            //todm: ?slider:
            originalMod2inn_scale   : mod2inn_scale,

            mod2inn_scale_initial : mod2inn_scale,
            inn2mod_scale_initial : inn2mod_scale,

            //todm: too long to fix everywhere ...
            activeAreaOffsetX   : originX_onPicture,
            activeAreaOffsetY   : originY_onPicture,

            //todm check is this safe to disable this
            //centerOnPicture_X   : originX_onPicture,
            //centerOnPicture_Y   : originY_onPicture,

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
        var toreg = ssF.toreg;
        (function() {

            ///expands predefinedTopics placeholders
            Object.keys( predefinedTopics ).forEach( topicKey => {
                toreg( topicKey )( 'pname', topicKey ); //declares for astate management
                var tk = sDomF.topicIdUpperCase_2_underscore( topicKey );
                fixedColors[ tk ] = predefinedTopics[ topicKey ];
            });

            //--------------------------------------------------
            // //\\ expands originalPoints placeholders
            //--------------------------------------------------
            ns.eachprop( originalPoints, ( op, pname ) => {
                if( Array.isArray( op ) ) {
                    ////handles array of originalPoints
                    var doPaintPname = ns.h( op, 'doPaintPname' ) ? op.doPaintPname : true;
                    var draggableX   = haz( op, 'draggableX' );
                    var draggableY   = haz( op, 'draggableY' );
                    op.forEach( ( opInArr, inIx ) => {
                        opInArr.draggableX = ns.h( opInArr, 'draggableX' ) ?
                                             opInArr.draggableX : draggableX;
                        opInArr.draggableY = ns.h( opInArr, 'draggableY' ) ?
                                             opInArr.draggableY : draggableY;
                        opInArr.doPaintPname = ns.h( opInArr, 'doPaintPname' ) ?
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
                op.own          = ns.own;
                var pictureP    = op.own( 'pos' );
                var modelP      = op.own( 'mpos' );

                //at the moment for missing flag, doPaintPname === true,

                // //\\ todm: automate property transfer
                var doPaintPname= ns.h( op, 'doPaintPname' ) ?
                                  op.doPaintPname : true;
                var draggableX = ns.h( op, 'draggableX' ) ? op.draggableX : false;
                var draggableY = ns.h( op, 'draggableY' ) ? op.draggableY : false;
                // \\// todm: automate property transfer

                var pos = pname2point[ pname ] = !pictureP ?
                            [0,0] :
                            [ ( pictureP[0] - originX_onPicture ) * inn2mod_scale,
                              ( pictureP[1] - originY_onPicture ) * factor,
                            ];

                //creates rgX or reuses existing one
                var rgX = op.rgX = ssF.declareGeomtric({
                    pname, pos, caption : ns.haz( op, 'caption' )
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
                // \\// todm: automate property transfer




                if( ns.h( op, 'pcolor' ) ) {
                    var tk = sDomF.topicIdUpperCase_2_underscore( pname );
                    fixedColors[ tk ] = op.pcolor;
                    rgX.pcolor = sDomF.getFixedColor( op.pcolor );
                } else {
                    rgX.pcolor = sDomF.getFixedColor( pname );
                }
                rgX.undisplay = ns.h( op, 'undisplay' ) ? op.undisplay : false;

                //todm ... make it a stand-alone function to facilitate
                //         dynamic points creation ... to avoid extra declaration
                //----------------------------------------------------------
                // //\\ sets up point letters
                //----------------------------------------------------------
                var letterOffset    = estimatesSizeScale * ( ns.h( op, 'letterRotRadius' ) ?
                                      op.letterRotRadius : LETTER_ROTATION_RADIUS_PER_1000 );
                var fontSize        = estimatesSizeScale * ( ns.h( op, 'fontSize' ) ?
                                      op.fontSize : fconf.LETTER_FONT_SIZE_PER_1000 );

                var letterShift     = haz( op, 'letterShift' );
                if( letterShift ) {
                    rgX.letterOffsetX = letterShift[0];
                    rgX.letterOffsetY = letterShift[1];
                } else {
                    var letterAngle     = ns.h( op, 'letterAngle' ) ? op.letterAngle : 0;
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
            linesArray = ns.haz( sconf, 'linesArray' );
            if( linesArray ) {
                lines = {};
                linesArray.forEach( (lineConf) => {
                    var lname = Object.keys( lineConf )[0];
                    lines[ lname ] = lineConf[ lname ];
                });
            }
            ns.eachprop( lines, ( gshape, pname ) => {
                var rgX = toreg( pname )( 'pname', pname )();
                if( ns.h( gshape, 'pcolor' ) ) {
                    var tk = sDomF.topicIdUpperCase_2_underscore( pname );
                    fixedColors[ tk ] = gshape.pcolor;
                }

                //---------------------------------------------------------
                // //\\ transfers properties from line-options to rg-lines:
                //      todo ... we stumbled upon this 100 times ...
                //               property transfer must automate ...
                //               every time we forget to transfer new
                //               property, we lose hours ...
                //---------------------------------------------------------
                if( ns.h( gshape, 'undisplay' ) ) {
                    rgX.undisplay = gshape.undisplay;
                }
                rgX.zOrderAfter = haz( gshape, 'zOrderAfter' ); //meaningful for lines yet
                rgX.notp        = haz( gshape, 'notp' );
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

            pname2point,
            originalPoints,
            lines,

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

            default_tp_stroke_opacity   : 2,
            default_tp_stroke_width     : ns.haz( sconf, 'default_tp_stroke_width' ) || 10,
            default_tp_lightness        : 40, //50 is full lightness
            defaultLineWidth            : 2,
        });
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

