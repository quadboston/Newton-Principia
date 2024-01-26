

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
sn - handy function, sn( string, object ) returns object[ string ] if this is a proper property of object, if not, then assigns object[ string ] = {} and returns
     if object is missed, then ns is used instead;
     main purpose make application's objects declaration and import independent on sequence of <script> files in index.html.
     To ease index.html management along with function call window.b$l.apptree({...

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

fconf, sconf - remnants of original overengineering:
sconf = fconf.sconf
//they are storages of configuration: fconf, full config is intended for framework switches,
//sconf - for lemma; just to ease name conflicts;

sDomF, sDomN, - additional namespaces for lemma model; F stands for functions, N stands for data
ssF, ssD, - the same for them; possibly redundant constructs;
rg, - the same purpose as above, redundant namespaces of original overengeneering.
rgtools - possibly relates for batton "lab" for some model options, choice of functions in lemma 5,
          thickness of lines, capture model states;
rg - stands for registry, often used for geometrical object: dots, lines, ...

amode - keeps current model state: var { theorion, aspect, submodel, subessay } = amode;

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
