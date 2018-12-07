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




    //===============================
    // //\\ medpos2dompos and inverse
    //===============================
    ///converts own media pos to dom-pos
    sDomF.medpos2dompos = function()
    {
        var off = sconf.mediaOffset;
        var medpos = this.medpos;
        var c2m = sDomF.css2media();
        return [ medpos[0] / c2m + off[0], medpos[1] / c2m  + off[1]];
    };
    ///converts dom-pos to media pos
    sDomF.dompos2medpos = function( dompos )
    {
        var moffset = sconf.mediaOffset;
        var c2m = sDomF.css2media();
        return [
            c2m * ( dompos[0] - moffset[0] ),
            c2m * ( dompos[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// medpos2dompos and inverse
    //===============================

    sDomF.css2media = function()
    {
        //todo rid: ccc( sconf.innerMediaWidth + ' parent=' + sDomN.mmedia.parentNode.getBoundingClientRect().width);
        return sconf.innerMediaWidth / sDomN.mmedia.parentNode.getBoundingClientRect().width;
    };

}) ();

