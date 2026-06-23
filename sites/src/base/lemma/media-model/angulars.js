(function(){

const { sn, $$, nssvg, haz, sconf, sDomF, rg, stdMod,
        nsmethods,
    } = window.b$l.atree({ ssFList: {
        drawAngle,
    },
});
const stripsExtraSpace = nsmethods.stripsExtraSpace;
return;


///paints angle from "start" to "end" by placing result
///in the range (-PI,+PI) counting
///from start ray
function drawAngle(arg){let {
        rgVertex,   //provides angle's vertex === rgVertex.medpos,
                    //see the usage below at "var rgid",
        // //\\ mutually optional
        angleStart,
        angleEnd,
        //directions of these rays are important
        //todm better name ABpivots,
        AB, //starting angle ray = [ pivotA, pivotB ]
        CD, //ending angle ray = [ pivotC, pivotD ]
        //strings, starting/ending angle rays
        //syntax 'A,B' or 'AB'
        ABString,
        CDString,   //string, ending angle ray, syntax 'C,D'

        caption,
        angleCaption,
        // \\// mutually optional

        ANGLE_SIZE,

        tpClassName,
        cssClass,

        stepsCount,
        captionRadiusIncrease,
        fill, //todo rid
        DRAW_COMPLIMENTARY_SECTOR,
    } = {...arg,__proto__:null};

    if( !angleStart && angleStart !== 0 ){
        if( !AB ){
            const split = ABString.indexOf(',') > -1 ? ',' : '';
            AB = ABString.split(split).map( nam => rg[nam] );
        }
        const medPosPivotsAB = [  //=[ medposA, medposB ]
            [ AB[0].medpos[0], AB[0].medpos[1] ],
            [ AB[1].medpos[0], AB[1].medpos[1] ],
        ];
        angleStart = segmentAngle( medPosPivotsAB )*
            sconf.MONITOR_Y_FLIP;
    }
    if( !angleEnd && angleEnd !== 0 ){
        if( !CD ){
            const split = CDString.indexOf(',') > -1 ? ',' : '';
            CD = CDString.split(split).map( nam => rg[nam] );
        }
        const medPosPivotsCD = [
            [ CD[0].medpos[0], CD[0].medpos[1] ],
            [ CD[1].medpos[0], CD[1].medpos[1] ],
        ];
        angleEnd = segmentAngle( medPosPivotsCD )*sconf.MONITOR_Y_FLIP;
    }
    var angleDelta = ( angleEnd - angleStart + Math.PI*4 ) % (Math.PI*2);
    if( angleDelta > Math.PI ) {
        angleDelta -= Math.PI*2;
    }
    angleEnd = angleStart + angleDelta;
    // //\\ either
    rgidAngle = 'rays-angle-' + rgVertex.rgid;
    rgAngle = sn( rgidAngle, rg );
    rgAngle.rgid = rgidAngle;
    // \\// either
    rgAngle.medpos = rgVertex.medpos;
    rgAngle.pcolor = rgVertex.pcolor;
    rgAngle.undisplay = rgVertex.undisplay;
    ANGLE_SIZE = ANGLE_SIZE || 1;
    stepsCount = stepsCount || 20;
    fill = fill || rgVertex.pcolor || 'transparent';

    tpClassName = tpClassName || sDomF.rgid2low(
        //todo rgVertex.rgid or rgidAngle ??
        rgVertex.rgid );
    angleCaption = angleCaption || caption,
    drawAngleSvg({
        rgVertex,
        rgAngle,
        angleStart,
        angleEnd,
        cssClass,
        tpClassName,
        angleCaption,
        ANGLE_SIZE,
        captionRadiusIncrease,
        DRAW_COMPLIMENTARY_SECTOR,
        stepsCount,
        fill,
        //commenting this line does fix non-nice
        //tp-highlighting of angle border
        //stroke          : rgAngle.pcolor,
    });
    return rgAngle;
}

//angles are in mod xy-system
//sizes are in medpos xy-sytem
function drawAngleSvg({
    rgVertex,
    rgAngle,
    angleCaption,
    cssClass,
    tpClassName,    //optional aka: angle-beta

    angleStart,     //aka rg.beta.value
    angleEnd,
    stepsCount,
    ANGLE_SIZE,
    captionRadiusIncrease,
    stroke,         //color string, optional
    fill,           //color string, optional
    fontSize,
    DRAW_COMPLIMENTARY_SECTOR,
}){
    ///"manually" created polyline which formes ellipse's sector,
    ///input: ellipse = (x-x0)^2/a^2 + (y-y0)^2/b^2 = 1;
    ///                 or: r = [ a*cos(t+t0) + x0, b*sin(t+t0) + y0 ];
    var angleStart = angleStart * sconf.MONITOR_Y_FLIP;
    var angleEnd = angleEnd * sconf.MONITOR_Y_FLIP;
    rgAngle.svgel = nssvg.ellipseSector({
        //// signature
        //// var { stepsCount, a, b, x0, y0,
        ////        rotationRads - apparently rotation fig. as whole
        //// ,t0, t1 } = arg;
        //// see: function ellipse( args )
        stepsCount,
        // //\\ todm ... mod2med must be incapsulated in model
        //instead we are converting from model to media manually here
        //it is very annoying to always remember to
        //make a correction with MONITOR_Y_FLIP ...
        //todm ... do a better programming
        x0 : rgAngle.medpos[0],
        y0 : rgAngle.medpos[1],
        a  : sconf.mod2med*ANGLE_SIZE*0.5,
        b  : sconf.mod2med*ANGLE_SIZE*0.5,

        t0 : angleStart,
        t1 : angleEnd,
        // \\// todm ... mod2med must be incapsulated in model

        svgel : rgAngle.svgel,
        parent : stdMod.medScene,
        fill,
        stroke : 'transparent',
        'stroke-width' : 1,
        DRAW_COMPLIMENTARY_SECTOR,
    });
    var svgel$ = rgAngle.svgel$ =
        haz( rgAngle, 'svgel$' ) || $$.$( rgAngle.svgel );
    //============================
    // //\\ shape class
    //============================
    let cls = cssClass;
    tpClassName = !tpClassName ? '' :
        (
            'tp-' + tpClassName +
            (stroke ? ' tostroke' : '' ) +
            (fill ? ' tofill' : '' )
        );
    if( cls && tpClassName ){
        cls += ' ' + tpClassName;
    } else {
        cls = cls || tpClassName;
    }
    svgel$.cls( cls );
    svgel$.tgcls( 'undisplay', haz( rgAngle, 'undisplay' ) );
    //============================
    // \\// shape class
    //============================

    ///draws caption
    if( angleCaption ) {
        var fontSize = fontSize || 20;
        var wwAngle = ( angleStart + angleEnd ) / 2;
        var lposXSugar = Math.abs( Math.sin(wwAngle) ) > 0.7 ? 0.5 : 0;
        let rad = ANGLE_SIZE * 0.5 * sn(
            'captionRadiusIncrease', arguments[0], 1.1 );
        var lposX = rad * sconf.mod2med * Math.cos( wwAngle )+
            rgAngle.medpos[0] - fontSize * lposXSugar;
        var lposY = rad * sconf.mod2med * Math.sin( wwAngle )+
            rgAngle.medpos[1] - fontSize * 0.2;
        rgAngle.pnameLabelsvg = nssvg.printText({
            text            : angleCaption,
            "stroke-width"  : 1,
            svgel           : rgAngle.pnameLabelsvg,
            parent          : stdMod.medScene,
            x               : lposX.toFixed()+'px',
            y               : lposY.toFixed()+'px',
            style           : {
                'font-size' : fontSize.toFixed() + 'px',
                'line-height' : '1',
                stroke        : rgAngle.pcolor,
                fill          : rgAngle.pcolor,
            },
        });
        var pnameLabelsvg$ = rgAngle.pnameLabelsvg$ =
            haz( rgAngle, 'pnameLabelsvg$' ) || $$.$( rgAngle.pnameLabelsvg );
        pnameLabelsvg$.tgcls( 'undisplay',
            haz( rg[rgAngle.rgid], 'undisplay' ) );
        //============================
        // //\\ caption class
        //============================
        var captionCls = cls
            .replace( /tostroke/g, '' )
            .replace( /tobold/g, '' )
            .replace( /tofill/g, '' );
        captionCls = stripsExtraSpace(
            captionCls + ' tostroke tobold tofill');
        pnameLabelsvg$.addClass( captionCls );
        pnameLabelsvg$
            .css( 'fill',rgVertex.opaqueColor )
            .css( 'stroke', rgVertex.opaqueColor );
        //============================
        // \\// caption class
        //============================
    }
}

function segmentAngle( segm ){
    return Math.atan2( segm[1][1] - segm[0][1],
                       segm[1][0] - segm[0][0] )
}
})();
