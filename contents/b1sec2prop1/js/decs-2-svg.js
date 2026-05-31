( function() {
    var {
        ssF, sDomF, rg,
    } = window.b$l.apptree({
        stdModExportList :
        {
            SAvV_model__2__svg,
        },
        setModule,
    });
    var pivots_2_svgLineInRg;
    var rgPos2rgMedia;
    return;


    function setModule()
    {
        pivots_2_svgLineInRg = ssF.pivots_2_svgLineInRg;
        rgPos2rgMedia = ssF.rgPos2rgMedia;
    }

    function SAvV_model__2__svg()
    {
        //==========================================
        // //\\ S to media
        //      "Wrong code". Does not match this sub
        //      definition.
        //==========================================
        ['S'].forEach( pname => {
            ssF.rgPos2rgMedia(
                pname,
                {
                    cssClass: 'tofill tostroke',
                }
            );
        });
        //==========================================
        // \\// S to media
        //==========================================

        //-------------------------------------------------
        // //\\ updates medpos and svg el for point V to slide
        //      , needed only if we redesign force handles by
        //      making them in arbitrary time position and not
        //      in point B,
        //-------------------------------------------------
        rgPos2rgMedia(
            'V',
            {
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : sDomF.getFixedColor( 'forceColor' ),
                'stroke' : sDomF.getFixedColor( 'forceColor' ),
                //'stroke-width' : 3,
                r : 5,
            }
        );
        //-------------------------------------------------
        // \\// updates medpos and svg el for point V to slide
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ paints first radius
        //-------------------------------------------------
        pivots_2_svgLineInRg(
            'radiusToFirstPoint',
            [ rg.S, rg.A ], //pivots,
            {
                stroke:'black',
                'stroke-width':1,
                tpclass : 'bodyColor',
             }
        );
        //-------------------------------------------------
        // \\// paints first radius
        //-------------------------------------------------
    }
})();