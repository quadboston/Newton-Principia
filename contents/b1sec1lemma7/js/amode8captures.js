( function() {
    var {
        ns, paste, capture, nspaste, sDomF, ssD, ssF, stdMod, amode, toreg, rg,
    } = window.b$l.apptree({
        ssFExportList : {
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
    return;


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

        });
    }


    function amode2rgstate( captured )
    {
        var { logic_phase, aspect, subessay } = amode;

        sDomF.resetModelPos();

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
            }
        }
        
        nspaste( rg.B.pos, rg.B.originalPos );
        nspaste(rg.R.pos, rg.R.originalPos);
        nspaste(rg.D.pos, rg.D.originalPos);
        rg.B.unrotatedParameterX = rg.B.originalPos[0];

        rg[ 'left-curve-AB' ].undisplay = aspect === 'model';
        rg['A,DLeft'].undisplay = aspect === 'model';
        return captured;
    }

}) ();

