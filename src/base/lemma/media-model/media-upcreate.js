( function() {
    var {
        ns, sn, haz, haff, $$,
        sconf,
        rg,
        ssF, ssD,
        sDomF, amode,
        studyMods, stdMod,
        tr, tp, toreg,
        exegs,
    } = window.b$l.apptree({
        setModule,
        ssFExportList :
        {
            media_upcreate_basic,
        },
    });

    var pointies2line;
    var pos2pointy;
    return;












    function setModule()
    {
        pointies2line   = ssF.pointies2line;
        pos2pointy      = ssF.pos2pointy;
    }




    //=========================================================
    // //\\ updater helper
    //=========================================================
    ///overrides lemma's stdMod.media_upcreate if missed
    function media_upcreate_basic()
    {
        var stdMod = studyMods[ amode.submodel ];
        /*
        if( !ssF.mediaModelInitialized ) {
            stdMod.declaresMediaDecorationElements();
        }
        */
        //:updates subessay menu
        var exAspect = exegs[ amode.theorion ][ amode.aspect ];
        var subexeg = exAspect.subessay2subexeg[ amode.subessay ];
        sDomF.state2subessayMenu({ exAspect, subexeg })

        stdMod.toogle_detectablilitySliderPoints4Tools();
        //preliminary setting for painting lines,
        //no points painting at this moment,
        ssF.setsPointsMedPos();

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
        if( linesArray ) {
            linesArray.forEach( (lineConf) => {
                var lname = Object.keys( lineConf )[0];
                line = lineConf[ lname ];
                ssF.str2line( lname, null, line );
            });
        } else {
            ns.eachprop( sconf.lines, (line,lname) => {
                ssF.str2line( lname, null, line );
            });
        }
        // \\// upcreates lines
        //=============================================

        haff( stdMod, 'media_upcreate___part_of_medupcr_basic' );
        ssF.doPaintPoints();
        if( !ssF.mediaModelInitialized ) {
            haff( stdMod, 'create_digital_legend' );
        }
        if( ssF.mediaModelInitialized ) {
            stdMod.medD8D && stdMod.medD8D.updateAllDecPoints();
        }

        if( ns.h( stdMod, 'create_digital_legend' ) ) {
            var tlegend = ns.haz( rg[ 'main-legend' ], amode.theorion );
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
        ssF.mediaModelInitialized = true;

    }
    //=========================================================
    // \\// updater helper
    //=========================================================

}) ();

