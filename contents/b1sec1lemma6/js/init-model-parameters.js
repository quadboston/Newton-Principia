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
        // \\// dragger L
        //-------------------------------------------------


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


        //todo: must work in media ... look for call backs and
        //      find which does once at the media creation
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

    }


}) ();

