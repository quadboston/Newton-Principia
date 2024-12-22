( function() {
	var ns	= window.b$l;

    //reg. ex for string aka rgba(4,4,4,0.1) to array
    var rgba2arr_re = new RegExp( 
        '^rgba\\(\\s*' +
        '(\\d+)\\s*,\\s*' +
        '(\\d+)\\s*,\\s*' +
        '(\\d+)\\s*,\\s*' +
        '((?:\\d|\\.)+)\\s*\\)',
        'i'
    );
    ns.builds_zebraNColors_array = builds_zebraNColors_array;
    ns.hslo_2_rgba_low8high = hslo_2_rgba_low8high;
    ns.rgbStr2digitsArray = rgbStr2digitsArray;


    ns.rgba2arr = function( rgbastr )
    {
        var cmatch = rgbastr.match( rgba2arr_re );
        var rr = parseInt(cmatch[1]);
        var gg = parseInt(cmatch[2]);
        var bb = parseInt(cmatch[3]);
        var aa = parseFloat(cmatch[4]);
        return [ rr,gg,bb,aa ];
    };


    // //\\ some proofreading 
    var str2rgb_re = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    ns.rgbstr2hsl = function( rgbstr )
    {
        var cmatch = rgbstr.match( str2rgb_re );
        var rr = parseInt(cmatch[1], 16);
        var gg = parseInt(cmatch[2], 16);
        var bb = parseInt(cmatch[3], 16);
        //c onsole.log( rr, gg, bb );
        var hsl = ns.rgb2hsl( rr, gg, bb );
        return [ hsl[0] * 360, hsl[1] * 100, hsl[2] * 100 ];
    };

    ns.rgbstr2colors = function( rgbstr, opacity )
    {
        var hsl = ns.rgbstr2hsl;
        //c onsole.log( hsl );
        return ns.pars2colors( hsl[0], hsl[1], hsl[2], opacity );
    };
    // \\// some proofreading 

    ///decreases or increases LIGHTNESS
    ///Input: darknessFactor: the smaller, the darker
    ns.darkefyColor = function( hsl, darknessFactor )
    {
        var darkefied = Math.min( 100, hsl[2]*darknessFactor);
        return [ hsl[0], hsl[1], darkefied ];
    };



    ///Input:
    ///         rgbArray - is normalized (aka [ 1, 0.3, 0 ]) or based256 (aka [255,75,0]),
    ///         based256 - optional
    ///Output:  { string:'#...', normalized:[...] };
    ns.rgb2str8norm = function( rgbArray, based256 )
    {
        var colors = { string:'#', normalized:[] };
        rgbArray.forEach( function( co, ix ) {
            var co256 = based256 ? co : Math.min( 255, Math.floor(co*256) );
            var coNorm = based256 ? co/256 : co;
            //c cc( 'input ' + co + ' co256=' + co256 + ' coNorm=' + coNorm  );
            colors.normalized[ix] = coNorm;
            var extra = '00' + co256.toString(16);
            var extra = extra.substring(extra.length-2,extra.length);
            //c cc( 'extra ' + extra )
            colors.string += extra;
        });
        return colors;
    };
    ns.rgb_2_str8norm = ns.rgb2str8norm;

    //api:arg = [r,g,b,a ]
    ns.rgbaArr2hsla = function( arg ) {
        var hsl = ns.rgb2hsl( arg[0],arg[1],arg[2] );
        return [ 355.99*hsl[0], 99.999*hsl[1], 99.999*hsl[2], arg[3], arg[4] ];
    };

    ///not tested
    ns.rgba2colors = function( arg ) {
        var hsl = ns.rgbaArr2hsla( arg );
        return ns.pars2colors( hsl[0], hsl[1], hsl[2], arg[3], arg[4] );
    }

    //was: function getRandomColor()
    ns.pars2colors = function( HUE, SATURATION, LIGHTNESS, OPACITY )
    {
        var DARKER = 0.8;

        //:gets pars
        var hue   = typeof HUE        === 'undefined' ? Math.random() * 359 : HUE;
        var satur = typeof SATURATION === 'undefined' ? 100                 : SATURATION;
        var light = typeof LIGHTNESS  === 'undefined' ? 50                  : LIGHTNESS;
        var opas  = typeof OPACITY    === 'undefined' ? 1                   : OPACITY;

        var resultColor = makeColor( light );
        resultColor.darkColor = makeColor( light * DARKER );

        //:never used and tested
        satur *= 0.5;
        resultColor.softColor = makeColor( 70 );

        ///does the job
        function makeColor( light )
        {
            var ligthStr = light.toFixed(2);

            var opasS = ( opas === 1 && '1' ) || opas.toFixed(3);

            var hueS = hue.toFixed()
            var hsla = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, ' + opasS + ')';
            var hsl0 = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, 0 )'; //for gradients with 0 opacity at one stop

            var rgb = ns.hsl2rgb( hue, satur * 0.01, light * 0.01 );
            var rr = 254.999 * rgb[0];
            var gg = 254.999 * rgb[1];
            var bb = 254.999 * rgb[2];
            var rrS = rr.toFixed();
            var ggS = gg.toFixed();
            var bbS = bb.toFixed();
            var ww = rrS + ',' +  ggS + ',' +  bbS;
            var rgb = 'rgb(' + ww + ')';
            var rgba = 'rgba(' + ww + ',' + opasS + ')';
            var rgbaCSS = rrS + '-' +  ggS + '-' +  bbS + '-' + opasS;
        
            return { 
                hsl0: hsl0,
                hsla : hsla,
                rgb : rgb,
                rgba : rgba,
                hue : hue,
                satur : satur,
                light : light,
                rr: rr,
                gg: gg,
                bb: bb,
                rrS: rrS,
                ggS: ggS,
                bbS: bbS,
                opas : opas,
                rgbaCSS : rgbaCSS
            };
        };

        return resultColor;
    };

    /// HSL to RGB
    /// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
    /// credit: https://codepen.io/frantic1048/pen/LGGxZP   , but it has a mistake: "* 60"
    ns.hsl2rgb = function( hh, ss, ll)
    {

      var cc = (1 - Math.abs(2 * ll - 1)) * ss;
      var hue = hh / 60;
      var xx = cc * (1 - Math.abs(hue % 2 - 1));
      var rgb;

      if (hue >= 0 && hue <= 1) {
        rgb = [cc, xx, 0];
      } else if (hue >= 1 && hue <= 2) {
        rgb = [xx, cc, 0];
      } else if (hue >= 2 && hue <= 3) {
        rgb = [0, cc, xx];
      } else if (hue >= 3 && hue <= 4) {
        rgb = [0, xx, cc];
      } else if (hue >= 4 && hue <= 5) {
        rgb = [xx, 0, cc];
      } else if (hue >= 5 && hue <= 6) {
        rgb = [cc, 0, xx];
      } else {
        rgb = [0, 0, 0];
      }

      var mm = ll - 0.5 * cc;
      return [ rgb[0] + mm, rgb[1] + mm, rgb[2] + mm];
    };



    //https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
    //this needs license and proofreading
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSL representation
     */
    //ns.rgbToHsl = function(r, g, b) {
    ns.rgb2hsl = function(r, g, b) {
      r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return [ h, s, l ];
    }

    ///array to color string:
    ///[ 123, 123, 123, 0.222 ] -> rgba(...
    ///
    ///input/output
    ///     falsy ---> rgba(0,0,0,1)
    ///     missed opacity ---> 1
    ns.arr2rgba = function ( arr )
    {
        if( !arr || !Array.isArray(arr) ) return "rgba(0,0,0,1)";
        var op = ( typeof arr[3] !== 'undefined' ) ? arr[3] : 1;
        var r=Math.floor( arr[0] );
        var g=Math.floor( arr[1] );
        var b=Math.floor( arr[2] );
        var op = op.toFixed(4);
        return 'rgba('+r+','+g+','+b+','+op+')';
    }
    ns.arr2rgb_rgba = function ( arr )
    {
        if( !arr || !Array.isArray(arr) ) return "rgba(0,0,0,1)";
        var op = ( typeof arr[3] !== 'undefined' ) ? arr[3] : 1;
        var r=Math.floor( arr[0] );
        var g=Math.floor( arr[1] );
        var b=Math.floor( arr[2] );
        var op = op.toFixed(4);
        var rgb = 'rgb('+r+','+g+','+b+')';
        var rgba = 'rgba('+r+','+g+','+b+','+op+')';
        return {rgb, rgba};
    }

    ///converts arguments to rgb or rgba string
    ///depending on presence of fourth, opacity argument,
    ///validates and corrects color values,
    ns.arr2rgb_a = function ( color1r, color1g, color1b, color1a )
    {
        color1r = Math.max( Math.min( 255, color1r ), 0 ).toFixed();
        color1g = Math.max( Math.min( 255, color1g ), 0 ).toFixed();
        color1b = Math.max( Math.min( 255, color1b ), 0 ).toFixed();

        var str = color1r + ',' + color1g + ',' + color1b;
        if( color1a || color1a === 0 ) {
            color1a = Math.max( Math.min( 255, color1a ), 0 ).toFixed(4);
            str = 'rgba(' + str + ',' + color1a + ')';
        } else {
            str = 'rgb(' + str + ')';
        }
        return str;
    }
    return;






    ///======================================================================
    /// builds array of zebra-colors
    ///     input: zebraNumber
    ///                 range from 2 to integer N,
    ///                 is a number of color-wheel segments for neighbour
    ///                 colors for providing zebra-N effect,
    ///                 "classic"-binary-zebra obtains with N=2,
    ///     output: zebraNcolorsArray with lenght >= maxColors,
    ///======================================================================
    function builds_zebraNColors_array({ //with low8high signature
        maxColors,
        SATUR,
        LIGHT,
        OPACITY,
        zebraNumber,
        monoColorHue, //optional, makes zebra via lightness, not via colors
    }) {
        zebraNumber     = zebraNumber || 2;
        var zCols       = [];
        var moldsMax    = Math.ceil( maxColors / zebraNumber );
        var zebraJump   = 359.999 / zebraNumber;
        var moldStep    = zebraJump / moldsMax;
        var count = 0;

        for( var modlIx=0; modlIx < moldsMax; modlIx++ )
        {
            if( count === maxColors) break;
            for( var remIx = 0; remIx < zebraNumber; remIx++ )
            {
                if( count === maxColors) break;
                var hue = monoColorHue ? monoColorHue : zebraJump * remIx + moldStep * modlIx;
                //ccc( count, modlIx, 'rem='+remIx, hue )

                //was a protection: hue = hue % 360;    //othewise "grey colors" may appear

                //returns high opacity = 1:
                var lh = hslo_2_rgba_low8high(
                    hue,
                    SATUR,

                    //monoColorHue ? LIGHT / ( remIx + 1 ) : LIGHT,
                    monoColorHue ? (99-LIGHT) * remIx / zebraNumber + LIGHT : LIGHT,

                    //is opacity always in use?
                    //monoColorHue ? OPACITY / ( remIx + 1 ) : OPACITY,

                    OPACITY,
                );
                zCols.push( lh );
                count++;
            }
        }
        //ccc( 'compl=' + count );
        return zCols;
    }

    ///creates twin-colors: argument lowOpacity goes to rgba_low,
    ///        highOpacity goes to rgba_high,
    function hslo_2_rgba_low8high( hue, sat, light, lowOpacity, highOpacity )
    {
        highOpacity = typeof highOpacity === 'undefined' ? 1 : highOpacity;
        //ns.pars2colors = function( HUE, SATURATION, LIGHTNESS, OPACITY )
        var corRack     = ns.pars2colors( hue, sat, light, lowOpacity );
        let rgb         = corRack.rgb;
        let rgba_low    = corRack.rgba;
        var corRack     = ns.pars2colors( hue, sat, light, highOpacity );
        let rgba_high   = corRack.rgba;
        return { rgb, rgba_low, rgba_high, lowOpacity, highOpacity }; 
    }

    ///Inputs:      rgbStr, aka #FFFFFF or FFFFFF,
    ///         optionals:
    ///             normalize, if truthy, then r,g,b are divided to 255,  
    function rgbStr2digitsArray( rgbStr, normalize )
    {
        rgbStr = rgbStr.replace('#','');
        var r = parseInt( rgbStr.substring(0,2), 16 );
        var g = parseInt( rgbStr.substring(2,4), 16 );
        var b = parseInt( rgbStr.substring(4,6), 16 );
        if( normalize ) {
            r = Math.min( r/255, 1 );
            g = Math.min( g/255, 1 );
            b = Math.min( b/255, 1 );
        }
        return [ r, g, b ];
    }

}) ();

