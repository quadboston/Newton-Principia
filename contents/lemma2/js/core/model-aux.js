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
        let dv = dr.yVariations;
        let integ = dr.curveMicroIntegral;
        dr.figureArea = (integ[ dv.mp_end_ix ] - integ[ dv.mp_start_ix ]) * dv.stepx;
        dr.figureArea = dv.complimentaryAreaBar-dr.figureArea;
        /*
        ccc( 'area::::till=' + (integ[ dv.mp_end_ix ]*step).toFixed(4),
             "step="+step.toFixed(4) + 
             " figure="+ dr.figureArea.toFixed() + " width="+dv.chosenWidth.toFixed() );
        */
    }
    ///must run after finding maxWidth
    function calculatesMajorantRect()
    {
        let yVar = dr.yVariations;
        let chchosen = yVar.chchosen;
        var left = chchosen.pstart[0];
        var right = left + dr.widestSize;
        var top = yVar.minY;
        var bottom = yVar.maxY;
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
        var ib2mix = sn( 'ib2mix', dr.basePts, [] );
        var ib2next_ib_mix = sn( 'ib2next_ib_mix', dr.basePts, [] );
        insYar.length = 0;
        cirYar.length = 0;
        baseBarsLefts.length = 0;
        ib2mix.length = 0;
        ib2next_ib_mix.length = 0;
        var pwidths = dr.partitionWidths;
        var basesN = dr.basesN;
        let micPs = dr.curveMicroPts;
        let micLen = micPs.length;

        ///creates baseBarsLefts points of base partion
        //we make them by adding already known widths
        //to the monotonity interval,
        var bbl = dr.yVariations.x_start;
        for( var ib = 0; ib < basesN; ib++ ) {
            baseBarsLefts[ib] = bbl;
            bbl += pwidths[ib];
        }

        // //\\ calculates microindices which are covered
        //      by base interval
        var micrIx = 0;
        for( var ib = 0; ib < basesN; ib++ ) {
            if( ib ) {
                for( im = micrIx; im < micLen; im++ ) {
                    var newIx = null;
                    if( micPs[im][0] >= baseBarsLefts[ib] ) {
                        ////microindex has been chosen when it
                        ////goes above base point,
                        newIx = im;
                        break;
                    }
                }
                //in case bars smaller than micropoints:
                micrIx = newIx === null ? micrIx : newIx;
                //todo still a danger: both ix are equal, and delta index === 0
                ib2next_ib_mix[ib-1] = Math.max( ib2mix[ib-1], micrIx );
            }
            ib2mix[ib] = micrIx;
            if( ib === basesN-1 ) {
                ib2next_ib_mix[ib] = micLen-1;
            }
        }
        // \\// calculates microindices which are covered

        
        // //\\ calculates min and max on separate bases
        let p = micPs;
        for( var ib = 0; ib < basesN; ib++ ) {
            var micrIx = ib2mix[ib];
            var micrNext = ib2next_ib_mix[ib];
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
            let yRef = dr.yVariations.yRef;
            insYar[ib] = Math.min(ymax, yRef);
            cirYar[ib] = Math.min(ymin, yRef);
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
        /*
        ccc( 
               ' enclosing bar='+dv.complimentaryAreaBar.toFixed()
             + ' ins=' + dr.areaIns.toFixed()
             + ' cir=' + dr.areaCir.toFixed() + ' before='+areaCir.toFixed()
             + ' figure=' + dr.figureArea.toFixed()
        );
        */
        // \\// calculates min and max on separate bases
    }
    //***********************************************
    // \\// auxiliary postprocessing functions
    //***********************************************
    
}) ();
