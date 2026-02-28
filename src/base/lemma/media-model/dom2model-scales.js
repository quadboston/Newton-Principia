(function(){
    const {sn, haz, fconf, sDomF, stdMod, amode, sconf, sf} =
    window.b$l.apptree({
        ssFExportList : {
            newzoom2app,
            modpos2medpos,
            medpos2modpos,
            modpos2medpos_original,
        },
        sDomFExportList : {
            ds2med,
            dspos2medpos,
            medpos2dspos,
        },
    });
    return;


    function newzoom2app( zoomChange ) {
        sf.mod2med = sf.mod2med_original * zoomChange;
        sf.med2mod = 1 / sf.mod2med;
    }
    //==========================================
    // //\\ pos to pos
    //==========================================
    ///transforms model-coordinates to media-coordinates
    function modpos2medpos( modpos ){
        const o2e = sconf.mod2med;
        modpos = modpos || this;
        return [
            modpos[0] * o2e + sconf.modorInPicX,
            modpos[1] * o2e * sconf.MONITOR_Y_FLIP +
                sconf.modorInPicY,
        ];
    }
    ///transforms media-coordinates to model-coordinates
    function medpos2modpos( medpos, original ){
        //this is obsolete: medpos = medpos || this;
        //this function does not rely on its parent,
        const e2o = original ?
                    1/sconf.mod2med_original :
                    sconf.med2mod;
        const cx =  original ? sconf.originX_onPicture : sconf.modorInPicX;
        const cy =  original ? sconf.originY_onPicture : sconf.modorInPicY;
        return [
            (medpos[0]-cx) * e2o,
            (medpos[1]-cy) * e2o * sconf.MONITOR_Y_FLIP,
        ];
    }
    ///purpose: use for controls independent on model scale and origin
    ///         user controls,
    function modpos2medpos_original( pos ){
        const o2e = sconf.mod2med_original;
        //this is obsolete: pos = pos || this;
        //this function does not rely on its parent,
        return [
            pos[0] * o2e + sconf.originX_onPicture,
            pos[1] * o2e * sconf.MONITOR_Y_FLIP +
                sconf.originY_onPicture,
        ];
    }
    //==========================================
    // \\// pos to pos
    //==========================================

    //===============================
    // //\\ medpos2dspos and inverse
    //===============================
    ///svgpos2parentCssPos
    ///parent is involved to contain html-decoration points
    ///in it, it is hard to attach them to svg itself,
    function medpos2dspos (){
        ///this function often attaches itself to the object,
        var medpos = haz( this, 'medpos' );
        if( !medpos ) {
            ////todm fix this in other code?
            medpos = this.medpos = modpos2medpos( this.pos );
        }
        var s2e = 1/sDomF.ds2med();
        return [
            medpos[0] * s2e

            //adds fake value ...
            //see "todm: patch: generates pars needed possibly for"
            + stdMod.bgImgOffset,

            medpos[1] * s2e
        ];
    };

    ///converts dom-pos to media pos
    function dspos2medpos( outparent ){
        const s2e = sDomF.ds2med();
        return [
            s2e * ( outparent[0]
                    - stdMod.bgImgOffset
                  ),
            s2e * outparent[1]
        ];
    };
    //===============================
    // \\// medpos2dspos and inverse
    //===============================

    function ds2med (){
        return sconf.innerMediaWidth / stdMod.bgImgW;
    };
})();
