(function(){
const { ns, sn, $$, mat, has, haz, nspaste,
        fconf, sDomF, ssF, ssD,
        sconf, amode, stdMod, rg, toreg,
      } = window.b$l.atree({ stdModList: {
        media_upcreate___part_of_medupcr_basic,
}});

function media_upcreate___part_of_medupcr_basic (){
    rg.DLeft.pos[0] = -0.3; //extends tangent to the left
    //=================================================
    // //\\ manages legend CSS-visibility
    //      by essay-state
    //=================================================
    var rgMainLegend = haz( rg, 'main-legend' );
    if( rgMainLegend ) {
        var rgTeoTab = rgMainLegend[ amode.logic_phase ];
        if( amode.logic_phase === 'corollary' && amode.aspect === 'model' ) {
            $$.$( rgTeoTab.tableDom ).addClass( 'hidden' );
        } else {
            $$.$( rgTeoTab.tableDom ).removeClass( 'hidden' );
        }
    }
    //=================================================
    // \\// manages legend CSS-visibility
    //=================================================

    //=================================================
    // //\\ analytical derivative dy/dx
    //=================================================
    var cfun = ssD.repoConf[ssD.repoConf.customFunction];

    //-------------------------------------------------
    // //\\ original arc and curve
    //-------------------------------------------------

    //must be in synch with rotation of AL
    //pointB      : rg.B,
    ssF.gcurve2svg({
            //rgn    : will become 'arc-AB',
            fun         : cfun.fun,
            pointA      : rg.A,
            pointB      : rg.B,

            //-----------------------------------------
            // //\\ apparently this fixes
            //-----------------------------------------
            //      arc out of synch with B
            start       : rg.A.pos[0],
            step        : (rg.B.unrotatedParameterX - rg.A.pos[0] ) / 20,
            stepsCount  : 20,
            //-----------------------------------------
            // \\// apparently this fixes
            //-----------------------------------------
            //mscene      : stdMod.medScene,
            addToStepCount : 1,
    });

    ssF.gcurve2svg({
            rgn      : 'curve-AB',
            fun         : cfun.fun,

            //this makes curve's beginning tail going up - not good
            //pointA      : rg.curveStart,
            //so, we truncate it, but need to draw it separately later on,
            pointA      : rg.A,

            pointB      : rg.curveEnd,
            //mscene      : stdMod.medScene,
            addToStepCount : 1,
    });

    ///left branch of original curve is a reflection against axis y
    ssF.gcurve2svg({
            rgn      : 'left-curve-AB',
            fun         : ssD.repoConf[2].fun,

            pointA      : rg.A,
            pointB      : rg.curveLeftEnd,
            //mscene      : stdMod.medScene,
            addToStepCount : 1,
    });
    //-------------------------------------------------
    // \\// original arc and curve
    //-------------------------------------------------

    //-------------------------------------------------
    // //\\ paints magnified curve
    //-------------------------------------------------
    var magnitude = rg.magnitude.value;
    //misleading notation: this is not ..._b, this is ..._B
    rg.derotated_b = toreg( 'derotated_b' )( 'pos',
                            [rg.B.unrotatedParameterX,0] )();
    ssF.gcurve2svg({
            rgn      : 'arc-Ab',
            fun         : cfun.fun, //for l8, cust fun = 0 = rotated fun
            pointA      : rg.A,
            pointB      : rg.derotated_b,
            //mscene      : stdMod.medScene,
            magnitude,
            cssClass: 'tp-arc-Ab',
            addToStepCount : 1,
            stepsCount : fconf.sappId === "b1sec1lemma8" ? 200 : null,
    });
    //-------------------------------------------------
    // \\// paints magnified curve
    //-------------------------------------------------
    ////todo patch ... overrides caption by rewriting the line
    ssF.str2line( 'x0,x', 'tp-debug', sconf.lines[ 'x0,x' ], ' ' );
}
})();