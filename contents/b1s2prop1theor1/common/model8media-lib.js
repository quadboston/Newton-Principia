( function() {
    var {
        sn, haff, haz, nspaste, mat, nssvg,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            time_2_preparedForDisplay,
            doesPosition_PTandTheirLine,
            sliderTime_2_time8stepIndices,
            protects_curTime_ranges,
        },
    });
    return;








    ///returns protected time
    function protects_curTime_ranges( ctime )
    {
        let sl = rg.slider_sltime;
        ctime = ( ctime || ctime === 0 ) ? ctime : sl.curtime;
        ctime = Math.min( ctime, sconf.timeRange * 0.999999 );
        sl.curtime = ctime = Math.max(
            ctime,
            sconf.timeMin0 * rg.rgslid_dt.val
        );
        return ctime;
    }



    function sliderTime_2_time8stepIndices()
    {
        var sp8ep   = haz( rg, 'slider_sltime' );
        var ctime    = rg.slider_sltime.curtime;
        //ctime        = protects_curTime_ranges( ctime );
        //----------------------------------------
        // //\\ establishes model step and substep
        //      stepIx4   = 0,1,2,3,  4,5,6,7,  8,9,10,11, ... 
        //      substepIx = 0,1,2,3,  0,1,2,3,  0,1, 2, 3, ...
        //      stepIx    = 0,0,0,0,  1,1,1,1,  2,2, 2, 2, ... 
        //      point     = A,A,A,A,  -,-,-,B,  -,-, C, C, ...
        //      lemma-launch-time =         *
        //      T2Coroll-time =                      *
        //----------------------------------------
        //virtual thing, just stretches time to better subdivide stepIx
        var stepIx4 = Math.floor( ctime * 4 / rg.rgslid_dt.val );
        rg.stretchedFourTimes_stIx = stepIx4;
        //substep in its original meaning: one of the four substeps indices
        rg.substepIx    = stepIx4%4;
        //steps in its original meaning
        var stepIx      = ( stepIx4 - rg.substepIx ) / 4;
        stepIx          = Math.min( stepIx, rg.spatialSteps - 1 );
        toreg( 'stepIx' )( 'value', stepIx );
        //----------------------------------------
        // \\// establishes model step and substep
        //----------------------------------------
    }


    //=========================================================
    //=========================================================
    function time_2_preparedForDisplay()
    {
        var path        = rg.path.pos;
        var stepIx      = rg.stepIx.value;
        var substepIx   = rg.substepIx;

        //==================================================================
        // //\\ visualizes time offsets
        //==================================================================
        rg.thoughtStep.value = (substepIx+1) + '';
        //this sets granular time display increment
        //during last proof step
        var effectiveTime = rg.stepIx.value * rg.rgslid_dt.val;           
                            //rg.slider_sltime.curtime.toFixed(2);        
        rg.displayTime.value = effectiveTime.toFixed(2);
            //was: why?: rg.displayTime.value = (rg.displayTime.value-1).toFixed(2);

        //if( stepIx === 1 ) {
            ////before thought experiment, no indication of it is shown
        //    rg.thoughtStep.value = "";
        //}
        //==================================================================
        // \\// visualizes time offsets
        //==================================================================
    }


    ///points P and T do depend on time, so cannot be updated
    ///in tr2decs subroutine
    function doesPosition_PTandTheirLine()
    {
        var st      = rg.stepIx.value;
        var path    = rg.path.pos;
        if( st >= path.length -1 ) return; //no second point

        //perpendicular to unseen lines looks awkward
        //st -= rg.substepIx < 2 ? 1 : 0;
        var pos0    = path[ st-1 ];
        var pos1    = path[ st ];
        nspaste( rg.P.pos, mat.dropPerpendicular( rg.S.pos, pos0, pos1 ) );
        nspaste( rg.T.pos, pos0 );
        [ 'P', 'T' ].forEach( pname => {
            rgP = ssF.rgPos2rgMedia( pname, );
            ///this compensates non-using of engine-template-function
            ///doPaintLetter8kernel( pname ),
            ///but why "engine-template" is not used?
            nssvg.printText({
                svgel   : rgP.pnameLabelsvg,
                x       : rgP.medpos[0]+8,
                y       : rgP.medpos[1]-10,
            });
        });
        ssF.pnames2line( 'S', 'P', );
        ssF.pnames2line( 'T', 'P', );
        //rg.P.p is unit vector interface
        rg.P.p = mat.p1_to_p2( rg.S.pos, rg.P.pos );

        // //\\ patch
        rgP = ssF.rgPos2rgMedia( 'v', );
        ///this compensates non-using of engine-template-function
        ///doPaintLetter8kernel( pname ),
        ///but why "engine-template" is not used?
        nssvg.printText({
            svgel   : rgP.pnameLabelsvg,
            x       : rgP.medpos[0]+10,
            y       : rgP.medpos[1]+15,
        });
        // \\// patch
    }

}) ();

