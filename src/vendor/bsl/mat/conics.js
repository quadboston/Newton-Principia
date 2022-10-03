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
        om, // sinOmega,
        signCosOmega,

        //additions for Kepler's law
        Kepler_g, //optional, f = Kepler_g / r²
        Kepler_v, //optional, Kepler_g = (om*r*Kepler_v)²/latus
    }) {
        if( !om && om !== 0 ){
            ////first batch of variables
            var eta = 1 - e*Math.cos(fi);
            //assumes om >= 0:
            om = eta / Math.sqrt( e*e-1+2*eta);
            if( !lat && lat !== 0 ) {
                lat = eta*r;
            } else {
                r = lat / eta;
            }
        } else {
            ////second batch of variables
            var eta = lat / r;
            var eo = eta/om;
            var e2 = eo*eo-2*eta+1;
            e = Math.sqrt(e2);
            var Cfi = (1 - eta)/e;
            fi = Math.acos( Cfi );
            let finalSignum = typeof signCosOmega === 'undefined' ? -1 : signCosOmega;
            finalSignum = Math.sign( om ) * finalSignum;
            let fiCritical = e <= 1 ? 0 : Math.acos( 1/e );
            fi = -( fi < fiCritical ? -fi : fi ) * finalSignum;
        }

        //addition for Kepler's law
        if( typeof Kepler_g !== 'undefined' ){
            var Kepler_v = Math.sqrt( Kepler_g * lat ) / ( om * Math.abs( r ) );
        } else if( typeof Kepler_v !== 'undefined' ) {
            var M = om*r*Kepler_v;
            var Kepler_g = M*M / lat;
        }
        return { e, fi, om, lat, r, eta, Kepler_v, Kepler_g };
    }

}) ();


