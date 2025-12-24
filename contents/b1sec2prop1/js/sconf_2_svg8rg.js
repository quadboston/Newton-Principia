(function(){
    const { sn, haff, hafff, haz, globalCss,
            sconf, ssF, ssD, stdMod, amode, toreg, rg,
    } = window.b$l.apptree({ stdModExportList : {
            sconf_2_svg8rg,
        },
    });
    var decor = sn( 'decor', stdMod );
    return;


    function sconf_2_svg8rg (){
        ccc( 'sconf_2_svg8rg' );

        ///MERGING P1 WITH standalone sconf machinery
        ///syncs these points with hidden force-displacement-handles bases
        ['B','C','D','E','F'].forEach( (name, ix) => {
            let nam0='VV'+ix;
            rg[nam0].pos = rg[name].pos;
        });
        //note: in svg-z-order, these fall behind
        //      decorational-"kepler-triangles" etc, but
        //      due transparency are still well-visible,
        saggPolyNames_2_rg8svg();
        keplerPolyNames_2_rg8media();
        acceleratingArea_2_rg8media();

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
        toreg( 'path' )( 'pos', [ rg.A.pos ] ); //awkward prop name. "pos"
        toreg( 'pathAracc' )( 'pos', [ rg.A.pos ] ); //awkward prop name. "pos"

        //:auxiliary params
        toreg( 'freePath' )( 'pos', [] ); //awkward prop name. "pos"
        toreg( 'freePathAracc' )( 'pos', [] ); //awkward prop name. "pos"

        //freeTriangles have master-index, pi, offset ... see media-model
        //tp( 'freeTriangles', [] );

        //keplerTriangles have master-index, pi, offset ... see media-model
        toreg( 'keplerTriangles' )( 'pos', [] );  //awkward prop name. "pos"
        toreg( 'keplerTrianglesAracc' )( 'pos', [] ); //awkward prop name. "pos"

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
    return;


    function saggPolyNames_2_rg8svg (){
        [
            ['A', 'B', 'C', 'V'],   //ABCV
            ['D', 'E', 'F', 'Z'],   //DEFZ
        ].forEach( pNames => {
            var rgElem = ssF.namesArr_2_svgpoly(
                pNames,
                'theor1corollary tostroke',
                null,
                !!'undisplay',
                null,
            );
            decor[ rgElem.pname ] = rgElem;
            //lead Point defines range and ix
            var leadPoint = 2;
            rgElem.decStart = rg[ pNames[leadPoint] ].decStart;
            rgElem.decEnd = rg[ pNames[leadPoint] ].decEnd;
        });
        rg.ABCV.decStart = 7;
        rg.DEFZ.decStart += 1;
        rg.DEFZ.decEnd += 1;
    }

    function keplerPolyNames_2_rg8media (){
        [   ////these triangles override free triangles attached to path
            ////in path-2-media js-code,
            ['S', 'B', 'c',],   //SBc
            ['S', 'C', 'd',],   //SCd
            ['S', 'D', 'e',],   //SDe
            ['S', 'E', 'f',],   //SEf
        ].forEach( pNames => {
            var rgElem = ssF.namesArr_2_svgpoly(
                pNames,
                //no dice
                //'theor1proof theor2proof tofill theor2corollary tp-triangle_green',

                //must make green:
                'theor1proof theor2proof tofill theor2corollary',
                null,
                !!'undisplay',
                !'tostroke',
            );
            decor[ rgElem.pname ] = rgElem;
            var lp = rg[ pNames[ 2 ] ];
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = lp.decEnd;
        });

        ///makes first few free-triangles living
        ///until the passing of the point f
        [
            ['S', 'B', 'c',],   //SBc
            ['S', 'C', 'd',],   //SCd
            ['S', 'D', 'e',],   //SDe
            ['S', 'E', 'f',],   //SEf
        ].forEach( pNames => {
            var rgElem = ssF.namesArr_2_svgpoly(
                pNames,
                '', //'theor1proof theor2proof tofill theor2corollary '
                null,
                !!'undisplay',
                !'tostroke',
            );
            var pn = pNames.join('');
            rg[pn].decEnd = rg.f.decEnd;
        });
    }

    function acceleratingArea_2_rg8media(){
        [
            ['S', 'B', 'Caracc',],  //SBCaracc
        ].forEach( pNames => {
            var rgElem = ssF.namesArr_2_svgpoly(
                pNames,
                'theor2corollary tofill',
                null,
                !!'undisplay',
                !'tostroke',
            );
            var lp = rg[ pNames[ pNames.length-1 ] ];
            decor[ rgElem.pname ] = rgElem;
            rgElem.decStart = lp.decStart;
            rgElem.decEnd = lp.decEnd;
        });
    }
})();