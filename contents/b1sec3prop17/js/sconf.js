
( function() {
    var { ns, sn, mat, fconf, sconf, stdMod, fixedColors, } = 
        window.b$l.apptree({ ssFExportList : { init_conf } });
    // sn points to sconf.orbitParameters if param exisits, 
    // these are initialized here as empty objs
    var op = sn( 'orbitParameters', sconf ); //conic ABD (brown)
    var sop = sn( 'sampleOrbitParameters', sconf ); //conic pq (green)
    return;


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {
        //console.log('sconf.js init_conf'); //called once on page load
        
        //====================================================
        // //\\ subapp regim switches
        //====================================================
        sconf.enableStudylab            = false;
        sconf.enableTools               = true;

        //setting to false removes S, SA, P, SP, eccentricity label and line (not dot)
        sconf.rgShapesVisible           = true; 
        //====================================================
        // \\// subapp regim switches
        //====================================================

        //***************************************************************
        // //\\ decorational parameters
        //***************************************************************        
        //for real picture if diagram's picture is supplied or
        //for graphical-media work-area if not supplied:
        var pictureWidth = 1037;
        var pictureHeight = 765;

        //to comply standard layout, one must add these 2 lines:
        var realSvgSize = 2 * ( pictureWidth + pictureHeight ) / 2;
        var controlsScale = realSvgSize / sconf.standardSvgSize;

        //making size to better fit lemma's diagram
        fconf.LETTER_FONT_SIZE_PER_1000 = 20;  
        
        fconf.DRAGGER_TOLERANCE = 10; // distance where crosshair appears

        // override engine defaults, in expands-conf.js,
        default_tp_stroke_width = Math.floor( 6 * controlsScale ),
        defaultLineWidth        = Math.floor( 1 * controlsScale ),
        handleRadius            = Math.floor( 2.8 * controlsScale ),        
        sconf.pointDecoration.r = handleRadius;        
        sconf.default_tp_lightness = 30;

        // principal tp-css pars; see: topics-media-glocss.js
        // this makes hanle's border nicely thin
        sconf.nonhover_width = Math.max( 1, Math.floor( 1*controlsScale/1.6 ) );
        sconf.hover_width    = Math.max( 2, Math.floor( 7*controlsScale/1.6 ) );

        //make effect apparently only for line-captions,
        //not for point-captions bs
        //misses: pnameLabelsvg).addClass( 'tp-_s tostroke' );
        sconf.text_nonhover_width   = 0.2; //vital to fix too thick font
        sconf.text_hover_width      = 1.5;
        
        // points reused in config      
        var F = [ 350, 410 ]; //x,y of whole svg model (S's starting pos)
        sconf.diagramOrigin = [ 0, 0 ];
        var originX_onPicture = F[0]; //for model's axis x
        var originY_onPicture = F[1]; //for model's axis y
        //***************************************************************
        // \\// decorational parameters
        //***************************************************************
        

        //gravitational constant
        var Kepler_g = 0.64478; //3.5105 * (0.6/1.4)*(0.6/1.4);
        op.Kepler_g = op.Kepler_gInitial = Kepler_g;
        sop.Kepler_g = sop.Kepler_gInitial = Kepler_g;

        //model's spacial unit expressed in pixels of the picture, 
        //vital to set to non-0 value
        var mod2inn_scale = 260; 


        //-------------------------------------------
        // //\\ sop (green conic)
        //-------------------------------------------
        sop.latus = sop.latusInitial = 1; //length
        sop.forceHandle = sop.forceHandleInitial = 0.8; //pos of dragger f        
        {
            //Book's diagram values
            sop.r = 1.30307;
            sop.r2axisX_angle = sop.r2axisX_angle_initial = 2.24;
            let sin2speed = 0.999;

            //Book's derivative values
            let eta = sop.latus / sop.r;
            let e = Math.sqrt( eta*eta / sin2speed / sin2speed - 2 * eta + 1 );
            let fi = Math.acos( (1-eta)/e );
            sop.PparQ_initial = fi;
            sop.initialEccentricity = e;
            
            //derived
            sop.mainAxisAngle = sop.r2axisX_angle - sop.PparQ_initial;

            stdMod.establishesEccentricity( sop.initialEccentricity, null, sop ); 
            sop.sagittaDelta_q_initial = 0.4; //decoration
        }        
        // speed
        var { Kepler_v, cosOmega, om } = mat.conics.innerPars2innerPars({
                lat         : sop.latusInitial,
                fi          : sop.PparQ_initial,
                e           : sop.initialEccentricity,
                Kepler_g    : sop.Kepler_g,
        })
        sop.Kepler_v = sop.Kepler_v_initial = Kepler_v;
        sop.cosOmega = sop.cosOmega_initial = cosOmega;
        sop.om = sop.om_initial = om;
        //-------------------------------------------
        // \\// sop
        //-------------------------------------------

        //-------------------------------------------
        // //\\ op (brown conic)
        //-------------------------------------------        
        op.mainAxisAngle = op.mainAxisAngle_initial = 0; //angle of ASCHD
        op.latus = op.latusInitial = 0.93; //length
        op.initialEccentricity  = 0.60; //change this to 1 to test parabola condition
        {
            let sag_init = 0.16; //affects pos of R
            var PparQ = 0.39 * Math.PI; //affects pos of P,Q,R,Pv (keeps them on conic)

            op.PparQ_initial = op.PparQ_initial_essay = PparQ;
            op.delta_t = op.delta_t_initial = sag_init * 2.5;
            op.delta_t_LIMIT = op.delta_t_initial * 1.5;

            stdMod.establishesEccentricity( op.initialEccentricity );
        }
        // speed
        var { Kepler_v, cosOmega, om } = mat.conics.innerPars2innerPars({
                lat         : op.latusInitial,
                fi          : PparQ,
                e           : op.initialEccentricity,
                Kepler_g    : op.Kepler_g,
        });
        //saves initial speed
        op.cosOmega = op.cosOmega_initial = cosOmega;
        op.om = op.om_initial = om;
        op.Kepler_v = op.Kepler_v_initial     = Kepler_v;
        //-------------------------------------------
        // \\// op (brown conic)
        //------------------------------------------- 

        //-----------------------------------
        // //\\ topic group colors
        //-----------------------------------
        const {
            given,
            body,
            orbit,
            proof,
			resultOnlyVisibleWhenHighlighted,
			givenOnlyVisibleWhenHighlighted,
            result,
            force,
            shadow,
            hidden,
            attention,
        } = fixedColors;
        let red = [255,0,0]; //for debugging

		const ALL_EXCEPT_PROBLEM_TAB = 
			'subessay--solution subessay--corollary1 subessay--corollary2';

        var predefinedTopics =
        {
            given,
            proof,
            result,
            hidden,
            body,
            orbit               : result,
            'orbit-sample'      : given,
            trace               : [...given, 0.5], // show only faint line for full sample orbit
            shadow,
            force               : force,

            // table colours
            e                   : result,
            conic               : result
        };
        //-----------------------------------
        // \\// topic group colors,
        //-----------------------------------

        var originalPoints = {};
        Object.assign( originalPoints, {
            S : {
                pcolor : result,
                letterAngle : -115,
                letterRotRadius : 20,
            },

            //-------------------------------------------
            // //\\ op (brown conic)
            //------------------------------------------- 
            P : {
                pcolor : body,
                letterAngle : 225
            }, 
            K : {
                pcolor : proof,
				cssClass: 'subessay--solution subessay--corollary1',
                letterRotRadius : 20,
                letterAngle : -60,
            },           
            B : {
                letterRotRadius : 20,
				cssClass: 'subessay--solution',
                pcolor : result,
            },
            C : { //center symmetry of orbit
                pcolor : result,
				cssClass: 'subessay--solution',
                letterAngle : -45,
            },

            H : {
                pcolor : result,
				cssClass: ALL_EXCEPT_PROBLEM_TAB,
                letterAngle : -90,
            },
            D : {
                pcolor : result,
				cssClass: 'subessay--corollary1 subessay--corollary2',
                letterRotRadius : 20,
            },
            vb : { //speed of the body (dragger)
                caption : 'R',
                pcolor : body,
                letterAngle : 135, // degrees CCW from east
                letterRotRadius : 25, //distance from point
                draggableX  : true,
                draggableY  : true,
            },
            Q : {
                pcolor : result,
				cssClass : 'subessay--solution',
                letterAngle : 225,
                letterRotRadius : 20,
            },
            //-------------------------------------------
            // //\\ op (brown conic)
            //------------------------------------------- 

            //-------------------------------------------
            // //\\ sop (green conic)
            //-------------------------------------------
            p : {
                pcolor : given,
                letterAngle : 120,
            },
            vSample : { // dragger r
                caption : 'r',
                pcolor : given,
                letterAngle : 135,
                letterRotRadius : 20,
                draggableX  : true,
                draggableY  : true,
            },
            f : { //force dragger
                caption : '',
                pcolor : force,
                letterAngle : 90,
                letterRotRadius : 17,
                draggableX  : true,
                draggableY  : true,
                fontSize : 20,
            },
            q : {
                pcolor : given,
				cssClass : 'subessay--solution',
                letterAngle : -65,
                letterRotRadius : 20,
            },
            //-------------------------------------------
            // //\\ sop (green conic)
            //-------------------------------------------
            
            //not shown as points, but used in calculations to draw lines
			A : {
                pcolor : result,
				cssClass : 'hidden',
                letterRotRadius : 20,
                letterAngle : -90,
            },
            L : {
				// latus rectum endpoint of orbit PQ
                pcolor : orbit,
                cssClass : 'hidden',
                letterAngle : -45,
                letterRotRadius : 20,
            },
            LL : {
				// latus rectum endpoint of orbit PQ
                pcolor : orbit,
                cssClass : 'hidden',
                doPaintPname : false,
            },
            l : {
				// latus rectum endpoint of orbit pq
                pcolor : given,
                cssClass : 'hidden',
                letterAngle : -45,
                letterRotRadius : 20,
            },
            ll : {
				// latus rectum endpoint of orbit pq
                pcolor : given,
				cssClass : 'hidden',
                doPaintPname : false,
            },
            
            Y : {
				// intersection of PR and its ⟂ with S
                pcolor : proof,
				cssClass : 'hidden',
                letterAngle : 45,
            },
            Ys : {
				// intersection of pr and its ⟂ with S
                pcolor : proof,
				cssClass : 'hidden',
                letterAngle : 45,
            },
        });

        var linesArray =
        [
            //-------------------------------------------
            // //\\ op (PR brown conic)
            //-------------------------------------------                        
            { SP : { pcolor : body},},   
            { SK : {
				pcolor : proof,
				cssClass: 'subessay--solution subessay--corollary1',
			}, },
            { PH : { 				
				pcolor : proof,
				cssClass: 'subessay--solution subessay--corollary1',
			}, },
            { PK : {
				pcolor : attention,
				cssClass: 'subessay--solution subessay--corollary1',
			}, },
            { 'L,LL' : { 
				pcolor : resultOnlyVisibleWhenHighlighted,
               captionShiftNorm : 22, lposYSugar : 3
			}, },
            { CB : {
				pcolor : result,
				cssClass: 'subessay--solution',
			}, },   
            { BH : {
				pcolor : proof,
				cssClass: 'subessay--solution',
			}, },
            { 'P,vb' : { 
                pcolor : body, 'stroke-width' : 2, 
                captionShiftNorm : -18,
                vectorTipIx : 1
			}, },
                        
            //not visible, because behind overlapping lines  
            //but may be highlighted in text links                      
            { CS : {
				pcolor : result,
				cssClass: 'subessay--solution',
			}, },
            { DS : { 
				pcolor : proof,
				cssClass: 'subessay--corollary1 subessay--corollary2',
			}, },
            { DH : {
				pcolor : result,
				cssClass: 'subessay--corollary1 subessay--corollary2',
			}, },
            { CH : {
				pcolor : proof,
				cssClass: 'subessay--solution',
			}, },

            // perpendiculars referenced in the Solution
            { 'SY' : { 
				// perpendicular from S to PR
                pcolor : resultOnlyVisibleWhenHighlighted,
                captionShiftNorm : -28 
            }, }, 
            { 'S,Ys' : { 
				// perpendicular from S to pr
                pcolor : givenOnlyVisibleWhenHighlighted,
                captionShiftNorm : -28 
            }, },
            //-------------------------------------------
            // \\// op (brown conic)
            //------------------------------------------- 

            //-------------------------------------------
            // //\\ sop (green conic)
            //-------------------------------------------  
			{ 'Sp' : { 
                pcolor : given,
                'stroke-width' : 1.1, 
                captionShiftNorm : -18}, 
            },
            { 'p,f' : { 
                pcolor : force,
                'stroke-width' : 1.1, 
                captionShiftNorm : -18,
                vectorTipIx : 1 }, 
            },
            { 'l,ll' : { 
                pcolor : givenOnlyVisibleWhenHighlighted,
                captionShiftNorm : 44, 
                lposYSugar : -5, }, 
            },
            { 'p,vSample' : { 
                pcolor : given, 
                'stroke-width' : 1.1, 
                captionShiftNorm : -18,
                vectorTipIx : 1 }, 
            },
            //-------------------------------------------
            // \\// sop (green conic)
            //------------------------------------------- 

        ];

        ns.paste( sconf, {
            mediaBgImage : "diagram.png",
            predefinedTopics,
            originalPoints,
            linesArray,
            originX_onPicture,
            originY_onPicture,
            pictureWidth,
            pictureHeight,
            mod2inn_scale,
            default_tp_stroke_width,
            defaultLineWidth,
            handleRadius,
        });
    }
}) ();

