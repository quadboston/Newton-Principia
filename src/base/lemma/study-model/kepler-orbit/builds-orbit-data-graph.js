( function() {
    var {
        sn, haz, userOptions,
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
        const QS = sconf.Q_STEPS;
        const DS = sconf.DATA_GRAPH_STEPS;
        const CS = sconf.CALCULATE_SUGITTA_ALONG_THE_PATH;
        const fl_fun = haz( sconf, 'force_law' ) || null;
        const dataPeriod = Math.max( 1, Math.floor( QS/DS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const glim = ssD.qix_graph_lim;
        
        var forceMax = 0;
        var displMax = 0;
        var sagittaMax = 0;
        var speedMax = 0;
        for( let qix=0; qix<glim; qix++ ){
            if( !(qix%dataPeriod) || qix===QS ){
                const bP = qix2orb[ qix ];
                //if( bP.plusQ === null )
                //    ccc( bP.qix );
                if( bP.plusQ === null ) continue;
                
                const displacement = bP.displacement;
                const sagitta = bP.sagitta;
                const ds_dt = bP.ds_dt;
                if( fl_fun ){
                    var instantForce = fl_fun( bP  );
                } else if( sconf.TIME_IS_FREE_VARIABLE ) {
                    var instantForce = bP.instant_sagitta;
                }

                forceMax = Math.max( forceMax, Math.abs(instantForce) );
                displMax = Math.max( displMax, Math.abs(displacement) );
                speedMax = Math.max( speedMax, ds_dt );
                if( CS ) {
                    sagittaMax = Math.max( sagittaMax, Math.abs(sagitta) );
                }

                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    x : bP.r,
                    y : [
                        instantForce,
                        displacement,
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
        const SAGITTA = CS && ADDENDUM;
        for( var gix = 0; gix<arrLen; gix++ ){
            const y = graphArray[ gix ].y;
            y[0] = y[0]/forceMax * ( ADDENDUM ? 1 : Math.sign(y[0]) );
            y[1] = y[1]/displMax * ( ADDENDUM ? 1 : Math.sign(y[1]) );
            ADDENDUM && ( y[2] /= speedMax );
            y[3] = y[3]/forceMax * ( ADDENDUM ? 1 : Math.sign(y[3]) );
        }
        stdMod.graphFW_lemma.graphArrayMask = ADDENDUM ?
            [ 
                'force',
                'displacement',
                'body',
                //blocks at times when algo breaks, 'sagitta'
                CS && ssD.Dt > ssD.tgrid_step*sconf.SAGITTA_ACCURACY_LIMIT,
            ] :
            [ 
                'force',
                'displacement',
            ];
        //this is just an example how to reset colors dynamically:
        //stdMod.graphFW_lemma.colorThreadArray[0] =
        //    ADDENDUM ? 'green' : sDomF.getFixedColor( 'force' );
        //------------------------------------------
        // \\// resets forceGraphArray
        //------------------------------------------
    }
}) ();