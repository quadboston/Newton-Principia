{const{
    sn, apush, arrover, mat, eachprop, nspaste, tprepo, tpelect,
    sf, rg, ssF, gshapes,
}=window.b$l.atree();
const tr = tprepo;
const el = tpelect;


ssF.init_conf=function(){
    //----------------------------------
    // //\\ paper diagram parameters
    //----------------------------------
    //for real picture if diagram's picture is supplied or
    //for graphical-media work-area if not supplied:
    sf.medWidth = 1000;
    sf.medHeight = 600;
    //model's spacial unit expressed in pixels of the picture:
    //vital to set to non-0 value
    sf.mod2med = sf.medWidth*0.85;
    sf.medposOfModOrigin_x = 0;
    sf.medposOfModOrigin_y = 600;
    //----------------------------------
    // \\// paper diagram parameters
    //----------------------------------

    //*********************************************
    // //\\ decorational parameters
    //*********************************************
    sf.mediaBgImage = "diagram.jpg";
    //making size to better fit lemma's diagram
    sf.LETTER_FONT_SIZE_PER_1000 = 20;

    sf.default_tp_lightness = 30;
    //todo ?
    //sf.TP_OPACITY_FROM_fixed_colors = true;
    sf.TP_OPACITY_FROM_fixed_colors = false;
    sf.TP_OPACITY_LOW = 0.7;
    sf.TP_OPACITY_HIGH = 1;

    sf.BODY_SIZE = [0.06, 0.06], //in sf.mod2med units
    //*********************************************
    // \\// decorational parameters
    //*********************************************

    // model
    sf.g = 9.8;

    //*************************************
    // //\\ elected colors,
    //*************************************
    nspaste( el, {
        given:      tr.given,
        body:       tr.body,
        speed:      tr.speed,
        mass:       tr.mass,
        borbit:     tr.borbit,
        time:       tr.time,
        distance:   tr.distance,
        proof:      tr.proof,
        force:      tr.force,
        context:    tr.context,
        'friction-k': [0,0,250],
        'applied-force': tr.force,
        'friction-force': [0,0,250],
        'result-force': [200,0,200],
        'normal-force': [0,0,200],
        'gravity-force': [30,100,0],
    });
    //*************************************
    // \\// elected colors,
    //*************************************
    ssF.init_conf_shapes();
    ssF.init_conf_lines();
    ssF.init_conf_points();
    ssF.skipD8D = skipD8D;
}

///=============================================================
///protects textarea, form elements ... from dragging
///    to preserve ordinary clicks on form elements or other
///    controls disables dragging on form and other elements
///=============================================================
function skipD8D( ev ){
    var tag = ev.target.tagName.toLowerCase();
    // //\\ removes down-event which starts slider animation
    //todo make geneiric with pref
    //const cl = ns.haz( ev.target, 'classList' );
    const cl = ev.target.classList;
    if(cl){
       const hasMatch = Array.from(cl).some(cls => /\-run$/.test(cls));
        if( hasMatch ) return true;
    }
    // \\// removes down-event which starts slider animation
    if(
        //protects wbd debugger
        tag === 'textarea' ||
        //protects forms
        tag === 'input' || tag === 'select' ||
        tag === 'button'
    ){
        return true;
    }
}
}