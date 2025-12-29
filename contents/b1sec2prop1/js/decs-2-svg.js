( function() {
    var {
        sn, $$, nssvg, eachprop, has, haz, haff, nspaste,
        sconf, ssF, ssD, sDomF, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            paints_draggableDecPoints8Line,
            //dec2svg,
            hollowHandles_2_rgPlaces8media,
            hollowHandles_2_dynamicMedpos,
            hollowForceHandlers_2_rgPlaces8media,
            hollowForceHandlers_2_dynamicMedpos
        },
        setModule,
    });
    var pivots_2_svgLineInRg;
    var rgPos2rgMedia;
    var handleR = 5;
    return;


    function setModule()
    {
        pivots_2_svgLineInRg = ssF.pivots_2_svgLineInRg;
        rgPos2rgMedia = ssF.rgPos2rgMedia;
    }

    function rid_paintDec_point( rgPoint, pname )
    {
        /*
        ////doing points
        var pWrap           = rgPoint.pointWrap;
        var pcolor          = sDomF.getFixedColor( pWrap.ptype );
        //rgPoint.pcolor    = pcolor;   //todm: way to go ...
        pWrap.pcolor        = pcolor;   //todm: overengineering ...

        if(

            (
            ////all these points are not drawn here, because of
            ////they have special place in code where they are drawn as
            ////their representaion with white hole,
            ////this special place is hollowHandles_2_rgPlaces8media(),
            pname !== 'v' && pname !== 'V' && pname !== 'A' &&
            pname !== 'v-white-filler' && pname !== 'V-white-filler' &&
            pname !== 'A-white-filler' && !pname.match( /VVV\d-white-filler/
                                                 )

            && pname !== 'C' //todo debug


            )
        ) {
            var cls = 'tostroke tofill thickable';
            cssClass = haz( rgPoint, 'cssClass' );
            cls += cssClass && ( ' ' + cssClass );

            //unlucky name: must be aka ssF.rgPos2svgPoint
            //ssF.rgPos2rgMedia = pos2pointy; //modifies svg-dom, more sensible alias
            var pty = rgPos2rgMedia(
                pname,
                {
                    cssClass        : cls,
                    'stroke-width'  : 2,
                    r               : handleR,
                }
            );
            pWrap.medpos = rgPoint.medpos;
        }

        ///this compensates non-using of engine-template-function
        ///for font position,
        ///doPaintLetter8kernel( pname )
        if(
            //todm can we? rgPoint.doPaintPname
            haz( rgPoint, 'doPaintPname' )
        ) {
            var lpos = rgPoint.medpos.concat([]);
            ///letter quadrant sugar
            switch( pname ) {
                case 'B' : lpos = [ lpos[0]+10, lpos[1]+22 ];
                break;
                case 'A' : lpos = [ lpos[0]+10, lpos[1]+20 ];
                break;
                case 'S' :
                case 'Z' : lpos = [ lpos[0]-30, lpos[1]+20 ];
                break;
                case 'V' : lpos = [ lpos[0]-30, lpos[1]-6 ];
                break;
                default: lpos = [ lpos[0]+8, lpos[1]-10 ];
            }
            pWrap.pnameLabelsvg = rgPoint.pnameLabelsvg = nssvg.printText({
                tpclass : '',
                'class' : haz( rgPoint, 'cssClass' ) || '',
                text    : haz( rgPoint, 'caption' ) || pname,
                stroke : sDomF.getFixedColor( pname ),
                fill : sDomF.getFixedColor( pname ),
                "stroke-width" : 1,
                svgel : pWrap.pnameLabelsvg,
                parent : stdMod.mmedia,
                x : lpos[0],
                y : lpos[1],
                style : { 'font-size' : '22px' },
            });

            rgPoint.pnameLabelsvg$ = $$.$( rgPoint.pnameLabelsvg )
                .addClass( 'undisplay' );
        }
        //==============================================
        // \\// decors rgPoint to rgPos2rgMedia and
        //==============================================
        */
    }

    //==============================================
    // //\\ updates decors with 'pivotNames':
    //      aka for created with
    //      ssF.t woLetters_2_svgLine8rg and ssF.namesArr_2_svgpoly
    //==============================================

    //==============================================
    // \\// updates decors with 'pivotNames':
    //==============================================

    ///ssF.rgPos2rgMedia = pos2pointy; //modifies svg-dom
    function paints_draggableDecPoints8Line()
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
        // //\\ updates point A
        //      Will be overriddeyput this el-definition last to
        //      override all other graphics
        //
        //      but, white core will be put even over this point
        //-------------------------------------------------
        rgPos2rgMedia(
            'A',
            {
                'fill' : 'white', //? fake prop, no effect
                'stroke' : sDomF.getFixedColor( 'path' ),
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
        rgPos2rgMedia(
            'v',
            {
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : 'white',
                'stroke' : sDomF.getFixedColor( 'speed' ),
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
        rgPos2rgMedia(
            'V',
            {
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : sDomF.getFixedColor( 'forceMove' ),
                'stroke' : sDomF.getFixedColor( 'forceMove' ),
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

    //=========================================
    // //\\ V,v,A one-time and dynamic calls
    //=========================================
    //dynamic call for speeding up
    function hollowHandles_2_dynamicMedpos()
    {
        ccc( 'what' );
        //------------------------------------------------------
        // //\\ non-standard patch,
        //      white kernels over drag points 'V', 'v', 'A',
        //------------------------------------------------------
        [ 'v', 'A' ].forEach( pname => {
            var ps = rg[ pname ].pos;
            var pt = rg[ pname + '-white-filler' ];
            pt.pos = [ ps[0], ps[1] ];
            //if points are flagged as 'unscalable', then
            //they are immune to scaling when user scales diagram with mouse
            pt.medpos = haz( pt, 'unscalable' ) ?
                ssF.mod2inn_original( pt.pos, ) :
                ssF.mod2inn( pt.pos, );
            pt.svgel.setAttributeNS( null, 'cx', pt.medpos[0] );
            pt.svgel.setAttributeNS( null, 'cy', pt.medpos[1] );
        });
    }

    ///one-time call
    ///move to media launch except pos setting
    function hollowHandles_2_rgPlaces8media()
    {
        ccc( '*********hollowHandles_2_rgPlaces8media what' );
        //------------------------------------------------------
        // //\\ non-standard patch,
        //      white kernels over drag points 'V', 'v', 'A',
        //------------------------------------------------------
        [ 'v', 'A' ].forEach( pname => {
            var fakeName    = pname + '-white-filler';
            var ps         = rg[ pname ].pos;
            toreg( fakeName )
                ( 'pos', [ ps[0], ps[1] ]  )
                ;
            rgPos2rgMedia(
                fakeName,
                {
                    'fill'          : 'white',
                    //'stroke-width'  : 10, //no effect
                    r               : handleR,
                }
            );
        });
        //------------------------------------------------------
        // \\// non-standard patch,
        //------------------------------------------------------
    }

    function hollowForceHandlers_2_dynamicMedpos()
    {
        ['B','C','D','E','F'].forEach( (pname, ix) => {
            let nam1     = 'VVV'+ix;
            var ps       = rg[ nam1 ].pos;
            var fakeName = nam1 + '-white-filler';
            var pt = rg[ fakeName ];
            pt.pos = [ ps[0], ps[1] ];
            //if points are flagged as 'unscalable', then
            //they are immune to scaling when user scales diagram with mouse
            pt.medpos = haz( pt, 'unscalable' ) ?
                ssF.mod2inn_original( pt.pos, ) :
                ssF.mod2inn( pt.pos, );
            pt.svgel.setAttributeNS( null, 'cx', pt.medpos[0] );
            pt.svgel.setAttributeNS( null, 'cy', pt.medpos[1] );
        });
    }

    ///one-time call
    ///move to media launch except pos setting
    function hollowForceHandlers_2_rgPlaces8media()
    {
        //------------------------------------------------------
        // //\\ non-standard patch,
        //      white kernels over drag points 'VVVN
        //------------------------------------------------------
        ['B','C','D','E','F'].forEach( (pname, ix) => {
            let nam1='VVV'+ix;
            var fakeName   =  nam1  + '-white-filler';
            var ps         = rg[ nam1 ].pos;
            rg[ fakeName ].pos = [ ps[0], ps[1] ];
            rgPos2rgMedia(
                fakeName,
                {
                    'fill'          : 'white',
                    'stroke'        : sDomF.getFixedColor( 'force' ),
                                      //wrong, todm, killed tp-classes
                    'stroke-width'  : 1,
                    r               : handleR+1,
                }
            );
            //rg[ fakeName ].svgel$.addClass( 'tp-force' );
        });
        //------------------------------------------------------
        // \\// non-standard patch,
        //------------------------------------------------------
    }
    //=========================================
    // \\// V,v,A launch and dynamic calls
    //=========================================
})();