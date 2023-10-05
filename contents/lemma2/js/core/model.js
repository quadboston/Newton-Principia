( function () {
    var {
        sn,
        fapp, sconf,
    } = window.b$l.apptree({
    });


    var stdL2       = sn('stdL2', fapp );
    var dr          = sn('datareg', stdL2 );
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );

    Object.assign( study,
    {
        calculates_monotIntervals8ref,
        calculatesWidestRect,
        calculates_microPoints8curveArea,
        calculates_inscr8circums,
    });
    //==================================
    // //\\ declares data
    //==================================
    Object.assign( dr,
    {
        //:mathModel
        widest      : null,
        figureArea  : null
    });
    //==================================
    // \\// declares data
    //==================================

    //==================================
    // //\\ exports methods
    //==================================
    Object.assign( numModel, {
        f: f,
        ctrlPt_2_maxIx,
        ctrlPt_2_minIx,
        recalculates_Bases8maxWidth,
    });
    //==================================
    // \\// exports methods
    //==================================
    return;






    ///should be interpolated function via control points
    function f(x) {
        //.in legacy code, this depends on order of
        //.modules-load "intergral.js" must be before "model.js"
        const pts = dr.ctrlPts;
        var sum = 0;
        for (var i=0; i<pts.length; i++) {
	        var num = pts[i].y;
	        var den = 1;
	        for (var j=0; j<pts.length; j++) {
		        if (j == i) {
			        continue;
		        }
		        num *= (x - pts[j].x);
	        }
	        for (var j=0; j<pts.length; j++) {
		        if (j == i) {
			        continue;
		        }
		        var diff = pts[i].x - pts[j].x;
		        if (diff != 0) {
			        den *= diff;
		        } else {
			        den = .4;
		        }
	        }
	        sum += (num/den);
        }
        return sum;
    }

    ///finds index of control point with maximum x
    ///todo what is this, an't they ordered?
    function ctrlPt_2_maxIx()
    {
        const pts = dr.ctrlPts;
        var xi;
        var n;
        for (var i=0; i<pts.length; i++) {
	        if ( !i || pts[i].x > n) {
		        n = pts[i].x;
		        xi = i;
	        }
        }
        return xi;
    }
    ///finds index of control point with minimum x
    function ctrlPt_2_minIx()
    {
        const pts = dr.ctrlPts;
        var xi;
        var n;
        for (var i=0; i<pts.length; i++) {
	        if ( !i || pts[i].x < n) {
		        n = pts[i].x;
		        xi = i;
	        }
        }
        return xi;
    }


    //==================================
    // //\\ calculates mediawidths
    //==================================
    function recalculates_Bases8maxWidth()
    {
        var bases = dr.bases;
        var sum = 0;

        if( !dr.partitionWidths.length ) {
            ////initiates first interval, the left base,
            ////this code runs only once at launch time
	        dr.partitionWidths[0] = 1;
        }

        for (var i=0; i<bases; i++) {
            ///if base is new and to be added
	        if ( !dr.partitionWidths[i] ) {
                //makes average base constant and, therefore,
                //provides equal bases for all added bases
                if( sum === 0 || i === 0 ) {
                    ccc( i, sum );
                }
                let ww =
		        dr.partitionWidths[i] = sum / i;
                if (!isFinite(ww) ||  ww <= 0 ){
                    ccc( '...<= 0, i='+i);
                }
            }
	        sum += dr.partitionWidths[i];
            //in first round of setting partitionWidths, sum = bases
        }
        //now, average sum=previous average sum = sum/bases;

        ///converts virtual widths to media widths
        for (var i=0; i<bases; i++) {
            if (!isFinite(dr.partitionWidths[i]) ||  dr.partitionWidths[i] === 0 ){
                ccc( 'bbbb i='+i);
            }
            dr.partitionWidths[i] = dr.partitionWidths[i] / sum *
                                    (dr.figureParams.maxX-dr.figureParams.minX);
            if ( !i || dr.partitionWidths[i] > dr.widest) {
                dr.widest = dr.partitionWidths[i];
            }
        }
    }
    //==================================
    // \\// calculates mediawidths
    //==================================


    function calculates_microPoints8curveArea()
    {
        //part I: intervals
        let fb = dr.figureParams;
        let max = numModel.ctrlPt_2_maxIx();
        let min = numModel.ctrlPt_2_minIx();
        let curveMicroPts = dr.curveMicroPts = [];
        let baseY = fb.baseY = sconf.originY_onPicture; //was: ctrlPts[0].y;

        let ff = numModel.f;

        ///calculates curve
        let delta           = 1;
        let figureArea      = 0;
        let ctrlPts         = dr.ctrlPts;
        //finds index of control point with maximum x:
        fb.minX             = dr.ctrlPts[min].x;
        fb.maxX             = dr.ctrlPts[max].x;
        let oldY            = 2 * baseY-ff(fb.minX);
        for (var xx = fb.minX; xx < fb.maxX; xx+=delta) {
            let yy = ff( xx );
            curveMicroPts.push([xx,yy]);
            figureArea += (delta*(baseY-(yy+oldY)/2));
            oldY = yy;
        }

        let yy = ff( fb.maxX );
        //this does not collect
        curveMicroPts.push([fb.maxX,yy]);
        //collects area of last interval with length = maxX-xx
        dr.figureArea = figureArea + ((fb.maxX-xx+delta)*(baseY-(yy+oldY)/2));
    }

    function calculates_inscr8circums()
    {
        var insYar = sn( 'inscribedY', dr.basePts, [] );
        var cirYar = sn( 'circumscribedY', dr.basePts, [] );
        var basXar = sn( 'basXar', dr.basePts, [] );
        var basMicIx = sn( 'basMicIx', dr.basePts, [] );
        var basMicNext = sn( 'basMicNext', dr.basePts, [] );
        insYar.length = 0;
        cirYar.length = 0;
        basXar.length = 0;
        basMicIx.length = 0;
        basMicNext.length = 0;
        
        var baseW = dr.partitionWidths;
        var basN = dr.bases;

        ///create basXar points of base partion
        let micAr = dr.curveMicroPts;
        var baseX = micAr[0][0];
        for( var ib = 0; ib < basN; ib++ ) {
            basXar[ib] = baseX;
            baseX += baseW[ib];
            //ccc( 'x='+basXar[ib] );
        }

        // //\\ calculates microindices which are covered
        //      by base interval
        let micLen = dr.curveMicroPts.length;
        var micrIx = 0;
        for( var ib = 0; ib < basN; ib++ ) {
            if( ib ) {
                for( im = micrIx; im < micLen; im++ ) {
                    var newIx = null;
                    if( micAr[im][0] >= basXar[ib] ) {
                        ////microindex has been chosen when it
                        ////goes above base point,
                        newIx = im;
                        break;
                    }
                }
                micrIx = newIx === null ? micrIx : newIx;
                basMicNext[ib-1] = Math.max( basMicIx[ib-1], micrIx );
                //c cc( ib + ' from '+basMicIx[ib-1] + ' to ' +
                //     basMicNext[ib-1] + ' of ' + micLen);
            }
            basMicIx[ib] = micrIx;
            if( ib === basN-1 ) {
                basMicNext[ib] = micLen-1;
            }
        }
        //c cc( ib + ' from '+basMicIx[ib-1] + ' to ' +
        //     basMicNext[ib-1] + ' of ' + micLen);
        // \\// calculates microindices which are covered

        
        // //\\ calculates min and max on separate bases
        let p = dr.curveMicroPts;
        for( var ib = 0; ib < basN; ib++ ) {
            var micrIx = basMicIx[ib];
            var micrNext = basMicNext[ib];
            var ymin = p[micrIx][1];
            var ymax = p[micrIx][1];
            for( im = micrIx; im <= micrNext; im++ ) {
                if( ymax < p[im][1] ) {
                    ymax = p[im][1];
                }
                if( ymin > p[im][1] ) {
                    ymin = p[im][1];
                }
            }
            insYar[ib] = ymax;
            cirYar[ib] = ymin;
            //ccc( ib + ' ins=' + insYar[ib] + ' cir=' + cirYar[ib] );
        }
        // \\// calculates min and max on separate bases

        
        // //\\ calculates min and max areas
        let fb = dr.figureParams;
        var areaCir = 0;
        var areaIns = 0;
        for( var ib = 0; ib < basN; ib++ ) {
            var micrIx = basMicIx[ib];
            var micrNext = basMicNext[ib];
            let x = p[basMicIx[ib]][0];
            let xN = p[basMicNext[ib]][0];
            let len = xN-x;
            areaCir += len*cirYar[ib];
            areaIns += len*insYar[ib];
            //ccc( ib + ' areaCir=' + areaCir + ' areaIns=' + areaIns );
        }
        //makes areas in respect to dr.yVariations.yRef
        let domain = fb.maxX-fb.minX;
        dr.areaCir = domain*dr.yVariations.yRef - areaCir;
        dr.areaIns = domain*dr.yVariations.yRef - areaIns;
        //c cc( 'rect ins=' + dr.areaIns.toFixed(2) +
        //     ' cir=' + dr.areaCir.toFixed(2) +
        //     ' ar=' + dr.figureArea.toFixed(2)
        //);
        // \\// calculates min and max on separate bases
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
        let baseY = fb.baseY = sconf.originY_onPicture; //was: ctrlPts[0].y;

        let changes = [];
        let p = dr.curveMicroPts;
        let ix = 0;
        var minY = p[0][1];
        var maxY = p[0][1];
        let len = p.length;
        let dir = p[1][1] > p[0][1] ? 1 : 0;
        changes.push( {ix, dir, p:p[ix]} );
        for( ix = 1; ix<len; ix++ ) {
            let y = p[ix][1];
            minY = minY > y ? y : minY;
            maxY = maxY > y ? maxY : y;
            let newDir = p[ix][1] > p[ix-1][1] ? 1 : 0;
            if( newDir !== dir ) {
                dir = newDir;
                let ch = {ix:ix-1, dir, p:p[ix-1]};
                changes.push( ch );
            }
        }
        let pLast = p.length-1;
        let chLast = changes.length-1;
        if( changes[ chLast ].ix !== pLast ) {
            ix = pLast;
            changes.push( {ix, dir, p:p[ix]} );
        }
        var maximumDeltaF = 0;
        for(let ch=0; ch<changes.length-1; ch++ ) {
            let gap = changes[ ch+1 ].p[1] - changes[ ch ].p[1];
            maximumDeltaF += Math.abs(gap);
        }
        dr.yVariations = {
            maximumDeltaF,
            changes,
            minY,
            maxY,
            areMany : changes.length > 2,
        };

        //part II: flag: fb.deltaOnLeft
        fb.deltaOnLeft = dr.yVariations.areMany ||
                         dr.ctrlPts[max].y > dr.ctrlPts[min].y;

        //part III: flag and rects-bottom: dr.yVariations.yRef
        dr.yVariations.yRef = baseY;
        if( baseY < dr.yVariations.maxY ) {
            dr.yVariations.yRef = dr.yVariations.maxY;
            dr.figureArea += (fb.maxX-fb.minX)*(dr.yVariations.yRef-baseY);
        }
    }


    function calculatesWidestRect()
    {
        var fp = dr.figureParams;
        let yVar = dr.yVariations;
        if( yVar.areMany ) { //3 elements == two intervals
            //c cc( (yVar.changes.length-1) + ' monotonity intervals' );
            var left = fp.minX; //x of control point
            var right = left + dr.widest;
            var top = yVar.maxY - yVar.maximumDeltaF;
            var bottom = yVar.maxY;
        } else if( fp.deltaOnLeft ) {
            ////supposition is that function monotonically decreases
            var left = fp.minX;
            var top = numModel.f(left);
            var right = fp.minX + dr.widest;
            var bottom = numModel.f(fp.maxX);

        } else {
            ////supposition is that function monotonically increases
            var right = fp.maxX;
            var left = right - dr.widest;
            var top = numModel.f(right);
            var bottom = numModel.f(fp.minX);
        }
        dr.widestRect = {
            left,
            right,
            bottom,
            top,
        };
    }


}) ();




