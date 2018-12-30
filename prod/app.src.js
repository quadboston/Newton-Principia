/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(e,t){"use strict";var n=[],r=e.document,i=Object.getPrototypeOf,o=n.slice,a=n.concat,s=n.push,u=n.indexOf,l={},c=l.toString,f=l.hasOwnProperty,p=f.toString,d=p.call(Object),h={},g=function e(t){return"function"==typeof t&&"number"!=typeof t.nodeType},y=function e(t){return null!=t&&t===t.window},v={type:!0,src:!0,noModule:!0};function m(e,t,n){var i,o=(t=t||r).createElement("script");if(o.text=e,n)for(i in v)n[i]&&(o[i]=n[i]);t.head.appendChild(o).parentNode.removeChild(o)}function x(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[c.call(e)]||"object":typeof e}var b="3.3.1",w=function(e,t){return new w.fn.init(e,t)},T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;w.fn=w.prototype={jquery:"3.3.1",constructor:w,length:0,toArray:function(){return o.call(this)},get:function(e){return null==e?o.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=w.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return w.each(this,e)},map:function(e){return this.pushStack(w.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(o.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:s,sort:n.sort,splice:n.splice},w.extend=w.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||g(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)n=a[t],a!==(r=e[t])&&(l&&r&&(w.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,o=n&&Array.isArray(n)?n:[]):o=n&&w.isPlainObject(n)?n:{},a[t]=w.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},w.extend({expando:"jQuery"+("3.3.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==c.call(e))&&(!(t=i(e))||"function"==typeof(n=f.call(t,"constructor")&&t.constructor)&&p.call(n)===d)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){m(e)},each:function(e,t){var n,r=0;if(C(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(C(Object(e))?w.merge(n,"string"==typeof e?[e]:e):s.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:u.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r,i=[],o=0,a=e.length,s=!n;o<a;o++)(r=!t(e[o],o))!==s&&i.push(e[o]);return i},map:function(e,t,n){var r,i,o=0,s=[];if(C(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&s.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&s.push(i);return a.apply([],s)},guid:1,support:h}),"function"==typeof Symbol&&(w.fn[Symbol.iterator]=n[Symbol.iterator]),w.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function C(e){var t=!!e&&"length"in e&&e.length,n=x(e);return!g(e)&&!y(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}var E=function(e){var t,n,r,i,o,a,s,u,l,c,f,p,d,h,g,y,v,m,x,b="sizzle"+1*new Date,w=e.document,T=0,C=0,E=ae(),k=ae(),S=ae(),D=function(e,t){return e===t&&(f=!0),0},N={}.hasOwnProperty,A=[],j=A.pop,q=A.push,L=A.push,H=A.slice,O=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},P="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",I="\\["+M+"*("+R+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+R+"))|)"+M+"*\\]",W=":("+R+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+I+")*)|.*)\\)|)",$=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),F=new RegExp("^"+M+"*,"+M+"*"),_=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),z=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),X=new RegExp(W),U=new RegExp("^"+R+"$"),V={ID:new RegExp("^#("+R+")"),CLASS:new RegExp("^\\.("+R+")"),TAG:new RegExp("^("+R+"|[*])"),ATTR:new RegExp("^"+I),PSEUDO:new RegExp("^"+W),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+P+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},G=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Q=/^[^{]+\{\s*\[native \w/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,K=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ee=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ne=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},re=function(){p()},ie=me(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{L.apply(A=H.call(w.childNodes),w.childNodes),A[w.childNodes.length].nodeType}catch(e){L={apply:A.length?function(e,t){q.apply(e,H.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function oe(e,t,r,i){var o,s,l,c,f,h,v,m=t&&t.ownerDocument,T=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==T&&9!==T&&11!==T)return r;if(!i&&((t?t.ownerDocument||t:w)!==d&&p(t),t=t||d,g)){if(11!==T&&(f=J.exec(e)))if(o=f[1]){if(9===T){if(!(l=t.getElementById(o)))return r;if(l.id===o)return r.push(l),r}else if(m&&(l=m.getElementById(o))&&x(t,l)&&l.id===o)return r.push(l),r}else{if(f[2])return L.apply(r,t.getElementsByTagName(e)),r;if((o=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return L.apply(r,t.getElementsByClassName(o)),r}if(n.qsa&&!S[e+" "]&&(!y||!y.test(e))){if(1!==T)m=t,v=e;else if("object"!==t.nodeName.toLowerCase()){(c=t.getAttribute("id"))?c=c.replace(te,ne):t.setAttribute("id",c=b),s=(h=a(e)).length;while(s--)h[s]="#"+c+" "+ve(h[s]);v=h.join(","),m=K.test(e)&&ge(t.parentNode)||t}if(v)try{return L.apply(r,m.querySelectorAll(v)),r}catch(e){}finally{c===b&&t.removeAttribute("id")}}}return u(e.replace(B,"$1"),t,r,i)}function ae(){var e=[];function t(n,i){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=i}return t}function se(e){return e[b]=!0,e}function ue(e){var t=d.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){var n=e.split("|"),i=n.length;while(i--)r.attrHandle[n[i]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function pe(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function de(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&ie(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function he(e){return se(function(t){return t=+t,se(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}function ge(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}n=oe.support={},o=oe.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},p=oe.setDocument=function(e){var t,i,a=e?e.ownerDocument||e:w;return a!==d&&9===a.nodeType&&a.documentElement?(d=a,h=d.documentElement,g=!o(d),w!==d&&(i=d.defaultView)&&i.top!==i&&(i.addEventListener?i.addEventListener("unload",re,!1):i.attachEvent&&i.attachEvent("onunload",re)),n.attributes=ue(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ue(function(e){return e.appendChild(d.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=Q.test(d.getElementsByClassName),n.getById=ue(function(e){return h.appendChild(e).id=b,!d.getElementsByName||!d.getElementsByName(b).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&g){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},r.find.CLASS=n.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&g)return t.getElementsByClassName(e)},v=[],y=[],(n.qsa=Q.test(d.querySelectorAll))&&(ue(function(e){h.appendChild(e).innerHTML="<a id='"+b+"'></a><select id='"+b+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+M+"*(?:value|"+P+")"),e.querySelectorAll("[id~="+b+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+b+"+*").length||y.push(".#.+[+~]")}),ue(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=d.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),h.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=Q.test(m=h.matches||h.webkitMatchesSelector||h.mozMatchesSelector||h.oMatchesSelector||h.msMatchesSelector))&&ue(function(e){n.disconnectedMatch=m.call(e,"*"),m.call(e,"[s!='']:x"),v.push("!=",W)}),y=y.length&&new RegExp(y.join("|")),v=v.length&&new RegExp(v.join("|")),t=Q.test(h.compareDocumentPosition),x=t||Q.test(h.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===d||e.ownerDocument===w&&x(w,e)?-1:t===d||t.ownerDocument===w&&x(w,t)?1:c?O(c,e)-O(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===d?-1:t===d?1:i?-1:o?1:c?O(c,e)-O(c,t):0;if(i===o)return ce(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?ce(a[r],s[r]):a[r]===w?-1:s[r]===w?1:0},d):d},oe.matches=function(e,t){return oe(e,null,null,t)},oe.matchesSelector=function(e,t){if((e.ownerDocument||e)!==d&&p(e),t=t.replace(z,"='$1']"),n.matchesSelector&&g&&!S[t+" "]&&(!v||!v.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return oe(t,d,null,[e]).length>0},oe.contains=function(e,t){return(e.ownerDocument||e)!==d&&p(e),x(e,t)},oe.attr=function(e,t){(e.ownerDocument||e)!==d&&p(e);var i=r.attrHandle[t.toLowerCase()],o=i&&N.call(r.attrHandle,t.toLowerCase())?i(e,t,!g):void 0;return void 0!==o?o:n.attributes||!g?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null},oe.escape=function(e){return(e+"").replace(te,ne)},oe.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},oe.uniqueSort=function(e){var t,r=[],i=0,o=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(D),f){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return c=null,e},i=oe.getText=function(e){var t,n="",r=0,o=e.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=i(e)}else if(3===o||4===o)return e.nodeValue}else while(t=e[r++])n+=i(t);return n},(r=oe.selectors={cacheLength:50,createPseudo:se,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||"").replace(Z,ee),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||oe.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&oe.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return V.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=E[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&E(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=oe.attr(r,e);return null==i?"!="===t:!t||(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i.replace($," ")+" ").indexOf(n)>-1:"|="===t&&(i===n||i.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,f,p,d,h,g=o!==a?"nextSibling":"previousSibling",y=t.parentNode,v=s&&t.nodeName.toLowerCase(),m=!u&&!s,x=!1;if(y){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===v:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?y.firstChild:y.lastChild],a&&m){x=(d=(l=(c=(f=(p=y)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1])&&l[2],p=d&&y.childNodes[d];while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if(1===p.nodeType&&++x&&p===t){c[e]=[T,d,x];break}}else if(m&&(x=d=(l=(c=(f=(p=t)[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]||[])[0]===T&&l[1]),!1===x)while(p=++d&&p&&p[g]||(x=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===v:1===p.nodeType)&&++x&&(m&&((c=(f=p[b]||(p[b]={}))[p.uniqueID]||(f[p.uniqueID]={}))[e]=[T,x]),p===t))break;return(x-=i)===r||x%r==0&&x/r>=0}}},PSEUDO:function(e,t){var n,i=r.pseudos[e]||r.setFilters[e.toLowerCase()]||oe.error("unsupported pseudo: "+e);return i[b]?i(t):i.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?se(function(e,n){var r,o=i(e,t),a=o.length;while(a--)e[r=O(e,o[a])]=!(n[r]=o[a])}):function(e){return i(e,0,n)}):i}},pseudos:{not:se(function(e){var t=[],n=[],r=s(e.replace(B,"$1"));return r[b]?se(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),t[0]=null,!n.pop()}}),has:se(function(e){return function(t){return oe(e,t).length>0}}),contains:se(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||i(t)).indexOf(e)>-1}}),lang:se(function(e){return U.test(e||"")||oe.error("unsupported lang: "+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=g?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===h},focus:function(e){return e===d.activeElement&&(!d.hasFocus||d.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:de(!1),disabled:de(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return Y.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:he(function(){return[0]}),last:he(function(e,t){return[t-1]}),eq:he(function(e,t,n){return[n<0?n+t:n]}),even:he(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:he(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:he(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:he(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=pe(t);function ye(){}ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=oe.tokenize=function(e,t){var n,i,o,a,s,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=r.preFilter;while(s){n&&!(i=F.exec(s))||(i&&(s=s.slice(i[0].length)||s),u.push(o=[])),n=!1,(i=_.exec(s))&&(n=i.shift(),o.push({value:n,type:i[0].replace(B," ")}),s=s.slice(n.length));for(a in r.filter)!(i=V[a].exec(s))||l[a]&&!(i=l[a](i))||(n=i.shift(),o.push({value:n,type:a,matches:i}),s=s.slice(n.length));if(!n)break}return t?s.length:s?oe.error(e):k(e,u).slice(0)};function ve(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,i=t.next,o=i||r,a=n&&"parentNode"===o,s=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||a)return e(t,n,i);return!1}:function(t,n,u){var l,c,f,p=[T,s];if(u){while(t=t[r])if((1===t.nodeType||a)&&e(t,n,u))return!0}else while(t=t[r])if(1===t.nodeType||a)if(f=t[b]||(t[b]={}),c=f[t.uniqueID]||(f[t.uniqueID]={}),i&&i===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[o])&&l[0]===T&&l[1]===s)return p[2]=l[2];if(c[o]=p,p[2]=e(t,n,u))return!0}return!1}}function xe(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function be(e,t,n){for(var r=0,i=t.length;r<i;r++)oe(e,t[r],n);return n}function we(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Te(e,t,n,r,i,o){return r&&!r[b]&&(r=Te(r)),i&&!i[b]&&(i=Te(i,o)),se(function(o,a,s,u){var l,c,f,p=[],d=[],h=a.length,g=o||be(t||"*",s.nodeType?[s]:s,[]),y=!e||!o&&t?g:we(g,p,e,s,u),v=n?i||(o?e:h||r)?[]:a:y;if(n&&n(y,v,s,u),r){l=we(v,d),r(l,[],s,u),c=l.length;while(c--)(f=l[c])&&(v[d[c]]=!(y[d[c]]=f))}if(o){if(i||e){if(i){l=[],c=v.length;while(c--)(f=v[c])&&l.push(y[c]=f);i(null,v=[],l,u)}c=v.length;while(c--)(f=v[c])&&(l=i?O(o,f):p[c])>-1&&(o[l]=!(a[l]=f))}}else v=we(v===a?v.splice(h,v.length):v),i?i(null,a,v,u):L.apply(a,v)})}function Ce(e){for(var t,n,i,o=e.length,a=r.relative[e[0].type],s=a||r.relative[" "],u=a?1:0,c=me(function(e){return e===t},s,!0),f=me(function(e){return O(t,e)>-1},s,!0),p=[function(e,n,r){var i=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,i}];u<o;u++)if(n=r.relative[e[u].type])p=[me(xe(p),n)];else{if((n=r.filter[e[u].type].apply(null,e[u].matches))[b]){for(i=++u;i<o;i++)if(r.relative[e[i].type])break;return Te(u>1&&xe(p),u>1&&ve(e.slice(0,u-1).concat({value:" "===e[u-2].type?"*":""})).replace(B,"$1"),n,u<i&&Ce(e.slice(u,i)),i<o&&Ce(e=e.slice(i)),i<o&&ve(e))}p.push(n)}return xe(p)}function Ee(e,t){var n=t.length>0,i=e.length>0,o=function(o,a,s,u,c){var f,h,y,v=0,m="0",x=o&&[],b=[],w=l,C=o||i&&r.find.TAG("*",c),E=T+=null==w?1:Math.random()||.1,k=C.length;for(c&&(l=a===d||a||c);m!==k&&null!=(f=C[m]);m++){if(i&&f){h=0,a||f.ownerDocument===d||(p(f),s=!g);while(y=e[h++])if(y(f,a||d,s)){u.push(f);break}c&&(T=E)}n&&((f=!y&&f)&&v--,o&&x.push(f))}if(v+=m,n&&m!==v){h=0;while(y=t[h++])y(x,b,a,s);if(o){if(v>0)while(m--)x[m]||b[m]||(b[m]=j.call(u));b=we(b)}L.apply(u,b),c&&!o&&b.length>0&&v+t.length>1&&oe.uniqueSort(u)}return c&&(T=E,l=w),x};return n?se(o):o}return s=oe.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=a(e)),n=t.length;while(n--)(o=Ce(t[n]))[b]?r.push(o):i.push(o);(o=S(e,Ee(i,r))).selector=e}return o},u=oe.select=function(e,t,n,i){var o,u,l,c,f,p="function"==typeof e&&e,d=!i&&a(e=p.selector||e);if(n=n||[],1===d.length){if((u=d[0]=d[0].slice(0)).length>2&&"ID"===(l=u[0]).type&&9===t.nodeType&&g&&r.relative[u[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;p&&(t=t.parentNode),e=e.slice(u.shift().value.length)}o=V.needsContext.test(e)?0:u.length;while(o--){if(l=u[o],r.relative[c=l.type])break;if((f=r.find[c])&&(i=f(l.matches[0].replace(Z,ee),K.test(u[0].type)&&ge(t.parentNode)||t))){if(u.splice(o,1),!(e=i.length&&ve(u)))return L.apply(n,i),n;break}}}return(p||s(e,d))(i,t,!g,n,!t||K.test(e)&&ge(t.parentNode)||t),n},n.sortStable=b.split("").sort(D).join("")===b,n.detectDuplicates=!!f,p(),n.sortDetached=ue(function(e){return 1&e.compareDocumentPosition(d.createElement("fieldset"))}),ue(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ue(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||le("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ue(function(e){return null==e.getAttribute("disabled")})||le(P,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),oe}(e);w.find=E,w.expr=E.selectors,w.expr[":"]=w.expr.pseudos,w.uniqueSort=w.unique=E.uniqueSort,w.text=E.getText,w.isXMLDoc=E.isXML,w.contains=E.contains,w.escapeSelector=E.escape;var k=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&w(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},D=w.expr.match.needsContext;function N(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var A=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,t,n){return g(t)?w.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?w.grep(e,function(e){return e===t!==n}):"string"!=typeof t?w.grep(e,function(e){return u.call(t,e)>-1!==n}):w.filter(t,e,n)}w.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?w.find.matchesSelector(r,e)?[r]:[]:w.find.matches(e,w.grep(t,function(e){return 1===e.nodeType}))},w.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(w(e).filter(function(){for(t=0;t<r;t++)if(w.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)w.find(e,i[t],n);return r>1?w.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&D.test(e)?w(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(w.fn.init=function(e,t,n){var i,o;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(i="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!i[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(i[1]){if(t=t instanceof w?t[0]:t,w.merge(this,w.parseHTML(i[1],t&&t.nodeType?t.ownerDocument||t:r,!0)),A.test(i[1])&&w.isPlainObject(t))for(i in t)g(this[i])?this[i](t[i]):this.attr(i,t[i]);return this}return(o=r.getElementById(i[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):g(e)?void 0!==n.ready?n.ready(e):e(w):w.makeArray(e,this)}).prototype=w.fn,q=w(r);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};w.fn.extend({has:function(e){var t=w(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(w.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&w(e);if(!D.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&w.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(o.length>1?w.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?u.call(w(e),this[0]):u.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(w.uniqueSort(w.merge(this.get(),w(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}w.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return k(e,"parentNode")},parentsUntil:function(e,t,n){return k(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return k(e,"nextSibling")},prevAll:function(e){return k(e,"previousSibling")},nextUntil:function(e,t,n){return k(e,"nextSibling",n)},prevUntil:function(e,t,n){return k(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return N(e,"iframe")?e.contentDocument:(N(e,"template")&&(e=e.content||e),w.merge([],e.childNodes))}},function(e,t){w.fn[e]=function(n,r){var i=w.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=w.filter(r,i)),this.length>1&&(O[e]||w.uniqueSort(i),H.test(e)&&i.reverse()),this.pushStack(i)}});var M=/[^\x20\t\r\n\f]+/g;function R(e){var t={};return w.each(e.match(M)||[],function(e,n){t[n]=!0}),t}w.Callbacks=function(e){e="string"==typeof e?R(e):w.extend({},e);var t,n,r,i,o=[],a=[],s=-1,u=function(){for(i=i||e.once,r=t=!0;a.length;s=-1){n=a.shift();while(++s<o.length)!1===o[s].apply(n[0],n[1])&&e.stopOnFalse&&(s=o.length,n=!1)}e.memory||(n=!1),t=!1,i&&(o=n?[]:"")},l={add:function(){return o&&(n&&!t&&(s=o.length-1,a.push(n)),function t(n){w.each(n,function(n,r){g(r)?e.unique&&l.has(r)||o.push(r):r&&r.length&&"string"!==x(r)&&t(r)})}(arguments),n&&!t&&u()),this},remove:function(){return w.each(arguments,function(e,t){var n;while((n=w.inArray(t,o,n))>-1)o.splice(n,1),n<=s&&s--}),this},has:function(e){return e?w.inArray(e,o)>-1:o.length>0},empty:function(){return o&&(o=[]),this},disable:function(){return i=a=[],o=n="",this},disabled:function(){return!o},lock:function(){return i=a=[],n||t||(o=n=""),this},locked:function(){return!!i},fireWith:function(e,n){return i||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||u()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l};function I(e){return e}function W(e){throw e}function $(e,t,n,r){var i;try{e&&g(i=e.promise)?i.call(e).done(t).fail(n):e&&g(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}w.extend({Deferred:function(t){var n=[["notify","progress",w.Callbacks("memory"),w.Callbacks("memory"),2],["resolve","done",w.Callbacks("once memory"),w.Callbacks("once memory"),0,"resolved"],["reject","fail",w.Callbacks("once memory"),w.Callbacks("once memory"),1,"rejected"]],r="pending",i={state:function(){return r},always:function(){return o.done(arguments).fail(arguments),this},"catch":function(e){return i.then(null,e)},pipe:function(){var e=arguments;return w.Deferred(function(t){w.each(n,function(n,r){var i=g(e[r[4]])&&e[r[4]];o[r[1]](function(){var e=i&&i.apply(this,arguments);e&&g(e.promise)?e.promise().progress(t.notify).done(t.resolve).fail(t.reject):t[r[0]+"With"](this,i?[e]:arguments)})}),e=null}).promise()},then:function(t,r,i){var o=0;function a(t,n,r,i){return function(){var s=this,u=arguments,l=function(){var e,l;if(!(t<o)){if((e=r.apply(s,u))===n.promise())throw new TypeError("Thenable self-resolution");l=e&&("object"==typeof e||"function"==typeof e)&&e.then,g(l)?i?l.call(e,a(o,n,I,i),a(o,n,W,i)):(o++,l.call(e,a(o,n,I,i),a(o,n,W,i),a(o,n,I,n.notifyWith))):(r!==I&&(s=void 0,u=[e]),(i||n.resolveWith)(s,u))}},c=i?l:function(){try{l()}catch(e){w.Deferred.exceptionHook&&w.Deferred.exceptionHook(e,c.stackTrace),t+1>=o&&(r!==W&&(s=void 0,u=[e]),n.rejectWith(s,u))}};t?c():(w.Deferred.getStackHook&&(c.stackTrace=w.Deferred.getStackHook()),e.setTimeout(c))}}return w.Deferred(function(e){n[0][3].add(a(0,e,g(i)?i:I,e.notifyWith)),n[1][3].add(a(0,e,g(t)?t:I)),n[2][3].add(a(0,e,g(r)?r:W))}).promise()},promise:function(e){return null!=e?w.extend(e,i):i}},o={};return w.each(n,function(e,t){var a=t[2],s=t[5];i[t[1]]=a.add,s&&a.add(function(){r=s},n[3-e][2].disable,n[3-e][3].disable,n[0][2].lock,n[0][3].lock),a.add(t[3].fire),o[t[0]]=function(){return o[t[0]+"With"](this===o?void 0:this,arguments),this},o[t[0]+"With"]=a.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(e){var t=arguments.length,n=t,r=Array(n),i=o.call(arguments),a=w.Deferred(),s=function(e){return function(n){r[e]=this,i[e]=arguments.length>1?o.call(arguments):n,--t||a.resolveWith(r,i)}};if(t<=1&&($(e,a.done(s(n)).resolve,a.reject,!t),"pending"===a.state()||g(i[n]&&i[n].then)))return a.then();while(n--)$(i[n],s(n),a.reject);return a.promise()}});var B=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;w.Deferred.exceptionHook=function(t,n){e.console&&e.console.warn&&t&&B.test(t.name)&&e.console.warn("jQuery.Deferred exception: "+t.message,t.stack,n)},w.readyException=function(t){e.setTimeout(function(){throw t})};var F=w.Deferred();w.fn.ready=function(e){return F.then(e)["catch"](function(e){w.readyException(e)}),this},w.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--w.readyWait:w.isReady)||(w.isReady=!0,!0!==e&&--w.readyWait>0||F.resolveWith(r,[w]))}}),w.ready.then=F.then;function _(){r.removeEventListener("DOMContentLoaded",_),e.removeEventListener("load",_),w.ready()}"complete"===r.readyState||"loading"!==r.readyState&&!r.documentElement.doScroll?e.setTimeout(w.ready):(r.addEventListener("DOMContentLoaded",_),e.addEventListener("load",_));var z=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===x(n)){i=!0;for(s in n)z(e,t,s,n[s],!0,o,a)}else if(void 0!==r&&(i=!0,g(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(w(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},X=/^-ms-/,U=/-([a-z])/g;function V(e,t){return t.toUpperCase()}function G(e){return e.replace(X,"ms-").replace(U,V)}var Y=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Q(){this.expando=w.expando+Q.uid++}Q.uid=1,Q.prototype={cache:function(e){var t=e[this.expando];return t||(t={},Y(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[G(t)]=n;else for(r in t)i[G(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][G(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(G):(t=G(t))in r?[t]:t.match(M)||[]).length;while(n--)delete r[t[n]]}(void 0===t||w.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!w.isEmptyObject(t)}};var J=new Q,K=new Q,Z=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ee=/[A-Z]/g;function te(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:Z.test(e)?JSON.parse(e):e)}function ne(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(ee,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=te(n)}catch(e){}K.set(e,t,n)}else n=void 0;return n}w.extend({hasData:function(e){return K.hasData(e)||J.hasData(e)},data:function(e,t,n){return K.access(e,t,n)},removeData:function(e,t){K.remove(e,t)},_data:function(e,t,n){return J.access(e,t,n)},_removeData:function(e,t){J.remove(e,t)}}),w.fn.extend({data:function(e,t){var n,r,i,o=this[0],a=o&&o.attributes;if(void 0===e){if(this.length&&(i=K.get(o),1===o.nodeType&&!J.get(o,"hasDataAttrs"))){n=a.length;while(n--)a[n]&&0===(r=a[n].name).indexOf("data-")&&(r=G(r.slice(5)),ne(o,r,i[r]));J.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof e?this.each(function(){K.set(this,e)}):z(this,function(t){var n;if(o&&void 0===t){if(void 0!==(n=K.get(o,e)))return n;if(void 0!==(n=ne(o,e)))return n}else this.each(function(){K.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){K.remove(this,e)})}}),w.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=J.get(e,t),n&&(!r||Array.isArray(n)?r=J.access(e,t,w.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=w.queue(e,t),r=n.length,i=n.shift(),o=w._queueHooks(e,t),a=function(){w.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return J.get(e,n)||J.access(e,n,{empty:w.Callbacks("once memory").add(function(){J.remove(e,[t+"queue",n])})})}}),w.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?w.queue(this[0],e):void 0===t?this:this.each(function(){var n=w.queue(this,e,t);w._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&w.dequeue(this,e)})},dequeue:function(e){return this.each(function(){w.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=w.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=J.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var re=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ie=new RegExp("^(?:([+-])=|)("+re+")([a-z%]*)$","i"),oe=["Top","Right","Bottom","Left"],ae=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&w.contains(e.ownerDocument,e)&&"none"===w.css(e,"display")},se=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i};function ue(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return w.css(e,t,"")},u=s(),l=n&&n[3]||(w.cssNumber[t]?"":"px"),c=(w.cssNumber[t]||"px"!==l&&+u)&&ie.exec(w.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)w.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,w.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var le={};function ce(e){var t,n=e.ownerDocument,r=e.nodeName,i=le[r];return i||(t=n.body.appendChild(n.createElement(r)),i=w.css(t,"display"),t.parentNode.removeChild(t),"none"===i&&(i="block"),le[r]=i,i)}function fe(e,t){for(var n,r,i=[],o=0,a=e.length;o<a;o++)(r=e[o]).style&&(n=r.style.display,t?("none"===n&&(i[o]=J.get(r,"display")||null,i[o]||(r.style.display="")),""===r.style.display&&ae(r)&&(i[o]=ce(r))):"none"!==n&&(i[o]="none",J.set(r,"display",n)));for(o=0;o<a;o++)null!=i[o]&&(e[o].style.display=i[o]);return e}w.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){ae(this)?w(this).show():w(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;function ye(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&N(e,t)?w.merge([e],n):n}function ve(e,t){for(var n=0,r=e.length;n<r;n++)J.set(e[n],"globalEval",!t||J.get(t[n],"globalEval"))}var me=/<|&#?\w+;/;function xe(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===x(o))w.merge(p,o.nodeType?[o]:o);else if(me.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+w.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;w.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&w.inArray(o,r)>-1)i&&i.push(o);else if(l=w.contains(o.ownerDocument,o),a=ye(f.appendChild(o),"script"),l&&ve(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}!function(){var e=r.createDocumentFragment().appendChild(r.createElement("div")),t=r.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),h.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",h.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var be=r.documentElement,we=/^key/,Te=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ce=/^([^.]*)(?:\.(.+)|)/;function Ee(){return!0}function ke(){return!1}function Se(){try{return r.activeElement}catch(e){}}function De(e,t,n,r,i,o){var a,s;if("object"==typeof t){"string"!=typeof n&&(r=r||n,n=void 0);for(s in t)De(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return w().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=w.guid++)),e.each(function(){w.event.add(this,t,i,r,n)})}w.event={global:{},add:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.get(e);if(y){n.handler&&(n=(o=n).handler,i=o.selector),i&&w.find.matchesSelector(be,i),n.guid||(n.guid=w.guid++),(u=y.events)||(u=y.events={}),(a=y.handle)||(a=y.handle=function(t){return"undefined"!=typeof w&&w.event.triggered!==t.type?w.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(M)||[""]).length;while(l--)d=g=(s=Ce.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=w.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=w.event.special[d]||{},c=w.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&w.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,h,a)||e.addEventListener&&e.addEventListener(d,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),w.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,y=J.hasData(e)&&J.get(e);if(y&&(u=y.events)){l=(t=(t||"").match(M)||[""]).length;while(l--)if(s=Ce.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){f=w.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,y.handle)||w.removeEvent(e,d,y.handle),delete u[d])}else for(d in u)w.event.remove(e,d+t[l],n,r,!0);w.isEmptyObject(u)&&J.remove(e,"handle events")}},dispatch:function(e){var t=w.event.fix(e),n,r,i,o,a,s,u=new Array(arguments.length),l=(J.get(this,"events")||{})[t.type]||[],c=w.event.special[t.type]||{};for(u[0]=t,n=1;n<arguments.length;n++)u[n]=arguments[n];if(t.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,t)){s=w.event.handlers.call(this,t,l),n=0;while((o=s[n++])&&!t.isPropagationStopped()){t.currentTarget=o.elem,r=0;while((a=o.handlers[r++])&&!t.isImmediatePropagationStopped())t.rnamespace&&!t.rnamespace.test(a.namespace)||(t.handleObj=a,t.data=a.data,void 0!==(i=((w.event.special[a.origType]||{}).handle||a.handler).apply(o.elem,u))&&!1===(t.result=i)&&(t.preventDefault(),t.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,t),t.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?w(i,this).index(l)>-1:w.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(e,t){Object.defineProperty(w.Event.prototype,e,{enumerable:!0,configurable:!0,get:g(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[w.expando]?e:new w.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Se()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===Se()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&N(this,"input"))return this.click(),!1},_default:function(e){return N(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},w.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},w.Event=function(e,t){if(!(this instanceof w.Event))return new w.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?Ee:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&w.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[w.expando]=!0},w.Event.prototype={constructor:w.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=Ee,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=Ee,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=Ee,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},w.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&we.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Te.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},w.event.addProp),w.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){w.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return i&&(i===r||w.contains(r,i))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),w.fn.extend({on:function(e,t,n,r){return De(this,e,t,n,r)},one:function(e,t,n,r){return De(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,w(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){w.event.remove(this,e,n,t)})}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ae=/<script|<style|<link/i,je=/checked\s*(?:[^=]|=\s*.checked.)/i,qe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Le(e,t){return N(e,"table")&&N(11!==t.nodeType?t:t.firstChild,"tr")?w(e).children("tbody")[0]||e:e}function He(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Oe(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Pe(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(J.hasData(e)&&(o=J.access(e),a=J.set(t,o),l=o.events)){delete a.handle,a.events={};for(i in l)for(n=0,r=l[i].length;n<r;n++)w.event.add(t,i,l[i][n])}K.hasData(e)&&(s=K.access(e),u=w.extend({},s),K.set(t,u))}}function Me(e,t){var n=t.nodeName.toLowerCase();"input"===n&&pe.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Re(e,t,n,r){t=a.apply([],t);var i,o,s,u,l,c,f=0,p=e.length,d=p-1,y=t[0],v=g(y);if(v||p>1&&"string"==typeof y&&!h.checkClone&&je.test(y))return e.each(function(i){var o=e.eq(i);v&&(t[0]=y.call(this,i,o.html())),Re(o,t,n,r)});if(p&&(i=xe(t,e[0].ownerDocument,!1,e,r),o=i.firstChild,1===i.childNodes.length&&(i=o),o||r)){for(u=(s=w.map(ye(i,"script"),He)).length;f<p;f++)l=i,f!==d&&(l=w.clone(l,!0,!0),u&&w.merge(s,ye(l,"script"))),n.call(e[f],l,f);if(u)for(c=s[s.length-1].ownerDocument,w.map(s,Oe),f=0;f<u;f++)l=s[f],he.test(l.type||"")&&!J.access(l,"globalEval")&&w.contains(c,l)&&(l.src&&"module"!==(l.type||"").toLowerCase()?w._evalUrl&&w._evalUrl(l.src):m(l.textContent.replace(qe,""),c,l))}return e}function Ie(e,t,n){for(var r,i=t?w.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||w.cleanData(ye(r)),r.parentNode&&(n&&w.contains(r.ownerDocument,r)&&ve(ye(r,"script")),r.parentNode.removeChild(r));return e}w.extend({htmlPrefilter:function(e){return e.replace(Ne,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s=e.cloneNode(!0),u=w.contains(e.ownerDocument,e);if(!(h.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||w.isXMLDoc(e)))for(a=ye(s),r=0,i=(o=ye(e)).length;r<i;r++)Me(o[r],a[r]);if(t)if(n)for(o=o||ye(e),a=a||ye(s),r=0,i=o.length;r<i;r++)Pe(o[r],a[r]);else Pe(e,s);return(a=ye(s,"script")).length>0&&ve(a,!u&&ye(e,"script")),s},cleanData:function(e){for(var t,n,r,i=w.event.special,o=0;void 0!==(n=e[o]);o++)if(Y(n)){if(t=n[J.expando]){if(t.events)for(r in t.events)i[r]?w.event.remove(n,r):w.removeEvent(n,r,t.handle);n[J.expando]=void 0}n[K.expando]&&(n[K.expando]=void 0)}}}),w.fn.extend({detach:function(e){return Ie(this,e,!0)},remove:function(e){return Ie(this,e)},text:function(e){return z(this,function(e){return void 0===e?w.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Re(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Le(this,e).appendChild(e)})},prepend:function(){return Re(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Le(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Re(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(w.cleanData(ye(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return w.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ae.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=w.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(w.cleanData(ye(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Re(this,arguments,function(t){var n=this.parentNode;w.inArray(this,e)<0&&(w.cleanData(ye(this)),n&&n.replaceChild(t,this))},e)}}),w.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){w.fn[e]=function(e){for(var n,r=[],i=w(e),o=i.length-1,a=0;a<=o;a++)n=a===o?this:this.clone(!0),w(i[a])[t](n),s.apply(r,n.get());return this.pushStack(r)}});var We=new RegExp("^("+re+")(?!px)[a-z%]+$","i"),$e=function(t){var n=t.ownerDocument.defaultView;return n&&n.opener||(n=e),n.getComputedStyle(t)},Be=new RegExp(oe.join("|"),"i");!function(){function t(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",be.appendChild(l).appendChild(c);var t=e.getComputedStyle(c);i="1%"!==t.top,u=12===n(t.marginLeft),c.style.right="60%",s=36===n(t.right),o=36===n(t.width),c.style.position="absolute",a=36===c.offsetWidth||"absolute",be.removeChild(l),c=null}}function n(e){return Math.round(parseFloat(e))}var i,o,a,s,u,l=r.createElement("div"),c=r.createElement("div");c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",h.clearCloneStyle="content-box"===c.style.backgroundClip,w.extend(h,{boxSizingReliable:function(){return t(),o},pixelBoxStyles:function(){return t(),s},pixelPosition:function(){return t(),i},reliableMarginLeft:function(){return t(),u},scrollboxSize:function(){return t(),a}}))}();function Fe(e,t,n){var r,i,o,a,s=e.style;return(n=n||$e(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||w.contains(e.ownerDocument,e)||(a=w.style(e,t)),!h.pixelBoxStyles()&&We.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function _e(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}var ze=/^(none|table(?!-c[ea]).+)/,Xe=/^--/,Ue={position:"absolute",visibility:"hidden",display:"block"},Ve={letterSpacing:"0",fontWeight:"400"},Ge=["Webkit","Moz","ms"],Ye=r.createElement("div").style;function Qe(e){if(e in Ye)return e;var t=e[0].toUpperCase()+e.slice(1),n=Ge.length;while(n--)if((e=Ge[n]+t)in Ye)return e}function Je(e){var t=w.cssProps[e];return t||(t=w.cssProps[e]=Qe(e)||e),t}function Ke(e,t,n){var r=ie.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function Ze(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=w.css(e,n+oe[a],!0,i)),r?("content"===n&&(u-=w.css(e,"padding"+oe[a],!0,i)),"margin"!==n&&(u-=w.css(e,"border"+oe[a]+"Width",!0,i))):(u+=w.css(e,"padding"+oe[a],!0,i),"padding"!==n?u+=w.css(e,"border"+oe[a]+"Width",!0,i):s+=w.css(e,"border"+oe[a]+"Width",!0,i));return!r&&o>=0&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))),u}function et(e,t,n){var r=$e(e),i=Fe(e,t,r),o="border-box"===w.css(e,"boxSizing",!1,r),a=o;if(We.test(i)){if(!n)return i;i="auto"}return a=a&&(h.boxSizingReliable()||i===e.style[t]),("auto"===i||!parseFloat(i)&&"inline"===w.css(e,"display",!1,r))&&(i=e["offset"+t[0].toUpperCase()+t.slice(1)],a=!0),(i=parseFloat(i)||0)+Ze(e,t,n||(o?"border":"content"),a,r,i)+"px"}w.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Fe(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=G(t),u=Xe.test(t),l=e.style;if(u||(t=Je(s)),a=w.cssHooks[t]||w.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"==(o=typeof n)&&(i=ie.exec(n))&&i[1]&&(n=ue(e,t,i),o="number"),null!=n&&n===n&&("number"===o&&(n+=i&&i[3]||(w.cssNumber[s]?"":"px")),h.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=G(t);return Xe.test(t)||(t=Je(s)),(a=w.cssHooks[t]||w.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=Fe(e,t,r)),"normal"===i&&t in Ve&&(i=Ve[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),w.each(["height","width"],function(e,t){w.cssHooks[t]={get:function(e,n,r){if(n)return!ze.test(w.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?et(e,t,r):se(e,Ue,function(){return et(e,t,r)})},set:function(e,n,r){var i,o=$e(e),a="border-box"===w.css(e,"boxSizing",!1,o),s=r&&Ze(e,t,r,a,o);return a&&h.scrollboxSize()===o.position&&(s-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(o[t])-Ze(e,t,"border",!1,o)-.5)),s&&(i=ie.exec(n))&&"px"!==(i[3]||"px")&&(e.style[t]=n,n=w.css(e,t)),Ke(e,n,s)}}}),w.cssHooks.marginLeft=_e(h.reliableMarginLeft,function(e,t){if(t)return(parseFloat(Fe(e,"marginLeft"))||e.getBoundingClientRect().left-se(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),w.each({margin:"",padding:"",border:"Width"},function(e,t){w.cssHooks[e+t]={expand:function(n){for(var r=0,i={},o="string"==typeof n?n.split(" "):[n];r<4;r++)i[e+oe[r]+t]=o[r]||o[r-2]||o[0];return i}},"margin"!==e&&(w.cssHooks[e+t].set=Ke)}),w.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=$e(e),i=t.length;a<i;a++)o[t[a]]=w.css(e,t[a],!1,r);return o}return void 0!==n?w.style(e,t,n):w.css(e,t)},e,t,arguments.length>1)}});function tt(e,t,n,r,i){return new tt.prototype.init(e,t,n,r,i)}w.Tween=tt,tt.prototype={constructor:tt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||w.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(w.cssNumber[n]?"":"px")},cur:function(){var e=tt.propHooks[this.prop];return e&&e.get?e.get(this):tt.propHooks._default.get(this)},run:function(e){var t,n=tt.propHooks[this.prop];return this.options.duration?this.pos=t=w.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):tt.propHooks._default.set(this),this}},tt.prototype.init.prototype=tt.prototype,tt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=w.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){w.fx.step[e.prop]?w.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[w.cssProps[e.prop]]&&!w.cssHooks[e.prop]?e.elem[e.prop]=e.now:w.style(e.elem,e.prop,e.now+e.unit)}}},tt.propHooks.scrollTop=tt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},w.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},w.fx=tt.prototype.init,w.fx.step={};var nt,rt,it=/^(?:toggle|show|hide)$/,ot=/queueHooks$/;function at(){rt&&(!1===r.hidden&&e.requestAnimationFrame?e.requestAnimationFrame(at):e.setTimeout(at,w.fx.interval),w.fx.tick())}function st(){return e.setTimeout(function(){nt=void 0}),nt=Date.now()}function ut(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=oe[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function lt(e,t,n){for(var r,i=(pt.tweeners[t]||[]).concat(pt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function ct(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&ae(e),y=J.get(e,"fxshow");n.queue||(null==(a=w._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,w.queue(e,"fx").length||a.empty.fire()})}));for(r in t)if(i=t[r],it.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!y||void 0===y[r])continue;g=!0}d[r]=y&&y[r]||w.style(e,r)}if((u=!w.isEmptyObject(t))||!w.isEmptyObject(d)){f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=y&&y.display)&&(l=J.get(e,"display")),"none"===(c=w.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=w.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===w.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1;for(r in d)u||(y?"hidden"in y&&(g=y.hidden):y=J.access(e,"fxshow",{display:l}),o&&(y.hidden=!g),g&&fe([e],!0),p.done(function(){g||fe([e]),J.remove(e,"fxshow");for(r in d)w.style(e,r,d[r])})),u=lt(g?y[r]:0,r,p),r in y||(y[r]=u.start,g&&(u.end=u.start,u.start=0))}}function ft(e,t){var n,r,i,o,a;for(n in e)if(r=G(n),i=t[r],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=w.cssHooks[r])&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function pt(e,t,n){var r,i,o=0,a=pt.prefilters.length,s=w.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;for(var t=nt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),o=0,a=l.tweens.length;o<a;o++)l.tweens[o].run(r);return s.notifyWith(e,[l,r,n]),r<1&&a?n:(a||s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:w.extend({},t),opts:w.extend(!0,{specialEasing:{},easing:w.easing._default},n),originalProperties:t,originalOptions:n,startTime:nt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=w.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;n<r;n++)l.tweens[n].run(1);return t?(s.notifyWith(e,[l,1,0]),s.resolveWith(e,[l,t])):s.rejectWith(e,[l,t]),this}}),c=l.props;for(ft(c,l.opts.specialEasing);o<a;o++)if(r=pt.prefilters[o].call(l,e,c,l.opts))return g(r.stop)&&(w._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return w.map(c,lt,l),g(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),w.fx.timer(w.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l}w.Animation=w.extend(pt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ue(n.elem,e,ie.exec(t),n),n}]},tweener:function(e,t){g(e)?(t=e,e=["*"]):e=e.match(M);for(var n,r=0,i=e.length;r<i;r++)n=e[r],pt.tweeners[n]=pt.tweeners[n]||[],pt.tweeners[n].unshift(t)},prefilters:[ct],prefilter:function(e,t){t?pt.prefilters.unshift(e):pt.prefilters.push(e)}}),w.speed=function(e,t,n){var r=e&&"object"==typeof e?w.extend({},e):{complete:n||!n&&t||g(e)&&e,duration:e,easing:n&&t||t&&!g(t)&&t};return w.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in w.fx.speeds?r.duration=w.fx.speeds[r.duration]:r.duration=w.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){g(r.old)&&r.old.call(this),r.queue&&w.dequeue(this,r.queue)},r},w.fn.extend({fadeTo:function(e,t,n,r){return this.filter(ae).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=w.isEmptyObject(e),o=w.speed(t,n,r),a=function(){var t=pt(this,w.extend({},e),o);(i||J.get(this,"finish"))&&t.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=w.timers,a=J.get(this);if(i)a[i]&&a[i].stop&&r(a[i]);else for(i in a)a[i]&&a[i].stop&&ot.test(i)&&r(a[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));!t&&n||w.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=J.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=w.timers,a=r?r.length:0;for(n.finish=!0,w.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),w.each(["toggle","show","hide"],function(e,t){var n=w.fn[t];w.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ut(t,!0),e,r,i)}}),w.each({slideDown:ut("show"),slideUp:ut("hide"),slideToggle:ut("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){w.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),w.timers=[],w.fx.tick=function(){var e,t=0,n=w.timers;for(nt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||w.fx.stop(),nt=void 0},w.fx.timer=function(e){w.timers.push(e),w.fx.start()},w.fx.interval=13,w.fx.start=function(){rt||(rt=!0,at())},w.fx.stop=function(){rt=null},w.fx.speeds={slow:600,fast:200,_default:400},w.fn.delay=function(t,n){return t=w.fx?w.fx.speeds[t]||t:t,n=n||"fx",this.queue(n,function(n,r){var i=e.setTimeout(n,t);r.stop=function(){e.clearTimeout(i)}})},function(){var e=r.createElement("input"),t=r.createElement("select").appendChild(r.createElement("option"));e.type="checkbox",h.checkOn=""!==e.value,h.optSelected=t.selected,(e=r.createElement("input")).value="t",e.type="radio",h.radioValue="t"===e.value}();var dt,ht=w.expr.attrHandle;w.fn.extend({attr:function(e,t){return z(this,w.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){w.removeAttr(this,e)})}}),w.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?w.prop(e,t,n):(1===o&&w.isXMLDoc(e)||(i=w.attrHooks[t.toLowerCase()]||(w.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void w.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=w.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!h.radioValue&&"radio"===t&&N(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(M);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?w.removeAttr(e,n):e.setAttribute(n,n),n}},w.each(w.expr.match.bool.source.match(/\w+/g),function(e,t){var n=ht[t]||w.find.attr;ht[t]=function(e,t,r){var i,o,a=t.toLowerCase();return r||(o=ht[a],ht[a]=i,i=null!=n(e,t,r)?a:null,ht[a]=o),i}});var gt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;w.fn.extend({prop:function(e,t){return z(this,w.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[w.propFix[e]||e]})}}),w.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&w.isXMLDoc(e)||(t=w.propFix[t]||t,i=w.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=w.find.attr(e,"tabindex");return t?parseInt(t,10):gt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),h.optSelected||(w.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),w.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){w.propFix[this.toLowerCase()]=this});function vt(e){return(e.match(M)||[]).join(" ")}function mt(e){return e.getAttribute&&e.getAttribute("class")||""}function xt(e){return Array.isArray(e)?e:"string"==typeof e?e.match(M)||[]:[]}w.fn.extend({addClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).addClass(e.call(this,t,mt(this)))});if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},removeClass:function(e){var t,n,r,i,o,a,s,u=0;if(g(e))return this.each(function(t){w(this).removeClass(e.call(this,t,mt(this)))});if(!arguments.length)return this.attr("class","");if((t=xt(e)).length)while(n=this[u++])if(i=mt(n),r=1===n.nodeType&&" "+vt(i)+" "){a=0;while(o=t[a++])while(r.indexOf(" "+o+" ")>-1)r=r.replace(" "+o+" "," ");i!==(s=vt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(e,t){var n=typeof e,r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):g(e)?this.each(function(n){w(this).toggleClass(e.call(this,n,mt(this),t),t)}):this.each(function(){var t,i,o,a;if(r){i=0,o=w(this),a=xt(e);while(t=a[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else void 0!==e&&"boolean"!==n||((t=mt(this))&&J.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":J.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&(" "+vt(mt(n))+" ").indexOf(t)>-1)return!0;return!1}});var bt=/\r/g;w.fn.extend({val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=g(e),this.each(function(n){var i;1===this.nodeType&&(null==(i=r?e.call(this,n,w(this).val()):e)?i="":"number"==typeof i?i+="":Array.isArray(i)&&(i=w.map(i,function(e){return null==e?"":e+""})),(t=w.valHooks[this.type]||w.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,i,"value")||(this.value=i))});if(i)return(t=w.valHooks[i.type]||w.valHooks[i.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(i,"value"))?n:"string"==typeof(n=i.value)?n.replace(bt,""):null==n?"":n}}}),w.extend({valHooks:{option:{get:function(e){var t=w.find.attr(e,"value");return null!=t?t:vt(w.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!N(n.parentNode,"optgroup"))){if(t=w(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=w.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=w.inArray(w.valHooks.option.get(r),o)>-1)&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),w.each(["radio","checkbox"],function(){w.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=w.inArray(w(e).val(),t)>-1}},h.checkOn||(w.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),h.focusin="onfocusin"in e;var wt=/^(?:focusinfocus|focusoutblur)$/,Tt=function(e){e.stopPropagation()};w.extend(w.event,{trigger:function(t,n,i,o){var a,s,u,l,c,p,d,h,v=[i||r],m=f.call(t,"type")?t.type:t,x=f.call(t,"namespace")?t.namespace.split("."):[];if(s=h=u=i=i||r,3!==i.nodeType&&8!==i.nodeType&&!wt.test(m+w.event.triggered)&&(m.indexOf(".")>-1&&(m=(x=m.split(".")).shift(),x.sort()),c=m.indexOf(":")<0&&"on"+m,t=t[w.expando]?t:new w.Event(m,"object"==typeof t&&t),t.isTrigger=o?2:3,t.namespace=x.join("."),t.rnamespace=t.namespace?new RegExp("(^|\\.)"+x.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=i),n=null==n?[t]:w.makeArray(n,[t]),d=w.event.special[m]||{},o||!d.trigger||!1!==d.trigger.apply(i,n))){if(!o&&!d.noBubble&&!y(i)){for(l=d.delegateType||m,wt.test(l+m)||(s=s.parentNode);s;s=s.parentNode)v.push(s),u=s;u===(i.ownerDocument||r)&&v.push(u.defaultView||u.parentWindow||e)}a=0;while((s=v[a++])&&!t.isPropagationStopped())h=s,t.type=a>1?l:d.bindType||m,(p=(J.get(s,"events")||{})[t.type]&&J.get(s,"handle"))&&p.apply(s,n),(p=c&&s[c])&&p.apply&&Y(s)&&(t.result=p.apply(s,n),!1===t.result&&t.preventDefault());return t.type=m,o||t.isDefaultPrevented()||d._default&&!1!==d._default.apply(v.pop(),n)||!Y(i)||c&&g(i[m])&&!y(i)&&((u=i[c])&&(i[c]=null),w.event.triggered=m,t.isPropagationStopped()&&h.addEventListener(m,Tt),i[m](),t.isPropagationStopped()&&h.removeEventListener(m,Tt),w.event.triggered=void 0,u&&(i[c]=u)),t.result}},simulate:function(e,t,n){var r=w.extend(new w.Event,n,{type:e,isSimulated:!0});w.event.trigger(r,null,t)}}),w.fn.extend({trigger:function(e,t){return this.each(function(){w.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return w.event.trigger(e,t,n,!0)}}),h.focusin||w.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){w.event.simulate(t,e.target,w.event.fix(e))};w.event.special[t]={setup:function(){var r=this.ownerDocument||this,i=J.access(r,t);i||r.addEventListener(e,n,!0),J.access(r,t,(i||0)+1)},teardown:function(){var r=this.ownerDocument||this,i=J.access(r,t)-1;i?J.access(r,t,i):(r.removeEventListener(e,n,!0),J.remove(r,t))}}});var Ct=e.location,Et=Date.now(),kt=/\?/;w.parseXML=function(t){var n;if(!t||"string"!=typeof t)return null;try{n=(new e.DOMParser).parseFromString(t,"text/xml")}catch(e){n=void 0}return n&&!n.getElementsByTagName("parsererror").length||w.error("Invalid XML: "+t),n};var St=/\[\]$/,Dt=/\r?\n/g,Nt=/^(?:submit|button|image|reset|file)$/i,At=/^(?:input|select|textarea|keygen)/i;function jt(e,t,n,r){var i;if(Array.isArray(t))w.each(t,function(t,i){n||St.test(e)?r(e,i):jt(e+"["+("object"==typeof i&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==x(t))r(e,t);else for(i in t)jt(e+"["+i+"]",t[i],n,r)}w.param=function(e,t){var n,r=[],i=function(e,t){var n=g(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!w.isPlainObject(e))w.each(e,function(){i(this.name,this.value)});else for(n in e)jt(n,e[n],t,i);return r.join("&")},w.fn.extend({serialize:function(){return w.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=w.prop(this,"elements");return e?w.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!w(this).is(":disabled")&&At.test(this.nodeName)&&!Nt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=w(this).val();return null==n?null:Array.isArray(n)?w.map(n,function(e){return{name:t.name,value:e.replace(Dt,"\r\n")}}):{name:t.name,value:n.replace(Dt,"\r\n")}}).get()}});var qt=/%20/g,Lt=/#.*$/,Ht=/([?&])_=[^&]*/,Ot=/^(.*?):[ \t]*([^\r\n]*)$/gm,Pt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Mt=/^(?:GET|HEAD)$/,Rt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Bt=r.createElement("a");Bt.href=Ct.href;function Ft(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(M)||[];if(g(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function _t(e,t,n,r){var i={},o=e===Wt;function a(s){var u;return i[s]=!0,w.each(e[s]||[],function(e,s){var l=s(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),u}return a(t.dataTypes[0])||!i["*"]&&a("*")}function zt(e,t){var n,r,i=w.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&w.extend(!0,e,r),e}function Xt(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}function Ut(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}w.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:Pt.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":w.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,w.ajaxSettings),t):zt(w.ajaxSettings,e)},ajaxPrefilter:Ft(It),ajaxTransport:Ft(Wt),ajax:function(t,n){"object"==typeof t&&(n=t,t=void 0),n=n||{};var i,o,a,s,u,l,c,f,p,d,h=w.ajaxSetup({},n),g=h.context||h,y=h.context&&(g.nodeType||g.jquery)?w(g):w.event,v=w.Deferred(),m=w.Callbacks("once memory"),x=h.statusCode||{},b={},T={},C="canceled",E={readyState:0,getResponseHeader:function(e){var t;if(c){if(!s){s={};while(t=Ot.exec(a))s[t[1].toLowerCase()]=t[2]}t=s[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return c?a:null},setRequestHeader:function(e,t){return null==c&&(e=T[e.toLowerCase()]=T[e.toLowerCase()]||e,b[e]=t),this},overrideMimeType:function(e){return null==c&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(c)E.always(e[E.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||C;return i&&i.abort(t),k(0,t),this}};if(v.promise(E),h.url=((t||h.url||Ct.href)+"").replace(Rt,Ct.protocol+"//"),h.type=n.method||n.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(M)||[""],null==h.crossDomain){l=r.createElement("a");try{l.href=h.url,l.href=l.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=l.protocol+"//"+l.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=w.param(h.data,h.traditional)),_t(It,h,n,E),c)return E;(f=w.event&&h.global)&&0==w.active++&&w.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Mt.test(h.type),o=h.url.replace(Lt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(qt,"+")):(d=h.url.slice(o.length),h.data&&(h.processData||"string"==typeof h.data)&&(o+=(kt.test(o)?"&":"?")+h.data,delete h.data),!1===h.cache&&(o=o.replace(Ht,"$1"),d=(kt.test(o)?"&":"?")+"_="+Et+++d),h.url=o+d),h.ifModified&&(w.lastModified[o]&&E.setRequestHeader("If-Modified-Since",w.lastModified[o]),w.etag[o]&&E.setRequestHeader("If-None-Match",w.etag[o])),(h.data&&h.hasContent&&!1!==h.contentType||n.contentType)&&E.setRequestHeader("Content-Type",h.contentType),E.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+$t+"; q=0.01":""):h.accepts["*"]);for(p in h.headers)E.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(g,E,h)||c))return E.abort();if(C="abort",m.add(h.complete),E.done(h.success),E.fail(h.error),i=_t(Wt,h,n,E)){if(E.readyState=1,f&&y.trigger("ajaxSend",[E,h]),c)return E;h.async&&h.timeout>0&&(u=e.setTimeout(function(){E.abort("timeout")},h.timeout));try{c=!1,i.send(b,k)}catch(e){if(c)throw e;k(-1,e)}}else k(-1,"No Transport");function k(t,n,r,s){var l,p,d,b,T,C=n;c||(c=!0,u&&e.clearTimeout(u),i=void 0,a=s||"",E.readyState=t>0?4:0,l=t>=200&&t<300||304===t,r&&(b=Xt(h,E,r)),b=Ut(h,b,E,l),l?(h.ifModified&&((T=E.getResponseHeader("Last-Modified"))&&(w.lastModified[o]=T),(T=E.getResponseHeader("etag"))&&(w.etag[o]=T)),204===t||"HEAD"===h.type?C="nocontent":304===t?C="notmodified":(C=b.state,p=b.data,l=!(d=b.error))):(d=C,!t&&C||(C="error",t<0&&(t=0))),E.status=t,E.statusText=(n||C)+"",l?v.resolveWith(g,[p,C,E]):v.rejectWith(g,[E,C,d]),E.statusCode(x),x=void 0,f&&y.trigger(l?"ajaxSuccess":"ajaxError",[E,h,l?p:d]),m.fireWith(g,[E,C]),f&&(y.trigger("ajaxComplete",[E,h]),--w.active||w.event.trigger("ajaxStop")))}return E},getJSON:function(e,t,n){return w.get(e,t,n,"json")},getScript:function(e,t){return w.get(e,void 0,t,"script")}}),w.each(["get","post"],function(e,t){w[t]=function(e,n,r,i){return g(n)&&(i=i||r,r=n,n=void 0),w.ajax(w.extend({url:e,type:t,dataType:i,data:n,success:r},w.isPlainObject(e)&&e))}}),w._evalUrl=function(e){return w.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},w.fn.extend({wrapAll:function(e){var t;return this[0]&&(g(e)&&(e=e.call(this[0])),t=w(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return g(e)?this.each(function(t){w(this).wrapInner(e.call(this,t))}):this.each(function(){var t=w(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=g(e);return this.each(function(n){w(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){w(this).replaceWith(this.childNodes)}),this}}),w.expr.pseudos.hidden=function(e){return!w.expr.pseudos.visible(e)},w.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},w.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch(e){}};var Vt={0:200,1223:204},Gt=w.ajaxSettings.xhr();h.cors=!!Gt&&"withCredentials"in Gt,h.ajax=Gt=!!Gt,w.ajaxTransport(function(t){var n,r;if(h.cors||Gt&&!t.crossDomain)return{send:function(i,o){var a,s=t.xhr();if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(a in t.xhrFields)s[a]=t.xhrFields[a];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(a in i)s.setRequestHeader(a,i[a]);n=function(e){return function(){n&&(n=r=s.onload=s.onerror=s.onabort=s.ontimeout=s.onreadystatechange=null,"abort"===e?s.abort():"error"===e?"number"!=typeof s.status?o(0,"error"):o(s.status,s.statusText):o(Vt[s.status]||s.status,s.statusText,"text"!==(s.responseType||"text")||"string"!=typeof s.responseText?{binary:s.response}:{text:s.responseText},s.getAllResponseHeaders()))}},s.onload=n(),r=s.onerror=s.ontimeout=n("error"),void 0!==s.onabort?s.onabort=r:s.onreadystatechange=function(){4===s.readyState&&e.setTimeout(function(){n&&r()})},n=n("abort");try{s.send(t.hasContent&&t.data||null)}catch(e){if(n)throw e}},abort:function(){n&&n()}}}),w.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),w.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return w.globalEval(e),e}}}),w.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),w.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(i,o){t=w("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),r.head.appendChild(t[0])},abort:function(){n&&n()}}}});var Yt=[],Qt=/(=)\?(?=&|$)|\?\?/;w.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Yt.pop()||w.expando+"_"+Et++;return this[e]=!0,e}}),w.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,a,s=!1!==t.jsonp&&(Qt.test(t.url)?"url":"string"==typeof t.data&&0===(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Qt.test(t.data)&&"data");if(s||"jsonp"===t.dataTypes[0])return i=t.jsonpCallback=g(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,s?t[s]=t[s].replace(Qt,"$1"+i):!1!==t.jsonp&&(t.url+=(kt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return a||w.error(i+" was not called"),a[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){a=arguments},r.always(function(){void 0===o?w(e).removeProp(i):e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,Yt.push(i)),a&&g(o)&&o(a[0]),a=o=void 0}),"script"}),h.createHTMLDocument=function(){var e=r.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),w.parseHTML=function(e,t,n){if("string"!=typeof e)return[];"boolean"==typeof t&&(n=t,t=!1);var i,o,a;return t||(h.createHTMLDocument?((i=(t=r.implementation.createHTMLDocument("")).createElement("base")).href=r.location.href,t.head.appendChild(i)):t=r),o=A.exec(e),a=!n&&[],o?[t.createElement(o[1])]:(o=xe([e],t,a),a&&a.length&&w(a).remove(),w.merge([],o.childNodes))},w.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return s>-1&&(r=vt(e.slice(s)),e=e.slice(0,s)),g(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),a.length>0&&w.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?w("<div>").append(w.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},w.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){w.fn[t]=function(e){return this.on(t,e)}}),w.expr.pseudos.animated=function(e){return w.grep(w.timers,function(t){return e===t.elem}).length},w.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l,c=w.css(e,"position"),f=w(e),p={};"static"===c&&(e.style.position="relative"),s=f.offset(),o=w.css(e,"top"),u=w.css(e,"left"),(l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1)?(a=(r=f.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),g(t)&&(t=t.call(e,n,w.extend({},s))),null!=t.top&&(p.top=t.top-s.top+a),null!=t.left&&(p.left=t.left-s.left+i),"using"in t?t.using.call(e,p):f.css(p)}},w.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){w.offset.setOffset(this,e,t)});var t,n,r=this[0];if(r)return r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===w.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===w.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=w(e).offset()).top+=w.css(e,"borderTopWidth",!0),i.left+=w.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-w.css(r,"marginTop",!0),left:t.left-i.left-w.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===w.css(e,"position"))e=e.offsetParent;return e||be})}}),w.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;w.fn[e]=function(r){return z(this,function(e,r,i){var o;if(y(e)?o=e:9===e.nodeType&&(o=e.defaultView),void 0===i)return o?o[t]:e[r];o?o.scrollTo(n?o.pageXOffset:i,n?i:o.pageYOffset):e[r]=i},e,r,arguments.length)}}),w.each(["top","left"],function(e,t){w.cssHooks[t]=_e(h.pixelPosition,function(e,n){if(n)return n=Fe(e,t),We.test(n)?w(e).position()[t]+"px":n})}),w.each({Height:"height",Width:"width"},function(e,t){w.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){w.fn[r]=function(i,o){var a=arguments.length&&(n||"boolean"!=typeof i),s=n||(!0===i||!0===o?"margin":"border");return z(this,function(t,n,i){var o;return y(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(o=t.documentElement,Math.max(t.body["scroll"+e],o["scroll"+e],t.body["offset"+e],o["offset"+e],o["client"+e])):void 0===i?w.css(t,n,s):w.style(t,n,i,s)},t,a?i:void 0,a)}})}),w.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){w.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),w.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),w.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),w.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),g(e))return r=o.call(arguments,2),i=function(){return e.apply(t||this,r.concat(o.call(arguments)))},i.guid=e.guid=e.guid||w.guid++,i},w.holdReady=function(e){e?w.readyWait++:w.ready(!0)},w.isArray=Array.isArray,w.parseJSON=JSON.parse,w.nodeName=N,w.isFunction=g,w.isWindow=y,w.camelCase=G,w.type=x,w.now=Date.now,w.isNumeric=function(e){var t=w.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return w});var Jt=e.jQuery,Kt=e.$;return w.noConflict=function(t){return e.$===w&&(e.$=Kt),t&&e.jQuery===w&&(e.jQuery=Jt),w},t||(e.jQuery=e.$=w),w});

/*! jQuery UI - v1.12.1 - 2016-09-14
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

(function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t(jQuery)})(function(t){function e(t){for(var e=t.css("visibility");"inherit"===e;)t=t.parent(),e=t.css("visibility");return"hidden"!==e}function i(t){for(var e,i;t.length&&t[0]!==document;){if(e=t.css("position"),("absolute"===e||"relative"===e||"fixed"===e)&&(i=parseInt(t.css("zIndex"),10),!isNaN(i)&&0!==i))return i;t=t.parent()}return 0}function s(){this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},t.extend(this._defaults,this.regional[""]),this.regional.en=t.extend(!0,{},this.regional[""]),this.regional["en-US"]=t.extend(!0,{},this.regional.en),this.dpDiv=n(t("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}function n(e){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return e.on("mouseout",i,function(){t(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",i,o)}function o(){t.datepicker._isDisabledDatepicker(m.inline?m.dpDiv.parent()[0]:m.input[0])||(t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),t(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&t(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&t(this).addClass("ui-datepicker-next-hover"))}function a(e,i){t.extend(e,i);for(var s in i)null==i[s]&&(e[s]=i[s]);return e}function r(t){return function(){var e=this.element.val();t.apply(this,arguments),this._refresh(),e!==this.element.val()&&this._trigger("change")}}t.ui=t.ui||{},t.ui.version="1.12.1";var h=0,l=Array.prototype.slice;t.cleanData=function(e){return function(i){var s,n,o;for(o=0;null!=(n=i[o]);o++)try{s=t._data(n,"events"),s&&s.remove&&t(n).triggerHandler("remove")}catch(a){}e(i)}}(t.cleanData),t.widget=function(e,i,s){var n,o,a,r={},h=e.split(".")[0];e=e.split(".")[1];var l=h+"-"+e;return s||(s=i,i=t.Widget),t.isArray(s)&&(s=t.extend.apply(null,[{}].concat(s))),t.expr[":"][l.toLowerCase()]=function(e){return!!t.data(e,l)},t[h]=t[h]||{},n=t[h][e],o=t[h][e]=function(t,e){return this._createWidget?(arguments.length&&this._createWidget(t,e),void 0):new o(t,e)},t.extend(o,n,{version:s.version,_proto:t.extend({},s),_childConstructors:[]}),a=new i,a.options=t.widget.extend({},a.options),t.each(s,function(e,s){return t.isFunction(s)?(r[e]=function(){function t(){return i.prototype[e].apply(this,arguments)}function n(t){return i.prototype[e].apply(this,t)}return function(){var e,i=this._super,o=this._superApply;return this._super=t,this._superApply=n,e=s.apply(this,arguments),this._super=i,this._superApply=o,e}}(),void 0):(r[e]=s,void 0)}),o.prototype=t.widget.extend(a,{widgetEventPrefix:n?a.widgetEventPrefix||e:e},r,{constructor:o,namespace:h,widgetName:e,widgetFullName:l}),n?(t.each(n._childConstructors,function(e,i){var s=i.prototype;t.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete n._childConstructors):i._childConstructors.push(o),t.widget.bridge(e,o),o},t.widget.extend=function(e){for(var i,s,n=l.call(arguments,1),o=0,a=n.length;a>o;o++)for(i in n[o])s=n[o][i],n[o].hasOwnProperty(i)&&void 0!==s&&(e[i]=t.isPlainObject(s)?t.isPlainObject(e[i])?t.widget.extend({},e[i],s):t.widget.extend({},s):s);return e},t.widget.bridge=function(e,i){var s=i.prototype.widgetFullName||e;t.fn[e]=function(n){var o="string"==typeof n,a=l.call(arguments,1),r=this;return o?this.length||"instance"!==n?this.each(function(){var i,o=t.data(this,s);return"instance"===n?(r=o,!1):o?t.isFunction(o[n])&&"_"!==n.charAt(0)?(i=o[n].apply(o,a),i!==o&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):t.error("no such method '"+n+"' for "+e+" widget instance"):t.error("cannot call methods on "+e+" prior to initialization; "+"attempted to call method '"+n+"'")}):r=void 0:(a.length&&(n=t.widget.extend.apply(null,[n].concat(a))),this.each(function(){var e=t.data(this,s);e?(e.option(n||{}),e._init&&e._init()):t.data(this,s,new i(n,this))})),r}},t.Widget=function(){},t.Widget._childConstructors=[],t.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,create:null},_createWidget:function(e,i){i=t(i||this.defaultElement||this)[0],this.element=t(i),this.uuid=h++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=t(),this.hoverable=t(),this.focusable=t(),this.classesElementLookup={},i!==this&&(t.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(t){t.target===i&&this.destroy()}}),this.document=t(i.style?i.ownerDocument:i.document||i),this.window=t(this.document[0].defaultView||this.document[0].parentWindow)),this.options=t.widget.extend({},this.options,this._getCreateOptions(),e),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:t.noop,_create:t.noop,_init:t.noop,destroy:function(){var e=this;this._destroy(),t.each(this.classesElementLookup,function(t,i){e._removeClass(i,t)}),this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),this.bindings.off(this.eventNamespace)},_destroy:t.noop,widget:function(){return this.element},option:function(e,i){var s,n,o,a=e;if(0===arguments.length)return t.widget.extend({},this.options);if("string"==typeof e)if(a={},s=e.split("."),e=s.shift(),s.length){for(n=a[e]=t.widget.extend({},this.options[e]),o=0;s.length-1>o;o++)n[s[o]]=n[s[o]]||{},n=n[s[o]];if(e=s.pop(),1===arguments.length)return void 0===n[e]?null:n[e];n[e]=i}else{if(1===arguments.length)return void 0===this.options[e]?null:this.options[e];a[e]=i}return this._setOptions(a),this},_setOptions:function(t){var e;for(e in t)this._setOption(e,t[e]);return this},_setOption:function(t,e){return"classes"===t&&this._setOptionClasses(e),this.options[t]=e,"disabled"===t&&this._setOptionDisabled(e),this},_setOptionClasses:function(e){var i,s,n;for(i in e)n=this.classesElementLookup[i],e[i]!==this.options.classes[i]&&n&&n.length&&(s=t(n.get()),this._removeClass(n,i),s.addClass(this._classes({element:s,keys:i,classes:e,add:!0})))},_setOptionDisabled:function(t){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!t),t&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(e){function i(i,o){var a,r;for(r=0;i.length>r;r++)a=n.classesElementLookup[i[r]]||t(),a=e.add?t(t.unique(a.get().concat(e.element.get()))):t(a.not(e.element).get()),n.classesElementLookup[i[r]]=a,s.push(i[r]),o&&e.classes[i[r]]&&s.push(e.classes[i[r]])}var s=[],n=this;return e=t.extend({element:this.element,classes:this.options.classes||{}},e),this._on(e.element,{remove:"_untrackClassesElement"}),e.keys&&i(e.keys.match(/\S+/g)||[],!0),e.extra&&i(e.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(e){var i=this;t.each(i.classesElementLookup,function(s,n){-1!==t.inArray(e.target,n)&&(i.classesElementLookup[s]=t(n.not(e.target).get()))})},_removeClass:function(t,e,i){return this._toggleClass(t,e,i,!1)},_addClass:function(t,e,i){return this._toggleClass(t,e,i,!0)},_toggleClass:function(t,e,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof t||null===t,o={extra:n?e:i,keys:n?t:e,element:n?this.element:t,add:s};return o.element.toggleClass(this._classes(o),s),this},_on:function(e,i,s){var n,o=this;"boolean"!=typeof e&&(s=i,i=e,e=!1),s?(i=n=t(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),t.each(s,function(s,a){function r(){return e||o.options.disabled!==!0&&!t(this).hasClass("ui-state-disabled")?("string"==typeof a?o[a]:a).apply(o,arguments):void 0}"string"!=typeof a&&(r.guid=a.guid=a.guid||r.guid||t.guid++);var h=s.match(/^([\w:-]*)\s*(.*)$/),l=h[1]+o.eventNamespace,c=h[2];c?n.on(l,c,r):i.on(l,r)})},_off:function(e,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.off(i).off(i),this.bindings=t(this.bindings.not(e).get()),this.focusable=t(this.focusable.not(e).get()),this.hoverable=t(this.hoverable.not(e).get())},_delay:function(t,e){function i(){return("string"==typeof t?s[t]:t).apply(s,arguments)}var s=this;return setTimeout(i,e||0)},_hoverable:function(e){this.hoverable=this.hoverable.add(e),this._on(e,{mouseenter:function(e){this._addClass(t(e.currentTarget),null,"ui-state-hover")},mouseleave:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-hover")}})},_focusable:function(e){this.focusable=this.focusable.add(e),this._on(e,{focusin:function(e){this._addClass(t(e.currentTarget),null,"ui-state-focus")},focusout:function(e){this._removeClass(t(e.currentTarget),null,"ui-state-focus")}})},_trigger:function(e,i,s){var n,o,a=this.options[e];if(s=s||{},i=t.Event(i),i.type=(e===this.widgetEventPrefix?e:this.widgetEventPrefix+e).toLowerCase(),i.target=this.element[0],o=i.originalEvent)for(n in o)n in i||(i[n]=o[n]);return this.element.trigger(i,s),!(t.isFunction(a)&&a.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},t.each({show:"fadeIn",hide:"fadeOut"},function(e,i){t.Widget.prototype["_"+e]=function(s,n,o){"string"==typeof n&&(n={effect:n});var a,r=n?n===!0||"number"==typeof n?i:n.effect||i:e;n=n||{},"number"==typeof n&&(n={duration:n}),a=!t.isEmptyObject(n),n.complete=o,n.delay&&s.delay(n.delay),a&&t.effects&&t.effects.effect[r]?s[e](n):r!==e&&s[r]?s[r](n.duration,n.easing,o):s.queue(function(i){t(this)[e](),o&&o.call(s[0]),i()})}}),t.widget,function(){function e(t,e,i){return[parseFloat(t[0])*(u.test(t[0])?e/100:1),parseFloat(t[1])*(u.test(t[1])?i/100:1)]}function i(e,i){return parseInt(t.css(e,i),10)||0}function s(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}var n,o=Math.max,a=Math.abs,r=/left|center|right/,h=/top|center|bottom/,l=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,u=/%$/,d=t.fn.position;t.position={scrollbarWidth:function(){if(void 0!==n)return n;var e,i,s=t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=s.children()[0];return t("body").append(s),e=o.offsetWidth,s.css("overflow","scroll"),i=o.offsetWidth,e===i&&(i=s[0].clientWidth),s.remove(),n=e-i},getScrollInfo:function(e){var i=e.isWindow||e.isDocument?"":e.element.css("overflow-x"),s=e.isWindow||e.isDocument?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,o="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:o?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType,o=!s&&!n;return{element:i,isWindow:s,isDocument:n,offset:o?t(e).offset():{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},t.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);n=t.extend({},n);var u,p,f,g,m,_,v=t(n.of),b=t.position.getWithinInfo(n.within),y=t.position.getScrollInfo(b),w=(n.collision||"flip").split(" "),k={};return _=s(v),v[0].preventDefault&&(n.at="left top"),p=_.width,f=_.height,g=_.offset,m=t.extend({},g),t.each(["my","at"],function(){var t,e,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):h.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=h.test(i[1])?i[1]:"center",t=l.exec(i[0]),e=l.exec(i[1]),k[this]=[t?t[0]:0,e?e[0]:0],n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===w.length&&(w[1]=w[0]),"right"===n.at[0]?m.left+=p:"center"===n.at[0]&&(m.left+=p/2),"bottom"===n.at[1]?m.top+=f:"center"===n.at[1]&&(m.top+=f/2),u=e(k.at,p,f),m.left+=u[0],m.top+=u[1],this.each(function(){var s,r,h=t(this),l=h.outerWidth(),c=h.outerHeight(),d=i(this,"marginLeft"),_=i(this,"marginTop"),x=l+d+i(this,"marginRight")+y.width,C=c+_+i(this,"marginBottom")+y.height,D=t.extend({},m),I=e(k.my,h.outerWidth(),h.outerHeight());"right"===n.my[0]?D.left-=l:"center"===n.my[0]&&(D.left-=l/2),"bottom"===n.my[1]?D.top-=c:"center"===n.my[1]&&(D.top-=c/2),D.left+=I[0],D.top+=I[1],s={marginLeft:d,marginTop:_},t.each(["left","top"],function(e,i){t.ui.position[w[e]]&&t.ui.position[w[e]][i](D,{targetWidth:p,targetHeight:f,elemWidth:l,elemHeight:c,collisionPosition:s,collisionWidth:x,collisionHeight:C,offset:[u[0]+I[0],u[1]+I[1]],my:n.my,at:n.at,within:b,elem:h})}),n.using&&(r=function(t){var e=g.left-D.left,i=e+p-l,s=g.top-D.top,r=s+f-c,u={target:{element:v,left:g.left,top:g.top,width:p,height:f},element:{element:h,left:D.left,top:D.top,width:l,height:c},horizontal:0>i?"left":e>0?"right":"center",vertical:0>r?"top":s>0?"bottom":"middle"};l>p&&p>a(e+i)&&(u.horizontal="center"),c>f&&f>a(s+r)&&(u.vertical="middle"),u.important=o(a(e),a(i))>o(a(s),a(r))?"horizontal":"vertical",n.using.call(this,t,u)}),h.offset(t.extend(D,{using:r}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,o=n.offset.left+n.scrollLeft,r=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-r-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-r-o,(0>i||a(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>a(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,o=n.offset.top+n.scrollTop,r=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-r-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,g=-2*e.offset[1];0>c?(s=t.top+p+f+g+e.collisionHeight-r-o,(0>s||a(c)>s)&&(t.top+=p+f+g)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+g-h,(i>0||u>a(i))&&(t.top+=p+f+g))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}}}(),t.ui.position,t.extend(t.expr[":"],{data:t.expr.createPseudo?t.expr.createPseudo(function(e){return function(i){return!!t.data(i,e)}}):function(e,i,s){return!!t.data(e,s[3])}}),t.fn.extend({disableSelection:function(){var t="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(t+".ui-disableSelection",function(t){t.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}});var c="ui-effects-",u="ui-effects-style",d="ui-effects-animated",p=t;t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(t,o){var a,r=o.re.exec(i),h=r&&o.parse(r),l=o.space||"rgba";return h?(a=s[l](h),s[c[l].cache]=a[c[l].cache],n=s._rgba=a._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,o.transparent),s):o[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var o,a="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],l=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),l.fn=t.extend(l.prototype,{parse:function(n,a,r,h){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(a),a=e);var u=this,d=t.type(n),p=this._rgba=[];return a!==e&&(n=[n,a,r,h],d="array"),"string"===d?this.parse(s(n)||o._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof l?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var o=s.cache;f(s.props,function(t,e){if(!u[o]&&s.to){if("alpha"===t||null==n[t])return;u[o]=s.to(u._rgba)}u[o][e.idx]=i(n[t],e,!0)}),u[o]&&0>t.inArray(null,u[o].slice(0,3))&&(u[o][3]=1,s.from&&(u._rgba=s.from(u[o])))}),this):e},is:function(t){var i=l(t),s=!0,n=this;return f(c,function(t,o){var a,r=i[o.cache];return r&&(a=n[o.cache]||o.to&&o.to(n._rgba)||[],f(o.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===a[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=l(t),n=s._space(),o=c[n],a=0===this.alpha()?l("transparent"):this,r=a[o.cache]||o.to(a._rgba),h=r.slice();return s=s[o.cache],f(o.props,function(t,n){var o=n.idx,a=r[o],l=s[o],c=u[n.type]||{};null!==l&&(null===a?h[o]=l:(c.mod&&(l-a>c.mod/2?a+=c.mod:a-l>c.mod/2&&(a-=c.mod)),h[o]=i((l-a)*e+a,n)))}),this[n](h)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(e)._rgba;return l(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,o=t[2]/255,a=t[3],r=Math.max(s,n,o),h=Math.min(s,n,o),l=r-h,c=r+h,u=.5*c;return e=h===r?0:s===r?60*(n-o)/l+360:n===r?60*(o-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=u?l/c:l/(2-c),[Math.round(e)%360,i,u,null==a?1:a]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],o=t[3],a=.5>=s?s*(1+i):s+i-s*i,r=2*s-a;return[Math.round(255*n(r,a,e+1/3)),Math.round(255*n(r,a,e)),Math.round(255*n(r,a,e-1/3)),o]},f(c,function(s,n){var o=n.props,a=n.cache,h=n.to,c=n.from;l.fn[s]=function(s){if(h&&!this[a]&&(this[a]=h(this._rgba)),s===e)return this[a].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[a].slice();return f(o,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=l(c(d)),n[a]=d,n):l(d)},f(o,function(e,i){l.fn[e]||(l.fn[e]=function(n){var o,a=t.type(n),h="alpha"===e?this._hsla?"hsla":"rgba":s,l=this[h](),c=l[i.idx];return"undefined"===a?c:("function"===a&&(n=n.call(this,c),a=t.type(n)),null==n&&i.empty?this:("string"===a&&(o=r.exec(n),o&&(n=c+parseFloat(o[2])*("+"===o[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var o,a,r="";if("transparent"!==n&&("string"!==t.type(n)||(o=s(n)))){if(n=l(o||n),!d.rgba&&1!==n._rgba[3]){for(a="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&a&&a.style;)try{r=t.css(a,"backgroundColor"),a=a.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(h){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=l(e.elem,i),e.end=l(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},l.hook(a),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},o=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(p),function(){function e(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,o={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(o[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(o[i]=n[i]);return o}function i(e,i){var s,o,a={};for(s in i)o=i[s],e[s]!==o&&(n[s]||(t.fx.step[s]||!isNaN(parseFloat(o)))&&(a[s]=o));return a}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(p.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(n,o,a,r){var h=t.speed(o,a,r);return this.queue(function(){var o,a=t(this),r=a.attr("class")||"",l=h.children?a.find("*").addBack():a;l=l.map(function(){var i=t(this);return{el:i,start:e(this)}}),o=function(){t.each(s,function(t,e){n[e]&&a[e+"Class"](n[e])})},o(),l=l.map(function(){return this.end=e(this.el[0]),this.diff=i(this.start,this.end),this}),a.attr("class",r),l=l.map(function(){var e=this,i=t.Deferred(),s=t.extend({},h,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,l.get()).done(function(){o(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),h.complete.call(a[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,o){return s?t.effects.animateClass.call(this,{add:i},s,n,o):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,o){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,o):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(e){return function(i,s,n,o,a){return"boolean"==typeof s||void 0===s?n?t.effects.animateClass.call(this,s?{add:i}:{remove:i},n,o,a):e.apply(this,arguments):t.effects.animateClass.call(this,{toggle:i},s,n,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,o){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,o)}})}(),function(){function e(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function i(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}function s(t,e){var i=e.outerWidth(),s=e.outerHeight(),n=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,o=n.exec(t)||["",0,i,s,0];return{top:parseFloat(o[1])||0,right:"auto"===o[2]?i:parseFloat(o[2]),bottom:"auto"===o[3]?s:parseFloat(o[3]),left:parseFloat(o[4])||0}}t.expr&&t.expr.filters&&t.expr.filters.animated&&(t.expr.filters.animated=function(e){return function(i){return!!t(i).data(d)||e(i)}}(t.expr.filters.animated)),t.uiBackCompat!==!1&&t.extend(t.effects,{save:function(t,e){for(var i=0,s=e.length;s>i;i++)null!==e[i]&&t.data(c+e[i],t[0].style[e[i]])},restore:function(t,e){for(var i,s=0,n=e.length;n>s;s++)null!==e[s]&&(i=t.data(c+e[s]),t.css(e[s],i))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},o=document.activeElement;try{o.id}catch(a){o=document.body}return e.wrap(s),(e[0]===o||t.contains(e[0],o))&&t(o).trigger("focus"),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).trigger("focus")),e}}),t.extend(t.effects,{version:"1.12.1",define:function(e,i,s){return s||(s=i,i="effect"),t.effects.effect[e]=s,t.effects.effect[e].mode=i,s},scaledDimensions:function(t,e,i){if(0===e)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(e||100)/100:1,n="vertical"!==i?(e||100)/100:1;return{height:t.height()*n,width:t.width()*s,outerHeight:t.outerHeight()*n,outerWidth:t.outerWidth()*s}},clipToBox:function(t){return{width:t.clip.right-t.clip.left,height:t.clip.bottom-t.clip.top,left:t.clip.left,top:t.clip.top}},unshift:function(t,e,i){var s=t.queue();e>1&&s.splice.apply(s,[1,0].concat(s.splice(e,i))),t.dequeue()},saveStyle:function(t){t.data(u,t[0].style.cssText)},restoreStyle:function(t){t[0].style.cssText=t.data(u)||"",t.removeData(u)},mode:function(t,e){var i=t.is(":hidden");return"toggle"===e&&(e=i?"show":"hide"),(i?"hide"===e:"show"===e)&&(e="none"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createPlaceholder:function(e){var i,s=e.css("position"),n=e.position();return e.css({marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()),/^(static|relative)/.test(s)&&(s="absolute",i=t("<"+e[0].nodeName+">").insertAfter(e).css({display:/^(inline|ruby)/.test(e.css("display"))?"inline-block":"block",visibility:"hidden",marginTop:e.css("marginTop"),marginBottom:e.css("marginBottom"),marginLeft:e.css("marginLeft"),marginRight:e.css("marginRight"),"float":e.css("float")}).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).addClass("ui-effects-placeholder"),e.data(c+"placeholder",i)),e.css({position:s,left:n.left,top:n.top}),i},removePlaceholder:function(t){var e=c+"placeholder",i=t.data(e);i&&(i.remove(),t.removeData(e))},cleanUp:function(e){t.effects.restoreStyle(e),t.effects.removePlaceholder(e)},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var o=e.cssUnit(i);o[0]>0&&(n[i]=o[0]*s+o[1])}),n}}),t.fn.extend({effect:function(){function i(e){function i(){r.removeData(d),t.effects.cleanUp(r),"hide"===s.mode&&r.hide(),a()}function a(){t.isFunction(h)&&h.call(r[0]),t.isFunction(e)&&e()}var r=t(this);s.mode=c.shift(),t.uiBackCompat===!1||o?"none"===s.mode?(r[l](),a()):n.call(r[0],s,i):(r.is(":hidden")?"hide"===l:"show"===l)?(r[l](),a()):n.call(r[0],s,a)}var s=e.apply(this,arguments),n=t.effects.effect[s.effect],o=n.mode,a=s.queue,r=a||"fx",h=s.complete,l=s.mode,c=[],u=function(e){var i=t(this),s=t.effects.mode(i,l)||o;i.data(d,!0),c.push(s),o&&("show"===s||s===o&&"hide"===s)&&i.show(),o&&"none"===s||t.effects.saveStyle(i),t.isFunction(e)&&e()};return t.fx.off||!n?l?this[l](s.duration,h):this.each(function(){h&&h.call(this)}):a===!1?this.each(u).each(i):this.queue(r,u).queue(r,i)},show:function(t){return function(s){if(i(s))return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="show",this.effect.call(this,n)
}}(t.fn.show),hide:function(t){return function(s){if(i(s))return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(t.fn.hide),toggle:function(t){return function(s){if(i(s)||"boolean"==typeof s)return t.apply(this,arguments);var n=e.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s},cssClip:function(t){return t?this.css("clip","rect("+t.top+"px "+t.right+"px "+t.bottom+"px "+t.left+"px)"):s(this.css("clip"),this)},transfer:function(e,i){var s=t(this),n=t(e.to),o="fixed"===n.css("position"),a=t("body"),r=o?a.scrollTop():0,h=o?a.scrollLeft():0,l=n.offset(),c={top:l.top-r,left:l.left-h,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=t("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(e.className).css({top:u.top-r,left:u.left-h,height:s.innerHeight(),width:s.innerWidth(),position:o?"fixed":"absolute"}).animate(c,e.duration,e.easing,function(){d.remove(),t.isFunction(i)&&i()})}}),t.fx.step.clip=function(e){e.clipInit||(e.start=t(e.elem).cssClip(),"string"==typeof e.end&&(e.end=s(e.end,e.elem)),e.clipInit=!0),t(e.elem).cssClip({top:e.pos*(e.end.top-e.start.top)+e.start.top,right:e.pos*(e.end.right-e.start.right)+e.start.right,bottom:e.pos*(e.end.bottom-e.start.bottom)+e.start.bottom,left:e.pos*(e.end.left-e.start.left)+e.start.left})}}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}();var f=t.effects;t.effects.define("blind","hide",function(e,i){var s={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},n=t(this),o=e.direction||"up",a=n.cssClip(),r={clip:t.extend({},a)},h=t.effects.createPlaceholder(n);r.clip[s[o][0]]=r.clip[s[o][1]],"show"===e.mode&&(n.cssClip(r.clip),h&&h.css(t.effects.clipToBox(r)),r.clip=a),h&&h.animate(t.effects.clipToBox(r),e.duration,e.easing),n.animate(r,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("bounce",function(e,i){var s,n,o,a=t(this),r=e.mode,h="hide"===r,l="show"===r,c=e.direction||"up",u=e.distance,d=e.times||5,p=2*d+(l||h?1:0),f=e.duration/p,g=e.easing,m="up"===c||"down"===c?"top":"left",_="up"===c||"left"===c,v=0,b=a.queue().length;for(t.effects.createPlaceholder(a),o=a.css(m),u||(u=a["top"===m?"outerHeight":"outerWidth"]()/3),l&&(n={opacity:1},n[m]=o,a.css("opacity",0).css(m,_?2*-u:2*u).animate(n,f,g)),h&&(u/=Math.pow(2,d-1)),n={},n[m]=o;d>v;v++)s={},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g).animate(n,f,g),u=h?2*u:u/2;h&&(s={opacity:0},s[m]=(_?"-=":"+=")+u,a.animate(s,f,g)),a.queue(i),t.effects.unshift(a,b,p+1)}),t.effects.define("clip","hide",function(e,i){var s,n={},o=t(this),a=e.direction||"vertical",r="both"===a,h=r||"horizontal"===a,l=r||"vertical"===a;s=o.cssClip(),n.clip={top:l?(s.bottom-s.top)/2:s.top,right:h?(s.right-s.left)/2:s.right,bottom:l?(s.bottom-s.top)/2:s.bottom,left:h?(s.right-s.left)/2:s.left},t.effects.createPlaceholder(o),"show"===e.mode&&(o.cssClip(n.clip),n.clip=s),o.animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("drop","hide",function(e,i){var s,n=t(this),o=e.mode,a="show"===o,r=e.direction||"left",h="up"===r||"down"===r?"top":"left",l="up"===r||"left"===r?"-=":"+=",c="+="===l?"-=":"+=",u={opacity:0};t.effects.createPlaceholder(n),s=e.distance||n["top"===h?"outerHeight":"outerWidth"](!0)/2,u[h]=l+s,a&&(n.css(u),u[h]=c+s,u.opacity=1),n.animate(u,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("explode","hide",function(e,i){function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),t(b).remove(),i()}var o,a,r,h,l,c,u=e.pieces?Math.round(Math.sqrt(e.pieces)):3,d=u,p=t(this),f=e.mode,g="show"===f,m=p.show().css("visibility","hidden").offset(),_=Math.ceil(p.outerWidth()/d),v=Math.ceil(p.outerHeight()/u),b=[];for(o=0;u>o;o++)for(h=m.top+o*v,c=o-(u-1)/2,a=0;d>a;a++)r=m.left+a*_,l=a-(d-1)/2,p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-a*_,top:-o*v}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:_,height:v,left:r+(g?l*_:0),top:h+(g?c*v:0),opacity:g?0:1}).animate({left:r+(g?0:l*_),top:h+(g?0:c*v),opacity:g?1:0},e.duration||500,e.easing,s)}),t.effects.define("fade","toggle",function(e,i){var s="show"===e.mode;t(this).css("opacity",s?0:1).animate({opacity:s?1:0},{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("fold","hide",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=e.size||15,h=/([0-9]+)%/.exec(r),l=!!e.horizFirst,c=l?["right","bottom"]:["bottom","right"],u=e.duration/2,d=t.effects.createPlaceholder(s),p=s.cssClip(),f={clip:t.extend({},p)},g={clip:t.extend({},p)},m=[p[c[0]],p[c[1]]],_=s.queue().length;h&&(r=parseInt(h[1],10)/100*m[a?0:1]),f.clip[c[0]]=r,g.clip[c[0]]=r,g.clip[c[1]]=0,o&&(s.cssClip(g.clip),d&&d.css(t.effects.clipToBox(g)),g.clip=p),s.queue(function(i){d&&d.animate(t.effects.clipToBox(f),u,e.easing).animate(t.effects.clipToBox(g),u,e.easing),i()}).animate(f,u,e.easing).animate(g,u,e.easing).queue(i),t.effects.unshift(s,_,4)}),t.effects.define("highlight","show",function(e,i){var s=t(this),n={backgroundColor:s.css("backgroundColor")};"hide"===e.mode&&(n.opacity=0),t.effects.saveStyle(s),s.css({backgroundImage:"none",backgroundColor:e.color||"#ffff99"}).animate(n,{queue:!1,duration:e.duration,easing:e.easing,complete:i})}),t.effects.define("size",function(e,i){var s,n,o,a=t(this),r=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],l=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],c=e.mode,u="effect"!==c,d=e.scale||"both",p=e.origin||["middle","center"],f=a.css("position"),g=a.position(),m=t.effects.scaledDimensions(a),_=e.from||m,v=e.to||t.effects.scaledDimensions(a,0);t.effects.createPlaceholder(a),"show"===c&&(o=_,_=v,v=o),n={from:{y:_.height/m.height,x:_.width/m.width},to:{y:v.height/m.height,x:v.width/m.width}},("box"===d||"both"===d)&&(n.from.y!==n.to.y&&(_=t.effects.setTransition(a,h,n.from.y,_),v=t.effects.setTransition(a,h,n.to.y,v)),n.from.x!==n.to.x&&(_=t.effects.setTransition(a,l,n.from.x,_),v=t.effects.setTransition(a,l,n.to.x,v))),("content"===d||"both"===d)&&n.from.y!==n.to.y&&(_=t.effects.setTransition(a,r,n.from.y,_),v=t.effects.setTransition(a,r,n.to.y,v)),p&&(s=t.effects.getBaseline(p,m),_.top=(m.outerHeight-_.outerHeight)*s.y+g.top,_.left=(m.outerWidth-_.outerWidth)*s.x+g.left,v.top=(m.outerHeight-v.outerHeight)*s.y+g.top,v.left=(m.outerWidth-v.outerWidth)*s.x+g.left),a.css(_),("content"===d||"both"===d)&&(h=h.concat(["marginTop","marginBottom"]).concat(r),l=l.concat(["marginLeft","marginRight"]),a.find("*[width]").each(function(){var i=t(this),s=t.effects.scaledDimensions(i),o={height:s.height*n.from.y,width:s.width*n.from.x,outerHeight:s.outerHeight*n.from.y,outerWidth:s.outerWidth*n.from.x},a={height:s.height*n.to.y,width:s.width*n.to.x,outerHeight:s.height*n.to.y,outerWidth:s.width*n.to.x};n.from.y!==n.to.y&&(o=t.effects.setTransition(i,h,n.from.y,o),a=t.effects.setTransition(i,h,n.to.y,a)),n.from.x!==n.to.x&&(o=t.effects.setTransition(i,l,n.from.x,o),a=t.effects.setTransition(i,l,n.to.x,a)),u&&t.effects.saveStyle(i),i.css(o),i.animate(a,e.duration,e.easing,function(){u&&t.effects.restoreStyle(i)})})),a.animate(v,{queue:!1,duration:e.duration,easing:e.easing,complete:function(){var e=a.offset();0===v.opacity&&a.css("opacity",_.opacity),u||(a.css("position","static"===f?"relative":f).offset(e),t.effects.saveStyle(a)),i()}})}),t.effects.define("scale",function(e,i){var s=t(this),n=e.mode,o=parseInt(e.percent,10)||(0===parseInt(e.percent,10)?0:"effect"!==n?0:100),a=t.extend(!0,{from:t.effects.scaledDimensions(s),to:t.effects.scaledDimensions(s,o,e.direction||"both"),origin:e.origin||["middle","center"]},e);e.fade&&(a.from.opacity=1,a.to.opacity=0),t.effects.effect.size.call(this,a,i)}),t.effects.define("puff","hide",function(e,i){var s=t.extend(!0,{},e,{fade:!0,percent:parseInt(e.percent,10)||150});t.effects.effect.scale.call(this,s,i)}),t.effects.define("pulsate","show",function(e,i){var s=t(this),n=e.mode,o="show"===n,a="hide"===n,r=o||a,h=2*(e.times||5)+(r?1:0),l=e.duration/h,c=0,u=1,d=s.queue().length;for((o||!s.is(":visible"))&&(s.css("opacity",0).show(),c=1);h>u;u++)s.animate({opacity:c},l,e.easing),c=1-c;s.animate({opacity:c},l,e.easing),s.queue(i),t.effects.unshift(s,d,h+1)}),t.effects.define("shake",function(e,i){var s=1,n=t(this),o=e.direction||"left",a=e.distance||20,r=e.times||3,h=2*r+1,l=Math.round(e.duration/h),c="up"===o||"down"===o?"top":"left",u="up"===o||"left"===o,d={},p={},f={},g=n.queue().length;for(t.effects.createPlaceholder(n),d[c]=(u?"-=":"+=")+a,p[c]=(u?"+=":"-=")+2*a,f[c]=(u?"-=":"+=")+2*a,n.animate(d,l,e.easing);r>s;s++)n.animate(p,l,e.easing).animate(f,l,e.easing);n.animate(p,l,e.easing).animate(d,l/2,e.easing).queue(i),t.effects.unshift(n,g,h+1)}),t.effects.define("slide","show",function(e,i){var s,n,o=t(this),a={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},r=e.mode,h=e.direction||"left",l="up"===h||"down"===h?"top":"left",c="up"===h||"left"===h,u=e.distance||o["top"===l?"outerHeight":"outerWidth"](!0),d={};t.effects.createPlaceholder(o),s=o.cssClip(),n=o.position()[l],d[l]=(c?-1:1)*u+n,d.clip=o.cssClip(),d.clip[a[h][1]]=d.clip[a[h][0]],"show"===r&&(o.cssClip(d.clip),o.css(l,d[l]),d.clip=s,d[l]=n),o.animate(d,{queue:!1,duration:e.duration,easing:e.easing,complete:i})});var f;t.uiBackCompat!==!1&&(f=t.effects.define("transfer",function(e,i){t(this).transfer(e,i)})),t.ui.focusable=function(i,s){var n,o,a,r,h,l=i.nodeName.toLowerCase();return"area"===l?(n=i.parentNode,o=n.name,i.href&&o&&"map"===n.nodeName.toLowerCase()?(a=t("img[usemap='#"+o+"']"),a.length>0&&a.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(l)?(r=!i.disabled,r&&(h=t(i).closest("fieldset")[0],h&&(r=!h.disabled))):r="a"===l?i.href||s:s,r&&t(i).is(":visible")&&e(t(i)))},t.extend(t.expr[":"],{focusable:function(e){return t.ui.focusable(e,null!=t.attr(e,"tabindex"))}}),t.ui.focusable,t.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):t(this[0].form)},t.ui.formResetMixin={_formResetHandler:function(){var e=t(this);setTimeout(function(){var i=e.data("ui-form-reset-instances");t.each(i,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var t=this.form.data("ui-form-reset-instances")||[];t.length||this.form.on("reset.ui-form-reset",this._formResetHandler),t.push(this),this.form.data("ui-form-reset-instances",t)}},_unbindFormResetHandler:function(){if(this.form.length){var e=this.form.data("ui-form-reset-instances");e.splice(t.inArray(this,e),1),e.length?this.form.data("ui-form-reset-instances",e):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}},"1.7"===t.fn.jquery.substring(0,3)&&(t.each(["Width","Height"],function(e,i){function s(e,i,s,o){return t.each(n,function(){i-=parseFloat(t.css(e,"padding"+this))||0,s&&(i-=parseFloat(t.css(e,"border"+this+"Width"))||0),o&&(i-=parseFloat(t.css(e,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],o=i.toLowerCase(),a={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(e){return void 0===e?a["inner"+i].call(this):this.each(function(){t(this).css(o,s(this,e)+"px")})},t.fn["outer"+i]=function(e,n){return"number"!=typeof e?a["outer"+i].call(this,e):this.each(function(){t(this).css(o,s(this,e,!0,n)+"px")})}}),t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},t.ui.escapeSelector=function(){var t=/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;return function(e){return e.replace(t,"\\$1")}}(),t.fn.labels=function(){var e,i,s,n,o;return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(n=this.eq(0).parents("label"),s=this.attr("id"),s&&(e=this.eq(0).parents().last(),o=e.add(e.length?e.siblings():this.siblings()),i="label[for='"+t.ui.escapeSelector(s)+"']",n=n.add(o.find(i).addBack(i))),this.pushStack(n))},t.fn.scrollParent=function(e){var i=this.css("position"),s="absolute"===i,n=e?/(auto|scroll|hidden)/:/(auto|scroll)/,o=this.parents().filter(function(){var e=t(this);return s&&"static"===e.css("position")?!1:n.test(e.css("overflow")+e.css("overflow-y")+e.css("overflow-x"))}).eq(0);return"fixed"!==i&&o.length?o:t(this[0].ownerDocument||document)},t.extend(t.expr[":"],{tabbable:function(e){var i=t.attr(e,"tabindex"),s=null!=i;return(!s||i>=0)&&t.ui.focusable(e,s)}}),t.fn.extend({uniqueId:function(){var t=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++t)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&t(this).removeAttr("id")})}}),t.widget("ui.accordion",{version:"1.12.1",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),0>e.active&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t()}},_createIcons:function(){var e,i,s=this.options.icons;s&&(e=t("<span>"),this._addClass(e,"ui-accordion-header-icon","ui-icon "+s.header),e.prependTo(this.headers),i=this.active.children(".ui-accordion-header-icon"),this._removeClass(i,s.header)._addClass(i,null,s.activeHeader)._addClass(this.headers,"ui-accordion-icons"))},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeAttr("role"),this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?(this._activate(e),void 0):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),void 0)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!t)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,s=this.headers.length,n=this.headers.index(e.target),o=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:o=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:o=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:o=this.headers[0];break;case i.END:o=this.headers[s-1]}o&&(t(e.target).attr("tabIndex",-1),t(o).attr("tabIndex",0),t(o).trigger("focus"),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().trigger("focus")},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var t=this.headers,e=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),e&&(this._off(t.not(this.headers)),this._off(e.not(this.panels)))},_refresh:function(){var e,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var e=t(this),i=e.uniqueId().attr("id"),s=e.next(),n=s.uniqueId().attr("id");e.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(e=n.height(),this.element.siblings(":visible").each(function(){var i=t(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(e-=i.outerHeight(!0))}),this.headers.each(function(){e-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,e-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===s&&(e=0,this.headers.next().each(function(){var i=t(this).is(":visible");i||t(this).show(),e=Math.max(e,t(this).css("height","").height()),i||t(this).hide()}).height(e))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i,s,n=this.options,o=this.active,a=t(e.currentTarget),r=a[0]===o[0],h=r&&n.collapsible,l=h?t():a.next(),c=o.next(),u={oldHeader:o,oldPanel:c,newHeader:h?t():a,newPanel:l};e.preventDefault(),r&&!n.collapsible||this._trigger("beforeActivate",e,u)===!1||(n.active=h?!1:this.headers.index(a),this.active=r?t():a,this._toggle(u),this._removeClass(o,"ui-accordion-header-active","ui-state-active"),n.icons&&(i=o.children(".ui-accordion-header-icon"),this._removeClass(i,null,n.icons.activeHeader)._addClass(i,null,n.icons.header)),r||(this._removeClass(a,"ui-accordion-header-collapsed")._addClass(a,"ui-accordion-header-active","ui-state-active"),n.icons&&(s=a.children(".ui-accordion-header-icon"),this._removeClass(s,null,n.icons.header)._addClass(s,null,n.icons.activeHeader)),this._addClass(a.next(),"ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,s=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,e):(s.hide(),i.show(),this._toggleComplete(e)),s.attr({"aria-hidden":"true"}),s.prev().attr({"aria-selected":"false","aria-expanded":"false"}),i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(t(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(t,e,i){var s,n,o,a=this,r=0,h=t.css("box-sizing"),l=t.length&&(!e.length||t.index()<e.index()),c=this.options.animate||{},u=l&&c.down||c,d=function(){a._toggleComplete(i)};return"number"==typeof u&&(o=u),"string"==typeof u&&(n=u),n=n||u.easing||c.easing,o=o||u.duration||c.duration,e.length?t.length?(s=t.show().outerHeight(),e.animate(this.hideProps,{duration:o,easing:n,step:function(t,e){e.now=Math.round(t)}}),t.hide().animate(this.showProps,{duration:o,easing:n,complete:d,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?"content-box"===h&&(r+=i.now):"content"!==a.options.heightStyle&&(i.now=Math.round(s-e.outerHeight()-r),r=0)}}),void 0):e.animate(this.hideProps,o,n,d):t.animate(this.showProps,o,n,d)},_toggleComplete:function(t){var e=t.oldPanel,i=e.prev();this._removeClass(e,"ui-accordion-content-active"),this._removeClass(i,"ui-accordion-header-active")._addClass(i,"ui-accordion-header-collapsed"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}}),t.ui.safeActiveElement=function(t){var e;try{e=t.activeElement}catch(i){e=t.body}return e||(e=t.body),e.nodeName||(e=t.body),e},t.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(t){t.preventDefault()},"click .ui-menu-item":function(e){var i=t(e.target),s=t(t.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(e),e.isPropagationStopped()||(this.mouseHandled=!0),i.has(".ui-menu").length?this.expand(e):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){if(!this.previousFilter){var i=t(e.target).closest(".ui-menu-item"),s=t(e.currentTarget);i[0]===s[0]&&(this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(e,s))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.find(this.options.items).eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){var i=!t.contains(this.element[0],t.ui.safeActiveElement(this.document[0]));i&&this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(t){this._closeOnDocumentClick(t)&&this.collapseAll(t),this.mouseHandled=!1}})},_destroy:function(){var e=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),i=e.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),i.children().each(function(){var e=t(this);e.data("ui-menu-submenu-caret")&&e.remove()})},_keydown:function(e){var i,s,n,o,a=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:a=!1,s=this.previousFilter||"",o=!1,n=e.keyCode>=96&&105>=e.keyCode?""+(e.keyCode-96):String.fromCharCode(e.keyCode),clearTimeout(this.filterTimer),n===s?o=!0:n=s+n,i=this._filterMenuItems(n),i=o&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,i.length||(n=String.fromCharCode(e.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(e,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}a&&e.preventDefault()},_activate:function(t){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i,s,n,o,a=this,r=this.options.icons.submenu,h=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),s=h.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),i=e.prev(),s=t("<span>").data("ui-menu-submenu-caret",!0);a._addClass(s,"ui-menu-icon","ui-icon "+r),i.attr("aria-haspopup","true").prepend(s),e.attr("aria-labelledby",i.attr("id"))}),this._addClass(s,"ui-menu","ui-widget ui-widget-content ui-front"),e=h.add(this.element),i=e.find(this.options.items),i.not(".ui-menu-item").each(function(){var e=t(this);a._isDivider(e)&&a._addClass(e,"ui-menu-divider","ui-widget-content")}),n=i.not(".ui-menu-item, .ui-menu-divider"),o=n.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(n,"ui-menu-item")._addClass(o,"ui-menu-item-wrapper"),i.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){if("icons"===t){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,e.submenu)}this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t+""),this._toggleClass(null,"ui-state-disabled",!!t)},focus:function(t,e){var i,s,n;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&t&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,o,a,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,o=this.activeMenu.scrollTop(),a=this.activeMenu.height(),r=e.outerHeight(),0>n?this.activeMenu.scrollTop(o+n):n+r>a&&this.activeMenu.scrollTop(o+n-a+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",t,{item:this.active}),this.active=null)},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(e){return!t(e.target).closest(".ui-menu").length},_isDivider:function(t){return!/[^\-\u2014\u2013\s]/.test(t.text())},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items)[this.active?"last":"first"]())),void 0):(this.next(e),void 0)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.find(this.options.items).first())),void 0):(this.next(e),void 0)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)},_filterMenuItems:function(e){var i=e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(t.trim(t(this).children(".ui-menu-item-wrapper").text()))})}}),t.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){var e,i,s,n=this.element[0].nodeName.toLowerCase(),o="textarea"===n,a="input"===n;
this.isMultiLine=o||!a&&this._isContentEditable(this.element),this.valueMethod=this.element[o||a?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return e=!0,s=!0,i=!0,void 0;e=!1,s=!1,i=!1;var o=t.ui.keyCode;switch(n.keyCode){case o.PAGE_UP:e=!0,this._move("previousPage",n);break;case o.PAGE_DOWN:e=!0,this._move("nextPage",n);break;case o.UP:e=!0,this._keyEvent("previous",n);break;case o.DOWN:e=!0,this._keyEvent("next",n);break;case o.ENTER:this.menu.active&&(e=!0,n.preventDefault(),this.menu.select(n));break;case o.TAB:this.menu.active&&this.menu.select(n);break;case o.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(e)return e=!1,(!this.isMultiLine||this.menu.element.is(":visible"))&&s.preventDefault(),void 0;if(!i){var n=t.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(t){return s?(s=!1,t.preventDefault(),void 0):(this._searchTimeout(t),void 0)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(clearTimeout(this.searching),this.close(t),this._change(t),void 0)}}),this._initSource(),this.menu=t("<ul>").appendTo(this._appendTo()).menu({role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(e){e.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,this.element[0]!==t.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(e,i){var s,n;return this.isNewMenu&&(this.isNewMenu=!1,e.originalEvent&&/^mouse/.test(e.originalEvent.type))?(this.menu.blur(),this.document.one("mousemove",function(){t(e.target).trigger(e.originalEvent)}),void 0):(n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",e,{item:n})&&e.originalEvent&&/^key/.test(e.originalEvent.type)&&this._value(n.value),s=i.item.attr("aria-label")||n.value,s&&t.trim(s).length&&(this.liveRegion.children().hide(),t("<div>").text(s).appendTo(this.liveRegion)),void 0)},menuselect:function(e,i){var s=i.item.data("ui-autocomplete-item"),n=this.previous;this.element[0]!==t.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=n,this._delay(function(){this.previous=n,this.selectedItem=s})),!1!==this._trigger("select",e,{item:s})&&this._value(s.value),this.term=this._value(),this.close(e),this.selectedItem=s}}),this.liveRegion=t("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(t,e){this._super(t,e),"source"===t&&this._initSource(),"appendTo"===t&&this.menu.element.appendTo(this._appendTo()),"disabled"===t&&e&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(e){var i=this.menu.element[0];return e.target===this.element[0]||e.target===i||t.contains(i,e.target)},_closeOnClickOutside:function(t){this._isEventTargetInWidget(t)||this.close()},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_initSource:function(){var e,i,s=this;t.isArray(this.options.source)?(e=this.options.source,this.source=function(i,s){s(t.ui.autocomplete.filter(e,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(e,n){s.xhr&&s.xhr.abort(),s.xhr=t.ajax({url:i,data:e,dataType:"json",success:function(t){n(t)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(t){clearTimeout(this.searching),this.searching=this._delay(function(){var e=this.term===this._value(),i=this.menu.element.is(":visible"),s=t.altKey||t.ctrlKey||t.metaKey||t.shiftKey;(!e||e&&!i&&!s)&&(this.selectedItem=null,this.search(null,t))},this.options.delay)},search:function(t,e){return t=null!=t?t:this._value(),this.term=this._value(),t.length<this.options.minLength?this.close(e):this._trigger("search",e)!==!1?this._search(t):void 0},_search:function(t){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:t},this._response())},_response:function(){var e=++this.requestIndex;return t.proxy(function(t){e===this.requestIndex&&this.__response(t),this.pending--,this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(t){t&&(t=this._normalize(t)),this._trigger("response",null,{content:t}),!this.options.disabled&&t&&t.length&&!this.cancelSearch?(this._suggest(t),this._trigger("open")):this._close()},close:function(t){this.cancelSearch=!0,this._close(t)},_close:function(t){this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",t))},_change:function(t){this.previous!==this._value()&&this._trigger("change",t,{item:this.selectedItem})},_normalize:function(e){return e.length&&e[0].label&&e[0].value?e:t.map(e,function(e){return"string"==typeof e?{label:e,value:e}:t.extend({},e,{label:e.label||e.value,value:e.value||e.label})})},_suggest:function(e){var i=this.menu.element.empty();this._renderMenu(i,e),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(t.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var t=this.menu.element;t.outerWidth(Math.max(t.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(e,i){var s=this;t.each(i,function(t,i){s._renderItemData(e,i)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-autocomplete-item",e)},_renderItem:function(e,i){return t("<li>").append(t("<div>").text(i.label)).appendTo(e)},_move:function(t,e){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(t)||this.menu.isLastItem()&&/^next/.test(t)?(this.isMultiLine||this._value(this.term),this.menu.blur(),void 0):(this.menu[t](e),void 0):(this.search(null,e),void 0)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(t,e){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(t,e),e.preventDefault())},_isContentEditable:function(t){if(!t.length)return!1;var e=t.prop("contentEditable");return"inherit"===e?this._isContentEditable(t.parent()):"true"===e}}),t.extend(t.ui.autocomplete,{escapeRegex:function(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(e,i){var s=RegExp(t.ui.autocomplete.escapeRegex(i),"i");return t.grep(e,function(t){return s.test(t.label||t.value||t)})}}),t.widget("ui.autocomplete",t.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(t){return t+(t>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.children().hide(),t("<div>").text(i).appendTo(this.liveRegion))}}),t.ui.autocomplete;var g=/ui-corner-([a-z]){2,6}/g;t.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var e=this,i=[];t.each(this.options.items,function(s,n){var o,a={};return n?"controlgroupLabel"===s?(o=e.element.find(n),o.each(function(){var e=t(this);e.children(".ui-controlgroup-label-contents").length||e.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),e._addClass(o,null,"ui-widget ui-widget-content ui-state-default"),i=i.concat(o.get()),void 0):(t.fn[s]&&(a=e["_"+s+"Options"]?e["_"+s+"Options"]("middle"):{classes:{}},e.element.find(n).each(function(){var n=t(this),o=n[s]("instance"),r=t.widget.extend({},a);if("button"!==s||!n.parent(".ui-spinner").length){o||(o=n[s]()[s]("instance")),o&&(r.classes=e._resolveClassesValues(r.classes,o)),n[s](r);var h=n[s]("widget");t.data(h[0],"ui-controlgroup-data",o?o:n[s]("instance")),i.push(h[0])}})),void 0):void 0}),this.childWidgets=t(t.unique(i)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(e){this.childWidgets.each(function(){var i=t(this),s=i.data("ui-controlgroup-data");s&&s[e]&&s[e]()})},_updateCornerClass:function(t,e){var i="ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all",s=this._buildSimpleOptions(e,"label").classes.label;this._removeClass(t,null,i),this._addClass(t,null,s)},_buildSimpleOptions:function(t,e){var i="vertical"===this.options.direction,s={classes:{}};return s.classes[e]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[t],s},_spinnerOptions:function(t){var e=this._buildSimpleOptions(t,"ui-spinner");return e.classes["ui-spinner-up"]="",e.classes["ui-spinner-down"]="",e},_buttonOptions:function(t){return this._buildSimpleOptions(t,"ui-button")},_checkboxradioOptions:function(t){return this._buildSimpleOptions(t,"ui-checkboxradio-label")},_selectmenuOptions:function(t){var e="vertical"===this.options.direction;return{width:e?"auto":!1,classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(e?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(e?"top":"left")},last:{"ui-selectmenu-button-open":e?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(e?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[t]}},_resolveClassesValues:function(e,i){var s={};return t.each(e,function(n){var o=i.options.classes[n]||"";o=t.trim(o.replace(g,"")),s[n]=(o+" "+e[n]).replace(/\s+/g," ")}),s},_setOption:function(t,e){return"direction"===t&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(t,e),"disabled"===t?(this._callChildMethod(e?"disable":"enable"),void 0):(this.refresh(),void 0)},refresh:function(){var e,i=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),e=this.childWidgets,this.options.onlyVisible&&(e=e.filter(":visible")),e.length&&(t.each(["first","last"],function(t,s){var n=e[s]().data("ui-controlgroup-data");if(n&&i["_"+n.widgetName+"Options"]){var o=i["_"+n.widgetName+"Options"](1===e.length?"only":s);o.classes=i._resolveClassesValues(o.classes,n),n.element[n.widgetName](o)}else i._updateCornerClass(e[s](),s)}),this._callChildMethod("refresh"))}}),t.widget("ui.checkboxradio",[t.ui.formResetMixin,{version:"1.12.1",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var e,i,s=this,n=this._super()||{};return this._readType(),i=this.element.labels(),this.label=t(i[i.length-1]),this.label.length||t.error("No label found for checkboxradio widget"),this.originalLabel="",this.label.contents().not(this.element[0]).each(function(){s.originalLabel+=3===this.nodeType?t(this).text():this.outerHTML}),this.originalLabel&&(n.label=this.originalLabel),e=this.element[0].disabled,null!=e&&(n.disabled=e),n},_create:function(){var t=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),t&&(this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this.icon&&this._addClass(this.icon,null,"ui-state-hover")),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var e=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===e&&/radio|checkbox/.test(this.type)||t.error("Can't create checkboxradio on element.nodeName="+e+" and element.type="+this.type)},_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var e,i=this.element[0].name,s="input[name='"+t.ui.escapeSelector(i)+"']";return i?(e=this.form.length?t(this.form[0].elements).filter(s):t(s).filter(function(){return 0===t(this).form().length}),e.not(this.element)):t([])},_toggleClasses:function(){var e=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",e),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",e)._toggleClass(this.icon,null,"ui-icon-blank",!e),"radio"===this.type&&this._getRadioGroup().each(function(){var e=t(this).checkboxradio("instance");e&&e._removeClass(e.label,"ui-checkboxradio-checked","ui-state-active")})},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(t,e){return"label"!==t||e?(this._super(t,e),"disabled"===t?(this._toggleClass(this.label,null,"ui-state-disabled",e),this.element[0].disabled=e,void 0):(this.refresh(),void 0)):void 0},_updateIcon:function(e){var i="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=t("<span>"),this.iconSpace=t("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(i+=e?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,e?"ui-icon-blank":"ui-icon-check")):i+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",i),e||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):void 0!==this.icon&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)},_updateLabel:function(){var t=this.label.contents().not(this.element[0]);this.icon&&(t=t.not(this.icon[0])),this.iconSpace&&(t=t.not(this.iconSpace[0])),t.remove(),this.label.append(this.options.label)},refresh:function(){var t=this.element[0].checked,e=this.element[0].disabled;this._updateIcon(t),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",t),null!==this.options.label&&this._updateLabel(),e!==this.options.disabled&&this._setOptions({disabled:e})}}]),t.ui.checkboxradio,t.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var t,e=this._super()||{};return this.isInput=this.element.is("input"),t=this.element[0].disabled,null!=t&&(e.disabled=t),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(e.label=this.originalLabel),e},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(e){e.keyCode===t.ui.keyCode.SPACE&&(e.preventDefault(),this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(e,i){var s="iconPosition"!==e,n=s?this.options.iconPosition:i,o="top"===n||"bottom"===n;this.icon?s&&this._removeClass(this.icon,null,this.options.icon):(this.icon=t("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),s&&this._addClass(this.icon,null,i),this._attachIcon(n),o?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(this.iconSpace||(this.iconSpace=t("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(n))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(t){this.icon[/^(?:end|bottom)/.test(t)?"before":"after"](this.iconSpace)},_attachIcon:function(t){this.element[/^(?:end|bottom)/.test(t)?"append":"prepend"](this.icon)},_setOptions:function(t){var e=void 0===t.showLabel?this.options.showLabel:t.showLabel,i=void 0===t.icon?this.options.icon:t.icon;e||i||(t.showLabel=!0),this._super(t)},_setOption:function(t,e){"icon"===t&&(e?this._updateIcon(t,e):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===t&&this._updateIcon(t,e),"showLabel"===t&&(this._toggleClass("ui-button-icon-only",null,!e),this._updateTooltip()),"label"===t&&(this.isInput?this.element.val(e):(this.element.html(e),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(t,e),"disabled"===t&&(this._toggleClass(null,"ui-state-disabled",e),this.element[0].disabled=e,e&&this.element.blur())},refresh:function(){var t=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");t!==this.options.disabled&&this._setOptions({disabled:t}),this._updateTooltip()}}),t.uiBackCompat!==!1&&(t.widget("ui.button",t.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(t,e){return"text"===t?(this._super("showLabel",e),void 0):("showLabel"===t&&(this.options.text=e),"icon"===t&&(this.options.icons.primary=e),"icons"===t&&(e.primary?(this._super("icon",e.primary),this._super("iconPosition","beginning")):e.secondary&&(this._super("icon",e.secondary),this._super("iconPosition","end"))),this._superApply(arguments),void 0)}}),t.fn.button=function(e){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?e.apply(this,arguments):(t.ui.checkboxradio||t.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}(t.fn.button),t.fn.buttonset=function(){return t.ui.controlgroup||t.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))}),t.ui.button,t.extend(t.ui,{datepicker:{version:"1.12.1"}});var m;t.extend(s.prototype,{markerClassName:"hasDatepicker",maxRows:4,_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(t){return a(this._defaults,t||{}),this},_attachDatepicker:function(e,i){var s,n,o;s=e.nodeName.toLowerCase(),n="div"===s||"span"===s,e.id||(this.uuid+=1,e.id="dp"+this.uuid),o=this._newInst(t(e),n),o.settings=t.extend({},i||{}),"input"===s?this._connectDatepicker(e,o):n&&this._inlineDatepicker(e,o)},_newInst:function(e,i){var s=e[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1");return{id:s,input:e,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:i,dpDiv:i?n(t("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},_connectDatepicker:function(e,i){var s=t(e);i.append=t([]),i.trigger=t([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(i),t.data(e,"datepicker",i),i.settings.disabled&&this._disableDatepicker(e))},_attachments:function(e,i){var s,n,o,a=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),a&&(i.append=t("<span class='"+this._appendClass+"'>"+a+"</span>"),e[r?"before":"after"](i.append)),e.off("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),("focus"===s||"both"===s)&&e.on("focus",this._showDatepicker),("button"===s||"both"===s)&&(n=this._get(i,"buttonText"),o=this._get(i,"buttonImage"),i.trigger=t(this._get(i,"buttonImageOnly")?t("<img/>").addClass(this._triggerClass).attr({src:o,alt:n,title:n}):t("<button type='button'></button>").addClass(this._triggerClass).html(o?t("<img/>").attr({src:o,alt:n,title:n}):n)),e[r?"before":"after"](i.trigger),i.trigger.on("click",function(){return t.datepicker._datepickerShowing&&t.datepicker._lastInput===e[0]?t.datepicker._hideDatepicker():t.datepicker._datepickerShowing&&t.datepicker._lastInput!==e[0]?(t.datepicker._hideDatepicker(),t.datepicker._showDatepicker(e[0])):t.datepicker._showDatepicker(e[0]),!1}))},_autoSize:function(t){if(this._get(t,"autoSize")&&!t.inline){var e,i,s,n,o=new Date(2009,11,20),a=this._get(t,"dateFormat");a.match(/[DM]/)&&(e=function(t){for(i=0,s=0,n=0;t.length>n;n++)t[n].length>i&&(i=t[n].length,s=n);return s},o.setMonth(e(this._get(t,a.match(/MM/)?"monthNames":"monthNamesShort"))),o.setDate(e(this._get(t,a.match(/DD/)?"dayNames":"dayNamesShort"))+20-o.getDay())),t.input.attr("size",this._formatDate(t,o).length)}},_inlineDatepicker:function(e,i){var s=t(e);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),t.data(e,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),i.settings.disabled&&this._disableDatepicker(e),i.dpDiv.css("display","block"))},_dialogDatepicker:function(e,i,s,n,o){var r,h,l,c,u,d=this._dialogInst;return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=t("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),t("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},t.data(this._dialogInput[0],"datepicker",d)),a(d.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=o?o.length?o:[o.pageX,o.pageY]:null,this._pos||(h=document.documentElement.clientWidth,l=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,u=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[h/2-100+c,l/2-150+u]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),t.blockUI&&t.blockUI(this.dpDiv),t.data(this._dialogInput[0],"datepicker",d),this},_destroyDatepicker:function(e){var i,s=t(e),n=t.data(e,"datepicker");s.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),t.removeData(e,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):("div"===i||"span"===i)&&s.removeClass(this.markerClassName).empty(),m===n&&(m=null))},_enableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!1,o.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}))},_disableDatepicker:function(e){var i,s,n=t(e),o=t.data(e,"datepicker");n.hasClass(this.markerClassName)&&(i=e.nodeName.toLowerCase(),"input"===i?(e.disabled=!0,o.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):("div"===i||"span"===i)&&(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=t.map(this._disabledInputs,function(t){return t===e?null:t}),this._disabledInputs[this._disabledInputs.length]=e)},_isDisabledDatepicker:function(t){if(!t)return!1;for(var e=0;this._disabledInputs.length>e;e++)if(this._disabledInputs[e]===t)return!0;return!1},_getInst:function(e){try{return t.data(e,"datepicker")}catch(i){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(e,i,s){var n,o,r,h,l=this._getInst(e);return 2===arguments.length&&"string"==typeof i?"defaults"===i?t.extend({},t.datepicker._defaults):l?"all"===i?t.extend({},l.settings):this._get(l,i):null:(n=i||{},"string"==typeof i&&(n={},n[i]=s),l&&(this._curInst===l&&this._hideDatepicker(),o=this._getDateDatepicker(e,!0),r=this._getMinMaxDate(l,"min"),h=this._getMinMaxDate(l,"max"),a(l.settings,n),null!==r&&void 0!==n.dateFormat&&void 0===n.minDate&&(l.settings.minDate=this._formatDate(l,r)),null!==h&&void 0!==n.dateFormat&&void 0===n.maxDate&&(l.settings.maxDate=this._formatDate(l,h)),"disabled"in n&&(n.disabled?this._disableDatepicker(e):this._enableDatepicker(e)),this._attachments(t(e),l),this._autoSize(l),this._setDate(l,o),this._updateAlternate(l),this._updateDatepicker(l)),void 0)},_changeDatepicker:function(t,e,i){this._optionDatepicker(t,e,i)},_refreshDatepicker:function(t){var e=this._getInst(t);e&&this._updateDatepicker(e)},_setDateDatepicker:function(t,e){var i=this._getInst(t);i&&(this._setDate(i,e),this._updateDatepicker(i),this._updateAlternate(i))},_getDateDatepicker:function(t,e){var i=this._getInst(t);return i&&!i.inline&&this._setDateFromField(i,e),i?this._getDate(i):null},_doKeyDown:function(e){var i,s,n,o=t.datepicker._getInst(e.target),a=!0,r=o.dpDiv.is(".ui-datepicker-rtl");if(o._keyEvent=!0,t.datepicker._datepickerShowing)switch(e.keyCode){case 9:t.datepicker._hideDatepicker(),a=!1;break;case 13:return n=t("td."+t.datepicker._dayOverClass+":not(."+t.datepicker._currentClass+")",o.dpDiv),n[0]&&t.datepicker._selectDay(e.target,o.selectedMonth,o.selectedYear,n[0]),i=t.datepicker._get(o,"onSelect"),i?(s=t.datepicker._formatDate(o),i.apply(o.input?o.input[0]:null,[s,o])):t.datepicker._hideDatepicker(),!1;case 27:t.datepicker._hideDatepicker();break;case 33:t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 34:t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 35:(e.ctrlKey||e.metaKey)&&t.datepicker._clearDate(e.target),a=e.ctrlKey||e.metaKey;break;case 36:(e.ctrlKey||e.metaKey)&&t.datepicker._gotoToday(e.target),a=e.ctrlKey||e.metaKey;break;case 37:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?1:-1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?-t.datepicker._get(o,"stepBigMonths"):-t.datepicker._get(o,"stepMonths"),"M");break;case 38:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,-7,"D"),a=e.ctrlKey||e.metaKey;break;case 39:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,r?-1:1,"D"),a=e.ctrlKey||e.metaKey,e.originalEvent.altKey&&t.datepicker._adjustDate(e.target,e.ctrlKey?+t.datepicker._get(o,"stepBigMonths"):+t.datepicker._get(o,"stepMonths"),"M");break;case 40:(e.ctrlKey||e.metaKey)&&t.datepicker._adjustDate(e.target,7,"D"),a=e.ctrlKey||e.metaKey;break;default:a=!1}else 36===e.keyCode&&e.ctrlKey?t.datepicker._showDatepicker(this):a=!1;a&&(e.preventDefault(),e.stopPropagation())},_doKeyPress:function(e){var i,s,n=t.datepicker._getInst(e.target);return t.datepicker._get(n,"constrainInput")?(i=t.datepicker._possibleChars(t.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),e.ctrlKey||e.metaKey||" ">s||!i||i.indexOf(s)>-1):void 0},_doKeyUp:function(e){var i,s=t.datepicker._getInst(e.target);if(s.input.val()!==s.lastVal)try{i=t.datepicker.parseDate(t.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,t.datepicker._getFormatConfig(s)),i&&(t.datepicker._setDateFromField(s),t.datepicker._updateAlternate(s),t.datepicker._updateDatepicker(s))}catch(n){}return!0},_showDatepicker:function(e){if(e=e.target||e,"input"!==e.nodeName.toLowerCase()&&(e=t("input",e.parentNode)[0]),!t.datepicker._isDisabledDatepicker(e)&&t.datepicker._lastInput!==e){var s,n,o,r,h,l,c;s=t.datepicker._getInst(e),t.datepicker._curInst&&t.datepicker._curInst!==s&&(t.datepicker._curInst.dpDiv.stop(!0,!0),s&&t.datepicker._datepickerShowing&&t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])),n=t.datepicker._get(s,"beforeShow"),o=n?n.apply(e,[e,s]):{},o!==!1&&(a(s.settings,o),s.lastVal=null,t.datepicker._lastInput=e,t.datepicker._setDateFromField(s),t.datepicker._inDialog&&(e.value=""),t.datepicker._pos||(t.datepicker._pos=t.datepicker._findPos(e),t.datepicker._pos[1]+=e.offsetHeight),r=!1,t(e).parents().each(function(){return r|="fixed"===t(this).css("position"),!r}),h={left:t.datepicker._pos[0],top:t.datepicker._pos[1]},t.datepicker._pos=null,s.dpDiv.empty(),s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),t.datepicker._updateDatepicker(s),h=t.datepicker._checkOffset(s,h,r),s.dpDiv.css({position:t.datepicker._inDialog&&t.blockUI?"static":r?"fixed":"absolute",display:"none",left:h.left+"px",top:h.top+"px"}),s.inline||(l=t.datepicker._get(s,"showAnim"),c=t.datepicker._get(s,"duration"),s.dpDiv.css("z-index",i(t(e))+1),t.datepicker._datepickerShowing=!0,t.effects&&t.effects.effect[l]?s.dpDiv.show(l,t.datepicker._get(s,"showOptions"),c):s.dpDiv[l||"show"](l?c:null),t.datepicker._shouldFocusInput(s)&&s.input.trigger("focus"),t.datepicker._curInst=s))
}},_updateDatepicker:function(e){this.maxRows=4,m=e,e.dpDiv.empty().append(this._generateHTML(e)),this._attachHandlers(e);var i,s=this._getNumberOfMonths(e),n=s[1],a=17,r=e.dpDiv.find("."+this._dayOverClass+" a");r.length>0&&o.apply(r.get(0)),e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&e.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",a*n+"em"),e.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),e.dpDiv[(this._get(e,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),e===t.datepicker._curInst&&t.datepicker._datepickerShowing&&t.datepicker._shouldFocusInput(e)&&e.input.trigger("focus"),e.yearshtml&&(i=e.yearshtml,setTimeout(function(){i===e.yearshtml&&e.yearshtml&&e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml),i=e.yearshtml=null},0))},_shouldFocusInput:function(t){return t.input&&t.input.is(":visible")&&!t.input.is(":disabled")&&!t.input.is(":focus")},_checkOffset:function(e,i,s){var n=e.dpDiv.outerWidth(),o=e.dpDiv.outerHeight(),a=e.input?e.input.outerWidth():0,r=e.input?e.input.outerHeight():0,h=document.documentElement.clientWidth+(s?0:t(document).scrollLeft()),l=document.documentElement.clientHeight+(s?0:t(document).scrollTop());return i.left-=this._get(e,"isRTL")?n-a:0,i.left-=s&&i.left===e.input.offset().left?t(document).scrollLeft():0,i.top-=s&&i.top===e.input.offset().top+r?t(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>h&&h>n?Math.abs(i.left+n-h):0),i.top-=Math.min(i.top,i.top+o>l&&l>o?Math.abs(o+r):0),i},_findPos:function(e){for(var i,s=this._getInst(e),n=this._get(s,"isRTL");e&&("hidden"===e.type||1!==e.nodeType||t.expr.filters.hidden(e));)e=e[n?"previousSibling":"nextSibling"];return i=t(e).offset(),[i.left,i.top]},_hideDatepicker:function(e){var i,s,n,o,a=this._curInst;!a||e&&a!==t.data(e,"datepicker")||this._datepickerShowing&&(i=this._get(a,"showAnim"),s=this._get(a,"duration"),n=function(){t.datepicker._tidyDialog(a)},t.effects&&(t.effects.effect[i]||t.effects[i])?a.dpDiv.hide(i,t.datepicker._get(a,"showOptions"),s,n):a.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,o=this._get(a,"onClose"),o&&o.apply(a.input?a.input[0]:null,[a.input?a.input.val():"",a]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),t.blockUI&&(t.unblockUI(),t("body").append(this.dpDiv))),this._inDialog=!1)},_tidyDialog:function(t){t.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},_checkExternalClick:function(e){if(t.datepicker._curInst){var i=t(e.target),s=t.datepicker._getInst(i[0]);(i[0].id!==t.datepicker._mainDivId&&0===i.parents("#"+t.datepicker._mainDivId).length&&!i.hasClass(t.datepicker.markerClassName)&&!i.closest("."+t.datepicker._triggerClass).length&&t.datepicker._datepickerShowing&&(!t.datepicker._inDialog||!t.blockUI)||i.hasClass(t.datepicker.markerClassName)&&t.datepicker._curInst!==s)&&t.datepicker._hideDatepicker()}},_adjustDate:function(e,i,s){var n=t(e),o=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(o,i+("M"===s?this._get(o,"showCurrentAtPos"):0),s),this._updateDatepicker(o))},_gotoToday:function(e){var i,s=t(e),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},_selectMonthYear:function(e,i,s){var n=t(e),o=this._getInst(n[0]);o["selected"+("M"===s?"Month":"Year")]=o["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(o),this._adjustDate(n)},_selectDay:function(e,i,s,n){var o,a=t(e);t(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(a[0])||(o=this._getInst(a[0]),o.selectedDay=o.currentDay=t("a",n).html(),o.selectedMonth=o.currentMonth=i,o.selectedYear=o.currentYear=s,this._selectDate(e,this._formatDate(o,o.currentDay,o.currentMonth,o.currentYear)))},_clearDate:function(e){var i=t(e);this._selectDate(i,"")},_selectDate:function(e,i){var s,n=t(e),o=this._getInst(n[0]);i=null!=i?i:this._formatDate(o),o.input&&o.input.val(i),this._updateAlternate(o),s=this._get(o,"onSelect"),s?s.apply(o.input?o.input[0]:null,[i,o]):o.input&&o.input.trigger("change"),o.inline?this._updateDatepicker(o):(this._hideDatepicker(),this._lastInput=o.input[0],"object"!=typeof o.input[0]&&o.input.trigger("focus"),this._lastInput=null)},_updateAlternate:function(e){var i,s,n,o=this._get(e,"altField");o&&(i=this._get(e,"altFormat")||this._get(e,"dateFormat"),s=this._getDate(e),n=this.formatDate(i,s,this._getFormatConfig(e)),t(o).val(n))},noWeekends:function(t){var e=t.getDay();return[e>0&&6>e,""]},iso8601Week:function(t){var e,i=new Date(t.getTime());return i.setDate(i.getDate()+4-(i.getDay()||7)),e=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((e-i)/864e5)/7)+1},parseDate:function(e,i,s){if(null==e||null==i)throw"Invalid arguments";if(i="object"==typeof i?""+i:i+"",""===i)return null;var n,o,a,r,h=0,l=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof l?l:(new Date).getFullYear()%100+parseInt(l,10),u=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,g=-1,m=-1,_=-1,v=-1,b=!1,y=function(t){var i=e.length>n+1&&e.charAt(n+1)===t;return i&&n++,i},w=function(t){var e=y(t),s="@"===t?14:"!"===t?20:"y"===t&&e?4:"o"===t?3:2,n="y"===t?s:1,o=RegExp("^\\d{"+n+","+s+"}"),a=i.substring(h).match(o);if(!a)throw"Missing number at position "+h;return h+=a[0].length,parseInt(a[0],10)},k=function(e,s,n){var o=-1,a=t.map(y(e)?n:s,function(t,e){return[[e,t]]}).sort(function(t,e){return-(t[1].length-e[1].length)});if(t.each(a,function(t,e){var s=e[1];return i.substr(h,s.length).toLowerCase()===s.toLowerCase()?(o=e[0],h+=s.length,!1):void 0}),-1!==o)return o+1;throw"Unknown name at position "+h},x=function(){if(i.charAt(h)!==e.charAt(n))throw"Unexpected literal at position "+h;h++};for(n=0;e.length>n;n++)if(b)"'"!==e.charAt(n)||y("'")?x():b=!1;else switch(e.charAt(n)){case"d":_=w("d");break;case"D":k("D",u,d);break;case"o":v=w("o");break;case"m":m=w("m");break;case"M":m=k("M",p,f);break;case"y":g=w("y");break;case"@":r=new Date(w("@")),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"!":r=new Date((w("!")-this._ticksTo1970)/1e4),g=r.getFullYear(),m=r.getMonth()+1,_=r.getDate();break;case"'":y("'")?x():b=!0;break;default:x()}if(i.length>h&&(a=i.substr(h),!/^\s+/.test(a)))throw"Extra/unparsed characters found in date: "+a;if(-1===g?g=(new Date).getFullYear():100>g&&(g+=(new Date).getFullYear()-(new Date).getFullYear()%100+(c>=g?0:-100)),v>-1)for(m=1,_=v;;){if(o=this._getDaysInMonth(g,m-1),o>=_)break;m++,_-=o}if(r=this._daylightSavingAdjust(new Date(g,m-1,_)),r.getFullYear()!==g||r.getMonth()+1!==m||r.getDate()!==_)throw"Invalid date";return r},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:1e7*60*60*24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925)),formatDate:function(t,e,i){if(!e)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,o=(i?i.dayNames:null)||this._defaults.dayNames,a=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,h=function(e){var i=t.length>s+1&&t.charAt(s+1)===e;return i&&s++,i},l=function(t,e,i){var s=""+e;if(h(t))for(;i>s.length;)s="0"+s;return s},c=function(t,e,i,s){return h(t)?s[e]:i[e]},u="",d=!1;if(e)for(s=0;t.length>s;s++)if(d)"'"!==t.charAt(s)||h("'")?u+=t.charAt(s):d=!1;else switch(t.charAt(s)){case"d":u+=l("d",e.getDate(),2);break;case"D":u+=c("D",e.getDay(),n,o);break;case"o":u+=l("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=l("m",e.getMonth()+1,2);break;case"M":u+=c("M",e.getMonth(),a,r);break;case"y":u+=h("y")?e.getFullYear():(10>e.getFullYear()%100?"0":"")+e.getFullYear()%100;break;case"@":u+=e.getTime();break;case"!":u+=1e4*e.getTime()+this._ticksTo1970;break;case"'":h("'")?u+="'":d=!0;break;default:u+=t.charAt(s)}return u},_possibleChars:function(t){var e,i="",s=!1,n=function(i){var s=t.length>e+1&&t.charAt(e+1)===i;return s&&e++,s};for(e=0;t.length>e;e++)if(s)"'"!==t.charAt(e)||n("'")?i+=t.charAt(e):s=!1;else switch(t.charAt(e)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;case"'":n("'")?i+="'":s=!0;break;default:i+=t.charAt(e)}return i},_get:function(t,e){return void 0!==t.settings[e]?t.settings[e]:this._defaults[e]},_setDateFromField:function(t,e){if(t.input.val()!==t.lastVal){var i=this._get(t,"dateFormat"),s=t.lastVal=t.input?t.input.val():null,n=this._getDefaultDate(t),o=n,a=this._getFormatConfig(t);try{o=this.parseDate(i,s,a)||n}catch(r){s=e?"":s}t.selectedDay=o.getDate(),t.drawMonth=t.selectedMonth=o.getMonth(),t.drawYear=t.selectedYear=o.getFullYear(),t.currentDay=s?o.getDate():0,t.currentMonth=s?o.getMonth():0,t.currentYear=s?o.getFullYear():0,this._adjustInstDate(t)}},_getDefaultDate:function(t){return this._restrictMinMax(t,this._determineDate(t,this._get(t,"defaultDate"),new Date))},_determineDate:function(e,i,s){var n=function(t){var e=new Date;return e.setDate(e.getDate()+t),e},o=function(i){try{return t.datepicker.parseDate(t.datepicker._get(e,"dateFormat"),i,t.datepicker._getFormatConfig(e))}catch(s){}for(var n=(i.toLowerCase().match(/^c/)?t.datepicker._getDate(e):null)||new Date,o=n.getFullYear(),a=n.getMonth(),r=n.getDate(),h=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=h.exec(i);l;){switch(l[2]||"d"){case"d":case"D":r+=parseInt(l[1],10);break;case"w":case"W":r+=7*parseInt(l[1],10);break;case"m":case"M":a+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a));break;case"y":case"Y":o+=parseInt(l[1],10),r=Math.min(r,t.datepicker._getDaysInMonth(o,a))}l=h.exec(i)}return new Date(o,a,r)},a=null==i||""===i?s:"string"==typeof i?o(i):"number"==typeof i?isNaN(i)?s:n(i):new Date(i.getTime());return a=a&&"Invalid Date"==""+a?s:a,a&&(a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0)),this._daylightSavingAdjust(a)},_daylightSavingAdjust:function(t){return t?(t.setHours(t.getHours()>12?t.getHours()+2:0),t):null},_setDate:function(t,e,i){var s=!e,n=t.selectedMonth,o=t.selectedYear,a=this._restrictMinMax(t,this._determineDate(t,e,new Date));t.selectedDay=t.currentDay=a.getDate(),t.drawMonth=t.selectedMonth=t.currentMonth=a.getMonth(),t.drawYear=t.selectedYear=t.currentYear=a.getFullYear(),n===t.selectedMonth&&o===t.selectedYear||i||this._notifyChange(t),this._adjustInstDate(t),t.input&&t.input.val(s?"":this._formatDate(t))},_getDate:function(t){var e=!t.currentYear||t.input&&""===t.input.val()?null:this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return e},_attachHandlers:function(e){var i=this._get(e,"stepMonths"),s="#"+e.id.replace(/\\\\/g,"\\");e.dpDiv.find("[data-handler]").map(function(){var e={prev:function(){t.datepicker._adjustDate(s,-i,"M")},next:function(){t.datepicker._adjustDate(s,+i,"M")},hide:function(){t.datepicker._hideDatepicker()},today:function(){t.datepicker._gotoToday(s)},selectDay:function(){return t.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return t.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return t.datepicker._selectMonthYear(s,this,"Y"),!1}};t(this).on(this.getAttribute("data-event"),e[this.getAttribute("data-handler")])})},_generateHTML:function(t){var e,i,s,n,o,a,r,h,l,c,u,d,p,f,g,m,_,v,b,y,w,k,x,C,D,I,T,P,M,S,H,z,O,A,N,W,E,F,L,R=new Date,B=this._daylightSavingAdjust(new Date(R.getFullYear(),R.getMonth(),R.getDate())),Y=this._get(t,"isRTL"),j=this._get(t,"showButtonPanel"),q=this._get(t,"hideIfNoPrevNext"),K=this._get(t,"navigationAsDateFormat"),U=this._getNumberOfMonths(t),V=this._get(t,"showCurrentAtPos"),$=this._get(t,"stepMonths"),X=1!==U[0]||1!==U[1],G=this._daylightSavingAdjust(t.currentDay?new Date(t.currentYear,t.currentMonth,t.currentDay):new Date(9999,9,9)),Q=this._getMinMaxDate(t,"min"),J=this._getMinMaxDate(t,"max"),Z=t.drawMonth-V,te=t.drawYear;if(0>Z&&(Z+=12,te--),J)for(e=this._daylightSavingAdjust(new Date(J.getFullYear(),J.getMonth()-U[0]*U[1]+1,J.getDate())),e=Q&&Q>e?Q:e;this._daylightSavingAdjust(new Date(te,Z,1))>e;)Z--,0>Z&&(Z=11,te--);for(t.drawMonth=Z,t.drawYear=te,i=this._get(t,"prevText"),i=K?this.formatDate(i,this._daylightSavingAdjust(new Date(te,Z-$,1)),this._getFormatConfig(t)):i,s=this._canAdjustMonth(t,-1,te,Z)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>":q?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"e":"w")+"'>"+i+"</span></a>",n=this._get(t,"nextText"),n=K?this.formatDate(n,this._daylightSavingAdjust(new Date(te,Z+$,1)),this._getFormatConfig(t)):n,o=this._canAdjustMonth(t,1,te,Z)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>":q?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(Y?"w":"e")+"'>"+n+"</span></a>",a=this._get(t,"currentText"),r=this._get(t,"gotoCurrent")&&t.currentDay?G:B,a=K?this.formatDate(a,r,this._getFormatConfig(t)):a,h=t.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(t,"closeText")+"</button>",l=j?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(Y?h:"")+(this._isInRange(t,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+a+"</button>":"")+(Y?"":h)+"</div>":"",c=parseInt(this._get(t,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(t,"showWeek"),d=this._get(t,"dayNames"),p=this._get(t,"dayNamesMin"),f=this._get(t,"monthNames"),g=this._get(t,"monthNamesShort"),m=this._get(t,"beforeShowDay"),_=this._get(t,"showOtherMonths"),v=this._get(t,"selectOtherMonths"),b=this._getDefaultDate(t),y="",k=0;U[0]>k;k++){for(x="",this.maxRows=4,C=0;U[1]>C;C++){if(D=this._daylightSavingAdjust(new Date(te,Z,t.selectedDay)),I=" ui-corner-all",T="",X){if(T+="<div class='ui-datepicker-group",U[1]>1)switch(C){case 0:T+=" ui-datepicker-group-first",I=" ui-corner-"+(Y?"right":"left");break;case U[1]-1:T+=" ui-datepicker-group-last",I=" ui-corner-"+(Y?"left":"right");break;default:T+=" ui-datepicker-group-middle",I=""}T+="'>"}for(T+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+I+"'>"+(/all|left/.test(I)&&0===k?Y?o:s:"")+(/all|right/.test(I)&&0===k?Y?s:o:"")+this._generateMonthYearHeader(t,Z,te,Q,J,k>0||C>0,f,g)+"</div><table class='ui-datepicker-calendar'><thead>"+"<tr>",P=u?"<th class='ui-datepicker-week-col'>"+this._get(t,"weekHeader")+"</th>":"",w=0;7>w;w++)M=(w+c)%7,P+="<th scope='col'"+((w+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+">"+"<span title='"+d[M]+"'>"+p[M]+"</span></th>";for(T+=P+"</tr></thead><tbody>",S=this._getDaysInMonth(te,Z),te===t.selectedYear&&Z===t.selectedMonth&&(t.selectedDay=Math.min(t.selectedDay,S)),H=(this._getFirstDayOfMonth(te,Z)-c+7)%7,z=Math.ceil((H+S)/7),O=X?this.maxRows>z?this.maxRows:z:z,this.maxRows=O,A=this._daylightSavingAdjust(new Date(te,Z,1-H)),N=0;O>N;N++){for(T+="<tr>",W=u?"<td class='ui-datepicker-week-col'>"+this._get(t,"calculateWeek")(A)+"</td>":"",w=0;7>w;w++)E=m?m.apply(t.input?t.input[0]:null,[A]):[!0,""],F=A.getMonth()!==Z,L=F&&!v||!E[0]||Q&&Q>A||J&&A>J,W+="<td class='"+((w+c+6)%7>=5?" ui-datepicker-week-end":"")+(F?" ui-datepicker-other-month":"")+(A.getTime()===D.getTime()&&Z===t.selectedMonth&&t._keyEvent||b.getTime()===A.getTime()&&b.getTime()===D.getTime()?" "+this._dayOverClass:"")+(L?" "+this._unselectableClass+" ui-state-disabled":"")+(F&&!_?"":" "+E[1]+(A.getTime()===G.getTime()?" "+this._currentClass:"")+(A.getTime()===B.getTime()?" ui-datepicker-today":""))+"'"+(F&&!_||!E[2]?"":" title='"+E[2].replace(/'/g,"&#39;")+"'")+(L?"":" data-handler='selectDay' data-event='click' data-month='"+A.getMonth()+"' data-year='"+A.getFullYear()+"'")+">"+(F&&!_?"&#xa0;":L?"<span class='ui-state-default'>"+A.getDate()+"</span>":"<a class='ui-state-default"+(A.getTime()===B.getTime()?" ui-state-highlight":"")+(A.getTime()===G.getTime()?" ui-state-active":"")+(F?" ui-priority-secondary":"")+"' href='#'>"+A.getDate()+"</a>")+"</td>",A.setDate(A.getDate()+1),A=this._daylightSavingAdjust(A);T+=W+"</tr>"}Z++,Z>11&&(Z=0,te++),T+="</tbody></table>"+(X?"</div>"+(U[0]>0&&C===U[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),x+=T}y+=x}return y+=l,t._keyEvent=!1,y},_generateMonthYearHeader:function(t,e,i,s,n,o,a,r){var h,l,c,u,d,p,f,g,m=this._get(t,"changeMonth"),_=this._get(t,"changeYear"),v=this._get(t,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",y="";if(o||!m)y+="<span class='ui-datepicker-month'>"+a[e]+"</span>";else{for(h=s&&s.getFullYear()===i,l=n&&n.getFullYear()===i,y+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;12>c;c++)(!h||c>=s.getMonth())&&(!l||n.getMonth()>=c)&&(y+="<option value='"+c+"'"+(c===e?" selected='selected'":"")+">"+r[c]+"</option>");y+="</select>"}if(v||(b+=y+(!o&&m&&_?"":"&#xa0;")),!t.yearshtml)if(t.yearshtml="",o||!_)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(u=this._get(t,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(t){var e=t.match(/c[+\-].*/)?i+parseInt(t.substring(1),10):t.match(/[+\-].*/)?d+parseInt(t,10):parseInt(t,10);return isNaN(e)?d:e},f=p(u[0]),g=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,g=n?Math.min(g,n.getFullYear()):g,t.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";g>=f;f++)t.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";t.yearshtml+="</select>",b+=t.yearshtml,t.yearshtml=null}return b+=this._get(t,"yearSuffix"),v&&(b+=(!o&&m&&_?"":"&#xa0;")+y),b+="</div>"},_adjustInstDate:function(t,e,i){var s=t.selectedYear+("Y"===i?e:0),n=t.selectedMonth+("M"===i?e:0),o=Math.min(t.selectedDay,this._getDaysInMonth(s,n))+("D"===i?e:0),a=this._restrictMinMax(t,this._daylightSavingAdjust(new Date(s,n,o)));t.selectedDay=a.getDate(),t.drawMonth=t.selectedMonth=a.getMonth(),t.drawYear=t.selectedYear=a.getFullYear(),("M"===i||"Y"===i)&&this._notifyChange(t)},_restrictMinMax:function(t,e){var i=this._getMinMaxDate(t,"min"),s=this._getMinMaxDate(t,"max"),n=i&&i>e?i:e;return s&&n>s?s:n},_notifyChange:function(t){var e=this._get(t,"onChangeMonthYear");e&&e.apply(t.input?t.input[0]:null,[t.selectedYear,t.selectedMonth+1,t])},_getNumberOfMonths:function(t){var e=this._get(t,"numberOfMonths");return null==e?[1,1]:"number"==typeof e?[1,e]:e},_getMinMaxDate:function(t,e){return this._determineDate(t,this._get(t,e+"Date"),null)},_getDaysInMonth:function(t,e){return 32-this._daylightSavingAdjust(new Date(t,e,32)).getDate()},_getFirstDayOfMonth:function(t,e){return new Date(t,e,1).getDay()},_canAdjustMonth:function(t,e,i,s){var n=this._getNumberOfMonths(t),o=this._daylightSavingAdjust(new Date(i,s+(0>e?e:n[0]*n[1]),1));return 0>e&&o.setDate(this._getDaysInMonth(o.getFullYear(),o.getMonth())),this._isInRange(t,o)},_isInRange:function(t,e){var i,s,n=this._getMinMaxDate(t,"min"),o=this._getMinMaxDate(t,"max"),a=null,r=null,h=this._get(t,"yearRange");return h&&(i=h.split(":"),s=(new Date).getFullYear(),a=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(a+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||e.getTime()>=n.getTime())&&(!o||e.getTime()<=o.getTime())&&(!a||e.getFullYear()>=a)&&(!r||r>=e.getFullYear())},_getFormatConfig:function(t){var e=this._get(t,"shortYearCutoff");return e="string"!=typeof e?e:(new Date).getFullYear()%100+parseInt(e,10),{shortYearCutoff:e,dayNamesShort:this._get(t,"dayNamesShort"),dayNames:this._get(t,"dayNames"),monthNamesShort:this._get(t,"monthNamesShort"),monthNames:this._get(t,"monthNames")}},_formatDate:function(t,e,i,s){e||(t.currentDay=t.selectedDay,t.currentMonth=t.selectedMonth,t.currentYear=t.selectedYear);var n=e?"object"==typeof e?e:this._daylightSavingAdjust(new Date(s,i,e)):this._daylightSavingAdjust(new Date(t.currentYear,t.currentMonth,t.currentDay));return this.formatDate(this._get(t,"dateFormat"),n,this._getFormatConfig(t))}}),t.fn.datepicker=function(e){if(!this.length)return this;t.datepicker.initialized||(t(document).on("mousedown",t.datepicker._checkExternalClick),t.datepicker.initialized=!0),0===t("#"+t.datepicker._mainDivId).length&&t("body").append(t.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"isDisabled"!==e&&"getDate"!==e&&"widget"!==e?"option"===e&&2===arguments.length&&"string"==typeof arguments[1]?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof e?t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this].concat(i)):t.datepicker._attachDatepicker(this,e)}):t.datepicker["_"+e+"Datepicker"].apply(t.datepicker,[this[0]].concat(i))},t.datepicker=new s,t.datepicker.initialized=!1,t.datepicker.uuid=(new Date).getTime(),t.datepicker.version="1.12.1",t.datepicker,t.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());var _=!1;t(document).on("mouseup",function(){_=!1}),t.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var e=this;this.element.on("mousedown."+this.widgetName,function(t){return e._mouseDown(t)}).on("click."+this.widgetName,function(i){return!0===t.data(i.target,e.widgetName+".preventClickEvent")?(t.removeData(i.target,e.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):void 0}),this.started=!1},_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(e){if(!_){this._mouseMoved=!1,this._mouseStarted&&this._mouseUp(e),this._mouseDownEvent=e;var i=this,s=1===e.which,n="string"==typeof this.options.cancel&&e.target.nodeName?t(e.target).closest(this.options.cancel).length:!1;return s&&!n&&this._mouseCapture(e)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(e)!==!1,!this._mouseStarted)?(e.preventDefault(),!0):(!0===t.data(e.target,this.widgetName+".preventClickEvent")&&t.removeData(e.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(t){return i._mouseMove(t)},this._mouseUpDelegate=function(t){return i._mouseUp(t)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),e.preventDefault(),_=!0,!0)):!0}},_mouseMove:function(e){if(this._mouseMoved){if(t.ui.ie&&(!document.documentMode||9>document.documentMode)&&!e.button)return this._mouseUp(e);if(!e.which)if(e.originalEvent.altKey||e.originalEvent.ctrlKey||e.originalEvent.metaKey||e.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(e)}return(e.which||e.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(e),e.preventDefault()):(this._mouseDistanceMet(e)&&this._mouseDelayMet(e)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,e)!==!1,this._mouseStarted?this._mouseDrag(e):this._mouseUp(e)),!this._mouseStarted)},_mouseUp:function(e){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,e.target===this._mouseDownEvent.target&&t.data(e.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(e)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,_=!1,e.preventDefault()},_mouseDistanceMet:function(t){return Math.max(Math.abs(this._mouseDownEvent.pageX-t.pageX),Math.abs(this._mouseDownEvent.pageY-t.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),t.ui.plugin={add:function(e,i,s){var n,o=t.ui[e].prototype;for(n in s)o.plugins[n]=o.plugins[n]||[],o.plugins[n].push([i,s[n]])},call:function(t,e,i,s){var n,o=t.plugins[e];if(o&&(s||t.element[0].parentNode&&11!==t.element[0].parentNode.nodeType))for(n=0;o.length>n;n++)t.options[o[n][0]]&&o[n][1].apply(t.element,i)}},t.ui.safeBlur=function(e){e&&"body"!==e.nodeName.toLowerCase()&&t(e).trigger("blur")},t.widget("ui.draggable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(t,e){this._super(t,e),"handle"===t&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){return(this.helper||this.element).is(".ui-draggable-dragging")?(this.destroyOnClear=!0,void 0):(this._removeHandleClassName(),this._mouseDestroy(),void 0)},_mouseCapture:function(e){var i=this.options;return this.helper||i.disabled||t(e.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(e),this.handle?(this._blurActiveElement(e),this._blockFrames(i.iframeFix===!0?"iframe":i.iframeFix),!0):!1)},_blockFrames:function(e){this.iframeBlocks=this.document.find(e).map(function(){var e=t(this);return t("<div>").css("position","absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(e){var i=t.ui.safeActiveElement(this.document[0]),s=t(e.target);s.closest(i).length||t.ui.safeBlur(i)},_mouseStart:function(e){var i=this.options;return this.helper=this._createHelper(e),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),t.ui.ddmanager&&(t.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===t(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(e),this.originalPosition=this.position=this._generatePosition(e,!1),this.originalPageX=e.pageX,this.originalPageY=e.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),this._trigger("start",e)===!1?(this._clear(),!1):(this._cacheHelperProportions(),t.ui.ddmanager&&!i.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this._mouseDrag(e,!0),t.ui.ddmanager&&t.ui.ddmanager.dragStart(this,e),!0)},_refreshOffsets:function(t){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:t.pageX-this.offset.left,top:t.pageY-this.offset.top}},_mouseDrag:function(e,i){if(this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),this.position=this._generatePosition(e,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",e,s)===!1)return this._mouseUp(new t.Event("mouseup",e)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),!1},_mouseStop:function(e){var i=this,s=!1;return t.ui.ddmanager&&!this.options.dropBehaviour&&(s=t.ui.ddmanager.drop(this,e)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||this.options.revert===!0||t.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?t(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){i._trigger("stop",e)!==!1&&i._clear()}):this._trigger("stop",e)!==!1&&this._clear(),!1},_mouseUp:function(e){return this._unblockFrames(),t.ui.ddmanager&&t.ui.ddmanager.dragStop(this,e),this.handleElement.is(e.target)&&this.element.trigger("focus"),t.ui.mouse.prototype._mouseUp.call(this,e)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new t.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(e){return this.options.handle?!!t(e.target).closest(this.element.find(this.options.handle)).length:!0},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper),n=s?t(i.helper.apply(this.element[0],[e])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_isRootNode:function(t){return/(html|body)/i.test(t.tagName)||t===this.document[0]},_getParentOffset:function(){var e=this.offsetParent.offset(),i=this.document[0];return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var t=this.element.position(),e=this._isRootNode(this.scrollParent[0]);return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+(e?0:this.scrollParent.scrollTop()),left:t.left-(parseInt(this.helper.css("left"),10)||0)+(e?0:this.scrollParent.scrollLeft())}
},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options,o=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?(this.containment=[t(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,t(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,t(window).scrollLeft()+t(window).width()-this.helperProportions.width-this.margins.left,t(window).scrollTop()+(t(window).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):"document"===n.containment?(this.containment=[0,0,t(o).width()-this.helperProportions.width-this.margins.left,(t(o).height()||o.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top],void 0):n.containment.constructor===Array?(this.containment=n.containment,void 0):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=t(n.containment),s=i[0],s&&(e=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(e?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(e?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i),void 0):(this.containment=null,void 0)},_convertPositionTo:function(t,e){e||(e=this.position);var i="absolute"===t?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:e.top+this.offset.relative.top*i+this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:e.left+this.offset.relative.left*i+this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(t,e){var i,s,n,o,a=this.options,r=this._isRootNode(this.scrollParent[0]),h=t.pageX,l=t.pageY;return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),e&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(h=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(l=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(h=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(l=i[3]+this.offset.click.top)),a.grid&&(n=a.grid[1]?this.originalPageY+Math.round((l-this.originalPageY)/a.grid[1])*a.grid[1]:this.originalPageY,l=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-a.grid[1]:n+a.grid[1]:n,o=a.grid[0]?this.originalPageX+Math.round((h-this.originalPageX)/a.grid[0])*a.grid[0]:this.originalPageX,h=i?o-this.offset.click.left>=i[0]||o-this.offset.click.left>i[2]?o:o-this.offset.click.left>=i[0]?o-a.grid[0]:o+a.grid[0]:o),"y"===a.axis&&(h=this.originalPageX),"x"===a.axis&&(l=this.originalPageY)),{top:l-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:h-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},_trigger:function(e,i,s){return s=s||this._uiHash(),t.ui.plugin.call(this,e,[i,s,this],!0),/^(drag|start|stop)/.test(e)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),t.Widget.prototype._trigger.call(this,e,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),t.ui.plugin.add("draggable","connectToSortable",{start:function(e,i,s){var n=t.extend({},i,{item:s.element});s.sortables=[],t(s.options.connectToSortable).each(function(){var i=t(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),i.refreshPositions(),i._trigger("activate",e,n))})},stop:function(e,i,s){var n=t.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,t.each(s.sortables,function(){var t=this;t.isOver?(t.isOver=0,s.cancelHelperRemoval=!0,t.cancelHelperRemoval=!1,t._storedCSS={position:t.placeholder.css("position"),top:t.placeholder.css("top"),left:t.placeholder.css("left")},t._mouseStop(e),t.options.helper=t.options._helper):(t.cancelHelperRemoval=!0,t._trigger("deactivate",e,n))})},drag:function(e,i,s){t.each(s.sortables,function(){var n=!1,o=this;o.positionAbs=s.positionAbs,o.helperProportions=s.helperProportions,o.offset.click=s.offset.click,o._intersectsWith(o.containerCache)&&(n=!0,t.each(s.sortables,function(){return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==o&&this._intersectsWith(this.containerCache)&&t.contains(o.element[0],this.element[0])&&(n=!1),n})),n?(o.isOver||(o.isOver=1,s._parent=i.helper.parent(),o.currentItem=i.helper.appendTo(o.element).data("ui-sortable-item",!0),o.options._helper=o.options.helper,o.options.helper=function(){return i.helper[0]},e.target=o.currentItem[0],o._mouseCapture(e,!0),o._mouseStart(e,!0,!0),o.offset.click.top=s.offset.click.top,o.offset.click.left=s.offset.click.left,o.offset.parent.left-=s.offset.parent.left-o.offset.parent.left,o.offset.parent.top-=s.offset.parent.top-o.offset.parent.top,s._trigger("toSortable",e),s.dropped=o.element,t.each(s.sortables,function(){this.refreshPositions()}),s.currentItem=s.element,o.fromOutside=s),o.currentItem&&(o._mouseDrag(e),i.position=o.position)):o.isOver&&(o.isOver=0,o.cancelHelperRemoval=!0,o.options._revert=o.options.revert,o.options.revert=!1,o._trigger("out",e,o._uiHash(o)),o._mouseStop(e,!0),o.options.revert=o.options._revert,o.options.helper=o.options._helper,o.placeholder&&o.placeholder.remove(),i.helper.appendTo(s._parent),s._refreshOffsets(e),i.position=s._generatePosition(e,!0),s._trigger("fromSortable",e),s.dropped=!1,t.each(s.sortables,function(){this.refreshPositions()}))})}}),t.ui.plugin.add("draggable","cursor",{start:function(e,i,s){var n=t("body"),o=s.options;n.css("cursor")&&(o._cursor=n.css("cursor")),n.css("cursor",o.cursor)},stop:function(e,i,s){var n=s.options;n._cursor&&t("body").css("cursor",n._cursor)}}),t.ui.plugin.add("draggable","opacity",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("opacity")&&(o._opacity=n.css("opacity")),n.css("opacity",o.opacity)},stop:function(e,i,s){var n=s.options;n._opacity&&t(i.helper).css("opacity",n._opacity)}}),t.ui.plugin.add("draggable","scroll",{start:function(t,e,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(e,i,s){var n=s.options,o=!1,a=s.scrollParentNotHidden[0],r=s.document[0];a!==r&&"HTML"!==a.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+a.offsetHeight-e.pageY<n.scrollSensitivity?a.scrollTop=o=a.scrollTop+n.scrollSpeed:e.pageY-s.overflowOffset.top<n.scrollSensitivity&&(a.scrollTop=o=a.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+a.offsetWidth-e.pageX<n.scrollSensitivity?a.scrollLeft=o=a.scrollLeft+n.scrollSpeed:e.pageX-s.overflowOffset.left<n.scrollSensitivity&&(a.scrollLeft=o=a.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(e.pageY-t(r).scrollTop()<n.scrollSensitivity?o=t(r).scrollTop(t(r).scrollTop()-n.scrollSpeed):t(window).height()-(e.pageY-t(r).scrollTop())<n.scrollSensitivity&&(o=t(r).scrollTop(t(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(e.pageX-t(r).scrollLeft()<n.scrollSensitivity?o=t(r).scrollLeft(t(r).scrollLeft()-n.scrollSpeed):t(window).width()-(e.pageX-t(r).scrollLeft())<n.scrollSensitivity&&(o=t(r).scrollLeft(t(r).scrollLeft()+n.scrollSpeed)))),o!==!1&&t.ui.ddmanager&&!n.dropBehaviour&&t.ui.ddmanager.prepareOffsets(s,e)}}),t.ui.plugin.add("draggable","snap",{start:function(e,i,s){var n=s.options;s.snapElements=[],t(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var e=t(this),i=e.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:e.outerWidth(),height:e.outerHeight(),top:i.top,left:i.left})})},drag:function(e,i,s){var n,o,a,r,h,l,c,u,d,p,f=s.options,g=f.snapTolerance,m=i.offset.left,_=m+s.helperProportions.width,v=i.offset.top,b=v+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)h=s.snapElements[d].left-s.margins.left,l=h+s.snapElements[d].width,c=s.snapElements[d].top-s.margins.top,u=c+s.snapElements[d].height,h-g>_||m>l+g||c-g>b||v>u+g||!t.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=g>=Math.abs(c-b),o=g>=Math.abs(u-v),a=g>=Math.abs(h-_),r=g>=Math.abs(l-m),n&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left)),p=n||o||a||r,"outer"!==f.snapMode&&(n=g>=Math.abs(c-v),o=g>=Math.abs(u-b),a=g>=Math.abs(h-m),r=g>=Math.abs(l-_),n&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),o&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),a&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||o||a||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,e,t.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||o||a||r||p)}}),t.ui.plugin.add("draggable","stack",{start:function(e,i,s){var n,o=s.options,a=t.makeArray(t(o.stack)).sort(function(e,i){return(parseInt(t(e).css("zIndex"),10)||0)-(parseInt(t(i).css("zIndex"),10)||0)});a.length&&(n=parseInt(t(a[0]).css("zIndex"),10)||0,t(a).each(function(e){t(this).css("zIndex",n+e)}),this.css("zIndex",n+a.length))}}),t.ui.plugin.add("draggable","zIndex",{start:function(e,i,s){var n=t(i.helper),o=s.options;n.css("zIndex")&&(o._zIndex=n.css("zIndex")),n.css("zIndex",o.zIndex)},stop:function(e,i,s){var n=s.options;n._zIndex&&t(i.helper).css("zIndex",n._zIndex)}}),t.ui.draggable,t.widget("ui.resizable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_num:function(t){return parseFloat(t)||0},_isNumber:function(t){return!isNaN(parseFloat(t))},_hasScroll:function(e,i){if("hidden"===t(e).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;return e[s]>0?!0:(e[s]=1,n=e[s]>0,e[s]=0,n)},_create:function(){var e,i=this.options,s=this;this._addClass("ui-resizable"),t.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,e={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(e),this.originalElement.css("margin",0),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css(e),this._proportionallyResize()),this._setupHandles(),i.autoHide&&t(this.element).on("mouseenter",function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var e,i=function(e){t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),e=this.element,this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")}).insertAfter(e),e.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(t,e){switch(this._super(t,e),t){case"handles":this._removeHandles(),this._setupHandles();break;default:}},_setupHandles:function(){var e,i,s,n,o,a=this.options,r=this;if(this.handles=a.handles||(t(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=t(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;s.length>i;i++)e=t.trim(s[i]),n="ui-resizable-"+e,o=t("<div>"),this._addClass(o,"ui-resizable-handle "+n),o.css({zIndex:a.zIndex}),this.handles[e]=".ui-resizable-"+e,this.element.append(o);this._renderAxis=function(e){var i,s,n,o;e=e||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=t(this.handles[i]),this._on(this.handles[i],{mousedown:r._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=t(this.handles[i],this.element),o=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),e.css(n,o),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){r.resizing||(this.className&&(o=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=o&&o[1]?o[1]:"se")}),a.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(e){var i,s,n=!1;for(i in this.handles)s=t(this.handles[i])[0],(s===e.target||t.contains(s,e.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(e){var i,s,n,o=this.options,a=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),o.containment&&(i+=t(o.containment).scrollLeft()||0,s+=t(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:a.width(),height:a.height()},this.originalSize=this._helper?{width:a.outerWidth(),height:a.outerHeight()}:{width:a.width(),height:a.height()},this.sizeDiff={width:a.outerWidth()-a.width(),height:a.outerHeight()-a.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:e.pageX,top:e.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=t(".ui-resizable-"+this.axis).css("cursor"),t("body").css("cursor","auto"===n?this.axis+"-resize":n),this._addClass("ui-resizable-resizing"),this._propagate("start",e),!0},_mouseDrag:function(e){var i,s,n=this.originalMousePosition,o=this.axis,a=e.pageX-n.left||0,r=e.pageY-n.top||0,h=this._change[o];return this._updatePrevProperties(),h?(i=h.apply(this,[e,a,r]),this._updateVirtualBoundaries(e.shiftKey),(this._aspectRatio||e.shiftKey)&&(i=this._updateRatio(i,e)),i=this._respectSize(i,e),this._updateCache(i),this._propagate("resize",e),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),t.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",e,this.ui()),this._applyChanges()),!1):!1},_mouseStop:function(e){this.resizing=!1;var i,s,n,o,a,r,h,l=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:c.sizeDiff.height,o=s?0:c.sizeDiff.width,a={width:c.helper.width()-o,height:c.helper.height()-n},r=parseFloat(c.element.css("left"))+(c.position.left-c.originalPosition.left)||null,h=parseFloat(c.element.css("top"))+(c.position.top-c.originalPosition.top)||null,l.animate||this.element.css(t.extend(a,{top:h,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!l.animate&&this._proportionallyResize()),t("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",e),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var t={};return this.position.top!==this.prevPosition.top&&(t.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(t.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(t.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(t.height=this.size.height+"px"),this.helper.css(t),t},_updateVirtualBoundaries:function(t){var e,i,s,n,o,a=this.options;o={minWidth:this._isNumber(a.minWidth)?a.minWidth:0,maxWidth:this._isNumber(a.maxWidth)?a.maxWidth:1/0,minHeight:this._isNumber(a.minHeight)?a.minHeight:0,maxHeight:this._isNumber(a.maxHeight)?a.maxHeight:1/0},(this._aspectRatio||t)&&(e=o.minHeight*this.aspectRatio,s=o.minWidth/this.aspectRatio,i=o.maxHeight*this.aspectRatio,n=o.maxWidth/this.aspectRatio,e>o.minWidth&&(o.minWidth=e),s>o.minHeight&&(o.minHeight=s),o.maxWidth>i&&(o.maxWidth=i),o.maxHeight>n&&(o.maxHeight=n)),this._vBoundaries=o},_updateCache:function(t){this.offset=this.helper.offset(),this._isNumber(t.left)&&(this.position.left=t.left),this._isNumber(t.top)&&(this.position.top=t.top),this._isNumber(t.height)&&(this.size.height=t.height),this._isNumber(t.width)&&(this.size.width=t.width)},_updateRatio:function(t){var e=this.position,i=this.size,s=this.axis;return this._isNumber(t.height)?t.width=t.height*this.aspectRatio:this._isNumber(t.width)&&(t.height=t.width/this.aspectRatio),"sw"===s&&(t.left=e.left+(i.width-t.width),t.top=null),"nw"===s&&(t.top=e.top+(i.height-t.height),t.left=e.left+(i.width-t.width)),t},_respectSize:function(t){var e=this._vBoundaries,i=this.axis,s=this._isNumber(t.width)&&e.maxWidth&&e.maxWidth<t.width,n=this._isNumber(t.height)&&e.maxHeight&&e.maxHeight<t.height,o=this._isNumber(t.width)&&e.minWidth&&e.minWidth>t.width,a=this._isNumber(t.height)&&e.minHeight&&e.minHeight>t.height,r=this.originalPosition.left+this.originalSize.width,h=this.originalPosition.top+this.originalSize.height,l=/sw|nw|w/.test(i),c=/nw|ne|n/.test(i);return o&&(t.width=e.minWidth),a&&(t.height=e.minHeight),s&&(t.width=e.maxWidth),n&&(t.height=e.maxHeight),o&&l&&(t.left=r-e.minWidth),s&&l&&(t.left=r-e.maxWidth),a&&c&&(t.top=h-e.minHeight),n&&c&&(t.top=h-e.maxHeight),t.width||t.height||t.left||!t.top?t.width||t.height||t.top||!t.left||(t.left=null):t.top=null,t},_getPaddingPlusBorderDimensions:function(t){for(var e=0,i=[],s=[t.css("borderTopWidth"),t.css("borderRightWidth"),t.css("borderBottomWidth"),t.css("borderLeftWidth")],n=[t.css("paddingTop"),t.css("paddingRight"),t.css("paddingBottom"),t.css("paddingLeft")];4>e;e++)i[e]=parseFloat(s[e])||0,i[e]+=parseFloat(n[e])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var t,e=0,i=this.helper||this.element;this._proportionallyResizeElements.length>e;e++)t=this._proportionallyResizeElements[e],this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(t)),t.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var e=this.element,i=this.options;this.elementOffset=e.offset(),this._helper?(this.helper=this.helper||t("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(t,e){return{width:this.originalSize.width+e}},w:function(t,e){var i=this.originalSize,s=this.originalPosition;return{left:s.left+e,width:i.width-e}},n:function(t,e,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(t,e,i){return{height:this.originalSize.height+i}},se:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},sw:function(e,i,s){return t.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[e,i,s]))},ne:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[e,i,s]))},nw:function(e,i,s){return t.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[e,i,s]))}},_propagate:function(e,i){t.ui.plugin.call(this,e,[i,this.ui()]),"resize"!==e&&this._trigger(e,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),t.ui.plugin.add("resizable","animate",{stop:function(e){var i=t(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,o=n.length&&/textarea/i.test(n[0].nodeName),a=o&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=o?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-a},l=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,c=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(t.extend(h,c&&l?{top:c,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};n&&n.length&&t(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",e)}})}}),t.ui.plugin.add("resizable","containment",{start:function(){var e,i,s,n,o,a,r,h=t(this).resizable("instance"),l=h.options,c=h.element,u=l.containment,d=u instanceof t?u.get(0):/parent/.test(u)?c.parent().get(0):u;d&&(h.containerElement=t(d),/document/.test(u)||u===document?(h.containerOffset={left:0,top:0},h.containerPosition={left:0,top:0},h.parentData={element:t(document),left:0,top:0,width:t(document).width(),height:t(document).height()||document.body.parentNode.scrollHeight}):(e=t(d),i=[],t(["Top","Right","Left","Bottom"]).each(function(t,s){i[t]=h._num(e.css("padding"+s))}),h.containerOffset=e.offset(),h.containerPosition=e.position(),h.containerSize={height:e.innerHeight()-i[3],width:e.innerWidth()-i[1]},s=h.containerOffset,n=h.containerSize.height,o=h.containerSize.width,a=h._hasScroll(d,"left")?d.scrollWidth:o,r=h._hasScroll(d)?d.scrollHeight:n,h.parentData={element:d,left:s.left,top:s.top,width:a,height:r}))},resize:function(e){var i,s,n,o,a=t(this).resizable("instance"),r=a.options,h=a.containerOffset,l=a.position,c=a._aspectRatio||e.shiftKey,u={top:0,left:0},d=a.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(u=h),l.left<(a._helper?h.left:0)&&(a.size.width=a.size.width+(a._helper?a.position.left-h.left:a.position.left-u.left),c&&(a.size.height=a.size.width/a.aspectRatio,p=!1),a.position.left=r.helper?h.left:0),l.top<(a._helper?h.top:0)&&(a.size.height=a.size.height+(a._helper?a.position.top-h.top:a.position.top),c&&(a.size.width=a.size.height*a.aspectRatio,p=!1),a.position.top=a._helper?h.top:0),n=a.containerElement.get(0)===a.element.parent().get(0),o=/relative|absolute/.test(a.containerElement.css("position")),n&&o?(a.offset.left=a.parentData.left+a.position.left,a.offset.top=a.parentData.top+a.position.top):(a.offset.left=a.element.offset().left,a.offset.top=a.element.offset().top),i=Math.abs(a.sizeDiff.width+(a._helper?a.offset.left-u.left:a.offset.left-h.left)),s=Math.abs(a.sizeDiff.height+(a._helper?a.offset.top-u.top:a.offset.top-h.top)),i+a.size.width>=a.parentData.width&&(a.size.width=a.parentData.width-i,c&&(a.size.height=a.size.width/a.aspectRatio,p=!1)),s+a.size.height>=a.parentData.height&&(a.size.height=a.parentData.height-s,c&&(a.size.width=a.size.height*a.aspectRatio,p=!1)),p||(a.position.left=a.prevPosition.left,a.position.top=a.prevPosition.top,a.size.width=a.prevSize.width,a.size.height=a.prevSize.height)},stop:function(){var e=t(this).resizable("instance"),i=e.options,s=e.containerOffset,n=e.containerPosition,o=e.containerElement,a=t(e.helper),r=a.offset(),h=a.outerWidth()-e.sizeDiff.width,l=a.outerHeight()-e.sizeDiff.height;e._helper&&!i.animate&&/relative/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l}),e._helper&&!i.animate&&/static/.test(o.css("position"))&&t(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),t.ui.plugin.add("resizable","alsoResize",{start:function(){var e=t(this).resizable("instance"),i=e.options;t(i.alsoResize).each(function(){var e=t(this);e.data("ui-resizable-alsoresize",{width:parseFloat(e.width()),height:parseFloat(e.height()),left:parseFloat(e.css("left")),top:parseFloat(e.css("top"))})})},resize:function(e,i){var s=t(this).resizable("instance"),n=s.options,o=s.originalSize,a=s.originalPosition,r={height:s.size.height-o.height||0,width:s.size.width-o.width||0,top:s.position.top-a.top||0,left:s.position.left-a.left||0};t(n.alsoResize).each(function(){var e=t(this),s=t(this).data("ui-resizable-alsoresize"),n={},o=e.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];t.each(o,function(t,e){var i=(s[e]||0)+(r[e]||0);i&&i>=0&&(n[e]=i||null)}),e.css(n)})},stop:function(){t(this).removeData("ui-resizable-alsoresize")}}),t.ui.plugin.add("resizable","ghost",{start:function(){var e=t(this).resizable("instance"),i=e.size;e.ghost=e.originalElement.clone(),e.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),e._addClass(e.ghost,"ui-resizable-ghost"),t.uiBackCompat!==!1&&"string"==typeof e.options.ghost&&e.ghost.addClass(this.options.ghost),e.ghost.appendTo(e.helper)},resize:function(){var e=t(this).resizable("instance");e.ghost&&e.ghost.css({position:"relative",height:e.size.height,width:e.size.width})},stop:function(){var e=t(this).resizable("instance");e.ghost&&e.helper&&e.helper.get(0).removeChild(e.ghost.get(0))}}),t.ui.plugin.add("resizable","grid",{resize:function(){var e,i=t(this).resizable("instance"),s=i.options,n=i.size,o=i.originalSize,a=i.originalPosition,r=i.axis,h="number"==typeof s.grid?[s.grid,s.grid]:s.grid,l=h[0]||1,c=h[1]||1,u=Math.round((n.width-o.width)/l)*l,d=Math.round((n.height-o.height)/c)*c,p=o.width+u,f=o.height+d,g=s.maxWidth&&p>s.maxWidth,m=s.maxHeight&&f>s.maxHeight,_=s.minWidth&&s.minWidth>p,v=s.minHeight&&s.minHeight>f;s.grid=h,_&&(p+=l),v&&(f+=c),g&&(p-=l),m&&(f-=c),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=a.top-d):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=a.left-u):((0>=f-c||0>=p-l)&&(e=i._getPaddingPlusBorderDimensions(this)),f-c>0?(i.size.height=f,i.position.top=a.top-d):(f=c-e.height,i.size.height=f,i.position.top=a.top+o.height-f),p-l>0?(i.size.width=p,i.position.left=a.left-u):(p=l-e.width,i.size.width=p,i.position.left=a.left+o.width-p))}}),t.ui.resizable,t.widget("ui.dialog",{version:"1.12.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog
},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&this._trigger("beforeClose",e)!==!1&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||t.ui.safeBlur(t.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(e,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+t(this).css("z-index")}).get(),o=Math.max.apply(null,n);return o>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",o+1),s=!0),s&&!i&&this._trigger("focus",e),s},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),void 0):(this._isOpen=!0,this.opener=t(t.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._makeFocusTarget(),this._trigger("open"),void 0)},_focusTabbable:function(){var t=this._focusedElement;t||(t=this.element.find("[autofocus]")),t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).trigger("focus")},_keepFocus:function(e){function i(){var e=t.ui.safeActiveElement(this.document[0]),i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),void 0;if(e.keyCode===t.ui.keyCode.TAB&&!e.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(this._delay(function(){n.trigger("focus")}),e.preventDefault()):(this._delay(function(){s.trigger("focus")}),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.trigger("focus")}}),this.uiDialogTitlebarClose=t("<button type='button'></button>").button({label:t("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(e,"ui-dialog-title"),this._title(e),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title?t.text(this.options.title):t.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this._removeClass(this.uiDialog,"ui-dialog-buttons"),void 0):(t.each(i,function(i,s){var n,o;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,o={icon:s.icon,iconPosition:s.iconPosition,showLabel:s.showLabel,icons:s.icons,text:s.text},delete s.click,delete s.icon,delete s.iconPosition,delete s.showLabel,delete s.icons,"boolean"==typeof s.text&&delete s.text,t("<button></button>",s).button(o).appendTo(e.uiButtonSet).on("click",function(){n.apply(e.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),void 0)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){i._addClass(t(this),"ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,o){var a=o.offset.left-i.document.scrollLeft(),r=o.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(a>=0?"+":"")+a+" "+"top"+(r>=0?"+":"")+r,of:i.window},i._removeClass(t(this),"ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(o))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,n=s.resizable,o=this.uiDialog.css("position"),a="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:a,start:function(s,n){i._addClass(t(this),"ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,o){var a=i.uiDialog.offset(),r=a.left-i.document.scrollLeft(),h=a.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" "+"top"+(h>=0?"+":"")+h,of:i.window},i._removeClass(t(this),"ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(o))}}).css("position",o)},_trackFocus:function(){this._on(this.widget(),{focusin:function(e){this._makeFocusTarget(),this._focusedElement=t(e.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var e=this._trackingInstances(),i=t.inArray(this,e);-1!==i&&e.splice(i,1)},_trackingInstances:function(){var t=this.document.data("ui-dialog-instances");return t||(t=[],this.document.data("ui-dialog-instances",t)),t},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(e){var i=this,s=!1,n={};t.each(e,function(t,e){i._setOption(t,e),t in i.sizeRelatedOptions&&(s=!0),t in i.resizableRelatedOptions&&(n[t]=e)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(e,i){var s,n,o=this.uiDialog;"disabled"!==e&&(this._super(e,i),"appendTo"===e&&this.uiDialog.appendTo(this._appendTo()),"buttons"===e&&this._createButtons(),"closeText"===e&&this.uiDialogTitlebarClose.button({label:t("<a>").text(""+this.options.closeText).html()}),"draggable"===e&&(s=o.is(":data(ui-draggable)"),s&&!i&&o.draggable("destroy"),!s&&i&&this._makeDraggable()),"position"===e&&this._position(),"resizable"===e&&(n=o.is(":data(ui-resizable)"),n&&!i&&o.resizable("destroy"),n&&"string"==typeof i&&o.resizable("option","handles",i),n||i===!1||this._makeResizable()),"title"===e&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=!0;this._delay(function(){e=!1}),this.document.data("ui-dialog-overlays")||this._on(this.document,{focusin:function(t){e||this._allowInteraction(t)||(t.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=t("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var t=this.document.data("ui-dialog-overlays")-1;t?this.document.data("ui-dialog-overlays",t):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(t,e){"dialogClass"===t&&this.uiDialog.removeClass(this.options.dialogClass).addClass(e),this._superApply(arguments)}}),t.ui.dialog,t.widget("ui.droppable",{version:"1.12.1",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var e,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=t.isFunction(s)?s:function(t){return t.is(s)},this.proportions=function(){return arguments.length?(e=arguments[0],void 0):e?e:e={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight}},this._addToManager(i.scope),i.addClasses&&this._addClass("ui-droppable")},_addToManager:function(e){t.ui.ddmanager.droppables[e]=t.ui.ddmanager.droppables[e]||[],t.ui.ddmanager.droppables[e].push(this)},_splice:function(t){for(var e=0;t.length>e;e++)t[e]===this&&t.splice(e,1)},_destroy:function(){var e=t.ui.ddmanager.droppables[this.options.scope];this._splice(e)},_setOption:function(e,i){if("accept"===e)this.accept=t.isFunction(i)?i:function(t){return t.is(i)};else if("scope"===e){var s=t.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(e,i)},_activate:function(e){var i=t.ui.ddmanager.current;this._addActiveClass(),i&&this._trigger("activate",e,this.ui(i))},_deactivate:function(e){var i=t.ui.ddmanager.current;this._removeActiveClass(),i&&this._trigger("deactivate",e,this.ui(i))},_over:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._addHoverClass(),this._trigger("over",e,this.ui(i)))},_out:function(e){var i=t.ui.ddmanager.current;i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeHoverClass(),this._trigger("out",e,this.ui(i)))},_drop:function(e,i){var s=i||t.ui.ddmanager.current,n=!1;return s&&(s.currentItem||s.element)[0]!==this.element[0]?(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=t(this).droppable("instance");return i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&v(s,t.extend(i,{offset:i.element.offset()}),i.options.tolerance,e)?(n=!0,!1):void 0}),n?!1:this.accept.call(this.element[0],s.currentItem||s.element)?(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",e,this.ui(s)),this.element):!1):!1},ui:function(t){return{draggable:t.currentItem||t.element,helper:t.helper,position:t.position,offset:t.positionAbs}},_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var v=t.ui.intersect=function(){function t(t,e,i){return t>=e&&e+i>t}return function(e,i,s,n){if(!i.offset)return!1;var o=(e.positionAbs||e.position.absolute).left+e.margins.left,a=(e.positionAbs||e.position.absolute).top+e.margins.top,r=o+e.helperProportions.width,h=a+e.helperProportions.height,l=i.offset.left,c=i.offset.top,u=l+i.proportions().width,d=c+i.proportions().height;switch(s){case"fit":return o>=l&&u>=r&&a>=c&&d>=h;case"intersect":return o+e.helperProportions.width/2>l&&u>r-e.helperProportions.width/2&&a+e.helperProportions.height/2>c&&d>h-e.helperProportions.height/2;case"pointer":return t(n.pageY,c,i.proportions().height)&&t(n.pageX,l,i.proportions().width);case"touch":return(a>=c&&d>=a||h>=c&&d>=h||c>a&&h>d)&&(o>=l&&u>=o||r>=l&&u>=r||l>o&&r>u);default:return!1}}}();t.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,i){var s,n,o=t.ui.ddmanager.droppables[e.options.scope]||[],a=i?i.type:null,r=(e.currentItem||e.element).find(":data(ui-droppable)").addBack();t:for(s=0;o.length>s;s++)if(!(o[s].options.disabled||e&&!o[s].accept.call(o[s].element[0],e.currentItem||e.element))){for(n=0;r.length>n;n++)if(r[n]===o[s].element[0]){o[s].proportions().height=0;continue t}o[s].visible="none"!==o[s].element.css("display"),o[s].visible&&("mousedown"===a&&o[s]._activate.call(o[s],i),o[s].offset=o[s].element.offset(),o[s].proportions({width:o[s].element[0].offsetWidth,height:o[s].element[0].offsetHeight}))}},drop:function(e,i){var s=!1;return t.each((t.ui.ddmanager.droppables[e.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&v(e,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],e.currentItem||e.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(e,i){e.element.parentsUntil("body").on("scroll.droppable",function(){e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)})},drag:function(e,i){e.options.refreshPositions&&t.ui.ddmanager.prepareOffsets(e,i),t.each(t.ui.ddmanager.droppables[e.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,o,a=v(e,this,this.options.tolerance,i),r=!a&&this.isover?"isout":a&&!this.isover?"isover":null;r&&(this.options.greedy&&(n=this.options.scope,o=this.element.parents(":data(ui-droppable)").filter(function(){return t(this).droppable("instance").options.scope===n}),o.length&&(s=t(o[0]).droppable("instance"),s.greedyChild="isover"===r)),s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(e,i){e.element.parentsUntil("body").off("scroll.droppable"),e.options.refreshPositions||t.ui.ddmanager.prepareOffsets(e,i)}},t.uiBackCompat!==!1&&t.widget("ui.droppable",t.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}}),t.ui.droppable,t.widget("ui.progressbar",{version:"1.12.1",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.attr({role:"progressbar","aria-valuemin":this.min}),this._addClass("ui-progressbar","ui-widget ui-widget-content"),this.valueDiv=t("<div>").appendTo(this.element),this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header"),this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),this.valueDiv.remove()},value:function(t){return void 0===t?this.options.value:(this.options.value=this._constrainedValue(t),this._refreshValue(),void 0)},_constrainedValue:function(t){return void 0===t&&(t=this.options.value),this.indeterminate=t===!1,"number"!=typeof t&&(t=0),this.indeterminate?!1:Math.min(this.options.max,Math.max(this.min,t))},_setOptions:function(t){var e=t.value;delete t.value,this._super(t),this.options.value=this._constrainedValue(e),this._refreshValue()},_setOption:function(t,e){"max"===t&&(e=Math.max(this.min,e)),this._super(t,e)},_setOptionDisabled:function(t){this._super(t),this.element.attr("aria-disabled",t),this._toggleClass(null,"ui-state-disabled",!!t)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var e=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||e>this.min).width(i.toFixed(0)+"%"),this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,e===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=t("<div>").appendTo(this.valueDiv),this._addClass(this.overlayDiv,"ui-progressbar-overlay"))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":e}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==e&&(this.oldValue=e,this._trigger("change")),e===this.options.max&&this._trigger("complete")}}),t.widget("ui.selectable",t.ui.mouse,{version:"1.12.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var e=this;this._addClass("ui-selectable"),this.dragged=!1,this.refresh=function(){e.elementPos=t(e.element[0]).offset(),e.selectees=t(e.options.filter,e.element[0]),e._addClass(e.selectees,"ui-selectee"),e.selectees.each(function(){var i=t(this),s=i.offset(),n={left:s.left-e.elementPos.left,top:s.top-e.elementPos.top};t.data(this,"selectable-item",{element:this,$element:i,left:n.left,top:n.top,right:n.left+i.outerWidth(),bottom:n.top+i.outerHeight(),startselected:!1,selected:i.hasClass("ui-selected"),selecting:i.hasClass("ui-selecting"),unselecting:i.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=t("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(e){var i=this,s=this.options;this.opos=[e.pageX,e.pageY],this.elementPos=t(this.element[0]).offset(),this.options.disabled||(this.selectees=t(s.filter,this.element[0]),this._trigger("start",e),t(s.appendTo).append(this.helper),this.helper.css({left:e.pageX,top:e.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=t.data(this,"selectable-item");s.startselected=!0,e.metaKey||e.ctrlKey||(i._removeClass(s.$element,"ui-selected"),s.selected=!1,i._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,i._trigger("unselecting",e,{unselecting:s.element}))}),t(e.target).parents().addBack().each(function(){var s,n=t.data(this,"selectable-item");return n?(s=!e.metaKey&&!e.ctrlKey||!n.$element.hasClass("ui-selected"),i._removeClass(n.$element,s?"ui-unselecting":"ui-selected")._addClass(n.$element,s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",e,{selecting:n.element}):i._trigger("unselecting",e,{unselecting:n.element}),!1):void 0}))},_mouseDrag:function(e){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,o=this.opos[0],a=this.opos[1],r=e.pageX,h=e.pageY;return o>r&&(i=r,r=o,o=i),a>h&&(i=h,h=a,a=i),this.helper.css({left:o,top:a,width:r-o,height:h-a}),this.selectees.each(function(){var i=t.data(this,"selectable-item"),l=!1,c={};i&&i.element!==s.element[0]&&(c.left=i.left+s.elementPos.left,c.right=i.right+s.elementPos.left,c.top=i.top+s.elementPos.top,c.bottom=i.bottom+s.elementPos.top,"touch"===n.tolerance?l=!(c.left>r||o>c.right||c.top>h||a>c.bottom):"fit"===n.tolerance&&(l=c.left>o&&r>c.right&&c.top>a&&h>c.bottom),l?(i.selected&&(s._removeClass(i.$element,"ui-selected"),i.selected=!1),i.unselecting&&(s._removeClass(i.$element,"ui-unselecting"),i.unselecting=!1),i.selecting||(s._addClass(i.$element,"ui-selecting"),i.selecting=!0,s._trigger("selecting",e,{selecting:i.element}))):(i.selecting&&((e.metaKey||e.ctrlKey)&&i.startselected?(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,s._addClass(i.$element,"ui-selected"),i.selected=!0):(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,i.startselected&&(s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0),s._trigger("unselecting",e,{unselecting:i.element}))),i.selected&&(e.metaKey||e.ctrlKey||i.startselected||(s._removeClass(i.$element,"ui-selected"),i.selected=!1,s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0,s._trigger("unselecting",e,{unselecting:i.element})))))}),!1}},_mouseStop:function(e){var i=this;return this.dragged=!1,t(".ui-unselecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",e,{unselected:s.element})}),t(".ui-selecting",this.element[0]).each(function(){var s=t.data(this,"selectable-item");i._removeClass(s.$element,"ui-selecting")._addClass(s.$element,"ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",e,{selected:s.element})}),this._trigger("stop",e),this.helper.remove(),!1}}),t.widget("ui.selectmenu",[t.ui.formResetMixin,{version:"1.12.1",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:!1,change:null,close:null,focus:null,open:null,select:null},_create:function(){var e=this.element.uniqueId().attr("id");this.ids={element:e,button:e+"-button",menu:e+"-menu"},this._drawButton(),this._drawMenu(),this._bindFormResetHandler(),this._rendered=!1,this.menuItems=t()},_drawButton:function(){var e,i=this,s=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);this.labels=this.element.labels().attr("for",this.ids.button),this._on(this.labels,{click:function(t){this.button.focus(),t.preventDefault()}}),this.element.hide(),this.button=t("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element),this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget"),e=t("<span>").appendTo(this.button),this._addClass(e,"ui-selectmenu-icon","ui-icon "+this.options.icons.button),this.buttonItem=this._renderButtonItem(s).appendTo(this.button),this.options.width!==!1&&this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){i._rendered||i._refreshMenu()})},_drawMenu:function(){var e=this;this.menu=t("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),this.menuWrap=t("<div>").append(this.menu),this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front"),this.menuWrap.appendTo(this._appendTo()),this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(t,i){t.preventDefault(),e._setSelection(),e._select(i.item.data("ui-selectmenu-item"),t)},focus:function(t,i){var s=i.item.data("ui-selectmenu-item");null!=e.focusIndex&&s.index!==e.focusIndex&&(e._trigger("focus",t,{item:s}),e.isOpen||e._select(s,t)),e.focusIndex=s.index,e.button.attr("aria-activedescendant",e.menuItems.eq(s.index).attr("id"))}}).menu("instance"),this.menuInstance._off(this.menu,"mouseleave"),this.menuInstance._closeOnDocumentClick=function(){return!1},this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item")||{})),null===this.options.width&&this._resizeButton()},_refreshMenu:function(){var t,e=this.element.find("option");this.menu.empty(),this._parseOptions(e),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),this._rendered=!0,e.length&&(t=this._getSelectedItem(),this.menuInstance.focus(null,t),this._setAria(t.data("ui-selectmenu-item")),this._setOption("disabled",this.element.prop("disabled")))},open:function(t){this.options.disabled||(this._rendered?(this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),this.menuItems.length&&(this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",t)))},_position:function(){this.menuWrap.position(t.extend({of:this.button},this.options.position))},close:function(t){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",t))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderButtonItem:function(e){var i=t("<span>");return this._setText(i,e.label),this._addClass(i,"ui-selectmenu-text"),i},_renderMenu:function(e,i){var s=this,n="";t.each(i,function(i,o){var a;o.optgroup!==n&&(a=t("<li>",{text:o.optgroup}),s._addClass(a,"ui-selectmenu-optgroup","ui-menu-divider"+(o.element.parent("optgroup").prop("disabled")?" ui-state-disabled":"")),a.appendTo(e),n=o.optgroup),s._renderItemData(e,o)})},_renderItemData:function(t,e){return this._renderItem(t,e).data("ui-selectmenu-item",e)},_renderItem:function(e,i){var s=t("<li>"),n=t("<div>",{title:i.element.attr("title")});return i.disabled&&this._addClass(s,null,"ui-state-disabled"),this._setText(n,i.label),s.append(n).appendTo(e)},_setText:function(t,e){e?t.text(e):t.html("&#160;")},_move:function(t,e){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex).parent("li"):(i=this.menuItems.eq(this.element[0].selectedIndex).parent("li"),n+=":not(.ui-state-disabled)"),s="first"===t||"last"===t?i["first"===t?"prevAll":"nextAll"](n).eq(-1):i[t+"All"](n).eq(0),s.length&&this.menuInstance.focus(e,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")},_toggle:function(t){this[this.isOpen?"close":"open"](t)},_setSelection:function(){var t;this.range&&(window.getSelection?(t=window.getSelection(),t.removeAllRanges(),t.addRange(this.range)):this.range.select(),this.button.focus())},_documentClick:{mousedown:function(e){this.isOpen&&(t(e.target).closest(".ui-selectmenu-menu, #"+t.ui.escapeSelector(this.ids.button)).length||this.close(e))}},_buttonEvents:{mousedown:function(){var t;window.getSelection?(t=window.getSelection(),t.rangeCount&&(this.range=t.getRangeAt(0))):this.range=document.selection.createRange()},click:function(t){this._setSelection(),this._toggle(t)},keydown:function(e){var i=!0;switch(e.keyCode){case t.ui.keyCode.TAB:case t.ui.keyCode.ESCAPE:this.close(e),i=!1;break;case t.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(e);break;case t.ui.keyCode.UP:e.altKey?this._toggle(e):this._move("prev",e);break;case t.ui.keyCode.DOWN:e.altKey?this._toggle(e):this._move("next",e);break;case t.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(e):this._toggle(e);break;case t.ui.keyCode.LEFT:this._move("prev",e);break;case t.ui.keyCode.RIGHT:this._move("next",e);break;case t.ui.keyCode.HOME:case t.ui.keyCode.PAGE_UP:this._move("first",e);break;case t.ui.keyCode.END:case t.ui.keyCode.PAGE_DOWN:this._move("last",e);break;default:this.menu.trigger(e),i=!1}i&&e.preventDefault()}},_selectFocusedItem:function(t){var e=this.menuItems.eq(this.focusIndex).parent("li");e.hasClass("ui-state-disabled")||this._select(e.data("ui-selectmenu-item"),t)},_select:function(t,e){var i=this.element[0].selectedIndex;this.element[0].selectedIndex=t.index,this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(t)),this._setAria(t),this._trigger("select",e,{item:t}),t.index!==i&&this._trigger("change",e,{item:t}),this.close(e)},_setAria:function(t){var e=this.menuItems.eq(t.index).attr("id");this.button.attr({"aria-labelledby":e,"aria-activedescendant":e}),this.menu.attr("aria-activedescendant",e)},_setOption:function(t,e){if("icons"===t){var i=this.button.find("span.ui-icon");this._removeClass(i,null,this.options.icons.button)._addClass(i,null,e.button)}this._super(t,e),"appendTo"===t&&this.menuWrap.appendTo(this._appendTo()),"width"===t&&this._resizeButton()},_setOptionDisabled:function(t){this._super(t),this.menuInstance.option("disabled",t),this.button.attr("aria-disabled",t),this._toggleClass(this.button,null,"ui-state-disabled",t),this.element.prop("disabled",t),t?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)},_appendTo:function(){var e=this.options.appendTo;return e&&(e=e.jquery||e.nodeType?t(e):this.document.find(e).eq(0)),e&&e[0]||(e=this.element.closest(".ui-front, dialog")),e.length||(e=this.document[0].body),e},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen),this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var t=this.options.width;return t===!1?(this.button.css("width",""),void 0):(null===t&&(t=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(t),void 0)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){var t=this._super();return t.disabled=this.element.prop("disabled"),t},_parseOptions:function(e){var i=this,s=[];e.each(function(e,n){s.push(i._parseOption(t(n),e))}),this.items=s},_parseOption:function(t,e){var i=t.parent("optgroup");return{element:t,index:e,value:t.val(),label:t.text(),optgroup:i.attr("label")||"",disabled:i.prop("disabled")||t.prop("disabled")}},_destroy:function(){this._unbindFormResetHandler(),this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.labels.attr("for",this.ids.element)}}]),t.widget("ui.slider",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1
},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle"),o="<span tabindex='0'></span>",a=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)a.push(o);this.handles=n.add(t(a.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e).attr("tabIndex",0)})},_createRange:function(){var e=this.options;e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=t("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),("min"===e.range||"max"===e.range)&&this._addClass(this.range,"ui-slider-range-"+e.range)):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,o,a,r,h,l,c=this,u=this.options;return u.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-c.values(e));(n>i||n===i&&(e===c._lastChangedValue||c.values(e)===u.min))&&(n=i,o=t(this),a=e)}),r=this._start(e,a),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=a,this._addClass(o,null,"ui-state-active"),o.trigger("focus"),h=o.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-o.width()/2,top:e.pageY-h.top-o.height()/2-(parseInt(o.css("borderTopWidth"),10)||0)-(parseInt(o.css("borderBottomWidth"),10)||0)+(parseInt(o.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,a,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,o;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),o=this._valueMin()+s*n,this._trimAlignValue(o)},_uiHash:function(t,e,i){var s={handle:this.handles[t],handleIndex:t,value:void 0!==e?e:this.value()};return this._hasMultipleValues()&&(s.value=void 0!==e?e:this.values(t),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(t,e){return this._trigger("start",t,this._uiHash(e))},_slide:function(t,e,i){var s,n,o=this.value(),a=this.values();this._hasMultipleValues()&&(n=this.values(e?0:1),o=this.values(e),2===this.options.values.length&&this.options.range===!0&&(i=0===e?Math.min(n,i):Math.max(n,i)),a[e]=i),i!==o&&(s=this._trigger("slide",t,this._uiHash(e,i,a)),s!==!1&&(this._hasMultipleValues()?this.values(e,i):this.value(i)))},_stop:function(t,e){this._trigger("stop",t,this._uiHash(e))},_change:function(t,e){this._keySliding||this._mouseSliding||(this._lastChangedValue=e,this._trigger("change",t,this._uiHash(e)))},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),void 0):this._value()},values:function(e,i){var s,n,o;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),void 0;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this._hasMultipleValues()?this._values(e):this.value();for(s=this.options.values,n=arguments[0],o=0;s.length>o;o+=1)s[o]=this._trimAlignValue(n[o]),this._change(null,o);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),this._super(e,i),e){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(i),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=n-1;s>=0;s--)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(t){this._super(t),this._toggleClass(null,"ui-state-disabled",!!t)},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this._hasMultipleValues()){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var t=this.options.max,e=this._valueMin(),i=this.options.step,s=Math.round((t-e)/i)*i;t=s+e,t>this.options.max&&(t-=i),this.max=parseFloat(t.toFixed(this._precision()))},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(t){"vertical"===t&&this.range.css({width:"",left:""}),"horizontal"===t&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var e,i,s,n,o,a=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,c={};this._hasMultipleValues()?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),c["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](c,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),o=this._valueMax(),i=o!==n?100*((s-n)/(o-n)):0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](c,r.animate),"min"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===a&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:100-i+"%"},r.animate),"min"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===a&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:100-i+"%"},r.animate))},_handleEvents:{keydown:function(e){var i,s,n,o,a=t(e.target).data("ui-slider-handle-index");switch(e.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(e.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(t(e.target),null,"ui-state-active"),i=this._start(e,a),i===!1))return}switch(o=this.options.step,s=n=this._hasMultipleValues()?this.values(a):this.value(),e.keyCode){case t.ui.keyCode.HOME:n=this._valueMin();break;case t.ui.keyCode.END:n=this._valueMax();break;case t.ui.keyCode.PAGE_UP:n=this._trimAlignValue(s+(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.PAGE_DOWN:n=this._trimAlignValue(s-(this._valueMax()-this._valueMin())/this.numPages);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(s===this._valueMax())return;n=this._trimAlignValue(s+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(s===this._valueMin())return;n=this._trimAlignValue(s-o)}this._slide(e,a,n)},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),this._removeClass(t(e.target),null,"ui-state-active"))}}}),t.widget("ui.sortable",t.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(t,e,i){return t>=e&&e+i>t},_isFloating:function(t){return/left|right/.test(t.css("float"))||/inline|table-cell/.test(t.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(t,e){this._super(t,e),"handle"===t&&this._setHandleClassName()},_setHandleClassName:function(){var e=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),t.each(this.items,function(){e._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var t=this.items.length-1;t>=0;t--)this.items[t].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(e,i){var s=null,n=!1,o=this;return this.reverting?!1:this.options.disabled||"static"===this.options.type?!1:(this._refreshItems(e),t(e.target).parents().each(function(){return t.data(this,o.widgetName+"-item")===o?(s=t(this),!1):void 0}),t.data(e.target,o.widgetName+"-item")===o&&(s=t(e.target)),s?!this.options.handle||i||(t(this.options.handle,s).find("*").addBack().each(function(){this===e.target&&(n=!0)}),n)?(this.currentItem=s,this._removeCurrentsFromItems(),!0):!1:!1)},_mouseStart:function(e,i,s){var n,o,a=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(e),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},t.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(e),this.originalPageX=e.pageX,this.originalPageY=e.pageY,a.cursorAt&&this._adjustOffsetFromHelper(a.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),a.containment&&this._setContainment(),a.cursor&&"auto"!==a.cursor&&(o=this.document.find("body"),this.storedCursor=o.css("cursor"),o.css("cursor",a.cursor),this.storedStylesheet=t("<style>*{ cursor: "+a.cursor+" !important; }</style>").appendTo(o)),a.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",a.opacity)),a.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",a.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",e,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",e,this._uiHash(this));return t.ui.ddmanager&&(t.ui.ddmanager.current=this),t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(e),!0},_mouseDrag:function(e){var i,s,n,o,a=this.options,r=!1;for(this.position=this._generatePosition(e),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-e.pageY<a.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+a.scrollSpeed:e.pageY-this.overflowOffset.top<a.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-a.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-e.pageX<a.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+a.scrollSpeed:e.pageX-this.overflowOffset.left<a.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-a.scrollSpeed)):(e.pageY-this.document.scrollTop()<a.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-a.scrollSpeed):this.window.height()-(e.pageY-this.document.scrollTop())<a.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+a.scrollSpeed)),e.pageX-this.document.scrollLeft()<a.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-a.scrollSpeed):this.window.width()-(e.pageX-this.document.scrollLeft())<a.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+a.scrollSpeed))),r!==!1&&t.ui.ddmanager&&!a.dropBehaviour&&t.ui.ddmanager.prepareOffsets(this,e)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(s=this.items[i],n=s.item[0],o=this._intersectsWithPointer(s),o&&s.instance===this.currentContainer&&n!==this.currentItem[0]&&this.placeholder[1===o?"next":"prev"]()[0]!==n&&!t.contains(this.placeholder[0],n)&&("semi-dynamic"===this.options.type?!t.contains(this.element[0],n):!0)){if(this.direction=1===o?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(e,s),this._trigger("change",e,this._uiHash());break}return this._contactContainers(e),t.ui.ddmanager&&t.ui.ddmanager.drag(this,e),this._trigger("sort",e,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(e,i){if(e){if(t.ui.ddmanager&&!this.options.dropBehaviour&&t.ui.ddmanager.drop(this,e),this.options.revert){var s=this,n=this.placeholder.offset(),o=this.options.axis,a={};o&&"x"!==o||(a.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),o&&"y"!==o||(a.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,t(this.helper).animate(a,parseInt(this.options.revert,10)||500,function(){s._clear(e)})}else this._clear(e,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new t.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var e=this.containers.length-1;e>=0;e--)this.containers[e]._trigger("deactivate",null,this._uiHash(this)),this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",null,this._uiHash(this)),this.containers[e].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),t.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?t(this.domPosition.prev).after(this.currentItem):t(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},t(i).each(function(){var i=(t(e.item||this).attr(e.attribute||"id")||"").match(e.expression||/(.+)[\-=_](.+)/);i&&s.push((e.key||i[1]+"[]")+"="+(e.key&&e.expression?i[1]:i[2]))}),!s.length&&e.key&&s.push(e.key+"="),s.join("&")},toArray:function(e){var i=this._getItemsAsjQuery(e&&e.connected),s=[];return e=e||{},i.each(function(){s.push(t(e.item||this).attr(e.attribute||"id")||"")}),s},_intersectsWith:function(t){var e=this.positionAbs.left,i=e+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,o=t.left,a=o+t.width,r=t.top,h=r+t.height,l=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+l>r&&h>s+l,d="y"===this.options.axis||e+c>o&&a>e+c,p=u&&d;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>t[this.floating?"width":"height"]?p:e+this.helperProportions.width/2>o&&a>i-this.helperProportions.width/2&&s+this.helperProportions.height/2>r&&h>n-this.helperProportions.height/2},_intersectsWithPointer:function(t){var e,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top,t.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left,t.width),o=s&&n;return o?(e=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===e?2:1:e&&("down"===e?2:1)):!1},_intersectsWithSides:function(t){var e=this._isOverAxis(this.positionAbs.top+this.offset.click.top,t.top+t.height/2,t.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,t.left+t.width/2,t.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&e||"up"===s&&!e)},_getDragVerticalDirection:function(){var t=this.positionAbs.top-this.lastPositionAbs.top;return 0!==t&&(t>0?"down":"up")},_getDragHorizontalDirection:function(){var t=this.positionAbs.left-this.lastPositionAbs.left;return 0!==t&&(t>0?"right":"left")},refresh:function(t){return this._refreshItems(t),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var t=this.options;return t.connectWith.constructor===String?[t.connectWith]:t.connectWith},_getItemsAsjQuery:function(e){function i(){r.push(this)}var s,n,o,a,r=[],h=[],l=this._connectWith();if(l&&e)for(s=l.length-1;s>=0;s--)for(o=t(l[s],this.document[0]),n=o.length-1;n>=0;n--)a=t.data(o[n],this.widgetFullName),a&&a!==this&&!a.options.disabled&&h.push([t.isFunction(a.options.items)?a.options.items.call(a.element):t(a.options.items,a.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),a]);for(h.push([t.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):t(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=h.length-1;s>=0;s--)h[s][0].each(i);return t(r)},_removeCurrentsFromItems:function(){var e=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=t.grep(this.items,function(t){for(var i=0;e.length>i;i++)if(e[i]===t.item[0])return!1;return!0})},_refreshItems:function(e){this.items=[],this.containers=[this];var i,s,n,o,a,r,h,l,c=this.items,u=[[t.isFunction(this.options.items)?this.options.items.call(this.element[0],e,{item:this.currentItem}):t(this.options.items,this.element),this]],d=this._connectWith();if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=t(d[i],this.document[0]),s=n.length-1;s>=0;s--)o=t.data(n[s],this.widgetFullName),o&&o!==this&&!o.options.disabled&&(u.push([t.isFunction(o.options.items)?o.options.items.call(o.element[0],e,{item:this.currentItem}):t(o.options.items,o.element),o]),this.containers.push(o));for(i=u.length-1;i>=0;i--)for(a=u[i][1],r=u[i][0],s=0,l=r.length;l>s;s++)h=t(r[s]),h.data(this.widgetName+"-item",a),c.push({item:h,instance:a,width:0,height:0,left:0,top:0})},refreshPositions:function(e){this.floating=this.items.length?"x"===this.options.axis||this._isFloating(this.items[0].item):!1,this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,o;for(i=this.items.length-1;i>=0;i--)s=this.items[i],s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?t(this.options.toleranceElement,s.item):s.item,e||(s.width=n.outerWidth(),s.height=n.outerHeight()),o=n.offset(),s.left=o.left,s.top=o.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)o=this.containers[i].element.offset(),this.containers[i].containerCache.left=o.left,this.containers[i].containerCache.top=o.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(e){e=e||this;var i,s=e.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=e.currentItem[0].nodeName.toLowerCase(),n=t("<"+s+">",e.document[0]);return e._addClass(n,"ui-sortable-placeholder",i||e.currentItem[0].className)._removeClass(n,"ui-sortable-helper"),"tbody"===s?e._createTrPlaceholder(e.currentItem.find("tr").eq(0),t("<tr>",e.document[0]).appendTo(n)):"tr"===s?e._createTrPlaceholder(e.currentItem,n):"img"===s&&n.attr("src",e.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(t,n){(!i||s.forcePlaceholderSize)&&(n.height()||n.height(e.currentItem.innerHeight()-parseInt(e.currentItem.css("paddingTop")||0,10)-parseInt(e.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(e.currentItem.innerWidth()-parseInt(e.currentItem.css("paddingLeft")||0,10)-parseInt(e.currentItem.css("paddingRight")||0,10)))}}),e.placeholder=t(s.placeholder.element.call(e.element,e.currentItem)),e.currentItem.after(e.placeholder),s.placeholder.update(e,e.placeholder)},_createTrPlaceholder:function(e,i){var s=this;e.children().each(function(){t("<td>&#160;</td>",s.document[0]).attr("colspan",t(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(e){var i,s,n,o,a,r,h,l,c,u,d=null,p=null;for(i=this.containers.length-1;i>=0;i--)if(!t.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(d&&t.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",e,this._uiHash(this)),this.containers[i].containerCache.over=0);if(d)if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(n=1e4,o=null,c=d.floating||this._isFloating(this.currentItem),a=c?"left":"top",r=c?"width":"height",u=c?"pageX":"pageY",s=this.items.length-1;s>=0;s--)t.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(h=this.items[s].item.offset()[a],l=!1,e[u]-h>this.items[s][r]/2&&(l=!0),n>Math.abs(e[u]-h)&&(n=Math.abs(e[u]-h),o=this.items[s],this.direction=l?"up":"down"));if(!o&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",e,this._uiHash()),this.currentContainer.containerCache.over=1),void 0;o?this._rearrange(e,o,null,!0):this._rearrange(e,null,this.containers[p].element,!0),this._trigger("change",e,this._uiHash()),this.containers[p]._trigger("change",e,this._uiHash(this)),this.currentContainer=this.containers[p],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",e,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(e){var i=this.options,s=t.isFunction(i.helper)?t(i.helper.apply(this.element[0],[e,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;return s.parents("body").length||t("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(!s[0].style.width||i.forceHelperSize)&&s.width(this.currentItem.width()),(!s[0].style.height||i.forceHelperSize)&&s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(e){"string"==typeof e&&(e=e.split(" ")),t.isArray(e)&&(e={left:+e[0],top:+e[1]||0}),"left"in e&&(this.offset.click.left=e.left+this.margins.left),"right"in e&&(this.offset.click.left=this.helperProportions.width-e.right+this.margins.left),"top"in e&&(this.offset.click.top=e.top+this.margins.top),"bottom"in e&&(this.offset.click.top=this.helperProportions.height-e.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var e=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])&&(e.left+=this.scrollParent.scrollLeft(),e.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&t.ui.ie)&&(e={top:0,left:0}),{top:e.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:e.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var t=this.currentItem.position();return{top:t.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:t.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(e=t(n.containment)[0],i=t(n.containment).offset(),s="hidden"!==t(e).css("overflow"),this.containment=[i.left+(parseInt(t(e).css("borderLeftWidth"),10)||0)+(parseInt(t(e).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(t(e).css("borderTopWidth"),10)||0)+(parseInt(t(e).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(e.scrollWidth,e.offsetWidth):e.offsetWidth)-(parseInt(t(e).css("borderLeftWidth"),10)||0)-(parseInt(t(e).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(e.scrollHeight,e.offsetHeight):e.offsetHeight)-(parseInt(t(e).css("borderTopWidth"),10)||0)-(parseInt(t(e).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(e,i){i||(i=this.position);var s="absolute"===e?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,o=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():o?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():o?0:n.scrollLeft())*s}},_generatePosition:function(e){var i,s,n=this.options,o=e.pageX,a=e.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&t.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(e.pageX-this.offset.click.left<this.containment[0]&&(o=this.containment[0]+this.offset.click.left),e.pageY-this.offset.click.top<this.containment[1]&&(a=this.containment[1]+this.offset.click.top),e.pageX-this.offset.click.left>this.containment[2]&&(o=this.containment[2]+this.offset.click.left),e.pageY-this.offset.click.top>this.containment[3]&&(a=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((a-this.originalPageY)/n.grid[1])*n.grid[1],a=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((o-this.originalPageX)/n.grid[0])*n.grid[0],o=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:a-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_rearrange:function(t,e,i,s){i?i[0].appendChild(this.placeholder[0]):e.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?e.item[0]:e.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var n=this.counter;
this._delay(function(){n===this.counter&&this.refreshPositions(!s)})},_clear:function(t,e){function i(t,e,i){return function(s){i._trigger(t,s,e._uiHash(e))}}this.reverting=!1;var s,n=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)("auto"===this._storedCSS[s]||"static"===this._storedCSS[s])&&(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!e&&n.push(function(t){this._trigger("receive",t,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||e||n.push(function(t){this._trigger("update",t,this._uiHash())}),this!==this.currentContainer&&(e||(n.push(function(t){this._trigger("remove",t,this._uiHash())}),n.push(function(t){return function(e){t._trigger("receive",e,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(t){return function(e){t._trigger("update",e,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)e||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,e||this._trigger("beforeStop",t,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!e){for(s=0;n.length>s;s++)n[s].call(this,t);this._trigger("stop",t,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){t.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(e){var i=e||this;return{helper:i.helper,placeholder:i.placeholder||t([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:e?e.element:null}}}),t.widget("ui.spinner",{version:"1.12.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),""!==this.value()&&this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var e=this._super(),i=this.element;return t.each(["min","max","step"],function(t,s){var n=i.attr(s);null!=n&&n.length&&(e[s]=n)}),e},_events:{keydown:function(t){this._start(t)&&this._keydown(t)&&t.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(t){return this.cancelBlur?(delete this.cancelBlur,void 0):(this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",t),void 0)},mousewheel:function(t,e){if(e){if(!this.spinning&&!this._start(t))return!1;this._spin((e>0?1:-1)*this.options.step,t),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(t)},100),t.preventDefault()}},"mousedown .ui-spinner-button":function(e){function i(){var e=this.element[0]===t.ui.safeActiveElement(this.document[0]);e||(this.element.trigger("focus"),this.previous=s,this._delay(function(){this.previous=s}))}var s;s=this.element[0]===t.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),e.preventDefault(),i.call(this),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),this._start(e)!==!1&&this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(e){return t(e.currentTarget).hasClass("ui-state-active")?this._start(e)===!1?!1:(this._repeat(null,t(e.currentTarget).hasClass("ui-spinner-up")?1:-1,e),void 0):void 0},"mouseleave .ui-spinner-button":"_stop"},_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&this.uiSpinner.height()>0&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(e){var i=this.options,s=t.ui.keyCode;switch(e.keyCode){case s.UP:return this._repeat(null,1,e),!0;case s.DOWN:return this._repeat(null,-1,e),!0;case s.PAGE_UP:return this._repeat(null,i.page,e),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,e),!0}return!1},_start:function(t){return this.spinning||this._trigger("start",t)!==!1?(this.counter||(this.counter=1),this.spinning=!0,!0):!1},_repeat:function(t,e,i){t=t||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,e,i)},t),this._spin(e*this.options.step,i)},_spin:function(t,e){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+t*this._increment(this.counter)),this.spinning&&this._trigger("spin",e,{value:i})===!1||(this._value(i),this.counter++)},_increment:function(e){var i=this.options.incremental;return i?t.isFunction(i)?i(e):Math.floor(e*e*e/5e4-e*e/500+17*e/200+1):1},_precision:function(){var t=this._precisionOf(this.options.step);return null!==this.options.min&&(t=Math.max(t,this._precisionOf(this.options.min))),t},_precisionOf:function(t){var e=""+t,i=e.indexOf(".");return-1===i?0:e.length-i-1},_adjustValue:function(t){var e,i,s=this.options;return e=null!==s.min?s.min:0,i=t-e,i=Math.round(i/s.step)*s.step,t=e+i,t=parseFloat(t.toFixed(this._precision())),null!==s.max&&t>s.max?s.max:null!==s.min&&s.min>t?s.min:t},_stop:function(t){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",t))},_setOption:function(t,e){var i,s,n;return"culture"===t||"numberFormat"===t?(i=this._parse(this.element.val()),this.options[t]=e,this.element.val(this._format(i)),void 0):(("max"===t||"min"===t||"step"===t)&&"string"==typeof e&&(e=this._parse(e)),"icons"===t&&(s=this.buttons.first().find(".ui-icon"),this._removeClass(s,null,this.options.icons.up),this._addClass(s,null,e.up),n=this.buttons.last().find(".ui-icon"),this._removeClass(n,null,this.options.icons.down),this._addClass(n,null,e.down)),this._super(t,e),void 0)},_setOptionDisabled:function(t){this._super(t),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!t),this.element.prop("disabled",!!t),this.buttons.button(t?"disable":"enable")},_setOptions:r(function(t){this._super(t)}),_parse:function(t){return"string"==typeof t&&""!==t&&(t=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(t,10,this.options.culture):+t),""===t||isNaN(t)?null:t},_format:function(t){return""===t?"":window.Globalize&&this.options.numberFormat?Globalize.format(t,this.options.numberFormat,this.options.culture):t},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var t=this.value();return null===t?!1:t===this._adjustValue(t)},_value:function(t,e){var i;""!==t&&(i=this._parse(t),null!==i&&(e||(i=this._adjustValue(i)),t=this._format(i))),this.element.val(t),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:r(function(t){this._stepUp(t)}),_stepUp:function(t){this._start()&&(this._spin((t||1)*this.options.step),this._stop())},stepDown:r(function(t){this._stepDown(t)}),_stepDown:function(t){this._start()&&(this._spin((t||1)*-this.options.step),this._stop())},pageUp:r(function(t){this._stepUp((t||1)*this.options.page)}),pageDown:r(function(t){this._stepDown((t||1)*this.options.page)}),value:function(t){return arguments.length?(r(this._value).call(this,t),void 0):this._parse(this.element.val())},widget:function(){return this.uiSpinner}}),t.uiBackCompat!==!1&&t.widget("ui.spinner",t.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}}),t.ui.spinner,t.widget("ui.tabs",{version:"1.12.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var t=/#.*$/;return function(e){var i,s;i=e.href.replace(t,""),s=location.href.replace(t,"");try{i=decodeURIComponent(i)}catch(n){}try{s=decodeURIComponent(s)}catch(n){}return e.hash.length>1&&i===s}}(),_create:function(){var e=this,i=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,i.collapsible),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var e=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);return null===e&&(s&&this.tabs.each(function(i,n){return t(n).attr("aria-controls")===s?(e=i,!1):void 0}),null===e&&(e=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===e||-1===e)&&(e=this.tabs.length?0:!1)),e!==!1&&(e=this.tabs.index(this.tabs.eq(e)),-1===e&&(e=i?!1:0)),!i&&e===!1&&this.anchors.length&&(e=0),e},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(e){var i=t(t.ui.safeActiveElement(this.document[0])).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(e)){switch(e.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:s++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:n=!1,s--;break;case t.ui.keyCode.END:s=this.anchors.length-1;break;case t.ui.keyCode.HOME:s=0;break;case t.ui.keyCode.SPACE:return e.preventDefault(),clearTimeout(this.activating),this._activate(s),void 0;case t.ui.keyCode.ENTER:return e.preventDefault(),clearTimeout(this.activating),this._activate(s===this.options.active?!1:s),void 0;default:return}e.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),e.ctrlKey||e.metaKey||(i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(e){return e.altKey&&e.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):e.altKey&&e.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(e,i){function s(){return e>n&&(e=0),0>e&&(e=n),e}for(var n=this.tabs.length-1;-1!==t.inArray(s(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).trigger("focus"),t},_setOption:function(t,e){return"active"===t?(this._activate(e),void 0):(this._super(t,e),"collapsible"===t&&(this._toggleClass("ui-tabs-collapsible",null,e),e||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(e),"heightStyle"===t&&this._setupHeightStyle(e),void 0)},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=t(),this.anchors.each(function(i,s){var n,o,a,r=t(s).uniqueId().attr("id"),h=t(s).closest("li"),l=h.attr("aria-controls");e._isLocal(s)?(n=s.hash,a=n.substring(1),o=e.element.find(e._sanitizeSelector(n))):(a=h.attr("aria-controls")||t({}).uniqueId()[0].id,n="#"+a,o=e.element.find(n),o.length||(o=e._createPanel(a),o.insertAfter(e.panels[i-1]||e.tablist)),o.attr("aria-live","polite")),o.length&&(e.panels=e.panels.add(o)),l&&h.data("ui-tabs-aria-controls",l),h.attr({"aria-controls":a,"aria-labelledby":r}),o.attr("aria-labelledby",r)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(e){var i,s,n;for(t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1),n=0;s=this.tabs[n];n++)i=t(s),e===!0||-1!==t.inArray(n,e)?(i.attr("aria-disabled","true"),this._addClass(i,null,"ui-state-disabled")):(i.removeAttr("aria-disabled"),this._removeClass(i,null,"ui-state-disabled"));this.options.disabled=e,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,e===!0)},_setupEvents:function(e){var i={};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(t){t.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,s=this.element.parent();"fill"===e?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),o=n.closest("li"),a=o[0]===s[0],r=a&&i.collapsible,h=r?t():this._getPanelForTab(o),l=s.length?this._getPanelForTab(s):t(),c={oldTab:s,oldPanel:l,newTab:r?t():o,newPanel:h};e.preventDefault(),o.hasClass("ui-state-disabled")||o.hasClass("ui-tabs-loading")||this.running||a&&!i.collapsible||this._trigger("beforeActivate",e,c)===!1||(i.active=r?!1:this.tabs.index(o),this.active=a?t():o,this.xhr&&this.xhr.abort(),l.length||h.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(o),e),this._toggle(e,c))},_toggle:function(e,i){function s(){o.running=!1,o._trigger("activate",e,i)}function n(){o._addClass(i.newTab.closest("li"),"ui-tabs-active","ui-state-active"),a.length&&o.options.show?o._show(a,o.options.show,s):(a.show(),s())}var o=this,a=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){o._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),n()}):(this._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),a.length&&r.length?i.oldTab.attr("tabIndex",-1):a.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),a.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(e){var i,s=this._findActive(e);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(e){return"string"==typeof e&&(e=this.anchors.index(this.anchors.filter("[href$='"+t.ui.escapeSelector(e)+"']"))),e},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(e){var i=this.options.disabled;i!==!1&&(void 0===e?i=!1:(e=this._getIndex(e),i=t.isArray(i)?t.map(i,function(t){return t!==e?t:null}):t.map(this.tabs,function(t,i){return i!==e?i:null})),this._setOptionDisabled(i))},disable:function(e){var i=this.options.disabled;if(i!==!0){if(void 0===e)i=!0;else{if(e=this._getIndex(e),-1!==t.inArray(e,i))return;i=t.isArray(i)?t.merge([e],i).sort():[e]}this._setOptionDisabled(i)}},load:function(e,i){e=this._getIndex(e);var s=this,n=this.tabs.eq(e),o=n.find(".ui-tabs-anchor"),a=this._getPanelForTab(n),r={tab:n,panel:a},h=function(t,e){"abort"===e&&s.panels.stop(!1,!0),s._removeClass(n,"ui-tabs-loading"),a.removeAttr("aria-busy"),t===s.xhr&&delete s.xhr};this._isLocal(o[0])||(this.xhr=t.ajax(this._ajaxSettings(o,i,r)),this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(n,"ui-tabs-loading"),a.attr("aria-busy","true"),this.xhr.done(function(t,e,n){setTimeout(function(){a.html(t),s._trigger("load",i,r),h(n,e)},1)}).fail(function(t,e){setTimeout(function(){h(t,e)},1)})))},_ajaxSettings:function(e,i,s){var n=this;return{url:e.attr("href").replace(/#.*$/,""),beforeSend:function(e,o){return n._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:o},s))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),t.uiBackCompat!==!1&&t.widget("ui.tabs",t.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),t.ui.tabs,t.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))},_removeDescribedBy:function(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=t("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=t([])},_setOption:function(e,i){var s=this;this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e.element)})},_setOptionDisabled:function(t){this[t?"_disable":"_enable"]()},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s.element[0],e.close(n,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var e=t(this);return e.is("[title]")?e.data("ui-tooltip-title",e.attr("title")).removeAttr("title"):void 0}))},_enable:function(){this.disabledTitles.each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))}),this.disabledTitles=t([])},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._registerCloseHandlers(e,s),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,o=e?e.type:null;return"string"==typeof s||s.nodeType||s.jquery?this._open(e,t,s):(i=s.call(t[0],function(i){n._delay(function(){t.data("ui-tooltip-open")&&(e&&(e.type=o),this._open(e,t,i))})}),i&&this._open(e,t,i),void 0)},_open:function(e,i,s){function n(t){l.of=t,a.is(":hidden")||a.position(l)}var o,a,r,h,l=t.extend({},this.options.position);if(s){if(o=this._find(i))return o.tooltip.find(".ui-tooltip-content").html(s),void 0;i.is("[title]")&&(e&&"mouseover"===e.type?i.attr("title",""):i.removeAttr("title")),o=this._tooltip(i),a=o.tooltip,this._addDescribedBy(i,a.attr("id")),a.find(".ui-tooltip-content").html(s),this.liveRegion.children().hide(),h=t("<div>").html(a.find(".ui-tooltip-content").html()),h.removeAttr("name").find("[name]").removeAttr("name"),h.removeAttr("id").find("[id]").removeAttr("id"),h.appendTo(this.liveRegion),this.options.track&&e&&/^mouse/.test(e.type)?(this._on(this.document,{mousemove:n}),n(e)):a.position(t.extend({of:i},this.options.position)),a.hide(),this._show(a,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(r=this.delayedShow=setInterval(function(){a.is(":visible")&&(n(l.of),clearInterval(r))},t.fx.interval)),this._trigger("open",e,{tooltip:a})}},_registerCloseHandlers:function(e,i){var s={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var s=t.Event(e);s.currentTarget=i[0],this.close(s,!0)}}};i[0]!==this.element[0]&&(s.remove=function(){this._removeTooltip(this._find(i).tooltip)}),e&&"mouseover"!==e.type||(s.mouseleave="close"),e&&"focusin"!==e.type||(s.focusout="close"),this._on(!0,i,s)},close:function(e){var i,s=this,n=t(e?e.currentTarget:this.element),o=this._find(n);return o?(i=o.tooltip,o.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),o.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),o.closing=!0,this._trigger("close",e,{tooltip:i}),o.hiding||(o.closing=!1)),void 0):(n.removeData("ui-tooltip-open"),void 0)},_tooltip:function(e){var i=t("<div>").attr("role","tooltip"),s=t("<div>").appendTo(i),n=i.uniqueId().attr("id");return this._addClass(s,"ui-tooltip-content"),this._addClass(i,"ui-tooltip","ui-widget ui-widget-content"),i.appendTo(this._appendTo(e)),this.tooltips[n]={element:e,tooltip:i}},_find:function(t){var e=t.data("ui-tooltip-id");return e?this.tooltips[e]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_appendTo:function(t){var e=t.closest(".ui-front, dialog");return e.length||(e=this.document[0].body),e},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur"),o=s.element;n.target=n.currentTarget=o[0],e.close(n,!0),t("#"+i).remove(),o.data("ui-tooltip-title")&&(o.attr("title")||o.attr("title",o.data("ui-tooltip-title")),o.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),t.uiBackCompat!==!1&&t.widget("ui.tooltip",t.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var t=this._superApply(arguments);return this.options.tooltipClass&&t.tooltip.addClass(this.options.tooltipClass),t}}),t.ui.tooltip});

//*******************************************************************
//          b$l = Beaver $cript Library.
//          Intended to be lite weight JS generic library.
//          Copyright (c) 2018 Konstantin Kirillov
//          Licenses: MIT, GPL, GPL2.
//*******************************************************************

// //\\// Super-module of b$l framework. Must be executed first
//        Checks if there is a conflict in global namespace with this library name.
//        Adds ns.$$ - lite weight dom wrap.
//  
//        Creates only one global: window[ APP_NAME ]
//        jQuery can be added with no collision.


( function() {
    var APP_NAME        = 'b$l';

    //.optional property: comment this definition out if not needed
    //.purpose is only to short manual typing for development debug
    window.ccc          = window.console.log;

    var ns = setAppNamespace( APP_NAME );
    setDomWrap( ns );
    return;






    function setAppNamespace( name )
    {
        var uniqueEarthWide = 'iamniquelks8e00w-e9jalknfnaegha;s[snfs=sieuhba;fkleub92784bna';
        var ns = window[ name ];
        if( ns ) {
            if( ns[ uniqueEarthWide ] ) { return ns; }
            //.lets community to take care about this app
            throw 'global name collision: the window["' + name + '"] already exists in web-browser';
        } else {
            var ns = window[ name ] = {};
            ns[ uniqueEarthWide ] = true;
            ns.uniqueEarthWide = uniqueEarthWide;
            ns.sn = sn;
            ns.APP_NAME = name;
            ns.CSS_PREFIX = name.replace( /\$/g, 's' );
            return ns;
        }

        ///sets namespace
        function sn( subname, parentNS )
        {
            var parentNS = parentNS || ns;
            if( parentNS.hasOwnProperty( subname ) ) {
                return parentNS[ subname ];
            } 
            var sns = parentNS[ subname ] = {};
            return sns;

            /*
            //proposes property conflict detection with JS native objects in 
            //prototype-tree depths
            var sns = parentNS[ subname ];
            if( sns ) {
                if( sns[ uniqueEarthWide ] ) return sns;
                //.lets community to take care about this app
                throw 'object property name collision: the parentNS["' + subname +
                '"] already exists in web-browser';
            }
            var sns = parentNS[ subname ] = {};
            sns[ uniqueEarthWide ] = true;
            return sns;
            */
        }
    }







    //***************************************************************************
    // //\\ ns.$$ ... dom wrapp
    //***************************************************************************
    function setDomWrap( ns )
    {
        // //\\ helpers
        ns.svgNS = "http://www.w3.org/2000/svg";

        ///https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
        ns.callOn = function( selector, parent, callback )
        {
            parent = parent || document;
            var els = parent.querySelectorAll( selector );
            for( var ii = 0; ii < els.length; ii++ ) {
                callback( els[ii], ii );
            }
        };

        ///converts event pos to domelem-css-pos
        ns.event_pos_2_css_pos = function ( event, domelem )
        {
            //	https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
            //	Feature 	Chrome 	Firefox (Gecko) 	Internet Explorer 	Opera 	Safari
            //	Basic support 	1.0 	3.0 (1.9) 	4.0 	(Yes) 	4.0
            var box	= domelem.getBoundingClientRect();
            var loc	= [ Math.round( event.clientX - box.left ), Math.round( event.clientY - box.top ) ];
            return loc;
        };


        // //\\ DOM wrap
        //      for chains
        //      simple replacement of jQuery
        var $$ = ns.$$ =
        ( function() {
            
            var gen = function() {
                var ctxEl = null;
                var methods =
                {
                    //.wraps flat-dom-object-into-platform
                    $:      function( obj )                 { ctxEl = obj                                            },

                    c:      function( type )                { ctxEl =                document.createElement( type ); },
                    //.gets single by id
                    g:      function( id )                  { ctxEl =                document.getElementById( id ); },
                    //.gets single
                    q:      function( selector, parent )    { ctxEl =                (parent||document.body).querySelector( selector ); },
                    //.gets array of all
                    qa:     function( selector, parent )    { ctxEl =                (parent||document.body).querySelectorAll( selector ); },
                    cNS:    function( type )                { ctxEl =                document.createElementNS( ns.svgNS, type ); },
                    a:      function( attr, text, obj )     { ctxEl = obj || ctxEl;  ctxEl.setAttribute( attr, text ); },
                    aNS:    function( attr, text, obj )     { ctxEl = obj || ctxEl;  ctxEl.setAttributeNS( null, attr, text ); },
                    to:     function( to, obj )             { ctxEl = obj || ctxEl;  to.appendChild( ctxEl ); },
                    ch:     function( ch, obj )             { ctxEl = obj || ctxEl;  ctxEl.appendChild( ch ); },
                    e:      function( type, callback, obj ) { ctxEl = obj || ctxEl;  ctxEl.addEventListener( type, callback ); },
                    css:    function( name, value, obj )    { ctxEl = obj || ctxEl;  ctxEl.style[ name ] = value; },
                    html:   function( html, obj )           { ctxEl = obj || ctxEl;  ctxEl.innerHTML = html; },


                    //adds class.
                    addClass:   function( text, obj )
                                {   
                                    if( !text ) return; //sugar, saves extra "if"

                                    ctxEl = obj || ctxEl;  
                                    var clss = classes=text.split(/\s+/);
                                    if( clss.length>1 ) {
                                        ////many classes are supplied ...
                                        ////processes each of them
                                        clss.forEach( function( cls ) {
                                            $$.addClass( cls, ctxEl );
                                        });
                                        return;
                                    }

                                    var at = ctxEl.getAttribute( 'class' ); //className is not for SVG
                                    if( !at ) {
                                        //https://stackoverflow.com/questions/41195397/how-to-assign-a-class-to-an-svg-element
                                        //ctxEl.className = text;
                                        ctxEl.setAttribute( 'class', text ); //For SVG
                                        return;
                                    }
                                    var ats = ' ' + at + ' ';
                                    var testee = ' ' + text + ' ';
                                    if( ats.indexOf( testee ) === -1 ) {
                                        //c onsole.log( 'adding=' + text + ' to ' + at);
                                        if( at.length > 0 && text ) {
                                            at += ' ';
                                        }
                                        at += text;
                                        //c onsole.log( 'result of adding=' + at);
                                        //ctxEl.className = at;
                                        ctxEl.setAttribute( 'class', at ); //For SVG
                                    }
                                },

                    //removes class.
                    removeClass: function( text, obj )
                                { 
                                    if( !text ) return; //sugar, saves extra "if"

                                    //c onsole.log( 'removing=' + text );
                                    ctxEl = obj || ctxEl;  
                                    var clss = classes=text.split(/\s+/);
                                    if( clss.length>1 ) {
                                        ////many classes are supplied ...
                                        ////processes each of them
                                        clss.forEach( function( cls ) {
                                            $$.removeClass( cls, ctxEl );
                                        });
                                        return;
                                    }

                                    var at = ctxEl.getAttribute( 'class' );
                                    if( !at ) {
                                        ////nothing to remove ... leaving the task
                                        return;
                                    }
                                    var ats = ' ' + at + ' ';
                                    var testee = ' ' + text + ' ';
                                    if( ats.indexOf( testee ) > -1 ) {
                                        var re = new RegExp( '(?:^|\\s)' + text + '(?:\\s|$)', 'g' );
                                        //var match = at.match( re );
                                        //c onsole.log( 'match=', match );
                                        at = at.replace( re, ' ' );
                                        at = at.replace( /\s+/g, ' ' );
                                        at = at.replace( /(^\s*)|(\s*$)/g, '' );
                                        //at = at.replace( /(\s*)/g, '' );
                                        //c onsole.log( 'removed=' + at );
                                        //ctxEl.className = at;
                                        ctxEl.setAttribute( 'class', at ); //For SVG
                                    }
                                }
                };
                var wrap = function() { return ctxEl; };
                Object.keys( methods ).forEach( function( key ) {
                    var method = methods[ key ];
                    wrap[ key ] = function() { method.apply( {}, arguments ); return wrap; };
                });
                return wrap;
            };

            var sample = gen();
            var masterGen = {};
            Object.keys( sample ).forEach( function( key ) { //todm ... works for functions ? not only for objects?
                masterGen[ key ] = function() { return gen()[ key ].apply( {}, arguments ); };
            });
            return masterGen;

        }) ();
        // \\// DOM wrap
    }
    //***************************************************************************
    // \\// ns.$$ ... dom wrapp
    //***************************************************************************



}) ();



// //\\// debugger
//        non-dispensable for mobiles
//        version july 4, 2018
( function () {
	var ns = window.b$l;




    // creates debugger once per application
    ns.createDebugger = function ()
    {
        if( ns.d ) return;
        ///Checks if bsl-debug textarea exists and 
        /// outputs to debug and scrolls to the end.
        /// If debWind-fragment is commented-out, this function does nothing
        /// and in the code it is still safe to use the lines:
        /// Usage: window.b$l.d(text)
        ns.d = function( text )
        {
            //ccc( Date.now().toString().substr( -6 ) + ' ' + text );
            if( !debWind ) return;
            debWind.value +='\n' + text;
            debWind.scrollTop = debWind.scrollHeight;
        };
        var debWind=null;
        ///uncomment debug-block to enable textarea for debug
        /*
        // //\\ debug-block
        var debWind = document.getElementById( 'bsl-debug' );
        if( !debWind ) {
            ////this block is good when one needs to output large data object
            ////into text box in a browser's textarea at the end of web-page
            debWind = document.createElement( 'textarea' );
            debWind.setAttribute( 'id', 'bsl-debug' );
            debWind.setAttribute( 'disabled', 'yes' );
            document.body.appendChild( debWind );
            debWind.style.cssText = 
                    //'height:18%; width:30%; z-index:1111111;' +
                    'height:250px; width:600px; z-index:1111111;' +
                    'position:absolute; top:60%; left:200px; font-size:15px;';
            ns.dd = debWind; //usage: ns.dd.value +='\n' + text;
        }
        // \\// debug-block
        */
    };

}) ();

( function() {
	var ns = window.b$l;




    //=========================================================
    // //\\ ecapes html specials
    //=========================================================
    var amp_re = /&/g;
    var lt_re = /</g;
    var gt_re = />/g;
    var line_feed_re = /\r\n|\r|\n/g;
    ns.htmlesc = function( str )
    {
        return str.replace( amp_re, '&amp;' ).replace( lt_re, '&lt;' ).replace( gt_re, '&gt;' );
    }

    ns.pre2fluid = function( str )
    {
        return str.replace( line_feed_re, '<br>' );
    }
    //=========================================================
    // \\// ecapes html specials
    //=========================================================



    //=========================================================
    // //\\ configures from URL
    //=========================================================
    ns.url2conf = function( conf )
    {  
        //      if supplied, it overrides internal application conf 
        //      format: ...index.html?conf=a.b.c.d=4,a.b.e=5
        var urlPars     = window.location.search || '';
        /*
        var urlPathname = window.location.pathname;
        var urlProtocol = window.location.protocol;
        var urlHostname = window.location.hostname;
        var urlPort     = window.location.port + '';
        */
        var urlConfRe   = /(?:&|\\?)conf=([^&]+)/i;
        var urlConf     = urlPars.match( urlConfRe );
        if( urlConf ) {
            urlConf = urlConf[1].split(',');
            urlConf.forEach( function( opt ) {
                var cc = opt.split('=');
                if( cc[1] ) {
                    //let user to say "yes" or "no"
                    cc[1] = cc[1] === "yes" ? true : ( cc[1] === "no" ? false : cc[1] );
                } else {
                    ////missed parameter p in x=p is ignored
                    return;
                }
                ns.dots2object( cc[0], cc[1], conf )
                //conf.urlConf[cc[0]]=cc[1];
            });
        }
        return conf;
    }
    //=========================================================
    // \\// configures from URL
    //=========================================================

    // //\\ helpers
    ns.prop2prop = function( target, source )
    {
        if( source ) {
            Object.keys( source ).forEach( function( key ) {
                target[ key ] = source[ key ];
            });
        }
        return target;
    };



    ///updates properties of object obj from single key-value
    ///pair "name, value"
    ns.dots2object = function( name, value, obj )
    {
		var tokens	= name.split( '.' );
		var len		= tokens.length;
		var len1	= len - 1;
		if( len1 < 0 ) {
            obj[ name ] = value;
            return obj;
        }
		var prop	= tokens[ 0 ];
		for( var ii = 0; ii < len1; ii++ )
		{
			//:: appends objects if missed
			if( !obj[ prop ] || typeof obj[ prop ] !== 'object' ) obj[ prop ] = {};
			obj = obj[ prop ];
			var prop = tokens[ ii + 1 ];
		}
		obj[ prop ] = value;
        return obj;
    }



	///	Purpose:		Cloning object trees by value till refdepth.

    // edge-calse does not work: see below as
    // edge-calse does not work: the only problem is when wall_preserved.length is defined.
    // see other edge cases with token "throw" below

	//					"All existing properties at and below refdepth become common
	//					for operands and result".
	//	Detais:			Makes wall a correct paste of paper when
	//						both wall and paper do not have arrays in their trees till (refdepth+1);
	//					otherwise, ( "arrayflict" case)
	//						non-array obj.W can be overriden with array [] and with A which may
	//						break outside reference w = obj.W which still points to the former W.
	//					Infinite recursion is not protected except by using recdepth.
	//	Comparision:	of arrayflicts with jQuery.extend
	//						wall = {...} paper [...]
	//							in jQuery - this is an obligation of programmer to make wall [...]
	//							in tp	-	wall is brutally replaced with []. Not extended,  //TODM possibly fix
	//										but return result is correct possibly except numerics in wall_preserved.
	//						in deeper levels of arrayflict
	//							in jQuery	- new [] is generated
	//							in tp		- new [] is generated
	//							in jQuery	- numeric and non-numeric properties of wall.....non-arr are "killed"
	//							in tp		- numeric and non-numeric properties of wall.....non-arr are preserved
	//					in jQuery	- all prototype levels are copied
	//					in tp		- only ownProperties are copied
	//					in jQuery	- only two options "deep copy" or "not deep"
	//					in tp		- reference deepness can be controlled
	//							
	//	Input:			All args are optional.
	//					skip_undefined	- omitting it allows copying "wall <- paper.undefined".
	//					recdepth		- stops recursion at level > recdepth

	//	Results in:		changed wall properties.
	//	Returns:		combined clone of paper to wall.
	var paste_non_arrays = ns.paste = ns.paste_non_arrays = function ( wall, paper, level, skip_undefined, refdepth, recdepth )
	{

		level = level || 0;
		var t = typeof paper;

		//.Arguments sugar: pasting nothing does not change wall
		if( !level && (t === 'undefined' || paper === null ) ) return wall;

        //.Returns back non-object-type value
		if( t === 'undefined' || t === 'string' || t === 'boolean' || t === 'number' || t === 'function' || paper === null)
		{
			return paper;
		}

		///Reduces the "deep-copy" to reference copy for leveles beneath reference-depth
		if( refdepth || refdepth === 0 )
		{
			if( level > refdepth ) return paper;
		}

		///Recursion limit is exceeded. Truncates recursion by recdepth value.
		if( ( recdepth || recdepth ===0 ) && level > recdepth ) 
		{
			return '';
		}


		///Paper is non-void array or object. If wall do not "match" the paper, making wall an object.
		if( typeof wall !== 'object' || wall === null )
		{
			wall = {};
		}

        var isArrayPaper = Array.isArray( paper );
        if( isArrayPaper && !Array.isArray( wall ) ) {
            ////Paper is array and wall is not. Morthing wall to array but preserve its properties.
			var wall_preserved = wall;
			wall = [];
            //.Returns preserved wall's properties to wall-as-array.
            if( typeof wall_preserved.length !== 'undefined' ) {
                ////edge-calse does not work: the only problem is when wall_preserved.length is defined.
                ////todm: the only problem is when wall_preserved.length is defined.
                throw "copying array to object with existing object.length property";
            }
			paste_non_arrays( wall, wall_preserved, level, skip_undefined, refdepth, null );
        };

		///Now both wall and paper are objects of the same type. Pasting their properties.
		var hasOwn	= Object.prototype.hasOwnProperty;
		for(var p in paper )
		{
			if( hasOwn.call( paper, p ) ) //when works on arrays, then not fails on 'length'? bs "length" is notOwnProperty
			{
				if( p !== 'length' )
				{
					paper[ p ];
						var theValue = paste_non_arrays( wall[ p ], paper[ p ], level+1, skip_undefined, refdepth, recdepth );

						if( ! ( ( isArrayPaper || skip_undefined ) && typeof theValue === 'undefined' )  )
						{
							wall[ p ]		= theValue;
						}
				} else {
					throw 'The subroutine, paste_non_arrays, does not allow to copy property "length".';
				}
			}
		}
		return wall;
	};// ...paste_non_arrays=function...
	
}) ();




///global css manager;
///gradually adds and updates global css
///as page loads at landing
///keeping css in one html-style-element;
( function() {
 	var ns                  = window.b$l;
    var globalCss           = ns.sn('globalCss');
    var cssText             = '';
    var cssDom$             = null;
    globalCss.update        = update;       
    globalCss.addText       = addText;
    globalCss.getText       = getText;
    globalCss.add8update    = addAndUpdate;
    return; //****************************





    function update( moreText )
    {
        if( !cssDom$ ) {
            cssDom$ = ns.$$.c( 'style' ).to( document.head );
        }
        if( moreText ) { cssText += moreText; }
        cssDom$.html( cssText );
    };
    function addText( text )
    {
        cssText += text;
    };
    ///helps to cooperate with other Css builder
    ///by avoiding creation of extra own style-html
    function getText()
    {
        return cssText;
    };
    function addAndUpdate( text )
    {
        addText( text );
        update();
        ///good place to output assembled css for later static use
    }
})();




(function () {
    var ns = window.b$l;
    ns.createDebugger();
    ns.conf = ns.url2conf( {} );
}) ();



//*************************************************************************************
// //\\//   "device-level" drag and drop processor
//          ns.d8d - a method of the layer between mouse/touch events and application
//                  - handles DOM events,
//                  - submits results to app-processor, d8d_app
//                    which can cancel d8d if returns "forbidden=true" ( see below ).
//          Copyright (c) 2018 Konstantin Kirillov. License MIT.
//*************************************************************************************
( function () {
	var ns = window.b$l;		
    //.for applications with complex d8d-handlers creation/deletion
    //.bookkeeps created or deleted ns.d8d objects
    //var eventCounter=0; 







    ///****************************************************************
	/// d8d object constructor
    ///****************************************************************
	ns.d8d = function ( arg )
	{
        //------------------------------------------
        // //\\ input arguments
        //------------------------------------------
        //:application-level-handler
        // see function-call-signature in code below
		var d8d_app  = arg.d8d_app;
        //:	where to draw:
        //  final destination of mouse-point-coordinates detection;
        //		can be a div or media;
        //		media means canvas, img, or possibly video;
        //		in general for media, finally detected mouse-point is
        //		in internal media coordinates;
		var surface	= arg.surface;	
 		//:	to whom to attach events
		var att = arg.attachee || surface;
        //:
		var eventPoint_2_localPoint = arg.eventPoint_2_localPoint || eventPos_2_surfacePos;
        var skipD8D = arg.skipD8D || default_skip;
        //------------------------------------------
        // \\// input arguments
        //------------------------------------------





        //------------------------------------------
        // //\\ locals
        //------------------------------------------
        //.is a d8d-in-progress-flag ...
        //.do program it carefully
		var startPoint	= null; 
		var lastPoint   = null;
        //var eventId     = eventCounter++;
        //------------------------------------------
        // \\// locals
        //------------------------------------------





        //******************************************************************
		// //\\ d8d-scenario root events
        //******************************************************************
		//  possible Android fix:
        //  http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices
        //. todo: touch must provide event which then tested for
        //  Ctrl-pressed flag: use different handler
        att.addEventListener( 'touchstart', doStartDown );  
        att.addEventListener( 'mousedown', doStartDown );

        return { removeEvents : removeEvents }; //exports d8d-object of this module
        // \\//\\// end of module execution

        function removeEvents()
        {
            att.removeEventListener( 'touchstart', doStartDown );
            att.removeEventListener( 'mousedown', doStartDown );
        };
        //******************************************************************
		// \\// d8d-scenario root events
        //******************************************************************







        //*****************************************
		// //\\ DOWN SUBROUTINES
        //*****************************************
		// //\\ root d8d handler
        //========================================
        function doStartDown( ev )
        {
            if( skipD8D( ev ) ) return;
            //ns.d('***ev id=' + eventId + ' doStartDown' );

            ///touch-down
            if( ev.touches && ev.touches.length === 1 ) {
                var event = ev.touches[0];
                //seems wrong: event.preventDefault(); //trying for mobiles
                var forbidden = do_complete_down( event, ev );
                if( !forbidden ) {
                    stopsAftershocks ( ev );
                    att.addEventListener( 'touchmove',   touchMove);
                    att.addEventListener( 'touchend',    touchEnd);
                    att.addEventListener( 'touchcancel', touchEnd);
                } else {
                    //ns.d('\neid=' + eventId + 'move is forbidden');
                }
            ///mouse-down
            } else {
                var forbidden = do_complete_down( ev );
                if( !forbidden ) { 
                    stopsAftershocks ( ev );
                    att.addEventListener( 'mousemove', mouseMove);
                    att.addEventListener( 'mouseup',   mouseEnd);
                    //.todm suspicion: this approach seems not reliable ...
                    // fires right after the mouseDown ...
                    att.addEventListener( 'mouseleave',  mouseEnd);
                } else {
                    //ns.d('\nev id=' + eventId + 'move is forbidden');
                }
            }
        }
        //========================================
		// \\// root d8d handler
        //========================================


        //=========================================
		// //\\ second level of down-handling
        //=========================================
        function do_complete_down( childEvent, rootEvent )
        {
            //ns.d( 'do_complete_down: started' );
            if( startPoint !== null ) {
                //ns.d('broken d8d scenario: the previous startPoint is still exist');
                return true;
            }
            var mPoint = eventPoint_2_localPoint( childEvent );
            if( !mPoint ) {
                //ns.d('do_complete_down: media point failed');
                return true;
            }
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			var forbidden = d8d_app( [0,0], 'down', mPoint, childEvent );
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
			if( forbidden ) {
                //ns.d( 'move start has been cancelled by top-level ' +
                //       'drag-and-drop-processor: eventId=' + eventId );
                return true;
            }
			startPoint = mPoint;
            lastPoint = mPoint;
        }
        //=========================================
		// \\// second level of down-handling
        //*****************************************
		// \\// DOWN SUBROUTINES
        //*****************************************





        //*****************************************
		// //\\ MOVE SUBROUTINES
        //*****************************************
        function touchMove( ev )
        {
    	    mouseMove( ev.touches[ 0 ], ev );
        }

        function mouseMove( childEvent, rootEvent )
        {
            //ns.d('eid=' + eventId + ' moving');
            stopsAftershocks ( rootEvent || childEvent );
            if( !startPoint ) {
                //ns.d('mouseMove: no start point exist');
                return;
            } 
            var mPoint = eventPoint_2_localPoint( childEvent );
            if(!mPoint) { 
                //ns.d('\nmouseMove: media point failed');
                return;
            }
            lastPoint = mPoint;
			do_complete_move( mPoint, childEvent );
			return false;
        }

        ///adds move - the "sugar"
		function do_complete_move( mPoint, childEvent )
		{
			var move =
			[	
				mPoint[ 0 ] - startPoint[ 0 ],
				mPoint[ 1 ] - startPoint[ 1 ]
			];
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            d8d_app( move, 'move', mPoint, childEvent );
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            return move;
		};
        //*****************************************
		// \\// MOVE SUBROUTINES
        //*****************************************






        //*****************************************
		// //\\ END SUBROUTINES
        //*****************************************
        function touchEnd( rootEvent ) {
            //ns.d('***eid=' + eventId + ' removing touch events\n\n');
            att.removeEventListener( 'touchmove',   touchMove );
            att.removeEventListener( 'touchend',    touchEnd );
            att.removeEventListener( 'touchcancel', touchEnd );
            var childEvent = rootEvent.touches && rootEvent.touches[0];
            do_complete_end( childEvent, rootEvent );
        }


        function mouseEnd( child8rootEvent )
        {
            //ns.d( '***eid=' + eventId + ' removing mouse events\n\n' );
            att.removeEventListener( 'mousemove', mouseMove );
            att.removeEventListener( 'mouseup',  mouseEnd );
            att.removeEventListener( 'mouseleave', mouseEnd );
            do_complete_end( child8rootEvent );
        }

        ///Input: note: "childEvent" can be missed for touches
		function do_complete_end( childEvent, rootEvent )
		{
            //ns.d('***eid=' + eventId + ' second End starts');
            var eventPoint = childEvent &&
                             ( childEvent.clientX || childEvent.clientX === 0 ) &&
                             [ childEvent.clientX , childEvent.clientY ];
            var mPoint = eventPoint && eventPoint_2_localPoint( childEvent );

            if( startPoint ) {
                ////startPoint is not missed ...
                stopsAftershocks( rootEvent || childEvent );
                var move = do_complete_move( mPoint || lastPoint, childEvent );
		        startPoint = null; 
                //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
             	d8d_app( move, 'up', mPoint, childEvent );
                //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            //} else {
                ////broken scenario
            }
		};
        //*****************************************
		// \\// END SUBROUTINES
        //*****************************************






        //*****************************************
		// //\\ HELPERS
        //*****************************************
        // //\\ converts event pos to domelem-css-pos
        //===========================================
        function eventPos_2_surfacePos( event )
        {
            //https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
            var box	= surface.getBoundingClientRect();
            var loc	=
            [ 
                Math.round( event.clientX - box.left ),
                Math.round( event.clientY - box.top )
            ];
            return loc;
        };
        //===========================================
        // \\// converts event pos to domelem-css-pos
        //===========================================



        //====================================================================
        // //\\ protects textarea, form elements ... from dragging
        //====================================================================
        //      to preserve ordinary clicks on form elements or other controls
        //      disables dragging on form and other elements
        function default_skip( ev )
        {
            var tag = ev.target.tagName.toLowerCase();
            if(     
                    //protects wbd debugger    
                    tag === 'textarea' ||
                    //protects forms    
                    tag === 'input' || tag === 'select' || tag === 'button'
                    //protects firmware plugins which use svg  
                    // || tag === 'rect' || tag === 'path'                            
            ) {
                return true;
            }
        }
        //====================================================================
        // \\// protects textarea, form elements ... from dragging
        //====================================================================



        //==============================================================
        // //\\ Clears sibling events.
        //      Can be used to prevent the events set in this module to
        //      to be caught by native or other event-handlers.
        //==============================================================
        function stopsAftershocks( rootEvent )
        {
            rootEvent.preventDefault();
            //very good:
            //  javascript.info/bubbling-and-capturing
            //  stackoverflow.com/questions/5299740/stoppropagation-vs-stopimmediatepropagation
            if( rootEvent.stopImmediatePropagation ) {
                ////missed on Android 2.?.?
                rootEvent.stopImmediatePropagation(); //IE9+
            } else if( rootEvent.stopPropagation ) {
                rootEvent.stopPropagation();
            }
        }
        //=========================================
        // \\// Clears sibling events.
        //*****************************************
		// \\// HELPERS
        //*****************************************
	};

}) ();



//code taken from: /var/www/html/sand/web-dev/tools/frontend/btb-master/btb/jq/create-media-runner.js
//css vs js: https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/CSS_JavaScript_animation_performance



( function() {
    var ns      = window.b$l;
    var aframes = ns.sn('aframes');




    //**************************************
    // //\\ prepares native animation frames
    //**************************************
    var ANIMATION_THROTTLER = 16.69;
    //var ANIMATION_THROTTLER = 200;

    // //\\ IE10+
    //      good for debug
    //var documentStart = performance.now(); //not for IE9?
	var timeoutAnimationFrame = function( callback )
	{
        var ANIMATION_INTERVAL = 200;
		//window.setTimeout( function() { callback( performance.now() - documentStart ); }, ANIMATION_INTERVAL );
		window.setTimeout( callback, ANIMATION_INTERVAL );
	};
	//window.requestAnimationFrame = timeoutAnimationFrame;
    // \\// IE10+

	window.requestAnimationFrame =
				window.requestAnimationFrame		||
		        window.webkitRequestAnimationFrame	||
		        window.mozRequestAnimationFrame		||
		        window.oRequestAnimationFrame		||
		        window.msRequestAnimationFrame		||
				timeoutAnimationFrame;
    //**************************************
    // \\// prepares native animation frames
    //**************************************




    //**************************************
    // //\\ animation frames framework
    //**************************************
    //MicroAPI
        //start
        //add
        //add8complete
        //remove
    var unixTime;
    var elapsed;
    var runners = {};
    var hash = 1;
    var aframes_start = null;

	aframes.start = function ()
	{
        if( !aframes_start ) { aframes_start = [ Date.now() ]; }
        var timeOrigin  = aframes_start[0];
        unixTime        = Date.now();
        elapsed         = unixTime - timeOrigin;
        if( elapsed > ANIMATION_THROTTLER ) {
            Object.keys(runners).forEach( doRun );
        }
		window.requestAnimationFrame( aframes.start );
	};


    function doRun( hashStr )
    {
        var rr          = runners[ hashStr ];
        var fun         = rr.fun;
        var funComplete = rr.funComplete;
        var ownStart    = rr.ownStart;
        var duration    = rr.duration;
        var ownElapsed  = unixTime - ownStart;
        //c cc( 'ownElapsed='+ownElapsed + ' elapsed='+elapsed + ' duration='+duration + ' unixTime='+unixTime );

        if( typeof duration === 'undefined' || ownElapsed <= duration ) {
            //==============================================
            // MicroAPI: callback signature
            fun( ownElapsed, elapsed, unixTime );
            //==============================================
        } else {
            //.fires up funComplete if any at the end of animation
            funComplete && funComplete( ownElapsed, elapsed, unixTime );
            aframes.remove( hashStr );
        }
    };


    /// adds callbacks to "dispatcher"
    /// see callback signature above
    aframes.add = function( fun, duration, funComplete ) {
        var hashStr = '' + hash++;
        runners[ hashStr ] = { ownStart:Date.now(), fun:fun, duration:duration, funComplete:funComplete };
        return hashStr;
    };

    aframes.add8complete = function( fun, duration, funComplete ) {
        if( !aframes_start ) aframes.start();
        return aframes.add( fun, duration, funComplete );
    };

    aframes.remove = function( hashStr ) {
        //other way?: https://stackoverflow.com/questions/12216540/how-to-test-for-equality-of-functions-in-javascript
        delete runners[ hashStr ];
    };
    ///if hashStr is not a string, then this function does nothing
    aframes.complete8remove = function( hashStr ) {
        if( typeof hashStr !== 'string' ) return; //automates skipping already cleared runners
        var rr = runners[ hashStr ];
        if( !rr ) return; //allows competing removes
        if( !aframes_start ) {
            ////nothing started yet
            //.todm ... this scenario is not good enough ... is unclear for the newcomer
            aframes.remove( hashStr );
            return;
        }
        rr.duration = -1000;
        doRun( hashStr );
    };
    //**************************************
    // \\// animation frames framework
    //**************************************


}) ();

// //\\// Creates an object which encapsulates slider functionality.
(function() {
	var ns	= window.b$l;







    ///Purpose: constructor of an object which encapsulates slider functionality.
    ///Input:   arg: see MicroAPI section below.
    ns.sliderControl = function( arg )
    {
        thisSlider = {}; //created object which is returned from constructor



        //****************************************************************
        // //\\ MicroAPI
        //      the key role belongs to the unitless inner value
        //      and parameter "absFraction". It means fraction of the 
        //      full range which is = 1. 
        //      The position of slider is by default is
        //      (absFraction*100)%.
        //****************************************************************
        //Dom element which will be visually dragged.
        var draggee          = thisSlider.draggee = arg.handleDomEl;

        //The "draw-surface", the dom-element to which touchstart, mousedown, mousemove, and similar event 
        //will be attached.
        //Optional parameter. Defaults defined from the following line.
        var surface0attachee = thisSlider.surface = arg.drawSurfaceDomEl || draggee.parentNode;

        // //\\ callbacks
        //      data exchanges go via unitless parameter, "absFraction"
        //.callback which will supply data from the slider to parent application during mouse/touch move
        var dataInMove       = arg.dataInMove || (function() {});
        //.callback which will supply data from the slider to parent application at mouse/touch completion
        var dataInArrival    = arg.dataInArrival  || (function() {});
        // \\// callbacks

        //:accepts range-limits or sets their defaults
        var lowLimit         = arg.lowLimit || 0;
        var maxLimit         = arg.maxLimit || 1;

        thisSlider.fraction2value_coeff = arg.fraction2value_coeff || 1;
        thisSlider.id        = arg.id;
        var default_absFrac  = arg.default_absFrac || 0;
        //****************************************************************
        // \\// MicroAPI
        //****************************************************************






        //--------------------------------------
        // //\\ creates locals
        //--------------------------------------
        var sliderStyleOffset = 0; //default
        var absFracDone;           //accomulates and memorizes accomulated move
        var absFraction;           //in plain words:
                                   //   absFraction = absFracDone + "mouse-moveFraction"
                                   //   mouse-moveFraction = mouse-move-x/len
                                   //   len = surface0attachee-length
        //--------------------------------------
        // \\// creates locals
        //--------------------------------------


        //--------------------------------------
        // //\\ processes module
        //--------------------------------------
        //.at creation time, absFracDone is set, and by default to 0
        doSet( default_absFrac, 'doSetDoneValue' );

        ///calls low-level drag-and-drop-MicroAPI
        var this_d8d = ns.d8d(
        {
	        surface : surface0attachee,
	        d8d_app  : d8d_app,
            skipD8D  : skipD8D
        });

        thisSlider.doSet                   = doSet;
        thisSlider.d8d_app                 = d8d_app;
        thisSlider.d8d_emulateAbsFractionX = d8d_emulateAbsFractionX;
        thisSlider.removeEvents            = this_d8d.removeEvents;
        thisSlider.slideeX                 = function() { return absFracDone; };

        return thisSlider;
        //--------------------------------------
        // \\// processes module
        //--------------------------------------




        ///Sets absFraction, draggee position, and, optionally, sets accomulated 
        ///position, absFractDone.
        function doSet( absFraction_, doSetDoneValue )
        {
            absFraction = validateAbsFraction( absFraction_ );
            //.the only place where dragge's style is set
            draggee.style.left = (sliderStyleOffset + absFraction).toFixed(4)*100 + '%';
            if( doSetDoneValue ) {
                absFracDone = absFraction;
            }
        }


        ///d8d application
        function d8d_app( move, mouseUpOrDown )
        {
            if( mouseUpOrDown === 'down' ) {
                return;
            }

            if( mouseUpOrDown === 'move' || mouseUpOrDown === 'up' ) {

                //.this makes program immune to resize
                var len = surface0attachee.getBoundingClientRect().width;
                //.calculates absolute move adding initial position + current move
                absFraction = validateAbsFraction( absFracDone + move[ 0 ]/len ); 
                //.supplies absolute move to application
                var setIsForbidden = dataInMove( absFraction, draggee );
                if( !setIsForbidden ) { doSet( absFraction ); }
            }

            if( mouseUpOrDown === 'up' ) {
                //.accomulates and memorizes accomulated move
                absFracDone = absFraction;
                dataInArrival( absFraction, draggee );
            } 
        }


        ///d8d application emulator
        ///mocks real event, mouseUpOrDown, and sets absFraction
        ///used for "programmable animation" of this slider
        function d8d_emulateAbsFractionX( absFraction, mouseUpOrDown )
        {
            var len = surface0attachee.getBoundingClientRect().width;
            var relMove = ( absFraction - absFracDone ) * len;
            //ccc( 'emulation-layer in engine: len=' + len + ' absFracDone=' +
            //absFracDone + ' absFraction=' + absFraction + ' relMove=' + relMove );
            return d8d_app( [ relMove, 0 ], mouseUpOrDown );
        }



        // //\\// helpers
        function validateAbsFraction( absFrac )
        {
            return Math.min( maxLimit, Math.max( absFrac, lowLimit ) );
        }

        //====================================================================
        // //\\ protects textarea, form elements ... from dragging
        //      to preserve ordinary clicks on form elements or other controls
        //      disables dragging on form and other elements
        //====================================================================
        function skipD8D( ev )
        {
                var tag = ev.target.tagName.toLowerCase();
                ///fails: var cls = ev.target.className;
                if(     
                        //protects wbd debugger    
                        tag === 'textarea' ||
                        //protects forms    
                        tag === 'input' || tag === 'select' || tag === 'button' ||
                        //protects firmware plugins which use svg  
                        tag === 'rect' || tag === 'path'                            
                ) {
                    //ns.d('touchDown: skips drag on tag=' + tag);
                    return true;
                }
        }
        //====================================================================
        // \\// protects textarea, form elements ... from dragging
        //====================================================================

    };
})();


( function() {
    var sn      = window.b$l.sn;
    var mat     = sn('mat');
    var bezier  = sn('bezier');

    

    bezier.weightify        = weightify;
    bezier.weightify        = weightify;
    bezier.points2bezier    = points2bezier;
    bezier.parT2point       = parT2point;
    bezier.line2bezier      = line2bezier;
    bezier.zeroBezier2zeroSubbezier = zeroBezier2zeroSubbezier;
    bezier.bezier2upper     = bezier2upper;
    bezier.bezier2lower     = bezier2lower;
    bezier.t_2_3Dpoint      = t_2_3Dpoint;
    return;



    ///Calculates point on n-points, m-dimentional Bezier curve
    ///Input:  dim = m
    ///        pivotPoints = points, pivotPoints.length = n
    ///        tt = point parameter <- [0,1]
    ///        start = 0 initially
    ///        len = pivotPoints.length initially
    function weightify( tt, pivotPoints, dim, start, len )
    {
        if(  len === 2 ) {
            return (1-tt)*pivotPoints[start][dim] + tt*pivotPoints[start+1][dim];
        } else {
            return  (1-tt) * weightify( tt, pivotPoints, dim, start,   len - 1 ) +
                    tt     * weightify( tt, pivotPoints, dim, start+1, len - 1 )
        }
    }

    ///Sugar subroutine.
    ///Calculates array of points on besier curve,
    ///Input:   points - array of t-parameters on besier curve
    function points2bezier( points, pivots )
    {
        var plen = pivots.length;
        return points.map( function( paramT ) {
                    return [ weightify( paramT, pivots, 0, 0, plen ), 
                             weightify( paramT, pivots, 1, 0, plen )
                    ];
        });
     }

    ///=============================================================
    ///Calculates point on bezier curve by given point's t-parameter
    ///=============================================================
    function parT2point( parT, pivots )
    {
        return [ weightify( parT, pivots, 0, 0, pivots.length ), 
                 weightify( parT, pivots, 1, 0, pivots.length )
        ];
    }


    ///=============================================================
    ///3d poiont
    ///=============================================================
    function t_2_3Dpoint( parT, pivots )
    {
        return [
            weightify( parT, pivots, 0, 0, pivots.length ), 
            weightify( parT, pivots, 1, 0, pivots.length ),
            weightify( parT, pivots, 2, 0, pivots.length )
        ];
    }





    /*
        ///=============================================================
        /// Calculates: crossing of line and bezier curve.
        ///=============================================================
        Input: Q,D line pivots
               B,C second and third bezier pivots; 
                   first must be A = [0,0]
        Returns: [t0, t1] - bezier parameters of crossing, sorted by
                            ascending,
                            t0,t1 <- [0,1]
                 if no solution, returns [].
        Context:

            P = 2B(1-t)t + Ctt;   bezier: Bz(A,B,C), A,B,C - pivots, A=(0,0)
            P = Q + Dq;           line
            Dx^2 + Dy^2 != 0      line is not a point
            -----------------------------------------

            x = 2*Bx*(1-t)*t + Cx t*t = Qx + Dx*q
              = Fx*t*t + Gx*t where
                Fx = Cx - 2Bx, Gx = 2Bx;
            analogiously:
            y = Fy*t*t + Gy*t = Qy + Dy*q

            then multiplying above by Dx:
            Dx*Fy*t*t + Dx*Gy*t - Dx*Qy = Dy * Dx*q
            
            F'x*t*t + G'x*t - Q'x = Dx*Dy*q =
            F'y*t*t + G'y*t - Q'y
            where
                F'x = Fx*Dy
                ...
                Q'y = Qy*Dx

            finally:
            att + bt + c = 0

            which is to be solved against t

            where a = F'x - F'y,
                  b = G'x - G'y,
                  c = Q'y - Q'x

    */
    function line2bezier( Q, D, B, C )
    {
        var Fx = C[0] - 2*B[0];
        var Gx = 2*B[0];
        var Fy = C[1] - 2*B[1];
        var Gy = 2*B[1];

        var Qx = Q[0];
        var Qy = Q[1];
        var Dx = D[0];
        var Dy = D[1];

        var Fsx = Fx*Dy;
        var Gsx = Gx*Dy;
        var Qsx = Qx*Dy;

        var Fsy = Fy*Dx;
        var Gsy = Gy*Dx;
        var Qsy = Qy*Dx;

        var a = Fsx - Fsy;
        var b = Gsx - Gsy;
        var c = Qsy - Qsx;

        var solution = mat.squarePolyRoot( a, b, c );
        //c cc( a, b, c, solution )
        if( solution.length === 1 ) {
            var t = solution[0];
            if( t < 0 || t > 1 ) { solution = []; }
        } else if( solution.length === 2 ) {
            if( solution[0].length ) { 
                ////complex solution
                solution = [];
            } else {
                var t0 = solution[0];
                var t1 = solution[1];
                var result = [];
                if( t0 >=0 && t0 <= 1 ) {result.push( t0 );}
                if( t1 >=0 && t1 <= 1 ) {result.push( t1 );}
                solution = result.length < 2 ? result :
                           t0 > t1 ? [ t1, t0 ] : result;
            }
        }
        return solution;
    }

    /*
        Input: zero-based bezier A,B,C, first-pivot A = [0,0]
               tS - splitter
        Returns: B', C' pivots of zero-based subbezier

        Context: 
                P = 2t(1-t)B + ttC = tt(C-2B) + 2Bt = att+bt
            Sought: 
                P = 2s(1-s)B' + ssC' (*)
            Proof:
                Let: t' = tS, then s = t/t'
                Sought: P=a'ss+b's
                Should: b'/t' = b = 2B => B' = Bt'
                (C'-2Bt') = t't'(C-2B) =>
                C' = t't'(C-2B) + 2Bt'
                Driving these steps backward
                does prove (*).
    */
    function zeroBezier2zeroSubbezier( B, C, tS )
    {
        var sm = mat.sm;
        var u = tS;
        return [ 
            sm(tS,B),
            sm(u*u, sm(C,-2,B), 2*u, B)
        ];

        /*
        ///explicit working variant
        return [ 
            [ B[0]*tS, B[1]*tS ],
            [ tS*(tS*(C[0]-2*B[0])+2*B[0]),
              tS*(tS*(C[1]-2*B[1])+2*B[1])
            ]  
        ];
        */
    }





    //***********************************************************
    // //\\ zeroBezier2upperSubbezier
    //***********************************************************
    /*
        Action:     creates fragment of bezier curve above the 
                    division parameter T
        Inputs:     T - division point
                    B,C - poivots of zero-based-bezier Bz,
        Returns:    three bezier pivots for the fragment above T for
                    parameter s<-[0,1] where
                        0 is mapped to Bz(T),
                        1 is mapped to C
    */
    /*
    function zeroBezier2upperSubbezier( B, C, T )
    {
        var sm = mat.sm;
        //:converts to coordinate system with origin in C
        var Cq = sm(-1,C);
        var Bq = sm(B,Cq);

        var Q  = 1-T;
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, Q );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var As = sm(newPivots[1],C);
        var Bs = sm(newPivots[0],C);
        var Cs = C;
        return [As,Bs,Cs];
    }
    */
    //***********************************************************
    // \\// zeroBezier2upperSubbezier
    //***********************************************************



    ///The same as zeroBezier2upperSubbezier( B, C, T ), but
    ///with 3 input pivots with A in an orbitrary position     
    function bezier2upper( pivots, T )
    {
        var sm = mat.sm;
        var A = pivots[0];
        var B = pivots[1];
        var C = pivots[2];

        //:converts to coordinate system with origin in C
        var Cq = sm(A,-1,C);
        var Bq = sm(B,-1,C);
        var Q  = 1-T;
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, Q );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var As = sm(newPivots[1],C);
        var Bs = sm(newPivots[0],C);
        var Cs = C;
        return [As,Bs,Cs];
    }



    ///The same as zeroBezier2zeroSubbezier( B, C, T ), but
    ///with 3 input pivots with A in an orbitrary position     
    function bezier2lower( pivots, T )
    {
        var sm = mat.sm;
        var A = pivots[0];
        var B = pivots[1];
        var C = pivots[2];

        //:converts to coordinate system with origin in C
        var Cq = sm(C,-1,A);
        var Bq = sm(B,-1,A);
        var newPivots = zeroBezier2zeroSubbezier( Bq, Cq, T );
        ////now we have the solution with param u with starting point
        ////at C, middle point Bs, and ending point mapped to Q.
        ////it can be returned at this point

        ////but we add the following sugar
        ////converts pivots to original coordinate system
        var Bs = sm(newPivots[0],A);
        var Cs = sm(newPivots[1],A);
        return [A,Bs,Cs];
    }
    // //\\// helpers

}) ();



( function() {
	var ns	    = window.b$l;
    var bezier  = ns.sn( 'bezier' );
    var svg     = ns.sn( 'svg' );
    




    ///does paint bezier curve and optionally related shapes: pivots, tangents, and points on curve
    bezier.mediafy = function( arg )
    {
        //:args
        var parent_svg = arg.svg
        var pivots  = arg.pivots;
        //:optional args for data and styles
        var paintPivots  = arg.paintPivots;
        var blines  = arg.blines;
        var bcurve  = arg.bcurve || {};
        var bpoints = arg.bpoints;
        var mediael = arg.mediael || {};

        //:local
        var plen    = pivots.length;


        //--------------------------------------------------------
        // //\\ prepares string-parameter for pivot-lines
        //--------------------------------------------------------
        var pivotsStr = pivots.reduce( function( acc, point ) {
                if( acc ) { acc += ' '; }
                return acc += point[0] + ',' + point[1];
            },
            ''
        );
        //--------------------------------------------------------
        // \\// prepares string-parameter for pivot-lines
        //--------------------------------------------------------

        //--------------------------------------------------------
        // //\\ paints bezier-pivot-lines
        //--------------------------------------------------------
        if( blines ) {
            mediael.paintedLines = svg.u({
                svgel : mediael.paintedLines,
                parent : parent_svg,
                type : 'polyline',
                points : '' + pivotsStr,
                style : blines.style,
                stroke : blines.stroke || 'rgba( 0,0,0, 1 )',
                fill : blines.fill || 'transparent',
                'stroke-width' : blines[ 'stroke-width' ] || 1
            });
        }
        //--------------------------------------------------------
        // \\// paints bezier-pivot-lines
        //--------------------------------------------------------


        //--------------------------------------------------------
        // //\\ paints bezier curve
        //--------------------------------------------------------
        if( bcurve ) {
            if( plen === 3 ) {
                var bcontr = 'Q';
            } else {
                var bcontr = 'C';
            }
            var bezierStr = pivots.reduce( function( acc, point ) {
                    if( acc ) { 
                        acc += ' ' + point[0] + ' ' + point[1];
                    } else { 
                       acc = 'M' + point[0] + ' ' + point[1] + ' ' + bcontr;
                    } 
                    return acc; 
                },
                ''
            );
            mediael.paintedCurve = svg.u({
                svgel : mediael.paintedCurve,
                parent : parent_svg,
                type : 'path',
                fill : bcurve.fill || 'transparent',
                stroke : bcurve.stroke || 'rgba( 0,255,0, 1 )',
                'stroke-width' : bcurve[ 'stroke-width' ] || 3,
                d : '' + bezierStr
            });
        }
        //--------------------------------------------------------
        // \\// paints paints bezier curve
        //--------------------------------------------------------



        //--------------------------------------------------------
        // //\\ paints points on bezier curve
        //--------------------------------------------------------
        if( arg.bpoints ) {
            mediael.points = mediael.points || [];
            //--------------------------------------------------------
            // //\\ calculates points
            //--------------------------------------------------------
            var resultBPoints = bezier.points2bezier( arg.bpoints.points, pivots );
            //--------------------------------------------------------
            // \\// calculates points
            //--------------------------------------------------------
            arg.bpoints.points.forEach( function( paramT, pix ) {
                //--------------------------------------------------------
                // //\\ paints point on bezier curve
                //--------------------------------------------------------
                var attrs = bpoints.attrs || {};
                var point = resultBPoints[ pix ];
                mediael.points[ pix ] = mediael.points[ pix ] || { ix:pix, point:point };
                mediael.points[ pix ].svgel =
                    svg.u({
                        svgel : mediael.points[ pix ].svgel,                         
                        parent : parent_svg,
                        type : 'circle',
                        fill : attrs.fill || 'rgba(255,0,0,1)',
                        cx : point[0],
                        cy : point[1],
                        r : attrs.r || 4,
                        style : attrs.style
                    });
                //--------------------------------------------------------
                // \\// paints point on bezier curve
                //--------------------------------------------------------
            });
        }
        if( paintPivots ) {
            mediael.pivotPoints = mediael.pivotPoints || [];
            paintPivots.topaint.forEach( function( topaint, pix ) {
                if( !topaint ) return;
                var point = pivots[pix];
                //--------------------------------------------------------
                // //\\ paints pivot of bezier curve
                //--------------------------------------------------------
                var attrs = paintPivots.attrs || {};
                mediael.pivotPoints[ pix ] = mediael.pivotPoints[ pix ] || { ix:pix, medpos:point };
                mediael.pivotPoints[ pix ].medpos = point;
                mediael.pivotPoints[ pix ].svgel =
                    svg.u({
                        svgel : mediael.pivotPoints[ pix ].svgel,                         
                        parent : parent_svg,
                        type : 'circle',
                        fill : attrs.fill || 'transparent',
                        stroke : attrs.stroke || 'rgba(255,0,0,1)',
                        'stroke-width' : attrs[ 'stroke-width' ] || 3,
                        cx : point[0],
                        cy : point[1],
                        r : attrs.r || 4,
                        style : attrs.style
                    });
                //--------------------------------------------------------
                // \\// paints pivot of on bezier curve
                //--------------------------------------------------------
            });
        }
        //--------------------------------------------------------
        // \\// paints points on bezier curve
        //--------------------------------------------------------
        return mediael;
    }

}) ();



( function() {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );




    ///Returns:  [] if no solutions
    ///          [ number ] if one solution
    ///          [ number, number ] if real solutions
    ///          [ [...], [...] ] if complex solutions
    ///
    ///Version history: similar to used in .../square/...
    ///                 /march18-98-bezier-threads-predelivey/js/paint-bubbles-and-threads.js
	mat.squarePolyRoot = function( aa, bb, cc )
    {
        if( aa === 0 ) {
            if( bb === 0 ) {
                return cc === 0 ? [1,2,3] : [];
            } else {
                return [ -cc/bb ];
            }
        } else {
            var scale = 1 / ( 2 * aa );
            var center = -bb * scale;
            var discr = bb*bb - 4*aa*cc;
            if( discr < 0 ) {
                var complex = 1;
                discr = -discr;
            }
            var main = Math.sqrt( discr ) * scale;
            return complex ?
                [ [ center, main ], [ center, -main ] ] :
                [ center+main, center-main ];
        }
    };

    //:tests it by not going too far
    //ccc( '0, 0, -2: []        =', mat.squarePolyRoot( 0, 0, -2 ) );
    //ccc( '0, 1, -2: [2]       =', mat.squarePolyRoot( 0, 1, -2 ) );
    //ccc( '1,-2,  0: [0,2]     =', mat.squarePolyRoot( 1, -2, 0 ) );
    //ccc( '1,-2,  2: [1+i, 1-i]=', mat.squarePolyRoot( 1, -2, 2 ) );

}) ();



// //\\// Simple matrix operations.
//        (c) 2017 Konstantin Kirillov. License MIT.
//        Origin taken from: /var/www/html/bids/done/SMALL/ww/calibrator/now/vendor/btb/matrix.js. Nov. 2014.


( function ( window ) {
	var ns	    = window.b$l;
    var mat     = ns.sn( 'mat' );




    /*
        Title:      summ of vectors with weights a,b
        Action:     returns vectors linear combination aA+bB
        Input:
            A,B     - sum of A,B
            a,A     - product aA
            A,b,B   - comb A+bB
            a,A,b,B - comb aA+bB
    */
    mat.sm = function( arg )
    {
        var a = 1;
        var b = 1;
        var B = [0,0];
        var A;
        var ar = arguments;

        if( typeof ar[0] === 'number' ) { 
            a = ar[0]; A = ar[1];
            if( ar.length === 4 ) { b = ar[2]; B = ar[3]; }
        } else {
            A = ar[0];
            if( ar.length === 3 ) {
                b = ar[1];
                B = ar[2];
            } else {
                B = ar[1];
            }
        }
        return [
                    a*A[0]+b*B[0],
                    a*A[1]+b*B[1]
               ];
    }

    /*
    //subtracts vectors
    function mn( A, B ) { return [ A[0] - B[0], A[1] - B[1] ]; }
    */


}) ( window );


( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn( 'mat' );
    var integral    = sn( 'integral', mat );



    ///calculates integral from 0 to x of dx^3+ax^2+bx+c
    integral.polynomial = function( d, a, b, c, x )
    {
        return ( ( ( d/4*x + a/3 ) * x + b/2 ) * x + c ) * x;
    }

    //:test
    //ccc( integral.polynomial( 0, 1, 1, 1, 1 ) ); //11/6 = 1.8333...
    //ccc( integral.polynomial( 1, 1, 1, 1, 1 ) ); //2.0833...

}) ();



// //\\//   attaches library function to b$l
( function () {
	var ns	= window.b$l;


    ///This is a throttler not bouncer.
    ///This function code is update 103-06-28. Only wait === 0 argument is tested so far.
    ///
    ///Useful for resize event
    ///Callback: return-function signature:
    ///             doCallNow has effect of immediate calling plus effect of cleaning up,
    ///             arg can be used for ordinary app. paramters
    ///Input:    wait optional, how much to wait till call the most recent function-curry,
    ///          if falsy, then never wait and never curry.
    ///          Ultimately fires if called at elapsed >= wait. If not called this way, then 
    ///          times out to wait, since last call.
    ns.throttle = function( fun, wait )
    {
        var timeout = null;
        var timeStart = null;
        var arg;
        return function( arg_, doCallNow, doCancel ) {
            arg = arg_; //updates arg at every call
            var time = Date.now();
            var elapsed = ( timeStart === null && 0 ) || ( time - timeStart );
            if( !wait || elapsed > wait || doCallNow ) {
                fun( arg );
                if( timeout !== null ) clearTimeout( timeout );
                timeout = null;
                timeStart = null;
                return;
            }
            if( doCancel && timeout !== null ) {
                clearTimeout( timeout );
                return;
            }
            //.this statement prevents program from extension of the term
            //.in contrary to bouncer which extends the term
            if( timeout !== null ) return;
	        timeout = setTimeout( 
                function() {
		            fun( arg );
		            timeout = null;
                    timeStart = null;
	            },
                wait
            );
            timeStart = time;
        };
    };

}) ();



( function() {
	var ns = window.b$l;

	///	Keyboard Table:
	//	Maps keyCodes to human words across the browsers.
	//	Not to be used directly. Use whichKey(...).
	//	Credit as of November 11, 2011 to Jan Wolter: http://unixpapa.com/js/key.html
	KEY =
	{	
			//C o m m o n:
			//Mozilla, IE, Opera, pseudoASCII, no exceptions:

				//alpha: from 65 till 90:
				65	: [	'a','b','c','d','e','f','g','h','i','j','k','l','m','n',
						'o','p','q','r','s','t','u','v','w','x','y','z'],


				32	: ' ',
				13	: 'enter',
				9	: 'tab',
				27	: 'escape',
				8	: 'backspace',
				//Arrows:
				37	: 'left',
				38	: 'up',
				39	: 'right',
				40	: 'down',
				//Special:
				45	: 'insert',
				46	: 'delete',
				36	: 'home',
				35	: 'end',
				33	: 'pageup',
				34	: 'pagedown',
				//Function keys:
				112	: 'F1',
				113	: 'F2',
				114	: 'F3',
				115	: 'F4',
				116	: 'F5',
				117	: 'F6',
				118	: 'F7',
				119	: 'F8',
				120	: 'F9',
				121	: 'F10',
				122	: 'F11',
				123	: 'F12',

			//M i s c o m m o n:
			//Modifiers: Exceptions.
			16	: 'shift',
			17	: 'control',
			18	: 'alt',
			20	: 'capslock',
			144	: 'numlock',
			//Keyboard Number. Except p.A. Exceptions.
			48	: '0',
			49	: '1',
			50	: '2',
			51	: '3',
			52  : '4',
			53  : '5',
			54	: '6',
			55	: '7',
			56	: '8',
			57	: '9',
			//Symbols. Many differences.
			59	: ':',
			61	: '+',
			188	: ',',
			109	: '-',
			190	: '.',
			191	: '?',
			192	: '~',
			219	: '(',
			220	: '|',
			221	: ')',
			222	: '\''
			//TODm add keypad:
	};		

	ns.keyCode2char = function( keyCode )
	{
		if( !keyCode ) return null;
		if( 65 <= keyCode && keyCode <= 90 ) return KEY[ 65 ][ keyCode - 65 ];
		return KEY[ keyCode ];
	}


}) ();



( function() {
	var ns	= window.b$l;




    // //\\ some proofreading 
    var str2rgb_re = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    ns.rgbstr2hsl = function( rgbstr )
    {
        var cmatch = rgbstr.match( str2rgb_re );
        var rr = parseInt(cmatch[1], 16);
        var gg = parseInt(cmatch[2], 16);
        var bb = parseInt(cmatch[3], 16);
        //c onsole.log( rr, gg, bb );
        var hsl = ns.rgb2hsl( rr, gg, bb );
        return [ hsl[0] * 360, hsl[1] * 100, hsl[2] * 100 ];
    };

    ns.rgbstr2colors = function( rgbstr, opacity )
    {
        var hsl = ns.rgbstr2hsl;
        //c onsole.log( hsl );
        return ns.pars2colors( hsl[0], hsl[1], hsl[2], opacity );
    };
    // \\// some proofreading 


    //was: function getRandomColor()
    ns.pars2colors = function( HUE, SATURATION, LIGHTNESS, OPACITY )
    {
        var DARKER = 0.8;

        //:gets pars
        var hue   = typeof HUE        === 'undefined' ? Math.random() * 359 : HUE;
        var satur = typeof SATURATION === 'undefined' ? 100                 : SATURATION;
        var light = typeof LIGHTNESS  === 'undefined' ? 50                  : LIGHTNESS;
        var opas  = typeof OPACITY    === 'undefined' ? 1                   : OPACITY;

        var resultColor = makeColor( light );
        resultColor.darkColor = makeColor( light * DARKER );

        //:never used and tested
        satur *= 0.5;
        resultColor.softColor = makeColor( 70 );

        ///does the job
        function makeColor( light )
        {
            var ligthStr = light.toFixed(2);

            var hueS = hue.toFixed()
            var hsla = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, ' + opas + ')';
            var hsl0 = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, 0 )'; //for gradients with 0 opacity at one stop

            var rgb = ns.hsl2rgb( hue, satur * 0.01, light * 0.01 );
            var rr = 254.999 * rgb[0];
            var gg = 254.999 * rgb[1];
            var bb = 254.999 * rgb[2];
            var rrS = rr.toFixed();
            var ggS = gg.toFixed();
            var bbS = bb.toFixed();
            var ww = rrS + ',' +  ggS + ',' +  bbS;
            var rgb = 'rgb(' + ww + ')';
            var rgba = 'rgba(' + ww + ',' + opas + ')';
        
            return { 
                hsl0: hsl0,
                hsla : hsla,
                rgb : rgb,
                rgba : rgba,
                hue : hue,
                satur : satur,
                light : light,
                rr: rr,
                gg: gg,
                bb: bb,
                rrS: rrS,
                ggS: ggS,
                bbS: bbS,
                opas : opas
            };
        };

        return resultColor;
    };

    /// HSL to RGB
    /// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
    /// credit: https://codepen.io/frantic1048/pen/LGGxZP   , but it has a mistake: "* 60"
    ns.hsl2rgb = function( hh, ss, ll)
    {

      var cc = (1 - Math.abs(2 * ll - 1)) * ss;
      var hue = hh / 60;
      var xx = cc * (1 - Math.abs(hue % 2 - 1));
      var rgb;

      if (hue >= 0 && hue <= 1) {
        rgb = [cc, xx, 0];
      } else if (hue >= 1 && hue <= 2) {
        rgb = [xx, cc, 0];
      } else if (hue >= 2 && hue <= 3) {
        rgb = [0, cc, xx];
      } else if (hue >= 3 && hue <= 4) {
        rgb = [0, xx, cc];
      } else if (hue >= 4 && hue <= 5) {
        rgb = [xx, 0, cc];
      } else if (hue >= 5 && hue <= 6) {
        rgb = [cc, 0, xx];
      } else {
        rgb = [0, 0, 0];
      }

      var mm = ll - 0.5 * cc;
      return [ rgb[0] + mm, rgb[1] + mm, rgb[2] + mm];
    };



    //https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
    //this needs license and proofreading
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSL representation
     */
    //ns.rgbToHsl = function(r, g, b) {
    ns.rgb2hsl = function(r, g, b) {
      r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return [ h, s, l ];
    }



}) ();


( function() {
	var ns	    = window.b$l;
    var nssvg   = ns.sn( 'svg' );
    var svgNS   = "http://www.w3.org/2000/svg";





    ///updates and, if requested, creates svg-shape
    ///Optional Input:
    ///     arg.svgel
    ///     arg.parent
    ///     arg.type
    ///     arg.style
	nssvg.u = function( arg )
    {
        if( !arg.svgel ) {
            var svgel = document.createElementNS( svgNS, arg.type );
            //protects from duplicate attachment
            if( arg.parent ) arg.parent.appendChild( svgel );
        } else {
            var svgel = arg.svgel;
        }
        Object.keys( arg ).forEach( function( key ) {
            ////sets attributes
            if( key === 'parent' || key === 'type' ) return;
            if( key === 'style' ) {
                ////sets syle properties
                var style = arg.style;
                if( style ) {
                    var stl = svgel.style;
                    Object.keys( style ).forEach( function( key ) {
                        stl[ key ] = style[ key ];
                    });
                }
                return;
            }
            var val = arg[ key ];
            if( val || val === 0 ) {
                //// val is not '' and not undefined
                svgel.setAttributeNS( null, key, val );
            }
        });
        return svgel;
    };


    ///Input: arg.pivots are pivot points
    nssvg.polyline = function( arg )
    {
        var pivotsStr = arg.pivots.reduce( function( acc, point ) {
                if( acc ) { acc += ' '; }
                return acc += point[0].toFixed(2) + ',' + point[1].toFixed(2);
            },
            ''
        );
        return nssvg.u({
            svgel : arg.svgel,
            parent : arg.parent,
            type : 'polyline',
            points : pivotsStr,
            style : arg.style,
            stroke : arg.stroke || 'rgba( 0,0,255, 1 )', 
                //must be transparent bs stroke or fill are often exclusive


            fill : arg.fill || 'transparent',
            'stroke-width' : arg[ 'stroke-width' ] || 1
        });
    };




    ///====================================
    ///Creates or updates svg-text element
    ///====================================
    ///Optional Input:
    ///     arg.svgel   //creates if missed
    ///     arg.parent  //attaches to if supplied
    ///     arg.text
    ///     arg.x
    ///     arg.y
    ///     arg.style
    ///Returns: svg-element
    nssvg.printText = function( arg )
    {   
        arg.type = 'text';
        var svgEl = nssvg.u( arg );
        if( arg.text ) {
            //https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
            //https://stackoverflow.com/questions/4282108/how-to-change-svg-text-tag-using-javascript-innerhtml
            svgEl.textContent = arg.text;
        }
        return svgEl;
    }

}) ();



( function() {
	var ns	= window.b$l;




    // //\\ some proofreading 
    var str2rgb_re = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    ns.rgbstr2hsl = function( rgbstr )
    {
        var cmatch = rgbstr.match( str2rgb_re );
        var rr = parseInt(cmatch[1], 16);
        var gg = parseInt(cmatch[2], 16);
        var bb = parseInt(cmatch[3], 16);
        //c onsole.log( rr, gg, bb );
        var hsl = ns.rgb2hsl( rr, gg, bb );
        return [ hsl[0] * 360, hsl[1] * 100, hsl[2] * 100 ];
    };

    ns.rgbstr2colors = function( rgbstr, opacity )
    {
        var hsl = ns.rgbstr2hsl;
        //c onsole.log( hsl );
        return ns.pars2colors( hsl[0], hsl[1], hsl[2], opacity );
    };
    // \\// some proofreading 


    //was: function getRandomColor()
    ns.pars2colors = function( HUE, SATURATION, LIGHTNESS, OPACITY )
    {
        var DARKER = 0.8;

        //:gets pars
        var hue   = typeof HUE        === 'undefined' ? Math.random() * 359 : HUE;
        var satur = typeof SATURATION === 'undefined' ? 100                 : SATURATION;
        var light = typeof LIGHTNESS  === 'undefined' ? 50                  : LIGHTNESS;
        var opas  = typeof OPACITY    === 'undefined' ? 1                   : OPACITY;

        var resultColor = makeColor( light );
        resultColor.darkColor = makeColor( light * DARKER );

        //:never used and tested
        satur *= 0.5;
        resultColor.softColor = makeColor( 70 );

        ///does the job
        function makeColor( light )
        {
            var ligthStr = light.toFixed(2);

            var hueS = hue.toFixed()
            var hsla = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, ' + opas + ')';
            var hsl0 = 'hsla( ' + hueS + ', ' + satur + '%, ' + ligthStr + '%, 0 )'; //for gradients with 0 opacity at one stop

            var rgb = ns.hsl2rgb( hue, satur * 0.01, light * 0.01 );
            var rr = 254.999 * rgb[0];
            var gg = 254.999 * rgb[1];
            var bb = 254.999 * rgb[2];
            var rrS = rr.toFixed();
            var ggS = gg.toFixed();
            var bbS = bb.toFixed();
            var ww = rrS + ',' +  ggS + ',' +  bbS;
            var rgb = 'rgb(' + ww + ')';
            var rgba = 'rgba(' + ww + ',' + opas + ')';
        
            return { 
                hsl0: hsl0,
                hsla : hsla,
                rgb : rgb,
                rgba : rgba,
                hue : hue,
                satur : satur,
                light : light,
                rr: rr,
                gg: gg,
                bb: bb,
                rrS: rrS,
                ggS: ggS,
                bbS: bbS,
                opas : opas
            };
        };

        return resultColor;
    };

    /// HSL to RGB
    /// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
    /// credit: https://codepen.io/frantic1048/pen/LGGxZP   , but it has a mistake: "* 60"
    ns.hsl2rgb = function( hh, ss, ll)
    {

      var cc = (1 - Math.abs(2 * ll - 1)) * ss;
      var hue = hh / 60;
      var xx = cc * (1 - Math.abs(hue % 2 - 1));
      var rgb;

      if (hue >= 0 && hue <= 1) {
        rgb = [cc, xx, 0];
      } else if (hue >= 1 && hue <= 2) {
        rgb = [xx, cc, 0];
      } else if (hue >= 2 && hue <= 3) {
        rgb = [0, cc, xx];
      } else if (hue >= 3 && hue <= 4) {
        rgb = [0, xx, cc];
      } else if (hue >= 4 && hue <= 5) {
        rgb = [xx, 0, cc];
      } else if (hue >= 5 && hue <= 6) {
        rgb = [cc, 0, xx];
      } else {
        rgb = [0, 0, 0];
      }

      var mm = ll - 0.5 * cc;
      return [ rgb[0] + mm, rgb[1] + mm, rgb[2] + mm];
    };



    //https://stackoverflow.com/questions/39118528/rgb-to-hsl-conversion
    //this needs license and proofreading
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSL representation
     */
    //ns.rgbToHsl = function(r, g, b) {
    ns.rgb2hsl = function(r, g, b) {
      r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return [ h, s, l ];
    }



}) ();


(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var THIS_MODULE = 'reset';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;



// //\\ css /////////////////////////////////////////
var ret = `


    /* http://meyerweb.com/eric/tools/css/reset/
       v2.0 | 20110126
       License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
	    margin: 0;
	    padding: 0;
	    border: 0;
	    font-size: 100%;
	    font: inherit;
	    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
	    display: block;
    }
    body {
	    line-height: 1;
    }
    ol, ul {
	    list-style: none;
    }
    blockquote, q {
	    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
	    content: '';
	    content: none;
    }
    table {
	    border-collapse: collapse;
	    border-spacing: 0;
    }



`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');

    var fapp        = sn('fapp' ); 
    var sapp        = sn('sapp');
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);



    ///application-wide helper
    cssmods.calculateTextPerc = function( mediaPerc ) {
        //todo 8 is a hack ... lesser value, like 6 causes flicker ...
        //ps bs a CSS/JS loop when CSS causes resize, JS catches resize and changes CSS
        return 100 - mediaPerc - 8; 
    };
    cssmods['main-sapp'] = function( cssp, conf ) {
        var colorLight = conf.css['color-light']; 
        var mediaPerc = sconf.mediaDefaultWidthPercent;
        var textPercStr = cssmods.calculateTextPerc( mediaPerc ).toFixed(2) + '%';
        var aroot_DesktopOverflow = sapp.pageMode === 'lemma' ? 'overflow-x:hidden' : 'overflow:visible';


        var ret =



// //\\ css /////////////////////////////////////////
`
    /* @import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,800,900"); */





    /******************************************/
    /* //\\ page primary sections             */
    /******************************************/
    .bsl-approot {
        width:100%;
        margin:0;
        padding:0;
        ${aroot_DesktopOverflow}
    }

    .bsl-menu-filler, /* todm need? */
    .bsl-menu {
        vertical-align: top;
        height: 90px;
        width: 98%;
        margin:0px;
        padding:10px;
        padding-top:0px;
        padding-bottom:0px;
        top: 0px;
        border-radius:10px;
        font-family:helvetica,arial,san-serif;
        z-index:1001;
    }

    .bsl-media-superroot {
        float       :${conf.model_float_dir};
        position    :relative;
        display     :block;
        width       :${mediaPerc.toFixed(2)}%;
        xxxxx-done-programmatically-max-width   :1000px;
        height      :${(conf.exegesis_floats && 'auto') || 'calc(100vh - 140px )'};
        padding     :0;
        margin      :0;
        margin-right:2%; /* pushes the text right */
        overflow    :visible;
    }

    .bsl-media-root {
        clear       :both; /* clears against media-top-controls */
        position    :relative;
        display     :block;

        /* todm: simpler solution: add padding to parent, 21px */
        width       :calc(100% - ${sconf.main_horizontal_dividor_width_px}px);
        left        :${sconf.main_horizontal_dividor_width_px}px;
        padding     :0;
        margin      :0;
        text-align  :center;
        font-family :Montserrat,arial,helvetica,san-serif;
        overflow    :visible;
    }

    /* enables original-figure-picture disappearance */
    /* at version 1112, restored by client request */
    .bsl-bg-image.in-study {
        opacity:0;
        transition: opacity 1s ease;
    }

    /*---------------------------*/
    /* //\\ horizontal resizer   */ 
    /*---------------------------*/
    #bsl-resizable-handle {
      display: flex;
      align-items: center;
      left: 0px;
      top: 0;
      padding: 0 8px;
      position: absolute;
      height: 100%;
      cursor: pointer;
    }
    #bsl-resizable-handle:hover {
      background: ${colorLight};
    }
    .brc-slider-draggee.dividor:hover:after {
        background-color: transparent;
    }        
    /*---------------------------*/
    /* \\// horizontal resizer   */ 
    /*---------------------------*/


    .bsl-text-widget {
        padding             :2%;
        width               :${(conf.exegesis_floats && 'auto') || textPercStr };
        height              :${(conf.exegesis_floats && 'auto') || 'calc(100vh - 140px )'};
        overflow-y          :${(conf.exegesis_floats && 'none') || 'auto'};
        margin-right        :${(conf.exegesis_floats && '0')    || '50px'};
        background-color    :${conf.css.exegesisBackgroundColor};
    }

    /*========================================*/
    /* //\\ exegesis-modes to sizes           */
    /*========================================*/
    .bsl-approot.text--none .bsl-media-superroot {
        width:94%;
        margin-left:3%;
        margin-right:3%;
        /* this sugar needs synch with JS-resize event
        transition: width 1s ease;
        */
    }
    .bsl-approot.text--none #bsl-resizable-handle {
      display: none;
    }
    .bsl-approot.text--none .bsl-media-root {
            width       :100%;
            left        :0;
    }

    @media (max-width: 800px) {

        /* todm: this "double-selector" is a poor practice */
        #bsl-media-superroot.bsl-media-superroot {
            width       :94%;
            height      :auto;
            margin-left :3%;
            margin-right:3%;
            float:none;
        }
        #bsl-resizable-handle {
            display: none;
        }
        .bsl-media-root {
            width       :100%;
            left        :0;
        }
        /* todm: this "double-selector" is a poor practice */
        #bsl-text-widget.bsl-text-widget {
            width       :94%;
            height      :auto;
            margin-right:3%;
            margin-left: 2%;
        }
    }
    /*========================================*/
    /* \\// exegesis-modes to sizes           */
    /* \\// page primary sections             */
    /******************************************/
    `;





/*========================================*/
/* //\\ main-legend                       */
/*========================================*/
ret += `

    @media only screen and (max-width: 800px) {
        .main-legend.hidden {
            display:none;
        }
    }

    /* visibility per model-mode */
    .proof--claim .main-legend.proof {
        display:none;
    }
    /* visibility per model-mode */
    .proof--proof .main-legend.claim {
        display:none;
    }

    .main-legend td {
        padding:1px;
    }
    .main-legend {
        table-layout:fixed;
        margin:auto;
    }


    /*====================================*/
    /* //\\ table formatter               */
    /*====================================*/
    .main-legend td {
        text-align:left;
    }
    .main-legend td.table-caption {
        padding-bottom:4px;
        text-align:center;
        font-weight:bold;
    }
    .main-legend td.align-to-right,
    .main-legend td.value {
        text-align:right;
    }    
    .main-legend .eq-sign {
        text-align:center;
    }    

    
    /*------------*/
    /* //\\ proof */
    /*------------*/
    .main-legend.proof {
        border-collapse: separate;
        border-spacing: 10px 0px;
    }
    .main-legend.proof {
        width:370px;
    }
    .proof.row1 {
        opacity:0;
    }
    .proof.row1 td:nth-child(4),
    .proof.row1 td:nth-child(1) {
        width:12%;
    }
    .proof.row1 td:nth-child(8),
    .proof.row1 td:nth-child(5),
    .proof.row1 td:nth-child(2) {
        width:4%;
    }
    .proof.row1 td:nth-child(9),
    .proof.row1 td:nth-child(6),
    .proof.row1 td:nth-child(3) {
        width:14%;
    }
    .proof.row1 td:nth-child(7) {
        width:22%;
    }
    /*------------*/
    /* \\// proof */
    /*------------*/


    /*------------*/
    /* //\\ claim */
    /*------------*/
    .claim.row1 {
        opacity:0;
    }
    .claim.row1 td:nth-child(1) {
        width:52.5%;
    }
    .claim.row1 td:nth-child(2) {
        width:15%;
    }
    .claim.row1 td:nth-child(3) {
        width:22.5%;
    }
    .main-legend.claim {
        width:140px;
    }
    /*------------*/
    /* \\// claim */
    /*------------*/


    /*====================================*/
    /* \\// table formatter               */
    /*====================================*/
`;
    
if( conf.exegesis_floats ) {
    ret +=`
        .main-legend {
            position:absolute;
            left:32%;
            top:60%;
        }
        .main-legend td {
            font-size:12px;
        }
    `;

} else {
    ret +=`
        .main-legend {
            position:static;
            width:100%;
        }
        .main-legend td {
            font-size:14px;
        }
    `;
}


ret +=`

    @media (max-width: 900px) {
        .main-legend td {
            font-size:11px;
        }
    }

    @media (max-width: 850px) {
        .main-legend td {
            font-size:10px;
        }
    }

    @media (max-width: 800px) {
        .main-legend td {
            font-size:13px;
        }
    }

    @media (max-width: 600px) {
        .main-legend {
            position:static;
            width:100%;
        }
    }
    `;


    //==================================
    // //\\ model help
    //==================================
    ret +=`
    .model-help {
        cursor: pointer;
        opacity:1;
    }
    .video-help-button {
        cursor: pointer;
        opacity:0.2;
    }
    .video-help-button:hover,
    .model-help:hover {
        opacity:1;
    }
    `;
    //==================================
    // \\// model help
    //==================================


    //==================================
    // //\\ video
    //==================================
    ret +=`

    .bsl-showreel-video-wrap {
        position:relative;
        margin-bottom:10px;
        background-color:transparent; /*#DDDDDD;*/
        left        :50%;
        transform   :translate(-50%,0%);
    }

    .bsl-showreel-video,
    .bsl-showreel-video-iframe{
        position:absolute;
        width:96%;
        height:96%;
        left:50%;
        top:50%;
        transform   :translate(-50%,-50%);
        background-color:#DDDDDD;
    }

    .bsl-close-html-button {
        position:absolute;
        width:20px;
        height:20px;
        border-radius:15px;
        right:-20px;
        top:10px;
        padding-top:5px;
        padding-left:9px;
        color:white;
        font-size:16px;
        font-weight:bold;
        background-color:rgba(0,0,0,1);
        cursor:pointer;
        opacity:1;
        z-index:1000;
    }
    `;
    //==================================
    // \\// video
    //==================================


/*====================================*/
/* \\// main-legend                   */
/*====================================*/
// \\// css /////////////////////////////////////////





return ret;
};
})();



(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;
    var cssmods = sn('cssModules');
    var sapp    = sn('sapp');


    var THIS_MODULE = 'base';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;

        var body_DesktopOverflow = sapp.pageMode === 'lemma' ? 'overflow:hidden' : 'overflow-x:hidden';

// //\\ css /////////////////////////////////////////
var ret = `

    /******************************************/
    /* //\\\\ html, body                      */
    /******************************************/
    html, body
    { 
        /* //\\ added for lemma9 */
        width:100%;
        height:100%;
        padding:0;
        margin:0;
        border:none;
        /* \\// added for lemma9 */

        background-color:${ccs['color-light']};
        font-size:15px; //this defines what 1rem is
    }

    /* //\\ added for lemma9 */
    body
    { 
        ${body_DesktopOverflow}
    }
    @media only screen and (max-width:${fconf.mobileDetectorMediaThreshold}px) {
        body
        { 
            overflow-y:auto;
            overflow-x:hidden;
        }
    }
    /* \\// added for lemma9 */

    


    /******************************************/
    /* \\// html, body                        */
    /******************************************/


    a:link{
        color:${ccs['color-main']};
    }

    a:visited{
        color:${ccs['color-main']};
        
    }

    @media only screen and (max-width:720px){
        .btn--how-to{
            display: none !important; /* tod? */
        } 
    }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');

    var THIS_MODULE = 'typography';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;


// //\\ css /////////////////////////////////////////
var ret = `


    

    /*fonts*/
    body{
        color: ${ccs['color-medium-grey']};
        font-family: 'Helvetica',sans-serif;
    }
    h1,h2,h3,h4,h5,h6{
        color: ${ccs['color-main']};
        font-weight:200;
        font-family: 'Goudy Old Style', 'Garamond','Times', serif;
    }
    h1{
        font-size: 48px;
    }
    h2{
        font-size: 24px;
    }
    a{
        text-decoration: none;
    }

    p{
        font-size: 1rem;
        line-height: 1.75;
    }



`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'landing';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `

    
    

/*~~~~~~~~~~~~~~~~~~~~
Styles  for the landing page can be found here
Need to fix mobile styling
~~~~~~~~~~~~~~~~~~~~*/
.wrapper {
  width: calc(100vw - 80px);
  margin: auto; }

#landing {
  background-color: ${colorMain}; }
  #landing .nav-bar {
    background-color: transparent; }
  #landing .btn__menu {
    background: transparent; }
    #landing .btn__menu__bar--dot, #landing .btn__menu__bar--line {
      background: ${colorWhite}; }
  #landing .exit-ani .btn__menu {
    background: transparent; }
    #landing .exit-ani .btn__menu__bar--dot, #landing .exit-ani .btn__menu__bar--line {
      background: ${colorMain}; }
  #landing h1, #landing h2 {
    color: ${colorWhite}; }
  #landing h2 {
    font-size: 28px;
    margin-bottom: 24px; }

header {
  position:relative;  
  grid-area: header;
  padding: 40px 0;
  margin-bottom: 56px; }

/* used in landing page as link-class which points to suggested first reading */
.read {
  background: ${colorWhite};
  display: flex;
  border-radius: 2px;
  padding: 12px;
  width: 175px; }
  .read__text {
    display: flex;
    flex-direction: column;
    width: calc(100% - 24px); }
  .read__arrow {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 24px; }
  .read__label {
    opacity: 0.58;
    font-family: Helvetica;
    font-size: 12px;
    color: ${colorMain};
    margin-bottom: 4px; }
  .read__title {
    font-family: Helvetica;
    font-size: 16px;
    color: ${colorMain};
    letter-spacing: 0; }

.landing-text {
  padding-top: 124px;
  position: relative;
  width: 100%;
  z-index: 1; }

.newton-img {
  position: absolute;
  top: 72px;
  z-index: 0;
  right: 96px; }

.landing-title {
  font-family: "essonnes-display", 'Garamond','Times', serif;
  font-weight: 300;
  font-size: 58px;
  color: ${colorWhite};
  letter-spacing: 1.32px;
  line-height: 78px;
  margin-bottom: 16px;
  grid-area: title; }
  .landing-title span {
    font-style: italic; }

.lemmas {
  display: block;
  position: relative;
  grid-area: lemmas;
  margin-top: 128px; }
  .lemmas h3 {
    font-family: 'Goudy Old Style', 'Garamond','Times', serif;
    font-size: 24px;
    color: ${colorMain};
    letter-spacing: 0.55px;
    padding: 8px 0 4px 0; }
  .lemmas__cell {
    background: ${colorLight};
    border-radius: ${borderRadius};
    display: flex;
    flex-direction: column;
    padding: 12px;
    position: relative; }
    .lemmas__cell--coming-soon {
      opacity: .5; }
    .lemmas__cell__thumbnail {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 300px;
      min-height: 160px; }
      .lemmas__cell__thumbnail img {
        max-height: 80%;
        width: auto; }

.how-to {
  padding: 64px 0;
  text-align: center;
  background: #E9E2DA;
  grid-area: howTo; }
  .how-to h2 {
    color: ${colorMain} !important;
    text-align: left; }
  .how-to-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 12px; }
  .how-to__cell {
    padding: 0 24px; }
    .how-to__cell__image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 160px;
      margin-bottom: 12px; }
    .how-to__cell h4 {
      font-size: 24px;
      color: ${colorMain} !important; }

.landing-table-of-contents {
  grid-area: lemmas;
  padding: 80px 0; }
  .landing-table-of-contents ul a {
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 20px;
    font-family: 'Goudy Old Style', 'Garamond','Times', serif;
    margin-bottom: 32px;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    transition: all .6s;
    width: 100%; }
    .landing-table-of-contents ul a:hover {
      border-bottom: 1px solid white;
      transition: all .2s; }
  .landing-table-of-contents ul .table-tag {
    font-family: 'Helvetica', sans-serif;
    font-size: 14px;
    font-weight: 300; }
  .landing-table-of-contents ul .disabled {
    opacity: .5; }
    .landing-table-of-contents ul .disabled:hover {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3); }

.about {
  color: ${colorWhite};
  font-family: 'Goudy Old Style', 'Garamond','Times', serif;
  margin-top: 128px; }
  .about__text {
    width: 100%;
    margin-right: 10%; }
    .about__text p {
      font-size: 18px;
      line-height: 1.5; }
    .about__text h2 {
      margin-bottom: 12px;
      color: ${colorWhite}; }

  .about__author {
    width: 100%;
    margin-top:20px;
    color: ${colorWhite};
  }

    .about__author__text {
      font-size: 18px; }
    .about__author__image {
      color: ${colorWhite};
      clip-path: ellipse(72px 72px at center);
      -moz-clip-path: ellipse(72px 72px at center);
      -webkit-clip-path: ellipse(72px 72px at center); }

.sub-title {
  font-family: 'Goudy Old Style', 'Garamond','Times', serif;
  font-size: 16px;
  font-style: italic;
  color: ${colorWhite};
  margin-bottom: 24px;
  max-width: 500px;
  width: 60%; }

.dd-label {
  font-family: 'Goudy Old Style', 'Garamond','Times', serif;
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.6);
  padding: 8px; }
  .dd-label a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: underline; }
    .dd-label a:hover {
      color: white; }

.landing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 12px;
  grid-template-areas: 'header header header header' 'lemmas lemmas lemmas lemmas' 'howTo howTo howTo howTo' 'about about about about';
  padding: 0 120px;
  position: relative;
  z-index: 1; }

.lemmas-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px; }

@keyframes mousemove {
  0% {
    transform: translateY(0px);
    opacity: 0; }
  25% {
    opacity: 1; }
  100% {
    transform: translateY(200px);
    opacity: 0; } }

/*~~~~~~~~~~~~~~~~~~~~
Media Queries
~~~~~~~~~~~~~~~~~~~~*/
@media only screen and (max-width: 720px) {

  .sub-title {
    width: 100%; }
  .how-to-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 80px; }
  .landing-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 12px;
    grid-template-areas: 'header' 'scrollarea'  'lemmas' 'about';
    padding: 0 16px !important;
    width: calc(100vw - 32px); }
  .lemmas-grid {
    display: grid;
    grid-template-columns: 1fr !important;
    grid-gap: 12px; }
  .about {
    flex-direction: column; }
    .about .about__text {
      width: 100%; }
    .about .about__author {
      width: 100%;
      display: flex;
      flex-direction: row;
      text-align: left; }
      .about .about__author__image {
        transform: scale(0.8);
        clip-path: ellipse(72px 72px at center); } }





`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'inner-page';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `

    

/*~~~~~~~~~~~~~~~~~~~~
Styles for the Lemma page live here
Here you can find styles for layouts and general page styles. 
Styles for controlling the colors of the model can be found on the settings page.
~~~~~~~~~~~~~~~~~~~~*/
#egrip {
  display: flex;
  align-items: center;
  right: 0px;
  top: 0;
  padding: 0 8px;
  position: absolute;
  height: 100%;
  cursor: pointer; }
  #egrip:hover {
    background: ${colorLight}; }



/********************************/

  #areadsk {
    display: none;
    visibility: hidden; }

  .title-fixed {
    overflow: hidden;
    background: ${colorWhite};
    position: fixed;
    top: 0px;
    width: calc(50% - 102px);
    max-width: calc(50% - 102px);
    min-width: 0px;
    left: 48px;
    padding: 0 40px 0 12px; }

.model-section {
  background: ${colorLight};

  /********************************/
  /*
  display: flex;
  */
  float:right;

  grid-area: playground;
  height: 100vh;
  flex-direction: column;
  /*width: -webkit-calc(50vw - 40px);
    width:    -moz-calc(50vw - 40px);
    width:         calc(50vw - 40px);*/

  /******************************************/
  width: 50%;

  padding: 8px 0 0px 0; }
  .model-section__top {
    height: -moz-calc(100% - 180px);
    height: -webkit-calc(100% - 180px);
    height: calc(100% - 180px);
    justify-content: center;
    display: flex;
    flex-direction: column; }
  .model-section__bottom {
    height: 180px; }
  .model-section .desc {
    padding-top: 16px;
    width: -webkit-calc(100% - 64px);
    width: -moz-calc(100% - 64px);
    width: calc(100% - 64px);
    padding: 0 32px; }
    .model-section .desc__header {
      margin: 12px 0; }
    .model-section .desc .line {
      width: 100%;
      height: 1px;
      background-color: ${colorLightGrey}; }
  .model-section .desc__header-title {
    font-family: 'Helvetica';
    font-size: 18px; }

.model {
  display: flex;
  width: 100%;
  height: 84%;
  align-items: center;
  justify-content: center; }

.${cssp}-media-root {
  width: calc(100% - 90px) ;
}

#illus {
  width: 100%;
  }

.desc--claim {
  margin-top: 24px;
  margin-bottom: 64px; }

.desc--proof {
  margin-top: 24px;
  }

#areadesk {
    margin:auto;
    margin-top:20px;
    width:200px;
}


    .desc--proof.hidden,
    .desc--claim.hidden {
        display:none;
    }

@media only screen and (max-width: 800px) {
    #areadesk.hidden {
        display:none;
    }
}


.desc__header {
  margin-bottom: 12px;
  display: flex;
  align-items: center; }
  .desc__header-title {
    margin: 0px; }

.mobileShow {
  display: block !important; }

.mobileHide {
  display: none !important; }

.movable {
  cursor: pointer; }

.btn {
  background-color: ${colorWhite};
  border-radius: ${borderRadius};
  cursor: pointer; }
  .btn__menu {
    box-shadow: 2px 0 96px 0 rgba(32, 41, 54, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;

    flex-direction: column;
    width: 32px;
    height: 32px;
    margin: 0 16px 0 16px;
    transition: all .2s ease;
    z-index: 1002; }
    .btn__menu__bar {
      display: flex;
      justify-content: space-between;
      width: 18px;
      height: 2px;
      padding: 1px 0; }
      .btn__menu__bar--dot {
        display: block;
        width: 1px;
        height: 1px;
        background-color: ${colorMain};
        margin-right: 4px; }
      .btn__menu__bar--line {
        display: block;
        width: 16px;
        height: 1px;
        background-color: ${colorMain}; }
  .btn:hover {
    box-shadow: 0 4px 12px 0 rgba(32, 41, 54, 0.2); }

.desc--areas {
  position: absolute;
  bottom: 0px; }
  .desc--areas h2 {
    font-family: 'Helvetica',sans-serif;
    font-size: 1rem; }

.areas__checkboxes {
  font-family: 'Helvetica', sans-serif;
  font-size: 1rem; }
  .areas__checkboxes-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px; }
  .areas__checkboxes .checkbox {
    margin-right: 12px; }

.video-desktop {
  display: none;
  margin-bottom: 32px;
  min-height: 320px;
  width: 100%;
  border-radius: 5px; }

.help-box {
  float:left;
  margin-top:8px;
  color: ${colorMediumGrey};
  font-size: 12px;
  padding: 0 16px;
  border-radius: ${borderRadius};
  display: flex;
  align-items: center;
}


  .help-box img {
    margin-right: 8px;
  }


  .scrollarea {
    padding-top:20px;
  }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'nav-bar-and-drawer';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `

    


/*~~~~~~~~~~~~~~~~~~~~
Nav Bar Styles
~~~~~~~~~~~~~~~~~~~~*/
/*
  width: 50%;
  max-width: 50vw;
*/

.nav-bar {
  background: ${colorWhite};
  display: flex;
  grid-area: nav;
  position: fixed;
  height: 75px;
  width: 100%;
  padding-top:20px;
  align-items: center;
  top:0px;
  z-index: 1010; }

  .nav-bar__logo {
    font-family: "essonnes-display",serif;
    font-weight: 300;
    font-size: 18px;
    color: ${colorMain};
    letter-spacing: 0.32px; }
  .nav-bar__current-page {
    font-size: 14px;
    margin: 3px 0 0 12px;
    font-family: "essonnes-display",serif;
    font-weight: 300;
    color: #999999; }


  .sub-nav-bar {
    overflow: hidden;
    align-items: center;
    width: calc(100% - 76px);
    max-width: calc(100% - 76px);
    padding: 0 12px 0 0;

    /* //\\ ported from lemma 9 bsl-menu */
    height: 90px;
    width: 98%;
    margin: 0px;
    padding: 10px;
    padding-bottom: 0px;
    top: 0px;
    border-radius: 10px;
    font-family: helvetica,arial,san-serif;
    z-index: 1001;
    /* \\// ported from lemma 9 bsl-menu */

  }







    .sub-nav-bar h1 {
      color: ${colorStoneBlue};
      font-size: 24px;
      margin: 4px 0 0 0; }

/*~~~~~~~~~~~~~~~~~~~~
Bottom Nav Styles
~~~~~~~~~~~~~~~~~~~~*/
.bottom-nav {
  background: white;
  background: linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0) 100%);
  bottom: 0px;
  display: none;
  padding: 0 16px;
  position: fixed;
  width: calc(100% - 32px);
  height: 56px;
  align-items: center;
  z-index: 1002;
  justify-content: space-between; }

/*~~~~~~~~~~~~~~~~~~~~
Nav Drawer Styles
~~~~~~~~~~~~~~~~~~~~*/
.nav-drawer {
  background: ${colorWhite};
  box-shadow: 8px 0px 16px 0 rgba(32, 41, 54, 0.14);
  display: none;
  width: calc(50vw - 48px);
  height: calc(100vh - 48px);
  padding: 24px;
  position: fixed;
  opacity: 0;
  z-index: 1003; }
  .nav-drawer__dot {
    width: 16px;
    margin-right: 8px; }
    .nav-drawer__dot img {
      display: none;
      width: 100%; }
  .nav-drawer a {
    width: calc(100% - 24px); }
  .nav-drawer__title {
    border-top: 1px dotted ${colorLightGrey};
    border-bottom: 1px dotted ${colorLightGrey};
    color: ${colorMain};
    display: inline-block;
    font-family: EssonnesDisplay-Light;
    font-size: 28px;
    line-height: 1.5;
    margin-top: 32px;
    transition: all .2s; }
    .nav-drawer__title:hover {
      color: rgba(32, 41, 54, 0.8); }
    .nav-drawer__title span {
      font-style: italic; }
  .nav-drawer ul {
    margin-top: 24px; }
  .nav-drawer__list-item {
    background-color: ${colorWhite};
    border-bottom: 1px solid rgba(32, 41, 54, 0.08);
    border-radius: ${borderRadius};
    display: flex;
    padding: 16px 0px;
    position: relative;
    opacity: 0; }
    .nav-drawer__list-item__title {
      font-size: 24px; }
    .nav-drawer__list-item__desc {
      color: ${colorStoneBlue};
      display: inline-block;
      font-family: 'Goudy Old Style', 'Garamond', serif;
      margin-top: 8px; }
    .nav-drawer__list-item:hover {
      background: ${colorLight}; }
    .nav-drawer__list-item.selected img {
      display: block; }
  .nav-drawer .other-links {
    opacity: 0;
    display: block;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0px;
    z-index: 1005; }
    .nav-drawer .other-links__link {
      align-items: center;
      border-top: 1px solid ${colorPaleBlue};
      display: flex;
      height: 48px; }
      .nav-drawer .other-links__link__graphic {
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
        width: 48px; }

#navDrawer.animateIn {
  display: block;
  animation: slideIn .2s ease-in-out;
  animation-fill-mode: forwards; }
  #navDrawer.animateIn .nav-drawer__list-item {
    animation: slideFade .4s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 0s; }
    #navDrawer.animateIn .nav-drawer__list-item:nth-child(2) {
      animation-delay: .2s; }
  #navDrawer.animateIn .other-links {
    animation: slideUpFade .6s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: .3s; }

@keyframes slideFade {
  0% {
    opacity: 0;
    transform: translateX(-100px); }
  75% {
    transform: translateX(0px); }
  100% {
    opacity: 1; } }

@keyframes slideUpFade {
  0% {
    opacity: 0;
    transform: translateY(200px); }
  75% {
    transform: translateY(0px); }
  100% {
    opacity: 1; } }

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-18vw); }
  4% {
    opacity: 1; }
  100% {
    transform: translateX(0px);
    opacity: 1; } }

#menu-line-1, #menu-line-3 {
  transition: all .2s; }

.exit-ani .btn__menu__bar--dot {
  margin-right: 0px;
  width: 2px; }

.exit-ani #menu-line-1 {
  transform: translateY(4px) rotate(45deg); }

.exit-ani #menu-line-2 {
  opacity: 0; }

.exit-ani #menu-line-3 {
  transform: translateY(-4px) rotate(-45deg); }

#shade {
  width: 100vw;
  height: 100vh;
  background: rgba(32, 41, 54, 0.2);
  display: none;
  z-index: 1002;
  position: fixed;
  top: 0px;
  left: 0px; }

/*~~~~~~~~~~~~~~~~~~~~
Media Queries
~~~~~~~~~~~~~~~~~~~~*/
/*@media only screen and (max-width:800px){
    .nav-bar{
        .nav-bar &__mobile{
            display:flex; //displaying mobile navbar when screen is resized to 800px or less
        }
    }
}*/
@media only screen and (max-width: 720px) {
  .pager__right, .pager__left {
    display: none; }
  #navDrawer {
    width: calc(100% - 32px);
    padding: 24px 16px 0 16px;
    height: calc(100vh - 24px); }


  .nav-bar {
    width: 100%;
  }
    .nav-bar .nav-bar__pagination {
      display: none;
  }

  .bottom-nav {
    display: flex;
    z-index: 1010; } }

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'pagination';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `

    

/*~~~~~~~~~~~~~~~~~~~~
--Done--
Styles for the Desktop  & Mobile pagination buttons
Desktop pagination Buttons: '.page-btn'
Mobile pagination Buttons: '.mobile-page-btn'
~~~~~~~~~~~~~~~~~~~~*/
/*~~~~~~~~~~~~~~~~~~~~
Desktop pagination buttons
~~~~~~~~~~~~~~~~~~~~*/
.page-btn {
  align: center;
  width: 32px;
  height: 64px;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(32, 41, 54, 0.05);
  transition: all .2s; }
  .page-btn:hover {
    background: rgba(32, 41, 54, 0.1); }
  .page-btn img {
    transform: scale(1.5); }

.page-btn--left {
  border-bottom-right-radius: 64px;
  border-top-right-radius: 64px;
  left: 0px; }
  .page-btn--left img {
    margin-right: 7px;
    transition: all .2s; }
  .page-btn--left:hover img {
    margin-right: 14px; }

.page-btn--right {
  border-bottom-left-radius: 64px;
  border-top-left-radius: 64px;
  right: 0px; }
  .page-btn--right img {
    position: relative;
    margin-left: 7px;
    transition: all .2s; }
  .page-btn--right:hover img {
    margin-left: 14px; }

/*~~~~~~~~~~~~~~~~~~~~
Mobile pagination buttons
~~~~~~~~~~~~~~~~~~~~*/
.mobile-page-btn {
  position: relative;
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center; }
  .mobile-page-btn a {
    border-radius: 30px;
    box-shadow: 0 0 24px 0 rgba(32, 41, 54, 0.3);
    align-items: center;
    display: flex;
    justify-content: center;
    width: 40px;
    height: 40px; }

.mobile-link img {
    opacity:0.5; /* makes arrow less annoying */
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //\\\\ This toggles between mobile and desktop redirection buttons
           display. When screen is wider than 720px, then desktop is on.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
.mobile-link.page-btn {
    display: none; 
} 

@media only screen and (max-width: 720px) {
    .mobile-link.page-btn {
        display: flex;
  }

    .desktop-link.page-btn {
        display: none;
  }
}

.page-btn.non-displayed {
    display: none;
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    \\\\// This toggles between mobile and desktop redirection buttons
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



/*
.checkbox-wrap input[type="checkbox"] {
*/


`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'topic';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {





// //\\ css /////////////////////////////////////////
var ret = `

`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'checkbox';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `

    

.checkbox-wrap input[type="checkbox"] {
  opacity: 0;
  display: none; }

.checkbox-wrap label::before {
  background-color: ${colorPaleBlue};
  border: 2px solid ${colorLightGrey};
  border-radius: 2px;
  content: "";
  cursor: pointer;
  display: inline-block;
  height: 14px;
  width: 14px; }

.checkbox-wrap label::after {
  content: "";
  display: inline-block;
  height: 4px;
  width: 8px;
  border-left: 2px solid ${colorWhite};
  border-bottom: 2px solid ${colorWhite};
  transform: rotate(-45deg); }

.checkbox-wrap label {
  position: relative; }

.checkbox-wrap label::after {
  position: absolute; }

/*Checkmark*/
.checkbox-wrap label::after {
  left: 4px;
  top: 0px; }

/*Hide the checkmark by default*/
.checkbox-wrap input[type="checkbox"] + label::after {
  content: none; }

/*Unhide the checkmark on the checked state*/
.checkbox-wrap input[type="checkbox"]:checked + label::after {
  content: ""; }

/*Make check box color change on the checked state*/
.checkbox-wrap input[type="checkbox"]:checked + label::before {
  background-color: ${colorMain};
  border: 2px solid ${colorMain}; }

/*Adding focus styles on the checkbox*/
.checkbox-wrap input[type="checkbox"]:focus + label::before {
  outline: #3b99fc auto 5px; }

/*~~~~~~~~~~~~~~~~~~~~
Styles for the mobile tabs
~~~~~~~~~~~~~~~~~~~~*/




`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'tabs';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;



// //\\ css /////////////////////////////////////////
var ret = `

    
    

    /*~~~~~~~~~~~~~~~~~~~~
    Exegesis-tabs.
    Styles for the mobile tabs
    ~~~~~~~~~~~~~~~~~~~~*/

    /* area-tab is invisible in desktop */
    .tabs .tab-areadesk {
        display:none;
    }
    @media (max-width: 800px) {
        /* area-tab is visible in mobile */
        .tabs .tab-areadesk {
            display:inline-block;
        }
    }

    .tab-section{
        width: calc(100%);
        order:2;
        height:40px;
        padding:0;
        grid-area: tabs;
    }

    .tab-section.desc__text{
        padding-bottom: 128px;
    }

    .tab-section__header{
        display:none;
    }

    .desc-tab {
        background-color: ${ccs['color-white']};
        padding: 16px;
        display: none;
        height:100%;
        margin-bottom:0;
        overflow:scroll;
        
    }
    .tabs {
        position: relative;
        background-color: #fff;
        border-bottom:1px solid ${ccs['color-light-grey']};
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .tabs:after {
        content: ' ';
        display: table;
        clear: both;
    }


    .tabs__tab {
        float: left;
        text-align: center;
    }

    .tabs__tab:first-child.active ~ .tabs__indicator{
        left: 0;
    }

    .tabs__indicator {
        position: absolute;
        bottom: -1px;
        left: 0;
        height: 1px;
        background-color: ${ccs['color-main']};
        transition: left .32s;
    }



    /*------------------------*/
    /* //\\ adjusts for media */
    /*------------------------*/
    .tabs__tab {
        width: 50%;
    }
    .tabs__tab:nth-child(2).active ~ .tabs__indicator {
        left: 0%;
    }
    .tabs__tab:nth-child(3).active ~ .tabs__indicator {
        left: 50%;
    }
    .tabs__indicator {
        width: 50%;
    }
    @media (max-width: 800px) {
        .tabs__tab {
            width: 33.333%;
        }
        .tabs__tab:nth-child(2).active ~ .tabs__indicator {
            left: 33.333%;
        }
        .tabs__tab:nth-child(3).active ~ .tabs__indicator {
            left: calc(33.333% * 2);
        }
        .tabs__indicator {
            width: 33.333%;
        }
    }
    /*------------------------*/
    /* \\// adjusts for media */
    /*------------------------*/



    .Tab > a {
        display: block;
        padding: 10px 12px;
        text-decoration: none;
        color: ${ccs['color-light-grey']};
        transition: color .15s;
    }
    .Tab.active > a {
        color: ${ccs['color-main']};
    }
    .Tab:hover > a {
        color: rgba(${ccs['color-main']},.8);
    }


`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'how-to';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ccs = fconf.css;
        var colorMain = ccs['color-main'];
        var colorWhite = ccs['color-white'];
        var colorMediumGrey = ccs['color-medium-grey']; 
        var colorLightGrey = ccs['color-light-grey']; 
        var colorPaleBlue = ccs['color-pale-blue']; 
        var colorStoneBlue = ccs['color-stone-blue']; 
        var colorLight = ccs['color-light']; 
        var borderRadius = ccs['border-radius']; 





// //\\ css /////////////////////////////////////////
var ret = `



`;
// \\// css /////////////////////////////////////////




        return ret;
    };
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var cssmods = sn('cssModules');
    var THIS_MODULE = 'sapp-slider-menu-topic';
    cssmods[THIS_MODULE] = function( cssp, fconf ) {
        var ret = 



// //\\ css /////////////////////////////////////////
`


    .sub-nav-bar.bsl-menu h1 {
        display :inline-block;
        float   :left;
    }

    /*=======================================
     //|| menu which follows burger-menu   
     =======================================*/
    .bsl-menu  .submenu.proof {
        /* replaced with tab-switch sitewide, as of ver 600 */
        display:none;
    }

    .bsl-menu .submenu {
        position:relative;
        display:inline-block;
        float       :right;
        border-radius:10px;

        /*
        this was vital at some CSS
        -webkit-margin-before: 0em;
        -webkit-margin-after: 0em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
        -moz-padding-start: 0px;
        */
        padding:0;
        margin:0;
        margin-right:10px;
    }




    /* //|| common handle features */

    /* /// was used to set background under shadow and handle
       /// todm is redundant ... shadow and handle can use z-index < 0
       /// holds shadow and handle
    */
    .bsl-menu .handle-background {
        position        :absolute;
        left            :0;
        top             :0;
        background-color:transparent;
        z-index:-1;
    }

    /* common shape which makes litem, shadows, and handle aligned */
    .bsl-menu .shape {
        border          :1px solid black;
        border-radius   :15px;
        white-space     :nowrap;
    }

    /* twin navitation controls: shadow and handle */
    .bsl-menu .shadow,
    .bsl-menu .handle {
        position        :absolute;
        width           :100%;
        background-color:#CCCCCC;
    }


    /*-------------------*/
    /* //|| radio circle */
    /*-------------------*/
    .bsl-menu .shadow .radio-circle,
    .bsl-menu .litem .radio-circle,
    .bsl-menu .handle .radio-circle {
        display         :inline-block;
        /* border          :1px solid black; shifts radio up ... why? */
        border-radius   :11px;
        width           :11px;
        height          :11px;
        margin-left     :5px;
        margin-right    :4px;
        background-image:radial-gradient(
            farthest-corner at 3px 3px,
                rgb(230,230,230) 0%,
                rgb(230,230,230) 5%,
                rgb(180,180,180) 30%,
                rgb(80,80,80) 60%,
                rgb(0,0,0) 100%
        );
    }
    /*-------------------*/
    /* \\|| radio circle */
    /*-------------------*/
    /* \\|| common handle features */


    /* //\\ shadow     */
    .bsl-menu .shadow {
        opacity         :0.5;
        z-index         :1;
    }
    /* \\// shadow     */


    /* //\\ moving handle     */
    .bsl-menu .handle {
        background-color:white;
        opacity         :1;
        z-index         :10;
    }
    /* \\// moving handle     */


    /*--------------------*/
    /* //|| fluid part    */
    /*--------------------*/
    .bsl-menu .litem.shape  {
        border-color    :transparent;
        background-color:transparent;
        margin          :0;
        margin-bottom   :3px;
        cursor          :pointer;
        opacity         :1;
    }        
    .bsl-menu .litem .radio-circle {
        visibility:hidden;
    }
    .bsl-menu .litem .caption {
        display         :inline-block;
        position        :relative;
        font-size       :80%;
        padding-right   :5px;

        /* todom: this is hell-complex, but works making 
           caption vertically-centered in the radio-slot */
        top             :50%;
        transform       :translate(0%, -10%);
    }
    /*--------------------*/
    /* \\// fluid part    */
    /*--------------------*/


    .bsl-menu .litem:hover .radio-circle {
        visibility:visible;
    }
    .bsl-menu .litem.chosen:hover .radio-circle {
        visibility:hidden;
    }

    /*=======================================*/
    /* \\// menu which follows burger-menu   */
    /*=======================================*/



    /******************************************/
    /* //\\ exegesis                          */
    /******************************************/
    .original-text {
        /* is this font really a fit? font-family : 'Goudy Old Style', 'Garamond', Montserrat, 'Times', serif; */
        font-family : 'Helvetica',sans-serif;
        color       : ${fconf.css['color-medium-grey']};
        line-height : 1.3;
        display     : none;
    }

    .original-text.chosen {
        display:block;
    }
    .original-text h2,
    .original-text h1 {
        margin  :0;
        font-weight:200;
        color:${fconf.css['color-main']};
    }
    @media only screen and (max-width: 800px) {
        .original-text.chosen.hidden {
            display:none;
        }
    }
    /******************************************/
    /* \\// exegesis                          */
    /******************************************/

`;

// \\// css /////////////////////////////////////////





    return ret;
    }
})();



// //\\// file where to set plugin main configuration
( function() {
    var sn      = window.b$l.sn;
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);



    fconf.css =
    {
        //=======================
        // //\\ legacy CSS params
        //=======================
        //:UI Colors
        'color-main'        : '#202936',    //main color
        'color-white'       : '#ffffff',
        'color-medium-grey' : '#626D7E',    //Body Copy
        'color-light-grey'  : '#C5CAD4',    //Disabled text Rules
        'color-pale-blue'   : '#F4F6F9',    //switch
        'color-stone-blue'  : '#8091A8',    //accent text such as summary and helper text

        //.affects right pane numerical-model's background
        //.interacts with original-source figure picture, so should be white ...
        'color-light'       : 'white',      //'#FBFCFC',
 
       //:UI
        'border-radius'     : '3px',
        //=======================
        // \\// legacy CSS params
        //=======================

        //exegesis
        exegesisBackgroundColor : 'white'
    };

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var cssmods     = sn('cssModules');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    cssmods.initSiteWideCSS = initSiteWideCSS;
    return;







    /*
        it was:
        @import "base/variables";
        @import "base/base";
        @import "base/typography";
        @import "pages/landing";
        @import "pages/inner-page";
        @import "components/nav-bar-and-drawer";
        @import "components/switch";
        @import "components/slider";
        @import "components/pagination";
        @import "components/checkbox";
        @import "components/tabs";
        @import "components/how-to";
        @import "components/model";
    */
    function initSiteWideCSS(cssp, fconf) 
    {
        //data-entry: put module names here in order
        `
            reset
            base
            typography
            landing
            inner-page
            nav-bar-and-drawer
            topic
            pagination
            checkbox
            tabs
            how-to
            main-sapp
            sapp-slider-menu-topic
        `



        .split(/\r\n|\n/g)
        .forEach( function( modname ) {
            modname = modname.replace(/\s+/g,'');
            if( modname ) {
                ns.globalCss.addText(
                    decorateText( cssmods[ modname ]( cssp, fconf ), modname )
                );
            }
        });
    }





    function decorateText( text, modname )
    {
        return ` 
    /******************************************
       //\\\\ css module = ${modname}
    ******************************************/
    ${text}        
    /******************************************
       \\\\// css module = ${modname}
    ******************************************/
    `;
    }

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;
    var sapp        = sn('sapp' ); 
    var html        = sn('html');
    var rootvm      = sn('rootvm');

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);









    html.body = function()
    {
        var romans      = fconf.appview.lemmaRomanNumbers;
        var pmode       = sapp.pageMode;
        var ln          = sapp.lemmaNumber;
        var landingPath = window.location.pathname;

        if( pmode === 'lemma' ) {
            var lemmaRomanNumber = romans[ln];
            document.title = 'Lemma ' + lemmaRomanNumber.toUpperCase();
        } else {
            var ln = '';
        }
        var body = '';










        //==================================================
        // //\\ creates application root
        //==================================================
        // http://sites.trin.cam.ac.uk/manuscripts/NQ_16_200/manuscript.php?fullpage=1/
        body += `
               <div id="${pmode}${ln}" class="bsl-approot">
        `;
        //==================================================
        // \\// creates application root
        //==================================================





        //==================================================
        // //\\ lemma nav bar
        //==================================================
        if( pmode === 'lemma' ){
            body += `
                <div class="bottom-nav"> 
                    <div class="mobile-page-btn">
                        <a class="btn page-btn mobile-link page-btn--left">
                            <img src="images/left-arrow.svg">
                        </a>
                        <a class="btn page-btn mobile-link page-btn--right">
                            <img src="images/right-arrow.svg">
                        </a>
                    </div>
                </div>
                <!--END bottom nav-->
            `;
        }
        //==================================================
        // \\// lemma nav bar
        //==================================================




        //==================================================
        // //\\ site-wide nav bar
        //==================================================
        body += `
                <div class="nav-bar">
                    <div class="btn btn__menu">
        `;


        ///this makes lines in master menu bar
        [1,2,3].forEach( function(lineN) {
            body += `
                    <span id="menu-line-${lineN}" class="btn__menu__bar">
                        <span class="btn__menu__bar--dot"></span>
                        <span class="btn__menu__bar--line"></span>
                    </span>
            `;
        });
        body += `
               </div>
        `;
        //==================================================
        // \\// site-wide nav bar
        //==================================================





        if( pmode === 'lemma' ) {
            //==================================================
            // //\\ lemma mobile nav bar
            //==================================================
            ///goes somewhere on top menu bar
            body += `
                    <div class="sub-nav-bar">
                            <!-- tmp: title on menu bar -->
                            <h1>Lemma ${lemmaRomanNumber}</h1>
                    </div>
                </div>
            `; 
            //==================================================
            // \\// lemma mobile nav bar
            //==================================================
        } else { 
            body += `
                </div>
                <div id="shade"></div>
            `;
        }



        //==================================================
        // //\\ nav drawer
        //==================================================
        body += `
            <div id="navDrawer" class="nav-drawer">
                <a href="index.html" class="nav-drawer__title">
                    An Interactive Exploration <br><span>of</span> Newton’s Lemmas
                </a>
                <ul>
        `;



        //--------------------------------------------------
        // //\\ builds list of nav drawer links
        //--------------------------------------------------
        fconf.enabledLemmas.forEach( function(lnumber) {
            var romann = romans[lnumber];
            var selected = lnumber === ln ? ' selected' : '';
            body += `
                        <li class="nav-drawer__list-item${selected}">
                            <div class="nav-drawer__dot">
                                <img src="images/nav-dot.svg">
                            </div>
                            <a href="${landingPath}?conf=lemma=${lnumber}">
                                <h3 class="nav-drawer__list-item__title">Lemma ${romann}</h3>
                                <span class="nav-drawer__list-item__desc">Lorem ipsum dolor set 
                                ipsum set dolor acnut lima noir set lorem ipsum doler sut.</span>
                            </a>
                        </li>
            `;
        });
        //--------------------------------------------------
        // \\// builds list of nav drawer links
        //--------------------------------------------------



        //--------------------------------------------------
        // //\\ builds other-links
        //--------------------------------------------------
        body += `
                </ul>
                <div class="other-links">
                    <a class="other-links__link" href="${landingPath}">
                            <span class="other-links__link__graphic">
                                <img src="images/back-arrow-link.svg">
                            </span>
                            <span class="other-links__link__text">
                                Back to home
                            </span>
                        </a>
                </div>
            </div>
        `;
        //--------------------------------------------------
        // \\// builds other-links
        // \\// nav drawer
        //==================================================



        if( pmode === 'lemma' ) {
            body += `
                <div id="shade"></div>
            <!-- END navigation markup ~~~~~~~~~~~~~~~~~ -->
            `;

            var romann = fconf.appview.lemmaRomanNumbers[ln];
        }
        //==================================================
        // nav markup end
        //==================================================




        //==================================================
        // //\\ sub-application switch
        //==================================================
        if( pmode === 'landing' ) {
            body += html.landingCore();
        } 
        //==================================================
        // \\// sub-application switch
        //==================================================







        return body;
    };


}) ();

( function() {
    var ns           = window.b$l;
    var sn           = ns.sn;
    var fapp         = ns.sn('fapp' ); 
    var fconf        = ns.sn('fconf',fapp);
    var sconf        = ns.sn('sconf',fconf);

    var sapp         = sn('sapp');
    var html         = sn('html');





    html.landingCore = function()
    {
        var lemmaRomanNumbers = fconf.appview.lemmaRomanNumbers;
        var ln = sapp.lemmaNumber;
        var pmode = sapp.pageMode;
        var landingCore = '';
        var landingPath = window.location.pathname;






        //==================================================
        // //\\ header
        //==================================================

        landingCore += `
        <header>
            <div class="wrapper">
                <div class="landing-text">
                    <h1 class="landing-title">Interactive Illustrations
                        <br>
                        for Newton’s <span>Principia</span></h1>
                    <p class="sub-title"> 
                    </p>
                    <a href="${landingPath}?conf=lemma=${fconf.startLemmaReadingNumber}" class="read">
                        <div class="read__text">
                            <span class="read__label">Begin Reading</span>
                            <span class="read__title">
                                Lemma ${lemmaRomanNumbers[fconf.startLemmaReadingNumber]}
                            </span>
                        </div>
                        <div class="read__arrow">
                            <img src="images/read-arrow.svg">
                        </div>
                    </a>
                </div>
            </div>
            <img class="newton-img" src="images/landing-img.jpg">
            <!-- END wrapper -->
        </header>
        `;
        //==================================================
        // \\// header
        //==================================================








        //==================================================
        // //\\ table of contents
        //==================================================
        landingCore += `
            <div class="landing-table-of-contents wrapper">
                <h2>Table of contents</h2>
                <ul>
                    <!--<li><a href="#">Lemma 1</a></li>-->
        `;


        fconf.enabledLemmas.forEach( function( lnumber ) {
            var romNumber = lemmaRomanNumbers[lnumber];
            landingCore += `
                <li><a href="${landingPath}?conf=lemma=${lnumber}">
                    <span class="table-title">Lemma ${romNumber}</span>
                    <span class="table-tag">View</span></a>
                </li>
            `;
        });
        landingCore += `
                <li><a href="#" class="disabled">
                        <span>Lemma ${lemmaRomanNumbers[10]}</span>
                        <span class="table-tag">Coming Soon</span>
                    </a>
                </li>
                <!--<li><a href="#"></span>Lemma 4</span><span class="table-tag">View</span></a></li>-->
                <!--<li><a href="#"></span>Lemma 5</span><span class="table-tag">View</span></a></li>-->
             </ul>
        </div>
        <!--END table of contents-->
        `;
        //==================================================
        // \\// table of contents
        //==================================================


        //==================================================
        // //\\ how-to
        //==================================================
        landingCore += `

        <div class="how-to">
            <div class="wrapper">
                <h2>Usage Guide</h2>
                <div class=" how-to-grid">
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/switch.svg">
                    </div>
                    <h4>Translate</h4>
                    <p>Switch between Newton’s description and an informal translation</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/model.svg">
                    </div>
                    <h4>Interact</h4>
                    <p>Interact with the model to see the theory in practice.</p>
                </div><!--END cell-->
                <div class="how-to__cell">
                    <div class="how-to__cell__image">
                        <img src="images/resize.svg">
                    </div>
                    <h4>Resizable</h4>
                    <p>Click and drag to resize the area of you’d like.</p>
                </div><!--END cell-->
                </div>
            </div>
            <!-- END wrapper -->
        </div>
         <!--END how to-->
        `;
        //==================================================
        // \\// how-to
        //==================================================









        //==================================================
        // //\\ about wrapper
        //==================================================
        landingCore += `

        <div class="about wrapper">
                <div class="about__author">
                    <p class="about__author__text">
                        Programming by Konstantin Krillov and John Scott.<br>
                        A User Interface Design by
                        <span class="dd-label">
                            <a href="http://theoddson.io">Darien Dodson</a>.
                        </span><br>
                        Produced by John Scott.
                    </p>
                </div>
        </div>
        <!--END about-->
        `;
        //==================================================
        // \\// about wrapper
        //==================================================

        return landingCore;
    };
}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD); //todo should be child of ss

    var detected_user_interaction_effect_DONE = false;
    sDomF.detected_user_interaction_effect = detected_user_interaction_effect;

    fmethods.createLemmaDom = createLemmaDom;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000







    //=========================================================
    /// create LemmaDom
    //=========================================================
    function createLemmaDom()
    {
        sDomF.createMenu();
        sDomF.createExegesisTabs();

        //=====================================
        // //\\ arrived with lemma23-artist-GUI
        //=====================================
        var wwPaginatorButton$  = $$
           .c( 'a' )
           .a( 'class', 'page-btn desktop-link page-btn--right' )
           .a( 'href', 'javascript:void(0)' )
           .html('<img src="images/right-page-triangle.svg">') 
           .to( rootvm.approot )
           ;
        var wwPaginatorButton$  = $$
           .c( 'a' )
           .a( 'class', 'page-btn desktop-link page-btn--left' )
           .a( 'href', 'javascript:void(0)' )
           .html('<img src="images/left-page-triangle.svg">') 
           .to( rootvm.approot )
           ;
        //=====================================
        // \\// arrived with lemma23-artist-GUI
        //=====================================



        //--------------------------------------------------------
        // //\\ binds widget to containers
        //--------------------------------------------------------
        var medSuperroot$  = $$.c( 'div' )
            .a( 'id', cssp + '-media-superroot' )
            .addClass( cssp + '-media-superroot' )
            .to( rootvm.approot )
            ;
        var medSuperroot   = medSuperroot$();
        sDomN.medSuperroot$ = medSuperroot$;
        sDomN.medSuperroot  = medSuperroot;
        //--------------------------------------------------------
        // \\// binds widget to containers
        //--------------------------------------------------------
        sDomF.createTextWidget();
        fmethods.createDividorResizer();

        //--------------------------
        // //\\ in media superroot
        //--------------------------

        //--------------------------
        // //\\ top media controls
        //--------------------------
        var topMediaControls$ = sDomN.topMediaControls$ = $$.c( 'div' )
            .addClass( 'top-media-controls' )
            .to( medSuperroot )
            ;
        var wwHelpOnTop$ = $$.c( 'div' )
            .addClass( 'help-box' )
            .to( topMediaControls$() )
            ;
        sDomN.runVideoHelpButton$ = $$
            .c('img')
            .addClass( "video-help-button" )
            .css('width','35px')
            .a( 'src', "images/camera-lightbulb.png" )
            .a( 'alt', "Watch videohelp" )
            .a( 'title', "Watch videohelp" )
            /*
            .e('mouseover', function() {
                sDomN.helpBoxText$.innerHTML = 'Watch videohelp';
            })
            */
            .to( wwHelpOnTop$() )
            ;
        sDomN.idleHelpButton$ = $$
            .c('img')
            .addClass( "model-help" )
            .a( 'src', "images/lightbulb.svg" )
            .a( 'alt', "Hover over the diagram to interact" )
            //.a( 'title', "Hover over the diagram to interact" )
            .to( wwHelpOnTop$() )
            ;
        sDomN.helpBoxText$ = $$
            .c('span')
            .addClass( "help-box__text" )
            .html('Hover over the diagram to interact')
            .to( wwHelpOnTop$() )
            ;
        //--------------------------
        // \\// top media controls
        //--------------------------

        //..........................
        // //\\ media root
        //..........................
        var medRoot$ = $$
            .c( 'div' )
            .addClass( cssp + '-media-root' )
            .addClass( 'model' )
            .to( medSuperroot )
            ;
        var medRoot        = medRoot$();
        sDomN.medRoot$     = medRoot$;
        sDomN.medRoot      = medRoot;
        if( fconf.NAVIGATION_DECORATIONS_ALWAYS_VISIBLE ) {
            sDomN.medRoot$.addClass( 'active-tip' );
        }
        //..........................
        // \\// media root
        //..........................


        //..........................
        // //\\ video help
        //..........................
        // //\\ local video
        //. . . . . . . . . . . . . 
        sDomN.videoWrap$ = $$
            .c( 'div' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video-wrap' )
            //.to( sDomN.medRoot )
            .to( sDomN.text$() )
            ;
        sDomN.localVideo$ = $$
            .c( 'video' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video' )
            .a('muted','true')
            .a('controls','true')
            .a('preload','true')
            .to( sDomN.videoWrap$() )
            ;
        sDomN.localVideoSource$ = $$
            .c( 'source' )
            .a('type','video/mp4')
            .to( sDomN.localVideo$() )
            ;
        //. . . . . . . . . . . . . 
        // \\// local video
        //. . . . . . . . . . . . . 

        //..........................
        // //\\ iframed video
        //. . . . . . . . . . . . . 
        sDomN.iframedVideo$ = $$
            .c( 'iframe' )
            .css( 'display', 'none' )
            .addClass( cssp + '-showreel-video-iframe' )
            .a('frameborder','0')
            .a('webkitallowfullscreen','true')
            .a('mozallowfullscreen','true')
            .a('allowfullscreen','true')
            //.to( sDomN.medRoot )
            .to( sDomN.videoWrap$() )
            ;
        //. . . . . . . . . . . . . 
        // \\// iframed video
        //..........................

        //..........................
        // //\\ close-video button
        //. . . . . . . . . . . . . 
        sDomN.doCloseVideoHelp$ = $$
            .c( 'div' )
            .a('title','close video')
            .css( 'display', 'none' )
            .addClass( cssp + '-close-html-button' )
            .html('X')
            //.to( sDomN.medRoot )
            .to(sDomN.videoWrap$())
            ;
        //..........................
        // \\// close-video button
        //. . . . . . . . . . . . . 
    
        fmethods.create_video_help_manager();
        //..........................
        // \\// video help
        //..........................


        ssF.create8prepopulate_svg();
        //.disabled ... effect is too strong
        //$$.$( sDomN.mmedia ).e( 'mouseover', sDomF.detected_user_interaction_effect );
        ssF.create_digital_legend();
        sDomN.mainLegends = document.querySelectorAll( '.main-legend' );
        if( fconf.ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED ) {
            sDomF.create_original_picture_vis_slider();
        }
        //--------------------------
        // \\// in media superroot
        //--------------------------
    }


    ///this makes one-time effect of fading-out the original picture
    function detected_user_interaction_effect()
    {
        if( detected_user_interaction_effect_DONE ) return;
        detected_user_interaction_effect_DONE = true;

        //todm: this is not very well thought:
        //      sapp.dnative && sapp.dnative.bgImage$
        sapp.dnative && sapp.dnative.bgImage$ && sapp.dnative.bgImage$.addClass( 'in-study' );
    }


}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp'); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);
    var amode       = sn('mode',sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD); //todo should be child of ss

    fmethods.create_video_help_manager = create_video_help_manager;
    //000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000









    ///=========================================================
    /// creates video manager
    ///=========================================================
    function create_video_help_manager()
    {
        var menuListPopUp$;
        sDomN.runVideoHelpButton$.e( 'click', function() { menuListPopUp$.css('display','block'); });
        sDomN.doCloseVideoHelp$.e( 'click',  function(e) { leaveVideo(); });

        /*
        ///never processed ... todm why
        sDomN.localVideo$.e('loadeddata', function() {
           ccc('loadeddata');
          if(sDomN.localVideo$().readyState >= 2) {
            ccc('2222222');
            sDomN.localVideo$().play();}
        });
        */
        fmethods.spawnVideoList = spawnVideoList;
        //111111111111111111111111
        return;
        //111111111111111111111111






        ///populates popup video list
        function spawnVideoList()
        {
            if( !menuListPopUp$ ) { createPopupPane(); }
            var list = [];
            ssD.videoList.forEach( function(item) {
                if( item.lemmaNumber && sapp.lemmaNumber !== item.lemmaNumber ) return;
                var selected = true;
                if( item.modeType ) {
                    selected = false;
                    Object.keys( item.modeType ).forEach( function( modeType ) {
                        if( amode[ modeType ] === item.modeType[ modeType ] ) selected = true;
                    });
                }
                selected && list.push( item );
            });
            //.does not populate list if no videos configured for these app states
            if( !list.length ) {
                sDomN.runVideoHelpButton$.css('display','none'); //hides video-button for empty list
                return;
            }
            sDomN.runVideoHelpButton$.css('display','block'); //shows video-button for non-empty list

            menuListPopUp$.html('');
            addPopupCloseButton();
            list.forEach( function( listItem ) {
                $$
                    .c('div')
                    .html( '<img width="25"src="images/camera-lightbulb.png" ' +
                           ' style="position:relative;top:2px; vertical-align:middle;"> ' +
                           '<span style="vertical-align:middle;">' + listItem.caption + '</span>')
                    .css('cursor','pointer')
                    .e('click', function() {
                        runVideo( listItem.URL, listItem.isExternal );
                        menuListPopUp$.css('display','none')
                    })
                    .to(menuListPopUp$())
                    ;
            });
        }


        function runVideo( URL, isExternal )
        {
            leaveVideo();
            if( isExternal ) {
                runExternal(URL);
            } else {
                runInternal(URL);
            }
        }
        function leaveVideo()
        {
            sDomN.localVideo$().pause();
            sDomN.localVideoSource$().src =  "dummy-iframe.html";
            sDomN.iframedVideo$().src = ""; //dummy-iframe.html";             
            setDisplayForInternal( 'none' );
            setDisplayForExternal( 'none' );
        }


        function runExternal( URL )
        {
            sDomN.iframedVideo$().src = URL + '?autoplay=1';
            setDisplayForExternal( 'block' );
        }

        function runInternal(URL) {
            sDomN.localVideoSource$().src = URL;
            setDisplayForInternal( 'block' );
            sDomN.localVideo$().play();
        };

        function setDisplayForInternal( display )
        {
            sDomN.localVideo$.css(       'display', display );
            sDomN.doCloseVideoHelp$.css(  'display', display );
            sDomN.videoWrap$.css(   'display', display );
        }
        function setDisplayForExternal( display )
        {
            sDomN.iframedVideo$.css(    'display', display );
            sDomN.doCloseVideoHelp$.css('display', display );
            sDomN.videoWrap$.css(       'display', display );
        }


        function createPopupPane()
        {
            menuListPopUp$ = $$
                .c('div')
                .css('display','none')
                .css('position', 'absolute')
                .css('padding', '5px')
                .css('padding-right', '25px')
                .css('border-radius', '5px')
                .css('border', '1px solid black')
                .css('left', '30px')
                .css('top', '50px')
                .css('background-color', 'white')
                .css('z-index','111111111')
                .to(sDomN.medSuperroot)
                ;
        }
        function addPopupCloseButton()
        {
            $$
                .c('div')
                .to(menuListPopUp$())
                .css('position','absolute')
                .css('top','2px')
                .css('right','5px')
                .e( 'click', function(){menuListPopUp$.css('display','none')})
                .css('cursor','pointer')
                .html('X')
                ;
        }

    }


}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var cssmods     = sn('cssModules');
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);

    var d8d_p       = sn('d8d-point',fmethods);
    fmethods.createDividorResizer = createDividorResizer;
    //000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000







    //=========================================================
    /// creates DividorResizer
    //=========================================================
    function createDividorResizer()
    {
        //---------------------------
        // //\\ dom roots
        //      root, handle, and css-placeholder
        //---------------------------
        var wResizer = $$
            .c( 'div' )
            .a( 'class', cssp +'-resizable-handle' )
            .a( 'id', cssp +'-resizable-handle' )
            .to( sDomN.medSuperroot )
            ();
        sDomN.mediaHorizontalHandler = $$
            .c( 'img' )
            .a( 'src', 'images/vertical.png' )
            .to( wResizer )
            ();
        ///dynamic CSS placeholder
        sDomN.mediaHorizontalHandlerCSS$ = $$.c('style').to(document.head);
        //---------------------------
        // \\// dom roots
        //---------------------------




        //.........................................
        // //\\ creates lower-layer framework
        //.........................................
        var frameworkD8D = d8d_p.createFramework( 
            findDraggee,
            //sDomN.medSuperroot,
            rootvm.approot,
            fconf.DRAG_POINTS_THROTTLE_TIME
        );
        //.........................................
        // \\// creates lower-layer framework
        //.........................................


        //============================================================
        // //\\ dragWrap is a top level point which
        //      sits on own, low-level pointWrap
        //============================================================
        var pointWrap_local =
        {
            name                    :'dividor',     //makes a placeholder for handler
            achieved_at_move        :sconf.mediaDefaultWidthPercent * window.innerWidth,
            medpos2dompos           :medpos2dompos
        };

        var dragWrap = frameworkD8D.createDragUpdate({

            achieved            : pointWrap_local.achieved_at_move,
            pointWrap           : pointWrap_local,
            update_decPoint     : update_decPoint, //updates "decorational Point", not "decimal"
            doProcess           : doProcess

        });
        //============================================================
        // \\// dragWrap is a top level point which
        //============================================================

        $$.addClass( 'grey', dragWrap.decPoint );
        $$.addClass( 'axis-x', dragWrap.decPoint );
        fmethods.restrictMediaDimensions = restrictMediaDimensions;
        //111111111111111111111111111
        return;
        //111111111111111111111111111








        ///=============================================================================
        /// //\\ the core of module:
        ///      the function which processes an internal content for dragWrap.pointWrap
        ///=============================================================================
        function doProcess( arg )
        {
            var achWrap = pointWrap_local.achieved;

            switch( arg.down_move_up ) {
                case 'up': achWrap.achieved = pointWrap_local.achieved_at_move;
                break;
                case 'move':
                    var rootW = rootvm.approot.getBoundingClientRect().width;
                    var newSuperW = restrictMediaDimensions(
                        achWrap.achieved - arg.move[0],
                        rootW
                    );
                    pointWrap_local.achieved_at_move = newSuperW;
                    //ccc( 'move='+arg.move[0] + ' achieved=' + achWrap.achieved +
                    //' new ach=' + pointWrap_local.achieved_at_move );
                break;
            }
        }
        ///=============================================================================
        /// \\// the core of module:
        ///=============================================================================







        ///=============================================================================
        /// //\\ restricts and sets super root and text pane sizes
        ///      used in resize and in master-dividor-slider
        ///=============================================================================
        function restrictMediaDimensions( proposedWidth, rootW, doDividorSynch )
        {
            rootW = rootW || rootvm.approot.getBoundingClientRect().width;
            var legendHeight = 0;
            sDomN.mainLegends.forEach( function( legend ) {
                var hh = legend.getBoundingClientRect().height * 1.5;
                if( legendHeight < hh ) { legendHeight = hh; }
            });

            var medBox  = sDomN.mmedia.getBoundingClientRect();
            var curMedW = medBox.width;
            var curMedH = medBox.height;
            var aRat    = curMedH / curMedW;

            var superBox  = sDomN.medSuperroot.getBoundingClientRect();
            //ccc( 'cur w= ' + superBox.width );
            var newSuperW = proposedWidth || superBox.width;
            //ccc( 'proposedWidth= ' + proposedWidth );

            var newMedW   = newSuperW - sconf.main_horizontal_dividor_width_px;
            var newMedH   = aRat * newMedW;

            /*
            ccc( ' ratio=' + aRat.toFixed(2) +
            ' newSuperW=' + newSuperW.toFixed(2) +
            ' ' top=' + superBox.top.toFixed(2) +
            ' window.innerHeight=' + window.innerHeight )
            */

            var MIN_SUPRE_W = sconf.MINIMAL_MEDIA_CONTAINER_WIDTH +
                              sconf.main_horizontal_dividor_width_px;
            var topLimit = window.innerHeight - legendHeight - medBox.top;
            newSuperW = Math.max(
                MIN_SUPRE_W,
                Math.min( newSuperW,
                          topLimit / aRat + sconf.main_horizontal_dividor_width_px
                )
            );
            //ccc( 'restricted= ' + newSuperW );

            ///===================================
            ///makes "soft css" ... non-inline-css
            //it was: height : ${newMedH.toFixed(2)}px;
            var videoW = ( ( rootW - newSuperW ) * 0.8); //todo why 0.8? box-sizing model?
            var videoH = videoW*10/16;
            var videoW_px = videoW.toFixed(2) + 'px';
            var videoH_px = videoH.toFixed(2) + 'px';
            var videoW_mobile_px = (0.94*rootW).toFixed(2) + 'px';
            var videoH_mobile_px = (0.94*rootW*10/16).toFixed(2) + 'px';
            var textPaneW = cssmods.calculateTextPerc( 100 * newSuperW / rootW ).toFixed(2) + '%';

            sDomN.mediaHorizontalHandlerCSS$.html(`
                .bsl-media-superroot {
                   width  :${newSuperW}px;
                }
                .bsl-text-widget {
                    width :${(fconf.exegesis_floats && 'auto') || textPaneW};
                }
                .bsl-showreel-video-wrap {
                    width : ${videoW_px};
                    height : ${videoH_px};
                }
                @media only screen and (max-width: 800px) {
                    .bsl-showreel-video-wrap {
                        width       :${videoW_mobile_px};
                        height      :${videoH_mobile_px};
                    }
                }
            `);
            ///===================================


            //.synchs resize and dividor-slider states
            if( doDividorSynch ) { 
                pointWrap_local.achieved.achieved = newSuperW;
            }

            //fmethods.alignVideoPlaceholders && fmethods.alignVideoPlaceholders();
            sapp.upcreate();
            return newSuperW;
        }
        ///=============================================================================
        /// \\// restricts and sets super root and text pane sizes
        ///=============================================================================




        //====================
        // //\\ finds draggee
        //====================
        ///Returns: dragWrap if it is close to testPoint.
        function findDraggee( testPoint )
        {
            //.if distance to testPoint is "outside" of this par.,
            //.dragWrap is not "considered" for drag
            var DRAGGEE_HALF_SIZE = fconf.DRAGGEE_HALF_SIZE;

            var handlePos = medpos2dompos();
            var testMedpos = testPoint;
            var testMediaX = testMedpos[0];
            var testMediaY = testMedpos[1];

            var tdX = Math.abs( testMediaX - handlePos[0] );
            var tdY = Math.abs( testMediaY - handlePos[1] );
            var td  = Math.max( tdX, tdY );

            //.td is a "rect-metric" for distance between testPoint and drag-point-candidate
            if( td <= DRAGGEE_HALF_SIZE ) {
                //ccc( '\n\n****', 'pos=',handlePos, 'mouse=',testPoint, testMediaX, testMediaY );
                return dragWrap;
            }
        }
        //====================
        // \\// finds draggee
        //====================



        ///converts own media pos to dom-pos
        function medpos2dompos()
        {
            var parentBox = rootvm.approot.getBoundingClientRect();
            var handleBox = sDomN.mediaHorizontalHandler.getBoundingClientRect();
            var handlePos = [
                    handleBox.left-parentBox.left,
                    handleBox.top - parentBox.top + handleBox.height/2
            ];
            return handlePos;
        }

        ///repositions and decorated handle
        function update_decPoint( decPoint )
        {
            var dompos = medpos2dompos();
            decPoint.style.left = dompos[0] + 'px';            
            decPoint.style.top = dompos[1] + 'px';            
        }
    }

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomN       = sn('dnative', sapp);
    var sDomF       = sn('dfunctions', sapp);

    var d8d_p       = sn('d8d-point',fmethods);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    sDomF.create_original_picture_vis_slider = create_original_picture_vis_slider;
    //00000000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000000







    function create_original_picture_vis_slider()
    {

        sDomN.visib_right_image$ = $$.c('img')
          .a('src','images/mouse-icon.png')
          .css('width','26px')
          .css('float','right')
          .css('position','relative')
          .css('top','4px')
          .css('left','-9px')
          .to(sDomN.topMediaControls$())
          ;
        var captionScale    = 1;
        var sliderClassId   = 'origin-vis-slider';
        var railsLegend     = '';

        //=====================================================
        //      animated slider
        //      Based on ns.sliderControl which is based on,
        //      as of version 1072,
        //      module bsl/slider/d8d-app-template.js 
        //=====================================================
        var vis_slider = ssF.animatedSlider({

            parent              :sDomN.topMediaControls$(),
            cssp                :cssp,
            sliderClassId       :sliderClassId,
            customCss           :customCss( cssp, sliderClassId, railsLegend ),
            railsLegend         :railsLegend,

            dataInMove:         function( dataArg, draggee ) {
                                    slider2opacity( dataArg );
                                },
            //.callback when handler stops
            dataInArrival:      function( dataArg ) {
                                    slider2opacity( dataArg );
                                }
        });
        sDomN.visib_left_image$ = $$.c('img')
          .a('src','images/scroll-icon.png')
          .css('width','19px')
          .css('float','right')
          .css('position','relative')
          .css('top','6px')
          .css('right','-10px')
          .to(sDomN.topMediaControls$())
          ;

        vis_slider.doSet_childOpeningAnimation(
            0, 1 - fconf.ORIGINAL_FIGURE_VISIBILITY,
            fconf.ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS
        );
        //11111111111111111111111111111111111111
        return;
        //11111111111111111111111111111111111111







        ///converts study-model pos to draggee caption
        function setCaption( slider_arg )
        {
            //slider_arg.draggee.innerHTML = ( captionScale ).toFixed(2);
        }

        function slider2opacity( sliderParameter )
        {
            var pictureOpacity = Math.max(0,1-sliderParameter).toFixed(3);
            var modelOpacity   = Math.min(1, Math.max(0,sliderParameter)).toFixed(3);
            var strongerModelOpacity = Math.min(1, Math.max(0,sliderParameter*2)).toFixed(3);
            var weakerPictureOpacity = Math.max(0,1-sliderParameter*1.2).toFixed(3);;

            sDomN.bgImage$.css( 'opacity', weakerPictureOpacity );
            sDomN.visib_left_image$.css( 'opacity', pictureOpacity );

            sDomN.mmedia.style.opacity = '' + strongerModelOpacity;
            sDomN.visib_right_image$.css( 'opacity', modelOpacity );
        }
    }

    function customCss ( cssp, csskey, railsLegend )
    {
        var ret = `

            .${cssp}-slider-${csskey} {
                float:right;
                width:80px;
                height:30px;
                left:unset;
                top: 0;
                display:inline-block;
                position:relative;
                z-index:1000;
            }

        `;

        /*
        variant when slider is not visible originally
        .${cssp}-slider-${csskey} {
            visibility:hidden;            
        .${cssp}-slider-${csskey}.${cssp}-highlited-chart {
            visibility:visible;
        }
        */

        ret += `
            /* rails */
            .${cssp}-slider-${csskey}:after {
                content:'';
                display:block;
                position:absolute;
                width:72px;
                height:0px;
                border-top:1px solid #aaaaaa;
                left:6px;
                top:18px;
                color:black;
                background-color:white;
            }

            /* drag background */
            .${cssp}-slider-${csskey}:before {
                content:'${railsLegend}';
                display:block;
                position:absolute;
                width:75px;
                height:30px;
                left: 0px;
                top:0px;
                color:#aaaaaa;
            }

            .${cssp}-slider-${csskey} .${cssp}-draggee {
                position:absolute;
                top:10px;
                width:3px;
                height:14px;
                border-radius:3px;
                border:1px solid #888888;
                color:black;
                background-color:#dddddd;
                z-index:1000;
                cursor:pointer;
            }
        `;
        return ret;
    }

}) ();


( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var sapp        = sn('sapp'); 

    var fapp        = ns.sn('fapp'); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);

    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    fmethods.test_mobile_and_attach_exegesis_tabs = test_mobile_and_attach_exegesis_tabs;
    sDomF.createExegesisTabs = createExegesisTabs;
    sDomN.processSelectedTab = processSelectedTab;
    return;    








    //============================
    // //\\ Transclusion by mobile
    //============================
    function attachExegesisTabs( parent, upperSibling )
    {
        if( parent.contains( sDomN.exegesisTabs.tab ) ) return;
        if( upperSibling ) {
            //https://stackoverflow.com/questions/4051612/javascript-next-sibling
            var next = upperSibling.nextSibling;
            parent.insertBefore( sDomN.exegesisTabs.tab, next );

        } else {
            parent.insertBefore( sDomN.exegesisTabs.tab, parent.firstChild );
            //.sets default because "Data" may make texts "empty"
            //if( sapp.lemmaNumber === 9 ) { //todm
                var amode = sn('mode',sapp);
                var tabKey = amode['proof']+'-og';
                var tab = rg['mobile-tabs'][ tabKey ];
                //ccc( 'refreshing ' + amode['proof'] )
                tab.click();
            //} else {
            //    sDomN.processSelectedTab( sconf.defaultMobileTabSelection );
            //}
        }
    };

    function test_mobile_and_attach_exegesis_tabs()
    {
        ns.test_mobile_mode( function( mobile ) {
            if( mobile ) {
                attachExegesisTabs(
                    sDomN.medRoot,
                    sapp.lemmaNumber === 9 ? sDomN.mmedia : document.querySelector('.slider-group')
                )
            } else {
                attachExegesisTabs( sDomN.text$() )
            }
        });
    };
    //============================
    // \\// Transclusion by mobile
    //============================



    ///Outputs: sDomN.exegesisTabs
    function createExegesisTabs()
    {

        var tabroot = sDomN.exegesisTabs = { tab: $$
            .c('div')
            .addClass('tab-section')
            ()
        };
        var ul = $$.c('ul').addClass('tabs').to(tabroot.tab)();
        
        [
            ['areadesk','areadsk', 'Data', 'active' ],
            ['claim-og','claim','Claim'],
            ['proof-og','proof','Proof']

        ].forEach( function( tab ) {
            var li = $$ .c('li')
               .addClass('tabs__tab Tab'+(tab[3]?' active':''))
               .addClass('tab-'+tab[0])
               .html(tab[2])
               .e('click',function(event) { openTab(event, tab[0], tab[1]); } )
               .to(ul)
               ();
            li.innerHTML = '<a href="javascript:void(0)">'+tab[2]+'</a>';
            ssF.tr('mobile-tabs',tab[0],li); //availibies tab to an entire fapp
        });
        $$ .c('li')
           .addClass('tabs__indicator')
           .a('role','role="indicator"')
           .to(ul);


        function openTab(evt, tabName) 
        {
            tab = document.getElementsByClassName("Tab");
            for (i = 0; i < tab.length; i++) {
                //kvk: possibly "spaces" memory leak in form of non-removing an extra " "
                //after "active"
                //tab[i].className = tab[i].className.replace(" active", "");
                $$.$(tab[i]).removeClass(" active");
            }
            $$.$(evt.currentTarget).addClass(" active");
            sDomN.processSelectedTab( tabName );
        }
    }

    function processSelectedTab( tabName )
    {
        if( !sapp.isInitialized ) return;
        //.........................................................
        // //\\ processes chosen content
        //.........................................................
        var texts = document.querySelectorAll( '.original-text' );
        texts.forEach( function( text ) {
            $$.addClass( 'hidden', text ); 
        });
        //.........................................................
        // \\// processes chosen content
        //.........................................................



        //.........................................................
        // //\\ makes tab-switch in synch with CSS and menu-engine
        //.........................................................
        var ltb = rg['main-legend'] && rg['main-legend'].tb;

        //.todm
        //.this is an alternative to ltb ... do simplify ... 
        //.too many class attributes
        var domMainLegend = document.body.querySelector('.main-legend');
        //c cc( 'domMainLegend=', domMainLegend, 'tab=',tabName );
        
        switch( tabName.substring(0,5) )
        {
            case 'aread':
                if( ltb ) {
                    $$.removeClass( 'hidden', ltb.claim );
                    $$.removeClass( 'hidden', ltb.proof );
                }
                if( domMainLegend ) {
                    ////lemma2,3 legend showing
                    $$.removeClass( 'hidden', domMainLegend );
                }
                break;
            case 'proof':
                if( ltb ) {
                    $$.addClass( 'hidden', ltb.claim );
                    $$.addClass( 'hidden', ltb.proof );
                }
                if( domMainLegend ) {
                    ////lemma2,3 legend hiding
                    $$.addClass( 'hidden', domMainLegend );
                }
                sDomF.selectMenu( 'proof', 'proof' );
                var text = document.querySelector( '.original-text.chosen' );
                $$.removeClass( 'hidden', text ); 
                break;
            case 'claim': 
                if( ltb ) {
                    $$.addClass( 'hidden', ltb.claim );
                    $$.addClass( 'hidden', ltb.proof );
                }
                if( domMainLegend ) {
                    ////lemma2,3 legend hiding
                    $$.addClass( 'hidden', domMainLegend );
                }
                sDomF.selectMenu( 'proof', 'claim' ); //synchs with master menu
                var text = document.querySelector( '.original-text.chosen' );
                $$.removeClass( 'hidden', text ); 
                break;
        }
        //.........................................................
        // \\// makes tab-switch in synch with CSS and menu-engine
        //.........................................................
    }

}) ();


( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var rootvm      = sn('rootvm');

    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var fmethods    = sn('methods',fapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);

    var sapp        = sn('sapp'); 
    var amode       = sn('mode',sapp);

    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    sDomF.createMenu = createMenu;
    //00000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000









    ///==========================================
    ///creates menu from config list
    ///==========================================
    function createMenu()
    {
        var mtype2inputRacks = {};
        var mtypeDecoration = {};

        //this is a parent of legacy-app-menu
        sDomN.menu = document.querySelector( '.sub-nav-bar' );

        $$.addClass( cssp + '-menu', sDomN.menu );
        var sroot = rootvm.approot;
        ///todm ... this is may be a css filler ... should be removed
        sDomN.menuAreaFiller = $$
            .c('div')
            .addClass(cssp + '-menu-filler')
            .to(sroot)
            ();

        sDomF.populateMenu = populateMenu;
        sDomF.selectMenu = selectMenu;
        sDomF.resizeMenuDecorations = resizeMenuDecorations;
        //11111111111111111111111111111111
        return;
        //11111111111111111111111111111111







        function selectMenu( mtype, mid )
        {
            mtype2inputRacks[ mtype ][ mid ].li$().click();
        }

        function resizeMenuDecorations()
        {
            Object.keys( mtype2inputRacks ).forEach( function(mtype) {
                mtypeDecoration[ mtype ].alignShadows();
            });
        }



        //====================================
        // //\\ populate menu
        //====================================
        function populateMenu()
        {
            var sroot = rootvm.approot;
            Object.keys( sconf.submenus ).forEach( function( key ) {
                setupModeType( key, sconf.submenus[key] );
            });
            //222222222222222222222222222222222222222222222222222222
            return;
            //222222222222222222222222222222222222222222222222222222





            //====================================
            // //\\ sets submenu
            //------------------------------------
            //Input: mtype - menu type id
            //       submenu - contains list = array of items in submenu
            function setupModeType( mtype, submenu )
            {
                var mlist = submenu.list;
                var mdefault = submenu['default'];
                mtypeDecoration[ mtype ] = {};
                var parent = $$
                    //this is a parent of menu list ...
                    //should be a div for clear coding ...
                    .c('div')
                    .addClass('submenu')
                    .addClass(mtype)
                    .to(sDomN.menu)
                    ();

                // //\\ switch Handle
                var switchHandleBackground$ = $$
                    .c('div')
                    .addClass( 'handle-background' )
                    .to( parent )
                    ;
                var switchHandle$ = $$
                    .c('div')
                    .addClass( 'handle' )
                    .addClass( 'shape' )
                    .css( 'transition', "top 0.5s ease-in-out")
                    .to( switchHandleBackground$() )
                    ;
                $$  .c( 'div' )
                    .addClass( 'radio-circle' )
                    .to( switchHandle$() )
                    ;
                mtypeDecoration[ mtype ].alignShadows = alignShadows;
                // \\// switch Handle

                var t2r      =mtype2inputRacks;
                t2r[ mtype ] =t2r[ mtype ] || {};
                mlist.forEach( function( mitem, mitemIx ) {
                    var mid             =mitem.id;
                    t2r[ mtype ][ mid ] = {};
                    makeRadio({
                        mid         :mid,
                        caption     :mitem.hasOwnProperty( 'caption' ) ? mitem.caption : mid,
                        inputRack   :t2r[ mtype ][ mid ],
                        mitemIx     :mitemIx
                    });
                });
                //333333333333333333333333333333333333333333333333333333
                return;
                //333333333333333333333333333333333333333333333333333333






                //-----------------------------------------------------------
                // //\\ alignes handle- and shadows- absolute pos to li-fluid
                //-----------------------------------------------------------
                function alignShadows()
                {
                    var box = parent.getBoundingClientRect();
                    switchHandleBackground$
                        .css('width', box.width.toFixed(2) + 'px')
                        .css('height', box.height.toFixed(2) + 'px')
                        ;
                    Object.keys( t2r[ mtype ] ).forEach( function( mid ) {
                        var inputRack = t2r[ mtype ][ mid ];
                        alignShadow( inputRack.li$(), inputRack.switchHandleShadow$ );
                    });
                }

                function alignShadow( li, shadow$, doDecorateWithTransition )
                {
                    var box = li.getBoundingClientRect();
                    var pbox = li.parentNode.getBoundingClientRect();
                    var posX = box.left - pbox.left;
                    var posY = box.top - pbox.top;

                    if( doDecorateWithTransition ) {
                        shadow$
                            .a( 'style',
                                'left:' + posX + 'px;' +
                                "top:" +  posY + 'px;' +
                                "transition: top 0.3s ease-in-out, left 0.5s ease-in-out;"
                            );
                    } else {
                        shadow$ .css( 'left', posX + 'px' )
                                .css( 'top', posY + 'px' );
                    }
                }
                //-----------------------------------------------------------
                // \\// alignes handle- and shadows- absolute pos to li-fluid
                //-----------------------------------------------------------


                //------------------------------------
                // //\\ makes radio
                //------------------------------------
                function makeRadio( marg )
                {
                    var mid         =marg.mid;
                    var caption     =marg.caption;
                    //.inputRack is a group-of-menu-dom-elements (?related to one menu itmem)
                    var inputRack   =marg.inputRack;
                    var mitemIx     =marg.mitemIx;

                    var id          = cssp+'-'+mtype+'--'+mid;

                    //--------------------------
                    // //\\ handle shadow
                    //--------------------------
                    inputRack.switchHandleShadow$ = $$
                        .c('div')
                        .addClass( 'shadow' )
                        .addClass( 'shape' )
                        .to( switchHandleBackground$() );
                        ;
                    
                    $$
                        .c( 'div' )
                        .addClass( 'radio-circle' )
                        .to( inputRack.switchHandleShadow$() )
                        ;
                    
                    // \\// handle shadow

                    //--------------------------
                    // //\\ fluid-html part
                    //--------------------------
                    var li$ = inputRack.li$ = $$
                        .c('div')
                        .addClass( 'shape' )
                        .addClass( 'litem' )
                        .e('click', function( event ) { 
                            do_select_mid();
                        })
                        .to( parent )
                        ;
                    var li = li$();
                    $$
                        .c( 'div' )
                        .addClass( 'radio-circle' )
                        .to( li )
                        ;
                    $$
                        .c( 'div' )
                        .addClass( 'caption' )
                        .html( caption )
                        .to( li )
                        ;
                    //--------------------------
                    // \\// fluid-html part
                    //--------------------------



                    if( mdefault === mid ) {
                        do_select_mid();
                    }
                    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
                    return;
                    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr





                    ///---------------------------
                    /// processes radio change
                    ///---------------------------
                    function do_select_mid()
                    {
                        if( amode[ mtype ] === mid ) return; //click is idempotent
                        var inputRackType = t2r[ mtype ];
                        //==================================================
                        // //\\ updates application mode in CSS classes
                        //==================================================
                        var ww$ = $$.$(sroot);
                        mlist.forEach( function( mitem ) {
                            ////removes all possible classes
                            ww$.removeClass(mtype + '--' + mitem.id);
                            inputRackType[ mitem.id ] &&  //todm do without a check
                                inputRackType[ mitem.id ].li$.removeClass( 'chosen' );
                        });
                        ww$.addClass(mtype + '--' + mid);
                        inputRackType[ mid ].li$.addClass( 'chosen' ); //todm redundant state-flag
                        //==================================================
                        // \\// updates application mode in CSS classes
                        //==================================================



                        //==================================================
                        // //\\ draws CSS decorations
                        //==================================================
                        alignShadow( li, switchHandle$, !!'doDecorateWithTransition' )
                        //==================================================
                        // \\// draws CSS decorations
                        //==================================================





                        //==================================================
                        // //\\ swaps original texts depending on new amode
                        //==================================================
                        if( mtype === 'text' || mtype === 'proof' ) {
                            if( amode['proof'] && amode['text'] ) {
                                ////this state of application does already exist
                                ////do remove it from CSS
                                var searchStr = '.original-text.' + amode['proof'] + '.' + amode['text'];
                                var chosenTextDiv = sDomN.text$().querySelectorAll( searchStr );
                                chosenTextDiv[0] && $$.removeClass( 'chosen', chosenTextDiv[0] );
                            }

                            if( mtype === 'text' ) {
                                var formerMType = 'text';
                                var unchangedMType = 'proof';
                            } else {
                                var formerMType = 'proof';
                                var unchangedMType = 'text';
                            }
    
                            var notToBeChangedMode = amode[unchangedMType];
                            if( notToBeChangedMode ) {
                                ////this state does already exist ... do set CSS
                                var changedMode = mid;
                                //ccc( 'mtype=' + mtype + ' mid=' + mid );
                                var searchStr = '.original-text.' + notToBeChangedMode + '.' + changedMode;
                                var chosenTextDiv = sDomN.text$().querySelectorAll( searchStr );
                                chosenTextDiv[0] && $$.addClass( 'chosen', chosenTextDiv[0] );
                            }
                        }
                        //==================================================
                        // \\// swaps original texts depending on new amode
                        //==================================================


                        //==================================================
                        // //\\ menu work for special subapp
                        //==================================================
                        ss.menuExtraWork && ss.menuExtraWork( mtype, mid );
                        //==================================================
                        // \\// menu work for special subapp
                        //==================================================


                        //==================================================
                        // //\\ updates application mode
                        //==================================================
                        amode[mtype] = mid;
                        //ccc( 'set new state: amode[' + mtype + ']=' + amode[mtype] );
                        fmethods.spawnVideoList && fmethods.spawnVideoList();
                        //==================================================
                        // \\// updates application mode
                        //==================================================

                        //if( sapp.lemmaNumber === 9 && mtype !== 'proof' ) {//it was only for l9 ...
                        if( mtype !== 'proof' ) { //todm ... this looks clumsy
                            ////Synchs with tab switch:
                            ////"text"-call still must update "proof"-texts hidden by tab-switch
                            ////In other words, when one switches the text, then text's proof-type-mode and
                            ////claim-type-mode are hidden.
                            ////This picks up existing proof-type-mode and unhides it:
                            rg['mobile-tabs'][ amode['proof']+'-og' ].click();
                        }

                        ///refreshes legacy state of subapplication for l23 ...
                        ///todo ... patch ... merges l23 legacy state engine and l9
                        ///should be in some state enging specific to subapplication ...
                        if(( sapp.lemmaNumber === 2 || sapp.lemmaNumber === 3) && mtype === 'proof' ) {
                            ss.study.sdata.view.isClaim = amode.proof === 'claim';
                        }

                        //==================================================
                        // //\\ recalculates app for new application mode
                        //==================================================
                        if( sapp.readyToPopulateMenu ) { sapp.upcreate(); }
                        //==================================================
                        // \\// recalculates app for new application mode
                        //==================================================
                    }
                }
                //------------------------------------
                // \\// makes radio
                //------------------------------------
            }
            //------------------------------------
            // \\// sets submenu
            //====================================
        }
        //====================================
        // \\// populate menu
        //====================================
    };

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssModes     = sn('ssModes',ss);
    var rg          = sn('registry',ssD);
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);
    var references  = sn('references', ssD);

    var globalCss = '';
    var contRacks = []; //key pairs:

    sDomF.createTextWidget = createTextWidget;
    sDomF.topicModel_2_css_html = topicModel_2_css_html;
    sDomF.repopulateContent = repopulateContent;
    //000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000








    ///==========================================
    ///creates html for text pane
    ///==========================================
    function createTextWidget()
    {
        originalTexts_2_html_texts();
        sDomN.text$ = $$
            .c('div')
            .a( 'id', cssp+'-text-widget' )
            .addClass( cssp+'-text-widget' )
            .to(rootvm.approot)
            ;
    };


    function originalTexts_2_html_texts()
    {
        //==============================================
        // //\\ sapwns script-embedded-in-text to html
        //==============================================
        ///loops via all texts which were scripted by content contributor
        Object.keys( rawTexts ).forEach( function( proofMode ) {
            ///loops inside of specific proof-mode
            Object.keys( rawTexts[proofMode] ).forEach( function( key ) {
                //.RM "original-text" means CSS class of exegesis-text-html
                //.which is obtained by parsing raw-exegesis-script
                var classStr = 'original-text ' + proofMode + ' ' + key;
                ///normalizes textRack format
                var scriptRack = rawTexts[proofMode][key];
                if( !Array.isArray(scriptRack) ) {
                    scriptRack = [scriptRack];
                }
                if( references.text ) {
                    scriptRack.push( references.text );
                }
                contRacks.push({
                    classStr:classStr,
                    scriptRack:scriptRack,
                    domComponents:[],
                    components:[]
                });
            });
        });
        //==============================================
        // \\// sapwns script-embedded-in-text to html
        //==============================================
    };









    //==============================================
    // //\\ colorizes hihglight
    //==============================================
    function createColorCodingCSS()
    {
        var fc = sconf.tfamilyColor;

        //=================================================
        // //\\ non family and topic specific highlight CSS
        //=================================================
        globalCss += `

            /* vital: insists on visibility and overrides possibly
               coinciding target-child css which disables the child
            */
            #bsl-text-widget.bsl-text-widget a.topic-link {
                display:inline;
            }

            /*=============================*/
            /* //\\ links in original text */
            /*=============================*/
            a.topic-link {
                padding:1px;
                text-decoration:none;
                border-radius:4px;
            }
            /*=============================*/
            /* \\// links in original text */
            /*=============================*/


            /*=================================================
            //\\ higlights topic items when hovered by mouse
            =================================================*/
            .bsl-approot .bsl-media .tofill.highlighted {
                fill-opacity : 0.5; /* <1 to enable two topics in one topic-link */
                visibility:visible;
            }
            .bsl-approot .bsl-media .tofill.op1 {
                fill-opacity : 0.6;
            }
            .bsl-approot .bsl-media .tofill.highlighted.op1 {
                fill-opacity : 1;
            }
            .bsl-approot .bsl-media .tostroke.highlighted {
                stroke-opacity:0.8; /* <1 to enable two topics in one topic-link */ 
                stroke-width:7px;
                visibility:visible;
            }
            /*=================================================
            \\// higlights topic items when hovered by mouse
            =================================================*/


            /*====================================*/
            /* //\\ text-hover to shape-highlight */
            /*====================================*/
            .main-legend td.highlighted {
                opacity:1;
                font-weight:bold;
            }
            /*====================================*/
            /* \\// text-hover to shape-highlight */
            /*====================================*/

        `;
        //=================================================
        // \\// non family and topic specific highlight CSS
        //=================================================




        //=================================================
        // //\\ family specific highlight CSS
        //=================================================
        Object.keys( sconf.tfamilyColor ).forEach( function( fkey ) {
            var fcolor = fc[fkey];

            var ww = `

                /*----------------*/
                /* //\\ to stroke */
                /*----------------*/
                .topic-link.tfamily-${fkey},
                .tfamily-${fkey}.tostroke {
                    color: black;
                    stroke: black;
                }
                .text--english .topic-link.tfamily-${fkey},
                .text--english .tfamily-${fkey}.tostroke,
                .text--hypertext .topic-link.tfamily-${fkey},
                .text--hypertext .tfamily-${fkey}.tostroke {
                    color: rgba(${fcolor}, 1);
                    stroke: rgba(${fcolor}, 1);
                }
                /*----------------*/
                /* \\// to stroke */
                /*----------------*/

                /*---------------*/
                /* //\\ to fill  */
                /*---------------*/
                .tfamily-${fkey}.tofill {
                    fill: black;
                    fill-opacity:0.2;
                }
                .bsl-approot .tfamily-${fkey}.tofill.op1             {fill-opacity:0.7;}
                .bsl-approot .tfamily-${fkey}.tofill.op1.highlighted {fill-opacity:1;  }/*todm patch*/

                /* this specifity must yield to topicid */
                .text--english .tfamily-${fkey}.tofill,
                .text--hypertext .tfamily-${fkey}.tofill {
                    fill: rgba(${fcolor}, 1);
                }
                /*---------------*/
                /* \\// to fill  */
                /*---------------*/
            `;
            globalCss += ww;
        });
        //=================================================
        // \\// family specific highlight CSS
        //=================================================
    };
    //==============================================
    // \\// colorizes hihglight
    //==============================================



    ///contents depends on model mode
    ///this function visualizes the texts upon the mode
    ///at late run-time event, this function is, for example,
    ///used in lemma-2-3::gui-visibility.js::refreshSVG_master()
    function repopulateContent()
    {
        //purges all contents and can be a bug
        //bs tabs are transcluded into the same el:
        //sDomN.text$.html('');

        contRacks.forEach( function( contentRack ) {

            if( !contentRack.domEl ) {
                contentRack.domEl = $$
                  .c('div')
                  .addClass( contentRack.classStr )
                  //*******************************************************
                  //.here page content injects into html for the first time
                  //*******************************************************
                  .to( sDomN.text$() )
                  ();
            }
            transformText( contentRack );

            var domComponents = contentRack.domComponents;
            contentRack.components.forEach( function( component, cix ) {
                if( !domComponents[cix] ) {
                    domComponents[cix] = $$
                        .c('div')
                        .css( 'display', 'inline' )
                        //*******************************************************
                        //.here page content injects into html for the first time
                        //*******************************************************
                        .to( contentRack.domEl )
                        ();
                    domComponents[cix].innerHTML = component.text;
                }
                //todo: ineffective: do throttle or create html only once and
                //      update only CSS-display
                if( component.modeIsTogglable ) {
                    domComponents[cix].innerHTML = component.text;
                }
            });
        });
    }

    ///parses scripts of the text
    ///builds components from script
    function transformText( contentRack )
    {
        var res = 
            '\\|([^\\|]+)\\|' + //catches topicId
               '([^\\|]+)'    + //catches topic caption
            '\\|\\|';
        var re = new RegExp( res, 'g' );
        var re_amp = /\&/g;
        var components = contentRack.components;
        contentRack.scriptRack.forEach( function( textEl, tix ) {
            if( typeof( textEl ) === 'object' ) {
                var theScript = textEl['default'];
                Object.keys( ssModes ).forEach( function( smode ) {
                    theScript = ( ssModes[smode] && textEl[smode] ) || theScript;
                    //if( ssModes[smode] && textEl[smode] )
                    //ccc( 'new script:' + ( ssModes[smode] && textEl[smode] ) );
                });
            } else {
                var theScript = textEl;
            }
            txt = theScript.replace( re_amp, '&amp;' );
            if( topics.convert_lineFeed2htmlBreak ) {
                //.converts text from <pre> format
                var txt = ns.pre2fluid( txt ) 
            }
            if( typeof( textEl ) === 'object' ) {
                ////reparses text every time ...
                ////todo: ineffective ... parses toggles at "each change"
                components[tix] =
                {
                    modeIsTogglable : typeof( textEl ) === 'object',
                    text : txt.replace( re, '<a class="topic-link $1">$2</a>' )
                };
            } else {
                ////makes it up only once ... no redundant parsing
                components[tix] = components[tix] ||
                {
                    modeIsTogglable : false,
                    text : txt.replace( re, '<a class="topic-link $1">$2</a>' )
                };
            }
        });
    }

    ///this function needs application-model-view already created
    function topicModel_2_css_html()
    {
        createColorCodingCSS();
        repopulateContent();

        var wDefs = topics.topicDef;
        var topicsN = Object.keys( wDefs ).length;
        Object.keys( wDefs ).forEach( function( topicId, tix ) {
            //=========================================================
            // //\\ processes specific topicId
            //=========================================================
            var shapes = wDefs[ topicId ];

            //=======================================
            // //\\ builds token-definition colorizer
            //=======================================
            // //\\ autogenerates topic color
            //-------------------------------
            var tcolor = shapes.topicColor;
            if( tcolor === 'auto' ) {
                var SATUR = 99;
                var LIGHT = 30;
                var OPACITY = 1;
                var hue = 359 / topicsN * tix;
                var tcolorStroke = ns.pars2colors( hue, SATUR, LIGHT, OPACITY ).rgba;
                var tcolorFill = ns.pars2colors( hue, SATUR, LIGHT, 1 ).rgba;
            } else if( tcolor ) {
                var tcolorStroke = tcolor;
                var tcolorFill = tcolor;
            }
            var finalColor = tcolorFill;
            if( !tcolor && shapes.tfamily ) {
                finalColor = 'rgb(' + sconf.tfamilyColor[ shapes.tfamily ] + ')';
            }
            //-------------------------------
            // \\// autogenerates topic color
            //-------------------------------
            if( tcolor ) {
                globalCss +=`

                    /* //\\ fill color variations */
                    .bsl-approot.text--english .topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tofill {
                        fill: ${tcolorFill};
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tofill {
                        fill: ${tcolorFill};
                    }
                    /* \\// fill color variations */

                    /* //\\ fill opacity variations */
                    .bsl-approot.text--english .topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tofill {
                        fill-opacity:0.2;
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tofill,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tofill {
                        fill-opacity:0.5;
                    }
                    .bsl-approot.text--english .topicid-${topicId}.tofill.op1,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tofill.op1 {
                        fill-opacity:0.6;
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tofill.op1,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tofill.op1 {
                        fill-opacity:1;
                    }
                    /* \\// fill opacity variations */


                    /* //\\ stroke color variations */
                    .bsl-approot.text--english .topic-link.${topicId},
                    .bsl-approot.text--english .main-legend .topicid-${topicId},
                    .bsl-approot.text--english .topicid-${topicId}.tostroke,

                    .bsl-approot.text--hypertext .topic-link.${topicId},
                    .bsl-approot.text--hypertext .main-legend .topicid-${topicId},
                    .bsl-approot.text--hypertext .topicid-${topicId}.tostroke {
                        stroke: ${tcolorStroke};
                        color: ${tcolorStroke};
                    }
                    /* \\// stroke color variations */

                    /* //\\ stroke opacity variations */
                    .bsl-approot.text--english .topicid-${topicId}.tostroke,
                    .bsl-approot.text--hypertext .topicid-${topicId}.tostroke {
                        stroke-opacity:0.6;
                    }
                    .bsl-approot.text--english .highlighted.topicid-${topicId}.tostroke,
                    .bsl-approot.text--hypertext .highlighted.topicid-${topicId}.tostroke {
                        stroke-opacity:1;
                    }
                    /* \\// stroke opacity variations */
                `;
            }
            //=======================================
            // \\// builds token-definition colorizer
            //=======================================




            //=======================================
            // //\\ builds dom elements for the topic
            //=======================================
            var domEls = [];

            ///searches by scripted shapes.id
            ///finds all figure-shapes from their id-list
            shapes.id && shapes.id.forEach( function(rgId) {
                var unit = rg[ rgId ];
                //.unit can have an arbitrary kind of dom-representation ...
                if(!unit) throw 'rg[' + rgId + '] is undefined';

                if( !finalColor && unit.tfamily ) {
                    finalColor = 'rgb(' + sconf.tfamilyColor[ unit.tfamily ] + ')';
                }
                unit.finalColor = finalColor;
                //c cc( rgId + ' in topic .... unit=' + unit.finalColor )

                var domel = (unit.mediael && (unit.mediael.paintedCurve || unit.mediael)) ||
                            unit.svgel || unit.domel;
                var domel$ = $$.$(domel);
                domel$.addClass( 'topicid-' + topicId );
                if( shapes.tfamily ) {
                    domel$.addClass( 'tfamily-' + shapes.tfamily );
                }
                domEls.push(domel);
            });

            ///searches by CSS query
            if( shapes.classQuery ) {
                var shapesEls = document.querySelectorAll( shapes.classQuery );
                shapesEls.forEach( function( domel ) {
                    var domel$ = $$.$(domel);
                    domel$.addClass( 'topicid-' + topicId );
                    if( shapes.tfamily ) {
                        domel$.addClass( 'tfamily-' + shapes.tfamily );
                    }
                    domEls.push(domel);
                });
            }
            //=======================================
            // \\// builds dom elements for the topic
            //=======================================


            //========================================================
            // //\\ sets up anchors
            //========================================================
            //c cc( 'domEls=', domEls );
            //.finds all anchors bound to the link-key
            var anchors = sDomN.text$().querySelectorAll( 'a.topic-link.' + topicId );
            anchors.forEach( function(attachee) {

                //.fixes goodies missed at creation
                if( shapes.tfamily ) {
                    $$.$(attachee).addClass( 'tfamily-' + shapes.tfamily );
                }

                //---------------------------------
                // //\\ do add remove "highlighted"
                //      from child elements
                //---------------------------------
                ///adds hover=event to all text-links
                attachee.addEventListener( 'mouseover', function() {
                    ///highlights all shapes-in-figure linked to text-link
                    domEls.forEach( function(domel) {
                        ns.$$.addClass( 'highlighted', domel );
                    });
                });
                ///adds unhover=event to all text-links
                attachee.addEventListener( 'mouseleave', function() {
                    ///unhighlights all shapes-in-figure linked to text-link
                    domEls.forEach( function(domel) {
                        ns.$$.removeClass( 'highlighted', domel );
                        //c cc( 'removing hg class from',domel );
                    });
                });
                //---------------------------------
                // \\// do add remove "highlighted"
                //---------------------------------
            });
            //========================================================
            // \\// sets up anchors
            // \\// processes specific topicId
            //=========================================================
        });


        //========================================================
        // //\\ finalizes global css
        //========================================================
        ns.globalCss.add8update( globalCss );
        //========================================================
        // \\// finalizes global css
        //========================================================
    };

}) ();


// //\\// Application core-events setup
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 
    var sapp        = sn('sapp' ); 
    var fconf       = sn('fconf',fapp);
    var fmethods    = sn('methods',fapp);
    var sDomF       = sn('dfunctions', sapp);

    fmethods.setupEvents            = setupEvents;
    fmethods.setupSiteWideEvents    = setupSiteWideEvents;
    fmethods.fullResize             = fullResize;
    return;






    function setupEvents()
    {
        window.addEventListener( 'resize', fullResize );
    };

    function fullResize( arg )
    {
        fmethods.test_mobile_and_attach_exegesis_tabs();
        //.application part
        //.solves draggee-point-arrows-misplacement
        //.after resize
        //if( sapp.lemmaNumber === 9 ) 
        sapp.upcreate();
        sDomF.resizeMenuDecorations();
        fmethods.restrictMediaDimensions && fmethods.restrictMediaDimensions(
            null, null, !!'doDividorSynch'
        );
    }

    function setupSiteWideEvents()
    {
        setNextLemmaButton( 'right' );
        setNextLemmaButton( 'left' );
        setNextLemmaButton( 'right', 'mobile' );
        setNextLemmaButton( 'left', 'mobile' );
    };

    function setNextLemmaButton( direction, mobile_or_desktop )
    {
        var cssPrefix = mobile_or_desktop === 'mobile' ? '.mobile-link' : '.desktop-link';
        var searchClass = 'a' + cssPrefix + '.page-btn--' + direction;
        var pager = document.querySelector( searchClass );
        if( pager ) {
            var next = -1;
            fconf.enabledLemmas.forEach( function(lem, ix) {
                if( next > -1 ) return; //all found
                if( direction === 'right' ) {
                    if( lem > sapp.lemmaNumber ) { next = lem; }
                } else {
                    lem = fconf.enabledLemmas[ fconf.enabledLemmas.length - ix - 1 ];
                    if( lem < sapp.lemmaNumber ) { next = lem; }
                }
            });
            if( next > -1 ) {
                var newLoc = window.location.pathname + '?conf=lemma=' + next;
                pager.title = "Go to lemma " + next;
                pager.href= newLoc;
            } else {
                $$.$(pager).addClass( 'non-displayed' );
            }
            /*
            if( next > 0 ) {
                ///this did work but anchor works better
                pager.addEventListener( 'click', function() {
                    window.location = newLoc;
                    return false;
                });
            }
            */
        }
    }
    

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 



 
    fapp.initBurgerMenu_8_navDrawerShade = function()
    {
        ///================================================================
        /// //\\ 1) Menu: This controls the hamburger menu and nav drawer
        ///================================================================
        //$('.nav-drawer').hide();   
        $('.btn__menu').on('click', function() {
            $('.nav-drawer').toggleClass('animateIn');
            $('.btn__menu').toggleClass('exit-ani');
            //shows the overlay shade
            $('#shade').fadeToggle('fast');
        });

        $('#shade').on('click', function() {
           $('.nav-drawer').hide();
            $('.btn__menu').toggleClass('exit-ani');
            $('#shade').toggle();
        }); 
        ///================================================================
        /// \\// 1) Menu: This controls the hamburger menu and nav drawer
        ///================================================================
    };


})();


/*
    Creates threshold point in @media ... and
    sets the test-method to test mobile mode.
    At completion the test, calls callback if any supplied.
*/
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var cssp        = ns.CSS_PREFIX;




    ///=========================================================
    /// constructs mobile_tester
    ///=========================================================
    ns.create_mobile_tester = function( domElToAttachTo, mediaThreshold )
    {
        var tester = $$
           .c( 'div' )
           .css( 'position', 'absolute' )
           .css( 'visibility', 'hidden' )
           .addClass( cssp+'-mobile-width-detector' )
           .to( domElToAttachTo )
           ;

        $$ .c( 'style' )
           .to( document.head )
           .html( `
                .bsl-mobile-width-detector {
                    width:200px;
                }
                @media only screen and (max-width: ${mediaThreshold}px) {
                    .bsl-mobile-width-detector {
                        width:100px;
                    }
                }
           `);
        
        ns.test_mobile_mode = function( cb )
        {
            var testWidth = tester().getBoundingClientRect().width;
            if( testWidth <150 ) {
                var mobile = true;
            } else {
                var mobile = false;
            }
            cb && cb(mobile);
        };
    }

}) ();


// //\\//
(function() {
	var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var anslider    = ns.sn('animated-slider');

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    ssF.animatedSlider = animatedSlider;
    //0000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000








    ///... appar. this function is derived from vbls/... animated-slider.js
    ///... which had prototype: ns.simpleSlider = function( parent, cssp, sliderClassId, captionScale )
    function animatedSlider( sarg )
    {
        var parent          = sarg.parent;
        var cssp            = sarg.cssp;
        var hideProofSlider = sarg.hideProofSlider;
        var sliderClassId   = sarg.sliderClassId;
        var railsLegend     = sarg.railsLegend;
        var dataInMove      = sarg.dataInMove;
        var dataInArrival   = sarg.dataInArrival;
        //:optional
        var setCaption      = sarg.setCaption;
        //.overrides animated-slider-plugin's default css
        var customCss       = sarg.customCss; 
        //.hides but displays slider by ancestor css-class
        var ancestorClassToHideSlider = sarg.ancestorClassToHideSlider;
        //:
        parent = parent || document.body;
        return_slider = {};



        //===============================
        // //\\ creates dom placeholders
        //===============================
        // //\\ appends style
        //-------------------------------
        var css = customCss ||
                  anslider.css( cssp, sliderClassId, railsLegend,
                                ancestorClassToHideSlider, sconf.hideProofSlider
                  );
        $$  .c( 'style' )
            .html( css )
            .to( document.head );
        //-------------------------------
        // \\// appends style
        //-------------------------------



        //:appends slider root
        return_slider.slider$ = $$
            .c( 'div' )
            .a( 'class', cssp + '-slider-' + (sliderClassId ? sliderClassId : '' ) )
            .to( parent );
        //:appends draggee
        return_slider.draggee$ = $$
            .c( 'div' )
            .a( 'class', cssp +'-draggee' )
            .to( return_slider.slider$() );
        //===============================
        // \\// creates dom placeholders
        //===============================



        //======================
        // //\\ creates slider
        //======================
        ///as of version 1072, calls this function from module bsl/slider/d8d-app-template.js 
        ///there are too many drag-and-drop variants now, it's easy to be lost ...
        var slider = ns.sliderControl({
            drawSurfaceDomEl:   return_slider.slider$(),
            handleDomEl:        return_slider.draggee$(),
            lowLimit:0.001,
            maxLimit:1,
            //.callback when handler moves
            dataInMove:  dataInMove,
            dataInArrival   :dataInArrival
        });
        return_slider.slider = slider;
        //.displays draggee caption at start up
        setCaption && setCaption( slider );
        //======================
        // \\// creates slider
        //======================



        //===============================
        // //\\ starts landing animation
        //===============================
        return_slider.doSet_childOpeningAnimation = doSet_childOpeningAnimation;
        //===============================
        // \\// starts landing animation
        //===============================
        //1111111111111111111111111111111
        return return_slider;
        //1111111111111111111111111111111










        ///defines landing animation
        function doSet_childOpeningAnimation( startX, endX, dur )
        {
            var aframes = ns.aframes;
            var slider  = return_slider.slider;
            var rangeX  = endX - startX;
            function emulatesMove( timestamp ){
                var dataArg = startX + rangeX*(Math.min(timestamp, dur)) / dur;
                //c cc( 'emulates: moves dataArg=' + dataArg );
                slider.d8d_emulateAbsFractionX( dataArg, 'move' );
            }
            function completesMove()
            {
                slider.d8d_emulateAbsFractionX( endX, 'up' );
            };
            animInProgressHashStr = aframes.add8complete( emulatesMove, dur, completesMove );
        }

    };

})();


(function() {
    var ns = window.b$l;
    var anslider = ns.sn('animated-slider');





    anslider.css = function( 
        ///all input pars are optional
        cssp,
        csskey,
        railsLegend,
        ancestorClassToHideSlider,
        doHideSlider
    ) {
        railsLegend = railsLegend || '';

        var ret = `
            .${cssp}-slider-${csskey} {
                display:inline-block;
                position:relative;
                width:150px;
                height:30px;
                border-radius:4px;
                left:0px;
                top:15px;
                right:5%;
                z-index:1000;
            }
            `;

        if( doHideSlider ) {
            ret +=` 
                div.${cssp}-slider-${csskey} {
                    position:absolute;
                    visibility:hidden;
                }
            `;
            //return ret; /* todmm why this does not work */
        }
        if( ancestorClassToHideSlider ) {
            ret +=` 
                .${ancestorClassToHideSlider} .${cssp}-slider-${csskey} {
                    position:absolute;
                    visibility:hidden;
                }
            `;
        }

        /*
        variant when slider is not visible originally
        .${cssp}-slider-${csskey} {
            visibility:hidden;            
        .${cssp}-slider-${csskey}.${cssp}-highlited-chart {
            visibility:visible;
        }
        */

        ret += `
            /* rails */
            .${cssp}-slider-${csskey}:after {
                content:'';
                display:block;
                position:absolute;
                width:170px;
                height:2px;
                border:1px solid #888888;
                border-radius:2px;
                left:-2px;
                top:18px;
                color:black;
                background-color:white;
            }

            /* drag background */
            .${cssp}-slider-${csskey}:before {
                content:'${railsLegend}';
                display:block;
                position:absolute;
                width:170px;
                height:30px;
                border-radius:4px;
                left:-2px;
                top:0px;
                text-align:center;
                font-size:10px;
                font-family:helvetica, san-serif;
                color:#aaaaaa;
            }

            .${cssp}-draggee {
                position:absolute;
                top:13px;
                width:33px;
                height:12px;
                padding-top:2px;
                border-radius:6px;
                border:1px solid #888888;

                font-size:8px;
                text-align:center;
                font-family:helvetica, san-serif;
                color:black;
                background-color:#dddddd;
                z-index:1000;
                cursor:pointer;
            }
        `;

        return ret;
    };

})();



( function() {
	var sn	        = window.b$l.sn;
    var mat         = sn('mat');
    var integral    = sn('integral', mat);
    var bezier      = sn('bezier');




    //bezier.zbezier2integralY = zbezier2integralY;
    bezier.zbezier2areas = zbezier2areas;
    
    ///Returns: integral on [0,t] S = I[0,t]y*dx
    ///Context: P = 2t(1-t)P1 + ttP2 = att + bt; 
    ///         P is zero-based bezier curve;
    ///         S = Iyx'dt
    function zbezier2integralY( pivots, t )
    {
        var P1 = pivots[0];
        var P2 = pivots[1];
        var ay = P2[1] - 2*P1[1];
        var by = 2*P1[1];
        var ax = P2[0] - 2*P1[0];
        var bx = 2*P1[0];
        var bxs = 2*ax;
        var cxs = bx;  

        var S = integral.polynomial( ay*bxs, ay*cxs + bxs*by, by*cxs, 0, t );
        return S;
    }

    //:tests
    //c cc( zbezier2integralY( [[0.5,0.5],[1,1]], 1 ) ); //0.5
    //c cc( zbezier2integralY( [[0.5,1],[1,1]], 1 ) );   //1-1/3
    //c cc( zbezier2integralY( [[1,0.5],[1,1]], 1 ) );   //1/3

    ///Returns: S = Ix(y)dy
    function zbezier2integralX( pivots, t )
    {
        return zbezier2integralY(
            [
                [ pivots[0][1],
                  pivots[0][0]
                ], 
                [ pivots[1][1],
                  pivots[1][0]
                ]
            ],
            t
        );
    }
    //c cc( zbezier2integralX( [[0.5,1],[1,1]], 1 ) );   //1/3
    
    function zbezier2areas( pivots, t, tanT, tanCross, scale )
    {
        scale = scale || 1;
        var end = bezier.parT2point( t, [[0,0], pivots[0], pivots[1]] );
        var endX = end[0];
        var endY = end[1];

        var tan1 = pivots[0][0]/pivots[0][1];
        var fullAreaBetweenBx8axisY   = zbezier2integralX( pivots, t );

        //---------------------------------------
        // //\\ development prints
        //---------------------------------------
        /*
        var compareWithTriangularArea = endX * endY / 2;
        c cc( '****\nfull=' + (fullAreaBetweenBx8axisY*scale).toFixed(6) );
        //c cc( 'endX=' + endX.toFixed(2) + ' crossX=' + tanCross[0].toFixed(2) +
        //     ' crossY=' + tanCross[1].toFixed(2) );
        //c cc( 'endY=' + endY.toFixed(2) );
        c cc( 'triangle=' + (compareWithTriangularArea*scale).toFixed(6) );
        */
        //---------------------------------------
        // \\// development prints
        //---------------------------------------


        var areaUnderTangentLine_tanT = 0.5 * tanT * endX * endX;
        var areaBetweenTanT_8_curve     = fullAreaBetweenBx8axisY - areaUnderTangentLine_tanT;
        //ccc('under_tanT=' + (areaUnderTangentLine_tanT*scale).toFixed(6),
        //    'diff=1/12=' + (areaBetweenTanT_8_curve*scale).toFixed(6) // 1/12 );

        // //\\ under tan1
        var total = tanCross[0]*tanCross[1]/2;      //1/9 = 0.1111
        var delta = tanCross[0]*tanCross[0]/2*tanT; //1/9/2/2 = 1/36 
        var areaUnderTan1 = total - delta;          //1/12
        //c cc( 'total=' + total.toFixed(6) + ' tan1= ' + tan1.toFixed(6) );
        //c cc( '1/12 = areaUnderTan1=' + areaUnderTan1.toFixed(6) + ' rev= ' + ( 1/areaUnderTan1).toFixed(6) );
        // \\// under tan1

        var result =
        {
            areaBetweenTanT_8_curve: areaBetweenTanT_8_curve * scale,
            areaUnderTan1: areaUnderTan1 * scale,
            //.sugar
            areaBetween_Tan1_Tan2_Curve: ( areaBetweenTanT_8_curve - areaUnderTan1 ) * scale
        };
        return result;
    }

    //:tests
    //c cc( zbezier2areas( [[0.5,1],[1,1]], 1, 0.5, [ 1/4 + 1/12, 1/2+2/12 ] ) );   //1/3 - 1/4 = 1/12, 
    //c cc( zbezier2areas( [[0.5,1],[1,1]], 1, 0.5, [ 1/3, 2/3 ] ) );   //1/3 - 1/4 = 1/12, 


}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var rootvm      = sn('rootvm');
    var cssp        = ns.CSS_PREFIX;
    var sapp        = sn('sapp' ); 

    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sDomN       = sn('dnative', sapp);
    var sDomF       = sn('dfunctions', sapp);




    //===============================
    // //\\ medpos2dompos and inverse
    //===============================
    ///converts own media pos to dom-pos
    sDomF.medpos2dompos = function()
    {
        var off = sconf.mediaOffset;
        var medpos = this.medpos;
        var c2m = sDomF.css2media();
        return [ medpos[0] / c2m + off[0], medpos[1] / c2m  + off[1]];
    };
    ///converts dom-pos to media pos
    sDomF.dompos2medpos = function( dompos )
    {
        var moffset = sconf.mediaOffset;
        var c2m = sDomF.css2media();
        return [
            c2m * ( dompos[0] - moffset[0] ),
            c2m * ( dompos[1] - moffset[1] )
        ];
    };
    //===============================
    // \\// medpos2dompos and inverse
    //===============================

    sDomF.css2media = function()
    {
        //todo rid: ccc( sconf.innerMediaWidth + ' parent=' + sDomN.mmedia.parentNode.getBoundingClientRect().width);
        return sconf.innerMediaWidth / sDomN.mmedia.parentNode.getBoundingClientRect().width;
    };

}) ();


// This module should be generic in bsl/core or bsl/slider ... but before doing this
//      the standalone test.html file must be elaborated.
// //\\// Provides d&d module for set of points which act exclusively
//        one at the time and share common handler
//        The active point is elected by "findDraggee" function
//        which is supplied at initialization time.
( function() {
    var ns          = window.b$l;
    var dpdec       = ns.sn('drag-point-decorator');
    var sn          = ns.sn;    

    var fapp        = ns.sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);
    var sapp        = sn('sapp');

    d8d_p.createFramework = createFramework;
    //~~~~~
    return;
    //~~~~~






    ///===========================================================
    /// //\\ inits common framework for the set of  point-draggees
    ///-----------------------------------------------------------
    /// There can be as many frameworks as one wishes.
    function createFramework(
        //---------------------------------------------
        // //\\ AAAAAAAAA PPPPPPPP IIIIIIIIII
        //---------------------------------------------
        findDraggee,                       //function which finds draggeePoint 
        dragSurface,                       
        DRAG_POINTS_THROTTLE_TIME,         //optional
        detected_user_interaction_effect,  //optional sugar for "down" event
        decPoint_parentClasses             //optional; decPoint stands for "decorationalPoint"
        //---------------------------------------------
        // \\// AAAAAAAAA PPPPPPPP IIIIIIIIII
        //---------------------------------------------
    ) {
        var selectedElement;               //flag
        var dragWraps = [];                //level of dragWrap-points where each point is on top
                                           //of it's own api.pointWrap supplied in api for each point

        ///sets one lower-level handler for all framework draggees
        ns.d8d(
        {
            surface : dragSurface,
            d8d_app : d8d_app //common handler
        });
        //111111111111111111111111111111111111111111111
        return {
            createDragUpdate : createDragUpdate,
            dragWraps:dragWraps,
            updateAllDecPoints:updateAllDecPoints
        };
        //111111111111111111111111111111111111111111111









        function updateAllDecPoints()
        {
            dragWraps.forEach( function( dragWrap ) {
                dragWrap.update_decPoint && dragWrap.update_decPoint( dragWrap.decPoint );
            });
        }


        ///Creates drag handler for each specific point-draggee.
        ///Usually called when each model point is created to be dragged.
        function createDragUpdate( api )
        {
            //---------------------------------------------
            // //\\ AAAAAAAAA PPPPPPPP IIIIIIIIII
            //---------------------------------------------
            var pointWrap            = api.pointWrap || {};
            var initialAchived       = api.achieved;
            var doProcess            = api.doProcess;           //to be set at point-def.
            var update_decPoint      = api.update_decPoint;     //optional
            var cssId                = pointWrap.name;          //optional for css
            var finalColor           = pointWrap.finalColor;    //optional
            // //\\ functions' side effects
            //      todm side effects can be fixed by indexing points and
            //      making registry here ... still an extra construct
            //      adds members to pointWrap
            pointWrap.achieved      = { achieved: initialAchived };
            var decPoint            = update_decPoint &&
                                            dpdec.addD8D_decorationPoint(
                                                dragSurface,
                                                cssId,
                                                finalColor,
                                                decPoint_parentClasses
                                            );
                                        
            //c cc( cssId + ' pointWrap.finalColor=' +  pointWrap.finalColor)
            // \\// functions' side effects
            //---------------------------------------------
            // \\// AAAAAAAAA PPPPPPPP IIIIIIIIII
            //---------------------------------------------




            update_decPoint && update_decPoint( decPoint );
            var doDragUpdate = ns.throttle( 
                function( arg )
                {
                    //logical sugar:
                    //remembers pointWrap which can be changed in closure of doProcess
                    //when pointWrap is generated in the loop
                    arg.pointWrap = pointWrap; 

                    //:these both can be in one function call,
                    //:they are in different calls for clear api logic
                    doProcess( arg );
                    update_decPoint && update_decPoint( decPoint );

                    if( arg.down_move_up === 'up' ) {
                        selectedElement=0;
                    }
                },
                DRAG_POINTS_THROTTLE_TIME || 0
            );
            var dragWrap =
            {
                pointWrap       :pointWrap,
                doDragUpdate    :doDragUpdate,
                update_decPoint :update_decPoint,
                decPoint        :decPoint
            };
            dragWraps.push( dragWrap );
            return dragWrap;
        }




        ///d8d handler shared between all draggee-points.
        ///Input: mPoint
        ///       it is precalculated by lower level handler and supplied to this function:
        ///       it is offset in "local-surface" if no special converter is supplied:
        ///       details are in d8d code:
        ///            var mPoint = eventPoint_2_localPoint( childEvent );
		///            var eventPoint_2_localPoint = arg.eventPoint_2_localPoint ||
        ///                                          eventPos_2_surfacePos;
        function d8d_app( move, down_move_up, mPoint, event )
        {
            //ns.d('app: d8d_app call begins: mode="' + down_move_up + '"');
            switch( down_move_up )
            {
                case 'down': 
                    if( selectedElement ) {
                        //var ww = 'app: ' + down_move_up +
                        //         ' still not-cleaned-up ... down cancells';
                        //ns.d(ww);
                        return true;
                    }
                    var closestDragWrap = findDraggee( mPoint, dragWraps );  
                    if( !closestDragWrap ) {
                        return true;
                        }
                        ////todo patch
                        if( sapp.sappKey === 'l23' ) {
                            closestDragWrap.pointWrap.achieved.achieved.x = closestDragWrap.pointWrap.x; //mPoint[0];
                            closestDragWrap.pointWrap.achieved.achieved.y = closestDragWrap.pointWrap.y; //mPoint[1];
                    }
                    //ns.d( 'app: ' + down_move_up + ' id=' + draggeePoint.name );
                    detected_user_interaction_effect && detected_user_interaction_effect();
                    selectedElement = closestDragWrap;
                break;
                case 'move': 
                case 'up':
                    selectedElement.doDragUpdate( { down_move_up:down_move_up, move:move } );
                break;
            }
        }
    };
    ///============================================================
    /// \\// inits common framework for the set of  point-draggees
    ///============================================================

}) ();


//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.css.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

    var globalCssCreated_flag = false;

    dpdec.create_individualCss = create_individualCss;
    return;









    function create_individualCss( id, color, parent_classes )
    {

        if( !globalCssCreated_flag ) {
            createGlobal();
        }            

        parent_classes = parent_classes || [''];
        var ret = '';

        // //\\ css /////////////////////////////////////////
        parent_classes.forEach( function( dclass ) {
            dclass = dclass ? '.' + dclass : '';
            ret +=
            `

            /*=============================*/
            /* //\\ parent after           */
            /*=============================*/
            ${dclass} #${id}.brc-slider-draggee:hover:after {
                background-color: ${color};
            }
            /*=============================*/
            /* \\// parent after           */
            /*=============================*/


            /*=============================*/
            /* //\\ animates slider arrows */
            /*=============================*/
            ${dclass} #${id} .brc-slider-draggee-right {
                border-left:15px solid ${color};
            }
            ${dclass} #${id} .brc-slider-draggee-left {
                border-right:15px solid ${color};
            }
            /*=============================*/
            /* \\// animates slider arrows */
            /*=============================*/
            `
        });
        // \\// css /////////////////////////////////////////
        ns.globalCss.addText( ret );
    }


    function createGlobal()
    {
        var ret =

        // //\\ css /////////////////////////////////////////
        `

        /*=============================*/
        /* //\\ parent handler         */
        /*=============================*/
        .brc-slider-draggee {
            position:absolute;
            top:0%;
            width:40px;
            height:40px;
            z-index:1000;
            cursor:pointer;
            /* .good for devel. */
            /* border: 1px solid red; */
            transform: translate(-50%, -50%);
        }

        .brc-slider-draggee.rotate {
            animation: 2s linear 0s infinite normal do-rotate;
        }
        .brc-slider-draggee.axis-y {
            transform: translate(-50%, -50%) rotate(90deg);
        }

        @keyframes do-rotate {
            0% {
	            transform: translate(-50%, -50%) rotate(0deg);
            }
            100% {
	            transform: translate(-50%, -50%) rotate(360deg);
            }
        }
        /*=============================*/
        /* \\// parent handler         */
        /*=============================*/




        /*=============================*/
        /* //\\ parent after           */
        /*=============================*/
        .brc-slider-draggee:hover:after {
            content:''; /* seems vital ... why? */
            position:absolute;
            left:20px;
            top:20px;
            width:15px;
            height:15px;
            transform: translate(-50%, -50%);

            padding-top:0px;
            border-radius: 15px;
            font-size:11px;
            font-weight:bold;
            text-align:center;
            background-color: black;
            z-index:1000;
            cursor:pointer;
        }
        /*=============================*/
        /* \\// parent after           */
        /*=============================*/






        /*=============================*/
        /* //\\ animates slider arrows */
        /*=============================*/
        .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee .brc-slider-draggee-left {
            visibility:hidden;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-right,
        .brc-slider-draggee:hover .brc-slider-draggee-right {
            content:'';
            position:absolute;
            height:1px;
            width:1px;
            top:5px;
            left: 24px;
            left: 20px;
            animation: 4s ease-out 0s infinite normal slider-hover-right;
            visibility:visible;
        }

        .active-tip > .brc-slider-draggee .brc-slider-draggee-left,
        .brc-slider-draggee:hover .brc-slider-draggee-left {
            content:'';
            position:absolute;
            height:1px;
            width:1px;
            left:-10px;
            top:5px;
            animation: 4s ease-out 0s infinite normal slider-hover-left;
            visibility:visible;
        }

        @keyframes slider-hover-right {
            0% {
	            left: 20px;
	            opacity: 0;
            }
            12.5% {
	            opacity: 1;
            }
            25% {
	            left: 40px;
	            opacity: 0;
            }
            100% {
	            left: 40px;
	            opacity: 0;
            }
        }

        @keyframes slider-hover-left {
            0% {
	            left: -10px;
	            opacity: 0;
            }
            12.50% {
	            left: -10px;
	            opacity: 0;
            }
            25% {
	            opacity: 1;
            }
            37.5% {
	            opacity: 0;
	            left: -35px;
            }
            100% {
	            left: -35px;
	            opacity: 0;
            }
        }

        .brc-slider-draggee-right {
            border:15px solid transparent;
            border-left:15px solid grey;
        }
        .brc-slider-draggee-left {
            border:15px solid transparent;
            border-right:15px solid grey;
        }
        /*=============================*/
        /* \\// animates slider arrows */
        /*=============================*/



        `;
        // \\// css /////////////////////////////////////////
        ns.globalCss.addText( ret );
        globalCssCreated_flag = true;
    };
})();



//apparently this module was a derivative from
//  /var/www/html/bwork/vbsl/vendor/bsl/slider/slider-handler.js
(function() {
    var ns     = window.b$l;
    var dpdec  = ns.sn('drag-point-decorator');

    dpdec.addD8D_decorationPoint = addD8D_decorationPoint;
    return;







    ///creates decPoint, properly css-classed html of draggee-point-decorations and
    ///attaches this html to hostDomEl
    function addD8D_decorationPoint(
        hostDomEl,      //usually dragSurface
        cssId,          //optional
        color,          //optional
        parent_classes  //optional
    ) {
        var decPoint = document.createElement( 'div' );
        decPoint.setAttribute( 'class', 'brc-slider-draggee' + ( cssId ? ' ' + cssId : '' ) );
        if( cssId && color ) {
            var fullCssId = 'brc-slider-draggee-' + cssId;
            decPoint.setAttribute( 'id', fullCssId );
            dpdec.create_individualCss( fullCssId, color, parent_classes );
            //later on, don't forget to make ns.globalCss.update();
        }
        hostDomEl.appendChild( decPoint );

        var left = document.createElement( 'div' );
        left.setAttribute( 'class', 'brc-slider-draggee-left' );
        decPoint.appendChild( left );

        var right = document.createElement( 'div' );
        right.setAttribute( 'class', 'brc-slider-draggee-right' );
        decPoint.appendChild( right );
        return decPoint;
    }

})();



//\\// Application Entry
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;
    var rootvm      = sn('rootvm');
    var cssmods     = sn('cssModules');
    var dpdec       = ns.sn('drag-point-decorator');
    var html        = sn('html');

    var fapp        = sn('fapp'); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions',sapp);

    var srg         = sn('sapprg', fapp ); 
    //:nearly a patch
    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var cssmod      = sn('ssCssModules',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var drg         = sn('datarg', fapp ); 

    ssF.tr = tr;
    ssF.tp = tp;

    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // //\\ establishes landing-start-state
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    document.documentElement.className += 'non-loaded';
    $$  .c( 'style' )
        .to( document.head )
        .html(
            "html.non-loaded body { \n" +
                "opacity :0; \n" +
            "} \n" +
            "html body { \n" +
            "    opacity :1; \n" +
            "    transition  :opacity 1s ease-in-out; \n" +
            "} \n"
        );
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // \\// establishes landing-start-state
    //:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    document.addEventListener( "DOMContentLoaded", init );
    //00000000000000000000000000000000000000
    return;
    //00000000000000000000000000000000000000











    //=========================================================
    // //\\ inits full app
    //=========================================================
    function init() 
    {
        //===============================
        // //\\ establishes configuration
        //===============================
        ns.url2conf( fconf );
        sapp.pageMode = ( fconf.lemma && 'lemma'              ) || 'landing';
        var lemmaNumber = ( fconf.lemma && parseInt(fconf.lemma) ) || '';
        sapp.lemmaNumber = lemmaNumber; //todm patch ... not enough generic

        switch( lemmaNumber )
        {
            case 9: 
                    var sappKey = 'lemma9';
                    var dataKey = 'lemma9';
                    break;
            case 2: 
                    var dataKey = 'lemma2';
                    var sappKey = 'l23';
                    break;
            case 3: 
                    var dataKey = 'lemma3';
                    var sappKey = 'l23';
                    break;
        }
        sapp.sappKey = sappKey;
        var srg_modules = sn(sappKey, srg);

        var drg_own = drg[ dataKey ];
        if( lemmaNumber ) {
            Object.keys( srg_modules ).forEach( function( key ) {
                srg_modules[ key ]();
            });
            Object.keys( drg_own.modules ).forEach( function( key ) {
                drg_own.modules[ key ]();
            });
            ssF.init_conf();
            ns.url2conf( fconf ); //overrides subapp conf
        }
        //===============================
        // \\// establishes configuration
        //===============================




        //=======================================
        // //\\ html and css
        //=======================================
        cssmods.initSiteWideCSS(cssp, fconf);
        if( sapp.pageMode === 'lemma' ) {
            sn('ssCssOrder',ss).list.forEach( function( cssName ) {
                ns.globalCss.addText( cssmod[cssName]( cssp, fconf ) );
            });
        }
        ns.globalCss.update();
        document.body.innerHTML = html.body();
        //.must be called fapproot
        rootvm.approot          = document.querySelector( '.' + cssp + '-approot' ); //binds to app root
        ns.create_mobile_tester(rootvm.approot,fconf.mobileDetectorMediaThreshold);
        fapp.initBurgerMenu_8_navDrawerShade();
        //=======================================
        // \\// html and css
        //=======================================



        //==============================================
        // //\\ lemma-page-router
        //==============================================
        if( sapp.pageMode === 'lemma' ) { initLemma(); }
        //==============================================
        // \\// lemma-page-router
        //==============================================



        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // //\\ removes landing-start-state
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        //.todmm ... why without 1s transition the landing flickers?
        //todm ... use regEx to cooperate with other frameworks on html-element
        document.documentElement.className =
            document.documentElement.className.replace( 'non-loaded', '' );
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        // \\// removes landing-start-state
        //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        fmethods.setupSiteWideEvents();
    }
    //=========================================================
    // \\// inits full app
    //=========================================================




    //=======================================
    // //\\ lemma-page-router
    //=======================================
    function initLemma()
    {
        fmethods.createLemmaDom();
        sapp.init_sapp();
        sapp.isInitialized = true;
        //.does initial transclusion
        fmethods.test_mobile_and_attach_exegesis_tabs();
        //.sets default ... disabled so "Area-legend" cannot be a default
        //.because of sapp.isInitialized, we can set tabs and menus
        rg['mobile-tabs'][ sconf.defaultMobileTabSelection ].click();
        fmethods.setupEvents();
        fmethods.fullResize();
    }
    //=======================================
    // \\// lemma-page-router
    //=======================================




    ///function "to registry"
    ///does register model unit if not yet exist
    ///useful to prevent unit's duplication
    function tr( id, key, val )
    {
        rg[ id ] = rg.hasOwnProperty( id ) ? rg[ id ] : {};
        if( key ) { rg[ id ][ key ] = val; }
        return key ? val : rg[ id ];
    }
    function tp( id, val )  { return tr( id, 'pos', val ); }    //pos to registry

}) ();


// //\\// site-wide conf
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);






    //====================================================
    // //\\ put configuration parameters here
    //====================================================
    to_fconf =
    {
        //--------------------
        // //\\ site-wide
        //--------------------
        //:scenario
        enabledLemmas : [2,3,9],
        startLemmaReadingNumber : 2,
        LANDING_MODE : 'claim',
        TEXT_MODE : 'text-none',
        //:data
        svgNS :  "http://www.w3.org/2000/svg",
        //--------------------
        // \\// site-wide
        //--------------------



        //--------------------
        // //\\ page-wide
        //--------------------
        // //\\ view
        //--------------------

        //.below this value, JS considers the device as a mobile
        mobileDetectorMediaThreshold : 800,

        model_float_dir : 'right', //vs left
        exegesis_floats : false,
        DRAG_POINTS_THROTTLE_TIME : 50, //ms
        DRAGGEE_HALF_SIZE : 40, //px
        NAVIGATION_DECORATIONS_ALWAYS_VISIBLE : false,
        appview :
        {
            lemmaRomanNumbers :
            [
                'o', 'i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 
                'x', 'xi', 'xii', 'xiii', 'xiv', 'xv', 'xvi'
            ]
        },

        dragPointDecoratorClasses :
        [ 'text--hypertext', 'text--english' ],
        //--------------------
        // \\// view
        //--------------------

        //developer's proposals
        //these constants are used for development planning: they are not needed for application
        approvalGranted: {},
        //fconf.approvalGranted[ 'area-fragments-manager-to-link-with-app' ] = true;

        ORIGINAL_FIGURE_VISIBILITY_SLIDER_ENABLED : false,
        ORIGINAL_FIGURE_VISIBILITY : 0.6,
        ORIGINAL_FIGURE_VISIBILITY_ANIMATION_DURATION_MS : 3000,
        //--------------------
        // \\// page-wide
        //--------------------
    };
    //====================================================
    // \\// put configuration parameters here
    //====================================================




    ///spawns config to its final place
    Object.keys( to_fconf ).forEach( function( key ) {
        fconf[ key ] = to_fconf[ key ];
    });

}) ();


// //\\// file where to set plugin main configuration
( function() {
    var ns      = window.b$l;
    var fapp    = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);




    //====================================================
    // //\\ optionally overriden by url-query-config
    //====================================================
    to_sconf =
    {

        defaultMobileTabSelection : 'claim-og',
        //defaultMobileTabSelection : 'proof-og',

        mediaOffset : [ 0, 0 ],                 //in respect to media-root
        mediaDefaultWidthPercent : 40,          //in respect to total width
        MINIMAL_MEDIA_CONTAINER_WIDTH : 350,    //todm approximate
        main_horizontal_dividor_width_px : 21,

        //:submenus
        submenus :
        {
            proof: {
                list:
                [
                    { id:'claim' },
                    { id:'proof' }
                ],
                'default' : 'claim'
            },

            text: {
                appMDSource: 'texts',
                list:
                [
                    { id:'latin',   caption:'Latin' },
                    { id:'english', caption:'English' },
                    { id:'hypertext', caption:'Lite' }
                ],
                'default' : 'hypertext'
            }
            /* worked
            ,decorations: {
                list:
                [
                    { id:'origin'},
                    { id:'modern'},
                    { id:'both' }
                ],
                'default' : 'both'
            }
            */
        }
    };
    //====================================================
    // \\// optionally overriden by url-query-config
    //====================================================

    //adds to_sconf to commong sconf
    Object.keys( to_sconf ).forEach( function( key ) {
        sconf[ key ] = to_sconf[ key ];
    });

}) ();


( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);





    ssD.videoList =
    [
        {   // L2
            caption        : 'Claim explanation',
            //=============================================================
            // //\\ this option actually restricts presence of a video clip
            //in absense of this option or its suboptions, the clip
            //added to wider set of app. modes
            //=============================================================
            lemmaNumber    : 2,
            modeType       : { 'proof':'claim',
                               'text':'hypertext'
                            },
            //=============================================================
            // \\// this option actually restricts presence of a video clip
            //=============================================================
            isExternal     : true, //"false" must work ... todo: do reseach why does not work
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L02Claim.mp4"
        },
        {
            caption        : 'Proof explanation',
            lemmaNumber    : 2,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L02Proof.mp4"
        },
        {
            caption        : 'Claim explanation',
            lemmaNumber    : 3,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L03Claim.mp4"
        },
        {
            caption        : 'Proof explanation',
            lemmaNumber    : 3,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L03Proof.mp4"
        },
        {
            caption        : 'Claim explanation',
            lemmaNumber    : 9,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L09Claim.mp4"
        },
        {
            caption        : 'Proof explanation',
            lemmaNumber    : 9,
            modeType       : { 'proof':'claim'
                            },
            isExternal     : true,
            URL            :"http://sciencehike.com/original/NewtonPrincipia/content-guide/B1S1L09Proof.mp4"
        }
    ];

}) ();


// //\\// App config

( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sapp        = sn('sapp');

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000





    function setModule()
    {
        ssF.init_conf = init_conf;
    }

    function init_conf()
    {
        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        var pictureWidth = 282;
        var pictureHeight = 290;
        var activeAreaOffsetX = 31.5;
        var activeAreaOffsetY = 29;
        //.set it from graph editor
        var pictureActiveArea = 259 - activeAreaOffsetY;
        //----------------------------------
        // \\// original material parameters
        //----------------------------------



        //----------------------------------
        //:app view parameters
        //----------------------------------
        var MONITOR_Y_FLIP = 0;




        //=====================================
        // //\\ configures application engine
        //=====================================
        Object.assign( sconf,
        {

            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            innerMediaHeight    : pictureHeight,
            innerMediaWidth     : pictureWidth,
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------


            //:model
            baseMax         : 500,
            ctrlPtXYs_js    :
            [
                {x:activeAreaOffsetX,             y: activeAreaOffsetY},
                {x:85,          y: 51.5},
                {x:139,         y: 89.0},
                {x:193,         y: 148.5 },
                {x:248,         y: 259.5 }
            ],

            //.widths coinsided with dashed-rect ... set to empty array if not to match dashed rect
            //baseWidths_for_lemma3 : [41, 69, 53.5, 53.5],
            baseWidths_for_lemma3 : [],

            ////GUI
            svgns           : "http://www.w3.org/2000/svg",
            FINEPTS_RADIUS  : 20,
            MOVABLE_BASE_RADIUS : 4,
            CTRL_RADIUS     : 5,
	        BASE_POINTS_REPELLING_DISTANCE : 5, //formerly PAD

            //:d8d
            DRAG_POINTS_THROTTLE_TIME : 0, // 3 //300 //ms, softens drag8drop on performance-weak-devices
            DRAGGEE_HALF_SIZE : 20, //"rectangular-distance" to point to be detected

            GENERIC_COLOR       : '0, 0, 0',
            CORE_CURVE_COLOR    : '160, 0, 0',
            CORE_AREA_COLOR     : '0,125,0',
            REMOTE_AREA_COLOR   : '0,0,255',
            FIGURE_COLOR        : '0,97,0'
        });

        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        sconf.tfamilyColor =
        {
            generic         : sconf.GENERIC_COLOR,
            claim           : sconf.CORE_AREA_COLOR,
            proof           : sconf.REMOTE_AREA_COLOR,
            'primary-curve' : sconf.CORE_CURVE_COLOR,
            'figure'        : sconf.FIGURE_COLOR
        };
        //=====================================
        // \\// configures application engine
        //=====================================
    };


}) ();



// //\\// if css order is important, set it here
(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssCssOrder  = sn('ssCssOrder',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        ssCssOrder.list =
        [
            'slider',
            'model',
            'widget-media'
        ];
    }


    

})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;
    var fapp        = sn('fapp'); 

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var modulesCount = sn('modulesCount', sapp);
    modulesCount.count = modulesCount.count ? modulesCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + modulesCount.count ] = setModule;

    var cssName     = 'widget-media';
    return;





    function setModule() {

        cssmod[ cssName ] = function( cssp ) {


            // //\\ css /////////////////////////////////////////
            var ret = `

    .bsl-media {
        position:absolute;
        width:100%;
        left:0;
        top:0;
        opacity:1;
        z-index:10;
    }


    .bsl-bg-image {
        width:100%;
        left:0;
        top:0;
        z-index:9;
    }



/*==========================================*/
/* //\\ bsl-media                           */
/*==========================================*/
.bsl-media .phantom {
    fill:transparent;
    stroke:green;
}
/*
svg {
    boder:40px solid red;
}
*/
/*==========================================*/
/* \\// bsl-media                           */
/*==========================================*/



        `;
        // \\// css /////////////////////////////////////////


        return ret;
        };
    }
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var fapp        = sn('fapp'); 
    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var modulesCount = sn('modulesCount', sapp);
    modulesCount.count = modulesCount.count ? modulesCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + modulesCount.count ] = setModule;

    var cssName     = 'slider';
    return;





    function setModule() {

        cssmod[ cssName ] = function( cssp, fconf ) {

            //var cssmods = sn('cssModules');
            //var THIS_MODULE = 'slider';
            var ccs = fconf.css;
            var colorMain = ccs['color-main'];
            var colorWhite = ccs['color-white'];
            var colorMediumGrey = ccs['color-medium-grey']; 
            var colorLightGrey = ccs['color-light-grey']; 
            var colorPaleBlue = ccs['color-pale-blue']; 
            var colorStoneBlue = ccs['color-stone-blue']; 
            var colorLight = ccs['color-light']; 
            var borderRadius = ccs['border-radius']; 


            // //\\ css /////////////////////////////////////////
            var ret = `

    


/*~~~~~~~~~~~~~~~~~~~~
Styles for the model slider range
~~~~~~~~~~~~~~~~~~~~*/
.slider-group {
  display: flex;
  flex-direction: column;
  height: 24px; }

input[type=range] {
  -webkit-appearance: none;
  /* Hides the slider so that custom slider can be made */
  width: 100%;
  /* Specific width is required for Firefox. */
  background: transparent;
  /* Otherwise white in Chrome */
  height: 0px !important; }

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none; }

input[type=range]:focus {
  outline: none;
  /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */ }

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;
  -moz-appearance: none;
  height: 0px !important;
  /* Hides the slider so custom styles can be added */
  background: transparent;
  border-color: transparent;
  color: transparent; }

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid ${colorMain};
  height: 12px;
  width: 12px;
  border-radius: 40px;
  background: ${colorWhite};
  cursor: pointer;
  margin-top: -5px;
  /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */ }

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  border: 2px solid ${colorMain};
  height: 8px;
  width: 8px;
  border-radius: 40px;
  background: ${colorWhite};
  cursor: pointer; }

/* All the same stuff for IE */
input[type=range]::-ms-thumb {
  border: 2px solid ${colorMain};
  height: 12px;
  width: 12px;
  border-radius: 40px;
  background: ${colorWhite};
  cursor: pointer; }

input[type=range] {
  width: 40%;
  height: 2px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]::-webkit-slider-runnable-track {
  width: 40%;
  height: 2px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]:focus::-webkit-slider-runnable-track {
  background: ${colorMain}; }

input[type=range]::-moz-range-track {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]::-ms-track {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  color: transparent;
  margin: 0 auto; }

input[type=range]::-ms-fill-lower {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]:focus::-ms-fill-lower {
  background: ${colorMain}; }

input[type=range]::-ms-fill-upper {
  width: 40%;
  height: 0px;
  cursor: pointer;
  background: ${colorMain};
  border-radius: 1.3px;
  margin: 0 auto; }

input[type=range]:focus::-ms-fill-upper {
  background: ${colorMain}; }

.slider {
  width: 40%; }

#mySlider {
  z-index: 1;
  margin-bottom: 8px; }

.slider-label {
  text-align: center;
  display: inline-block;
  margin: 0 auto; }


`;
// \\// css /////////////////////////////////////////


            return ret;
        };
    }
})();



(function() {
    var ns  = window.b$l;
    var sn  = ns.sn;

    var fapp        = sn('fapp'); 
    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var modulesCount = sn('modulesCount', sapp);
    modulesCount.count = modulesCount.count ? modulesCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + modulesCount.count ] = setModule;

    var cssName     = 'model';
    return;





    function setModule() {

        //var cssmods = sn('cssModules');
        //var THIS_MODULE = 'model-l23';
        //cssmods[THIS_MODULE] = function( cssp, fconf ) {

        cssmod[ cssName ] = function( cssp, fconf ) {
            var ccs = fconf.css;
            var colorMain = ccs['color-main'];
            var colorWhite = ccs['color-white'];
            var colorMediumGrey = ccs['color-medium-grey']; 
            var colorLightGrey = ccs['color-light-grey']; 
            var colorPaleBlue = ccs['color-pale-blue']; 
            var colorStoneBlue = ccs['color-stone-blue']; 
            var colorLight = ccs['color-light']; 
            var borderRadius = ccs['border-radius']; 



// //\\ css /////////////////////////////////////////
var ret = `

    

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* _model.scss                    */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



.rect {
  stroke-width: 1;
  /* fill-opacity: 0.15; */
  stroke-opacity: 1; }

.figure {
  stroke: ${colorMain};
  fill: ${colorMain};
  color: ${colorMain};
  /*r:2.4;*/ }

.outline {
  fill: transparent;
  stroke-width: 2; }


.flex {
  display: flex !important; }

.circumscribed {
  stroke: ${colorMain};
  fill: transparent;
  color: ${colorMain}; }
  .circumscribed.label {
    fill: ${colorMain}; }

.inscribed {
  stroke: ${colorMain};
  fill: transparent;
  color: ${colorMain}; }
  .inscribed.label {
    fill: ${colorMain}; }

.label {
  stroke-width: .6; }

.number {
  text-align: right;
  font-family: Lucida Console;
  min-width: 48px;
  width: 100%;
  max-width: 64px;
  margin-right: 8px; }

svg text {
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "essonnes-display",serif; }

.slider {
  width: 80%; }


#widthest-visib-toggler-wrap {  /* row in legend line for widthes rectangle */
  display: flex;
}

#lemma2.bsl-approot .label.f,
#lemma2.bsl-approot .label.F,
#lemma2.bsl-approot #widthest-visib-toggler-wrap,
#lemma2.bsl-approot .bsl-approot.proof--claim .widthest-rectangular,
.bsl-approot.proof--claim #widthest-visib-toggler-wrap,
.bsl-approot.proof--claim .widthest-rectangular {
    display:none;
}

/* legend */
.areas .highlighted {
    font-weight :bold;
}


/* //\\ subapplication (lemma 2, 3 specific) fix;
        removes hidden rects from topic engine
*/
.inscribed.rect.tofill.topicid-inscribed-rectangles[visibility="hidden"],
.circumscribed.rect.tofill.topicid-circumscribed-rectangles[visibility="hidden"] {
    visibility:hidden;
}
/* \\//  subapplication (lemma 2, 3 specific) fix; */

/*
.text--english .tfamily-figure.tofill, .text--hypertext .tfamily-figure.tofill
tofill topicid-figure tfamily-figure topicid-figure-area hidden
*/

.tfamily-figure.tofill.hidden {
    visibility:hidden;
}

`;
// \\// css /////////////////////////////////////////




            return ret;
        };
    }
})();



// //\\// Main entrance into sub-application.

        // TODO: graphic artist help
        // fade descriptions
        // ?form color coded in/circ
        // nn bases location fix
        // B&W squares in Newton's?
        // Scale with screen size
        // MY TODO
        // clean up code

(function() {
    var ns          = window.b$l;
    var $$          = ns.$$;    
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 

    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions', sapp);

    var ss          = sn('ss', fapp);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return;





    function setModule()
    {
        sapp.init_sapp =  init_sapp;
    }

    function init_sapp()
    {
        var l23         = ss;
        var study       = sn('study', l23 );
        var gui         = sn('gui', l23 );
        var guicon      = sn('guiConstruct', gui );

        l23.presetData();
        gui.constructWidthestRectangular();
        guicon.constructFigure();
        
        study.eventHandlers.toggleChangeFigure();
        sapp.upcreate();
        gui.buildSlider();

        //:initMediaModel
        sDomF.topicModel_2_css_html();
        sapp.readyToPopulateMenu = true;
        sDomF.populateMenu();
        gui.createDragModel();

        study.setupEvents();
    };


}) ();



// //\\// App config

( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sapp        = sn('sapp');
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss',fapp);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000






    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var dr          = sn('datareg', l23 );
        var appstate    = sn('appstate', l23 );

        l23.presetData = function()
        {
            //=====================================
            // //\\ presets data
            //=====================================
            Object.assign( dr,
            {
                svgSeg          : document.getElementById( 'illus' ),
                polylineCurve   : document.getElementById( 'polylineCurve' ),
                figureInternalArea : document.getElementById( 'figureInternalArea' ),

                //tod? right: 
                baseAxis        : document.getElementById( 'baseAxis' ),
                //baseAxis        : document.getElementById( 'base' ),

                wallL           : document.getElementById( 'wallL' ),
                wallR           : document.getElementById( 'wallR' ),

                basePts         : {offset:1, visOffset:0, list:[]},
                curvPts         : {offset:1, visOffset:0, list:[]},
                leftPts         : {offset:0, visOffset:0, list:[]},
                righPts         : {offset:0, visOffset:0, list:[]},
                righRects       : {offset:0, visOffset:0, list:[]},
                leftRects       : {offset:0, visOffset:0, list:[]},
                baseLabels      : {offset:1, visOffset:0, list:[]},
                curvLabels      : {offset:0, visOffset:0, list:[]},
                leftLabels      : {offset:0, visOffset:0, list:[]},
                righLabels      : {offset:0, visOffset:0, list:[]},
                figureBasics    : {minX:0, maxX:0, baseY:0, deltaOnLeft:true},
                ctrlPts         : [],
                baseWidths      : sapp.lemmaNumber === 3 ? sconf.baseWidths_for_lemma3 : [],
                bases           : 4,
                movables        : {} //key-value for movable jswrap
            });
            sDomN.mmedia = dr.svgSeg;

            appstate.movingBasePt = false;
            appstate.showRectPts  = false;
            sdata.view = { isClaim:1, isInscribed:1, isCircumscribed:1 };
            //=====================================
            // \\// presets data
            //=====================================
        };
    }
}) ();



( function() {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var $$          = ns.$$;
    var sn          = ns.sn;

    var fapp        = sn('fapp' ); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp'); 
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss',fapp);
    var ssF         = sn('ssFunctions',ss);
    var ssD         = sn('ssData',ss);
    var rg          = sn('registry',ssD);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;







    function setModule()
    {
        ssF.create8prepopulate_svg  = create8prepopulate_svg;
        ssF.create_digital_legend   = create_digital_legend;
        ss.menuExtraWork            = menuExtraWork;
    }


    function menuExtraWork( mtype, mid )
    {
        if( mtype !== 'text' || sapp.sappKey !== 'l23'  ) return;
        ///=========================================================================
        /// //\\ 2) Switch: This controls the translation switch ...?Newton/informal
        ///      function l23_english_latin_switch()
        ///=========================================================================
        var isHyper = mid === 'hypertext';
        document.querySelectorAll('.label').forEach( function( el ) {
            el.style.visibility = isHyper ? 'hidden' : 'visible';
        });

        var addRem = isHyper ? 'addClass' : 'removeClass';
        var wVideo = document.querySelector('.video-desktop');
        //.todm querySelectorAll ?
        wVideo && ( wVideo.style.visibility = isHyper ?'hidden' : 'visible');
        //.area labels color vs black toggle
        $$.$(document.querySelector('.areas'))[addRem]('dull');

        /*
        //conflicts with topic-engine colors
        document.querySelectorAll('.model').forEach( function( el ) {
            $$.$(el)[addRem]( 'informalcolor' );
        });
        */

        /*
        //todm what for? n/i ?
        if( !isHyper ) {
            //$('.informal').hide(); //apparently sets switch-default-position
        } else {
            //$('.informal').show();
        }
        */
        ///-------------------------------------------------------------------------
        /// //\\ apparently toggles all colored goodies of informal text
        ///-------------------------------------------------------------------------
        ///translates the description text, changes the model style from b&w to color 
        /*
        function translate(){
            //todm make fade
            $('.desc').find('.informal, .newton').fadeToggle( "fast", "linear" );
            //todm make fade
            $('.video-desktop').toggle();
            $('.label').toggle();
            $('.model').toggleClass('informalcolor');
            $('.areas').toggleClass('dull');//area labels color vs black toggle
        }
        */
        ///-------------------------------------------------------------------------
        /// \\// apparently toggles all colored goodies of informal text
        /// \\// 2) Switch: This controls the translation switch ...?Newton/informal
        ///=========================================================================
    }

    function create8prepopulate_svg()
    {
        //..........................
        // //\\ study image
        //..........................
        sDomN.bgImage$ = $$
            .c( 'img' )
            .a( 'class', cssp +'-bg-image' )
            .a( 'src', 'content-img/lemma-23-3rd-ed.png' )
            .to( sDomN.medRoot )
            ;
        //..........................
        // \\// study image
        //..........................


        //====================================================================
        // //\\ makes media-draw-area
        //====================================================================
        var svg = sDomN.mmedia = sDomN.svg = $$.cNS( 'svg' )
            .aNS( 'id',     'illus' )
            .aNS( 'class',   cssp +'-media' )
            .aNS( 'version', '1.1' ) //todo ??
            .aNS( 'viewBox', '0 0 ' +
                             sconf.innerMediaWidth + ' ' +
                             sconf.innerMediaHeight )
            .aNS( 'baseProfile', "full" ) //magic todo? //todm ?
            //todo magic: https://stackoverflow.com/questions/
            //            16438416/cross-browser-svg-preserveaspectratio
            .aNS( 'preserveAspectRatio', "xMidYMid meet" )  //todm ?
            .to( sDomN.medRoot )
            ();
        //====================================================================
        // \\// makes media-draw-area
        //====================================================================



        //====================================================================
        // //\\ paints preliminary elements
        //====================================================================
        $$.cNS( 'ellipse' )
            .aNS( 'id', 'outline' )
            .aNS( 'stroke', "#ff88ff" )
            .aNS( 'stroke-opacity', "1" )
            .aNS( 'stroke-width', "2px" )
            .aNS( 'fill', "red" )
            .aNS( 'fill-opacity', "1" )
            .aNS( 'cx', "100" )
            .aNS( 'cy', "100" )
            .aNS( 'rx', "2" )
            .aNS( 'ry', "2" )
            .aNS( 'display', "none" )
            .css( "position", "absolute" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'baseAxis' )
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'wallL' )
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'line' )
            .aNS( 'id', 'wallR' )
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        $$.cNS( 'polyline' )
            .aNS( 'id', 'polylineCurve' )
            .aNS( 'class', "figure outline tostroke" )
            .to(svg)
            ;

        sDomN.figureInternalArea$ = $$.cNS( 'polyline' )
            .aNS( 'id', 'figureInternalArea' )
            .aNS( 'class', "tofill" )
            .to(svg)
            ;

        $$.c('div')
            .addClass("slider-group")
            .to( sDomN.medRoot )
            .html(`
                <input class="slider" type="range" id="mySlider">
                <span class="slider-label" style="width:99px">
                    <span id="baseSpan" class="number"></span>
                    <span id="baseLabelSpan"></span>
                </span>
            `);
        //====================================================================
        // \\// paints preliminary elements
        //====================================================================
    }

    function create_digital_legend()
    {
        sDomN.digitalLegend$ = $$  .c('div')
            .to( sDomN.medRoot )
            .a('id',"areadesk")
            .a('class',"areas dull desc default-content main-legend")
            .html(`

                <div class="line"></div>
                <div id="two" class="desc__header">
                    <h2 class="desc__header-title">Areas</h2>
                </div>


                <div class="circumscribed  areas__checkboxes-row">
                    <div class="checkbox-wrap">
                        <input id="toggleCircumscribed" type="checkbox" name="option" 
                               class="checkbox circumscribed" checked>
                        <label for="toggleCircumscribed"></label>
                    </div>
                    <span class="number">
                        <span class="circAmtd" id="circAmtd"></span>
                    </span>
                    <span class="tag circumscribed-tag">circumscribed</span>
                </div>
                <!--END Circumscribed-->



                <!-- copy pasted from lemma2.html -->
                <div class="figure  areas__checkboxes-row">
                    <div class="checkbox-wrap">
                        <input id="checkbox_4" type="checkbox" name="option"
                               class="checkbox figure"
                               onclick="window.b$l.fapp.ss.gui.showFig()"
                               checked>
                        <label for="checkbox_4"></label>
                    </div>
                    <span class="number">
                        <span class="figAmt" id="figAmt">100.0</span>
                    </span>
                    <span>figure</span>
                </div>
                <!--END figure-->


                <div class="inscribed areas__checkboxes-row">
                    <div class="checkbox-wrap">
                        <input id="toggleInscribed" type="checkbox" name="option" 
                               class="checkbox inscribed" checked>
                        <label for="toggleInscribed"></label>
                    </div>
                    <span class="number">
                        <span class="inAmt" id="inAmtd"></span>
                    </span>
                    <span class="tag inscribed-tag">inscribed</span>
                </div>
                <!--END inscribed-->


                <div class="areas__checkboxes-row"
                     id="widthest-visib-toggler-wrap">
                    <div class="checkbox-wrap" style="visibility:hidden;">
                        <input id="checkbox_3" type="checkbox" name="option" 
                               class="checkbox">
                        <label for="checkbox_3"></label>
                    </div>
                    <span class="number">
                        <span class="diffAmtm" id="diffAmtd"></span>
                    </span>
                    <span class="tag proof-tag">end rectangle</span>
                </div>



        `);

    }

}) ();


// //\\// application-level d8d module
( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var dpdec       = ns.sn('drag-point-decorator');
    var fapp        = ns.sn('fapp' );
    var fmethods    = sn('methods',fapp);
    var d8d_p       = sn('d8d-point',fmethods);

    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sacf        = sconf;

    var ss          = sn('ss',fapp);
    var datareg     = sn('datareg', ss );
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);

    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions', sapp);
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    return;
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~









    function setModule()
    {
        var l23         = ss
        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );
        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );

        gui.createDragModel = createDragModel;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        return;
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~









        function createDragModel(
        ) {
            var doDragUpdate;

            sDomF.medD8D = d8d_p.createFramework (
                findDraggee,
                datareg.svgSeg.parentNode,
                false,
                sDomF.detected_user_interaction_effect
            );

            var createDragUpdate = sDomF.medD8D.createDragUpdate;
            setupDragUpdates();
            //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
            return;
            //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr








            function setupDragUpdates() {
                if( sapp.lemmaNumber === 3 ) {
                    ////todo-patch-disable-base-drag 2 of 2
                    datareg.basePts.list.forEach( function( pointWrap, pwix ) {

                        pointWrap.name = 'base-'+pwix;     //optional for css
                        pointWrap.finalColor='black';      //optional

                        if( typeof pointWrap.x === 'number' ) {
                            //ccc( 'set ix=' + pwix );
                            var decorator = update_decPoint;
                        } else {
                            var decorator = null;
                        }
                        createDragUpdate({
                            pointWrap:pointWrap,
                            doProcess:doProcess,

                            //.todm ... disabled ... needs more work
                            update_decPoint:null, //decorator,

                            //nop: achieved: { x:pointWrap.x, y:pointWrap.y } 
                            achieved: { x:null, y:null } 
                         });

                        ///decorates DraggeeHoverer movement    
                        function update_decPoint( decPoint )
                        {
                            if( pointWrap.x || pointWrap.x === 0 ) {
                                var dompos = sDomF.medpos2dompos.call( { medpos:[pointWrap.x,pointWrap.y ] } );
                                //ccc( 'run ix=' + pwix +' x='+pointWrap.x +' dompos=', dompos );
                                decPoint.style.left = dompos[0] + 'px';            
                                decPoint.style.top = dompos[1] + 'px';            
                            }
                        }
                    });
                }
                //todo: dragWraps
                datareg.ctrlPts.forEach( function( pointWrap, pwix ) {
                        pointWrap.name = 'ctrl-'+pwix;     //optional for css
                        pointWrap.finalColor='black';      //optional
                        createDragUpdate({
                            pointWrap:pointWrap,
                            doProcess:doProcess,

                            //.todm ... disabled ... needs more work
                            update_decPoint:null, //update_decPoint,


                            //nop: achieved: { x:pointWrap.x, y:pointWrap.y } 
                            achieved: { x:null, y:null } 
                        });
                        ///decorates DraggeeHoverer movement    
                        function update_decPoint( decPoint )
                        {
                            return; //todo ... blocks control drag
                            if( pointWrap.x || pointWrap.x === 0 ) {
                                var dompos = sDomF.medpos2dompos.call( { medpos:[pointWrap.x,pointWrap.y ] } );
                                decPoint.style.left = dompos[0] + 'px';            
                                decPoint.style.top = dompos[1] + 'px';            
                            }
                        }
                });
                ns.globalCss.update(); //for decorator ... todm very easy to forget and be in pain ...
            }


            function doProcess( arg )
            {
                if( arg.down_move_up === 'move' ) {
                    var ach = arg.pointWrap.achieved;
                    var se = arg.pointWrap;
                    move2js( se, arg.move, ach );
                    guiup.xy2shape( se.dom, "cx", se.x, "cy", se.y );
        	        //.l23.refreshSVG();
                    sapp.upcreate();
                }
            }


            //====================
            // //\\ finds draggee
            //====================
            ///Gets movable and visible point which is closest to testPoint.
            function findDraggee( testPoint, dragWraps )
            {
                //////////////////////////////////////////////////////////
                // //\\ todo. d8d points tmp patch.
                testPoint = sDomF.dompos2medpos( testPoint );
                // \\// todo. d8d points tmp patch.
                //////////////////////////////////////////////////////////

                var DRAGGEE_HALF_SIZE = sacf.DRAGGEE_HALF_SIZE;
                var bases = dr.bases;
                var closestPoint = null;
                var closestDragWrap = null;

                dragWraps.forEach( function( dwrap ) {
                    findClosestPoint( dwrap );
                });

                function findClosestPoint( dwrap )
                {
                    var dragPoint = dwrap.pointWrap;
                    if( 
                        //.excludes "invisible" ("non-thick") points on axis x
                        dragPoint.type === 'base' && dragPoint.index >= bases ||
                        dragPoint.visible === false
                    ) {
                        return;
                    }
                    var tdX = Math.abs( testPoint[0] - dragPoint.x );
                    var tdY = Math.abs( testPoint[1] - dragPoint.y );
                    var td  = Math.max( tdX, tdY );
                    if( td <= DRAGGEE_HALF_SIZE ) {
                        if( !closestPoint || closestPoint.td > td ) {
                            closestPoint = { td:td, pt:dragPoint };
                            closestDragWrap = dwrap;
                        }
                    }
                };
                if( closestDragWrap ) {
                    return closestDragWrap;
                } else {
                    return null;
                }
            }
            //====================
            // \\// finds draggee
            //====================


            //======================================
            // //\\ event to js
            //======================================
            function move2js( pointWrap,move, ach )
            {
                var item = pointWrap;
                var index = item.index;
	            if ( "ctrl" === item.type ) {
	                item.x = ach.achieved.x + move[0];
	                item.y = ach.achieved.y + move[1];;
		            appstate.movingBasePt = false;

	            } else if( index > 0 && index < dr.bases ) {

		            var newX = ach.achieved.x + move[0];
                    // //\\ limitifies newX by dom-neighbors
	                var PAD         = sacf.BASE_POINTS_REPELLING_DISTANCE;
                    var lst         = dr.basePts.list;
                    var itemM       = lst[index];   //middle
                    var itemL       = lst[index-1]; //left
                    var itemR       = lst[index+1]; //right
	                newX            = Math.max( newX, itemL.x + PAD );
	                newX            = Math.min( newX, itemR.x - PAD );
                    // \\// limitifies newX by dom-neighbors

                    // //\\ applies newX to js-model
                    itemM.x = newX;        
                    dr.baseWidths[index-1] = itemM.x - itemL.x;
	                dr.baseWidths[index]   = itemR.x - itemM.x;
                    // \\// applies newX to js-model

                    //. todo: plays only in function updatePts(i, x) ... what for?
		            appstate.movingBasePt = true;
	            }
                return item;
            }
            //======================================
            // \\// event to js
            //======================================
        }

    }

}) ();


( function () {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var sapp        = sn('sapp'); 
    var fapp        = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);

    var ss          = sn('ss',fapp);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000






    function setModule()
    {
        var l23         = ss;

        var gui         = sn('gui', l23 );
        var guicon      = sn('guiConstruct', gui );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );
        var sacf        = sconf;

        guicon.constructSingle_dom  = constructSingle_dom;
        guicon.constructFigure      = constructFigure;
        return;
        //*************************************
        // execution end
        //*************************************








        //======================================
        // //\\ constructFigure
        //======================================
        function constructFigure()
        {
            var baseMax = sacf.baseMax;
	        // labels
	        /*constructLabels(dr.curvLabels.list, "figure tostroke", 'abcde');
	        constructLabels(dr.baseLabels.list, "figure tostroke", 'ABCDE');
	        constructLabels(dr.leftLabels.list, "inscribed tostroke", 'KLMNO');
	        constructLabels(dr.righLabels.list, "circumscribed tostroke", 'lmnop');
            */
            
	        // rects
	        constructShapesList("rect", dr.righRects, baseMax, "circumscribed rect tofill tostroke");
	        constructShapesList("rect", dr.leftRects, baseMax, "inscribed rect tofill tostroke");

	        // rectangle points
	        if (appstate.showRectPts) {
		        constructPts(dr.leftPts, baseMax, "inscribed tofill tostroke", sacf.FINEPTS_RADIUS);
		        constructPts(dr.righPts, baseMax, "circumscribed tofill tostroke", sacf.FINEPTS_RADIUS);
		        constructPts(dr.curvPts, baseMax, "figure tofill tostroke", sacf.FINEPTS_RADIUS);
	        }
	        constructBasePts_dom(appstate.showRectPts, dr.basePts);

	        // control points
            var ctrlPts = dr.ctrlPts;
	        for (var i=0, len=sacf.ctrlPtXYs_js.length; i < len; i++) {
		        dr.ctrlPts.push( constructCtrlPt( i ) );
	        }
        }
        //======================================
        // \\// constructFigure
        //======================================













        //==================================
        // //\\ constructs points and shapes
        //==================================
        function constructBasePts_dom( show, basePts )
        {
            //.this restriction is done via css ... the rect is simply hidden
	        //.if( sapp.lemmaNumber === 3 ) {
            //   constructEndBasePt_dom(basePts, show ? "figure" : "todm-fix-this");

            constructEndBasePt_dom(basePts, show ? "figure" : "todm-fix-this");

	        for (var i=1, len=sacf.baseMax; i <= len; i++) {
      		    pt = constructDraggablePt_dom( "base", i );
		        if( sapp.lemmaNumber === 3 ) {
		            guiup.set_pt2movable( pt ); //todo-patch-disable-base-drag 1 of 2
                }
      		    basePts.list.push( pt );
                //ccc( 'must be full p', pt ) todo
	        }
            function constructEndBasePt_dom( basePts, style )
            {
	            var pdom = constructSingleInList_dom( "circle", basePts.list, style );
                //.makes end point of the same structure as movable points
                basePts.list[ basePts.list.length-1 ] = { dom:pdom };

                // //\\ patch: todm-fix-this
	            //pdom.setAttributeNS(null, "r", sacf.FINEPTS_RADIUS);
	            pdom.setAttributeNS(null, "stroke", 'transparent');
	            pdom.setAttributeNS(null, "fill", 'transparent');
                // \\// patch: todm-fix-this
            }
        };


        ///creates svg-circle-tag with unit-transform and and appends it to svg-root
        function constructDraggablePt_dom( type, i )
        {
            var key  = type + i;
	        var pdom = document.createElementNS( sacf.svgns, "circle");
	        dr.svgSeg.appendChild( pdom );
	        pdom.setAttributeNS( null, "id", key );
	        pdom.setAttributeNS( null, "draggable", "false" ); //todo ... redundant? ...
            var draggable = { dom:pdom, type:type, index:i, id:key };
            dr.movables[ key ] = draggable;
            return draggable;
        }

        ///dom
        function constructCtrlPt( i )
        {
            var ctrlPtXYs_js = sacf.ctrlPtXYs_js; 
	        var pt = constructDraggablePt_dom( "ctrl", i );
            var pdom = pt.dom;
	        //pdom.setAttributeNS(null, "class", "movable ctrlPt tofill");
	        pdom.setAttributeNS(null, "class", "movable ctrlPt");
	        //$$.$(pdom).addClass("movable ctrlPt tofill");


//start here: ccc( 'ctrl pt=', pt )
	        pdom.setAttributeNS(null, "cx", ctrlPtXYs_js[i].x);
	        pdom.setAttributeNS(null, "cy", ctrlPtXYs_js[i].y);
	        pdom.setAttributeNS(null, "r", sacf.CTRL_RADIUS);
            pt.x = ctrlPtXYs_js[i].x;
            pt.y = ctrlPtXYs_js[i].y;
	        return pt;
        }

        // //\\ constructs shapes
        ///dom
        function constructPts( list, n, style, r )
        {
	        for (var i=0; i<n+list.offset; i++){
		        var shape = constructSingleInList_dom("circle", list.list, style);
		        shape.dom.setAttributeNS(null, "r", r);
	        }
        }
        ///dom
        function constructSingleInList_dom( shapeType, list, classStyle )
        {
	        var sdom = constructSingle_dom( shapeType, classStyle );
	        list.push( sdom );
	        return sdom;
        }
        function constructSingle_dom( shapeType, classStyle, textContent )
        {
	        var sdom = document.createElementNS( sacf.svgns, shapeType);
	        sdom.setAttributeNS(null, "class", classStyle);
	        sdom.setAttributeNS(null, "visibility", "hidden");
            if( textContent ) { sdom.textContent = textContent; }
	        dr.svgSeg.appendChild( sdom );
	        return sdom;
        }
        ///dom
        function constructShapesList(shape, list, n, style) {
	        for (var i=0; i<n+list.offset; i++){
		        constructSingleInList_dom(shape, list.list, style);
	        }
        }
        ///dom
        function constructLabels(list, style, content) {
	        for (var i=0; i<content.length; i++){
		        var l = constructSingleInList_dom("text", list, style+" label");
		        l.textContent = content.slice(i, i+1);
	        }
        }
        // \\// constructs shapes
        //==================================
        // \\// constructs points and shapes
        //==================================
    }
}) ();


( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);
    var sacf    = sconf;

    var ss          = sn('ss',fapp);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );

        //=====================================
        // //\\ does gui configuration
        //=====================================
        Object.assign( sacf,
        {
            //:slider config
            MINP            : 1,
            MAXP            : 50
        });
        //=====================================
        // \\// does gui configuration
        //=====================================




        //======================================
        // //\\ exports module
        //======================================
        Object.assign( gui, {
	        buildSlider: buildSlider
        });
        //======================================
        // \\// exports module
        //======================================




        //======================================
        // //\\ slider
        //======================================
        function buildSlider()
        {
            //.appar. slider-for-base-points-number
	        var slider = document.getElementById("mySlider");
	        slider.setAttributeNS( null, "min", sacf.MINP );
	        slider.setAttributeNS( null, "max", sacf.MAXP );

            //.appar. sets current base-points-number
	        slider.setAttributeNS( null, "value", dr.bases );

	        var sliderOutput = document.getElementById("baseSpan");
	        var baseLabel = document.getElementById("baseLabelSpan");
	        showBasesNumberInGui( sliderOutput, baseLabel );

	        slider.oninput = function() {
                appstate.movingBasePt = false; // better way?
		        var newB = interpretSlider( this.value );
		        sliderEvent( newB-dr.bases, newB, dr.basePts );
		        dr.bases = newB;
		        showBasesNumberInGui( sliderOutput, baseLabel );
		        sapp.upcreate();
          	}

            function sliderEvent(bd, newBases, basePts) {
                sDomF.detected_user_interaction_effect();
            	//var baseDelta = bd;
	            for (var i=newBases-bd; i<newBases; i++) {
    		        if( sapp.lemmaNumber === 3 ) {
    		            guiup.set_pt2movable( basePts.list[i] );
                    }
	            }
                var baseWidths = dr.baseWidths;
	            for (var i=newBases; i < newBases-bd; i++) {
		            baseWidths[i] = undefined;
	            }
            }

            function showBasesNumberInGui( sliderOutput, baseLabel )
            {
	            sliderOutput.innerHTML = dr.bases;
	            baseLabel.innerHTML = dr.bases === 1 ? " base":" bases";
            }

            function interpretSlider(val){
	            const maxLinV = 20; //linear through 20
	            if (val <= maxLinV) {
		            return parseInt(val);
	            }
	            const minV = Math.log(maxLinV);
	            const maxV = Math.log(sacf.baseMax);
	            var scale = (maxV-minV) / (sacf.MAXP-maxLinV);
	            return Math.round(Math.exp(minV + scale*(val-maxLinV)));
            }
        }
        //======================================
        // \\// slider
        //======================================
    }
}) ();


( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf   = ns.sn('fconf',fapp);
    var sconf   = ns.sn('sconf',fconf);
    var sacf    = sconf;

    var ss          = sn('ss',fapp);
    var ssModes     = sn('ssModes',ss);

    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var sDomF       = sn('dfunctions', sapp);
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );
        var sdata       = sn('sdata', study );


        //======================================
        // //\\ exports module
        //======================================
        Object.assign( guiup, {

            updatePtsRectsLabelsAreas   : updatePtsRectsLabelsAreas,
            updateFigureBasicsJS        : updateFigureBasicsJS,
            normalizedStr               : normalizedStr,

            set_pt2movable  : set_pt2movable,
	        updateLabel     : updateLabel,
	        updateRectLike  : updateRectLike,
            xy2shape        : xy2shape,
            xy_2_xy8shape   : xy_2_xy8shape,
            calculate8paintCurve_8_paintAxes : calculate8paintCurve_8_paintAxes
        });
        //======================================
        // \\// exports module
        //======================================




        function xy2lineShape( line,x1,y1,x2,y2 )
        {
	        line.setAttribute("x1", x1);
	        line.setAttribute("y1", y1);
	        line.setAttribute("x2", x2);
	        line.setAttribute("y2", y2);
        }
        ///2 use cases: base, ctrl ...
        function xy_2_xy8shape( item, xName, x, yName, y )
        {
            item.x = x;
            item.y = y;
	        item.dom.setAttributeNS( null, xName, x );
	        item.dom.setAttributeNS( null, yName, y );
        }
        function xy2shape( item, xName, x, yName, y )
        {
	        item.setAttributeNS( null, xName, x );
	        item.setAttributeNS( null, yName, y );
        }
        function y2cy(item, y)
        {
	        item.setAttributeNS( null, "cy", y );
        }
        function updateLabel( item, x, y )
        {
            //xy2shape( item, "x", x, "y", y );
        }
        ///updates item with rectangular parameters x, y, width, height
        function updateRectLike(item, x, y, width, height) {
	        xy2shape(item, "x", x, "y", y);
	        item.setAttributeNS(null, "width", width);
	        item.setAttributeNS(null, "height", height);
        }


        function set_pt2movable( pt )
        {
            pt.dom.setAttributeNS(null, "class", "movable figure");
            pt.dom.setAttributeNS(null, "r", sacf.MOVABLE_BASE_RADIUS);
            pt.movable = true;
        }


        function calculate8paintCurve_8_paintAxes()
        {
            var ff = numModel.f;

            ///calculates curve
	        var delta           = 3;
	        var curveMicroPts   = [];
            var figureArea      = 0;
            var fb              = dr.figureBasics;
	        var oldY            = 2 * fb.baseY-ff(fb.minX);
	        for (var xx = fb.minX; xx < fb.maxX; xx+=delta) {
		        var yy = ff( xx );
		        curveMicroPts.push([xx,yy]);
		        figureArea += (delta*(fb.baseY-(yy+oldY)/2));
		        oldY = yy;
	        }

            //:paints curve
	        var yy = ff( fb.maxX );
	        curveMicroPts.push([fb.maxX,yy]);
            dr.figureArea = figureArea + ((fb.maxX-xx+delta)*(fb.baseY-(yy+oldY)/2));
	        dr.polylineCurve.setAttribute( "points",curveMicroPts.join(" ") );
            //:paints axes
	        var yy = fb.baseY;
	        var x1 = fb.minX;
	        var x2 = fb.maxX;
	        xy2lineShape( dr.baseAxis,x1,yy,x2,yy );
	        xy2lineShape( dr.wallL,x1,yy,x1, ff(x1) );
	        xy2lineShape( dr.wallR,x2,yy,x2, ff(x2) );


            //=============================================
            // //\\ paints figureInternalArea
            //=============================================
            //var figureInternalArea = curveMicroPts.concat([[x1,yy]]);
            var wfirstPoint = curveMicroPts[0];
            var wlastPoint = curveMicroPts[curveMicroPts.length-1];
            //.this code connects four points two tips on base and first and end
            //.points on curve making base as a part of area perimeter
            var figureInternalArea = curveMicroPts.concat([
                [wlastPoint[0] ,yy], [wfirstPoint[0] ,yy] 
            ]);
            var figureInternalAreaStr = figureInternalArea.join(" ");
	        dr.figureInternalArea.setAttribute( "points",figureInternalAreaStr );
            //=============================================
            // \\// paints figureInternalArea
            //=============================================


            // //\\ sets curves type

	        l23.adjustVisibilityForBaseDelta();

            // //\\ resets app modes
            var wfirst = curveMicroPts[0];
            var wlast = curveMicroPts[curveMicroPts.length-1];
            //:note: y axis is apparently flipped, bottom > top
            //:dr.figureBasics.deltaOnLeft is already calculated and
            //:can be used
            //:and means decresing function witm max on left
            ssModes[ 'highest y is on the right' ] =  wfirst[1] > wlast[1];
            // \\// resets app modes

        }





        //========================================
        // //\\ possibly move to gui-update module
        //========================================
        ///gui-model
        function updateFigureBasicsJS()
        {
            var ctrlPts = dr.ctrlPts;
	        var max = numModel.ctrlPt_2_maxIx();
	        var min = numModel.ctrlPt_2_minIx();
            var fb  = dr.figureBasics;
	        fb.minX = ctrlPts[min].x;
	        fb.maxX = ctrlPts[max].x;
            
	        if (ctrlPts[max].y > ctrlPts[min].y) {
		        fb.baseY = ctrlPts[max].y;
		        fb.deltaOnLeft = true;
		        dr.leftLabels.offset = -1;
		        dr.righLabels.visOffset = 0;
		        dr.curvLabels.visOffset = 0;
		        dr.curvLabels.offset = 0;
	        } else {
		        fb.baseY = ctrlPts[min].y;
		        fb.deltaOnLeft = false;
		        dr.leftLabels.offset = 0;
		        dr.righLabels.visOffset = 1;
		        dr.curvLabels.visOffset = 1;
		        dr.curvLabels.offset = 1;
	        }
        }

        function updateLeft(i,width,x,y,nextX,nextY)
        {
            var fb  = dr.figureBasics;
	        if (appstate.showRectPts)
		        guiup.xy2shape( dr.leftPts.list[i], "cx", x, "cy", nextY ); 
	        guiup.updateRectLike( dr.leftRects.list[i], x, Math.min(nextY, fb.baseY), width, Math.abs( fb.baseY-nextY));
	        if (i< dr.bases-1 && i< dr.leftLabels.list.length) {
		        guiup.updateLabel( dr.leftLabels.list[i], x-20, nextY+3);
	        }
	        //todo why?: already done: dr.leftRects.list[i].setAttributeNS(null, "class", "inscribed rect");
        }
        function updateRigh(i,width,x,y,nextX,nextY)
        {
            var fb  = dr.figureBasics;
	        if (appstate.showRectPts)
		        guiup.xy2shape( dr.righPts.list[i], "cx", nextX, "cy", y );
	        guiup.updateRectLike( dr.righRects.list[i], x, Math.min(y, fb.baseY), width, Math.abs( fb.baseY-y));
	        if (i<dr.righLabels.list.length) {
		        guiup.updateLabel( dr.righLabels.list[i], nextX-5, y-10);
	        }		
        }
        function updatePts(i, x)
        {
            var fb  = dr.figureBasics;
	        if (!appstate.movingBasePt) {
		        guiup.xy_2_xy8shape( dr.basePts.list[i], "cx", x, "cy", fb.baseY );
	        }
	        if (appstate.showRectPts) {
		        guiup.xy_2_xy8shape( dr.curvPts.list[i], "cx", x, "cy", numModel.f(x) );
	        }
	        if (i< dr.baseLabels.list.length) {
		        guiup.updateLabel( dr.baseLabels.list[i], x-5, fb.baseY+20 );
	        }
        }
        function updatePtsRectsLabelsAreas()
        {
            var fb  = dr.figureBasics;
	        var x = fb.minX;
            var bases = dr.bases;

        	//.var useInitialWidest = true; //kvk: I don't understand what is this for ... probably need more background on "Principia"
	        //.gui.widthStart(figureBasics, bases);
	        dr.sumWidth = numModel.calcSumBaseWidth( bases );

            var circumscribedArea = 0
	        var inscribedArea = circumscribedArea;
	        for (var i=0; i<bases; i++) {
		        var width = numModel.nextWidth(i);
		        var y = numModel.f(x);
		        var nextX = x + width;
		        var nextY = numModel.f(nextX);
		        if (i< dr.curvLabels.list.length) {
			        guiup.updateLabel( dr.curvLabels.list[i], x-15, y+(i==0?-5:15));
		        }
		        updateRigh(i,width,x,y,nextX,nextY);
		        circumscribedArea += (width*( fb.baseY-y));
		        updateLeft(i,width,x,y,nextX,nextY);
		        inscribedArea += width*( fb.baseY-nextY);
		        if (i< dr.righLabels.list.length) {
			        guiup.updateLabel( dr.righLabels.list[i], nextX-5, y-10);
			        guiup.updateLabel( dr.leftLabels.list[i], x-20, nextY+3);
		        }
		        updatePts(i, x);
		        x += width;
	        }
	        updatePts( bases, x);
	        gui.widthEnd( dr.basePts.list[bases].dom, appstate.showRectPts, sdata.view );
	        document.getElementById("figAmt").innerHTML = ((Math.sign( dr.figureArea )==-1)?"-":"" )+ "100.0";

	        //tod? document.getElementById("inAmt").innerHTML = normalizedStr( inscribedArea, dr.figureArea);
	        document.getElementById("inAmtd").innerHTML = normalizedStr( inscribedArea, dr.figureArea);

	        //tod? document.getElementById("circAmt").innerHTML = normalizedStr( circumscribedArea, dr.figureArea);
	        document.getElementById("circAmtd").innerHTML = normalizedStr( circumscribedArea, dr.figureArea);
        }

        function normalizedStr( amt )
        {
	        return (100*amt/Math.abs(dr.figureArea)).toFixed(1);
        }
        //========================================
        // \\// possibly move to gui-update module
        //========================================

    }
}) ();


( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var ss          = sn('ss',fapp);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);

    var sapp        = sn('sapp');
    var amode       = sn('mode',sapp);
    var sDomF       = sn('dfunctions', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var gui         = sn('gui', l23 );
        var guiup       = sn('guiUpdate',gui);
        var numModel    = sn('numModel', l23 );
        var dr          = sn('datareg', l23 );
        var appstate    = sn('appstate', l23 );

        
        ///same in meaning to legacy !view.isNewton property
        sapp.isLite = function()
        {
            return amode.text === 'hypertext';
        };



        //======================================
        // //\\ exports module
        //======================================
        sapp.upcreate = refreshSVG_master;
        Object.assign( l23, {
	        //refreshSVG_master               : refreshSVG_master,
            //refreshSVG                      : refreshSVG_master,
            adjustVisibilityForBaseDelta    : adjustVisibilityForBaseDelta,
            show_LPR                        : show_LPR
        });
        //======================================
        // \\// exports module
        //======================================






        //======================================
        // //\\ view top-manager
        //======================================
        function refreshSVG_master() {
	        guiup.updateFigureBasicsJS();
	        show_LPR();
	        guiup.calculate8paintCurve_8_paintAxes();
	        guiup.updatePtsRectsLabelsAreas(); // depends on curveArea
            sDomF.medD8D && sDomF.medD8D.updateAllDecPoints();
            sDomF.repopulateContent();
        }
        //======================================
        // \\// view top-manager
        //======================================




        //======================================
        // //\\ manages visibility
        //======================================
        ///shows vis. for Labels, Points, Rects
        function show_LPR()
        {
            var view = sdata.view;
	        setVisibilityGap(dr.curvLabels, !sapp.isLite() );
	        setVisibilityGap(dr.baseLabels, !sapp.isLite() );

	        if (appstate.showRectPts) {
		        setVisibilityGap(dr.leftPts, view.isInscribed);
		        setVisibilityGap(dr.righPts, view.isCircumscribed);
	        }

	        setVisibilityGap(dr.leftRects, view.isInscribed);
	        setVisibilityGap(dr.leftLabels, !sapp.isLite() && view.isInscribed);

	        setVisibilityGap(dr.righRects, view.isCircumscribed);		
	        setVisibilityGap(dr.righLabels, !sapp.isLite() && view.isCircumscribed);
	        gui.show_widthest_claim_labels( view );
        }

        ///fills visibility in items' list 
        ///     gap: items.visOffset <= ii && ii < end
        ///     by value vis
        function setVisibilityGap( items, vis )
        {
	        var end = Math.min(items.list.length, dr.bases+items.offset);
            items.list.forEach( function( item, ix ) {
                var visib = items.visOffset <= ix && ix < end && vis ? "visible" : "hidden";
                ( item.dom || item ).setAttributeNS( null, "visibility", visib );
                ( item.dom || item ).style.visibility = visib; //vital line
            });
        }

        function adjustVisibilityForBaseDelta() {
	        if (appstate.showRectPts)
		        setVisibilityGap(dr.curvPts,1);
	        setVisibilityGap(dr.basePts,1);
	        show_LPR();
        }
        //======================================
        // \\// manages visibility
        //======================================

    }

}) ();


( function () {
    var ns          = window.b$l;
    var $$          = ns.$$;    
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);
    var sacf        = sconf;

    var ss          = sn('ss',fapp);
    var ssF         = sn('ssFunctions',ss);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;

        var study       = sn('study', l23 );
        var gui         = sn('gui', l23 );
        var guicon      = sn('guiConstruct', gui );
        var guiup       = sn('guiUpdate',gui);
        var appstate    = sn('appstate', l23 );
        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );
        var sdata       = sn('sdata', study );







        //===============================================
        // //\\ presets data
        //===============================================
        Object.assign( dr,
        {
            labelf      : null,
            labelF      : null,
            faaf        : null
        });
        //===============================================
        // \\// presets data
        //===============================================




        //===============================================
        // //\\ widthest-rect
        //===============================================
        gui.constructWidthestRectangular = function()
        {
            dr.labelf = guicon.constructSingle_dom( "text", "figure label f", "f" );
            dr.labelF = guicon.constructSingle_dom( "text", "figure label F", "F" );
            dr.faaf   = ( function() {
	                        var x = document.createElementNS( sacf.svgns, "rect");
	                        //not in use: x.setAttributeNS(null, "class", "dottedRect");
	                        dr.svgSeg.appendChild(x);
	                        return x;
            })();
            $$.$(dr.faaf).addClass( 'widthest-rectangular tofill tostroke' );
            //redundant ... class works well: ssF.tr( 'widthest-rectangular', 'domel', dr.faaf );
        };

        gui.widthEnd = function(pt, showRectPts, view)
        {
            var fb = dr.figureBasics;
	        pt.setAttributeNS(null, "class", "figure");
	        pt.setAttributeNS(null, "r", showRectPts ? sacf.FINEPTS_RADIUS : 0);
	        if (fb.deltaOnLeft) {
		        var x = fb.minX; //x of control point
		        var y = numModel.f(x);
                //.offset and sizes
		        guiup.updateRectLike(
                        dr.faaf, x, Math.min(y, fb.baseY),
                        dr.widest, Math.abs(fb.baseY-y));
	        } else {

                // //\\ somehow this does not work
		        //var x = 100; //fb.maxX;
		        //var y = numModel.f(x);
		        //guiup.updateRectLike(
                //        dr.faaf, x-dr.widest,
                //        Math.min(y, fb.baseY), dr.widest, Math.abs(fb.baseY-y));
                // \\// somehow this does not work

                var x = fb.maxX-dr.widest;
                var y = numModel.f(x);
		        guiup.updateRectLike(
                        dr.faaf,
                        x, Math.min(y, fb.baseY),
                        dr.widest, Math.abs(fb.baseY-y));
                //ccc(fb.minX, fb.maxX, ' dr.widest='+dr.widest );
		        dr.widest *= -1;
	        }
	        guiup.updateLabel( dr.labelf, x+dr.widest-3, y-10);
	        guiup.updateLabel( dr.labelF, x+dr.widest-5, fb.baseY+20);
	        //tod? document.getElementById("diffAmt").innerHTML =
	        document.getElementById("diffAmtd").innerHTML =
                guiup.normalizedStr( Math.abs( dr.widest * (fb.baseY-y)) );
        };
        gui.show_widthest_claim_labels = function( view )
        {
            var visib = !sapp.isLite() && !sdata.view.isClaim ? "visible":"hidden";
//ccc( !sapp.isLite(), view.isClaim );
	        dr.labelf.setAttributeNS(null, "visibility", visib );
            dr.labelf.style.visibility = visib; //vital line
	        dr.labelF.setAttributeNS(null, "visibility", visib );
            dr.labelF.style.visibility = visib; //vital line
        };
        //===============================================
        // \\// widthest-rect
        //===============================================


    }

}) ();


( function () {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss',fapp);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        var l23         = ss;


        var dr          = sn('datareg', l23 );
        var numModel    = sn('numModel', l23 );



        //==================================
        // //\\ declares data
        //==================================
        Object.assign( dr,
        {
            //:GUI

            //:mathModel
            sumWidth    : null,
            widest      : null,
            figureArea  : null

        });
        //==================================
        // \\// declares data
        //==================================








        //==================================
        // //\\ exports methods
        //==================================
        Object.assign( numModel, {
	        f: f,
	        ctrlPt_2_maxIx: ctrlPt_2_maxIx,
	        ctrlPt_2_minIx: ctrlPt_2_minIx,
            calcSumBaseWidth: calcSumBaseWidth,
            nextWidth: nextWidth
        });
        //==================================
        // \\// exports methods
        //==================================





        ///should be interpolated function via control points
        function f(x) {
            //.in legacy code, this depends on order of modules-load "intergral.js" must be before "model.js"
            const pts = dr.ctrlPts;
	        var sum = 0;
	        for (var i=0; i<pts.length; i++) {
		        var num = pts[i].y;
		        var den = 1;
		        for (var j=0; j<pts.length; j++) {
			        if (j == i) {
				        continue;
			        }
			        num *= (x - pts[j].x);
		        }
		        for (var j=0; j<pts.length; j++) {
			        if (j == i) {
				        continue;
			        }
			        var diff = pts[i].x - pts[j].x;
			        if (diff != 0) {
				        den *= diff;
			        } else {
				        den = .4;
			        }
		        }
		        sum += (num/den);
	        }
	        return sum;
        }

        ///finds index of control point with maximum x
        function ctrlPt_2_maxIx()
        {
            const pts = dr.ctrlPts;
	        var xi;
            var n;
	        for (var i=0; i<pts.length; i++) {
		        if ( !i || pts[i].x > n) {
			        n = pts[i].x;
			        xi = i;
		        }
	        }
	        return xi;
        }
        ///finds index of control point with minimum x
        function ctrlPt_2_minIx() 
        {
            const pts = dr.ctrlPts;
	        var xi;
            var n;
	        for (var i=0; i<pts.length; i++) {
		        if ( !i || pts[i].x < n) {
			        n = pts[i].x;
			        xi = i;
		        }
	        }
	        return xi;
        }





        //==================================
        // //\\ widths
        //==================================
        ///todm: this fun. and calcSum... are seen as too convoluted ...
        ///      what do they do?
        function nextWidth(i)
        {
	        dr.baseWidths[i] = dr.baseWidths[i] / dr.sumWidth *
                                (dr.figureBasics.maxX-dr.figureBasics.minX);
	        if ( !i || dr.baseWidths[i] > dr.widest) {
		        dr.widest = dr.baseWidths[i];
	        }
	        return dr.baseWidths[i];
        };

        //----------------------------------
        // //\\ calculates normalized widths
        //----------------------------------
        function calcSumBaseWidth( bases )
        {
            //what does it do?: ccc( 'start',dr.baseWidths );
	        var sum = 0;
	        var meanWidth = 0;
	        if( !dr.baseWidths.length ) {
		        meanWidth = 1;
		        dr.baseWidths[0] = meanWidth;
	        }
	        for (var i=0; i<bases; i++) {
		        if ( typeof dr.baseWidths[i] === 'undefined' ) {
        		    meanWidth = meanWidth || sum / i;
			        dr.baseWidths[i] = meanWidth;
		        }
		        sum += dr.baseWidths[i];
	        }
	        return sum;
        }
        //----------------------------------
        // \\// calculates normalized widths
        //----------------------------------
        //==================================
        // \\// widths
        //==================================

    }
}) ();





( function () {
    var ns          = window.b$l;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
	var bsl	        = ns;
    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss',fapp);
    
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var sDomN       = sn('dnative', sapp);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    return;







    function setModule()
    {
        var l23         = ss;
        var study       = sn('study', l23 );
        var sdata       = sn('sdata', study );
        var numModel    = sn('numModel', l23 );
        var gui         = sn('gui', l23 );
        var dr          = sn('datareg', l23 );

        sdata.curveDragHandlesVisible = true;
        study.eventHandlers =
        {
            toggleChangeFigure  : toggleChangeFigure,
	        toggleInscribed     : toggleInscribed,
	        toggleCircumscribed : toggleCircumscribed
        };
        study.setupEvents = setupEvents;
        return;



        function setupEvents()
        {
            Object.keys( study.eventHandlers ).forEach( function( methodName ) {
                //todo these things are too different to art-pack ... skips them for now
                if( 'toggleChangeFigure' === methodName ) return;

                document.getElementById( methodName )
                    .addEventListener( 'click', study.eventHandlers[ methodName ] );
            });


            // //\\ copy-pasted from gui-art
            //$( ".model" ).on("mouseenter mouseleave",function() {
            $( '.' + cssp + '-media' ).on("mouseenter mouseleave",function() {
                toggleChangeFigure();
                $('.help-box__text').text($('.help-box__text').text() == 
                    'Hover over the diagram to interact' ?
                    'Drag the dot to alter the diagram' :
                    'Hover over the diagram to interact');
            });
            
            gui.showFig = function(){ //in legacy-art-gui is referenced in lemma2.html
                //no good: var cbox = document.getElementById('checkbox_4').getAttribute('checked');
                //no good: if($('.figur').is(':checked'))  {
                var checked = document.getElementById('checkbox_4').checked;
                if(checked)  {
                    $('.outline').toggle();
                    sDomN.figureInternalArea$.removeClass('hidden');
                }else{
                    $('.outline').toggle();
                    sDomN.figureInternalArea$.addClass('hidden');
                }
            }
            // \\// copy-pasted from gui-art
        };




        //======================================
        // //\\ event-handlers
        //======================================
        function toggleInscribed() {
	        sdata.view.isInscribed^=1;
	        l23.show_LPR();
        }

        function toggleCircumscribed() {
	        sdata.view.isCircumscribed^=1;
	        l23.show_LPR();
        }

        ///toggles mode for curve-shape is-draggable/non-draggable
        function toggleChangeFigure(){
            var cvis = sdata.curveDragHandlesVisible = !sdata.curveDragHandlesVisible;
	        for (var i=0, len = dr.ctrlPts.length; i < len; i++) {
                //.as of version 91, used in mouse-down point-detection
                dr.ctrlPts[i].visible = !!cvis; 
		        dr.ctrlPts[i].dom.setAttributeNS(null, "visibility", cvis ? "visible":"hidden");
	        }
        }
        //======================================
        // \\// event-handlers
        //======================================






        //todo 	        gui.show_widthest_claim_labels( view );
    }

}) ();



( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('l23', srg);
    var sapp        = sn('sapp');
    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        topics.convert_lineFeed2htmlBreak = false;
        topics.topicDef =
        {
            ///do fill this map as desired,
            ///left side = text-link; right-side = array of topic's shapeId's, ...
            ///shapeId can be found in media-model.js


            'figure':
            { 
                    classQuery:'#baseAxis, #wallL, #polylineCurve,' +
                               ' .figure.areas__checkboxes-row, #figureInternalArea',
                    tfamily :'figure' //topicColor:'auto'
            },

            'base':
            {
                    classQuery:'#baseAxis',
                    tfamily :'figure'
            },

            'wall':
            {
                    classQuery:'#wallL',
                    tfamily :'figure'
            },

            'curve':
            { 
                    classQuery:'#polylineCurve, .ctrlPt',
                    tfamily :'figure' //topicColor:'auto'
            },

            'figure-area' :
            { 
                    classQuery:'#figureInternalArea',
                    tfamily :'figure'
            },

            'widthest-rectangular':
            { 
                    //id:['widthest-rectangular'],
                    classQuery:'.proof-tag, .widthest-rectangular, .diffAmtm',
                    //tfamily :'proof',
                    topicColor:'auto'
            },

            'circumscribed-rectangles':
            { 
                classQuery:'.circumscribed.rect, .circumscribed-tag, ' +
                           '.circumscribed.areas__checkboxes-row',
                topicColor:'auto'
            },

            //worked fine: 'inscribed-rectangles':{ id:[ 'inscribed-tag' ], classQuery:'.inscribed.rect',
            'inscribed-rectangles':
            { 
                classQuery:'.inscribed.rect, .inscribed.areas__checkboxes-row',
                topicColor:'auto'
            }
        };
    }


}) ();


// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma2', drg);
    var drg_modules = sn('modules', drg_own);
    drg_modules.textClaims = textClaims;
    return;


    function textClaims()
    {
        rawTexts.claim = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.



///// next text: ////////////////////
hypertext : `
        Consider any |figure|figure|| bounded by a |curve|curve||, a |base|base||, and a |wall|side||. 
        Its |base|base|| can be divided into any number of equal-length bases
        for |inscribed-rectangles|inscribed rectangles|| and |circumscribed-rectangles|circumscribed rectangles||. 
        If we increase the number of these rectangles indefinitely, 
        then the areas of the |figure|figure||, the |inscribed-rectangles|inscribed rectangles||, and the
        |circumscribed-rectangles|circumscribed rectangles|| all converge to the same value.
`,





///// next text: ////////////////////
english : `
        If in any figure |figure|AacE||, 
        comprehended by the straight lines |wall|Aa|| and |base|Ae|| and the |curve|curve acE||, 
        any number of parallelograms |inscribed-rectangles|Ab, Bc, Cd||, ... 
        are inscribed upon equal bases AB, BC, CD, ...

        and have sides Bb, Cc, Dd, ... 
        parallel to the |wall|side Aa|| of the figure; 
        and if the parallelograms aKbl, bLcm, cMdn, ... are completed; 
        if then the width of these parallelograms is diminished and their number increased indefinitely, 

        I say that the ultimate ratios which the |inscribed-rectangles|inscribed figure AKbLcMdD||, 
        the |circumscribed-rectangles|circumscribed figure AalbmcndoE||, 
        and the |figure|curvilinear figure AabcdE|| 
        have to one another are ratios of equality.

`,


///// next text: ////////////////////
latin : `
        Si in figura quavis |figure|AacE|| 
        rectis |wall|Aa||, |base|AE||, & |curve|curva acE|| comprehensa, 
        inscribantur parallelogramma quotcunq; |inscribed-rectangles|Ab, Bc, Cd||, 
        &c. sub basibus AB, BC, CD, &c. æqualibus, 

        & lateribus Bb, Cc, Dd, &c. 
        figuræ |wall|lateri Aa|| parallelis contenta; 
        & compleantur parallelogramma aKbl, bLcm, cMdn, &c. 
        Dein horum parallelogrammorum latitudo minuatur, & numerus augeatur in infinitum: 

        dico quod ultimæ rationes, quas habent ad se invicem figura |inscribed-rectangles|inscripta AKbLcMdD||, 
        |circumscribed-rectangles|circumscripta AalbmcndoE||, 
        & |figure|curvilinea AabcdE||, 
        sunt rationes æqualitatis.
`
//=================================================
// \\// Do fill texts here
//=================================================




};}
}) ();


// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma2', drg);
    var drg_modules = sn('modules', drg_own);
    drg_modules.textProofs = textProofs;
    return;




    function textProofs()
    {
        rawTexts.proof = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.

///// next text: ////////////////////
latin : `
            Nam figuræ |inscribed-rectangles|inscriptæ|| & |circumscribed-rectangles|circumscriptæ|| differentia 
            est summa parallelogrammorum Kl + Lm + Mn + Do, 
            hoc est (ob æquales omnium bases)
            rectangulum sub unius basi Kb 
            & altitudinum summa Aa, id est rectangulum |widthest-rectangular|ABla||. 
            
            Sed hoc rectangulum, eo quod latitudo ejus AB in infinitum minuitur, sit minus quovis dato. 
            Ergo per Lemma I, figura |inscribed-rectangles|inscripta|| & |circumscribed-rectangles|circumscripta|| & 
            multo magis |figure|figura curvilinea|| intermedia fiunt ultimo æquales. Q. E. D.
`,


///// next text: ////////////////////
english : `
            For the difference of the |inscribed-rectangles|inscribed|| and |circumscribed-rectangles|circumscribed|| figures 
            is the sum of the parallelograms Kl, Lm, Mn, and Do, 
            that is (because they all have equal bases), 
            the rectangle having as base Kb (the base of one of them) 
            and as altitude |wall|Aa|| (the sum of the altitudes), that is, the rectangle |widthest-rectangular|ABla||.

            But this rectangle, because its width AB is diminished indefinitely, becomes less than any given rectangle. 
            Therefore (by lem. 1) the |inscribed-rectangles|inscribed figure|| and the |circumscribed-rectangles|circumscribed figure|| and, 
            all the more, the intermediate |figure|curvilinear figure|| become ultimately equal.  Q.E.D.

`,


///// next text: ////////////////////
hypertext :
[
     `
            The diffference in area between the |inscribed-rectangles|inscribed rectangles|| and |circumscribed-rectangles|circumscribed rectangles|| 
            is equal to the area of a |widthest-rectangular|single rectangle|| on the end. 
            As the number of rectangles is increased indefinitely, the width of each
            decreases indefinitely, including the |widthest-rectangular|single rectangle|| just mentioned. 
            Since its width decreases indefinitely,
            its area decreases indefinitely, becoming arbitrarily close to 0. So the difference between the areas of the
            |inscribed-rectangles|inscribed rectangles||, the
            |circumscribed-rectangles|circumscribed rectangles||, and the |figure|figure|| in between them becomes arbitrarily close to 0. For the current figure, 
            that |widthest-rectangular|single rectangle|| is on the `,

            //this is a sample how to set dependency on application mode:
            //application modes store is in the JS-object: ns.fapp.ss.ssData.ssModes'
            //see, for example, how ssModes is set in module gui-update.js:
            //  ssModes[ 'highest y is on the right' ] =  wfirst[1] > wlast[1];
            //  in other words format is: ssModes[key]=boolean-value
            //  the same key is used below
            //if no key is set, then 'default' is in use:
            {
                'default' : 'left',
                'highest y is on the right' : 'right',
            },

            `.`
]

//=================================================
// \\// Do fill texts here
//=================================================



};}
}) ();

// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma3', drg);
    var drg_modules = sn('modules', drg_own);
    drg_modules.textClaims = textClaims;
    return;






    function textClaims()
    {
        rawTexts.claim = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.


///// next text: ////////////////////
latin : `
        Eædem rationes ultimæ sunt etiam rationes æqualitatis, ubi parallelogrammorum latitudines AB, BC, CD, &c. 
        sunt inæquales, & omnes minuuntur in infinitum.
`,





///// next text: ////////////////////
english : `
        <dense class='orig';>The same ultimate ratios are also ratios of equality when the widths AB, BC, CD,... 
        of the parallelograms are unequal and are all diminished indefinitely.</dense>
`,




///// next text: ////////////////////
hypertext : `
        Even if the lengths of the |base|bases|| are unequal, the areas of the |figure|figure||, 
        the |inscribed-rectangles|inscribed rectangles||,
        and the |circumscribed-rectangles|circumscribed rectangles|| 
        <i>still</i> all converge to the same value.
`
//=================================================
// \\// Do fill texts here
//=================================================




};}
}) ();


// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma3', drg);
    var drg_modules = sn('modules', drg_own);
    drg_modules.textProofs = textProofs;
    return;




    function textProofs()
    {
        rawTexts.proof = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.

///// next text: ////////////////////
latin : `
            Sit enim AF æqualis latitudini maximæ 
            & compleatur |widthest-rectangular|parallelogrammum FAaf||. 
            Hoc erit majus quam differentia 
            |inscribed-rectangles|figuræ inscriptæ|| & |circumscribed-rectangles|figuræ circumscripta||;
            at latitudine sua AF in infinitum diminuta, 
            minus fiet dato quovis rectangulo. Q. E. D.
`,

english : `
            <dense class='orig';>For let AF be equal to the greatest width, 
            and let the |widthest-rectangular|parallelogram FAaf|| be completed. 
            This parallelogram will be greater than the difference of 
            the |inscribed-rectangles|inscribed|| and |circumscribed-rectangles|circumscribed|| figures; 
            but if its width AF is diminished indefinitely, 
            it will become less than any given rectangle.  Q.E.D.</dense>
`,

hypertext :
[   `
            We can create a |widthest-rectangular|new end rectangle|| whose area is greater or equal to 
            the difference in area between the 
            |inscribed-rectangles|inscribed|| and |circumscribed-rectangles|circumscribed|| rectangles. 
            We guarantee it is no smaller than the difference by making its base equal 
            to the greatest width. 

            As the number of rectangles is increased indefinitely, the width of each 
            decreases indefinitely, including the |widthest-rectangular|rectangle|| just mentioned. 
            Since its width decreases indefinitely, its area decreases indefinitely, 
            becoming arbitrarily close to 0. So the difference between the areas of the 
            |inscribed-rectangles|inscribed rectangles||, the
            |circumscribed-rectangles|circumscribed rectangles||, and the |figure|figure|| in between them becomes arbitrarily close to 0. 
            For the current figure, that |widthest-rectangular|single rectangle|| is on the `,
            {
                'default' : 'left',
                'highest y is on the right' : 'right',
            },

            `.`
]


///// next text: ////////////////////

//=================================================
// \\// Do fill texts here
//=================================================



};}
}) ();


// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var references  = sn('references', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma3', drg);
    var drg_modules = sn('modules', drg_own);

    drg_modules.referencesModule = referencesModule;
    return;






    function referencesModule()
    {
        references.text = ` 
        <br><br>
        Sources:
        <br>
        <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z">
            3rd Edition English translation by I. Bernard Cohen.
        </a>
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338103">
            Lemma 3 Latin text, 3rd Edition.
        </a>
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102">
            Lemma 2 and 3 figure, 3rd Edition.
        </a>
        `;
    }

}) ();


/*
    References for borrowed content.
    The Latin is not copyrighted.
    The Cohen translation is copyrighted.
    My impression is that my use of copyrighted material falls under the Fair Use Rule
    (see https://www.nolo.com/legal-encyclopedia/fair-use-rule-copyright-material-30100.html)
*/

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var references  = sn('references', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma2', drg);
    var drg_modules = sn('modules', drg_own);

    drg_modules.referencesModule = referencesModule;
    return;





 
    function referencesModule()
    {
        references.text = ` 
        <br><br>
        Sources:
        <br>
        <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z">
            3rd Edition English translation by I. Bernard Cohen.
        </a>
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338102">
            Lemma 2 Latin text and figure, 3rd Edition.
        </a>
        `;
    }

}) ();


// //\\// widget config
( function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp    = sn('fapp' ); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);
    var sapp    = sn('sapp'); 

    var ss          = sn('ss', fapp);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_conf';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //0000000000000000000000000000000000000000000
    return;
    //0000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.init_conf = init_conf;
    }


    //====================================================
    // //\\ inits and sets config pars
    //====================================================
    function init_conf()
    {


        //----------------------------------
        // //\\ study model parameters
        //----------------------------------
        var APP_MODEL_Y_RANGE = 1000;
        //----------------------------------
        // \\// study model parameters
        //----------------------------------




        //----------------------------------
        // //\\ original material parameters
        //----------------------------------
        //point e    28x46
        //point A    28x456 
        var pictureWidth = 504;
        var pictureHeight = 495;
        var activeAreaOffsetX = 28; //28; 
        var activeAreaOffsetY = 46; 
        //.set it from graph editor
        var pictureActiveArea = 456 - activeAreaOffsetY;
        var mod2med_scale = pictureActiveArea / APP_MODEL_Y_RANGE;
        //----------------------------------
        // \\// original material parameters
        //----------------------------------



        //----------------------------------
        //:app view parameters
        //----------------------------------
        var MONITOR_Y_FLIP = -1;



        //----------------------------------------------------
        // //\\  prepares sconf data holder
        //----------------------------------------------------
        to_sconf =
        {
            //----------------------------------
            // //\\ scenario
            //----------------------------------
            LANDING_MODE : 'claim',
            TEXT_MODE : 'text-none',
            hideProofSlider : true, // false,
            //----------------------------------
            // \\// scenario
            //----------------------------------

            APP_MODEL_Y_RANGE : APP_MODEL_Y_RANGE,

            //----------------------------------
            // //\\ original lemma parameters
            //----------------------------------
            curvePivots :
            [
                [0, 0],
                //[326.8, 715.3],
                //[326.8*1.05, 742*1.05],

                [270.19, 612.8],

                //[72.29, 621.2],

                //[1516.1, 569.9]
                //[1516.1, 495] //tmp
                [ 1060, 567 ]
                /* very good for debug: simple curve
                [0, 0],
                [500, 1000],
                [1000, 0]
                */
            ],

            //:ranges
            tanA_min : 0.1, //pivot1x/pivot1y minimum
            pivot1y_max : APP_MODEL_Y_RANGE * 0.99,
            pivot2x_max : APP_MODEL_Y_RANGE * 1.8,
            pivot2y_min : APP_MODEL_Y_RANGE * 0.3,
            pivot2y_max : APP_MODEL_Y_RANGE * 0.99,


            //bezier parameter t of point C on principal curve
            //tC : 0.5, //good for debug
            tC : 0.50077 / 0.79 ,

            claimRatio : 0.74081,
            //range:
            claimRatio_max : 0.9, //Dy_per_Ey


            tiltRatio : 1,   //controls DB-line tilt: 
                             //1 is perpendicular; < 1 dy/dx is negative, > 1 is positive
            //:ranges
            tiltRatio_min   : 0.4,
            tiltRatio_max   : 1.5,
            Ep2yrange_max   : 0.8,
            Cx_min          : 0.1,
            //----------------------------------
            // \\// original lemma parameters
            //----------------------------------



            //----------------------------------
            // //\\ model-view parameters
            //----------------------------------
            //100; //display in "percents" of Ae
            LEGEND_NUMERICAL_SCALE : 100,
            //LEGEND_NUMERICAL_SCALE : 1,

            MONITOR_Y_FLIP      : MONITOR_Y_FLIP,
            mod2med_scale       : mod2med_scale,
            med2mod_scale       : 1/mod2med_scale,

            activeAreaOffsetX   : activeAreaOffsetX,
            activeAreaOffsetY   : activeAreaOffsetY +
                                  ( MONITOR_Y_FLIP === -1 ? pictureActiveArea : 0 ),
            innerMediaHeight    : pictureHeight,
            innerMediaWidth     : pictureWidth,

            thickness           : 1,

            GENERIC_COLOR       : '0, 0, 0',
            CORE_CURVE_COLOR    : '160, 0, 0',
            CORE_AREA_COLOR     : '0,125,0',
            REMOTE_AREA_COLOR   : '0,0,255'
            //----------------------------------
            // \\// model-view parameters
            //----------------------------------
        };



        //----------------------------------
        // //\\ spawns to_conf
        //----------------------------------
        to_sconf.tfamilyColor =
        {
            generic         : to_sconf.GENERIC_COLOR,
            claim           : to_sconf.CORE_AREA_COLOR,
            proof           : to_sconf.REMOTE_AREA_COLOR,
            'primary-curve' : to_sconf.CORE_CURVE_COLOR
        };

        ///possibly lemma-9-specific
        ///todo find and fix
        to_sconf.text =
        {
            offsetX: 1111, //broken
            offsetY: 111,  //broken
                           //to_sconf.MONITOR_Y_FLIP * to_sconf.APP_MODEL_Y_RANGE/
            style:
            {
                "font-family":'montserrat,arial,helvetica',
                "font-weight":'normal',
                "font-size":40
            }
        };
        to_sconf.areaScale = 1 / to_sconf.APP_MODEL_Y_RANGE / to_sconf.APP_MODEL_Y_RANGE;
        //----------------------------------
        // \\// spawns to_conf
        // \\// prepares sconf data holder
        //----------------------------------------------------



        //----------------------------------------------------
        // //\\ copy-pastes to sconf
        //----------------------------------------------------
        Object.keys( to_sconf ).forEach( function( key ) {
            sconf[ key ] = to_sconf[ key ];
        });
        //----------------------------------------------------
        // \\// copy-pastes to sconf
        //----------------------------------------------------

    };
    //====================================================
    // \\// inits and sets config pars
    //====================================================

}) ();


//\\// Application Entry
( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;

    var rootvm      = sn('rootvm');
    var html        = sn('html');

    var fapp        = sn('fapp' );
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);
    var d8d_p       = sn('d8d-point',fmethods);

    var sapp        = sn('sapp');

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'load_init_sapp';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        sapp.init_sapp = init_sapp;
    }

    //=========================================================
    // //\\ inits app
    //=========================================================
    function init_sapp() 
    {
        //==========================
        //:at landing, copies study-model-pars from config to app model
        ssD.curvePivots   = sconf.curvePivots.concat([]);
        ssD.tC            = sconf.tC;
        ssD.claimRatio    = sconf.claimRatio;
        ssD.tiltRatio     = sconf.tiltRatio;
        //==========================

        //======================================
        // //\\ inits model and it's view
        //======================================
        sapp.upcreate();
        ssF.initMediaModel();
        //======================================
        // \\// inits model and it's view
        //======================================
    }
    //=========================================================
    // \\// inits app
    //=========================================================

}) ();


// //\\// if css order is important, set it here
(function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var fapp        = sn('fapp' ); 

    var sapp        = sn('sapp');

    var ss          = sn('ss', fapp);
    var ssCssOrder  = sn('ssCssOrder',ss);

    var srg         = sn('sapprg', fapp); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'setCssOrder';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        ssCssOrder.list =
        [
            'proof-vs-claim-modes',
            'media'
        ];
    }


    

})();



(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'proof-vs-claim-modes';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        cssmod[ modName ] = function( cssp, conf ) {

        var ret =


// //\\ css /////////////////////////////////////////
`

    /*=====================*/
    /* //\\ modes          */
    /*      proof vs claim */
    /*=====================*/
    .bsl-approot.proof--proof .proof--claim,
    .bsl-approot.proof--claim .proof--proof {
        visibility:hidden;
    }    
    .bsl-approot.proof--claim .proof--claim,
    .bsl-approot.proof--proof .proof--proof {
        visibility:visible;
    }    
    /*=====================*/
    /*      proof vs claim */
    /* \\// modes          */
    /*=====================*/


`;
// \\// css /////////////////////////////////////////





return ret;
};}
})();



(function() {
    var ns      = window.b$l;
    var sn      = ns.sn;

    var fapp        = ns.sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var cssmod      = sn('ssCssModules',ss);

    var sapp        = sn('sapp');
    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'media';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        cssmod[ modName ] = function( cssp, conf ) {

// //\\ fill css here
var ret = `




    /********************************************/
    /* //\\ bsl-media                           */
    /********************************************/
    .bsl-media {
        position:absolute;
        width:100%;
        left:0;
        top:0;
        opacity:1;
        z-index:10;
    }

    .bsl-bg-image {
        width:100%;
        left:0;
        top:0;
        z-index:9;
    }
    /********************************************/
    /* \\// bsl-media                           */
    /********************************************/


`;
// \\// fill css here




return ret;
};}
})();



( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var cssp        = ns.CSS_PREFIX;
    var sn          = ns.sn;    
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'core';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.create8prepopulate_svg = create8prepopulate_svg;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function create8prepopulate_svg()
    {
        //..........................
        // //\\ study image
        //..........................
        sDomN.bgImage$ = $$
            .c( 'img' )
            .a( 'class', cssp +'-bg-image' )
            .a( 'src', 'content-img/lemma9-original.png' )
            .to( sDomN.medRoot )
            ;
        //..........................
        // \\// study image
        //..........................



        //..........................
        // //\\ media
        //..........................
        ////makes svg-draw-area
        //pitfall: no dice: sDomN.svg = $$.c( 'svg' ).a( 'class', '...' ).a( 'id', ... ).to( ... )();
        sDomN.svg = document.createElementNS( fconf.svgNS, 'svg' );
        sDomN.mmedia = sDomN.svg;
        sDomN.svg.setAttributeNS( null, 'class', cssp +'-media' );
        sDomN.svg.setAttributeNS( null, 'version', "1.1" );    //todo ??
        sDomN.svg.setAttributeNS( null, 'viewBox', '0 0 ' +
                                 sconf.innerMediaWidth + ' ' +
                                 sconf.innerMediaHeight );
        //magic todo?
        sDomN.svg.setAttributeNS( null, 'baseProfile', "full" ); //todm ?

        //todo magic: https://stackoverflow.com/questions/16438416/cross-browser-svg-preserveaspectratio
        sDomN.svg.setAttributeNS( null, 'preserveAspectRatio', "xMidYMid meet" );  //todm ?

        $$.to( sDomN.medRoot, sDomN.svg );
        //sDomN.svg.setAttributeNS( null, 'fill', "#FFFFAA" );
        //no good: sDomN.svg.style.fill = "#FFFFAA";
        //..........................
        // \\// media
        //..........................
    }
    //=========================================================
    // \\//
    //=========================================================


}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'create-proof-slider';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //000000000000000000000000000000000000000000000000000000
    return;
    //000000000000000000000000000000000000000000000000000000








    function setModule()
    {
        ssF.create_proofSlider = create_proofSlider;
    }

    function create_proofSlider()
    {
        //=====================================================
        // //\\ animated slider
        //      slides point C by changing Beizier parameter tC
        //      At page load time, animates to value sconf.tC.
        //      Based on ns.sliderControl which is based on,
        //      as of version 1072,
        //      module bsl/slider/d8d-app-template.js 
        //=====================================================

        ///as of version 1072, ssF.animatedSlider is set in full-app/lib/animated-slider/
        var captionScale = 1;
        sDomF.proofSlider = ssF.animatedSlider({
            //parent            :sDomN.menu,
            //.adds slider usually below numbers' table
            parent              :sDomN.medRoot,
            cssp                :'bsl',
            hideProofSlider     :sconf.hideProofSlider,
            sliderClassId       :'simple',
            captionScale        :captionScale,
            railsLegend         :'Process proof by decreasing AC:',
            ancestorClassToHideSlider   :'proof--claim',


            dataInMove:         function( dataArg, draggee ) {
                                    //:master place where tC updates

                                    //.todo wrong: belongs to subapp instance
                                    ssD.tC = dataArg;
                                    sapp.upcreate();
                                    setCaption( sDomF.proofSlider.slider );
                                },
            //.callback when handler stops
            dataInArrival:      function( dataArg ) {
                                    //.does synch secondary slider
                                    rg.point_C.achieved.achieved = dataArg;
                                },
            setCaption: setCaption
        });
        //.args: final-value-after-animation, period
        //.setting second arg to 20 makes introductory animation instant
        sDomF.proofSlider.doSet_childOpeningAnimation(
            1, sconf.tC,
            sconf.hideProofSlider ? 20 : 2000
        );
        ///converts study-model pos to draggee caption
        function setCaption( slider_arg )
        {
            var pC = rg.point_C.pos;
            var pClen = Math.sqrt( pC[0]*pC[0]+pC[1]*pC[1] ) /
                        sconf.APP_MODEL_Y_RANGE;
            var capt = sconf.LEGEND_NUMERICAL_SCALE ?
                        ( captionScale * sconf.LEGEND_NUMERICAL_SCALE * pClen ).toFixed(2) :
                        ( captionScale * pClen ).toFixed(2);
            slider_arg.draggee.innerHTML = capt;
        }
        //=====================================================
        // \\// animated slider
        //=====================================================
    }

}) ();


( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;
    var bezier      = sn('bezier');
    var mat         = sn('mat');

    var fapp        = sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    //.registry is used for study-model-elements or media-model-elements
    var rg          = sn('registry',ssD);

    var sapp        = sn('sapp');

    var tr          = ssF.tr;
    var tp          = ssF.tp;

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'studyModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;








    function setModule()
    {
        ssF.calculateCurvedArea = calculateCurvedArea;
        ssF.x0y_2_t             = x0y_2_t;
        ssF.const2positions     = const2positions;
        sapp.upcreate           = upcreate;
    }

    //=========================================================
    // //\\ updates figure (and creates if none)
    //=========================================================
    function upcreate()
    {
        //:study-pars
        var modCurvPivots   = ssD.curvePivots;    //curve params
        var tC              = ssD.tC;             //point C curve param = vanish param
        var claimRatio      = ssD.claimRatio;
        var tiltRatio       = ssD.tiltRatio;

        var yRange          = sconf.APP_MODEL_Y_RANGE;



        //===================================================
        // //\\ spawns study model from main parameters ssD
        //===================================================
        var tanA        = modCurvPivots[1][0] / modCurvPivots[1][1];
                          tp( 'point_A', [ 0, 0 ] );
        var mod_e       = tp( 'point_e', [ 0, yRange ] );

        var modC        = tp( 'point_C', bezier.parT2point( tC, modCurvPivots ) );
        //var test      = tp( 'point_TEST', bezier.parT2point( 0.79, modCurvPivots ) );

        var Ey          = tiltRatio * modC[1];
        var Dy          = claimRatio * Ey;

        var modD        = tp( 'point_D', [ 0, Dy ] );
        var modE        = tp( 'point_E', [ 0, Ey ] );

        var remoteRatio = ssD.remoteRatio = mod_e[1] / modE[1];

        // //\\ looking for pointB
        var directionX  = modC[0];
        var directionY  = modC[1] - modE[1];
        var tB          = ssF.tB = bezier.line2bezier( 
                            modD, 
                            [ directionX, directionY ],
                            modCurvPivots[1],
                            modCurvPivots[2]
        )[0];
        var modB        = tp( 'point_B', bezier.parT2point( tB, modCurvPivots ) );
        // \\// looking for pointB

        var mod_b       = tp( 'point_b', mat.sm( remoteRatio, modB ) );
        var mod_c       = tp( 'point_c', mat.sm( remoteRatio, modC ) );
        var mod_d       = tp( 'point_d', mat.sm( remoteRatio, modD ) );

        // //\\ making areas
        tr( 'AGE', 'vertices', make_points_AGE( modC, modE, tanA ) );
        tr( 'AFD', 'vertices', make_points_AGE( modB, modD, tanA ) );
        tr( 'Age', 'vertices', make_points_AGE( mod_c, mod_e, tanA ) );
        tr( 'Afd', 'vertices', make_points_AGE( mod_b, mod_d, tanA ) );
        // \\// making areas


        var mod_g = rg[ 'Age' ].vertices[1];
        tp( 'point_g', mod_g );
        var mod_f = mat.sm( claimRatio, mod_g );
        tp( 'point_f', mod_f );




        //=======================
        // //\\ calculates areas
        //=======================
        var calcAreas = ssD.calculatedAreas = ssD.calculatedAreas || {};
        var rr2 = ssD.remoteRatio * ssD.remoteRatio;
        var rr_2 = 1/rr2;
        var claimRatio_2 = 1 / claimRatio / claimRatio;
        var remote = ssD.modRemoteCurPivots = const2positions( ssD.remoteRatio, modCurvPivots );
        var tiltEC = ( modC[1] - Ey ) / modC[0];
        var areas = bezier.zbezier2areas( [remote[1], remote[2]], tC, tiltEC, mod_g, sconf.areaScale );
        var areas = calcAreas[ 'Age' ] = 
        {
            total     : areas.areaBetweenTanT_8_curve,
            base      : areas.areaUnderTan1,
            delta     : areas.areaBetween_Tan1_Tan2_Curve
        };
        calcAreas[ 'AGE' ] = 
        {
            total     : areas.total * rr_2,
            base      : areas.base * rr_2,
            delta     : areas.delta * rr_2
        };
        var areas = bezier.zbezier2areas( [remote[1], remote[2]], tB, tiltEC, mod_f, sconf.areaScale );
        var areas = calcAreas[ 'Afd' ] = 
        {
            total     : areas.areaBetweenTanT_8_curve,
            base      : areas.areaUnderTan1,
            delta     : areas.areaBetween_Tan1_Tan2_Curve
        };
        calcAreas[ 'AFD' ] = 
        {
            total     : areas.total * rr_2,
            base      : areas.base * rr_2,
            delta     : areas.delta * rr_2
        };
        //=======================
        // \\// calculates areas
        //=======================

        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================






        //-------------------------------------------------------
        // //\\ media part
        //-------------------------------------------------------
        ssF.upcreateMedia();
        //-------------------------------------------------------
        // \\// media part
        //-------------------------------------------------------
    }
    //=========================================================
    // \\// updates figure (and creates if none)
    //=========================================================



    //==========================================
    // //\\ model helpers
    // //\\ calculates area similar to AGE
    //==========================================
    /*
        Points and angles Aa, Ea, Ga, Ca:

        |                            .  
        |                         .
        |                    C  .  a
     Cy o----------.----------o--------------
        |         .       . .  
        |        . a  .   . 
        |     G o .     .
        |    . .      .
        |.    .     .
      E o a  .    .
        |   .   .
        |  .  .
        |a. .
        |. 
      A o      

    */
    ///Inputs: C,E
    ///Returns: A,G,E
    function make_points_AGE( C, E, tanAa )
    {
        var tanCa = (C[1]-E[1])/C[0];
        var Ca = Math.atan( tanCa );
        var Ea = Math.PI/2 + Ca;
        var Aa = Math.atan(tanAa);
        var Ga = Math.PI/2 - Aa - Ca;
        var AG = Math.sin(Ea) * E[1] / Math.sin( Ga );
        var G = [];
        G[1] = AG * Math.cos( Aa );
        G[0] = AG * Math.sin( Aa );
        return [ [0,0], G, E ];
    }
    //==========================================
    // \\// calculates area similar to AGE
    //==========================================


    //==========================================
    // //\\ calculateCurvedArea
    //==========================================
    function calculateCurvedArea( areaId, pivots, tend, startPoint, endPoint )
    {
        var area = tr( areaId );
        area.curve = bezier.bezier2lower( pivots, tend );
        area.startPoint = startPoint;
        area.endPoint = endPoint;
    }
    //==========================================
    // \\// calculateCurvedArea
    //==========================================


    //====================================================================
    // //\\ converts point-on-curve-coordinate x or y
    //      to curve parameter t
    //====================================================================
    ///returns: there can be two t`s:
    ///         in this case, t-of-closest-to-pivot0 is returned
    ///input:   x0y   = x or y
    ///         x0yIx = 1 for y, =0 for x
    function x0y_2_t( x0y, x0yIx )
    {
        // //\\ patches: todm
        //.avoid_param_t_interval_ends
        var avoid_ends = 0.00001;
        //.no negative x-ses and y-s
        x0y = Math.max( avoid_ends, x0y );
        // \\// patches: todm

        var modCurvPivots = ssD.curvePivots;

        var aa = modCurvPivots[0][x0yIx] - 2 * modCurvPivots[1][x0yIx] + modCurvPivots[2][x0yIx];
        var bb = -2*modCurvPivots[0][x0yIx] + 2 * modCurvPivots[1][x0yIx];
        var cc = modCurvPivots[0][x0yIx] - x0y;
        var roots = mat.squarePolyRoot( aa, bb, cc );
        if( roots.length === 0 ) {
            throw "Unexpected no-solution case: do better coding: todm";
        } else if( roots.length === 1 ) {
            var result = roots[0];
        } else if( Array.isArray(roots[0]) ) {
            ////edge cases, returns extremum of t
            var result = -bb / ( 2 * aa );
        } else {
            //c cc( 'two real roots: x0y=' + x0y + ' t1,t2=', roots );
            //'pivots=', modCurvPivots,
            //'aa=' + aa + ',' + bb + ',' + cc );
            //.here the home-cooking begins
            if( roots[0] < 0 ) {
                roots[0] = roots[1];
            }
            if( roots[1] < 0 ) {
                roots[1] = roots[0];
            }
            var result = Math.min( roots[0], roots[1], 1 - avoid_ends );
        }
        result = Math.max( Math.min( result, 1-avoid_ends ), avoid_ends );
        return result;
    }
    //====================================================================
    // \\// converts point-on-curve-coordinate x or y
    //====================================================================


    ///====================================================================
    ///rescales pivots
    ///====================================================================
    function const2positions( con, positions )
    {
        return positions.map( function( pos ) {
            return mat.sm( con, pos );
        });
    }
    //====================================================================
    // \\// model helpers
    //====================================================================

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var mat         = sn('mat');
    var bezier      = sn('bezier');
    var sv          = sn('svg');
    var fapp        = sn('fapp'); 
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions',sapp);
    var sDomN       = sn('dnative',sapp);

    var ss          = sn('ss',fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mediaModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;








    function setModule()
    {
        ssF.upcreateMedia   = upcreateMedia;
    }


    //=========================================================
    // //\\ updates and creates media
    //=========================================================
    function upcreateMedia()
    {
        var tr              = ssF.tr;
        //:study-pars
        var modCurvPivots   = ssD.curvePivots;    //curve params
        var tC              = ssD.tC;             //point C curve param = vanish param
        //:run-time-pars
        var tB              = ssF.tB;





        var medCurvPivots      = modCurvPivots.map( modpos2medpos );
        var medRemoteCurPivots = ssD.modRemoteCurPivots.map( modpos2medpos );

        var point_A     = pos2pointy( 'point_A',
                                      { tfamily:'claim',
                                        cssClass:'tfamily-claim tofill tostroke op1'
                                      }
                                    );
        var point_D     = pos2pointy( 'point_D', { tfamily:'claim',
                                      cssClass:'tfamily-claim tofill tostroke op1' } );
        var point_E     = pos2pointy( 'point_E', { tfamily:'claim',
                              cssClass:'tfamily-claim tostroke',
                              'fill' : 'transparent', //todm: patch: removes black core from the point
                              'stroke-width' : 1
                          });
        var point_B     = pos2pointy( 'point_B', { tfamily:'claim',
                              cssClass:'tfamily-claim tostroke debB',
                              'fill' : 'transparent', //todm: patch: removes black core from the point
                              'stroke-width' : 1
                          });
        var point_C     = pos2pointy( 'point_C', { tfamily:'claim',
                              cssClass:'tfamily-claim tostroke',
                              'fill' : 'transparent', //todm: patch: removes black core from the point
                              'stroke-width' : 1
                          });

        var point_d     = pos2pointy('point_d', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_e     = pos2pointy('point_e', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_b     = pos2pointy('point_b', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_c     = pos2pointy('point_c', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_g     = pos2pointy('point_g', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        var point_f     = pos2pointy('point_f', { tfamily:'proof', cssClass:'tfamily-proof tofill tostroke op1' } );
        //===================================================
        // \\// spawns study model from main parameters ssD
        //===================================================










        //==========================================
        // //\\ does paint view
        //      (in viewBox for SVG)
        //==========================================
        pointies2line( 'line_AD', [point_A, point_D], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_AE', [point_A, point_E], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_Ad', [point_A, point_d], { cssClass:'tfamily-proof tostroke' } );
        pointies2line( 'line_Ae', [point_A, point_e], { cssClass:'tfamily-proof tostroke' } );

        pointies2line( 'line_AC', [point_A, point_C], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_AB', [point_A, point_B], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_Ab', [point_A, point_b], { cssClass:'tfamily-proof tostroke' } );
        pointies2line( 'line_Ac', [point_A, point_c], { cssClass:'tfamily-proof tostroke' } );

        pointies2line( 'line_Ag', [point_A, point_g], { cssClass:'tfamily-proof tostroke' } );

        pointies2line( 'line_EC', [point_E, point_C], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_DB', [point_D, point_B], { cssClass:'tfamily-claim tostroke' } );
        pointies2line( 'line_ec', [point_e, point_c], { cssClass:'tfamily-proof tostroke' } );
        pointies2line( 'line_db', [point_d, point_b], { cssClass:'tfamily-proof tostroke' } );



        // //\\ paints curve with two pivot points
        var mainCurve = tr( 'mainCurve' );
        mainCurve.mediael = bezier.mediafy({
            mediael : mainCurve.mediael,
            svg : sDomN.svg,
            pivots : medCurvPivots,
            bcurve :
            {
                'stroke-width' : 1 * sconf.thickness
            },
            paintPivots : {
                topaint : [ null, true, true ],
                attrs :
                {
                    'stroke-width' : 1 * sconf.thickness,
                    r : 4 * sconf.thickness
                }
            }
        });
        ///names pivotPoint1 and pivotPoint2 are needed for topic engine
        var w0 = 1;
        for( var w0=1; w0<3; w0++) {
            var ww = mainCurve.mediael.pivotPoints[w0].svgel;
            $$.$( ww ).addClass( 'shapeid-pivotPoint'+w0+' tostroke' );
            tr( 'pivotPoint'+w0, 'svgel', ww );
        }
        /*
        duplicate with drag-model.js ... for drags array ... todm:sort out
        rg.pivotPoint1.tfamily = 'primary-curve';
        rg.pivotPoint2.tfamily = 'primary-curve';
        rg.pivotPoint1.name = 'pivotPoint1';
        rg.pivotPoint2.name = 'pivotPoint2';
        */

        $$.addClass( 'tostroke', mainCurve.mediael.paintedCurve)
          .addClass( 'shapeid-' + 'mainCurve')
          ;

        var remoteCurve = tr( 'remoteCurve' );
        remoteCurve.mediael = bezier.mediafy({
            mediael : remoteCurve.mediael,
            svg : sDomN.svg,
            pivots : medRemoteCurPivots,
            bcurve :
            {
                stroke : 'transparent', //todm add to bsl core
                'stroke-width' : 1 * sconf.thickness
            }
        });
        $$.addClass('tostroke', remoteCurve.mediael.paintedCurve); //todm addClassNS
        // \\// paints curve with two pivot points




        //==========================================
        // //\\ paints areas
        // //\\ paints curved areas
        //==========================================
        var wCCA = ssF.calculateCurvedArea;
        wCCA( 'area-Ace', medRemoteCurPivots,  tC, point_A.medpos, point_e.medpos );
        wCCA( 'area-Abd', medRemoteCurPivots,  tB, point_A.medpos, point_d.medpos );
        wCCA( 'area-ACE', medCurvPivots,       tC, point_A.medpos, point_E.medpos );
        wCCA( 'area-ABD', medCurvPivots,       tB, point_A.medpos, point_D.medpos );

        paintCurvArea( 'area-Ace', 'proof--proof tfamily-proof' );

        paintCurvArea( 'area-Abd', 'proof--proof tfamily-proof' );

        paintCurvArea( 'area-ACE', 'proof--claim tfamily-claim' );

        paintCurvArea( 'area-ABD', 'proof--claim tfamily-claim' );
        function paintCurvArea( areaId, fullMode )
        {
            var area = rg[ areaId ];
            var lowCurve = rg[ areaId ].curve;
            
            var dd = '';
            dd += "M" + area.startPoint[0] + ' ' +
                        area.startPoint[1] + ' ';
            dd += "Q" + 
                  lowCurve[1][0].toFixed(2) + ' ' + lowCurve[1][1].toFixed(2) + ' ' +
                  lowCurve[2][0].toFixed(2) + ' ' + lowCurve[2][1].toFixed(2) + ' ';
            dd += "L" + 
                        area.endPoint[0] + ' ' +
                        area.endPoint[1] + ' ';

            area.mediael = sv.u({
                svgel : area.mediael,
                type : 'path',
                d:dd,
                parent : sDomN.svg
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
            $$.$(area.mediael)
              .addClass( 'shapeid-'+areaId ) //cosmetic for ver 647
              .addClass( fullMode + ' tofill' );
              ;
        }
        //==========================================
        // \\// paints curved areas
        //==========================================



        //==========================================
        // //\\ linear areas
        //==========================================
        ///paints AGE-like area
        function paintLikeAGE( areaId, fullMode )
        {
            var area = rg[ areaId ];
            var vertices = area.vertices.map( modpos2medpos );
            area.mediael = sv.polyline({
                pivots : vertices,
                svgel : area.mediael,
                parent : sDomN.svg
            });
            //area.mediael.setAttributeNS( null, 'class', fullMode + ' tofill' );
            $$.addClass( fullMode + ' tofill', area.mediael);
        }
        //:calls to calculate and paint
        //removed by project-manager: paintLikeAGE( 'AGE', 'proof--claim tfamily-claim' );
        //paintLikeAGE( 'AFD', 'rgba( 255,0,0, 0 )', 'proof--claim' );
        //removed by project-manager: paintLikeAGE( 'AFD', 'proof--claim tfamily-claim' );

        paintLikeAGE( 'Age', 'proof--proof tfamily-proof' );
        paintLikeAGE( 'Afd', 'proof--proof tfamily-proof' );
        //==========================================
        // \\// linear areas
        // \\// paints areas
        //==========================================



        //==========================
        // //\\ prints areas values
        //==========================
        ssF.upcreate_mainLegend();
        //==========================
        // \\// prints areas values
        //==========================




        //==========================================
        // \\// does paint view
        //==========================================
        if( ssF.mediaModelInitialized ) {
            sDomF.medD8D && sDomF.medD8D.updateAllDecPoints();

        } else {
            ssF.initMediaModel = initMediaModel;
        }
        return;
        // \\//\\// ends imperative part of the module







        function initMediaModel()
        {
            sDomF.topicModel_2_css_html();
            ssF.initDragModel();
            sDomF.populateMenu();
            ssF.create_proofSlider();
            ssF.mediaModelInitialized = true;
        };



        //==========================================
        // //\\ paint helpers
        //==========================================
        // //\\ pos to pos
        ///transforms model-coordinates to media-coordinates
        function modpos2medpos( pos )
        {
            if( !pos ) { pos = this; }
            return [ pos[0] * sconf.mod2med_scale + sconf.activeAreaOffsetX,
                     pos[1] * sconf.mod2med_scale * sconf.MONITOR_Y_FLIP +
                     sconf.activeAreaOffsetY ];
        }
        // \\// pos to pos



        ///makes line
        function pointies2line( pName, pivots, attr )
        {
            var line = tr( pName );
            line.svgel = sv.polyline({
                svgel   : line.svgel,
                parent  : sDomN.svg,
                pivots  : [ pivots[0].medpos, pivots[1].medpos ],
                'stroke-width' : ( attr && attr[ 'stroke-width' ] || 1 ) * sconf.thickness
            });
            var cssClass = attr && attr['cssClass'];
            $$.addClass( cssClass, line.svgel )   //todm addClassNS
              .addClass( 'tostroke')
              .addClass( 'stroke');
        }



        ///converts model-pos and attributes to pointy
        function pos2pointy( pName, attrs )
        {
            var pos             = rg[ pName ].pos;
            var pt              = tr( pName );
            pt.name             = pName;
            pt.pos              = pos;
            pt.medpos2dompos    = sDomF.medpos2dompos;
            pt.medpos           = modpos2medpos( pt.pos );
            pt.tfamily          = attrs.tfamily;
            pt.svgel = sv.u({
                svgel   : pt.svgel,
                parent  : sDomN.svg,
                type    : 'circle',
                fill    : attrs && attrs.fill,
                stroke  : attrs && attrs.stroke,
                'stroke-width' : (( attrs && attrs[ 'stroke-width' ] ) || 0) * sconf.thickness,
                cx : pt.medpos[0],
                cy : pt.medpos[1],
                r : 4 * sconf.thickness
            });
            var cssClass = attrs && attrs['cssClass'];
            //pt.svgel.setAttributeNS( null, 'class', cssClass );
            $$.addClass( cssClass, pt.svgel ); //todm addClassNS
            return pt;
        }
        //==========================================
        // \\// paint helpers
        //==========================================
    }
    //=========================================================
    // \\// updates and creates media
    //=========================================================

}) ();


( function() {
    var ns      = window.b$l;
    var $$      = ns.$$;
    var sn      = ns.sn;    
    var bezier  = sn('bezier');
    var sv      = sn('svg');

    var fapp    = sn('fapp'); 
    var fconf   = sn('fconf',fapp);
    var sconf   = sn('sconf',fconf);

    var sapp    = sn('sapp'); 
    var sDomN   = sn('dnative',sapp);

    var ss      = sn('ss',fapp);
    var ssD     = sn('ssData',ss);
    var ssF     = sn('ssFunctions',ss);

    var clustersToUpdate = [];
    var clustersToUpdate_claim = [];

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'mainLegend_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;








    function setModule()
    {
        ssF.upcreate_mainLegend = upcreate_mainLegend;
        ssF.create_digital_legend = create_digital_legend;
    }

    function create_digital_legend()
    {
        var mlegend = ssF.tr( 'main-legend' );
        doCreateTable_claim( mlegend );
        doCreateTable_proof( mlegend );
    }

    //=========================================
    // //\\ updates values during simulation
    //=========================================
    function upcreate_mainLegend()
    {
        var calcA = ssD.calculatedAreas;
        var claimR = ssD.claimRatio;

        var www = sconf.LEGEND_NUMERICAL_SCALE;
        var wD2 = www * www;
        var dig = www > 10 ? 0 : 4;

        var ww = clustersToUpdate;
        ww.Abd.innerHTML        = (wD2*calcA[ 'Afd' ].total).toFixed(dig);
        ww.Afd.innerHTML        = (wD2*calcA[ 'Afd' ].base).toFixed(dig);
        ww.AfdPerAge.innerHTML  = (calcA[ 'Afd' ].base/calcA[ 'Age' ].base).toFixed(3);

        ww.Ace.innerHTML        = (wD2*calcA[ 'Age' ].total).toFixed(dig);
        ww.Age.innerHTML        = (wD2*calcA[ 'Age' ].base).toFixed(dig);
        ww.AbdPerAce.innerHTML  = (calcA[ 'Afd' ].total/calcA[ 'Age' ].total).toFixed(3);

        //:vanishing areas
        //:sets display of "main vanishing values"
        //:these statements do output all the "vanishing" digits
        ww.ABD.innerHTML        = (wD2*calcA[ 'AFD' ].total).toFixed(dig+4);
        ww.ACE.innerHTML        = (wD2*calcA[ 'AGE' ].total).toFixed(dig+4);

        ww.ABDPerACE.innerHTML  = (calcA[ 'AFD' ].total/calcA[ 'AGE' ].total).toFixed(3);
        ww.AD2PerAE2.innerHTML  = (claimR*claimR).toFixed(3);
        
        var ww = clustersToUpdate_claim;
        //: vanishing areas
        ww.ABDPerACE.innerHTML  = (calcA[ 'AFD' ].total/calcA[ 'AGE' ].total).toFixed(3);
        ww.AD2PerAE2.innerHTML  = (claimR*claimR).toFixed(3);
    }
    //=========================================
    // \\// updates values during simulation
    //=========================================





    //=========================================
    // //\\ creates proof table
    //      does one time work of html creation
    //=========================================
    function doCreateTable_proof(mlegend)
    {
        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.proof = $$
            .c('table')
            .addClass('main-legend')
            .addClass('proof')
            .to(sDomN.medRoot)
            ();
        var tr = ssF.tr;


        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        //:Abd Ace
        var row = $$.c('tr')
            .addClass('proof row1')
            .addClass('tostroke')
            .to(tb)();              
        makeFormatterCell( row, 'DD', '11111', 'first' );
        makeFormatterCell( row, 'DD', '11111', 'second' );
        makeFormatterCell( row, 'DDD/DDD', '11111', 'third' );
        function makeFormatterCell( row, mcaption, val, id )
        {
            $$.c('td').html( mcaption ).to(row);
            $$.c('td').html('=').addClass('eq-sign '+id).to(row);
            $$.c('td').html( val+'' ).to(row);
        }
        //=====================================================
        // \\// idle first row to format table for fixed-layout
        //=====================================================




        //===================
        // //\\ table caption
        //===================
        var row = $$.c('tr').to(tb)();
        $$.c('td').a('colspan','9')
                  .addClass('table-caption')
                  .html('Data')
                  .to(row);
        //===================
        // \\// table caption
        //===================

        //===================
        // //\\ remote areas
        //===================
        //:Abd Ace
        var row = $$.c('tr')
            //.addClass('tfamily-proof')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'Abd' );
        makeCl( row, 'Ace', null, null, null, !!'alignCaptionToRight' );
        makeCl( row, 'AbdPerAce', 'Abd/Ace' );
        //:Afd Age
        var row = $$.c('tr')
            //.addClass('tfamily-proof')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'Afd' );
        makeCl( row, 'Age', null, null, null, !!'alignCaptionToRight' );
        makeCl( row, 'AfdPerAge', 'Afd/Age' );
        //===================
        // \\// remote areas
        //===================


        //===================
        // //\\ vanishing areas
        //===================
        var row = $$.c('tr')
                    .addClass('tfamily-claim')
                    .addClass('tostroke')
                    .to(tb)();
        makeCl( row, 'ABD', null, 2, 2 );
        $$.c('td').to(row); //empty filler-cell
        $$.c('td').to(row); //empty filler-cell
        makeCl( row, 'ABDPerACE', 'ABD/ACE' );
        var row = $$.c('tr')
                    .addClass('tfamily-claim')
                    .addClass('tostroke')
                    .to(tb)();
        makeCl( row, 'ACE', null, 2, 2 );
        //$$.c('td').a('colspan','6').to(row);
        $$.c('td').to(row); //empty filler-cell
        $$.c('td').to(row); //empty filler-cell
        makeCl( row, 'AD2PerAE2', 'AD²/AE²');
        //===================
        // \\// vanishing areas
        //===================

        

        //:model linear unit 
        var row = $$.c('tr')
            .addClass('tfamily-claim')
            .addClass('tostroke')
            .to(tb)();
        //$$.c('td').a('colspan','6').to(row);
        makeCl( row, 'model-linear-unit', 'Ae');
        clustersToUpdate['model-linear-unit'].innerHTML = sconf.LEGEND_NUMERICAL_SCALE.toFixed();
        return;


        ///Makes:  magnitude's cluster in table,
        ///Effect: represents magnitude in html-table-row in 
        ///        form "mname = mvalue",
        ///Input:  mname = magnitude name
        function makeCl( row, mname, mcaption, spanIx, spanVal, alignCaptionToRight )
        {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .addClass('tostroke')
                       .to(row);
            if( alignCaptionToRight ) {
                c$.addClass('align-to-right')
            }

            if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }

            //todm .this does not guarantee adding the class to td ... so far only
            //.topic-engine probably takes care about the class - do fix this
            tr( 'legend-'+mname, 'domel', c$() );

            $$.c('td').html('=').addClass('eq-sign').to(row);
            var c$ = $$.c('td')
                       .addClass('value')
                       .addClass('tostroke')
                       .to(row);
            if( spanIx === 2 ) { c$.a('colspan',''+spanVal); }
            var updateeCell = tr( 'number-'+mname, 'domel', c$() );
            clustersToUpdate[mname] = updateeCell;
        }
    }
    //=========================================
    // \\// creates proof table
    //=========================================







    //=========================================
    // //\\ creates claim table
    //      similar to doCreateTable()
    //=========================================
    function doCreateTable_claim(mlegend)
    {
        mlegend.tb = mlegend.tb || {};
        var tb = mlegend.tb.claim = $$
            .c('table')
            .addClass('main-legend')
            .addClass('claim')
            .to(sDomN.medRoot)
            ();
        var tr = ssF.tr;




        //=====================================================
        // //\\ idle first row to format table for fixed-layout
        //=====================================================
        //:Abd Ace
        var row = $$.c('tr')
            .addClass('claim row1')
            .addClass('tostroke')
            .to(tb)();
        makeFormatterCell( row, 'DD', '11111', 'first' );
        function makeFormatterCell( row, mcaption, val, id )
        {
            $$.c('td').html( mcaption ).to(row);
            $$.c('td').html('=').addClass('eq-sign '+id).to(row);
            $$.c('td').html( val+'' ).to(row);
        }
        //=====================================================
        // \\// idle first row to format table for fixed-layout
        //=====================================================



        //===================
        // //\\ table caption
        //===================
        var row = $$.c('tr').to(tb)();
        $$  .c('td')
            .a('colspan','6')
            .addClass('table-caption')
            .html('Data')
            .to(row);
        //===================
        // \\// table caption
        //===================



        //===================
        // //\\ vanishing areas
        //===================
        var row = $$.c('tr')
            .addClass('tfamily-claim')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'ABDPerACE', 'ABD/ACE' );
        //===================
        // \\// vanishing areas
        //===================

        //:sides row
        var row = $$.c('tr')
            .addClass('tfamily-claim')
            .addClass('tostroke')
            .to(tb)();
        makeCl( row, 'AD2PerAE2', 'AD²/AE²');
        return;


        function makeCl( row, mname, mcaption, spanIx, spanVal )
        {
            var c$ = $$.c('td')
                       .html( mcaption||mname )
                       .to(row);
            if( spanIx === 0 ) { c$.a('colspan',''+spanVal); }
            tr( 'claim-legend-'+mname, 'domel', c$() );
            $$.c('td').html('=').to(row);
            var c$ = $$.c('td')
                       .addClass('value')
                       .to(row);
            if( spanIx === 2 ) { c$.a('colspan',''+spanVal); }
            var updateeCell = tr( 'claim-number-'+mname, 'domel', c$() );
            clustersToUpdate_claim[mname] = updateeCell;
        }
    }
    //=========================================
    // \\// creates claim table
    //=========================================

}) ();


( function() {
    var ns          = window.b$l;
    var $$          = ns.$$;
    var sn          = ns.sn;    
    var bezier      = sn('bezier');

    var fapp        = ns.sn('fapp' ); 
    var fmethods    = sn('methods',fapp);
    var fconf       = ns.sn('fconf',fapp);
    var sconf       = ns.sn('sconf',fconf);

    var sapp        = sn('sapp' ); 
    var sDomF       = sn('dfunctions', sapp);
    var sDomN       = sn('dnative', sapp);

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var ssF         = sn('ssFunctions',ss);
    var rg          = sn('registry',ssD);

    var d8d_p       = sn('d8d-point',fmethods);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = 'dragModel_2_ss';
    srg_modules[ modName + '-' + mCount.count ] = setModule;
    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
    return;
    //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr








    function setModule()
    {
        ssF.initDragModel = initDragModel;
    }


    //==========================================
    // //\\ inits drag points
    //==========================================
    function initDragModel()
    {
        var modCurvPivots   = ssD.curvePivots;
        var yflip           = sconf.MONITOR_Y_FLIP;


        //======================================
        // //\\ sets framework of draggee-points
        //======================================
        var medD8D = sDomF.medD8D = d8d_p.createFramework( 
            findDraggee,
            sDomN.svg.parentNode,
            //:optional
            sconf.DRAG_POINTS_THROTTLE_TIME, //todo undefined
            sDomF.detected_user_interaction_effect,
            fconf.dragPointDecoratorClasses
            //for devel: function(){}
        );
        //======================================
        // \\// sets framework of draggee-points
        //======================================



        //==========================================
        // //\\ sets drag points
        //==========================================
        sapp.readyToPopulateMenu = true;

        //.........................................
        // //\\ moves inner ratio
        //.........................................
        var claimRatio_max = sconf.claimRatio_max;
        rg[ 'point_B' ].dragPriority = 9;
        createDragger({
            achieved            : sconf.claimRatio,
            pointWrap           : rg[ 'point_B' ],
            cssClasses          : ['green','axis-y'],
            doProcess           : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = ssD.claimRatio;
                    break;
                    case 'move':
                                ////some of these Ey, Dy, values are perpendicular projections, not
                                ////y-coordinates
                                ////but since proportion holds, they are good here  ... 
                                var Ey = bezier.parT2point( ssD.tC, modCurvPivots )[1];

                                var startDy = ach.achieved * Ey;
                                var newDy   = Math.min( Ey * claimRatio_max,
                                              startDy - arg.move[1] * sconf.med2mod_scale * sDomF.css2media() );
                                newDy = Math.max( newDy, Ey*0.01 ); //todm make ranges in conf
                                ssD.claimRatio = newDy/Ey;
                                //c cc( 'new: claimRatio=' + ssD.claimRatio + ' Dy=' +
                                //      ( ssD.claimRatio * Ey ) );
                                sapp.upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves inner ratio
        //.........................................




        //.........................................
        // //\\ moves E
        //.........................................
        createDragger({
            achieved            : sconf.tiltRatio,
            pointWrap           : rg[ 'point_E' ],
            cssClasses          : ['green','axis-y'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = ssD.tiltRatio;
                    break;
                    case 'move':
                                 var Epy = bezier.parT2point( ssD.tC, modCurvPivots )[1];
                                 var startEy = ach.achieved * Epy;
                                 var newEy   = Math.min( 
                                                sconf.Ep2yrange_max * sconf.APP_MODEL_Y_RANGE,
                                                sconf.tiltRatio_max * Epy,
                                               startEy - arg.move[1] * sconf.med2mod_scale * sDomF.css2media() );
                                 newEy = Math.max( newEy, Epy * sconf.tiltRatio_min );
                                 ssD.tiltRatio = newEy/Epy;
                                 sapp.upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves E
        //.........................................




        //.........................................
        // //\\ moves inner size, Cx
        //.........................................
        var Cx_min          = sconf.Cx_min;
        //.was: var REPEL_D_FROM_E = 0.999;
        rg[ 'point_C' ].dragPriority = 10;
        createDragger({
            achieved            : sconf.tC,
            pointWrap           : rg[ 'point_C' ],
            cssClasses          : ['green'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                switch( arg.down_move_up ) {
                    case 'up':   //.this is done through proofSlider: ach.achieved = ssD.tC;
                                 //.does update through proofSlider synch
                                 sDomF.proofSlider.slider.d8d_emulateAbsFractionX( ssD.tC, 'up' );
                    break;
                    case 'move': 
                                 var startCx = bezier.parT2point(
                                               ach.achieved, modCurvPivots )[0];
                                 var newCx = startCx + arg.move[0] * sconf.med2mod_scale * sDomF.css2media();
                                 newCx = Math.max( newCx, Cx_min );
                                 //c cc( 'start Ex=' + startCx + ' start tC=' + ach.achieved +
                                 //     ' arg.move[0]=' + arg.move[0] );

                                 var newTC = ssF.x0y_2_t( newCx, 0 );

                                 //:this is done through proofSlider
                                 //ssD.tC = newTC;
                                 //ssF.upcreate();

                                 //.does update through proofSlider synch
                                 sDomF.proofSlider.slider.d8d_emulateAbsFractionX( newTC, 'move' );
                    break;
                }
            }
        });
        //.........................................
        // \\// moves inner size, Cx
        //.........................................


        //.........................................
        // //\\ moves bezier middle pivot
        //.........................................
        var mainCurve           = rg['mainCurve'];
        var wpoint              = mainCurve.mediael.pivotPoints[1];
        wpoint.name             = 'pivotPoint1';
        //****************************************************************
        //todo: wpoint, pointWrap, rg['point_E'] - like must always be in 
        //      the same place, in rg
        //****************************************************************
        wpoint.tfamily          = 'primary-curve'; //todm: do this at media-model.js level
        createDragger({
            achieved            : sconf.curvePivots[1].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['red','rotate'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                var pv = ssD.curvePivots[1];
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = pv.concat([]);
                                 //c cc( 'up ach=' + pv[0] + ', ' + pv[1] );
                    break;
                    case 'move': 
                                var css2media = sDomF.css2media();
                                var mx = css2media * sconf.med2mod_scale * arg.move[0];
                                var my = css2media * sconf.med2mod_scale * arg.move[1] * yflip;
                                var newMy = ach.achieved[1] + my;
                                var newMx = ach.achieved[0] + mx;
                                newMy = Math.min( newMy, sconf.pivot1y_max );
                                newMx = Math.max( newMx, sconf.tanA_min * newMy )
                                pv[0] = newMx;
                                pv[1] = newMy;
                                //c cc( 'res x,y= ' + pv[0] + ', ' + pv[1] );
                                sapp.upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves bezier middle pivot
        //.........................................


        //.........................................
        // //\\ moves bezier end pivot
        //.........................................
        var wpoint              = mainCurve.mediael.pivotPoints[2];
        wpoint.name             = 'pivotPoint2';
        wpoint.tfamily          = 'primary-curve';
        createDragger({
            achieved            : sconf.curvePivots[2].concat([]),
            pointWrap           : wpoint,
            cssClasses          : ['red','rotate'],
            doProcess : function( arg )
            {
                var ach = arg.pointWrap.achieved;
                var pv = ssD.curvePivots[2];
                switch( arg.down_move_up ) {
                    case 'up':   ach.achieved = pv.concat([]);
                    break;
                    case 'move': 
                                var css2media = sDomF.css2media();
                                var mx = css2media * sconf.med2mod_scale * arg.move[0];
                                var my = css2media * sconf.med2mod_scale * arg.move[1] * yflip;

                                var newX = ach.achieved[0] + mx;
                                var newY = ach.achieved[1] + my;
                                var newX = Math.min( newX, sconf.pivot2x_max );
                                var newY = Math.max( newY, sconf.pivot2y_min );
                                var newY = Math.min( newY, sconf.pivot2y_max );

                                pv[0] = newX;
                                pv[1] = newY;

                                sapp.upcreate();
                    break;
                }
            }
        });
        //.........................................
        // \\// moves bezier end pivot
        //.........................................
        ns.globalCss.update(); //for decorator
        return;



        function createDragger( argc )
        {
            var pointWrap               = argc.pointWrap;
            var pointKey                = pointWrap.name;
            argc.update_decPoint        = update_decPoint;

            if( !pointWrap.finalColor && pointWrap.tfamily ) {
                pointWrap.finalColor = 'rgb(' + sconf.tfamilyColor[ pointWrap.tfamily ] + ')';
            }

            var dragWrap = medD8D.createDragUpdate( argc );
            if( argc.cssClasses ) {
                argc.cssClasses.forEach( function( cls ) {
                    //no need: if( !dragWrap.decPoint ) return;
                    $$.addClass( cls, dragWrap.decPoint );
                });
            }

            ///decorates DraggeeHoverer movement    
            function update_decPoint( decPoint )
            {
                var dompos = sDomF.medpos2dompos.call( pointWrap );
                decPoint.style.left = dompos[0] + 'px';            
                decPoint.style.top = dompos[1] + 'px';            
            }
        }
    }; 
    //==========================================
    // \\// inits drag points
    //==========================================





    //====================
    // //\\ finds draggee
    //====================
    ///Uses:    sDomF.dompos2medpos( testPoint );
    ///
    ///Returns: point drag Wrap
    ///         which is closest to testPoint.
    function findDraggee( testPoint, dragWraps )
    {
        //.if distance to testPoint is "outside" of this par.,
        //.then dragWrap is not "considered" for drag
        var DRAGGEE_HALF_SIZE = fconf.DRAGGEE_HALF_SIZE;

        //:for Pif. metric
        //var DRAGGEE_HALF_SIZE2 = sconf.DRAGGEE_HALF_SIZE;
        //DRAGGEE_HALF_SIZE2 *= DRAGGEE_HALF_SIZE2;

        var closestDragWrap = null;
        var closestTd = null;
        //.the bigger is priority, the more "choicable" is the drag Wrap point
        var closestDragPriority = 0;

        var testMedpos = sDomF.dompos2medpos( testPoint );
        var testMediaX = testMedpos[0];
        var testMediaY = testMedpos[1];
        //c cc( '\n\n****', testPoint, testMediaX, testMediaY, ' sDomF.css2media='+sDomF.css2media );

        dragWraps.forEach( function( dragWrap, dix ) {
            var dragPoint   = dragWrap.pointWrap;
            var tdX         = Math.abs( testMediaX - dragPoint.medpos[0] );
            var tdY         = Math.abs( testMediaY - dragPoint.medpos[1] );
            var td          = Math.max( tdX, tdY );
            //Pif. metric: var td2     = tdX*tdX + tdY*tdY;
            //c cc( 'test: td=' + td + ' dp=' + dragPoint.medpos[0] + ' ' + dragPoint.medpos[1] );

            //.td is a "rect-metric" for distance between testPoint and drag-point-candidate
            if( td <= DRAGGEE_HALF_SIZE ) {
                //c cc( 'test:' + dragPoint.name + ' ' + td, dragPoint.medpos); 
                if( !closestDragWrap || closestTd > td ||
                    (dragPoint.dragPriority || 0 ) > closestDragPriority ) {
                    closestDragWrap = dragWrap;
                    closestTd = td;
                    closestDragPriority = dragPoint.dragPriority || 0;
                    //c cc( dragPoint.name + ' ' + td );
               }
            }
        });
        return closestDragWrap;
    }
    //====================
    // \\// finds draggee
    //====================


}) ();


( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;

    var fapp        = sn('fapp' );
    var fconf       = sn('fconf',fapp);
    var sconf       = sn('sconf',fconf);

    var sapp    = sn('sapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);
    var topics      = sn('topics', ssD);

    var srg         = sn('sapprg', fapp ); 
    var srg_modules = sn('lemma9', srg);

    var mCount      = sn('modulesCount', sapp);
    mCount.count    = mCount.count ? mCount.count + 1 : 1;
    var modName     = '';
    srg_modules[ modName + '-' + mCount.count ] = setModule;

    return;





    function setModule()
    {
        topics.convert_lineFeed2htmlBreak = true;
        topics.topicDef =
        {
        ///do fill this map as desired,
        ///left side = text-link; right-side = array of topic's shapeId's, ...
        ///shapeId can be found in media-model.js

        point_A : { id:['point_A'], tfamily :'primary-curve' },
        point_B : { id:['point_B'], tfamily :'claim' },
        point_C : { id:['point_C'], tfamily :'claim' },

        point_d : { id:['point_d'], tfamily :'proof' },
        point_e : { id:['point_e'], tfamily :'proof' },
        point_f : { id:['point_f'], tfamily :'proof' },
        point_g : { id:['point_g'], tfamily :'proof' },
        point_b : { id:['point_b'], tfamily :'proof' },
        point_c : { id:['point_c'], tfamily :'proof' },

        ABC:{ id:['mainCurve'], tfamily :'primary-curve' },
        'ABC-controls':{ id:['pivotPoint1', 'pivotPoint2'], tfamily :'primary-curve' },
        Abc:{ id:['remoteCurve'], tfamily :'proof' },

        AD:{ id:['line_AD'], topicColor:'auto' },
        AE:{ id:['line_AE'], topicColor:'auto' },
        Ad:{ id:['line_Ad'], topicColor:'auto' },
        Ae:{ id:
            [
                'line_Ae', 'legend-model-linear-unit', 'number-model-linear-unit'
            ],
            topicColor:'auto'
        },
        Ag:{ id:['line_Ag'], topicColor:'auto' },

        AC:{ id:['line_AC'], topicColor:'auto' },
        AB:{ id:['line_AB'], topicColor:'auto' },
        Ab:{ id:['line_Ab'], topicColor:'auto' },
        Ac:{ id:['line_Ac'], topicColor:'auto' },

        BD:{ id:['line_DB'], topicColor:'auto' },
        DB:{ id:['line_DB'], topicColor:'auto' },
        EC:{ id:['line_EC'], topicColor:'auto' },
        ec:{ id:['line_ec'], topicColor:'auto' },
        db:{ id:['line_db'], topicColor:'auto' },

        ABD:{ id:['area-ABD', 'legend-ABD', 'number-ABD'], tfamily :'claim' },

        ACE:{ id:['area-ACE', 'legend-ACE', 'number-ACE'], tfamily :'claim' },
        ABDPerACE:{ 
            id:
            [
                'legend-ABDPerACE',
                'number-ABDPerACE',
                'claim-legend-ABDPerACE',
                'claim-number-ABDPerACE'
            ],
            tfamily :'claim'
        },

        Abd:{ id:['area-Abd', 'legend-Abd', 'number-Abd'], topicColor:'auto' },
        Ace:{ id:['area-Ace', 'legend-Ace', 'number-Ace'], topicColor:'auto' },
        AbdPerAce:
        {   id:
            [
                  'legend-AbdPerAce', 'number-AbdPerAce'
            ],
            //topicColor:'auto'
            tfamily :'claim'
        },

        //:linear areas
        Afd:{ id:['Afd','number-Afd','legend-Afd'], topicColor:'auto' },
        Age:{ id:
                [ 'Age','number-Age','legend-Age'
                ],
                topicColor:'auto'
            },

        AD2AE:
        {   id:
            [   'legend-AD2PerAE2','number-AD2PerAE2',
                'claim-legend-AD2PerAE2', 'claim-number-AD2PerAE2'
            ],
            topicColor:'#006688'
        }

        //AGE: { tfamily :'claim' }
    };}


}) ();


// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma9', drg);
    var drg_modules = sn('modules', drg_own);
    drg_modules.textClaims = textClaims;
    return;


    function textClaims()
    {
        rawTexts.claim = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.


///// next text: ////////////////////
hypertext : `
Consider |ABD ACE|two curvlinear triangles|| bounded on one side by a |AE|line||, on another side by a |ABC|curve||, and on their last sides by |BD EC|parallel lines||. Note the |point_A|point|| joining the shared |AE|line|| and |ABC|curve||. As the |BD EC|parallel lines|| approach that |point_A|point||, in the limit, the |ABDPerACE|ratio of the triangles’ areas|| equals the |AD2AE|squared ratio|| of their |AD AE|sides||.
`,





///// next text: ////////////////////
english : `
If the straight line |AE|AE|| and
the curve |ABC|ABC||,
both given in position,
intersect each other at a given angle |point_A|A||, and
if |BD|BD|| and |EC|CE|| are drawn as ordinates to the straight line |AE|AE|| at another given angle
and meet the curve in |point_B|B|| and |point_C|C||,
and if then points |point_B|B|| and |point_C|C|| simultaneously approach point |point_A|A||,
I say that the areas of the triangles |ABD|ABD|| and |ACE|ACE|| will ultimately be to each other
as the |AD2AE|squares of the sides||.
`,




///// next text: ////////////////////
latin : `
Si recta |AE|AE|| &
If the straight line |AE|AE|| and

curva |ABC|ABC||
the curve |ABC|ABC||,

positione datæ
both given in position,

se mutio secent in angulo dato |point_A|A||, &
intersect each other at a given angle |point_A|A||, and

ad rectam illam in alio dato angulo ordinatim applicentur |BD|BD||, |EC|CE||
if |BD|BD|| and |EC|CE|| are drawn as ordinates to the straight line |AE|AE|| at another given angle

curvæ occurrentes in |point_B|B||, |point_C|C||,
and meet the curve in |point_B|B|| and |point_C|C||,

dein puncta |point_B|B||, |point_C|C|| simul accedant and punctum |point_A|A||:
and if then points |point_B|B|| and |point_C|C|| simultaneously approach point |point_A|A||,

dico quod areæ triangulorum |ABD|ABD||, |ACE|ACE|| erunt ul[t]imo invicem 
I say that the areas of the triangles |ABD|ABD|| and |ACE|ACE|| will ultimately be to each other

in |AD2AE|duplicata ratione|| laterum.
as the |AD2AE|squares of the sides||.

`
//=================================================
// \\// Do fill texts here
//=================================================




};}
}) ();


// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var rawTexts    = sn('rawTexts', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma9', drg);
    var drg_modules = sn('modules', drg_own);
    drg_modules.textProofs = textProofs;
    return;




    function textProofs()
    {
        rawTexts.proof = { 



//=================================================
// //\\ Do fill texts here
//=================================================
//        Dont use backtick "`" in the text content.

///// next text: ////////////////////
english : `
For while points |point_B|B|| and |point_C|C|| approach point |point_A|A||,
let |AD|AD|| be understood always to be produced to the distant points |point_d|d|| and |point_e|e||,
so that |Ad|Ad|| and |Ae|Ae|| are proportional to |AD|AD|| and |AE|AE||;

and erect ordinates |db|db|| and |ec|ec||
parallel to ordinates |DB|DB|| and |EC|EC||
and meeting |AB|AB|| and |AC|AC||, produced, at |point_b|b|| and |point_c|c||.

Understand the curve |Abc|Abc|| to be drawn similar to |ABC|ABC||, and
the straight line |Ag|Ag|| to be drawn touching both curves at |point_A|A|| and
cutting the ordinates |DB|DB||, |EC|EC||, |db|db||, and |ec|ec|| at F, G, |point_f|f||, and |point_g|g||.

Then, with the length |Ae|Ae|| remaining the same,
let points |point_B|B|| and |point_C|C|| come together with point |point_A|A||; and as the angle cAg vanishes,

the curvilinear areas |Abd|Abd|| and |Ace|Ace|| will coincide with the
rectilinear areas |Afd|Afd|| and |Age|Age||,
and thus (by lem. 5) will be in the squared ratio of the sides |Ad|Ad|| and |Ae|Ae||.

But areas |ABD|ABD|| and |ACE|ACE|| are always proportional to these areas,
and sides |AD|AD|| and |AE|AE|| to these sides.

Therefore areas |ABD|ABD|| and |ACE|ACE|| also are ultimately 
in the squared ratio of the sides |AD|AD|| and |AE|AE||.  Q.E.D.


`,







///// next text: ////////////////////
hypertext : `
Make an |Abd Ace|enlargement|| of the |ABD ACE|two original triangles||, and place them such that they still share the same |point_A|point|| and |Ae|straight line|| shared by the |ABD ACE|original triangles||.

As the |ABD ACE|two original triangles|| shrink, keep the length of the |Ae|shared line|| for the |Ace|largest triangle|| the same length, and adjust the |Ab Ac db ec|other sides|| and |Abc|curve|| of the |Abd Ace|enlarged triangles|| as necessary so that they continue to be |Abd Ace|enlarged versions|| of the |ABD ACE|shrinking triangles||.

In the limit, as the |ABD ACE|two original triangles|| shrink, the |Abc|curve|| that bounds the |Abd Ace|two enlarged curvilinear triangles|| flattens to a |Ag|straight line||, meaning the |Abd Ace|two enlarged curvilinear triangles|| become |Afd Age|two linear triangles||. By Lemma 5, we know the ratio of the areas of these |Afd Age|two linear triangles|| will be equal to the squared ratio of their |Ad Ae|matching sides||.

We also know that |Ad Ae|matching sides|| of the |Abd Ace|enlarged triangles|| must have the same ratio to each other as |AD AE|matching sides|| of the |ABD ACE|original triangles||.

So in the limit, the |ABDPerACE|ratio of the areas|| of the |ABD ACE|original triangles|| converge to the same |AD2AE|ratio as the squares|| of their |AD AE|sides||.
`,






///// next text: ////////////////////
latin : `
            not yet entered
`

//=================================================
// \\// Do fill texts here
//=================================================



};}
}) ();


// Fill this file with the texts, Latin and English.
// (Perhaps in the future in any other language ).

( function() {
    var ns          = window.b$l;
    var sn          = ns.sn;    
    var fapp        = sn('fapp' ); 

    var ss          = sn('ss', fapp);
    var ssD         = sn('ssData',ss);
    var references  = sn('references', ssD);

    var drg         = sn('datarg', fapp ); 
    var drg_own     = sn('lemma9', drg);
    var drg_modules = sn('modules', drg_own);

    drg_modules.referencesModule = referencesModule;
    return;






    function referencesModule()
    {
        references.text = ` 
        <br><br>
        Sources:
        <br>
        <a href="https://www.jstor.org/stable/10.1525/j.ctt9qh28z">
            3rd Edition English translation by I. Bernard Cohen.
        </a>
        <br>
        <a href="https://www.e-rara.ch/zut/wihibe/content/pageview/338107">
            Lemma 9 Latin text and figure. 3rd Edition.
        </a>
        `;
    }

}) ();


