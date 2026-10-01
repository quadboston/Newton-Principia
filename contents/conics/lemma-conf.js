( function() {
    window.b$l.apptree({}).fapp.lemmaConfig = lemmaConfig;    
    return;

    function lemmaConfig()
    {
		if (window.location.href.includes('hyperbola')) {
			const sm = '../../glossary/js/hyperbola/';
			return {
				codesList :
				[
					{ src: sm + 'sconf.js' },
					{ src: '../../b1sec3prop12/js/model-upcreate.js' },
					{ src: '../../b1sec3prop12/js/model-customizer.js' },
					{ src: sm + 'config-functions.js' },
					{ src: sm + 'init-model-parameters.js' },
					{ src: sm + 'amode8captures.js' },
					{ src: sm + 'media-upcreate.js' },
					{ src: sm + 'completes-sliders-creation.js' },
					{ src: sm + 'state-capturer.js' },
				],
				"contents-list" :
				[
					'txt/conics.txt',
				],
			};
		} else if (window.location.href.includes('parabola')) {
			const sm = '../../glossary/js/hyperbola/';
			return {          
				codesList : [
					{ src: '../../glossary/js/parabola/sconf.js' },
					{ src: '../../b1sec3prop12/js/model-upcreate.js' },
					{ src: '../../b1sec3prop13/js/model-customizer.js' },
					{ src: sm + 'config-functions.js' },
					{ src: sm + 'init-model-parameters.js' },
					{ src: sm + 'amode8captures.js' },
					{ src: sm + 'media-upcreate.js' },
					{ src: sm + 'completes-sliders-creation.js' },
					{ src: sm + 'state-capturer.js' },
				],
				"contents-list" : [
					'txt/conics.txt',
				],
			};
		} else {
			var sm = '../../glossary/js/ellipse/'; //study model path
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
				],
				"contents-list" :
				[
					'txt/conics.txt',
				],
			};
		}
    }
}) ();
