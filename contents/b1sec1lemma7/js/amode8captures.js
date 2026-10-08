( function() {
    var {
        ns, paste, capture, nspaste, sDomF, ssD, amode, rg,
    } = window.b$l.apptree({
        ssFExportList : {
            amode2rgstate,
        },
    });

    // curve rotation at which the differential and Euclid tangents are equal
    const EQUAL_TANGENTS_ANGLE = 0.10579977792284677;

    ///diff and Euclid tangents are equal
    var ANGLE_EQUALS = ssD[ "L-equal-d curveRotationAngle" ] =
    {
        "angle": EQUAL_TANGENTS_ANGLE,
        "sin": Math.sin( EQUAL_TANGENTS_ANGLE ),
        "cos": Math.cos( EQUAL_TANGENTS_ANGLE ),
    };

    //this is Books origin, authentic N. drawing,
    //curveRotationAngle = 0,
    var ANGLE_AUTH = ssD.authenticOriginal_curveRotationAngle =
    {
        "angle": 0,
        "sin": 0,
        "cos": 1
    };

    // B's starting position on the curve
    const B_PARAM_BOOK = 0.7745228215767634;

    // model origin in the picture; must match modorInPicX, modorInPicY
    // in sconf.js, which are not set yet when this module runs
    const MODEL_ORIGIN_IN_PIC = [ 140, 61 ];

    setCapture();
    return;


    function setCapture()
    {
        paste( capture,
        {
            "reset-to-origin" : {
                    curveRotationAngle : Object.assign( ANGLE_AUTH ),
                    "diagram-panner": {
                        "achieved": {
                            "achieved": MODEL_ORIGIN_IN_PIC
                        }
                    },
                    "B": {
                            "unrotatedParameterX": B_PARAM_BOOK
                    }
            },


            "L-equal-d" :  {
                    curveRotationAngle : Object.assign( ANGLE_EQUALS ),
                    "B": {
                           "unrotatedParameterX": B_PARAM_BOOK
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
                    "curveRotationAngle": ANGLE_EQUALS,
                    "B": {
                            "unrotatedParameterX": B_PARAM_BOOK
                    }
            },


            "colollary-2": {
                    "curveRotationAngle": ANGLE_EQUALS,
                    "B": {
                            "unrotatedParameterX": B_PARAM_BOOK
                    }
            },

            "meet": {
                    "curveRotationAngle": ANGLE_EQUALS,
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
		rg[ 'arc-Ab' ].undisplay    = logic_phase !== 'given';

        //idle?:
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );

        ns.paste( rg.curveEnd.pos, ssD.curveEndInitialPos );
        ssD.repoConf.customFunction = 0;
        rg.B.unrotatedParameterX = 1;
        //----------------------------------
        // \\// common values
        //----------------------------------

        if( logic_phase === 'corollary' ) {
            if( subessay === 'cor-1' ) {
                captured = "colollary-1";
            } else if( subessay === 'cor-2' || subessay === 'cor-3' ) {
                captured = "colollary-2";
            }
        } else if( aspect !== 'model' ) {
            captured = "L-equal-d";

            ns.paste( rg.curveStart.pos, [ -0.2, 0 ] );
            ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );

            if( logic_phase === 'proof' ) {
				rg[ 'arc-Ab' ].undisplay = false;
			}
        }
        
        nspaste( rg.B.pos, rg.B.originalPos );
        nspaste(rg.R.pos, rg.R.originalPos);
        nspaste(rg.D.pos, rg.D.originalPos);
        rg.B.unrotatedParameterX = rg.B.originalPos[0];

        return captured;
    }

}) ();
