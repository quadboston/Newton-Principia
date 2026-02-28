/*  ***************************************************************************
 *  Calculates a set of points along a conic based on the
 *  given orbit parameters and adds them as svgs paths in the model.
 *
 *  NOTE: This module is used for Propositions 12-17. There are others
 *  currently used for P6-11, L20-21, and P41. Though this one can be used
 *  to draw any conic (ellipse, parabola, hyperbola w/out asymptotes) as needed.
 *
 * ****************************************************************************/
( function() {
    var {
        sn,
        $$, nssvg, has, haz, mat, mcurve,
        fconf, ssF,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_orbitRack,
            establishesEccentricity,
        },
    });
    var op = sn( 'orbitParameters', sconf );
    return;


    //called from page's init-model-parameters.js
    //analogy of Pivots_2_divdifFW() (P41)
    function creates_orbitRack( vop )
    {
        var op = vop || sconf.orbitParameters;

        op.protectedQ                  = protectedQ;

        //op.qStart                      = -Math.PI;
        //op.qEnd                        = Math.PI;
        // specify these in vop to draw segment, otherwise full ellpse will be drawn
        // these vals are used here & graph-array
        op.qStart = op.qStart ? op.qStart: -Math.PI;
        op.qEnd = op.qEnd ? op.End: Math.PI;

        var rgP         = vop ? rg.p : rg.P;

        //both: css and rg names
        var lowname  = op.curveName ? op.curveName : 'orbit';
        var rgX = vop ? rg[ 'approxer-sample' ] : rg.approxer;
        var areaName = vop ? 'orbitarea-sample' : 'orbitarea';

        var dqName      = vop ? 'orbitdq-sample' : 'orbitdq';
        var rgDq        = rg[ dqName ]; //"twin-object" for rgX
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );
        rgDq.polylineSvg = haz( rgX, dqName );

        {
            const result = {
                t2xy, // f : x |-> rr, rr is in |R^2
                poly2svg,
            };
            Object.assign( rgX, result );
            Object.assign( rgDq, result );
        }
        poly2svg({});
        //transitional notation:
        stdMod.q2xy = t2xy;
        return;

        // algorithm: q -> conic in polar coordinates -> cartesian [x,y]
        // also called from other modules to determine position of specified points,
        function t2xy(
            //inner parameter for conics, usually angle,
            //aka below poz.x = signedRo * Math.cos( q + op.mainAxisAngle );
            q
        ){
            var den = 1 - op.eccentricity * Math.cos(q);
            if( den === 0 ) {
                ////floating point error protection:
                ////protection for cos does not work well when cos = 1-x^2/2,
                ////this is why we do this validator here,
                ////for parabala it cannot be < 0 and for hyperbola,
                ////both > 0 and < 0 can happen, so make (todm) it positive:
                den = 1e-20;
            }
            var signedRo = op.latus / den;

            /*
            //covered below? do remove?
            if( fconf.effId === "prop_from_14_to_17" ) {
                if( op.conicSignum === -1 && Math.abs( rgP.q ) <
                    op.SINGULARITY_ANGLE ) {
                    ////in this proposition, we keep position P = constant, so
                    ////do invert signedRo for opposite branch of hyperbola,
                    ////alternatively: signedRo = Math.abs( signedRo );
                    signedRo = -signedRo;
                }
            }
            */
            if( op.conicSignum === -1 && Math.abs( rgP.q ) < op.SINGULARITY_ANGLE ) {
                ////this probably covers proposition 14,

                ////in this proposition, we keep position P = constant, so
                ////do invert signedRo for opposite branch of hyperbola,
                ////alternatively: signedRo = Math.abs( signedRo );
                signedRo = -signedRo;
            }

            var x = signedRo * Math.cos( q + op.mainAxisAngle );
            var y = signedRo * Math.sin( q + op.mainAxisAngle );
            return [ x, y ];
        }

        ///draws curve arc for t in [qStart,qEnd)
        function trange2points({ qStart, qEnd, stepsCount, })
        {
            var newpoints = [];
            var qStep = ( qEnd - qStart ) / stepsCount;
            for( var qix = 0; qix<=stepsCount; qix++ ) {
                var q = qStart + qStep * qix;
                if( 1 !== op.conicSignum ) {
                    ////hyperbola or parabola
                    q = protectedQ( q );
                }
                newpoints.push( t2xy( q ) );
            }
            return newpoints;
        }

        ///draws full orbit for angle q in [0,2PI)
        //returns unclosed curve with end point =/= first point exactly
        function ownrange2points({ stepsCount, doDeltaArc })
        {
            if( doDeltaArc ) {
                var qStart = rgP.q;
                var qEnd = rgP.q + op.sagittaDelta_q;
            } else {
                var qStart = op.qStart;
                var qEnd = op.qEnd;
            }
            var points = trange2points({ qStart, qEnd, stepsCount });
            //points[ points.length - 1 ] = points[ 0 ]; //does close the poly.
            return points;
        }
        ///function for code migration
        function ownrange2points_byStartEnd({ stepsCount, start, end })
        {
            var points = [];
            var qStep = ( end - start ) / stepsCount;
            for( var qix = 0; qix <= stepsCount; qix++ ) {
                var q = start + qStep * qix;
                points.push( t2xy( q ) );
            }
            return points;
        }

        // split hyperbola into two arrays
        function splitAtAsymptotes(points) {
            const n = points.length;
            // Find distances between consecutive points (looping around)
            const distances = points.map((p, i) => {
                const next = points[(i + 1) % n];
                const dx = next[0] - p[0];
                const dy = next[1] - p[1];
                return Math.hypot(dx, dy);
            });

            // Find two largest jumps
            const jumpIndices = distances
                .map((d, i) => ({ dist: d, index: i }))
                .sort((a, b) => b.dist - a.dist)
                .slice(0, 2)
                .map(o => o.index)
                .sort((a, b) => a - b);

            const [cut1, cut2] = jumpIndices;

            // Slice into two arrays
            const branch1 = points.slice(cut1 + 1, cut2 + 1);
            const branch2 = points.slice(cut2 + 1).concat(points.slice(0, cut1 + 1));

            return [branch1, branch2];
        }

        function poly2svg({
            doDeltaArc, //do delta arc only, do not try area,
        }){
            const rgXX = doDeltaArc ? rgDq : rgX;
            //rgX = approxer-[sample]
            //rgDq = orbitdq-[sample]

            // called way too much on page load
            // once for each orbit from creates_orbitRack above
            // then once each from media-upcreate at which point the model becomes visible
            // then 4 more times from media-upcreate for no reason
            // console.log('poly2svg: ' + rgXX.rgId);

            // defines conic
            var curvePoints = ownrange2points({
                stepsCount:800,
                doDeltaArc
            });
            // scales up conic
            var medpoints = curvePoints.map( cp => ssF.modpos2medpos( cp, stdMod ) );

            // defines segment of conic
            if(op.highlightSeg) {
                var segPoints = ownrange2points_byStartEnd({
                    stepsCount:800,
                    start: op.segStart,
                    end: op.segEnd
                });
                segPoints = segPoints.map( sp => ssF.modpos2medpos( sp, stdMod ) );
            }

            if( -1 === op.conicSignum ) {
                // draw hyperbola as two svg curves so asymptotes don't show
                const [branchA, branchB] = splitAtAsymptotes(medpoints);

                var polylineSvgA = rgXX.polylineSvgA = nssvg.polyline({
                    pivots  : branchA,
                    svgel   : rgXX.polylineSvgA,
                    parent  : stdMod.medScene,
                });
                if( !has( rgXX, 'polylineSvgA$' ) ) {
                    rgXX.polylineSvgA$ = $$.$( polylineSvgA );
                }
                rgXX.polylineSvgA$.removeClass( 'hidden' );
                rgXX.polylineSvgA$.addClass( 'tostroke thickable tp-' + lowname );

                var polylineSvg = rgXX.polylineSvg = nssvg.polyline({
                    pivots  : branchB,
                    svgel   : rgXX.polylineSvg,
                    parent  : stdMod.medScene,
                });
                if( !has( rgXX, 'polylineSvg$' ) ) {
                    rgXX.polylineSvg$ = $$.$( polylineSvg );
                }
                rgXX.polylineSvg$.addClass( 'tostroke thickable tp-' + lowname );
            } else {
                // draw ellipse/parabola in svg
                var polylineSvg = rgXX.polylineSvg = nssvg.polyline({
                    pivots  : medpoints,
                    svgel   : rgXX.polylineSvg,
                    parent  : stdMod.medScene,
                });
                if( !has( rgXX, 'polylineSvg$' ) ) {
                    rgXX.polylineSvg$ = $$.$( polylineSvg );
                }
                rgXX.polylineSvg$.addClass( 'tostroke thickable tp-' + lowname );
                if( rgXX.polylineSvgA$ ) {
                    rgXX.polylineSvgA$.addClass( 'hidden' );
                }
            }

            //arc does not have area
            //"no more dq below" ...
            if( doDeltaArc ) return;

            //------------------------------------------------------
            // //\\ adds area to orbit or orbit-sample
            //------------------------------------------------------
            let rgA = rg[ areaName ]; //areaName = orbitarea-[sample]
            let areaSvg = rgA.areaSvg = nssvg.polyline({
                pivots  : medpoints,
                svgel   : rgA.areaSvg,
                parent  : stdMod.medScene,
                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });

            if( !has( rgA, 'areaSvg$' ) ) {
                rgA.areaSvg$ = $$.$( areaSvg );
            }

            rgA.areaSvg$
                .addClass( 'tofill tp-'+areaName )
                .tgcls( 'undisplay', rgA.undisplay );
            //------------------------------------------------------
            // \\// adds area to orbit or orbit-sample
            //------------------------------------------------------
        }

        function protectedQ( q ) {
            if( Math.abs( q - op.SINGULARITY_ANGLE ) < op.ANGLE_BOUNDARY ) {
                ////avoids singularity
                q = q < 0 ? -op.UPPER_BOUNDARY : op.UPPER_BOUNDARY;
            }
            return q;
        }
    }

    /// sets a,b,c,lambda, excentricity for op from excentricity and op.latus
    function establishesEccentricity(
        //latus is used from op.latus and
        //only to set op.B, op.A, op.C

        eccentricity,
        doAdjustLatus,  //optional, changes the latus, must be "falsy" if vop is present
        vop             //variable op, for case additional orbit is drawn
    ){
        //possibly called 6x on page load (3x per conic)
        //and any time Pv/pv are dragged (only for appropriate conic)
        //and once more per conic when switching tabs
        //console.log('e: ' + eccentricity);

        var op = vop || sconf.orbitParameters;
        var rgP = vop ? rg.p : rg.P;
        var SAFE_VALUE = 1e-8;
        op.ANGLE_BOUNDARY = SAFE_VALUE;

        //protects against parabola case by making conic ellipse
        if( ( eccentricity === 1 || eccentricity < 1 ) && eccentricity > 1-SAFE_VALUE ) {
            eccentricity = 1-1.2*SAFE_VALUE;
        }
        op.conicSignum = eccentricity >= 1 ? -1 : 1;

        if( doAdjustLatus ) {
            op.latus = Math.abs( rgP.abs *
                ( 1 - eccentricity * Math.cos( rgP.q ) ) );
        }
        op.eccentricity = eccentricity;

        //// orbit parameters,
        //// derived from eccentricity and latus
        op.lambda2      = Math.abs( 1 - op.eccentricity*op.eccentricity );
        op.lambda       = Math.sqrt( op.lambda2 );
        //if( op.conicSignum === 0 || op.conicSignum === -1 ) {
        if( op.conicSignum === -1 ) {
            ////hyperbola
            op.SINGULARITY_ANGLE    = Math.acos(1/op.eccentricity);
            op.LOW_BOUNDARY         = op.SINGULARITY_ANGLE - op.ANGLE_BOUNDARY;
            op.UPPER_BOUNDARY       = op.SINGULARITY_ANGLE + op.ANGLE_BOUNDARY;
        }
        //for backward compatibility:
        //var ellipseType  = Math.sign( 1 - op.eccentricity );
        op.B            = op.latus / op.lambda;
        op.A            = op.B / op.lambda;
        op.C            = op.A * op.eccentricity;
        !vop && eccentricity2sliderPos();
    }

    ///decorates media
    function eccentricity2sliderPos()
    {
        if( !has( rg, 'ZetaEnd' ) ) return;
        var scale = rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0];
        var zeta = Math.atan( op.eccentricity );
        rg.Zeta.pos[0] = zeta / (Math.PI / 2) * scale + rg.ZetaStart.pos[0];
        rg.ZetaCaption.pos[0] = rg.Zeta.pos[0];
        rg.ZetaCaption.caption = op.eccentricity.toFixed(3);
    }

    //what this comment is about?
    //this function does not change eccentricity (except SAFE_VALUE case),
    //mostly just flips model from ellipse to hyperbola based on e
    //console.log('newEccentricity: ' + eccentricity.toFixed(3));
})();
