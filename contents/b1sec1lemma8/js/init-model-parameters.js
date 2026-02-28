( function() {
    var {
        sn, mat, nspaste,
        sconf, fconf, ssD, sDomF, sData,
        stdMod, toreg, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_lemma,
        },
    });


    function init_lemma()
    {
        //---------------------------------------------
        // //\\ saves originals for lemma 8
        //---------------------------------------------
        // defined in sconf.js, factor to determine distance between B and b
        let b2B = sconf.b_per_B_original;

        nspaste( rg.b.pos, [ rg.B.pos[0] * b2B, rg.B.pos[1] * b2B ] );
        let D = rg.D.pos;
        let B = rg.B.pos;
        rg['imageOfR,imageOfD'].originalDirection = [ D[0]-B[0], D[1]-B[1], ];
        let R = mat.linesCross(
            rg['imageOfR,imageOfD'].originalDirection,
            B,         //start-1
            [ 0, -1],  //direction-2'
            rg.A.pos,  //start-2'
        );
        nspaste( rg.R.pos, R );
        rg.r.pos[0] = rg.R.pos[0] * b2B;
        rg.r.pos[1] = rg.R.pos[1] * b2B;
        rg.d.pos[0] = rg.D.pos[0] * b2B;
        rg.d.pos[1] = rg.D.pos[1] * b2B;
        nspaste( rg.imageOfR.pos, rg.r.pos );
        nspaste( rg.imageOfD.pos, rg.d.pos );

        rg.B.originalPos = [];
        nspaste( rg.B.originalPos, rg.B.pos );
        rg.D.originalPos = [];
        nspaste( rg.D.originalPos, rg.D.pos );
        rg.R.originalPos = [];
        nspaste( rg.R.originalPos, rg.R.pos );
        //---------------------------------------------
        // \\// saves originals for lemma 8
        //---------------------------------------------

        ssD.curveStartInitialPos = nspaste( {}, rg.curveStart.pos );
        ssD.curveEndInitialPos = nspaste( {}, rg.curveEnd.pos );

        //-------------------------------------------------
        // //\\ dragger B
        //-------------------------------------------------
        //ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        //apparently this is a vitual master parameter of B along x,
        //the parctical position of B obtains by rotation of line AL,
        //by angle = rg.curveRotationAngle.angle =
        //           fullAngle - rg.originalGapTangent.angle;
        //apparently, this is an original-unrotated-parameter-X mapped to
        //rg.originalGapTangent.angle which is not 0 and mapped to
        //rotational angle = 0,
        //rg.B.unrotatedParameterX = rg.B.pos[0]*1.02;
        //ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
        rg.B.processOwnDownEvent = function() {
            sData.unrotatedParameterX = rg.B.unrotatedParameterX;
            sData.RB_slope = [ rg.B.pos[0] - rg.R.pos[0], rg.B.pos[1] - rg.R.pos[1] ];
        };
        sDomF.rgx2draglist({
            stdMod,
            shpid : 'B',
            acceptPos : ( newPos ) =>
            {
                var ach = rg.B.achieved;
                var new_unrotatedParameterX = newPos[0];
                var cfun = ssD.repoConf[ssD.repoConf.customFunction].fun;
                var cpos = cfun( new_unrotatedParameterX );


                //patch: instead of fixing arc-Ab calculations properly,
                //       this code-fragment restricts area where this arc miscalculated:
                if( new_unrotatedParameterX < 0.0065 ) {
                    new_unrotatedParameterX = 0.0065;
                }

                ////implements team agreed feature of preventing point B
                ////entering area above line AL for core essays
                const angleBAM = mat.angleBetweenLines([
                  [rg.A.pos, cpos ],
                  [rg.A.pos, rg.L.pos],
                ]).angle

                ///prevents user from playing with too big curves
                if( new_unrotatedParameterX > rg.curveEnd.pos[0] * 0.95 ) {
                    new_unrotatedParameterX = rg.curveEnd.pos[0] * 0.95;
                }

                rg.B.unrotatedParameterX = new_unrotatedParameterX;

                /*
                if( !user Options.s howingBonusFeatures() &&
                    fconf.sappId === "b1sec1lemma 8") {
                    nspaste( rg.R.pos, dir8innerB_2_R( sData.RB_slope ) );
                }
                */
                return true;
            }
        });
        //-------------------------------------------------
        // \\// dragger B
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ dragger R
        //-------------------------------------------------
        rg.R.processOwnDownEvent = function() {
            sData.unrotatedParameterX = rg.B.unrotatedParameterX;
            sData.RB_slope = [ rg.B.pos[0] - rg.R.pos[0], rg.B.pos[1] - rg.R.pos[1] ];
        };
        sDomF.rgx2draglist({
            shpid : 'R',
            acceptPos : ( newPos ) =>
            {
                // R can move along y axis only
                var ach = rg.R.achieved;
                newPos[0] = 0;
                if(
                    //patch: instead of fixing arc-Ab calculations properly,
                    //      this code-fragment restricts area where
                    //      this arc miscalculated:
                    newPos[1] > -0.01 ) {
                    newPos[1] = -0.01;
                } else if( newPos[1] < -1.5 ) {
                    newPos[1] = -1.5;
                }
                //prepares point B which implies new position of point R
                rg.B.unrotatedParameterX = sData.unrotatedParameterX * newPos[1]
                    / ach.achieved[1];
                if( rg.B.originalPos[0] * 1.1 < rg.B.unrotatedParameterX ) {
                    rg.B.unrotatedParameterX = rg.B.originalPos[0] * 1.1;
                }
                nspaste( newPos, dir8innerB_2_R( rg['imageOfR,imageOfD']
                    .originalDirection ) );
                return true;
                /*
                else {
                    // R cannot be moved right of B on x-axis
                    if(newPos[0] >= rg.B.pos[0] - 0.0001) {
                        return false;
                    }
                    // R cannot be higher than B on y-axis
                    if(newPos[1] >= rg.B.pos[1] - 0.1) {
                        return false;
                    }
                    return true;
                }
                */
            }
        });
        //-------------------------------------------------
        // \\// dragger R
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ dragger fi
        //-------------------------------------------------
        rg.fi.processOwnDownEvent = function() {
            sData.RB_slope = [ rg.B.pos[0] - rg.R.pos[0], rg.B.pos[1] - rg.R.pos[1] ];
        };
        sDomF.rgx2draglist({
            stdMod,
            shpid : 'fi',
            acceptPos : ( newPos ) =>
            {
                //-------------------------------------------------------------------
                // //\\ corrects approximate mouse point to exact point on the circle
                //-------------------------------------------------------------------
                var q = Math.atan2( newPos[1], newPos[0] );
                var posAbs = mat.unitVector( newPos ).abs;
                //sets handle
                newPos[0] = posAbs*Math.cos( q );
                newPos[1] = posAbs*Math.sin( q );
                //-------------------------------------------------------------------
                // \\// corrects approximate mouse point to exact point on the circle
                //-------------------------------------------------------------------
                nspaste( rg.R.pos, dir8innerB_2_R( sData.RB_slope ));
                return true;
            }
        });
        //-------------------------------------------------
        // \\// dragger fi
        //-------------------------------------------------

        //getting original gap tangent
        const orTan = rg.originalGapTangent = {};
        orTan.tangent = 0;
        orTan.angle = 0;
        mat.calculate_divided_differences(
            sconf.givenCurve_pivots_inModel
        );

        //sets angle as it is in original picture in lemma
        toreg( 'curveRotationAngle' )( 'angle', 0 );
        rg.curveRotationAngle.sin = Math.sin( rg.curveRotationAngle.angle );
        rg.curveRotationAngle.cos = Math.cos( rg.curveRotationAngle.angle );
        stdMod.createModelFunctions();

    }

    function dir8innerB_2_R( RB_slope ){
        //prepares point B which implies new position of point R
        //finds new point B
        let posB = ssD.repoConf[ssD.repoConf.customFunction]
            .fun( rg.B.unrotatedParameterX );
        ///finds new point R
        var newRpos = mat.linesCross(
            ///drags line from B along original direction to
            ///cross line A,f which becomes a new R
            RB_slope,
            posB,
            rg.fi.pos, // : rg.R.pos,
            rg.A.pos,
        );
        return newRpos;
    }
})();