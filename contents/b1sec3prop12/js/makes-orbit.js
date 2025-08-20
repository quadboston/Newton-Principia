( function() {
    var {
        $$, nssvg, has, haz, ssF,
        stdMod, sconf, rg,
    } = window.b$l.apptree({ stdModExportList : {
            creates_orbitRack,
            establishesEccentricity,
        },
    });
    return;


    //called from init-model-parameters.js
    //analogy of pointsArr_2_singleDividedDifferences()
    function creates_orbitRack( vop )
    {
        //console.log('creates_orbitRack'); 

        var op = vop || sconf.orbitParameters;
        op.qStart = -Math.PI; // these vals are used here & graph-array
        op.qEnd = Math.PI;

        //:only css names
        var curveName   = vop ? 'orbit-sample' : 'orbit';

        //both: css and rg names
        var dqName      = vop ? 'orbitdq-sample' : 'orbitdq';
        var lowname     = curveName; //sDomF.topicIdUpperCase_2_underscore( curveName );
        var rgX         = vop ? rg[ 'approximated-curve-sample' ] : rg[ 'approximated-curve' ];
        var rgDq        = rg[ dqName ]; //"twin-object" for rgX

        //prevents leaks polylineSvg from js-prototype
        rgX.polylineSvg = haz( rgX, 'polylineSvg' );
        rgDq.polylineSvg = haz( rgX, dqName );

        //rg[ 'approximated-curve' ] will have these properties:
        var result = {
                t2xy, // f : x |-> rr, rr is in |R^2
                poly2svg,
        };
        Object.assign( rgX, result );
        Object.assign( rgDq, result );
        //poly2svg({}); //unnecessary, called a million times from media-upcreate 
        return result;


        // param q (angle) to [x,y] point on conic
        // todo: rename? what is t? 
        // also called from other modules to determine position of specified points
        function t2xy( q ){

            //denomenator
            var den = 1 - op.eccentricity * Math.cos(q);
            if( den === 0 ) {
                den = 1e-20; // avoid singularity (can't divide by zero)
            }

            // radial distance
            var r = op.latus / den;

            var x = r * Math.cos( q + op.mainAxisAngle );
            var y = r * Math.sin( q + op.mainAxisAngle );
            return [ x, y ];
        }

        ///draws full orbit for angle q in [0,2PI)
        //returns unclosed curve with end point =/= first point exactly
        function ownrange2points({ stepsCount })
        {
            var points = [];
            var qStep = ( op.qEnd - op.qStart ) / stepsCount;
            for( var qix = 0; qix<=stepsCount; qix++ ) {
                var q = op.qStart + qStep * qix;        
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

        function poly2svg() {
            const rgXX = rgX;

            // called way too much on page load
            // once for each orbit from creates_orbitRack above
            // then once each from media-upcreate at which point the model becomes visible
            // then 4 more times from media-upcreate for no reason
            // console.log('poly2svg: ' + rgXX.rgId);
            
            var curvePoints = ownrange2points({ stepsCount:800 }); // defines conic
            var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) ); // scales up conic
            if( -1 === op.conicSignum ) {               
                // draw hyperbola as two svg curves so asymptotes don't show
                const [branchA, branchB] = splitAtAsymptotes(medpoints); 

                var polylineSvgA = rgXX.polylineSvgA = nssvg.polyline({
                    pivots  : branchA, 
                    svgel   : rgXX.polylineSvgA,
                    parent  : stdMod.svgScene,
                });                
                if( !has( rgXX, 'polylineSvgA$' ) ) {
                    rgXX.polylineSvgA$ = $$.$( polylineSvgA );
                }
                rgXX.polylineSvgA$.removeClass( 'hidden' );
                rgXX.polylineSvgA$.addClass( 'tostroke thickable tp-' + lowname );

                var polylineSvg = rgXX.polylineSvg = nssvg.polyline({
                    pivots  : branchB, 
                    svgel   : rgXX.polylineSvg,
                    parent  : stdMod.svgScene,
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
                    parent  : stdMod.svgScene,
                });
                if( !has( rgXX, 'polylineSvg$' ) ) {
                    rgXX.polylineSvg$ = $$.$( polylineSvg );
                }
                rgXX.polylineSvg$.addClass( 'tostroke thickable tp-' + lowname );
                if( rgXX.polylineSvgA$ ) {
                    rgXX.polylineSvgA$.addClass( 'hidden' );
                }
            }
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
        //called 6x on page load (3x per conic)
        //and any time Pv/pv are dragged (only for appropriate conic)
        //and once more per conic when switching tabs
        //console.log('e: ' + eccentricity);
        
        var op = vop || sconf.orbitParameters;
        var rgP = vop ? rg.p : rg.P;
        var SAFE_VALUE = 0.02;
        op.ANGLE_BOUNDARY = SAFE_VALUE;

        // Determine conic type
        if (eccentricity < 1 - SAFE_VALUE) {
            op.conicSignum = 1; // ellipse
        } else if (Math.abs(eccentricity - 1) < SAFE_VALUE) {
            eccentricity = 0.9999;
            op.conicSignum = 0; // parabola
        } else {
            op.conicSignum = -1; // hyperbola  
        }
        
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
        
        // todo: is there a better place for this?
        // draws value on e slider
        function eccentricity2sliderPos()
        {
            if( !has( rg, 'ZetaEnd' ) ) return;
            var scale = rg.ZetaEnd.pos[0] - rg.ZetaStart.pos[0];
            var zeta = Math.atan( op.eccentricity );
            rg.Zeta.pos[0] = zeta / (Math.PI / 2) * scale + rg.ZetaStart.pos[0];
            rg.ZetaCaption.pos[0] = rg.Zeta.pos[0];
            rg.ZetaCaption.caption = op.eccentricity.toFixed(3);
        }

        //this function does not change eccentricity (except SAFE_VALUE case), 
        //mostly just flips model from ellipse to hyperbola based on e
        //console.log('newEccentricity: ' + eccentricity.toFixed(3)); 
    }


}) ();

