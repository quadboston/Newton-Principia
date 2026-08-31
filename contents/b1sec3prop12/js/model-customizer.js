( function() {
    var {nspaste, mat, rg}
        = window.b$l.apptree({ stdModExportList : { customizePoints, }, });
    return;


	function customizePoints(rg) {
		nspaste(rg.G.pos, mat.dropLine(-1, rg.C.pos, rg.P.pos));
		nspaste(rg.F.pos, mat.dropPerpendicular(rg.P.pos, rg.D.pos, rg.K.pos));
	}
}) ();
