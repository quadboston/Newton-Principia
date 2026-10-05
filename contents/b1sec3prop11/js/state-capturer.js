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
    /// reports the sconf.js values which start P, Q, and A
    /// where they are now
    ///=====================================================
    function captureAState(
        //as of March 3, 2021, has only few "insignificant sugar" GUI props for media d8d
        ast,
    ){
        // 4 significant digits change the diagram by much less than a pixel
        const round4 = value => Number( value.toPrecision( 4 ) );

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
                        'sconf.parQ' : round4( parQ ),
                        ...Qoffset,
                        // A is the vertex at the end of semi-axis ellipseA;
                        // sconf.js derives ellipseB from both values
                        'sconf.ellipseA' : round4( sconf.ellipseA ),
                        'sconf.eccentricity' : round4( sconf.eccentricity ),
                    },
                },
                ast
            )
        );
    }

}) ();
