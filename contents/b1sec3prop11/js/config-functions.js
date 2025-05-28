( function() {
    var {
        mat,
        rg, ssD, stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            recreates_q2xy,
            recreatesPosCorrector,
        },
    });
    return;

    
    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        const ellipseA = sconf.ellipseA;
        const ellipseB = sconf.ellipseB;
        const fi0 = sconf.orbit_q_start;
        const center = sconf.diagramOrigin;
        stdMod.q2xy = q2xy;
        return;
        
        function q2xy( q )
        {
            q += fi0;
            return [
                ellipseA * Math.cos( q ) + center[0],
                ellipseB * Math.sin( q ) + center[1],
            ];
        }
    }

    
    
    function recreatesPosCorrector()
    {
        const dor = sconf.diagramOrigin;
        const ellA = 1/sconf.ellipseA;
        const ellB = 1/sconf.ellipseB;
        const fi0 = sconf.curveParFi0;
        stdMod.correctsPos8angle2angle = correctsPos8angle2angle;
        return;
        
        ///pos to "virtual" andle
        function pos2t( newPos )
        {
            return mat.pos2angle([
                (newPos[0] - dor[0])*ellA,
                (newPos[1] - dor[1])*ellB,
            ])-fi0; //sconf.curveParFi0 is not a real angle, but
                    //"virtueal" inner_angle fi0
        }
        ///corrects approximate mouse point to exact point on the circle
        function correctsPos8angle2angle( pname, newPos, inner_angle ){
            let rgX = rg[pname];
            if( typeof inner_angle === 'undefined' ){
                inner_angle = pos2t( newPos );
            }
            if( inner_angle < Math.PI*0.01 || inner_angle > sconf.orbit_q_end ){
                inner_angle = ( inner_angle + sconf.orbit_q_end ) % sconf.orbit_q_end;
            }
            let qix = Math.floor( inner_angle/sconf.qgrid_step );
            rgX.qix = qix;
            rgX.parQ = qix * sconf.qgrid_step;
            var newP = ssD.qix2orb[ qix ].rr;
            let pos = rgX.pos;
            pos[0] = newP[0];
            pos[1] = newP[1];
            return pos;
        }
    }    
}) ();

