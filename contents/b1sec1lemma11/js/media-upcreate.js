( function() {
    var {
        $$, nsmethods, rg,
        ssF, ssD, sconf,
        amode, stdMod, toreg, nssvg
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;


    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
		paintCurveFromAto(rg.b);
		paintCurveFromAto(rg.B);
        paintCircle();

		function paintCurveFromAto(endPoint) {
			ssF.paintsCurve({
				fun         : ssD.repoConf[0].fun,
				mmedia      : stdMod.mmedia,
				pointA      : rg.A,
				pointB      : endPoint,
				addToStepCount : 1,
			});
		}

        function paintCircle() {
            const circleName = 'circleJA';
            var rgCircle = toreg( circleName )();
            const centerPos = ssF.mod2inn( rg.J.pos );
            const radius = sconf.mod2inn_scale * calcRadius();
            rgCircle.svgel = nssvg.u({
                svgel   : rgCircle.svgel,
                parent  : stdMod.mmedia,
                type    : 'circle',
                stroke  : rg.circleJA.pcolor,
                fill    : 'transparent',
                'stroke-width' : '1',
                cx : centerPos[0],
                cy : centerPos[1],
                r : radius,
            });
            $$.$( rgCircle.svgel ).addClass(
                'tp-' + nsmethods.toCssIdentifier( circleName ) +
                ' tostroke'
            );

            function calcRadius(center = rg.J.pos, pointOnCircle = rg.A.pos) {
                const dx = pointOnCircle[0] - center[0];
                const dy = pointOnCircle[1] - center[1];
                const radius = Math.hypot(dx, dy);
                return radius;
            }
        }
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();
