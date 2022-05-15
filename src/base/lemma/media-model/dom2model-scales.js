( function() {
    var {
        sn,
        fconf, sDomF,
        studyMods, amode, sconf,
    } = window.b$l.apptree({
        ssFExportList :
        {
            mod2inn,
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





    //==========================================
    // //\\ pos to pos
    //==========================================
    ///transforms model-coordinates to media-coordinates
    function mod2inn( pos, stdMod )
    {
        pos = pos || this;
        return [
            pos[0] * sconf.mod2inn_scale + sconf.modorInPicX,
            pos[1] * sconf.mod2inn_scale *
                    sconf.MONITOR_Y_FLIP +
                    sconf.modorInPicY,
        ];
    }
    ///purpose: use for controls undependent on model scale and origin
    ///         user controls,
    function mod2inn_original( pos, stdMod )
    {
        pos = pos || this;
        return [
            pos[0] * stdMod.sconf.originalMod2inn_scale +
            sconf.originX_onPicture,
            pos[1] *
                stdMod.sconf.originalMod2inn_scale *
                sconf.MONITOR_Y_FLIP +
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
        var stdMod = studyMods[ amode.submodel ];
        //ccc( 'poor patch: '+ amode.submodel + ' bgImgOffset='+stdMod.bgImgOffset );

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
    function outparent2inn( outparent )
    {
        var moffset = sconf.mediaOffset;
        var c2m     = sDomF.out2inn();
        var stdMod = studyMods[ amode.submodel ];
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


    function out2inn()
    {
        var stdMod = studyMods[ amode.submodel ];
        //returns fake scale for landing mode for draggers creation,
        //see "todm: patch: generates pars needed possibly for"
        //ccc( 'amode.submodel', amode.submodel, studyMods[ amode.submodel ].bgImgW );
        return sconf.innerMediaWidth / stdMod.bgImgW;
    };


}) ();

