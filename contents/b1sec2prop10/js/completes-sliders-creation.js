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
            // lock Y
            newPos = [ newPos[0], stashedPos[1] ];

            // enforce ellipse equation: solve for a given x,y
            let x = newPos[0];
            let y = newPos[1];
            let b = sconf.ellipseB;

            // compute semi-major axis a from ellipse equation
            let a = Math.sqrt( x*x / (1 - (y*y)/(b*b)) );

            sconf.ellipseA = a;
            sconf.ellipseB = b;
            sconf.ellipseFocus = Math.sqrt(a*a - b*b);
            sconf.eccentricity = sconf.ellipseFocus / a;
            if(sconf.eccentricity) {
                rg.A.pos[0] = x;
                rg.A.pos[1] = y;

                stdMod.rebuilds_orbit(); // draws ellipse
                stdMod.model8media_upcreate(); // repositions points
            }
        };
    };
    //=====================================================================
    // \\// point A slider
    //=====================================================================
}) ();

