( function() {
    var {
        ns, sn, mat, has, haz,
        fconf, sconf,
        rg, toreg,
        ssF, ssD,
        sDomF, sDomN, amode,
        studyMods,
        stdMod,
    } = window.b$l.apptree({
        ssFExportList :
        {
            amode2lemma,
            line2abs,
            circumscribeCircleOverChordAndBothNormals_XY,
        },
    });
    return;







    ///=================================================
    /// app-mode to lemma states and actions
    ///=================================================
    function amode2lemma()
    {
        //------------------------------------------------
        // //\\ sets "undefined" flag
        //      for registry rg members with defined pname,
        //      uses sconf.rgShapesVisible if defined in lemma,
        //      if not, uses existing sconf.rgShapesVisible.
        //------------------------------------------------
        ns.eachprop( rg, (prop,propname) => {
            if( haz( prop, 'pname' ) ) {
                var globalVis = fconf.rgShapesVisible;
                prop.undisplay = !(
                                        ns.h( sconf, 'rgShapesVisible' ) ?
                                        sconf.rgShapesVisible :
                                        globalVis
                                 );
            }
        });
        //------------------------------------------------
        // \\// sets "undefined" flag
        //------------------------------------------------

        var { theorion, aspect, submodel, subessay } = amode;
        var stdMod  = studyMods[ submodel ];
        var captured = null;
        ssD.__amode2rgstate.forEach( (cblock,ix) => {
            ///aka: "true", or "( theorion === 'claim' || ...
            var cond = cblock[0];
            if( eval( cond ) ) {
                var instr = cblock[ 1 ];

                ///latter "captured" in array overrides previous "captured"
                captured = ns.haz( instr, "captured" ) || captured;

                ///core of condition: sets registry immediately
                ns.paste( rg, ns.haz( instr, "rg" )||{} );

                if( ns.h( instr, 'action' ) ) {
                    ////aka: sDomF.detected_user_interaction_effect()
                    eval( instr.action );
                }
            }
        });
        if( ns.haz( ssF, 'amode2rgstate' ) ){
            captured = ssF.amode2rgstate( captured );
        }
        ///for past-lemmas: lemma 1, lemma 2, ...
        //haf( stdMod, 'astate_2_rg8model' )(
            //todm ... no need to put extra "captured" ... do fix this:
            stdMod.astate_2_rg8model( captured && ssD.capture[ captured ], captured );
        //);
    }


    ///input:       lineName aka 'AB'
    ///acts:        takes rg-points aka rg.A and rg.B
    ///             and adds to line segment AB values
    ///             abs, abs2, dx, dy
    function line2abs( lineName )
    {
        var splitToken = lineName.indexOf( ',' ) > -1 ? ',' : '';
        var points = lineName.split( splitToken );
        var AB = toreg( lineName )();
        var A = rg[ points[0] ].pos;
        var B = rg[ points[1] ].pos;
        var dx = B[0]-A[0];
        var dy = B[1]-A[1];
        var d2 = dx*dx + dy*dy;
        var d = Math.sqrt( d2 );
        AB.abs = d;
        AB.abs2 = d2;
        AB.x = dx;
        AB.y = dy;
        AB.angle = Math.atan2( dy, dx );
        return AB;
    }





    ///given a string XY and registry of points, 
    ///returns function which calculates circum... on points in the string XY,
    function circumscribeCircleOverChordAndBothNormals_XY( rg, XY )
    {
        var splitToken = XY.indexOf( ',' ) > -1 ? ',' : '';
        var points = XY.split( splitToken );
        var points = XY.split('');
        var A = rg[ points[0] ].pos;
        var B = rg[ points[1] ].pos;
        return mat.circumscribeCircleOverChordAndBothNormals( null, A, B );
    }


}) ();

