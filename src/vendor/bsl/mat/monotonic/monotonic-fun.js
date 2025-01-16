( function() {
    var {
        ns, sn, mat,
        haz,
    } = window.b$l.nstree();
    var integral = sn( 'integral', mat );
    integral.creates_monoFrameWork = creates_monoFrameWork;
    return;









    ///
    ///
    function creates_monoFrameWork({
        F0,
        derivative,
        step,
    }) {
        const fw = {};
        F0 = F0 || 0;
        step = step || 1/derivative.length
        const LEN = derivative.length;
        let {integ, area} = integrates(derivative, F0);
        fw.F0 = F0;
        fw.step = step;
        fw.newDeriv = derivative;
        fw.newInteg = integ; 
        fw.deriv = fw.newDeriv;
        fw.integ = fw.newInteg;
        let initialArea = area;
        fw.changesFunction = changesFunction;
        return fw;
        
        function changesFunction({
            x, //alternative to ix and preferenced than ix
               //zero-based,
            ix, //optional
            deltaF
        }){
            if( typeof x !== 'undefined' ) {
                ix = Math.floor( x/step );
            }
            var len = fw.deriv.length;
            var ar = fw.deriv.concat();
            var stashedDeriv = fw.deriv;
            var origF = fw.integ[ix];
            var minDerivBlock = initialArea/(len*step)*0.03;

            var integUp = integrates(ar,0, ix, len).area;
            var integDown = integrates(ar,0, 0, ix).area;
            var ret = '';
            if( deltaF >= 0 ) {
                if( deltaF > integUp*0.95 ) {
                    ret = { invalidRequest:'increase is too big: deltaF='+deltaF };
                } else {
                    var coeffUp = (integUp-deltaF)/integUp;
                    var coeffDown = (deltaF+integDown)/integDown;
                }
            } else {
                if( deltaF < -integDown*0.95 ) {
                    ret = { invalidRequest:'decrease abs is too big: deltaF='+(-deltaF) };
                } else {
                    var coeffUp = (integUp-deltaF)/integUp;
                    var coeffDown = (deltaF+integDown)/integDown;
                }
            }
            if( ret ) {
                return ret;
            }
            for( var ii=0; ii<ix; ii++ ) {
                ar[ii] *= coeffDown;
            }
            for( var ii=ix+1; ii<len; ii++ ) {
                ar[ii] *= coeffUp;
                ar[ii] = Math.max(minDerivBlock,ar[ii]);
            }
            let middleDeriv = (ar[ix-1]+ar[ix+1])*0.5;
            let middeDeviation = ar[ix]-middleDeriv;
            ar[ix] = middleDeriv;

            // //\\ does smoothing
            for( var incr = -1; incr<=1; incr+=2 ) {
                var lim = incr < 0 ? 0 : len;
                for( var ii=ix+incr; (ii-lim)*incr<0; ii+=incr ) {
                    let current = ar[ii-incr];
                    let nextVal = ar[ii];
                    if( incr*(nextVal-current) >= 0 ) break;
                    let dif = (nextVal-current)*0.5;
                    ar[ii] -= dif;
                    ar[ii-1] += dif;
                }
            }
            // \\// does smoothing
            
            //normalizes: hides flaws of program algorithm
            var changed = integrates(ar,F0);
            var coeff = initialArea/integrates(ar,F0).area;
            for( var i=0; i<len; i++ ) {
                ar[i] *=coeff;
            }
            
            var newRes = integrates(ar, F0);
            fw.newDeriv = ar;
            fw.newInteg = newRes.integ;
            fw.newArea = newRes.area;
            
            //control
            var newF = newRes.integ[ix];
            var newDF = newF - origF;
            var coeff2 = fw.newArea/initialArea;
            /*
            c cc(
                'DF='+newDF.toFixed(3)
                + ' F='+newF.toFixed(3)
                + ' c1=' + coeff.toFixed(5) + ' coeff='+ coeff2.toFixed(5)
            );
            */
            //sugar extra output:
            return { newDeriv:fw.newDeriv, newInteg:fw.newInteg};
        }
        
        function integrates(newDer,F0,start,end)
        {
            var area = F0 || 0;
            var ar = newDer;
            var len = ar.length;
            var integ = [area];
            start = start || 0;
            end = end || len;
            for( var i=start; i<end; i++ ) {
                area += ar[i]*step;
                integ[i+1] = area;
            }
            return {step,area,integ};
        }
    }

}) ();


