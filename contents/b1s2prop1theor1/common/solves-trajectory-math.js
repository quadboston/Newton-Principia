( function() {
    var {
        mat,
        sconf, sDomF, ssF,
        amode, studyMods,
    } = window.b$l.apptree({
        ssFExportList :
        {
            solvesTrajectoryMath,
        },
    });
    return;













    ///=================================================================
    ///
    /// Calculation of path has two distinct models. There are two paths
    /// and two paths calculations.
    ///    On path is with pure centripetal force.
    ///    Other path is for significant tangential force which
    ///    is labeled with postfix "aracc".
    ///
    ///=================================================================
    function solvesTrajectoryMath( stdMod )
    {
        stdMod      = stdMod || studyMods[ amode.submodel ];
        var toreg   = stdMod.toreg;
        var rg      = stdMod.rg;

        //:study-pars
        var sSteps          = rg.spatialSteps = Math.floor(sconf.timeRange
                              / rg.rgslid_dt.val);
        var S               = rg.S.pos;
        var B               = rg.B.pos;
        var force           = rg.force;
        var path            = rg.path.pos;
        var pathAracc       = rg.pathAracc.pos;
        var impulses          = rg.impulses.vectors;
        var impulsesAracc     = rg.impulsesAracc.vectors;
        var freePath        = rg.freePath.pos;
        var freePathAracc   = rg.freePathAracc.pos;
        var speeds          = rg.speeds.pos;
        var speedsAracc     = rg.speedsAracc.pos;

        //:fixes lenghts to synch with new sSteps
        path.length         = Math.min( path.length, sSteps );
        impulses.length       = Math.min( impulses.length, sSteps-1 );
        impulsesAracc.length  = Math.min( impulsesAracc.length, sSteps-1 );
        speeds.length       = Math.min( speeds.length, sSteps-1 );
        speedsAracc.length  = Math.min( speedsAracc.length, sSteps-1 );
        freePath.length     = Math.min( freePath.length, sSteps-2 );
        freePathAracc.length= Math.min( freePathAracc.length, sSteps-2 );

        //***********************************************
        // //\\ calculates body's trajectory
        //      calcuates basic values, from which
        //      decorational values will be derived
        //      later;
        //      time here starts with 0 and
        //      has nothing to do with
        //      time rg.slider_sltime.... set for lemma;
        //***********************************************
        {
            var path = rg.path.pos;
            var timeStep = rg.rgslid_dt.val;
            //pi = path index, we start here from poinit B:
            for( pi = 1; pi<sSteps; pi++ ) {
                //====================================================
                // //\\ recalls current and former speed placeholders
                //====================================================
                //takes speed from previous step
                var speed = speeds[pi-1]; //=== speed at A
                var speedAracc = speedsAracc[ pi-1 ]; //=== speed at A
                var formerSpeed = pi > 1 ? speeds[pi-2] : speed;
                //var formerSpeedAracc = pi > 1 ? speedsAracc[pi-2] : speedAracc;
                //====================================================
                // \\// recalls current and former speed placeholders
                //====================================================


                //====================================
                // //\\ speeds do change positions
                //====================================
                //speed contributes to the path increment
                var step =
                [
                    speed[0]*timeStep,
                    speed[1]*timeStep,
                ];
                var stepAracc =
                [
                    speedAracc[0]*timeStep,
                    speedAracc[1]*timeStep,
                ];
                //path increment is added to path
                path[pi] =
                [
                    path[pi-1][0]+step[0], //=== path at A + step === path at B
                    path[pi-1][1]+step[1],
                ];
                ////recall pi = 0 maps to A, pi = 1 to B,
                pathAracc[pi] =
                [
                    pathAracc[pi-1][0]+stepAracc[0], //=== path at A + step === path at B
                    pathAracc[pi-1][1]+stepAracc[1],
                ];

                //freePath would be a "short segment"
                //of movement with using previous speed which
                //do not have contribution of a current force
                //(but have contributions of forces before current
                //force is applied)
                if( pi > 1 ) {
                    ////"path > B" === C, or, D, or ...
                    var freeSpeed = formerSpeed;
                    freePath[pi-2] =
                    [
                        path[pi-1][0]+freeSpeed[0]*timeStep,
                        path[pi-1][1]+freeSpeed[1]*timeStep,
                    ];
                }
                //====================================
                // \\// speeds do change positions
                //====================================


                //====================================
                // //\\ calculates forces
                //====================================
                //calculates vectors to center S
                var x = path[pi][0];
                var y = path[pi][1];
                var rx = S[0] - x;
                var ry = S[1] - y;
                var r2 = rx*rx + ry*ry;
                var r = Math.sqrt( r2 );
                var rux = rx/r;
                var ruy = ry/r;
                //calculate vector to center S

                //applies force law
                var forceByDistance = Math.exp( force.lawPower * Math.log( r ) );
                var forceAbs = force.lawConstant * forceByDistance;

                 //speed impuls of force over double-time-step
                var fx = forceAbs * rux
                    * timeStep*2;
                var fy = forceAbs * ruy
                    * timeStep*2;
                impulses[pi-1] = [fx,fy];

                {
                    //now, makes force impulsesAracc[ pi-1 ] normal to original force
                    let orts = mat.vector2normalOrts( impulses[pi-1] );
                    let df = -forceAbs * //pure forses timeStep *
                             rg.forceAracc.tangentialForcePerCentripetal_fraction;
                    var fAracc = [ df * orts.norm[ 0 ], df * orts.norm[ 1 ] ];
                    impulsesAracc[ pi-1 ] = fAracc; //impulses
                }
                //====================================
                // \\// calculates forces
                //====================================


                //====================================
                // //\\ forces do change velocities
                //====================================
                //force gives impulse to speed
                speeds[pi] =
                [
                    speed[0]+fx,
                    speed[1]+fy,
                ];
                ///speeds with tangential acc. contribution
                speedsAracc[pi] =
                [
                    speedAracc[0]+(fx + fAracc[ 0 ])*timeStep,
                    speedAracc[1]+(fy + fAracc[ 1 ])*timeStep,
                ];
                //====================================
                // \\// forces do change velocities
                //====================================
            }
        }
        //***********************************************
        // \\// calculates body's trajectory
        //***********************************************

    }

}) ();

