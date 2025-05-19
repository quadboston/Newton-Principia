( function() {
    var {
        sn, userOptions,
        amode, stdMod, sconf, ssD,
    } = window.b$l.apptree({
        stdModExportList :
        {
            builds_orbit_data_graph,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    const orbitXYToDraw = sn( 'orbitXYToDraw', ssD, [] );
    //usage sample: const BONUS = !!userOptions.showingBonusFeatures();
    return;


    function builds_orbit_data_graph()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        const FS = sconf.Q_STEPS;
        const DS = sconf.DATA_GRAPH_STEPS;
        const CS = sconf.CALCULATE_SUGITTA_ALONG_THE_PATH;
        const fl_fun = sconf.force_law;
        const dataPeriod = Math.max( 1, Math.floor( FS/DS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const glim = ssD.qix_graph_lim;
        for( let qix=0; qix<glim; qix++ ){
            if( !(qix%dataPeriod) || qix===FS ){
                const bP = qix2orb[ qix ];
                if( bP.plusQ === null ) continue;
                const deviation = bP.estForce;
                const sagitta = bP.sagitta;
                const forceAbs = fl_fun( bP );

                ///to normalize force
                if( qix === 0 ) {
                    var forceMax = forceAbs;
                } else if( forceMax < forceAbs ) {
                    var forceMax = forceAbs;
                }
                ///to normalize deviation
                if( qix === 0 ) {
                    var deviationMax = deviation;
                } else if( deviationMax < deviation ) {
                    var deviationMax = deviation;
                }
                if( CS ) {
                    ///to normalize sagitta
                    if( qix === 0 ) {
                        var sagittaMax = sagitta;
                    } else if( sagittaMax < sagitta ) {
                        var sagittaMax = sagitta;
                    }
                }
                ///to normalize speed
                var ds_dt = bP.ds_dt;
                if( qix === 0 ) {
                    var speedMax = ds_dt;
                } else if( speedMax > ds_dt ){
                    speedMax = Math.max( speedMax, ds_dt );
                }
                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    x : bP.r,
                    y : [
                        forceAbs,
                        deviation,
                        ds_dt,
                        sagitta,
                    ],
                };
                graphArray.push( graphColumn );
            }
        }

        //------------------------------------------
        // //\\ resets forceGraphArray
        //------------------------------------------
        var arrLen = graphArray.length;
        var sign = ADDENDUM ? -1 : 1;
        forceMax = sign * forceMax;
        deviationMax = sign * deviationMax;
        sagittaMax = sign * sagittaMax;
        for( var gix = 0; gix<arrLen; gix++ ){
            const y = graphArray[ gix ].y;
            y[0] /= forceMax;
            y[1] /= deviationMax;
            ADDENDUM && ( y[2] /= speedMax );
            CS && ADDENDUM && ( y[3] /= sagittaMax );
        }
        stdMod.graphFW_lemma.graphArrayMask = ADDENDUM ?
            [ 'force', 'deivation', 'body',
                //blocks at times wher algo breaks, 'sagitta'
                CS && ssD.Dt > ssD.tgrid_step*3
            ] :
            [ 'force', 'deivation', ];
        //this is just an example how to reset colors dynamically:
        //stdMod.graphFW_lemma.colorThreadArray[0] =
        //    ADDENDUM ? 'green' : sDomF.getFixedColor( 'force' );
        //------------------------------------------
        // \\// resets forceGraphArray
        //------------------------------------------
    }
}) ();