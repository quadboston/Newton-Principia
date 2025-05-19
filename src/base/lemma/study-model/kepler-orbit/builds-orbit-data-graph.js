( function() {
    var { sn, userOptions, amode, stdMod, sconf, ssD, } 
        = window.b$l.apptree({ stdModExportList : { builds_orbit_data_graph, }, });
    var graphArray = sn( 'graphArray', stdMod, [] );
    var qix2orb = sn( 'qix2orb', ssD, [] );
    var orbitXYToDraw = sn( 'orbitXYToDraw', ssD, [] );
    //const BONUS = userOptions.showingBonusFeatures() ? 1 : 0;
    return;


    function builds_orbit_data_graph()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length =0;
        
        let fl_fun = sconf.force_law;
        var orbit_q_start = sconf.orbit_q_start;
        var q2xy = stdMod.q2xy;
        const FORCE_ARRAY_LEN = sconf.FORCE_ARRAY_LEN;
        const orbitXYToDraw_LIMIT = Math.min( 1000, sconf.FORCE_ARRAY_LEN );
        const DATA_GRAPH_ARRAY_LEN = sconf.DATA_GRAPH_ARRAY_LEN;
        var DATA_GRAPH_ARRAY_period = Math.max( 1,
            Math.floor( FORCE_ARRAY_LEN/DATA_GRAPH_ARRAY_LEN ) );
        const CALCULATE_SUGITTA_ALONG_THE_PATH =
              sconf.CALCULATE_SUGITTA_ALONG_THE_PATH;
        const IS_DEVIATION_SCALED_BY_FORCE_MAX = 
              sconf.IS_DEVIATION_SCALED_BY_FORCE_MAX;
        const DEVIATION_SCALE_FACTOR =
              sconf.DEVIATION_SCALE_FACTOR || 1;
        
        ///prepares averages and placeholder for data graphs
        for( let qix=0; qix<=FORCE_ARRAY_LEN; qix++ ){
            if( !(qix%DATA_GRAPH_ARRAY_period) || qix===FORCE_ARRAY_LEN ){
                const bP = qix2orb[ qix ];
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
                if( sconf.CALCULATE_SUGITTA_ALONG_THE_PATH ) {
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
        for (var gix = 0; gix<arrLen; gix++ )
        {
            const ga = graphArray[ gix ];
            const y = ga.y;
            y[0] /= forceMax;
            y[1] /= IS_DEVIATION_SCALED_BY_FORCE_MAX ? 
                forceMax * DEVIATION_SCALE_FACTOR :
                deviationMax;
            ADDENDUM && ( y[2] /= speedMax );
            CALCULATE_SUGITTA_ALONG_THE_PATH && ADDENDUM &&
                ( y[3] /= sagittaMax );
        }
        stdMod.graphFW_lemma.graphArrayMask = ADDENDUM ?
            [ 'force', 'deivation', 'body',
                //blocks at times wher algo breaks, 'sagitta'
                CALCULATE_SUGITTA_ALONG_THE_PATH && sDt > timeDelta*3
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
