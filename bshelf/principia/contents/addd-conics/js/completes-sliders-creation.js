( function() {
    var {
        sn, mat,
        fconf, sData,
        stdMod, sconf, rg, toreg,
    } = window.b$l.atree({
        stdModList :
        {
            completesSlidersCreation,
        },
    });
    sconf.REPELLING_DISTANCE = 0.01;
    return;













    ///****************************************************
    ///****************************************************
    function completesSlidersCreation()
    {
        //=========================================================================
        // //\\ point P slider
        //=========================================================================
        rg.P.acceptPos = newPos => {
            //-------------------------------------------------------------------
            // //\\ corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            var q =  stdMod.pos2t( newPos );
            if( q < Math.PI*0.01 || q > sconf.curve.curveParFiMax ) {
                q = ( q + sconf.curve.curveParFiMax ) % sconf.curve.curveParFiMax;
            } //  return false;
            var newP = rg.borbit.dyn_q2xy( q );
            newPos[0] = newP[0];
            newPos[1] = newP[1];
            //-------------------------------------------------------------------
            // \\// corrects approximate mouse point to exact point on the circle
            //-------------------------------------------------------------------
            return true;
        }
        //=========================================================================
        // \\// point P slider
        //=========================================================================



        //=========================================================================
        // //\\ point S slider
        //=========================================================================
        {
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
                if( mat.p1_to_p2( newPos, sconf.diagramOrigin ).abs > -1 ) {
                    stashedPos[0] = newPos[0];
                    stashedPos[1] = newPos[1];
                }
                return true;
            }
        }
        //=========================================================================
        // \\// point S slider
        //=========================================================================
    }


}) ();

