( function() {
    var {
        ns,
        nsmethods,
    } = window.b$l.nstree();
    nsmethods.calculates_virtualReactantNeutralizationEvolution =
              calculates_virtualReactantNeutralizationEvolution;

    var ZERO_PROTECTOR = 1e-100;
    return;







    ///processes mix of acid and base
    function calculates_virtualReactantNeutralizationEvolution({
        CALCULATION_STEPS,
        title,  //reactants caption decoration
        A,      //reactantDissociationConstants, //[]
        B,      //reactantDissociationConstants, //[]
        W,      //waterDissiciationConstant,     //10⁻ⁱ⁴ usually
        a,      //"acid" concentration

        nonDryTitrant_flag,
            //optional options for nonDryTitrant_flag
            aV,
            bConcentration  //titrant concentration
    }){
        var n = A.length;      //acid "valency, proticy"
        var m = B.length;      //base "valency, proticy"

        //to cover possibly all in the start of b and end of b
        var RANGE_SAFETY_INCREASE = 1; //5;

        var Xmin        = W/a/RANGE_SAFETY_INCREASE;
        var Xmax        = a * RANGE_SAFETY_INCREASE;
        var lXmin       = Math.log10( Xmin );
        var lXmax       = Math.log10( Xmax );
        var evolStep    = ( lXmax - lXmin ) / CALCULATION_STEPS;
        
        var xArray      = [];
        var aArray      = [];
        var evolution   = [];
        var initialY    = null; //this is only from water
        aV = aV || 1;
        var solutionVolume = aV;

        for( var eIx = 0; eIx <= CALCULATION_STEPS; eIx++ ) {
            var lX = lXmax - evolStep * eIx;
            var x = Math.pow( 10, lX );

            var dilutedConcent_a = nonDryTitrant_flag ? a * aV / solutionVolume :  a;
            ///processes acid
            var acidEv = calculates_neutralizationStep({
                x,
                A,
                a : dilutedConcent_a,
            });

            var y = acidEv.y = W/x;

            ///processes base
            var baseEv = calculates_neutralizationStep({
                x : y,
                A : B,
                a : 1,  //a is unknown here, taken 1 and
                        //resceled later from acid
            });
            var delta = x - y;

            var bq  = ( acidEv.aq - delta );
            //todo: how come bq = -1e-10 < 0, why "float" error even happened?
            if( bq < 0 ) {
                ////unclarified place in algo
                if( evolution.length && evolution.length < 3 ) {
                    ccc( '**** non-inversible function? st=' + eIx + ' aq ' + 
                         'acidEv.aq.toFixed(5) ' + ' < d=' +
                         delta.toFixed(5) +
                         '=(x-y)=' + x.toFixed(5) + '-' + y.toFixed(5) +
                         ' bq = ' + bq
                    );
                }
                continue;
            }
            if( initialY === null ) {
                initialY = y;
                initiallyDissociatedWater_moles = y * solutionVolume;
            }

            //-----------------------------------------
            // //\\ rescales base taking
            //-----------------------------------------
            //      base charge from acid charge aq
            var b       = bq / baseEv.aq;
            var bi      = [];
            var lgBi    = [];
            for( var Bix = 0; Bix <= m; Bix++ ) {
                var bii = baseEv.ai[ Bix ] * b; 
                bii = Math.max( ZERO_PROTECTOR, bii );
                bi.push( bii );
                lgBi.push( Math.log10( bii ) );
            }
            //-----------------------------------------
            // \\// rescales base taking
            //-----------------------------------------


            //-----------------------------------------
            // //\\ renorming volume
            //-----------------------------------------
            var recombinatedWater_moles =
                    initiallyDissociatedWater_moles + bq*solutionVolume
                    - solutionVolume*y;
            var WATER_MOL_VOLUME = 18 / 1000; //in Litres/mole

            var recombinatedWater_volume = recombinatedWater_moles * WATER_MOL_VOLUME;
            ///prepares solution volume for the next step
            var bMoles = b * solutionVolume;
            if( nonDryTitrant_flag ) {
                var solutionVolume = aV + bMoles / bConcentration;
            }
            solutionVolume += recombinatedWater_volume;
            //-----------------------------------------
            // \\// renorming volume
            //-----------------------------------------


            //-----------------------------------------
            // //\\ builds an output API
            //-----------------------------------------
            acidEv.x            = x;
            acidEv.b            = b;
            acidEv.bi           = bi;
            acidEv.bq           = bq;
            acidEv.lgBi         = lgBi;
            acidEv.bMoles       = bMoles;

            acidEv.lgX          = Math.log10( x );
            acidEv.lgY          = Math.log10( acidEv.y ),
            acidEv.solutionVolume               = solutionVolume;
            acidEv.recombinatedWater_moles      =
                    Math.max( ZERO_PROTECTOR, recombinatedWater_moles );
            evolution.push      ( acidEv );
            //-----------------------------------------
            // \\// builds an output API
            //-----------------------------------------
        }
        var ret = {
            evolution,
            initialY,
        };
        //ccc( ret );
        return ret;
    }



    ///for clarity, it is assumed to be an acid, but
    ///works and used "exactly the same" for base
    function calculates_neutralizationStep({
        x,      //hydrogen iones given concentration,
        A,      //reactantDissociationConstants, //[]
        a,      //reactant moles, imagine acid
        n,      //"valency, proticy"
    }){
        var n           = A.length;
        var a0_2_ai     = 1;
        var a0_2_ai_arr = [ a0_2_ai ];
        var a0Coeff     = a0_2_ai;
        var x1          = 1/x;
        for( var level = 1; level <= n; level++ ) {
            a0_2_ai *= A[ level-1 ] * x1;
            a0_2_ai_arr.push( a0_2_ai );
            a0Coeff += a0_2_ai;
        }
        var a0 = Math.max( ZERO_PROTECTOR, a/a0Coeff );
        var ai = [];
        var lgAi = []; //sugar for speed
        
        for( var level = 0; level <= n; level++ ) {
            ai[ level ] = a0 * a0_2_ai_arr[ level ];
            ai[ level ] = Math.max( ZERO_PROTECTOR, ai[ level ] );
            lgAi[ level ] = Math.log10( ai[ level ] ); 
        }
        var aq = 0; //total charge of dissociated anions = charge of H
        for( var level = 1; level <= n; level++ ) {
            aq += ai[ level ] * level;
        }
        var res = {
            ai,     //antion concentrations
            aq,
            lgAi,   //decoration
        };
        return res;
    }

}) ();

