(function(){
const {
        ns, sn, ow, has, $$, eachprop,
        fconf, sData, amode, stdMod, sconf, rg, toreg,
    } = window.b$l.atree({ stdModList: {
        media_upcreate___part_of_medupcr_basic,
}});
var op = sn( 'orbitParameters', sconf );
return;


function makesArc({
    radius,
    angleMax,
    angleMin,   //optional, 0 by default
    circleName
}){
    let rgX = toreg( circleName )();
    let len = 200;
    angleMin = ow( arguments[0], 'angleMin' ) ? angleMin : 0;
    let angleStep = (angleMax-angleMin) / len;
    rgX.pivots = has( rgX, 'pivots' ) ? rgX.pivots : [];
    for( var ix=0; ix<len; ix++ ) {
        var angle = angleMin + angleStep * ix;
        rgX.pivots[ix] =[
            //effective "x"-axis to the screen left
            -radius * Math.sin( angle ),
            radius * Math.cos( angle )
        ];
    };
}

function media_upcreate___part_of_medupcr_basic (){
    eachprop( sData.quadSolved.kernel, (prop,rgid) => {
        let rgX = toreg( rgid )();
        rgX.pivots = prop;
        stdMod.buildsQuadPlot( rgX );
    });
    eachprop( sData.quadSolved, (prop,rgid) => {
        if( rgid !== 'borbit' ) return;
        let rgX = toreg( rgid )();
        rgX.pivots = prop;
        stdMod.buildsQuadPlot( rgX );
    });
    //circles
    {
        let cName = 'MainCircle';
        makesArc({ radius:rg.V.pos[1], angleMax:Math.PI, circleName:cName });
        stdMod.buildsQuadPlot( rg[ cName ] );

        cName = 'DCircle';
        makesArc({ radius:rg.D.pos[1], angleMax:rg.X.FiD, circleName:cName });
        stdMod.buildsQuadPlot( rg[ cName ] );

        cName = 'ECircle';
        makesArc({ radius:rg.E.pos[1], angleMax:rg.X.FiD,
                   circleName:cName });
        stdMod.buildsQuadPlot( rg[ cName ] );

        cName = 'NK';
        makesArc({ radius:rg.E.pos[1], angleMax:rg.X.FiD,
                   angleMin:rg.Y.FiE, circleName:cName });
        stdMod.buildsQuadPlot( rg[ cName ] );

        cName = 'YX';
        makesArc({ radius:rg.V.pos[1], angleMax:rg.X.FiD,
                   angleMin:rg.Y.FiE, circleName:cName });
        stdMod.buildsQuadPlot( rg[ cName ] );
    }
}
})();