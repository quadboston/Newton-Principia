( function() {
    var {
        ns, sn, paste, mat, nspaste, userOptions,
        sconf, fconf, ssF, ssD, sDomF, sData,
        amode, stdMod, toreg, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            model_upcreate,
        },
    });

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
        // //\\ getting "main" angle ABD for data legend
        //      in lemma6
        //=================================================
        ssF.line2abs( 'AB' );
        rg.AB.angleGrad = rg.AB.angle * 180 / Math.PI;
        //=================================================
        // \\// getting "main" angle ABD for data legend
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


}) ();

