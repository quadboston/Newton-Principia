( function() {
    var {
        ns, mat, nspaste, sconf, fconf, ssF, ssD, sDomF, sData, amode, stdMod, toreg, rg,
    } = window.b$l.apptree({
        stdModExportList : {
            init_model_parameters,
            model_upcreate,
        },
    });
    return;


    ///****************************************************
    /// model initiation (draggers and popup)
    ///****************************************************
    function init_model_parameters()
    {
        ssD.curveStartInitialPos = ns.paste( {}, rg.curveStart.pos );
        ssD.curveEndInitialPos = ns.paste( {}, rg.curveEnd.pos );

        //-------------------------------------------------
        // //\\ dragger L for the rectilinear angle
        //-------------------------------------------------
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            orientation : 'axis-y',
            pname : 'L',
            acceptPos : ( newPos ) =>
            {
                var fullAngle = Math.atan( newPos[1]/newPos[0] );
                ///restricts converging tangent positions,
                ///saves user from unexpected experiments,
                if( fullAngle > 0.001 ) {
                    fullAngle = 0;
                }
                if(
                    amode.subessay === 'derivative' ||
                    amode.subessay === 'sine derivative' ||
                    amode.subessay === 'vector-derivative'
                ) {
                    if( fullAngle < -0.2 ) {
                        ///this is lowest allowed L-position on the screen
                        ////otherwise, function y(x) is not well-defined
                        fullAngle = -0.2;
                    }
                } else {
                    if( fullAngle < rg.AB.angle ) {
                      ///this is lowest allowed L-position on the screen
                      fullAngle = rg.AB.angle;
                      sData[ 'proof-pop-up' ].dom$.css( 'display', 'block' );
                    } else {
                      sData[ 'proof-pop-up' ].dom$.css( 'display', 'none' );
                    }
                }
                rg.curveRotationAngle.angle = fullAngle - rg.originalGapTangent.angle;
                return true;
            }
        });        
        //-------------------------------------------------
        // \\// dragger L for the rectilinear angle        
        //-------------------------------------------------

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

                //patch: instead of fixing arc-Ab calculations properly,
                //       this code-fragment restricts area where this arc miscalculated:
                if( new_unrotatedParameterX < sconf.NON_ZERO_A_PREVENTOR ) {
                    ///we need to put some constraint here, to
                    ///prevent chord vanishing
                    new_unrotatedParameterX = sconf.NON_ZERO_A_PREVENTOR;
                }

                ////implements team agreed feature of preventing point B
                ////entering area above line AL for core essays
                const angleBAM = mat.angleBetweenLines([
                  [rg.A.pos, cpos ],
                  [rg.A.pos, rg.L.pos],
                ]).angle
                
                if( fconf.sappId === "b1sec1lemma6" &&
                    //core essays:
                    ( !(amode.aspect === 'model') && amode.logic_phase === 'proof' ) && 
                    (angleBAM < 0 || cpos[1] > -0.01)
                ){
                    adjust_new_unrotatedParameterX_asNeccesary();
                    sData[ 'proof-pop-up' ].dom$.css( 'display', 'block' );
                } else {
                    sData[ 'proof-pop-up' ].dom$.css( 'display', 'none' );
                }

                ///prevents user from playing with too big curves
                if( new_unrotatedParameterX > rg.curveEnd.pos[0] ) {
                    new_unrotatedParameterX = rg.curveEnd.pos[0]-0.00001;
                }

                rg.B.unrotatedParameterX = new_unrotatedParameterX;
                
                return true;

                function adjust_new_unrotatedParameterX_asNeccesary() {
                    (function () {
                        var lpos = rg.L.pos;
                        var apos = rg.A.pos;
                        var kk = (lpos[1] - apos[1]) / (lpos[0] - apos[0]);
                        ///calculates point when moving back point B will cross
                        ///line AL
                        for (var ix = 0; ix < 200; ix++) {
                            cpar = new_unrotatedParameterX + ix * 0.005;
                            var pos = cfun(cpar);
                            var lineY = pos[0] * kk;
                            if (lineY > pos[1]) {
                                ////B crossed line AL
                                new_unrotatedParameterX = cpar;
                                break;
                            }
                        }

                    })();
                }
            }
        });
        //-------------------------------------------------
        // \\// dragger B
        //-------------------------------------------------
        
        //-------------------------------------------------
        // //\\ dragger D
        //-------------------------------------------------        
        ssF.line2abs( 'AD' );
        const original_Dx = rg.D.pos[0];
        const half_AD = rg.AD.abs / 2; // D can move half the width of AD in either dir
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'D',
            acceptPos : ( newPos ) => {
                newPos[1] = 0; // y pos doesn't change
                let x = newPos[0]; 
                if(x < original_Dx - half_AD || x > original_Dx + half_AD) {
                    return false;
                } else {
                    return true;
                }
            }
        });
        //-------------------------------------------------
        // \\// dragger D
        //------------------------------------------------- 

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

        //-------------------------------------------------
        // //\\ Pops up when AL and AB have same slope
        //-------------------------------------------------  
        var wwId = 'proof-pop-up';
        ssF.createButton({
            caption                 :
                'AB cannot be diminished further while ' +
                'containing the rectilinear angle.',
            buttonUniversalId       : wwId,
            //scenarioEventOnClick    : 'graph-is-plotted',
            clickCallback           : () => {
                sData[ wwId ].dom$.css( 'display', 'none' );
            },
            noTopicScenario         : true,
            cssText                 : `
                position            : absolute;
                width               : 250px;
                height              : 90px;
                top                 : 30%;
                padding             : 10px;
                left                : 10%;
                border-radius       : 20%;
                border              : 5px outset #cccccc;
                font-size           : 18px;
                text-align          : center;
                background-color    : #dddddd;
                cursor              : pointer;
                z-index             : 111111111;
            `,
        });
        //-------------------------------------------------
        // \\// Popup
        //-------------------------------------------------  
    }

    ///****************************************************
    /// model scenario
    ///****************************************************
    function model_upcreate()
    {
        //: creats AL for rectilinear angle        
        rg.curveRotationAngle.sin = Math.sin( rg.curveRotationAngle.angle );
        rg.curveRotationAngle.cos = Math.cos( rg.curveRotationAngle.angle );
        builds__NewtonTangentAtA_8_L();

        //: sets dragging point point B
        var newPos = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.unrotatedParameterX );
        rg.B.pos[0] = newPos[0];
        rg.B.pos[1] = newPos[1];

        //: getting "main" angle ABD for data legend
        ssF.line2abs( 'AB' );
        rg.AB.angleGrad = rg.AB.angle * 180 / Math.PI;

        //=================================================
        // //\\ builds Newton microscope
        //=================================================
        var Bx = rg.B.pos[0];
        var bpos = mat.lineSegmentsCross( rg.A.pos, rg.B.pos, rg.r.pos, rg.d.pos );
        nspaste( rg.b.pos, bpos );
        var magn = toreg( 'magnitude' )( 'value', bpos[0]/Bx )( 'value' );

        let C = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.pos[0] * 0.7 );
        nspaste( rg.C.pos, C );
        nspaste( rg.c.pos, [C[0]*magn,C[1]*magn] );
        //=================================================
        // \\// builds Newton microscope
        //=================================================

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

    function builds__NewtonTangentAtA_8_L() {
        var angleL = rg.originalGapTangent.angle + rg.curveRotationAngle.angle;
        rg.L.gapTangent = Math.tan( angleL );
        let L = mat.lineSegmentsCross(
            rg.A.pos, [rg.A.pos[0]+1, rg.A.pos[1]+rg.L.gapTangent],
            rg.r.pos, rg.d.pos );
        nspaste( rg.L.pos, L );
    }

}) ();

