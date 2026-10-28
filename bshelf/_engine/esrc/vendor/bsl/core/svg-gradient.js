(function(){
const ns	  = window.b$l;
const svgNS   = ns.svgNS;
const nssvg   = ns.svg;
const $$      = ns.$$;
nssvg.creates_multiStopGrad = creates_multiStopGrad;
return;

/*
 * rid
///credit: https://www.visualcinnamon.com/2016/05
///        /smooth-color-legend-d3-svg-gradient/
function createDynamicGradient({ svgRoot, gradId, colors}) {
  //creates gradient
  const grad$ = $$
    .cNS('linearGradient')
    .a('id', gradId)
    .a('x1', '0%')
    .a('y1', '0%')
    .a('x2', '0%')
    .a('y2', '100%')
    //created definition placeholder
    .to($$.cNS('defs').to(svgRoot));
  //adds stops to gradient
  colors.forEach((color, index) => {
    const offset = ((index / (colors.length - 1)) * 100).toFixed();
    const stop = $$
        .cNS('stop')
        .a('offset', offset+'%')
        .a('stop-color', color)
        .to( grad$ );
  });
}
*/

///credit: https://www.visualcinnamon.com/2016/05
///        /smooth-color-legend-d3-svg-gradient/
function creates_multiStopGrad({ svgRoot, gradId, stops }) {
  //creates gradient
  const grad$ = $$
    .cNS('linearGradient')
    .a('id', gradId)
    //created definition placeholder
    .to($$.cNS('defs').to(svgRoot));
  stops.forEach((st, ix) => {
     ix+=1;
     grad$
        .a('x'+ix, st.x+'%')
        .a('y'+ix, st.y+'%');
  });
  //adds stops to gradient
  stops.forEach((st, index) => {
    $$
        .cNS('stop')
        .a('offset', st.offset+'%')
        .a('stop-color', st.color)
        .to( grad$ );
  });
}
})();