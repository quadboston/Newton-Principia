( function () {
    var {
        sn,
        fapp, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
             model_upcreate,
        },
    });
    var stdL2       = sn('stdL2', fapp );
    var dr          = sn('datareg', stdL2 );
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
        let max = numModel.ctrlPt_2_maxIx();
        let min = numModel.ctrlPt_2_minIx();
        dr.figureParams.minX= dr.ctrlPts[min].x;
        dr.figureParams.maxX= dr.ctrlPts[max].x;

        study.calculates_microPoints();
        study.calculates_monotIntervals8ref();
        numModel.addsNewBases_8_calculatesMaxWidth();

        study.calcsMonotIntervalArea();
        study.calculates_inscr8circums();
        study.calculatesMajorantRect();
    }


    function calculates_microPoints()
    {
        //part I: intervals
        let fb = dr.figureParams;
        let max = numModel.ctrlPt_2_maxIx();
        let min = numModel.ctrlPt_2_minIx();
        let minX = fb.minX = dr.ctrlPts[min].x;
        let maxX = fb.maxX = dr.ctrlPts[max].x;
        let xRange = fb.maxX - fb.minX;
        let curveMicroPts = dr.curveMicroPts = [];
        let curveFun = numModel.curveFun;
        let len = sconf.BASE_MAX_NUM;
        let step = xRange/len;
        ///calculates curve
        for (var ii = 0; ii < len; ii++) {
            let xx = minX+ii*step;
            let yy = curveFun( xx );
            let cix = curveMicroPts.length;
            curveMicroPts.push([xx,yy]);
        }
        let yy = curveFun( maxX );
        curveMicroPts.push([maxX,yy]);
    }

    

    ///second point in changes contains first turning point
    ///if function is monotonic, then there is only
    ///"one turning point" - a last one
    function calculates_monotIntervals8ref()
    {
        //part I: intervals
        let fb = dr.figureParams;
        let max = numModel.ctrlPt_2_maxIx();
        let min = numModel.ctrlPt_2_minIx();

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
        //part II: flag: fb.deltaOnLeft
        fb.deltaOnLeft = chchosen.dir > 0;

        //part III: flag and rects-bottom: dr.yVariations.yRef
        //awkward algo, we use this for inverted area:
        //it.ed. complementary area:
        dr.yVariations.yRef = dr.yVariations.maxY;
    }

}) ();




