(function(){
const {
        stdMod, amode, rg, sconf
    } = window.b$l.atree({ ssFList: {
        amode2rgstate_decorator
}});
return;

///runs inside of amode2rgstate which
///runs inside "subessay launch" which in turn runs after
///"init model parameters"
function amode2rgstate_decorator (){
    const { logic_phase, aspect, subessay } = amode;
    {
        ////todm make settable in sconf.js
        if( logic_phase === 'scholium' ||
            ( amode.subessay === 'corollary3' ||
              amode.subessay === 'corollary4' )
        ){
            var imgVisib = 'hidden';
            //todm imgVisib make it sconf-igurable
        } else {
            var imgVisib = 'visible';
        }
        stdMod.imgRk.dom$.css( 'visibility', imgVisib );
        stdMod.medScene$.css( 'visibility', imgVisib );
    }
}})();