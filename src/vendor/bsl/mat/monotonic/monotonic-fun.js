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
        let initialArea = integral(1, derivative);
        let minDerivBlock = initialArea * 0.0001;

        fw.changesFunction = changesFunction;
        fw.integral = integral;
        return fw;

        ///input
        /// x - fraction of realXRange
        function integral( x,deriv_argr,F0,ix )
        {
            var der = deriv_argr || fw.newDeriv;
            var sum = F0 || 0;
            var len = LEN;
            if( typeof ix === 'undefined' ) {            
                var xNum = x*len;
                var ix = Math.floor( xNum-0.5 );
            } else {
                var xNum = ix+1;
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
            var len = LEN;
            var ar = fw.deriv.concat();
            var stashedDeriv = fw.deriv;
            var origF = null;

            var ret = changeIteration({ix, deltaF, ar, minDerivBlock})
            if( ret.invalidRequest ) return ret;
        
            //normalizes: hides flaws of program algorithm
            var coeff = initialArea/integral(1,ar);
            for( var i=0; i<len; i++ ) {
                ar[i] *=coeff;
            }

            var coeff2 = initialArea/integral(1,ar);
            for( var i=0; i<len; i++ ) {
                ar[i] *=coeff2;
            }
            var newRes = integral(1, ar);
            fw.newDeriv = ar;
            
            //control
            var coeff3 = newRes/initialArea;
            //sugar extra output:
            return { newDeriv:fw.newDeriv };
        }
        
        function changeIteration({ix, deltaF, ar, minDerivBlock })
        {
            let left = integral( ix/LEN, ar, 0 );
            let full = integral( 1, ar, 0 );
            let right = full - left;
            /*
            c cc( 'ix='+ix
                 + ' left='+left.toFixed(3)
                 + ' right=' + right.toFixed(3)
                 + ' full=' + full.toFixed(3)
                 + ' initialArea=' + initialArea.toFixed(3)
            );
            */
            let increase = deltaF/step;
            var twin = 1;
            var minim = [ix+1, LEN-1];
            if( increase < 0 ) {
                var minim = [0, ix];
                ix +=1;
                increase *= -1;
            }
            var reminder = 0;
            for( var ii=minim[0]; ii<=minim[1]; ii++ ) {
                reminder += ar[ii];
            }
            //todm do message-flag
            if( reminder-minDerivBlock < increase ) {
                return { invalidRequest :
                    'abs value of change is too big:'
                    + ' abs='+increase.toFixed(3)
                    + ' reminder='+reminder.toFixed(3)
                    
                };
            }
            ar[ix] += increase;
            var coeff = (reminder-increase)/reminder;
            for( var ii=minim[0]; ii<=minim[1]; ii++ ) {
                ar[ii] *=coeff;
            }
            /*    
            switch(ix) {
                case 0: ar[0] += increase;
                        ar[1] -= increase;
                break;
                case 1: ar[1] += increase;
                        ar[2] -= increase;
                break;
                case 2: ar[2] += increase;
                        ar[3] -= increase;
                break;
            }
            */
            return {invalidRequest:null};
        }
    }

    
}) ();


