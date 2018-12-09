(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'pagination';
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
--Done--
Styles for the Desktop  & Mobile pagination buttons
Desktop pagination Buttons: '.page-btn'
Mobile pagination Buttons: '.mobile-page-btn'
~~~~~~~~~~~~~~~~~~~~*/
/*~~~~~~~~~~~~~~~~~~~~
Desktop pagination buttons
~~~~~~~~~~~~~~~~~~~~*/
.page-btn {
  align: center;
  width: 32px;
  height: 64px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(32, 41, 54, 0.05);
  transition: all .2s; }
  .page-btn:hover {
    background: rgba(32, 41, 54, 0.1); }
  .page-btn img {
    transform: scale(1.5); }

.page-btn--left {
  border-bottom-right-radius: 64px;
  border-top-right-radius: 64px;
  left: 0px; }
  .page-btn--left img {
    margin-right: 7px;
    transition: all .2s; }
  .page-btn--left:hover img {
    margin-right: 14px; }

.page-btn--right {
  border-bottom-left-radius: 64px;
  border-top-left-radius: 64px;
  right: 0px; }
  .page-btn--right img {
    position: relative;
    margin-left: 7px;
    transition: all .2s; }
  .page-btn--right:hover img {
    margin-left: 14px; }

/*~~~~~~~~~~~~~~~~~~~~
Mobile pagination buttons
~~~~~~~~~~~~~~~~~~~~*/
.mobile-page-btn {
  position: relative;
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center; }
  .mobile-page-btn a {
    border-radius: 30px;
    box-shadow: 0 0 24px 0 rgba(32, 41, 54, 0.3);
    align-items: center;
    display: flex;
    justify-content: center;
    width: 40px;
    height: 40px; }

.mobile-link img {
    opacity:0.5; /* makes arrow less annoying */
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //\\\\ This toggles between mobile and desktop redirection buttons
           display. When screen is wider than 720px, then desktop is on.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.mobile-link.page-btn {
    display: none; 
} 

@media only screen and (max-width: 720px) {
    .mobile-link.page-btn {
        display: flex;
  }

    .desktop-link.page-btn {
        display: none;
  }
}

.page-btn.non-displayed {
    display: none;
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    \\\\// This toggles between mobile and desktop redirection buttons
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



/*
.checkbox-wrap input[type="checkbox"] {
*/


`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();


