( function() {
    var {
        ns, paste, capture,
        sDomF, ssD, globalCss, sData,
        amode, toreg, rg,
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

            // location for text "approach each other"
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

        sData[ 'proof-pop-up' ].dom$.css( 'display', 'none' );

        captured = "reset-to-origin";
        if( logic_phase === 'claim' ) {
                captured = 'L-equal-d';
        }

        if(
            ( logic_phase === 'proof' || logic_phase === 'claim' ) && aspect === 'model'
        ) {
            ///this still needs user action to replace Book's letters with
            ///pop up app. letters
            if( logic_phase === 'proof' ) {
                rg.curveRotationAngle.angle = ANGLE_AUTH;
                sDomF.detected_user_interaction_effect( !'doUndetected' );

                ///shows differential tangent row in data table
                globalCss.update( `
                    .main-legend.proof tr:nth-child(4)
                    {
                        display : table-row;
                    }`,
                    'table-patch',
                );

            }
        }
        return captured;
    }

}) ();
