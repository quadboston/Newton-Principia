( function() {
    var {
        mat, nspaste,
        sconf, sDomF, ssF,
        amode, studyMods,
    } = window.b$l.apptree({
        ssFExportList :
        {
            doesSchedule_A_B_V_sliders_in_init_pars,
            v2GUI,
        },
    });
    return;










    ///executes one time
    function doesSchedule_A_B_V_sliders_in_init_pars( stdMod )
    {
        var toreg = stdMod.toreg;
        var rg = stdMod.rg;

        //**********************
        //initially does job which sliders do at run-time
        toreg( 'slider_sltime' )( 'curtime',
                sconf.timeMin0 * sconf.initialTimieStep );
        toreg( 'speeds' )( 'pos', [ sconf.v0 ] );
        toreg( 'speedsAracc' )( 'pos', [ sconf.v0 ] );
        toreg( 'rgslid_dt' )( 'val', sconf.initialTimieStep );
        //**********************

        //---------------------------------------------------
        //interface for B
        //---------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'v',
            acceptPos : v2params,
            orientation : 'rotate',
            pos: rg.v.pos,
        });

        //---------------------------------------------------
        //interface for V (for force)
        //---------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'V',
            acceptPos : V2forceParams,
            pos: rg.V.pos,
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
            pos: rg.A.pos,
        });
        //===================================================
        // \\// special points and points needed at model
        //===================================================
    }













    ///=============================================================
    /// estimates speed direction in the first step and
    /// resets speed direction;
    ///=============================================================
    function v2params( newPos, dummyPar, stdMod )
    {
        stdMod      = stdMod || studyMods[ amode.submodel ];
        var toreg   = stdMod.toreg;
        var path_Av = mat.subV( newPos, rg.A.pos );
        var unitAv = mat.unitVector( path_Av );

        // gets new speed, but speed abs value does not change
        var newv0 = mat.scaleV( sconf.speed, unitAv.unitVec );
        var newv0 = path_Av;
        
        toreg( 'speeds' )( 'pos', [ newv0 ] );
        toreg( 'speedsAracc' )( 'pos', [ newv0 ] );

        //updates dragger position
        var newP = mat.addV( newv0, rg.A.pos );
        newPos[0] = newP[0];
        newPos[1] = newP[1];

        return true;
    }

    ///updates point v position from speed
    function v2GUI()
    {
        let v = rg.speeds.pos[0];
        var pos = mat.addV( v, rg.A.pos );
        nspaste( rg.v.pos, pos );
    }


    ///=============================================================
    ///when dragging point V, converts V pos change to force-law constant change,
    ///returns true which means newPos is allowed,
    ///=============================================================
    function V2forceParams( newVPos, dummyPar, stdMod, enforceNewPos )
    {
        stdMod                  = stdMod || studyMods[ amode.submodel ];
        var toreg               = stdMod.toreg;
        var rg                  = stdMod.rg;
        var tstep               = rg.rgslid_dt.val;
        var posB                = rg.B.pos;
        var posS                = rg.S.pos;
        var newBV               = mat.unitVector( mat.subV( newVPos, posB ) );
        var bvNorm              = newBV.unitVec;
        var newForceAbs         = newBV.abs;
        var BS                  = mat.unitVector( mat.subV( posB, posS ) );
        var bsNorm              = mat.scaleV( -1, BS.unitVec );

        //-------------------------------------
        // //\\ gets abs value of lawConstant A
        //-------------------------------------
        //yes, we admit here that force law can be with an arbitrary power,
        //but for simplicity, write comments here for this power = 2,
        //r^2=
        var r2                  = Math.exp(
                                    -rg.force.lawPower * Math.log( BS.abs )
                                  );
        //newForceAbs = displacement = A/r^2 * 2dt^2  => A = move * r^2 / (2dt^2)
        var dt22                = 0.5/(tstep*tstep)
        rg.force.lawConstant    = newForceAbs * r2 * dt22;
        //-------------------------------------
        // \\// gets abs value of lawConstant A
        //-------------------------------------

        //negative fDirection makes force repelling
        rg.force.lawConstant   *= bvNorm[0]*bsNorm[0] + bvNorm[1]*bsNorm[1];
        return true;
    }

    ///==============================================================
    /// when dragging, changes initial distance: distance from A to S
    ///==============================================================
    function A2distanceToS( newAPos, dummyPar, stdMod )
    {
        stdMod      = stdMod || studyMods[ amode.submodel ];
        var toreg   = stdMod.toreg;
        var rg      = stdMod.rg;
        var posS    = rg.S.pos;
        var newAS   = mat.unitVector( mat.subV( newAPos, posS ) );
        //A is too close to S, forbid this configuration
        if( newAS.abs < 1e-20 ) return false;

        //updates dragger v position
        var newP = mat.addV( rg.speeds.pos[0], rg.A.pos );
        rg.v.pos[0] = newP[0];
        rg.v.pos[1] = newP[1];
        return true;
    }






    ///=========================================================
    /// updates figure (and creates if none)
    ///      cases: either one newPos to rgX.pos change
    ///      or none of them
    ///=========================================================
    /*
    function ABVpos_2_trajectory( stdMod )
    {
        stdMod      = stdMod || studyMods[ amode.submodel ];
        var toreg   = stdMod.toreg;
        var rg      = stdMod.rg;

        //v2params( rg.B.pos, null, stdMod );
        //V2forceParams( rg.V.pos, null, stdMod, !!'doEnforcePars' );
        //A2distanceToS( rg.A.pos, null, stdMod );

        //ssF.solvesTrajectoryMath();
    }
    */
}) ();

