( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 13540; //application version
    fapp.buildDateString = "2025-04-07"; //build date
    // \\// updated automatically. Don't edit these strings.

    }) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}