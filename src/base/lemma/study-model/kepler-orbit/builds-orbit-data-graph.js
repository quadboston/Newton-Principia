( function() {
    var { sn, haz, rg, amode, stdMod, sconf, ssD, sData, } 
        = window.b$l.apptree({ stdModExportList : {
            builds_orbit_data_graph,
            P2gix,
        },
    });
    const graphArray = sn( 'graphArray', stdMod, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    const orbitXYToDraw = sn( 'orbitXYToDraw', ssD, [] );
    return;


    function P2gix(){
        const qix = rg.P.qix;
        const gix = qix2orb[ qix ].gix;
        return gix;
    }


    function builds_orbit_data_graph()
    {
        const ADDENDUM = amode.aspect === 'addendum';
        const GRAPH_PATH = sData.GRAPH_PATH;
        const QS = sconf.Q_STEPS;
        const DS = sconf.DATA_GRAPH_STEPS;
        const fl_fun = sconf.force_law;
        const dataPeriod = Math.max( 1, Math.floor( QS/DS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const gstart = ssD.qix_graph_start;
        const gend = ssD.qix_graph_end;
        var displMax = 0;
        var sagittaMax = 0;
        var instantForceMax = 0;
        var speedMax = 0;
        //var fullPath = qix2orb[ gend ].pathAtQ;
        for( let qix=gstart; qix<=gend; qix++ ){
            const bP = qix2orb[ qix ];
            const displacement = bP.displacement;
            const sagitta = bP.sagitta;
            const ds_dt = bP.ds_dt;
            if( fl_fun ){
                var instantForce = fl_fun(bP);

            //this is a stub for non-Kepler orbits:    
            //} else if( sconf.TIME_IS_FREE_VARIABLE ){
            //    var instantForce = bP.instant_sagitta;

            } else {
                var instantForce = bP.instant_displacement;
            }
            bP.instantForce = instantForce;
            if( !(qix%dataPeriod) || qix===QS ){
                sagittaMax = Math.max( Math.abs( sagitta ), sagittaMax );
                instantForceMax = Math.max( Math.abs( instantForce ), instantForceMax );
                displMax = Math.max( Math.abs( displacement ), displMax );
                speedMax = Math.max( speedMax, ds_dt );
                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    x : GRAPH_PATH ? bP.pathAtQ : bP.r,
                };
                graphArray.push( graphColumn );
            }
            bP.gix = Math.max(0,graphArray.length-1);
        }

        //------------------------------------------
        // //\\ resets graphArray
        //------------------------------------------
        var arrLen = graphArray.length;
        const instantForceMax1 = 1/instantForceMax;
        const displMax1 = 1/displMax;
        const sagittaMax1 = 1/sagittaMax;
        const speedMax1 = 1/speedMax;
        for( var gix = 0; gix<arrLen; gix++ ){
            const ga = graphArray[ gix ];
            const qix = ga.qix;
            const bP = qix2orb[ qix ];
            bP.gix = gix;
            let instf = bP.instantForce;
            instf = instf * instantForceMax1 * (ADDENDUM ? 1 : Math.sign(instf));
            let disp = bP.displacement;
            disp *= displMax1 * ( ADDENDUM ? 1 : Math.sign(disp) );
            let ds_dt = bP.ds_dt;
            ds_dt *= speedMax1;
            let sagitta = bP.sagitta;
            sagitta *= sagittaMax1 * ( ADDENDUM ? 1 : Math.sign(sagitta) );
            ga.y = [
                instf,
                disp,
                ds_dt,
                sagitta,
            ];
        }
        ///this is a common graph lines, but this mask can be
        ///overriden in model_upcreate()
        stdMod.graphFW_lemma.graphArrayMask = ADDENDUM ?
            [ 
                'force',
                'displacement',
                'body',
                sconf.TIME_IS_FREE_VARIABLE && 'sagitta',
            ] :
            [ 
                'force',
                'displacement',
            ];
        //------------------------------------------
        // \\// resets graphArray
        //------------------------------------------
    }
}) ();
