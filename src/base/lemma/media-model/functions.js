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
    ///returns not a primitive value but
    ///"function: model-var-x |-> media-inner-point [x,y]"
    function modFun2innFun(
        fun,        //model function: returns either value y(x) or point [x,y(x)]
        magnitude,  //scales graph [x,f(x)]
    ) {
        magnitude = magnitude || 1;
        //var fun = aka ssD.repoConf[0].fun; or simple 
        //          one argument returning function,
        return function( x ) {
            var point = fun( x );
            if( typeof point === 'object' ) {
                var [xx,yy] = point;
            } else {
                var xx = x;
                var yy = point;
            }
            var res = ssF.mod2inn([ xx*magnitude, yy*magnitude ]);
            return res;
        }
    }


    ///todm ... is it ever used?
    ///converts model-function to media-function
    ///returns "inner-media function" and 
    function modFun2scaledXY({
        fun,        //must return array [x,y]
        magnitudeX, //scales x
        magnitudeY, //scales y
    }) {
        //var fun = ssD.repoConf[0].fun;
        return function( x ) {
            var [xx,yy] = fun( x );
            var res = ssF.mod2inn([ xx*magnitudeX, yy*magnitudeY ]);
            return res;
        }
    }


}) ();

