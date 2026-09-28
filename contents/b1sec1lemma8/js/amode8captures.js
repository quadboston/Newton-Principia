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
                    "media-mover": {
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
        var { logic_phase, aspect } = amode;

        sDomF.resetModelPos();

        //----------------------------------
        // //\\ common values
        //----------------------------------
        //idle?:
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );

        ns.paste( rg.curveEnd.pos, ssD.curveEndInitialPos );
        ssD.repoConf.customFunction = 0;
        rg.B.unrotatedParameterX = 1;
        toreg( 'media_scale' );
        //----------------------------------
        // \\// common values
        //----------------------------------

        sDomF.detected_user_interaction_effect( 'doUndetected' );

        captured = '';

        nspaste( rg.B.pos, rg.B.originalPos );
        rg.B.unrotatedParameterX = rg.B.originalPos[0]; //what a misleading naming

        nspaste(rg.R.pos, rg.R.originalPos);
        nspaste(rg.D.pos, rg.D.originalPos);

        if(!rg.media_scale.value) {
            rg.media_scale.value = 1;
        }
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        ns.paste( rg.curveStart.pos, [ -0.2, 0 ] ); //todm what is this?
        ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );

		[
			'arc-Ab',
			'area-rAb',
			'area-rAd',
			'area-rAcb'
		].forEach( gname => { rg[ gname ].undisplay = logic_phase !== 'proof'; });
       
        rg[ 'left-curve-AB' ].undisplay = aspect === 'model';
        rg['A,DLeft'].undisplay = aspect === 'model';
        return captured;
    }

}) ();
