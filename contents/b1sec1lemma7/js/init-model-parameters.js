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


    function init_model_parameters()
    {
        ssD.curveStartInitialPos = ns.paste( {}, rg.curveStart.pos );
        ssD.curveEndInitialPos = ns.paste( {}, rg.curveEnd.pos );
        
        rg.B.originalPos = [];
        nspaste( rg.B.originalPos, rg.B.pos );
        rg.D.originalPos = [];
        nspaste( rg.D.originalPos, rg.D.pos );
        rg.R.originalPos = [];
        nspaste( rg.R.originalPos, rg.R.pos );

        //-------------------------------------------------
        // //\\ dragger B
        //-------------------------------------------------
        rg.B.processOwnDownEvent = function() {
            sData.RB_slope = [ rg.D.pos[0] - rg.B.pos[0], rg.D.pos[1] - rg.B.pos[1] ];
            ssD.draggerInUse = 'B';
        };
        rg.B.processOwnUpEvent = function() {
            ssD.draggerInUse = '';
        }; 
        rg.B.dragPriority = 100;
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'B',
            acceptPos : ( newPos ) =>
            {
                var newPosX = newPos[0];

                //prevents B from getting too close to A to avoid rounding errors
                if( newPosX < sconf.NON_ZERO_A_PREVENTOR ) {
                    newPosX = sconf.NON_ZERO_A_PREVENTOR;
                }
                
                ///prevents user from playing with too big curves
                if( newPosX > rg.curveEnd.pos[0] ) {
                    newPosX = rg.curveEnd.pos[0]-0.00001;
                }

                rg.B.unrotatedParameterX = newPosX;

                nspaste( rg.R.pos, dir8innerB_2_R( sData.RB_slope ) );

                return true;
            }
        });
        //-------------------------------------------------
        // \\// dragger B
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ dragger D
        //-------------------------------------------------
        rg.D.processOwnDownEvent = function() {
            ssD.draggerInUse = 'D';
        }; 
        rg.D.processOwnUpEvent = function() {
            ssD.draggerInUse = '';
        }; 
        sDomF.params__2__rgX8dragwrap_gen_list({
            stdMod,
            pname : 'D',
            acceptPos : ( newPos ) => {
                if(rg.B.pos[0] > 0.2) { // so D can't be grabbed when it is under B
                    let originalDx = rg.D.originalPos[0];
                    let half_AD = originalDx / 2; // D can move half the width of AD in either dir 
                    newPos[1] = 0; // y pos doesn't change
                    let x = newPos[0]; 
                    if(x < originalDx - half_AD || x > originalDx + half_AD) {
                        return false;
                    } else {
                        return true;
                    }
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
    }

    ///****************************************************
    /// model scenario
    ///****************************************************
    function model_upcreate()
    {
        //: sets dragging point point B
        var newPos = ssD.repoConf[ssD.repoConf.customFunction].fun( rg.B.unrotatedParameterX );
        rg.B.pos[0] = newPos[0];
        rg.B.pos[1] = newPos[1];

        //=================================================
        // //\\ builds Newton microscope 
        //    - scales whole model when a dragger is used
        //=================================================
        var Bx = rg.B.pos[0];
        var bpos = mat.lineSegmentsCross( rg.A.pos, rg.B.pos, rg.r.pos, rg.d.pos );
        var magn = toreg( 'magnitude' )( 'value', bpos[0]/Bx )( 'value' ); // creates rg.magnitude.value  
        //console.log(Bx + ' ' + magn) // todo: sometimes magn is wrong when switching between claim/proof/corol

        if(bpos[1] > rg.d.pos[1]) bpos[1] = rg.d.pos[1]; // b can't go above AD
        if(bpos[0] > rg.d.pos[0] && bpos[1] >= rg.d.pos[1]) {
            bpos[0] = rg.d.pos[0]; // or to the right of d
        }
        nspaste( rg.b.pos, bpos );

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

        rg.E.pos[1] = rg.D.pos[1];
        rg.E.pos[0] = rg.B.pos[0] + sconf.BXBE_per_BY * rg.B.pos[1];

        rg.G.pos[1] = rg.B.pos[1];
        rg.G.pos[0] = rg.B.pos[0] - rg.E.pos[0];
        rg.F.pos[1] = rg.B.pos[1];
        rg.F.pos[0] = rg.B.pos[0] - rg.D.pos[0];
        //=================================================
        // \\// builds Newton microscope
        //=================================================

        //: adds length of line seg as rg["xx"].abs    
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

        // points only, doesn't affect curves
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

