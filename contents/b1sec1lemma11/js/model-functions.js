( function() {
    var {
        ns, sn, mat,
        sconf, fconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,
        tr, tp, toreg,

    } = window.b$l.apptree({
        setModule,
    });
    return;




    function setModule()
    {
        createsModelFunctions();
    }


    //=================================================
    // //\\ configures repo of "experimental" functions
    //=================================================
    function createsModelFunctions()
    {
        var scale = 1; //typical lengh for geometrical model
        ssD.repoConf =
        [
            {
                fname : "Original function: y = ax^2+bx^3 ... ",
                fun : x => {
                    /*
                    var x1 = x*scale;
                    var x2 = x1*x1;
                    var x3 = x2*x1;
                    var x4 = x2*x2;
                    var x5 = x3*x1;
                    var x6 = x3*x3;
                    var x8 = x4*x4;
                    var x12 = x6*x6;
                    var x16 = x8*x8;
                    //return [ x,
                    //    -0.55*x2
                    //    + 0.08*x3
                    //    - 0.025*x16
                    return [ x,
                        -0.81*x2
                        + 0.88*x3
                        - 0.32*x4
                        - 0.18*x5
                        - 0.08*x6
                        + 0.023*x12
                        - 0.018*x16
                    ];
                    */
                    return [ x, mat.poly( x*scale, [
                        0,
                        0,
                        -0.81,  //2
                        + 0.88, //3
                        - 0.5,
                        - 0,    //x^5
                        - 0.08, //x^6
                        0,
                        0,
                        0,
                        0,
                        0,
                        0.023, //x^12
                        0,
                        0,
                        0,
                        -0.018, //x^16
                    ])];
                }
            },
            /*
            {
                fname : "y = 2sqrt(|x/" + scale + "|)",
                fun : x => [ x, -0.5*x*x/a2 - 0.6*x*x*x/a3 ],
            },
            */
        ];
    }
    //=================================================
    // \\// configures repo of "experimental" functions
    //=================================================


}) ();

