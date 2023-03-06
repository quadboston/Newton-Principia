( function() {
    var {
        sn, $$, has, mat, mcurve, nspaste,
        fconf, sData,
        amode, stdMod, sconf, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            completesSlidersCreation,
            drop8pointE,
        },
    });
    var op = sn( 'orbitParameters', sconf );
    return;













    function completesSlidersCreation()
    {
        var op = sconf.orbitParameters;


        //=========================================================================
        // //\\ curve pivots sliders
        //=========================================================================
        var nsp = rg.nonSolvablePoint;
        var pivs = sconf.originalPoints.curvePivots;

        pivs.forEach( (cp,cpix) => {

            //recall that pos is in sync by reference:
            //sconf.pname2point[ pname ] = rgX.pos
            var pos1 = rg[ 'curvePivots-' + cpix ].pos;
            var stashedPos = null;

            cp.rgX.processOwnDownEvent = () => {
                stashedPos = [ pos1[0], pos1[1] ];
            };

            cp.rgX.processOwnUpEvent = () => {
                nsp.undisplay = true;
            };

            cp.rgX.acceptPos = newPos => {
                var REPELLING_DISTANCE = 0.01;
                var returnValue = true;
                //--------------------------------------------------------------
                // //\\ preserves pivot's order along x and being them too close
                //      to each other; note: order is reverse to axis x order,
                //--------------------------------------------------------------
                var previousPoint = cpix-1;
                var nextPoint = cpix+1;
                var nextPoint = (nextPoint === pivs.length ) ? null : nextPoint;
                var previousPoint = (previousPoint < 0 ) ? null : previousPoint;
                if(
                    (
                        previousPoint !== null &&
                        pivs[previousPoint].rgX.pos[1] <= newPos[1] + REPELLING_DISTANCE
                    ) ||
                    (
                        nextPoint !== null &&
                        pivs[nextPoint].rgX.pos[1] >= newPos[1] - REPELLING_DISTANCE
                    ) ||
                    newPos[1] < 0.3 //forbids distances too cloose to source of the force
                ){
                    returnValue = false;
                }
                //--------------------------------------------------------------
                // \\// preserves pivot's order along x and being them too close
                //--------------------------------------------------------------
                if( returnValue ) {
                    //calculates new curve
                    pos1[0] = newPos[0];
                    pos1[1] = newPos[1];
                    stdMod.pointsArr_2_singleDividedDifferences(
                        false, 'force', false, false, 'swap' );
                    let { solvable, fr } = stdMod.forceIsBounded(
                        rg[ 'approximated-curve' ].curvePoints );
                    if( solvable ) {
                        nsp.undisplay = true;
                    } else {
                        nsp.pos[0] = fr[0];
                        nsp.pos[1] = fr[1];
                        nsp.undisplay = false;
                    }
                    returnValue = !!solvable;
                }
                returnValue = returnValue && drop8pointE();
                if( returnValue ) {
                    stashedPos = [ pos1[0], pos1[1] ];
                } else {
                    pos1[0] = stashedPos[0];
                    pos1[1] = stashedPos[1];
                    stdMod.pointsArr_2_singleDividedDifferences(
                        false, 'force', false, false, 'swap' );
                }
                return returnValue;
            };
        });
        //=========================================================================
        // \\// curve pivots sliders
        //=========================================================================




        //=========================================================================
        // //\\ instant point's "r"
        //=========================================================================
        rg.D.acceptPos = ( newPos, dragMove ) => {
            var { theorion, aspect, submodel, subessay } = amode;
            //var stash = [ newPos[0], newPos[1] ];
            var inc = pointEisIncluded( newPos[1] );
            inc = inc && newPos[1] < rg.V.pos[1];
            newPos[0] = rg.D.pos[0];
            return inc;
        };
        //=========================================================================
        // \\ instant point's "r"
        //=========================================================================


        //=========================================================================
        // //\\  body speed slider
        //=========================================================================
        rg.v.processOwnDownEvent = function() {
            ////apparently, there is no arg at this version,
            ////            and useless "function.this" === rg.Q
            const pp                    = rg.V.pos;
            sData.vbpos                 = nspaste( [], rg.v.pos );
            var dShift                  = [ sData.vbpos[0] - pp[0], sData.vbpos[1] - pp[1] ];
            var dS                      = Math.sqrt(
                                          dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            sData.stashedOmega          = Math.sin( op.angleOmega ); //op.om;
            sData.stashedCosOmega       = Math.cos( op.angleOmega ); //op.cosOmega;
            sData.dShift                = dS;
            sData.Kepler_v_stashed      = op.Kepler_v;
            sData.stashedR              = rg.V.abs;
        };

        rg.v.acceptPos = ( newPos, dragMove ) => {
            var { theorion, aspect, submodel, subessay } = amode;
            var newPos0  = dragMove[0] + sData.vbpos[0];
            var newPos1  = -dragMove[1] + sData.vbpos[1];
            //-------------------------------------------------------------------
            // //\\ prevents angle from falling > PI/2+eps
            //-------------------------------------------------------------------
            var angleOmega_stashed = op.angleOmega;
            var Kepler_v_stashed = op.Kepler_v
            var returnValue = true;

            var PROTECTS_KERNEL_SINGULARITY = 0.05;
            //if( aspect !== 'model' ) {
                const pp      = rg.V.pos;
                const sl      = mat.p1_to_p2( pp, newPos ); //slider
                if( sl.abs < 0.1 ) return;
                let angleOmega = mat.angleBetweenLines([
                    [ [0,0], pp ],
                    [ [0,0], sl.vector ], 
                ]).angle;
                if( angleOmega < Math.PI/2+PROTECTS_KERNEL_SINGULARITY ) {
                    ///restricst speed to single quadrant
                    angleOmega = Math.PI/2+PROTECTS_KERNEL_SINGULARITY;
                    var returnValue = false;
                } else {
                    op.angleOmega = angleOmega;
                }
            //}
            //-------------------------------------------------------------------
            // \\// prevents angle from falling > PI/2+eps
            //-------------------------------------------------------------------
            if( !returnValue ) return;

            var dShift   = [ newPos0 - rg.V.pos[0], newPos1 - rg.V.pos[1] ];
            var dS       = Math.sqrt( dShift[0]*dShift[0] + dShift[1]*dShift[1] );
            var increase = dS / sData.dShift;
            var Kepler_v = sData.Kepler_v_stashed * increase;
            op.Kepler_v  = Kepler_v;

            returnValue = drop8pointE();

            if( !returnValue ) {
                ////reverts speed back,
                ////integral by f cannot build such big value of v
                op.Kepler_v = Kepler_v_stashed;
                op.angleOmega = angleOmega_stashed;
                stdMod.quadratures();
            }
            return returnValue;
        }
        //=========================================================================
        // \\// body speed slider
        //=========================================================================
    }


    ///checks E,
    ///does not rebuild quadSolved
    function pointEisIncluded( DposY )
    {
        DposY = DposY || DposY === 0 ? DposY : rg.D.pos[1];
        let xy = rg[ 'approximated-curve' ].curvePoints;
        let endIx = sData.quadSolved.roMinusIx===null ? xy.length-1 : 
                    sData.quadSolved.roMinusIx;
        let roEnd = xy[endIx][1];
        let EposY = DposY - sconf.dRo;
        let included = EposY > roEnd;
        return included;
    }

    /*
    function setsOmegaHandle( angleOmega, sliderAbs )
    {
        const pp = rg.V.pos;
        const up = mat.unitVector( pp ).unitVec;
        const rv = mat.rotatesVect( up, angleOmega );
        const np = mat.sm( pp, sliderAbs, rv ); //A,b,B
        nspaste( rg.omegaHandle.pos, np );
    }
    */

    function drop8pointE()
    {
        stdMod.quadratures();
        return pointEisIncluded();
    }


}) ();

