( function() {
    var { sn, mat, userOptions, hafa, ssD, stdMod, sconf, rg, }
        = window.b$l.apptree({ stdModExportList : { creates_A_slider }, });
    const qIndexToOrbit = sn( 'qIndexToOrbit', ssD, [] );
    return;

    //=====================================================================
    // //\\ point A slider
    //=====================================================================
    function creates_A_slider() {
        let stashedPos = null;
        let sp = rg.A.pos;
        rg.A.processOwnDownEvent = () => {
            stashedPos = [ sp[0], sp[1] ];
        };

        rg.A.processOwnUpEvent = () => {
            sp[0] = stashedPos[0];
            sp[1] = stashedPos[1];
        };
        rg.A.acceptPos = newPos => {
            console.log('dragging A');
            if( mat.p1_to_p2( newPos, sconf.diagramOrigin ).abs > -1 ) {
                    stashedPos[0] = newPos[0];
                    newPos[1] = stashedPos[1];
                    sconf.ellipseFocus = -stashedPos[0];
                    let ellA2 = sconf.ellipseFocus*sconf.ellipseFocus +
                                sconf.ellipseB*sconf.ellipseB;
                    sconf.ellipseA = Math.sqrt( ellA2 );
                    let lambda2 = sconf.ellipseB/sconf.ellipseA;
                    lambda2 *= lambda2;
                    sconf.eccentricity = Math.sqrt( 1 - lambda2 );
                    stdMod.recreates_q2xy();
                    //resets ellpse parameters
                    hafa( stdMod, 'recreatesPosCorrector' )();
            }
            rg.A.pos[0] = newPos[0];
            rg.A.pos[1] = newPos[1];

            stdMod.rebuilds_orbit();
            stdMod.model8media_upcreate();
        }
    };
    //=====================================================================
    // \\// point A slider
    //=====================================================================
}) ();

