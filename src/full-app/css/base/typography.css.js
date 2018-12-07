(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');

    var THIS_MODULE = 'typography';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;


// //\\ css /////////////////////////////////////////
var ret = `


    

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



`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();


