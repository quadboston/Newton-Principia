( function() {
    var {
        sn, $$, nssvg, eachprop, has, haz, haff, nspaste,
        sconf, ssF, ssD, sDomF, toreg, rg,
        amode, stdMod,
    } = window.b$l.apptree({
        stdModExportList :
        {
            paints_draggableDecPoints8Line,
            dec2svg,
            dragPointPos_2_mediaOfDragKernels,
            fakePoints_2_svgPosition,
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

    function dec2svg()
    {
        eachprop( stdMod.decor, (dec,pname) => {
            if( dec.isPoint ) {
                paintDec_point( dec, pname );
            } else {
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
            ////all these points are not drawn here, because of
            ////they have special place in code where they are drawn as
            ////their representaion with white hole,
            ////this special place is dragPointPos_2_mediaOfDragKernels(),
            pname !== 'v' && pname !== 'V' && pname !== 'A' &&
            pname !== 'v-white-filler' && pname !== 'V-white-filler' &&
            pname !== 'A-white-filler'
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
            ///refreshes line position and presence
            ///for special lines
            //if( dec.pname === 'Av' ) {
                ssF.pnames2line(
                    dec.pivotNames[0],
                    dec.pivotNames[1],
                    haz( dec, 'cssClass' ), //works: 'hidden'
                );
            //}
            ///ssF.pnames2poly
        } else {
            dec.poly_2_updatedPolyPos8undisplay();
        }
    }
    //==============================================
    // \\// updates decors with 'pivotNames':
    //==============================================

    ///ssF.rgPos2rgMedia = pos2pointy; //modifies svg-dom
    function paints_draggableDecPoints8Line()
    {
        //==========================================
        // //\\ S to media
        //==========================================
        //['S','B','C','D','E','F','V','Z'].forEach( pname => {
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
        //      put this el-definition last to
        //      override all other graphics
        //-------------------------------------------------
        rgPos2rgMedia(
            'A',
            {
                'fill' : 'white',
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
                'stroke' : 'blue',
                'stroke-width' : 1,
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
                //'stroke-width' : 3,
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

    //=========================================
    // //\\ V,v,A one-time and dynamic calls
    //=========================================
    //dynamic call for speeding up
    function fakePoints_2_svgPosition()
    {
        //------------------------------------------------------
        // //\\ non-standard patch,
        //      white kernels over drag points 'V', 'v', 'A',
        //------------------------------------------------------
        [ 'V', 'v', 'A' ].forEach( pname => {
            var ps = rg[ pname ].pos;
            var pt = rg[ pname + '-white-filler' ];
            pt.pos = [ ps[0], ps[1] ];
            //if points are flagged as 'unscalable', then
            //they are immune to scaling when user scales diagram with mouse
            pt.medpos = haz( pt, 'unscalable' ) ?
                ssF.mod2inn_original( pt.pos, stdMod ) :
                ssF.mod2inn( pt.pos, stdMod );
            pt.svgel.setAttributeNS( null, 'cx', pt.medpos[0] );
            pt.svgel.setAttributeNS( null, 'cy', pt.medpos[1] );
        });
    }
    
    
    ///one-time call
    ///move to media launch except pos setting
    function dragPointPos_2_mediaOfDragKernels()
    {
        //------------------------------------------------------
        // //\\ non-standard patch,
        //      white kernels over drag points 'V', 'v', 'A',
        //------------------------------------------------------
        [ 'V', 'v', 'A' ].forEach( pname => {
            var fakeName    = pname + '-white-filler';
            var ps         = rg[ pname ].pos;
            toreg( fakeName )
                ( 'pos', [ ps[0], ps[1] ]  )
                ;
                
            if( pname === 'V' ) {
                rgPos2rgMedia(
                    fakeName,
                    {
                        'stroke'        : sDomF.getFixedColor( 'force' ),
                        'fill'          : 'white',
                        //4, value 4 is removed to align with
                        //tpstroke width = 1 for other points
                        //which do not have "fakeName" twin filler,
                        'stroke-width'  : 1,
                        r               : handleR+2,
                    }
                );
                rg[ fakeName ].svgel$.addClass( 'tp-force' );
            } else {
                rgPos2rgMedia(
                    fakeName,
                    {
                        'fill'          : 'white',
                        //'stroke-width'  : 10, //no effect
                        r               : handleR,
                    }
                );
            }
        });
        //------------------------------------------------------
        // \\// non-standard patch,
        //------------------------------------------------------
    }
    //=========================================
    // \\// V,v,A launch and dynamic calls
    //=========================================



}) ();

