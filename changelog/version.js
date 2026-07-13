( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};
    fapp.version = '0.9.6'; //application version
	fapp.versionColor = 'Chartreuse'; //color for version display

	// //\\ updated automatically. Don't edit this string.
    fapp.buildDateString = "2026-07-12"; //build date
    // \\// updated automatically. Don't edit this string.
 }) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}
