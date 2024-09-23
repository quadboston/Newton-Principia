
EXAMPLE and INSTRUCTIONS

*::*claim|english
{
  "default" : "1",
  "menuCaption" : "English"
}
*..*
<!-- to set "text-keywords match (i.e. Meta parsing)",
     do add sconf.insertDelayedBatch = true

    //\\ Meta parsing
    Meta parsing block can be inserted in any essay and has
    global effect on all lemma's essays.
    Meta parsing is a text preporcessor.
    Meta parsing spawns key-phrases by finding "caption-key" in texts.
            (for depth, see JS-source code in FR-II-dom8css---lib.js
                   //these subs are the KINGs of processing the Book:
                   //  doesInsertSiteHTMLMacros( fragBody_raw )
                   //  insertDelayedBatch( fragBody_raw )
                   //fragBody_raw = UTF-string of minimal(i.e. atomic)
                   //Book-text-fragment
            )
    Batch key-phrases: |paint-keys|caption-key|||
    meta parsing goes before parsing,
    1) caption-key must have no reserved reg-ex-chars: [ ] { } ( ) \ ^ $ . | ? * +
    2) no shared dividors in ajacent key-phrases,
       f.e. in text "...ABFD XXX ..." won't work for controls
            |v2graph VSarea|ABFD| |some|XXX|| because space between ABFD and XXX will be used by ABFD,
            (do double space in this example,)
    3) caption-key is separated with spacers and with \n \r [ ] ( ) { } + . * - , It is not separated with "¦".
       caption-key must be not caught inside of key-phrases already existing in text,
       Not like this: |MM ABFD MM|some ABFD some||. This will insert "ABFD" inside other key-phrase and
       corrupt parser.
       a) To disable caption-key inside other caption-key,
       neutral solid can be appended to it like for example in empty html comment: |..|... ABFD‹!--  --›...||
       b) To disable caption-key inside paint-keys,
       attach solid character "/" to caption-key to separate it |some/ABFD..|some||.
       (Separator between paint-keys can be any string of spacers and "/"s.)
-->
¦D¦¦¦
¦C¦¦¦
¦IZ Zgraph¦Z¦¦¦
¦DF¦¦¦
¦Tarea¦VD𝑏𝑎¦¦¦
¦IZ¦v<sub>⟂</sub>¦¦¦
¦Z2graph¦v<sub>⟂</sub>²¦¦¦
¦v2graph VSarea¦v²¦¦¦
<!-- \\// Meta parsing -->
