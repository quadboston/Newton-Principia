( function() {
    var {
        ssF,
    } = window.b$l.apptree({
        ssFExportList :
        {
            modFun2innFun,
            modFun2scaledXY,
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

    ///converts model-function to media-function
    ///returns "inner-media function" and 
    function modFun2scaledXY({
        fun,
        magnitudeX, //scales x
        magnitudeY, //scales y
    }) {
        //var fun = ssD.repoConf[0].fun;
        return function( x ) {
            var [xx,yy] = fun( x );
ccc( 'x must be naked x='+xx );
            var res = ssF.mod2inn([ xx*magnitudeX, yy*magnitudeY ]);
ccc( 'x must be P+naked x='+res[0] );
            return res;
        }
    }


}) ();

