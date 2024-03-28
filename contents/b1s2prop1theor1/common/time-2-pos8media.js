( function() {
    var {
        sn, haff, haz, nspaste, mat, nssvg,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            time_2_displayTimeStrings,
            doesPosition_PTandTheirLine,
            sliderTime_2_time8stepIndices,
            protects_curTime_ranges,
        },
    });
    return;








    ///returns protected time
    function protects_curTime_ranges( ctime )
    {
        //protects_stepIx_exceeding_stepMax( ctime )
        ctime = Math.min( ctime, sconf.timeRange * 0.999999 );
        return Math.max(
            ctime,
            1.75000001 //1.75 fits slider 4-step scenario <-->
                       //lemma-launch-time below,
        );
    }



    function sliderTime_2_time8stepIndices()
    {
        var sp8ep   = haz( rg, 'slider_sltime' );
        var ctime    = rg.slider_sltime.curtime;
        ctime        = protects_curTime_ranges( ctime );
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
    function time_2_displayTimeStrings()
    {
        var path        = rg.path.pos;
        var stepIx      = rg.stepIx.value;
        var substepIx   = rg.substepIx;

        //========================================================================
        // //\\ visualizes time offsets
        //========================================================================
        rg.displayStep.value = stepIx + '';
        rg.thoughtStep.value = (substepIx+1) + '';
        let curTime          = rg.slider_sltime.curtime;

        if( stepIx === 1 ) {
            ////before thought experiment, no indication of it is shown
            rg.thoughtStep.value = "";
        }

        //---------------------------------------------------------
        // //\\ displays time
        //      , this deserves elaboration, because is the heart
        //      of differential method and interaction
        //---------------------------------------------------------

        //this sets granular time display increment
        //during last proof step
        rg.displayTime.value = curTime;

        /*
        if( substepIx < 1 ) {
            rg.displayTime.value =

                //during first proof step "Bc", time grows by magnitude
                //of timeStep-length/2
                ( stepIx + (curTime - stepIx - 0) * 2 ) *

                rg.rgslid_dt.val;

        } else if( substepIx < 2 ) {

            rg.displayTime.value = (stepIx+0.5) * rg.rgslid_dt.val;

        } else if( substepIx < 3 ) {
            ////here, after force BV is applied, time begins
            ///growing again
            rg.displayTime.value =

                //during third proof step, time grows by magnitude
                //of timeStep-length/2
                ( stepIx + 0.5 + (rg.slider_sltime.curtime- stepIx - 0.5) * 2 ) *

                rg.rgslid_dt.val;
        } else {
            rg.displayTime.value = ((stepIx+1)*rg.rgslid_dt.val);
        }
        */
        rg.displayTime.value = (rg.displayTime.value-1).toFixed(2);
        //---------------------------------------------------------
        // \\// displays time
        // \\// visualizes time offsets
        //========================================================================
    }


    ///points P and T do depend on time, so cannot be updated
    ///in tr2decs subroutine
    function doesPosition_PTandTheirLine()
    {
        var st      = rg.stepIx.value;
        var path    = rg.path.pos;
        if( st >= path.length -1 ) return; //no second point
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

