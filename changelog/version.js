( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 13850; //application version
    fapp.buildDateString = "2025-08-05"; //build date
    // \\// updated automatically. Don't edit these strings.

    fapp.versionColor = 'purple'; //color for version display
}) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}