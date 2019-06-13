( function() {
    var SUB_MODEL   = 'proof-xix';
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
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

    var globalStyle$ = null;
    var limDemo = null;
    var epsLab = null;
    var epsNeighb_svg = null;
    var epsNeighbUp_svg = null;
    var epsLowLine = null;
    var epsUpperLine = null;
    var neighbHor = null;
    var neighbVertical = null;
    var xNeighbMark = null;
    var xNdm = null;
    var xNm = null;
    var limSvg = null;
    var gammaAxisSvg = null;
    var gAxisSvg = null;    
    var cPSvg = null;
    var aPSvg = null;
    return;









    function setModule()
    {
        sn(SUB_MODEL, studyMods ).upcreateMedia = upcreateMedia;
        sn(SUB_MODEL, studyMods ).initMediaModel = initMediaModel;
    }

    function initMediaModel()
    {
        return;
        sn( SUB_MODEL, studyMods ).initDragModel();
    }

    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMedia( limDemo_ )
    {
        //:run-time-pars
        if( ssF.mediaModelInitialized ) {
            //.vital for making
            //var ww = studyMods[ SUB_MODEL ].medD8D;
            //ww && ww.updateAllDecPoints();
        } else {
            var svg$ = studyMods[ SUB_MODEL ].mmedia$;
            svg$.cls( 'submodel-' + SUB_MODEL );

            /*
            sv.u({
                parent : svg$(),
                type    : 'circle',
                fill    : 'black',
                stroke  : 'black',
                'stroke-width' : 22,
                cx : 111,
                cy : 111,
                r : 40
            });
            */

            ns.svg.printText(
            {   
                parent : svg$(),
                type : 'text',
                text : '',
                x : '100',
                y : '100',
                style : { fill:'black', 'font-size':'40px'}
            });
        }
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================


}) ();

