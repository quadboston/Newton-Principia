( function () {
    var {
        sn, $$, userOptions,
        fapp, fconf, sconf, sDomN, ssF,
        rg, amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            swapMonotonity,
            setsDifferenceBarsMonotonity,
            removeOutdatedClasses,
        },
    });
    var stdL2       = sn('stdL2', fapp );
    // var dr          = sn('datareg', stdL2 );//TEMP
    var numModel    = sn('numModel', stdL2 );
    //TEMP This will likely need something for the second figure as well.
    //TEMP Perhaps the following will need to be stored in dr
    //TEMP Actually given that it's only used by L2/3 it's probably fine to
    //keep it here, rather than store it in dr.  Also keep in mind that many of
    //the points that are swapped have been removed.
    var swap = [
        [ 'tp-a--_k--b--l', 'tp-d--e--p--o' ],
        [ 'tp-b--_l--c--m', 'tp-c--_m--d--n' ],
    ];
    return;



    //TEMP Are the following only needed for the original datareg?
    //Since some points have been removed there may be some issues with ix
    //and how it's used for calculations.
    function swapMonotonity(dr)
    {
        var xoff = sconf.originX_onPicture;
        var yoff = sconf.originY_onPicture;
        var scale = sconf.mod2inn_scale;

        var { left, right, bottom, top, } = dr.widestRect;
        rg.F.pos[0] = ( left - xoff ) / scale;
        rg.f.pos[0] = ( left - xoff ) / scale;
        
        let bl = dr.basePts.list;
        var bN = sconf.basesN;
        {
            //TEMP Also note 'e' doesn't seem visible for any of the models?
            //'c' likely needs to be in a different pos for L4
            // [ 'a', 'b', 'c', 'd', 'e' ].forEach( (pt,ix) => {
            //TEMP Perhaps the following array will need to be stored in dr
            [ 'a', 'c', ].forEach( (pt,ix) => {
               let newX = bl[ bN - ix ];
               rg[pt].pos[0] =  ( newX.x - xoff ) / scale;
               rg[pt].pos[1] =  -( numModel.curveFun( dr, newX.x ) - yoff ) / scale;
            });
            // [ 'l', 'm', 'n', 'o', ].forEach( (pt,ix) => {
            //    let newY = bl[ bN - ix ];
            //    let newX = bl[ bN - ix - 1 ];
            //    rg[pt].pos[0] =  ( newX.x - xoff ) / scale;
            //    rg[pt].pos[1] =  -( numModel.curveFun( dr, newY.x ) - yoff ) / scale;
            // });
            // [ 'K', 'L', 'M', ].forEach( (pt,ix) => {
            //    let newX = bl[ bN - ix ];
            //    let newY = bl[ bN - ix - 1 ];
            //    rg[pt].pos[0] =  ( newX.x - xoff ) / scale;
            //    rg[pt].pos[1] =  -( numModel.curveFun( dr, newY.x ) - yoff ) / scale;
            // });
            // [ 'A', 'B', 'C', 'D', 'E', ].forEach( (pt,ix) => {
            //TEMP Perhaps the following array will need to be stored in dr
            [ 'A', 'E', ].forEach( (pt,ix) => {
               let newX = bl[ bN - ix ];
               rg[pt].pos[0] =  ( newX.x - xoff ) / scale;
            });
        }
    }


    function removeOutdatedClasses(dr)
    {
        let dv = dr.yVariations;
        let dl = dr.differenceRects.list;
        let bN = sconf.basesN;
        let dir = dv.chchosen.dir > 0;
        for( var ii=0; ii<4; ii++ ) {
            swap.forEach( sw => {
                sw.forEach( sw2 => {
                    
                     //why this carefully made block misses cleanup?
                     //dir && $$.$( dl[ii] ).removeClass( sw2 );
                     //(!dir) && $$.$( dl[bN - 4 + ii] ).removeClass( sw2 );
                    
                     $$.$( dl[ii] ).removeClass( sw2 );
                     $$.$( dl[bN - 4 + ii] ).removeClass( sw2 );
                });
            });
        }
    }
    
    function setsDifferenceBarsMonotonity(dr)
    {
        removeOutdatedClasses(dr);
        
        let dv = dr.yVariations;
        let dl = dr.differenceRects.list;
        var bN = sconf.basesN;
        let dir = dv.chchosen.dir > 0;
        for( var ii=0; ii<2; ii++ ) {
            let pair = swap[ii];
            let direct1 = dir ? pair[0] : pair[1];
            let direct2 = dir ? pair[1] : pair[0];
            let low = dir ? ii : bN - 4 + ii;
            let high = dir ? 4 - ii - 1 : bN-ii-1;
            $$.$( dl[low] ).addClass( direct1 );
            $$.$( dl[high] ).addClass( direct2 );
        }
    }
    
}) ();

