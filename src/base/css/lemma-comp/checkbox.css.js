(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'checkbox';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
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


.checkbox-wrap input[type="checkbox"] {
  opacity: 0;
  display: none; }


/* //\\\\ this block creates nice fancy checkboxes in data-legend */    

.checkbox-wrap label::before {
  background-color: ${colorPaleBlue};
  border: 2px solid ${colorLightGrey};
  border-radius: 2px;
  content: "";
  cursor: pointer;
  display: inline-block;
  height: 14px;
  width: 14px; }

/* this thing apparently makes these corner-like-rotated-borders
   simulating a check-mark */
.checkbox-wrap label::after {
  content: "";
  display: inline-block;
  height: 4px;
  width: 8px;
  border-left: 2px solid ${colorWhite};
  border-bottom: 2px solid ${colorWhite};
  transform: rotate(-45deg); }

.checkbox-wrap label {
  position: relative; }

.checkbox-wrap label::after {
  position: absolute; }

/*Checkmark*/
.checkbox-wrap label::after {
  left: 4px;
  top: 0px; }

/*Hide the checkmark by default*/
.checkbox-wrap input[type="checkbox"] + label::after {
  content: none; }

/*Unhide the checkmark on the checked state*/
.checkbox-wrap input[type="checkbox"]:checked + label::after {
  content: ""; }

/*Make check box color change on the checked state*/
.checkbox-wrap input[type="checkbox"]:checked + label::before {
  background-color: ${colorMain};
  border: 2px solid ${colorMain}; }

/*Adding focus styles on the checkbox*/
.checkbox-wrap input[type="checkbox"]:focus + label::before {
  outline: #3b99fc auto 5px; }

/* \\\\// this block creates nice fancy checkboxes in data-legend */    


`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();


