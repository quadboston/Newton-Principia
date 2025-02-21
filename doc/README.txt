

********************************************
Often used variables.
********************************************


//possibly redundant constants
ns.APP_NAME = 'b$l';
cssp = ns.CSS_PREFIX = bsl //used in CSS names to secure their separation from other vendors

//Top application object. No application objects are outside of it.
//In other words, top application namespace.
ns = window[ APP_NAME ]
     should be used rarely to avoid name conflicts,
     do use or create sub-namespaces returned/imported by window.b$l.apptree

$$ - This is a home made jquery. Once there was a client who forbade using jquery. Because of it is hard to use dom objects directly, this object wraps basic calls to dom.
     It is constructed in file ns.js.

sn - handy function, sn( string, object, default ) returns 
        a) object[ string ] if it does exist,
        b) othewise, assigns to object[ string ] = default and returns it,
           if optional default is omitted, then default={} is used.
        main purpose of this function is make extension of namespaces independent on
        module execution order in index.html, ajax calls, and function calls.

These names are remnants of original overengineering:
fconf - "full config", namespace for full-application,
sconf - "subapplication config", namespace for lemma,
        sconf = fconf.sconf.

//they are storages of configuration: fconf, full config is intended for framework switches,
//sconf - for lemma; just to ease name conflicts;

haff - conveniece function, for example
    see comment in ns.js
        ///If prop exist, executes it as a function with empty args, and
        ///               returns function's return.
        ///Otherwise,     returns 'undefined' value.
        function haff( obj, property ) {
similar idea have functions
    ns.hae = hae;
    ns.haf = haf;
    ns.hafa = hafa;
    ns.hafb = hafb;
    ns.haff = haff;
    ns.hafff = hafff;
    ...


sDomF, sDomN, - additional namespaces for lemma model; F stands for functions, N stands for data
ssF, ssD, - the same for them; possibly redundant constructs;
rg, - the same purpose as above, redundant namespaces of original overengeneering.
rgtools - possibly relates for batton "lab" for some model options, choice of functions in lemma 5,
          thickness of lines, capture model states;
rg - stands for registry, often used for geometrical object: dots, lines, ...

amode - keeps current model state: var { theorion, aspect, submodel, subessay } = amode;

theorion usually takes values as strings "proof", "clame", "corollary", so has semantics of fragment of logical text,

aspect usually takes values as "english", "latin", "exercise", 'comment" - is a languge or cosmetic  form of own theorion,

Precisely strings "proof", "claim", ... "latin", "english" are assigned to theorion_id and aspect_id
correcspondingly in code. These string are keys in Book-text segments in form:
*::*claim|english
...


exegs - array of compiled essays of lemma
//its structure is seen from the following itetrator:
//==============================================
// //\\ sapwns script-embedded-in-text to html
//==============================================
eachprop( exegs, ( theorionAspects, theorion_id ) => {
    eachprop( theorionAspects, ( exAspect, aspect_id ) => {
        exAspect.subexegs.forEach( ( subexeg, exegId ) => {



********************************************
Gui layouts
********************************************
Screen:
    site-navigation menu  - on page top,
    main workspace:
        text workspace        simulation workspace
           lemma-menu           simulation super-scene
           essay                    simulation-scene
            subessay0
               esslay                       svg-scene
               ...                          legend-scene

        for desktop: text workspace - on left, simulation workspace - on right,
        for mobile:  text workspace - on top, simulation workspace - below,

lemma-main-menu
    horizontal: theory-menu: claim/proof/...
    vertical: aspect-menu: Latin, English, Addendum, ...


aspect-menu submenu: subessays - vertical

********************************************
menu-dom-structure
    fapp.fappRoot$.addClass( 'theorion--' + amode.theorion + ' aspect--' + amode.aspect );
        sDomN.essaionsRoot$ = $$.div().cls( bsl-text-widget leftside-menuholder )
            leftSide_menuRotator$ = $$.dct( 'left-side-menu-rotator', ||| made in build_menu_top_leafs_placeholders()
                sDomN.teafs$[ mcat_id ] = $$.dct( 'menu-teaf ' + mcat_id, ||| build_menu_top_leafs_placeholders()
                    var teaf$ = sDomN.teafs$[ mcat_id ];
                    //------------------------------------
                    // shuttle
                    //------------------------------------
                    decorationsContainer$ = $$.dct( 'tleaf-decorations-container',   ||| build_teaf__localfun( mcat_id, subcatsMenu,
                         decorOfShuttle$ = $$.dc( 'shuttle shape' )
                         /// subcatsMenu.list.forEach( function( mitem, mitemIx ) {
                         //leafRk.itemShadow$ = $$.dct( 'shadow shape', ||| make_menu_leaf__onceLocFun()
                    li$ = leafRk.li$ = $$.dct( 'shape litem',   ||| make_menu_leaf__onceLocFun()
                            .e('click', function( event ) {}
                            .ch([
                                $$
                                    .dc( 'caption' )
                                    .ch( 
                                        [   videoPlaceholder$,
                                            leafRk.mItemCaptionHtml$ = $$.span().html( caption )
                                        ]
                                    )
                            ]);    
CSS classes tree:
    bsl-text-widget leftside-menuholder                         
        left-side-menu-rotator
            'menu-teaf ' + mcat_id
                tleaf-decorations-container
                    'shadow shape'
                'litem'
                    'caption'
********************************************




********************************************
Notes
********************************************
Lemma can have few study-models (submodels),
    each subessay belongs only to one submodel,
    default submodel is "common"

topic-engine-css
    <script src="src/base/parser/topics-media-glocss.js"></script>


********************************************
//\\specific variables
********************************************
In lemma2 "predT" stands for predefined-topic colors.
In other lemmas it is named as "predefinedTopics"

These are the colors assigned for specific groups of logically bound itmes:

In some lemmas, they can be, for example:
green for given shapes,
red for forces
blue for times,

Format is: values purposed for RGBA color:
values

[R, G, B, Adefault, A-mouse-highlighted]

For example: "inscribed-rectangles"      : [100,  0, 100, 0.4, 0.7].

********************************************
\\//specific variables
********************************************
