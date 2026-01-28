( function() {
    const {
        sn, $$, nssvg, haz, sDomF, ssF, ssD, stdMod, sconf, } = window.b$l.apptree({
        stdModExportList : {
            creates_createOrUpdateOrbit,
            formula2branches,
        },
    });
    return;

    
    ///analogy of function
    ///pointsArr_2_singleDividedDifferences()
    function creates_createOrUpdateOrbit()
    {
        var polylineSvg;
        var polylineSvgMirrored;
        stdMod.createOrUpdateOrbit = createOrUpdateOrbit;
        return;

        ///decoration, should run in upcreate_media
        function createOrUpdateOrbit(arg)
        {
            //Main orbit polyline
            const cp = ssD.orbitXYToDraw;
            polylineSvg = createOrUpdateOrbitPolyline(polylineSvg, cp);

            //Optional mirrored orbit polyline
            if (sconf.MIRROR_ORBIT && stdMod.computeOrbitXCenter) {
                const xC = stdMod.computeOrbitXCenter();
                const cp_mirrored = mirrorCurvePoints(cp, xC);
                polylineSvgMirrored = createOrUpdateOrbitPolyline(
                    polylineSvgMirrored, cp_mirrored);
            }
        }

        function createOrUpdateOrbitPolyline(svgel, curve_points) {
            const output = nssvg.polyline({
                pivots  : curve_points.map( cp => ssF.mod2inn( cp, stdMod ) ), 
                svgel   : svgel,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                'stroke-width' : sconf.PATH_WIDTH,
                //fill             : haz( arg, 'fill' ),
            });
            const lowname = sDomF.topicIdUpperCase_2_underscore( 'orbit' );
            //sets tp-machine
            $$.$( output ).addClass( 'tostroke thickable tp-'+lowname );
            return output;
        }

        function mirrorCurvePoints(curve_points, x) {
            //Mirror curve points relative to x
            return curve_points.map(cp => [x - (cp[0] - x), cp[1]]);
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

