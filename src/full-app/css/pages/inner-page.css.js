(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'inner-page';
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

    

/*~~~~~~~~~~~~~~~~~~~~
Styles for the Lemma page live here
Here you can find styles for layouts and general page styles. 
Styles for controlling the colors of the model can be found on the settings page.
~~~~~~~~~~~~~~~~~~~~*/
#egrip {
  display: flex;
  align-items: center;
  right: 0px;
  top: 0;
  padding: 0 8px;
  position: absolute;
  height: 100%;
  cursor: pointer; }
  #egrip:hover {
    background: ${colorLight}; }



/********************************/

  #areadsk {
    display: none;
    visibility: hidden; }

  .title-fixed {
    overflow: hidden;
    background: ${colorWhite};
    position: fixed;
    top: 0px;
    width: calc(50% - 102px);
    max-width: calc(50% - 102px);
    min-width: 0px;
    left: 48px;
    padding: 0 40px 0 12px; }

.model-section {
  background: ${colorLight};

  /********************************/
  /*
  display: flex;
  */
  float:right;

  grid-area: playground;
  height: 100vh;
  flex-direction: column;
  /*width: -webkit-calc(50vw - 40px);
    width:    -moz-calc(50vw - 40px);
    width:         calc(50vw - 40px);*/

  /******************************************/
  width: 50%;

  padding: 8px 0 0px 0; }
  .model-section__top {
    height: -moz-calc(100% - 180px);
    height: -webkit-calc(100% - 180px);
    height: calc(100% - 180px);
    justify-content: center;
    display: flex;
    flex-direction: column; }
  .model-section__bottom {
    height: 180px; }
  .model-section .desc {
    padding-top: 16px;
    width: -webkit-calc(100% - 64px);
    width: -moz-calc(100% - 64px);
    width: calc(100% - 64px);
    padding: 0 32px; }
    .model-section .desc__header {
      margin: 12px 0; }
    .model-section .desc .line {
      width: 100%;
      height: 1px;
      background-color: ${colorLightGrey}; }
  .model-section .desc__header-title {
    font-family: 'Helvetica';
    font-size: 18px; }

.model {
  display: flex;
  width: 100%;
  height: 84%;
  align-items: center;
  justify-content: center; }

.${cssp}-media-root {
  width: calc(100% - 90px) ;
}

#illus {
  width: 100%;
  }

.desc--claim {
  margin-top: 24px;
  margin-bottom: 64px; }

.desc--proof {
  margin-top: 24px;
  }

#areadesk {
    margin:auto;
    margin-top:20px;
    width:200px;
}


    .desc--proof.hidden,
    .desc--claim.hidden {
        display:none;
    }

@media only screen and (max-width: 800px) {
    #areadesk.hidden {
        display:none;
    }
}


.desc__header {
  margin-bottom: 12px;
  display: flex;
  align-items: center; }
  .desc__header-title {
    margin: 0px; }

.mobileShow {
  display: block !important; }

.mobileHide {
  display: none !important; }

.movable {
  cursor: pointer; }

.btn {
  background-color: ${colorWhite};
  border-radius: ${borderRadius};
  cursor: pointer; }
  .btn__menu {
    box-shadow: 2px 0 96px 0 rgba(32, 41, 54, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;

    flex-direction: column;
    width: 32px;
    height: 32px;
    margin: 0 16px 0 16px;
    transition: all .2s ease;
    z-index: 1002; }
    .btn__menu__bar {
      display: flex;
      justify-content: space-between;
      width: 18px;
      height: 2px;
      padding: 1px 0; }
      .btn__menu__bar--dot {
        display: block;
        width: 1px;
        height: 1px;
        background-color: ${colorMain};
        margin-right: 4px; }
      .btn__menu__bar--line {
        display: block;
        width: 16px;
        height: 1px;
        background-color: ${colorMain}; }
  .btn:hover {
    box-shadow: 0 4px 12px 0 rgba(32, 41, 54, 0.2); }

.desc--areas {
  position: absolute;
  bottom: 0px; }
  .desc--areas h2 {
    font-family: 'Helvetica',sans-serif;
    font-size: 1rem; }

.areas__checkboxes {
  font-family: 'Helvetica', sans-serif;
  font-size: 1rem; }
  .areas__checkboxes-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px; }
  .areas__checkboxes .checkbox {
    margin-right: 12px; }

.video-desktop {
  display: none;
  margin-bottom: 32px;
  min-height: 320px;
  width: 100%;
  border-radius: 5px; }

.video-mobile-wrapper {
  display: none;
  align-items: center;
  justify-content: center;
  background-color: rgba(32, 41, 54, 0.9);
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 1005; }


.help-box {
  float:left;
  margin-top:8px;
  color: ${colorMediumGrey};
  font-size: 12px;
  padding: 0 16px;
  border-radius: ${borderRadius};
  display: flex;
  align-items: center;
}


  .help-box img {
    margin-right: 8px;
  }


  .scrollarea {
    padding-top:20px;
  }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();


