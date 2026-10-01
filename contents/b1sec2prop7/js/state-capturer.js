( function() {
    var {
        ns, sconf, fapp, rg, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            captureAState,
        },
    });
    return;








    ///=====================================================
    /// called by User from lab-button, sDomN.captureButton$
    /// reports the sconf.js values which start S, P, and Q
    /// where they are now; the S value applies to tabs other
    /// than corollaries 1-3, which place S themselves
    ///=====================================================
    function captureAState(
        //as of March 3, 2021, has only few "insignificant sugar" GUI props for media d8d
        ast,
    ){
        const round = ( value, digits ) => Number( value.toFixed( digits ) );
        // 4 significant digits change the diagram by much less than a pixel
        const round4 = value => Number( value.toPrecision( 4 ) );

        // model position to picture position, inverting expands-conf.js
        const scale = sconf.originalMod2inn_scale;
        const model2picture = pos => [
            round( pos[0] * scale + sconf.originX_onPicture, 1 ),
            round( pos[1] * scale * sconf.MONITOR_Y_FLIP + sconf.originY_onPicture, 1 ),
        ];

        // middle of P's orbit step, so Math.floor() in
        // initiates_orbit8graph() gives the same step back
        const parQ = ( rg.P.qix + 0.5 ) * sconf.delta_q_between_steps;

        // Q: interval from P, in time or in q
        const Qoffset = sconf.TIME_IS_FREE_VARIABLE ?
            { 'sconf.Dt0' : round4( ssD.Dt ) } :
            { 'sconf.Dq0' : round4( ssD.Dq ) };

        fapp.captureState(
            ns.paste(
                {
                    // keys name where each value goes in sconf.js
                    sconf_values : {
                        'var S' : model2picture( rg.S.pos ),
                        'sconf.parQ' : round4( parQ ),
                        ...Qoffset,
                    },
                },
                ast
            )
        );
    }

}) ();
