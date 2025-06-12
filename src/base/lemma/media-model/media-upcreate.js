( function() {
    var {
        ns, sn, haz, haff, $$, eachprop,
        sconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        stdMod, toreg, rg,
        exegs,
    } = window.b$l.apptree({
        setModule,
        ssFExportList :
        {
            media_upcreate_generic,
        },
    });

    var pointies2line;
    return;


    function setModule()
    {
        pointies2line   = ssF.pointies2line;
    }

    //=========================================================
    // //\\ updater helper
    //      - runs every time model changes
    //=========================================================
    ///overrides lemma's stdMod.media_upcreate if missed
    function media_upcreate_generic()
    {
        if( haz( stdMod, 'media_update_is_forbidden' ) ) return;
        haff( stdMod, 'media_upcreate___before_basic' );

        //:updates subessay menu
        var exAspect = exegs[ amode.logic_phase ][ amode.aspect ];
        var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
        sDomF.addsChosenCSSCls_to_subessay8menuSubitem({ exAspect, subexeg })

        ssF.toogle_detectablilitySliderPoints4Tools();//"optional"
        {
            ////preliminary setting for painting lines,
            ////no points painting at this moment,
            eachprop( sconf.pname2point, (point,pname) => {
                var pointRg = rg[ pname ];
                pointRg.medpos = ssF.mod2inn( pointRg.pos, );
            });
        }

        ///paints default curve if no custom exists
        if(
            haz( ssD, 'repoConf' ) &&
            !ns.h( ssD.repoConf, 'customFunction' )
        ) {
            ssF.paintsCurve({
                    mmedia          : stdMod.mmedia,
                    fun             : ssD.repoConf[0].fun,
                    pointsName      : ns.haz( ssD.repoConf[0], 'pointsName' ) || 'AB',
                    rgName          : ns.haz( ssD.repoConf[0], 'rgName' ),
                    addedCssClass   : ns.haz( ssD.repoConf[0], 'addedCssClass' ),
                    pointA          : ns.haz( ssD.repoConf[0], 'pointA' ),
                    pointB          : ns.haz( ssD.repoConf[0], 'pointB' ),
                    addToStepCount  : 1,
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
        //sunday service: start here:
        
        //appar. for preemptive svg-position. and z-order,
        //if( !p2p ) return;
        ssF.doPaintPoints();
        
        if( ssF.mediaModelInitialized ) {
            //dragWraps.forEach
            stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
        }

        //=============================================
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
        // \\// upcreates lines after points
        //=============================================


        if( !ssF.mediaModelInitialized ) {
            haff( stdMod, 'create_digital_legend' );
        }
        
        //**************************************************
        // //\\ note, former lemmas
        //**************************************************
        // may have create_digital_legend
        //ini ssF, so thet skip this block
        if( ns.h( stdMod, 'create_digital_legend' ) ) {
            var tlegend = ns.haz( rg[ 'main-legend' ], amode.logic_phase );
            if( ns.h( stdMod, 'upcreate_mainLegend' ) ){
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
    //=========================================================
    // \\// updater helper
    //=========================================================

}) ();

