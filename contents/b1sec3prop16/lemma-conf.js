( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig() {
        let pre = '../../b1sec3prop14/js/';
        return {       
            codesList : [
                { src: pre + 'sconf.js' },
            ],
            "contents-list" : [
                'txt/latin.txt',
                'txt/cohen.txt',
                'txt/addendum.txt',
            ],
            sappCodeReference : 'b1sec3prop12',
        };
    }
}) ();