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
        calculatesMajorantRect,
        calcsMonotIntervalArea,
        calculates_inscr8circums,
    });
    //==================================
    // //\\ declares data
    //==================================
    Object.assign( dr,
    {
        figureArea  : 0,
    });
    //==================================
    // \\// declares data
    //==================================

    //==================================
    // //\\ exports methods
    //==================================
    Object.assign( numModel, {
        curveFun,
        ctrlPt_2_maxIx,
        ctrlPt_2_minIx,
        addsNewBases_8_calculatesMaxWidth,
    });
    //==================================
    // \\// exports methods
    //==================================
    return;



    //***********************************************
    // //\\  auxiliary prepprocessing functions
    //***********************************************
    ///should be interpolated function via control points
    function curveFun(x) {
        //.in legacy code, this depends on order of
        //.modules-load "intergral.js" must be before "model.js"
        const pts = dr.rgCtrlPts;
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
    function ctrlPt_2_maxIx()
    {
        const pts = dr.rgCtrlPts;
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
        const pts = dr.rgCtrlPts;
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
    //***********************************************
    // \\// auxiliary prepprocessing functions
    //***********************************************

    //***********************************************
    // //\\ auxiliary postprocessing functions
    //***********************************************
    //==================================
    // //\\ calculates mediawidths
    //      after micropoints
    //      and monotonity interval
    //==================================
    function addsNewBases_8_calculatesMaxWidth()
    {
        var basesN = dr.basesN;
        var sum = 0;
        //===================================================
        // //\\ adds "balanced" new bars to existing
        //===================================================
        //      if basesN did increase,
        ///new bars have equal lengths which is an average
        ///of previously existing bars,
        for (var i=0; i<basesN; i++) {
            ///if base is new and to be added
	        if ( !dr.partitionWidths[i] ) {
                //makes average base constant and, therefore,
                //provides equal basesN for all added basesN
		        dr.partitionWidths[i] = sum / i;
            }
	        sum += dr.partitionWidths[i];
            //in first round of setting partitionWidths, sum = basesN
        }
        //now, average sum=previous average sum = sum/basesN;
        //===================================================
        // \\// adds "balanced" new bars to existing
        //===================================================

        //===================================================
        // //\\ converts balanced widths to real media widths
        //      , finds dr.widest
        //===================================================
        {
            let widestIndex = 0;
            let widestSize = 0;
            let pwidths = dr.partitionWidths; //normless
            let chosenWidth = dr.yVariations.chosenWidth;
            let factor = 1/sum*chosenWidth;
            for (var i=0; i<basesN; i++) {
                pwidths[i] = pwidths[i] * factor; //normed
                if ( !i || pwidths[i] > widestSize ) {
                    widestSize = pwidths[i]
                    widestIndex = i;
                }
            }
            dr.widestSize = widestSize;
            dr.widestIndex = widestIndex;
        }
        //===================================================
        // \\// converts balanced widths to real media widths
        //===================================================
    }
    //==================================
    // \\// calculates mediawidths
    //==================================
    function calcsMonotIntervalArea()
    {
        let ff = numModel.curveFun;
        let dv = dr.yVariations;
        let x_start = dv.x_start;
        let chosenWidth = dv.chosenWidth;
        let len = sconf.BASE_MAX_NUM;
        let step = chosenWidth/len;
        let sum = 0;
        for( var ii=0; ii<len; ii++ ) {
            sum += ff(ii*step+x_start);
        }
        sum *= step;
        dr.figureArea = dv.complimentaryAreaBar-sum;
    }
    ///must run after finding maxWidth
    function calculatesMajorantRect()
    {
        let dv = dr.yVariations;
        let chchosen = dv.chchosen;
        if( dv.chchosen.dir > 0 ) {
            var left = dv.x_start;
            var right = left + dr.widestSize;
        } else {
            var right = dv.x_end;
            var left = right - dr.widestSize;
        }
        var top = dv.minY;
        var bottom = dv.maxY;
        dr.widestRect = {
            left,
            right,
            bottom,
            top,
        };
    }


    function calculates_inscr8circums()
    {
        var insYar = sn( 'inscribedY', dr.basePts, [] );
        var cirYar = sn( 'circumscribedY', dr.basePts, [] );
        var baseBarsLefts = sn( 'baseBarsLefts', dr.basePts, [] );
        var baseBarsRights = sn( 'baseBarsRights', dr.basePts, [] );
        insYar.length = 0;
        cirYar.length = 0;
        baseBarsLefts.length = 0;
        baseBarsRights.length = 0;
        var pwidths = dr.partitionWidths;
        var basesN = dr.basesN;

        ///creates baseBarsLefts points of base partion
        //we make them by adding already known widths
        //to the monotonity interval,
        var bbl = dr.yVariations.x_start;
        for( var ib = 0; ib < basesN; ib++ ) {
            baseBarsLefts[ib] = bbl;
            bbl += pwidths[ib];
            baseBarsRights[ib] = bbl;
        }

        // //\\ calculates min and max on separate bases
        {
            let ff = numModel.curveFun;
            let yRef = dr.yVariations.yRef;
            let dir = dr.yVariations.chchosen.dir;
            for( var ib = 0; ib < basesN; ib++ ) {
                let ymin = ff(baseBarsLefts[ib]);
                let ymax = ff(baseBarsRights[ib]);
                if( dir <=0 ) {
                    let d = ymin;
                    ymin = ymax;
                    ymax = d;
                }
                ymax = Math.min(ymax, yRef*0.9999999);
                if( ymin>=ymax ) {
                    ////otherwise negative heights
                    ////happens at svg
                    ymin = ymax < 0 ? ymax*1.0000001 : ymax * 0.999999;
                }
                insYar[ib] = ymax;
                cirYar[ib] = ymin;
            }
        }
        // \\// calculates min and max on separate bases


        // //\\ calculates min and max areas
        var pwidths = dr.partitionWidths;
        var areaCir = 0;
        var areaIns = 0;
        for( var ib = 0; ib < basesN; ib++ ) {
            let barwidth = pwidths[ib];
            areaCir += barwidth*cirYar[ib];
            areaIns += barwidth*insYar[ib];
        }
        let dv = dr.yVariations;
        dr.areaCir = dv.complimentaryAreaBar - areaCir;
        dr.areaIns = dv.complimentaryAreaBar - areaIns;
        // \\// calculates min and max on separate bases
    }
    //***********************************************
    // \\// auxiliary postprocessing functions
    //***********************************************

}) ();
