( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 5; //application version
    fapp.buildDateString = "2026-02-12"; //build date
    // \\// updated automatically. Don't edit these strings.

    fapp.versionColor = 'SteelBlue'; //color for version display
}) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}