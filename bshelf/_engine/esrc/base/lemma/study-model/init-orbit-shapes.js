/*  ********************************************************************
 *  Calculates a set of points along a conic based on the
 *  given orbit parameters and adds them as svgs paths in the model.
 *
 *  NOTE: This module is used for Propositions 12-17. There are
 *  others currently used for P6-11, L20-21, and P41. Though this
 *  one can be used to draw any conic (ellipse, parabola,
 *  hyperbola w/out asymptotes) as needed.
 *
 * ************************************************************************/
(function(){
const {  sn, $$, nssvg, has, haz, mat, mcurve, stripp,
         nsmethods, fconf, ssF, stdMod, sconf, rg,
      }= window.b$l.atree({ stdModList: {
         init__borbitTripleShapes,
         establishesEccentricity,
}});
return;


///executes one-time at app launch at init-sapp.js
///for different orbPars,
///creates
///         dyn_q2xy,
///         gshape2svg,
///as properties of rg[ dqName ] and rg[ rgn ]
function init__borbitTripleShapes( orbPars ){
    //camel to snake
    const c2s = nsmethods.camelName2cssName;
    //------------------------------------------
    // //\\ defaults
    //------------------------------------------
    //options are provided from orbPars for sample or
    //from sconf.orbitParameters for orbit,
    var op = orbPars;
    op.body = op.body || 'P';
    var rgn = op.rgn;
    var dqName = op.dqName;
    var areaName = op.areaName;
    var tpname  = c2s('tp-' + rgn);
    var tpname_dq  = dqName ? c2s('tp-' + dqName) : null;
    var tp_areanmae = areaName ? c2s('tp-' + areaName): null;
    //------------------------------------------
    // \\// defaults
    //------------------------------------------

    var rgBody = rg[ op.body ];
    op.protectedQ = protectedQ;
    // specify these in orbPars to draw segment, otherwise
    // full ellpse will be drawn
    // these vals are used here & graph-array
    op.qStart = op.qStart ? op.qStart: -Math.PI;
    op.qEnd = op.qEnd ? op.End: Math.PI;
    //must already exist:
    var rgX = rg[ rgn ];
    var rgDq = dqName ? rg[ dqName ] : null; //"twin-object" for rgX
    {   const result = {
            dyn_q2xy, // f : q |-> rr, rr is in |R^2
            gshape2svg: poly2svg,
        };
        Object.assign( rgX, result );
        rgDq && Object.assign( rgDq, result );
    }
    poly2svg();
    return;

    // algorithm: q -> conic in polar coordinates -> cartesian [x,y]
    // also called from other modules to determine position
    // of specified points,
    function dyn_q2xy(
        //inner parameter for conics, usually angle,
        //aka below poz.x =
        //  signedRo * Math.cos( q + op.mainAxisAngle );
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
            if( op.conicSignum === -1 && Math.abs( rgBody.q ) <
                op.SINGULARITY_ANGLE ) {
                ////in this proposition, we keep position P = constant, so
                ////do invert signedRo for opposite branch of hyperbola,
                ////alternatively: signedRo = Math.abs( signedRo );
                signedRo = -signedRo;
            }
        }
        */
        if( op.conicSignum === -1 && Math.abs( rgBody.q ) < op.SINGULARITY_ANGLE ) {
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

    ///draws curve arc for q in [qStart,qEnd)
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
            newpoints.push( dyn_q2xy( q ) );
        }
        return newpoints;
    }

    ///draws full orbit for angle q in [0,2PI)
    //returns unclosed curve with end point =/= first point exactly
    function ownrange2points({ stepsCount, doDeltaArc })
    {
        if( doDeltaArc ) {
            var qStart = rgBody.q;
            var qEnd = rgBody.q + op.sagittaDelta_q;
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
            points.push( dyn_q2xy( q ) );
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

    function poly2svg(arg){const {
        doDeltaArc //do delta arc only, do not try area,
    }=stripp(arg)
        const rgXX = doDeltaArc ? rgDq : rgX;
        var curvePoints = ownrange2points({
            stepsCount:800,
            doDeltaArc
        });
        // scales up conic
        var medpoints = curvePoints.map( cp =>
            ssF.modpos2medpos( cp, stdMod ) );
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
            rgXX.polylineSvgA$.addClass( 'tostroke thickable ' + tpname );

            nssvg.polyline({
                rgX: rgXX,
                pivots  : branchB,
                svgel   : rgXX.svgel,
                parent  : stdMod.medScene,
            });
            var tpnameFinal = doDeltaArc ? tpname_dq : tpname;
            rgXX.svgel$.addClass( 'tostroke thickable ' +
                        tpnameFinal );
        } else {
            // draw ellipse/parabola in svg
            nssvg.polyline({
                rgX: rgXX,
                pivots  : medpoints,
                svgel   : rgXX.svgel,
                parent  : stdMod.medScene,
            });
            var tpnameFinal = doDeltaArc ? tpname_dq : tpname;

            let cls = nsmethods.stripsExtraSpace( tpnameFinal +
                (rgXX.cssClass? ' '+rgXX.cssClass:'') );
            rgXX.svgel$.cls( cls );
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
        if( areaName ) {
            let rgA = rg[ areaName ];
            nssvg.polyline({
                rgX: rgA,
                pivots: medpoints,
                svgel: rgA.svgel,
                parent: stdMod.medScene,
            });
            rgA.svgel$.addClass('tofill ' + tp_areanmae +
                (rgA.cssClass ? ' '+rgA.cssClass : ''));
            if( has( rgA.undisplay )){
                rgA.svgel$.tgcls( 'undisplay', rgA.undisplay );
            }
        }
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

///sets a,b,c,lambda, excentricity for op from
///excentricity and op.latus
function establishesEccentricity(
    //latus is used from op.latus and
    //only to set op.B, op.A, op.C

    eccentricity,

    //optional, changes the latus, must be
    //"falsy" if orbPars is present
    doAdjustLatus,

    //variable op,
    //for case additional orbit is drawn
    orbPars
){
    //possibly called 6x on page load (3x per conic)
    //and any time Pv/pv are dragged (only for appropriate conic)
    //and once more per conic when switching tabs
    //console.log('e: ' + eccentricity);

    var op = orbPars || sconf.orbitParameters;
    var rgBody = rg[ op.body ];
    var SAFE_VALUE = 1e-8;
    op.ANGLE_BOUNDARY = SAFE_VALUE;

    //protects against parabola case by making conic ellipse
    if( ( eccentricity === 1 || eccentricity < 1 ) && eccentricity > 1-SAFE_VALUE ) {
        eccentricity = 1-1.2*SAFE_VALUE;
    }
    op.conicSignum = eccentricity >= 1 ? -1 : 1;

    if( doAdjustLatus ) {
        op.latus = Math.abs( rgBody.abs *
            ( 1 - eccentricity * Math.cos( rgBody.q ) ) );
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
    op.B = op.latus / op.lambda;
    op.A = op.B / op.lambda;
    op.C = op.A * op.eccentricity;
    !orbPars && eccentricity2sliderPos();
}

///decorates media,
///only for default sconf.orbitParameters
function eccentricity2sliderPos (){
    if( !has( rg, 'ZetaEnd' ) ) return;
    var op = sconf.orbitParameters;
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
