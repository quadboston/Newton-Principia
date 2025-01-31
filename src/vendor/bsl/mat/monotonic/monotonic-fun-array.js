( function() {
    var {
        ns, sn, mat,
        haz,
    } = window.b$l.nstree();
    var integral = sn( 'integral', mat );
    integral.creates_monoFrameWork = creates_monoFrameWork;
    return;



    
    ///******************************************
    ///  function creates_monoFrameWork({
    ///******************************************
    function creates_monoFrameWork({
        F0,
        derivative,
        step,
    }) {
        const fw = {};

        //const TAIL = 0.15;
        const TAIL = 0.1;

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
        let initialArea = area-F0;
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
            //var minDerivBlock = initialArea/(len*step)*0.005;
            var minDerivBlock = initialArea/(len*step)*0.02;
            var integUp = integrates(ar,0, ix, len).area;
            var integDown = integrates(ar,0, 0, ix).area;
            var ret = '';
            if( deltaF >= 0 ) {
                if( deltaF > integUp*0.98 ) {
                    ret = { invalidRequest:'increase is too big: deltaF='+deltaF
                            +' initialArea='+initialArea.toFixed(3)
                            +' integUp='+integUp.toFixed(3)
                    };
                } else {
                    var coeffUp = (integUp-deltaF)/integUp;
                    var coeffDown = (deltaF+integDown)/integDown;
                }
            } else {
                if( deltaF < -integDown*0.98 ) {
                    ret = { invalidRequest:'decrease abs is too big: deltaF='+(-deltaF) };
                } else {
                    var coeffUp = (integUp-deltaF)/integUp;
                    var coeffDown = (deltaF+integDown)/integDown;
                }
            }
            if( ret ) {
                return ret;
            }

            changeIteration({ix, deltaF, ar, minDerivBlock})


            //alternative changer
            for( var ii=0; ii<ix; ii++ ) {
                ar[ii] *= coeffDown * 0.5;
                if( coeffDown < 1 ) {
                    ar[ii] = Math.max(minDerivBlock,ar[ii]);
                }
            }
            for( var ii=ix+1; ii<len; ii++ ) {
                ar[ii] *= coeffUp * 0.5;
                if( coeffUp < 1 ) {
                    ar[ii] = Math.max(minDerivBlock,ar[ii]);
                }
            }
           
            
            if( 
                Math.abs(deltaF) > initialArea*0.01 ) {
            
                // //\\ does smoothing
                // //\\ smoves gap in break neighbouhood
                let downIsUp = deltaF>0 ? 1 : -1;
                for( var updown = -1; updown<=1; updown+=2 ) {
                    var lim = updown < 0 ? 0 : len;
                    //for( var ii=ix+updown; (ii-lim)*updown<0; ii+=updown ) {
                    for( var ii=ix-updown; (ii-lim)*updown<0; ii+=updown ) {
                        let ixBefore = ar[ii-updown];
                        let ixCurrent = ar[ii];
                        if( downIsUp*updown*(ixCurrent-ixBefore) >= 0 ) break;
                        let dif = (ixCurrent-ixBefore)*0.5;
                        ar[ii] -= dif;
                        let iiPupdown = ii+updown;
                        if( iiPupdown < len ) {
                            ar[iiPupdown] += dif;
                        }
                    }
                }
                // \\// smoves gap in break neighbouhood

                /*
                // //\\ smoothing by averaging
                let averDepth = Math.max( 2, Math.ceil(0.005*len) );
                let averGroup = 1;
                //c cc( 'averDepth='+averDepth + ' averGroup=' + averGroup );
                let effLen = len-averDepth-averGroup;
                for( var i=0; i<effLen; i++ ) {
                    let av = 0;
                    for( var j=0; j<averGroup; j++ ) {
                        av += ar[i+j];
                        av += ar[i+averDepth+j];
                    }
                    av /= averGroup*2;
                    for( var j=0; j<averGroup; j++ ) {
                        ar[i+j] = av;
                        ar[i+averDepth] = av;
                    }
                }
                // \\// smoothing by averaging
                */
            }
            // \\// does smoothing
            
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
            fw.newInteg = newRes.integ;
            fw.newArea = newRes.area;
            
            //control
            var newF = newRes.integ[ix];
            var newDF = newF - origF;

            
            var coeff3 = fw.newArea/(initialArea+F0);
            //surprizingly there is a need of 3 iteration to
            //get bak to starting area
            /*
            ccc(
                'coeff='+ coeff.toFixed(5)
                +' coeff='+ coeff2.toFixed(5)
                +' coeff='+ coeff3.toFixed(5)
            );
            */
            //sugar extra output:
            return { newDeriv:fw.newDeriv, newInteg:fw.newInteg};
        }
        
        function changeIteration({ix, deltaF, ar, minDerivBlock })
        {
            var len = ar.length;
            let TAILx = Math.min( ix/(len-1)*0.8, TAIL*2 ); 
            let ixstart = Math.floor( Math.max( 0, ix - TAILx*len ) );
            let ixupper = Math.ceil( Math.min( len, ix + TAILx*len ) );
            let tail2 = (ixupper-ixstart)/2;
            ///makes increase before control index ix
            ixupper = ix;
            ix = ixstart;
            ixstart = Math.max( 0, ixstart - ( ixupper-ix ) );

            let alpha =
            
                //todo it is unclear why 4, but 2
                (deltaF < 0 ? 4 : 2) *
                
                deltaF/(tail2*tail2*step*step);
            alpha *= 0.5;
            //alpha *= 0.2;
            for( var i=ixstart; i<ixupper; i++ ) {
                var ireverse = tail2 - Math.abs( i-ix );
                var x = step * ireverse;
                var deltad = x * alpha;
                ar[i] = Math.max( minDerivBlock, ar[i] + deltad );
            }
            
            //------------------------------------
            // //\\ reduces area to the same value
            //------------------------------------
            var changed = integrates(ar,0);
            var coeff = initialArea/changed.area;
            for( var i=ix; i<len; i++ ) {
                let factor = (1+(coeff-1)*(i-ix)/(len-ix-1));
                ar[i] *= factor;
                ar[i] = Math.max( minDerivBlock, ar[i] );
            }
            var coeff = initialArea/integrates(ar,0).area;
            for( var i=0; i<len; i++ ) {
                //ar[i] *=coeff;
            }
            //------------------------------------
            // \\// reduces area to the same value
            //------------------------------------
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
                if( isNaN(ar[i]) ) {
                    ccc( ar[i] );
                }
                area += ar[i]*step;
                integ[i+1] = area;
            }
            return {step,area,integ};
        }
    }
    
}) ();


