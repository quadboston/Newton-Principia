//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.css.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');
    
    //these two lines merge vendor's module to
    //src/base/app-tree.js context:
    var fapp   = ns.sn('fapp' ); 
    var fconf  = ns.sn('fconf',fapp);
    
    var CURSOR = 'grab';
    //var CURSOR = 'crosshair';
    var CURSOR_GRABBING = 'grabbing';
    //---------------------------------------
    // //\\ configures dimensions
    //---------------------------------------
    var dm = {};
    //it can be 30, but made 35
    //to make a bit bigger than
    //dynamic handle seach in model which has
    //15 as a distance of the search:
    //in this case animation starts a bit earlier
    //than change to mouse search cursor:
    dm.WIDTH                =  ( fconf.DRAG_HANDLE_HALFHOTSPOT || 15 ) * 2 +
                                5; //to overlap dragger-search-hot-spot,
    dm.HEIGHT               = dm.WIDTH;
    
    //dm.HOT_ZONE_ANIM_WIDTH  = dm.WIDTH;
    //dm.HOT_ZONE_ANIM_HEIGHT = dm.HEIGHT;
    
    dm.DISK_RADIUS          = dm.WIDTH*0.1;
    dm.DISK_LEFT            = dm.WIDTH*0.5;
    dm.DISK_TOP             = dm.HEIGHT*0.5;
    dm.DISK_BORDER_RADIUS   = dm.WIDTH*0.5;
    dm.ARROWS_TOP           = dm.HEIGHT*0.3;
    dm.ARROWS_LEFT          = dm.WIDTH*0.666;
    dm.LEFT_DRAGGEE_LEFT    = dm.ARROWS_LEFT-dm.WIDTH;
    dm.RIGHT_DRAGGEE_LEFT   = dm.ARROWS_LEFT;
    dm.ARROW_LENGTH         = dm.WIDTH/3;
    dm.ARROW_HEIGHT         = dm.WIDTH/6;
    var ds = {};
    Object.keys( dm ).forEach( key => {
        ds[ key ] = dm[ key ].toFixed(2) + 'px';
    });
    //---------------------------------------
    // \\// configures dimensions
    //---------------------------------------

    var globalCssCreated_flag   = false;
    dpdec.creates_spinnerOwnCss = creates_spinnerOwnCss;
    dpdec.createGlobal          = createGlobal;
    return;


    ///creates spinner own global CSS
    ///appar. overrides spinner's-default CSS by means of
    ///parent_classes
    function creates_spinnerOwnCss(
        decorCount_debug,
        //appar. can be point's rgId decapitalized
        spinnerClsId,   //"upward-css-callback"

        //appar. can be point's topic-color
        individual_color,

        //appar. can be essayId
        parent_classes,  //"downward-css-callback", optional

        //optional
        individual_zindex,
        spinnerCursorGrab,
        spinnerCursorGrabbed,
        makeCentralDiskInvisible,
    ) {
        //sets up each draggable object, but does not set position here
        //console.log('spinner: ' + spinnerClsId);

        //fixing missed parameters
        individual_color = individual_color || 'grey';
        parent_classes = parent_classes || [''];

        CURSOR = spinnerCursorGrab || CURSOR;
        CURSOR_GRABBING = spinnerCursorGrabbed || CURSOR_GRABBING;
        var ret = '';
        // //\\ css /////////////////////////////////////////
        parent_classes.forEach( function( dclass ) {
            //c cc( spinnerClsId, dclass, CURSOR, CURSOR_GRABBING );
            centralDiskVisibility  = makeCentralDiskInvisible ? 'hidden' : 'visible';
            ////if dclass exists, apparently it constrains css to ownself,
            ////possibly useless and easy to forget when scripting lemma,
            ////example: dclacc = .aspect--english
            dclass = dclass ? '.' + dclass : '';

            var zIndex = individual_zindex ?
                'z-index : ' + individual_zindex + ';\n' :
                ''
                ;
            ret += `
            ${dclass} .${spinnerClsId}.brc-slider-draggee {
                ${zIndex}
            }
            .${spinnerClsId}.brc-slider-draggee,
            .${spinnerClsId}.brc-slider-draggee:hover:after {
                cursor: ${CURSOR};
            }
            .${spinnerClsId}.brc-slider-draggee.grabbing:hover:after,
            .${spinnerClsId}.brc-slider-draggee.grabbing {
                cursor: ${CURSOR_GRABBING};
            }
            
            /*=============================*/
            /* //\\ parent after           */
            /*=============================*/
            ${dclass} .${spinnerClsId}.brc-slider-draggee:hover:after {
                background-color: ${individual_color};
                visibility      : ${centralDiskVisibility};
            }
            /*=============================*/
            /* \\// parent after           */
            /*=============================*/

            /*=============================*/
            /* //\\ animates slider arrows */
            /*=============================*/
            ${dclass} .${spinnerClsId} .brc-slider-draggee-right {
                border-left : ${ds.ARROW_LENGTH} solid ${individual_color};
            }
            ${dclass} .${spinnerClsId} .brc-slider-draggee-left {
                border-right : ${ds.ARROW_LENGTH} solid ${individual_color};
            }
            /*=============================*/
            /* \\// animates slider arrows */
            /*=============================*/
            `
            //ccc( dclass + ' .' + spinnerClsId + ' o v e r r i d e s  ' +
            //     ' .brc-slider-draggee-right '
            //);
        });
        // \\// css /////////////////////////////////////////
        
        //good debug
        //if( 'point-_p-slider' === spinnerClsId ) {
        //    c cc( spinnerClsId+ '=', ret);
        //}

        ns.globalCss.update( ret, spinnerClsId );
    }


    function createGlobal()
    {
        if( globalCssCreated_flag ) return;
        //c cc( 'global cursors=' + CURSOR + ', ' + CURSOR_GRABBING );
        var ret =

        // //\\ css /////////////////////////////////////////
        `

        /*=============================*/
        /* //\\ parent handler         */
        /*=============================*/
        .brc-slider-draggee {
            position    : absolute;
            top         : 0%;

            width       : ${ds.WIDTH};
            height      : ${ds.HEIGHT};
            /* todm HOT_ZONE_ANIM_WIDTH HOT_ZONE_ANIM_HEIGHT */
            
            z-index     : 1000;
            cursor: ${CURSOR};
            /* .good for devel.
            border      : 1px solid red;
            */
            transform   : translate(-50%, -50%);
        }

        .brc-slider-draggee.rotate {
            animation: 2s linear 0s infinite normal do-rotate;
        }
        .brc-slider-draggee.axis-y {
            transform: translate(-50%, -50%) rotate(90deg);
        }

        @keyframes do-rotate {
            0% {
	            transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
	            transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        /*=============================*/
        /* \\// parent handler         */
        /*=============================*/




        /*=============================*/
        /* //\\ parent after;          */
        /*      this is handle's disk  */
        /*      if visible;            */
        /*=============================*/
        .brc-slider-draggee:hover:after {
            content         : ''; /* seems vital ... why? */
            position        : absolute;
            left            : ${ds.DISK_LEFT};
            top             : ${ds.DISK_TOP};
            width           : ${ds.DISK_RADIUS};
            height          : ${ds.DISK_RADIUS};
            transform       : translate(-50%, -50%);

            padding-top     : 0px;
            border-radius   : ${ds.DISK_BORDER_RADIUS};
            font-size       : 11px;
            font-weight     : bold;
            text-align      : center;
            background-color: black;
            z-index         : 1000;
            cursor: ${CURSOR};
        }

        .brc-slider-draggee.grabbing:hover:after,
        .brc-slider-draggee.grabbing {
            cursor: ${CURSOR_GRABBING};
        }


        /*=============================*/
        /* \\// parent after           */
        /*=============================*/

        /*=============================*/
        /* //\\ animates slider arrows */
        /*=============================*/
        .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee .brc-slider-draggee-left {
            visibility:hidden;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee:hover .brc-slider-draggee-right {
            content         : '';
            position        : absolute;
            height          : 1px;
            width           : 1px;
            top             : ${ds.ARROWS_TOP};
            left            : ${ds.RIGHT_DRAGGEE_LEFT};
            animation       : 4s ease-out 0s infinite normal slider-hover-right;
            visibility      : visible;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-left,
        .brc-slider-draggee:hover .brc-slider-draggee-left {
            content         : '';
            position        : absolute;
            height          : 1px;
            width           : 1px;
            left            : ${ds.LEFT_DRAGGEE_LEFT};
            top             : ${ds.ARROWS_TOP};
            animation       : 4s ease-out 0s infinite normal slider-hover-left;
            visibility      : visible;
        }

        /* ///todf ... still needs parametrization ... it's obvious ... */
        @keyframes slider-hover-right {
            0% {
	            left: 15px;
	            opacity: 0;
            }
            12.5% {
	            opacity: 1;
            }
            25% {
	            left: 30px;
	            opacity: 0;
            }
            100% {
	            left: 30px;
	            opacity: 0;
            }
        }

        @keyframes slider-hover-left {
            0% {
	            left: -10px;
	            opacity: 0;
            }
            12.50% {
	            left: -10px;
	            opacity: 0;
            }
            25% {
	            opacity: 1;
            }
            37.5% {
	            opacity: 0;
	            left: -25px;
            }
            100% {
	            left: -35px;
	            opacity: 0;
            }
        }

        .brc-slider-draggee-right {
            border          : ${ds.ARROW_HEIGHT} solid transparent;
            border-left     : ${ds.ARROW_LENGTH} solid grey;
        }
        .brc-slider-draggee-left {
            border          : ${ds.ARROW_HEIGHT} solid transparent;
            border-right    : ${ds.ARROW_LENGTH} solid grey;
        }
        /*=============================*/
        /* \\// animates slider arrows */
        /*=============================*/



        `;
        // \\// css /////////////////////////////////////////
        ns.globalCss.update( ret, 'spinner-core-css');
        globalCssCreated_flag = true;
    };
})();


