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
                let dShift    = [ rg.f.pos[0] - rg.p.pos[0],
                                  rg.f.pos[1] - rg.p.pos[1] ];
                sData.dShift_g = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
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

        rg.f.acceptPos = ( newPos, dragMove ) => {
            var { logic_phase, aspect, subessay } = amode;
            var newPos0 = dragMove[0] *
                          0.5 //decreases slider sensetivity
                         + sData.Lpos0_g;
            var newPos1 = -dragMove[1] *
                          0.5 //decreases slider sensetivity
                         + sData.Lpos1_g;
            var incr;
            {
                let dShift = [ newPos0 - rg.p.pos[0], newPos1 - rg.p.pos[1] ];
                var dS = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
                if( dS < 0.00000001 ) return;
                incr = dS / sData.dShift_g;
            }

            //-------------------------------------------
            // //\\ sample
            //-------------------------------------------
            var Kepler_g = sData.stashedKepler_g * incr;

            if( amode.subessay === 'corollary2' ){
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
            sop.Kepler_g = Kepler_g;
            op.Kepler_g = Kepler_g;
            sop.latus = newLatus;

            if( !( amode.subessay === 'corollary2' ) ){
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
            let p17c12 = fconf.sappId === ( amode.subessay === 'corollary1' || amode.subessay === 'corollary2' );
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
        // //\\  body speed slider vb (Pv)
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
            //console.log('moving vb');
            var { logic_phase, aspect, subessay } = amode;
            var newPos0  = dragMove[0] + sData.vbpos[0];
            var newPos1  = -dragMove[1] + sData.vbpos[1];
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //      todm redundant code
            //-------------------------------------------------------------------
            var newSinOmega = sData.stashedOmega;
            var signCosOmega = Math.sign( sData.stashedCosOmega );
            //console.log('omega: ' + newSinOmega);
            
            // the value of omega being calculated here is slightly off
            // using sData.stashedOmega prevents error, by limiting to only
            // changes in magnitude of Pv, not the angle
            if( !(subessay == 'corollary1' || subessay == 'corollary2' )) {
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
                        //console.log('too close to pi')
                        omega = Math.sign( omega ) > 0 ? LIM : -LIM;
                    }
                    if( Math.abs( omega ) < 0.000001 ){
                        //console.log('too close to zero')
                        omega = Math.sign( omega ) > 0 ? 0.000001 : -0.000001;
                    }
                }

                //console.log(omega)

                //--------------------------------
                // \\// corrects extreme values
                //--------------------------------
                var newSinOmega = Math.sin( omega );
                var signCosOmega = Math.sign( Math.cos( omega ) );
                
                //console.log('omega: ' + newSinOmega)
            }
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------

            var dShift   = [ newPos0 - rg.P.pos[0], newPos1 - rg.P.pos[1] ];
            var dS       = Math.abs( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase = dS / sData.dShift;

            var Kepler_v = sData.Kepler_v_stashed * increase;

            var momentumIncrease = increase * Math.abs( newSinOmega / sData.stashedOmega );
            var latus    = sData.stashedLatus4slider * momentumIncrease * momentumIncrease;
            var { e, fi, om, cosOmega, lat, r, eta, } = conics.innerPars2innerPars({
                r   : sData.stashedR, //rg.P.abs
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
            
            // *** this is the value being used in P17 ***
            // *** sometimes it is > 1 when it should be < 1
            //console.log('new e: ' + e)

            stdMod.establishesEccentricity( e );
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
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            const pp                    = rg.p.pos;
            sData.pos_r                 = nspaste( [], rg.vSample.pos );
            var dShift                  = mat.sm( 1, rg.vSample.pos, -1, pp );
            sData.dShift_r              = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            sData.stashedOmega_r        = sop.om;
            sData.Kepler_v_stashed_r    = sop.Kepler_v;
            sData.stashedR_r            = rg.p.abs;
            sData.stashedLatus4slider_r = sop.latus;

            //we do not implement delta_t --> delta_q for sample; therfore,
            //do not diplay it,
            rg.q.undisplay = true;
        };

        rg.vSample.acceptPos = ( newPos, dragMove ) => {
            //console.log('moving vSample');
            var { logic_phase, aspect, subessay } = amode;
            const pp      = rg.p.pos;
            let np        = nspaste( [], [
                                dragMove[0] + sData.pos_r[0],
                                -dragMove[1] + sData.pos_r[1]
            ]);
            var dShift           = mat.sm( 1, np, -1, pp );
            var dS               = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase         = dS / sData.dShift_r;
            sop.Kepler_v         = sData.Kepler_v_stashed_r * increase;

            if( subessay == 'corollary2' ){
                var newSinOmega = sop.om;
                var signCosOmega = Math.sign( sop.cosOmega );
                var momentumIncrease = increase;
            } else {
                const sl      = mat.p1_to_p2( pp, np ); //slider
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
                var newSinOmega      = Math.sin( omega );
                sop.om = newSinOmega;
                sop.cosOmega = Math.cos( omega );
                var signCosOmega     = Math.sign( sop.cosOmega );
                //--------------------------------
                // \\// corrects extreme values
                //--------------------------------
                var momentumIncrease = increase * Math.abs( newSinOmega / sData.stashedOmega_r );
            }

            sop.latus = sData.stashedLatus4slider_r * momentumIncrease * momentumIncrease;
            var { e, fi, } = conics.innerPars2innerPars({
                r : sData.stashedR_r,
                om : newSinOmega,
                signCosOmega,
                lat : sop.latus,
            })
            rg.p.q = fi;
            //rotates main axis in respect to change q,
            //bs op.PparQ_initial === initial axis-fi
            //in respect to SP
            //sop.mainAxisAngle    = sop.mainAxisAngle - fi;
            sop.mainAxisAngle    = sop.r2axisX_angle - fi;

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