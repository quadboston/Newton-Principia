
Lemma architecture:

    In addition to standard:
        * trajectory is calculated at each model_upcreate()
            (so, at each resize ... )
            see model_upcreate() about what happens after:
                pathRacks, path-twins, interactionGroups



    This css overrides standard app CSS:
        { src : '../js/global-css.js' },






Following is possibly an outdated readme:
========================================


* lemma has standard logic: media-model.js::model_upcreate and
  model-media.js::media_upcreate

  and additional logic by the function drawEvolution( time )
  which "decorates media" and is "particle evolution master painter"


  the core of decoration is preset in
  js/media-model-declare-decorations.js::declaresMediaDecorationElements()
  by means of property decoration_range like in
  rg.c.decoration_range

  ssD.decor contains this:
      sconf.pname2point
      ssD.decor.B = rg.B
      line segments and polygons
        ...
        ['A', 'C'],
        ['D', 'F'],
        ...
        ['A', 'B', 'C', 'V'],
        ['D', 'E', 'F', 'Z'],
        ...
        ssD.decor[ line-seg-name ] = rgElem;




