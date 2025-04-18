( function() {
    var {
        ns, sn, paste, capture, nspaste, userOptions,
        fconf, sconf, sDomF, ssD, ssF, globalCss, sData,
        stdMod, amode, toreg, rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2rgstate,
        },
    });

    ///diff and Euclid tangents are equal
    var ANGLE_EQUALS = ssD[ "L-equal-d curveRotationAngle" ] = 
    {
        "angle": 0.10579977792284677,
        "sin": 0.10560250842053673,
        "cos": 0.9944084222367038
    };

    //this is Books origin, authentic N. drawing,
    //curveRotationAngle = 0,
    var ANGLE_AUTH = ssD.authenticOriginal_curveRotationAngle =
    {
        "angle": 0,
        "sin": 0,
        "cos": 1
    };

    setCapture();


    function setCapture()
    {
        paste( capture,
        {
            "reset-to-origin" : {
                    curveRotationAngle : Object.assign( ANGLE_AUTH ),
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


            "L-equal-d" :  {
                    curveRotationAngle : Object.assign( ANGLE_EQUALS ),
                    "B": {
                           "unrotatedParameterX": 0.7745228215767634
                    }
            },

            "closer": {
                    "curveRotationAngle": Object.assign( ANGLE_AUTH ),
                    "B": {
                           "unrotatedParameterX": 0.5658328716632559
                    }
            },

            "more-closer": {
                    "curveRotationAngle": Object.assign( ANGLE_AUTH ),
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
                    "BF" : { "undisplay" : false }, //show in svg
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
        var { logic_phase, aspect, subessay } = amode;
        //------------------------------------------------
        // //\\ returns diagram back at every menu click
        //      todm: this is a patch: do streamline
        //------------------------------------------------
        {
            nspaste( rg[ "media-mover" ].achieved,
                {
                    "achieved": [
                        sconf.originX_onPicture, //492,
                        sconf.originY_onPicture, //565
                    ]
                }
            );
            //todm: without this diagram does not return back immediately, only after a click
            var ach = rg[ "media-mover" ].achieved.achieved;
            sconf.modorInPicX = ach[0];
            sconf.modorInPicY = ach[1];
        }
        //------------------------------------------------
        // \\// returns diagram back at every menu click
        //------------------------------------------------

        //----------------------------------
        // //\\ common values
        //----------------------------------
        rg.A.undisplay              = false;
        rg.B.undisplay              = false;
        rg.AB.undisplay             = false;
        rg[ 'arc-AB' ].undisplay    = false;

        //idle?:
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );

        ns.paste( rg.curveEnd.pos, ssD.curveEndInitialPos );
        ssD.repoConf.customFunction = 0;
        rg.B.unrotatedParameterX = 1;
        var media_scale = toreg( 'media_scale' )();
        //----------------------------------
        // \\// common values
        //----------------------------------

        
        //*****************************************************************************
        // //\\ lemma 7
        //*****************************************************************************
        if(
            amode.subessay === 'derivative' ||
            amode.subessay === 'sine derivative' ||
            amode.subessay === 'vector-derivative'
        ){
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
                'arc-Ab',

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
                    //'arc-Ab',
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
        if(
            amode.subessay === 'vector-derivative'
        ){
            [
                'arc-Ab',
                'Ad',
                'b',
            ].forEach( gname => { rg[ gname ].undisplay = false; });
        }

        if( amode.subessay === 'derivative' ||
            amode.subessay === 'sine derivative' ||
            amode.subessay === 'vector-derivative'
        ){
            rg.media_scale.value = 0.45;
            ssF.scaleValue2app( rg.media_scale.value, stdMod );
        } else if( amode.subessay === 'sin(x)/x' ) {
            rg.media_scale.value = 0.8;
            ssF.scaleValue2app( rg.media_scale.value, stdMod );
        }

        
        if( logic_phase === 'corollary' ) {
            [
                'curve-AB',
                'left-curve-AB',
                'arc-AB',
                'AD',
                'BD',
                'D',
                'C',
            ].forEach( gname => { rg[ gname ].undisplay = false; });
            if( subessay === 'cor-1' ) {
                captured = "colollary-1";
            } else if( subessay === 'cor-2' || subessay === 'cor-3' ) {
                captured = "colollary-2";
            }
        } else if( aspect !== 'model' ) {
            sDomF.detected_user_interaction_effect( 'doUndetected' );
            captured = "L-equal-d";
            rg.media_scale.value = 1;
            ssF.scaleValue2app( rg.media_scale.value, stdMod );

            ns.paste( rg.curveStart.pos, [ -0.2, 0 ] );
            ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );
            [
                'C',
                'D',
                'BD',
                'AD',
                'curve-AB',
            ].forEach( gname => { rg[ gname ].undisplay = false; });

            if( logic_phase === 'proof' ) {
                sDomF.detected_user_interaction_effect( 'doUndetected' );
                [
                    'c',
                    'd',
                    //'r',
                    'Ad',
                    'rd',
                    'bd',

                    'b',
                    'Ab',
                    'arc-Ab',

                    //'AL',
                    //'L',
                ].forEach( gname => { rg[ gname ].undisplay = false; });
                rg.L.hideD8Dpoint   = false;
            }
        }
        
        //*****************************************************************************
        // \\// lemma 7
        //*****************************************************************************
        
        nspaste( rg.B.pos, rg.B.originalPos );
        nspaste(rg.R.pos, rg.R.originalPos);
        nspaste(rg.D.pos, rg.D.originalPos);
        rg.B.unrotatedParameterX = rg.B.originalPos[0];

        rg[ 'left-curve-AB' ].undisplay = aspect === 'model';
        rg['A,DLeft'].undisplay = aspect === 'model';
        return captured;
    }

}) ();

