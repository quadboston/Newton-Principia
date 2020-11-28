( function() {
    var {
        mat, ssD, rg,
    } = window.b$l.apptree({
        stdModExportList : {
            createsModelFunctions_before___init_model_parameters,
        }
    });
    return;











    ///the same function is used for left and right part of the Lemma diagram
    function baseFunction( x )
    {
        return mat.poly
        (
            x,
            [
                0,
                -0.29,
                -0.56,
                -0.08,
                 0,
                 0,
                 0.04,
                 0.15,
                -0.09,
                -0.55,
                 0,
                -0.15,
            ],
        ) + rg.a.pos[1];
    }




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
                        baseFunction( x )
                    ];
                },
                //fname : "Curve acE",
                //pointA      : rg.a,
                //pointB      : rg.E,
            },

            {
                fun : x => {
                    var xFromP = (x-rg.P.pos[0]);

                    return [
                        x,
                        rg.magnitudeY.val * baseFunction( xFromP / rg.magnitudeX.val )
                    ];
                },
            },
        ];
    }
    //=================================================
    // \\// template functions repo
    //=================================================


}) ();

