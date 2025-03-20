( function() {
    var {
        ns, sn, paste, mat, nspaste, userOptions,
        sconf, fconf, ssF, ssD, sDomF, sData,
        amode, stdMod, toreg, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
            model_upcreate,
        },
    });

    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        //---------------------------------------------
        // //\\ saves originals for lemma 8
        //---------------------------------------------
        let b2B = sconf.b_per_B_original;        
        nspaste( rg.b.pos, [ rg.B.pos[0] * b2B, rg.B.pos[1] * b2B ] );
        let D = rg.D.pos;
        let B = rg.B.pos;
        rg.rd.originalDirection = [ D[0]-B[0], D[1]-B[1], ];
        let R = mat.linesCross(
            rg.rd.originalDirection,
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

        ssD.curveStartInitialPos = ns.paste( {}, rg.curveStart.pos );
        ssD.curveEndInitialPos = ns.paste( {}, rg.curveEnd.pos );

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
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'B',
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
                
                if( !userOptions.showingBonusFeatures() && fconf.sappId === "b1sec1lemma8") {
                    nspaste( rg.R.pos, dir8innerB_2_R( rg.rd.originalDirection ) );
                }
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
        };

        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'R',
            acceptPos : ( newPos ) =>
            {
                var ach = rg.R.achieved;
                newPos[0] = 0;
                if(
                    //patch: instead of fixing arc-Ab calculations properly,
                    //       this code-fragment restricts area where this arc miscalculated:
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
                nspaste( newPos, dir8innerB_2_R( rg.rd.originalDirection ) );
                return true;
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
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'fi',
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

    ///****************************************************
    /// model scenario
    ///****************************************************
    function model_upcreate()
    {
        var dropLine = ssF.dropLine;
        var dropPoint = ssF.dropPoint;
        var dropPerpend = ssF.dropPerpend;

        if(
            amode.subessay === 'derivative' ||
            amode.subessay === 'sine derivative' ||
            amode.subessay === 'vector-derivative'
        ){
            //=====================================================
            // //\\ builds axes x,y, and origin 0, and their decors
            //=====================================================
            //finds [ 'axis-y_X_rd' ] === intersection of  axis-y and rd
            dropPerpend( 'axis-y_X_rd=ytop,r,d' );

            //below axis-y_X_rd, sets origin O, of axes-y and -x
            dropLine( 'O=1.3,ytop,axis-y_X_rd' );

            //builds axis-x
            rg[ 'xtop' ].pos = mat.pointPlusTVector( 1.5,
                                     rg[ 'axis-y_X_rd' ].pos, rg.d.pos, rg.O.pos )

            //beautifies axis Y by extending it to point i
            dropLine( 'ylow=1.1,ytop,O' );

            //beautifies axis-x by extending to point 'xlow'
            ns.paste( rg[ 'xlow' ].pos, mat.pointPlusTVector( 1.2, rg[ 'xtop' ].pos, rg.O.pos ) );

            //beautifies microscope-base line: shortens line rd
            dropLine( 'dr-decorpoint=0.25,r,d' );

            // //\\ N-microscope
            //drops perpendicular from A to line rd where "drop" denoted as X0
            dropPerpend( 'X0=A,r,d' );
            //X0 and Y do coinside in N-microscope
            dropPoint( "Y=X0" );
            //but for X we need to find b whic done below
            // \\// N-microscope
            //=====================================================
            // \\// builds axes x,y, and origin 0, and their decors
            //=====================================================

            if( amode.subessay === 'sine derivative' ){
                var OA = ssF.line2abs( 'OA' );
                ///establishes curve as a circle with raius R = |OA|
                ssD.repoConf[ ssD.repoConf.customFunction ].updateParams({
                    x0:rg.O.pos[0], y0:rg.O.pos[1], R:rg.OA.abs,
                });
            }

        } else if( amode.subessay === 'sin(x)/x' ){
            dropPoint( "L=d" );
            ssF.line2abs( 'Ar' );
            ///establishes curve as a circle with raius R = Ar
            ssD.repoConf[ ssD.repoConf.customFunction ].updateParams({
                x0:rg.r.pos[0], y0:rg.r.pos[1], R:rg.Ar.abs,
            });
        }

        ///does remaining case for lemma curve:
        ///builds lemma curve for all cases except sinx/x and sin'
        if( amode.subessay !== 'sin(x)/x' && amode.subessay !== 'sine derivative' ){
            rg.curveRotationAngle.sin = Math.sin( rg.curveRotationAngle.angle );
            rg.curveRotationAngle.cos = Math.cos( rg.curveRotationAngle.angle );
            builds__NewtonTangentAtA_8_L();
        }
        //=================================================
        // \\// sets master curve
        //=================================================


        //=================================================
        // //\\ sets dragging point point B
        //=================================================
        var newPos = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.unrotatedParameterX );
        rg.B.pos[0] = newPos[0];
        rg.B.pos[1] = newPos[1];
        //=================================================
        // \\// sets dragging point point B
        //=================================================


        //=================================================
        // //\\ builds Newton microscope
        //=================================================
        var Bx = rg.B.pos[0];
        //var bpos = rayAXTangent__2__XOn_Base_rd( rg.B.pos[1] / Bx );
        var bpos = mat.lineSegmentsCross( rg.A.pos, rg.B.pos, rg.r.pos, rg.d.pos );
        nspaste( rg.b.pos, bpos );
        //calculating magnitude
        var magn = toreg( 'magnitude' )( 'value', bpos[0]/Bx )( 'value' );
        //=================================================
        // \\// builds Newton microscope
        //=================================================


        //=================================================
        // //\\ l8 specific
        //=================================================
        //RBD line
        let posD = mat.lineSegmentsCross( rg.R.pos, rg.B.pos, rg.A.pos, rg.d.pos );
        rg.D.pos[0] = posD[0];
        rg.imageOfR.pos[0] = rg.R.pos[0] * magn;
        rg.imageOfR.pos[1] = rg.R.pos[1] * magn;
        rg.imageOfD.pos[0] = posD[0] * magn;

        rg.G.pos[1] = rg.B.pos[1];
        rg.G.pos[0] = rg.B.pos[0] - rg.E.pos[0];
        rg.F.pos[1] = rg.B.pos[1];
        rg.F.pos[0] = rg.B.pos[0] - rg.D.pos[0];
        //=================================================
        // \\// l8 specific
        //=================================================

        if( amode.subessay === 'sin(x)/x' ){
            rg.E.pos[1] = rg.A.pos[1];
            rg.E.pos[0] = rg.B.pos[0];
            rg.e.pos[1] = rg.A.pos[1];
            rg.e.pos[0] = rg.E.pos[0]*magn;
        }


        //=================================================
        // //\\ bridge to analytical theory
        //=================================================
        //now we need to refactor the curve for case of studies
        if(
            amode.subessay === 'derivative' ||
            amode.subessay === 'sine derivative' ||
            amode.subessay === 'vector-derivative'
        ){
            //-----------------------------------------
            // //\\ projects points to axes y and x
            //-----------------------------------------
            //y0,y,x0,x
            dropPerpend( 'y0=A,ytop,O' );
            dropPerpend( 'y=B,ytop,O' );
            dropPerpend( 'x0=A,xtop,O' );
            dropPerpend( 'x=B,xtop,O' );

            //-----------------------------------------
            // \\// projects points to axes y and x
            //-----------------------------------------
            //X = magnified point x
            dropPoint( "X=b" );


            if( amode.subessay === 'sine derivative' ){
                //extends tangent, AL
                ssF.line2abs( 'O,ytop' );
                ssF.line2abs( 'A,X0' );
                var dX = -rg[ 'A,X0' ].abs/Math.tan(
                    rg.OA.angle - rg[ 'O,ytop' ].angle //tangentPhi early definition
                );
                ssF.line2abs( 'X0,d' );
                var wwJump = dX/rg[ 'X0,d' ].abs;
                //finally builds point L based on curve's derivative
                ns.paste( rg.L.pos, mat.dropLine( wwJump, rg.X0.pos, rg.d.pos ), );
            }

            //-------------------------------------------------------
            // //\\ decorations block
            //      which is still cannot be in media_upcreate
            //      due lines running before media_upcreate
            //-------------------------------------------------------
            //beautifies tangent, AL
            ns.paste( rg[ 'line-AL-end' ].pos, mat.pointPlusTVector( 1.3, rg.A.pos, rg.L.pos ) );

            //extends rd to show an angle
            dropLine( 'line-dr-start=1.3,r,L' );
            //-------------------------------------------------------
            // \\// decorations block
            //-------------------------------------------------------
        }
        //-------------------------------------------------------
        // \\// bridge to analytical theory
        //-------------------------------------------------------

        //=================================================
        // //\\ values for legend
        //=================================================
        ssF.line2abs( 'AB' );
        ssF.line2abs( 'AD' ); //adds length as rg.AD.abs
        ssF.line2abs( 'AR' );
        ssF.line2abs( 'RD' );
        ssF.line2abs( 'RB' );
        
        ssF.line2abs( 'Ab' );
        ssF.line2abs( 'Ad' );
        ssF.line2abs( 'Ar' );
        ssF.line2abs( 'rd' );
        ssF.line2abs( 'rb' );        

        //todo: is there a better place to initialize these?
        rg.RAB = { area : getTriangleArea('AB', 'AR', 'RB') };
        rg.RAD = { area : getTriangleArea('AD', 'AR', 'RD') };
        rg.RACB = { area : getArcArea('AB', 'AR', 'RB', 'A', 'B', 'C') };

        rg.rAb = { area : getTriangleArea('Ab', 'Ar', 'rb') };
        rg.rAd = { area : getTriangleArea('Ad', 'Ar', 'rd') };
        rg.rAcb = { area : getArcArea('Ab', 'Ar', 'rb', 'A', 'b', 'c') };

        function getTriangleArea(A, B, C) {
            return calcTriangleArea(A, B, C).toFixed(3);
        }

        function getArcArea(A, B, C, p1, p2, p3) {  
            const triangleArea = calcTriangleArea(A, B, C);  
            const points = [ rg[p1].pos, rg[p2].pos, rg[p3].pos ]; 
            const curveArea = calcBezierArea(points, 100); 
            const area = triangleArea + curveArea;
            return area.toFixed(3);
        }

        function calcTriangleArea(A, B, C) {
            const a = rg[A].abs;
            const b = rg[B].abs;
            const c = rg[C].abs;
            const s = (a + b + c) / 2;   
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
            return area;
        }

        function calcBezierArea(points, steps = 100) {
            const [p0, p1, p2] = points; 
        
            // Quadratic Bézier formula
            function bezierPoint(t) {
                const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0];
                const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1];
                return [x, y];
            }
        
            // Trapezoidal integration
            let area = 0;
            let prevPoint = bezierPoint(0); // Starting point at t = 0
        
            for (let i = 1; i <= steps; i++) {
                const t = i / steps; // Incrementally move along the curve
                const currPoint = bezierPoint(t);
        
                // Approximate the area of the trapezoid
                const width = currPoint[0] - prevPoint[0];
                const height = (currPoint[1] + prevPoint[1]) / 2;
                area += width * height;
        
                prevPoint = currPoint; 
            }
        
            return Math.abs(area); // Ensure the area is positive
        }        

        rg.AB.arcLen = mat.integral.curveLength({
            fun             : ssD.repoConf[0].fun,
            curveStartParam : rg.A.pos[0],
            curveEndParam   : rg.B.pos[0],
            funIsAVector    : true,
            calculationAccuracy : 1e-4*rg.AB.abs,
        });

        if(rg.AB.abs > 0) {
            rg.Ab.arcLen = rg.AB.arcLen * rg.Ab.abs / rg.AB.abs;
        }

        //=================================================
        // \\// valuess for legend
        //=================================================

        let C = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.pos[0] * 0.7 );
        nspaste( rg.C.pos, C );
        nspaste( rg.c.pos, [C[0]*magn,C[1]*magn] );       
    }

    function builds__NewtonTangentAtA_8_L()
    {
        var angleL = rg.originalGapTangent.angle + rg.curveRotationAngle.angle;
        rg.L.gapTangent = Math.tan( angleL );
        let L = mat.lineSegmentsCross(
            rg.A.pos, [rg.A.pos[0]+1, rg.A.pos[1]+rg.L.gapTangent],
            rg.r.pos, rg.d.pos );
        nspaste( rg.L.pos, L );
    }

    function dir8innerB_2_R( RB_slope )
    {
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
            rg.fi.pos,
            rg.A.pos,
        );
        return newRpos;
    }

}) ();

