( function() {
    var { 
        nspaste, toreg, mat, sDomF, ssF, stdMod, amode, rg, sconf, 
    } = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        //called 1x on page load, then once more when switching tabs
        //console.log('amode8captures.js'); 

        var { logic_phase, aspect, subessay } = amode;

        sDomF.resetModelPos();

        toreg( 'media_scale' )();
        rg.media_scale.value = 1;
        ssF.scaleValue2app( rg.media_scale.value, stdMod );

		rg.vSample.hideD8Dpoint =
			// for this corollary, p's velocity is determined by the force
			logic_phase === 'corollary' && amode.subessay === 'corollary2';
			
        //=============================================================
        // //\\ model (reset to starting positions)
        //=============================================================
        var op           = sconf.orbitParameters;
        op.mainAxisAngle = op.mainAxisAngle_initial;

        // //\\ "draws" conics and P
        //1
        op.latus         = op.latusInitial;
        //2
        stdMod.establishesEccentricity( op.initialEccentricity );
        op.PparQ_initial = op.PparQ_initial_essay
        if( logic_phase === 'corollary'){
            op.PparQ_initial = 0;
        }
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
        op.delta_t  = op.delta_t_initial;

        rg.P.abs = mat.unitVector( rg.P.pos ).abs;

        //-------------------------------------------------
        // //\\ op 
        //-------------------------------------------------
        op.cosOmega = op.cosOmega_initial;
        op.om       = op.om_initial;
        if( logic_phase === 'corollary'){ //Pv can only be dragged vertically
            op.om = 1;
            op.cosOmega = 0;
            rg.P.q      = 0;
            nspaste( rg.P.pos, rg[ 'approximated-curve' ].t2xy( rg.P.q ));
            rg.P.abs = mat.unitVector( rg.P.pos ).abs;
        }
        //-------------------------------------------------
        // \\// op 
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ sop 
        //-------------------------------------------------
        var sop      = sconf.sampleOrbitParameters;
        sop.latus    = sop.latusInitial;
        sop.Kepler_g = op.Kepler_gInitial;
        sop.Kepler_v = sop.Kepler_v_initial;
        sop.cosOmega = sop.cosOmega_initial;
        sop.om       = sop.om_initial;
        if( logic_phase === 'corollary' && amode.subessay === 'corollary2' ){
            sop.om = 1;
            sop.cosOmega = 0;
            sop.latus = sop.corII_DVect.abs;
            stdMod.establishesEccentricity(
                0,
                null,
                sop,
            );
            sop.corII_speed = Math.sqrt( op.Kepler_g / sop.corII_DVect.abs );
            sop.Kepler_v    = sop.corII_speed;
            rg.p.q          = 0;
            sop.mainAxisAngle = 0;
            sop.r2axisX_angle = 0;
        } else {
            rg.p.q      = sop.PparQ_initial;
            sop.latus   = sop.latusInitial;
            stdMod.establishesEccentricity(
                sop.initialEccentricity,
                null,
                sop,
            );

            sop.r2axisX_angle = sop.r2axisX_angle_initial;
            sop.mainAxisAngle = sop.r2axisX_angle - rg.p.q;
        }
        sop.delta_t  = sop.delta_t_initial;
        //-------------------------------------------------
        // \\// sop 
        //-------------------------------------------------
        //=============================================================
        // \\// model
        //=============================================================

        //comment out to remove Book's diagram after timeout
        sDomF.detected_user_interaction_effect( 'doUndetected' );
        return captured;
    }
}) ();