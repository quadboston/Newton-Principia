(function() {
    var {
        sn,
        cssmod,
    } = window.b$l.apptree({
        setModule,
    });
    var cssName = 'model';
    return;





    function setModule() {
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


 /* apparently for letter-labels for lemma 2 */
 .circumscribed.label
 {
    fill: ${colorMain};
 }

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


#widest-visib-toggler-wrap {  /* row in legend line for widthes rectangle */
  display: flex;
}

#lemma2.bsl-approot #widest-visib-toggler-wrap,
.bsl-approot.theorion--claim #widest-visib-toggler-wrap,
.widest-rectangular.invisible,
.bsl-approot.theorion--claim .widest-rectangular {
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


