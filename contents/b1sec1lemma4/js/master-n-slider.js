( function() {
    var {
        ns, sn, nspaste, eachprop, haz, mat,
        globalCss,
        getFixedColor,
        sconf, fconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod,
        tr, tp, toreg,
        fixedColors,

    } = window.b$l.apptree({
        stdModExportList :
        {
            establishes_slider_n,
            sliderN_n2pos,
            sliderN_n2masterN,
            sliderN_pos2n,
            sliderN_mastN2caption,
        },
    });
    return;






    //--------------------------
    // //\\ configures slider n
    //--------------------------
    function establishes_slider_n()
    {
        ///slider n callback
        rg.countNSlider.acceptPos = ( newPos ) => {
            newPos[0] = Math.max( rg.sliderNStart.pos[0],   newPos[0] );
            newPos[0] = Math.min( rg.sliderNEnd.pos[0],     newPos[0] );
            newPos[1] = Math.max( rg.sliderNStart.pos[1],   newPos[1] );
            newPos[1] = Math.min( rg.sliderNEnd.pos[1],     newPos[1] );
            var newN = sliderN_pos2n( newPos );
            if( newN >= sconf.BARS_NUMBER_INITIAL ) {
                sliderN_n2masterN( newN );
                sliderN_mastN2caption();
            }
            return true;
        };
        sliderN_n2pos( rg.bars.xpointsN-1 );
        sliderN_mastN2caption();
    }
    //--------------------------
    // \\// configures slider n
    //--------------------------


    //-------------------------------------
    // //\\ sliderN direction from n to gui
    //-------------------------------------
    function sliderN_n2pos( newN )
    {
        //validates and updates current pos of masterNslider,
        //updates to calculated number of ordered bars,
        var sliderLen = rg.sliderNEnd.pos[0] - rg.sliderNStart.pos[0];
        var iBars = sconf.BARS_NUMBER_INITIAL;
        rg.countNSlider.pos[0] = ( newN - iBars )
                                 / ( sconf.BARS_NUMBER_MAX - iBars )
                                 * sliderLen +
                                 rg.sliderNStart.pos[0];
    }

    function sliderN_mastN2caption()
    {
        var mastN = rg.bars.xpointsN - 1;
        rg.countNSlider.caption = mastN + ' bases';
        var wwLim = sconf.DONT_PAINT_BARS_MORE_THAN;
        if( mastN - 1 > wwLim ) {
            rg.countNSlider.caption += ' ( ' + wwLim + ' shown )';
        }
    }
    //-------------------------------------
    // \\// sliderN direction from n to gui
    //-------------------------------------

    //-------------------------------------
    // //\\ sliderN direction from gui to n
    //-------------------------------------
    function sliderN_n2masterN( newN )
    {
        rg.bars.xpointsN = newN + 1;
    }

    function sliderN_pos2n( newPos )
    {
        var barsN = sconf.BARS_NUMBER_INITIAL;
        var sliderLen = rg.sliderNEnd.pos[0] - rg.sliderNStart.pos[0];
        return Math.floor(
            barsN +
            ( sconf.BARS_NUMBER_MAX - barsN ) *
            ( newPos[0] - rg.sliderNStart.pos[0] ) / sliderLen
        );
    }
    //-------------------------------------
    // \\// sliderN direction from gui to n
    //-------------------------------------

}) ();

