(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var cssmods = sn('cssModules');
    var THIS_MODULE = 'nav-bar-and-drawer';
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
Nav Bar Styles
~~~~~~~~~~~~~~~~~~~~*/
/*
  width: 50%;
  max-width: 50vw;
*/

.nav-bar {
  background: ${colorWhite};
  display: flex;
  grid-area: nav;
  position: fixed;

  height: ${fconf.attach_menu_to_essaion_root ? 50 : 75}px;

  width: 100%;

  padding-top:20px;
  align-items: center;
  top:0px;
  z-index: 1010; }

  .nav-bar__logo {
    font-family: "essonnes-display",serif;
    font-weight: 300;
    font-size: 18px;
    color: ${colorMain};
    letter-spacing: 0.32px; }
  .nav-bar__current-page {
    font-size: 14px;
    margin: 3px 0 0 12px;
    font-family: "essonnes-display",serif;
    font-weight: 300;
    color: #999999; }


  .sub-nav-bar {
    overflow: hidden;
    align-items: center;
    width: calc(100% - 76px);
    max-width: calc(100% - 76px);
    padding: 0 12px 0 0;

    /* //\\ ported from lemma 9 bsl-menu */
    height: 90px;
    width: 98%;
    margin: 0px;
    padding: 10px;
    padding-bottom: 0px;
    top: 0px;
    border-radius: 10px;
    font-family: helvetica,arial,san-serif;
    z-index: 1001;
    /* \\// ported from lemma 9 bsl-menu */

  }







    .sub-nav-bar h1 {
      color: ${colorStoneBlue};
      font-size: 24px;
      margin: 4px 0 0 0; }

/*~~~~~~~~~~~~~~~~~~~~
Bottom Nav Styles
~~~~~~~~~~~~~~~~~~~~*/
.bottom-nav {
  background: white;
  background: linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0) 100%);
  bottom: 0px;
  display: none;
  padding: 0 16px;
  position: fixed;
  width: calc(100% - 32px);
  height: 56px;
  align-items: center;
  z-index: 1002;
  justify-content: space-between; }

/*~~~~~~~~~~~~~~~~~~~~
Nav Drawer Styles
~~~~~~~~~~~~~~~~~~~~*/
.nav-drawer {
  background: ${colorWhite};
  box-shadow: 8px 0px 16px 0 rgba(32, 41, 54, 0.14);
  display: none;
  width: calc(50vw - 48px);
  height: calc(100vh - 48px);
  padding: 24px;
  position: fixed;
  opacity: 0;
  z-index: 1003; }
  .nav-drawer__dot {
    width: 16px;
    margin-right: 8px; }
    .nav-drawer__dot img {
      display: none;
      width: 100%; }
  .nav-drawer a {
    width: calc(100% - 24px); }
  .nav-drawer__title {
    border-top: 1px dotted ${colorLightGrey};
    border-bottom: 1px dotted ${colorLightGrey};
    color: ${colorMain};
    display: inline-block;
    font-family: EssonnesDisplay-Light;
    font-size: 28px;
    line-height: 1.5;
    margin-top: 32px;
    transition: all .2s; }
    .nav-drawer__title:hover {
      color: rgba(32, 41, 54, 0.8); }
    .nav-drawer__title span {
      font-style: italic; }
  .nav-drawer ul {
    margin-top: 24px; }
  .nav-drawer__list-item {
    background-color: ${colorWhite};
    border-bottom: 1px solid rgba(32, 41, 54, 0.08);
    border-radius: ${borderRadius};
    display: flex;
    padding: 16px 0px;
    position: relative;
    opacity: 0; }
    .nav-drawer__list-item__title {
      font-size: 24px; }
    .nav-drawer__list-item__desc {
      color: ${colorStoneBlue};
      display: inline-block;
      font-family: 'Goudy Old Style', 'Garamond', serif;
      margin-top: 8px; }
    .nav-drawer__list-item:hover {
      background: ${colorLight}; }
    .nav-drawer__list-item.selected img {
      display: block; }
  .nav-drawer .other-links {
    opacity: 0;
    display: block;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0px;
    z-index: 1005; }
    .nav-drawer .other-links__link {
      align-items: center;
      border-top: 1px solid ${colorPaleBlue};
      display: flex;
      height: 48px; }
      .nav-drawer .other-links__link__graphic {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        width: 48px; }

#navDrawer.animateIn {
  display: block;
  animation: slideIn .2s ease-in-out;
  animation-fill-mode: forwards; }
  #navDrawer.animateIn .nav-drawer__list-item {
    animation: slideFade .4s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 0s; }
    #navDrawer.animateIn .nav-drawer__list-item:nth-child(2) {
      animation-delay: .2s; }
  #navDrawer.animateIn .other-links {
    animation: slideUpFade .6s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: .3s; }

@keyframes slideFade {
  0% {
    opacity: 0;
    transform: translateX(-100px); }
  75% {
    transform: translateX(0px); }
  100% {
    opacity: 1; } }

@keyframes slideUpFade {
  0% {
    opacity: 0;
    transform: translateY(200px); }
  75% {
    transform: translateY(0px); }
  100% {
    opacity: 1; } }

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-18vw); }
  4% {
    opacity: 1; }
  100% {
    transform: translateX(0px);
    opacity: 1; } }

#menu-line-1, #menu-line-3 {
  transition: all .2s; }

.exit-ani .btn__menu__bar--dot {
  margin-right: 0px;
  width: 2px; }

.exit-ani #menu-line-1 {
  transform: translateY(4px) rotate(45deg); }

.exit-ani #menu-line-2 {
  opacity: 0; }

.exit-ani #menu-line-3 {
  transform: translateY(-4px) rotate(-45deg); }

#shade {
  width: 100vw;
  height: 100vh;
  background: rgba(32, 41, 54, 0.2);
  display: none;
  z-index: 1002;
  position: fixed;
  top: 0px;
  left: 0px; }

/*~~~~~~~~~~~~~~~~~~~~
Media Queries
~~~~~~~~~~~~~~~~~~~~*/
/*@media only screen and (max-width:800px){
    .nav-bar{
        .nav-bar &__mobile{
            display:flex; //displaying mobile navbar when screen is resized to 800px or less
        }
    }
}*/
@media only screen and (max-width: ${fconf.MOBILE_MEDIA_QUERY_WIDTH_THRESHOLD}px) {
  .pager__right, .pager__left {
    display: none; }
  #navDrawer {
    width: calc(100% - 32px);
    padding: 24px 16px 0 16px;
    height: calc(100vh - 24px); }


  .nav-bar {
    width: 100%;
  }
    .nav-bar .nav-bar__pagination {
      display: none;
  }

  .bottom-nav {
    display: flex;
    z-index: 1010; } }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();


