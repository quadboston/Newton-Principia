( function() {
    var {nspaste, mat, rg}
        = window.b$l.apptree({ stdModExportList : { customizePoints, }, });
    return;


	function customizePoints(rg, op, uu) {
		nspaste( rg.G.pos, mat.dropLine(
			null, rg.P.pos, rg.C.pos, null, null, 0.4 * op.latus ) );
		nspaste( rg.M.pos, mat.linesCross(
				uu,
				rg.P.pos,
				[ 1, 0 ],
				rg.O.pos,
			)
		);
		nspaste( rg.N.pos, mat.dropPerpendicular( rg.O.pos, rg.M.pos, rg.P.pos ) );
	}
}) ();
