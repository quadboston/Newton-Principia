///adds Q and P sliders for
///for dq and body in
///models in propopositions 6-17 in Principia
( function() {
    var {
        sn, mat,
        fconf, sData, ssD,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_Q8P_sliders,
        },
    });
    return;


    function creates_Q8P_sliders()
    {
        //=====================================================================
        // //\\ point P slider
        //=====================================================================
        rg.P.acceptPos = newPos => {
            let newP = stdMod.q8pos_2_q8pos8qix( 'P', newPos );
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            var q =  stdMod.pos2q( newPos );
            if( q < sconf.orbit_q_start + 0.01 || q+rg.P.sagittaDq > sconf.orbit_q_end ){
                //cycling: removed:
                //rg.P.parQ = ( rg.P.parQ + sconf.orbit_q_end ) % sconf.orbit_q_end;
                return false; //stops dragging beyond curve tips
            }
            stdMod.q8pos_2_q8pos8qix( 'P', null, q );                         
            newPos[0] = rg.P.pos[0];
            newPos[1] = rg.P.pos[1];
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            return true;
        }
        //=====================================================================
        // \\// point P slider
        //=====================================================================



        //=====================================================================
        // //\\ point Q slider
        //      for delta t
        //=====================================================================
        rg.Q.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            sData.Qpos0 = rg.Q.pos[0];
            sData.Qpos1 = rg.Q.pos[1];
        };

        rg.Q.acceptPos = ( newPos, dragMove ) => {
            var newPos0 = dragMove[0] + sData.Qpos0;
            var newPos1 = -dragMove[1] + sData.Qpos1;

            let q = stdMod.pos2q( [newPos0,newPos1] );
            if( q < sconf.orbit_q_start + 0.0001){
                q = sconf.orbit_q_start + 0.0001;
            } else if( q > sconf.orbit_q_end ){
                sconf.orbit_q_end
                //would be a revolving:
                //angle = ( angle + sconf.orbit_q_end ) % sconf.orbit_q_end;
            }
            if( q > rg.P.parQ + sconf.DQ_SLIDER_MAX ){
                q = rg.P.parQ + sconf.DQ_SLIDER_MAX;
            }
            let Qqix = Math.max( 0, Math.floor( (q - sconf.orbit_q_start)/sconf.deltaQ ) );
            let PQix = rg.P.qix;
            if( Qqix <= PQix ) {
                ////making float sagitta
                ////to close, we will set dt independently
                var dt = (q - rg.P.parQ)/ssD.qix2orb[ PQix ].dq_dt;
            } else {
                ////making sagitta aligned with orbit grid
                //rg.Q.qix = Qqix;
                let tP = ssD.qix2orb[ rg.P.qix ].timeAtQ;
                let tQ = ssD.qix2orb[ Qqix ].timeAtQ;
                var dt = tQ - tP;
            }
            dt = Math.max( sconf.DT_SLIDER_MIN, dt );
            ssD.saggitaDt = dt;

            //recalculates dQ attached to orbit points,
            //todm for now, does redundant job of rebuilding grids
            stdMod.builds_dq8sagitta();
            stdMod.builds_orbit_data_graph( sconf.force_law );

            //lets validators to do the job
            stdMod.model8media_upcreate();
            //"return false skips d8d engine"
        }
        //=====================================================================
        // \\// point Q slider
        //=========================================================================
   }


}) ();

