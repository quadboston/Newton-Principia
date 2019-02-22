( function() {
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
        ssF.upcreateMedia   = upcreateMedia;
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

        var point_A     = pos2pointy( 'point_A',
                                      { tfamily:'claim',
                                        cssClass:'tfamily-claim tofill tostroke op1'
                                      }
                                    );
        var point_D     = pos2pointy( 'point_D', { tfamily:'claim',
                                      cssClass:'tfamily-claim tofill tostroke op1' } );
        var point_E     = pos2pointy( 'point_E', { tfamily:'claim',
                              cssClass:'tfamily-claim tostroke',
                              'fill' : 'transparent', //todm: patch: removes black core from the point
                              'stroke-width' : 1
                          });
        var point_B     = pos2pointy( 'point_B', { tfamily:'claim',
                              cssClass:'tfamily-claim tostroke debB',
                              'fill' : 'transparent', //todm: patch: removes black core from the point
                              'stroke-width' : 1
                          });
        var point_C     = pos2pointy( 'point_C', { tfamily:'claim',
                              cssClass:'tfamily-claim tostroke',
                              'fill' : 'transparent', //todm: patch: removes black core from the point
                              'stroke-width' : 1
                          });

        var point_d     = pos2pointy('point_d', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_e     = pos2pointy('point_e', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_b     = pos2pointy('point_b', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_c     = pos2pointy('point_c', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_g     = pos2pointy('point_g', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_f     = pos2pointy('point_f', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================










        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================
        pointies2line( 'line_AD', [point_A, point_D], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_AE', [point_A, point_E], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_Ad', [point_A, point_d], { cssClass:'tfamily-proof tostroke' } );
        pointies2line( 'line_Ae', [point_A, point_e], { cssClass:'tfamily-proof tostroke' } );

        pointies2line( 'line_AC', [point_A, point_C], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_AB', [point_A, point_B], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_Ab', [point_A, point_b], { cssClass:'tfamily-proof tostroke' } );
        pointies2line( 'line_Ac', [point_A, point_c], { cssClass:'tfamily-proof tostroke' } );

        pointies2line( 'line_Ag', [point_A, point_g], { cssClass:'tfamily-proof tostroke' } );

        pointies2line( 'line_EC', [point_E, point_C], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_DB', [point_D, point_B], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_ec', [point_e, point_c], { cssClass:'tfamily-proof tostroke' } );
        pointies2line( 'line_db', [point_d, point_b], { cssClass:'tfamily-proof tostroke' } );



        // //\\ paints curve with two pivot points
        var mainCurve = tr( 'mainCurve' );
        mainCurve.mediael = bezier.mediafy({
            mediael : mainCurve.mediael,
            svg : sDomN.svg,
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
            $$.$( ww ).addClass( 'shapeid-pivotPoint'+w0+' tostroke' );
            tr( 'pivotPoint'+w0, 'svgel', ww );
        }
        /*
        duplicate with drag-model.js ... for drags array ... todm:sort out
        rg.pivotPoint1.tfamily = 'primary-curve';
        rg.pivotPoint2.tfamily = 'primary-curve';
        rg.pivotPoint1.name = 'pivotPoint1';
        rg.pivotPoint2.name = 'pivotPoint2';
        */

        $$.addClass( 'tostroke', mainCurve.mediael.paintedCurve)
          .addClass( 'shapeid-' + 'mainCurve')
          ;

        var remoteCurve = tr( 'remoteCurve' );
        remoteCurve.mediael = bezier.mediafy({
            mediael : remoteCurve.mediael,
            svg : sDomN.svg,
            pivots : medRemoteCurPivots,
            bcurve :
            {
                stroke : 'transparent', //todm add to bsl core
                'stroke-width' : 1 * sconf.thickness
            }
        });
        $$.addClass('tostroke', remoteCurve.mediael.paintedCurve); //todm addClassNS
        // \\// paints curve with two pivot points




        //==========================================
        // //\\ paints areas
        // //\\ paints curved areas
        //==========================================
        var wCCA = ssF.calculateCurvedArea;
        wCCA( 'area-Ace', medRemoteCurPivots,  tC, point_A.medpos, point_e.medpos );
        wCCA( 'area-Abd', medRemoteCurPivots,  tB, point_A.medpos, point_d.medpos );
        wCCA( 'area-ACE', medCurvPivots,       tC, point_A.medpos, point_E.medpos );
        wCCA( 'area-ABD', medCurvPivots,       tB, point_A.medpos, point_D.medpos );

        paintCurvArea( 'area-Ace', 'theorion--proof tfamily-proof' );

        paintCurvArea( 'area-Abd', 'theorion--proof tfamily-proof' );

        paintCurvArea( 'area-ACE', 'theorion--claim tfamily-claim' );

        paintCurvArea( 'area-ABD', 'theorion--claim tfamily-claim' );
        function paintCurvArea( areaId, fullMode )
        {
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
                parent : sDomN.svg
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
            $$.$(area.mediael)
              .addClass( 'shapeid-'+areaId ) //cosmetic for ver 647
              .addClass( fullMode + ' tofill' );
              ;
        }
        //==========================================
        // \\// paints curved areas
        //==========================================



        //==========================================
        // //\\ linear areas
        //==========================================
        ///paints AGE-like area
        function paintLikeAGE( areaId, fullMode )
        {
            var area = rg[ areaId ];
            var vertices = area.vertices.map( modpos2medpos );
            area.mediael = sv.polyline({
                pivots : vertices,
                svgel : area.mediael,
                parent : sDomN.svg
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
            $$.addClass( fullMode + ' tofill', area.mediael);
        }
        //:calls to calculate and paint
        //removed by project-manager: paintLikeAGE( 'AGE', 'theorion--claim tfamily-claim' );
        //paintLikeAGE( 'AFD', 'rgba( 255,0,0, 0 )', 'theorion--claim' );
        //removed by project-manager: paintLikeAGE( 'AFD', 'theorion--claim tfamily-claim' );

        paintLikeAGE( 'Age', 'theorion--proof tfamily-proof' );
        paintLikeAGE( 'Afd', 'theorion--proof tfamily-proof' );
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
            sDomF.medD8D && sDomF.medD8D.updateAllDecPoints();

        } else {
            ssF.initMediaModel = initMediaModel;
            ssF.initMediaModel_II = initMediaModel_II;
        }
        return;
        // \\//\\// ends imperative part of the module







        function initMediaModel()
        {
            sDomF.topicModel_2_css_html();
            ssF.initDragModel();
        }

        function initMediaModel_II()
        {
            ssF.create_proofSlider();
            ssF.mediaModelInitialized = true;
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
                parent  : sDomN.svg,
                pivots  : [ pivots[0].medpos, pivots[1].medpos ],
                'stroke-width' : ( attr && attr[ 'stroke-width' ] || 1 ) * sconf.thickness
            });
            var cssClass = attr && attr['cssClass'];
            $$.addClass( cssClass, line.svgel )   //todm addClassNS
              .addClass( 'tostroke')
              .addClass( 'stroke');
        }



        ///converts model-pos and attributes to pointy
        function pos2pointy( pName, attrs )
        {
            var pos             = rg[ pName ].pos;
            var pt              = tr( pName );
            pt.name             = pName;
            pt.pos              = pos;
            pt.medpos2dompos    = sDomF.medpos2dompos;
            pt.medpos           = modpos2medpos( pt.pos );
            pt.tfamily          = attrs.tfamily;
            pt.svgel = sv.u({
                svgel   : pt.svgel,
                parent  : sDomN.svg,
                type    : 'circle',
                fill    : attrs && attrs.fill,
                stroke  : attrs && attrs.stroke,
                'stroke-width' : (( attrs && attrs[ 'stroke-width' ] ) || 0) * sconf.thickness,
                cx : pt.medpos[0],
                cy : pt.medpos[1],
                r : 4 * sconf.thickness
            });
            var cssClass = attrs && attrs['cssClass'];
            //pt.svgel.setAttributeNS( null, 'class', cssClass );
            $$.addClass( cssClass, pt.svgel ); //todm addClassNS
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

