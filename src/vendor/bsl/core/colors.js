( function() {
	var ns	= window.b$l;




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

    //api:arg = [r,g,b,a ]
    ns.rgba2hsla = function( arg ) {
        var hsl = ns.rgb2hsl( arg[0],arg[1],arg[2] );
        return [ 355.99*hsl[0], 99.999*hsl[1], 99.999*hsl[2], arg[3] ];
    };

    ///not tested
    ns.rgba2colors = function( arg ) {
        var hsl = ns.rgba2hsla( arg );
        return ns.pars2colors( hsl[0], hsl[1], hsl[2], arg[3] );
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
    ns.arr2rgba = function ( arr )
    {
        if( !arr || !arr.length) return "rgba('0,0,0,1')"; //was 'black'
        var op = ( typeof arr[3] !== 'undefined' ) ? arr[3] : 1;
        var r=Math.floor( arr[0] );
        var g=Math.floor( arr[1] );
        var b=Math.floor( arr[2] );
        var op = op.toFixed(4);
        return 'rgba('+r+','+g+','+b+','+op+')';
    }

    ns.builds_zebraNColors_array = builds_zebraNColors_array;
    ns.hslo_2_low8high = hslo_2_low8high;
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
    function builds_zebraNColors_array({
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
                var lh = hslo_2_low8high(
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


    ///creates twin-colors: one with full opacity and other one for
    ///shaded,
    ///argument nonFullOpacity goes to rgba_low,
    ///opacity 1           goes to rgba_high,
    function hslo_2_low8high( hue, sat, light, nonFullOpacity )
    {
        //ns.pars2colors = function( HUE, SATURATION, LIGHTNESS, OPACITY )
        var corRack     = ns.pars2colors( hue, sat, light, nonFullOpacity );
        rgba_low        = corRack.rgba;
        rgbaCSS         = corRack.rgbaCSS;
        var corRack     = ns.pars2colors( hue, sat, light, 1 );
        rgba_high       = corRack.rgba;
        return { rgba_low, rgba_high }; 
    }


}) ();

