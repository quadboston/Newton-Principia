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
    var rg          = sn('registry',ssD);
    var ssF         = sn('ssFunctions',ss);
    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('srg_modules', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    var limDemo     = null;

    ssF.initMediaModel = initMediaModel;
    ssF.initMediaModel_II = initMediaModel_II;
    return;





    function setModule()
    {
        ssF.upcreateMedia   = upcreateMedia;
    }




    function initMediaModel()
    {
        //this sub runs after first upcreate (which includes upcreateMedia )
        sDomF.topicModel_2_css_html();
        //ssF.initDragModel();
    }
    function initMediaModel_II()
    {
        //ssF.create_proofSlider();
        ssF.mediaModelInitialized = true;
    };

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMedia( limDemo_ )
    {
        //:study-pars
        var EPSILON = ssD.EPSILON;
        //:run-time-pars
        if( ssF.mediaModelInitialized ) {
            //sDomF.medD8D && sDomF.medD8D.updateAllDecPoints();
        } else {
            //.makes visible only for this essay aspects
            sDomN.mmedia$.cls( 'essay-claim--xixcentury' );
            limDemo = limDemo_;
            var point_E = pos2pointy(
                'point_E',
                { tfamily:'claim',
                  cssClass:'tfamily-claim tostroke lostpoint',
                  'fill' : 'transparent', //todm: patch: removes black core from the point
                  'stroke-width' : 2,
                  style : { 'stroke' : 'red' }
            });
            interval2media( 
                'eps_Neighb',
                { style : { 'stroke' : 'red' } }
            );
        }
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================


    ///makes line
    function interval2media( pName, attr )
    {
        var interval = points2media( rg[ pName ][ pName ] );
        var epsNeighb_svg = sv.polyline({
            //svgel   : line.svgel,
            parent  : sDomN.svg,
            pivots  : interval,
            style   : attr.style,
            'stroke-width' : ( attr && attr[ 'stroke-width' ] || 1 ) * sconf.thickness
        });
        var cssClass = attr && attr['cssClass'];
        $$.addClass( cssClass, epsNeighb_svg )   //todm addClassNS
          .addClass( 'tostroke')
          .addClass( 'stroke');
    }

    ///converts array of points to media scale
    function points2media( points )
    {
        var conv = limDemo.instance.xy2mediaArr;
        return points.map( point => conv( point[0], point[1] ) );
    }


    ///converts model-pos and attributes to pointy
    function pos2pointy( pName, attrs )
    {
        var pos             = rg[ pName ].pos;
        var pt              = tr( pName );
        pt.name             = pName;
        pt.pos              = pos;
        pt.medpos2dompos    = sDomF.medpos2dompos;
        pt.medpos           = limDemo.instance.xy2mediaArr( pt.pos[0], pt.pos[1] );
        pt.tfamily          = attrs.tfamily;
        pt.svgel = sv.u({
            svgel   : pt.svgel,
            parent  : sDomN.svg,
            type    : 'circle',
            fill    : attrs && attrs.fill,
            stroke  : attrs && attrs.stroke,
            style   : attrs.style,
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

}) ();

