class T{constructor(e){this.properties=e??[]}get(e){const n=this.properties.filter(o=>o.name===e).map(o=>o.value);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,n){const o=this.get(e);if(o!==void 0){if(n!=="json"&&typeof o!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,n){const o=this.get(e);if(o===void 0)throw new Error('Property "'+e+'" is missing');if(n!=="json"&&typeof o!==n)throw new Error('Expected property "'+e+'" to have type "'+n+'"');return o}getType(e){const n=this.properties.filter(o=>o.name===e).map(o=>o.type);if(n.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(n.length!==0)return n[0]}}const _="https://unpkg.com/@workadventure/scripting-api-extra@1.4.6/dist";class ce{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new T(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return e?WA.player.tags.includes(e):!0}get isWritable(){const e=this.properties.getString("writableBy");return e?WA.player.tags.includes(e):!0}}function $(t){const e=t?"#"+t.join():"";WA.nav.openCoWebSite(_+"/configuration.html"+e)}async function ue(t,e){const n=await WA.room.getTiledMap(),o=new Map;return X(n.layers,o,t,e),o}function X(t,e,n,o){for(const r of t)if(r.type==="objectgroup"){for(const a of r.objects)if(a.type==="variable"||a.class==="variable"){if(n&&r.name!==n||o&&!o.includes(a.name))continue;e.set(a.name,new ce(a))}}else r.type==="group"&&X(r.layers,e,n,o)}let N;async function S(){return N===void 0&&(N=pe()),N}async function pe(){return fe(await WA.room.getTiledMap())}function fe(t){const e=new Map;return ee(t.layers,"",e),e}function ee(t,e,n){for(const o of t)o.type==="group"?ee(o.layers,e+o.name+"/",n):(o.name=e+o.name,n.set(o.name,o))}async function ge(){const t=await S(),e=[];for(const n of t.values())if(n.type==="objectgroup")for(const o of n.objects)(o.type==="area"||o.class==="area")&&e.push(o);return e}function de(t){let e=1/0,n=1/0,o=0,r=0;const a=t.data;if(typeof a=="string")throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let s=0;s<t.height;s++)for(let i=0;i<t.width;i++)a[i+s*t.width]!==0&&(e=Math.min(e,i),r=Math.max(r,i),n=Math.min(n,s),o=Math.max(o,s));return{top:n,left:e,right:r+1,bottom:o+1}}function te(t){let e=1/0,n=1/0,o=0,r=0;for(const a of t){const s=de(a);s.left<e&&(e=s.left),s.top<n&&(n=s.top),s.right>r&&(r=s.right),s.bottom>o&&(o=s.bottom)}return{top:n,left:e,right:r,bottom:o}}/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var ye=Object.prototype.toString,P=Array.isArray||function(e){return ye.call(e)==="[object Array]"};function G(t){return typeof t=="function"}function he(t){return P(t)?"array":typeof t}function V(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function z(t,e){return t!=null&&typeof t=="object"&&e in t}function ve(t,e){return t!=null&&typeof t!="object"&&t.hasOwnProperty&&t.hasOwnProperty(e)}var Ae=RegExp.prototype.test;function be(t,e){return Ae.call(t,e)}var We=/\S/;function me(t){return!be(We,t)}var we={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function Se(t){return String(t).replace(/[&<>"'`=\/]/g,function(n){return we[n]})}var Pe=/\s*/,Ce=/\s+/,H=/\s*=/,Le=/\s*\}/,ke=/#|\^|\/|>|\{|&|=|!/;function Te(t,e){if(!t)return[];var n=!1,o=[],r=[],a=[],s=!1,i=!1,l="",u=0;function p(){if(s&&!i)for(;a.length;)delete r[a.pop()];else a=[];s=!1,i=!1}var y,v,B;function C(b){if(typeof b=="string"&&(b=b.split(Ce,2)),!P(b)||b.length!==2)throw new Error("Invalid tags: "+b);y=new RegExp(V(b[0])+"\\s*"),v=new RegExp("\\s*"+V(b[1])),B=new RegExp("\\s*"+V("}"+b[1]))}C(e||d.tags);for(var c=new E(t),A,g,h,L,O,W;!c.eos();){if(A=c.pos,h=c.scanUntil(y),h)for(var x=0,le=h.length;x<le;++x)L=h.charAt(x),me(L)?(a.push(r.length),l+=L):(i=!0,n=!0,l+=" "),r.push(["text",L,A,A+1]),A+=1,L===`
`&&(p(),l="",u=0,n=!1);if(!c.scan(y))break;if(s=!0,g=c.scan(ke)||"name",c.scan(Pe),g==="="?(h=c.scanUntil(H),c.scan(H),c.scanUntil(v)):g==="{"?(h=c.scanUntil(B),c.scan(Le),c.scanUntil(v),g="&"):h=c.scanUntil(v),!c.scan(v))throw new Error("Unclosed tag at "+c.pos);if(g==">"?O=[g,h,A,c.pos,l,u,n]:O=[g,h,A,c.pos],u++,r.push(O),g==="#"||g==="^")o.push(O);else if(g==="/"){if(W=o.pop(),!W)throw new Error('Unopened section "'+h+'" at '+A);if(W[1]!==h)throw new Error('Unclosed section "'+W[1]+'" at '+A)}else g==="name"||g==="{"||g==="&"?i=!0:g==="="&&C(h)}if(p(),W=o.pop(),W)throw new Error('Unclosed section "'+W[1]+'" at '+c.pos);return Ee(Me(r))}function Me(t){for(var e=[],n,o,r=0,a=t.length;r<a;++r)n=t[r],n&&(n[0]==="text"&&o&&o[0]==="text"?(o[1]+=n[1],o[3]=n[3]):(e.push(n),o=n));return e}function Ee(t){for(var e=[],n=e,o=[],r,a,s=0,i=t.length;s<i;++s)switch(r=t[s],r[0]){case"#":case"^":n.push(r),o.push(r),n=r[4]=[];break;case"/":a=o.pop(),a[5]=r[2],n=o.length>0?o[o.length-1][4]:e;break;default:n.push(r)}return e}function E(t){this.string=t,this.tail=t,this.pos=0}E.prototype.eos=function(){return this.tail===""};E.prototype.scan=function(e){var n=this.tail.match(e);if(!n||n.index!==0)return"";var o=n[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o};E.prototype.scanUntil=function(e){var n=this.tail.search(e),o;switch(n){case-1:o=this.tail,this.tail="";break;case 0:o="";break;default:o=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=o.length,o};function w(t,e){this.view=t,this.cache={".":this.view},this.parent=e}w.prototype.push=function(e){return new w(e,this)};w.prototype.lookup=function(e){var n=this.cache,o;if(n.hasOwnProperty(e))o=n[e];else{for(var r=this,a,s,i,l=!1;r;){if(e.indexOf(".")>0)for(a=r.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(l=z(a,s[i])||ve(a,s[i])),a=a[s[i++]];else a=r.view[e],l=z(r.view,e);if(l){o=a;break}r=r.parent}n[e]=o}return G(o)&&(o=o.call(this.view)),o};function f(){this.templateCache={_cache:{},set:function(e,n){this._cache[e]=n},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}f.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};f.prototype.parse=function(e,n){var o=this.templateCache,r=e+":"+(n||d.tags).join(":"),a=typeof o<"u",s=a?o.get(r):void 0;return s==null&&(s=Te(e,n),a&&o.set(r,s)),s};f.prototype.render=function(e,n,o,r){var a=this.getConfigTags(r),s=this.parse(e,a),i=n instanceof w?n:new w(n,void 0);return this.renderTokens(s,i,o,e,r)};f.prototype.renderTokens=function(e,n,o,r,a){for(var s="",i,l,u,p=0,y=e.length;p<y;++p)u=void 0,i=e[p],l=i[0],l==="#"?u=this.renderSection(i,n,o,r,a):l==="^"?u=this.renderInverted(i,n,o,r,a):l===">"?u=this.renderPartial(i,n,o,a):l==="&"?u=this.unescapedValue(i,n):l==="name"?u=this.escapedValue(i,n,a):l==="text"&&(u=this.rawValue(i)),u!==void 0&&(s+=u);return s};f.prototype.renderSection=function(e,n,o,r,a){var s=this,i="",l=n.lookup(e[1]);function u(v){return s.render(v,n,o,a)}if(l){if(P(l))for(var p=0,y=l.length;p<y;++p)i+=this.renderTokens(e[4],n.push(l[p]),o,r,a);else if(typeof l=="object"||typeof l=="string"||typeof l=="number")i+=this.renderTokens(e[4],n.push(l),o,r,a);else if(G(l)){if(typeof r!="string")throw new Error("Cannot use higher-order sections without the original template");l=l.call(n.view,r.slice(e[3],e[5]),u),l!=null&&(i+=l)}else i+=this.renderTokens(e[4],n,o,r,a);return i}};f.prototype.renderInverted=function(e,n,o,r,a){var s=n.lookup(e[1]);if(!s||P(s)&&s.length===0)return this.renderTokens(e[4],n,o,r,a)};f.prototype.indentPartial=function(e,n,o){for(var r=n.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!o)&&(a[s]=r+a[s]);return a.join(`
`)};f.prototype.renderPartial=function(e,n,o,r){if(o){var a=this.getConfigTags(r),s=G(o)?o(e[1]):o[e[1]];if(s!=null){var i=e[6],l=e[5],u=e[4],p=s;l==0&&u&&(p=this.indentPartial(s,u,i));var y=this.parse(p,a);return this.renderTokens(y,n,o,p,r)}}};f.prototype.unescapedValue=function(e,n){var o=n.lookup(e[1]);if(o!=null)return o};f.prototype.escapedValue=function(e,n,o){var r=this.getConfigEscape(o)||d.escape,a=n.lookup(e[1]);if(a!=null)return typeof a=="number"&&r===d.escape?String(a):r(a)};f.prototype.rawValue=function(e){return e[1]};f.prototype.getConfigTags=function(e){return P(e)?e:e&&typeof e=="object"?e.tags:void 0};f.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!P(e))return e.escape};var d={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(t){M.templateCache=t},get templateCache(){return M.templateCache}},M=new f;d.clearCache=function(){return M.clearCache()};d.parse=function(e,n){return M.parse(e,n)};d.render=function(e,n,o,r){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+he(e)+'" was given as the first argument for mustache#render(template, view, partials)');return M.render(e,n,o,r)};d.escape=Se;d.Scanner=E;d.Context=w;d.Writer=f;class ne{constructor(e,n){this.template=e,this.state=n,this.ast=d.parse(e)}getValue(){return this.value===void 0&&(this.value=d.render(this.template,this.state)),this.value}onChange(e){const n=[];for(const o of this.getUsedVariables().values())n.push(this.state.onVariableChange(o).subscribe(()=>{const r=d.render(this.template,this.state);r!==this.value&&(this.value=r,e(this.value))}));return{unsubscribe:()=>{for(const o of n)o.unsubscribe()}}}isPureString(){return this.ast.length===0||this.ast.length===1&&this.ast[0][0]==="text"}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,n){for(const o of e){const r=o[0],a=o[1],s=o[4];["name","&","#","^"].includes(r)&&n.add(a),s!==void 0&&typeof s!="string"&&this.recursiveGetUsedVariables(s,n)}}}async function Be(){var t;const e=await ge();for(const n of e){const o=(t=n.properties)!==null&&t!==void 0?t:[];for(const r of o){if(r.type==="int"||r.type==="bool"||r.type==="object"||typeof r.value!="string")continue;const a=new ne(r.value,WA.state);if(a.isPureString())continue;const s=a.getValue();await K(n.name,r.name,s),a.onChange(async i=>{await K(n.name,r.name,i)})}}}async function Oe(){var t;const e=await S();for(const[n,o]of e.entries())if(o.type!=="objectgroup"){const r=(t=o.properties)!==null&&t!==void 0?t:[];for(const a of r){if(a.type==="int"||a.type==="bool"||a.type==="object"||typeof a.value!="string")continue;const s=new ne(a.value,WA.state);if(s.isPureString())continue;const i=s.getValue();Z(n,a.name,i),s.onChange(l=>{Z(n,a.name,l)})}}}async function K(t,e,n){console.log(t),(await WA.room.area.get(t)).setProperty(e,n)}function Z(t,e,n){WA.room.setProperty(t,e,n),e==="visible"&&(n?WA.room.showLayer(t):WA.room.hideLayer(t))}let U,I=0,q=0;function F(t){if(WA.state[t.name]){let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.showLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.hideLayer(n)}else{let e=t.properties.mustGetString("openLayer");for(const n of e.split(`
`))WA.room.hideLayer(n);e=t.properties.mustGetString("closeLayer");for(const n of e.split(`
`))WA.room.showLayer(n)}}function xe(t){const e=t.properties.getString("openSound"),n=t.properties.getNumber("soundRadius");let o=1;if(n){const r=re(t.properties.mustGetString("openLayer").split(`
`));if(r>n)return;o=1-r/n}e&&WA.sound.loadSound(e).play({volume:o})}function Ne(t){const e=t.properties.getString("closeSound"),n=t.properties.getNumber("soundRadius");let o=1;if(n){const r=re(t.properties.mustGetString("closeLayer").split(`
`));if(r>n)return;o=1-r/n}e&&WA.sound.loadSound(e).play({volume:o})}function oe(t){return t.map(e=>U.get(e)).filter(e=>(e==null?void 0:e.type)==="tilelayer")}function re(t){const e=oe(t),n=te(e),o=((n.right-n.left)/2+n.left)*32,r=((n.bottom-n.top)/2+n.top)*32;return Math.sqrt(Math.pow(I-o,2)+Math.pow(q-r,2))}function Ve(t){WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]?xe(t):Ne(t),F(t)}),F(t)}function Re(t,e,n,o){const r=t.name;let a,s,i=!1;const l=n.getString("tag");let u=!0;l&&!WA.player.tags.includes(l)&&(u=!1);const p=!!l;function y(){var c;a&&a.remove(),a=WA.ui.displayActionMessage({message:(c=n.getString("closeTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to close the door",callback:()=>{WA.state[e.name]=!1,v()}})}function v(){var c;a&&a.remove(),a=WA.ui.displayActionMessage({message:(c=n.getString("openTriggerMessage"))!==null&&c!==void 0?c:"Press SPACE to open the door",callback:()=>{WA.state[e.name]=!0,y()}})}function B(c){const A=te(oe(e.properties.mustGetString("closeLayer").split(`
`)));s=WA.room.website.create({name:"doorKeypad"+c,url:o+"/keypad.html#"+encodeURIComponent(c),position:{x:A.right*32,y:A.top*32,width:32*3,height:32*4},allowApi:!0})}function C(){s&&(WA.room.website.delete(s.name),s=void 0)}WA.room.onEnterLayer(r).subscribe(()=>{if(i=!0,n.getBoolean("autoOpen")&&u){WA.state[e.name]=!0;return}if(!WA.state[e.name]&&(p&&!u||!p)&&(n.getString("code")||n.getString("codeVariable"))){B(r);return}u&&(WA.state[e.name]?y():v())}),WA.room.onLeaveLayer(r).subscribe(()=>{i=!1,n.getBoolean("autoClose")&&(WA.state[e.name]=!1),a&&a.remove(),C()}),WA.state.onVariableChange(e.name).subscribe(()=>{i&&(!n.getBoolean("autoClose")&&WA.state[e.name]===!0&&y(),s&&WA.state[e.name]===!0&&C(),!n.getBoolean("autoOpen")&&WA.state[e.name]===!1&&v())})}function Ue(t){const e=t.properties.mustGetString("bellSound"),n=t.properties.getNumber("soundRadius");let o=1;if(n){const r=Math.sqrt(Math.pow(t.x-I,2)+Math.pow(t.y-q,2));if(r>n)return;o=1-r/n}WA.sound.loadSound(e).play({volume:o})}function je(t){WA.state[t.name]===void 0&&(WA.state[t.name]=0),WA.state.onVariableChange(t.name).subscribe(()=>{WA.state[t.name]&&Ue(t)})}function _e(t,e,n){let o;const r=e.getString("bellPopup");WA.room.onEnterLayer(n).subscribe(()=>{var a;r?o=WA.ui.openPopup(r,"",[{label:(a=e.getString("bellButtonText"))!==null&&a!==void 0?a:"Ring",callback:()=>{WA.state[t]=WA.state[t]+1}}]):WA.state[t]=WA.state[t]+1}),WA.room.onLeaveLayer(n).subscribe(()=>{o&&(o.close(),o=void 0)})}async function Ge(t){t=t??_;const e=await ue();U=await S();for(const n of e.values())n.properties.get("door")&&Ve(n),n.properties.get("bell")&&je(n);for(const n of U.values()){const o=new T(n.properties),r=o.getString("doorVariable");if(r&&n.type==="tilelayer"){const s=e.get(r);if(s===void 0)throw new Error('Cannot find variable "'+r+'" referred in the "doorVariable" property of layer "'+n.name+'"');Re(n,s,o,t)}const a=o.getString("bellVariable");a&&_e(a,o,n.name)}WA.player.onPlayerMove(n=>{I=n.x,q=n.y})}function Ie(t,e){const n=t.getString("bindVariable");if(n){const o=t.get("enterValue"),r=t.get("leaveValue"),a=t.getString("triggerMessage"),s=t.getString("tag");qe(n,e,o,r,a,s)}}function qe(t,e,n,o,r,a){a&&!WA.player.tags.includes(a)||(n!==void 0&&WA.room.onEnterLayer(e).subscribe(()=>{r||(WA.state[t]=n)}),o!==void 0&&WA.room.onLeaveLayer(e).subscribe(()=>{WA.state[t]=o}))}async function Je(){const t=await S();for(const e of t.values()){const n=new T(e.properties);Ie(n,e.name)}}let Y;async function De(t){const e=await WA.room.getTiledMap();t=t??_,Y=await S();const n=e.layers.find(o=>o.name==="configuration");if(n){const r=new T(n.properties).getString("tag");(!r||WA.player.tags.includes(r))&&WA.ui.registerMenuCommand("Configure the room",()=>{WA.nav.openCoWebSite(t+"/configuration.html",!0)});for(const a of Y.values()){const s=new T(a.properties),i=s.getString("openConfig");i&&a.type==="tilelayer"&&$e(i.split(","),a.name,s)}}}function $e(t,e,n){let o;const r=n.getString("openConfigAdminTag");let a=!0;r&&!WA.player.tags.includes(r)&&(a=!1);function s(){var l;o&&o.remove(),o=WA.ui.displayActionMessage({message:(l=n.getString("openConfigTriggerMessage"))!==null&&l!==void 0?l:"Press SPACE or touch here to configure",callback:()=>$(t)})}function i(){WA.nav.closeCoWebSite()}WA.room.onEnterLayer(e).subscribe(()=>{const l=n.getString("openConfigTrigger");a&&(l&&l==="onaction"?s():$(t))}),WA.room.onLeaveLayer(e).subscribe(()=>{o&&o.remove(),i()})}function J(){return WA.onInit().then(()=>{Ge().catch(t=>console.error(t)),Je().catch(t=>console.error(t)),De().catch(t=>console.error(t)),Oe().catch(t=>console.error(t)),Be().catch(t=>console.error(t))}).catch(t=>console.error(t))}let ae="https://admin.workadventu.re";function se(){const t=WA.player.userRoomToken;if(t===void 0)throw new Error("No userRoomToken found. The quests plugin can only work with WorkAdventure SAAS edition (at https://play.workadventu.re).");return t}async function R(t,e){if(!WA.player.isLogged)throw new Error("You must be logged to gain XP.");const n=new URL(`/api/quests/${t}/level-up`,ae),o=await fetch(n,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:se()},body:JSON.stringify({xp:e})});if(!o.ok)throw new Error(`An error occurred. HTTP Code: ${o.status} ${o.statusText}.`);const r=await o.json();return r.awardedBadges.length>0&&(async()=>{for(const a of r.awardedBadges)await ze(t,a)})().catch(a=>{console.error(a)}),r}async function ze(t,e){const n=new URL(`/quests/${t}/badge/${e}/congratulations`,ae);n.search=new URLSearchParams({token:se()}).toString(),await WA.ui.website.open({url:n.toString(),position:{vertical:"middle",horizontal:"middle"},allowApi:!0,visible:!0,size:{width:"100%",height:"100%"}})}J();console.log("Script started successfully");var k=void 0,j=!1,He="https://forms.office.com/Pages/ResponsePage.aspx?id=nC2noeZJbU-a9lqvoRg7_f26WHDvlOFNi_8Y43fECOdUMDVDTUpUUDRONkxHMzdLQ09WRlQxUUZSMS4u";function D(){k!==void 0&&(k.close(),k=void 0)}var ie="feedback";WA.room.onEnterLayer(ie).subscribe(()=>{k=WA.ui.openPopup("popUpFeedback","Hier kannst du Feedback abgeben.",[{label:"Feedback",callback:t=>{WA.nav.openCoWebSite(He),j=!0,D()}}])});WA.room.onLeaveLayer(ie).subscribe(()=>{D(),j&&(WA.nav.closeCoWebSites(),j=!1)});WA.onInit().then(()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags),J().then(()=>{console.log("Scripting API Extra ready")}).catch(t=>console.error(t)),Ke()}).catch(t=>console.error(t));WA.ui.actionBar.addButton({id:"minimap",type:"action",imageSrc:"https://buenni86.github.io/systel-openspace/map_logo.png",toolTip:"Minimap",callback:async()=>{WA.ui.modal.openModal({title:"Minimap",src:"https://buenni86.github.io/systel-openspace/minimap.html",allow:"fullscreen",allowApi:!0,position:"right"})}});const m="tableStatusMox1";let Q=null;function Ke(){console.log("Mox 'Table' module loaded"),S().then(t=>{Q=t.get("areas").objects.find(n=>n.name==="Mox1");let e=JSON.parse(WA.state.loadVariable(m));Object.keys(e).includes("playerCount")||(e={playerCount:0},WA.state.saveVariable(m,JSON.stringify(e)),console.log("After Saving: ",JSON.parse(WA.state.loadVariable(m))))}),WA.room.area.onEnter("Mox1").subscribe(()=>{Ze(m),Ye(m)?Xe(Q):WA.ui.actionBar.addButton({id:"lockTable",label:"Toggle Table Lock",callback:t=>{console.log(t),Qe(m)}})}),WA.room.area.onLeave("Mox1").subscribe(()=>{Fe(m)})}WA.onInit().then(async()=>{console.log("Scripting API ready"),console.log("Player tags: ",WA.player.tags);var t=await WA.player.getPosition();t.x<2100&&(k=WA.ui.openPopup(popUpStart,startMsg,[{label:"OK",callback:e=>{D()}}])),WA.room.onEnterLayer("pollZone").subscribe(()=>{WA.ui.actionBar.addButton({id:"closePoll",type:"action",imageSrc:"https://flaticons.net/icon.php?slug_category=mobile-application&slug_icon=close",toolTip:"Close Poll",callback:async()=>{if(WA.state.pollOpen===!0)switch(WA.player.state.vote){case"pos":console.log("yes quest xp granted"),R("yes_sayer_quest",100);break;case"neg":console.log("no quest xp granted"),R("no_sayer_quest",100);break;case"neut":console.log("neut quest xp granted"),R("neutral_sayer_quest",100);break}WA.state.pollOpen=!1,console.log(WA.state.pollOpen)}}),WA.ui.actionBar.addButton({id:"resetPoll",type:"action",imageSrc:"https://flaticons.net/icon.php?slug_category=application&slug_icon=command-reset",toolTip:"Reset Poll",callback:async()=>{WA.state.pollOpen=!0,WA.state.voteNeg=0,WA.state.votePos=0,WA.state.voteNeut=0,console.log(WA.state.pollOpen)}})}),WA.room.onLeaveLayer("pollZone").subscribe(()=>{WA.ui.actionBar.removeButton("resetPoll"),WA.ui.actionBar.removeButton("closePoll")}),WA.room.onEnterLayer("votePos").subscribe(()=>{WA.state.pollOpen===!0&&(WA.player.state.vote="pos",console.log(WA.player.state.vote),console.log("VotePos: ",WA.state.votePos),WA.state.votePos++)}),WA.room.onLeaveLayer("votePos").subscribe(()=>{if(WA.player.state.vote="0",WA.state.pollOpen===!0){if(console.log("VotePos: ",WA.state.votePos),console.log(WA.player.state.vote),WA.state.votePos===0)return;WA.state.votePos--}}),WA.room.onEnterLayer("voteNeg").subscribe(()=>{WA.state.pollOpen===!0&&(console.log("voteNeg: ",WA.state.voteNeg),WA.player.state.vote="neg",console.log(WA.player.state.vote),WA.state.voteNeg++)}),WA.room.onLeaveLayer("voteNeg").subscribe(()=>{if(WA.player.state.vote="0",WA.state.pollOpen===!0){if(console.log("voteNeg: ",WA.state.voteNeg),console.log(WA.player.state.vote),WA.state.voteNeg===0)return;WA.state.voteNeg--}}),WA.room.onEnterLayer("voteNeut").subscribe(()=>{WA.state.pollOpen===!0&&(console.log("voteNeut: ",WA.state.voteNeut),WA.player.state.vote="neut",console.log(WA.player.state.vote),WA.state.voteNeut++)}),WA.room.onLeaveLayer("voteNeut").subscribe(()=>{if(WA.player.state.vote="0",WA.state.pollOpen===!0){if(console.log("voteNeut: ",WA.state.voteNeut),console.log(WA.player.state.vote),WA.state.voteNeut===0)return;WA.state.voteNeut--}}),J().then(()=>{console.log("Scripting API Extra ready")}).catch(e=>console.error(e))});function Ze(t){let e=JSON.parse(WA.state.loadVariable(t));e.playerCount=e.playerCount+1,WA.state.saveVariable(t,JSON.stringify(e)),console.log("After increment",JSON.parse(WA.state.loadVariable(t)))}function Fe(t){WA.ui.actionBar.removeButton("lockTable");const e=JSON.parse(WA.state.loadVariable(t));e.playerCount=e.playerCount-1,e.playerCount<=0&&(e.playerCount=0,e.locked=!1),WA.state.saveVariable(t,JSON.stringify(e)),console.log("After decrement",JSON.parse(WA.state.loadVariable(t)))}function Ye(t){return JSON.parse(WA.state.loadVariable(t)).locked}function Qe(t){let e=JSON.parse(WA.state.loadVariable(t));e.locked=!e.locked,WA.state.saveVariable(t,JSON.stringify(e))}function Xe(t){WA.controls.disablePlayerControls(),WA.player.getPosition().then(e=>{const n=t.x+t.width+t.width*.03,o=e.y;WA.player.moveTo(n,o,50).finally(()=>{WA.controls.restorePlayerControls()})})}