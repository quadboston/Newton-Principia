( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var nsmethods     = sn('methods');

    nsmethods.loadAjaxFiles = loadAjaxFiles;
    //000000000000000000000000000000
    return;
    //000000000000000000000000000000







    //===============================================================================
    // //\\ microAPI to load list of files
    //===============================================================================
    function loadAjaxFiles( filesList, lastCb )
    {
        var completionCount = 0;
        var loadedFiles = [];
        var loadedFilesById = {};

        filesList.forEach( function( fileItem, ix ) {

            var xml = new XMLHttpRequest();
			try{ 
				xml.open( 'GET', fileItem.link, true );  
				xml.send( null );
			    xml.onreadystatechange = processIfGood;
			}catch ( e ) {	//	TODM
				//Give up.
                completionCount++;
                checkCompletion( fileItem );
			}
            function processIfGood()
            {
				if ( xml.readyState === 4 ) 
				{
					if( xml.status === 200 )
					{
						fileOnLoad();
					} else {
                        //Give up.
                        completionCount++;
                        checkCompletion( fileItem );
                        //onerror && onerror( 'Ajax problems with URL ' +
                        //         ajaxURL );
					}
				}
            }

            function fileOnLoad()
            {
                var loadedItem = { text:xml.responseText, fileItem:fileItem };
                //ccc( 'success: ', loadedItem );
                loadedFiles.push( loadedItem );
                if( fileItem.id ) {
                    loadedFilesById[ fileItem.id ] = loadedItem;
                }
                completionCount++;
                //ccc( completionCount + ' loaded ' + fileItem.src );
                fileItem.cb && fileItem.cb( loadedItem );
                checkCompletion( fileItem );
            }
        });
        return; //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr

        function checkCompletion( fileItem )
        {
            if( completionCount === filesList.length ) {
                lastCb && lastCb( loadedFilesById, loadedFiles );
            }
        }
    }
    //===============================================================================
    // \\// microAPI to load list of files
    //===============================================================================

}) ();

