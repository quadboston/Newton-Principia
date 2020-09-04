( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    ssF.tr = tr;
    ssF.tp = tp;
    ssF.toreg = toreg;


    //test
    /*
    var myumbr = toreg('my')
        ('k1','v1')
        ('k2','v2')
        ({
            k3:'v3',
            k4:'v4',
        })
        ();
    console.log( 'myumbr=', JSON.stringify( myumbr, null, '    ' ) );
    var myprop = toreg('my')
        ('k1','v1')
        ('k2','v2')
        ({
            k3:'v3',
            k4:'v4',
        })
        ('k3');
    console.log( 'myumbr.my.k3=', myprop );
    var myfun = toreg('my')
        ('k1','v1')
        ({
            k3:'v3',
        });
    console.log( 'myfun=', myfun('k5','v5')() );
    */
    return;








    ///================================================
    /// //\\ does registry initiation or overriding job.
    ///================================================
    /// Purpose: to prevent unit's duplication.
    /// If no rg[id] exists, then creates empty rg[id].
    /// Then
    ///     If no key is supplied.
    ///         Returns rg[id].
    ///     If key is supplied:
    ///         Sets rg[ id ][ key ] = val
    ///         Returns val.
    function tr( id, key, val )
    {
        rg[ id ] = rg.hasOwnProperty( id ) ? rg[ id ] : {};
        if( key ) { rg[ id ][ key ] = val; }
        return key ? val : rg[ id ];
    }

    ///To position
    ///Sets rg[ id ][pos] = val
    ///If rg[ id ] does not exist, then creates it.
    function tp( id, val ) { return tr( id, 'pos', val ); }

    ///creates or updates registered umbrella-object rg[id] and its properties
    ///hopefully more useful: allows chained assignments
    /*
        var registry_object = toreg( 'myid' )
            ( mykey2,    myval2 )
            ( mykey3,    myval3 )
            ({
                mykey4 : myval4,
                mykey5 : myval5,
            })

            //alternatevely returns umbrella-object, rg[ id ]
            ();
            //alternatively returns a specific property
            (mykey4); //returns myval4
    */
    function toreg( id )
    {
        rg[ id ] = rg.hasOwnProperty( id ) ? rg[ id ] : {};
        function updateMe( key, val ) {
            switch( arguments.length ) {
                case 0: return rg[ id ];
                case 1:
                        if( typeof key === 'string' ) return rg[id][key]; //returns value
                        ////otherwise, keeps chain going
                        Object.assign( rg[id], key );
                        return updateMe;
                case 2:
                        rg[id][key] = val;
                        return updateMe;
                default:
            }
        };
        return updateMe;
    }
    ///================================================
    /// \\// does registry initiation or overriding job.
    ///================================================

}) ();

