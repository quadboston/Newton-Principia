(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var fapp        = sn('fapp'); 
    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg_modules = sn('srg_modules', sapp);
    var modulesCount = sn('modulesCount', sapp);
    modulesCount.count = modulesCount.count ? modulesCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + modulesCount.count ] = setModule;

    var cssName     = 'slider';
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

    


/*~~~~~~~~~~~~~~~~~~~~
Styles for the model slider range
~~~~~~~~~~~~~~~~~~~~*/
.slider-group {
  height: 24px;
  padding-top : 10px;
}

input[type=range] {
  -webkit-appearance: none;
  /* Hides the slider so that custom slider can be made */
  width: 100%;
  /* Specific width is required for Firefox. */
  background: transparent;
  /* Otherwise white in Chrome */
  height: 0px !important; }

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; }

input[type=range]:focus {
  outline: none;
  /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */ }

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;
  -moz-appearance: none;
  height: 0px !important;
  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent; }

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid ${colorMain};
  height: 12px;
  width: 12px;
  border-radius: 40px;
  background: ${colorWhite};
  cursor: pointer;
  margin-top: -5px;
  /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */ }

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  border: 2px solid ${colorMain};
  height: 8px;
  width: 8px;
  border-radius: 40px;
  background: ${colorWhite};
  cursor: pointer; }

/* All the same stuff for IE */
input[type=range]::-ms-thumb {
  border: 2px solid ${colorMain};
  height: 12px;
  width: 12px;
  border-radius: 40px;
  background: ${colorWhite};
  cursor: pointer; }

input[type=range] {
  width: 40%;
  height: 2px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]::-webkit-slider-runnable-track {
  width: 40%;
  height: 2px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]:focus::-webkit-slider-runnable-track {
  background: ${colorMain}; }

input[type=range]::-moz-range-track {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]::-ms-track {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  color: transparent;
  margin: 0 auto; }

input[type=range]::-ms-fill-lower {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]:focus::-ms-fill-lower {
  background: ${colorMain}; }

input[type=range]::-ms-fill-upper {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]:focus::-ms-fill-upper {
  background: ${colorMain}; }

.slider {
  width: 40%; }

#mySlider {
  z-index: 1;
  margin-bottom: 8px;
}

.slider-label {
  text-align: center;
  display: inline-block;
  margin: 0 auto; }


`;
// \\// css /////////////////////////////////////////


            return ret;
        };
    }
})();


