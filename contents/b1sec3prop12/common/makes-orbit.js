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
    var sop = sn( 'sampleOrbitParameters', sconf );
    return;













    //analogy of
    //function  pointsArr_2_singleDividedDifferences()
    function creates_orbitRack( vop )
    {
        var op                         = vop || sconf.orbitParameters;
        op.protectedQ                  = protectedQ;
        op.posQ_2_andgleInPIandMinusPI = posQ_2_andgleInPIandMinusPI;
        op.qStart                      = -Math.PI;
        op.qEnd                        = Math.PI;

        var rgP         = vop ? rg.p : rg.P;

        //:only css names
        var curveName   = vop ? 'orbit-sample' : 'orbit';

        //both: css and rg names
        var dqName      = vop ? 'orbitdq-sample' : 'orbitdq';
        var areaName    = vop ? 'orbitarea-sample' : 'orbitarea';

        var lowname     = curveName; //sDomF.topicIdUpperCase_2_underscore( curveName );
        var dqlowname   = dqName; //sDomF.topicIdUpperCase_2_underscore( dqName );

        var rgX         = vop ? rg[ 'approximated-curve-sample' ] : rg[ 'approximated-curve' ];
        var rgDq        = rg[ dqName ]; //"twin-object" for rgX

        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );
        rgDq.polylineSvg = haz( rgX, dqName );

        //rg[ 'approximated-curve' ] will have these properties:
        var result = {
                t2xy, // f : x |-> rr, rr is in |R^2
                //trange2points,
                poly2svg,
        };
        Object.assign( rgX, result );
        Object.assign( rgDq, result );
        poly2svg({});
        return result;


        ///param t to [x,y]
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
            if( fconf.effId === "b1sec3prop14" ) {
                if( op.conicSignum === -1 && Math.abs( rgP.q ) < op.SINGULARITY_ANGLE ) {
                    ////in this proposition, we keep position P = constant, so
                    ////do invert signedRo for opposite branch of hyperbola,
                    ////alternatively: signedRo = Math.abs( signedRo );
                    signedRo = -signedRo;
                }
            }
            */
            if( op.conicSignum === -1 && Math.abs( rgP.q ) < op.SINGULARITY_ANGLE ) {
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

        ///draws full orbit for t in [0,2PI)
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


        function poly2svg({
            doDeltaArc, //do delta arc only, do not try area,
        }){
            const rgXX = doDeltaArc ? rgDq : rgX;
            //rgX = approximated-curve-[sample]
            //rgDq = orbitdq-[sample]
            var curvePoints         = ownrange2points({ stepsCount:800, doDeltaArc });
            var medpoints           = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
            var polylineSvg         = rgXX.polylineSvg = nssvg.polyline({
                pivots  : medpoints, 
                svgel   : rgXX.polylineSvg,
                parent  : stdMod.svgScene,
                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            if( !has( rgXX, 'polylineSvg$' ) ) {
                rgXX.polylineSvg$ = $$.$( polylineSvg );
            }
            //##tp-machine
            rgXX.polylineSvg$.addClass( 'tostroke thickable tp-' +
                                         (doDeltaArc ? dqlowname : lowname) );
                                         //rgDq has tp - dqlowname, rgXX has tp - lowname
            //arc does not have area
            //"no more dq below" ...
            if( doDeltaArc ) return;

            let rgA = rg[ areaName ]; //areaName = orbitarea-[sample]
            let areaSvg = rgA.areaSvg = nssvg.polyline({
                pivots  : medpoints,
                svgel   : rgA.areaSvg,
                parent  : stdMod.svgScene,
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
        }

        function protectedQ( q ) {
            if( Math.abs( q - op.SINGULARITY_ANGLE ) < op.ANGLE_BOUNDARY ) {
                ////avoids singularity
                q = q < 0 ? -op.UPPER_BOUNDARY : op.UPPER_BOUNDARY;
            }
            return q;
        }

        ///converts position of Q-handle to Q-angle
        function posQ_2_andgleInPIandMinusPI( newPos )
        {
            var sing = op.SINGULARITY_ANGLE;
            var probe = Math.atan2( newPos[1], newPos[0] ) - op.mainAxisAngle;
            //normalizes
            probe = ( probe + Math.PI*6 ) % ( Math.PI*2 );
            probe > Math.PI ? probe - 2*Math.PI : probe;
            return probe;
        }
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



    /// sets a,b,c,lambda, excentricity for op from excentricity and op.latus
    function establishesEccentricity(
        //latus is used from op.latus and
        //only to set op.B, op.A, op.C

        eccentricity,
        doAdjustLatus,  //optional, changes the latus, must be "falsy" if vop is present
        vop             //variable op, for case additional orbit is drawn
    ){
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

}) ();

