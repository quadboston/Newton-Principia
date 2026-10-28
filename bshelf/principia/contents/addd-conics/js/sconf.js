{ const { ns, nspaste, fconf, sconf, sf, stripp, apush, gshapes,
          tpelect, tprepo, stdMod, rg, CONST,
  } = window.b$l.atree({ ssFList: { init_conf: () => {
    const { POINT, LINE, ANGLE, CURVE, SHAPE } = CONST;
    const el = tpelect;
    //************************************************
    // //\\ geometical scales
    //************************************************
    //for real picture if diagram's picture
    //is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 841;
    sf.medHeight = 728;

    //to comply standard layout, one must add these 2 lines:
    const medsize = 2 * ( sf.medWidth + sf.medHeight ) / 2;
    const medsizeScale = medsize / sconf.medsize_standard
    //***************************************************************
    // \\// geometical scales
    //***************************************************************

    //====================================================
    // //\\ subapp regim switches
    //====================================================
    sconf.enableStudylab            = false;
    sconf.enableTools               = true;
    //====================================================
    // \\// subapp regim switches
    //====================================================

    //***************************************************************
    // //\\ decorational parameters
    //***************************************************************
    sconf.pointDecoration.r = sconf.handleRadius;
    sconf.default_tp_lightness = 30;
    fconf.ESSAY_FRACTION_IN_WORKPANE = 0.5;

    //making size to better fit lemma's diagram
    sconf.LETTER_FONT_SIZE_PER_1000 = 30;

    //overrides "global", lemma.c onf.js::sconf
    sconf.pointDecoration.r= 3;

    //--------------------------------------
    // //\\ do override engine defaults,
    //      in expands-c onf.js,
    //--------------------------------------
    sf.default_tp_stroke_width = Math.floor( 6 * medsizeScale ),
    sf.defaultLineWidth        = Math.floor( 1 * medsizeScale ),
    sf.handleRadius            = Math.floor( 3 * medsizeScale ),
    // //\\ principal tp-css pars
    //      see: topics-media-glocss.js
    //this makes hanle's border nicely thin
    sconf.nonhover_width    = Math.max( 1, Math.floor( 1*medsizeScale/1.6 ) );
    sconf.hover_width       = Math.max( 2, Math.floor( 7*medsizeScale/1.6 ) );

    //make effect apparently only for line-captions,
    //not for point-captions bs
    //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
    //In effect only if tp svg has class 'hover-width'.
    sconf.text_nonhover_width   = 1;
    sconf.text_hover_width      = 2;
    // \\// principal tp-css pars
    //--------------------------------------
    // \\// do override engine defaults,
    //--------------------------------------
    //***************************************************************
    // \\// decorational parameters
    //***************************************************************

    sf.allLettersAreHidden = true;

    //***************************************************************
    // //\\ geometics parameters
    //***************************************************************
    //=============================================
    // //\\ points reused in config
    //=============================================
    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = 360;
    const C = [409, 408 ];
    sf.medposOfModOrigin_x = C[0]; //for model's axis x
    sf.medposOfModOrigin_y = C[1]; //for model's axis y

    //----------------------------
    // //\\ sconf.curve
    //----------------------------
    sconf.curve = stripp({
        ellipseA: 1.07,
        ellipseB: 0.86,
        PparT: 0.250 * Math.PI,
        curveParA:  -0.64,
        curveParFi0: 0.0 * Math.PI,
        curveParFiMax: 2 * Math.PI,
    });
    {
        // gets ellipse parameters
        let ellB2 = sconf.curve.ellipseB*sconf.curve.ellipseB;
        let ellA2 = sconf.curve.ellipseA*sconf.curve.ellipseA;
        let excentris2 = 1 - ellA2/ellB2;
        let excentris = Math.sqrt( excentris2 );
        sconf.curve.ellipseFocus = Math.sqrt( ellA2 - ellB2 );
    }
    //----------------------------
    // \\// sconf.curve
    //----------------------------

    //interval of t to construct an arc for Newton's sagitta
    sf.sForSagitta_valQ = 0.36;

    const P = [0, 0 ]; //set bu sconf.PparT
    const Q = [0, 0 ]; //set in amode8captures

    sconf.diagramOrigin = [ 0, 0 ];
    //=============================================
    // \\// points reused in config
    //=============================================

    //-----------------------------------
    // //\\ topic group colors,
    //      todm: possibly proliferation
    //-----------------------------------
    nspaste( el, { //need deep copy
        given: tprepo.given,
        proof: tprepo.proof,
        result: tprepo.result,
        center: [100,   50,  0,      1],
        hidden: tprepo.hidden,
        context: tprepo.context,
        curvature: tprepo.curvature,
        semiaxes: [200,   40,  200,    1],
        body: tprepo.body,
        force: tprepo.result,
    });
    //-----------------------------------
    // \\// topic group colors,
    //-----------------------------------

    //---------------------------------------------------
    // //\\ points to approximate and draw original curve
    //---------------------------------------------------
    /*
        //apparently this is not enough, need following in study-model.js
            //except point P which will be user-slided along curve,
            //merges selected points with controls points
            const cPivots = ssD.cpivots;
            //merges positions to help d8d
            rg.a.pos = cPivots[0].rgX.pos;
            rg.c.pos = cPivots[2].rgX.pos;
    */
    //*************************************
    // //\\ points
    //*************************************
    apush( gshapes, [
    {
        kind: POINT,
        rgn: 'O',
        pcolor: el.context,
        //caption : 'C',
        pos: C,
        letterAngle : 120,
        letterRotRadius : 35,
    },
        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
    { rgn: 'E',
            pcolor: el.body,
            letterAngle : 90,
        },
        { rgn: 'H',
            pcolor: el.proof,
            letterAngle : -90,
        },
        { rgn: 'I',
            pcolor: el.proof,
            letterAngle : 90,
        },
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        { rgn: 'B',
            pcolor: el.proof,
            letterAngle : 90,
        },
        { rgn: 'BB',
            letterAngle : 90,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'A',
            pcolor: el.semiaxes,
        },
        { rgn: 'AA',
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'D',
            pcolor: el.proof,
            letterAngle : 70,
        },
        { rgn: 'K',
            pcolor: el.proof,
            letterAngle : 70,
        },
        { rgn: 'G',
            pcolor: el.proof,
            letterAngle : 70,
        },
        { rgn: 'T',
            pcolor: el.proof,
            letterAngle : 180,
        },
        { rgn: 'R',
            pcolor: el.proof,
            letterAngle : 45,
        },
        { rgn: 'Z',
            pcolor: el.body,
            letterAngle : 45,
            undisplayAlways : true,
            doPaintPname : false,
        },
        { rgn: 'Zminus',
            caption : 'Z',
            pcolor: el.body,
            letterAngle : 45,
            //undisplay : true,
        },
        { rgn: 'v',
            caption : '𝑣',
            pcolor: el.proof,
            letterAngle : -45,
            letterRotRadius : 15,
        },
        { rgn: 'F',
            pcolor: el.proof,
            letterAngle : -135,
        },
        { rgn: 'VV',
            caption : 'V',
            pcolor: el.proof,
            letterAngle : -45,
        },
        //center of instant curvature circle
        { rgn: 'C',
            pos : C,
            caption : 'Rc',
            pcolor: el.curvature,
            letterAngle : -45,
            undisplayAlways : true,
            doPaintPname : false,
        },
        //----------------------------------------
        // //\\ Prop. 10 Book's "another solution"
        //----------------------------------------
        { rgn: 'u',
            caption : '𝑢',
            pcolor: el.proof,
            letterAngle : -45,
            letterRotRadius : 15,
        },
        { rgn: 'tCircleCenter',
            pos : C,
            caption : "C'",
            pcolor: el.curvature,
            letterAngle : -45,
        },
        //----------------------------------------
        // \\// Prop. 10 Book's "another solution"
        //----------------------------------------

        //----------------------------------------
        // //\\ Prop. 11
        //----------------------------------------
        { rgn: 'x',
            caption : "𝑥",
            pcolor: el.proof,
            letterAngle : 100,
            letterRotRadius : 20,
        },
        //----------------------------------------
        // \\// Prop. 11
        //----------------------------------------

        //---------------------------------------
        // //\\ draggable points
        //---------------------------------------
        { rgn: 'FF',
            caption : "F",
            pcolor: el.given,
            letterAngle : -115,
            letterRotRadius : 35,
        },
        { rgn: 'S',
            pcolor: el.center,
            letterAngle : 90,
            letterRotRadius : 35,
            draggableX  : true,
            draggableY  : true,
        },
        { rgn: 'P',
            pos: P,
            pcolor: el.body,
            letterAngle : 70,
            draggableX  : true,
            draggableY  : true,
        },
        { rgn: 'Q',
            pos: Q,
            pcolor: el.proof,
            letterAngle : 225,
            letterRotRadius : 40,
            draggableX  : true,
            draggableY  : true,
        },
        //---------------------------------------
        // \\// draggable points
        //---------------------------------------
    ]);
    //*************************************
    // \\// points
    //*************************************

    //*************************************
    // //\\ lines
    //*************************************
    apush( gshapes, [
    {
        kind: LINE,
        rgn: 'A,AA',
        pcolor: el.semiaxes
    },
        { rgn: 'B,BB', pcolor: el.semiaxes},
        //-----------------------------------------
        // //\\ Book's prop. 11
        //-----------------------------------------
        { rgn: 'Qx', pcolor: el.proof},
        { rgn: 'PH', pcolor: el.proof},
        { rgn: 'HI', pcolor: el.proof},
        { rgn: 'OS', pcolor: el.center,
            vectorTipIx : 0, caption : 'h', fontSize : 35,
                    captionShiftNorm : -18,},
        { rgn: 'OH', pcolor: el.proof},
        { rgn: 'PI', pcolor: el.proof},
        //-----------------------------------------
        // \\// Book's prop. 11
        //-----------------------------------------
        { rgn: 'PC', pcolor: el.proof},
        { rgn: 'SP', pcolor: el.center, vectorTipIx : 1,
                    caption : 'r𝛙', captionShiftNorm : 18, },
        { rgn: 'P,Zminus', pcolor: el.body},
        { rgn: 'PZ', pcolor: el.body, vectorTipIx : 1, captionShiftNorm : -18,
                    fontSize : 35, caption : 'u', },
        { rgn: 'ZR', pcolor: el.body},
        { rgn: 'PR', pcolor: el.body},
        { rgn: 'QR', pcolor: el.proof},
        { rgn: 'SQ', pcolor: el.proof},
        { rgn: 'QT', pcolor: el.proof},
        { rgn: 'PT', pcolor: el.proof},
        { rgn: 'DK', pcolor: el.body},
        { rgn: 'GP', pcolor: el.body},
        { rgn: 'Qv', pcolor: el.proof},
        { rgn: 'Pv', pcolor: el.proof},
        { rgn: 'Tv', pcolor: el.proof},
        { rgn: 'vG', pcolor: el.proof},
        { rgn: 'PF', pcolor: el.proof},
        { rgn: 'AO', pcolor: el.semiaxes},
        { rgn: 'DO', pcolor: el.proof},
        { rgn: 'BO', pcolor: el.proof},
        { rgn: 'PO', pcolor: el.body, vectorTipIx : 0,
            caption : 'r', fontSize : 35,},
        { rgn: 'GO', pcolor: el.proof},
        { rgn: 'FO', pcolor: el.proof},
        //Book's "another solution"
        { rgn: 'Tu', pcolor: el.proof},
        { rgn: 'u,VV', pcolor: el.proof},
        { rgn: 'uP', pcolor: el.proof},
        { rgn: 'PQ', pcolor: el.proof},
        { rgn: 'P,VV', pcolor: el.proof},
        { rgn: 'P,tCircleCenter', pcolor: el.curvature},

        { rgn: 'FF,O', pcolor: el.given, vectorTipIx : 1, caption : 'c',
                        fontSize : 35,},
        { rgn: 'S,FF', pcolor: el.center, vectorTipIx : 1, caption : 'q',
                        fontSize : 35,
                        // captionShiftNorm : 18, //already default
                   },
        { rgn: 'FF,P', pcolor: el.body, caption : '𝗽', captionShiftNorm : -18,
                        vectorTipIx : 1},

        { rgn: 'EP', pcolor: el.proof, vectorTipIx : 1,
            caption : '𝙜', fontSize : 35, },
        { rgn: 'ES', pcolor: el.proof},
        { rgn: 'EI', pcolor: el.proof},
        { rgn: 'EO', pcolor: el.proof},
    ]);

    //***************************************************************
    // \\// geometics parameters
    //***************************************************************
    apush( gshapes, [
        {
            kind: CONST.CURVE,
            rgn: 'borbit',
            initShapes: ()=>{
                stdMod.init__Shapes()
            },
            //todm apparently needs implementation
            //cssClass: 'subessay--off-comparing-proof-steps',
        },
        {
            //todm not in need?
            rgn: 'curvatureCircle', //reserves rg spot
        }
    ]);
}}})}