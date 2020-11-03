( function() {
    var {
        ns, sn,
        sconf,
        rg,
        ssF,
        sDomF, sDomN, amode,
        stdMod,

    } = window.b$l.apptree({
        ssFExportList :
        {
            declareWhirl,
            declareGeomtric,
        },
        sDomNExportList :
        {
            mediaLeftMargin : 0,   //fake initial value before resize ran
            mediaWidth : 1000,     //fake initial value before resize ran
        },
    });
    return;






    ///declares whirl for model and simulation/user scenario;
    ///               not for view for media and GUI;
    ///whirl is geometrical-shape-in-model: point, line, ...
    ///we don't want to call them "shape" because it collides with word "shape" in svg
    ///which is GUI-geometrical shape - visula representation thing;
    function declareWhirl({ pname, pos, wtype, })
    {
        var rgX = null;
        switch ( wtype )
        {
            default:
            case 'point':
                sn( 'pname2point', sconf );
                rgX = ssF.toreg( pname )
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
                sconf.pname2point[ pname ] = pos; //todm ... programming unwanted surprises
                //too much?: rgX.medpos = ssF.mod2inn( pt.pos );

            break;
            /*
            case 'line':
                rgX = ssF.toreg( pname );
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
        var rgX = null;
        switch ( wtype )
        {
            default:
            case 'point':
                var rgX = ns.haz( rg, pname );
                if( rgX ) {
                    //(todm: possibly astray) rgX does exist
                    var rgpos = ns.haz( rgX, 'pos' );
                    if( rgpos && pos) {
                        rgX.pos[0] = pos[0];
                        rgX.pos[1] = pos[1];
                    }
                }

                pos = rgpos || pos || [0,0];
                rgX = ssF.toreg( pname )
                    ( 'pname', pname )
                    ( 'pos', pos )
                    ();
                sn( 'pname2point', sconf );
                sconf.pname2point[ pname ] = pos; //todm ... programming unwanted surprises
                //too much?: 
                rgX.medpos = ssF.mod2inn( pos );
                rgX.caption = caption;

            break;
            /*
            case 'line':
                rgX = ssF.toreg( pname );
                    //( 'pname', pname )
                    //( 'pos', pos )
                    ();
                //sconf.pname2point[ pname ] = pos; //todm ... programming unwanted surprises
            break;
            */
        }
        return rgX;
    }




}) ();

