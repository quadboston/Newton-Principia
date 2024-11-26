( function() {
    var {
        sn, haff, haz, nspaste, mat, nssvg,
        sconf, sDomF, ssF, ssD, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            doesPosition_PTandTheirLine,
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
            sconf.unitlessMinTime * rg.rgslid_dt.val
        );
        return ctime;
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

