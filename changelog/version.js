( function() {
    var ns          = window.b$l        = window.b$l        || {};
    var fapp        = ns.fapp           = ns.fapp           || {};

    // //\\ updated automatically. Don't edit these strings.
    fapp.version = 13459; //application version
    fapp.buildDateString = "2025-03-09"; //build date
    // \\// updated automatically. Don't edit these strings.

    }) ();

function showChangeLog() {
    const converter = new showdown.Converter();
    fetch("changelog/changelog.md", {cache: "reload"})
        .then((response) => response.text())
        .then((text) => {
            const tab = window.open('', '_blank');
            if (tab) {
                tab.document.body.innerHTML = converter.makeHtml(text);
            } else {
                console.error("Failed to open a new tab.");
            }
   }).catch((e) => console.error(e));
}

function decryptEmail(encoded) {
    window.location.href = "mailto:" + atob(encoded);
}