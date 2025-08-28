( function() {
    var {
        sn, nspaste, mcurve, mat,
        fconf, ssF, amode, sconf, rg, 
    } = window.b$l.apptree({ stdModExportList : {
            model_upcreate,
        },
    });
    var sop = sn( 'sampleOrbitParameters', sconf );

    // to keep track of tab switches
    var subessay = ''; // todo: is this already tracked somewhere?
    return;


    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    /// called from src/base/lemma/astate2app.js (2x on page load, 1x on tab switch)
    ///
    /// called from src/base/app-tree.js (2x on page load and tab switch, 1x when moving draggers)
    /// todo: investigate this redundant behaviour
    ///****************************************************
    function model_upcreate()
    {
        //called 4x on page load, 
        //then 3x when switching tabs; 
        //and again when draggers move
        //console.log('model_upcreate'); 

        //================================================
        // //\\ op (brown orbit)
        //================================================
        const op        = sconf.orbitParameters;
        var cosAxis     = Math.cos( op.mainAxisAngle );
        var sinAxis     = Math.sin( op.mainAxisAngle );
        const fun       = rg[ 'approximated-curve' ].t2xy; //returns [x, y], defined in makes-orbit.js
        const q         = rg.P.q; //PparQ (position of P,Q,R on conic), gets set to initial, then updated with sliders Pv and f
        
        const rr0       = fun( q ); // rg.P.pos
        const rrc       = rg.S.pos; // rg.S.pos is [0,0] as defined in amode8captures.js
        //nspaste( rg.P.pos, rr0 ); // rg.P.pos does not move   

        // **api-input---plane-curve-derivatives
        var diff = mcurve.planeCurveDerivatives({ fun, q, rrc, });
        var {
            projectionOfCenterOnTangent,
            uu,
            ee,
            sinOmega,
            cosOmega,
        } = diff;     

        //"caustics"
        const axisC     = op.conicSignum === -1 ? -op.C : op.C;
        rg.C.pos[0]     = cosAxis * axisC;
        rg.C.pos[1]     = sinAxis * axisC;
        rg.H.pos[0]     = 2*rg.C.pos[0];
        rg.H.pos[1]     = 2*rg.C.pos[1];
        
        nspaste( rg.A.pos, fun( Math.PI ) );
        
        ////hyperbola or ellipse  
        if( amode.subessay === 'corollary1' || amode.subessay === 'corollary2'  ) {
            nspaste( rg.D.pos, rg.P.pos );
        } else {
            nspaste( rg.D.pos, fun( 0 ) );
        } 

        nspaste( rg.K.pos, mat.dropPerpendicular( rg.S.pos, rg.H.pos, rg.P.pos ) );
          
        // point B
        {
            let posBx = op.conicSignum === -1 ? -op.C : op.C;
            let posB = [posBx, op.B,];
            let ww = mat.rotatesVect( posB, op.mainAxisAngle, );
            nspaste( rg.B.pos, ww );
        }
        
        // point Q
        var {
            rr, 
        } = deltaT_2_arc();
        nspaste( rg.Q.pos, rr );

        // dragger vb (aka Pv)
        {
            //dropLine(... = start + direction * t
            let udir = op.cosOmega * cosOmega + op.om * sinOmega;
            nspaste( 
                rg.vb.pos, 
                mat.sm( op.Kepler_v*udir, uu, 1, rg.P.pos ) 
            );
        }

        //perpendicular dropped from PR to S
        nspaste( rg.Y.pos, projectionOfCenterOnTangent );

        // latus rectum
        rg.L.pos[0]  = -sinAxis * op.latus;
        rg.L.pos[1]  =  cosAxis * op.latus;
        rg.LL.pos[0] =  sinAxis * op.latus;
        rg.LL.pos[1] = -cosAxis * op.latus;
        rg[ 'L,LL' ].value = (2*op.latus).toFixed(3);

        //================================================
        // \\// op (brown orbit)
        //================================================


        //=============================================================
        // //\\ sop (green orbit)
        //=============================================================
        {
            ////sample orbit
            let fun = rg[ 'approximated-curve-sample' ].t2xy;
            var {
                rr,
                uu,
                ee,
                projectionOfCenterOnTangent,
                sinOmega,
                cosOmega,
            } = mcurve.planeCurveDerivatives({
                fun,
                q   : rg.p.q,
                rrc,
            });
            
            // only set position of p once, it does not move
            if( amode.subessay !== subessay ) {
                subessay = amode.subessay;
                nspaste( rg.p.pos, rr );
            }

            //sample speed vector
            {
                //dropLine(... = start + direction * t
                let udir = sop.cosOmega * cosOmega + sop.om * sinOmega;
                nspaste( 
                    rg.vSample.pos, 
                    mat.sm( sop.Kepler_v*udir, uu, 1, rg.p.pos ) 
                );
            }
            //sample's decorational dt arc
            var {
                rr,
            } = mcurve.planeCurveDerivatives({
                fun,
                q : rg.p.q + sop.sagittaDelta_q_initial,
                rrc,
            });
            nspaste( rg.q.pos, rr );
            rg.p.abs = mat.unitVector( rg.p.pos ).abs;
        }

        cosAxis   = Math.cos( sop.mainAxisAngle );
        sinAxis   = Math.sin( sop.mainAxisAngle );

        // latus
        rg.l.pos[0]  = -sinAxis * sop.latus;
        rg.l.pos[1]  =  cosAxis * sop.latus;
        rg.ll.pos[0] =  sinAxis * sop.latus;
        rg.ll.pos[1] = -cosAxis * sop.latus;

        {
            ////force and gamma
            let relativeGamma = op.Kepler_g / sop.Kepler_gInitial;
            var newLen = relativeGamma * sop.forceHandleInitial;
            nspaste( rg.f.pos, mat.sm( rg.p.pos, -1*newLen, ee ));
        }

        //perpendicular dropped from pr to S
        rg.Ys.pos[0] = projectionOfCenterOnTangent[0];
        rg.Ys.pos[1] = projectionOfCenterOnTangent[1];

        //=============================================================
        // \\// sop (green orbit)
        //=============================================================
    }

    ///calculates arc's delta q depending on delta_t by
    ///integrating delta_q and reaching delta_t,
    function deltaT_2_arc()
    {
        const INTEGRATION_STEPS = 1000;

        op          = sconf.orbitParameters;
        const rrc   = rg.S.pos;
        const fun   = rg[ 'approximated-curve' ].t2xy;
        var q       = rg.P.q;
        var {
            v,
            sinOmega,
            cosOmega,
        } = mcurve.planeCurveDerivatives({
            fun,
            q,
            rrc,
        });
        var udir = op.cosOmega * cosOmega + op.om * sinOmega;
        //path step
        const ds_by_dt  = udir * op.delta_t / INTEGRATION_STEPS * op.Kepler_v;
        for( var it = 0; it <= INTEGRATION_STEPS; it++ ) {
            var {
                v, //=ds_by_dfi
                rr,
            } = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
            });
            //assumes central force, i.e. constant sectorial speed
            //var Kepler_v_instant = op.Kepler_v * sectorialSpeed0 / staticSectorialSpeed_rrrOnUU;

            var intervalQ = ds_by_dt / v; //dfi
            q += intervalQ;
        }
        return {
            rr,
            sagittaDeltaQ : q - rg.P.q,
        };
    }

}) ();