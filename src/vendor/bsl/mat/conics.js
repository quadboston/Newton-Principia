( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var conics      = sn( 'conics', mat );

    //----------------------------------------------------
    // //\\ test,
    //
    //----------------------------------------------------
    //var der = innerPars2innerPars({
    //    //circle
    //    fun             : (x) => Math.sqrt( Math.abs( 1 - x*x ) ),
    //});
    //ccc( der )
    //----------------------------------------------------
    // \\// test
    //----------------------------------------------------
    conics.innerPars2innerPars = innerPars2innerPars;
    return;


    function innerPars2innerPars({
        //pool of alternatives, both needed for omega, only one for fi,e
        r,
        lat, //latus

        //first batch of variables
        fi,  // phi
        e,

        //second batch of variables
        // if om is defined, then special case, e < 0.00000001,
        // manually makes angle fi = 0,
        om, // sinOmega, flag=which batch to use


        signCosOmega,

        //sigma,    //hyperbola branch for future version

        //additions for Kepler's law,
        //only to redefine eash other,
        //if either of them is profided, then the other
        //is defined from provided,
        Kepler_g, //optional, f = Kepler_g / r²
        Kepler_v, //optional, Kepler_g = (om*r*Kepler_v)²/latus
    }) {
        signCosOmega = typeof signCosOmega === 'undefined' ? -1 : signCosOmega;

        if( !om && om !== 0 ){
            //// om is undefined
            //// first batch of variables
            var eta = 1 - e*Math.cos(fi);
            //assumes om >= 0:
            om = eta / Math.sqrt( e*e-1+2*eta);
            if( !lat && lat !== 0 ) {
                lat = eta*r;
            } else {
                r = lat / eta;
            }
        } else {
            ////om is defined
            ////second batch of variables
            var eta = lat / r;
            if( Math.abs( om ) > 0.9999999 ) {
                ////never strictly orthogonal
                om = Math.sign( om ) * 0.999999;
                //slightly moves cos
                signCosOmega = signCosOmega === 0 ? 1 : signCosOmega;
            }
            var eo      = eta/om;
            var e2      = eo*eo-2*eta+1;
            e           = Math.sqrt(e2);

            //console.log('conic.js: ' + e.toFixed(3));
            
            var Cfi     =
                            Math.min(       //because sometimes it is > 1 due floating ...
                            1, (1 - eta)/e );
            Cfi         = Math.max( -1, Cfi );  //for floating ...
            fi          = Math.acos( Cfi );

            let eInv    = 1/e;
            let fiCrit  = eInv >= 1 ? 0 : Math.acos( eInv );
            let sigma   = fi < fiCrit ? -1 : 1; //branch

            let signum  = -Math.sign( om * signCosOmega );
            fi          *= sigma * signum;
        }
        let cosOmega = signCosOmega * Math.sqrt( Math.max(0, 1 - om*om ) );

        //addition for Kepler's law
        if( typeof Kepler_g !== 'undefined' ){
            var Kepler_v = Math.sqrt( Kepler_g * lat ) / ( Math.abs(om) * Math.abs( r ) );
        } else if( typeof Kepler_v !== 'undefined' ) {
            var M = om*r*Kepler_v;
            var Kepler_g = M*M / lat;
        }
        return { e, fi, om, cosOmega, lat, r, eta, Kepler_v, Kepler_g };
    }

}) ();


