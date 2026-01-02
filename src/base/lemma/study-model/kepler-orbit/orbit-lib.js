( function() {
    const {
        sn, $$, nssvg, haz, sDomF, ssF, ssD, stdMod, sconf, } = window.b$l.apptree({
        stdModExportList : {
            creates_poly2svg_for_lemma,
            formula2branches,
        },
    });
    return;

    
    ///analogy of function
    ///pointsArr_2_singleDividedDifferences()
    function creates_poly2svg_for_lemma()
    {
        var polylineSvg;
        stdMod.poly2svgP11 = poly2svgP11;
        return;

        ///decoration, should run in upcreate_media
        function poly2svgP11(arg)
        {
            const curve_points = ssD.orbitXYToDraw;
            polylineSvg = nssvg.polyline({
                pivots  : curve_points.map( cp => ssF.mod2inn( cp, stdMod ) ), 
                svgel   : polylineSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                'stroke-width' : sconf.PATH_WIDTH,
                //fill             : haz( arg, 'fill' ),
            });
            const lowname = sDomF.tpid2low( 'orbit' );
            //sets tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );
        }
    }
    
    ///INPUT    input parameters are in model namespace,
    ///         curve formula to branches of a curve,
    ///OUTPUT   result attaches to brsObj
    function formula2branches( brsObj ){
        const {
            stepsCount,
            step,
            start_q,
            formula,
            breakCondition,
        } = brsObj;
        const BRANCH_COMPLETER = haz( brsObj, 'BRANCH_COMPLETER' ) || 0;
        const brs = sn( 'branches', brsObj, [] );
        const totalPoints = brsObj.points = [];
        let bpoints;
        let pointPar; //ro;
        let branchesLen = 0;
        //0 for no-completion, usually 3 for hyperbola:
        for( var ii = 0; ii < stepsCount; ii++ ){
            const orb = formula(start_q + step * ii);
            const point = orb.point;
            if( !ii || breakCondition( pointPar, orb.pointPar ) ){
                bpoints = [];
                brs[ branchesLen ] = brs[ branchesLen ] || {};
                brs[ branchesLen ].points = bpoints;
                branchesLen++;
            }
            pointPar = orb.pointPar;            
            bpoints.push( point );
            totalPoints.push( point );
        }
        if( branchesLen === BRANCH_COMPLETER ){
            ////second hyperbola branch is split, to
            ////first and third branch, so do
            ////connect them
            const ps = brs[BRANCH_COMPLETER-1].points;
            const first = brs[0].points[0];
            ps[ ps.length ] = [first[0], first[1]];
        }
        ///removes dom stuff in brs if leftover
        for( ii=branchesLen; ii < brs.length; ii++ ){
            const svgel = haz( brs[ii], 'svgel' );
            if( svgel ){
                svgel.remove();
                delete brs[ii].svgel;
            }
        }
        brs.length = branchesLen;
    }
})();

