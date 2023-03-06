( function() {
    var {
        ns, sn, ow, has, $$, nssvg, eachprop,
        fconf, ssF, ssD, sData,
        amode, stdMod, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
            media_upcreate___before_basic,
        },
    });
    var op = sn( 'orbitParameters', sconf );
    return;







    function media_upcreate___before_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;
        //rg.allLettersAreHidden = false;
    }

    function makesArc({
        radius,
        angleMax,
        angleMin,   //optional, 0 by default
        circleName
    }){
        let rgX = toreg( circleName )();
        let len = 200;
        angleMin = ow( arguments[0], 'angleMin' ) ? angleMin : 0;
        let angleStep = (angleMax-angleMin) / len;
        rgX.pivots = has( rgX, 'pivots' ) ? rgX.pivots : [];
        for( var ix=0; ix<len; ix++ ) {
            var angle = angleMin + angleStep * ix;
            rgX.pivots[ix] =[ 
                          -radius * Math.sin( angle ), //effective "x"-axis to the screen left
                           radius * Math.cos( angle )
                        ];
        };
    }

    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        {
            ///draws fi
            ///adds an extra point, fi, at rg.O to comply angle-api
            var fi = toreg( 'fi' )( 'pname', 'fi' )( 'pos', rg.C.pos )
                ( 'pcolor', 'rgba(0,0,0,0.05)' ) //rg.Fi.pcolor
                ();
            fi.medpos = ssF.mod2inn( fi.pos );
            ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
                AB          : rg[ 'CV' ].pivots,
                CD          : rg[ 'CX' ].pivots,
                rgSample    : fi, //pname used for tp...
                ANGLE_SIZE  : 2*rg.V.pos[1],
                captionRadiusIncrease : 1.02,
                caption     : 'φ',
            });
        }

        {
            ///draws fi
            ///adds an extra point, fi, at rg.O to comply angle-api
            var XCY = toreg( 'XCY' )( 'pname', 'XCY' )( 'pos', rg.C.pos )
                ( 'pcolor', 'rgba(0,0,0,0.05)' ) //rg.Fi.pcolor
                ();
            XCY.medpos = ssF.mod2inn( XCY.pos );
            ssF.drawAngleFrom_rayAB2rayCD_at_medpos({
                AB          : rg[ 'CX' ].pivots,
                CD          : rg[ 'CY' ].pivots,
                rgSample    : XCY, //pname used for tp...
                ANGLE_SIZE  : 2*rg.V.pos[1],
                //captionRadiusIncrease : 1.02,
                caption     : '',
            });
        }

        eachprop( sData.quadSolved.kernel, (prop,pname) => {
            let rgX = toreg( pname )();
            rgX.pivots = prop;
            stdMod.buildsQuadPlot( rgX );
        });
        eachprop( sData.quadSolved, (prop,pname) => {
            if( pname !== 'orbit' ) return;
            let rgX = toreg( pname )();
            rgX.pivots = prop;
            stdMod.buildsQuadPlot( rgX );
        });

        //circles
        {
            let cName = 'MainCircle';
            //makesArc({ radius:rg.V.pos[1], angleMax:sconf.angleOfR, circleName:cName });
            makesArc({ radius:rg.V.pos[1], angleMax:Math.PI, circleName:cName });
            stdMod.buildsQuadPlot( rg[ cName ] );

            cName = 'DCircle';
            makesArc({ radius:rg.D.pos[1], angleMax:rg.X.FiD, circleName:cName });
            stdMod.buildsQuadPlot( rg[ cName ] );

            cName = 'ECircle';
            makesArc({ radius:rg.E.pos[1], angleMax:rg.X.FiD, circleName:cName });
            stdMod.buildsQuadPlot( rg[ cName ] );

            cName = 'NK';
            makesArc({ radius:rg.E.pos[1], angleMax:rg.X.FiD, angleMin:rg.Y.FiE, circleName:cName });
            stdMod.buildsQuadPlot( rg[ cName ] );

            cName = 'YX';
            makesArc({ radius:rg.V.pos[1], angleMax:rg.X.FiD, angleMin:rg.Y.FiE, circleName:cName });
            stdMod.buildsQuadPlot( rg[ cName ] );
        }

        //=============================================================
        // //\\ draws curves
        //=============================================================
        //vital: enables curve move when dragging an entire diagram,
        //       othewise, pivots and curve are non-synched,
        rg[ 'approximated-curve' ].poly2svg({});
        //=============================================================
        // \\// draws curves
        //=============================================================
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================

}) ();

