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

        sData[ 'proof-pop-up' ].dom$.css( 'display', 'none' );

        rg.L.doPaintPname = false;
        captured = "reset-to-origin";
        if( logic_phase === 'claim' ) {
                captured = 'L-equal-d';
        }
        //ns.paste( rg.curveStart.pos, [ -0.2, 0 ] );
        ns.paste( rg.curveEnd.pos, [ ssD.curveEndInitialPos[0], 0 ] );
        [
            'curve-AB',
            'left-curve-AB',
            'arc-AB',
            'AD',
            'D',
            'C',
        ].forEach( gname => { rg[ gname ].undisplay = false; });
        if( logic_phase === 'proof' || logic_phase === 'claim' ) {
            sDomF.detected_user_interaction_effect( 'doUndetected' );
            [
                'curve-AB',
                'AD',
            ].forEach( gname => { rg[ gname ].undisplay = false; });
            rg.L.hideD8Dpoint   = false;
        }

        //below we do add points and lines which are absent in N. proof
        if( logic_phase === 'proof') {
            rg.L.hideCaption = true;
            [
                'AL',
                'L',
            ].forEach( gname => { rg[ gname ].undisplay = false; });
        }

        if(
            ( logic_phase === 'proof' || logic_phase === 'claim' ) && aspect === 'model'
        ) {
            [
                'arc-Ab',
                'Ab',
                'b',
                'd',
                'r',
                'rd',
                'dr',
            ].forEach( gname => { rg[ gname ].undisplay = false; });

            ///this still needs user action to replace Book's letters with
            ///pop up app. letters
            if( logic_phase === 'proof' ) {
                rg.curveRotationAngle.angle = ANGLE_AUTH;
                sDomF.detected_user_interaction_effect( !'doUndetected' );
                rg.L.undisplay = false;
                rg.L.hideCaption = false;
                rg.L.doPaintPname = true;

                ///shows differential tangent row in data table
                globalCss.update( `
                    .main-legend.proof tr:nth-child(4)
                    {
                        display : table-row;
                    }`,
                    'table-patch',
                );

            } else {
                rg.L.undisplay = true;
                rg.L.hideCaption = true;
                rg.L.doPaintPname = false;
            }
        }

        rg[ 'left-curve-AB' ].undisplay = aspect === 'model';
        rg['A,DLeft'].undisplay = aspect === 'model';
        return captured;
    }

}) ();

