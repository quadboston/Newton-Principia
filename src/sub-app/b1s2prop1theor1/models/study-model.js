( function() {
    var {
        ns, sn,
        sconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,

        //for lemma-scope-load-modules only
        tr, tp,

    } = window.b$l.app({
        modName : 'l7-study-model',
        stdModExportList :
        {
            init_model_parameters,
            model8media_upcreate,
            model_upcreate,
            amode2lemma,
        },
    });
    return;










    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        toreg = ssF.toreg;

        //:primary params
        //toreg( 'force' )( 'pos', sconf.force );
        toreg( 'force' )
            ( 'lawPower', sconf.force[0][0] ) //-2
            ( 'lawConstant', sconf.force[0][1] )
            ;
        tp( 'spatialStepsMax', sconf.spatialStepsMax0 );

        tp( 'S', [ 0, 0 ] );
        //path and speeds have master-index, pi, offset pi=0
        //tp( 'path', [] )[0] = sconf.A;
        toreg( 'path' )( 'pos', [ sconf.A ] );

        //===================================================
        //interface for B
        //===================================================
        sDomF.modelPointDragger({
            pname : 'B',
            acceptPos : B2params,
            orientation : 'rotate',
        });

        //===================================================
        //interface for V (for force)
        //===================================================
        sDomF.modelPointDragger({
            pname : 'V',
            acceptPos : V2forceParams,
        });


        ///===================================================
        ///interface for A (for distance to S)
        ///still needs:
        ///      media-model.js::pos2pointy( ... 'A', //vital
        ///      media-model-draw-evol.js::if( ... && pname !== 'A'  ) {
        ///                              :: [ 'V', 'B', 'A' ].forEach( pname => {
        ///                                 ... fakeName = pname+'-white-filler'; 
        ///===================================================
        ///remember medpos still has to be created and updated,
        ///this does not create medpos:
        sDomF.modelPointDragger({
            pname : 'A',
            acceptPos : A2distanceToS,
        });

        //:auxiliary params
        tp( 'freePath', [] );

        //freeTriangles have master-index, pi, offset ... see media-model
        //tp( 'freeTriangles', [] );

        //keplerTriangles have master-index, pi, offset ... see media-model
        tp( 'keplerTriangles', [] );

        //forces have master-index, pi, offset  ... see media-model
        tr( 'forces', 'vectors', [] );

        //sets namespace for slider and initial time value
        tr( 'slider_sltime','t', 1.75000001 ); //1.75000001 for first nice value in slider
        tp( 'speeds', [] )[0] = sconf.v0;

        var v0 = sconf.v0;
        var vabs0 = Math.sqrt( v0[0]*v0[0] + v0[1]*v0[1] );
        tr( 'vabs0', 'vabs0', vabs0 );
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================



    ///=============================================================
    /// renews initial path parameters from point B
    ///     estimates time and speed direction in the first step and
    ///     resets speeds, timeStep, and number of steps;
    ///=============================================================
    function B2params( newPos )
    {
        var path0 = [ newPos[0] - rg.path.pos[0][0],  newPos[1] - rg.path.pos[0][1], ];
        var s0 = Math.sqrt( path0[0]*path0[0] + path0[1]*path0[1] );
        //ccc( 'new s0='+s0 + ' fconf.s0max=' + sconf.s0max + ' rg.B.pos', rg.B.pos );
        if( s0 >= sconf.s0max ) {
            //ccc( "first path cannot be greater than " + sconf.s0max );
            return;
        }
        var vabs0 = rg.vabs0.vabs0;

        //gets time elapsed to travel new path AB:
        //time0 can become big at this moment
        var time0 = s0 / vabs0;

        // gets new speed (directions), but speed abs value does not change
        var newv0 = [ path0[0] / s0 * vabs0, path0[1] / s0 * vabs0, ];

        //gets primitive-moves limit from original limit and new dt = time0
        var newCount = Math.floor( sconf.spatialStepsMax0 / time0 );

        if( newCount < 3 ) {
            ////ignores paths with too small number of moves
            return;
        }
        tp( 'speeds', [] )[0] = newv0;
        tr( 'timeStep', 't', time0 );
        tp( 'spatialStepsMax', newCount );
        //ccc('OKorrect: time0=' + time0 + ' newCount=' + newCount );

        return true;
    }


    ///=============================================================
    ///when dragging point V, converts V pos change to force-law constant change,
    ///returns true which means newPos is allowed,
    ///=============================================================
    function V2forceParams( newPos )
    {
        var tstep               = rg.timeStep.t;
        var tstep2              = tstep * tstep;
        var posB                = rg.B.pos;
        var posS                = rg.S.pos;
        var displX              = (newPos[0] - posB[0]); //displacement x = from Bx to Vx
        var displY              = (newPos[1] - posB[1]);
        var disp                = Math.sqrt( displX*displX + displY*displY );
        var bvNorm              = [ displX/disp, displY/disp ];
        var newForce            = disp/tstep2; // dr = f*DT*DT

        var distanceX           = posB[0] - posS[0];    
        var distanceY           = posB[1] - posS[1];    
        var dis2                = distanceX*distanceX + distanceY*distanceY;
        var dis                 = Math.sqrt( dis2 ); //abs val from S to B
        if( dis < 1e-20 ) return false; //B is too close to S, forbid this configuration

        var bsNorm              = [ -distanceX/dis, -distanceY/dis ];
        var forceSpatialFactor  = Math.exp( rg.force.lawPower * Math.log( dis ) );

        rg.force.lawConstant    = newForce/forceSpatialFactor;

        //negative fDirection makes force repelling
        var fDirection          = bvNorm[0]*bsNorm[0] + bvNorm[1]*bsNorm[1];
        rg.force.lawConstant   *= fDirection;
        return true;
    }

    ///==============================================================
    /// when dragging, changes initial distance: distance from A to S
    ///==============================================================
    function A2distanceToS( newPos )
    {
        var posS                = rg.S.pos;
        var displX              = newPos[0] - posS[0]; //displacement x = from Ax to SVx
        var displY              = newPos[1] - posS[1];
        var disp2               = displX*displX + displY*displY;
        if( disp2 < 1e-40 ) return false; //A is too close to S, forbid this configuration
        
        var posB                = rg.B.pos;
        posB[0]                 += newPos[0] - rg.A.pos[0];
        posB[1]                 += newPos[1] - rg.A.pos[1];
        return true;
    }


    //=================================================
    // estableishes amode and astate
    //=================================================
    function amode2lemma( towhich )
    {
        var theorion = amode.theorion;
        var aspect   = amode.aspect;
        var submodel = amode.submodel;
        //sDomF.detected_user_interaction_effect( 'doUndetected' );
        //if( theorion === 'claim' && aspect !== 'model' ) {
        var captured = null;
        if( !ssF.mediaModelInitialized ) {
            var captured = "initial-state";
        }
        stdMod[ 'astate_2_' + towhich ]( ssD.capture[ captured ] );
    }



    //****************************************************
    // //\\ updates model and figure (and creates if none)
    //****************************************************
    function model8media_upcreate()
    {
        model_upcreate();
        stdMod.media_upcreate();
    }
    //****************************************************
    // \\// updates model and figure (and creates if none)
    //****************************************************





    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model_upcreate()
    {
        if( !ns.haz( ssF, 'mediaModelInitialized' ) ) {
            ////first time and only once spawns B into other parameters
            B2params( rg.B.pos )
        }

        //:study-pars
        var spatialStepsMax = rg.spatialStepsMax.pos;
        var S               = rg.S.pos;
        var B               = rg.B.pos;
        var force           = rg.force;
        var path            = rg.path.pos;
        var forces          = rg.forces.vectors;
        var freePath        = rg.freePath.pos;
        var speeds          = rg.speeds.pos;


        //:fixes lenghts to synch with new spatialStepsMax
        path.length         = Math.min( path.length, spatialStepsMax );
        forces.length       = Math.min( forces.length, spatialStepsMax-1 );
        speeds.length       = Math.min( speeds.length, spatialStepsMax-1 );
        freePath.length     = Math.min( freePath.length, spatialStepsMax-2 );
        if( rg.slider_sltime.t > spatialStepsMax - 1.01 ) {
            rg.slider_sltime.t = spatialStepsMax - 1.011;
            //todo ... why we need this warning
            //ccc( 'rg.slider_sltime.t corrected to not exceeed steps max=' +
            //     rg.slider_sltime.t );
        }

        //=========================================
        // //\\ calculates body's motion
        //      calcuates basic values, from which
        //      decorational values will be derived
        //      later;
        //      time here starts with 0 and
        //      has nothing to do with
        //      time rg.slider_sltime.... set for lemma;
        //=========================================
        (function() {
            //sconf.timeMax,
            var path = rg.path.pos;
            var timeStep = rg.timeStep.t;
            //pi = path index
            for( pi = 1; pi<spatialStepsMax; pi++ ) {

                //takes speed from previous step
                var speed = speeds[pi-1]; //=== speed at A
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
                    path[pi-1][0]+step[0], //=== path at A + step === path at B
                    path[pi-1][1]+step[1],
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

                var fx = forceAbs * rux
                    *timeStep; //applies impuls of force, not force
                var fy = forceAbs * ruy
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
    }


}) ();

