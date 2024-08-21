( function() {
    var {
        mat,
        sconf, stdMod, toreg, sData,
    } = window.b$l.apptree({
        stdModExportList :
        {
            init_model_parameters,
        },
    });
    return;









    //===================================================
    // //\\ registers model pars into common scope
    //===================================================
    function init_model_parameters()
    {
        //:primary params
        toreg( 'a' )( 'value', sconf.a );
        toreg( 'b' )( 'value', sconf.b );
        //toreg( 'O' )( 'pos', [0,0] );

        sData.aScale = ( rg.aEnd.pos[0] - rg.aStart.pos[0] ) / sconf.aMax;
        stdMod.slider_a_value2pos();

        stdMod.deriveParameters( 'do set T' );
        stdMod.completesSlidersCreation();
        /*
        ///draws correct ellipse by model params
        (function() {
            var stepsCount = 50;
            var step = 2*Math.PI/stepsCount;
            for( var ii = 0; ii < stepsCount; ii++ ) {
                var t = step * ii;
                var ell = mat.ellipse({
                    //t:Math.PI*1.5,
                    t:t,
                    a:rg.a.value,
                    b:rg.b.value,
                    x0:0,
                    y0:0,
                    t0:0,
                    rotationRads:-sconf.rotationRads,
                });
                t r( 'e'+ii, 'pos', [ell.x, ell.y] );
                ssF.pos2pointy(
                    'e'+ii,
                    { 
                        cssClass        : 'tofill tostroke',
                        'stroke'        : 'red',
                        'fill'          : 'transparent',
                        'stroke-width'  : 1,
                        r               : 2,
                    }
                );
            };
        })();
        */
        //dev tool:
        //ellipsePar_create8paint( 1.50 )

    }

}) ();

