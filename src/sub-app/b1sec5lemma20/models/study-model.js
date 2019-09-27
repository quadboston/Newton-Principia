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

    //ssF.pointB_2_time0 = pointB_2_time0;
    return;







    function setModule()
    {
        ssF.init_model            = init_model;
        sn(SUB_MODEL, studyMods ).model8media_upcreate = model8media_upcreate;
        sn(SUB_MODEL, studyMods ).upcreate = model8media_upcreate;
    }




    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model()
    {
        var ss = sconf;
        var pp = ss.initialPoints;
        //:primary params
        tr( 'a', 'value', ss.a );
        tr( 'b', 'value', ss.b );

        var OO = pp.O;
        var PP = pp.P;
        var AA = pp.A;
        var BB = pp.B;
        var CC = pp.C;
        var P = [ ( PP[0] - OO[0] ) * ss.med2mod_scale, (PP[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP ];
        tr( 'P', 'pos', P );
        var A = [ ( AA[0] - OO[0] ) * ss.med2mod_scale, (AA[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'A', 'pos', A );
        var B = [ ( BB[0] - OO[0] ) * ss.med2mod_scale, (BB[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'B', 'pos', B );
        var C = [ ( CC[0] - OO[0] ) * ss.med2mod_scale, (CC[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'C', 'pos', C );
        var O = [0,0];
        tr( 'O', 'pos', O );


        var SS = pp.S;
        var QQ = pp.Q;
        var DD = pp.D;
        var RR = pp.R;
        var TT = pp.T;
        var tt = pp.t;
        var rr = pp.r;
        var S = [ ( SS[0] - OO[0] ) * ss.med2mod_scale, (SS[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'S', 'pos', S );
        var Q = [ ( QQ[0] - OO[0] ) * ss.med2mod_scale, (QQ[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'Q', 'pos', Q );
        var D = [ ( DD[0] - OO[0] ) * ss.med2mod_scale, (DD[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'D', 'pos', D );
        var T = [ ( TT[0] - OO[0] ) * ss.med2mod_scale, (TT[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'T', 'pos', T );
        var R = [ ( RR[0] - OO[0] ) * ss.med2mod_scale, (RR[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'R', 'pos', R );
        var t = [ ( tt[0] - OO[0] ) * ss.med2mod_scale, (tt[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 't', 'pos', t );
        var r = [ ( rr[0] - OO[0] ) * ss.med2mod_scale, (rr[1] - OO[1] ) * ss.med2mod_scale * ss.MONITOR_Y_FLIP];
        tr( 'r', 'pos', r );
    }
    //===================================================
    // \\// registers model pars into common scope
    //===================================================


    ///estimates time and speed direction in the first step and
    ///resets speeds, timeStep, and number of steps;
    /*
    function pointB_2_time0( newPos )
    {
    }
    */


    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function model8media_upcreate()
    {
        var P=rg.P.pos;
        var r=rg.r.pos;
        var t=rg.t.pos;
        var Pt = mat.p1_to_p2( P,t );
        var Pr = mat.p1_to_p2( P,r );
        var Pr_by_Pt = Pr.abs/Pt.abs;

        //------------------------------------
        // //\\ thread from T to D
        //------------------------------------
        var T=rg.T.pos;
        var PT = mat.p1_to_p2( P, T );

        //finds algebraic sign
        var ut = Pt.unitVec;
        var uT = PT.unitVec;
        var PTalgebraic = PT.abs * ( ut[0]*uT[0]+ut[1]*uT[1] );
        var PR = PTalgebraic * Pr_by_Pt;

        var Rpos = [ P[0] + Pr.unitVec[0] * PR, P[1] + Pr.unitVec[1] * PR ]; 
        //var R = Rpos;

        var R=rg.R.pos;
        var R = rg.R.pos = Rpos;
        //ccc( Rpos, rg.R.pos );

        var C = rg.C.pos;
        var CR = mat.p1_to_p2( C,R );
        var B = rg.B.pos;
        var BT = mat.p1_to_p2( B,T );
        //intersection of two lines CR and BT has to be found:
        //q*uCR + C = q'*uBT + B needs to be solved against q,q' to find D
        rg.D.pos = mat.linesCross( CR.unitVec, C, BT.unitVec, B );
        //------------------------------------
        // \\// thread from T to D
        //------------------------------------


        //-------------------------------------------------------
        // //\\ media part
        //-------------------------------------------------------
        sn(SUB_MODEL, studyMods ).media_upcreate();
        ssF.upcreate_mainLegend(); //placed into "slider"
        //-------------------------------------------------------
        // \\// media part
        //-------------------------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================

}) ();

