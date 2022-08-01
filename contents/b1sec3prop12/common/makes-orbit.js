( function() {
    var {
        ss, $$, nssvg, has, haz, mat, mcurve,
        fconf, sDomF, ssF,
        stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            creates_orbitRack,
            posQ_2_andgleInPIandMinusPI,
            protectedQ,
            establishesEccentricity,
            eccentricity2pos,
            doAdjustEta,
        },
    });
    return;













    //analogy of
    //function pointsArr_2_singleDividedDifferences()
    function creates_orbitRack()
    {
        const fi0   = sconf.orbitParameters.qStart;

        var curveName = 'orbit';
        var areaName = 'orbitarea';
        var lowname = sDomF.topicIdUpperCase_2_underscore( curveName );
        var rgX = rg[ 'approximated-curve' ];
        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );

        //rg[ 'approximated-curve' ] will have these properties:
        var result = {
                t2xy, // f : x |-> rr, rr is in |R^2
                trange2points,
                poly2svg,
        };
        Object.assign( rgX, result );
        poly2svg({});
        return result;


        ///param t to [x,y]
        function t2xy(
            q //inner parameter for conics, usually angle
        ){
            var op = sconf.orbitParameters;
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
            if( fconf.effId === "b1sec3prop14" ) {
                if( op.conicSignum === -1 && Math.abs( rg.P.q ) < op.SINGULARITY_ANGLE ) {
                    ////in this proposition, we keep position P = constant, so
                    ////do invert signedRo for opposite branch of hyperbola,
                    ////alternatively: signedRo = Math.abs( signedRo );
                    signedRo = -signedRo;
                }
            }
            var x = signedRo * Math.cos( q + op.mainAxisAngle );
            var y = signedRo * Math.sin( q + op.mainAxisAngle );
            return [ x, y ];
        }

        ///draws curve arc for t in [qStart,qEnd)
        function trange2points({ qStart, qEnd, stepsCount, })
        {
            var newpoints = [];
            var op = sconf.orbitParameters;
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

        ///draws full orbit for t in [0,2PI)
        //returns unclosed curve with end point =/= first point exactly
        function ownrange2points({ stepsCount })
        {
            var op = sconf.orbitParameters;
            var points = trange2points({ qStart:op.qStart, qEnd:op.qEnd, stepsCount });
            //points[ points.length - 1 ] = points[ 0 ]; //does close the poly.
            return points;
        }


        function poly2svg(arg)
        {
            var curvePoints = ownrange2points({ stepsCount:800 });
            var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
            var polylineSvg = rgX.polylineSvg = nssvg.polyline({
                pivots  : medpoints, 
                svgel   : rgX.polylineSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            //##tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );
            /*
            var strokeWidth = haz( arg, 'stroke-width' );
            if( strokeWidth ) {
                polylineSvg.setAttribute( 'stroke-width', strokeWidth );
            }
            */

            var rgArea = rg[ areaName ];
            var areaSvg = rgArea.areaSvg = nssvg.polyline({
                pivots  : medpoints,
                svgel   : rgArea.areaSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            $$.$( areaSvg )
                .addClass( 'tofill tp-'+areaName )
                .tgcls( 'undisplay', rgArea.undisplay );
        }
    }



    ///converts position of Q-handle to Q-angle
    function posQ_2_andgleInPIandMinusPI( newPos )
    {
        var op = sconf.orbitParameters;
        var sing = op.SINGULARITY_ANGLE;
        var probe = Math.atan2( newPos[1], newPos[0] ) - op.mainAxisAngle;
        //normalizes
        probe = ( probe + Math.PI*6 ) % ( Math.PI*2 );
        probe > Math.PI ? probe - 2*Math.PI : probe;
        return probe;
    }


    function protectedQ( q ) {
        var op = sconf.orbitParameters;
        if( Math.abs( q - op.SINGULARITY_ANGLE ) < op.ANGLE_BOUNDARY ) {
            ////avoids singularity
            q = q < 0 ? -op.UPPER_BOUNDARY : op.UPPER_BOUNDARY;
        }
        return q;
    }


    function establishesEccentricity( eccentricity, doAdjustLatus )
    {
        var op = sconf.orbitParameters;
        var SAFE_VALUE = 1e-8;
        op.ANGLE_BOUNDARY = SAFE_VALUE;
        if( ( eccentricity === 1 || eccentricity < 1 ) && eccentricity > 1-SAFE_VALUE ) {
            eccentricity = 1-1.2*SAFE_VALUE;
            op.conicSignum === 0;
        } else {
            op.conicSignum = eccentricity >= 1 ? -1 : 1;
        }
        if( doAdjustLatus ) {
            op.latus = Math.abs( rg.P.abs *
                ( 1 - eccentricity * Math.cos( rg.P.q ) ) );
        }
        op.eccentricity = eccentricity;
        {
            //// orbit parameters,
            //// derived from eccentricity and latus
            op.lambda2      = Math.abs( 1 - op.eccentricity*op.eccentricity );
            op.lambda       = Math.sqrt( op.lambda2 );
            op.qStart       = -Math.PI;
            op.qEnd         = Math.PI;
            if( op.conicSignum === 0 || op.conicSignum === -1 ) {
                ////hyperbola or parabola
                op.SINGULARITY_ANGLE    = Math.acos(1/op.eccentricity);
                op.LOW_BOUNDARY         = op.SINGULARITY_ANGLE - op.ANGLE_BOUNDARY;
                op.UPPER_BOUNDARY       = op.SINGULARITY_ANGLE + op.ANGLE_BOUNDARY;
            }
            //for backward compatibility:
            //var ellipseType  = Math.sign( 1 - op.eccentricity );
            op.B            = op.latus / op.lambda;
            op.A            = op.B / op.lambda;
            op.C            = op.A * op.eccentricity;

            //gets ellipse parameters
            let ellB2       = op.B*op.B;
            let ellA2       = op.A*op.A;
        }
        stdMod.eccentricity2pos();
    }

    ///decorates media
    function eccentricity2pos()
    {
        if( !has( rg, 'ZetaEnd' ) ) return;
        var scale = rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0];
        var op = sconf.orbitParameters;
        var zeta = Math.atan( op.eccentricity );
        rg.Zeta.pos[0] = zeta / (Math.PI / 2) * scale + rg.ZetaStart.pos[0];
        rg.ZetaCaption.pos[0] = rg.Zeta.pos[0];
        rg.ZetaCaption.caption = op.eccentricity.toFixed(3);
    }

    function doAdjustEta( q, focusPos)
    {
        var op = sconf.orbitParameters;
        var { sinOmega, r, } = mcurve.planeCurveDerivatives({
            fun : rg[ 'approximated-curve' ].t2xy,
            q,
            rrc : focusPos,
        });
        var M = r * sinOmega;
        op.eta = M*M / op.latus;
    }


}) ();

