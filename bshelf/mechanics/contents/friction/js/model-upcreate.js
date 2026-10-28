(function(){
const {
    sn, haz, $$, nsmethods, nspaste, nssvg, mcurve, integral,
    mat, has, fconf, sf, ssF, sData, sDomF, stdMod, amode,
    fldo, flcs, rg, toreg,
} = window.b$l.atree({ stdModList: {
    model_upcreate,
}});
return;


function model_upcreate(){
    // //\\ localizing data
    var rgShape = rg.borbit;
    var m = rg.m.val;
    var k = rg.k.val;
    var F = rg.F.val;
    var g = sf.g;
    var t = rg.t.val;
    var tmax = rg.t.gconf.max;
    var tmin = rg.t.gconf.min;
    // \\// localizing data

    // //\\ solving
    var W = m*g;
    var N = W;
    var Qmax = k*W;
    var Q = Math.min( F, Qmax );
    var R = F-Q;
    if( R < 0.000000001 ){
        R = 0.000000001;
        fldo.solvable_orbit = false;
    } else {
        fldo.solvable_orbit = true;
    }
    var a = R/m;
    var r = t2r( t );
    // \\// solving
    rgShape.gshape2svg=gshape2svg;
    flcs['flcs--solvable_orbit'] = fldo.solvable_orbit;
    return;

    function gshape2svg(){
        // //\\ diagram
        //      to media
        var pathmax = a * tmax * tmax / 2;
        rgShape.pathmax = pathmax;
        var vmax = a * tmax;
        rgShape.vmax = vmax;
        var med_r = pathmax > 0.5 ? r /= pathmax : 0;
        var cx = rg.c.pos[0] = rg.c.gconf.startpos + med_r;
        var cy = rg.c.pos[1];
        var Fmax = Math.max( rg.F.gconf.max, g*rg.m.gconf.max )
            * 4; //to fit the scene
        rg['Fv-start'].pos[0]= cx;
        rg['Qv-start'].pos[0]= cx;
        rg['Rv-start'].pos[0]= cx;
        rg['Fv'].pos[0]= cx+F/Fmax;
        rg['Qv'].pos[0]= cx-Q/Fmax;
        rg['Rv'].pos[0]= cx+R/Fmax;

        rg['Nv'].pos[1]= cy+N/Fmax;
        rg['Gv'].pos[1]= cy-W/Fmax;;
        rg['Nv'].pos[0]= cx;
        rg['Gv'].pos[0]= cx;;
        rg['Nv-start'].pos[0]= cx;
        rg['Gv-start'].pos[0]= cx;
        rg['Nv-start'].pos[1]= cy;
        rg['Gv-start'].pos[1]= cy;
        // //\\ path
        {
            const h = sf.BODY_SIZE[1] / 2;
            const x = rg.c.pos[0];
            const y = rg.c.pos[1] - h - h*0.2;
            const gleft = rg['borbit-start'];
            const gright = rg['borbit-end'];
            gleft.pos[0] = rg.c.gconf.startpos;
            gleft.pos[1] = y;
            gright.pos[0] = rg.c.pos[0];
            gright.pos[1] = y;
        }
        // \\// path
        // \\// diagram
        borbit2graphData();
        return;

        function borbit2graphData(){
            const TSTEPS = 100;
            const cur = rg.graph.graphFW_lemma.fw.content.pix2values;
            cur.length = 0;
            for( var tix=0; tix<TSTEPS; tix++ ){
                const t = (tmax-tmin)/TSTEPS*tix;
                const r = t2r(t);
                const v = t2v(t);
                cur.push({
                    x:tix,
                    y:[
                        r/pathmax,
                        v/vmax,
                    ]
                });
            }
        }
    }
    function t2r( t ){
        return a*t*t/2;
    }
    function t2v( t ){
        return a*t;
    }
}
})();