( function() {
    var {
        ns, sn, paste, capture, amode, toreg,
        studyMods, rg, sDomF, ssD, ssF, fconf,
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
            /*
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
            */
        });
    }


    function amode2rgstate( captured )
    {
        var { theorion, aspect, submodel, subessay } = amode;
        var stdMod = studyMods[ submodel ];
        //----------------------------------
        // //\\ common values
        //----------------------------------
        /*
        rg.A.undisplay              = false;
        ns.paste( rg.curveStart.pos, ssD.curveStartInitialPos );
        ssD.repoConf.customFunction = 0;
        */
        var media_scale = toreg( 'media_scale' )();
        //----------------------------------
        // \\// common values
        //----------------------------------


        if( theorion === 'proof' ){

            //todo ... why was it 0.7? and not 1?
            //         this made problems with bars number > DONT_PAINT_BARS_MORE_THAN
            rg.media_scale.value = 1; //0.7;

            ssF.scaleValue2app( rg.media_scale.value, stdMod );
            sDomF.detected_user_interaction_effect( !'doUndetected' );

                /*

                var cPivots = sconf.originalPoints.curvePivots;
                var cpPoints = [];
                cPivots.forEach( (pivot,pix) => {
                    var rgX     = pivot.rgX;
                    var pos     = rgX.pos;
                    var x       = pos[0];
                    var y       = pos[1];
                    cpPoints.push( [x,y] );
                });

                var rPivots = sconf.originalPoints.rightCurvePivots_normalized;
                var rpPoints = [];
                rPivots.forEach( (pivot,pix) => {
                    var rgX     = pivot.rgX;
                    var pos     = rgX.pos;
                    var x       = pos[0];
                    var y       = pos[1];
                    rpPoints.push( [x,y] );
                });

                fapp.captureState(
                    ns.paste(
                        {
                            curvePivots_points : cpPoints,
                            curveRightPivots_points : rpPoints,
                        },
                        ast
                    )
                );
                ccc( captured )
                */





        } else {
            rg.media_scale.value = 1;
            ssF.scaleValue2app( rg.media_scale.value, stdMod );
        }
        //*****************************************************************************
        // \\// lemma 7
        //*****************************************************************************

        return captured;
    }

}) ();

