( function() {
    var {
        sn, haz,
        sconf, ssF, sDomF, sDomN, rg, toreg,
        stdMod, amode,
    } = window.b$l.apptree({
        ssFExportList :
        {
            camelId_2_pos_in_rg_8_pname2point,
            declareGeomtric,
        },
    });
    return;






    ///declares whirl (do call it modShape?)
    ///for model and simulation/user scenario;
    ///               not for view for media and GUI;
    ///whirl is geometrical-shape-in-model: point, line, ...
    ///we don't want to call them "shape" because it collides with word "shape" in svg
    ///which is GUI-geometrical shape - visula representation thing;
    function camelId_2_pos_in_rg_8_pname2point({ pname, pos, wtype, }){
        //c cc( pname + ' camelId_2_pos_in_rg_8_pname2point scratches pointWrap' );
        var rgX = null;
        switch ( wtype )
        {
            default:
            case 'point':
                sn( 'pname2point', sconf );
                rgX = toreg( pname )
                    ( 'pname', pname )
                    ( 'pos', pos )
                    //( 'pcolor' : sDomF.tpname0arr_2_rgba( pname ) ),
                    
                  
                    
                    ///todm: work out to remove this
                    ///      proliferated coding: medpos, pos, ...  are two places:
                    ///      because of pWrap of itself is a proliferation of rg.pname rack
                    /*
                    (
                        'pointWrap',
                        {
                           pos : pos,
                           pcolor : sDomF.tpname0arr_2_rgba( pname ), //todm remove
                           doPaintPname : true, //todm remove
                        }
                    )
                    */
                    
                    
                    
                    ();
                    
                //todm ... programming unwanted surprises
                //todo conflicting format: lemma 5 has more props:
                sconf.pname2point[ pname ] = pos;

            break;
            //case 'line':
            //    rgX = toreg( pname );
                    //( 'pname', pname )
                    //( 'pos', pos )
            //sconf.pname2point[ pname ] = pos;
            //todm ... programming unwanted surprises
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

