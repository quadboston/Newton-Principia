( function () {
    var {
        sn,
        fapp, sconf,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
             model_upcreate,
        },
    });
    var stdL2       = sn('stdL2', fapp );
    // var dr          = sn('datareg', stdL2 );
    // var dr2         = sn('datareg2', stdL2 );//TEMP
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );

    Object.assign( study,
    {
        calculates_monotIntervals8ref,
        calculates_microPoints,
    });
    return;




    function model_upcreate()
    {
        [stdL2.datareg, stdL2.datareg2].forEach(dr => {
            study.calculates_microPoints(dr);
            study.calculates_monotIntervals8ref(dr);
            numModel.addsNewBases_8_calculatesMaxWidth(dr);

            study.calcsMonotIntervalArea(dr);
            study.calculates_inscr8circums(dr);
            study.calculatesMajorantRect(dr);
        });
    }


    function calculates_microPoints(dr)
    {
        // //part I: intervals
        // let fP = dr.figureParams;

        // //TEMP I believe this is the only spot that references these functions.
        // let minX = fP.minX = numModel.findCtrlPtPosWithMinX(dr)?.x || 0;
        // let maxX = fP.maxX = numModel.findCtrlPtPosWithMaxX(dr)?.x || 0;

        // let xRange = fP.maxX - fP.minX;
        // let curveMicroPts = dr.curveMicroPts = [];
        // let curveFun = numModel.curveFunOldTemp;//TEMP numModel.curveFun;
        // let len = sconf.BASE_MAX_NUM;
        // let step = xRange/len;
        // ///calculates curve
        // for (var ii = 0; ii < len; ii++) {
        //     let xx = minX+ii*step;
        //     let yy = curveFun( dr, xx );
        //     let cix = curveMicroPts.length;
        //     curveMicroPts.push([xx,yy]);
        // }
        // let yy = curveFun( dr, maxX );
        // curveMicroPts.push([maxX,yy]);

        //TEMP
        const calculatedCurve = study.calculateCurve2Temp(dr);
        // // let errorXAbsMax = 0;
        // // let errorYAbsMax = 0;
        // const errors = calculatedCurve.map((pt, i) => {
        //     const pt2 = curveMicroPts[i];
        //     const x = pt.x - pt2[0];
        //     const y = pt.y - pt2[1];
        //     // errorXAbsMax = Math.max(Math.abs(errorX), errorXAbsMax);
        //     // errorYAbsMax = Math.max(Math.abs(errorY), errorYAbsMax);
        //     return {x, y};
        // });
        // const errorsXAbsSorted = errors.map((e) => e.x).sort((a, b) => b - a);
        // const errorsYAbsSorted = errors.map((e) => e.y).sort((a, b) => b - a);
        // console.log("curve data =", {
        //     curveMicroPts,
        //     calculatedCurve,
        //     errors,
        //     errorsXAbsSorted,
        //     errorsYAbsSorted,
        //     // errorXAbsMax,
        //     // errorYAbsMax,
        // });


        const constrainCurveAtSides =
            document.getElementById("checkbox-constrain-sides")?.checked;
        if (constrainCurveAtSides) {
            dr.curveMicroPts = study.constrainCurveAtSidesTemp(
                calculatedCurve).map(pt => [pt.x, pt.y]);
        } else {
            dr.curveMicroPts = calculatedCurve.map(pt => [pt.x, pt.y]);
        }
        // dr.curveMicroPts = dr.curveMicroPts.map(pt => [pt.x, pt.y]);
        // // console.log("dr.curveMicroPts modified =", dr.curveMicroPts);
    }

    

    ///second point in changes contains first turning point
    ///if function is monotonic, then there is only
    ///"one turning point" - a last one
    function calculates_monotIntervals8ref(dr)
    {
        //part I: intervals
        let fP = dr.figureParams;

        let changes = [];
        let p = dr.curveMicroPts;
        let ix = 0;
        var minY = p[0][1];
        var maxY = p[0][1];
        let len = p.length;
        let dir = p[1][1] > p[0][1] ? 1 : 0;
        changes.push( {ix, dir, pstart:p[ix], mp_start_ix:ix } );
        var stashedChan = changes[0];
        for( ix = 1; ix<len; ix++ ) {
            let y = p[ix][1];
            minY = minY > y ? y : minY;
            maxY = maxY > y ? maxY : y;
            let newDir = p[ix][1] > p[ix-1][1] ? 1 : 0;
            let stashedChanIx = changes.length-1;
            var stashedChan = changes[stashedChanIx];
            if( newDir !== dir ) {
                dir = newDir;
                let ch = {
                    ix:ix-1, //micropoints turning index
                    mp_start_ix : ix-1,
                    dir,
                    pstart:p[ix-1]
                };
                changes.push( ch );
                //updates previous interval
                stashedChan.pend = p[ix-1];
                stashedChan.mp_end_ix = ix-1;
                stashedChan.widthx = p[ix-1][0] - stashedChan.pstart[0];
                stashedChan.widthy = p[ix-1][1] - stashedChan.pstart[1];
            }
        }
        ix = p.length-1;
        stashedChan.pend = p[ix];
        stashedChan.mp_end_ix = ix;
        stashedChan.widthx = stashedChan.pend[0] - stashedChan.pstart[0];
        stashedChan.widthy = stashedChan.pend[1] - stashedChan.pstart[1];
        ///chooses only increasing (in svg context) intervals
        var gapXMax = 0;
        var gapX_ix = 0;
        for(let ch=0; ch<changes.length; ch++ ) {
            let change = changes[ ch ];
            let widthx = changes[ ch ].widthx;
            //if( change.dir > 0 && gapXMax < widthx ) {
            if( gapXMax < widthx ) {
                ////well, bigger gap is found
                gapXMax = widthx;
                gapX_ix = ch;
            }
        }
        let chchosen = changes[gapX_ix];
        {
            let chon = chchosen;
            let chosenWidth = chon.widthx;
            let minY = chon.dir > 0 ? chon.pstart[1] : chon.pend[1];
            let maxY = chon.dir > 0 ? chon.pend[1] : chon.pstart[1];
            let complimentaryAreaBar = maxY*chosenWidth;
            let mixRange = chon.mp_end_ix - chon.mp_start_ix;
            let stepx = chosenWidth/mixRange;
            dr.yVariations = {
                gapXMax,
                gapX_ix,
                chchosen,
                chosenWidth,
                mixRange,
                stepx,
                changes, //turning points
                minY,
                maxY,
                complimentaryAreaBar, //area size
                mp_start_ix : chon.mp_start_ix,
                mp_end_ix : chon.mp_end_ix,
                x_start : chon.pstart[0],
                x_end : chon.pend[0],
            };
        }
        //part II: flag: fP.deltaOnLeft
        fP.deltaOnLeft = chchosen.dir > 0;

        //part III: flag and rects-bottom: dr.yVariations.yRef
        //awkward algo, we use this for inverted area:
        //it.ed. complementary area:
        dr.yVariations.yRef = dr.yVariations.maxY;
    }

}) ();




