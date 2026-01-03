(function(){
    const { sn, haff, mat, mcurve, nspaste,
            fconf, sData, amode, stdMod, sconf, rg,
    } = window.b$l.apptree({ stdModExportList : {
            completesSlidersCreation,
        },
    });
    const conics = sn( 'conics', mat );
    const op = sn( 'orbitParameters', sconf );
    return;


function completesSlidersCreation (){
    haff( stdMod, 'completesSlidersCreation_addon' );

    //=========================================================================
    // //\\ point P slider
    //=========================================================================
    rg.Fi.acceptPos = newPos => {

        var sliderAbs = mat.p1_to_p2( rg.P.pos, rg.omegaHandle.pos ).abs;
        //-------------------------------------------------------------------
        // //\\ corrects approximate mouse point to exact point on the circle
        //-------------------------------------------------------------------
        var q = Math.atan2( newPos[1], newPos[0] );
        //if( !dQisInBranch( op.sagittaDelta_q, q ) ) return;

        var posAbs = mat.unitVector( newPos ).abs;
        //sets handle
        newPos[0] = posAbs*Math.cos( q );
        newPos[1] = posAbs*Math.sin( q );
        if( fconf.effId === "prop_from_14_to_17" ) {
            //sets main axis
            op.mainAxisAngle = q;
            //fixes P in respect to main axis
            rg.P.q = op.PparQ_initial - op.mainAxisAngle;
            op.latus = Math.abs( rg.P.abs *
                (1 - op.eccentricity * Math.cos( rg.P.q ) ) );
        } else {
            //sets body
            rg.P.q = q;
        }
        //-------------------------------------------------------------------
        // \\// corrects approximate mouse point to exact point on the circle
        //-------------------------------------------------------------------

        // **api-input---plane-curve-derivatives
        var { angleRV, rr } = mcurve.planeCurveDerivatives({
            fun : rg.approxer.t2xy,
            q : rg.P.q,
            rrc : rg.S.pos,
        });
        nspaste( rg.P.pos, rr );
        setsOmegaHandle( angleRV, sliderAbs );

        return true;
    }
    //=========================================================================
    // \\// point P slider
    //=========================================================================

    //=========================================================================
    // //\\ point Q slider
    //      for delta t
    //=========================================================================
    rg.Q.processOwnDownEvent = function() {
        ////apparently, there is no arg at this version,
        ////            and useless "function.this" === rg.Q
        sData.r_normal= [ -rg.P.ee[1], rg.P.ee[0] ];
        rg.P.angle = mat.atan2PI( rg.P.pos );
    };

    rg.Q.acceptPos = ( newPos, dragMove ) => {
        let Qangle = mat.atan2PI( newPos );
        var new_dq = Qangle - rg.P.angle;
        ///defloats dq
        if( Math.abs( new_dq ) < 0.0000001 ) {
            new_dq = 0.0000001 * ( new_dq >=0 ? 1:-1 );
        }
        if( !dQisInBranch( new_dq, rg.P.q ) ) return;
        op.sagittaDelta_q = new_dq;
        stdMod.model8media_upcreate();
    }
    //=========================================================================
    // \\// point Q slider
    //=========================================================================

    //=========================================================================
    // //\\ point L slider
    //      for omega
    //=========================================================================
    rg.L.processOwnDownEvent = function() {
        sData.Lpos0               = rg.L.pos[0];
        sData.Lpos1               = rg.L.pos[1];
        var dShift                = [ rg.L.pos[0] - rg.S.pos[0], rg.L.pos[1] - rg.S.pos[1] ];
        sData.dShift              = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
        sData.stashedOmega        = op.om;
        sData.stashedCosOmega     = op.cosOmega;
        sData.stashedLatus4slider = op.latus;
    };

    rg.L.acceptPos = ( newPos, dragMove ) => {
        var { logic_phase, aspect, subessay } = amode;

        var newPos0 = dragMove[0] + sData.Lpos0;
        var newPos1 = -dragMove[1] + sData.Lpos1;

        var dShift = [ newPos0 - rg.S.pos[0], newPos1 - rg.S.pos[1] ];
        var dS     = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
        if( dS < 0.00000001 ) return;
        var incr   = dS / sData.dShift;
        if( logic_phase === 'claim' || logic_phase === 'proof' ||
            fconf.sappId === 'b1sec3prop15'
        ){
            //speed on latus, omega = const
            var newLatus = incr * sData.stashedLatus4slider;
            var { e, fi, om, lat, r, eta, Kepler_v } = conics.innerPars2innerPars({
                r : rg.P.abs * (
                    op.conicSignum === -1 && Math.abs( rg.P.q ) < op.SINGULARITY_ANGLE ?
                        -1 : 1
                    ),
                lat : newLatus,
                e   : fconf.sappId === 'b1sec3prop15' ? op.eccentricity : null,
                om  : fconf.sappId === 'b1sec3prop15' ? null : sData.stashedOmega,
                fi  : fconf.sappId === 'b1sec3prop15' ? rg.P.q : null,
                signCosOmega : sData.stashedCosOmega,
                Kepler_g : op.Kepler_g,
            })
            op.Kepler_v         = Kepler_v;
            rg.P.q              = fi;


            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            op.mainAxisAngle    = op.PparQ_initial - fi;

            op.latus            = newLatus;
            stdMod.establishesEccentricity( e );

            // //\\ decorates Fi handle
            var posAbs = mat.unitVector( rg.Fi.pos ).abs;
            //sets handle
            rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
            rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
            // \\// decorates Fi handle
        }
        stdMod.model8media_upcreate();
    }
    //=========================================================================
    // \\// point L slider
    //=========================================================================

    //=========================================================================
    // //\\  body speed slider
    //=========================================================================
    rg.vb.processOwnDownEvent = function() {
        ////apparently, there is no arg at this version,
        ////            and useless "function.this" === rg.Q
        const pp                    = rg.P.pos;
        sData.vbpos                 = nspaste( [], rg.vb.pos );
        var dShift                  = [ sData.vbpos[0] - pp[0], sData.vbpos[1] - pp[1] ];
        var dS                      = dShift[0]*dShift[0] + dShift[1]*dShift[1];
        sData.stashedOmega          = op.om;
        sData.stashedCosOmega       = op.cosOmega;
        sData.dShift                = dS;
        sData.Kepler_v_stashed      = op.Kepler_v;
        sData.stashedR              = rg.P.abs;
        sData.stashedLatus4slider   = op.latus;
    };

    rg.vb.acceptPos = ( newPos, dragMove ) => {
        var { logic_phase, aspect, subessay } = amode;
        var newPos0  = dragMove[0] + sData.vbpos[0];
        var newPos1  = -dragMove[1] + sData.vbpos[1];
        //-------------------------------------------------------------------
        // //\\ corrects approximate mouse point to exact point on the circle
        //      todm redundant code
        //-------------------------------------------------------------------
        var newSinOmega = sData.stashedOmega;
        var signCosOmega = Math.sign( sData.stashedCosOmega );
        if( !(fconf.sappId === 'b1sec3prop17' && ( aspect === 'addendum' ||
                subessay == 'corollary1' || subessay == 'corollary2' ) )
        ){
            const pp      = rg.P.pos;
            const sl      = mat.p1_to_p2( pp, newPos ); //slider
            if( sl.abs < 0.2 ) return;
            let omega = mat.angleBetweenLines([
                [ [0,0], pp ],
                [ [0,0], sl.vector ],
            ]).angle;
            //--------------------------------
            // //\\ corrects extreme values
            //--------------------------------
            {
                //excludes unsafe values
                let LIM = Math.PI * 0.99999;
                if( Math.abs( omega ) > LIM ){
                    omega = Math.sign( omega ) > 0 ? LIM : -LIM;
                }
                if( Math.abs( omega ) < 0.000001 ){
                    omega = Math.sign( omega ) > 0 ? 0.000001 : -0.000001;
                }
            }

            //--------------------------------
            // \\// corrects extreme values
            //--------------------------------
            var newSinOmega = Math.sin( omega );
            var signCosOmega = Math.sign( Math.cos( omega ) );
        }
        //-------------------------------------------------------------------
        // \\// corrects approximate mouse point to exact point on the circle
        //-------------------------------------------------------------------

        var dShift   = [ newPos0 - rg.P.pos[0], newPos1 - rg.P.pos[1] ];
        var dS       = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
        var increase = dS / sData.dShift;

        var Kepler_v = sData.Kepler_v_stashed * increase;
        if( fconf.sappId === 'b1sec3prop14' &&
            Math.abs( Kepler_v/op.Kepler_v_initial ) > op.delta_v_increase_LIMIT ){
            return;
        }

        var momentumIncrease = increase * Math.abs( newSinOmega / sData.stashedOmega );
        var latus    = sData.stashedLatus4slider * momentumIncrease * momentumIncrease;
        var { e, fi, om, cosOmega, lat, r, eta, } = conics.innerPars2innerPars({
            r   : sData.stashedR,
            om  : newSinOmega,
            lat : latus,
            signCosOmega,
        });
        rg.P.q              = fi;
        op.cosOmega         = cosOmega;
        op.om               = om;

        //rotates main axis in respect to change q,
        //bs op.PparQ_initial === initial axis-fi
        //in respect to SP
        op.mainAxisAngle    = op.PparQ_initial - fi;
        op.latus            = latus;
        op.Kepler_v         = Kepler_v;
        stdMod.establishesEccentricity( e );

        //------------------------------------------------
        // //\\ decorates Fi handle
        //------------------------------------------------
        var posAbs = mat.unitVector( rg.Fi.pos ).abs;
        //sets handle
        rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
        rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
        //------------------------------------------------
        // \\// decorates Fi handle
        //------------------------------------------------

        stdMod.model8media_upcreate();
    }
    //=========================================================================
    // \\// body speed slider
    //=========================================================================

    //=========================================================================
    // //\\ omega slider
    //=========================================================================
    rg.omegaHandle.processOwnDownEvent = function() {
        sData.stashedOmega = rg.P.sinOmega;
        sData.stashedLatus4slider = op.latus;
    };

    rg.omegaHandle.acceptPos = ( newPos, dragMove ) => {
        var { logic_phase, aspect, subessay } = amode;
        //-------------------------------------------------------------------
        // //\\ corrects approximate mouse point to exact point on the circle
        //-------------------------------------------------------------------
        if( !( fconf.sappId === 'b1sec3prop17' && (
                subessay == 'corollary1' || subessay == 'corollary2' ) )
        ){
            const pp      = rg.P.pos;
            const sl      = mat.p1_to_p2( pp, newPos );
            if( sl.abs < 0.2 ) return;
            let omega = mat.angleBetweenLines([
                [ [0,0], pp ],
                [ [0,0], sl.vector ],
            ]).angle;
            //--------------------------------
            // //\\ corrects extreme values
            //--------------------------------
            {
                //excludes unsafe values
                let LIM = Math.PI * 0.99999;
                if( Math.abs( omega ) > LIM ){
                    omega = Math.sign( omega ) > 0 ? LIM : -LIM;
                }
                if( Math.abs( omega ) < 0.000001 ){
                    omega = Math.sign( omega ) > 0 ? 0.000001 : -0.000001;
                }
            }

            //--------------------------------
            // \\// corrects extreme values
            //--------------------------------
            setsOmegaHandle( omega, sl.abs );
            var newSinOmega = Math.sin( omega );
            var signCosOmega = Math.sign( Math.cos( omega ) );
        }
        //-------------------------------------------------------------------
        // \\// corrects approximate mouse point to exact point on the circle
        //-------------------------------------------------------------------

        let incr = newSinOmega / sData.stashedOmega;
        ////apparently emulates latus rectum via omege when speed === const and
        ////force law is const
        var newLatus = incr*incr * sData.stashedLatus4slider;

        //-----------------------------------------------------
        // //\\ corollary 1
        //      if( fconf.sappId === 'b1sec3prop16' ) {
        //-----------------------------------------------------
        //latus and omega do change
        var { e, fi, lat, r, eta, cosOmega, om, Kepler_v } = conics.innerPars2innerPars({
            r : rg.P.abs,
            lat : newLatus,
            om : newSinOmega,
            signCosOmega,
            Kepler_g : op.Kepler_g,
        });
        op.cosOmega         = cosOmega;
        op.om               = om;

        op.Kepler_v         = Kepler_v;
        rg.P.q              = fi;
        //rotates main axis in respect to change q,
        //bs op.PparQ_initial === initial axis-fi
        //in respect to SP
        op.mainAxisAngle    = op.PparQ_initial - fi;
        op.latus            = newLatus;
        stdMod.establishesEccentricity( e );

        // //\\ decorates Fi handle
        {
            let posAbs = mat.unitVector( rg.Fi.pos ).abs;
            //sets handle
            rg.Fi.pos[0] = posAbs*Math.cos( op.mainAxisAngle );
            rg.Fi.pos[1] = posAbs*Math.sin( op.mainAxisAngle );
        }
        // \\// decorates Fi handle
        //-----------------------------------------------------
        // \\// corollary 1
        //-----------------------------------------------------
        //--------------------------------------------------------------------
        // //\\ lets validators to do the job
        //--------------------------------------------------------------------

        stdMod.model8media_upcreate();
        //--------------------------------------------------------------------
        // \\// lets validators to do the job
        //--------------------------------------------------------------------
    }
    //=========================================================================
    // \\// omega slider
    //=========================================================================

    //=========================================================================
    // //\\ eccentricity slider
    //=========================================================================
    rg.Zeta.acceptPos = newPos => {
        var sliderAbs = mat.p1_to_p2( rg.P.pos, rg.omegaHandle.pos ).abs;
        var scale = ( rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0] );
        var modelPar = ( newPos[0] - rg.ZetaStart.pos[0] )
                        / scale;
        modelPar = Math.max( 0.0000000001, Math.min( 0.99999999, modelPar ) );  //validates
        var zeta = Math.PI / 2 * modelPar;
        var eccentricity = Math.tan( zeta );
        if( fconf.sappId === 'b1sec3prop15' && eccentricity > 0.99) {
            ////draws ellipse only
            return;
        }
        //let stashedExc = op.eccentricity;
        stdMod.establishesEccentricity( eccentricity,
                    fconf.sappId !== 'b1sec3prop15' &&
                    "prop_from_14_to_17" === fconf.effId );
        /*
        if( !dQisInBranch( op.sagittaDelta_q, rg.P.q ) ) {
            stdMod.establishesEccentricity( stashedExc,
                        fconf.sappId !== 'b1sec3prop15' &&
                        "prop_from_14_to_17" === fconf.effId );
            return;
        }
        */

        newPos[0] = rg.Zeta.pos[0];         //corrects
        newPos[1] = rg.ZetaStart.pos[1];    //corrects
        var { angleRV, rr } = mcurve.planeCurveDerivatives({
            fun : rg.approxer.t2xy,
            q : rg.P.q,
            rrc : rg.S.pos,
        });
        nspaste( rg.P.pos, rr );
        setsOmegaHandle( angleRV, sliderAbs );

        return true;
    }
    //=========================================================================
    // \\// eccentricity slider
    //=========================================================================
}

//"normalizes" slider by omega and position of point rg.P.pos
function setsOmegaHandle( omega, sliderAbs )
{
    const pp = rg.P.pos;
    const up = mat.unitVector( pp ).unitVec; //unit radius vector
    const rv = mat.rotatesVect( up, omega ); //radius vector rotated up to handle direction
    const np = mat.sm( pp, sliderAbs, rv );  //A,b,B, handle-vector scaled to value of sliderAbs
                                                //and ofsetted from rg.P.pos
    nspaste( rg.omegaHandle.pos, np );
}

///newQ and q are in the same branch => returns true
function dQisInBranch( dq, q )
{
    var newQ = q + dq;
    if( op.conicSignum === -1 ) {
        if(
            ( Math.abs( newQ ) <= op.SINGULARITY_ANGLE &&
                Math.abs( q ) >= op.SINGULARITY_ANGLE ) ||
            ( Math.abs( newQ ) >= op.SINGULARITY_ANGLE &&
                Math.abs( q ) <= op.SINGULARITY_ANGLE )
        ) return;
    }
    return true;
}
})();