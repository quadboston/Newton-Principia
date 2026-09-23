( function() {
    var { sn, nspaste, rg, stdMod, sconf, ssD, sData, }
        = window.b$l.apptree({ stdModExportList : {
            initiates_orbit,
			initiates_orbit8graph,
            rebuilds_orbit,
            initiates_kepler_config,
        },
    });
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    return;


    function initiates_kepler_config() {
        sconf.pointDecoration.r = sconf.handleRadius;
        sconf.ro0SquaredDivide2 = sconf.ro0*sconf.ro0 / 2;
    }

	function initiates_orbit() {
		initiates_orbit8graph(false);
	}

    function initiates_orbit8graph(doGraph = true) {
        initiates_kepler_config();
		if (doGraph) {
			stdMod.graphFW_lemma = createGraph_FW_lemma({
				digramParentDom$:stdMod.legendRoot$ }, stdMod.customXLegend);
		}
        stdMod.creates_createOrUpdateOrbit();
        if (stdMod.calculateMaxGraphValues)
            stdMod.calculateMaxGraphValues();
        stdMod.rebuilds_orbit(); // qIndexToOrbit populated here

        stdMod.creates__gets_orbit_closest_point();

        //:sets parameters of P
        rg.P.qix = Math.floor( sconf.parQ / sconf.delta_q_between_steps );
        var Porb = ssD.qIndexToOrbit[ rg.P.qix ];
        nspaste( rg.P.pos, Porb.rr );

        // //\\ scenario: coincided P and Q: Q splits first
        rg.P.dragPriority = 10;
        rg.Q.dragPriority = 100;
		if ( rg.Qemphasis ) {
			rg.Qemphasis.dragPriority = 100;
		}
        // \\// scenario: coincided P and Q: Q splits first

        stdMod.creates_Q8P_sliders();
        if( rg.S.draggableX || rg.S.draggableY ) {
            stdMod.creates_S_slider();
        }
		if( rg.A && (rg.A.draggableX || rg.A.draggableY) ) {
			stdMod.creates_A_slider();
		}

		function createGraph_FW_lemma({ digramParentDom$ }, customXLegend){
			const graphFW = {};
			stdMod.createsGraphFW_class({
				graphFW,
				digramParentDom$,
				customXLegend,
			});
			return graphFW;
		}
    }

    function rebuilds_orbit(setMaxGraphValues = false) {
        const Q_STEPS = sconf.Q_STEPS;

        if (stdMod.recalculateOrbitStartAndEnd)
            stdMod.recalculateOrbitStartAndEnd();
        sconf.curveQRange = sconf.orbit_q_end - sconf.orbit_q_start;
        sconf.delta_q_between_steps = sconf.curveQRange / Q_STEPS;

        stdMod.recreates_q2xy();
        stdMod.buildsOrbit();
        stdMod.createOrUpdateOrbit();
        const timeS = qIndexToOrbit[0].timeAtQ;
        const timeE = qIndexToOrbit[Q_STEPS].timeAtQ;
        //The following is needed for some models when q is the free variable
        ssD.timeRange = timeE - timeS;

        //TEMP
        console.log("**********");
        console.log("ssD.timeRange =", ssD.timeRange);
        const A = sconf.ellipseA;
        console.log("A^3 / ssD.timeRange^2 =", A**3 / ssD.timeRange**2);

        stdMod.calculateDqSubstituteActualForce();

        const prevDq = ssD.Dq;
        const prevDt = ssD.Dt;
        ssD.Dq = prevDq !== undefined ? prevDq : sconf.Dq0;
        ssD.Dt = prevDt !== undefined ? prevDt : sconf.Dt0;
        stdMod.builds_force_plusQ_minusQ_and_related(sData.ULTIM_MAX);
        stdMod.builds_force_plusQ_minusQ_and_related(sData.ULTIM_ACTUAL);
        stdMod.builds_force_plusQ_minusQ_and_related();
        stdMod.builds_orbit_data_graph(setMaxGraphValues);

        //Adjust point P if out of bounds
        const qixMin = ssD.qix_graph_start;
        const qixMax = ssD.qix_graph_end;
        rg.P.qix = Math.max(qixMin, Math.min(qixMax, rg.P.qix));


        //TEMP
        // calculateTimeAndVy0Temp(1);
    }



    //TEMP
    // function calculateTimeAndVy0Temp(forceScaleTemp) {
    //     console.log("********calculateTimeAndVy0Temp");
    //     console.log("********forceScaleTemp =", forceScaleTemp);
    //     //TEMP
    //     var sunXY = rg.S.pos;

    //     const point0 = ssD.qIndexToOrbit[0];
    //     const point1 = ssD.qIndexToOrbit[1];
    //     // // console.log("ssD.qIndexToOrbit[0] =", point0);
    //     // // console.log("ssD.qIndexToOrbit[1] =", point1);
    //     // console.log("ssD.qIndexToOrbit[1].timeAtQ =", point1.timeAtQ);


    //     const planetXY0 = point0.planetXY;
    //     const planetXY1 = point1.planetXY;

    //     const point0SP = [planetXY0[0]- sunXY[0], planetXY0[1]- sunXY[1]];
    //     const magnitude0 = Math.sqrt(point0SP[0]**2 + point0SP[1]**2);
    //     const nSP0 = [point0SP[0] / magnitude0, point0SP[1] / magnitude0];

    //     const point1SP = [planetXY1[0]- sunXY[0], planetXY1[1]- sunXY[1]];
    //     const magnitude1 = Math.sqrt(point1SP[0]**2 + point1SP[1]**2);
    //     const nSP1 = [point1SP[0] / magnitude1, point1SP[1] / magnitude1];


    //     // const actualForce0 = -1 / magnitude0 ** 2 * 100;
    //     // const actualForce1 = -1 / magnitude1 ** 2 * 100;
    //     const actualForce0 = point0.actualForce;
    //     const actualForce1 = point1.actualForce


    //     const x0 = planetXY0[0];
    //     const x1 = planetXY1[0];
    //     //F = m*a => F / m = a.  For a unit mass 1, f = a
    //     const ax0 = actualForce0 * nSP0[0] * forceScaleTemp;
    //     const ax1 = actualForce1 * nSP1[0] * forceScaleTemp;
    //     // const ax0 = point0.actualForce * nSP0[0] * forceScaleTemp;
    //     // const ax1 = point1.actualForce * nSP1[0] * forceScaleTemp;
    //     const t1 = Math.sqrt(6 * (x1 - x0) / (ax1 + 2 * ax0));


    //     const y0 = planetXY0[1];
    //     const y1 = planetXY1[1];

    //     const ay0 = actualForce0 * nSP0[1] * forceScaleTemp;
    //     const ay1 = actualForce1 * nSP1[1] * forceScaleTemp;
    //     // const ay0 = point0.actualForce * nSP0[1] * forceScaleTemp;
    //     // const ay1 = point1.actualForce * nSP1[1] * forceScaleTemp;
    //     const vy0 = (y1 - y0) / t1 - 1/6 * (ay1 + 2 * ay0) * (t1);

    //     // console.log("values =", {
    //     //     x0, x1, ax0, ax1, y0, y1, ay0, ay1, nSP0, nSP1
    //     // });
    //     console.log("t1 =", t1);
    //     console.log("*vy0 =", vy0);
    //     console.log("point0.vv[1] / vy0 =", point0.vv[1] / vy0);

    //     const delta_q = point1.q - point0.q;
    //     console.log("***delta_q =", delta_q);
    //     console.log("***dq / dt =", delta_q / t1);



    //     const base = point0SP[0];
    //     const height = y1 - y0;
    //     const areaSection = base * height / 2;

    //     let A = sconf.ellipseA;
    //     let B = sconf.ellipseB;
    //     const areaEllipse = Math.PI * A * B;

    //     const areaValues = {
    //         base,
    //         height,
    //         areaSection,
    //         A,
    //         B,
    //         areaEllipse,
    //         areaEllipseDivideAreaSection: areaEllipse / areaSection,
    //         T: t1 * areaEllipse / areaSection,
    //     };
    //     console.log("*compare T =", areaValues.T);
    //     const errorT = Math.abs(1 - Math.abs(ssD.timeRange / areaValues.T));
    //     console.log("*compare T errorT =", errorT);
    //     if (errorT < 1e-5) {
    //         console.log("*compare T values same");
    //     } else {
    //         console.error("*compare T values different");
    //     }
    //     console.log("areaValues =", areaValues);
    //     console.log("A^3 / T^2 =", A**3 / areaValues.T**2);
    // }
}) ();
