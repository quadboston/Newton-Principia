//note: $, `, \ must be escaped in text if any:
window.b$l.atree().ssD.lemma_book_text += `

*::*phenomena|english
{
  "menuCaption" : "Text",
  "logic_phaseCaption" : "Phenomena"
}
*..*
Friction is the force resisting the relative motion of solid surfaces, fluid layers, and material elements sliding or grinding against each other. Types of friction include dry, fluid, lubricated, skin, and internal – an incomplete list. <a target="_blank" href="https://en.wikipedia.org/wiki/Friction">[1]</a> <a target="_blank" href="https://www.britannica.com/science/friction">[2]</a>

*::*problem|english
{
  "menuCaption" : "Text",
  "logic_phaseCaption" : "Problem"
}
*..*

Given known dry friction coefficient ¦friction-k¦𝑘¦¦, body mass ¦mass¦m¦¦,
and acting force ¦applied-force¦F¦¦, find body's velocity
and path.

*::*solution|english
{
  "default" : "1",
  "menuCaption" : "Text",
  "logic_phaseCaption" : "Solution"
}
*..*


Gravity force on the body ¦Gv¦G¦¦=g¦mass¦m¦¦ compensates with
base reaction ¦Nv¦N¦¦=¦Gv¦G¦¦. Maximum possible dry friction
force absolute value is Qₘₐₓ = ¦friction-k¦𝑘¦¦<!-- -->¦Nv¦N¦¦.
<br><br>
When applied force ¦applied-force¦F¦¦ is less than Qₘₐₓ,
then friction ¦Qv¦Q¦¦ = ¦applied-force¦F¦¦,
and body is at rest.
<br><br>
When ¦applied-force¦F¦¦ > Qₘₐₓ, then friction ¦Qv¦Q¦¦ =
Qₘₐₓ and body moves.
<br><br>

Resulting force is ¦Rv¦R¦¦ = ¦applied-force¦F¦¦-¦Qv¦Q¦¦.
<br><br>

Accelleration is a = ¦Rv¦R¦¦/¦mass¦m¦¦ =
¦applied-force¦F¦¦/¦mass¦m¦¦ -
g¦friction-k¦𝑘¦¦.
<br><br>

Body's velocity and ¦borbit¦path r¦¦ at time ¦time¦t¦¦ are
<br><br>
<div style="text-align:center">

¦speed¦v¦¦ = a¦time¦t¦¦,   <br>
¦borbit¦r¦¦ = a¦time¦t¦¦²/2.

</div>
`;