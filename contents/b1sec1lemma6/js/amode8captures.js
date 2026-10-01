( function() {
    var {
        ns, paste, capture,
        sDomF, ssD, globalCss, sData,
        amode, rg,
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

            // location for text "approach each other"
            "true-convergence-1": {
                    "curveRotationAngle": ANGLE_EQUALS,
                    "B": {
                            "unrotatedParameterX": 0.5232929802797621
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
