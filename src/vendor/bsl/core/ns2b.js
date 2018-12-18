//*******************************************************************
//          b$l = Beaver $cript Library.
//          Intended to be lite weight JS generic library.
//          Copyright (c) 2018 Konstantin Kirillov
//          Licenses: MIT, GPL, GPL2.
//*******************************************************************

// //\\// Super-module of b$l framework. Must be executed first
//        Checks if there is a conflict in global namespace with this library name.
//        Adds ns.$$ - lite weight dom wrap.
//  
//        Creates only one global: window[ APP_NAME ]
//        jQuery can be added with no collision.


( function() {
    var APP_NAME        = 'b$l';

    //.optional property: comment this definition out if not needed
    //.purpose is only to short manual typing for development debug
    window.ccc          = window.console.log;

    var ns = setAppNamespace( APP_NAME );
    setDomWrap( ns );
    return;






    function setAppNamespace( name )
    {
        var uniqueEarthWide = 'iamniquelks8e00w-e9jalknfnaegha;s[snfs=sieuhba;fkleub92784bna';
        var ns = window[ name ];
        if( ns ) {
            if( ns[ uniqueEarthWide ] ) { return ns; }
            //.lets community to take care about this app
            throw 'global name collision: the window["' + name + '"] already exists in web-browser';
        } else {
            var ns = window[ name ] = {};
            ns[ uniqueEarthWide ] = true;
            ns.uniqueEarthWide = uniqueEarthWide;
            ns.sn = sn;
            ns.APP_NAME = name;
            ns.CSS_PREFIX = name.replace( /\$/g, 's' );
            return ns;
        }

        ///sets namespace
        function sn( subname, parentNS )
        {
            var parentNS = parentNS || ns;
            if( parentNS.hasOwnProperty( subname ) ) {
                return parentNS[ subname ];
            } 
            var sns = parentNS[ subname ] = {};
            return sns;

            /*
            //proposes property conflict detection with JS native objects in 
            //prototype-tree depths
            var sns = parentNS[ subname ];
            if( sns ) {
                if( sns[ uniqueEarthWide ] ) return sns;
                //.lets community to take care about this app
                throw 'object property name collision: the parentNS["' + subname +
                '"] already exists in web-browser';
            }
            var sns = parentNS[ subname ] = {};
            sns[ uniqueEarthWide ] = true;
            return sns;
            */
        }
    }







    //***************************************************************************
    // //\\ ns.$$ ... dom wrapp
    //***************************************************************************
    function setDomWrap( ns )
    {
        // //\\ helpers
        ns.svgNS = "http://www.w3.org/2000/svg";

        ///https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
        ns.callOn = function( selector, parent, callback )
        {
            parent = parent || document;
            var els = parent.querySelectorAll( selector );
            for( var ii = 0; ii < els.length; ii++ ) {
                callback( els[ii], ii );
            }
        };

        ///converts event pos to domelem-css-pos
        ns.event_pos_2_css_pos = function ( event, domelem )
        {
            //	https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
            //	Feature 	Chrome 	Firefox (Gecko) 	Internet Explorer 	Opera 	Safari
            //	Basic support 	1.0 	3.0 (1.9) 	4.0 	(Yes) 	4.0
            var box	= domelem.getBoundingClientRect();
            var loc	= [ Math.round( event.clientX - box.left ), Math.round( event.clientY - box.top ) ];
            return loc;
        };


        // //\\ DOM wrap
        //      for chains
        //      simple replacement of jQuery
        var $$ = ns.$$ =
        ( function() {
            
            var gen = function() {
                var ctxEl = null;
                var methods =
                {
                    //.wraps flat-dom-object-into-platform
                    $:      function( obj )                 { ctxEl = obj                                            },

                    c:      function( type )                { ctxEl =                document.createElement( type ); },
                    //.gets single by id
                    g:      function( id )                  { ctxEl =                document.getElementById( id ); },
                    //.gets single
                    q:      function( selector, parent )    { ctxEl =                (parent||document.body).querySelector( selector ); },
                    //.gets array of all
                    qa:     function( selector, parent )    { ctxEl =                (parent||document.body).querySelectorAll( selector ); },
                    cNS:    function( type )                { ctxEl =                document.createElementNS( ns.svgNS, type ); },
                    a:      function( attr, text, obj )     { ctxEl = obj || ctxEl;  ctxEl.setAttribute( attr, text ); },
                    aNS:    function( attr, text, obj )     { ctxEl = obj || ctxEl;  ctxEl.setAttributeNS( null, attr, text ); },
                    to:     function( to, obj )             { ctxEl = obj || ctxEl;  to.appendChild( ctxEl ); },
                    ch:     function( ch, obj )             { ctxEl = obj || ctxEl;  ctxEl.appendChild( ch ); },
                    e:      function( type, callback, obj ) { ctxEl = obj || ctxEl;  ctxEl.addEventListener( type, callback ); },
                    css:    function( name, value, obj )    { ctxEl = obj || ctxEl;  ctxEl.style[ name ] = value; },
                    html:   function( html, obj )           { ctxEl = obj || ctxEl;  ctxEl.innerHTML = html; },


                    //adds class.
                    addClass:   function( text, obj )
                                {   
                                    if( !text ) return; //sugar, saves extra "if"

                                    ctxEl = obj || ctxEl;  
                                    var clss = classes=text.split(/\s+/);
                                    if( clss.length>1 ) {
                                        ////many classes are supplied ...
                                        ////processes each of them
                                        clss.forEach( function( cls ) {
                                            $$.addClass( cls, ctxEl );
                                        });
                                        return;
                                    }

                                    var at = ctxEl.getAttribute( 'class' ); //className is not for SVG
                                    if( !at ) {
                                        //https://stackoverflow.com/questions/41195397/how-to-assign-a-class-to-an-svg-element
                                        //ctxEl.className = text;
                                        ctxEl.setAttribute( 'class', text ); //For SVG
                                        return;
                                    }
                                    var ats = ' ' + at + ' ';
                                    var testee = ' ' + text + ' ';
                                    if( ats.indexOf( testee ) === -1 ) {
                                        //c onsole.log( 'adding=' + text + ' to ' + at);
                                        if( at.length > 0 && text ) {
                                            at += ' ';
                                        }
                                        at += text;
                                        //c onsole.log( 'result of adding=' + at);
                                        //ctxEl.className = at;
                                        ctxEl.setAttribute( 'class', at ); //For SVG
                                    }
                                },

                    //removes class.
                    removeClass: function( text, obj )
                                { 
                                    if( !text ) return; //sugar, saves extra "if"

                                    //c onsole.log( 'removing=' + text );
                                    ctxEl = obj || ctxEl;  
                                    var clss = classes=text.split(/\s+/);
                                    if( clss.length>1 ) {
                                        ////many classes are supplied ...
                                        ////processes each of them
                                        clss.forEach( function( cls ) {
                                            $$.removeClass( cls, ctxEl );
                                        });
                                        return;
                                    }

                                    var at = ctxEl.getAttribute( 'class' );
                                    if( !at ) {
                                        ////nothing to remove ... leaving the task
                                        return;
                                    }
                                    var ats = ' ' + at + ' ';
                                    var testee = ' ' + text + ' ';
                                    if( ats.indexOf( testee ) > -1 ) {
                                        var re = new RegExp( '(?:^|\\s)' + text + '(?:\\s|$)', 'g' );
                                        //var match = at.match( re );
                                        //c onsole.log( 'match=', match );
                                        at = at.replace( re, ' ' );
                                        at = at.replace( /\s+/g, ' ' );
                                        at = at.replace( /(^\s*)|(\s*$)/g, '' );
                                        //at = at.replace( /(\s*)/g, '' );
                                        //c onsole.log( 'removed=' + at );
                                        //ctxEl.className = at;
                                        ctxEl.setAttribute( 'class', at ); //For SVG
                                    }
                                }
                };
                var wrap = function() { return ctxEl; };
                Object.keys( methods ).forEach( function( key ) {
                    var method = methods[ key ];
                    wrap[ key ] = function() { method.apply( {}, arguments ); return wrap; };
                });
                return wrap;
            };

            var sample = gen();
            var masterGen = {};
            Object.keys( sample ).forEach( function( key ) { //todm ... works for functions ? not only for objects?
                masterGen[ key ] = function() { return gen()[ key ].apply( {}, arguments ); };
            });
            return masterGen;

        }) ();
        // \\// DOM wrap
    }
    //***************************************************************************
    // \\// ns.$$ ... dom wrapp
    //***************************************************************************



}) ();



// //\\// debugger
//        non-dispensable for mobiles
//        version july 4, 2018
( function () {
	var ns = window.b$l;




    // creates debugger once per application
    ns.createDebugger = function ()
    {
        if( ns.d ) return;
        ///Checks if bsl-debug textarea exists and 
        /// outputs to debug and scrolls to the end.
        /// If debWind-fragment is commented-out, this function does nothing
        /// and in the code it is still safe to use the lines:
        /// Usage: window.b$l.d(text)
        ns.d = function( text )
        {
            //ccc( Date.now().toString().substr( -6 ) + ' ' + text );
            if( !debWind ) return;
            debWind.value +='\n' + text;
            debWind.scrollTop = debWind.scrollHeight;
        };
        var debWind=null;
        ///uncomment debug-block to enable textarea for debug
        /*
        // //\\ debug-block
        var debWind = document.getElementById( 'bsl-debug' );
        if( !debWind ) {
            ////this block is good when one needs to output large data object
            ////into text box in a browser's textarea at the end of web-page
            debWind = document.createElement( 'textarea' );
            debWind.setAttribute( 'id', 'bsl-debug' );
            debWind.setAttribute( 'disabled', 'yes' );
            document.body.appendChild( debWind );
            debWind.style.cssText = 
                    //'height:18%; width:30%; z-index:1111111;' +
                    'height:250px; width:600px; z-index:1111111;' +
                    'position:absolute; top:60%; left:200px; font-size:15px;';
            ns.dd = debWind; //usage: ns.dd.value +='\n' + text;
        }
        // \\// debug-block
        */
    };

}) ();

( function() {
	var ns = window.b$l;




    //=========================================================
    // //\\ ecapes html specials
    //=========================================================
    var amp_re = /&/g;
    var lt_re = /</g;
    var gt_re = />/g;
    var line_feed_re = /\r\n|\r|\n/g;
    ns.htmlesc = function( str )
    {
        return str.replace( amp_re, '&amp;' ).replace( lt_re, '&lt;' ).replace( gt_re, '&gt;' );
    }

    ns.pre2fluid = function( str )
    {
        return str.replace( line_feed_re, '<br>' );
    }
    //=========================================================
    // \\// ecapes html specials
    //=========================================================



    //=========================================================
    // //\\ configures from URL
    //=========================================================
    ns.url2conf = function( conf )
    {  
        //      if supplied, it overrides internal application conf 
        //      format: ...index.html?conf=a.b.c.d=4,a.b.e=5
        var urlPars     = window.location.search || '';
        /*
        var urlPathname = window.location.pathname;
        var urlProtocol = window.location.protocol;
        var urlHostname = window.location.hostname;
        var urlPort     = window.location.port + '';
        */
        var urlConfRe   = /(?:&|\\?)conf=([^&]+)/i;
        var urlConf     = urlPars.match( urlConfRe );
        if( urlConf ) {
            urlConf = urlConf[1].split(',');
            urlConf.forEach( function( opt ) {
                var cc = opt.split('=');
                if( cc[1] ) {
                    //let user to say "yes" or "no"
                    cc[1] = cc[1] === "yes" ? true : ( cc[1] === "no" ? false : cc[1] );
                } else {
                    ////missed parameter p in x=p is ignored
                    return;
                }
                ns.dots2object( cc[0], cc[1], conf )
                //conf.urlConf[cc[0]]=cc[1];
            });
        }
        return conf;
    }
    //=========================================================
    // \\// configures from URL
    //=========================================================

    // //\\ helpers
    ns.prop2prop = function( target, source )
    {
        if( source ) {
            Object.keys( source ).forEach( function( key ) {
                target[ key ] = source[ key ];
            });
        }
        return target;
    };



    ///updates properties of object obj from single key-value
    ///pair "name, value"
    ns.dots2object = function( name, value, obj )
    {
		var tokens	= name.split( '.' );
		var len		= tokens.length;
		var len1	= len - 1;
		if( len1 < 0 ) {
            obj[ name ] = value;
            return obj;
        }
		var prop	= tokens[ 0 ];
		for( var ii = 0; ii < len1; ii++ )
		{
			//:: appends objects if missed
			if( !obj[ prop ] || typeof obj[ prop ] !== 'object' ) obj[ prop ] = {};
			obj = obj[ prop ];
			var prop = tokens[ ii + 1 ];
		}
		obj[ prop ] = value;
        return obj;
    }



	///	Purpose:		Cloning object trees by value till refdepth.

    // edge-calse does not work: see below as
    // edge-calse does not work: the only problem is when wall_preserved.length is defined.
    // see other edge cases with token "throw" below

	//					"All existing properties at and below refdepth become common
	//					for operands and result".
	//	Detais:			Makes wall a correct paste of paper when
	//						both wall and paper do not have arrays in their trees till (refdepth+1);
	//					otherwise, ( "arrayflict" case)
	//						non-array obj.W can be overriden with array [] and with A which may
	//						break outside reference w = obj.W which still points to the former W.
	//					Infinite recursion is not protected except by using recdepth.
	//	Comparision:	of arrayflicts with jQuery.extend
	//						wall = {...} paper [...]
	//							in jQuery - this is an obligation of programmer to make wall [...]
	//							in tp	-	wall is brutally replaced with []. Not extended,  //TODM possibly fix
	//										but return result is correct possibly except numerics in wall_preserved.
	//						in deeper levels of arrayflict
	//							in jQuery	- new [] is generated
	//							in tp		- new [] is generated
	//							in jQuery	- numeric and non-numeric properties of wall.....non-arr are "killed"
	//							in tp		- numeric and non-numeric properties of wall.....non-arr are preserved
	//					in jQuery	- all prototype levels are copied
	//					in tp		- only ownProperties are copied
	//					in jQuery	- only two options "deep copy" or "not deep"
	//					in tp		- reference deepness can be controlled
	//							
	//	Input:			All args are optional.
	//					skip_undefined	- omitting it allows copying "wall <- paper.undefined".
	//					recdepth		- stops recursion at level > recdepth

	//	Results in:		changed wall properties.
	//	Returns:		combined clone of paper to wall.
	var paste_non_arrays = ns.paste = ns.paste_non_arrays = function ( wall, paper, level, skip_undefined, refdepth, recdepth )
	{

		level = level || 0;
		var t = typeof paper;

		//.Arguments sugar: pasting nothing does not change wall
		if( !level && (t === 'undefined' || paper === null ) ) return wall;

        //.Returns back non-object-type value
		if( t === 'undefined' || t === 'string' || t === 'boolean' || t === 'number' || t === 'function' || paper === null)
		{
			return paper;
		}

		///Reduces the "deep-copy" to reference copy for leveles beneath reference-depth
		if( refdepth || refdepth === 0 )
		{
			if( level > refdepth ) return paper;
		}

		///Recursion limit is exceeded. Truncates recursion by recdepth value.
		if( ( recdepth || recdepth ===0 ) && level > recdepth ) 
		{
			return '';
		}


		///Paper is non-void array or object. If wall do not "match" the paper, making wall an object.
		if( typeof wall !== 'object' || wall === null )
		{
			wall = {};
		}

        var isArrayPaper = Array.isArray( paper );
        if( isArrayPaper && !Array.isArray( wall ) ) {
            ////Paper is array and wall is not. Morthing wall to array but preserve its properties.
			var wall_preserved = wall;
			wall = [];
            //.Returns preserved wall's properties to wall-as-array.
            if( typeof wall_preserved.length !== 'undefined' ) {
                ////edge-calse does not work: the only problem is when wall_preserved.length is defined.
                ////todm: the only problem is when wall_preserved.length is defined.
                throw "copying array to object with existing object.length property";
            }
			paste_non_arrays( wall, wall_preserved, level, skip_undefined, refdepth, null );
        };

		///Now both wall and paper are objects of the same type. Pasting their properties.
		var hasOwn	= Object.prototype.hasOwnProperty;
		for(var p in paper )
		{
			if( hasOwn.call( paper, p ) ) //when works on arrays, then not fails on 'length'? bs "length" is notOwnProperty
			{
				if( p !== 'length' )
				{
					paper[ p ];
						var theValue = paste_non_arrays( wall[ p ], paper[ p ], level+1, skip_undefined, refdepth, recdepth );

						if( ! ( ( isArrayPaper || skip_undefined ) && typeof theValue === 'undefined' )  )
						{
							wall[ p ]		= theValue;
						}
				} else {
					throw 'The subroutine, paste_non_arrays, does not allow to copy property "length".';
				}
			}
		}
		return wall;
	};// ...paste_non_arrays=function...
	
}) ();




///global css manager;
///gradually adds and updates global css
///as page loads at landing
///keeping css in one html-style-element;
( function() {
 	var ns                  = window.b$l;
    var globalCss           = ns.sn('globalCss');
    var cssText             = '';
    var cssDom$             = null;
    globalCss.update        = update;       
    globalCss.addText       = addText;
    globalCss.getText       = getText;
    globalCss.add8update    = addAndUpdate;
    return; //****************************





    function update( moreText )
    {
        if( !cssDom$ ) {
            cssDom$ = ns.$$.c( 'style' ).to( document.head );
        }
        if( moreText ) { cssText += moreText; }
        cssDom$.html( cssText );
    };
    function addText( text )
    {
        cssText += text;
    };
    ///helps to cooperate with other Css builder
    ///by avoiding creation of extra own style-html
    function getText()
    {
        return cssText;
    };
    function addAndUpdate( text )
    {
        addText( text );
        update();
        ///good place to output assembled css for later static use
    }
})();




(function () {
    var ns = window.b$l;
    ns.createDebugger();
    ns.conf = ns.url2conf( {} );
}) ();


