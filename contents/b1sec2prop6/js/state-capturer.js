( function() {
    var {
        ns, sconf, fapp, rg, ssD, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            captureAState,
        },
    });
    return;








    ///=====================================================
    /// called by User from lab-button, sDomN.captureButton$
    /// reports values for sconf.js which initialize S, P, Q,
    /// and the curve pivots where they are now
    ///=====================================================
    function captureAState(
        //as of March 3, 2021, has only few "insignificant sugar" GUI props for media d8d
        ast,
    ){
        const round = ( value, digits ) => Number( value.toFixed( digits ) );

        // model position to picture position, as used for pos in sconf.js;
        // posS stays the picture origin and posA the scale anchor
        const model2picture = pos => [
            round( pos[0] * sconf.mod2inn_scale + sconf.originX_onPicture, 1 ),
            round( pos[1] * sconf.mod2inn_scale / sconf.MONITOR_Y_FLIP +
                   sconf.originY_onPicture, 1 ),
        ];

        // Bezier pivots define the curve; init_model_parameters scales the
        // configured pivots, so the scale is undone here
        const curvePivots = ssD.bezio.pivotsPos.map( ( pos, cpix ) => {
            const [ scaleX, scale ] = stdMod.pivotScale( cpix );
            return model2picture( [ pos[0] / scaleX, pos[1] / scale ] );
        });

        // P: middle of its orbit step, so Math.floor() gives the step back
        const parQ = ( rg.P.qix + 0.5 ) * sconf.delta_q_between_steps;

        // Q: interval from P, in time or in q
        const Qoffset = sconf.TIME_IS_FREE_VARIABLE ?
            { Dt0 : round( ssD.Dt, 4 ) } :
            { 'sconf.Dq0' : round( ssD.Dq, 4 ) };

        fapp.captureState(
            ns.paste(
                {
                    // keys name where each value goes in sconf.js;
                    // curvePivots[0] replaces posA in the curvePivots array
                    initial_values : {
                        'originalPoints.S.pos' : model2picture( rg.S.pos ),
                        'sconf.parQ' : round( parQ, 4 ),
                        ...Qoffset,
                        curvePivots,
                    },
                },
                ast
            )
        );
    }

}) ();
