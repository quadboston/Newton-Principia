( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss',fapp);
    
    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;


        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );



        //==================================
        // //\\ declares data
        //==================================
        Object.assign( dr,
        {
            //:GUI

            //:mathModel
            sumWidth    : null,
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
	        ctrlPt_2_maxIx: ctrlPt_2_maxIx,
	        ctrlPt_2_minIx: ctrlPt_2_minIx,
            calcSumBaseWidth: calcSumBaseWidth,
            nextWidth: nextWidth
        });
        //==================================
        // \\// exports methods
        //==================================





        ///should be interpolated function via control points
        function f(x) {
            //.in legacy code, this depends on order of modules-load "intergral.js" must be before "model.js"
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





        //==================================
        // //\\ widths
        //==================================
        ///todm: this fun. and calcSum... are seen as too convoluted ...
        ///      what do they do?
        function nextWidth(i)
        {
	        dr.baseWidths[i] = dr.baseWidths[i] / dr.sumWidth *
                                (dr.figureBasics.maxX-dr.figureBasics.minX);
	        if ( !i || dr.baseWidths[i] > dr.widest) {
		        dr.widest = dr.baseWidths[i];
	        }
	        return dr.baseWidths[i];
        };

        //----------------------------------
        // //\\ calculates normalized widths
        //----------------------------------
        function calcSumBaseWidth( bases )
        {
            //what does it do?: ccc( 'start',dr.baseWidths );
	        var sum = 0;
	        var meanWidth = 0;
	        if( !dr.baseWidths.length ) {
		        meanWidth = 1;
		        dr.baseWidths[0] = meanWidth;
	        }
	        for (var i=0; i<bases; i++) {
		        if ( typeof dr.baseWidths[i] === 'undefined' ) {
        		    meanWidth = meanWidth || sum / i;
			        dr.baseWidths[i] = meanWidth;
		        }
		        sum += dr.baseWidths[i];
	        }
	        return sum;
        }
        //----------------------------------
        // \\// calculates normalized widths
        //----------------------------------
        //==================================
        // \\// widths
        //==================================

    }
}) ();




