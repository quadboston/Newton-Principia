( function() {
    var {
        ns, sn, paste, capture, nspaste, userOptions,
        fconf, sconf, sDomF, ssD, ssF, globalCss, sData,
        stdMod, amode, toreg, rg,
    } = window.b$l.apptree({
        ssFExportList : {
            amode2rgstate,
        },
    });

    ///diff and Euclid tangents are equal
    var ANGLE_EQUALS = ssD[ "L-equal-d curveRotationAngle" ] = 
    {
        "angle": 0,
        "sin": 0,
        "cos": 1
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
        var { textSection, aspect, subessay } = amode;
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


        sData[ 'proof-pop-up' ].dom$.css( 'display', 'none' );

        //*****************************************************************************
        // //\\ lemma 8
        //*****************************************************************************
        sDomF.detected_user_interaction_effect( 'doUndetected' );

        captured = '';

        nspaste( rg.B.pos, rg.B.originalPos );
        rg.B.unrotatedParameterX = rg.B.originalPos[0]; //what a misleading naming

        nspaste(rg.R.pos, rg.R.originalPos);
        rg.fi.pos[0] = rg.R.pos[0];
        rg.fi.pos[1] = rg.R.pos[1] * 1.2;

        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        ns.paste( rg.curveStart.pos, [ -0.2, 0 ] ); //todm what is this?
        ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );

        [
            //'dr-decorpoint',
        ].forEach( gname => { rg[ gname ].undisplay = true; });

        rg.L.hideD8Dpoint   = true;

        [
            'D',
            'R',
            'C',
            'AR',
            'AD',
            'BD',
            'BR',
            'RD',
            'curve-AB',
            'fi',
        ].forEach( gname => { rg[ gname ].undisplay = false; });

        if( textSection === 'claim' ) {
            [
                'c',
                'rd',
                'rb',
                'imageOfR',
                'imageOfD',
                'A,imageOfD',
                'A,imageOfR',
                'imageOfR,b',
                'imageOfR,imageOfD',
            ].forEach( gname => { rg[ gname ].undisplay = true; });
        } else if( textSection === 'proof' ) {
            [
                'c',
                //'d',
                //'r',
                'b',
                'Ab',
                'Ad',
                'rd',
                //'rb',
                'bd',
                'Ar',
                'imageOfR',
                'imageOfD',
                'A,imageOfD',
                'A,imageOfR',
                'imageOfR,b',
                'imageOfR,imageOfD',
                'arc-Ab',
            ].forEach( gname => { rg[ gname ].undisplay = false; });
        }
        if( textSection === 'claim' || textSection === 'corollary' ) {
            if( userOptions.showingBonusFeatures() ) {
                rg.B.hideD8Dpoint   = false;
                rg.R.hideD8Dpoint   = false;
            } else {
                rg.B.hideD8Dpoint   = false;
                rg.R.hideD8Dpoint   = true;
            }
        }    
        if( subessay === 'interpretation1' ) {
            if( userOptions.showingBonusFeatures() ) {
                rg.B.hideD8Dpoint   = true;
                rg.R.hideD8Dpoint   = false;
            } else {
                rg.B.hideD8Dpoint   = false;
                rg.R.hideD8Dpoint   = true;
            }
        } else if( subessay === 'interpretation2' ) {
            rg.B.hideD8Dpoint   = false;
            rg.R.hideD8Dpoint   = true;
        }
        //*****************************************************************************
        // \\// lemma 8
        //*****************************************************************************
        rg[ 'left-curve-AB' ].undisplay = aspect === 'model';
        rg['A,DLeft'].undisplay = aspect === 'model';
        return captured;
    }

}) ();

