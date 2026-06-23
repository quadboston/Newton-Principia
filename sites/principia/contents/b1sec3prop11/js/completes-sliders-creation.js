( function() {
    var {
        sn, mat, userOptions, hafa, haff,
        amode, ssD, stdMod, sconf, rg,
    } = window.b$l.atree({
        stdModList :
        {
            creates_S_slider,
        },
    });
    const qix2orb = sn( 'qix2orb', ssD, [] );
    return;


    //=====================================================================
    // //\\ point S slider
    //=====================================================================
    function creates_S_slider() {
        let stashedPos = null;
        let sp = rg.S.pos;
        rg.S.processOwnDownEvent = () => {
            stashedPos = [ sp[0], sp[1] ];
        };

        rg.S.processOwnUpEvent = () => {
            sp[0] = stashedPos[0];
            sp[1] = stashedPos[1];
        };
        rg.S.acceptPos = newPos => {
            if( mat.p1_to_p2( newPos,
                sconf.diagramOrigin ).abs > -1
            ){
                //if( amode.aspect === 'addendum' ) {
                //    stashedPos[0] = newPos[0];
                //    stashedPos[1] = newPos[1];
                //} else
                {
                    if( newPos[0] > -0.00001 || newPos[0] < -1.2 ) {
                        return false;
                    }
                    stashedPos[0] = newPos[0];
                    newPos[1] = stashedPos[1];
                    sconf.curve.ellipseFocus = -stashedPos[0];
                    rg.H.pos[0] = sconf.curve.ellipseFocus;
                    let ellA2 = sconf.curve.ellipseFocus*sconf.curve.ellipseFocus +
                                sconf.curve.ellipseB*sconf.curve.ellipseB;
                    sconf.curve.ellipseA = Math.sqrt( ellA2 );
                    let lambda2 = sconf.curve.ellipseB/sconf.curve.ellipseA;
                    lambda2 *= lambda2;
                    sconf.curve.eccentricity = Math.sqrt( 1 - lambda2 );
                    haff( rg.borbit, 'recreates__bodyq2xy' );
                    //resets ellpse parameters
                    hafa( stdMod, 'recreates__posCorrector' )();
                }
            }
            hafa( stdMod, 'correctsPos8angle2angle' )(
                'P', null,
                //reuses former q,
                //this moves point P, but in the nice manner
                ssD.qix2orb[ rg.P.qix ].q
            );
            rg.S.pos[0] = newPos[0];
            rg.S.pos[1] = newPos[1];
            rg.borbit.rebuilds_orbit();
            stdMod.model8media_upcreate();
        }
    };
    //=====================================================================
    // \\// point S slider
    //=====================================================================
}) ();

