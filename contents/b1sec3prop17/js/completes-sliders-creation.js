( function() {
    var { 
        sn, mat, nspaste, fconf, sData, amode, stdMod, sconf, rg,
    } = window.b$l.apptree({ stdModExportList : { completesSlidersCreation, }});
    var conics = sn( 'conics', mat );
    var sop = sn( 'sampleOrbitParameters', sconf );
    return;

    
    function completesSlidersCreation()
    {
        //console.log('completesSlidersCreation'); //called once on page load

        var op = sconf.orbitParameters;

        //=========================================================================
        // //\\ centripetal force slider (f)
        //=========================================================================
        rg.f.processOwnDownEvent = function() {
            //--------------------------------------------------------
            // //\\ stashes sample
            //--------------------------------------------------------
            sData.Lpos0_g = rg.f.pos[0];
            sData.Lpos1_g = rg.f.pos[1];
            {
                let dShift = mat.sm( 1, rg.f.pos, -1, rg.p.pos );
                sData.dShift_g = Math.sqrt( 
                    dShift[0]*dShift[0] + 
                    dShift[1]*dShift[1] 
                );
                sData.stashedOmega_g = sop.om;
                sData.stashedCosOmega_g = sop.cosOmega;
            }
            sData.stashedKepler_g = op.Kepler_g;
            sData.stashedKepler_v = sop.Kepler_v;
            sData.stashedLatus_g = sop.latus;
            //--------------------------------------------------------
            // \\// stashes sample
            //--------------------------------------------------------

            //--------------------------------------------------------
            // //\\ stashes solved
            //--------------------------------------------------------
            sData.stashedOmega = op.om;
            sData.stashedCosOmega = op.cosOmega;
            sData.stashedLatus = op.latus;
            //--------------------------------------------------------
            // \\// stashes solved
            //--------------------------------------------------------
        };

        rg.f.processOwnUpEvent = function() {
            sData.minForce = false;
        }

        rg.f.acceptPos = ( newPos, dragMove ) => {

            //prevents user from being able to drag too far
            if(sData.minForce) return; 

            var { logic_phase, aspect, subessay } = amode;
            var newPos0 = dragMove[0] + sData.Lpos0_g;
            var newPos1 = -dragMove[1] + sData.Lpos1_g;
            let dShift = [ newPos0 - rg.p.pos[0], newPos1 - rg.p.pos[1] ];
            var dS = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            if( dS < 0.00000001 ) return;
            var incr = dS / sData.dShift_g;

            //-------------------------------------------
            // //\\ sample
            //-------------------------------------------
            var Kepler_g = sData.stashedKepler_g * incr;

            if( subessay === 'corollary2' ){
                var newLatus = sData.stashedLatus_g;
                sop.Kepler_v = sData.stashedKepler_v * Math.sqrt( incr );
            } else {
                var newLatus = sData.stashedLatus_g / incr;
            }

            var { e, fi } = conics.innerPars2innerPars({
                r : rg.p.abs,
                lat : newLatus,
                om  : sData.stashedOmega_g,
                signCosOmega : sData.stashedCosOmega_g,
                Kepler_g,
            });

            // sample (green) conic should always be ellipse
            if(e >= 0.9) {
                sData.minForce = true;
                return false; 
            }

            sop.Kepler_g = Kepler_g;
            op.Kepler_g = Kepler_g;
            sop.latus = newLatus;

            if( !( subessay === 'corollary2' ) ){
                rg.p.q = fi;
                //rotates main axis in respect to change q,
                //bs op.PparQ_initial === initial axis-fi
                //in respect to SP
                sop.mainAxisAngle = sop.r2axisX_angle - fi;
            }
            stdMod.establishesEccentricity( e, !'doAdjustLatus', sop );
            //-------------------------------------------
            // \\// sample
            //-------------------------------------------

            //--------------------------------
            // //\\ reestablish solved-orbit
            //--------------------------------
            let solvedLatus = sData.stashedLatus / incr;
            let p17c12 = ( subessay === 'corollary1' || subessay === 'corollary2' );
            var { e, fi } = conics.innerPars2innerPars({
                r : ( p17c12 ? rg.P.posInitialUnitVector.abs : rg.P.abs ) *
                    1,  //We do enforce here only positive branch, no matter is this
                        //ellipse or hyperbola.
                lat : solvedLatus,
                om  : sData.stashedOmega,
                signCosOmega : sData.stashedCosOmega,  // -1 for for cor.
            })
            if( p17c12 ){
                if( e > 1 ) {
                    op.mainAxisAngle = -Math.PI;
                }
            }

            rg.P.q              = fi;
            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            op.mainAxisAngle    = op.PparQ_initial - fi;
            op.latus            = solvedLatus;
            stdMod.establishesEccentricity( e );
            //--------------------------------
            // \\// reestablish solved-orbit
            //--------------------------------------------------------------------

            stdMod.model8media_upcreate();
        }
        //=========================================================================
        // \\// gamma slider
        //=========================================================================


        //=========================================================================
        // //\\  body speed slider vb (R)
        //=========================================================================
        rg.vb.processOwnDownEvent = function() {
            const pp                    = rg.P.pos;
            sData.vbpos                 = nspaste( [], rg.vb.pos );
            var dShift                  = mat.sm( 1, rg.vb.pos, -1, pp );
            sData.dShift                = Math.sqrt( 
                                            dShift[0]*dShift[0] + 
                                            dShift[1]*dShift[1] 
                                        );
            sData.stashedOmega          = op.om;
            sData.stashedCosOmega       = op.cosOmega;
            sData.Kepler_v_stashed      = op.Kepler_v;
            sData.stashedR              = rg.P.abs;
            sData.stashedLatus4slider   = op.latus;
        };

        rg.vb.acceptPos = ( newPos, dragMove ) => {
            //console.log('moving vb');
            var { logic_phase, aspect, subessay } = amode;
            const pp = rg.P.pos;
            let np = nspaste( [], [
                dragMove[0] + sData.vbpos[0],
                -dragMove[1] + sData.vbpos[1]
            ]);
            var dShift = mat.sm( 1, np, -1, pp );
            var dS = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase = dS / sData.dShift;
            op.Kepler_v = sData.Kepler_v_stashed * increase; 

            if( (subessay == 'corollary1' || subessay == 'corollary2' )) {
                // can only be dragged vertically
                var newSinOmega = sData.stashedOmega;
                var signCosOmega = Math.sign( sData.stashedCosOmega );
            } else {
                const sl = mat.p1_to_p2( pp, np ); //slider
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
                        //console.log('too close to pi')
                        omega = Math.sign( omega ) > 0 ? LIM : -LIM;
                    }
                    if( Math.abs( omega ) < 0.000001 ){
                        //console.log('too close to zero')
                        omega = Math.sign( omega ) > 0 ? 0.000001 : -0.000001;
                    }
                }
                var newSinOmega = Math.sin( omega ); 
                op.om               = newSinOmega;    
                op.cosOmega         = Math.cos( omega );
                var signCosOmega = Math.sign( op.cosOmega );
                //--------------------------------
                // \\// corrects extreme values
                //--------------------------------
            }

            var momentumIncrease = increase * Math.abs( newSinOmega / sData.stashedOmega );

            op.latus = sData.stashedLatus4slider * momentumIncrease * momentumIncrease;
            var { e, fi, } = conics.innerPars2innerPars({
                r   : sData.stashedR, //rg.P.abs
                om  : newSinOmega,
                lat : op.latus,
                signCosOmega,
            });
            rg.P.q = fi;  

            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            op.mainAxisAngle  = op.PparQ_initial - fi;

            stdMod.establishesEccentricity( e, null );
            stdMod.model8media_upcreate();
        }
        //=========================================================================
        // \\// body speed slider
        //=========================================================================


        //=========================================================================
        // //\\ sample slider for point r
        //      for Kepler_v
        //=========================================================================
        rg.vSample.processOwnDownEvent = function() {
            const pp                    = rg.p.pos;
            sData.pos_r                 = nspaste( [], rg.vSample.pos );
            var dShift                  = mat.sm( 1, rg.vSample.pos, -1, pp );
            sData.dShift_r              = Math.sqrt( 
                                            dShift[0]*dShift[0] + 
                                            dShift[1]*dShift[1] 
                                        );
            sData.stashedOmega_r        = sop.om;
            sData.Kepler_v_stashed_r    = sop.Kepler_v;
            sData.stashedR_r            = rg.p.abs;
            sData.stashedLatus4slider_r = sop.latus;
        };

        rg.vSample.acceptPos = ( newPos, dragMove ) => {
            //console.log('moving vSample');
            var { logic_phase, aspect, subessay } = amode;
            const pp = rg.p.pos;
            let np = nspaste( [], [
                dragMove[0] + sData.pos_r[0],
                -dragMove[1] + sData.pos_r[1]
            ]);
            var dShift = mat.sm( 1, np, -1, pp );
            var dS = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase = dS / sData.dShift_r;
            sop.Kepler_v = sData.Kepler_v_stashed_r * increase;

            if( subessay == 'corollary2' ){
                var newSinOmega = sop.om;
                var signCosOmega = Math.sign( sop.cosOmega );
                var momentumIncrease = increase;
            } else {
                const sl = mat.p1_to_p2( pp, np ); //slider
                if( sl.abs < 0.2 ) return;
                var omega = mat.angleBetweenLines([
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
                var newSinOmega = Math.sin( omega );
                sop.om = newSinOmega;
                sop.cosOmega = Math.cos( omega );
                var signCosOmega = Math.sign( sop.cosOmega );
                //--------------------------------
                // \\// corrects extreme values
                //--------------------------------
                var momentumIncrease = increase * Math.abs( newSinOmega / sData.stashedOmega_r );
            }

            sop.latus = sData.stashedLatus4slider_r * momentumIncrease * momentumIncrease;
            var { e, fi, } = conics.innerPars2innerPars({
                r : sData.stashedR_r,
                om : newSinOmega,
                lat : sop.latus,
                signCosOmega,
            })
            rg.p.q = fi;

            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            sop.mainAxisAngle = sop.r2axisX_angle - fi;

            stdMod.establishesEccentricity( e,
                null,   //null because of latus is already adjusted
            sop );

            stdMod.model8media_upcreate();
        }
        //=========================================================================
        // \\// sample slider for point r
        //=========================================================================

    }

}) ();