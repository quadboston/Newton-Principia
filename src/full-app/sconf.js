// //\\// file where to set plugin main configuration
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);




    //====================================================
    // //\\ optionally overriden by url-query-config
    //====================================================
    to_sconf =
    {

        defaultMobileTabSelection : 'claim-og',
        //defaultMobileTabSelection : 'proof-og',

        mediaOffset : [ 0, 0 ],                 //in respect to media-root
        mediaDefaultWidthPercent : 40,          //in respect to total width
        MINIMAL_MEDIA_CONTAINER_WIDTH : 350,    //todm approximate
        main_horizontal_dividor_width_px : 21,

        //:submenus
        submenus :
        {
            proof: {
                list:
                [
                    { id:'claim' },
                    { id:'proof' }
                ],
                'default' : 'claim'
            },

            text: {
                appMDSource: 'texts',
                list:
                [
                    { id:'latin',   caption:'Latin' },
                    { id:'english', caption:'English' },
                    { id:'hypertext', caption:'Lite' }
                ],
                'default' : 'hypertext'
            }
            /* worked
            ,decorations: {
                list:
                [
                    { id:'origin'},
                    { id:'modern'},
                    { id:'both' }
                ],
                'default' : 'both'
            }
            */
        }
    };
    //====================================================
    // \\// optionally overriden by url-query-config
    //====================================================

    //adds to_sconf to commong sconf
    Object.keys( to_sconf ).forEach( function( key ) {
        sconf[ key ] = to_sconf[ key ];
    });

}) ();
