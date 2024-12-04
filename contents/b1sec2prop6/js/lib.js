( function() {
    var {
        sn, $$, mcurve, bezier, userOptions,
        ssD,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            curveIsSolvable,
            findsFiniteSagitta,
        },
    });
    ssD.curveSTEPS = 1000;
    return;











    ///Returns: false if radius-vector is nearly parallel to
    ///         tangent in some point of the curve
    function curveIsSolvable()
    {
        var bonus = userOptions.showingBonusFeatures();
        const DDD = 1e-5; 
        var NON_SOLVABLE_THRESHOLD = 0.01;
        //too many steps, todm: make analytical validation or
        //make program simpler than planeCurveDerivatives,
        //but if even we have STEPS = 1 million, it still works, very sturdy,
        var STEPS = ssD.curveSTEPS;
        var end_q = bezier.end_q;
        var start_q = bezier.start_q;
        
        var rrc      = rg.S.pos;
        var solvable = true;
        var fun      = bezier.fun;
        {   ////sets initial secrtorial speed as [𝗿𝘃]/2 where v===1
            let { staticSectorialSpeed_rrrOnUU, } = mcurve.planeCurveDerivatives({
                fun,
                q : start_q,
                rrc,
            });
            ssD.sectSpeed0 = staticSectorialSpeed_rrrOnUU;
        }
        //no need for f/fmax
        let sectSpeed0 = ssD.sectSpeed0;
        
        var forceGraphArray = [];
        var foldPoints = [];
        var curve = ssD.curve = (new Array(STEPS+1)).fill({});
        
        //how rare we will output graph points on svg
        //ba
        var FORCE_ARRAY_PERIOD = 5; //gives STEPS/FORCE_ARRAY_PERIOD points for graph
        var stepScale=( end_q - start_q ) / STEPS;
        var i2q = stepScale;
        var path = 0;
        for (var solix=0; solix<=STEPS; solix++ )
        {
            var graphArrRem = solix % FORCE_ARRAY_PERIOD;
            //grows from small to big
            //curve paramter is coordinate x:
            var q = start_q + solix * i2q;
            
            var curvePars = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
                DDD,
            });
            var {
                v,
                rr,
                rrr,
                aa,
                r, //from chosen rrc
                r2,
                a,
                bk,
                sinOmega, //for Kepler's motion, f = 1/R vₜ² / sin(w)
                staticSectorialSpeed_rrrOnUU,
            } = curvePars;
            curvePars.curveIx = solix;
            curve[solix] = curvePars;
            
            // Kepler's motion: rvₜcos(w) = M
            // f = M²/(Rr²cos³(w))
            cosAbs = Math.abs( sinOmega );
            if( NON_SOLVABLE_THRESHOLD > cosAbs ) {
                solvable = false;
                foldPoints.push( [ rr[0], rr[1] ] );
                curvePars.solvablePoint = solvable;
            }

            ///rebuilds forceGraphArray if yet solvable
            //if point falls on the graph grid, do the job:
            if( !graphArrRem ) {
                var sectSpeedSafe1 = 1e-100 > Math.abs( staticSectorialSpeed_rrrOnUU ) ?
                                     1e+100 : 1/staticSectorialSpeed_rrrOnUU;
                var comparLaw = -1 / r2;
                let speed = sectSpeed0*sectSpeedSafe1;
                let speedAbs = Math.abs( speed );

                let dq_dt = speed/v;
                //var force = -1/(R*r2*sinOmega3)*bk
                //            * (sectSpeed0 * sectSpeed0);
                var force = a * dq_dt * dq_dt;
                let sign = Math.sign( rrr[0]*aa[0] + rrr[1]*aa[1] );
                var fAbs = Math.abs( force );
                force = sign * fAbs;

                if( forceGraphArray.length === 0 ) {
                    var forceMax = fAbs;
                    var comparLawMin = comparLaw;
                    var speedMax = speedAbs;
                }

                //-----------------------------------------------------------
                // //\\ builds coefficients at maximum |force|
                //-----------------------------------------------------------
                if( forceMax < fAbs ) {
                    var forceMax = fAbs;
                }
                if( comparLawMin > comparLaw ) {
                    var comparLawMin = comparLaw;
                }
                if( speedMax < speedAbs ) {
                    var speedMax = speedAbs;
                }
                //-----------------------------------------------------------
                // \\// builds coefficients at maximum |force|
                //-----------------------------------------------------------
                forceGraphArray.push({
                    x : bonus ? r : path,
                    y : [
                        force,
                        'dummy', //sagitta
                        comparLaw,
                        speed,
                    ],
                    ix : solix,
                });
                path += v*stepScale;
            }
        }
        
        stdMod.graphFW_lemma.forceMax = forceMax;
        ///resets forceGraphArray
        stdMod.graphFW_lemma.graphArray = forceGraphArray;
        var arrLen = forceGraphArray.length;
        ///renorms 1/r2 graph for better comparision
        for (var forceArrayIx = 0; forceArrayIx<arrLen; forceArrayIx++ )
        {
            var far = forceGraphArray[ forceArrayIx ];
            let f = far.y[0] / forceMax;
            if( !bonus ) f = Math.abs(f);
            far.y[0] = f;
            //1 sagg
            far.y[2] = far.y[2] / (-comparLawMin);
            far.y[3] = far.y[3] / speedMax;
        }
        stdMod.pos2qix = pos2qix;
        ssD.solvable = solvable;
        ssD.foldPoints = foldPoints;
        return;

        
        ///todm fix or rename to q2qix,
        ///this function must be initiated out of scope isSolvable()
        ///     these vars must be done in small closure:
        ///     start_q ) / ( end_q - start_q ) * qixMax
        function pos2qix( pos )
        {
            var q = rg.P.q;
            var qixMax = forceGraphArray.length-1;
            var qix = Math.floor(    ( q - start_q ) / ( end_q - start_q ) * qixMax   );
            return Math.max( 0, Math.min( qixMax, qix ) );
        }
    }
    
    ///finds and fills finite sagitta in the
    ///stdMod.graphFW_lemma.graphArray
    ///finite sagitta is normalized by its sMax,
    function findsFiniteSagitta(DD)
    {
        const DDD = DD || 1e-5;
        const bonus = userOptions.showingBonusFeatures();
        const fun = bezier.fun;
        const c = ssD.curve;
        const garr = stdMod.graphFW_lemma.graphArray;
        const len = garr.length;
        const dt = rg.tForSagitta.val;
        const sectSpeed0 = ssD.sectSpeed0;
        const rrc = rg.S.pos;

        
        let sMax = 1e-100;
        let ssigned = [];
        for (let gix = 0; gix<len; gix++ ) {
            let cpoint = c[garr[ gix ].ix];
            let q = cpoint.q;
            let rr = cpoint.rr;
            var curvePars = mcurve.planeCurveDerivatives({
                fun,
                q,
                rrc,
                DDD,
            });
            var { v,rrr, staticSectorialSpeed_rrrOnUU,} = curvePars;
            // crude single interval
            let dq_dt0 = sectSpeed0 / (v * staticSectorialSpeed_rrrOnUU);
            let dq = dq_dt0 * dt;
            let qmin = q - dq;
            let qmax = q + dq;
            let rmax = fun(qmax);
            let rmin = fun(qmin);
            
            // //\\ splits integration path to more points
            /*
            let dq_dt0 = sectSpeed0 / (v * staticSectorialSpeed_rrrOnUU);
            let dq = dq_dt0 * dt; //dt2;
            let qmin = q - dq;
            let qmax = q + dq;
            var { v,staticSectorialSpeed_rrrOnUU,} = mcurve.planeCurveDerivatives({
                fun,
                q:qmax,
                DDD,
            });
            let dq_dt_plus = sectSpeed0 / (v * staticSectorialSpeed_rrrOnUU);
            let dqfull_plus = dq+dq_dt_plus * 0.000001 * 0.5; //dt2;
            rmax = fun(q+dqfull_plus);
            //-- min ----
            var { v,staticSectorialSpeed_rrrOnUU,} = mcurve.planeCurveDerivatives({
                fun,
                q:qmin,
                DDD,
            });
            let dq_dt_minus = sectSpeed0 / (v * staticSectorialSpeed_rrrOnUU);
            let dqfull_minus = dq + dq_dt_minus * 0.000001 * 0.5; //* dt2;
            rmin = fun(q-dqfull_minus);
            */
            // \\// splits integration path to more points

            let sagitta0 = (rmax[0] + rmin[0])*0.5 - rr[0];
            let sagitta1 = (rmax[1] + rmin[1])*0.5 - rr[1];
            let scalarProduct = rrr[0]*sagitta0 + rrr[1]*sagitta1;
            let sign = Math.sign( scalarProduct );
            let sagittaAbs = Math.sqrt(sagitta0*sagitta0+sagitta1*sagitta1);
            ssigned[gix] = sign * sagittaAbs;
            sMax = sMax < sagittaAbs ? sagittaAbs : sMax;
        }

        ///normalizes sagitta
        for (let gix = 0; gix<len; gix++ )
        {
            let tograph = ssigned[gix];
            tograph = bonus ? tograph : Math.abs( tograph );
            garr[ gix ].y[1] = tograph/sMax;
        }
        ssD.doMaskSagitta = sMax > 1e+18 || stdMod.graphFW_lemma.forceMax > 1e+18;
    }
    
}) ();

