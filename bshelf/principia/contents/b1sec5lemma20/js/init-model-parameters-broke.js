{
    const { sconf, ssF, rg, stdMod, toreg, sData, } =
    window.b$l.atree({ stdModList: {init_lemma: ()=>{
        sData.initialparC = sconf.initialparC;
        sData.initialparA = sconf.initialparA;
        sData.initialparB = sconf.initialparB;
        sData.initialparP = sconf.initialparP;
        toreg( 'b' )( 'value', sconf.b );
        sData.polar_ell_model = {
            q0 : sconf.q0,
            e : sconf.excentricity,
            focus : ssF.medpos2modpos( sconf.focus ),
            latus2 : sconf.latus2*sconf.med2mod,
            stepsCount : 1000,
        };
        stdMod.curveModel2branches();
        stdMod.deriveParameters( 'do set T' );
    }
}

