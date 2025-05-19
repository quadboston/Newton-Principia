( function() {
    var {
        mat,
        stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            recreates_q2xy,
            //recreates_pos2q,
        },
    });
    return;


    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        var center  = sconf.diagramOrigin;
        const ro0   = sconf.ro0;
        const A     = sconf.curveParA;
        const q0    = sconf.orbit_q_start;
        stdMod.q2xy = q2xy;
        return;
        
        function q2xy( q )
        {
            q += q0;
            var ro = ro0*Math.exp( A*q );
            return [
                ro * Math.cos( q ) + center[0],
                ro * Math.sin( q ) + center[1],
            ];
        }
    }

    /*
    function recreates_pos2q()
    {
        const dor = sconf.diagramOrigin;
        const q0 = sconf.orbit_q_start;
        const PI2_near = sconf.orbit_q_end * 1.3;
        stdMod.pos2q = pos2q;
        return;
        
        ///pos to parameter: "virtual" angle
        function pos2q( newPos )
        {
            ///returns andgle from interval [0,2PI),
            let ro1 = newPos[0] - dor[0];
            let ro2 = newPos[1] - dor[1];
            let distance2 = ro1*ro1 + ro2*ro2;
            var qq = ( mat.pos2angle([ro1,ro2])-q0 ) % Math.PI*2;
            ccc(
                //'q0='+q0.toFixed(3) +
                ' cycled: qq='+qq.toFixed(3) );
            ///fixes edge cases, jups of orbit body pointer,
            ///can look abrupt, this fix is not good:
            if( (qq < Math.PI*0.1 || qq > sconf.orbit_q_end ) &&
                distance2 < sconf.ro02 ){
                qq = sconf.orbit_q_end;
            } else if( qq > PI2_near && distance2 > sconf.ro02*2 ){
                ccc( 'mininizing: ' + qq.toFixed(3), PI2_near, sconf.orbit_q_end );
                qq = 0.0001;
            }
            ccc( 'final='+qq.toFixed(3) );
            return qq;
        }
    }
    */
}) ();

