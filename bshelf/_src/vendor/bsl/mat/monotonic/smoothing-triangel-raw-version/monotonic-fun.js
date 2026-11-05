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
        const SMOOTH = 0.07;
        const LEN = derivative.length;
        const SMOTH_INT = Math.ceil(LEN*SMOOTH);
        const SMOTH_INT_ODD = 2*SMOTH_INT+1;
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
                    ccc( "coeff="+coeffDown.toFixed(3), integDown );
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
            let twinR = ix-1;
            let twinL = ix-SMOTH_INT_ODD;
            ccc( SMOTH_INT + ' L='+twinL+ ' R='+ twinR );
            let closeIncreaseL = 0;
            for( var ii=0; ii<ix; ii++ ) {
                ar[ii] *= coeffDown;
                //needed only for decrea domain
                //ar[ii] = Math.max(minDerivBlock,ar[ii]);
                if( twinL <= ii && ii<=twinR ) {
                    closeIncreaseL += ar[ii]-stashedDeriv[ii];
                }
            }
            for( var ii=ix+1; ii<len; ii++ ) {
                ar[ii] *= coeffUp;
                ar[ii] = Math.max(minDerivBlock,ar[ii]);
            }
            let middleDeriv = (ar[ix-1]+ar[ix+1])*0.5;
            let middeDeviation = ar[ix]-middleDeriv;
            ar[ix] = middleDeriv;
            let alphaLeft = closeIncreaseL/(SMOTH_INT*SMOTH_INT);
            for( var ii=0; ii<SMOTH_INT; ii++ ){
                let iiR = twinR-ii;
                let iiL = twinL+ii;
                let mid = ar[iiR];
                ar[iiL] = stashedDeriv[iiL]+alphaLeft*(ii+1);
                ar[iiR] = stashedDeriv[iiR]+alphaLeft*(ii+1);
                ccc( iiL, iiR, SMOTH_INT_ODD );
            }
            ar[ix-1-SMOTH_INT] = stashedDeriv[ix-1-SMOTH_INT]+
                               alphaLeft*SMOTH_INT;
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
            ccc(
                'DF='+newDF.toFixed(3)
                + ' F='+newF.toFixed(3)
                + ' c1=' + coeff.toFixed(5) + ' coeff='+ coeff2.toFixed(5)
            );
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


