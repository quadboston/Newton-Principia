( function () {
    var { sn, $$, fapp, sconf, fconf, rg, amode, stdMod, } = window.b$l.apptree({
        stdModExportList : { syncPoints, }, });
    var stdL2       = sn('stdL2', fapp );
    var numModel    = sn('numModel', stdL2 );
    var study       = sn('study', stdL2 );
    var sdata       = sn('sdata', study );
    return;


    ///======================================
    /// syncronizes positions for
    /// framework points with L2/3 legacy
    /// code points (with rg[ name ].pos)
    ///======================================
    function syncPoint( dr, item )
    {
        var dv = dr.yVariations;
        var xoff = sconf.originX_onPicture;
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;
        var cirYar = dr.basePts.circumscribedY;
        var insYar = dr.basePts.inscribedY;
        if( item.type === 'base' ) {
            let blist = dr.basePts.list;
            var bN = dr.basesN;
            var iIx = item.index;

            let insPy = -( insYar[iIx] - yoff ) / scale;
            var cirPy = -( cirYar[iIx] - yoff ) / scale;
            let posAx = blist[0].x;
            let posBx = blist[1].x;
            let posCx = blist[2].x;
            let posDx = blist[3].x;
            let posEx = blist[4].x;

            switch( iIx ) {
            case 0 : var pname = 'A';
                        var itemx = posAx;
                        var pnameFun = 'a'; //right on the curve
                        var pnameLow_ = 'K'; //min of the interval
                        rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
                        //rg[ pname ].pos[0];
                        rg[ pnameLow_ ].pos[1] = insPy;

                        var pnameTop_ = 'l'; //min of the interval
                        rg[ pnameTop_ ].pos[0] = (posBx - xoff) / scale;
                        rg[ pnameTop_ ].pos[1] = cirPy;
                     break;
            case 1 : var pname = 'B';
                     var itemx = posBx;
                     ////optional names
                     var pnameFun = 'b'; //right on the curve
                     var pnameLow_ = 'L'; //min of the interval
                     rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
                     rg[ pnameLow_ ].pos[1] = insPy;

                    var pnameTop_ = 'm'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = (posCx - xoff) / scale;
                    //rg[ 'C' ].pos[0];
                    rg[ pnameTop_ ].pos[1] = cirPy;
                    break;
            case 2 : var pname = 'C';
                     var itemx = posCx;
                     ////optional names
                     var pnameFun = 'c';
                     var pnameLow_ = 'M'; //min of the interval
                     rg[ pnameLow_ ].pos[0] = (itemx - xoff) / scale;
                     rg[ pnameLow_ ].pos[1] = insPy;

                    var pnameTop_ = 'n'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = (posDx - xoff) / scale;
                    rg[ pnameTop_ ].pos[1] = cirPy;
                    break;
            case 3 : var pname = 'D';
                    var itemx = posDx;
                     ////optional names   
                     var pnameFun = 'd';
                    var pnameTop_ = 'o'; //min of the interval
                    rg[ pnameTop_ ].pos[0] = (posEx - xoff) / scale;
                    rg[ pnameTop_ ].pos[1] = cirPy;
                     //var pnameLow_ = 'G'; //min of the interval
                     //rg[ pnameLow_ ].pos[0] = (posDx - xoff) / scale;
                     //rg[ pnameLow_ ].pos[1] = insPy;
                     
                     //--------------------------------------------
                     // //\\ making low boundary of difference-rect
                     //--------------------------------------------
                     rg.e.pos[0] = (posDx - xoff) / scale;
                     rg.e.pos[1] = insPy;
                     //--------------------------------------------
                     // \\// making low boundary of difference-rect
                     //--------------------------------------------
                     break;
            case 4 :
                     var pname = 'E';
                     var itemx = posEx;
                     //--------------------------------------------
                     // //\\ making low boundary of difference-rect
                     //--------------------------------------------
                     ////rg.p.pos[0] = (itemx - xoff) / scale;
                     //this fails: bases are too low:
                     //( blist[4].y - yoff )  / scale;
                     //insPy;
                     ////rg.p.pos[1] = rg.e.pos[1];
                     //--------------------------------------------
                     // \\// making low boundary of difference-rect
                     //--------------------------------------------
                     break;
            }
        }
        if( pname ) {
            var iY = item.type === 'base' ? dv.maxY : item.y;
            ////apparently convert from svg-space to model-space
            ////apparently program and numModel.curveFun made in svg-space and
            ////not in gemetrical-model-space;
            rg[ pname ].pos[0] = (itemx - xoff) / scale;
            rg[ pname ].pos[1] = -(iY - yoff) / scale;

            ////optional names
            if( pnameFun ) {
                if( pnameFun === 'a' || pnameFun === 'b') {
                    ////sets upper boundary of the bar
                    rg[ pnameFun ].pos[1] = cirPy;
                } else {
                    rg[ pnameFun ].pos[1] = 
                        -( numModel.curveFun( dr, itemx ) - yoff ) / scale;
                }
                rg[ pnameFun ].pos[0] = rg[ pname ].pos[0];
            }
        }
    }


    function syncPoints(dr) {
        let view = sdata.view;
		const showFigure = !!view.isFigureChecked;
		const showInscribed = !!view.isInscribed;
		const showCircumscribed = !!view.isCircumscribed;
		const onlyFigure = !showInscribed && !showCircumscribed;
		const inscribedFeatures = ['K','L','M','Kb','cL','dM'];
		inscribedFeatures.forEach(function(item){
			rg[item].undisplay = !showInscribed;
		});
		const circumscribedFeatures = 
			['f','l','m','n','o','la','mb','nc','od',
				'Aa','aK','lB','mC','nD','oE'];
		circumscribedFeatures.forEach(function(item){
			rg[item].undisplay = !showCircumscribed;
		});
		rg['aK'].undisplay = !showFigure;
        rg['a'].undisplay = !(showCircumscribed || showFigure);

        //order of statements seems vital
        [0,1,2,3,4].forEach( ix => { syncPoint(dr, dr.basePts.list[ ix ]); });
        dr.ctrlPts.list.forEach( item => { syncPoint(dr, item); });

        // //\\ majorant rect
        var xoff = sconf.originX_onPicture;
        //yoff is equal to 0 in "numerical space" of "rg.point.pos"
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;
        let dv = dr.yVariations;
        
        rg.F.pos[1] = -( dv.maxY - yoff ) / scale;
        rg.E.pos[1] = -( dv.maxY - yoff ) / scale;
        var { left, right, bottom, top, } = dr.widestRect;
        rg.f.pos[1] = -( top - yoff ) / scale;
        rg.F.pos[0] = ( right - xoff ) / scale;
        rg.f.pos[0] = ( right - xoff ) / scale;
        //--------------------------------------
        // //\\ majorant
        //--------------------------------------
        {
            let l2 = fconf.sappId.indexOf('b1sec1lemma2') === 0;
            let checked = amode.logic_phase !== 'claim';
            let undisplay = !checked || onlyFigure;
            rg.F.undisplay = undisplay||l2;
            rg.f.undisplay = undisplay||l2;
            rg.AF.undisplay = undisplay||l2;
            //majorant bar:
            $$.$(dr.faaf).css( 'display', undisplay ? 'none' : 'block' );
        }
        //--------------------------------------
        // \\// majorant
        //--------------------------------------
        stdMod.setsDifferenceBarsMonotonity(dr);
        ( dv.chchosen.dir <= 0 ) && stdMod.swapMonotonity(dr);
    }
    
}) ();
