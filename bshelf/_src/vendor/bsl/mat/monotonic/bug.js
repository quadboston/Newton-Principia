( function() {
    var {
        sn, mat,
    } = window.b$l.nstree();
    var integral = sn( 'integral', mat );
    integral.creates_monoFrameWork_linear = creates_monoFrameWork_linear;
    return;









    function creates_monoFrameWork_linear({
        F0,
        derivative,
        step,
    }) {
        const fw = {};

        fw.newDeriv = derivative;
        fw.deriv = fw.newDeriv;
        F0 = F0 || 0;
        fw.F0 = F0;
        const LEN = derivative.length;
        step = step || 1/LEN
        fw.step = step;
        let area = integral(1, derivative, F0);
        let initialArea = area-F0;
        let minDerivBlock = initialArea * 0.0001;

        fw.changesFunction = changesFunction;
        fw.integral = integral;
        return fw;

        ///input
        /// x - fraction of realXRange
        function integral( x,deriv_argr,F0, ix )
        {
            var der = deriv_argr || fw.newDeriv;
            var sum = F0 || 0;
            var len = der.length;
            if( typeof ix === 'undefined' ) {
                var ix = Math.floor( xNum-0.5 );
                var xNum = 0.5 + ix;
            } else {
                var x = ix/len + 0.5;
                var xNum = x*len;
            }
            if( xNum <= 0.5 ) {
                sum += der[0]*step*xNum;
            } else {
                sum += xNum < 1.5 ? der[0]*step*0.5 : der[ix]*step*0.5;
                for( var i=0; i<ix; i++ ) {
                    sum += der[i]*step;
                }
                let reminderX = xNum - ix - 0.5;
                var reminderArea =
                    reminderX * step *
                    (der[ix] +
                      ( xNum >= len-1 + 0.5 ?
                        0 : 0.5 * reminderX * (der[ix+1]-der[ix])
                      )
                    );
                sum += reminderArea;
            }
            return sum;
        }
        
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
            var origF = null;

            changeIteration({ix, deltaF, ar, minDerivBlock})
            return {};
        
            //normalizes: hides flaws of program algorithm
            var coeff = initialArea/integrates(ar,0).area;
            for( var i=0; i<len; i++ ) {
                ar[i] *=coeff;
            }

            var coeff2 = initialArea/integrates(ar,0).area;
            for( var i=0; i<len; i++ ) {
                ar[i] *=coeff2;
            }
            
            var newRes = integrates(ar, F0);
            fw.newDeriv = ar;
            fw.newInteg = null;
            fw.newArea = newRes.area;
            
            //control
            var newF = null;
            var newDF = newF - origF;
            var coeff3 = fw.newArea/(initialArea+F0);
            //sugar extra output:
            return { newDeriv:fw.newDeriv };
        }
        
        function changeIteration({ix, deltaF, ar, minDerivBlock })
        {
            ///makes increase before control index ix

            let left = integral( ix/LEN, ar, 0 );
            let full = integral( 1, ar, 0 );
            let right = full - left;
            ccc( 'ix='+ix + ' left='+left.toFixed(3)
                 + ' right=' + right.toFixed(3)
                 + ' full=' + full.toFixed(3)
            );
            return {};
        }
    }

    
}) ();


