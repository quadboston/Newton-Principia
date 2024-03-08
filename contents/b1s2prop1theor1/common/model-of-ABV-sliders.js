( function() {
    var {
        mat,
        sconf, sDomF, ssF,
        amode, studyMods,
    } = window.b$l.apptree({
        ssFExportList :
        {
            doesSchedule_A_B_V_sliders_in_init_pars,
            ABVpos_2_trajectory,
        },
    });
    return;










    ///executes one time
    function doesSchedule_A_B_V_sliders_in_init_pars( stdMod )
    {
        var toreg = stdMod.toreg;
        var rg = stdMod.rg;

        //**************************************************************************
        //initially does job which sliders do at run-time
        toreg( 'slider_sltime' )( 'psteps', 1.75000001 ); //1.75000001 for first nice value in slider
        toreg( 'speeds' )( 'pos', [ sconf.v0 ] );
        toreg( 'speedsAracc' )( 'pos', [ sconf.v0 ] );
        toreg( 'rgslid_dt' )( 'val', sconf.initialTimieStep ); //patch todo
        toreg( 'spatialStepsMax' )( 'pos', 7 ); //patch todo
        toreg( '' )( 'psteps', 2 ); //patch todo
        //**************************************************************************

        //---------------------------------------------------
        //interface for B
        //---------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'B',
            acceptPos : B2params,
            orientation : 'rotate',
            pos: stdMod.rg.B.pos,
        });

        //---------------------------------------------------
        //interface for V (for force)
        //---------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'V',
            acceptPos : V2forceParams,
            pos: stdMod.rg.V.pos,
        });


        //---------------------------------------------------
        ///interface for A (for distance to S)
        ///still needs:
        ///      media-model.js::pos2pointy( ... 'A', //vital
        ///      media-model-draw-evol.js::if( ... && pname !== 'A'  ) {
        ///                              :: [ 'V', 'B', 'A' ].forEach( pname => {
        ///                                 ... fakeName = pname+'-white-filler'; 
        //---------------------------------------------------
        ///remember medpos still has to be created and updated,
        ///this does not create medpos:
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'A',
            acceptPos : A2distanceToS,
            pos: stdMod.rg.A.pos,
        });
        //===================================================
        // \\// special points and points needed at model
        //===================================================
    }













    ///=============================================================
    ///
    /// renews initial path parameters from point B of dragger-B,
    ///
    ///     estimates time and speed direction in the first step and
    ///     resets speeds, and number of spatial steps;
    ///=============================================================
    function B2params( newPos, dummyPar, stdMod )
    {
        ccc( 'renews init path par dragger-B,' );
        stdMod = stdMod || studyMods[ amode.submodel ];
        var toreg = stdMod.toreg;
        var rg = stdMod.rg;

        var path0 = [ newPos[0] - rg.path.pos[0][0],  newPos[1] - rg.path.pos[0][1], ];
        //length of path from A to B
        var s0 = Math.sqrt( path0[0]*path0[0] + path0[1]*path0[1] );
        //ccc( 'new s0='+s0 + ' fconf.s0max=' + sconf.s0max + ' rg.B.pos', rg.B.pos );
        if( s0 >= sconf.s0max ) {
            //ccc( "first path cannot be greater than " + sconf.s0max );
            return;
        }
        var vabs0 = sconf.vabs0;

        //gets time elapsed to travel from point A to point B:
        //time0 can become big at this moment
        //var time0 = s0 / vabs0;

        // gets new speed, but speed abs value does not change
        var newv0 = [ path0[0] / s0 * vabs0, path0[1] / s0 * vabs0, ];

        /*
        //gets primitive-moves limit from original limit and new dt = time0
        var newCount = Math.floor( sconf.spatialStepsMax0 / rg.rgslid_dt.val );
        if( newCount < 3 ) {
            ////ignores paths with too small number of moves
            return;
        }
        toreg( 'spatialStepsMax' )( 'pos', newCount );
        ccc( rg.spatialStepsMax.pos );
        */
        toreg( 'speeds' )( 'pos', [ newv0 ] );
        toreg( 'speedsAracc' )( 'pos', [ newv0 ] );

        //moving B changes "gravity constant" ... fixing this
        //reuse the code in V2forceParams ...
        //... = (newPos[0] - posB[0]); //displacement x = from Bx to Vx

        return true;
    }


    ///=============================================================
    ///when dragging point V, converts V pos change to force-law constant change,
    ///returns true which means newPos is allowed,
    ///=============================================================
    function V2forceParams( newPos, dummyPar, stdMod, enforceNewPos )
    {
        stdMod                  = stdMod || studyMods[ amode.submodel ];
        var toreg               = stdMod.toreg;
        var rg                  = stdMod.rg;

        /*
        ///todm ... this validation blocks captured state from success,
        ///if user did not move slider "V", no force-law change must happen
        if( !enforceNewPos && (
                Math.abs(rg.V.pos[0] - newPos[0]) +
                Math.abs(rg.V.pos[0] - newPos[0]) < 1e-10
            )
        ) {
            return;
        }            
        */

        var tstep               = rg.rgslid_dt.val;
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
    function A2distanceToS( newPos, dummyPar, stdMod )
    {
        stdMod      = stdMod || studyMods[ amode.submodel ];
        var toreg   = stdMod.toreg;
        var rg      = stdMod.rg;

        var posS    = rg.S.pos;
        var displX  = newPos[0] - posS[0]; //displacement x = from Ax to SVx
        var displY  = newPos[1] - posS[1];
        var disp2   = displX*displX + displY*displY;
        if( disp2 < 1e-40 ) return false; //A is too close to S, forbid this configuration
        
        var posB    = rg.B.pos;
        posB[0]     += newPos[0] - rg.A.pos[0];
        posB[1]     += newPos[1] - rg.A.pos[1];
        return true;
    }






    ///=========================================================
    /// updates figure (and creates if none)
    ///      cases: either one newPos to rgX.pos change
    ///      or none of them
    ///=========================================================
    function ABVpos_2_trajectory( stdMod )
    {
        stdMod      = stdMod || studyMods[ amode.submodel ];
        var toreg   = stdMod.toreg;
        var rg      = stdMod.rg;

        B2params( rg.B.pos, null, stdMod );
        V2forceParams( rg.V.pos, null, stdMod, !!'doEnforcePars' );
        A2distanceToS( rg.A.pos, null, stdMod );

        ssF.solvesTrajectoryMath();
    }

}) ();

