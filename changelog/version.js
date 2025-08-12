( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 13911; //application version
    fapp.buildDateString = "2025-08-12"; //build date
    // \\// updated automatically. Don't edit these strings.

    }) ();


function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}