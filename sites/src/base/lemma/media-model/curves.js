(function(){
const{  ns, sn, nsmethods, haz, $$,  has, stripp,
        sconf, ssF, sDomF, rg,stdMod,
     }= window.b$l.atree({ ssFList: {
        gcurve2svg,
}});
const stripsExtraSpace = nsmethods.stripsExtraSpace;
return;


///********************************************************
///paints, registers model-function on media
///with annotation
///********************************************************
function gcurve2svg(gshape){ var {
    mscene, //where to attach: usually = stdMod.medScene

    //fun is a function in model space for q,x,y
    // q |-> y
    // or
    // q |-> [x,y]
    //for example, //ssD.repoConf[0].fun
    //don't forget, fun can have a closure, which
    //can create dynamic contents for fun,
    fun,

    //--------------------------------------------------------------------------
    // //\\ optional args
    //--------------------------------------------------------------------------
    //interdependent

    //principal name, todm why not simply rgid? as
    //for curve other functions?
    rgn,     //curve name = as it says, f.e.:'curve-AB'

    pointsName, //'AB', optional, used if rgn, pointA and pointB are omitted

    //interdependent
    //todm      add tp-both-curves in call, don't make "tp-both-curves" automatic
    cssClass,   //optional, overrides tp-..rgn

    stroke, //for color, otherwise taken from sDomF.rgid0arrc_2_rgba( rgn )
    strokeWidth,

    //if presented, pointA.pos apparently are cartesian
    //coordinates where x is an independent coordiante q:
    pointA,     //pointA.pos[0] which is a start value q
    //pointB.pos[1] infers an end value and step for var q
    pointB,

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
    //to hidecleanup children when parent is cleaned
    parentUndisplayCollector,
    //----------------------------------------------------------
    // \\// optional args
    //----------------------------------------------------------
    }=stripp(gshape);

    //----------------------------------------------------------
    // //\\ model-function to media-function conversion
    //----------------------------------------------------------
    if( magnitudeX && magnitudeY ) {
        var mediaFunction = ssF.modFun2scaledXY({
            fun, magnitudeX, magnitudeY });
    } else {
        //todm: replace "magnitude || 1 " with "magnitude"
        //      bs already inside the fun ...
        //todp there is a lot of speed up resouces
        var mediaFunction = ssF.modFun2innFun(
                            fun, magnitude || 1 );
    }
    //----------------------------------------------------------
    // \\// model-function to media-function conversion
    //----------------------------------------------------------

    //----------------------------------------------------------
    // //\\ rgn, pointA,B, start, step, tp-class
    //----------------------------------------------------------
    stepsCount = stepsCount || 85;
    var rgShape = null;
    if( gshape.rgShape ){
        var rgShape = gshape.rgShape;

        //todm rid, do this
        //rgn = rgShape.rgn;
        rgn = gshape.rgn;
    } else {
        if( pointA && pointB ) {
            rgn = rgn || 'arc-' + pointA.rgid + pointB.rgid;
        } else {
            rgn = rgn || 'curve-' + pointsName;
            if( pointsName ) {
                var splitted = pointsName.split(
                    pointsName.indexOf(',')>-1 ? ',' : '' );
                if( has( rg, splitted[0] ) && has( rg, splitted[1] ) ) {
                    pointA          = rg[splitted[0]];
                    pointB          = rg[splitted[1]];
                }
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
    cssClass = (rgShape && rgShape.cssClass) || cssClass || '';
    cssClass += ' ' + sDomF.rgid2low( 'tp-' + rgn );
    cssClass = stripsExtraSpace( cssClass );
    //    if( rgn === 'APQ' ){
    //        ccc( 'cssClass='+cssClass );
    //    }
    //-----------------------------------------------------------------
    // \\// rgn, pointA,B, start, step, tp-class
    //-----------------------------------------------------------------

    //====================================================
    // //\\ registers and paints to svg
    //====================================================
    //this curve registry item
    rgShape = rgShape || sn( rgn, rg );
    ns.svg.curve({
        rgX: rgShape,
        xOFy: false,
        stepsCount,
        addToStepCount,
            /*
                start,  //of independent variable q in model space,
                step,   //of independent variable q in model space,
                curve,  //a    function( q ) : q |-> [x,y],
                        //  or function( q ) : q |-> { x:..., y:... },
                        //x,y are in media inner space ready for svg,
                xOFy    //if true, then swaps curve coordinates x and y,
            */
            start,
            step,
            curve: mediaFunction,
        svgel: rgShape.svgel,
        dontClose: true,
        parent: mscene || stdMod.medScene,
        // //\\ low precedence styles:
        // todm are they in effect at all?
        // they are supposedly overriden with tp styles,
        stroke: stroke || sDomF.rgid0arrc_2_rgba( rgn ),
        "stroke-width": strokeWidth || 2,
        // \\// low precedence styles:
    });
    rgShape.svgel$
        .tgcls( 'undisplay', ns.haz( rgShape, 'undisplay' ) )
        .cls( cssClass)
        .addClass( 'tostroke thickable');
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
            var annName     = 'ann-' + rgn + '-' + aix;
            var rgAnn = rgAnnPoints[ aix ] =
                        ssF.populates__pos_medpos_rgX_p2p({
                        rgid   : annName,
                        pos,
                        caption : captionFunct({
                            pointParam, pointIndex : aix, pointPos : pos
                        }),
            });
            rgAnn.undisplay = haz( rgShape, 'undisplay' );
            letterPars && Object.assign( rgAnn, letterPars );
            if( annPointsPositions ) {
                var ownLetterPars =  haz( annPointsPositions[aix], 'letterPars' );
                if( ownLetterPars ){
                    Object.assign( rgAnn, ownLetterPars );
                }
            }
        }
        rgShape.rgAnnPoints = rgAnnPoints;
    }
    //====================================================
    // \\// annotates curve if requested
    //====================================================
    return rgShape;
}
})();