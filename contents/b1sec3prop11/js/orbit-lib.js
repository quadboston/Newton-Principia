( function() {
    var {
        $$, nssvg, haz, mat,
        sDomF, ssF, ssD,
        rg, stdMod, sconf,
    } = window.b$l.apptree({
        stdModExportList :
        {
            recreates_q2xy,
            recreatesPosCorrector,
            creates_poly2svgP11,
        },
    });
    return;

    
    ///parameters are enclosed in closure for performance
    function recreates_q2xy()
    {
        const ellipseA = sconf.ellipseA;
        const ellipseB = sconf.ellipseB;
        const fi0 = sconf.curveParFi0;
        const center = sconf.diagramOrigin;
        stdMod.q2xy = q2xy;
        return;
        
        function q2xy( q )
        {
            q += fi0;
            return [
                ellipseA * Math.cos( q ) + center[0],
                ellipseB * Math.sin( q ) + center[1],
            ];
        }
    }

    ///decoration, should run in upcreate_media
    ///analogy of
    ///function  pointsArr_2_singleDividedDifferences()
    function creates_poly2svgP11()
    {
        var polylineSvg;
        stdMod.poly2svgP11 = poly2svgP11;
        return;

        function poly2svgP11(arg)
        {
            var curvePoints = ssD.orbitXYToDraw; //ownrange2points({ stepsCount:80 });
            var medpoints = curvePoints.map( cp => ssF.mod2inn( cp, stdMod ) );
            polylineSvg = nssvg.polyline({
                pivots  : medpoints, 
                svgel   : polylineSvg,
                parent  : stdMod.svgScene,

                //should be overridden by ##tp-machine
                //stroke           : haz( arg, 'stroke' ),
                //'stroke-width'   : haz( arg, 'stroke-width' ),
                //fill             : haz( arg, 'fill' ),
            });
            var lowname = sDomF.topicIdUpperCase_2_underscore( 'orbit' );
            //sets tp-machine
            $$.$( polylineSvg ).addClass( 'tostroke thickable tp-'+lowname );
        }
    }
    
    function recreatesPosCorrector()
    {
        const dor = sconf.diagramOrigin;
        const ellA = 1/sconf.ellipseA;
        const ellB = 1/sconf.ellipseB;
        const fi0 = sconf.curveParFi0;
        stdMod.correctsPos8angle2angle = correctsPos8angle2angle;
        return;
        
        ///pos to "virtual" andle
        function pos2t( newPos )
        {
            return mat.pos2angle([
                (newPos[0] - dor[0])*ellA,
                (newPos[1] - dor[1])*ellB,
            ])-fi0; //sconf.curveParFi0 is not a real angle, but
                    //"virtueal" angle fi0
        }
        ///corrects approximate mouse point to exact point on the circle
        function correctsPos8angle2angle( pname, newPos, angle ){
            let rgX = rg[pname];
            if( typeof angle === 'undefined' ){
                angle = pos2t( newPos );
            }
            if( angle < Math.PI*0.01 || angle > sconf.curveParFiMax ){
                angle = ( angle + sconf.curveParFiMax ) % sconf.curveParFiMax;
            }
            let qix = Math.floor( angle/sconf.deltaQ );
            rgX.qix = qix;
            rgX.parQ = qix * sconf.deltaQ;
            var newP = ssD.qix2orb[ qix ].rr;
            let pos = rgX.pos;
            pos[0] = newP[0];
            pos[1] = newP[1];
            return pos;
        }
    }
}) ();

