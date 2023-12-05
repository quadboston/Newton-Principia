//registry is used for study-model-elements or media-model-elements
( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var ssTmp       = sn('ss', fapp);   //todm remove ss later
    var ssF         = sn('ssFunctions',ssTmp);

    ssF.toregUnbound    = toreg;
    ssF.makes_toreg4pos = makes_toreg4pos;

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
    /// //\\ creates or updates registry rg entry
    ///================================================
    ///constructed function
    ///     generates/reuses rg[ kname ],
    ///     assigns val to rg[ kname ].pos,
    ///     returns val
    function makes_toreg4pos( stdMod )
    { return (
                function( kname, val ) {
                    var rg = this;
                    rg[ kname ] = rg.hasOwnProperty( kname ) ?
                        rg[ kname ] :
                        {
                            rgId : kname,
                            stdModName : rg.stdModName,
                        }
                    ;
                    return ( rg[ kname ].pos = val );
                }
             ).bind( stdMod.rg );
    }


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
            ('mykey4'); //returns myval4
    */
    function toreg( id )
    {
        rg = this;
        rg[ id ] = rg.hasOwnProperty( id ) ?
            rg[ id ] : { rgId : id, stdModName : rg.stdModName };
        return updateMe;

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
    }
    ///================================================
    /// \\// creates or updates registry rg entry
    ///================================================


}) ();

