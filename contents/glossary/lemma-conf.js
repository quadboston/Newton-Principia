( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
		if (window.location.href.includes('hyperbola')) {
			const sm = 'hyperbola/';
			return {
				codesList :
				[
					{ src: sm + 'sconf.js' },
					{ src: sm + 'config-functions.js' },
					{ src: sm + 'init-model-parameters.js' },
					{ src: sm + 'amode8captures.js' },
					{ src: sm + 'model-upcreate.js' },
					{ src: sm + 'media-upcreate.js' },
					{ src: sm + 'completes-sliders-creation.js' },
					{ src: sm + 'state-capturer.js' },
					{ src: '../../force-law-models/main-legend.js' },
				],
				"contents-list" :
				[
					'txt/glossary.txt',
				],
			};
		} else if (window.location.href.includes('parabola')) {
			const sm = 'hyperbola/';
			return {          
				codesList : [
					{ src: 'parabola/sconf.js' },
					{ src: 'parabola/model-upcreate.js' },
					{ src: sm + 'config-functions.js' },
					{ src: sm + 'init-model-parameters.js' },
					{ src: sm + 'amode8captures.js' },
					{ src: sm + 'media-upcreate.js' },
					{ src: sm + 'completes-sliders-creation.js' },
					{ src: sm + 'state-capturer.js' },
					{ src: '../../force-law-models/main-legend.js' },
				],
				"contents-list" : [
					'txt/glossary.txt',
				],
			};
		} else {
			var sm = 'ellipse/';
			return {
				codesList :
				[
					//todm: automate this list
					{ src: sm + 'sconf.js' },
					{ src: sm + 'config-functions.js' },
					{ src: sm + 'init-model-parameters.js' },
					{ src: sm + 'model-upcreate.js' },
					{ src: sm + 'media-upcreate.js' },
					{ src: sm + 'amode8captures.js' },
					{ src: '../../force-law-models/main-legend.js' },
				],
				"contents-list" :
				[
					'txt/glossary.txt',
				],
			};
		}
    }
}) ();
