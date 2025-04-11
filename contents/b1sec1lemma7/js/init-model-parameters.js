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

    function init_model_parameters()
    {
        ssD.curveStartInitialPos = ns.paste( {}, rg.curveStart.pos );
        ssD.curveEndInitialPos = ns.paste( {}, rg.curveEnd.pos );

        //-------------------------------------------------
        // //\\ dragger B
        //-------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
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
            stdMod,
            pname : 'B',
            acceptPos : ( newPos ) =>
            {
                var ach = rg.B.achieved;
                var new_unrotatedParameterX = newPos[0];
                var cfun = ssD.repoConf[ssD.repoConf.customFunction].fun;
                var cpos = cfun( new_unrotatedParameterX );

                //prevents B from getting too close to A to avoid rounding errors
                if( new_unrotatedParameterX < sconf.NON_ZERO_A_PREVENTOR ) {
                    new_unrotatedParameterX = sconf.NON_ZERO_A_PREVENTOR;
                }
                
                ///prevents user from playing with too big curves
                if( new_unrotatedParameterX > rg.curveEnd.pos[0] ) {
                    new_unrotatedParameterX = rg.curveEnd.pos[0]-0.00001;
                }

                rg.B.unrotatedParameterX = new_unrotatedParameterX;
                
                return true;
            }
        });

        //-------------------------------------------------
        // //\\ dragger D
        //-------------------------------------------------
        // gets current values when dragger event fires 
        // rg.D.processOwnDownEvent = function() {
        //     sData.original_Dx = rg.D.pos[0];
        //     sData.half_AD = rg.AD.abs / 2; // D can move half the width of AD in either dir 
        // };  
        // sDomF.params__2__rgX8dragwrap_gen_list({
        //     stdMod,
        //     pname : 'D',
        //     acceptPos : ( newPos ) => {
        //         newPos[1] = 0; // y pos doesn't change
        //         let x = newPos[0]; 
        //         if(x < sData.original_Dx - sData.half_AD || x > sData.original_Dx + sData.half_AD) {
        //             return false;
        //         } else {
        //             return true;
        //         }
        //     }
        // });

        //getting original gap tangent
        const orTan = rg.originalGapTangent = {};
        orTan.tangent = mat.calculate_divided_differences(
            sconf.givenCurve_pivots_inModel
        ).derivativeAtZero();
        orTan.angle = Math.atan( rg.originalGapTangent.tangent );

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
        //=================================================
        // //\\ sets dragging point point B
        //=================================================
        var newPos = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.unrotatedParameterX );
        rg.B.pos[0] = newPos[0];
        rg.B.pos[1] = newPos[1];

        //=================================================
        // //\\ builds Newton microscope
        //=================================================
        var Bx = rg.B.pos[0];
        var bpos = mat.lineSegmentsCross( rg.A.pos, rg.B.pos, rg.r.pos, rg.d.pos );
        nspaste( rg.b.pos, bpos );
        var magn = toreg( 'magnitude' )( 'value', bpos[0]/Bx )( 'value' ); // creates rg.magnitude.value 

        //makes line DB proportionally move
        rg.D.pos[0] = rg.d.pos[0] / magn;

        rg.E.pos[1] = rg.D.pos[1];
        rg.E.pos[0] = rg.B.pos[0] + sconf.BXBE_per_BY * rg.B.pos[1];
        
        // console.log(magn) todo: why this go to 0?
        // rg.d.pos[0] = rg.D.pos[0] * magn;
        // rg.r.pos[1] = rg.R.pos[0] * magn;

        //=================================================
        // \\// builds Newton microscope
        //=================================================

        rg.G.pos[1] = rg.B.pos[1];
        rg.G.pos[0] = rg.B.pos[0] - rg.E.pos[0];
        rg.F.pos[1] = rg.B.pos[1];
        rg.F.pos[0] = rg.B.pos[0] - rg.D.pos[0];

        //=================================================
        // //\\ adds length of line seg as rg["xx"].abs
        //=================================================        
        ssF.line2abs( 'AB' );
        ssF.line2abs( 'BG' );
        ssF.line2abs( 'AD' );
        ssF.line2abs( 'AE' );
        ssF.line2abs( 'BF' );
        
        ssF.line2abs( 'Ab' );
        ssF.line2abs( 'Ad' );

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

        let C = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.pos[0] * 0.7 );
        nspaste( rg.C.pos, C );
        nspaste( rg.c.pos, [C[0]*magn,C[1]*magn] );


        // these only relevent when addendum options checked
        if(sconf.BONUS) {
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
        }
    }

}) ();

