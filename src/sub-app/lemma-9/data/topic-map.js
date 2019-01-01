( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp    = sn('sapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        //.if set to true, then all line-feeds in source script will be converted to <br>
        //.which may add up empty lines
        topics.convert_lineFeed2htmlBreak = !true;
        topics.topicDef =
        {
        ///do fill this map as desired,
        ///left side = text-link; right-side = array of topic's shapeId's, ...
        ///shapeId can be found in media-model.js

        point_A : { id:['point_A'], tfamily :'primary-curve' },
        point_B : { id:['point_B'], tfamily :'claim' },
        point_C : { id:['point_C'], tfamily :'claim' },

        point_d : { id:['point_d'], tfamily :'proof' },
        point_e : { id:['point_e'], tfamily :'proof' },
        point_f : { id:['point_f'], tfamily :'proof' },
        point_g : { id:['point_g'], tfamily :'proof' },
        point_b : { id:['point_b'], tfamily :'proof' },
        point_c : { id:['point_c'], tfamily :'proof' },

        ABC:{ id:['mainCurve'], tfamily :'primary-curve' },
        'ABC-controls':{ id:['pivotPoint1', 'pivotPoint2'], tfamily :'primary-curve' },
        Abc:{ id:['remoteCurve'], tfamily :'proof' },

        AD:{ id:['line_AD'], topicColor:'auto' },
        AE:{ id:['line_AE'], topicColor:'auto' },
        Ad:{ id:['line_Ad'], topicColor:'auto' },
        Ae:{ id:
            [
                'line_Ae', 'legend-model-linear-unit', 'number-model-linear-unit'
            ],
            topicColor:'auto'
        },
        Ag:{ id:['line_Ag'], topicColor:'auto' },

        AC:{ id:['line_AC'], topicColor:'auto' },
        AB:{ id:['line_AB'], topicColor:'auto' },
        Ab:{ id:['line_Ab'], topicColor:'auto' },
        Ac:{ id:['line_Ac'], topicColor:'auto' },

        BD:{ id:['line_DB'], topicColor:'auto' },
        DB:{ id:['line_DB'], topicColor:'auto' },
        EC:{ id:['line_EC'], topicColor:'auto' },
        ec:{ id:['line_ec'], topicColor:'auto' },
        db:{ id:['line_db'], topicColor:'auto' },

        ABD:{ id:['area-ABD', 'legend-ABD', 'number-ABD'], tfamily :'claim' },

        ACE:{ id:['area-ACE', 'legend-ACE', 'number-ACE'], tfamily :'claim' },
        ABDPerACE:{ 
            id:
            [
                'legend-ABDPerACE',
                'number-ABDPerACE',
                'claim-legend-ABDPerACE',
                'claim-number-ABDPerACE'
            ],
            tfamily :'claim'
        },

        Abd:{ id:['area-Abd', 'legend-Abd', 'number-Abd'], topicColor:'auto' },
        Ace:{ id:['area-Ace', 'legend-Ace', 'number-Ace'], topicColor:'auto' },
        AbdPerAce:
        {   id:
            [
                  'legend-AbdPerAce', 'number-AbdPerAce'
            ],
            //topicColor:'auto'
            tfamily :'claim'
        },

        //:linear areas
        Afd:{ id:['Afd','number-Afd','legend-Afd'], topicColor:'auto' },
        Age:{ id:
                [ 'Age','number-Age','legend-Age'
                ],
                topicColor:'auto'
            },

        AD2AE:
        {   id:
            [   'legend-AD2PerAE2','number-AD2PerAE2',
                'claim-legend-AD2PerAE2', 'claim-number-AD2PerAE2'
            ],
            topicColor:'#006688'
        }

        //AGE: { tfamily :'claim' }
    };}


}) ();

