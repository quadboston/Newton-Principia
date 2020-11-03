( function() {
    var {
        ssF,
    } = window.b$l.apptree({
        ssFExportList :
        {
            modFun2innFun,
        },
    });
    return;








    ///converts model-function to media-function
    ///returns "inner-media function" and 
    function modFun2innFun(
        fun,
        magnitude, //scales graph [x,f(x)]
    ) {
        magnitude = magnitude || 1;
        //var fun = ssD.repoConf[0].fun;
        return function( x ) {
            var [xx,yy] = fun( x );
            var res = ssF.mod2inn([ xx*magnitude, yy*magnitude ]);
            return res;
        }
    }


}) ();

