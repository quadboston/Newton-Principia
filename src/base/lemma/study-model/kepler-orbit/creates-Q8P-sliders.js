///adds Q and P sliders for
///for dq and body in
///models in propopositions 6-17 in Principia
( function() {
    var { sn, ssD, sData, stdMod, sconf, rg, } = window.b$l.apptree({ 
        stdModExportList : {
            creates_Q8P_sliders, 
            creates_A_slider,
            creates__gets_orbit_closest_point, 
        },});
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    return;


    function creates_Q8P_sliders()
    {
        /// point P slider
        rg.P.acceptPos = newPos => {
            //Ensure solvable and qix exist to help prevent P6 errors when orbits
            //are disconnected
            if (ssD.solvable) {
                const qix = stdMod.gets_orbit_closest_point( newPos, !!'fromGraph' );
                if (qix != null) {
                    rg.P.qix = qix;
                    stdMod.model8media_upcreate();
                    //TEMP
                    console.log("qix P =", qix);
                }
            }
        }

        /// point Q slider
        rg.Q.acceptPos = newPos => {
            //console.log('moving Q');
            const Pqix = rg.P.qix;
            const Qqix = stdMod.gets_orbit_closest_point( newPos );
            if( sconf.TIME_IS_FREE_VARIABLE ){
                const timeQ = qIndexToOrbit[ Qqix ].timeAtQ;
                const timeP = qIndexToOrbit[ Pqix ].timeAtQ;
                let Dt = timeQ - timeP;
                if (sconf.CURVE_REVOLVES) {
                    //For models that "revolve" (eg. circular orbit), "wrap" Dt
                    //around if needed.

                    //If the angle between Q and P is calculated and used
                    //directly, sometimes round-off error can lead to issues.
                    //For example where Dt jumps back and fourth many times
                    //between the minimum and the maximum value.  Therefore use
                    //an angular increment instead (refer to "angleIncrement"
                    //calculation for more).

                    const incrementQ = qIndexToOrbit[Qqix].angleIncrement;
                    const incrementP = qIndexToOrbit[Pqix].angleIncrement;
                    const incrementsBtwQandP = incrementQ - incrementP;

                    //If the angle between Q and P is within half the number of
                    //increments (180 degrees), no wrapping occurs, which means
                    //no adjustments are needed.  Otherwise add or remove the
                    //timeRange to "wrap" the time around.  This is a similar
                    //idea to how angles wrap eg.
                    // 181 is the "same" as,  181 - 360 = -179 degrees
                    //-181 is the "same" as, -181 + 360 =  179 degrees
                    if (incrementsBtwQandP < -ssD.ANGLE_INCREMENTS / 2) {
                        Dt += ssD.timeRange;
                    } else if (incrementsBtwQandP > ssD.ANGLE_INCREMENTS / 2) {
                        Dt -= ssD.timeRange;
                    }
                }
                
                //Clamp as needed
                ssD.Dt = Math.max(Math.min(Dt, sconf.DT_SLIDER_MAX), 0);

            } else {
                if( Qqix === Pqix ) return;
                const q = qIndexToOrbit[ Qqix ].q;
                let Dq = q - qIndexToOrbit[ Pqix ].q;
                if( sconf.CURVE_REVOLVES ){
                    if( Dq<0 ) {
                        ////the point P crossed start of the coninc,
                        ////usually point A and point q(Q) became less than q(P),
                        ////this line adjusts Da by using "cycled a change",
                        ////where q period is sconf.curveQRange,
                        Dq = (Dq + sconf.curveQRange ) % sconf.curveQRange;
                    }
                }
                if( Dq <=0  || Dq >= sconf.DQ_SLIDER_MAX ) return;
                ssD.Dq = Dq;
            }
            //:Dt or Dq changed
            stdMod.builds_force_plusQ_minusQ_and_related();
            stdMod.builds_orbit_data_graph();
            stdMod.model8media_upcreate();
            return; //avoids repetition
        }
    }

    //=====================================================================
    // //\\ point A slider used in P10, P11
    //=====================================================================
    function creates_A_slider() {
        let stashedPos = null;
        let sp = rg.A.pos;
        rg.A.processOwnDownEvent = () => {
            stashedPos = [ sp[0], sp[1] ];
        };

        rg.A.processOwnUpEvent = () => {
            sp[0] = stashedPos[0];
            sp[1] = stashedPos[1];
        };
        rg.A.acceptPos = newPos => {
            // lock Y
            newPos = [ newPos[0], stashedPos[1] ];

            // enforce ellipse equation: solve for a given x,y
            let x = newPos[0];
			if (x < 0) { // don't drag A on the far left
				return;
			}
            let y = newPos[1];
            let b = sconf.ellipseB;

            // compute semi-major axis a from ellipse equation
            let a = Math.sqrt( x*x / (1 - (y*y)/(b*b)) );

			// allow ellipse to be circle, rather than abort at last ellipse
			a = Math.max(a, b);

            //Ensure a always slightly larger than b, to avoid cuckoo P10 graph
            //-Doesn't work well for P11 (eg. line PS and PH can't get close
            // enough to each other, point E "wobbles" when point P dragged)
            if (sconf.sappId === "b1sec2prop10")
			    a = Math.max(a, b + 0.0001);

            sconf.ellipseA = a;
            sconf.ellipseFocus = Math.sqrt(a*a - b*b);
            sconf.eccentricity = sconf.ellipseFocus / a;
            if(sconf.ellipseFocus <= 0) sconf.ellipseFocus = 0.00001; // to avoid cuckoo graph
			rg.A.pos[0] = x;
			rg.A.pos[1] = y;
			if (rg.H && rg.S) {
                rg.S.pos[0] = -sconf.ellipseFocus;
				rg.H.pos[0] = sconf.ellipseFocus;
			}

			stdMod.rebuilds_orbit(); // draws ellipse
			stdMod.model8media_upcreate(); // repositions points
        };
    };
    //=====================================================================
    // \\// point A slider
    //=====================================================================

   function creates__gets_orbit_closest_point() {
       stdMod.gets_orbit_closest_point = gets_orbit_closest_point;
       return;

       function gets_orbit_closest_point(
            r, //distance to this point
            fromGraph //optional, using valid graph points
        ){
            //Search every point in the array to ensure point P dragging isn't
            //choppy (previously only some points were checked).  Note this
            //runs in a fraction of a millisecond even with a large number of
            //points.

            let min = null;
            let qix_min = null;

            //Always use qIndexToOrbit, rather than optionally use graphArray.
            //Sometimes graphArray skips qix values (eg. 0, 5, 10 etc.) and
            //therefore limits what points can be output.
            const qS = fromGraph ? ssD.qix_graph_start : 0;
            const qE = fromGraph ? ssD.qix_graph_end+1 : qIndexToOrbit.length;
            for( let qix=qS; qix<qE; qix++){
                const point = qIndexToOrbit[qix];
                if(!point) continue;
                const pos = point.rr;
                const x = r[0]-pos[0];
                const y = r[1]-pos[1];
                const d2 = x*x + y*y;
                if( qix_min === null || min>d2 ){
                    min = d2;
                    qix_min = qix;
                }
            }
            return qix_min;
        }
   }
}) ();

