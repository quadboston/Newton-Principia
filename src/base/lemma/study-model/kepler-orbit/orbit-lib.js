( function() {
    var {
        $$, nssvg,
        sDomF, ssF, ssD,
        rg, stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            recreates_q8pos_2_q8pos8qix,
            creates_poly2svg_for_lemma,
        },
    });
    return;

    
    ///decoration, should run in upcreate_media
    ///analogy of
    ///function  pointsArr_2_singleDividedDifferences()
    function creates_poly2svg_for_lemma()
    {
        var polylineSvg;
        stdMod.poly2svgP11 = poly2svgP11;
        return;

        function poly2svgP11(arg)
        {
            const curve_points = ssD.orbitXYToDraw;
            polylineSvg = nssvg.polyline({
                pivots  : curve_points.map( cp => ssF.mod2inn( cp, stdMod ) ), 
                svgel   : polylineSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            const lowname = sDomF.topicIdUpperCase_2_underscore( 'orbit' );
            //sets tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );
        }
    }

    function recreates_q8pos_2_q8pos8qix( q0 )
    {
        const dor = sconf.diagramOrigin;
        const pos2q = stdMod.pos2q;
        const orbit_q_end = sconf.orbit_q_end;
        const deltaQ = sconf.deltaQ;
        stdMod.q8pos_2_q8pos8qix = q8pos_2_q8pos8qix;
        return;

        ///corrects approximate mouse point to qq-grid point
        function q8pos_2_q8pos8qix( 
            pname,
            newPos, //alternative to qq
            qq,     //alternative to newPos
        ){
            let rgX = rg[pname];
            if( !qq && qq !== 0 ){
                qq = pos2q( newPos );
            }
            if( qq < q0 ){
                qq = q0;
            } else if( qq > orbit_q_end * 1.3 ){
                qq = 0.0001;
                //would be a revolving:
                //qq = ( qq + orbit_q_end ) % orbit_q_end;
            } else if( qq > orbit_q_end ){
                qq = orbit_q_end;
                //would be a revolving:
                //qq = ( qq + orbit_q_end ) % orbit_q_end;
            }
            
            // //\\ normalizes qix, parQ, and newP
            let qix = Math.floor( qq/deltaQ );
            rgX.qix = qix;
            rgX.parQ = qix * deltaQ;
            var newP = ssD.qix2orb[ qix ].rr;
            let pos = rgX.pos;
            pos[0] = newP[0];
            pos[1] = newP[1];
            // \\// normalizes qix, parQ, and newP
            return pos;
        }
    }
}) ();

