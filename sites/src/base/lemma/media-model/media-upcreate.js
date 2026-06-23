(function(){
const { ns, sn, haz, haff, $$, eachprop, nspaste, has, flagdo,
        objpath2value, sconf, sf, ssF, ssD, sDomN, sDomF, amode,
        stdMod, rg, exegs, pntRgid2rgx,
    } = window.b$l.atree({ ssFList: {
        media_upcreate_generic,
    },
});
return;


///=========================================================
/// updater helper,
/// runs every time model changes
///=========================================================
///overrides lemma's stdMod.media_upcreate if missed,
///how? media_upcreate prevales when finalizing lemma in
///init_sapp: if lemma does not provide the latter, then
///this function takes over:
function media_upcreate_generic (){
    if( haz( stdMod, 'media_update_is_forbidden' ) ) return;
    rg.allLettersAreHidden = !rg.USER_TOUCHED_SCREEN;

    Object.keys( flagdo ).forEach( fdkey => {
        stdMod.medScene$.tgcls(
            'flagcss--' + fdkey, flagdo[fdkey] );
    });

    haff( stdMod, 'media_upcreate___before_basic' );
    sDomN.zoomInfo$.html('zoom='+
        ( 100 * //see min_magnit for min value:
        sconf.mod2med/sconf.mod2med_original)
        .toFixed()
        +'%' );
    //:updates subessay menu
    var exAspect = exegs[ amode.logic_phase ][ amode.aspect ];
    var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
    sDomF.addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg })
    {
        const evalRE = /_eval$/;
        const solvableRE = /(\s+|^)solvable_orbit(\s+|$)/;
        sf.shapesArray.forEach( gs => {
            for( const [key, prop] of Object.entries(gs) ){
                ////dynamically resets shape's properties
                ////ending with _eval,
                if( key.match(evalRE) ){
                    gs[ key.replace(evalRE,'') ] = eval(prop);
                }
            }
            var doit = true;
            if( gs.flagdo ){
                const need_to_check =
                    gs.flagdo.match( solvableRE );
                var doit=(need_to_check&&flagdo.solvable_orbit) ||
                    !need_to_check;
            }
            if( gs.isAngle ){
                const rv = gs.rgVertex;
                //optional:
                let twin_id = haz( gs, 'vertexTwin_rgn' );
                const twinVertex = (twin_id && rg[twin_id]) || rv;
                //synchronizes positions of twin and vertex
                rv.pos = twinVertex.pos;
                rv.medpos = ssF.modpos2medpos( rv.pos );
                doit && ssF.drawAngle( gs );
            } else if( gs.isCurve ){
                doit && rg[ gs.rgn ].gshape2svg();
            }
        });
    }
    {
        ////preliminary setting for painting lines,
        ////no points painting at this moment,
        eachprop( pntRgid2rgx, rgX => {
            rgX.medpos = ssF.modpos2medpos( rgX.pos, );
        });
    }
    //=============================================
    // //\\ upcreates lines
    var linesArray = ns.haz( sconf, 'linesArray' );

    ///*********************************************
    ///don't do both lines and linesArray in config
    ///if this is done, lines will be ignored
    ///*********************************************
    if( linesArray ) {
        linesArray.forEach( (lineConf) => {
                var lname   = Object.keys( lineConf )[0];
                lineAttr    = lineConf[ lname ];
                if( !lineAttr.zOrderAfter ) {
                    ssF.str2line( lname, null, lineAttr );
                }
        });
    } else {
        ns.eachprop( sconf.lines, (lineAttr,lname) => {
            if( !lineAttr.zOrderAfter ) {
                ssF.str2line( lname, null, lineAttr );
            }
        });
    }
    // \\// upcreates lines
    //=============================================

    haff( stdMod, 'media_upcreate___part_of_medupcr_basic' );

    //=============================================
    //todm why after points? makes no sense:
    // //\\ upcreates lines after points
    if( linesArray ) {
        linesArray.forEach( (lineConf) => {
            var lname   = Object.keys( lineConf )[0];
            lineAttr    = lineConf[ lname ];
            if( lineAttr.zOrderAfter ) {
                ssF.str2line( lname, null, lineAttr );
            }
        });
    } else {
        ns.eachprop( sconf.lines, (lineAttr,lname) => {
            if( lineAttr.zOrderAfter ) {
                ssF.str2line( lname, null, lineAttr );
            }
        });
    }
    //=============================================
    // \\// upcreates lines after points
    //=============================================

    //appar. for preemptive svg-position. and z-order,
    //if( !p2p ) return;
    ssF.doPaintPoints();

    if( ssF.mediaModelInitialized ) {
        //dragWraps.forEach
        stdMod.lemmaD8D && stdMod.lemmaD8D.updateAllDecPoints();
    }
    //**************************************************
    // //\\ note, former lemmas
    //**************************************************
    //may have create_digital_legend
    //ini ssF, so thet skip this block
    if( has( stdMod, 'create_digital_legend' ) ) {
        var tlegend = ns.haz( rg[ 'main-legend' ], amode.logic_phase );
        if( has( stdMod, 'upcreate_mainLegend' ) ){
            ///above lines do create legend for all theoreons, this line
            ///shows only for one:
            stdMod.upcreate_mainLegend();
        } else if( tlegend ) {
            tlegend.upcreate_mainLegend();
        } else {
            ns.haf( ssF, 'upcreate_mainLegend' );
        }
    }
    //**************************************************
    // \\// note, former lemmas
    //**************************************************
    haff( stdMod, 'media_upcreate___after_basic' );
    ssF.mediaModelInitialized = true;
}
})();
