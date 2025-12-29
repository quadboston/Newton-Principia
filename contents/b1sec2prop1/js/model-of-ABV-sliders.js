//sets slider hanlders
(function() {
    const {
        sn, mat, nspaste,
        sconf, sDomF, ssF, rg, toreg,
        stdMod, amode,
    } = window.b$l.apptree({ ssFExportList : {
            sets_A_v_forces_sliders,
    }});
    return;


    ///executes one time
    function sets_A_v_forces_sliders (){
        //**********************
        //initially does job which sliders do at run-time
        toreg( 'slider_sltime' )( 'curtime',
                sconf.unitlessMinTime * sconf.initialTimieStep );
        toreg( 'speeds' )( 'pos', [ sconf.v0 ] );
        toreg( 'speedsAracc' )( 'pos', [ sconf.v0 ] );
        toreg( 'rgslid_dt' )( 'val', sconf.initialTimieStep );
        //**********************

        //---------------------------------------------------
        //interface for B
        //---------------------------------------------------
        sn( 'v', rg ).acceptPos = v2params;

        ///---------------------------------------------------
        ///interfaces for force hanles
        ///---------------------------------------------------
        ['B','C','D','E','F'].forEach( (name, ix) => {
            let nam1='VVV'+ix;
            rgX = sn( nam1, rg );
            //rgX.draggableX = true;
            //rgX.draggableY = true;
            //rgX.initialR = 60;
            rgX.acceptPos =
                function( newVPos, dummyPar, enforceNewPos ) {
                    return V2forceParams(newVPos, dummyPar, enforceNewPos, ix);
                };
        });

        //---------------------------------------------------
        ///interface for A (for distance to S)
        ///still needs:
        ///      ??media-model.js::pos2pointy( ... 'A', //vital
        ///      ??media-model-draw-evol.js::if( ... && pname !== 'A'  ) {
        ///                              :: [ 'V', 'B', 'A' ].forEach( pname => {
        ///                                 ... fakeName = pname+'-white-filler';
        //---------------------------------------------------
        sn( 'A', rg ).acceptPos = A2distanceToS;
    }

    ///=============================================================
    /// estimates speed direction in the first step and
    /// resets speed direction;
    ///=============================================================
    function v2params( newPos, dummyPar, )
    {
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

    ///=============================================================
    ///when dragging point V, converts V pos change to force-law constant change,
    ///returns true which means newPos is allowed,
    ///=============================================================
    function V2forceParams( newVPos, dummyPar, enforceNewPos, fix )
    {
        let nam0='VV'+fix;
        let nam1='VVV'+fix;
        var tstep               = rg.rgslid_dt.val;
        var posB                = rg[nam0].pos;
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
        let lawPower = rg.force.inarray[ fix ].lawPower;
        var r2 = Math.exp(
                    -lawPower * Math.log( BS.abs )
                 );
        //newForceAbs = displacement = A/r^2 * 2dt^2  => A = move * r^2 / (2dt^2)
        var dt22                = 0.5/(tstep*tstep)
        let forceAbs = newForceAbs * dt22;
        let lawConstant         = forceAbs * r2;
        //-------------------------------------
        // \\// gets abs value of lawConstant A
        //-------------------------------------

        //negative fDirection makes force repelling
        lawConstant   *= bvNorm[0]*bsNorm[0] + bvNorm[1]*bsNorm[1];

        rg.force.inarray[ fix ].lawConstant = lawConstant;
        return true;
    }

    ///==============================================================
    /// when dragging, changes initial distance: distance from A to S
    ///==============================================================
    function A2distanceToS( newAPos, dummyPar, )
    {
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
    ///Needed???
    /// updates figure (and creates if none)
    ///      cases: either one newPos to rgX.pos change
    ///      or none of them
    ///=========================================================
    /*
    function ABVpos_2_trajectory()
    {
        //v2params( rg.B.pos, null, );
        //V2forceParams( rg.V.pos, null,  !!'doEnforcePars' );
        //A2distanceToS( rg.A.pos, null, );

        //ssF.solvesTrajectoryMath__O();
    }
    */
})();