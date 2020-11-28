( function() {
    var {
        ns, sn, paste, capture, amode, rg, sDomF, ssD, ssF, fconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2rgstate,
        },
    });
    setCapture();
    return;






    function setCapture()
    {
        paste( capture,
        {
            "reset-to-origin": {
                    "curveRotationAngle": {
                        "angle": 0,
                        "sin": 0,
                        "cos": 1
                    },
                    "media-mover": {
                        "achieved": {
                            "achieved": [
                                140,
                                61
                            ]
                        }
                    },
                    "B": {
                            "unrotatedParameterX": 0.7745228215767634
                    }
            },


            "L-equal-d": {
                    "curveRotationAngle": {
                        "angle": 0.10579977792284677,
                        "sin": 0.10560250842053673,
                        "cos": 0.9944084222367038
                    },
                    "B": {
                           "unrotatedParameterX": 0.7745228215767634
                    }
            },

            "closer": {
                    "curveRotationAngle": {
                        "angle": 0,
                        "sin": 0,
                        "cos": 1
                    },
                    "B": {
                           "unrotatedParameterX": 0.5658328716632559
                    }
            },

            "more-closer": {
                    "curveRotationAngle": {
                        "angle": 0,
                        "sin": 0,
                        "cos": 1
                    },
                    "B": {
                           "unrotatedParameterX": 0.10102343776498918
                    }
            },


            "true-convergence-1": {
                    "curveRotationAngle": {
                        "angle": 0.10579977792284677,
                        "sin": 0.10560250842053673,
                        "cos": 0.9944084222367038
                    },
                    "B": {
                            "unrotatedParameterX": 0.5232929802797621
                    }
            },

            "colollary-1": {
                    "BF" : { "undisplay" : false },
                    "AF" : { "undisplay" : false },
                    "F"  : { "undisplay" : false },

                    "BG" : { "undisplay" : true },
                    "AE" : { "undisplay" : true },
                    "BE" : { "undisplay" : true },
                    "AG" : { "undisplay" : true },
                    "G"  : { "undisplay" : true },
                    "E"  : { "undisplay" : true },

                    "curveRotationAngle": {
                        "angle": 0.10579977792284677,
                        "sin": 0.10560250842053673,
                        "cos": 0.9944084222367038
                    },
                    "B": {
                            "unrotatedParameterX": 0.7745228215767634
                    }
            },


            "colollary-2": {
                    "BF" : { "undisplay" : false },
                    "AF" : { "undisplay" : false },
                    "F"  : { "undisplay" : false },

                    "BG" : { "undisplay" : false },
                    "AE" : { "undisplay" : false },
                    "BE" : { "undisplay" : false },
                    "AG" : { "undisplay" : false },
                    "E"  : { "undisplay" : false },
                    "G"  : { "undisplay" : false },

                    "curveRotationAngle": {
                        "angle": 0.10579977792284677,
                        "sin": 0.10560250842053673,
                        "cos": 0.9944084222367038
                    },
                    "B": {
                            "unrotatedParameterX": 0.7745228215767634
                    }
            },

            "meet": {
                    "curveRotationAngle": {
                        "angle": 0.10579977792284677,
                        "sin": 0.10560250842053673,
                        "cos": 0.9944084222367038
                    },
                    "B": {
                            "unrotatedParameterX": 0.001
                    }
            },


            "analytic-derivative" :
            {
                "media-mover": {
                    "achieved": {
                        "achieved": [
                            220.438,
                            222.515
                        ]
                    }
                },
                "curveRotationAngle": {
                    "angle": 0.10579977792284677,
                    "sin": 0.10560250842053673,
                    "cos": 0.9944084222367038
                }
            },



        });
    }


    function amode2rgstate( captured )
    {
        var { theorion, aspect, submodel, subessay } = amode;
        //----------------------------------
        // //\\ common values
        //----------------------------------
        rg.A.undisplay              = false;
        rg.B.undisplay              = false;
        rg.AB.undisplay             = false;
        rg[ 'arc-AB' ].undisplay    = false;
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );
        ns.paste( rg.curveEnd.pos, ssD.curveEndInitialPos );
        ssD.repoConf.customFunction = 0;
        rg.B.unrotatedParameterX = 1;

        var media_scale = ssF.toreg( 'media_scale' )();
        //----------------------------------
        // \\// common values
        //----------------------------------







        //*****************************************************************************
        // //\\ lemma 6
        //*****************************************************************************
        if( fconf.sappId === "b1sec1lemma6" ) {
            captured = "reset-to-origin";
            ns.paste( rg.curveStart.pos, [ -0.2, 0 ] );
            ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );
            [
                'curve-AB',
                'arc-AB',
                'AD',
                'D',
            ].forEach( gname => { rg[ gname ].undisplay = false; });
            if(
                theorion === 'proof' ||
                theorion === 'claim' && aspect === 'model'
            ) {
                sDomF.detected_user_interaction_effect( 'doUndetected' );
                [
                    'curve-AB',
                    'arc-Ab',
                    'Ab',
                    'b',
                    'd',
                    'Ad',
                    'AD',
                    'r',
                    'rd',
                    'dr',
                    'AL',
                    'L',
                ].forEach( gname => { rg[ gname ].undisplay = false; });
                rg.L.hideD8Dpoint   = false;
            }
        }
        //*****************************************************************************
        // \\// lemma 6
        //*****************************************************************************










        
        //*****************************************************************************
        // //\\ lemma 7
        //*****************************************************************************
        if( fconf.sappId === "b1sec1lemma7" ) {
            if( amode.subessay === 'derivative' ||  amode.subessay === 'sine derivative' ){
                //sDomF.detected_user_interaction_effect();
                captured = "analytic-derivative";
                //=================================================
                // //\\ visibility
                //=================================================
                [
                    //addendum axes
                    'O',
                    'ytop',
                    'xtop',
                    'ylow,ytop',
                    'xlow,xtop',

                    //addendum axes points
                    'x',
                    'y',
                    'x0',
                    'y0',
                    //addendum axes points projection lines
                    'A,y0',
                    'By',
                    'A,x0',
                    'Bx',
                    //addendum axes increment projections
                    'x0,x',
                    'y0,y',

                    //microscope
                    'Ab',

                    //microscope axes points projections
                    'X',
                    'X0',
                    'Y',
                    'Y0',
                    //microscope axes increment projections
                    'X0,X',
                    'A,Y',

                    //tangent's angle
                    'tangentPhi',
                    'AL',
                    'L',
                    'd',

                    //decorations
                    'line-dr-start,dr-decorpoint',
                    'dr-decorpoint',
                    'A,line-AL-end',

                ].forEach( gname => { rg[ gname ].undisplay = false; });

                ///hides these graphicses
                if( amode.subessay === 'sine derivative' ){

                    rg.B.unrotatedParameterX = 1.3;
                    ns.paste( rg.curveStart.pos, [ rg.ytop.pos[0], 0 ] );
                    ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0]+0.7, 0 ] );
                    ssD.repoConf.customFunction = 1;
                    [
                        'AO',
                        'BO',
                        'Ab',
                        //microscope arc
                        'arc-Ab',
                        'phi0',
                        'deltaphi',
                    ].forEach( gname => { rg[ gname ].undisplay = false; });

                    [
                        //addendum axes points
                        'y',
                        'y0',
                        //addendum axes points projection lines
                        'A,y0',
                        'By',
                        //addendum axes increment projections
                        'y0,y',
                        //microscope points
                        'Y',
                        'Y0',
                        //microscope axes increment projections
                        'A,Y',
                    ].forEach( gname => { rg[ gname ].undisplay = true; });
                    rg.L.hideD8Dpoint = true;
                }
                //=================================================
                // \\// visibility
                //=================================================

            } else if( amode.subessay === 'sin(x)/x' ){

                rg.B.unrotatedParameterX = 1.5;

                ns.paste( rg.curveStart.pos, [ -0.2, 0 ] );
                ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0]+0.7, 0 ] );
                ssD.repoConf.customFunction = 1;

                rg.L.hideD8Dpoint = true;

                sDomF.detected_user_interaction_effect( !'doUndetected' );
                [
                    'Ar',
                    'Br',
                    'arc-AB',
                    'curve-AB',
                    'arc-Ab',
                    'deltaphi',
                    'r',
                    'E',
                    'e',
                    'b',
                    'd',

                    'AE',
                    'Ae',
                    'BE',
                    'Ab',

                    'Ad',
                    'dr',
                    'be',

                    'AL',
                    'L',
                ].forEach( gname => { rg[ gname ].undisplay = false; });
            }
            if( amode.subessay === 'derivative' ||  amode.subessay === 'sine derivative' ){
                rg.media_scale.value = 0.45;
                ssF.scaleValue2app( rg.media_scale.value );
            } else if( amode.subessay === 'sin(x)/x' ) {
                rg.media_scale.value = 0.8;
                ssF.scaleValue2app( rg.media_scale.value );
            }




            if(
                aspect !== 'model'
            ) {
                sDomF.detected_user_interaction_effect( 'doUndetected' );
                captured = "L-equal-d";
                rg.media_scale.value = 1;
                ssF.scaleValue2app( rg.media_scale.value );

                ns.paste( rg.curveStart.pos, [ -0.2, 0 ] );
                ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );
                [
                    'D',
                    'BD',
                    'AD',
                    'curve-AB',
                ].forEach( gname => { rg[ gname ].undisplay = false; });

                if( theorion === 'proof' ) {
                    sDomF.detected_user_interaction_effect( 'doUndetected' );
                    [
                        'd',
                        'r',
                        'Ad',
                        'rd',
                        'bd',

                        'b',
                        'Ab',
                        'arc-Ab',

                        'AL',
                        'L',
                    ].forEach( gname => { rg[ gname ].undisplay = false; });
                    rg.L.hideD8Dpoint   = false;
                }
            }
        }
        //*****************************************************************************
        // \\// lemma 7
        //*****************************************************************************

        return captured;
    }

}) ();

