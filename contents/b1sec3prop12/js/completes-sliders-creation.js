( function() {
    var { sn, stdMod, sconf, rg, } = window.b$l.apptree({
        stdModExportList : { creates_Zeta_slider, }, });
    var op = sn( 'orbitParameters', sconf );
    return;


    function creates_Zeta_slider()
    {
        //=========================================================================
        // //\\ eccentricity slider
        //=========================================================================
        //A and H both lie on the axis on the side opposite its direction;
        //each sets the eccentricity that puts it under the pointer
        rg.A.acceptPos = newPos => {
            //A is the vertex q2xy( Math.PI ), at distance latus / ( 1 + e )
            const distance = distanceAlongAxis( newPos );
            setsEccentricity( distance > 0 ?
                op.latus / distance - 1 : op.eccentricityMax );
            return true;
        };

        if( rg.H.draggableX ) {
            //H is the other focus, at distance 2 * latus * e / ( e*e - 1 );
            //a pixel of H changes the eccentricity far less than a pixel of A
            rg.H.acceptPos = newPos => {
                const distance = distanceAlongAxis( newPos );
                const latus = op.latus;
                setsEccentricity( distance > 0 ?
                    ( latus + Math.sqrt( latus*latus + distance*distance ) )
                        / distance :
                    op.eccentricityMax );
                return true;
            };
        }

        function distanceAlongAxis( pos )
        {
            const center = sconf.diagramOrigin;
            const axis = op.mainAxisAngle;
            return -(
                ( pos[0] - center[0] ) * Math.cos( axis ) +
                ( pos[1] - center[1] ) * Math.sin( axis )
            );
        }

        function setsEccentricity( eccentricity )
        {
            stdMod.establishesEccentricity(
                Math.max( op.eccentricityMin,
                          Math.min( op.eccentricityMax, eccentricity ) ),
                false,
            );
            stdMod.rebuilds_orbit();
        }
        //=========================================================================
        // \\// eccentricity slider
        //=========================================================================
    }
}) ();
