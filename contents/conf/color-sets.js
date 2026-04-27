//default app wide settings for lemmas
//may be overriden later by URL-query or lemma sconf.js,
(function(){
    const { fapp, sf, topicColors_repo } =
           window.b$l.apptree({});
    fapp.setColors = setColors;
    const tr = topicColors_repo;

    //MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD is in fconf
    //todm ... merge some fconf and sf ... anyway, they
    //do ? override from URL-query,
    return;


	function setColors (){
		// runs once per page load

		//=======================================
		// //\\ topic colors repo
		//=======================================
		//The colors have been moved from each model to this file so they can be standardized.  Note
		//that comments referencing specific models (eg. P12) may not be up to date, or include every
		//model where the color is used.  More improvements can be made to the colors, some
		//possibilities are below.

		//Variable Naming and Comments...
		//-Variable names:
		//  -Could be more descriptive.
		//  -Renamed to remove hyphens (some already had them removed previously).
		//  -Many include information about their opacity values.  Terms used such as "HiddenStart" are
		//   vague, and variables that use "HiddenStart" have different opacity values.

		//-Descriptive comments should be added, and may only be needed for variables where their
		// purpose isn't obvious.

		//Color Variable Constants...
		//-Many color variables use the same color (eg. green [0, 150, 0]) but their r, g, b values
		// are set independently.  For consistency, especially for when changes are made in the future,
		// it would be much better to have a single variable for each color (eg. green, blue etc.)
		// that is referenced (eg. body = green).  They could be in the array format for now, then
		// converted to the CSS format later.

		//Opacity Variable Constants...
		//-Some opacity values use the defaults while others override them.  It would be best to
		// have constants for these overriding opacity values to keep them consistent.  For example if
		// the non-highlighted opacity value is supposed to keep a decoration/shape hidden, any situation
		// where that’s the case should reference a variable (eg. opacityHidden or similar).

		//-The non-highlighted opacity values (0.01 and 0.001) don't really look very different.  Since
		// they are supposed to start hidden, an opacity value 0 would probably be better.

		//-Some colors override the default opacity values, however given that they use values that are
		// similar to the defaults, they may be able to use them instead.

		//Other Possible Improvements...
		//-Note some variables (eg. P41 “XCY”, “D𝑐𝑥E”, “D𝑏𝑧E” etc.) should probably be moved back to their
		// sconf.js file, once a more broad variable name is created for them.  They are currently here so
		// that all colors from all models in the global file can be compared, to determine the best way to
		// group them.

		//-Many more similar color variables could likely be combined together.

		// background color used to highlight text and table rows on hover
		tr.highlight = rgbToArray("rgb(234, 234, 234)");

		tr.sunColor    = rgbToArray("rgb(202, 131, 0)"); // center of force (S or C in propositions)
		tr.given       = rgbToArray("rgb(139, 105, 20)");
		tr.proof       = rgbToArray("rgb(0, 133, 0)");
		tr.forceColor       = rgbToArray("rgb(131, 56, 236)");
        tr.estimatedForce  = rgbToArray("rgb(211, 87, 254)");
		tr.invalid     = rgbToArray("rgb(255, 0, 0)");  //alert, invalid user actions
		tr.supplementColor = rgbToArray("rgb(99, 99, 99)");
		tr.body        = rgbToArray("rgb(50, 149, 191)"),
		tr.body2       = rgbToArray("rgb(205, 103, 54)");//rgbToArray("rgb(255, 149, 111)"),


		function setCommonColors() {
			tr.hidden  = [0, 0, 0, 0];
			tr.orbit = tr.body;
			tr.orbit2 = tr.body2;
			tr.corollaryColor = tr.proof;
			// Hover colors are only visibile when hovering over 
			// corresponding text. Used when they overlap with 
			// other colors which take priority
			tr.corollaryHover = [...tr.corollaryColor, 0, 1];
			tr.speed = tr.curvature = tr.supplementColor;
			tr.supplementHover = 
					[...tr.supplementColor, 0, 1];
			tr.proofArea   = [...tr.proof, 1];
			tr.proofHover  = [...tr.proof, 0, 1];
			tr.givenArea   = [...tr.given, 1];
			tr.givenHover = [...tr.given, 0, 1];
			tr.supplementHover
				= [...tr.supplementColor, 0, 1];

			tr.sagitta         = 
			tr.displacement    = 
			tr.dtime     = tr.estimatedForce;

			tr.force = tr.forceColor; // need to track down and eliminate
		}

		setL2throughL4Colors();
		setProp1andProp2Colors();
		setL20andL21Colors();
		setProp41Colors();
		setCommonColors();

		sf.default_tp_stroke_width = 10;
		///for default points (and draggers???)
		///in module points.js
		sf.handleRadius = 8;
		sf.standardSvgSize = 1000;
		sf.PATH_WIDTH = '2';

		Object.assign( sf, {
			//***************************************************
			// //\\ tp color
			//===================================================
			//takes precedence in: ssF.colorArray_2_rgba
			//                     ssF.lowtpid__2__glocss8anchorRack

			//this solution is not good:
			//some lemmas need bright red, but
			//bright green text is hard to read ...
			//so we resort to dark color LIGHT = 30

			//This sets L-paramter in SHL color model.
			//Range of L is from 0 to 100. 100 is 100% lightness which mean
			//all colors are equaly bright and diagram becomes invisible.
			//0 - is complete darkness.

			//topics:
			DEFAULT_TP_SATUR : 99,

			//---------------------------------------------------
			// //\\ tp color opacity
			//---------------------------------------------------
			//affects only ssF.lowtpid__2__glocss8anchorRack and
			//ssF.colorArray_2_rgba
			//does not affect text anchor colors, but does affect both model and table together
			TP_OPACITY_LOW : 0.5, // applied to 'topicColors_elected' in page's sconf.js

			//0.6-makes opacity points do look "non-solid"
			//applied to 'originalPoints' and 'linesArray' in page's sconf.js
			TP_OPACITY_LOW_POINT : 1, 
			TP_OPACITY_HIGH : 1,

			// //\\ remove when lemmas
			//      will be standartized
			AREA_HIGHLIGHT_OPACITY : 0.7,
			AREA_DEFAULT_OPACITY : 0.3,
			// \\// remove when lemmas

			SVG_IMAGE_TOPIC_NON_HOVERED_OPACITY : 0.6,
			default_tp_stroke_opacity   : 0.5, //2, todotodo bug everywhere

			ANCHOR_OPACITY_LOW : '0.7',
			ANCHOR_OPACITY_HIGH : '1',
			ANCHOR_DEFAULT_COLOR : 'rgba( 150, 0, 150, 1 )',

			//affects only anchor colors in Book text,
			TP_OPACITY_FROM_fixed_colors : true,
			//---------------------------------------------------
			// \\// tp color opacity
			// \\// tp color
			//===================================================

			//---------------------------------------------------------------
			// //\\ anchor control
			//---------------------------------------------------------------
			ANCHOR_TOPIC_OPACITY_NOT_IN_FOCUS : 0.8,
			ANCHOR_TOPIC__OPACITY_IN_FOCUS : 1.0,
			ITEM_BASE_COLOR_TO_ANCHOR : false, //for anchor-text, sets tpcolarr opacity to 1
			//---------------------------------------------------------------
			// \\// anchor control
			//---------------------------------------------------------------
		});


		function setL2throughL4Colors() {
			tr.difference  = rgbToArray("rgb(150, 50, 0)", 0, 0.64);
			tr.figure      = rgbToArray("rgb(0, 150, 0)");

			tr["figure-area"] = rgbToArray("rgb(0, 150, 0)", 0.32, 0.64),
			tr["figure-area-txt"]          = rgbToArray("rgb(0, 150, 0)", 0.7, 1),

			tr["circumscribed-rectangles"] = rgbToArray("rgb(0, 80, 150)", 0.32, 0.64),
			tr["circ-txt"]                 = rgbToArray("rgb(102, 131, 179)"),

			tr["inscribed-rectangles"]     = rgbToArray("rgb(150, 0, 150)", 0.32, 0.64),
			tr["insc-txt"]                 = rgbToArray("rgb(173, 94, 178)"),

			tr.widths                      = rgbToArray("rgb(150, 0, 150)", 0, 0.64),

			tr.widestRectangular           = rgbToArray("rgb(0, 0, 150)", 0.28, 0.49),
			tr.widestRectangularHiddenStart= rgbToArray("rgb(0, 0, 150)", 0.0, 0.49),
			tr["widt-txt"]                 = rgbToArray("rgb(0, 0, 150)")
		}

		function setL20andL21Colors() {
			tr.static              = rgbToArray("rgb(0, 200, 255)");
			tr.staticHalfOpacity   = [0, 200, 255, 0.5];
			tr.core                = rgbToArray("rgb(255, 150, 0)");
			tr.coreHalfOpacity     = [255, 150, 0, 0.5];
			tr.aux                 = rgbToArray("rgb(255, 0, 255)");
			tr.constructors        = rgbToArray("rgb(0, 0, 255)");
			tr.ellipse             = rgbToArray("rgb(0, 150, 0)");
		}

		function setProp1andProp2Colors() {
			//P1 (Shared with P2)
			tr.freeMove        = rgbToArray("rgb(0, 150, 0)");
			tr.diagram         = rgbToArray("rgb(150, 0, 90)");
			tr.path            = tr.body;//rgbToArray("rgb(0, 0, 150)");
			tr.sagittaeChords  = tr.sagitta;

			tr.trianglePurpleTextAreaColor = tr.path;
			tr["kepler-triangle-odd"]  = [102, 102, 255, 0.35, 0.7],
			tr["kepler-triangle-even"] = [153, 153, 255, 0.35, 0.7],
			tr.triangleGreen           = [0, 150, 0, 0.25, 0.64];

			tr.perpendicular   = [150, 80, 0];
			tr.tangent         = [0, 150, 0];
		
			//P2
			tr.areaDescriptionAccelerated = rgbToArray("rgb(120, 90, 82)", 1); //Description of areas triangle P2 proof tab
		}

		function setProp41Colors() {
			//Note that Fi for P12 is shadow (see its sconf.js ~line 635)
			tr.time = rgbToArray("rgb(0, 150, 200)");
			tr.fi = [0, 0, 150, 0.1, 0.3];
			tr.Fkernel = [0, 0, 150];

			tr.bodyHiddenStart = [...tr.body.slice(0, 3), 0.01, 1];
			tr.forceTransparentStart = [...tr.forceColor.slice(0, 3), 0.1, 1];
			tr.VSarea = [...tr.forceColor.slice(0, 3), 0.3, 0.7];
			tr.timeHiddenStart = [...tr.time.slice(0, 3), 0.01, 0.7];

			//Is vgpoint still needed?  Seems to be after "Drop point, A"
			//in Elements under developer tools
			//however may not be visible.
			tr.vgpoint = [0, 150, 0, 0.01, 1]; //todm: last two pars have no effect

			tr.XCY = [0, 0, 150, 0.03, 0.5];

			tr.D𝑐𝑥E = [0, 0, 150, 0.01, 0.5];

			tr.D𝑏𝑧E = [110, 90, 0, 0.01, 0.5];
			tr.VIC = [110, 90, 0, 0.01, 0.5];
			tr.ICK = [110, 90, 0, 0.01, 0.5];

			tr.shadow  = rgbToArray("rgb(50, 50, 50)"); // Prop 41 only
			tr.distance  = rgbToArray("rgb(60, 20, 0)");
		}
	}

	function rgbToArray(rgbString, alpha, alphaWhenHighlighted) {
		const matches = rgbString.match(/\d+/g);
		if (!matches || matches.length !== 3) {
			throw new Error("Input must be a string in the format" +
							"'rgb(r, g, b)' with three numeric values.");
		}
		const rgb = matches.map(Number);
		if (alpha !== undefined) {
			rgb.push(alpha);
		}
		if (alphaWhenHighlighted !== undefined) {
			rgb.push(alphaWhenHighlighted);
		}
		return rgb;
	}
})();