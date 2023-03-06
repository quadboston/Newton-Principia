(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var engCssMs = sn('engCssMs');
    var THIS_MODULE = 'home-pane';
    engCssMs[THIS_MODULE] = function( cssp, fconf ) {
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

    /*====================================================== 
       //|| home page generics
      ======================================================*/

    .hp-section-wrap {
        width: calc(100vw - 80px);
        margin: auto;
    }
    .bsl-home-pane h1, .bsl-home-pane h2 {
        color: ${colorWhite};
    }
    .bsl-home-pane h2 {
        font-size: 28px;
        margin-bottom: 24px;
    }
    /*====================================================== 
       ||// home page generics
      ======================================================*/





    /*====================================================== 
       //|| home-page header
      ======================================================*/
    header {
      position:relative;  
      grid-area: header;
      padding: 0 0;
      margin-bottom: 56px;
    }


    /*====================================================== 
       //|| front-page master caption and read first button
      ======================================================*/
    .landing-text {
      padding-top: 0px;
      position: relative;
      width: 100%;
      z-index: 1;
    }



    /*====================================================== 
       //|| front-page master caption
      ======================================================*/
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
    /*====================================================== 
       ||// front-page master caption
      ======================================================*/



    /*====================================================== 
       ||// front-page master caption and read first button
      ======================================================*/
    .newton-img {
      position: absolute;
      top: 72px;
      z-index: 0;
      right: 96px; }
    /*====================================================== 
       ||// home-page header
      ======================================================*/


    /*====================================================== 
       //|| table of contents
      ======================================================*/
        .landing-table-of-contents {
          position: relative;
          grid-area: lemmas;
          padding: 80px 0;
          padding-top: 80px;
        }

      .landing-table-of-contents .content-book-title,
      .landing-table-of-contents ul a {
        color: white;
        font-size: 17px;
        font-family: 'Goudy Old Style', 'Garamond','Times', serif;
        display: flex;
        justify-content: space-between;
        transition: all .6s;
        width: 100%;
      }
      .landing-table-of-contents .content-book-title {
        font-size: 19px;
      }

      .landing-table-of-contents ul a {
        padding-top: 0px;
        padding-bottom: 5px;
      }

      .landing-table-of-contents .content-book-title {
        padding-top: 15px;
        padding-bottom: 10px;
      }


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
    /*====================================================== 
       ||// table of contents
      ======================================================*/





    /*====================================================== 
       //|| how to
      ======================================================*/
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
    /*====================================================== 
       ||// how to
      ======================================================*/






    /*====================================================== 
       //|| about
      ======================================================*/
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

    /* todm ... not very clear why we need this patch, but it is vital;
         possibly a precedence thing;
        .about is a vital specifity thing;
    */
    .about .dd-label a {
          color: rgba(255, 255, 255, 0.7);
     }
    .about .dd-label a:hover {
          color: white;
    }
    /*====================================================== 
       ||// about
      ======================================================*/





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


