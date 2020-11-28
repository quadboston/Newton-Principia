( function() {
    var {
        ns, sn, paste, mat,
        sconf, fconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,
        tr, tp, toreg,

    } = window.b$l.apptree({
        stdModExportList :
        {
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
        ssD.curveStartInitialPos = ns.paste( {}, rg.curveStart.pos );
        ssD.curveEndInitialPos = ns.paste( {}, rg.curveEnd.pos );

        sDomF.modelPointDragger({
            //pname, acceptPos, orientation, pos, nospinner,
            pname : 'L',
            acceptPos : ( newPos ) =>
            {
                var fullAngle = Math.atan( newPos[1]/newPos[0] );
                ///restricts converging tangent positions,
                ///saves user from unexpected experiments,
                if( fullAngle > 0.001 ) {
                    fullAngle = 0;
                }
                if( amode.subessay === 'derivative' ||  amode.subessay === 'sine derivative' ) {
                    if( fullAngle < -0.2 ) {
                        ///this is lowest allowed L-position on the screen
                        ////otherwise, function y(x) is not well-defined
                        fullAngle = -0.2;
                    }
                } else {
                    if( fullAngle < -0.5 ) {
                        ///this is lowest allowed L-position on the screen
                        fullAngle = -0.5;
                    }
                }
                rg.curveRotationAngle.angle = fullAngle - rg.originalGapTangent.angle;
                return true;
            }
        });

        //-------------------------------------------------
        // //\\ adds methods to single base point only once
        //-------------------------------------------------
        // //\\ dragger B
        //-------------------------------------------------
        rg.B.unrotatedParameterX = rg.B.pos[0]*1.02;
        sDomF.modelPointDragger({
            //pname, acceptPos, orientation, pos, nospinner,
            pname : 'B',
            acceptPos : ( newPos ) =>
            {
                var ach = rg.B.achieved;
                var  new_unrotatedParameterX = newPos[0];
                ///we need to put some constraint here, to
                ///prevent chord vanishing
                if( new_unrotatedParameterX < 0.001 ) {
                    new_unrotatedParameterX = 0.001;
                }
                //.prevents user from playing with too big curves
                if( new_unrotatedParameterX > rg.curveEnd.pos[0] ) {
                    new_unrotatedParameterX = rg.curveEnd.pos[0]-0.00001;
                }
                rg.B.unrotatedParameterX = new_unrotatedParameterX;
                return true;
            }
        });
        //-------------------------------------------------
        // \\// dragger B
        //-------------------------------------------------

        //getting original gap tangent
        toreg( 'originalGapTangent' )( 'tangent',
            mat.calculate_divided_differences( sconf.givenCurve_pivots_inModel ).derivativeAtZero()
        );
        rg.originalGapTangent.angle = Math.atan( rg.originalGapTangent.tangent );
        //c cc( 'rg.originalGapTangent.angle='+rg.originalGapTangent.angle );

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


        if( amode.subessay === 'derivative' ||  amode.subessay === 'sine derivative' ){
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
        var bpos = rayAXTangent__2__XOn_Base_rd( rg.B.pos[1] / Bx );
        rg.b.pos =  bpos;
        //calculating magnitude
        var magn = toreg( 'magnitude' )( 'value', bpos[0]/Bx )( 'value' );
        //=================================================
        // \\// builds Newton microscope
        //=================================================




        //=================================================
        // //\\ l7 specific
        //=================================================
        if( fconf.sappId === "b1sec1lemma7" ) {
            //makes line DB proportionally move
            rg.D.pos[0] = rg.d.pos[0] / magn;
        }
        rg.G.pos[1] = rg.B.pos[1];
        rg.G.pos[0] = rg.B.pos[0] - rg.E.pos[0];
        rg.F.pos[1] = rg.B.pos[1];
        rg.F.pos[0] = rg.B.pos[0] - rg.D.pos[0];
        //=================================================
        // \\// l7 specific
        //=================================================

        if( amode.subessay === 'sin(x)/x' ){
            rg.E.pos[1] = rg.A.pos[1];
            rg.E.pos[0] = rg.B.pos[0];
            rg.e.pos[1] = rg.A.pos[1];
            rg.e.pos[0] = rg.E.pos[0]*magn;
        } else {
            rg.E.pos[1] = rg.D.pos[1];
            rg.E.pos[0] = rg.D.pos[0]*0.5;
        }



        //=================================================
        // //\\ bridge to analytical theory
        //=================================================
        //now we need to refactor the curve for case of studies
        if( amode.subessay === 'derivative' ||  amode.subessay === 'sine derivative' ){
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



    function builds__NewtonTangentAtA_8_L()
    {
        var angleL = rg.originalGapTangent.angle + rg.curveRotationAngle.angle;
        rg.L.gapTangent = Math.tan( angleL );
        paste( rg.L.pos, rayAXTangent__2__XOn_Base_rd( rg.L.gapTangent ) );
    }


    ///Inputs: rayTangent - an arbitrary line from point-A,
    ///Outputs: X === pos of crossing of rayTangent wit rd,
    function rayAXTangent__2__XOn_Base_rd( rayTangent )
    {
        var rayAngle = -Math.atan( rayTangent ); //treats direction-to-bottom as positive

        var rdX=rg.d.pos[0];
        var rdY=-rg.r.pos[1]; //treats direction-to-bottom as positive
        var rd = Math.sqrt( rdX*rdX + rdY*rdY );
        var sin_d = rdY/rd;
        var cos_d = rdX/rd;
        var angle_d = Math.acos( cos_d );

        var Sd = rdX / Math.sin( angle_d + rayAngle ) * Math.sin( rayAngle );
        var SdX = Sd * cos_d;
        var SdY = -Sd * sin_d; //treats direction-to-bottom as negative (as it must be)
        var Sx = rg.d.pos[ 0 ] - SdX;
        var Spos = [ Sx, SdY ];
        return Spos;
    }

}) ();

