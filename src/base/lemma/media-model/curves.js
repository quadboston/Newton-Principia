( function() {
    const {
        ns, sn, haz,
        ssF, sDomF, rg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            paintsCurve,
        },
    });
    return;


    ///********************************************************
    ///paints model-function on media
    ///********************************************************
    function paintsCurve({
        mmedia,     //where to attach: usually = stdMod.mmedia


        //fun is a function in model space for t,x,y
        // t |-> y
        // or
        // t |-> [x,y]
        //for example, //ssD.repoConf[0].fun
        fun,        

        //--------------------------------------------------------------------------
        // //\\ optional args
        //--------------------------------------------------------------------------
        //interdependent
        rgName,     //'curve-AB', optional
        pointsName, //'AB', optional, used if rgName, pointA and pointB are omitted


        //interdependent
        //todm      add tp-both-curves in call, don't make "tp-both-curves" automatic
        addedCssClass,   //optional, overrides tp-..rgName

        stroke, //for color, otherwise taken from sDomF.getFixedColor( rgName )
        strokeWidth,

        pointA,     //has pos[0] which is a start value for independent var t
        pointB,     //has pos[1] which infers an end value and step for var t

        //:alternatives
        magnitude,  //scale, optional
        //or:
        magnitudeX,
        magnitudeY,

        addToStepCount,     //see descr. in nssvg.curve
        annotationConfig,   //to annotate curve with "point interface"

        stepsCount, //optional
        start,      //existence is a flag
            step,

        //todm ?unused? get rid?
        parentUndisplayCollector, //to hidecleanup children when parent is cleaned

        //--------------------------------------------------------------------------
        // \\// optional args
        //--------------------------------------------------------------------------
    }) {

        //-----------------------------------------------------------------
        // //\\ model-function to media-function conversion
        //-----------------------------------------------------------------
        if( magnitudeX && magnitudeY ) {
            var mediaFunction   = ssF.modFun2scaledXY({ fun, magnitudeX, magnitudeY });
        } else {
            //todm: replace "magnitude || 1 " with "magnitude"
            //      bs already inside the fun ...
            var mediaFunction   = ssF.modFun2innFun( fun, magnitude || 1 );
        }
        //-----------------------------------------------------------------
        // \\// model-function to media-function conversion
        //-----------------------------------------------------------------



        //-----------------------------------------------------------------
        // //\\ rgName, pointA,B, start, step, tp-class
        //-----------------------------------------------------------------
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
        addedCssClass = sDomF.toCssIdentifier( addedCssClass || 'tp-' + rgName );
        //-----------------------------------------------------------------
        // \\// rgName, pointA,B, start, step, tp-class
        //-----------------------------------------------------------------




        //====================================================
        // //\\ registers and paints to svg
        //====================================================
        //this curve registry item
        var rgX = sn( rgName, rg );
        //rgX.rgName = rgName;
        rgX.svg = //no need in this assignment,
                  //todm: get rid of this assignment and test,
                  //because of rgX is provided and svg element will be
                  //assigned to rgX,
            ns.svg.curve({
                rgX,
                xOFy            : false,//true,
                stepsCount,
                addToStepCount,
                /*
                    start,  //of independent variable t in model space,
                    step,   //of independent variable t in model space,
                    curve,  //a    function( t ) : t |-> [x,y],
                            //  or function( t ) : t |-> { x:..., y:... },
                            //x,y are in media inner space ready for svg,
                    xOFy    //if true, then swaps curve coordinates x and y,
                */
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
            .toggleClass( 'undisplay', ns.haz( rgX, 'undisplay' ) )
            .addClass( 'tostroke thickable ' + addedCssClass);
        //====================================================
        // \\// registers and paints to svg
        //====================================================




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

