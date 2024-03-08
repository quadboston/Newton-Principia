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
            protects_stepIx_ranges,
        },
    });
    return;








    ///returns protected time
    function protects_stepIx_ranges( time )
    {
        //protects_stepIx_exceeding_stepMax( time )
        //initially rg.spatialStepsMax.pos = sconf.spatialStepsMax0 = 7
        time = Math.min( time, rg.spatialStepsMax.pos * 0.999999 );

        return Math.max(
            time, 
            1.75000001 //1.75 fits slider 4-step scenario <--> lemma-launch-time below,
        );
    }



    function sliderTime_2_time8stepIndices()
    {
        var sp8ep   = haz( rg, 'slider_sltime' );
        var time    = rg.slider_sltime.psteps;
        //this "rg.slider_sltime.psteps" can be set in program, so
        //do protect this,
        time        = protects_stepIx_ranges( time );
        rg.time     = time;
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
        var stepIx4 = Math.floor( time * 4 );
        rg.stretchedFourTimes_stIx = stepIx4;

        //substep in its original meaning: one of the four substeps indices
        rg.substepIx    = stepIx4%4;

        //steps in its original meaning
        var stepIx      = ( stepIx4 - rg.substepIx ) / 4;
        stepIx          = Math.min( stepIx, rg.spatialStepsMax.pos - 1 );
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


        if( stepIx === 1 ) {
            ////before thought experiment, no indication of it is shown
            rg.thoughtStep.value = "";
        }

        //---------------------------------------------------------
        // //\\ displays time
        //      , this deserves elaboration, because is the heart
        //      of differential method and interaction
        //---------------------------------------------------------
        //this assumes time changes continuously during proof steps
        //rg.displayTime.value = rg.time.toFixed(3);

        //this sets granular time display increment
        //during last proof step
        if( substepIx < 1 ) {
            rg.displayTime.value =

                //during first proof step "Bc", time grows by magnitude
                //of timeStep-length/2
                ( stepIx + (rg.time - stepIx - 0) * 2 ) *

                rg.rgslid_dt.val;

        } else if( substepIx < 2 ) {

            rg.displayTime.value = (stepIx+0.5) * rg.rgslid_dt.val;

        } else if( substepIx < 3 ) {
            ////here, after force BV is applied, time begins
            ///growing again
            rg.displayTime.value =

                //during third proof step, time grows by magnitude
                //of timeStep-length/2
                ( stepIx + 0.5 + (rg.time - stepIx - 0.5) * 2 ) *

                rg.rgslid_dt.val;
        } else {
            rg.displayTime.value = ((stepIx+1)*rg.rgslid_dt.val);
        }
        //ccc( stepIx + '.' + substepIx + ' rg.time='+rg.time );
        rg.displayTime.value = (rg.displayTime.value-1).toFixed(2);
        //---------------------------------------------------------
        // \\// displays time
        // \\// visualizes time offsets
        //========================================================================
    }


    //=========================================================
    // //\\ display dt
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


        if( stepIx === 1 ) {
            ////before thought experiment, no indication of it is shown
            rg.thoughtStep.value = "";
        }

        //---------------------------------------------------------
        // //\\ displays time
        //      , this deserves elaboration, because is the heart
        //      of differential method and interaction
        //---------------------------------------------------------
        //this assumes time changes continuously during proof steps
        //rg.displayTime.value = rg.time.toFixed(3);

        //this sets granular time display increment
        //during last proof step
        if( substepIx < 1 ) {
            rg.displayTime.value =

                //during first proof step "Bc", time grows by magnitude
                //of timeStep-length/2
                ( stepIx + (rg.time - stepIx - 0) * 2 ) *

                rg.rgslid_dt.val;

        } else if( substepIx < 2 ) {

            rg.displayTime.value = (stepIx+0.5) * rg.rgslid_dt.val;

        } else if( substepIx < 3 ) {
            ////here, after force BV is applied, time begins
            ///growing again
            rg.displayTime.value =

                //during third proof step, time grows by magnitude
                //of timeStep-length/2
                ( stepIx + 0.5 + (rg.time - stepIx - 0.5) * 2 ) *

                rg.rgslid_dt.val;
        } else {
            rg.displayTime.value = ((stepIx+1)*rg.rgslid_dt.val);
        }
        //ccc( stepIx + '.' + substepIx + ' rg.time='+rg.time );
        rg.displayTime.value = (rg.displayTime.value-1).toFixed(2);
        //---------------------------------------------------------
        // \\// displays time
        // \\// visualizes time offsets
        //========================================================================
    }
    //=========================================================
    // \\// display dt
    //=========================================================




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
    }

}) ();

