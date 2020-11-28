( function() {
    var {
        ns, sn, $$, ssF, sDomF, rg,
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
        rgName,     //'curve-AB', optional
        pointsName, //'AB', optional, used if rgName, pointA and pointB are omitted

        //todm      add tp-both-curves in call, don't make "tp-both-curves" automatic
        addedCssClass,   //optional, overrides tp-..rgName

        pointA,     //flags, if present, then restric the arc,
        pointB,

        //:alternatives
        magnitude,  //scale, optional
        //or:
        magnitudeX,
        magnitudeY,

        addToStepCount,
        // \\// optional args
    }) {

        if( magnitudeX && magnitudeY ) {
            var mediaFunction   = ssF.modFun2scaledXY({ fun, magnitudeX, magnitudeY });
        } else {
            var mediaFunction   = ssF.modFun2innFun( fun, magnitude || 1 );
        }

        var stepsCount = 85;

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
        if( pointA && pointB ) {
            var start           = pointA.pos[0];
            var step            = ( pointB.pos[0] - start ) / stepsCount;
        } else {
            var start           = 0;
            var step            = 0.015*85/stepsCount;
        }
        addedCssClass           = sDomF.topicIdUpperCase_2_underscore( addedCssClass || 'tp-' + rgName );

        var rgX = sn( rgName, rg );
        var svgel = rgX.svg = //todm ... inconsistent ... get rid
                    rgX.svgel =
                    ns.svg.curve({
                        xOFy            : false,//true,
                        stepsCount,
                        addToStepCount,
                        start,
                        step,
                        curve           : mediaFunction,
                        stroke          : sDomF.getFixedColor( rgName ),
                        "stroke-width"  : 2,
                        svgel           : rg[ rgName ].svg,
                        dontClose       : true,
                        parent          : mmedia,
                    });
        var svgel$ = $$.$( svgel );
        svgel$
            .tgcls( 'undisplay', ns.haz( rgX, 'undisplay' ) )
            .addClass( 'tostroke thickable ' + addedCssClass);
    }


}) ();

