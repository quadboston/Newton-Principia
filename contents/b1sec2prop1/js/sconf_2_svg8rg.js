(function(){
    const { sn, haff, hafff, haz, globalCss, nspaste,
            fconf, sconf, ssF, ssD, stdMod, amode, toreg, rg,
    } = window.b$l.apptree({ stdModExportList : {
            shapeSconf_2_svg,
            sconf_2_shapes,
        },
    });
    var decor = sn( 'decor', stdMod );
    const shapesConf = sn( 'shapes', sconf );
    var theor1proof = fconf.sappId === 'b1sec2prop1' ?
        'logic_phase--proof' : 'logic_phase--none';
    var theor2proof = fconf.sappId === 'b1sec2prop2' ?
        'logic_phase--none' : 'logic_phase--proof';
    var theor2corollary = fconf.sappId === 'b1sec2prop2' ?
        'logic_phase--corollary' : 'logic_phase--none';
    var theor1corollary = fconf.sappId === 'b1sec2prop2' ?
        'logic_phase--none' : 'logic_phase--corollary';
    return;

    
    function shapeSconf_2_svg (){
        //path and speeds have master-index, pi, offset pi=0
        toreg( 'path' )( 'pos', [ rg.A.pos ] );
        toreg( 'pathAracc' )( 'pos', [ rg.A.pos ] );
        Object.keys( shapesConf ).forEach( key => {
            ssF.namesArr_2_svgpoly.apply(
                null, shapesConf[ key ].initArgs );
        });
    }

    //one time call function, called in inti...
    function sconf_2_shapes (){
        ///MERGING P1 WITH standalone sconf machinery
        ///syncs these points with hidden force-displacement-handles bases
        ['B','C','D','E','F'].forEach( (name, ix) => {
            let nam0='VV'+ix;
            rg[nam0].pos = rg[name].pos;
        });
        //note: in svg-z-order, these fall behind
        //      decorational-"kepler-triangles" etc, but
        //      due transparency are still well-visible,
        saggPolyNames_2_rg();
        keplerPolyNames_2_rg();
        (fconf.sappId === 'b1sec2prop2') && acceleratingArea_2_rg();
        //=========================================================
        // //\\ placeholders for body states along trajectory,
        //      Aracc postfix stands for "area-accelerating force"
        //=========================================================
        toreg( 'force' )
            ( 'lawPower', sconf.force[0][0] ) //-2
            ( 'lawConstant', sconf.force[0][1]
            );
        rg.force.inarray = ['B','C','D','E','F'].map( (pname, fix) => {
            return {
                'lawPower' : sconf.force[0][0],
                'lawConstant' : sconf.force[0][1],
            };
        });

        //awkward prop name. "pos"
        //area accelerating force
        toreg( 'forceAracc' )
            ( 'tangentialForcePerCentripetal_fraction',
               sconf.tangentialForcePerCentripetal_fraction )
            ;

        //path and speeds have master-index, pi, offset pi=0
        //toreg( 'path' )( 'pos', [ rg.A.pos ] );
        //toreg( 'pathAracc' )( 'pos', [ rg.A.pos ] );
        //:auxiliary params
        toreg( 'freePath' )( 'pos', [] );
        toreg( 'freePathAracc' )( 'pos', [] );

        //keplerTriangles have master-index, pi, offset ... see media-model
        toreg( 'keplerTriangles' );

        //forces have master-index, pi, offset  ... see media-model
        toreg( 'impulses' )( 'vectors', [] );
        toreg( 'impulsesAracc' )( 'vectors', [] );

        //spawnes path placeholder
        toreg( 'pathRacks' )( 'pathRacks', [] );
        toreg( 'pathRacksAracc' )( 'pathRacks', [] );
        //=========================================================
        // \\// placeholders for body states along trajectory,
        //=========================================================
    }

    function saggPolyNames_2_rg (){
        [
            ['A', 'B', 'C', 'V'],   //ABCV
            ['D', 'E', 'F', 'Z'],   //DEFZ
        ].forEach( pNames => {
            var pName = pNames.join( '');
            var rgElem = shapesConf[ pName ] = toreg( pName )();
            rgElem.initArgs = [
                pNames,
                'tostroke hidee '+theor1corollary,
                null,
                !!'undisplay',
            ];
            decor[ pName ] = rgElem;
            //lead Point defines range and ix
            var leadPoint = 2;
            rgElem.decStart = rg[ pNames[leadPoint] ].decStart;
            rgElem.decEnd = rg[ pNames[leadPoint] ].decEnd;
        });
        rg.ABCV.decStart = 7;
        rg.DEFZ.decStart += 1;
        rg.DEFZ.decEnd += 1;
    }

    function keplerPolyNames_2_rg (){
        //they do not refresh when media scales, todo,
        [   ////these triangles override free triangles attached to path
            ////in path-2-media js-code,
            ['S', 'B', 'c',],   //SBc
            ['S', 'C', 'd',],   //SCd
            ['S', 'D', 'e',],   //SDe
            ['S', 'E', 'f',],   //SEf
        ].forEach( pNames => {
            var pName = pNames.join( '');
            var rgElem = shapesConf[ pName ] = toreg( pName )();
            rgElem.initArgs = [
                pNames,
                //no dice
                //'theor1proof theor2proof tofill theor2corollary tp-triangle_green',

                //must make green:
                //adding "hidee" is a trick because of these triangles
                //do not pass though expands-conf.jz machine,
                'tofill hidee logic_phase--proof ' + theor2corollary,
                null,
                !!'undisplay',
                !'tostroke',
            ];
            decor[ pName ] = rgElem;
            var lp = rg[ pNames[ 2 ] ];
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = lp.decEnd;
        });
    }

    function acceleratingArea_2_rg (){
        [
            ['S', 'B', 'Caracc',],  //SBCaracc
        ].forEach( pNames => {
            var pName = pNames.join( '');
            var rgElem = shapesConf[ pName ] = toreg( pName )();
            rgElem.initArgs = [
                pNames,
                'tofill hidee ' + theor2corollary,
                null,
                !!'undisplay',
                !'tostroke',
            ];
            var lp = rg[ pNames[ pNames.length-1 ] ];
            decor[ pName ] = rgElem;
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = lp.decEnd;
        });
    }
})();
