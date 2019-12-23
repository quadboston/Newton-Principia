( function() {
    var SUB_MODEL   = 'common';
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);
    var studyMods   = sn('studyMods', sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;








    function setModule()
    {
        sn(SUB_MODEL, studyMods ).upcreateMedia = upcreateMedia;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMedia()
    {
        var tr              = ssF.tr;
        //:study-pars
        var modCurvPivots   = ssD.curvePivots;    //curve params
        var tC              = ssD.tC;             //point C curve param = vanish param
        //:run-time-pars
        var tB              = ssF.tB;





        var medCurvPivots      = modCurvPivots.map( modpos2medpos );
        var medRemoteCurPivots = ssD.modRemoteCurPivots.map( modpos2medpos );

        var pointA     = pos2pointy( 'point-A',
                                      { 
                                        cssClass:'tofill tostroke op1',
                                        'fill' : 'blue'
                                      }
                                    );
        var pointD     = pos2pointy( 'point-D', {
                                      cssClass:'tofill tostroke op1' } );
        var pointE     = pos2pointy( 'point-E', {
                              cssClass:'tostroke',
                              stroke : 'blue',
                              'fill' : 'transparent',
                              'stroke-width' : 1
                          });
        var pointB     = pos2pointy( 'point-B', {
                              cssClass:'tostroke',
                              'fill' : 'transparent',
                              'stroke-width' : 1
                          });
        var pointC     = pos2pointy( 'point-C', {
                              cssClass:'tostroke',
                              'fill' : 'transparent',
                              'stroke-width' : 1
                          });

        var pointOd     = pos2pointy('point-d', {cssClass:'tofill tostroke op1' } );
        var pointOe     = pos2pointy('point-e', {cssClass:'tofill tostroke op1' } );
        var pointOb     = pos2pointy('point-b', {cssClass:'tofill tostroke op1' } );
        var pointOc     = pos2pointy('point-c', {cssClass:'tofill tostroke op1' } );
        var pointOg     = pos2pointy('point-g', {cssClass:'tofill tostroke op1' } );
        var pointOf     = pos2pointy('point-f', {cssClass:'tofill tostroke op1' } );
        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================










        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================
        pointies2line( 'AE', [pointA, pointE], { cssClass:'tostroke' } );
        pointies2line( 'AD', [pointA, pointD], { cssClass:'tostroke' } );
        pointies2line( 'Ad', [pointA, pointOd], { cssClass:'tostroke' } );
        pointies2line( 'Ae', [pointA, pointOe], { cssClass:'tostroke' } );

        pointies2line( 'AC', [pointA, pointC], { cssClass:'tostroke' } );
        pointies2line( 'AB', [pointA, pointB], { cssClass:'tostroke' } );
        pointies2line( 'Ab', [pointA, pointOb], { cssClass:'tostroke' } );
        pointies2line( 'Ac', [pointA, pointOc], { cssClass:'tostroke' } );

        pointies2line( 'Ag', [pointA, pointOg], { cssClass:'tostroke' } );

        pointies2line( 'EC', [pointE, pointC], { cssClass:'tostroke' } );
        pointies2line( 'DB', [pointD, pointB], { cssClass:'tostroke' } );
        pointies2line( 'ec', [pointOe, pointOc], { cssClass:'tostroke' } );
        pointies2line( 'db', [pointOd, pointOb], { cssClass:'tostroke' } );



        // //\\ paints curve with two pivot points
        var mainCurve = tr( 'mainCurve' );
        mainCurve.mediael = bezier.mediafy({
            mediael : mainCurve.mediael,
            svg : studyMods[ SUB_MODEL ].mmedia,
            pivots : medCurvPivots,
            bcurve :
            {
                'stroke-width' : 1 * sconf.thickness
            },
            paintPivots : {
                topaint : [ null, true, true ],
                attrs :
                {
                    'stroke-width' : 1 * sconf.thickness,
                    r : 4 * sconf.thickness
                }
            }
        });
        ///names pivotPoint1 and pivotPoint2 are needed for topic engine
        var w0 = 1;
        for( var w0=1; w0<3; w0++) {
            var ww = mainCurve.mediael.pivotPoints[w0].svgel;
            $$.$( ww ).addClass( 'tp-_a_b_c' +' tostroke' );
            tr( 'pivotPoint'+w0, 'svgel', ww );
        }

        $$.cls( 'tostroke', mainCurve.mediael.paintedCurve)
          .cls( 'tp-' + '_a_b_c')
          ;

        var remoteCurve = tr( 'remoteCurve' );
        remoteCurve.mediael = bezier.mediafy({
            mediael : remoteCurve.mediael,
            svg : studyMods[ SUB_MODEL ].mmedia,
            pivots : medRemoteCurPivots,
            bcurve :
            {
                stroke : 'transparent', //todm add to bsl core
                'stroke-width' : 1 * sconf.thickness
            }
        });
        $$.addClass('tostroke tp-_abc', remoteCurve.mediael.paintedCurve);
        // \\// paints curve with two pivot points




        //==========================================
        // //\\ paints areas
        // //\\ paints curved areas
        //==========================================
        var wCCA = ssF.calculateCurvedArea;
        wCCA( 'area-Ace', medRemoteCurPivots,  tC, pointA.medpos, pointOe.medpos );
        wCCA( 'area-Abd', medRemoteCurPivots,  tB, pointA.medpos, pointOd.medpos );
        wCCA( 'area-ACE', medCurvPivots,       tC, pointA.medpos, pointE.medpos );
        wCCA( 'area-ABD', medCurvPivots,       tB, pointA.medpos, pointD.medpos );

        paintCurvArea( 'Ace', 'theorion--proof', '_ace' );
        //.apparently makes this shape-element exclusively present in 
        //.'theorion--proof' mode
        paintCurvArea( 'Abd', 'theorion--proof', '_abd' );
        //.null makes this element present in both modes
        paintCurvArea( 'ACE', null, '_a_c_e' );
        paintCurvArea( 'ABD', null, '_a_b_d' );
        function paintCurvArea( areaId_, fullMode, cls )
        {
            var areaId = 'area-' + areaId_;
            var area = rg[ areaId ];
            var lowCurve = rg[ areaId ].curve;
            
            var dd = '';
            dd += "M" + area.startPoint[0] + ' ' +
                        area.startPoint[1] + ' ';
            dd += "Q" + 
                  lowCurve[1][0].toFixed(2) + ' ' + lowCurve[1][1].toFixed(2) + ' ' +
                  lowCurve[2][0].toFixed(2) + ' ' + lowCurve[2][1].toFixed(2) + ' ';
            dd += "L" + 
                        area.endPoint[0] + ' ' +
                        area.endPoint[1] + ' ';

            area.mediael = sv.u({
                svgel : area.mediael,
                type : 'path',
                d:dd,
                parent : studyMods[ SUB_MODEL ].mmedia
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
            fullMode = fullMode ? ' ' + fullMode : '';
            $$.$(area.mediael).cls( ' tp-'+cls + fullMode + ' tofill' );
        }
        //==========================================
        // \\// paints curved areas
        //==========================================



        //==========================================
        // //\\ linear areas
        //==========================================
        ///paints AGE-like area
        function paintLikeAGE( areaId, fullMode, cls )
        {
            var area = rg[ areaId ];
            var vertices = area.vertices.map( modpos2medpos );
            area.mediael = sv.polyline({
                pivots : vertices,
                svgel : area.mediael,
                parent : studyMods[ SUB_MODEL ].mmedia
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );

            fullMode = fullMode ? ' ' + fullMode : '';
            $$.$( area.mediael ).cls( 'tofill' + fullMode + ' tp-' + cls);
        }
        //:calls to calculate and paint
        //removed by project-manager: paintLikeAGE( 'AGE', 'theorion--claim' );
        //paintLikeAGE( 'AFD', 'rgba( 255,0,0, 0 )', 'theorion--claim' );
        //removed by project-manager: paintLikeAGE( 'AFD', 'theorion--claim' );

        paintLikeAGE( 'Age', 'theorion--proof', '_age' );
        paintLikeAGE( 'Afd', 'theorion--proof', '_afd' );
        //==========================================
        // \\// linear areas
        // \\// paints areas
        //==========================================



        //==========================
        // //\\ prints areas values
        //==========================
        ssF.upcreate_mainLegend();
        //==========================
        // \\// prints areas values
        //==========================




        //==========================================
        // \\// does paint view
        //==========================================
        if( ssF.mediaModelInitialized ) {
            var ww = studyMods[ SUB_MODEL ].medD8D;
            ww && ww.updateAllDecPoints();
        } else {
            sn(SUB_MODEL, studyMods ).initMediaModel = initMediaModel;
        }
        return;
        // \\//\\// ends imperative part of the module







        function initMediaModel()
        {
            studyMods[ SUB_MODEL ].mmedia$.cls( 'submodel-' + SUB_MODEL );
            sn( SUB_MODEL, studyMods ).initDragModel();
        }


        //==========================================
        // //\\ paint helpers
        //==========================================
        // //\\ pos to pos
        ///transforms model-coordinates to media-coordinates
        function modpos2medpos( pos )
        {
            if( !pos ) { pos = this; }
            return [ pos[0] * sconf.mod2med_scale + sconf.activeAreaOffsetX,
                     pos[1] * sconf.mod2med_scale * sconf.MONITOR_Y_FLIP +
                     sconf.activeAreaOffsetY ];
        }
        // \\// pos to pos



        ///makes line
        function pointies2line( pName, pivots, attr )
        {
            var line = tr( pName );
            line.svgel = sv.polyline({
                svgel   : line.svgel,
                parent  : studyMods[ SUB_MODEL ].mmedia,
                pivots  : [ pivots[0].medpos, pivots[1].medpos ],
                'stroke-width' : ( attr && attr[ 'stroke-width' ] || 1 ) * sconf.thickness
            });
            var cssClass = attr && attr['cssClass'] && ( attr['cssClass'] + ' ' );
            var cssName = pName.replace( /([A-Z])/g, ( match, key1 ) => (
                          '_' + key1.toLowerCase() ));
            $$.$(line.svgel).cls( cssClass + 'tp-' + cssName );
        }



        ///converts model-pos and attributes to pointy
        function pos2pointy( pName, attrs )
        {
            var pos             = rg[ pName ].pos;
            var pt              = tr( pName );
            pt.pos              = pos;
            pt.medpos           = modpos2medpos( pt.pos );
            pt.svgel = sv.u({
                svgel   : pt.svgel,
                parent  : studyMods[ SUB_MODEL ].mmedia,
                type    : 'circle',
                fill    : attrs && attrs.fill,
                stroke  : attrs && attrs.stroke,
                'stroke-width' : (( attrs && attrs[ 'stroke-width' ] ) || 0) * sconf.thickness,
                cx : pt.medpos[0],
                cy : pt.medpos[1],
                //.defines visible size of a dot on screen
                r : 4 * sconf.thickness
            });
            var cssClass = attrs && attrs['cssClass'] && ( attrs['cssClass'] + ' ' );
            var cssName = pName
                .replace( /([A-Z])/g, ( match, key1 ) => (
                          '_' + key1.toLowerCase() ));
            $$.$(pt.svgel).cls( cssClass + 'tp-' +  cssName );
            return pt;
        }
        //==========================================
        // \\// paint helpers
        //==========================================
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

}) ();

