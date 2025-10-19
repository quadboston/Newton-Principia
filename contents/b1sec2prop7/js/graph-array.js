( function() {
    var {
        sn, mcurve, ssD,
        amode, stdMod, rg, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            buildsforceGraphArray,
        },
    });
    return;

    function buildsforceGraphArray() ///legacy force sample, rid later
    {
        const addendum = amode.aspect === 'addendum';
        // //\\ graph
        //------------------------------------------------
        let graphArg = {
            //drawDecimalY : true,
            //drawDecimalX : false,
            printAxisXDigits : addendum,
            //printAxisYDigits : true,
        }
        
        let prop7R = sconf.prop7R;
        let ga = stdMod.graphFW_lemma.graphArray;
        let glen = ga.length;
        var forceMin;
        var forceMax;
        var estimatedMin;
        var estimatedMax;
        var eLaw5Max;
        var eLaw2Max;
        var eLaw5Min;
        var eLaw2Min;
        var sagittaMax;
        var xMin;
        var xMax;
        for( ix = 0; ix<glen; ix++ ) {
            let gaix = ga[ix];
            var ssagitta = ssD.ssigned[ix];
            var sagittaAbs = Math.abs( ssagitta );
            let cP = ssD.curve[gaix.ix];
            let r = cP.r;
            let sinw = cP.sinOmega;
            let graphX = r/prop7R;//normed distance
            gaix.x = graphX; 
            var r2 = cP.r2;
            var r5 = r2*r2;
            r5 *= r;
            let r5m = 1/r5;
            let r2m = 1/r2;
            let PV = 2*prop7R*sinw;
            
            //central angle =
            let qQP = rg.Q.q - rg.P.q;
            //VP at tangent angle - QP at tangent angle =
            let qQL = cP.angleRV-qQP*0.5;
            //todm: force sign can be assigned from QR?
            //LQ =
            let RL = 2*prop7R*Math.abs( Math.sin(qQL) );
            //todo wrong, uses sagitta instead of real RQ
            RL += Math.abs( sagittaAbs );
            //we are going to override the already calculated
            //"differential" force(coded in prop6), replacing it with
            //exact formulae for circular orbit,
            //(for curiocity reasons, we can compare them
            //later if time allows)
            //var force = Math.abs(gaix.y[0]);
            //possibly wrong for centrifugal force:
            var forceAbs = 1/(r2*PV*PV*PV);
            var estimatedForceAbs = 1/(r2*RL*PV*PV);

            var fsignum = Math.sign(gaix.y[0]);
            if( addendum ) {
                force = forceAbs * fsignum;
                estimatedForce = estimatedForceAbs * fsignum;
            } else {
                //this is inaccurate: but this is a 
                //project stakeholders requirement:
                var estimatedForceAbs = 1/(r2*RL*RL*RL);
                var force = forceAbs;
                var estimatedForce = estimatedForceAbs;                
            }

            if( ix === 0 || sagittaMax < sagittaAbs ) {
                sagittaMax = sagittaAbs;
            }
            if( ix === 0 || sagittaMin > sagittaAbs ) {
                sagittaMin = sagittaAbs;
            }
            if( ix === 0 || forceMax < forceAbs ) {
                forceMax = forceAbs;
            }
            if( ix === 0 || forceMin > forceAbs ) {
                forceMin = forceAbs;
            }
            if( ix === 0 || estimatedMin > estimatedForceAbs ) {
                estimatedMin = estimatedForceAbs;
            }
            if( ix === 0 || estimatedMax < estimatedForceAbs ) {
                estimatedMax = estimatedForceAbs;
            }
            if( ix === 0 || eLaw5Max < r5m ) {
                eLaw5Max = r5m;
            }
            if( ix === 0 || eLaw2Max < r2m ) {
                eLaw2Max = r2m;
            }
            if( ix === 0 || eLaw5Min > r5m ) {
                eLaw5Min = r5m;
            }
            if( ix === 0 || eLaw2Min > r2m ) {
                eLaw2Min = r2m;
            }

            if( ix === 0 || xMin > graphX ) {
                xMin = graphX;
            }
            if( ix === 0 || xMax < graphX ) {
                xMax = graphX;
            }
            gaix.y[0] = force;
            gaix.y[1] = estimatedForce;
            gaix.y[2] = 1; //body
            gaix.y[3] = ssagitta;
            gaix.y[4] = fsignum * r5m; //for show
            gaix.y[5] = fsignum * r2m; //for show
        }
        let xMargin = (xMax-xMin)*0.05;
        graphArg.xMax = xMax + xMargin;
        graphArg.xMin = xMin - xMargin;
        
        if( addendum ){
            var forceNorm = forceMin;
            var sagittaNorm = sagittaMin;
            var eLaw2Norm = eLaw2Min;
            var estimatedNorm = estimatedMin;
            var eLaw5Norm = eLaw5Min;
        } else {
            var forceNorm = forceMax;
            var sagittaNorm = sagittaMax;
            var eLaw2Norm = eLaw2Max;
            var estimatedNorm = estimatedMax;
            var eLaw5Norm = eLaw5Max;
        }
        for( ix = 0; ix<glen; ix++ ) {
            let gaix = ga[ix];
            gaix.y[0] /= forceNorm;
            gaix.y[1] /= estimatedNorm;
            gaix.y[2] /= 1; //body
            gaix.y[3] /= sagittaNorm;
            gaix.y[4] /= eLaw5Norm;
            gaix.y[5] /= eLaw2Norm;
        }

        ///gives more space on graph on the bottom and top
        graphArg.yMax = 1.1;
        graphArg.yMin = -0.1;
        if( addendum && fsignum < 0 ){
            graphArg.yMax = -0.5;
            graphArg.yMin = -10; //for partial y range,
        }
        
        //first array mast be enabled
        stdMod.graphFW_lemma.graphArrayMask = addendum ?
            [   'force',
                'estimated force',
                !'body',

                !'saggita, yet broke',
                //ssD.solvable && !ssD.doMaskSagitta,

                (fsignum < 0 ? '-1/r^2' : '1/r^2' ),
                !!'-1/r^5',
            ]
        :
            [ 'force',
              'estimated force',
              !'body',
              !'sagitta',
              !'-1/r^5',
              !'sample-force',
            ];
        
        stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------
    }
}) ();

