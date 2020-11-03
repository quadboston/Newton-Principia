( function() {
    var {
        ns, sn, $$, sv, haz,
        sconf,
        rg, toreg,
        ssF, ssD,
        sDomF, sDomN, amode,
        stdMod,

    } = window.b$l.apptree({
        ssFExportList :
        {
            drawAngle,
            drawAngleFrom_rayAB2rayCD_at_medpos,
            angleVisib,
        },
    });
    var ownProp = Object.prototype.hasOwnProperty;
    return;







    function segmentAngle( segm )
    {
        return Math.atan2( segm[1][1] - segm[0][1], segm[1][0] - segm[0][0] )
    }


    ///shows/hides angle if its caption if any
    ///inputs:  pname - name of master element
    function angleVisib({ pname })
    {
        var anglePname      = 'rays-angle-' + pname;
        var rgAngle         = haz( rg, anglePname );
        if( !rgAngle )      return;
        var doUndisplay     = ns.haz( rgAngle, 'undisplay' );

        var svgel$          = haz( rgAngle, 'svgel$' );
        var pnameLabelsvg$  = haz( rgAngle, 'pnameLabelsvg$' );
        svgel$              && svgel$.tgcls(            'undisplay', doUndisplay );
        pnameLabelsvg$      && pnameLabelsvg$.tgcls(    'undisplay', doUndisplay );
    }


    function drawAngleFrom_rayAB2rayCD_at_medpos({ AB, CD, rgSample, ANGLE_SIZE, caption })
    {
        var medPosPivotsAB = [
            [ AB[0].medpos[0], AB[0].medpos[1] ],
            [ AB[1].medpos[0], AB[1].medpos[1] ],
        ];
        var medPosPivotsCD = [
            [ CD[0].medpos[0], CD[0].medpos[1] ],
            [ CD[1].medpos[0], CD[1].medpos[1] ],
        ];
        var angleStart = segmentAngle( medPosPivotsAB )*sconf.MONITOR_Y_FLIP;
        var angleEnd = segmentAngle( medPosPivotsCD )*sconf.MONITOR_Y_FLIP;
        var pname = 'rays-angle-' + rgSample.pname;
        var rgAngle = toreg( pname )();
        rgAngle.pname = pname;
        rgAngle.medpos = rgSample.medpos;
        rgAngle.pcolor = rgSample.pcolor;
        rgAngle.undisplay = rgSample.undisplay;

        ssF.drawAngle({
            angleStart,
            angleEnd,
            ANGLE_SIZE      : ANGLE_SIZE || 1,
            tpClassName     : sDomF.topicIdUpperCase_2_underscore( rgSample.pname ),
            fill            : rgAngle.pcolor,

            //commenting this line does fix non-nice tp-highlighting of angle border
            //stroke          : rgAngle.pcolor,

            rgX             : rgAngle,
            caption         : caption,
        });
    }




    //angles are in mod xy-system
    //sizes are in medpos xy-sytem
    function drawAngle({
        angleStart,     //aka rg.beta.value
        angleEnd,
        ANGLE_SIZE,
        tpClassName,    //optional aka: angle-beta
        stroke,         //color string, optional
        fill,           //color string, optional
        rgX,
        //rgX.medpos,   //vertex of an angle: aka rg.B.medpos
        //rgX.svgel,    //optional, aka: rg.beta.angleSvg
        caption,
        fontSize,
    }){
        ANGLE_SIZE = ANGLE_SIZE || 0.1;
        ///"manually" created polyline which formes ellipse's sector,
        ///input: ellipse = (x-x0)^2/a^2 + (y-y0)^2/b^2 = 1;
        ///                 or: r = [ a*cos(t+t0) + x0, b*sin(t+t0) + y0 ];

        var angleStart = angleStart * sconf.MONITOR_Y_FLIP;
        var angleEnd = angleEnd * sconf.MONITOR_Y_FLIP;

        rgX.svgel = sv.ellipseSector({
            //// signature
            //// var { stepsCount, a, b, x0, y0, rotationRads, t0, t1 } = arg;
            stepsCount : 20,


            // //\\ todm ... mod2inn_scale must be incapsulated in model
            //instead we are converting from model to media manually here 
            //it is very annoying to always remember to
            //make a correction with MONITOR_Y_FLIP ...
            //todm ... do a better programming
            x0 : rgX.medpos[0],
            y0 : rgX.medpos[1],
            a  : sconf.mod2inn_scale*ANGLE_SIZE*0.5,
            b  : sconf.mod2inn_scale*ANGLE_SIZE*0.5,

            t0 : angleStart,
            t1 : angleEnd,
            // \\// todm ... mod2inn_scale must be incapsulated in model


            svgel : rgX.svgel,
            parent : ns.sapp.studyMods[ amode['submodel'] ].mmedia,
            //fill : 'rgba( 255, 0, 0, 0.1 )',
            fill : fill || 'transparent',
            stroke : stroke || 'transparent',
            'stroke-width' : 1,
        });

        var svgel$ = rgX.svgel$ = haz( rgX, 'svgel$' ) || $$.$( rgX.svgel );
        svgel$.cls(
            !tpClassName ?  '' :
                            (
                                'tp-' + tpClassName +
                                (stroke ? ' tostroke' : '' ) +
                                (fill ? ' tofill' : '' )
                            )
        );
        svgel$.tgcls( 'undisplay', ns.haz( rgX, 'undisplay' ) );


        ///draws caption
        if( caption ) {
            var fontSize = fontSize || 20;
            var wwAngle = ( angleStart + angleEnd ) / 2;

            var lposXSugar = Math.abs( Math.sin(wwAngle) ) > 0.7 ? 0.5 : 0;
            var lposX = ANGLE_SIZE * 1.1 * 0.5 *
                        sconf.mod2inn_scale * Math.cos( wwAngle )+rgX.medpos[0] +
                        -fontSize * lposXSugar;
            var lposY = ANGLE_SIZE * 1.1 * 0.5 *
                        sconf.mod2inn_scale * Math.sin( wwAngle )+rgX.medpos[1] +
                        -fontSize * 0.2;

            rgX.pnameLabelsvg = ns.svg.printText({
                tpclass         : tpClassName ? ' tostroke tobold tofill tp-' + tpClassName : '',
                text            : caption,
                stroke          : rgX.pcolor,
                //fill            : rgX.pcolor,
                "stroke-width"  : 1,
                svgel           : rgX.pnameLabelsvg,
                parent          : stdMod.mmedia,
                x               : lposX.toFixed()+'px',
                y               : lposY.toFixed()+'px',
                style           : {
                    'font-size' : fontSize.toFixed() + 'px',
                    'line-height' : '1',
                },
            });
            var pnameLabelsvg$ = rgX.pnameLabelsvg$ =
                haz( rgX, 'pnameLabelsvg$' ) || $$.$( rgX.pnameLabelsvg );
            pnameLabelsvg$.tgcls( 'undisplay', ns.haz( rg[rgX.pname], 'undisplay' ) );
        }
        return rgX;
    }


}) ();

