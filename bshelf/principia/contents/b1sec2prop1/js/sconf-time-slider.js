{
const { tpelect, sf, CONST, apush, ssF, rg,
        stdMod,
        } = window.b$l.atree({ stdModList:
            {conf__points2sliders}});
const el = tpelect;

function conf__points2sliders(){
    ssF.conf__points2sliders({
        SLIDERS_OFFSET_PER_HEIGHT: 1.07,
        sliderPoints: [
            {
                rgn: 'dtslider',
                pcolor: el.time,
                cssClass: 'tp-time',
                gconf: {
                    unit: '',
                    val: sf.unitlessMinTime *
                            sf.initialTimieStep,
                    min: sf.dtMin,
                    max: sf.initialTimieStep,
                    caption: ( val, unit ) => {
                        return 'dt = ' + val.toFixed(2);
                    },
                },
                afterInitShapes: (gs_origin) => {
                    const rgn = gs_origin.rgn;
                    rg[rgn].processOwnMoveEent =
                        function(move_in_model){
                            const newdt = rg[rgn].val;
                            var posB = rg.path.pos[1];
                            var absAB = sf.speed * newdt;
                            var absB = Math.sqrt( posB[0]*posB[0]
                                + posB[1]*posB[1] );
                            var scale = absAB / absB;
                            posB[0] = posB[0]*scale;
                            posB[1] = posB[1]*scale;
                    };
                }
            },
            {
                rgn: 'timeslider',
                animateDuration_flg: _=>(3000+11000*rg.dtslider.val),
                pcolor: el.time, //for decorations
                cssClass: 'tp-time',
                gconf: {
                    unit: '',
                    val: sf.unitlessMinTime * sf.initialTimieStep,
                    min: sf.initialTimieStep,
                    max: sf.timeRange,
                    caption: ( val, unit ) => {
                        return 'time = ' + val.toFixed(2);
                    },
                },
                afterInitShapes: (gs_origin) => {
                    //const rgn = gs_origin.rgn;
                    //rg[rgn].processOwnMoveEent =
                    //    function(move_in_model){
                    //  };
                }
            },
        ]
    });
}
}