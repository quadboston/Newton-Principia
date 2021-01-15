( function() {
    const {
        ns, sn, haz, $$, sconf, ssF, sDomF, rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            paintsCurve,
        },
    });
    return;








    ///paints model-function on media
    function paintsCurve({
        mmedia,     //where to attach: usually = stdMod.mmedia
        fun,        //ssD.repoConf[0].fun

        // //\\ optional args

        //interdependent
        rgName,     //'curve-AB', optional
        pointsName, //'AB', optional, used if rgName, pointA and pointB are omitted


        //interdependent
        //todm      add tp-both-curves in call, don't make "tp-both-curves" automatic
        addedCssClass,   //optional, overrides tp-..rgName

        stroke, //for color, otherwise taken from sDomF.getFixedColor( rgName )
        strokeWidth,

        pointA,     //flags, if present, then restric the arc,
        pointB,

        //:alternatives
        magnitude,  //scale, optional
        //or:
        magnitudeX,
        magnitudeY,

        addToStepCount, //see descr. in nssvg.curve
        annotationConfig, //to annotate curve with "point interface"

        start,      //existence is a flag
        step,
        stepsCount,

        parentUndisplayCollector, //to hidecleanup children when parent is cleaned

        // \\// optional args
    }) {

        if( magnitudeX && magnitudeY ) {
            var mediaFunction   = ssF.modFun2scaledXY({ fun, magnitudeX, magnitudeY });
        } else {
            var mediaFunction   = ssF.modFun2innFun( fun, magnitude || 1 );
        }

        stepsCount = stepsCount || 85;

        if( pointA && pointB ) {
            rgName              = rgName || 'arc-' + pointA.pname + pointB.pname;
        } else {
            rgName              = rgName || 'curve-' + pointsName;
            if( pointsName ) {
                var splitted        = pointsName.split( pointsName.indexOf(',')>-1 ? ',' : '' );
                if( ns.h( rg, splitted[0] ) && ns.h( rg, splitted[1] ) ) {
                    pointA          = rg[splitted[0]];
                    pointB          = rg[splitted[1]];
                }
            }
        }

        if( !start && start !== 0 ) {
            if( pointA && pointB ) {
                var start           = pointA.pos[0];
                var step            = ( pointB.pos[0] - start ) / stepsCount;
            } else {
                var start           = 0;
                var step            = 0.015*85/stepsCount;
            }
        }
        addedCssClass = sDomF.topicIdUpperCase_2_underscore( addedCssClass || 'tp-' + rgName );

        //this curve registry item
        var rgX = sn( rgName, rg );

        rgX.svg = //todm ... inconsistent ... get rid
            ns.svg.curve({
                rgX,
                xOFy            : false,//true,
                stepsCount,
                addToStepCount,
                start,
                step,
                curve           : mediaFunction,
                stroke          : stroke || sDomF.getFixedColor( rgName ),
                "stroke-width"  : strokeWidth || 2,
                svgel           : rgX.svgel, //[ rgName ].svg,
                dontClose       : true,
                parent          : mmedia,
            });

        rgX.svgel$
            .tgcls( 'undisplay', ns.haz( rgX, 'undisplay' ) )
            .addClass( 'tostroke thickable ' + addedCssClass);


        //====================================================
        // //\\ annotates curve if requested
        //====================================================
        if( annotationConfig ) {
            const {
                //required
                fontSize,
                captionFunct,
                letterPars,
                    //alternatives
                    annPointsPositions,
                    annPointsCount,
            } = annotationConfig;
            if( annPointsPositions ) {
                var ann_COUNT = annPointsPositions.length;
            } else {
                var ann_COUNT = annPointsCount;
                var incr = step*stepsCount / ( ann_COUNT - ( addToStepCount ? 1 : 0 ) );
            }
            var rgAnnPoints = [];
            for( aix=0; aix<ann_COUNT; aix++ ) {
                var pointParam  = annPointsPositions ?
                                  annPointsPositions[aix].par : start + incr * aix;
                var pos         = fun( pointParam );
                var annName     = 'ann-' + rgName + '-' + aix;
                var rgAnn = rgAnnPoints[ aix ] = ssF.declareGeomtric({
                            pname   : annName,
                            pos,
                            caption : captionFunct({
                                pointParam, pointIndex : aix, pointPos : pos
                            }),
                });
                rgAnn.undisplay = haz( rgX, 'undisplay' );
                letterPars && Object.assign( rgAnn, letterPars );
                if( annPointsPositions ) {
                    var ownLetterPars =  haz( annPointsPositions[aix], 'letterPars' );
                    if( ownLetterPars ){
                        Object.assign( rgAnn, ownLetterPars );
                    }
                }
            }
            rgX.rgAnnPoints = rgAnnPoints;
        }
        //====================================================
        // \\// annotates curve if requested
        //====================================================

        return rgX;
    }


}) ();

