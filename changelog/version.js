( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 13658; //application version
    fapp.buildDateString = "2025-05-30"; //build date
    // \\// updated automatically. Don't edit these strings.

    fapp.versionColor = 'tan';
}) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}