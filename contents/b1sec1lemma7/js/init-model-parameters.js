( function() {
    var {
        ns, sn, paste, mat, nspaste, userOptions,
        sconf, fconf, ssF, ssD, sDomF, sData,
        amode, stdMod, toreg, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });

    ///****************************************************
    /// model initiation
    ///****************************************************
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
        rg.B.dragPriority = 100;
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
                
                ///prevents user from playing with too big curves
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


        //-------------------------------------------------
        // //\\ dragger D
        //-------------------------------------------------
        /*
        if(!sconf.B ONUS) {
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
                    let originalDx = rg.D.originalPos[0];
                    // D can move half the width of AD in either dir 
                    let half_AD = originalDx / 2;
                    newPos[1] = 0; // y pos doesn't change
                    let x = newPos[0]; 
                    if(x < originalDx - half_AD || x > originalDx + half_AD) {
                        return false;
                    } else {
                        return true;
                    }
                }
            });
        }
        */
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



}) ();

