( function() {
    var {
        sn, haz, mcurve, ssD,
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
        const subessay = amode.subessay;
        const ADDENDUM = amode.aspect === 'addendum';
        const ULTIM_NORM = !ADDENDUM && haz( sconf, 'NORMALIZE_BY_ULTIM_IN_NON_ADDEN' );
        let graphArg = {
            //drawDecimalX : false,
            printAxisXDigits : ADDENDUM,
            //printAxisYDigits : true,
        }
        
        let prop7R = sconf.prop7R;
        let ga = stdMod.graphFW_lemma.graphArray;
        let glen = ga.length;
        var forceMin;
        var forceMax;
        var estimatedMin;
        var estimatedMax;
        var sagittaMax;
        var xMin;
        var xMax;
        
        //for SHOW_FORMULAS
        let toshow = [];
        let toshowNorm = [];
        
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
            let PV = 2*prop7R*sinw;
            
            //for SHOW_FORMULAS
            let toshowVal = [];
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                toshowVal[fix] = f.fun( cP ); 
            });
            
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
            if( ADDENDUM ) {
                force = forceAbs * fsignum;
                estimatedForce = estimatedForceAbs * fsignum;
            } else {
                //this is inaccurate: but this is project requirement:
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
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                let val = toshowVal[fix];
                if( ix === 0 ){
                    toshow[fix] = { max : val, min : val };
                }
                if( toshow[fix].max < val ) {
                    toshow[fix].max = val;
                }
                if( toshow[fix].min > val ) {
                    toshow[fix].min = val;
                }
            });
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
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                gaix.y[4+fix] = fsignum * toshowVal[fix]; 
            });
        }
        let xMargin = (xMax-xMin)*0.05;
        graphArg.xMax = xMax + xMargin;
        graphArg.xMin = xMin - xMargin;

        //------------------------------------------
        // //\\ sets norm depending on ADDENDUM mode
        //------------------------------------------
        if( ADDENDUM ){
            var forceNorm = forceMin;
            var sagittaNorm = sagittaMin;
            var estimatedNorm = sconf.ADDENDUM_NORM_BY_MIN ?
                estimatedMin : estimatedMax;
        } else {
            var forceNorm = forceMax;
            var sagittaNorm = sagittaMax;
            var estimatedNorm = sconf.NORMALIZE_BY_ULTIM_IN_NON_ADDEN ?
                forceMax : estimatedMax;
        }
        sconf.SHOW_FORMULAS.forEach( (f,fix) => {
            //too much work
            //toshowNorm[fix] = ADDENDUM || subessay === 'corollary1' ?
            
            toshowNorm[fix] = ADDENDUM ?
                toshow[fix].min : toshow[fix].max; 
        });
        //------------------------------------------
        // \\// sets norm depending on ADDENDUM mode
        //------------------------------------------

        //------------------------------------------
        // //\\ completes norming
        //------------------------------------------
        for( ix = 0; ix<glen; ix++ ) {
            let gaix = ga[ix];
            gaix.y[0] /= forceNorm;
            gaix.y[1] /= estimatedNorm;
            gaix.y[2] /= 1; //non-important, will be skipped,
            gaix.y[3] /= sagittaNorm;
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                gaix.y[4+fix] /= toshowNorm[fix];
            });
        }
        //------------------------------------------
        // \\// completes norming
        //------------------------------------------

        ///gives more space on graph on the bottom and top
        graphArg.yMax = 1.1;
        graphArg.yMin = -0.1;
        if( ADDENDUM && fsignum < 0 ){
            graphArg.yMax = -0.5;
            graphArg.yMin = -10; //for partial y range,
        }
        stdMod.graphFW_lemma.drawGraph_wrap(graphArg);
    }
})();