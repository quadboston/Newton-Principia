( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
		let codeList, sm;
		if (window.location.href.includes('hyperbola')) {
			sm = '../../b1sec3prop12/js/';
			codeList =
				[
					{ src: 'hyperbola/sconf.js' },
					{ src: sm + 'model-customizer.js' },
					{ src: sm + 'completes-sliders-creation.js' },
					{ src: sm + 'amode8captures.js' },
				];
		} else if (window.location.href.includes('parabola')) {
			sm = '../../b1sec3prop12/js/';
			codeList =
				[
					{ src: 'parabola/sconf.js' },
					{ src: '../../b1sec3prop13/js/model-customizer.js' },
					{ src: sm + 'completes-sliders-creation.js' },
					{ src: sm + 'amode8captures.js' },
					{ src: 'parabola/main-legend.js' },
				];
		} else {
			sm = '../../b1sec3prop11/js/';
			codeList =
				[
					{ src: 'ellipse/sconf.js' },
				];
		}
		codeList.push({ src: sm + 'config-functions.js' });
		codeList.push({ src: sm + 'init-model-parameters.js' });
		codeList.push({ src: sm + 'model-upcreate.js' });
		return {		 
			codesList : codeList, 
			"contents-list" :
			[
				'txt/glossary.txt',
			],
		}
    }
}) ();
