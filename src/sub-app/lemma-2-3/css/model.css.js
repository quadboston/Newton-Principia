(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var fapp        = sn('fapp'); 
    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var modulesCount = sn('modulesCount', sapp);
    modulesCount.count = modulesCount.count ? modulesCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + modulesCount.count ] = setModule;

    var cssName     = 'model';
    return;





    function setModule() {

        //var cssmods = sn('cssModules');
        //var THIS_MODULE = 'model-l23';
        //cssmods[THIS_MODULE] = function( cssp, fconf ) {

        cssmod[ cssName ] = function( cssp, fconf ) {
            var ccs = fconf.css;
            var colorMain = ccs['color-main'];
            var colorWhite = ccs['color-white'];
            var colorMediumGrey = ccs['color-medium-grey']; 
            var colorLightGrey = ccs['color-light-grey']; 
            var colorPaleBlue = ccs['color-pale-blue']; 
            var colorStoneBlue = ccs['color-stone-blue']; 
            var colorLight = ccs['color-light']; 
            var borderRadius = ccs['border-radius']; 



// //\\ css /////////////////////////////////////////
var ret = `

    

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* _model.scss                    */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



.rect {
  stroke-width: 1;
  /* fill-opacity: 0.15; */
  stroke-opacity: 1; }

.figure {
  stroke: ${colorMain};
  fill: ${colorMain};
  color: ${colorMain};
  /*r:2.4;*/ }

.outline {
  fill: transparent;
  stroke-width: 2; }


.flex {
  display: flex !important; }

.circumscribed {
  stroke: ${colorMain};
  fill: transparent;
  color: ${colorMain}; }
  .circumscribed.label {
    fill: ${colorMain}; }

.inscribed {
  stroke: ${colorMain};
  fill: transparent;
  color: ${colorMain}; }
  .inscribed.label {
    fill: ${colorMain}; }

.label {
  stroke-width: .6; }

.number {
  text-align: right;
  font-family: Lucida Console;
  min-width: 48px;
  width: 100%;
  max-width: 64px;
  margin-right: 8px; }

svg text {
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "essonnes-display",serif; }

.slider {
  width: 80%; }


#widthest-visib-toggler-wrap {  /* row in legend line for widthes rectangle */
  display: flex;
}

#lemma2.bsl-approot .label.f,
#lemma2.bsl-approot .label.F,
#lemma2.bsl-approot #widthest-visib-toggler-wrap,
#lemma2.bsl-approot .widthest-rectangular,
.bsl-approot.proof--claim #widthest-visib-toggler-wrap,
.bsl-approot.proof--claim .widthest-rectangular {
    display:none;
}

/* legend */
.areas .highlighted {
    font-weight :bold;
}


/* //\\ subapplication (lemma 2, 3 specific) fix;
        removes hidden rects from topic engine
*/
.inscribed.rect.tofill.topicid-inscribed-rectangles[visibility="hidden"],
.circumscribed.rect.tofill.topicid-circumscribed-rectangles[visibility="hidden"] {
    visibility:hidden;
}
/* \\//  subapplication (lemma 2, 3 specific) fix; */





`;
// \\// css /////////////////////////////////////////




            return ret;
        };
    }
})();


