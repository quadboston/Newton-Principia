
( function() {
    var {
        sn, $$, eachprop, nssvg, mat,
        ssF,
        rg, sconf,
    } = window.b$l.apptree({
        stdModExportList : {
            buildsGridOverParametrizedCurve,
        }
    });
    return;




    //***************************************************
    // Creates api-object to paint grid along curves.
    // Done only for monotonic measurements:
    //      i.e. studyFun(t) is monotonic.
    //***************************************************
    function buildsGridOverParametrizedCurve({
        studyFun,   //studyFun: t|->z, z is in study domain,
        curveFun,   //studyFun: t|->[x,y], x,y are in model space,
        tA,         //tStart
        tB,         //tEnd
        tN,         //number of steps used to paint measurement arc,
        svgParent,  //f.e., stdMod.medScene,

        //conditionally optionals
        //svgel,       //possibly existing svgel to avoid recreation
        rgCurveName,
        decorations, //see api in "destructuring arguments" below

    }){

        //-----------------------------
        // //\\ destructuring arguments
        //-----------------------------
        decorations = decorations || {};
        var {
            lettersShiftMedpos, //format = [ x, y ]
            decimalDigits,
            measurementStroke,
            measurementStrokeWidth,
            fontSize,
        } = decorations;
        fontSize = fontSize || 12;
        //-----------------------------
        // \\// destructuring arguments
        //-----------------------------


        var returnApi = {};


        //-----------------------------
        // //\\ gets features
        //-----------------------------
        var studyStart = studyFun( tA );
        var studyEnd   = studyFun( tB );
        var studyRange = studyEnd - studyStart;
        //-----------------------------
        // \\// gets features
        //-----------------------------


        //--------------------------------------------------------
        // //\\ estimates grid thinness
        //--------------------------------------------------------
        //calculates grid's grades
        var decUnitlog = Math.log10( studyRange );
        decUnitlog     = Math.floor( decUnitlog );

        var decUnit    = Math.pow( 10, decUnitlog );
        //if decUnit is too big, decreases it 10 times for dense grid
        decUnit        = decUnit > studyRange * 0.5 ? decUnit * 0.1 : decUnit;
        //starts the grid from "rounded" grade
        var linesStart = Math.ceil( studyStart / decUnit ) * decUnit;

        ///abandoned feature: implements variable scale, for fixed grades
        //var gradeCounter = 0;
        //slider.variableGrades = [];
        //--------------------------------------------------------
        // \\// estimates grid thinness
        //--------------------------------------------------------




        /*
        //================================================
        // //\\ buids thin subgrades
        //================================================
        (function() {
            if( studyRange / decUnit < 7 ) {
                var subGrade = decUnit / 10;
                for( var gline=linesStart-decUnit; gline<=slider.maxVal; gline+=subGrade ) {

                    if( gline < slider.minVal ) continue;
                    ///main level of the grade on vertical axis of the slider
                    var mediaModelGradeY =
                        //origin on the bottom of svg
                        //sconf.pictureHeight +
                        mod2med * (
                        //"-" because of screen Y inversion:
                        - ( gline - slider.minVal ) *
                        slider.value2media
                    ) + slider.SLIDERS_RULE_BOTTOM
                    ;
                    ///creates pivots for grid line
                    var gridPivots = [
                        [ rgBottomPoint.medpos[0], mediaModelGradeY ],
                        [ rgTopPoint.medpos[0]+13, mediaModelGradeY ],
                    ];
                    var svgel = slider.subgrid = nssvg.polyline({
                        pivots  : gridPivots,
                        parent  : svgParent,
                        style   : {
                            opacity : 1,
                            'stroke-width' : 1,
                        },
                    });
                }
            }
            //decSubUnit = decUnit > studyRange * 0.5 ? decUnit * 0.1 : decUnit;
        })();
        //================================================
        // \\// buids thin subgrades
        //================================================
        */


        for( var gline=linesStart; gline<=studyEnd; gline+=decUnit ) {

            var t = ( gline - studyStart ) / studyRange * ( tB - tA );
            var gridPos = curveFun( t );
            var gridMedpos = ssF.modpos2medpos( gridPos, );

            //----------------------------------
            // //\\ creates grade radial lines
            //----------------------------------
            var GRID_WIDTH = 0.015;
            var GRID_LETTER_WIDTH = 0.03;

            var norm = getsCurveNormal( t, tA, tB );
            var normMedpos = ssF.modpos2medpos( norm, );
            var medpos = ssF.modpos2medpos( [0,0], );
            var medNorm = [ (normMedpos[0]-medpos[0])*GRID_WIDTH,
                            (normMedpos[1]-medpos[1])*GRID_WIDTH,
            ];
            var medLetterNorm = [ (normMedpos[0]-medpos[0])*GRID_LETTER_WIDTH,
                                  (normMedpos[1]-medpos[1])*GRID_LETTER_WIDTH,
            ];
            var gridPivots = [
                gridMedpos,
                [ gridMedpos[0]-medNorm[0], gridMedpos[1]-medNorm[1] ],
            ];
            var gridLetterPivots = [
                  gridMedpos[0]-medLetterNorm[0],
                  gridMedpos[1]-medLetterNorm[1]
            ];

            nssvg.polyline({
                pivots  : gridPivots,
                parent  : svgParent,
                style   : {
                    opacity : 1,
                    //for thick grades, width is bigger than from thin grades:
                    'stroke-width' : 2,
                },
            });
            //----------------------------------
            // \\// creates grade radial lines
            //----------------------------------



            //----------------------------------------------------------
            // //\\ prints grade digital lablel for math model magnitude
            //      measured by the gauge
            //----------------------------------------------------------
            decimalDigits = decimalDigits || 0;

            //implement this ? as a function
            //var variableGrade = slider.variableGrades[ gradeCounter++ ] = {};
            //variableGrade.gline = gline;
            //variableGrade.decimalDigits = decimalDigits;
            //variableGrade.svgel =

            var x = gridLetterPivots[0];
            var y = gridLetterPivots[1];
            if( lettersShiftMedpos ) {
                x += lettersShiftMedpos[0];
                y += lettersShiftMedpos[1];
            }
            nssvg.printText({
                text : gline.toFixed( decimalDigits ),
                x,
                y,
                parent  : svgParent,
                style   : {
                    'font-size'     : fontSize,
                    'font-weight'   : 'normal',
                    'stroke-width'  : '1',
                    'stroke'        : '1',
                    'fill'          : 'black',
                    'opacity'       : 0.5,
                },
            });
            //----------------------------------------------------------
            // \\// prints grade digital lablel for math model magnitude
            //----------------------------------------------------------
        }

        returnApi.measurement = {
            rgName : rgCurveName + '_measurement',
        };

        returnApi.drawsMeasurement = drawsMeasurement;
        return returnApi;




        function getsCurveNormal( t, tA, tB )
        {
            var step = (tB - tA)/1000;
            var f0 = curveFun( t );
            var f1 = curveFun( t+step );
            //finds "derivative", tang
            var tang = [ f1[0]-f0[0], f1[1]-f0[1], ];
            var abs2 = tang[0]*tang[0] + tang[1]*tang[1];
            //finds normal to curve's tangent
            var norm = mat.vector2normalOrts( tang );
            return norm.norm;
        }


        ///possibly draws the curve-"pipe" which is aka "column" in thermometer
        function drawsMeasurement( t )
        {
            var step = ( tB - tA ) / tN;
            returnApi.measurement.rgX = ssF.paintsCurve({
                mscene          : svgParent,
                fun             : curveFun,
                rgName          : returnApi.measurement.rgName,
                strokeWidth     : measurementStrokeWidth || 30,
                start           : tA, //222, //??? abs value seems irrelevant, just a flag
                step,
                stepsCount      : Math.ceil( tN * ( t - tA )/( tB - tA ) ),
                addToStepCount  : 1, //adds an extra closing point at the end,
                //addedCssClass   : ns.haz( ssD.repoConf[0], 'addedCssClass' ),
                stroke          : measurementStroke,
                                    //for color, otherwise taken
                                    // from sDomF.tpid0arrc_2_rgba( rgName )
            });
        }
    }

}) ();

