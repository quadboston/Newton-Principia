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
        rgName,     //'curve-AB', optional
        pointsName, //'AB', optional, used if rgName, pointA and pointB are omitted

        //todm      add tp-both-curves in call, don't make "tp-both-curves" automatic
        addedCssClass,   //optional, overrides tp-..rgName

        fun,        //ssD.repoConf[0].fun
        stdMod,
        mmedia,     //stdMod.mmedia

        pointA,     //flags, if present, then restric the arc,
        pointB,

        magnitude,  //scale, optional
    }) {
        var mediaFunction   = ssF.modFun2innFun( fun, magnitude );

        var stepsCount = 85;
        if( pointA && pointB ) {
            rgName              = rgName || 'arc-' + pointA.pname + pointB.pname;
            var start           = pointA.pos[0];
            var step            = ( pointB.pos[0] - start ) / stepsCount;
        } else {
            rgName              = rgName || 'curve-' + pointsName;
            var start           = 0;
            var step            = 0.015;
        }
        addedCssClass            = sDomF.topicIdUpperCase_2_underscore( addedCssClass || 'tp-' + rgName );

        var rgX = sn( rgName, rg );
        var svgel = rgX.svg = //todm ... inconsistent ... get rid
                    rgX.svgel =
                    ns.svg.curve({
                        xOFy            : false,//true,
                        stepsCount,
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

