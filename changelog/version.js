( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 13859; //application version
    fapp.buildDateString = "2025-09-30"; //build date
    // \\// updated automatically. Don't edit these strings.

    fapp.versionColor = 'SkyBlue'; //color for version display
}) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}