( function() {
  var ns  = window.b$l;
  var sn  = ns.sn;
  var engCssMs = sn('engCssMs');
  var THIS_MODULE = 'typography';



  engCssMs[THIS_MODULE] = function( cssp, fconf ) {
    var ccs = fconf.css;
    return `
      /*fonts*/
      body{
          color: ${ccs['color-medium-grey']};
          font-family: 'Helvetica',sans-serif;
      }
      h1,h2,h3,h4,h5,h6{
          color: ${ccs['color-main']};
          font-weight:200;
          font-family: 'Goudy Old Style', 'Garamond','Times', serif;
      }
      h1{
          font-size: 48px;
      }
      h2{
          font-size: 24px;
      }

      a{
          text-decoration: none;
      }
      p{
          font-size: 1rem;
          line-height: 1.75;
      }

      /* home page::user-guide-paragraphs */
      .how-to__cell p {
          line-height: 1.2;
      }

      b {
          font-weight : bold;
      }

      

            
      .appid-b1sec1lemma6 .main-legend tr:nth-child(1) {
        display: none;
      }
      .appid-b1sec1lemma6 .main-legend tr:nth-child(3) td:nth-child(2),
      .appid-b1sec1lemma6 .main-legend tr:nth-child(3) td:nth-child(3),
      .appid-b1sec1lemma6 .main-legend tr:nth-child(3) td:nth-child(4)
      {
        display: none;
      }
      .appid-b1sec1lemma6 .main-legend tr:nth-child(3) td:nth-child(5)
      {
        text-align: left;
      }
      .appid-b1sec1lemma6 .main-legend tr:nth-child(4) td:nth-child(2),
      .appid-b1sec1lemma6 .main-legend tr:nth-child(4) td:nth-child(3),
      .appid-b1sec1lemma6 .main-legend tr:nth-child(4) td:nth-child(4)
      {
        display: none;
      }
      .appid-b1sec1lemma6 .main-legend tr:nth-child(4) td:nth-child(5)
      {
        text-align: left;
      }
      .appid-b1sec1lemma6 .main-legend tr td:nth-child(1)
      {
        text-align: right;
      }
      .appid-b1sec1lemma6 .main-legend tr:nth-child(3) td:nth-child(5),
      .appid-b1sec1lemma6 .main-legend tr:nth-child(4) td:nth-child(5) {
        text-align: right;
        font-family: Lucida Console;
      }

      .appid-b1sec1lemma7 .main-legend tr:nth-child(1) {
        display: none;
      }
      .appid-b1sec1lemma7 .main-legend tr td:nth-child(1),
      .appid-b1sec1lemma7 .main-legend tr td:nth-child(4) {
        text-align: right;
      }
      .appid-b1sec1lemma7 .main-legend tr td:nth-child(2),
      .appid-b1sec1lemma7 .main-legend tr td:nth-child(5) {
        font-family: Lucida Console;
      }

      .appid-b1sec1lemma8 .main-legend tr:nth-child(1) {
        display: none;
      }
      .appid-b1sec1lemma8 .main-legend tr td:nth-child(1),
      .appid-b1sec1lemma8 .main-legend tr td:nth-child(4) {
        text-align: right;
      }
      .appid-b1sec1lemma8 .main-legend tr td:nth-child(2),
      .appid-b1sec1lemma8 .main-legend tr td:nth-child(5) {
        font-family: Lucida Console;
      }
    `;
  };
})();


