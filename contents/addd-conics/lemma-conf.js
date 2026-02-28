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
            { src: sm + 'graph-array.js' },
            { src: sm + 'graph/creates-fw.js' },
            { src: sm + 'graph/methods.js' },
            { src: sm + 'makes-orbit.js' },
        ],
        "contents-list" :
        [
            'texts.content.txt',
        ],
        //optional additional reference html
        referencesForAllLemmaEssays : '',
    };
}};