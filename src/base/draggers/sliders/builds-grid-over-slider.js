
( function() {
    var {
        sn, $$, eachprop, nssvg,
        sconf,
        stdMod, rg,
    } = window.b$l.apptree({
        stdModExportList : {
            buildsGridOverTheSlider,
        }
    });
    return;








    ///makes digital grid along the slider line based on powers of 10,
    ///does not do subgrid as of ver. 9213,
    function buildsGridOverTheSlider({
        slider,         //slider object
                            //api
                                //input:
                                //  slider.valRange
                                //  slider.minVal
                                //  slider.maxVal
                                //  slider.SLIDERS_RULE_BOTTOM
                                //  value2media
                                //output:
                                //  slider.grid - is an svgel
        rgBottomPoint,  //only must have medpos ready
        rgTopPoint,     //only must have medpos ready
        svgParent,      //f.e., stdMod.svgScen
        mod2inn_scale,  //f.e. sconf.mod2inn_scale
    }){
        //--------------------------------------------------------
        // //\\ builds grid over the slider
        //--------------------------------------------------------
        var gridPivots = [
            [ rgBottomPoint.medpos[0], rgBottomPoint.medpos[ 1 ] ],
            [ rgTopPoint.medpos[0], rgTopPoint.medpos[ 1 ] ],
        ];
        var svgel = slider.grid = nssvg.polyline({
            pivots  : gridPivots,
            parent  : svgParent,
            style   : {
                opacity : 0.5,
            },
        });

        /*
        if( sconf.USE_CONCENTRATION_SLIDERS ) {
            ////we need to build a proportional scale
            var scRange = 
        */

        //calculates grid's grades
        var decUnitlog = Math.log10( slider.valRange );
        decUnitlog     = Math.floor( decUnitlog );

        var decUnit    = Math.pow( 10, decUnitlog );
        //if decUnit is too big, decreases it 10 times for dense grid
        decUnit        = decUnit > slider.valRange * 0.5 ? decUnit * 0.1 : decUnit;
        //starts the grid from "rounded" grade
        var linesStart = Math.ceil( slider.minVal / decUnit ) * decUnit;

        ///abandoned feature: implements variable scale, for fixed grades
        //var gradeCounter = 0;
        //slider.variableGrades = [];



        //================================================
        // //\\ buids thin subgrades
        //================================================
        (function() {
            if( slider.valRange / decUnit < 7 ) {
                var subGrade = decUnit / 10;
                for( var gline=linesStart-decUnit; gline<=slider.maxVal; gline+=subGrade ) {

                    if( gline < slider.minVal ) continue;  
                    ///main level of the grade on vertical axis of the slider
                    var mediaModelGradeY =
                        //origin on the bottom of svg
                        //sconf.pictureHeight + 
                        mod2inn_scale * (
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
            //decSubUnit = decUnit > slider.valRange * 0.5 ? decUnit * 0.1 : decUnit;
        })();
        //================================================
        // \\// buids thin subgrades
        //================================================



        //var labelCountEstimation = Math.floor( ( slider.maxVal - linesStart ) / decUnit );
        for( var gline=linesStart; gline<=slider.maxVal; gline+=decUnit ) {

            ///main level of the grade on vertical axis of the slider
            var mediaModelGradeY =
                //origin on the bottom of svg
                //sconf.pictureHeight + 
                mod2inn_scale * (
                //"-" because of screen Y inversion:
                - ( gline - slider.minVal ) *
                slider.value2media  // + slider.mediaBottom
            ) + slider.SLIDERS_RULE_BOTTOM
            ;


            ///creates pivots for grid line
            var gridPivots = [
                [ rgBottomPoint.medpos[0], mediaModelGradeY ],
                [ rgTopPoint.medpos[0]+20, mediaModelGradeY ],
            ];
            var svgel = slider.grid = nssvg.polyline({
                pivots  : gridPivots,
                parent  : svgParent,
                style   : {
                    opacity : 1,
                    //for thick grades, width is bigger than from thin grades:
                    'stroke-width' : 2,
                },
            });

            //----------------------------------------------------------  
            // //\\ prints grade digital lablel for math model magnitude
            //      measured by the gauge
            //----------------------------------------------------------  
            var decimalDigits = 0;

            //implement this ? as a function
            //var variableGrade = slider.variableGrades[ gradeCounter++ ] = {};
            //variableGrade.gline = gline;
            //variableGrade.decimalDigits = decimalDigits;
            //variableGrade.svgel = 
            nssvg.printText({
                text : gline.toFixed( decimalDigits ),
                x   : gridPivots[0][0]+5,
                y   : gridPivots[0][1]-5,
                parent  : svgParent,
                style   : {
                    'font-size'     : 10,
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
        //--------------------------------------------------------
        // \\// builds grid over the slider
        //--------------------------------------------------------
    }


}) ();

