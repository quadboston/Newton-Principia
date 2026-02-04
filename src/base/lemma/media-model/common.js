( function() {
    var {
        sn, haz,
        sconf, ssF, sDomF, rg, toreg,
    } = window.b$l.apptree({
        ssFExportList :
        {
            upcreate__pars2rgShape,
            declareGeomtric,
			putInFront,
			putInBack,
        },
    });
    return;


	function putInFront(...items) {
		for (const item of items) {
			const svg = item.svgel;
			const parent = svg.parentNode;
			svg.remove();
			parent.appendChild(svg);
		}
	}

	function putInBack(...items) {
		for (const item of items) {
			const svg = item.svgel;
			const parent = svg.parentNode;
			svg.remove();
			parent.insertBefore(svg, parent.firstChild);
		}
	}


    ///declares whirl for model and simulation/user scenario;
    ///               not for view for media and GUI;
    ///whirl is geometrical-shape-in-model: point, line, ...
    ///we don't want to call them "shape" because it collides with word "shape" in svg
    ///which is GUI-geometrical shape - visula representation thing;
    function upcreate__pars2rgShape({ pname, pos, wtype, })
    {
        var rgX = null;
        switch ( wtype )
        {
            default:
            case 'point':
                sn( 'pname2point', sconf );
                rgX = toreg( pname )
                    ( 'pname', pname )
                    ( 'pos', pos )
                    //( 'pcolor' : sDomF.getFixedColor( pname ) ),
                    ///todm: work out to remove this
                    ///      proliferated coding: medpos, pos, ...  are two places:
                    ///      because of pWrap of itself is a proliferation of rg.pname rack
                    (
                        'pointWrap',
                        {
                           pos : pos,
                           pcolor : sDomF.getFixedColor( pname ), //todm remove
                           doPaintPname : true, //todm remove
                        }
                    )
                    ();
                //todm ... programming unwanted surprises
                sconf.pname2point[ pname ] = pos;
                //too much?: rgX.medpos = ssF.mod2inn( pt.pos );

            break;
            /*
            case 'line':
                rgX = toreg( pname );
                    //( 'pname', pname )
                    //( 'pos', pos )
                    ();
                //sconf.pname2point[ pname ] = pos; //todm ... programming unwanted surprises
            break;
            */
        }
        return rgX;
    }


    ///declares geometric for model and simulation/user scenario;
    ///               not for view for media and GUI;
    ///geometric is geometrical-shape-in-model: point, line, ...
    ///we don't want to call them "shape" because it collides with word "shape" in svg
    ///which is GUI-geometrical shape - visula representation thing;
    function declareGeomtric({
        pname,
        wtype,          //optional, default is a point
        pos,            //optional
        caption,        //optional
    }){
        var rgX   = null;
        switch ( wtype )
        {
            default:
            case 'point':
                var rgX = haz( rg, pname );
                if( rgX ) {
                    ////rgX does already exist
                    var rgpos = haz( rgX, 'pos' );
                    if( rgpos && pos) {
                        rgX.pos[0] = pos[0];
                        rgX.pos[1] = pos[1];
                    }
                }

                //.................................
                //preserves pos reference if exists
                pos = rgpos || pos || [0,0];
                //.................................
                rgX = toreg( pname )
                    ( 'pname', pname )
                    ( 'pos', pos )
                    ();
                sn( 'pname2point', sconf );
                //preserves pos reference if exists
                sconf.pname2point[ pname ] = pos;
                rgX.medpos = ssF.mod2inn( pos, );
                rgX.caption = caption;

            break;
            /*
            case 'line':
                rgX = toreg( pname )
                      ( 'pname', pname )
                ...
            */
        }
        return rgX;
    }




}) ();

