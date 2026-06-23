(function(){
    const ns          = window.b$l        = window.b$l        || {};
    const fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 14035; //application version
    fapp.buildDateString = "2026-06-06"; //build date
    // \\// updated automatically. Don't edit these strings.

    })();

function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}
