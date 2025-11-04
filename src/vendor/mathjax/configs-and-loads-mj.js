window.MathJax_is_fully_loaded_flag = false;
window.MathJax = {
  /*
  tex: {
    //todm what is this?
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  */
  svg: {
    fontCache: 'global'
  },
  startup: {
    ready: () => {
      MathJax.startup.defaultReady();
      MathJax.startup.promise.then(() => {
        window.MathJax_is_fully_loaded_flag = true;
        //good debug, but annoying in production
        //console.log('MathJax initial typesetting complete');
      });
    }
  }
};

(function () {
  var script = document.createElement('script');
  //todm need?: script.type = "text/javascript";
  //'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
  //moved to ready() function
  //script.onload = window.enoughMathJaxWaiting = true;
  
  script.src = "./src/vendor/mathjax/tex-mml-chtml.js";
  //?config=TeX-AMS-MML_CHTML" ??

  script.async = true;
  document.head.appendChild(script);
})();
