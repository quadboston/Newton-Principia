( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        topics.convert_lineFeed2htmlBreak = false;
        topics.topicDef =
        {
            ///do fill this map as desired,
            ///left side = text-link; right-side = array of topic's shapeId's, ...
            ///shapeId can be found in media-model.js


            'figure':
            { 
                    classQuery:'#baseAxis, #wallL, #polylineCurve,' +
                               ' .figure.areas__checkboxes-row, #figureInternalArea',
                    tfamily :'figure' //topicColor:'auto'
            },

            'base':
            {
                    classQuery:'#baseAxis',
                    tfamily :'figure'
            },

            'wall':
            {
                    classQuery:'#wallL',
                    tfamily :'figure'
            },

            'curve':
            { 
                    classQuery:'#polylineCurve, .ctrlPt',
                    tfamily :'figure' //topicColor:'auto'
            },

            'figure-area' :
            { 
                    classQuery:'#figureInternalArea',
                    tfamily :'figure'
            },

            'widthest-rectangular':{ 
                    //id:['widthest-rectangular'],
                    classQuery:'.proof-tag, .widthest-rectangular, .diffAmtm',
                    topicColor:'auto',
                    tfamily :'proof'
            },

            'circumscribed-rectangles':
            { 
                classQuery:'.circumscribed.rect, .circumscribed-tag, ' +
                           '.circumscribed.areas__checkboxes-row',
                topicColor:'auto'
            },

            //worked fine: 'inscribed-rectangles':{ id:[ 'inscribed-tag' ], classQuery:'.inscribed.rect',
            'inscribed-rectangles':
            { 
                classQuery:'.inscribed.rect, .inscribed.areas__checkboxes-row',
                topicColor:'auto'
            }
        };
    }


}) ();

