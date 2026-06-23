
//https://stackoverflow.com/questions/415160/best-method-of-instantiating-an-xmlhttprequest-object
//It looks like MS started common way since IE7:
//  https://en.wikipedia.org/wiki/Ajax_(programming)#History
//  mdn: supported versions
( function () {
	var ns = window.b$l = window.b$l || {};
    ns.ajax = createAjaxFramework();
    return;



    

	function createAjaxFramework()
    {
		var ajy = {};
		var xml = null;
		if( typeof XMLHttpRequest === 'undefined' )
        {
            alert( 'no ajax available in the browser' );
            return;
        }
		xml = new XMLHttpRequest();
		if( xml.overrideMimeType )
		{
			xml.overrideMimeType('text/xml'); //for quirky FF or FireBug.
		}
		ajy.xml = xml;

		ajy.send = function ( ajaxURL, method, onchange, onerror )
		{
			var flag = true;
			method = method || 'GET';

			var onchangeWrap = function ( ajy ) 
			{
				if ( xml.readyState === 4 ) 
				{
					if( xml.status === 200 )
					{
						onchange( ajy );
					}else{
                        onerror && onerror( 'Ajax problems with URL ' +
                                 ajaxURL );
					}
				}
			};
			var request = function () 
			{
				try{ 
					xml.open( method, ajaxURL, flag );  
					xml.send( null );
				}catch ( e ) {	//	TODM
					//Give up.
					//xml.send(null);
				}
			};
			xml.onreadystatechange = function() { onchangeWrap( ajy ); };
			request();
		};    
        return ajy;
	}

})();
