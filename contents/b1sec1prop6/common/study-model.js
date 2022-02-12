( function() {
    var {
        sn, $$, nsmethods, nssvg, mcurve, integral, mat,
        ssF, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;













    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {

        //=================================================
        // //\\ model parameters,
        //      these are independent parameters,
        //      to be varied by sliders
        //=================================================
        //curve //varied by pivots
        //      //pivot 'P' is attached to initial spped V,
        //      it is already in registry,

        //projection of speed to static tangent vector uu
        //at all points P used for differentiation,
        //body moves backward on x,
        toreg( 'vt' )( 'val', -1 );
        //interval of t to construct an arc for
        //Newton's sagitta
        toreg( 'tForSaggitae' )( 'val', 0.210 );
        //center 'S'
        //      it is already in registry,
        //=================================================
        // \\// model parameters,
        //=================================================

        //sets and paints initial orbit
        stdMod.pointsArr_2_singleDividedDifferences();        

        stdMod.completesSlidersCreation();

        //creates placeholder
        toreg( 'curvatureCircle' );

        //too early: overriden later by sconf.rgShapesVisible
        //rg[ 'S,nonSolvablePoint' ].undisplay = true;
    }








    ///****************************************************
    /// model scenario
    /// is required; to skip define as ()=>{};
    ///****************************************************
    function model_upcreate()
    {
        var rr0 = rg.P.pos;
        var rrc = rg.S.pos;

        // **api-input---plane-curve-derivatives
        var diff = mcurve.planeCurveDerivatives({
            fun : rg[ 'approximated-curve' ].x2xy,
            t : rr0[0],
            rrc,
        });
        var {
            RC, R, curvatureChordSecondPoint, projectionOfCenterOnTangent,
            uu,
            rr,
            //staticSectorialSpeed_rrrOnUU,
        } = diff;
        rr0[1]      = rr[1]; //=g[ 'approximated-curve' ].x2xy( rr0[0] )[1];
        rg.C.pos[0] = RC[0];
        rg.C.pos[1] = RC[1];
        rg.V.pos[0] = curvatureChordSecondPoint[0];
        rg.V.pos[1] = curvatureChordSecondPoint[1];
        rg.Y.pos[0] = projectionOfCenterOnTangent[0];
        rg.Y.pos[1] = projectionOfCenterOnTangent[1];

        var RCmedpos = ssF.mod2inn( RC, stdMod );
        var RRmedpos = sconf.mod2inn_scale * R;

        //todo nearly bug: why create svg and set cls every time?
        var curvatureCircleName = 'curvatureCircle';
        var rgCurvatureCircle = toreg( curvatureCircleName )();
        rgCurvatureCircle.svgel = nssvg.u({
            svgel   : rgCurvatureCircle.svgel,
            parent  : stdMod.mmedia,
            type    : 'circle',
            stroke  : rg.C.pcolor,
            fill    : 'transparent',
            'stroke-width' : '1',
            cx : RCmedpos[0],
            cy : RCmedpos[1],
            r : RRmedpos,
        });
        $$.$( rgCurvatureCircle.svgel ).addClass(
            'tp-' + nsmethods.camelName2cssName( curvatureCircleName )
        );
        rgCurvatureCircle.svgel.style.display =
            rgCurvatureCircle.undisplay ? 'none' : 'block';

        //================================================
        // //\\ arc, sagittae and related
        //================================================
        var { rr, side } = deltaT_2_arc(
            rr0,                    //P
            rg.vt.val,              //v0
            rg.tForSaggitae.val,    //t for arc
        );
        var rrplus = null
        var rrminus = null;
        var wwlen1 = sconf.originalPoints.curvePivots.length-1;
        if( rr[0] > rg[ 'curvePivots-' + wwlen1 ].pos[0] ) {
            var rrplus = rr;
            var sidePlus = side;
        }
        var { rr, side } = deltaT_2_arc(
            rr0,                    //P
            rg.vt.val,              //v0
            -rg.tForSaggitae.val,   //t for arc
        );
        if( rr[0] < rg[ 'curvePivots-0' ].pos[0] ) {
            var rrminus = rr;
            var sideMinus = side;
        }

        ///creative user may move Q beyond curve x-limits, don't let trouble to happen
        if( !rrminus || !rrplus ) {
            ////rolls back, rolls only Q and P which may be changed in sliding,
            rg.tForSaggitae.val = rg.tForSaggitae.former_val;
            rg.Q.pos[0] = rg.Q.formerPos[0];
            rg.Q.pos[1] = rg.Q.formerPos[1];
            rg.P.pos[0] = rg.formerP[0];
            rg.P.pos[1] = rg.formerP[1];
            return;
        }

        ///continues completing model peacefully
        rg.Q.pos[0] = rrplus[0];
        rg.Q.pos[1] = rrplus[1];

        //:stashes rollback data for case user-sliders go crazy
        rg.Q.formerPos = [ rg.Q.pos[0], rg.Q.pos[1] ];
        rg.tForSaggitae.former_val = rg.tForSaggitae.val;
        rg.formerP = [ rg.P.pos[0], rg.P.pos[1] ];


        rg.rrminus.pos[0] = rrminus[0];
        rg.rrminus.pos[1] = rrminus[1];
        /*
        ccc( 'new: dx+=' + (rg.Q.pos[0]-rg.P.pos[0]).toFixed(3) +
             ' dx-=' + (rrminus[0]-rg.P.pos[0]).toFixed(3) +
             ' dt=' + rg.tForSaggitae.val.toFixed(3)
        );
        */

        var saggita2 = [ sidePlus[0] + sideMinus[0], sidePlus[1] + sideMinus[1], ];
        var saggita = [ saggita2[0]*0.5+rr0[0], saggita2[1]*0.5+rr0[1], ];
        rg.saggita.pos[0] = saggita[0];
        rg.saggita.pos[1] = saggita[1];

        //R = parallel-projection of Q to tangent
        var wwR = mat.linesCross(
            uu, rr0, //direction, start
            [rr0[0]-rrc[0], rr0[1]-rrc[1]], rg.Q.pos, //direction, start
        );
        rg.R.pos[0] = wwR[0];
        rg.R.pos[1] = wwR[1];

        //T = perp. from Q to radius-vector
        var wwT = mat.dropPerpendicular( rg.Q.pos, rrc, rr0 )
        rg.T.pos[0] = wwT[0];
        rg.T.pos[1] = wwT[1];
        //================================================
        // \\// arc, sagittae and related
        //================================================

        //decorations
        //------------------------------------------------
        // //\\ PZ
        //------------------------------------------------
        var wwZ = mat.dropLine(
            -0.6,     //t
            rg.P.pos, //A
            rg.Y.pos, //B
        );
        rg.Z.pos[0] = wwZ[0];
        rg.Z.pos[1] = wwZ[1];
        //------------------------------------------------
        // \\// PZ
        //------------------------------------------------
    }








    //builds two arcs, after and before instant position of moving body P
    function deltaT_2_arc(
        rr0,        //rg.P.pos[0],
        vt0,
        intervalT   //rg.tForSaggitae.val
    ){
        const INTEGRATION_STEPS = 40;
        const STEP_T = intervalT / INTEGRATION_STEPS;
        const rrc = rg.S.pos;

        //: integration starting values
        var x = rr0[0];
        var {
                uu,
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].x2xy,
                t : x,
                rrc,
            });
        var ux = uu[0];
        var sectorialSpeed0 = staticSectorialSpeed_rrrOnUU

            //"fake" speed, no relation to actual speed,
            //real speed must change from point P to point P,
            //this speed only indicates negative direction of speed,
            //speed multiplied here for performance,
            * vt0; 

        for( var ix = 0; ix <= INTEGRATION_STEPS; ix++ ) {
            //doing step from old values
            var xstep = STEP_T * ux

                    //=vt=tangential speed
                    * sectorialSpeed0
                    / staticSectorialSpeed_rrrOnUU;

            var x = x + xstep;
            //calculating new values
            var rr = rg[ 'approximated-curve' ].x2xy( x );
            var {
                uu,
                staticSectorialSpeed_rrrOnUU,
            } = mcurve.planeCurveDerivatives({
                fun : rg[ 'approximated-curve' ].x2xy,
                t : x,
                rrc,
            });
            var ux = uu[0];
        }
        var side = [ rr[0] - rr0[0], rr[1] - rr0[1] ];
        return { rr, side };
    }

}) ();

