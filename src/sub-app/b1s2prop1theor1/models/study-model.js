( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var sn          = ns.sn;
    var bezier      = sn('bezier');
    var mat         = sn('mat');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var sapp        = sn('sapp');
    var studyMods   = sn('studyMods', sapp);

    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    ssF.pointB_2_time0 = pointB_2_time0;
    return;




    function setModule()
    {
        //ssF.calculateCurvedArea = calculateCurvedArea;
        //ssF.x0y_2_t             = x0y_2_t;
        //ssF.const2positions     = const2positions;
        ssF.init_model            = init_model;
        sn(SUB_MODEL, studyMods ).update0create_model8media = update0create_model8media;
        sn(SUB_MODEL, studyMods ).upcreate = update0create_model8media;
    }




    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model()
    {
        //:primary params
        tp( 'force', sconf.force );
        tp( 'spatialStepsMax', sconf.spatialStepsMax0 );

        tp( 'S', [ 0, 0 ] );
        //path and speeds have master-index, pi, offset pi=0
        tp( 'path', [] )[0] = sconf.A;

        //:auxiliary params
        tp( 'freePath', [] );

        //freeTriangles have master-index, pi, offset ... see media-model
        //tp( 'freeTriangles', [] );

        //keplerTriangles have master-index, pi, offset ... see media-model
        tp( 'keplerTriangles', [] );

        //forces have master-index, pi, offset  ... see media-model
        tr( 'forces', 'vectors', [] );

        //sets namespace for slider and initial time value
        tr( 'time','t', 1.75000001 ); //1.75000001 for first nice value in slider
        tp( 'speeds', [] )[0] = sconf.v0;

        //sets point B
        tr( 'B','pos', to_sconf.B ); //there will be a lot of parameters
                                     //added to this object
        var v0 = sconf.v0;
        var vabs0 = Math.sqrt( v0[0]*v0[0] + v0[1]*v0[1] );
        tr( 'vabs0', 'vabs0', vabs0 );
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================


    ///estimates time and speed direction in the first step and
    ///resets speeds, timeStep, and number of steps;
    function pointB_2_time0( newPos )
    {
        if( !newPos ) {
            newPos = rg.B.pos;
        }
        var path0 = [ newPos[0] - rg.path.pos[0][0],  newPos[1] - rg.path.pos[0][1], ];
        var r = Math.sqrt( path0[0]*path0[0] + path0[1]*path0[1] );
        //ccc( 'new r='+r + ' fconf.s0max=' + sconf.s0max + ' rg.B.pos', rg.B.pos );
        if( r >= sconf.s0max ) {
            var wwstr = "first path cannot be greater than " + sconf.s0max;
            //ccc( wwstr );
            return wwstr;
        }
        var vabs0 = rg.vabs0.vabs0;
        var time0 = r/vabs0;
        //time0 can become big at this moment

        var newv0 = [ path0[0]/r*vabs0, path0[1]/r*vabs0, ];
        // abs value of v0 is the same

        var newCount = Math.floor( sconf.spatialStepsMax0 / time0 );
        // newCount can become small
        //ccc( 'newCount=' + newCount );

        if( newCount < 3 ) {
            //ccc('incorrect set for B' );
            return 'incorrect set for B';
        }
        tp( 'speeds', [] )[0] = newv0;
        tr( 'timeStep', 't', time0 );
        tp( 'spatialStepsMax', newCount );
        //ccc('OKorrect: time0=' + time0 + ' newCount=' + newCount );
    }



    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function update0create_model8media()
    {
        //todo must not be here ... all must be already checked
        if( pointB_2_time0() ) return; 

        //:study-pars
        var spatialStepsMax = rg.spatialStepsMax.pos;
        var S               = rg.S.pos;
        var B               = rg.B.pos;
        var force           = rg.force.pos;
        var path            = rg.path.pos;
        var forces          = rg.forces.vectors;
        var freePath        = rg.freePath.pos;
        var speeds          = rg.speeds.pos;


        //:fixes lenghts to synch with new spatialStepsMax
        path.length         = Math.min( path.length, spatialStepsMax );
        forces.length       = Math.min( forces.length, spatialStepsMax-1 );
        speeds.length       = Math.min( speeds.length, spatialStepsMax-1 );
        freePath.length     = Math.min( freePath.length, spatialStepsMax-2 );
        if( rg.time.t > spatialStepsMax - 1.01 ) {
            rg.time.t = spatialStepsMax - 1.01;
            ccc( 'rg.time.t corrected to not exceeed steps max=' + rg.time.t );
        }

        //=========================================
        // //\\ calculates body's motion
        //      calcuates basic values, from which
        //      decorational values will be derived
        //      later;
        //      time here starts with 0 and
        //      has nothing to do with
        //      time rg.time.... set for lemma;
        //=========================================
        (function() {
            //sconf.timeMax,
            var path = rg.path.pos;
            var timeStep = rg.timeStep.t;
            for( pi = 1; pi<spatialStepsMax; pi++ ) {

                //takes speed from previous step
                var speed = speeds[pi-1];
                var formerSpeed = pi > 1 ? speeds[pi-2] : speed;

                //speed does advance the path increment
                var step =
                [
                    speed[0]*timeStep, 
                    speed[1]*timeStep,
                ];

                //path increment is added to path
                path[pi] =
                [
                    path[pi-1][0]+step[0],
                    path[pi-1][1]+step[1],
                ];
                //freePath would be a "short segment"
                //of movement with using previous speed which
                //do not have contribution of a current force
                //(but have contributions of forces before current
                //force is applied)
                if( pi > 1 ) {
                    var freeSpeed = formerSpeed;
                    freePath[pi-2] =
                    [
                        path[pi-1][0]+freeSpeed[0]*timeStep,
                        path[pi-1][1]+freeSpeed[1]*timeStep,
                    ];
                }

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
                var fx = force[0][1]/r2*rux
                    *timeStep; //applies impuls of force, not force
                var fy = force[0][1]/r2*ruy
                    *timeStep; //applies impuls of force, not force
                forces[pi-1] = [fx,fy];

                //force gives impulse to speed
                speeds[pi] =
                [
                    speed[0]+fx,
                    speed[1]+fy,
                ];
            }
            //ccc( freePath );
            //ccc( path );
        })();
        //==============================
        // \\// calculates body's motion
        //==============================



        //-------------------------------------------------------
        // //\\ media part
        //-------------------------------------------------------
        sn(SUB_MODEL, studyMods ).createMedia0updateMedia_I();
        //ssF.upcreate_mainLegend(); //placed into "slider"
        //-------------------------------------------------------
        // \\// media part
        //-------------------------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================

}) ();

