( function() {
    var {
        sn, $$, nssvg, eachprop, has, haz, haff, nspaste,
        sconf, ssF, ssD, sDomF, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            paints_draggableDecPoints8Line,
            dec2media,
            dragPointPos_2_mediaOfDragKernels,
        },
        setModule,
    });
    var pointies2line;
    var rgPos2rgMedia;
    var handleR = 5;
    return;








    function setModule()
    {
        pointies2line           = ssF.pointies2line;
        rgPos2rgMedia           = ssF.rgPos2rgMedia;
    }

    function dec2media()
    {
        eachprop( stdMod.decor, (dec,pname) => {
            if( dec.isPoint ) {
                paintDec_point( dec, pname );
            } else {
                //if( pname === 'CV' && ( rg.time < 2.5 || ( rg.time < 2.8 rg.step < 2 ) ) return;
                if( pname === 'CV' ) {
                    dec.undisplay = rg.stretchedFourTimes_stIx < 10;
                    ccc( 'set ' + pname + ' ' + dec.undisplay, dec, );
                }
                paintDec_nonPoints( dec );
            }
        });
    }





    function paintDec_point( rgPoint, pname )
    {
        ////doing points
        var pWrap           = rgPoint.pointWrap;
        var pcolor          = sDomF.getFixedColor( pWrap.ptype );
        //rgPoint.pcolor    = pcolor;   //todm: way to go ...
        pWrap.pcolor        = pcolor;   //todm: overengineering ...

        if(
            pname !== 'B' && pname !== 'V' && pname !== 'A' &&
            pname !== 'B-white-filler' && pname !== 'V-white-filler' &&
            pname !== 'A-white-filler'
        ) {
            var cls = 'tostroke tofill thickable';
            cssClass = haz( rgPoint, 'cssClass' );
            cls += cssClass && ( ' ' + cssClass );
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
        ///doPaintLetter8kernel( pname )
        if(
            //todm can we? rgPoint.doPaintPname
            haz( rgPoint, 'doPaintPname' )
        ) {
            var lpos = rgPoint.medpos.concat([]);
            ///letter quadrant sugar
            switch( pname ) {
                case 'S' :
                case 'Z' : lpos = [ lpos[0]-30, lpos[1]+20 ];
                break;
                case 'V' : lpos = [ lpos[0]-18, lpos[1]-15 ];
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
    }



    //==============================================
    // //\\ updates decors with 'pivotNames':
    //      aka for created with
    //      ssF.pnames2line and ssF.pnames2poly
    //==============================================
    function paintDec_nonPoints( dec )
    {
        /// ssF.pnames2line
        if( dec.pivotNames.length === 2 ) {
            if( dec.pname === 'CV' )
                ccc('again' + dec.undisplay);
            ////refreshes line position and presence
            ssF.pnames2line(
                dec.pivotNames[0],
                dec.pivotNames[1],
                haz( dec, 'cssClass' ),
            );
        ///ssF.pnames2poly
        } else {
            dec.poly_2_updatedPolyPos8undisplay();
        }
    }
    //==============================================
    // \\// updates decors with 'pivotNames':
    //==============================================


    function paints_draggableDecPoints8Line()
    {
        //==========================================
        // //\\ S to media
        //==========================================
        ssF.rgPos2rgMedia(
            'S',
              { 
                cssClass: 'tofill tostroke',
              }
        );
        //==========================================
        // \\// S to media
        //==========================================




        //-------------------------------------------------
        // //\\ updates point A
        //      put this el-definition last to
        //      override all other graphics
        //-------------------------------------------------
        rgPos2rgMedia(
            'A',
            {
                'fill' : 'white',
                'stroke' : sDomF.getFixedColor( 'path' ),
                'stroke-width' : 3,
                r : 6,
                cssClass : 'ppp-a',
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
            'B',
            { 
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : 'white',
                'stroke' : 'blue',
                'stroke-width' : 3,
                r : 6,
            }
        );
        //-------------------------------------------------
        // \\// creates point B to slide
        //-------------------------------------------------




        //-------------------------------------------------
        // //\\ updates medpos and svg el for point V to slide
        //      put this el-definition last to
        //      override all other graphics
        //-------------------------------------------------
        rgPos2rgMedia(
            'V',
            { 
                //this possibly collides with white filling
                //cssClass : 'tostroke',

                //this possibly collides with white filling
                //tpclass : 'path',

                'fill' : 'white',
                'stroke' : sDomF.getFixedColor( 'field' ),
                'stroke-width' : 3,
                r : 6,
            }
        );
        //-------------------------------------------------
        // \\// updates medpos and svg el for point V to slide
        //-------------------------------------------------


        //-------------------------------------------------
        // //\\ paints first radius
        //-------------------------------------------------
        pointies2line(
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



    function dragPointPos_2_mediaOfDragKernels()
    {
        //------------------------------------------------------
        // //\\ non-standard patch,
        //      white kernels over drag points 'V', 'B', 'A',
        //      by master-point "undisplay" flag,
        //      white kernels dec virt-vis and material media,
        //------------------------------------------------------
        [ 'V', 'B', 'A' ].forEach( pname => {
            var fakeName    = pname + '-white-filler';
            var wwp         = rg[ pname ].pos;
            toreg( fakeName )
                ( 'pos', [ wwp[0], wwp[1] ]  )
                ( 'undisplay', true  )
                ;
            rgPos2rgMedia(
                fakeName,
                {
                    'stroke'        : '', //originalPoint.pointWrap.pcolor,
                    'fill'          : 'white',
                    'stroke-width'  : 2,
                    r               : handleR,
                }
            );
        });
        //------------------------------------------------------
        // \\// non-standard patch,
        //------------------------------------------------------
    }



}) ();

