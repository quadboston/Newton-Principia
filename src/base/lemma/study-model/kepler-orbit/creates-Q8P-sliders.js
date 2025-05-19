///adds Q and P sliders for
///for dq and body in
///models in propopositions 6-17 in Principia
( function() {
    var {
        sn, mat, userOptions, hafa,
        fconf, sData, ssD,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_Q8P_sliders,
            creates_S_slider,
            creates__gets_orbit_closest_point,
        },
    });
    const tix2orbit = sn( 'tix2orbit', ssD, [] );
    const qix2orb = sn( 'qix2orb', ssD, [] );
    const graphArray = sn( 'graphArray', stdMod, [] );
    return;


    function creates_Q8P_sliders()
    {
        /// point P slider
        rg.P.acceptPos = newPos => {
            rg.P.qix = stdMod.gets_orbit_closest_point( newPos, !!'fromGraph' );
            stdMod.model8media_upcreate();
        }

        /// point Q slider
        rg.Q.acceptPos = newPos => {
            var Qqix = stdMod.gets_orbit_closest_point( newPos );
            if( Qqix === rg.P.qix ) return;
            if( sconf.TIME_IS_FREE_VARIABLE ){
                let tt = qix2orb[ Qqix ].timeAtQ;
                let Dt = tt - qix2orb[ rg.P.qix ].timeAtQ;
                if( Dt < 0.00001 || sconf.DT_SLIDER_MAX <= Dt ) return;
                ssD.Dt = Dt;
            } else {
                const q = qix2orb[ Qqix ].q;
                let Dq = q - qix2orb[ rg.P.qix ].q;
                if( Dq <=0  || Dq >= sconf.DQ_SLIDER_MAX ) return;
                ssD.Dq = Dq;
            }
            //recalculates dQ attached to orbit points,
            //todm for now, does redundant job of rebuilding grids
            stdMod.builds_dq8sagitta8deviation();
            stdMod.builds_orbit_data_graph( sconf.force_law );
            stdMod.model8media_upcreate();
        }
        //=====================================================================
        // \\// point Q slider
        //=========================================================================
   }

   function creates_S_slider(){
        //=====================================================================
        // //\\ point S slider
        //=====================================================================
        {
            let stashedPos = null;
            let sp = rg.S.pos;
            rg.S.processOwnDownEvent = () => {
                stashedPos = [ sp[0], sp[1] ];
            };

            rg.S.processOwnUpEvent = () => {
                sp[0] = stashedPos[0];
                sp[1] = stashedPos[1];
            };
            rg.S.acceptPos = newPos => {
                if( mat.p1_to_p2( newPos, sconf.diagramOrigin ).abs > -1 ) {
                    if( userOptions.showingBonusFeatures() ) {
                        stashedPos[0] = newPos[0];
                        stashedPos[1] = newPos[1];
                    } else {
                        if( newPos[0] > -0.00001 || newPos[0] < -1.2 ) {
                            return false;
                        }
                        stashedPos[0] = newPos[0];
                        newPos[1] = stashedPos[1];
                        sconf.ellipseFocus = -stashedPos[0];
                        rg.H.pos[0] = sconf.ellipseFocus;
                        let ellA2 = sconf.ellipseFocus*sconf.ellipseFocus +
                                    sconf.ellipseB*sconf.ellipseB;
                        sconf.ellipseA = Math.sqrt( ellA2 );
                        let lambda2 = sconf.ellipseB/sconf.ellipseA;
                        lambda2 *= lambda2;
                        sconf.eccentricity = Math.sqrt( 1 - lambda2 );
                        stdMod.recreates_q2xy();
                        //resets ellpse parameters
                        hafa( stdMod, 'recreatesPosCorrector' )();
                    }
                }
                hafa( stdMod, 'correctsPos8angle2angle' )(
                    'P', null,
                    //reuses former q,
                    //this moves point P, but in the nice manner
                    ssD.qix2orb[ rg.P.qix ].q
                );
                rg.S.pos[0] = newPos[0];
                rg.S.pos[1] = newPos[1];
                stdMod.buildsOrbit(); //and its relation to S
                stdMod.builds_dq8sagitta8deviation();
                stdMod.builds_orbit_data_graph( sconf.force_law );
                stdMod.model8media_upcreate();
            }
        }
        //=====================================================================
        // \\// point S slider
        //=====================================================================
    }


   function creates__gets_orbit_closest_point() {
       //the more, the better: slider accuracy:
       const SEARCH_POINTS = 50;
       //:alternative orbit arrays to be used:
       const q2o = qix2orb;
       const ga = graphArray;
       
       stdMod.gets_orbit_closest_point = gets_orbit_closest_point;
       return;

       
       function gets_orbit_closest_point(
            r, //distance to this point
            fromGraph //optional, using valid graph points
        ){
            const arr = fromGraph ? ga : q2o;
            const len = arr.length;
            const STEP = Math.max( 1, Math.floor( len / SEARCH_POINTS ));
            const point = arr[0];
            const pos = point.rr;
            const x = r[0]-pos[0];
            const y = r[1]-pos[1];
            let min = x*x + y*y;
            let qix_min = 0;
            for( let qix=STEP; qix<len; qix+=STEP ){
                const point = arr[qix];
                const pos = point.rr;
                const x = r[0]-pos[0];
                const y = r[1]-pos[1];
                const d2 = x*x + y*y;
                if( min>d2 ){
                    min = d2;
                    qix_min = fromGraph ? point.qix : qix;
                }
            }

            const FINE_SEARCH_POINTS = 20;
            const fstart = qix_min-FINE_SEARCH_POINTS;
            const fend = qix_min+FINE_SEARCH_POINTS;
            ///refining the search
            for( let qix=fstart; qix<=fend; qix++ ){
                const point = q2o[qix];
                if( !point || (fromGraph && point.plusQ === null) ) continue;
                const pos = point.rr;
                const x = r[0]-pos[0];
                const y = r[1]-pos[1];
                const d2 = x*x + y*y;
                if( min>d2 ){
                    min = d2;
                    qix_min = qix;
                }
            }
            return qix_min;
        }
   }
}) ();

