( function() {
    var {
        sn, fconf,
    } = window.b$l.apptree({
    });




    ///these settings take precedence because css-modules are executed later,
    ///after all modules in header of *.html index are loaded,
    fconf.css =
    {
        //=======================
        // //\\ legacy CSS params
        //=======================
        //:UI Colors
        'color-main'        : '#202936',    //main color
        'color-white'       : '#ffffff',
        'color-medium-grey' : '#626D7E',    //Body Copy
        'color-light-grey'  : '#C5CAD4',    //Disabled text Rules
        'color-pale-blue'   : '#F4F6F9',    //switch
        'color-stone-blue'  : '#8091A8',    //accent text such as summary and helper text

        //.affects right pane numerical-model's background
        //.interacts with original-source figure picture, so should be white ...
        'color-light'       : 'white',      //'#FBFCFC',
 
        //:UI
        'border-radius'     : '20px',
        //=======================
        // \\// legacy CSS params
        //=======================

        //exegesis
        exegesisBackgroundColor : 'white'
    };

}) ();

