( function() {
    var {
        sn,
        fconf, sDomF,
        stdMod, amode, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            scaleValue2app,
            mod2inn,
            inn2mod,
            mod2inn_original,
        },
        sDomFExportList :
        {
            out2inn,
            outparent2inn,
            inn2outparent,
        },
    });
    return;


    function scaleValue2app( svalue, ) {
        var sc = sconf;
        sc.mod2inn_scale = sc.originalMod2inn_scale * svalue;
        sc.inn2mod_scale = 1 / sc.mod2inn_scale;
    }
    //==========================================
    // //\\ pos to pos
    //==========================================
    ///transforms model-coordinates to media-coordinates
    function mod2inn( pos )
    {
        const m2i = sconf.mod2inn_scale;
        pos = pos || this;
        return [
            pos[0] * m2i + sconf.modorInPicX,
            pos[1] * m2i *
                    sconf.MONITOR_Y_FLIP +
                    sconf.modorInPicY,
        ];
    }
    ///transforms media-coordinates to model-coordinates
    function inn2mod( medpos )
    {
        medpos = medpos || this;
        const i2m = sconf.inn2mod_scale;
        return [
            (medpos[0]-sconf.modorInPicX) * i2m,
            (medpos[1]-sconf.modorInPicY) * i2m * sconf.MONITOR_Y_FLIP,
        ];
    }
    ///purpose: use for controls independent on model scale and origin
    ///         user controls,
    function mod2inn_original( pos, )
    {
        const m2oi = sconf.originalMod2inn_scale;
        pos = pos || this;
        return [
            pos[0] * m2oi + sconf.originX_onPicture,
            pos[1] * m2oi * sconf.MONITOR_Y_FLIP +
                            sconf.originY_onPicture,
        ];
    }
    //==========================================
    // \\// pos to pos
    //==========================================


    //===============================
    // //\\ inn2outparent and inverse
    //===============================
    ///wrong?: converts pos-in-media-scope to 
    ///pos-in-dom-scope-related-to-media-dom-offset
    ///right?    .... to-media-parent-dom-offset
    function inn2outparent()
    {
        var off     = sconf.mediaOffset;
        var medpos  = this.medpos;
        var i2o     = 1/sDomF.out2inn();
        return [
            medpos[0] * i2o + off[0]

            //adds fake value ...
            //see "todm: patch: generates pars needed possibly for"
            + stdMod.bgImgOffset,

            medpos[1] * i2o + off[1]
        ];
    };

    ///converts dom-pos to media pos
    ///for lemma1, drag_surface = sDomN.medRoot
    function outparent2inn( outparent ) //css2media_converter (with offset)
    {
        var moffset = sconf.mediaOffset;
        var c2m     = sDomF.out2inn();
        return [
            c2m * ( outparent[0] - moffset[0]
                    - stdMod.bgImgOffset //very vital to use
                  ),
            c2m * ( outparent[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// inn2outparent and inverse
    //===============================

    function out2inn() //css2media_scale
    {
        //returns fake scale for landing mode for draggers creation,
        //see "todm: patch: generates pars needed possibly for"
        return sconf.innerMediaWidth / stdMod.bgImgW;
    };
}) ();
