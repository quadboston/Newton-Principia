( function() {
    var {
        fapp, nspaste,
        SUB_MODEL, studyMods,
    } = window.b$l.apptree({
        stdModExportList :
        {
            captureAState,
        },
    });
    return;









    //=================================
    // //\\ capturers/readers
    //=================================
    ///captures AState
    function captureAState( ast )
    {
        var ast         = ast || {
            stdModName : SUB_MODEL,
            subessay : amode.subessay //not for rg, do remove later
        };
        var stdMod      = studyMods[ ast.stdModName ];
        //var toreg       = stdMod.toreg;
        var rg          = stdMod.rg;

        nspaste( ast, { spatialStepsMax: { pos: rg.spatialStepsMax.pos     }} );
        nspaste( ast, { slider_sltime:   { t:   rg.slider_sltime.t         }} );
        nspaste( ast, { timeStep:        { t:   rg.timeStep.t              }} );
        nspaste( ast, { speeds:          { pos: [ rg.speeds.pos[0] ]       }} );
        nspaste( ast, { B:               { pos: rg.B.pos                   }} );
        nspaste( ast, { V:               { pos: rg.V.pos                   }} );
        nspaste( ast, { A:               { pos: rg.A.pos                   }} );
        fapp.captureState( ast );
    }
    //=================================
    // \\// capturers/readers
    //=================================

}) ();

