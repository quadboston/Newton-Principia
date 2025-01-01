//This module has css which is used when front-page is being seen,
//without page reload, it does replace style-tag "home" when
//front-pane "home-pane" shifts to visiblility area and
//after that, this tag replaced with ".dummy-style {",

//This css does group wiht css-module "reset", which presets defaults for all browsers,

( function() {
    var {
        ns, sn, userOptions, engCssMs,
    } = window.b$l.apptree({
    });
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
        var ret = `

    /*====================================================== 
       //\\\\ home page generics
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
       \\\\// home page generics
      ======================================================*/





    /*====================================================== 
       //\\\\ home-page header
      ======================================================*/
    header {
      position:relative;  
      grid-area: header;
      padding: 0 0;
      margin-bottom: 56px;
    }


    /*====================================================== 
       //\\\\ front-page master caption and read first button
      ======================================================*/
    .landing-text {
      padding-top: 0px;
      position: relative;
      width: 100%;
    }



    /*====================================================== 
       //\\\\ front-page master caption
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

    .landing-subtitle {
      font-family: "essonnes-display", 'Garamond','Times', serif;
      font-size: 25px;
      color: ${colorWhite};
      letter-spacing: 1.32px;
      line-height: 36px;
      grid-area: title; }
      .landing-subtitle span {
        font-style: italic; }
      .landing-subtitle a {
        color: ${colorWhite};
        text-decoration: underline;
      }

    .sub-title {
      font-family: "essonnes-display", 'Garamond','Times', serif;
      font-size: 19px;
      color: ${colorWhite};
      letter-spacing: 1.32px;
      line-height: 32px;
      grid-area: title; }
      .sub-title span {
        font-style: italic; }
      .sub-title a {
        color: ${colorWhite};
        text-decoration: underline;
      }

    /*====================================================== 
       \\\\// front-page master caption
      ======================================================*/



    /*====================================================== 
       \\\\// front-page master caption and read first button
      ======================================================*/
    .newton-img {
      position: absolute;
      top: 0px;
      z-index: -1;
      right: 96px; }
    /*====================================================== 
       \\\\// home-page header
      ======================================================*/


    /*====================================================== 
       //\\\\ table of contents
       good: transform : scale(1.1, 1.0);
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
        line-height:1.1;
        font-family: 'Goudy Old Style', 'Garamond','Times', serif;
        transition: all .1s;
      }
      .landing-table-of-contents .content-book-title {
        font-size: 19px;
      }
      .landing-table-of-contents .content-book-title {
        padding-top: 15px;
        padding-bottom: 10px;
      }
      .landing-table-of-contents ul .table-tag {
        font-family: 'Helvetica', sans-serif;
        font-size: 14px;
        font-weight: 300; }

        `;
        
        
    ret += `
       .landing-table-of-contents .lemma-item-title {
            display: inline-block;
            padding : 4px 10px 2px 1px;
            border-radius : 10px;
            border : 1px solid transparent;
        }
        .landing-table-of-contents li .chosen.lemma-item-title,
        .landing-table-of-contents .lemma-item-title:hover {
            background-color : #506677;
            border : 1px solid #cccccc;
        }
        .landing-table-of-contents ul a {
            padding-bottom : 0px;
        }
    /*====================================================== 
       \\\\// table of contents
      ======================================================*/





    /*====================================================== 
       //\\\\ how to
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
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 52px; }
      .how-to__cell {
        p {
          font-size: 20px;
        }
        padding: 0 14px; }
        .how-to__cell__image {
          display: flex;
          align-items: center;
          justify-content: center;
          height: auto;
          margin-top: 16px;
          margin-bottom: 66px; 
          img {
            max-width: 100%;
            height: auto;
          }
        }
        .how-to__cell h4 {
          font-size: 24px;
          color: ${colorMain} !important; }
    /*====================================================== 
       \\\\// how to
      ======================================================*/





    /*====================================================== 
       //\\\\ home page plain text sections
      ======================================================*/
    .hp-text-section {
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

      .hp-text-section-body {
        padding: 8px;
        font-size: 18px; }


    .dd-label {
      font-family: 'Goudy Old Style', 'Garamond','Times', serif;
      color: rgba(255, 255, 255, 0.6);
      }
      .dd-label a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: underline; }
        .dd-label a:hover {
          color: white; }

    /* todm ... not very clear why we need this patch, but it is vital;
         possibly a precedence thing;
        .hp-text-section is a vital specifity thing;
    */
    .hp-text-section .dd-label a {
          color: rgba(255, 255, 255, 0.7);
     }
    .hp-text-section .dd-label a:hover {
          color: white;
    }
    /*====================================================== 
       \\\\// home page plain text sections
      ======================================================*/


      
    /*====================================================== 
      //\\\\ options
     ======================================================*/
    .options {
      color: ${colorWhite};
      font-family: 'Goudy Old Style', 'Garamond','Times', serif;
      margin-top: 128px;
    }
    .option__text {
      font-size: 18px; }
    /*====================================================== 
      \\\\// options
     ======================================================*/

    /*====================================================== 
      //\\\\ feedback
     ======================================================*/
      .feedback {
        font-size: 20px;
        width: 100%;
        margin-top:20px;
        color: ${colorWhite};
      }
      .feedback-label {
      font-family: 'Goudy Old Style', 'Garamond','Times', serif;
      color: rgba(255, 255, 255, 0.6);
      }
      .feedback-label a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: underline; }
        .feedback-label a:hover {
          color: white; }
    /*====================================================== 
      \\\\// feedback
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


  .how-to-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 20px; }


  .about {
    flex-direction: column; }
    .about .about__text {
      width: 100%; }
    .about .about__author {
      width: 100%;
      text-align: left; }
  }

`;
        return ret;
    };
})();


