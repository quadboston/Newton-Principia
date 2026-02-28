{ window.b$l.apptree({}).fapp.lemmaConfig = function(){
    const sm = '../js/'; //physical system subapplication path
    return {
        codesList :
        [
            //todm: automate this list
            { src: sm + 'sconf.js' },
            { src: sm + 'init-model-parameters.js' },
            { src: sm + 'model-upcreate.js' },
            { src: sm + 'completes-sliders-creation.js' },
            { src: sm + 'media-upcreate.js' },
            { src: sm + 'main-legend.js' },
            { src: sm + 'amode8captures.js' },
            { src: sm + 'lib.js' },
            { src: sm + 'graph-array.js' },
        ],
        "contents-list" :
        [
            'txt/latin.txt',
            'txt/english.txt',
            'txt/addendum.txt',
        ],
        //optional additional reference html
        referencesForAllLemmaEssays : '',
    };
}}