(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'landing';
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
Styles  for the landing page can be found here
Need to fix mobile styling
~~~~~~~~~~~~~~~~~~~~*/
.wrapper {
  width: calc(100vw - 80px);
  margin: auto; }

#landing {
  background-color: ${colorMain}; }
  #landing .nav-bar {
    background-color: transparent; }
  #landing .btn__menu {
    background: transparent; }
    #landing .btn__menu__bar--dot, #landing .btn__menu__bar--line {
      background: ${colorWhite}; }
  #landing .exit-ani .btn__menu {
    background: transparent; }
    #landing .exit-ani .btn__menu__bar--dot, #landing .exit-ani .btn__menu__bar--line {
      background: ${colorMain}; }
  #landing h1, #landing h2 {
    color: ${colorWhite}; }
  #landing h2 {
    font-size: 28px;
    margin-bottom: 24px; }

header {
  position:relative;  
  grid-area: header;
  padding: 40px 0;
  margin-bottom: 56px; }

/* used in landing page as link-class which points to suggested first reading */
.read {
  background: ${colorWhite};
  display: flex;
  border-radius: 2px;
  padding: 12px;
  width: 175px; }
  .read__text {
    display: flex;
    flex-direction: column;
    width: calc(100% - 24px); }
  .read__arrow {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 24px; }
  .read__label {
    opacity: 0.58;
    font-family: Helvetica;
    font-size: 12px;
    color: ${colorMain};
    margin-bottom: 4px; }
  .read__title {
    font-family: Helvetica;
    font-size: 16px;
    color: ${colorMain};
    letter-spacing: 0; }

.landing-text {
  padding-top: 124px;
  position: relative;
  width: 100%;
  z-index: 1; }

.newton-img {
  position: absolute;
  top: 72px;
  z-index: 0;
  right: 96px; }

.landing-title {
  font-family: "essonnes-display", 'Garamond','Times', serif;
  font-weight: 300;
  font-size: 58px;
  color: ${colorWhite};
  letter-spacing: 1.32px;
  line-height: 78px;
  margin-bottom: 16px;
  grid-area: title; }
  .landing-title span {
    font-style: italic; }

.lemmas {
  display: block;
  position: relative;
  grid-area: lemmas;
  margin-top: 128px; }
  .lemmas h3 {
    font-family: 'Goudy Old Style', 'Garamond','Times', serif;
    font-size: 24px;
    color: ${colorMain};
    letter-spacing: 0.55px;
    padding: 8px 0 4px 0; }
  .lemmas__cell {
    background: ${colorLight};
    border-radius: ${borderRadius};
    display: flex;
    flex-direction: column;
    padding: 12px;
    position: relative; }
    .lemmas__cell--coming-soon {
      opacity: .5; }
    .lemmas__cell__thumbnail {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 300px;
      min-height: 160px; }
      .lemmas__cell__thumbnail img {
        max-height: 80%;
        width: auto; }

.how-to {
  padding: 64px 0;
  text-align: center;
  background: #E9E2DA;
  grid-area: howTo; }
  .how-to h2 {
    color: ${colorMain} !important;
    text-align: left; }
  .how-to-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 12px; }
  .how-to__cell {
    padding: 0 24px; }
    .how-to__cell__image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 160px;
      margin-bottom: 12px; }
    .how-to__cell h4 {
      font-size: 24px;
      color: ${colorMain} !important; }

.landing-table-of-contents {
  grid-area: lemmas;
  padding: 80px 0; }
  .landing-table-of-contents ul a {
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 20px;
    font-family: 'Goudy Old Style', 'Garamond','Times', serif;
    margin-bottom: 32px;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    transition: all .6s;
    width: 100%; }
    .landing-table-of-contents ul a:hover {
      border-bottom: 1px solid white;
      transition: all .2s; }
  .landing-table-of-contents ul .table-tag {
    font-family: 'Helvetica', sans-serif;
    font-size: 14px;
    font-weight: 300; }
  .landing-table-of-contents ul .disabled {
    opacity: .5; }
    .landing-table-of-contents ul .disabled:hover {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3); }

.about {
  color: ${colorWhite};
  font-family: 'Goudy Old Style', 'Garamond','Times', serif;
  margin-top: 128px; }
  .about__text {
    width: 100%;
    margin-right: 10%; }
    .about__text p {
      font-size: 18px;
      line-height: 1.5; }
    .about__text h2 {
      margin-bottom: 12px;
      color: ${colorWhite}; }

  .about__author {
    width: 100%;
    margin-top:20px;
    color: ${colorWhite};
  }

    .about__author__text {
      font-size: 18px; }
    .about__author__image {
      color: ${colorWhite};
      clip-path: ellipse(72px 72px at center);
      -moz-clip-path: ellipse(72px 72px at center);
      -webkit-clip-path: ellipse(72px 72px at center); }

.sub-title {
  font-family: 'Goudy Old Style', 'Garamond','Times', serif;
  font-size: 16px;
  font-style: italic;
  color: ${colorWhite};
  margin-bottom: 24px;
  max-width: 500px;
  width: 60%; }

.dd-label {
  font-family: 'Goudy Old Style', 'Garamond','Times', serif;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.6);
  padding: 8px; }
  .dd-label a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: underline; }
    .dd-label a:hover {
      color: white; }

.landing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 12px;
  grid-template-areas: 'header header header header' 'lemmas lemmas lemmas lemmas' 'howTo howTo howTo howTo' 'about about about about';
  padding: 0 120px;
  position: relative;
  z-index: 1; }

.lemmas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px; }

@keyframes mousemove {
  0% {
    transform: translateY(0px);
    opacity: 0; }
  25% {
    opacity: 1; }
  100% {
    transform: translateY(200px);
    opacity: 0; } }

/*~~~~~~~~~~~~~~~~~~~~
Media Queries
~~~~~~~~~~~~~~~~~~~~*/
@media only screen and (max-width: 720px) {

  .sub-title {
    width: 100%; }
  .how-to-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 80px; }
  .landing-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 12px;
    grid-template-areas: 'header' 'scrollarea'  'lemmas' 'about';
    padding: 0 16px !important;
    width: calc(100vw - 32px); }
  .lemmas-grid {
    display: grid;
    grid-template-columns: 1fr !important;
    grid-gap: 12px; }
  .about {
    flex-direction: column; }
    .about .about__text {
      width: 100%; }
    .about .about__author {
      width: 100%;
      display: flex;
      flex-direction: row;
      text-align: left; }
      .about .about__author__image {
        transform: scale(0.8);
        clip-path: ellipse(72px 72px at center); } }





`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();


