( function() {
    var {
        ns, mat, nspaste, sconf, ssF, ssD, sDomF, sData, amode, stdMod, toreg, rg,
    } = window.b$l.apptree({
        stdModExportList : {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;


    ///****************************************************
    /// model initiation
    ///****************************************************
    function init_model_parameters()
    {
        let b2B = sconf.b_per_B_original; // defined in sconf.js, factor to determine distance between B and b    
        nspaste( rg.b.pos, [ rg.B.pos[0] * b2B, rg.B.pos[1] * b2B ] );
        let D = rg.D.pos;
        let B = rg.B.pos;
        rg['r,d'].originalDirection = [ D[0]-B[0], D[1]-B[1], ];
        let R = mat.linesCross(
            rg['r,d'].originalDirection,
            B,         //start-1
            [ 0, -1],  //direction-2'
            rg.A.pos,  //start-2'
        );
        nspaste( rg.R.pos, R );
        rg.r.pos[0] = rg.R.pos[0] * b2B;
        rg.r.pos[1] = rg.R.pos[1] * b2B;
        rg.d.pos[0] = rg.D.pos[0] * b2B;
        rg.d.pos[1] = rg.D.pos[1] * b2B;
        nspaste( rg.r.pos, rg.r.pos );
        nspaste( rg.d.pos, rg.d.pos );
        
        rg.B.originalPos = [];
        nspaste( rg.B.originalPos, rg.B.pos );
        rg.D.originalPos = [];
        nspaste( rg.D.originalPos, rg.D.pos );
        rg.R.originalPos = [];
        nspaste( rg.R.originalPos, rg.R.pos );

        ssD.curveStartInitialPos = ns.paste( {}, rg.curveStart.pos );
        ssD.curveEndInitialPos = ns.paste( {}, rg.curveEnd.pos );

        //-------------------------------------------------
        // //\\ dragger B
        //-------------------------------------------------
        rg.B.processOwnDownEvent = function() {
            sData.unrotatedParameterX = rg.B.unrotatedParameterX;
            sData.RB_slope = [ rg.D.pos[0] - rg.B.pos[0], rg.D.pos[1] - rg.B.pos[1] ];
            ssD.draggerInUse = 'B';
        }; 
        rg.B.dragPriority = 100;
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'B',
            acceptPos : ( newPos ) =>
            {
                var new_unrotatedParameterX = newPos[0];

                //prevents B from getting too close to A to avoid rounding errors
                if( new_unrotatedParameterX < 0.0065 ) {
                    new_unrotatedParameterX = 0.0065;
                }

                ///prevents user from playing with too big curves
                if( new_unrotatedParameterX > rg.curveEnd.pos[0] * 0.95 ) {
                    new_unrotatedParameterX = rg.curveEnd.pos[0] * 0.95;
                }

                rg.B.unrotatedParameterX = new_unrotatedParameterX;
                
                nspaste( rg.R.pos, dir8innerB_2_R( sData.RB_slope ) );
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
            sData.RB_slope = [ rg.D.pos[0] - rg.B.pos[0], rg.D.pos[1] - rg.B.pos[1] ];
            ssD.draggerInUse = 'R';
        }; 

        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'R',
            acceptPos : ( newPos ) =>
            {
                // R cannot be moved right of B on x-axis
                if(newPos[0] >= rg.B.pos[0] - 0.2) {
                    return false;
                }
                // R cannot be higher than B on y-axis
                if(newPos[1] >= rg.B.pos[1] - 0.2) {
                    return false;
                }
                return true;
            }
        });
        //-------------------------------------------------
        // \\// dragger R
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ dragger D
        //-------------------------------------------------
        rg.D.processOwnDownEvent = function() {
            ssD.draggerInUse = 'D';
        }; 
        
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'D',
            acceptPos : ( newPos ) => {
                let original_Dx = rg.D.originalPos[0];
                let Bx = rg.B.pos[0]; 
                
                newPos[1] = 0; // y pos doesn't change
                let newDx = newPos[0]; 

                // Stop D before slope of DR === slope of AR
                // Prevent D from being moved too far to the right
                if(newDx > Bx + 0.2 && newDx < original_Dx * 2) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        //-------------------------------------------------
        // \\// dragger D
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
        //: sets dragging point point B (keeps it on the curve)
        var newPos = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.unrotatedParameterX );
        rg.B.pos[0] = newPos[0];
        rg.B.pos[1] = newPos[1];

        //=================================================
        // //\\ builds Newton microscope
        //=================================================
        var Bx = rg.B.pos[0];
        var bpos = mat.lineSegmentsCross( rg.A.pos, rg.B.pos, rg.r.pos, rg.d.pos );
        nspaste( rg.b.pos, bpos );
        var magn = toreg( 'magnitude' )( 'value', bpos[0]/Bx )( 'value' );

        //RBD line
        let posD = mat.lineSegmentsCross( rg.R.pos, rg.B.pos, rg.A.pos, rg.d.pos );
        let posR = mat.lineSegmentsCross( rg.D.pos, rg.B.pos, rg.A.pos, rg.r.pos );  

        if(ssD.draggerInUse === "D") {
            rg.R.pos = posR;
        } else {
            rg.D.pos[0] = posD[0];
        }  
        
        rg.r.pos[0] = rg.R.pos[0] * magn;
        rg.r.pos[1] = rg.R.pos[1] * magn;
        rg.d.pos[0] = rg.D.pos[0] * magn;
        //=================================================
        // \\// builds Newton microscope
        //=================================================


        //=================================================
        // //\\ values for legend
        //=================================================
        ssF.line2abs( 'AB' );
        ssF.line2abs( 'AD' ); //adds length as rg.AD.abs
        ssF.line2abs( 'AR' );
        ssF.line2abs( 'RD' );
        ssF.line2abs( 'RB' );
        
        ssF.line2abs( 'Ab' );
        ssF.line2abs( 'A,d' ); //Ad
        ssF.line2abs( 'A,r' ); // Ar
        ssF.line2abs( 'r,d' ); // rd
        ssF.line2abs( 'r,b' ); // rb    

        rg.RAB = { area : getTriangleArea('AB', 'AR', 'RB') };
        rg.RAD = { area : getTriangleArea('AD', 'AR', 'RD') };
        rg.RACB = { area : getArcArea('AB', 'AR', 'RB', 'A', 'B', 'C') };
        
        rg.RACB_RAB = { ratio : rg.RACB.area / rg.RAB.area };
        rg.RAD_RAB = { ratio : rg.RAD.area / rg.RAB.area };

        rg.rAb = { area : getTriangleArea('Ab', 'A,r', 'r,b') };
        rg.rAd = { area : rg.rAb.area * rg.RAD_RAB.ratio };
        rg.rAcb = { area : rg.rAb.area * rg.RACB_RAB.ratio };

        function getTriangleArea(A, B, C) {
            return calcTriangleArea(A, B, C);
        }

        function getArcArea(A, B, C, p1, p2, p3) {  
            const triangleArea = calcTriangleArea(A, B, C);  
            const points = [ rg[p1].pos, rg[p2].pos, rg[p3].pos ]; 
            const curveArea = calcBezierArea(points, 100); 
            const area = triangleArea + curveArea;
            return area;
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
            rg.R.pos,
            rg.A.pos,
        );
        return newRpos;
    }

}) ();

