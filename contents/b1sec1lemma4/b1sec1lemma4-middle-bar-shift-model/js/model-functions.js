( function() {
    var {
        mat,
        ssD,
        rg,
        stdMod,
    } = window.b$l.apptree({
        stdModExportList : {
            createsModelFunctions_before___init_model_parameters,
            //baseFunction,
        }
    });
    return;















    //=================================================
    // //\\ template functions repo
    //=================================================
    function createsModelFunctions_before___init_model_parameters()
    {
        ssD.repoConf =
        [
            {
                rgName : "acE",
                pointsName : 'aE', //not the best
                fun : x => {
                    return [
                        x,
                        stdMod.baseFunction( x )
                    ];
                },
                //fname : "Curve acE",
                //pointA      : rg.a,
                //pointB      : rg.E,
            },

            {
                fun : x => {
                    var xFromP = x-rg.P.pos[0];
                    var argX = xFromP / rg.ptransform.val[0][0];
                    var argY = stdMod.baseFunction( argX );
                    var newX = x + rg.ptransform.val[1][0] * argY;
                    var newY = rg.ptransform.val[1][1] * argY + rg.P.pos[1]-rg.A.pos[1];
                    return [
                        newX,
                        newY,
                    ];
                },
            },
        ];
    }
    //=================================================
    // \\// template functions repo
    //=================================================


}) ();

