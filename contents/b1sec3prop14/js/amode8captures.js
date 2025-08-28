( function() {
    var { nspaste, toreg, mat, sDomF, ssF, fconf, stdMod, amode,
        rg, sconf, } = window.b$l.apptree({ 
            ssFExportList : { amode2rgstate, }, 
        });
    return;


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

        toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        //==================================================
        // //\\ decorations
        //==================================================

        //==================================================
        // //\\ hide
        //==================================================  

        var common = [
            'F', 'O', 'x', 'H', 'B', 'A', 'Zminus'
        ];

        var p14 = [
            'omegaHandle',
            'P,omegaHandle', 'SY'
        ];

        var p16 = [
            'vb', 'P,vb',
        ];

        var items = common.concat("b1sec3prop14" === fconf.sappId ? p14 : p16);
        
        items.forEach( i => {
            rg[i].undisplay = true;
        });
        //==================================================
        // \\// hide
        //==================================================


        if( "b1sec3prop14" === fconf.sappId ) {
            rg.vb.hideD8Dpoint = false;
            rg.L.hideD8Dpoint = true;
        }

        if( fconf.sappId === 'b1sec3prop16' ) {
            rg.vb.hideD8Dpoint = true;
            rg.omegaHandle.hideD8Dpoint = false;
            rg.L.hideD8Dpoint = false;
            stdMod.imgRk.dom$.css( 'visibility', 'visible' );
            stdMod.svgScene$.css( 'visibility', 'visible' );
            if( logic_phase === 'corollary' ) {
                if( subessay === "corollary1" ) {
                    ////latus on others: swaps latus and speed
                    rg.vb.hideD8Dpoint = false;
                    rg.L.hideD8Dpoint = true;
                } else {
                    stdMod.imgRk.dom$.css( 'visibility', 'hidden' );
                    stdMod.svgScene$.css( 'visibility', 'hidden' );
                }
            }
        }

        //==================================================
        // \\// decorations
        //==================================================

        //=============================================================
        // //\\ model
        //=============================================================
        var op           = sconf.orbitParameters;
        op.mainAxisAngle = op.mainAxisAngle_initial;

        // //\\ "draws" conics and P
        //1
        op.latus         = op.latusInitial;
        //2
        stdMod.establishesEccentricity( op.initialEccentricity )
        //3
        rg.P.q      = op.PparQ_initial;
        //4
        nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( op.PparQ_initial ));
        // \\// "draws" conics and P

        rg.S.pos[0] = 0;
        rg.S.pos[1] = 0;

        rg.P.posInitialUnitVector = mat.unitVector( rg.P.pos );
        op.Kepler_g = op.Kepler_gInitial;
        op.Kepler_v = op.Kepler_v_initial; //this supposed to be redundant
        op.Dt = op.Dt0;
        nspaste( rg.omegaHandle.pos, rg.omegaHandle.initialPos );
        op.sagittaDelta_q = op.sagittaDelta_q_initial;

        if( fconf.sappId === "b1sec3prop16" ) {
            op.cosOmega = op.cosOmega_initial;
            op.om       = op.om_initial;
        }

        if (sconf.Fi_distance != null) {
            //op.Dt = op.Dt0;
            rg.P.abs = mat.unitVector( rg.P.pos ).abs;
            nspaste( rg.Fi.pos, [
                sconf.Fi_distance * Math.cos( op.mainAxisAngle ),
                sconf.Fi_distance * Math.sin( op.mainAxisAngle ),
            ]);
        }
        //=============================================================
        // \\// model
        //=============================================================

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }

}) ();

