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
    var tr          = ssF.tr;
    var tp          = ssF.tp;
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    //todm: tmp fix: LL added: to avoid duplicate names: not sure do they exist
    ssF.modpos2medposLL   = modpos2medpos;
    ssF.pointies2lineLL   = pointies2line;
    ssF.pos2pointyLL      = pos2pointy;
    ssF.paintTriangleLL   = paintTriangle;

    return;








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
            stroke  : attr && attr.stroke,                    
            parent  : studyMods[ SUB_MODEL ].mmedia,
            pivots  : [ pivots[0].medpos, pivots[1].medpos ],
            'stroke-width' : ( attr && attr[ 'stroke-width' ] || 1 ) * sconf.thickness
        });
        var cssClass = ( attr && attr['cssClass'] && ( attr['cssClass'] + ' ' ) ) || '';

        var tpclass = (( attr && ns.haz( attr, 'tpclass' ) ) || pName )
                      .replace( /([A-Z])/g, ( match, key1 ) => (
                      '_' + key1.toLowerCase() ));
        $$.$(line.svgel).cls( cssClass + 'tp-' + tpclass );
        return line;
    }



    ///Adds DOM and decorations to pointRack.
    ///Input: pName - name of namespace rack
    ///       attrs - optional attributes
    ///       point in rack must have coordinates in
    ///       property "pos", this property must already exist
    ///
    ///Does:  main thing is adding coordinates conveted
    ///       from model space to media-space
    ///       pt.medpos = modpos2medpos
    function pos2pointy( pName, attrs )
    {
        //pt is a rack of namespace (plain JavaScript object)
        var pt              = tr( pName );
        pt.medpos2dompos    = sDomF.medpos2dompos;
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
            r : ( attrs && attrs.r || 4 ) * sconf.thickness
        });
        var cssClass = ( attrs && attrs['cssClass'] && ( attrs['cssClass'] + ' ' ) ) || '';
        //encripts capital letters as: A to _a
        var tpclass = (( attrs && ns.haz( attrs, 'tpclass' ) ) || pName )
                      .replace( /([A-Z])/g, ( match, key1 ) => (
                      '_' + key1.toLowerCase() ));
        $$.$(pt.svgel).cls( cssClass + 'tp-' +  tpclass );
        return pt;
    }





    //==========================================
    // //\\ paints svg triangles
    //==========================================
    ///Input:   triang = rg[ triangleId ]
    ///         triang.vertices
    ///         cssCls can be for 'theorion--proof'
    function paintTriangle( triangleId, cssCls, tpclass, defaultFill )
    {
        var triang = rg[ triangleId ];
        var vertices = triang.vertices.map( modpos2medpos );
        var svgarg = {
            pivots  : vertices,
            svgel   : triang.svgel,
            parent  : studyMods[ SUB_MODEL ].mmedia
        };
        if( defaultFill ) {
            svgarg.fill = defaultFill;
        }
        //it is important to use this name for the property:
        // "svgel",
        //not the other one like in this statement
        //triang.mediael = sv.polyline( svgarg );
        triang.svgel = sv.polyline( svgarg );

        var tpclass = ( tpclass || triangleId )
                    .replace( /([A-Z])/g, ( match, key1 ) => (
                    '_' + key1.toLowerCase() ));

        cssCls = cssCls ? ' ' + cssCls : '';
        $$.$( triang.svgel ).cls( 'tofill' + cssCls + ' tp-' + tpclass );
    }
    //==========================================
    // \\// paints svg triangles
    //==========================================

}) ();

