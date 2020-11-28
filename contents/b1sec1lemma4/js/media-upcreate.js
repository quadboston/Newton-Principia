( function() {
    var {
        ns, sn,
        rg,
        ssF, ssD,
        toreg,
        stdMod,
        
    } = window.b$l.apptree({
        stdModExportList :
        {
            media_upcreate___part_of_medupcr_basic,
        },
    });
    return;













    //=========================================================
    // //\\ lemma custom addons
    //=========================================================
    function media_upcreate___part_of_medupcr_basic()
    {
        //this is a "policy" ... should be in the state manager if any ...
        rg.allLettersAreHidden = !rg.detected_user_interaction_effect_DONE;

        ///-------------------------------------------------
        /// paints x-scaled curve
        ///-------------------------------------------------
        ssF.paintsCurve({
                mmedia          : stdMod.mmedia,
                fun             : ssD.repoConf[1].fun,
                rgName          : 'prT',
                pointA          : rg.P,
                pointB          : rg.T,
                addToStepCount  : 1,
        });

        displayBars( 'left' );
        displayBars( 'right' );
    }
    //=========================================================
    // \\// lemma custom addons
    //=========================================================




    function displayBars( deft0rightDiagram )
    {
        var ordBars = rg.orderedBars.val;

        var dgPref = deft0rightDiagram;

        ordBars.forEach( (bar, bix) => {
            if( bix === ordBars.length - 1 ) return; //last point has no bar

            //:calculates bar vertices
            var p1=bar;
            var p2=ordBars[bix+1]; 
            var leftFun = ssD.repoConf[0].fun( p1.pos[0] )[1];        
            var rightFun = ssD.repoConf[0].fun( p2.pos[0] )[1];        
            var min = Math.min( leftFun, rightFun );
            //:establishes names for bar vertices
            var ltName = dgPref + ' bar-'+bix+'-left-top';
            var rtName = dgPref + 'bar-'+bix+'-right-top';
            var ltBName = dgPref + 'bar-'+bix+'-left-bottom';
            var rtBName = dgPref + 'bar-'+bix+'-right-bottom';

            //-------------------------------------------------------
            // //\\ calculates vertices for left and right
            //-------------------------------------------------------
            if( deft0rightDiagram === 'left' ) {
                var p1X = p1.pos[0];
                var p2X = p2.pos[0];
                var p1Y = min;
                var ymin = rg.A.pos[1];
                var cssClass = 'tp-proof tp-left-bars tp-left-bar-' + bix;
                var breadthClass = 'tp-left-bars-breadths';
            } else {
                var p1X = p1.pos[0] * rg.magnitudeX.val + rg.P.pos[0];
                var p2X = p2.pos[0] * rg.magnitudeX.val + rg.P.pos[0];
                var p1Y = min * rg.magnitudeY.val + rg.P.pos[1]-rg.A.pos[1];
                var ymin = rg.P.pos[1];
                var cssClass = 'tp-proof tp-right-bars tp-right-bar-' + bix;
                var breadthClass = 'tp-right-bars-breadths';
            }
            //-------------------------------------------------------
            // \\// calculates vertices for left and right
            //-------------------------------------------------------

            //-------------------------------------------------------
            // //\\ establishes registry for bar vertices
            //-------------------------------------------------------
            var leftTop = toreg( ltName )( 'pos', [ p1X, p1Y ] )();
            var rightTop = toreg( rtName )( 'pos', [ p2X, p1Y ] )();
            var leftBottom = toreg( ltBName )( 'pos', [ p1X, ymin ] )();
            var rightBottom = toreg( rtBName )( 'pos', [ p2X, ymin ] )();
            //-------------------------------------------------------
            // \\// establishes registry for bar vertices
            //-------------------------------------------------------

            //:converts var vertices from model to media
            leftTop.medpos = ssF.mod2inn( leftTop.pos );
            rightTop.medpos = ssF.mod2inn( rightTop.pos );
            leftBottom.medpos = ssF.mod2inn( leftBottom.pos );
            rightBottom.medpos = ssF.mod2inn( rightBottom.pos );

            //:draws bar sides
            //function str2line( str, cssClass, lineConf, caption )
            ssF.str2line( ltName+','    +rtName,  cssClass, {}, '' );
            ssF.str2line( ltName+','    +ltBName, cssClass, {}, '' );
            ssF.str2line( rtName+','    +rtBName, cssClass, {}, '' );
            ssF.str2line( ltBName+','   +rtBName, cssClass + ' ' + breadthClass, {}, '' );
        });
    }


}) ();

