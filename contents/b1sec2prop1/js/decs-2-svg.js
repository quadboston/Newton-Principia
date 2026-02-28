( function() {
    var {
        sn, $$, nssvg, eachprop, has, haz, haff, nspaste,
        sconf, ssF, ssD, sDomF, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            SAvV_model__2__svg,
        },
        setModule,
    });
    var pivots_2_svgLineInRg;
    var rgxpoint2updatedSvg;
    var handleR = 5;
    return;


    function setModule()
    {
        pivots_2_svgLineInRg = ssF.pivots_2_svgLineInRg;
        rgxpoint2updatedSvg = ssF.rgxpoint2updatedSvg;
    }

    ///ssF.rgxpoint2updatedSvg = pos2pointy; //modifies svg-dom
    function SAvV_model__2__svg()
    {
        //==========================================
        // //\\ S to media
        //      "Wrong code". Does not match this sub
        //      definition.
        //==========================================
        ['S'].forEach( shpid => {
            ssF.rgxpoint2updatedSvg(
                shpid,
                {
                    cssClass: 'tofill tostroke',
                }
            );
        });
        //==========================================
        // \\// S to media
        //==========================================

        //-------------------------------------------------
        // //\\ updates point A
        //      Will be overriddeyput this el-definition last to
        //      override all other graphics
        //
        //      but, white core will be put even over this point
        //-------------------------------------------------
        rgxpoint2updatedSvg(
            'A',
            {
                'fill' : 'white', //? fake prop, no effect
                'stroke' : sDomF.tpid0arrc_2_rgba( 'path' ),
                'stroke-width' : 1,  //static case, overrided by tp
                r : 6,
                cssClass : 'tofill tostroke',
            }
        );
        //-------------------------------------------------
        // \\// updates point A
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ creates point B to slide
        //      put this el-definition last to
        //      override all other graphics
        //-------------------------------------------------
        rgxpoint2updatedSvg(
            'v',
            {
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : 'white',
                'stroke' : sDomF.tpid0arrc_2_rgba( 'speed' ),
                'stroke-width' : 1,
                r : 6,
            }
        );
        //-------------------------------------------------
        // \\// creates point B to slide
        //-------------------------------------------------

        //-------------------------------------------------
        // //\\ updates medpos and svg el for point V to slide
        //      , needed only if we redesign force handles by
        //      making them in arbitrary time position and not
        //      in point B,
        //-------------------------------------------------
        rgxpoint2updatedSvg(
            'V',
            {
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : sDomF.tpid0arrc_2_rgba( 'forceMove' ),
                'stroke' : sDomF.tpid0arrc_2_rgba( 'forceMove' ),
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
                tpclass : 'path',
             }
        );
        //-------------------------------------------------
        // \\// paints first radius
        //-------------------------------------------------
    }
})();