( function() {
    var {
        ns, sn, $$, mat,
        ssF, ssD, sDomF,
        stdMod, amode, sconf, rg, toreg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            paintsAllCurves_forBackscene,
        },
    });
    return;






    ///done for speed up performance when strategy
    ///of non-updating scene for drag&drop is implemented,
    ///however, zoom apperently needs update of entire scene,
    function paintsAllCurves_forBackscene()
    {
        [
            'curveIF',
            'curveCIF',

            'curveIFC',
            'curveIFCleft',

            'curveCircle',
            'curvatureCircle',
            'curveLeftCircle',
            'curveRightCircle',
            'curveParabola',
        ].forEach( curveKeyName => {
            var funArgs = {};
            rg[ curveKeyName ].svgel$.css( 'display', 'block' );
            stdMod.doesPaintCurve( curveKeyName, funArgs );
        });
    }

}) ();

