( function() {
    var {
        mat, sconf, fconf, ssD, amode, rg,
    } = window.b$l.apptree({
        stdModExportList : {
            createModelFunctions,
        },
    });
    return;


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
                        //patch:
                        if( fconf.sappId === "b1sec1lemma6" &&
                            amode.aspect === 'model' && amode.logic_phase === 'proof'
                        ) {
                            var anRack = rg.curveRotationAngle;
                        } else {
                            ////per team agreement, we block curve positions
                            ////depicting "ad absurdum" proof and position
                            ////the curve in lemma claim position,
                            var anRack = ssD[ "L-equal-d curveRotationAngle" ];
                        }

                        var sin = anRack.sin;
                        var cos = anRack.cos;
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
                ///draws branches of a circle of radius RR, one branch at the time,
                fun : function(x) {
                        var R = this.R;
                        var xx = x-this.x0;
                        return [ x, this.y0+this.branch*Math.sqrt( R*R -xx*xx ) ];
                },
            },

            {
                fname : "Original left branch",
                fun : function(x) {

                        //curvature break is too seen
                        //var sin = 0; //rg.curveRotationAngle.sin;
                        //var cos = 1; //rg.curveRotationAngle.cos;

                        //can do for better obscurity
                        //var sin = Math.sin( -rg.originalGapTangent.angle/2 );
                        var sin = Math.sin( -rg.originalGapTangent.angle );

                        var cos = Math.cos( rg.originalGapTangent.angle );

                        var y = originalFun( x );
                        var xx = cos * x - sin * y;
                        var yy = sin * x + cos * y;
                        return [ -xx, yy ];
                },
            },




        ]);
        ssD.repoConf.forEach( fun => {
            fun.fun = fun.fun.bind( fun );
        });
        ssD.getUnrotatedParameterX = getUnrotatedParameterX;
    }

    /**
     * Convert a rotated X coordinate back to the curve's unrotated parameter X
     * Used to prevent point B from jumping on drag start
     *
     * Params:
     * - rotatedX: accepted new x pos relative to mouse position
     * - estimateX: current rg.B.unrotatedParameterX value
     */
    function getUnrotatedParameterX( rotatedX, estimateX ) {
        var cfun = ssD.repoConf[ssD.repoConf.customFunction].fun;
        var minX = sconf.NON_ZERO_A_PREVENTOR;
        var maxX = rg.curveEnd.pos[0];
        var targetX = rotatedX;

        if( targetX <= minX ) {
            return minX;
        }
        if( targetX >= cfun( maxX )[0] ) {
            return maxX;
        }

        var left = Math.max( minX, estimateX - 0.2 );
        var right = Math.min( maxX, estimateX + 0.2 );
        var leftVal = cfun( left )[0] - targetX;
        var rightVal = cfun( right )[0] - targetX;
        if( leftVal * rightVal > 0 ) {
            left = minX;
            right = maxX;
            leftVal = cfun( left )[0] - targetX;
            rightVal = cfun( right )[0] - targetX;
        }
        if( leftVal * rightVal > 0 ) {
            var cos = (rg.curveRotationAngle && rg.curveRotationAngle.cos) || 1;
            return Math.max( minX, Math.min( maxX, targetX / cos ) );
        }
        for( var ix = 0; ix < 30; ix++ ) {
            var mid = 0.5 * ( left + right );
            var midVal = cfun( mid )[0] - targetX;
            if( Math.abs( midVal ) < 1e-7 ) {
                return mid;
            }
            if( leftVal * midVal <= 0 ) {
                right = mid;
                rightVal = midVal;
            } else {
                left = mid;
                leftVal = midVal;
            }
        }
        return 0.5 * ( left + right );
    }
    //=================================================
    // \\// configures curve
    //=================================================

}) ();

