( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var sapp        = sn('sapp' ); 

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sDomN       = sn('dnative', sapp);
    var sDomF       = sn('dfunctions', sapp);
    var studyMods   = sn('studyMods', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    ssF.mod2inn                 = mod2inn;
    ssF.mod2inn_original        = mod2inn_original;
    sDomF.out2inn               = out2inn;
    sDomF.outparent2inn         = outparent2inn;
    sDomF.inn2outparent         = inn2outparent;
    return;    







    //==========================================
    // //\\ pos to pos
    //==========================================
    ///transforms model-coordinates to media-coordinates
    function mod2inn( pos )
    {
        if( !pos ) { pos = this; }
        return [
            pos[0] * sconf.mod2inn_scale + sconf.activeAreaOffsetX,
            pos[1] * sconf.mod2inn_scale * sconf.MONITOR_Y_FLIP +
            sconf.activeAreaOffsetY,
        ];
    }
    ///purpose: use for controls undependent on model scale and origin
    ///         user controls,
    function mod2inn_original( pos )
    {
        if( !pos ) { pos = this; }
        return [
            pos[0] * sconf.originalMod2inn_scale +
            //sconf.activeAreaOffsetX,
            sconf.originX_onPicture,

            pos[1] * sconf.originalMod2inn_scale * sconf.MONITOR_Y_FLIP +
            //sconf.activeAreaOffsetY,
            sconf.originY_onPicture,
        ];
    }
    //==========================================
    // \\// pos to pos
    //==========================================


    //===============================
    // //\\ inn2outparent and inverse
    //===============================
    ///converts pos-in-media-scope to pos-in-dom-scope-related-to-media-dom-offset
    function inn2outparent()
    {
        var off     = sconf.mediaOffset;
        var medpos  = this.medpos;
        var i2o     = 1/sDomF.out2inn();
        return [
            medpos[0] * i2o + off[0],

            //this is not required because of media root already margined, so
            //has been shifted as mediaLeftMargin
            // + sDomN.mediaLeftMargin,

            medpos[1] * i2o + off[1]
        ];
    };


    ///converts dom-pos to media pos
    ///for lemma1, drag_surface = sDomN.medRoot
    function outparent2inn( outparent )
    {
        var moffset = sconf.mediaOffset;
        var c2m     = sDomF.out2inn();
        return [
            c2m * ( outparent[0] - moffset[0]
                    //- sDomN.mediaLeftMargin //media-root is already shifted ...
                  ),
            c2m * ( outparent[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// inn2outparent and inverse
    //===============================


    function out2inn()
    {
        return sconf.innerMediaWidth / sDomN.mediaWidth;

        /*
        //todm: for this at the moment, have to define amode['submodel'] even
        //      at phase content2exegs.js ... too early ...
        var sm = studyMods[ amode['submodel'] ];
        var me = sm.mmedia;
        var re = me.getBoundingClientRect();
        var wi = re.width;
        if( wi === 0 ) {
            wi = sconf.innerMediaWidth;
            //ccc( '**** alert: width === 0: media=', me, 'rect=', re );
            //ccc( '**** alert: width === 0:');
        } else {
            //ccc( '**** scale is set to = ' + sconf.innerMediaWidth / wi );
        }
        return sconf.innerMediaWidth / wi;
               //studyMods[ amode['submodel'] ].mmedia.getBoundingClientRect().width;
        */
    };


}) ();

