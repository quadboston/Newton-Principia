( function() {
    var {
        ns, sn, $$, nssvg, has, haz, mat,
        amode, sconf, sDomF, sDomN, ssD, ssF, topicColors_repo,
        rg, toreg, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            //media_upcreate,
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
        },
        setModule,
    });
    var pivots_2_svgLineInRg;
    var pos2pointy;
    var paintTriangle;
    return;


    function setModule()
    {
        pivots_2_svgLineInRg   = ssF.pivots_2_svgLineInRg;
        pos2pointy      = ssF.pos2pointy;
        paintTriangle   = ssF.paintTriangle;
    }

    function media_upcreate___before_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.detected_user_interaction_effect_DONE = false;
        rg.allLettersAreHidden = false; //!rg.detected_user_interaction_effect_DONE;
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function media_upcreate___part_of_medupcr_basic() //media_upcreate()
    {
        branches2svg();
        createMedia0updateMediaAUX();
        if( ssF.mediaModelInitialized ) {
            stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
        }
        ssF.upcreate_mainLegend(); //placed into "slider"
        ssF.mediaModelInitialized = true;
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function createMedia0updateMediaAUX(){
        //---------------------------------------
        // //\\ angles alpha and beta
        //      , static angles
        //---------------------------------------
        var ANGLE_SIZE = 0.1;

         rg.alpha.angleSvg = nssvg.ellipseSector({
            stepsCount : 20,
            x0 : rg.C.medpos[0],
            y0 : rg.C.medpos[1],
            a  : sconf.mod2inn_scale*ANGLE_SIZE*1.5,
            b  : sconf.mod2inn_scale*ANGLE_SIZE*1.5,
            t0 : 0,
            t1 : rg.alpha.value*sconf.MONITOR_Y_FLIP,
            svgel : rg.alpha.angleSvg,
            parent : stdMod.mmedia,
            fill : 'transparent',
            'stroke-width':1,
        });
        $$.$(rg.alpha.angleSvg).cls( 'tp-angle-alpha tofill' );

        rg.beta.angleSvg = nssvg.ellipseSector({
            stepsCount : 20,
            // //\\ todm ... mod2inn_scale must be incapsulated in model
            //instead we are converting from model to media manually here
            //it is very annoying to always remember to
            //make a correction with MONITOR_Y_FLIP ...
            //todm ... do a better programming
            x0 : rg.B.medpos[0],
            y0 : rg.B.medpos[1],
            a  : sconf.mod2inn_scale*ANGLE_SIZE*1.5,
            b  : sconf.mod2inn_scale*ANGLE_SIZE*1.5,
            t0 : Math.PI-rg.beta.value*sconf.MONITOR_Y_FLIP,
            // \\// todm ... mod2inn_scale must be incapsulated in model

            t1 : Math.PI,
            svgel : rg.beta.angleSvg,
            parent : stdMod.mmedia,
            fill : 'transparent',
            'stroke-width':1,
            //a, b, t0, t1
        });
        //static angle
        $$.$(rg.beta.angleSvg).cls( 'tp-angle-beta tofill' );

        /*
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // //\\ working alternative
        //      needs prooftest
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        sn( 'medpos', rg.beta, [] );
        paste( rg.beta.medpos, rg.B.medpos );
        rg.beta.svgel = rg.beta.angleSvg;
        ssF.drawAngle({
            angleStart  : rg.beta.value * sconf.MONITOR_Y_FLIP - Math.PI,
            angleEnd : -Math.PI,
            ANGLE_SIZE : 1,
            tpClassName     : 'angle-beta',
            stroke    : 'black',
            //fill    : 'black',
            rgX             : rg.beta,
        });
        rg.beta.angleSvg = rg.beta.svgel;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        // \\// working alternative
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        */

        // //\\ applied angles
        //      , algorithm core-angles
        // //\\ applied alpha
        var CM = mat.p1_to_p2(rg.C.pos, rg.M.pos );
        var cosAlphaS = CM.unitVec[0];
        var alphaS = Math.acos( cosAlphaS ) * ( CM.unitVec[1] < 0 ? -1 : 1 );
        rg.alpha.appliedAngleSvg = nssvg.ellipseSector({
            stepsCount : 20,
            x0 : rg.C.medpos[0],
            y0 : rg.C.medpos[1],
            //a  : sconf.mod2inn_scale*AG.abs*0.3,
            //b  : sconf.mod2inn_scale*AG.abs*0.3,
            a  : sconf.mod2inn_scale*ANGLE_SIZE,
            b  : sconf.mod2inn_scale*ANGLE_SIZE,
            t0 : alphaS*sconf.MONITOR_Y_FLIP,
            t1 : (alphaS + rg.alpha.value) * sconf.MONITOR_Y_FLIP,
            svgel : rg.alpha.appliedAngleSvg,
            parent : stdMod.mmedia,
            fill : 'rgba( 155, 155, 0, 0.3 )',
            stroke: 'transparent',
            'stroke-width':1,
        });
        //MCD
        $$.$(rg.alpha.appliedAngleSvg).cls( 'tp-angle-alpha-core tofill' );
        // \\// applied alpha
        // //\\ applied beta
        var BM = mat.p1_to_p2(rg.B.pos, rg.M.pos );
        var cosBetaS = BM.unitVec[0];
        var betaS = Math.acos( cosBetaS ) * ( BM.unitVec[1] < 0 ? -1 : 1 );
        rg.beta.appliedAngleSvg = nssvg.ellipseSector({
            stepsCount : 20,
            x0 : rg.B.medpos[0],
            y0 : rg.B.medpos[1],
            a  : sconf.mod2inn_scale*ANGLE_SIZE,
            b  : sconf.mod2inn_scale*ANGLE_SIZE,
            t0 : betaS*sconf.MONITOR_Y_FLIP,
            t1 : (betaS - rg.beta.value) * sconf.MONITOR_Y_FLIP,
            svgel : rg.beta.appliedAngleSvg,
            parent : stdMod.mmedia,
            fill : 'rgba( 155, 155, 0, 0.3 )',
            stroke: 'transparent',
            'stroke-width':1,
        });
        //MBD
        $$.$(rg.beta.appliedAngleSvg).cls( 'tp-angle-beta-core tofill' );
        // \\// applied alpha
        // \\// applied angles
        //---------------------------------------
        // \\// angles alpha and beta
        //---------------------------------------
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

    function branches2svg(){
        ////----------------------------------------------
        ////branches to svg,
        ////makes conic first to put point over it later
        ////----------------------------------------------
        const bro = ssD.branchesObject;
        const brs = bro.branches
        const bN = brs.length;
        for( var ib = 0; ib < bN; ib++ ){
            const br = brs[ ib ];
            if( has( br, 'svgel' ) ){
                nssvg.branch2svg(br);
            } else {
                ////makes ellipse first to put point over it later
                br.parent = stdMod.mmedia;
                br['stroke-width'] = 3;
                br.stroke = ns.arr2rgba( topicColors_repo[ "ellipse" ] );
                br.svgel = nssvg.branch2svg(br);
                $$.$(br.svgel).cls( 'tp-ellipse tostroke thickable' );
            }
        }
    }
})();

