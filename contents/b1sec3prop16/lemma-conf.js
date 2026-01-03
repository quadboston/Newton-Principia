{ window.b$l.apptree({}).fapp.lemmaConfig = function(){
    const sm = '../js/'; //physical system subapplication path
    return {
        sappCodeReference : 'b1sec3prop12',
        codesList :
        [
            { src: sm + 'sconf.js' },
            { src: sm + 'amode8captures-decorator.js' },
            { src: sm + 'media-upcreate.js' },
        ],
        "contents-list" :
        [
            'txt/latin.txt',
            'txt/cohen.txt',
            'txt/addendum.txt',
        ],
        //optional additional reference html
        referencesForAllLemmaEssays : '',
    };
}}