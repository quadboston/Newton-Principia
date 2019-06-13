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
    sDomF.pOnDs_2_innerViewBox = function( point_on_drag_surface )
    {
        var pod = point_on_drag_surface; //for lemma1, drag_surface = sDomN.medRoot
        var moffset = sconf.mediaOffset;
        var c2m = sDomF.css2media();
        return [
            c2m * ( pod[0] - moffset[0] ),
            c2m * ( pod[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// medpos2dompos and inverse
    //===============================


    ///cssMed2innMed
    sDomF.css2media = function()
    {
        if( amode['submodel'] ) {
            //c cc(amode['submodel'], studyMods )
            return sconf.innerMediaWidth /
                   studyMods[ amode['submodel'] ].mmedia.getBoundingClientRect().width;
        } else {
            //c cc( '... not exist' );
            return 1;
            //return sconf.innerMediaWidth / sDomN.mmedia$().getBoundingClientRect().width;
        }
    };

}) ();

