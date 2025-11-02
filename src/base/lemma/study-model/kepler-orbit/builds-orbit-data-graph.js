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
        const NORMALIZE_BY_ULTIM_IN_NON_ADDEN = 
              haz( sconf, 'NORMALIZE_BY_ULTIM_IN_NON_ADDEN' );
        const ADDENDUM = amode.aspect === 'addendum';
        const TIME = sconf.TIME_IS_FREE_VARIABLE;
        const GRAPH_PATH = sData.GRAPH_PATH;
        const QS = sconf.Q_STEPS;
        const DS = sconf.DATA_GRAPH_STEPS;
        const known_force_law = sconf.force_law;
        const dataPeriod = Math.max( 1, Math.floor( QS/DS ) );

        stdMod.graphFW_lemma.graphArray = graphArray;
        graphArray.length = 0;
        ///prepares averages and placeholder for data graphs
        const gstart = ssD.qix_graph_start;
        const gend = ssD.qix_graph_end;
        var displMax = 0;
        var sagittaMax = -1;
        var instantForceMax = 0;
        let show_force_max = [];
        let show_force_min = [];
        var speedMax = 0;
        //var fullPath = qix2orb[ gend ].pathAtQ;
        for( let qix=gstart; qix<=gend; qix++ ){
            const bP = qix2orb[ qix ];
            const fQR = bP.fQR;
            const sagitta = bP.sagitta;
            const ds_dt = bP.ds_dt;
            if( known_force_law ){
                var instantForce = known_force_law(bP);
                
            //this is a stub for non-Kepler orbits:    
            //} else if( sconf.TIME_IS_FREE_VARIABLE ){
            //    var instantForce = bP.instant_sagitta;

            } else {
                var instantForce = bP.instant_fQR;
            }
            bP.instantForce = instantForce;
            if( !(qix%dataPeriod) || qix===QS ){
                if( TIME ){
                    sagittaMax = Math.max( Math.abs( sagitta ), sagittaMax );
                }
                instantForceMax = Math.max( Math.abs( instantForce ), instantForceMax );
                displMax = Math.max( Math.abs( fQR ), displMax );
                speedMax = Math.max( speedMax, ds_dt );
                let graphColumn = {
                    qix,
                    rr : bP.rr,
                    x : GRAPH_PATH ? bP.pathAtQ : bP.r,
                    y : [],
                };
                graphArray.push( graphColumn );
                let show_init = !show_force_max.length;

                sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                    const val = f.fun(bP);
                    const abs = Math.abs(val);
                    if( show_init ){
                        show_force_max[fix] = abs;
                        show_force_min[fix] = abs;
                    }
                    if( show_force_min[fix] > abs ) {
                        show_force_min[fix] = abs;
                    }
                    if( show_force_max[fix] < abs ) {
                        show_force_max[fix] = abs;
                    }
                    graphColumn.y[4+fix] = val;
                });
            }
            bP.gix = Math.max(0,graphArray.length-1);
        }

        //------------------------------------------
        // //\\ resets graphArray
        //------------------------------------------
        var arrLen = graphArray.length;
        const instantForceMax1 = 1/instantForceMax;
        const displMax1 = NORMALIZE_BY_ULTIM_IN_NON_ADDEN ?
                          1/instantForceMax : 1/displMax;
        const sagittaMax1 = 1/sagittaMax;
        const speedMax1 = 1/speedMax;
        
        //we estimate the sign of force by the sign of the first element
        //of instant force calculated as instant_fQR,
        //if, in the future, this method become inaccurate,
        //this line needs modification,
        const fsignum = Math.sign(qix2orb[0].instant_fQR);

        for( var gix = 0; gix<arrLen; gix++ ){
            const ga = graphArray[ gix ];
            const qix = ga.qix;
            const bP = qix2orb[ qix ];
            bP.gix = gix;
            let instf = bP.instantForce;
            instf = instf * instantForceMax1 * (ADDENDUM ? 1 : Math.sign(instf));
            let fQR = bP.fQR;
            fQR *= displMax1 * ( ADDENDUM ? 1 : Math.sign(fQR) );
            let ds_dt = bP.ds_dt;
            ds_dt *= speedMax1;
            ga.y[0]=instf;
            ga.y[1]=fQR;
            ga.y[2]=ds_dt;
            if( TIME ){
                let sagitta = bP.sagitta;
                sagitta *= sagittaMax1 * ( ADDENDUM ? 1 : Math.sign(sagitta) );
                ga.y[3]=sagitta;
            }
            sconf.SHOW_FORMULAS.forEach( (f,fix) => {
                ga.y[4+fix] /= fsignum * show_force_max[fix];
            });
        }
        ///this is a common graph lines, but this mask can be
        ///overriden in model_upcreate()
        stdMod.graphFW_lemma.graphArrayMask = 
        [ 
            'force',
            'fQR',
        ];
        //------------------------------------------
        // \\// resets graphArray
        //------------------------------------------
    }
}) ();
