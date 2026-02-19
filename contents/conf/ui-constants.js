//default app wide settings for lemmas
//may be overriden later by URL-query or lemma sconf.js,
(function(){
    const { fapp, sf } =
           window.b$l.apptree({});
    fapp.normalizeSliders = normalizeSliders;
    fapp.setUIConstants = setUIConstants;

    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sf ... anyway, they
    //do ? override from URL-query,
    return;


	function setUIConstants (){
		// runs once per page load
		
		sf.default_tp_stroke_width = 10;
		///for default points (and draggers???)
		///in module points.js
		sf.handleRadius = 8;
		sf.standardSvgSize = 1000;
		sf.PATH_WIDTH = '2';

		Object.assign( sf, {

			//***************************************************
			// ??? in better design, this setting should come
			// from ns.dpdec.dimensions.WIDTH bsl-core,
			// to do this, this module should have
			// delayed execution based on setModue
			// machinery,
			//
			// in mean time, these 21px comes as a sum
			// for 5px of image width + 2*8px margin from
			//     subroots.css.js::#bsl-resizable-handle
			// and not from dpdec.dimensions.WIDTH as may appear,
			main_horizontal_dividor_width_px : 21,
			//***************************************************

			mediaOffset : [ 0, 0 ], //in respect to simscene
			LETTER_FONT_SIZE_PER_1000 : 32,

			GENERIC_SLIDERS_FONT_SIZE : 15,
			GENERIC_SLIDER_HEIGHT_Y : 25,
			GENERIC_SLIDERS_COUNT : 2,
			SLIDERS_LEGEND_HEIGHT : 25*2+20, //2=GENERIC_SLIDERS_COUNT
			SLIDERS_OFFSET_Y      : 0,
			SLIDERS_OFFSET_X : 0.05, //in respect to background-image-width
			SLIDERS_LENGTH_X : 0.70, //in respect to background-image-width
			dragHidesPictures : true,  //vital for show/hide letters machinery
		});

		sf.pointDecoration = {
			cssClass        : 'tostroke tofill thickable',
			'stroke-width'  : 3,
			r               : sf.handleRadius,
		};
		//====================================================
		// \\// optionally overriden by url-query-config
		//====================================================
	}

	function normalizeSliders( sscale )
	{
		sf.GENERIC_SLIDERS_FONT_SIZE *= sscale;
		sf.GENERIC_SLIDER_HEIGHT_Y *= sscale;
		sf.SLIDERS_LEGEND_HEIGHT *= sscale;
		sf.SLIDERS_OFFSET_Y *= sscale;
	}
})();
