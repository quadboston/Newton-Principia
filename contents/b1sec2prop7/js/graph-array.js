( function() {
    var { sn, mcurve, ssD, amode, stdMod, rg, sconf, } = window.b$l.apptree({
        stdModExportList : { buildsforceGraphArray, }, });
    return;


    function buildsforceGraphArray() ///legacy force sample, rid later
    {
        // //\\ graph
        //------------------------------------------------
        //first array mast be enabled
        stdMod.graphFW_lemma.graphArrayMask =
            [ 'force',
              !'sagitta', !'sample-force', !'body',
              'estimated force',
              !'-1/r^5'
            ];
        
        let prop7R = sconf.prop7R;
        let graphArray = stdMod.graphFW_lemma.graphArray;
        let graphArrayLength = graphArray.length;
        var forceMin;
        var forceMax;
        var estimatedMin;
        var estimatedMax;
        var eLaw5Min;
        var eLaw2Min;
        var sagittaMin;
        var xMin;
        var xMax;
        var globalRelativeMax = 0;
        var globalRelativeMin;
        for( ix = 0; ix<graphArrayLength; ix++ ) {
            let gaix = graphArray[ix];
            var ssagitta = ssD.ssigned[ix]; //gaix.y[1];
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
            let qQP = rg.Q.q - rg.P.q;
            let qQL = cP.angleRV-qQP;

            let RL = 2*prop7R*Math.abs( Math.sin(qQL) );
            //todo wrong, uses sagitta instead of real RQ
            RL += Math.abs( Math.abs(ssagitta) );
            //we are going to override the already calculated
            //"differential" force(coded in prop6), replacing it with
            //exact formulae for circular orbit,
            //(for curiocity reasons, we can compare them
            //later if time allows)
            //var force = Math.abs(gaix.y[0]);
            var force = 1/(r2*PV*PV*PV);
            /*
            ccc( ix, 
                    'r='+r.toFixed(2)+
                    ' PV/r='+(PV/r).toFixed(3) + ' r2m='+(r2m).toFixed(3),
                    'r5m='+(r5m).toFixed(3) + 
                ' f='+force.toFixed(4)
            );
            */
            var estimatedForce = 1/(r2*RL*PV*PV);

            var sagitta = Math.abs( ssagitta );
            if( ix === 0 || sagittaMin > sagitta ) {
                sagittaMin = sagitta;
            }
            if( ix === 0 || forceMax < force ) {
                forceMax = force;
            }
            if( ix === 0 || forceMin > force ) {
                forceMin = force;
            }
            if( ix === 0 || estimatedMin > estimatedForce ) {
                estimatedMin = estimatedForce;
            }
            if( ix === 0 || estimatedMax < estimatedForce ) {
                estimatedMax = estimatedForce;
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
            var fsignum = Math.sign(gaix.y[0]);
            //this is inaccurate: but this is a requirement:
            var estimatedForce = 1/(r2*RL*RL*RL);

            gaix.y[0] = force;
            gaix.y[1] = ssD.ssigned[ix];
            gaix.y[2] = -r2m;
            gaix.y[4] = estimatedForce;
            gaix.y[5] = -r5m;
        }
        let graphArg = {
            xMax : xMax,
            xMin : 0,
            yMax : Math.max(estimatedMax, forceMax, 1), //10;
            yMin : 0,
        }
        rg.estimatedForce = rg.estimatedForce;
        stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
        //------------------------------------------------
        // \\// graph
        //------------------------------------------------
    }
}) ();

