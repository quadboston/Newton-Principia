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
        //setModule,
        stdModExportList :
        {
            createModelFunctions,
        },
    });
    return;



    /*
    function setModule()
    {
        //createsModelFunctions();
    }
    /// alternative solution
    ///=================================================
    /// configures repo of "experimental" functions
    ///=================================================
    function createsModelFunctions()
    {
    }
    */

    //=================================================
    // //\\ configures curve
    //=================================================
    function createModelFunctions()
    {
        //:principal variable params:
        //sconf.givenCurve_pivots_inModel are negative in this model:
        var pol = rg.curve = mat.calculate_divided_differences( sconf.givenCurve_pivots_inModel );

        var originalFun = pol.calculate_polynomial;

        //for using as default curve in lemma diagram,
        ssD.repoConf = [];
        ssD.repoConf.customFunction = 0;

        ///It is an array because some lemmas can have multiple curves.
        ssD.repoConf = ssD.repoConf.concat(
        [
            {
                fname : "Rotated curve",
                fun : function(x) {
                        var sin = rg.curveRotationAngle.sin;
                        var cos = rg.curveRotationAngle.cos;
                        var y = originalFun( x );
                        var xx = cos * x - sin * y;
                        var yy = sin * x + cos * y;
                        return [ xx, yy ];
                },
            },
            {
                fname : function() {
                    return      'y(x) : (x-' + this.x0.toFixed(2) +
                                ') + (y-' + this.y0.toFixed(2) +
                                ') = ' + this.R.toFixed(2) + '<sup>2</sup>';
                },
                x0 : 0,
                y0 : 0,
                R  : 1,
                branch : 1,  //1 for top, -1 for bottom
                updateParams : function({ x0,y0,R }) {
                    this.x0 = x0;
                    this.y0 = y0;
                    this.R = R;
                    this.branch = 1;
                },
                fun : function(x) {
                        var R = this.R;
                        var xx = x-this.x0;
                        return [ x, this.y0+this.branch*Math.sqrt( R*R -xx*xx ) ];
                },
            },
        ]);
        ssD.repoConf.forEach( fun => {
            fun.fun = fun.fun.bind( fun );
        });
    }
    //=================================================
    // \\// configures curve
    //=================================================






}) ();
