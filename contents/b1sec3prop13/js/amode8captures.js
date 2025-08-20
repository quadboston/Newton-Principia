( function() {
    var { 
        nspaste, toreg, mat, sDomF, ssF, stdMod, amode, rg, sconf, 
    } = window.b$l.apptree({ 
            ssFExportList : { amode2rgstate, }, 
    });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
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
        rg.media_scale.value  = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

        //==================================================
        // //\\ hide all, then specify which to show
        //==================================================        
        for(key in rg) {
            if(rg[key]) {
                rg[key].undisplay = true;
            }
        };

        var features = [
            'M', 'A', 'S', 'N', 'Q', 'R', 'T', 'x', 'v', 'P', // points
            'QR', 'QT', 'SP', 'GP', 'Pv', 'Qv', 'Qx', 'Px', 'Tx', 'SA', 'xv',
            'PM', 'SM', 'NS', 'NP', 'A,AA',
            'PR', 'P,Zminus', //tangent
        ];
        
        features.forEach( i => {
            rg[i].undisplay = false;
        });
        //==================================================
        // \\// hide all, then specify which to show
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
        op.sagittaDelta_q = op.sagittaDelta_q_initial;

        if (sconf.Fi_distance != null) {
            nspaste( rg.Fi.pos, [
                sconf.Fi_distance * Math.cos( rg.P.q ),
                sconf.Fi_distance * Math.sin( rg.P.q ),
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

