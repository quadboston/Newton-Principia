( function() {
    var {
        ns, sn, has, nspaste, capture, toreg, mat,
        sDomF, ssD, ssF, fconf,
        stdMod, amode, rg, sconf,
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
        nspaste( capture,
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


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
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

        var media_scale         = toreg( 'media_scale' )();
        rg.media_scale.value    = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        {
            ////restores original pivots positions
            let ini = sconf.originalPoints.curvePivots_initial;
            sconf.originalPoints.curvePivots.forEach( (cp,ix) => {
                nspaste( cp.rgX.pos, ini[ix].rgX.pos );
            });
            //sets and paints initial orbit
            stdMod.pointsArr_2_singleDividedDifferences(
                false, 'force', false, false, 'swap' );
        }
        var op        = sconf.orbitParameters;
        op.angleOmega = op.angleOmega_initial;
        op.Kepler_v   = op.Kepler_v_initial;




        // //\\ hiding
        rg.nonSolvablePoint.undisplay = true;
        rg.Vangle.undisplay = true;
        rg.Vangle.hideD8Dpoint = true;
        rg[ 'V,Vangle' ].undisplay = true;
        rg.R.undisplay = false;
        rg.M.undisplay = true;
        rg.Z.undisplay = true;
        rg.vgpoint.undisplay = true;
        rg.Zgpoint.undisplay = true;
        if( fconf.sappId === 'b1sec8prop41' ) {
            //nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );
            if( aspect === 'addendum' ) {
                //rg.Vangle.undisplay = false;
                //rg.Vangle.hideD8Dpoint = false;
                rg.R.undisplay = true;
            }
            /*
            {
                //// scholium
                let imgVisib = 'hidden';
                stdMod.svgScene$.css( 'visibility', imgVisib );
            }
            */
        }

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        //sDomF.detected_user_interaction_effect( );
        return captured;
    }

}) ();

