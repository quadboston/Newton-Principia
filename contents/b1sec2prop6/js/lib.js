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
                q : 0,
                rrc,
            });
            //
            ssD.sectSpeed0 = staticSectorialSpeed_rrrOnUU;
        }

        var forceGraphArray = [];
        var foldPoints = [];
        var curve = ssD.curve = (new Array(STEPS+1)).fill({});
        
        //how rare we will output graph points on svg
        //ba
        var FORCE_ARRAY_PERIOD = 5; //gives STEPS/FORCE_ARRAY_PERIOD points for graph
        var stepScale=( end_q - start_q ) / STEPS;
        var i2q = stepScale;
        var path = 0;
        var time = 0;
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
                DDD:0.000001
                //DDD:0.5,
            });
            var {
                v,
                rr,
                r, //from chosen rrc
                r2,
                R,
                bk,
                //cosOmega,
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
                var comparLaw = -1 / r2;
                var unitlessForce = -1/(R*r2*sinOmega)*bk;
                var forceSafe = Math.max( Math.abs( unitlessForce ), 1e-150 );

                var sectSpeedSafe = 1e-150 > Math.abs( staticSectorialSpeed_rrrOnUU ) ?
                        1e+150 : 1/staticSectorialSpeed_rrrOnUU;
                sectSpeedSafe = Math.abs( sectSpeedSafe );

                if( forceGraphArray.length === 0 ) {
                    var forceMax = forceSafe;
                    var comparLawMin = comparLaw;
                    var speedMax = sectSpeedSafe;
                }

                //-----------------------------------------------------------
                // //\\ builds coefficients at maximum |force|
                //-----------------------------------------------------------
                if( forceMax < forceSafe ) {
                    var forceMax = forceSafe;
                }
                if( comparLawMin > comparLaw ) {
                    var comparLawMin = comparLaw;
                }
                if( speedMax < sectSpeedSafe ) {
                    var speedMax = sectSpeedSafe;
                }
                //-----------------------------------------------------------
                // \\// builds coefficients at maximum |force|
                //-----------------------------------------------------------
                forceGraphArray.push({
                    x : bonus ? r : path,
                    y : [
                        unitlessForce, //actual
                        path, //sagitta
                        time, //time
                        comparLaw,
                        //=vt=tangent speed
                        sectSpeedSafe,
                    ],
                    ix : solix,
                });
                path += v*stepScale;
                time += stepScale/v;
            }
        }
        var timeMax = time;
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
            far.y[2] = far.y[2] / timeMax;
            far.y[3] = far.y[3] / (-comparLawMin);
            far.y[4] = far.y[4] / speedMax;
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
    function findsFiniteSagitta()
    {
        let bonus = userOptions.showingBonusFeatures();
        let fun = bezier.fun;
        let c = ssD.curve;
        let garr = stdMod.graphFW_lemma.graphArray;
        let len = garr.length;
        let dt = rg.tForSagitta.val;
        let sectSpeed0 = c[0].staticSectorialSpeed_rrrOnUU; //*1 = dv0/dt
        
        let sMax = 0.000001;
        let ssigned = [];
        for (let gix = 0; gix<len; gix++ ) {
            let far = garr[ gix ];
            let cpoint = c[far.ix];
            let v = cpoint.v;
            let rr = cpoint.rr;
            let rrr = cpoint.rrr;
            let uu = cpoint.uu;
            let bk = cpoint.bk;
            let q = cpoint.q;
            let dt2dq = sectSpeed0 / v / cpoint.staticSectorialSpeed_rrrOnUU;
            let dq = dt2dq * dt;
            let qmin = q - dq;
            let qmax = q + dq;
            let rmax = fun(qmax);
            let rmin = fun(qmin);
            
            let sagitta0 = (rmax[0] + rmin[0])*0.5 - rr[0];
            let sagitta1 = (rmax[1] + rmin[1])*0.5 - rr[1];
            let scalarProduct = rrr[0]*sagitta0 + rrr[1]*sagitta1;
            let sign =  Math.sign( scalarProduct );
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
    }
    
}) ();

