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

    //todm: tmp fix: LL added: to avoid duplicate names: not sure do they exist
    ssF.modpos2medposLL   = modpos2medpos;
    ssF.modpos2medpos_originalLL   = modpos2medpos_original;
    ssF.pointies2lineLL   = pointies2line;
    ssF.pos2pointyLL      = pos2pointy;
    ssF.paintTriangleLL   = paintTriangle;
    return;








    //==========================================
    // //\\ pos to pos
    //==========================================
    ///transforms model-coordinates to media-coordinates
    function modpos2medpos( pos )
    {
        if( !pos ) { pos = this; }
        return [ pos[0] * sconf.mod2med_scale + sconf.activeAreaOffsetX,
                 pos[1] * sconf.mod2med_scale * sconf.MONITOR_Y_FLIP +
                 sconf.activeAreaOffsetY ];
    }
    function modpos2medpos_original( pos )
    {
        if( !pos ) { pos = this; }
        return [ pos[0] * sconf.originalMod2med_scale + sconf.activeAreaOffsetX,
                 pos[1] * sconf.originalMod2med_scale * sconf.MONITOR_Y_FLIP +
                 sconf.activeAreaOffsetY ];
    }
    //==========================================
    // \\// pos to pos
    //==========================================



    //==============================================
    // //\\ creates svg-line or updates it if exists
    //==============================================
    ///
    ///API
    /// Returns: line with line.svgel,
    /// Sets:
    ///     line.svgel).cls( cssClass + 'tp-' + tpclass
    ///     line.svgel
    /// Input:
    ///     required:
    ///         pName - name of line,
    ///         pivots[0].medpos, pivots[1].medpos
    ///
    ///     optional:
    ///         line as ssF.tr( pName )
    ///         attr.stroke
    ///         attr[ 'stroke-width' ]
    ///         attr.cssClass
    ///         attr.tpclass
    ///
    ///     used external:
    ///         sconf.thickness
    ///         studyMods[ SUB_MODEL ].mmedia
    ///
    function pointies2line( pName, pivots, attr )
    {
        attr = attr || {};
        var tpclass = sDomF.topicIdUpperCase_2_underscore(
                      ( ns.haz( attr, 'tpclass' ) ) || pName
        );
        var cssClass    = ns.h( attr, 'cssClass' ) ? attr['cssClass'] + ' ' :  '';
        var stroke      = ns.ha( attr, 'stroke', sDomF.getFixedColor( tpclass ) );
        var strokeWidth = ns.ha( attr, 'stroke-width', 1 );
        var line = ssF.toreg( pName )();
        line.svgel = sv.polyline({
            svgel   : ns.haz( line, 'svgel' ),
            stroke,
            parent  : studyMods[ SUB_MODEL ].mmedia,
            pivots  : [ pivots[0].medpos, pivots[1].medpos ],
            'stroke-width' : strokeWidth * sconf.thickness, 
        });
        $$.$(line.svgel).cls( cssClass + 'tp-' + tpclass );
        return line;
    }
    //==============================================
    // \\// creates svg-line or updates it if exists
    //==============================================



    //==============================================
    // //\\ Adds DOM and decorations to pointRack
    //==============================================
    ///Input:
    ///       required
    ///         pName - name of namespace rack
    ///         pos - point in rack must have these coordinates
    ///       optional:
    ///         ns.haz( pt, 'svgel' )
    ///         attrs: see below: //optional attrs 
    ///Does:  main thing is adding coordinates converted
    ///       from model space to media-space
    ///       pt.medpos = modpos2medpos
    function pos2pointy( pName, attrs )
    {
        attrs = attrs || {};
        var tpclass = sDomF.topicIdUpperCase_2_underscore(
                      ( ns.haz( attrs, 'tpclass' ) ) || pName
        );
        var cssClass    = ns.h( attrs, 'cssClass' ) ? attrs['cssClass'] + ' ' :  '';
        //pt is a rack of namespace (plain JavaScript object)
        var pt              = rg[ pName ];
        pt.medpos           = modpos2medpos( pt.pos );
        //optional attrs
        pt.stroke           = ns.ha( attrs, 'stroke', sDomF.getFixedColor( tpclass ) );
        pt.fill             = ns.ha( attrs, 'fill', sDomF.getFixedColor( tpclass ) );
        var strokeWidth     = ns.ha( attrs, 'stroke-width', 0 );
        var r               = ns.ha( attrs, 'r', 4 ) * sconf.thickness;
                              //visible size of a dot on screen
        pt.svgel = sv.u({
            svgel   : ns.haz( pt, 'svgel' ),
            parent  : studyMods[ SUB_MODEL ].mmedia,
            type    : 'circle',
            fill    : pt.fill,
            stroke  : pt.stroke,
            'stroke-width' : strokeWidth * sconf.thickness,
            cx : pt.medpos[0],
            cy : pt.medpos[1],
            r,
        });
        $$.$(pt.svgel).cls( cssClass + 'tp-' +  tpclass );
        return pt;
    }
    //==============================================
    // \\// Adds DOM and decorations to pointRack
    //==============================================





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

        var tpclass = sDomF.topicIdUpperCase_2_underscore( tpclass || triangleId );
        cssCls = cssCls ? ' ' + cssCls : '';
        $$.$( triang.svgel ).cls( 'tofill' + cssCls + ' tp-' + tpclass );
    }
    //==========================================
    // \\// paints svg triangles
    //==========================================

}) ();

