( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 4; //application version
    fapp.buildDateString = "2026-01-11"; //build date
    // \\// updated automatically. Don't edit these strings.

    fapp.versionColor = 'Silver'; //color for version display
}) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}