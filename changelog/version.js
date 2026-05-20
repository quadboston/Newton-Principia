( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    fapp.version = '0.9.1'; //application version

	// //\\ updated automatically. Don't edit this string.
    fapp.buildDateString = "2026-05-20"; //build date
    // \\// updated automatically. Don't edit this string.

    fapp.versionColor = 'Chartreuse'; //color for version display
}) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}