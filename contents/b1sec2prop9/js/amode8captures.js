( function() {
    var { stdMod, amode, rg, } 
        = window.b$l.apptree({ ssFExportList : { amode2rgstate, }, });
    return;


    ///runs inside "subessay launch" which in turn runs after
    ///"init model parameters"
    function amode2rgstate( captured )
    {
        const { logic_phase, aspect } = amode;
        // Latin tabs have no subessays; they show what the Text tab
        // shows for the first subessay of the same logic_phase
        const subessay = aspect === 'latin' ?
            { claim : 'claim', proof : 'solution' }[ logic_phase ] :
            amode.subessay;
        if( subessay !== amode.subessay ) {
            // lets CSS show the shapes classed for that subessay
            stdMod.svgScene.classList.add( 'subessay--' + subessay );
        }
        rg.Q.hideD8Dpoint = subessay !== 'claim' && subessay !== 'solution';

		rg['curvatureCircle'].undisplay = subessay !== 'another-solution';
        return captured;
    }

}) ();
