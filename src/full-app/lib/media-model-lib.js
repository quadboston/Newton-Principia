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

    sDomN.mediaLeftMargin = 0;   //fake initial value before resize ran
    sDomN.mediaWidth = 1000; //fake initial value before resize ran

    //todm: tmp fix: LL added: to avoid duplicate names: not sure do they exist
    ssF.pointies2line     = pointies2line;
    ssF.pointnames2line   = pointnames2line;
    ssF.pnames2line       = pnames2line;
    ssF.pnames2poly       = pnames2poly;
    ssF.pos2pointy        = pos2pointy;
    ssF.paintTriangle     = paintTriangle;
    return;









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
        var ww          =  sDomF.getFixedColor( tpclass );
        var stroke      = ns.ha( attr, 'stroke', ww );
        var strokeWidth = ns.ha( attr, 'stroke-width', 1 );
        var line        = ssF.toreg( pName )();
        line.pname      = pName;
        line.pivotNames = [ pivots[0].pname, pivots[1].pname ];
        line.svgel = sv.polyline({
            svgel   : ns.haz( line, 'svgel' ),
            stroke,
            parent  : studyMods[ SUB_MODEL ].mmedia,
            pivots  : [ pivots[0].medpos, pivots[1].medpos ],
            'stroke-width' : strokeWidth * sconf.thickness, 
        });
        var svgel$ = $$.$(line.svgel);
        svgel$.tgcls( 'undisplay', ns.haz( rg[pName], 'undisplay' ) );
        svgel$.cls( cssClass + 'tp-' + tpclass );
        //if( pName === 'Sc' ) ccc( tpclass, line, 
        return line;
    }

    ///a bit of prolifiration
    ///adds "sugar" to pointies2line: point names
    function pointnames2line( name1, name2, cssClass )
    {
        //line_rg =
        return pointies2line(
            'line-' + name1 + name2,
            [ rg[ name1 ], rg[ name2 ] ],
            {
                cssClass        : 'tostroke thickable' +
                                   ( cssClass ? ' ' + cssClass : '' ),
                'stroke-width'  : 2,
            }
        );
        
    }

    ///makes short line name: AB from A and B
    ///returns: rg element
    function pnames2line( name1, name2, cssClass )
    {
        return pointies2line(
            name1 + name2,
            [ rg[ name1 ], rg[ name2 ] ],
            {
                cssClass        : 'tostroke thickable' +
                                   ( cssClass ? ' ' + cssClass : '' ),
                'stroke-width'  : 2,
            }
        );
    }
    //==============================================
    // \\// creates svg-line or updates it if exists
    //==============================================



    function pnames2poly( pNames, cssClass )
    {
        var CLOSED_POLYLINE = true;
        var pName = pNames.join('');
        var pivots = pNames.map( pname => rg[ pname ].medpos );

        if( CLOSED_POLYLINE ) {
            pivots.push( pivots[0] );
        }

        var attr =
        {
            cssClass        : 'tostroke thickable' +
                               ( cssClass ? ' ' + cssClass : '' ),
           'stroke-width'  : 2,
        };
        var tpclass = sDomF.topicIdUpperCase_2_underscore(
                      ( ns.haz( attr, 'tpclass' ) ) || pName
        );
        var cssClass    = ns.h( attr, 'cssClass' ) ? attr['cssClass'] + ' ' :  '';
        var stroke      = ns.ha( attr, 'stroke', sDomF.getFixedColor( tpclass ) );
        var fill ='red';
        var strokeWidth = ns.ha( attr, 'stroke-width', 1 );
        var poly        = ssF.toreg( pName )();
        poly.pname      = pName;
        poly.pivotNames = pNames.concat();
        poly.svgel = sv.polyline({
            svgel   : ns.haz( poly, 'svgel' ),
            stroke,
            //fill,
            parent  : studyMods[ SUB_MODEL ].mmedia,
            pivots,
            'stroke-width' : strokeWidth * sconf.thickness, 
        });
        var svgel$ = $$.$(poly.svgel);
        svgel$.tgcls( 'undisplay', ns.haz( poly, 'undisplay' ) );
        svgel$.cls( cssClass + 'tp-' + tpclass );
        //if( pName === 'ABS' ) ccc( pName, poly );
        return poly;
    }





    //==============================================
    // //\\ Adds DOM and decorations to pointRack
    //==============================================
    ///Input:
    ///       required
    ///         pName - name of namespace rack
    ///         pos - point in rack must have these coordinates
    ///       optional:
    ///         attrs, 'tpclass',
    ///         ns.haz( pt, 'svgel' )
    ///         attrs: see below: //optional attrs 
    ///Does:  main thing is adding coordinates converted
    ///       from model space to media-space
    ///       pt.medpos = //mod 2 inn//
    function pos2pointy( pName, attrs )
    {
        attrs = attrs || {};
        var tpclass = sDomF.topicIdUpperCase_2_underscore(
                      ( ns.haz( attrs, 'tpclass' ) ) || pName
        );
        var cssClass    = ns.h( attrs, 'cssClass' ) ? attrs['cssClass'] + ' ' :  '';
        var pt              = rg[ pName ]; //= value in registry
        pt.medpos           = ssF.mod2inn( pt.pos );
        pt.pname            = pName;
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
        var svgel$ = $$.$(pt.svgel);
        svgel$.tgcls( 'undisplay', ns.haz( pt, 'undisplay' ) );
        svgel$.cls( cssClass + 'tp-' +  tpclass );
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
        var vertices = triang.vertices.map( ssF.mod2inn );
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

