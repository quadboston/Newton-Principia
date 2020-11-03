(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);
    var modName     = 'proof-vs-claim-visib';
    setModule();
    return;




    ///this is a basic essay-CSS-visibility setup
    ///for proof and claim essays,

    ///it can be overridden by "modName" in lemma sources loaded later on

    ///if final (possibly overridden list) does not have this modName, then
    ///this mod is inffectevie,
    function setModule()
    {
        cssmod[ modName ] = function( cssp, conf ) {
            var ret =
                `
                /*========================================================*/
                /* //|| modes                                             */
                /*      establishes visibility only one model at the time */
                /*      proof vs claim                                    */
                /*========================================================*/
                .bsl-approot.theorion--proof .theorion--claim,
                .bsl-approot.theorion--claim .theorion--proof {
                    visibility:hidden;
                }    
                .bsl-approot.theorion--claim .theorion--claim,
                .bsl-approot.theorion--proof .theorion--proof {
                    visibility:visible;
                }    
                /*========================================================*/
                /* ||// modes                                             */
                /*========================================================*/

                `;
            return ret;
        };
    }
})();


