function t(t,e,i,n){var r,o=arguments.length,a=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,n);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a}var e,i;"function"==typeof SuppressedError&&SuppressedError,function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(e||(e={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(i||(i={}));const n=["closed","locked","off"],r=(t,e,i,n)=>{n=n||{},i=null==i?{}:i;const r=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return r.detail=i,t.dispatchEvent(r),r},o=t=>{r(window,"haptic",t)},a=(t,e,i,a)=>{if(a||(a={action:"more-info"}),!a.confirmation||a.confirmation.exemptions&&a.confirmation.exemptions.some(t=>t.user===e.user.id)||(o("warning"),confirm(a.confirmation.text||`Are you sure you want to ${a.action}?`)))switch(a.action){case"more-info":(i.entity||i.camera_image)&&r(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":a.navigation_path&&((t,e,i=!1)=>{i?history.replaceState(null,"",e):history.pushState(null,"",e),r(window,"location-changed",{replace:i})})(0,a.navigation_path);break;case"url":a.url_path&&window.open(a.url_path);break;case"toggle":i.entity&&(((t,e)=>{((t,e,i=!0)=>{const n=function(t){return t.substr(0,t.indexOf("."))}(e),r="group"===n?"homeassistant":n;let o;switch(n){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}t.callService(r,o,{entity_id:e})})(t,e,n.includes(t.states[e].state))})(e,i.entity),o("success"));break;case"call-service":{if(!a.service)return void o("failure");const[t,i]=a.service.split(".",2);e.callService(t,i,a.service_data,a.target),o("success");break}case"fire-dom-event":r(t,"ll-custom",a)}},s=(t,e,i,n)=>{let r;i.tap_action&&(r=i.tap_action),a(t,e,i,r)};function l(t){return void 0!==t&&"none"!==t.action}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const c=globalThis,d=c.ShadowRoot&&(void 0===c.ShadyCSS||c.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,h=Symbol(),u=new WeakMap;let p=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==h)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(d&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=u.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&u.set(e,t))}return t}toString(){return this.cssText}};const f=t=>new p("string"==typeof t?t:t+"",void 0,h),_=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1],t[0]);return new p(i,t,h)},m=d?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return f(e)})(t):t,{is:y,defineProperty:g,getOwnPropertyDescriptor:v,getOwnPropertyNames:b,getOwnPropertySymbols:w,getPrototypeOf:x}=Object,$=globalThis,S=$.trustedTypes,E=S?S.emptyScript:"",C=$.reactiveElementPolyfillSupport,A=(t,e)=>t,k={toAttribute(t,e){switch(e){case Boolean:t=t?E:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},O=(t,e)=>!y(t,e),F={attribute:!0,type:String,converter:k,reflect:!1,useDefault:!1,hasChanged:O};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),$.litPropertyMetadata??=new WeakMap;let T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=F){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&g(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:r}=v(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:n,set(e){const o=n?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??F}static _$Ei(){if(this.hasOwnProperty(A("elementProperties")))return;const t=x(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(A("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(A("properties"))){const t=this.properties,e=[...b(t),...w(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(m(t))}else void 0!==t&&e.push(m(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(d)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),n=c.litNonce;void 0!==n&&e.setAttribute("nonce",n),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:k).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:k;this._$Em=n;const o=r.fromAttribute(e,t.type);this[n]=o??this._$Ej?.get(n)??o,this._$Em=null}}requestUpdate(t,e,i,n=!1,r){if(void 0!==t){const o=this.constructor;if(!1===n&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??O)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:n,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===n&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,n=this[e];!0!==t||this._$AL.has(e)||void 0===n||this.C(e,void 0,i,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[A("elementProperties")]=new Map,T[A("finalized")]=new Map,C?.({ReactiveElement:T}),($.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D=globalThis,N=t=>t,L=D.trustedTypes,M=L?L.createPolicy("lit-html",{createHTML:t=>t}):void 0,z="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,H="?"+R,j=`<${H}>`,I=document,P=()=>I.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,B="[ \t\n\f\r]",V=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,q=/>/g,G=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,Z=/"/g,X=/^(?:script|style|textarea|title)$/i,J=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),Q=J(1),tt=J(2),et=Symbol.for("lit-noChange"),it=Symbol.for("lit-nothing"),nt=new WeakMap,rt=I.createTreeWalker(I,129);function ot(t,e){if(!W(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==M?M.createHTML(e):e}const at=(t,e)=>{const i=t.length-1,n=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=V;for(let e=0;e<i;e++){const i=t[e];let s,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,l=a.exec(i),null!==l);)d=a.lastIndex,a===V?"!--"===l[1]?a=K:void 0!==l[1]?a=q:void 0!==l[2]?(X.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=G):void 0!==l[3]&&(a=G):a===G?">"===l[0]?(a=r??V,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?G:'"'===l[3]?Z:Y):a===Z||a===Y?a=G:a===K||a===q?a=V:(a=G,r=void 0);const h=a===G&&t[e+1].startsWith("/>")?" ":"";o+=a===V?i+j:c>=0?(n.push(s),i.slice(0,c)+z+i.slice(c)+R+h):i+R+(-2===c?e:h)}return[ot(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class st{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,o=0;const a=t.length-1,s=this.parts,[l,c]=at(t,e);if(this.el=st.createElement(l,i),rt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=rt.nextNode())&&s.length<a;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(z)){const e=c[o++],i=n.getAttribute(t).split(R),a=/([.?@])?(.*)/.exec(e);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?ut:"?"===a[1]?pt:"@"===a[1]?ft:ht}),n.removeAttribute(t)}else t.startsWith(R)&&(s.push({type:6,index:r}),n.removeAttribute(t));if(X.test(n.tagName)){const t=n.textContent.split(R),e=t.length-1;if(e>0){n.textContent=L?L.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],P()),rt.nextNode(),s.push({type:2,index:++r});n.append(t[e],P())}}}else if(8===n.nodeType)if(n.data===H)s.push({type:2,index:r});else{let t=-1;for(;-1!==(t=n.data.indexOf(R,t+1));)s.push({type:7,index:r}),t+=R.length-1}r++}}static createElement(t,e){const i=I.createElement("template");return i.innerHTML=t,i}}function lt(t,e,i=t,n){if(e===et)return e;let r=void 0!==n?i._$Co?.[n]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=r:i._$Cl=r),void 0!==r&&(e=lt(t,r._$AS(t,e.values),r,n)),e}class ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??I).importNode(e,!0);rt.currentNode=n;let r=rt.nextNode(),o=0,a=0,s=i[0];for(;void 0!==s;){if(o===s.index){let e;2===s.type?e=new dt(r,r.nextSibling,this,t):1===s.type?e=new s.ctor(r,s.name,s.strings,this,t):6===s.type&&(e=new _t(r,this,t)),this._$AV.push(e),s=i[++a]}o!==s?.index&&(r=rt.nextNode(),o++)}return rt.currentNode=I,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class dt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=it,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=lt(this,t,e),U(t)?t===it||null==t||""===t?(this._$AH!==it&&this._$AR(),this._$AH=it):t!==this._$AH&&t!==et&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>W(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==it&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(I.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=st.createElement(ot(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new ct(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=nt.get(t.strings);return void 0===e&&nt.set(t.strings,e=new st(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const r of t)n===e.length?e.push(i=new dt(this.O(P()),this.O(P()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=N(t).nextSibling;N(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ht{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,r){this.type=1,this._$AH=it,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=it}_$AI(t,e=this,i,n){const r=this.strings;let o=!1;if(void 0===r)t=lt(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==et,o&&(this._$AH=t);else{const n=t;let a,s;for(t=r[0],a=0;a<r.length-1;a++)s=lt(this,n[i+a],e,a),s===et&&(s=this._$AH[a]),o||=!U(s)||s!==this._$AH[a],s===it?t=it:t!==it&&(t+=(s??"")+r[a+1]),this._$AH[a]=s}o&&!n&&this.j(t)}j(t){t===it?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ut extends ht{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===it?void 0:t}}class pt extends ht{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==it)}}class ft extends ht{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){if((t=lt(this,t,e,0)??it)===et)return;const i=this._$AH,n=t===it&&i!==it||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==it&&(i===it||n);n&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class _t{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){lt(this,t)}}const mt=D.litHtmlPolyfillSupport;mt?.(st,dt),(D.litHtmlVersions??=[]).push("3.3.2");const yt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let gt=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const n=i?.renderBefore??e;let r=n._$litPart$;if(void 0===r){const t=i?.renderBefore??null;n._$litPart$=r=new dt(e.insertBefore(P(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return et}};gt._$litElement$=!0,gt.finalized=!0,yt.litElementHydrateSupport?.({LitElement:gt});const vt=yt.litElementPolyfillSupport;vt?.({LitElement:gt}),(yt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},wt={attribute:!0,type:String,converter:k,reflect:!1,hasChanged:O},xt=(t=wt,e,i)=>{const{kind:n,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===n&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===n){const{name:n}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(n,r,t,!0,i)},init(e){return void 0!==e&&this.C(n,void 0,t,e),e}}}if("setter"===n){const{name:n}=i;return function(i){const r=this[n];e.call(this,i),this.requestUpdate(n,r,t,!0,i)}}throw Error("Unsupported decorator location: "+n)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $t(t){return(e,i)=>"object"==typeof i?xt(t,e,i):((t,e,i)=>{const n=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),n?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function St(t){return $t({...t,state:!0,attribute:!1})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Et=1,Ct=t=>(...e)=>({_$litDirective$:t,values:e});let At=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kt=Ct(class extends At{constructor(t){if(super(t),t.type!==Et||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const n=!!e[t];n===this.st.has(t)||this.nt?.has(t)||(n?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return et}}),Ot="important",Ft=" !"+Ot,Tt=Ct(class extends At{constructor(t){if(super(t),t.type!==Et||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const n=t[i];return null==n?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${n};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const n=e[t];if(null!=n){this.ft.add(t);const e="string"==typeof n&&n.endsWith(Ft);t.includes("-")||e?i.setProperty(t,e?n.slice(0,-11):n,e?Ot:""):i[t]=n}}return et}});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Dt(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Nt,Lt={exports:{}};var Mt,zt=(Nt||(Nt=1,Mt=Lt,function(){var t=Math.PI,e=Math.sin,i=Math.cos,n=Math.tan,r=Math.asin,o=Math.atan2,a=Math.acos,s=t/180,l=864e5,c=2440588,d=2451545;function h(t){return new Date((t+.5-c)*l)}function u(t){return function(t){return t.valueOf()/l-.5+c}(t)-d}var p=23.4397*s;function f(t,r){return o(e(t)*i(p)-n(r)*e(p),i(t))}function _(t,n){return r(e(n)*i(p)+i(n)*e(p)*e(t))}function m(t,r,a){return o(e(t),i(t)*e(r)-n(a)*i(r))}function y(t,n,o){return r(e(n)*e(o)+i(n)*i(o)*i(t))}function g(t,e){return s*(280.16+360.9856235*t)-e}function v(t){return s*(357.5291+.98560028*t)}function b(i){return i+s*(1.9148*e(i)+.02*e(2*i)+3e-4*e(3*i))+102.9372*s+t}function w(t){var e=b(v(t));return{dec:_(e,0),ra:f(e,0)}}var x={getPosition:function(t,e,i){var n=s*-i,r=s*e,o=u(t),a=w(o),l=g(o,n)-a.ra;return{azimuth:m(l,r,a.dec),altitude:y(l,r,a.dec)}}},$=x.times=[[-.833,"sunrise","sunset"],[-.3,"sunriseEnd","sunsetStart"],[-6,"dawn","dusk"],[-12,"nauticalDawn","nauticalDusk"],[-18,"nightEnd","night"],[6,"goldenHourEnd","goldenHour"]];x.addTime=function(t,e,i){$.push([t,e,i])};var S=9e-4;function E(e,i,n){return S+(e+i)/(2*t)+n}function C(t,i,n){return d+t+.0053*e(i)-.0069*e(2*n)}function A(t,n,r,o,s,l,c){var d=function(t,n,r){return a((e(t)-e(n)*e(r))/(i(n)*i(r)))}(t,r,o);return C(E(d,n,s),l,c)}function k(t){var n=s*(134.963+13.064993*t),r=s*(93.272+13.22935*t),o=s*(218.316+13.176396*t)+6.289*s*e(n),a=5.128*s*e(r),l=385001-20905*i(n);return{ra:f(o,a),dec:_(o,a),dist:l}}function O(t,e){return new Date(t.valueOf()+e*l/24)}x.getTimes=function(e,i,n,r){var o,a,l,c,d,p=s*-n,f=s*i,m=function(t){return-2.076*Math.sqrt(t)/60}(r=r||0),y=function(e,i){return Math.round(e-S-i/(2*t))}(u(e),p),g=E(0,p,y),w=v(g),x=b(w),k=_(x,0),O=C(g,w,x),F={solarNoon:h(O),nadir:h(O-.5)};for(o=0,a=$.length;o<a;o+=1)d=O-((c=A(((l=$[o])[0]+m)*s,p,f,k,y,w,x))-O),F[l[1]]=h(d),F[l[2]]=h(c);return F},x.getMoonPosition=function(t,r,a){var l=s*-a,c=s*r,d=u(t),h=k(d),p=g(d,l)-h.ra,f=y(p,c,h.dec),_=o(e(p),n(c)*i(h.dec)-e(h.dec)*i(p));return f+=function(t){return t<0&&(t=0),2967e-7/Math.tan(t+.00312536/(t+.08901179))}(f),{azimuth:m(p,c,h.dec),altitude:f,distance:h.dist,parallacticAngle:_}},x.getMoonIllumination=function(t){var n=u(t||new Date),r=w(n),s=k(n),l=149598e3,c=a(e(r.dec)*e(s.dec)+i(r.dec)*i(s.dec)*i(r.ra-s.ra)),d=o(l*e(c),s.dist-l*i(c)),h=o(i(r.dec)*e(r.ra-s.ra),e(r.dec)*i(s.dec)-i(r.dec)*e(s.dec)*i(r.ra-s.ra));return{fraction:(1+i(d))/2,phase:.5+.5*d*(h<0?-1:1)/Math.PI,angle:h}},x.getMoonTimes=function(t,e,i,n){var r=new Date(t);n?r.setUTCHours(0,0,0,0):r.setHours(0,0,0,0);for(var o,a,l,c,d,h,u,p,f,_,m,y,g,v=.133*s,b=x.getMoonPosition(r,e,i).altitude-v,w=1;w<=24&&(o=x.getMoonPosition(O(r,w),e,i).altitude-v,p=((d=(b+(a=x.getMoonPosition(O(r,w+1),e,i).altitude-v))/2-o)*(u=-(h=(a-b)/2)/(2*d))+h)*u+o,_=0,(f=h*h-4*d*o)>=0&&(m=u-(g=Math.sqrt(f)/(2*Math.abs(d))),y=u+g,Math.abs(m)<=1&&_++,Math.abs(y)<=1&&_++,m<-1&&(m=y)),1===_?b<0?l=w+m:c=w+m:2===_&&(l=w+(p<0?y:m),c=w+(p<0?m:y)),!l||!c);w+=2)b=a;var $={};return l&&($.rise=O(r,l)),c&&($.set=O(r,c)),l||c||($[p>0?"alwaysUp":"alwaysDown"]=!0),$},Mt.exports=x}()),Lt.exports),Rt=Dt(zt),Ht="ha-card {\n  /* Auto-size by default, but also respect explicit heights from the parent */\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.weather {\n  width: 100%;\n  min-height: var(--dwf-header-height, calc(2.3 * var(--row-height, 56px)));\n  /* Background image will be set via JS */\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n  border-top-left-radius: var(--ha-card-border-radius, 12px);\n  border-top-right-radius: var(--ha-card-border-radius, 12px);\n  flex-shrink: 0;\n  color: white;\n  display: flex;\n  flex-direction: column;\n}\n\n.weather.header-only {\n  height: 100%;\n  flex: 1 1 auto;\n  border-bottom-left-radius: var(--ha-card-border-radius, 12px);\n  border-bottom-right-radius: var(--ha-card-border-radius, 12px);\n}\n\n.weather .header-content {\n  display: flex;\n  flex-direction: column;\n  padding-block: var(--dwf-header-padding-block, 16px);\n  padding-inline: var(--dwf-header-padding-inline, 16px);\n  gap: var(--dwf-header-content-gap, 12px);\n  width: 100%;\n  box-sizing: border-box;\n  flex: 1 1 auto;\n  min-width: 0;\n}\n\n.weather .header-layout {\n  display: flex;\n  flex-direction: row;\n  align-items: stretch;\n  justify-content: flex-start;\n  gap: 0;\n  width: 100%;\n  min-width: 0;\n  flex: 0 0 auto;\n}\n\n.weather .header-main {\n  margin-left: auto;\n  padding-left: var(--dwf-header-columns-gap, 16px);\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-end;\n  gap: var(--dwf-header-main-gap, 10px);\n  align-self: stretch;\n  min-height: 0;\n  flex: 0 1 auto;\n  min-width: 0;\n}\n\n.weather .header-attributes {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  gap: var(--dwf-header-attribute-gap, 8px);\n  align-self: stretch;\n  min-height: 0;\n  flex: 1 1 0;\n  min-width: 30%;\n}\n\n.weather .attribute-chip {\n  font-size: var(--ha-font-size-m);\n  line-height: calc(6px + var(--ha-font-size-m));\n  background-color: rgba(0, 0, 0, 0.35);\n  padding: var(--ha-space-1, 4px) var(--ha-space-3, 12px);\n  border-radius: 25px;\n  color: inherit;\n  max-width: 100%;\n  min-width: 0;\n  display: inline-flex;\n  align-items: center;\n  align-self: flex-start;\n  overflow: hidden;\n}\n\n.weather .attribute-chip .chip-icon {\n  margin-right: 6px;\n  --mdc-icon-size: 20px;\n  color: inherit;\n}\n\n.weather .attribute-chip.has-action {\n  cursor: pointer;\n}\n\n.weather .attribute-chip.has-action:focus-visible {\n  outline: 2px solid rgba(255, 255, 255, 0.9);\n  outline-offset: 2px;\n}\n\n.weather .attribute-chip.missing {\n  opacity: 0.8;\n  font-style: italic;\n}\n\n.weather .condition {\n  font-size: var(--ha-font-size-xl);\n  line-height: calc(10px + var(--ha-font-size-xl));\n  background-color: rgba(0, 0, 0, 0.3);\n  padding: var(--ha-space-1, 4px) var(--ha-space-4, 16px);\n  border-radius: 25px;\n  max-width: 70%;\n  min-width: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n\n.weather .temp.has-action,\n.weather .condition.has-action {\n  cursor: pointer;\n}\n\n.weather .temp.has-action:focus-visible,\n.weather .condition.has-action:focus-visible {\n  outline: 2px solid rgba(255, 255, 255, 0.9);\n  outline-offset: 2px;\n}\n\n.weather .temp {\n  font-size: var(--ha-font-size-5xl);\n  line-height: calc(10px + var(--ha-font-size-xl));\n  font-weight: var(--ha-font-weight-bold, bold);\n  background-color: rgba(0, 0, 0, 0.3);\n  padding: 2px var(--ha-space-4, 16px);\n  border-radius: 25px;\n  max-width: 100%;\n  min-width: 0;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}\n\n.weather .header-pill-text {\n  flex: 0 1 auto;\n  min-width: 0;\n  white-space: normal;\n}\n\n.weather .nowcast-panel {\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 16px;\n  padding: var(--ha-space-3, 12px) var(--ha-space-3, 12px) 6px var(--ha-space-3, 12px);\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  min-height: 0;\n}\n\n.weather dwf-nowcast {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  height: 100%;\n  width: 100%;\n  min-width: 0;\n  min-height: 0;\n  flex: 1 1 auto;\n  overflow: hidden;\n}\n\n.weather .nowcast-bars {\n  display: flex;\n  align-items: stretch;\n  gap: var(--dwf-nowcast-gap, 5px);\n  flex: 1 1 auto;\n  min-height: 24px;\n}\n\n.weather .nowcast-bar {\n  flex: 1 1 0;\n  background: rgba(255, 255, 255, 0.025);\n  border-radius: 999px;\n  display: flex;\n  align-items: flex-end;\n  overflow: hidden;\n  min-height: 6px;\n  height: auto;\n  align-self: stretch;\n}\n\n.weather .nowcast-bar-fill {\n  width: 100%;\n  height: 0%;\n  background: var(--dwf-nowcast-fill-color, #4aafff);\n  border-radius: inherit;\n  transition: height 0.35s ease;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .weather .nowcast-bar-fill {\n    transition: none;\n  }\n\n  .weather .nowcast-labels {\n    transition: none;\n  }\n}\n\n.weather .nowcast-labels {\n  display: flex;\n  justify-content: space-between;\n  font-size: var(--ha-font-size-s);\n  color: white;\n  transition: transform 0.35s ease;\n  will-change: transform;\n}\n\n.forecast-container {\n  /* Allow the forecast section to grow when the card is taller */\n  width: 100%;\n  display: flex;\n  flex: 0 1 auto;\n  padding-top: var(--ha-space-1, 4px);\n  padding-bottom: var(--ha-space-5, 20px);\n  flex-direction: column;\n  gap: 4px;\n}\n\n.divider {\n  background-color: var(--primary-background-color);\n}\n\n.card-divider {\n  height: 4px;\n}\n\n.forecast-divider {\n  border-radius: 2px;\n}\n\n.forecast-container > .forecast-divider {\n  height: 4px;\n  margin: 14px 16px 4px 16px;\n}\n\n.forecast-daily-container,\n.forecast-hourly-container {\n  position: relative; /* Fading overlays should be relative positioned */\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  flex: 0 1 auto;\n  touch-action: pan-x;\n  overscroll-behavior-x: contain;\n}\n\n.fade-left,\n.fade-right {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 16px;\n  pointer-events: none;\n  z-index: 2;\n}\n\n.fade-left {\n  left: 0;\n  background: linear-gradient(\n    to right,\n    var(--card-background-color) 0%,\n    var(--card-background-color) 2px,\n    transparent 100%\n  );\n}\n\n.fade-right {\n  right: 0;\n  background: linear-gradient(\n    to left,\n    var(--card-background-color) 0%,\n    var(--card-background-color) 2px,\n    transparent 100%\n  );\n}\n\n.forecast {\n  --forecast-inline-padding: 16px;\n  /* Allow this row to expand when parent is taller */\n  flex: 0 1 auto;\n  height: auto;\n  scroll-snap-type: x mandatory;\n  scroll-padding-left: var(--forecast-inline-padding);\n  scroll-padding-right: var(--forecast-inline-padding);\n  overflow-x: auto;\n  overflow-y: clip; /* no vertical scrolling in case of a few px overflow */\n  display: flex;\n  align-items: stretch; /* stretch items so they can use additional height */\n  justify-content: space-around;\n  gap: var(--dynamic-gap, 20px); /* fallback */\n  padding: var(--ha-space-2, 8px) var(--forecast-inline-padding) 0px;\n}\n\n@supports (-webkit-touch-callout: none) {\n  .forecast {\n    padding-bottom: var(--ha-space-3, 12px); /* a touch more space on Safari */\n  }\n}\n\n/* Make custom element wrappers layout-transparent so their children\n   become direct flex items of the forecast container */\n.forecast dwf-daily-list,\n.forecast dwf-hourly-list {\n  display: contents;\n}\n\n.forecast.daily {\n  --min-gap: 30px;\n  --icon-size: 60px;\n  --icon-container-width: 60px;\n  cursor: grab;\n  user-select: none;\n  -webkit-user-select: none;\n}\n\n.forecast.hourly {\n  padding-top: 32px;\n  --min-gap: 16px;\n  --icon-size: 60px;\n  --icon-container-width: 60px;\n  --day-marker-width: 60px;\n  cursor: grab;\n  user-select: none;\n  -webkit-user-select: none;\n}\n\n.forecast.hourly.dragging,\n.forecast.hourly.momentum,\n.forecast.daily.dragging,\n.forecast.daily.momentum {\n  scroll-snap-type: none;\n}\n\n.forecast.hourly.grabbing,\n.forecast.daily.grabbing {\n  cursor: grabbing;\n}\n\n.forecast::-webkit-scrollbar {\n  height: 0px;\n}\n\n.forecast::-webkit-scrollbar-thumb,\n.forecast::-webkit-scrollbar-track,\n.forecast::-webkit-scrollbar-corner {\n  background: transparent;\n}\n\n.forecast {\n  -ms-overflow-style: none; /* Internet Explorer 10+ */\n  scrollbar-width: none; /* Firefox, Safari 18.2+, Chromium 121+ */\n}\n.forecast::-webkit-scrollbar {\n  display: none; /* Older Safari and Chromium */\n}\n\n.forecast-item {\n  scroll-snap-align: start;\n  text-align: center;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  cursor: pointer;\n}\n\n.forecast.hourly .forecast-item {\n  width: var(--icon-container-width);\n  align-items: center;\n  overflow: visible;\n}\n\n.forecast.hourly .day-marker {\n  --day-marker-translate-x: calc(\n    (var(--dynamic-gap, 20px) + var(--icon-container-width) - var(--day-marker-width)) / 2\n  );\n  flex: 0 0 auto;\n  align-self: start;\n  position: sticky;\n  left: calc((((var(--day-marker-width) - var(--icon-container-width)) / 2) * -1) - var(--day-marker-translate-x));\n  transform: translateX(var(--day-marker-translate-x)) translateY(-100%);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 999px;\n  font-weight: var(--ha-font-weight-bold, bold);\n  color: white;\n  background-color: var(--state-climate-cool-color);\n  pointer-events: none;\n  white-space: nowrap;\n  z-index: 3;\n  scroll-snap-align: none;\n  width: var(--day-marker-width);\n  margin-right: calc(var(--day-marker-width) * -1 - var(--dynamic-gap) / 2); /* Fallback if round() not available */\n  margin-right: calc(round(up, var(--day-marker-width) * -1 - var(--dynamic-gap) / 2, 1px));\n  margin-left: calc(var(--dynamic-gap) * -1 / 2);\n}\n\n.forecast .day-of-month {\n  margin-top: -4px;\n  font-size: 13px;\n  opacity: 0.3;\n}\n\n.forecast .date.sunrise {\n  color: var(--orange-color, #ff9800);\n  font-weight: var(--ha-font-weight-medium, 500);\n}\n\n.forecast .date.sunset {\n  color: var(--purple-color, #926bc7);\n  font-weight: var(--ha-font-weight-medium, 500);\n}\n\n.forecast.daily .date.selected {\n  background-color: var(--state-climate-cool-color);\n  color: white;\n  border-radius: 999px;\n}\n\n.forecast.hourly .date {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: var(--icon-container-width);\n  margin: 0 auto;\n  text-align: center;\n  white-space: nowrap;\n}\n\n.forecast.hourly .date.selected {\n  background-color: var(--state-climate-cool-color);\n  color: white;\n  border-radius: 999px;\n}\n\n.forecast .ampm {\n  font-size: 11px;\n  opacity: 0.3;\n}\n\n.forecast .temp {\n  font-size: var(--ha-font-size-xl);\n  font-weight: var(--ha-font-weight-bold, bold);\n}\n\n.forecast .templow {\n  opacity: 0.5;\n  font-weight: var(--ha-font-weight-bold, bold);\n  font-size: var(--ha-font-size-l);\n}\n\n.forecast .precipitation,\n.forecast .precipitationprobability {\n  opacity: 0.3;\n  color: var(--state-climate-cool-color);\n  min-height: 20px;\n}\n\n.forecast .hourly-extra {\n  opacity: 0.6;\n  color: var(--primary-text-color);\n  min-height: 20px;\n  font-weight: var(--ha-font-weight-medium, 500);\n  white-space: nowrap;\n}\n\n.forecast .hourly-extra.dimmed {\n  opacity: 0.3;\n}\n\n.forecast .precipitation {\n  --precipitation-fill: 0%;\n  --dwf-precipitation-indicator-color: var(--state-climate-cool-color);\n  --dwf-precipitation-indicator-opacity: 0.2;\n  --dwf-precipitation-indicator-padding-inline: 8px;\n  --dwf-precipitation-indicator-padding-block: 0px;\n  --dwf-precipitation-indicator-offset-top: 0px;\n  --dwf-precipitation-indicator-offset-bottom: 0px;\n  position: relative;\n  display: inline-block;\n  padding-inline: var(--dwf-precipitation-indicator-padding-inline);\n  padding-block: var(--dwf-precipitation-indicator-padding-block);\n  border-radius: var(--dwf-precipitation-indicator-radius, 4px);\n  overflow: hidden;\n  z-index: 0;\n}\n\n.forecast .precipitation::before {\n  content: '';\n  position: absolute;\n  inset-inline: 0;\n  top: calc(100% - var(--precipitation-fill, 0%) - var(--dwf-precipitation-indicator-offset-top, 0px));\n  bottom: calc(0px - var(--dwf-precipitation-indicator-offset-bottom, 0px));\n  background-color: var(--dwf-precipitation-indicator-color, var(--state-climate-cool-color));\n  opacity: var(--dwf-precipitation-indicator-opacity, 0.2);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: -1;\n  transition:\n    top 150ms ease-in-out,\n    background-color 150ms ease-in-out;\n}\n\n.forecast .precipitation.overflow {\n  --dwf-precipitation-indicator-color: var(--red-color, #f44336);\n  color: var(--red-color, #f44336);\n}\n\n.forecast.daily .forecast-item > .precipitation {\n  line-height: 18px;\n}\n\n.forecast .precipitation.active,\n.forecast .precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast .daily-extra {\n  opacity: 0.6;\n  color: var(--primary-text-color);\n  min-height: 20px;\n  font-weight: var(--ha-font-weight-medium, 500);\n  white-space: nowrap;\n}\n\n.forecast .daily-extra.dimmed {\n  opacity: 0.3;\n}\n\n.forecast.daily .daily-extra.precipitationprobability {\n  color: var(--state-climate-cool-color);\n  opacity: 0.3;\n  display: block !important;\n}\n\n.forecast .daily-extra.precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast.daily .forecast-item {\n  display: grid;\n  grid-auto-rows: max-content;\n  align-content: start;\n}\n\n/* Ensure the first two text rows don't overlap and size to their content */\n.forecast.daily .forecast-item > .date,\n.forecast.daily .forecast-item > .day-of-month,\n.forecast.daily .forecast-item > .precipitation,\n.forecast.daily .forecast-item > .precipitationprobability,\n.forecast.daily .forecast-item > .daily-extra {\n  min-height: auto;\n}\n\n.forecast.daily .forecast-item > .date {\n  grid-row: 1;\n}\n.forecast.daily .forecast-item > .day-of-month {\n  grid-row: 2;\n}\n.forecast.daily .forecast-item > .forecast-image-icon {\n  grid-row: 3;\n}\n.forecast.daily .forecast-item > .temp {\n  grid-row: 4;\n}\n.forecast.daily .forecast-item > .templow {\n  grid-row: 5;\n}\n.forecast.daily .forecast-item > .precipitation {\n  grid-row: 6;\n}\n.forecast.daily .forecast-item > .precipitationprobability {\n  grid-row: 7;\n}\n.forecast.daily .forecast-item > .daily-extra {\n  grid-row: 8;\n  justify-self: center;\n  text-align: center;\n  width: var(--icon-size);\n}\n\n.forecast-image-icon {\n  display: flex;\n  justify-content: center;\n}\n\n.forecast-image-icon > * {\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n\n.forecast-image-icon ha-icon {\n  --mdc-icon-size: var(--icon-size);\n}\n\n/* Styles from weather.ts */\n.rain {\n  fill: var(--weather-icon-rain-color, #30b3ff);\n}\n.sun {\n  fill: var(--weather-icon-sun-color, #fdd93c);\n}\n.moon {\n  fill: var(--weather-icon-moon-color, #fcf497);\n}\n.cloud-back {\n  fill: var(--weather-icon-cloud-back-color, #d4d4d4);\n}\n.cloud-front {\n  fill: var(--weather-icon-cloud-front-color, #f9f9f9);\n}\n.snow {\n  fill: var(--weather-icon-snow-color, #f9f9f9);\n  stroke: var(--weather-icon-snow-stroke-color, #d4d4d4);\n  stroke-width: 1;\n  paint-order: stroke;\n}\n\ndwf-current-weather-attributes {\n  display: contents;\n}\n\n.dwf-current-attributes {\n  display: flex;\n  flex-direction: column;\n  gap: var(--ha-space-1, 4px);\n  min-width: 0;\n  padding: var(--ha-space-2, 8px) var(--ha-space-4, 16px);\n}\n\n.dwf-current-attribute {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--ha-space-1, 4px);\n  font-size: var(--ha-font-size-m, 14px);\n  line-height: var(--ha-line-height-condensed);\n  color: var(--primary-text-color, #212121);\n  white-space: nowrap;\n}\n\n.dwf-current-attribute.has-action {\n  cursor: pointer;\n}\n\n.dwf-current-attribute-icon {\n  color: var(--state-icon-color, #616161);\n  padding-left: var(--ha-space-2, 8px);\n}\n\n.dwf-current-attribute-value,\n.dwf-current-attribute-name {\n  overflow: hidden;\n  white-space: nowrap;\n}\n\n.dwf-current-attribute-name {\n  text-overflow: ellipsis;\n  padding-left: var(--ha-space-4, 16px);\n  flex: 1;\n}\n\n.forecast-condition {\n  text-align: center;\n  font-weight: var(--ha-font-weight-bold, bold);\n  padding: var(--ha-space-2, 8px) var(--ha-space-4, 16px);\n  font-size: var(--ha-font-size-m, 14px);\n  color: var(--primary-text-color, #212121);\n}\n\n.compact-header {\n  --icon-size: 60px;\n  --icon-container-width: 60px;\n  display: flex;\n  flex-direction: column;\n  color: var(--primary-text-color);\n}\n.compact-header .current-conditions {\n  padding: var(--ha-space-4, 16px);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.compact-header .has-action {\n  cursor: pointer;\n}\n.compact-header .condition {\n  font-size: var(--ha-font-size-xl, 20px);\n  font-weight: var(--ha-font-weight-normal, 400);\n  text-align: center;\n}\n.compact-header .weather-icon {\n  display: flex;\n  justify-content: center;\n  width: var(--icon-container-width);\n}\n.compact-header .weather-icon ha-icon {\n  --mdc-icon-size: var(--icon-size);\n}\n.compact-header .temperature {\n  font-size: var(--ha-font-size-2xl, 24px);\n  font-weight: var(--ha-font-weight-normal, 400);\n}\n.compact-header .nowcast-panel {\n  padding: 0 var(--ha-space-4, 16px);\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  min-height: 0;\n}\n.compact-header dwf-nowcast {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n  height: 100%;\n  width: 100%;\n  min-width: 0;\n  min-height: 0;\n  flex: 1 1 auto;\n  overflow: hidden;\n}\n.compact-header .nowcast-bars {\n  display: flex;\n  align-items: stretch;\n  gap: var(--dwf-nowcast-gap, 5px);\n  flex: 1 1 auto;\n  min-height: 24px;\n}\n.compact-header .nowcast-bar {\n  flex: 1 1 0;\n  background: rgba(0, 0, 0, 0.05);\n  border-radius: 999px;\n  display: flex;\n  align-items: flex-end;\n  overflow: hidden;\n  min-height: 6px;\n  height: auto;\n  align-self: stretch;\n}\n.compact-header .nowcast-bar-fill {\n  width: 100%;\n  height: 0%;\n  background: var(--dwf-nowcast-fill-color, #4aafff);\n  border-radius: inherit;\n  transition: height 0.35s ease;\n}\n.compact-header .nowcast-labels {\n  display: flex;\n  justify-content: space-between;\n  font-size: var(--ha-font-size-s);\n  color: var(--primary-text-color);\n  transition: transform 0.35s ease;\n  will-change: transform;\n}\n",jt={common:{version:"Version"},editor:{card:{type:"Typ",divisor:"Teiler"},main:{entity:"Wetter-Entität",header_temperature_entity:"Lokaler Temperatursensor (Überschreibt den aktuellen Temperaturwert der Vorhersage)",header_tap_action_temperature:"Temperatur-Tipp-Aktion",compact_header:"Kompakte Ansicht ohne Hintergrundbilder",use_night_header_backgrounds:"Separate Header-Hintergründe für nächtliche Bedingungen verwenden",nowcast_entity:"Nowcast-Entität (Für den Niederschlag der nächsten Stunde. Die Entitätsintegration muss eine `get_minute_forecast`-Aktion bereitstellen, um die Daten abzurufen.)",nowcast_layout:"Nowcast-Layout",nowcast_always_show:"Nowcast immer anzeigen",hourly_extra_attribute:"Zusätzliches stündliches Attribut (dritte Zeile)",hourly_extra_attribute_unit:"Einheit für zusätzliches stündliches Attribut",hourly_extra_attribute_divisor:"Teiler für zusätzliches stündliches Attribut",daily_extra_attribute:"Zusätzliches tägliches Attribut (dritte Zeile)",daily_extra_attribute_unit:"Einheit für zusätzliches tägliches Attribut",daily_extra_attribute_divisor:"Teiler für zusätzliches tägliches Attribut",loading_forecast_attributes:"Lade verfügbare Wetterattribute...",header_chip:{type:"Header-Chip {index}: Modus",attribute:"Header-Chip {index}: Attribut",icon:"Header-Chip {index}: Icon",tap_action:"Header-Chip {index}: Tipp-Aktion",unit:"Header-Chip {index}: Einheit",divisor:"Header-Chip {index}: Teiler",label:"Header-Chip {index}"}},chip:{attribute:"Attribut",entity:"Entität"},weather_condition:{"clear-night":"Klare Nacht",cloudy:"Wolkig",fog:"Nebel",hail:"Hagel",lightning:"Blitz","lightning-rainy":"Gewitterregen",partlycloudy:"Teilweise wolkig","partlycloudy-night":"Teilweise wolkige Nacht",pouring:"Starkregen",rainy:"Regnerisch",snowy:"Schneefall","snowy-rainy":"Schneeregen",sunny:"Sonnig",windy:"Windig","windy-variant":"Wind-Variante",exceptional:"Außergewöhnlich"},section:{gps_coordinates:"GPS-Koordinaten",gps_coordinates_description:"Wird für Sonnenaufgangs-/Sonnenuntergangsmarkierungen und Tag-/Nachthintergründe benötigt",use_home_assistant_location:"Home Assistant-Standort verwenden",latitude:"Breitengrad",longitude:"Längengrad",solar_forecast:"Solarenergie-Vorhersage",solar_forecast_description:"Die Vorhersage muss einer Solarmodul-Konfiguration in den Energie-Dashboard-Einstellungen zugewiesen werden. Andernfalls kann sie hier nicht verwendet werden.",energy_solar_forecasts:"Energie-Solar-Vorhersagen",no_energy_solar_forecasts_configured:"Keine Energie-Solar-Vorhersagen konfiguriert.",custom_icons:"Benutzerdefinierte Icons",custom_icons_description:"Überschreiben Sie die Standard-Wettersymbole mit einem beliebigen in Home Assistant verfügbaren Symbol.",header:"Kopfzeile",chips:"Chips",chips_description:"Wählen Sie Attribut oder Entität für bis zu drei Header-Chips.",nowcast:"Nowcast",nowcast_description:"Steuert das minutengenaue Niederschlagsdiagramm, das in der Kopfzeile angezeigt wird.",header_info:"Wetterbedingung-Info",header_info_description:"Attribute und Entitäten konfigurieren, die bei Klick auf die Wetterbedingung unterhalb der Kopfzeile angezeigt werden sollen.",add_attribute:"Attribut hinzufügen",daily_forecast:"Tägliche Vorhersage",extra_attribute_color:"Zusätzliche Attributfarbe",clear:"Löschen",dim_values_smaller_than:"Werte dimmen, die kleiner sind als:",no_threshold:"Kein Schwellenwert",forecast_spacing:"Vorhersage-Abstand",forecast_spacing_description:"Mindestabstand zwischen den Vorhersageelementen in Pixel (10px oder größer)",daily_min_gap:"Täglicher Mindestabstand (px)",default_30:"Standard 30",daily_forecast_info:"Tägliche Vorhersage-Info",daily_forecast_info_description:"Attribute konfigurieren, die unterhalb der täglichen Vorhersage angezeigt werden sollen, wenn ein Tag ausgewählt wurde.",hourly_forecast:"Stündliche Vorhersage",sunrise_sunset:"Sonnenaufgang & Sonnenuntergang",show_sunrise_sunset:"Sonnenaufgang & Sonnenuntergang anzeigen",hourly_min_gap:"Stündlicher Mindestabstand (px)",default_16:"Standard 16",hourly_forecast_info:"Stündliche Vorhersage-Info",hourly_forecast_info_description:"Attribute konfigurieren, die unterhalb der stündlichen Vorhersage angezeigt werden sollen, wenn eine Stunde ausgewählt wurde."},common:{none:"Keine",solar_forecast:"Solarenergie-Vorhersage"},selector:{weather_attribute:"Wetter-Attribut",entity:"Entität"}},card:{nowcast:{now:"Jetzt"},pictocode_day:{1:"Sonnig, wolkenloser Himmel",2:"Sonnig mit einigen Wolken",3:"Wechselnd bewölkt",4:"Bedeckt",5:"Nebel",6:"Bedeckt mit Regen",7:"Wechselhaft, Schauer möglich",8:"Schauer, Gewitter möglich",9:"Bedeckt mit Schneefall",10:"Wechselhaft mit Schneeschauern",11:"Überwiegend bewölkt mit Schnee und Regen",12:"Bedeckt mit leichtem Regen",13:"Bedeckt mit leichtem Schneefall",14:"Überwiegend bewölkt mit Regen",15:"Überwiegend bewölkt mit Schneefall",16:"Überwiegend bewölkt mit leichtem Regen",17:"Überwiegend bewölkt mit leichtem Schneefall"},pictocode_hour:{1:"Klar, wolkenlos",2:"Klar, vereinzelt Cirrus-Wolken",3:"Klar mit Cirrus-Wolken",4:"Klar mit einigen niederen Wolken",5:"Klar mit einigen niederen Wolken sowie vereinzelt Cirrus-Wolken",6:"Klar mit einigen niederen Wolken sowie Cirrus-Wolken",7:"Wechselnd bewölkt",8:"Teilweise bewölkt mit vereinzelt Cirrus-Wolken",9:"Teilweise bewölkt mit Cirrus-Wolken",10:"Wechselhaft, vereinzelt Gewitter möglich",11:"Wechselhaft, vereinzelt Cirrus-Wolken und Gewitter möglich",12:"Wechselhaft mit Cirrus-Wolken, Gewitter möglich",13:"Klar, aber dunstig",14:"Klar, aber dunstig mit einigen Cirrus-Wolken",15:"Klar, aber dunstig mit Cirrus-Wolken",16:"Nebel/niedere Schichtwolken",17:"Nebel/niedere Schichtwolken mit vereinzelt Cirrus-Wolken",18:"Nebel/niedere Schichtwolken mit Cirrus-Wolken",19:"Überwiegend bewölkt",20:"Überwiegend bewölkt, vereinzelt Cirrus-Wolken",21:"Überwiegend bewölkt mit Cirrus-Wolken",22:"Bedeckt",23:"Bedeckt mit Regen",24:"Bedeckt mit Schneefall",25:"Bedeckt mit starkem Regen",26:"Bedeckt mit starkem Schneefall",27:"Regen, Gewitter möglich",28:"Leichter Regen, Gewitter möglich",29:"Sturm mit starkem Schneefall",30:"Starker Regen, Gewitter möglich",31:"Wechselhaft, Schauer möglich",32:"Wechselhaft mit Schneeschauern",33:"Bedeckt mit leichtem Regen",34:"Bedeckt mit leichtem Schneefall",35:"Bedeckt mit Schnee und Regen"}}},It={common:{version:"Version"},editor:{card:{type:"Type",divisor:"Divisor"},main:{entity:"Weather Entity",header_temperature_entity:"Local Temperature Sensor Entity (Overrides the current temperature value of the forecast)",header_tap_action_temperature:"Temperature tap action",compact_header:"Compact view without background images",use_night_header_backgrounds:"Use separate header backgrounds for nightly conditions",nowcast_entity:"Nowcast Entity (For next-hour precipitation. The entity integration must provide a get_minute_forecast action to fetch the data.)",nowcast_layout:"Nowcast layout",nowcast_always_show:"Always show nowcast",hourly_extra_attribute:"Hourly extra attribute (third line)",hourly_extra_attribute_unit:"Unit for hourly extra attribute",hourly_extra_attribute_divisor:"Divisor for hourly extra attribute",daily_extra_attribute:"Daily extra attribute (third line)",daily_extra_attribute_unit:"Unit for daily extra attribute",daily_extra_attribute_divisor:"Divisor for daily extra attribute",loading_forecast_attributes:"Loading available weather attributes...",header_chip:{type:"Header chip {index}: mode",attribute:"Header chip {index}: attribute",icon:"Header chip {index}: icon",tap_action:"Header chip {index}: tap action",unit:"Header chip {index}: unit",divisor:"Header chip {index}: divisor",label:"Header chip {index}"}},chip:{attribute:"Attribute",entity:"Entity"},weather_condition:{"clear-night":"Clear night",cloudy:"Cloudy",fog:"Fog",hail:"Hail",lightning:"Lightning","lightning-rainy":"Lightning rainy",partlycloudy:"Partly cloudy","partlycloudy-night":"Partly cloudy night",pouring:"Pouring",rainy:"Rainy",snowy:"Snowy","snowy-rainy":"Snowy rainy",sunny:"Sunny",windy:"Windy","windy-variant":"Windy variant",exceptional:"Exceptional"},section:{gps_coordinates:"GPS Coordinates",gps_coordinates_description:"Needed for sunrise/sunset markers and day/night backgrounds",use_home_assistant_location:"Use Home Assistant location",latitude:"Latitude",longitude:"Longitude",solar_forecast:"Solar Forecast",solar_forecast_description:"The forecast needs to be assigned to a solar panel configuration in the Energy dashboard settings. Otherwise it can't be used here.",energy_solar_forecasts:"Energy solar forecasts",no_energy_solar_forecasts_configured:"No Energy solar forecasts configured.",custom_icons:"Custom Icons",custom_icons_description:"Override the default weather icons with any icon available in Home Assistant.",header:"Header",chips:"Chips",chips_description:"Choose Attribute or entity for up to three header chips.",nowcast:"Nowcast",nowcast_description:"Controls the minute-by-minute precipitation chart shown inside the header.",header_info:"Weather condition info",header_info_description:"Configure attributes and entities to be displayed below the header when the weather condition is clicked.",add_attribute:"Add Attribute",daily_forecast:"Daily forecast",extra_attribute_color:"Extra attribute color",clear:"Clear",dim_values_smaller_than:"Dim values smaller than:",no_threshold:"No threshold",forecast_spacing:"Forecast spacing",forecast_spacing_description:"Minimum distance between forecast items in pixels (10px or greater)",daily_min_gap:"Daily min gap (px)",default_30:"Default 30",daily_forecast_info:"Daily Forecast Info",daily_forecast_info_description:"Configure attributes to be displayed below the daily forecast when a day is selected.",hourly_forecast:"Hourly forecast",sunrise_sunset:"Sunrise & Sunset",show_sunrise_sunset:"Show sunrise & sunset",hourly_min_gap:"Hourly min gap (px)",default_16:"Default 16",hourly_forecast_info:"Hourly Forecast Info",hourly_forecast_info_description:"Configure attributes to be displayed below the hourly forecast when an hour is selected."},common:{none:"None",solar_forecast:"Solar forecast"},selector:{weather_attribute:"Weather Attribute",entity:"Entity"}},card:{nowcast:{now:"Now"},pictocode_day:{1:"Sunny, cloudless sky",2:"Sunny and few clouds",3:"Partly cloudy",4:"Overcast",5:"Fog",6:"Overcast with rain",7:"Mixed with showers",8:"Showers, thunderstorms likely",9:"Overcast with snow",10:"Mixed with snow showers",11:"Mostly cloudy with a mixture of snow and rain",12:"Overcast with light rain",13:"Overcast with light snow",14:"Mostly cloudy with rain",15:"Mostly cloudy with snow",16:"Mostly cloudy with light rain",17:"Mostly cloudy with light snow"},pictocode_hour:{1:"Clear, cloudless sky",2:"Clear, few cirrus",3:"Clear with cirrus",4:"Clear with few low clouds",5:"Clear with few low clouds and few cirrus",6:"Clear with few low clouds and cirrus",7:"Partly cloudy",8:"Partly cloudy and few cirrus",9:"Partly cloudy and cirrus",10:"Mixed with some thunderstorm clouds possible",11:"Mixed with few cirrus with some thunderstorm clouds possible",12:"Mixed with cirrus and some thunderstorm clouds possible",13:"Clear but hazy",14:"Clear but hazy with few cirrus",15:"Clear but hazy with cirrus",16:"Fog/low stratus clouds",17:"Fog/low stratus clouds with few cirrus",18:"Fog/low stratus clouds with cirrus",19:"Mostly cloudy",20:"Mostly cloudy and few cirrus",21:"Mostly cloudy and cirrus",22:"Overcast",23:"Overcast with rain",24:"Overcast with snow",25:"Overcast with heavy rain",26:"Overcast with heavy snow",27:"Rain, thunderstorms likely",28:"Light rain, thunderstorms likely",29:"Storm with heavy snow",30:"Heavy rain, thunderstorms likely",31:"Mixed with showers",32:"Mixed with snow showers",33:"Overcast with light rain",34:"Overcast with light snow",35:"Overcast with mixture of snow and rain"}}};let Pt;function Ut(t){Pt=t}function Wt(t,e,i){const n=t.split(".");let r=i[e];for(const t of n){if(void 0===r)break;r=r[t]}return r}function Bt(t,e="",i=""){var n;const r=(null===(n=null==Pt?void 0:Pt.locale)||void 0===n?void 0:n.language)||"en",o={de:jt,en:It};let a=Wt(t,r,o);return void 0===a&&(a=Wt(t,"en",o)),void 0===a&&(a=t),""!==e&&""!==i&&(a=a.replace(e,i)),a}var Vt,Kt=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function qt(t,e){return t===e||!(!Kt(t)||!Kt(e))}function Gt(t,e){if(t.length!==e.length)return!1;for(var i=0;i<t.length;i++)if(!qt(t[i],e[i]))return!1;return!0}function Yt(t,e){void 0===e&&(e=Gt);var i=null;function n(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];if(i&&i.lastThis===this&&e(n,i.lastArgs))return i.lastResult;var o=t.apply(this,n);return i={lastResult:o,lastArgs:n,lastThis:this},o}return n.clear=function(){i=null},n}!function(t){t[t.FORECAST_DAILY=1]="FORECAST_DAILY",t[t.FORECAST_HOURLY=2]="FORECAST_HOURLY",t[t.FORECAST_TWICE_DAILY=4]="FORECAST_TWICE_DAILY"}(Vt||(Vt={}));const Zt={humidity:"mdi:water-percent",pressure:"mdi:gauge",wind_speed:"mdi:weather-windy-variant",wind_gust_speed:"mdi:weather-windy",visibility:"mdi:eye",ozone:"mdi:molecule",uv_index:"mdi:weather-sunny-alert",dew_point:"mdi:water-thermometer-outline",apparent_temperature:"mdi:thermometer",cloud_coverage:"mdi:cloud-outline"},Xt=new Set(["clear-night","cloudy","fog","lightning","lightning-rainy","partlycloudy","pouring","rainy","hail","snowy","snowy-rainy","sunny","windy","windy-variant"]),Jt=new Set(["partlycloudy","cloudy","fog","windy","windy-variant","hail","rainy","snowy","snowy-rainy","pouring","lightning","lightning-rainy"]),Qt=new Set(["hail","rainy","pouring"]),te=new Set(["windy","windy-variant"]),ee=new Set(["snowy","snowy-rainy"]),ie=new Set(["lightning","lightning-rainy"]),ne=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],re=t=>null!=t?(t=>{const e="number"==typeof t?t:parseInt(t,10);return isFinite(e)?ne[((e+11.25)/22.5|0)%16]:"number"==typeof t?t.toString():t})(t):"",oe=(t,e,i,n)=>{const r=null!=i?t.formatEntityAttributeValue(e,"wind_speed",i):"-";if(null!=n){const e=re(n);return`${r} (${t.localize(`ui.card.weather.cardinal_direction.${e.toLowerCase()}`)||e})`}return r},ae=(t,e)=>tt`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
  >
  ${"sunny"===t?tt`
          <path
            class="sun"
            d="m 14.39303,8.4033507 c 0,3.3114723 -2.684145,5.9956173 -5.9956169,5.9956173 -3.3114716,0 -5.9956168,-2.684145 -5.9956168,-5.9956173 0,-3.311471 2.6841452,-5.995617 5.9956168,-5.995617 3.3114719,0 5.9956169,2.684146 5.9956169,5.995617"
          />
        `:""}
  ${"clear-night"===t?tt`
          <path
            class="moon"
            d="m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752"
          />
        `:""}
  ${"partlycloudy"===t&&e?tt`
          <path
            class="moon"
            transform="scale(0.65 0.65) translate(11 -3)"
            d="m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752"
          />
        `:"partlycloudy"===t?tt`
          <path
            class="sun"
            d="m14.981 4.2112c0 1.9244-1.56 3.4844-3.484 3.4844-1.9244 0-3.4844-1.56-3.4844-3.4844s1.56-3.484 3.4844-3.484c1.924 0 3.484 1.5596 3.484 3.484"
          />
        `:""}
  ${Jt.has(t)?"partlycloudy"===t&&e?tt`
            <g transform="translate(-1 1) scale(1 1)">
              <path
                class="cloud-back"
                d="m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679"
              />
              <path
                class="cloud-front"
                d="m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586"
              />
            </g>
          `:tt`
            <path
              class="cloud-back"
              d="m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679"
            />
            <path
              class="cloud-front"
              d="m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586"
            />
          `:""}
  ${Qt.has(t)?tt`
          <path
            class="rain"
            d="m5.2852 14.734c-0.22401 0.24765-0.57115 0.2988-0.77505 0.11395-0.20391-0.1845-0.18732-0.53481 0.036689-0.78281 0.14817-0.16298 0.59126-0.32914 0.87559-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.065617 0.2921-0.18732 0.74965-0.33514 0.91299"
          />
          <path
            class="rain"
            d="m11.257 14.163c-0.22437 0.24765-0.57115 0.2988-0.77505 0.11395-0.2039-0.1845-0.18768-0.53481 0.03669-0.78281 0.14817-0.16298 0.59126-0.32914 0.8756-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.06562 0.2921-0.18732 0.74965-0.33514 0.91299"
          />
          <path
            class="rain"
            d="m8.432 15.878c-0.15452 0.17039-0.3937 0.20567-0.53446 0.07867-0.14041-0.12735-0.12876-0.36865 0.025753-0.53975 0.10195-0.11218 0.40711-0.22684 0.60325-0.29175 0.085725-0.02858 0.15628 0.03563 0.13652 0.12382-0.045508 0.20108-0.12912 0.51647-0.23107 0.629"
          />
          <path
            class="rain"
            d="m7.9991 14.118c-0.19226 0.21237-0.49001 0.25612-0.66499 0.09737-0.17462-0.15804-0.16051-0.45861 0.03175-0.67098 0.12665-0.14005 0.50729-0.28293 0.75071-0.36336 0.10689-0.03563 0.19473 0.0441 0.17004 0.15346-0.056092 0.25082-0.16051 0.64347-0.28751 0.78352"
          />
        `:""}
  ${"pouring"===t?tt`
          <path
            class="rain"
            d="m10.648 16.448c-0.19226 0.21449-0.49001 0.25894-0.66499 0.09878-0.17498-0.16016-0.16087-0.4639 0.03175-0.67874 0.12665-0.14146 0.50694-0.2854 0.75071-0.36724 0.10689-0.03563 0.19473 0.0448 0.17004 0.15558-0.05645 0.25365-0.16051 0.65017-0.28751 0.79163"
          />
          <path
            class="rain"
            d="m5.9383 16.658c-0.22437 0.25012-0.5715 0.30162-0.77505 0.11501-0.20391-0.18627-0.18768-0.54046 0.036689-0.79093 0.14817-0.1651 0.59126-0.33267 0.87559-0.42827 0.12418-0.04127 0.22648 0.05221 0.19791 0.18168-0.065617 0.29528-0.18732 0.75741-0.33514 0.92251"
          />
        `:""}
  ${te.has(t)?tt`
          <path
            class="cloud-back"
            d="m 13.59616,15.30968 c 0,0 -0.09137,-0.0071 -0.250472,-0.0187 -0.158045,-0.01235 -0.381353,-0.02893 -0.64382,-0.05715 -0.262466,-0.02716 -0.564444,-0.06385 -0.877358,-0.124531 -0.156986,-0.03034 -0.315383,-0.06844 -0.473781,-0.111478 -0.157691,-0.04551 -0.313266,-0.09842 -0.463902,-0.161219 l -0.267406,-0.0949 c -0.09984,-0.02646 -0.205669,-0.04904 -0.305153,-0.06738 -0.193322,-0.02716 -0.3838218,-0.03316 -0.5640912,-0.02011 -0.3626556,0.02611 -0.6847417,0.119239 -0.94615,0.226483 -0.2617611,0.108656 -0.4642556,0.230364 -0.600075,0.324203 -0.1358195,0.09419 -0.2049639,0.160514 -0.2049639,0.160514 0,0 0.089958,-0.01623 0.24765,-0.04445 0.1559278,-0.02575 0.3764139,-0.06174 0.6367639,-0.08714 0.2596444,-0.02646 0.5591527,-0.0441 0.8678333,-0.02328 0.076905,0.0035 0.1538111,0.01658 0.2321278,0.02293 0.077611,0.01058 0.1534581,0.02893 0.2314221,0.04022 0.07267,0.01834 0.1397,0.03986 0.213078,0.05644 l 0.238125,0.08925 c 0.09207,0.03281 0.183444,0.07055 0.275872,0.09878 0.09243,0.0261 0.185208,0.05327 0.277636,0.07161 0.184856,0.0388 0.367947,0.06174 0.543983,0.0702 0.353131,0.01905 0.678745,-0.01341 0.951442,-0.06456 0.27305,-0.05292 0.494595,-0.123119 0.646642,-0.181681 0.152047,-0.05785 0.234597,-0.104069 0.234597,-0.104069"
          />
          <path
            class="cloud-back"
            d="m 4.7519154,13.905801 c 0,0 0.091369,-0.0032 0.2511778,-0.0092 0.1580444,-0.0064 0.3820583,-0.01446 0.6455833,-0.03281 0.2631722,-0.01729 0.5662083,-0.04269 0.8812389,-0.09137 0.1576916,-0.02434 0.3175,-0.05609 0.4776611,-0.09384 0.1591027,-0.03951 0.3167944,-0.08643 0.4699,-0.14358 l 0.2702277,-0.08467 c 0.1008945,-0.02222 0.2074334,-0.04127 0.3072695,-0.05574 0.1943805,-0.01976 0.3848805,-0.0187 0.5651499,0.0014 0.3608917,0.03951 0.67945,0.144639 0.936625,0.261761 0.2575278,0.118534 0.4554364,0.247297 0.5873754,0.346781 0.132291,0.09913 0.198966,0.168275 0.198966,0.168275 0,0 -0.08925,-0.01976 -0.245886,-0.05397 C 9.9423347,14.087088 9.7232597,14.042988 9.4639681,14.00736 9.2057347,13.97173 8.9072848,13.94245 8.5978986,13.95162 c -0.077258,7.06e-4 -0.1541638,0.01058 -0.2328333,0.01411 -0.077964,0.0078 -0.1545166,0.02328 -0.2331861,0.03175 -0.073025,0.01588 -0.1404055,0.03422 -0.2141361,0.04798 l -0.2420055,0.08008 c -0.093486,0.02963 -0.1859139,0.06421 -0.2794,0.0889 C 7.3028516,14.23666 7.2093653,14.2603 7.116232,14.27512 6.9303181,14.30722 6.7465209,14.3231 6.5697792,14.32486 6.2166487,14.33046 5.8924459,14.28605 5.6218654,14.224318 5.3505793,14.161565 5.1318571,14.082895 4.9822793,14.01869 4.8327015,13.95519 4.7519154,13.905801 4.7519154,13.905801"
          />
        `:""}
  ${ee.has(t)?tt`
          <path
            class="snow"
            d="m 8.4319893,15.348341 c 0,0.257881 -0.209197,0.467079 -0.467078,0.467079 -0.258586,0 -0.46743,-0.209198 -0.46743,-0.467079 0,-0.258233 0.208844,-0.467431 0.46743,-0.467431 0.257881,0 0.467078,0.209198 0.467078,0.467431"
          />
          <path
            class="snow"
            d="m 11.263878,14.358553 c 0,0.364067 -0.295275,0.659694 -0.659695,0.659694 -0.364419,0 -0.6596937,-0.295627 -0.6596937,-0.659694 0,-0.364419 0.2952747,-0.659694 0.6596937,-0.659694 0.36442,0 0.659695,0.295275 0.659695,0.659694"
          />
          <path
            class="snow"
            d="m 5.3252173,13.69847 c 0,0.364419 -0.295275,0.660047 -0.659695,0.660047 -0.364067,0 -0.659694,-0.295628 -0.659694,-0.660047 0,-0.364067 0.295627,-0.659694 0.659694,-0.659694 0.36442,0 0.659695,0.295627 0.659695,0.659694"
          />
        `:""}
  ${ie.has(t)?tt`
          <path
            class="sun"
            d="m 9.9252695,10.935875 -1.6483986,2.341014 1.1170184,0.05929 -1.2169864,2.02141 3.0450261,-2.616159 H 9.8864918 L 10.97937,11.294651 10.700323,10.79794 h -0.508706 l -0.2663475,0.137936"
          />
        `:""}
  </svg>`,se=(t,e,i,n,r)=>{const o=t.condition,a=null==r?void 0:r["partlycloudy"===o&&i?"partlycloudy-night":o],s="string"==typeof a?a.trim():"",l=t.pictocode;if(l){let t;return t=n?"local:"+l.toString().padStart(2,"0")+"_iday":i?"local:"+l.toString().padStart(2,"0")+"_night":"local:"+l.toString().padStart(2,"0")+"_day",Q`<ha-icon icon=${t}></ha-icon>`}if(s)return Q`<ha-icon icon=${s}></ha-icon>`;const c=getComputedStyle(e).getPropertyValue(`--weather-icon-${o}`);return c?Q`
      <div
        style="background-size: cover;${Tt({"background-image":c})}"
      ></div>
    `:Xt.has(o)?Q`${ae(o,i)}`:void 0},le=(t,e)=>ce(t.attributes,e),ce=(t,e)=>0!==(t.supported_features&e),de=(t,e,i,n,r,o,a)=>{var s,l,c,d;if(!e||!t)return;if(!Object.prototype.hasOwnProperty.call(e.attributes,i))return;const h=e.attributes[i];if(null==h)return;let u;if("number"==typeof h)if("wind_speed"===i){const i=e.attributes.wind_bearing;u=oe(t,e,h,"number"==typeof i?i:void 0)}else if("wind_bearing"===i)u=re(h);else if(a){u=(h/a).toLocaleString(null===(s=null==t?void 0:t.locale)||void 0===s?void 0:s.language,{maximumFractionDigits:0})}else u=(null===(l=null==t?void 0:t.formatEntityAttributeValue)||void 0===l?void 0:l.call(t,e,i,h))||h.toLocaleString(null===(c=null==t?void 0:t.locale)||void 0===c?void 0:c.language,{maximumFractionDigits:1});else if("string"==typeof h){const n=h.trim();if(!n.length)return;u=(null===(d=null==t?void 0:t.formatEntityAttributeValue)||void 0===d?void 0:d.call(t,e,i,n))||n}else try{u=JSON.stringify(h)}catch(t){return}if(null==u)return;const p=o||Zt[i];return{value:u+(r?` ${r}`:""),name:n=n||t.formatEntityAttributeName(e,i)||t.localize(pe(i))||i.replace(/_/g," "),icon:p}},he=(t,e,i,n,r,o,a,s)=>{var l,c,d,h;if(!e||!t||!i)return;const u=null==i?void 0:i[n];if(null==u)return;let p;if("number"==typeof u)if("wind_speed"===n){const i=e.attributes.wind_bearing;p=oe(t,e,u,"number"==typeof i?i:void 0)}else if("wind_bearing"===n)p=re(u);else if(s){p=(u/s).toLocaleString(null===(l=null==t?void 0:t.locale)||void 0===l?void 0:l.language,{maximumFractionDigits:0})}else p=(null===(c=null==t?void 0:t.formatEntityAttributeValue)||void 0===c?void 0:c.call(t,e,n,u))||u.toLocaleString(null===(d=null==t?void 0:t.locale)||void 0===d?void 0:d.language,{maximumFractionDigits:1});else if("string"==typeof u){const i=u.trim();if(!i.length)return;p=(null===(h=null==t?void 0:t.formatEntityAttributeValue)||void 0===h?void 0:h.call(t,e,n,i))||i}else try{p=JSON.stringify(u)}catch(t){return}if(null==p)return;const f=a||Zt[n];return{value:p+(o?` ${o}`:""),name:r=r||ue(t,e,n),icon:f}},ue=(t,e,i)=>t.formatEntityAttributeName(e,i)||t.localize(pe(i))||i.replace(/_/g," "),pe=Yt(t=>"pressure"===t?"ui.card.weather.attributes.air_pressure":`ui.card.weather.attributes.${t}`);class fe extends gt{_handleTemperatureClick(){this.dispatchEvent(new CustomEvent("dwf-temperature-click"))}_handleConditionClick(){this.dispatchEvent(new CustomEvent("dwf-condition-click"))}_handleTemperatureKeydown(t){"Enter"!==t.key&&" "!==t.key||this._handleTemperatureClick()}_handleConditionKeydown(t){"Enter"!==t.key&&" "!==t.key||this._handleConditionClick()}render(){var t,e,i;if(!this.weatherEntity||!this.hass||!this.config)return it;let n;const r=l(this.config.header_tap_action_temperature),o=this.config.header_info.length>0;return n=void 0!==this.weatherEntity.attributes.pictocode?Bt(`card.pictocode_hour.${this.weatherEntity.attributes.pictocode}`):(null===(e=null===(t=this.hass)||void 0===t?void 0:t.formatEntityState)||void 0===e?void 0:e.call(t,this.weatherEntity))||this.weatherEntity.state,Q`
      <div class="compact-header">
        <div class="current-conditions">
          <div
            class=${kt({"weather-icon":!0,"has-action":o})}
            @click=${this._handleConditionClick}
            @keydown=${this._handleConditionKeydown}
            role=${o?"button":it}
            tabindex=${o?0:it}
          >
            ${((t,e,i,n)=>{const r=t.state,o=null==n?void 0:n["partlycloudy"===r&&i?"partlycloudy-night":r],a="string"==typeof o?o.trim():"",s=t.attributes.pictocode;if(s){let t;return t=i?"local:"+s.toString().padStart(2,"0")+"_night":"local:"+s.toString().padStart(2,"0")+"_day",Q`<ha-icon icon=${t}></ha-icon>`}if(a)return Q`<ha-icon icon=${a}></ha-icon>`;const l=getComputedStyle(e).getPropertyValue(`--weather-icon-${r}`);return l?Q`
      <div
        style="background-size: cover;${Tt({"background-image":l})}"
      ></div>
    `:Xt.has(r)?Q`${ae(r,i)}`:void 0})(this.weatherEntity,this,!this.isDaytime,this.config.icon_map)}
          </div>
          <div
            class=${kt({condition:!0,"has-action":o})}
            @click=${this._handleConditionClick}
            @keydown=${this._handleConditionKeydown}
            role=${o?"button":it}
            tabindex=${o?0:it}
          >
            ${n}
          </div>
          <div
            class=${kt({temperature:!0,"has-action":r})}
            @click=${this._handleTemperatureClick}
            @keydown=${this._handleTemperatureKeydown}
            role=${r?"button":it}
            tabindex=${r?0:it}
          >
            ${this.headerTemperature}
          </div>
        </div>
        ${this.nowcastPanelTemplate?Q`<div class="nowcast">${this.nowcastPanelTemplate}</div>`:it}
        <div class="attributes">
          <dwf-current-weather-attributes
            .hass=${this.hass}
            .weatherEntity=${this.weatherEntity}
            .attributeConfigs=${null!==(i=this.config.header_chips)&&void 0!==i?i:[]}
          >
          </dwf-current-weather-attributes>
        </div>
      </div>
    `}}fe.styles=_`
    ${f(Ht)}
  `,t([$t({attribute:!1})],fe.prototype,"hass",void 0),t([$t({attribute:!1})],fe.prototype,"weatherEntity",void 0),t([$t({attribute:!1})],fe.prototype,"config",void 0),t([$t({attribute:!1})],fe.prototype,"nowcastPanelTemplate",void 0),t([$t()],fe.prototype,"headerTemperature",void 0),t([$t({type:Boolean})],fe.prototype,"isDaytime",void 0),customElements.define("dwf-compact-header",fe);let _e=class extends gt{constructor(){super(...arguments),this.attributeConfigs=[]}createRenderRoot(){return this}render(){if(!this.hass||!this.weatherEntity||0===this.attributeConfigs.length)return it;const t=this.attributeConfigs.map(t=>this._renderAttribute(t)).filter(t=>t!==it);return 0===t.length?it:Q` <div class="dwf-current-attributes">${t}</div> `}_renderAttribute(t){var e,i,n,r;let o,a,s,c,d;if("entity"==t.type){if(o=this.hass.states[t.entity],!o)return it;const l=null===(i=null===(e=this.hass)||void 0===e?void 0:e.formatEntityState)||void 0===i?void 0:i.call(e,o);a=l&&"string"==typeof l?l:null!==(r=null===(n=o.attributes)||void 0===n?void 0:n.assumed_state)&&void 0!==r?r:o.state,s=o.attributes.icon,c=void 0,d=t.name||o.attributes.friendly_name||t.entity}else{const e=de(this.hass,this.weatherEntity,t.attribute,t.name,t.unit,t.icon,t.divisor);if(!e)return it;o=this.weatherEntity,a=e.value,s=e.icon,c=t.attribute,d=e.name}const h=l(t.tap_action);return Q`
      <div
        class=${kt({"dwf-current-attribute":!0,"has-action":h})}
        role=${h?"button":it}
        tabindex=${h?0:it}
        @click=${()=>this._handleAttributeTap(t)}
        @keydown=${e=>this._handleAttributeKeydown(e,t)}
      >
        <ha-attribute-icon
          class="dwf-current-attribute-icon"
          .hass=${this.hass}
          .stateObj=${o}
          .attribute=${c}
          .icon=${s}
        ></ha-attribute-icon>
        <span class="dwf-current-attribute-name"> ${d} </span>
        <span class="dwf-current-attribute-value">${a}</span>
      </div>
    `}_executeTapAction(t,e){var i;if(!this.hass||!t||!l(t))return;const n=t.action,r=t.perform_action;if("perform-action"===n&&r){const[e,n]=r.split(".",2);if(e&&n){const r=null!==(i=t.data)&&void 0!==i?i:t.service_data,o=t.target;return void this.hass.callService(e,n,r,o)}}s(this,this.hass,{entity:e||this.weatherEntity.entity_id,tap_action:t})}_handleAttributeTap(t){if(!l(t.tap_action))return;const e="entity"===t.type?t.entity:void 0;this._executeTapAction(t.tap_action,e)}_handleAttributeKeydown(t,e){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._handleAttributeTap(e))}};t([$t({attribute:!1})],_e.prototype,"hass",void 0),t([$t({attribute:!1})],_e.prototype,"weatherEntity",void 0),t([$t({attribute:!1})],_e.prototype,"attributeConfigs",void 0),_e=t([bt("dwf-current-weather-attributes")],_e);const me=(t,e,i)=>ye(e,i.time_zone).format(t),ye=Yt((t,e)=>new Intl.DateTimeFormat(t.language,{weekday:"short",timeZone:"server"===t.time_zone?e:void 0})),ge=Yt((t,e)=>new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"numeric",hourCycle:be(t)?"h12":"h23",timeZone:"server"===t.time_zone?e:void 0}));var ve;!function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ve||(ve={}));const be=Yt(t=>{if(t.time_format===ve.language||t.time_format===ve.system){const e=t.time_format===ve.language?t.language:void 0;return new Date("January 1, 2023 22:00:00").toLocaleString(e).includes("10")}return t.time_format===ve.am_pm}),we=Yt((t,e)=>new Intl.DateTimeFormat(t.language,{day:"2-digit",timeZone:"server"===t.time_zone?e:void 0})),xe=Yt((t,e)=>new Intl.DateTimeFormat(t.language,{hour:"2-digit",hourCycle:be(t)?"h12":"h23",timeZone:"server"===t.time_zone?e:void 0}));let $e=class extends gt{constructor(){super(...arguments),this.forecast=[]}createRenderRoot(){return this}updated(t){var e;t.has("forecast")&&(null===(e=this.forecast)||void 0===e?void 0:e.length)&&!this._selectedForecast&&(this._selectedForecast=this.forecast[0])}render(){var t;if(!(null===(t=this.forecast)||void 0===t?void 0:t.length))return it;const e=this._computePrecipitationScale(4,20);return Q` ${this.forecast.map(t=>this._renderDailyItem(t,e))} `}_hasValidValue(t){return null!=t}_renderDailyItem(t,e){var i;if(!this._hasValidValue(t.temperature)||!this._hasValidValue(t.condition))return it;const n=new Date(t.datetime),r=(o=n,a=this.hass.config,"00"===new Intl.DateTimeFormat("de-DE",{hour:"2-digit",timeZone:a.time_zone,hour12:!1}).formatToParts(o).find(t=>"hour"===t.type).value);var o,a;const s=this._getTemperatureColor(t.temperature),l=this._hasValidValue(t.templow)?this._getTemperatureColor(t.templow):void 0,c=(null===(i=this._selectedForecast)||void 0===i?void 0:i.datetime)===t.datetime;return Q`
      <div class="forecast-item" @click=${()=>this._handleSelect(t)}>
        <div class="date ${c?"selected":""}">
          ${me(n,this.hass.locale,this.hass.config)}
        </div>
        <div class="day-of-month ${c?"selected":""}">
          ${r?"":((t,e,i)=>we(e,i.time_zone).format(t))(n,this.hass.locale,this.hass.config)}
        </div>
        <div class="forecast-image-icon">${se(t,this,!1,!0,this.iconMap)}</div>
        <div class="temp" style=${Tt({color:s})}>${Math.round(t.temperature)}°</div>
        <div class="templow" style=${l?Tt({color:l}):it}>
          ${this._hasValidValue(t.templow)?Q`${Math.round(t.templow)}°`:"—"}
        </div>
        ${this._renderPrecipitationInfo(t,e)} ${this._renderExtraAttribute(t)}
      </div>
    `}_handleSelect(t){var e,i,n,r;if(!(null==t?void 0:t.datetime))return;let o=null;o=this._showForecastAttribute&&(null===(e=this._selectedForecast)||void 0===e?void 0:e.datetime)!==t.datetime?t:this._showForecastAttribute||(null===(i=this._selectedForecast)||void 0===i?void 0:i.datetime)!==t.datetime?void 0:t,(null==o?void 0:o.datetime)!==(null===(n=this._showForecastAttribute)||void 0===n?void 0:n.datetime)&&(this._showForecastAttribute=o,this.dispatchEvent(new CustomEvent("dwf-daily-list-item-show-attributes",{detail:o,bubbles:!0,composed:!0}))),t.datetime!==(null===(r=this._selectedForecast)||void 0===r?void 0:r.datetime)&&(this._selectedForecast=t,this.dispatchEvent(new CustomEvent("dwf-daily-list-item-selected",{detail:t,bubbles:!0,composed:!0})))}selectDate(t){const e=t.getDate(),i=t.getMonth(),n=t.getFullYear(),r=this.forecast.findIndex(t=>{const r=new Date(t.datetime);return r.getDate()===e&&r.getMonth()===i&&r.getFullYear()===n});r>-1&&(this._selectedForecast=this.forecast[r],this.updateComplete.then(()=>{const t=this.querySelectorAll(".forecast-item")[r];if(t){const e=this.closest(".forecast");if(!e)return;const i=e.getBoundingClientRect(),n=t.getBoundingClientRect();if(!(n.left>=i.left&&n.right<=i.right)){const t=e.scrollLeft+(n.left-i.left)-i.width/2+n.width/2;e.scrollTo({left:t,behavior:"smooth"})}}}))}_getTemperatureColor(t){return t<0?"var(--blue-color, #2196f3)":t<15?"var(--green-color, #4caf50)":t<25?"var(--orange-color, #ff9800)":"var(--red-color, #f44336)"}_renderPrecipitationInfo(t,e){var i,n;const r=this._hasValidValue(t.precipitation),o=this._hasValidValue(t.precipitation_probability);if(!r&&!o)return it;const a=r?t.precipitation:void 0,s=["precipitation"];(null!=a?a:0)>.3&&s.push("active");let l=!1,c=it;if(void 0!==e&&void 0!==a&&a>=.3){c=`--precipitation-fill: ${`${(100*(e>0?Math.min(a/e,1):0)).toFixed(2)}%`};`,l=a>e}return l&&s.push("overflow"),Q`
      ${r?Q`<div class="${s.join(" ")}" style=${c}>
            ${t.precipitation.toFixed(1)+(null!==(i=this.precipitationUnit)&&void 0!==i?i:"")}
          </div>`:it}
      ${o?Q`<div
            class="precipitationprobability ${(null!==(n=t.precipitation_probability)&&void 0!==n?n:0)>30?"active":""}"
          >
            ${t.precipitation_probability>=0?t.precipitation_probability+"%":""}
          </div>`:it}
    `}_renderExtraAttribute(t){var e,i;const n=null===(e=this.extraAttribute)||void 0===e?void 0:e.trim();if(!n)return it;const r=null==t?void 0:t[n];if(null==r)return it;const o=he(this.hass,this.weatherEntity,t,n,void 0,this.extraAttributeUnit,void 0,this.extraAttributeDivisor);if(!o)return it;const a=this._normalizeDimBelow(this.extraAttributeDimBelow),s=this._parseNumericValue(r),l=void 0!==a&&void 0!==s&&s<a,c=["daily-extra"];l&&c.push("dimmed");const d=null===(i=this.extraAttributeColor)||void 0===i?void 0:i.trim(),h=d?Tt({color:d,opacity:l?"0.3":"1"}):it;return Q`<div class=${c.join(" ")} style=${h}>${null==o?void 0:o.value}</div>`}_normalizeDimBelow(t){return"number"==typeof t&&Number.isFinite(t)?t:void 0}_parseNumericValue(t){const e="number"==typeof t?t:Number(t);return Number.isFinite(e)?e:void 0}_computePrecipitationScale(t,e){var i;if(!(null===(i=this.forecast)||void 0===i?void 0:i.length))return;const n=this.forecast.map(t=>"number"==typeof(null==t?void 0:t.precipitation)?t.precipitation:void 0).filter(t=>"number"==typeof t);if(!n.length)return;const r=Math.max(...n),o=Math.max(t,r);return Math.min(o,e)}};t([$t({attribute:!1})],$e.prototype,"hass",void 0),t([$t({attribute:!1})],$e.prototype,"weatherEntity",void 0),t([$t({attribute:!1})],$e.prototype,"forecast",void 0),t([$t({attribute:!1})],$e.prototype,"precipitationUnit",void 0),t([$t({attribute:!1})],$e.prototype,"extraAttribute",void 0),t([$t({attribute:!1})],$e.prototype,"extraAttributeUnit",void 0),t([$t({attribute:!1})],$e.prototype,"extraAttributeDivisor",void 0),t([$t({attribute:!1})],$e.prototype,"extraAttributeColor",void 0),t([$t({attribute:!1})],$e.prototype,"extraAttributeDimBelow",void 0),t([$t({attribute:!1})],$e.prototype,"iconMap",void 0),t([St()],$e.prototype,"_selectedForecast",void 0),t([St()],$e.prototype,"_showForecastAttribute",void 0),$e=t([bt("dwf-daily-list")],$e);let Se=class extends gt{constructor(){super(...arguments),this.attributeConfigs=[],this.dailyForecast=!1}createRenderRoot(){return this}render(){var t,e;if(!this.hass||!this.forecastAttribute)return it;const i=new Date(this.forecastAttribute.datetime),n=this.dailyForecast?`${me(i,this.hass.locale,this.hass.config)}`:`${me(i,this.hass.locale,this.hass.config)}, ${r=i,o=this.hass.locale,a=this.hass.config,ge(o,a.time_zone).format(r)}`;var r,o,a;let s;if(void 0!==this.forecastAttribute.pictocode){s=Bt(`${this.dailyForecast?"card.pictocode_day":"card.pictocode_hour"}.${this.forecastAttribute.pictocode}`)}else s=(null===(e=(t=this.hass).formatEntityState)||void 0===e?void 0:e.call(t,Object.assign(Object.assign({},this.weatherEntity),{state:this.forecastAttribute.condition})))||this.forecastAttribute.condition;const l=(this.attributeConfigs||[]).map(t=>this._renderAttribute(t)).filter(t=>t!==it);let c=n;return s&&(c+=` - ${s}`),0!==l.length||c?Q`
      <div class="forecast-condition">${c}</div>
      ${l.length>0?Q`<div class="dwf-current-attributes">${l}</div>`:it}
    `:it}_renderAttribute(t){const e=this.weatherEntity,i=this.forecastAttribute,n=he(this.hass,e,i,t.attribute,t.name,t.unit,t.icon,t.divisor);if(!n)return it;const r=n.value,o=n.icon,a=t.attribute,s=n.name;return Q`
      <div class="dwf-current-attribute">
        <ha-attribute-icon
          class="dwf-current-attribute-icon"
          .hass=${this.hass}
          .stateObj=${e}
          .attribute=${a}
          .icon=${o}
        ></ha-attribute-icon>
        <span class="dwf-current-attribute-name"> ${s} </span>
        <span class="dwf-current-attribute-value">${r}</span>
      </div>
    `}};t([$t({attribute:!1})],Se.prototype,"hass",void 0),t([$t({attribute:!1})],Se.prototype,"weatherEntity",void 0),t([$t({attribute:!1})],Se.prototype,"forecastAttribute",void 0),t([$t({attribute:!1})],Se.prototype,"attributeConfigs",void 0),t([$t({attribute:!1})],Se.prototype,"dailyForecast",void 0),Se=t([bt("dwf-forecast-attributes")],Se);class Ee extends gt{constructor(){super(...arguments),this.headerClassMap={},this.headerStyles={},this.showInlineNowcast=!1}render(){return Q`
      <div class=${kt(this.headerClassMap)} style=${Tt(this.headerStyles)}>
        <div class="header-content">
          ${Q` ${this.headerLayoutTemplate} ${this.showInlineNowcast?this.nowcastPanelTemplate:it} `}
        </div>
      </div>
    `}}Ee.styles=_`
    ${f(Ht)}
  `,t([$t({attribute:!1})],Ee.prototype,"headerClassMap",void 0),t([$t({attribute:!1})],Ee.prototype,"headerStyles",void 0),t([$t({attribute:!1})],Ee.prototype,"headerLayoutTemplate",void 0),t([$t({type:Boolean})],Ee.prototype,"showInlineNowcast",void 0),t([$t({attribute:!1})],Ee.prototype,"nowcastPanelTemplate",void 0),customElements.define("dwf-header",Ee);let Ce=class extends gt{constructor(){super(...arguments),this.forecast=[],this.showSunTimes=!1,this._sunTimesByDay={},this._boundHandleScroll=this._handleScroll.bind(this)}createRenderRoot(){return this}connectedCallback(){var t;super.connectedCallback(),null===(t=this.closest(".forecast.hourly"))||void 0===t||t.addEventListener("scroll",this._boundHandleScroll,{passive:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.closest(".forecast.hourly"))||void 0===t||t.removeEventListener("scroll",this._boundHandleScroll)}willUpdate(t){(t.has("forecast")||t.has("sunCoordinates")||t.has("showSunTimes"))&&this._calculateSunTimes()}render(){var t;if(!(null===(t=this.forecast)||void 0===t?void 0:t.length))return it;const e=[];let i;const n=this._computePrecipitationScale(1,5);if(this.forecast.length>0&&!this._currentDayKey){const t=new Date(this.forecast[0].datetime);this._currentDayKey=this._formatDayKey(t)}return this.forecast.forEach((t,r)=>{if(!(null==t?void 0:t.datetime))return;const o=new Date(t.datetime);if(!Number.isFinite(o.getTime()))return;const a=this._formatDayKey(o);a!==i&&(i=a,e.push(this._renderDayMarker(o)));const s=this._renderHourlyItem(t,r,n);s!==it&&e.push(s)}),Q`${e}`}_handleScroll(t){const e=t.target.getBoundingClientRect(),i=this.querySelectorAll(".forecast-item");let n;for(const t of Array.from(i)){if(t.getBoundingClientRect().left>=e.left){n=t;break}}if(n){const t=n.dataset.datetime;if(t){const e=new Date(t),i=this._formatDayKey(e);this._currentDayKey!==i&&(this._currentDayKey=i,this.dispatchEvent(new CustomEvent("dwf-hourly-scrolled-to-new-day",{detail:{date:e},bubbles:!0,composed:!0})))}}}_handleItemClick(t){var e;let i;(null===(e=this.selectedItem)||void 0===e?void 0:e.datetime)===t.datetime?(this.selectedItem=void 0,i=null):(this.selectedItem=t,i=t),this.dispatchEvent(new CustomEvent("dwf-hourly-list-item-selected",{detail:i,bubbles:!0,composed:!0}))}_renderDayMarker(t){var e,i;const n=me(t,null===(e=this.hass)||void 0===e?void 0:e.locale,null===(i=this.hass)||void 0===i?void 0:i.config);return Q`<div class="day-marker">${n}</div>`}_hasValidValue(t){return null!=t}_renderHourlyItem(t,e,i){var n;if(!this._hasValidValue(t.temperature)||!this._hasValidValue(t.condition))return it;const r=new Date(t.datetime),o=this._getSunEventForHour(r,e),a=o?new Date(o.timestamp):void 0,s=(null===(n=this.selectedItem)||void 0===n?void 0:n.datetime)===t.datetime,l=["date"];o&&l.push(o.type),s&&l.push("selected");const c=be(this.hass.locale),d=["forecast-item"];c||d.push("no-ampm"),s&&d.push("selected");const h=o?((t,e,i)=>{var n,r,o,a;const s=ge(e,i.time_zone).formatToParts(t);return`${null!==(r=null===(n=s.find(t=>"hour"===t.type))||void 0===n?void 0:n.value)&&void 0!==r?r:""}:${null!==(a=null===(o=s.find(t=>"minute"===t.type))||void 0===o?void 0:o.value)&&void 0!==a?a:""}`})(a,this.hass.locale,this.hass.config):(u=r,p=this.hass.locale,f=this.hass.config,xe(p,f.time_zone).formatToParts(u).find(t=>"hour"===t.type).value);var u,p,f;const _=c?((t,e,i)=>{var n;return null===(n=xe(e,i.time_zone).formatToParts(t).find(t=>"dayPeriod"===t.type))||void 0===n?void 0:n.value})(null!=a?a:r,this.hass.locale,this.hass.config):void 0,m=this._getTemperatureColor(t.temperature);return Q`
      <div class="${d.join(" ")}" data-datetime=${t.datetime} @click=${()=>this._handleItemClick(t)}>
        <div class="${l.join(" ")}">${h}</div>
        ${c?Q`<div class="ampm">${null!=_?_:""}</div>`:""}
        <div class="forecast-image-icon">
          ${se(t,this,this._shouldUseNightIcon(t,r),!1,this.iconMap)}
        </div>
        <div class="temp" style=${Tt({color:m})}>${Math.round(t.temperature)}°</div>
        ${this._renderPrecipitationInfo(t,i)} ${this._renderExtraAttribute(t)}
      </div>
    `}_getTemperatureColor(t){return t<0?"var(--blue-color, #2196f3)":t<15?"var(--green-color, #4caf50)":t<25?"var(--orange-color, #ff9800)":"var(--red-color, #f44336)"}_renderPrecipitationInfo(t,e){var i,n;const r=this._hasValidValue(t.precipitation),o=this._hasValidValue(t.precipitation_probability);if(!r&&!o)return it;const a=r?t.precipitation:void 0,s=["precipitation"];(null!=a?a:0)>.3&&s.push("active");let l,c=!1;if(void 0!==e&&void 0!==a&&a>=.3){l=`--precipitation-fill: ${`${(100*(e>0?Math.min(a/e,1):0)).toFixed(2)}%`};`,c=a>e}return c&&s.push("overflow"),Q`
      ${r?Q`<div class="${s.join(" ")}" style=${l}>
            ${t.precipitation.toFixed(1)+(null!==(i=this.precipitationUnit)&&void 0!==i?i:"")}
          </div>`:it}
      ${o?Q`<div
            class="precipitationprobability ${(null!==(n=t.precipitation_probability)&&void 0!==n?n:0)>30?"active":""}"
          >
            ${t.precipitation_probability>=0?t.precipitation_probability+"%":""}
          </div>`:it}
    `}_renderExtraAttribute(t){var e,i;const n=null===(e=this.extraAttribute)||void 0===e?void 0:e.trim();if(!n)return it;const r=null==t?void 0:t[n];if(null==r)return it;const o=he(this.hass,this.weatherEntity,t,n,void 0,this.extraAttributeUnit,void 0,this.extraAttributeDivisor);if(!o)return it;const a=this._normalizeDimBelow(this.extraAttributeDimBelow),s=this._parseNumericValue(r),l=void 0!==a&&void 0!==s&&s<a,c=["hourly-extra"];l&&c.push("dimmed");const d=null===(i=this.extraAttributeColor)||void 0===i?void 0:i.trim(),h=d?Tt({color:d,opacity:l?"0.3":"1"}):void 0;return Q`<div class=${c.join(" ")} style=${h}>${o.value}</div>`}_normalizeDimBelow(t){return"number"==typeof t&&Number.isFinite(t)?t:void 0}_parseNumericValue(t){const e="number"==typeof t?t:Number(t);return Number.isFinite(e)?e:void 0}_computePrecipitationScale(t,e){var i;if(!(null===(i=this.forecast)||void 0===i?void 0:i.length))return;const n=this.forecast.map(t=>"number"==typeof(null==t?void 0:t.precipitation)?t.precipitation:void 0).filter(t=>"number"==typeof t);if(!n.length)return;const r=Math.max(...n),o=Math.max(t,r);return Math.min(o,e)}_calculateSunTimes(){var t;if(!this.sunCoordinates||!(null===(t=this.forecast)||void 0===t?void 0:t.length))return void(this._sunTimesByDay={});const{latitude:e,longitude:i}=this.sunCoordinates;if(!Number.isFinite(e)||!Number.isFinite(i))return void(this._sunTimesByDay={});const n={};for(const t of this.forecast){if(!(null==t?void 0:t.datetime))continue;const r=new Date(t.datetime);if(!Number.isFinite(r.getTime()))continue;const o=this._formatDayKey(r);if(n[o])continue;const a=new Date(r.getFullYear(),r.getMonth(),r.getDate());let s=Rt.getTimes(a,e,i),l=this._toTimestamp(s.sunrise),c=this._toTimestamp(s.sunset);const d=this._determineDayShift(o,l,c);if(0!==d){const t=new Date(a);t.setDate(t.getDate()+d),s=Rt.getTimes(t,e,i),l=this._toTimestamp(s.sunrise),c=this._toTimestamp(s.sunset)}n[o]={},void 0!==l&&(n[o].sunrise=l),void 0!==c&&(n[o].sunset=c)}this._sunTimesByDay=n}_shouldUseNightIcon(t,e){if(!1===t.is_daytime)return!0;if(!0===t.is_daytime)return!1;const i=this._isNightFromSunTimes(e);return null!=i&&i}_isNightFromSunTimes(t){var e;const i=null===(e=this._sunTimesByDay)||void 0===e?void 0:e[this._formatDayKey(t)];if(!i||void 0===i.sunrise||void 0===i.sunset)return;const n=t.getTime();return Number.isFinite(n)?i.sunrise<=i.sunset?n<i.sunrise||n>=i.sunset:!(n>=i.sunrise&&n<i.sunset):void 0}_getSunEventForHour(t,e){if(!this.showSunTimes||!this._sunTimesByDay)return;const i=this._formatDayKey(t),n=this._sunTimesByDay[i];if(!n)return;const r=t.getTime();if(!Number.isFinite(r))return;const o=this._getIntervalEnd(e,r);return void 0!==n.sunrise&&n.sunrise>=r&&n.sunrise<o?{type:"sunrise",timestamp:n.sunrise}:void 0!==n.sunset&&n.sunset>=r&&n.sunset<o?{type:"sunset",timestamp:n.sunset}:void 0}_getIntervalEnd(t,e){var i;const n=null===(i=this.forecast)||void 0===i?void 0:i[t+1];if(null==n?void 0:n.datetime){const t=new Date(n.datetime).getTime();if(Number.isFinite(t)&&t>e)return t}return e+36e5}_formatDayKey(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_toTimestamp(t){if(!t)return;const e=t.getTime();return Number.isFinite(e)?e:void 0}_determineDayShift(t,e,i){const n=e=>{if(void 0===e)return 0;const i=this._formatDayKey(new Date(e));return i===t?0:i<t?1:-1},r=n(e);return 0!==r?r:n(i)}};t([$t({attribute:!1})],Ce.prototype,"hass",void 0),t([$t({attribute:!1})],Ce.prototype,"weatherEntity",void 0),t([$t({attribute:!1})],Ce.prototype,"forecast",void 0),t([$t({attribute:!1})],Ce.prototype,"showSunTimes",void 0),t([$t({attribute:!1})],Ce.prototype,"sunCoordinates",void 0),t([$t({attribute:!1})],Ce.prototype,"precipitationUnit",void 0),t([$t({attribute:!1})],Ce.prototype,"extraAttribute",void 0),t([$t({attribute:!1})],Ce.prototype,"extraAttributeUnit",void 0),t([$t({attribute:!1})],Ce.prototype,"extraAttributeDivisor",void 0),t([$t({attribute:!1})],Ce.prototype,"extraAttributeColor",void 0),t([$t({attribute:!1})],Ce.prototype,"extraAttributeDimBelow",void 0),t([$t({attribute:!1})],Ce.prototype,"iconMap",void 0),t([St()],Ce.prototype,"selectedItem",void 0),Ce=t([bt("dwf-hourly-list")],Ce);const Ae=60;let ke=class extends gt{constructor(){super(...arguments),this.forecast=[],this._barStride=1,this._barGap=5,this._containerWidth=0}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._setupResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0)}render(){const t=this._buildMinuteSeries(),e=this._reduceSeries(t,this._barStride),i=e.reduce((t,e)=>Math.max(t,e),0),n=Math.max(1,i),r=this._computeLabelOffset(this._containerWidth||this.clientWidth),o=this._barStride>1?[Bt("card.nowcast.now"),"20m","40m","60m"]:[Bt("card.nowcast.now"),"10m","20m","30m","40m","50m","60m"];return Q`
      <div class=${kt({"nowcast-bars":!0})} style=${Tt({"--dwf-nowcast-gap":`${this._barGap}px`})}>
        ${e.map(t=>{const e=Math.min(1,t/n);return Q`
            <div class="nowcast-bar">
              <div class="nowcast-bar-fill" style=${Tt({height:`${Math.round(100*e)}%`})}></div>
            </div>
          `})}
      </div>
      <div class="nowcast-labels" style=${Tt({transform:`translateX(${r}px)`})}>
        ${o.map(t=>Q`<span>${t}</span>`)}
      </div>
    `}_setupResizeObserver(){this._resizeObserver||(this._resizeObserver=new ResizeObserver(t=>{var e,i,n;const r=null!==(n=null===(i=null===(e=t[0])||void 0===e?void 0:e.contentRect)||void 0===i?void 0:i.width)&&void 0!==n?n:this.clientWidth;Number.isFinite(r)&&r>0&&r!==this._containerWidth&&(this._containerWidth=r),this._updateResolution(r)}),this._resizeObserver.observe(this))}_updateResolution(t){if(!Number.isFinite(t)||t<=0)return;const{stride:e,gap:i}=this._resolveLayout(t);e!==this._barStride&&(this._barStride=e),i!==this._barGap&&(this._barGap=i)}_computeLabelOffset(t){var e;if(!(null===(e=this.forecast)||void 0===e?void 0:e.length)||!Number.isFinite(t)||t<=0)return 0;const i=this.forecast.map(t=>new Date(t.datetime).getTime()).filter(t=>Number.isFinite(t)).sort((t,e)=>t-e);if(!i.length)return 0;const n=i[0],r=Math.round((Date.now()-n)/6e4);if(Math.abs(r)<=2)return 0;return r*(t/Ae)}_buildMinuteSeries(){const t=(Array.isArray(this.forecast)?this.forecast:[]).map(t=>({timestamp:new Date(t.datetime).getTime(),value:Number.isFinite(t.precipitation)?Math.max(0,t.precipitation):0})).filter(t=>Number.isFinite(t.timestamp)).sort((t,e)=>t.timestamp-e.timestamp),e=t.map(t=>t.value).slice(0,Ae);for(;e.length<Ae;)e.push(0);return e}_reduceSeries(t,e){if(e<=1)return t;const i=[];for(let n=0;n<t.length;n+=e){const r=t.slice(n,n+e);i.push(r.reduce((t,e)=>Math.max(t,e),0))}return i}_resolveLayout(t){let e=1,i=5;for(;e<Ae;){if(this._computeBarWidth(t,e,i)>=5)break;e+=1}const n=Math.ceil(Ae/e);if(n>1){const e=(t-7*n)/(n-1);e>i&&(i=e)}return{stride:e,gap:Math.max(0,i)}}_computeBarWidth(t,e,i){const n=Math.ceil(Ae/e);return n<=0?0:1===n?t:(t-i*(n-1))/n}};t([$t({attribute:!1})],ke.prototype,"forecast",void 0),t([St()],ke.prototype,"_barStride",void 0),t([St()],ke.prototype,"_barGap",void 0),t([St()],ke.prototype,"_containerWidth",void 0),ke=t([bt("dwf-nowcast")],ke);const Oe=_`
  ${f(Ht)}
`,Fe={threshold:.005,maxVelocity:5,deceleration:.00375,snapSelector:".forecast-item"},Te=new WeakMap,De=(t,e={})=>{const i=Te.get(t);if(i)return i.cleanup;const n=Object.assign(Object.assign({},Fe),e),r={drag:{active:!1,pointerId:null,startX:0,scrollLeft:0,lastTime:0,lastScrollLeft:0,velocity:0,hasMoved:!1,captured:!1},options:n,momentumFrame:void 0,cleanup:()=>{a(),t.removeEventListener("pointerdown",l),t.removeEventListener("pointermove",c),t.removeEventListener("pointerup",d),t.removeEventListener("pointercancel",d),Te.delete(t)}},o=()=>{void 0!==r.momentumFrame&&(cancelAnimationFrame(r.momentumFrame),r.momentumFrame=void 0)},a=()=>{o(),t.classList.remove("momentum"),t.classList.remove("dragging")},s=()=>{o();const e=Array.from(t.querySelectorAll(n.snapSelector));if(!e.length)return void a();const i=getComputedStyle(t),s=parseFloat(i.paddingLeft||"0"),l=t.getBoundingClientRect().left+s;let c=null,d=Number.POSITIVE_INFINITY;for(const t of e){const e=t.getBoundingClientRect(),i=Math.abs(e.left-l);i<d&&(d=i,c=t)}if(!c)return void a();const h=t.scrollWidth-t.clientWidth,u=t.scrollLeft+(c.getBoundingClientRect().left-l),p=Math.max(0,Math.min(u,h));if(Math.abs(t.scrollLeft-p)<=.5)return t.scrollLeft=p,void a();t.classList.add("momentum"),t.classList.remove("dragging");const f=()=>{if(!t.isConnected)return void a();if(Math.abs(t.scrollLeft-p)<=.5)return t.scrollLeft=p,void a();r.momentumFrame=requestAnimationFrame(f)};t.scrollTo({left:p,behavior:"smooth"}),r.momentumFrame=requestAnimationFrame(f)},l=e=>{if(!t.isConnected)return void a();if(a(),void 0!==e.button&&0!==e.button)return;if("mouse"!==e.pointerType&&"pen"!==e.pointerType)return;t.scrollWidth-t.clientWidth<=0||(r.drag={active:!0,pointerId:e.pointerId,startX:e.clientX,scrollLeft:t.scrollLeft,lastTime:e.timeStamp,lastScrollLeft:t.scrollLeft,velocity:0,hasMoved:!1,captured:!1},t.classList.add("grabbing"))},c=e=>{if(!r.drag.active||e.pointerId!==r.drag.pointerId)return;const i=e.clientX-r.drag.startX;if(!r.drag.hasMoved&&Math.abs(i)>4){r.drag.hasMoved=!0,r.drag.lastTime=e.timeStamp,r.drag.lastScrollLeft=t.scrollLeft,t.classList.add("dragging");try{t.setPointerCapture(e.pointerId),r.drag.captured=!0}catch(t){r.drag.captured=!1}}if(!r.drag.hasMoved)return;t.scrollLeft=r.drag.scrollLeft-i;const n=e.timeStamp-r.drag.lastTime;if(n>0){const e=(t.scrollLeft-r.drag.lastScrollLeft)/n;r.drag.velocity=e}r.drag.lastTime=e.timeStamp,r.drag.lastScrollLeft=t.scrollLeft,e.preventDefault()},d=e=>{var i;if(e.pointerId!==r.drag.pointerId)return;const{velocity:o,captured:l,pointerId:c,hasMoved:d}=r.drag;r.drag={active:!1,pointerId:null,startX:0,scrollLeft:0,lastTime:0,lastScrollLeft:0,velocity:0,hasMoved:!1,captured:!1};try{l&&null!==c&&(null===(i=t.hasPointerCapture)||void 0===i?void 0:i.call(t,c))&&t.releasePointerCapture(c)}catch(t){}t.classList.remove("grabbing"),d?Math.abs(o)>n.threshold?(e=>{if(t.scrollWidth-t.clientWidth<=0)return void a();a();let i=e;Math.abs(i)>n.maxVelocity&&(i=Math.sign(i)*n.maxVelocity);let o=null;t.classList.remove("dragging"),t.classList.add("momentum");const l=e=>{if(!t.isConnected)return void a();if(null===o)return o=e,void(r.momentumFrame=requestAnimationFrame(l));const c=e-o;o=e,t.scrollLeft+=i*c;const d=t.scrollWidth-t.clientWidth;if(t.scrollLeft<=0||t.scrollLeft>=d)return t.scrollLeft=Math.max(0,Math.min(t.scrollLeft,d)),void s();const h=n.deceleration*c;Math.abs(i)<=h?s():(i-=Math.sign(i)*h,r.momentumFrame=requestAnimationFrame(l))};r.momentumFrame=requestAnimationFrame(l)})(o):(t.classList.remove("dragging"),s()):t.classList.remove("dragging")};return t.addEventListener("pointerdown",l),t.addEventListener("pointermove",c,{passive:!1}),t.addEventListener("pointerup",d),t.addEventListener("pointercancel",d),r.cleanup=()=>{a(),t.removeEventListener("pointerdown",l),t.removeEventListener("pointermove",c),t.removeEventListener("pointerup",d),t.removeEventListener("pointercancel",d),Te.delete(t)},Te.set(t,r),r.cleanup},Ne=new URL("./img/sunny.jpg",import.meta.url).href,Le=new URL("./img/clear-night.jpg",import.meta.url).href,Me=new URL("./img/cloudy.jpg",import.meta.url).href,ze=new URL("./img/cloudy-night.jpg",import.meta.url).href,Re={pouring:{day:new URL("./img/pouring.jpg",import.meta.url).href,night:new URL("./img/pouring-night.jpg",import.meta.url).href},sunny:{day:Ne,night:Le},clearnight:{day:Ne,night:Le},cloudy:{day:Me,night:ze},partlycloudy:{day:new URL("./img/partly-cloudy.jpg",import.meta.url).href,night:new URL("./img/partly-cloudy-night.jpg",import.meta.url).href},fog:{day:new URL("./img/fog.jpg",import.meta.url).href,night:new URL("./img/fog-night.jpg",import.meta.url).href},hail:{day:new URL("./img/hail.jpg",import.meta.url).href,night:new URL("./img/hail-night.jpg",import.meta.url).href},lightningrainy:{day:new URL("./img/lightning-rainy.jpg",import.meta.url).href,night:new URL("./img/lightning-rainy-night.jpg",import.meta.url).href},lightning:{day:new URL("./img/lightning.jpg",import.meta.url).href,night:new URL("./img/lightning-night.jpg",import.meta.url).href},rainy:{day:new URL("./img/rainy.jpg",import.meta.url).href,night:new URL("./img/rainy-night.jpg",import.meta.url).href},snowyrainy:{day:new URL("./img/snowy-rainy.jpg",import.meta.url).href,night:new URL("./img/snowy-rainy-night.jpg",import.meta.url).href},snowy:{day:new URL("./img/snowy.jpg",import.meta.url).href,night:new URL("./img/snowy-night.jpg",import.meta.url).href},windyvariant:{day:new URL("./img/windy-variant.jpg",import.meta.url).href,night:new URL("./img/windy-variant-night.jpg",import.meta.url).href},windy:{day:new URL("./img/windy.jpg",import.meta.url).href,night:new URL("./img/windy-night.jpg",import.meta.url).href}},He=Re.partlycloudy;console.info(`%c  DETAILED WEATHER FORECAST\n%c  ${Bt("common.version")} 0.4.0    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray");const je="missing",Ie="solar_forecast";class Pe extends gt{constructor(){super(...arguments),this._solarForecastByHour={},this._solarForecastByDay={},this._nowcastForecast=[],this._nowcastHasRain=!1,this._showAttributes=!1,this._subscriptions={hourly:void 0,daily:void 0},this._momentumCleanup={},this._momentumElement={},this._solarForecastRequestId=0,this._nowcastRequestId=0,this._isProgrammaticScroll=!1}setConfig(t){var e,i,n,r,o,a,s,l,c,d,h,u;const p=null===(e=this._config)||void 0===e?void 0:e.nowcast_entity,f=this._normalizeHeaderChips(t),_=this._normalizeMinGapValue(t.daily_min_gap),m=this._normalizeMinGapValue(t.hourly_min_gap),y=this._normalizeOptionalNumber(t.hourly_extra_attribute_dim_below),g=this._normalizeOptionalNumber(t.daily_extra_attribute_dim_below),v=this._normalizeOptionalText(t.hourly_extra_attribute_color),b=this._normalizeOptionalText(t.daily_extra_attribute_color),w=this._normalizeIconMap(t.icon_map),x=this._normalizeMasonryRows(t.masonry_rows),$=Object.assign(Object.assign({type:"custom:detailed-weather-forecast-card"},t),{nowcast_entity:t.nowcast_entity,nowcast_always_show:null!==(i=t.nowcast_always_show)&&void 0!==i&&i,show_header:null===(n=t.show_header)||void 0===n||n,hourly_forecast:null===(r=t.hourly_forecast)||void 0===r||r,daily_forecast:null===(o=t.daily_forecast)||void 0===o||o,show_sun_times:null!==(a=t.show_sun_times)&&void 0!==a&&a,sun_use_home_coordinates:null===(s=t.sun_use_home_coordinates)||void 0===s||s,use_night_header_backgrounds:null===(l=t.use_night_header_backgrounds)||void 0===l||l,header_chips:f,icon_map:w,daily_min_gap:_,hourly_min_gap:m,hourly_extra_attribute:t.hourly_extra_attribute,hourly_extra_attribute_unit:t.hourly_extra_attribute_unit,hourly_extra_attribute_divisor:t.hourly_extra_attribute_divisor,hourly_extra_attribute_color:v,hourly_extra_attribute_dim_below:y,daily_extra_attribute:t.daily_extra_attribute,daily_extra_attribute_unit:t.daily_extra_attribute_unit,daily_extra_attribute_divisor:t.daily_extra_attribute_divisor,daily_extra_attribute_color:b,daily_extra_attribute_dim_below:g,solar_forecast_entries:Array.isArray(t.solar_forecast_entries)?t.solar_forecast_entries:void 0,masonry_rows:x,header_info:null!==(c=t.header_info)&&void 0!==c?c:[],daily_info:null!==(d=t.daily_info)&&void 0!==d?d:[],hourly_info:null!==(h=t.hourly_info)&&void 0!==h?h:[],compact_header:null!==(u=t.compact_header)&&void 0!==u&&u});this._config=$,p!==$.nowcast_entity&&this._resetNowcastState(),this._entity=$.entity,this._hass&&(this.hass=this._hass),this._setupNowcastRefreshTimer()}set hass(t){var e;if(this._hass=t,Ut(t),this._state=t.states[this._entity],this._state){this._status=this._state.state;const t=this._state.attributes.friendly_name;this._name=t||this._entity}const i=null===(e=this._config)||void 0===e?void 0:e.header_temperature_entity;this._headerTemperatureState=i?t.states[i]:void 0,this._handleNowcastHassUpdate(),this._setupNowcastRefreshTimer()}_normalizeHeaderChips(t){const e=[];if(Array.isArray(t.header_chips))for(const i of t.header_chips)if(!(e.length>=3)&&i&&"object"==typeof i){if("attribute"===i.type){const t="string"==typeof i.attribute?i.attribute.trim():"",n="object"==typeof i.tap_action&&i.tap_action?i.tap_action:void 0,r="string"==typeof i.icon?i.icon.trim():void 0,o="string"==typeof i.unit?i.unit.trim():void 0,a="number"==typeof i.divisor?i.divisor:void 0,s="string"==typeof i.name?i.name.trim():void 0;e.push({type:"attribute",attribute:t,tap_action:n,name:s,icon:r,unit:o,divisor:a});continue}if("entity"===i.type){const t="string"==typeof i.entity?i.entity.trim():"",n="object"==typeof i.tap_action&&i.tap_action?i.tap_action:void 0,r="string"==typeof i.icon?i.icon.trim():void 0,o="string"==typeof i.name?i.name.trim():void 0;e.push({type:"entity",entity:t,tap_action:n,name:o,icon:r})}}if(e.length)return e.slice(0,3)}_normalizeMinGapValue(t){if(null==t)return;const e="number"==typeof t?t:Number(t);if(!Number.isFinite(e))return;const i=Math.max(10,e);return Math.round(i)}_normalizeOptionalNumber(t){if(null==t)return;const e="number"==typeof t?t:Number(t);return Number.isFinite(e)?e:void 0}_normalizeOptionalText(t){if(null==t)return;const e=String(t).trim();return e.length?e:void 0}_normalizeMasonryRows(t){if(null==t)return;const e="number"==typeof t?t:Number(t);return!Number.isFinite(e)||e<=0?void 0:Math.max(1,Math.round(e))}_normalizeIconMap(t){if(!t||"object"!=typeof t)return;const e={};return Object.entries(t).forEach(([t,i])=>{if("string"!=typeof i)return;const n=i.trim();n.length&&(e[t]=n)}),Object.keys(e).length?e:void 0}_shouldApplyMasonryHeight(){var t;if(!(null===(t=this._config)||void 0===t?void 0:t.masonry_rows))return!1;if(!this.isConnected)return!0;return!getComputedStyle(this).getPropertyValue("--row-height").trim()&&!Boolean(this.closest("hui-sections-view")||this.closest("hui-section-view")||this.closest("hui-section"))}_getHeaderChips(){return this._config&&Array.isArray(this._config.header_chips)&&this._config.header_chips.length?this._config.header_chips.slice(0,3):[]}static async getConfigElement(){return await Promise.resolve().then(function(){return Je}),document.createElement("detailed-weather-forecast-editor")}static getStubConfig(t){var e;const i=Object.keys(null!==(e=null==t?void 0:t.states)&&void 0!==e?e:{}).find(t=>t.startsWith("weather."));return{type:"custom:detailed-weather-forecast-card",entity:null!=i?i:"weather.home",header_attributes:[],show_header:!0,hourly_forecast:!0,daily_forecast:!0,orientation:"vertical",use_night_header_backgrounds:!0}}_needForecastSubscription(){return this._config.daily_forecast||this._config.hourly_forecast}_unsubscribeForecastEvents(){Object.values(this._subscriptions).forEach(t=>{null==t||t.then(t=>t())}),this._subscriptions={hourly:void 0,daily:void 0}}async _subscribeForecast(t){this._subscriptions[t]||(this._subscriptions[t]=((t,e,i,n)=>t.connection.subscribeMessage(n,{type:"weather/subscribe_forecast",forecast_type:i,entity_id:e}))(this._hass,this._entity,t,e=>{"hourly"===t&&(this._forecastHourlyEvent=e),"daily"===t&&(this._forecastDailyEvent=e)}).catch(e=>{throw this._subscriptions[t]=void 0,e}))}async _subscribeForecastEvents(){this._unsubscribeForecastEvents();if(!(this.isConnected&&this._hass&&this._config&&this._needForecastSubscription()&&this._hass.config.components.includes("weather")&&this._state))return;const t=(t=>{const e=[];return le(t,Vt.FORECAST_DAILY)&&e.push("daily"),le(t,Vt.FORECAST_TWICE_DAILY)&&e.push("twice_daily"),le(t,Vt.FORECAST_HOURLY)&&e.push("hourly"),e})(this._state);["hourly","daily"].forEach(e=>{const i=`${e}_forecast`;this._config[i]&&t.includes(e)&&this._subscribeForecast(e)})}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this._config&&this._hass&&this._subscribeForecastEvents()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeForecastEvents(),this._clearNowcastRefreshTimer(),this._resizeObserver&&this._resizeObserver.disconnect(),Object.values(this._momentumCleanup).forEach(t=>null==t?void 0:t()),this._momentumCleanup={},this._momentumElement={}}updated(t){super.updated(t);const e=t.has("_forecastHourlyEvent"),i=t.has("_forecastDailyEvent");if(!this._config||!this._hass)return;(t.has("_config")||!this._subscriptions.hourly&&!this._subscriptions.daily)&&this._subscribeForecastEvents(),(t.has("_config")||e||i)&&this._refreshSolarForecastData(),t.has("_config")&&this._refreshNowcastData();const n=this.shadowRoot.querySelector("ha-card"),r=this.shadowRoot.querySelector(".forecast.daily"),o=this.shadowRoot.querySelector(".forecast.hourly");if(r?this._initDragScroll("daily",r):this._teardownDragScroll("daily"),o?this._initDragScroll("hourly",o):this._teardownDragScroll("hourly"),!this._resizeObserver){if(!n||!r&&!o)return;this._resizeObserver=new ResizeObserver(()=>{this._updateGap()}),this._resizeObserver.observe(n),this._updateGap()}}render(){var t,e,i,n,r,o;if(!this._config||!this._hass)return it;if(!this._state)return Q` <hui-warning> ${this._name} not found. </hui-warning> `;if("unavailable"===this._status)return Q`
        <ha-card class="unavailable">
          <p>${this._name} is unavailable.</p>
        </ha-card>
      `;const a=!1!==this._config.daily_forecast,s=!1!==this._config.hourly_forecast,c=!1!==this._config.show_header,d=a||s,h=a&&s,u=null!==(e=null===(t=this._forecastDailyEvent)||void 0===t?void 0:t.forecast)&&void 0!==e?e:[],p=null!==(n=null===(i=this._forecastHourlyEvent)||void 0===i?void 0:i.forecast)&&void 0!==n?n:[],f=this._applySolarForecastToForecast(u,"daily"),_=this._applySolarForecastToForecast(p,"hourly"),m=this._getLocationCoordinates(),y=Boolean(this._config.show_sun_times&&m&&s),g=this._config.header_tap_action_temperature,v=this._config.header_temperature_entity||this._entity,b=l(g),w=this._config.header_info.length>0,x=this._computeHeaderTemperature();let $;$=void 0!==this._state.attributes.pictocode?Bt(`card.pictocode_hour.${this._state.attributes.pictocode}`):(null===(o=null===(r=this._hass)||void 0===r?void 0:r.formatEntityState)||void 0===o?void 0:o.call(r,this._state))||this._state.state;const S=c&&!d,E=this._isNowcastEnabled()&&(this._config.nowcast_always_show||this._nowcastHasRain||S),C={weather:!0,"header-only":S,"nowcast-inline":E},A=c||a||s,k=(()=>{var t;const e={};return void 0!==this._dailyGap&&(e["--dynamic-gap"]=`${this._dailyGap}px`),void 0!==(null===(t=this._config)||void 0===t?void 0:t.daily_min_gap)&&(e["--min-gap"]=`${this._config.daily_min_gap}px`),Object.keys(e).length?Tt(e):it})(),O=(()=>{var t;const e={};return void 0!==this._hourlyGap&&(e["--dynamic-gap"]=`${this._hourlyGap}px`),void 0!==(null===(t=this._config)||void 0===t?void 0:t.hourly_min_gap)&&(e["--min-gap"]=`${this._config.hourly_min_gap}px`),Object.keys(e).length?Tt(e):it})(),F=(()=>{var t,e;if(!this._shouldApplyMasonryHeight())return it;const i=null!==(e=null===(t=this._config)||void 0===t?void 0:t.masonry_rows)&&void 0!==e?e:0;return!Number.isFinite(i)||i<=0?it:Tt({"min-height":50*i+"px"})})();if(!A){const t=this._name||this._entity;return Q` <hui-warning> ${t} has no sections enabled. </hui-warning> `}const T=this._computeHeaderChipDisplays(),D=this._shouldUseSnowNowcastFill(),N={"background-image":`url(${this._getWeatherBgImage(this._state.state)})`};E&&!S&&(N["--dwf-header-height"]="calc(4 * var(--row-height, 56px))");const L=T.length?T.map(t=>{const e=l(t.action),i={"attribute-chip":!0,missing:t.missing,"has-action":e},n=t.tooltip||`${t.label}: ${t.display}`;return Q`
            <div
              class=${kt(i)}
              title=${n}
              role=${e?"button":void 0}
              tabindex=${e?0:void 0}
              @click=${e?()=>this._handleHeaderChipTap(t.action,"entity"===t.type?t.entity:void 0):void 0}
              @keydown=${e?e=>this._handleHeaderChipKeydown(e,t.action,"entity"===t.type?t.entity:void 0):void 0}
            >
              ${t.icon?Q`<ha-icon class="chip-icon" .icon=${t.icon}></ha-icon>`:it}
              <span class="header-pill-text">${t.display}</span>
            </div>
          `}):it,M=T.length?Q` <div class="header-attributes">${L}</div> `:it,z=Q`
      <div class="header-main">
        <div
          class=${kt({temp:!0,"has-action":b})}
          role=${b?"button":void 0}
          tabindex=${b?0:void 0}
          @click=${b?()=>this._handleHeaderTap(g,v):void 0}
          @keydown=${b?t=>this._handleHeaderKeydown(t,g,v):void 0}
        >
          <span class="header-pill-text">${x}</span>
        </div>
        <div
          class=${kt({condition:!0,"has-action":w})}
          role=${w?"button":void 0}
          tabindex=${w?0:void 0}
          @click=${w?()=>this._handleConditionTap():void 0}
          @keydown=${w?t=>this._handleConditionKeydown(t):void 0}
        >
          <span class="header-pill-text"> ${$} </span>
        </div>
      </div>
    `,R=Q`
      <div class="header-layout">${M} ${z}</div>
    `,H=Q`
      <div
        class="nowcast-panel"
        style=${D?Tt({"--dwf-nowcast-fill-color":"rgba(255, 255, 255, 0.9)"}):it}
      >
        <dwf-nowcast .forecast=${this._nowcastForecast}></dwf-nowcast>
      </div>
    `;return Q`
      <ha-card style=${F}>
        ${c?this._config.compact_header?Q`
                <dwf-compact-header
                  .hass=${this._hass}
                  .weatherEntity=${this._state}
                  .config=${this._config}
                  .nowcastPanelTemplate=${E?H:void 0}
                  .headerTemperature=${x}
                  @dwf-temperature-click=${this._handleCompactHeaderTemperatureClick}
                  @dwf-condition-click=${this._handleConditionTap}
                ></dwf-compact-header>
              `:Q`
                <dwf-header
                  .headerClassMap=${C}
                  .headerStyles=${N}
                  .headerLayoutTemplate=${R}
                  .showInlineNowcast=${E}
                  .nowcastPanelTemplate=${H}
                ></dwf-header>
              `:it}
        ${c&&d?Q`<div class="divider card-divider"></div>`:it}
        ${this._config.header_info.length>0&&this._showAttributes?Q`<dwf-current-weather-attributes
                .hass=${this._hass}
                .weatherEntity=${this._state}
                .attributeConfigs=${this._config.header_info}
              ></dwf-current-weather-attributes>
              <div class="divider card-divider"></div>`:it}
        ${d?Q`
              <div class="forecast-container">
                ${a?Q`
                      <div class="forecast-daily-container">
                        <div class="fade-left"></div>
                        <div class="fade-right"></div>
                        <div class="forecast daily" style=${k}>
                          <dwf-daily-list
                            .hass=${this._hass}
                            .weatherEntity=${this._state}
                            .forecast=${f}
                            .precipitationUnit=${this._state.attributes.precipitation_unit}
                            .extraAttribute=${this._config.daily_extra_attribute}
                            .extraAttributeUnit=${this._config.daily_extra_attribute_unit}
                            .extraAttributeDivisor=${this._config.daily_extra_attribute_divisor}
                            .extraAttributeColor=${this._config.daily_extra_attribute_color}
                            .extraAttributeDimBelow=${this._config.daily_extra_attribute_dim_below}
                            .iconMap=${this._config.icon_map}
                            @dwf-daily-list-item-selected=${this._handleDailySelected}
                            @dwf-daily-list-item-show-attributes=${this._handleDailyShowAttributes}
                          ></dwf-daily-list>
                        </div>
                      </div>
                    `:it}
                ${this._selectedDailyForecast&&this._config.daily_info.length>0?Q`<div class="divider card-divider"></div>
                      <dwf-forecast-attributes
                        .hass=${this._hass}
                        .weatherEntity=${this._state}
                        .forecastAttribute=${this._selectedDailyForecast}
                        .attributeConfigs=${this._config.daily_info}
                        .dailyForecast=${!0}
                      ></dwf-forecast-attributes>`:it}
                ${h?Q`<div class="divider forecast-divider"></div>`:it}
                ${s?Q`
                      <div class="forecast-hourly-container">
                        <div class="fade-left"></div>
                        <div class="fade-right"></div>
                        <div class="forecast hourly" style=${O}>
                          <dwf-hourly-list
                            .hass=${this._hass}
                            .weatherEntity=${this._state}
                            .forecast=${_}
                            .showSunTimes=${y}
                            .sunCoordinates=${m}
                            .precipitationUnit=${this._state.attributes.precipitation_unit}
                            .extraAttribute=${this._config.hourly_extra_attribute}
                            .extraAttributeUnit=${this._config.hourly_extra_attribute_unit}
                            .extraAttributeDivisor=${this._config.hourly_extra_attribute_divisor}
                            .extraAttributeColor=${this._config.hourly_extra_attribute_color}
                            .extraAttributeDimBelow=${this._config.hourly_extra_attribute_dim_below}
                            .iconMap=${this._config.icon_map}
                            @dwf-hourly-scrolled-to-new-day=${this._handleHourlyNewDay}
                            @dwf-hourly-list-item-selected=${this._handleHourlySelected}
                          ></dwf-hourly-list>
                        </div>
                      </div>
                    `:it}
              </div>
            `:it}
        ${this._selectedHourlyForecast&&this._config.hourly_info.length>0?Q`<div class="divider card-divider"></div>
              <dwf-forecast-attributes
                .hass=${this._hass}
                .weatherEntity=${this._state}
                .forecastAttribute=${this._selectedHourlyForecast}
                .attributeConfigs=${this._config.hourly_info}
              ></dwf-forecast-attributes>`:it}
      </ha-card>
    `}_handleHourlyNewDay(t){var e;if(this._isProgrammaticScroll)return;const i=t.detail.date,n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("dwf-daily-list");n&&n.selectDate(i)}_computeHeaderTemperature(){var t,e,i,n;if(!this._hass||!this._state)return"";const r=this._headerTemperatureState;if(r&&!this._isStateUnavailable(r.state)){const i=null===(e=null===(t=this._hass)||void 0===t?void 0:t.formatEntityState)||void 0===e?void 0:e.call(t,r);return i&&"string"==typeof i?i:r.state}const o=null===(n=null===(i=this._hass)||void 0===i?void 0:i.formatEntityAttributeValue)||void 0===n?void 0:n.call(i,this._state,"temperature");return o&&"string"==typeof o?o:this._state.state||""}_isStateUnavailable(t){if(!t)return!0;const e=t.toLowerCase();return"unavailable"===e||"unknown"===e}_computeHeaderChipDisplays(){if(!this._config)return[];const t=this._getHeaderChips();if(!t.length)return[];const e=[];return t.forEach(t=>{var i,n,r,o;const a=l(t.tap_action)?t.tap_action:void 0,s="string"==typeof t.icon?t.icon.trim():void 0;if("entity"===t.type){const r=null!==(n=null===(i=t.entity)||void 0===i?void 0:i.trim())&&void 0!==n?n:"";if(!r)return;const o=this._formatHeaderEntity(r),l=`${r}: ${o.display}`,c=r,d=s||o.icon;return void e.push({label:c,display:o.display,missing:o.missing,tooltip:l,type:t.type,action:a,icon:d,entity:r})}const c=null!==(o=null===(r=t.attribute)||void 0===r?void 0:r.trim())&&void 0!==o?o:"";if(!c)return;const d=de(this._hass,this._state,c,t.name,t.unit,s,t.divisor);if(d){const i=`${d.name}: ${d.value}`;e.push({label:d.name,display:d.value,missing:!1,tooltip:i,type:t.type,action:a,icon:d.icon})}else e.push({label:c,display:je,missing:!0,tooltip:c,type:t.type,action:a,icon:s})}),e}_formatHeaderEntity(t){var e,i;if(!this._state||!this._hass)return{entity:t,display:je,missing:!0,icon:void 0};const n=this._hass.states[t];if(!n)return{entity:t,display:je,missing:!0,icon:void 0};const r=null===(i=null===(e=this._hass)||void 0===e?void 0:e.formatEntityState)||void 0===i?void 0:i.call(e,n);return void 0===r?{entity:t,display:je,missing:!0,icon:void 0}:{entity:n.attributes.friendly_name||t,display:r,missing:!1,icon:n.attributes.icon}}_needsSolarForecast(){return!!this._config&&(this._config.hourly_extra_attribute===Ie||this._config.daily_extra_attribute===Ie||this._config.hourly_info.some(t=>t.attribute===Ie)||this._config.daily_info.some(t=>t.attribute===Ie))}_refreshSolarForecastData(){var t;if(!this._needsSolarForecast())return void((Object.keys(this._solarForecastByHour).length||Object.keys(this._solarForecastByDay).length)&&(this._solarForecastByHour={},this._solarForecastByDay={}));if(!(null===(t=this._hass)||void 0===t?void 0:t.callWS))return;const e=++this._solarForecastRequestId;this._loadSolarForecastData(e)}async _loadSolarForecastData(t){try{const e=await this._hass.callWS({type:"energy/get_prefs"});if(t!==this._solarForecastRequestId)return;const i=this._extractSolarForecastEntries(e),n=this._selectSolarForecastEntries(i);if(!n.length)return this._solarForecastByHour={},void(this._solarForecastByDay={});const r=await this._hass.callWS({type:"energy/solar_forecast"});if(t!==this._solarForecastRequestId)return;const{hourly:o,daily:a}=this._buildSolarForecastMaps(r,n);this._solarForecastByHour=o,this._solarForecastByDay=a}catch(t){this._solarForecastByHour={},this._solarForecastByDay={}}}_extractSolarForecastEntries(t){var e;const i=null!==(e=null==t?void 0:t.energy_sources)&&void 0!==e?e:[],n=new Set;return i.forEach(t=>{if("solar"!==(null==t?void 0:t.type))return;const e=t.config_entry_solar_forecast;Array.isArray(e)&&e.forEach(t=>{"string"==typeof t&&t.trim().length&&n.add(t)})}),Array.from(n)}_selectSolarForecastEntries(t){if(!this._config)return[];if(this._config.solar_forecast_entries){if(!this._config.solar_forecast_entries.length)return[];const e=new Set(this._config.solar_forecast_entries);return t.filter(t=>e.has(t))}return t}_buildSolarForecastMaps(t,e){const i={},n={};return e.forEach(e=>{var r;const o=null==t?void 0:t[e],a=null!==(r=null==o?void 0:o.wh_hours)&&void 0!==r?r:{};Object.entries(a).forEach(([t,e])=>{var r,o;const a="number"==typeof e?e:Number(e);if(!Number.isFinite(a))return;const s=new Date(t);if(!Number.isFinite(s.getTime()))return;const l=a/1e3,c=this._formatSolarHourKey(s),d=this._formatSolarDayKey(s);i[c]=(null!==(r=i[c])&&void 0!==r?r:0)+l,n[d]=(null!==(o=n[d])&&void 0!==o?o:0)+l})}),{hourly:i,daily:n}}_applySolarForecastToForecast(t,e){const i="hourly"===e?this._solarForecastByHour:this._solarForecastByDay;return(null==t?void 0:t.length)&&Object.keys(i).length?t.map(t=>{if(!(null==t?void 0:t.datetime))return t;const n=new Date(t.datetime);if(!Number.isFinite(n.getTime()))return t;const r="hourly"===e?this._formatSolarHourKey(n):this._formatSolarDayKey(n),o=i[r];return void 0===o?t:Object.assign(Object.assign({},t),{solar_forecast:o})}):t}_resetNowcastState(){this._nowcastRequestId+=1,this._nowcastEntityId=void 0,this._nowcastServiceDomain=void 0,this._nowcastLastUpdated=void 0,this._nowcastForecast=[],this._nowcastHasRain=!1,this._clearNowcastRefreshTimer()}_clearNowcastForecast(){(this._nowcastForecast.length||this._nowcastHasRain)&&(this._nowcastForecast=[],this._nowcastHasRain=!1)}_refreshNowcastData(){var t,e;if(!this._isNowcastEnabled()||!(null===(t=this._hass)||void 0===t?void 0:t.callWS))return void this._clearNowcastForecast();const i=null===(e=this._config)||void 0===e?void 0:e.nowcast_entity;if(!i)return void this._clearNowcastForecast();const n=++this._nowcastRequestId;this._loadNowcastData(n,i)}async _loadNowcastData(t,e){try{const i=await this._resolveNowcastServiceDomain(e,t);if(!i||t!==this._nowcastRequestId)return void this._clearNowcastForecast();const n=await this._hass.callWS({type:"call_service",domain:i,service:"get_minute_forecast",target:{entity_id:e},return_response:!0});if(t!==this._nowcastRequestId)return;const r=this._extractNowcastForecast(n,e);this._setNowcastForecast(r)}catch(t){this._clearNowcastForecast()}}async _resolveNowcastServiceDomain(t,e){if(this._nowcastEntityId===t&&this._nowcastServiceDomain)return this._nowcastServiceDomain;try{const i=await this._hass.callWS({type:"config/entity_registry/get",entity_id:t});if(e!==this._nowcastRequestId)return;const n=null==i?void 0:i.platform;return this._nowcastEntityId=t,this._nowcastServiceDomain="string"==typeof n&&n.trim().length?n:void 0,this._nowcastServiceDomain}catch(e){return this._nowcastEntityId=t,void(this._nowcastServiceDomain=void 0)}}_extractNowcastForecast(t,e){var i,n;const r=[],o=null===(n=null===(i=null==t?void 0:t.response)||void 0===i?void 0:i[e])||void 0===n?void 0:n.forecast;return Array.isArray(o)?(o.forEach(t=>{const e="string"==typeof(null==t?void 0:t.datetime)?t.datetime:void 0;if(!e)return;const i=new Date(e).getTime();if(!Number.isFinite(i))return;const n=null==t?void 0:t.precipitation,o="number"==typeof n?n:Number(n);Number.isFinite(o)&&r.push({datetime:e,precipitation:Math.max(0,o)})}),r.sort((t,e)=>new Date(t.datetime).getTime()-new Date(e.datetime).getTime())):r}_setNowcastForecast(t){const e=t.some(t=>t.precipitation>0);this._nowcastForecast=t,this._nowcastHasRain=e}_handleNowcastHassUpdate(){var t,e;if(!this._isNowcastEnabled()||!this._hass)return;const i=null===(t=this._config)||void 0===t?void 0:t.nowcast_entity;if(!i)return;const n=this._hass.states[i];if(!n)return void this._clearNowcastForecast();const r=null!==(e=n.last_updated)&&void 0!==e?e:n.last_changed;r&&r!==this._nowcastLastUpdated&&(this._nowcastLastUpdated=r,this._refreshNowcastData())}_isNowcastEnabled(){var t;return Boolean(null===(t=this._config)||void 0===t?void 0:t.nowcast_entity)}_setupNowcastRefreshTimer(){if(!this._isNowcastEnabled()||!this._hass)return void this._clearNowcastRefreshTimer();this._clearNowcastRefreshTimer();const t=6e4-Date.now()%6e4;this._nowcastRefreshTimeout=window.setTimeout(()=>{this._refreshNowcastData(),this._nowcastRefreshInterval=window.setInterval(()=>{this._refreshNowcastData()},6e4)},t)}_clearNowcastRefreshTimer(){void 0!==this._nowcastRefreshTimeout&&(window.clearTimeout(this._nowcastRefreshTimeout),this._nowcastRefreshTimeout=void 0),void 0!==this._nowcastRefreshInterval&&(window.clearInterval(this._nowcastRefreshInterval),this._nowcastRefreshInterval=void 0)}_formatSolarHourKey(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}T${String(t.getHours()).padStart(2,"0")}`}_formatSolarDayKey(t){return`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`}_getLocationCoordinates(){var t,e,i,n,r;if(!this._config)return this._sunCoordinateCacheKey=void 0,void(this._sunCoordinateCache=void 0);const o=null===(t=this._config.sun_use_home_coordinates)||void 0===t||t,a=o?this._parseCoordinate(null===(i=null===(e=this._hass)||void 0===e?void 0:e.config)||void 0===i?void 0:i.latitude,-90,90):this._parseCoordinate(this._config.sun_latitude,-90,90),s=o?this._parseCoordinate(null===(r=null===(n=this._hass)||void 0===n?void 0:n.config)||void 0===r?void 0:r.longitude,-180,180):this._parseCoordinate(this._config.sun_longitude,-180,180);if(void 0===a||void 0===s)return this._sunCoordinateCacheKey=void 0,void(this._sunCoordinateCache=void 0);const l=`${a},${s}`;if(this._sunCoordinateCacheKey===l&&this._sunCoordinateCache)return this._sunCoordinateCache;const c={latitude:a,longitude:s};return this._sunCoordinateCacheKey=l,this._sunCoordinateCache=c,c}_parseCoordinate(t,e,i){if(null==t)return;const n="number"==typeof t?t:parseFloat(t);return Number.isFinite(n)&&!(n<e||n>i)?n:void 0}_getWeatherBgImage(t){var e;const i=Re[t.replace(/-/g,"")],n=!1!==(null===(e=this._config)||void 0===e?void 0:e.use_night_header_backgrounds),r=!n||this._isDaytimeNow(),o=n&&!r?He.night:He.day;return i?n?r?i.day:i.night:i.day:o}_shouldUseSnowNowcastFill(){var t;const e=null===(t=this._state)||void 0===t?void 0:t.state;return"snowy"===e||"snowy-rainy"===e}_isDaytimeNow(){var t,e,i,n;const r=null===(e=null===(t=this._state)||void 0===t?void 0:t.attributes)||void 0===e?void 0:e.is_daytime;if("boolean"==typeof r)return r;const o=this._getLocationCoordinates();if(!o)return!0;const a=new Date,s=zt.getTimes(a,o.latitude,o.longitude),l=null===(i=s.sunrise)||void 0===i?void 0:i.getTime(),c=null===(n=s.sunset)||void 0===n?void 0:n.getTime();if("number"!=typeof l||Number.isNaN(l)||"number"!=typeof c||Number.isNaN(c))return!0;const d=a.getTime();return l<=c?d>=l&&d<c:d>=l||d<c}_updateGap(){const t=this.shadowRoot.querySelector("ha-card"),e=this.shadowRoot.querySelector(".forecast.daily"),i=this.shadowRoot.querySelector(".forecast.hourly");if(!t||!e&&!i)return;const n=t.clientWidth;if(n===this._oldContainerWidth)return;const r=t=>{if(!t)return;const e=getComputedStyle(t),i=parseInt(e.getPropertyValue("--icon-container-width")),r=parseInt(e.getPropertyValue("--min-gap"));if(Number.isNaN(i)||Number.isNaN(r))return;const o=Math.floor((n+r-32)/(i+r));if(o<2)return;const a=o*i;return Math.round((n-32-a)/(o-1))},o=r(e);void 0!==o&&o!==this._dailyGap?this._dailyGap=o:void 0===o&&void 0!==this._dailyGap&&(this._dailyGap=void 0);const a=r(i);void 0!==a&&a!==this._hourlyGap?this._hourlyGap=a:void 0===a&&void 0!==this._hourlyGap&&(this._hourlyGap=void 0),this._oldContainerWidth=n}_teardownDragScroll(t){this._momentumCleanup[t]&&(this._momentumCleanup[t](),delete this._momentumCleanup[t],delete this._momentumElement[t])}_initDragScroll(t,e){this._momentumElement[t]!==e&&(this._teardownDragScroll(t),this._momentumElement[t]=e,this._momentumCleanup[t]=De(e,{snapSelector:".forecast-item"}))}_handleDailySelected(t){var e,i,n;const r=t.detail;if(!r||!(null===(i=null===(e=this._forecastHourlyEvent)||void 0===e?void 0:e.forecast)||void 0===i?void 0:i.length))return;const o=r.datetime;if(!o)return;const a=new Date(o),s=a.getDate(),l=a.getMonth(),c=a.getFullYear(),d=this._forecastHourlyEvent.forecast.findIndex(t=>{const e=new Date(t.datetime);return e.getDate()===s&&e.getMonth()===l&&e.getFullYear()===c}),h=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector(".forecast.hourly");if(!h)return;let u=0;if(d>0){const t=Array.from(h.querySelectorAll(".forecast-item"))[d];if(t){const e=h.getBoundingClientRect();u=t.getBoundingClientRect().left-e.left+h.scrollLeft-16}}this._isProgrammaticScroll=!0,h.scrollTo({left:Math.max(0,u),behavior:"smooth"}),window.setTimeout(()=>{this._isProgrammaticScroll=!1},1e3)}_handleHourlySelected(t){var e;this._selectedHourlyForecast=null!==(e=t.detail)&&void 0!==e?e:void 0}_handleDailyShowAttributes(t){var e;this._selectedDailyForecast=null!==(e=t.detail)&&void 0!==e?e:void 0}_handleCompactHeaderTemperatureClick(){const t=this._config.header_tap_action_temperature,e=this._config.header_temperature_entity||this._entity;this._handleHeaderTap(t,e)}_handleHeaderTap(t,e){this._executeTapAction(t,e)}_handleHeaderKeydown(t,e,i){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._handleHeaderTap(e,i))}_handleConditionTap(){this._showAttributes=!this._showAttributes}_handleConditionKeydown(t){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._handleConditionTap())}_handleHeaderChipTap(t,e){this._executeTapAction(t,e)}_handleHeaderChipKeydown(t,e,i){"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),this._handleHeaderChipTap(e,i))}_executeTapAction(t,e){var i;if(!(this._hass&&this._config&&t&&l(t)))return;const n=t.action,r=t.perform_action;if("perform-action"===n&&r){const[e,n]=r.split(".",2);if(e&&n){const r=null!==(i=t.data)&&void 0!==i?i:t.service_data,o=t.target;return void this._hass.callService(e,n,r,o)}}s(this,this._hass,{entity:e||this._entity,tap_action:t})}}Pe.styles=Oe,t([St()],Pe.prototype,"_config",void 0),t([St()],Pe.prototype,"_entity",void 0),t([St()],Pe.prototype,"_name",void 0),t([St()],Pe.prototype,"_state",void 0),t([St()],Pe.prototype,"_status",void 0),t([St()],Pe.prototype,"_headerTemperatureState",void 0),t([St()],Pe.prototype,"_forecastDailyEvent",void 0),t([St()],Pe.prototype,"_forecastHourlyEvent",void 0),t([St()],Pe.prototype,"_dailyGap",void 0),t([St()],Pe.prototype,"_hourlyGap",void 0),t([St()],Pe.prototype,"_solarForecastByHour",void 0),t([St()],Pe.prototype,"_solarForecastByDay",void 0),t([St()],Pe.prototype,"_nowcastForecast",void 0),t([St()],Pe.prototype,"_nowcastHasRain",void 0),t([St()],Pe.prototype,"_showAttributes",void 0),t([St()],Pe.prototype,"_selectedHourlyForecast",void 0),t([St()],Pe.prototype,"_selectedDailyForecast",void 0),customElements.define("detailed-weather-forecast-card",Pe),window.customCards=window.customCards||[],window.customCards.push({type:"detailed-weather-forecast-card",name:"Detailed Weather Forecast",description:"Weather forecast similar to the default HA card, but with some additional information"});const Ue=["clear-night","cloudy","fog","hail","lightning","lightning-rainy","partlycloudy","partlycloudy-night","pouring","rainy","snowy","snowy-rainy","sunny","windy","windy-variant","exceptional"];let We=class extends gt{constructor(){super(...arguments),this._type="attribute",this._computeLabel=t=>this.hass&&(this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)||Bt(`editor.card.${t.name}`))||t.name}updated(t){var e,i;super.updated(t),t.has("config")&&(this._type=null!==(i=null===(e=this.config)||void 0===e?void 0:e.type)&&void 0!==i?i:"attribute")}render(){if(!this.hass||!this.config)return it;const t=this._buildAttributeOptions(),e=((t,e)=>{const i=[{name:"type",selector:{select:{options:[{value:"attribute",label:Bt("editor.selector.weather_attribute")},{value:"entity",label:Bt("editor.selector.entity")}]}}}];return"entity"===t?i.push({name:"entity",selector:{entity:{}}}):i.push({name:"attribute",selector:{select:{options:e,custom_value:!0}}}),i.push({name:"name",selector:{text:{}}}),i.push({name:"icon",selector:{icon:{}}}),i.push({name:"tap_action",selector:{ui_action:{}},optional:!0}),"attribute"===t&&(i.push({name:"unit",selector:{text:{}}}),i.push({name:"divisor",selector:{number:{}}})),i})(this._type,t),i=Object.assign({},this.config);return Q`
      <ha-form
        .hass=${this.hass}
        .data=${i}
        .schema=${e}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){t.stopPropagation();const e=t.detail.value;var i,n;this._type=e.type,i="header-info-config-changed",n=e,this.dispatchEvent(new CustomEvent(i,{detail:n,bubbles:!0,composed:!0}))}_buildAttributeOptions(){var t;if(!this.hass||!this.weatherEntity)return[{value:"",label:"None"}];const e=this.hass.states[this.weatherEntity];if(!e)return[{value:"",label:"None"}];const i=e,n=Object.keys(null!==(t=e.attributes)&&void 0!==t?t:{}).sort((t,e)=>t.localeCompare(e));return[{value:"",label:"None"},...n.map(t=>({value:t,label:ue(this.hass,i,t)}))]}};t([$t({attribute:!1})],We.prototype,"hass",void 0),t([$t({attribute:!1})],We.prototype,"weatherEntity",void 0),t([$t({attribute:!1})],We.prototype,"config",void 0),t([St()],We.prototype,"_type",void 0),We=t([bt("header-entity-editor")],We);let Be=class extends gt{constructor(){super(...arguments),this._computeLabel=t=>this.hass&&(this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`)||Bt(`editor.card.${t.name}`))||t.name}render(){if(!this.hass||!this.config)return it;const t=(t=>[{name:"attribute",selector:{select:{options:t,custom_value:!0}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{name:"unit",selector:{text:{}}},{name:"divisor",selector:{number:{}}}])(this._buildAttributeOptions()),e=Object.assign({},this.config);return Q`
      <ha-form
        .hass=${this.hass}
        .data=${e}
        .schema=${t}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){var e,i,n;t.stopPropagation(),e=this,i="forecast-info-config-changed",n=t.detail.value,e.dispatchEvent(new CustomEvent(i,{detail:n,bubbles:!0,composed:!0}))}_buildAttributeOptions(){return this.extraAttributeOptions&&this.extraAttributeOptions.length>0?this.extraAttributeOptions:[{value:"",label:"None"}]}};t([$t({attribute:!1})],Be.prototype,"hass",void 0),t([$t({attribute:!1})],Be.prototype,"config",void 0),t([$t({attribute:!1})],Be.prototype,"extraAttributeOptions",void 0),Be=t([bt("forecast-attribute-editor")],Be);const Ve="solar_forecast",Ke=new Map,qe={"clear-night":Bt("editor.weather_condition.clear-night","",""),cloudy:Bt("editor.weather_condition.cloudy","",""),fog:Bt("editor.weather_condition.fog","",""),hail:Bt("editor.weather_condition.hail","",""),lightning:Bt("editor.weather_condition.lightning","",""),"lightning-rainy":Bt("editor.weather_condition.lightning-rainy","",""),partlycloudy:Bt("editor.weather_condition.partlycloudy","",""),"partlycloudy-night":Bt("editor.weather_condition.partlycloudy-night","",""),pouring:Bt("editor.weather_condition.pouring","",""),rainy:Bt("editor.weather_condition.rainy","",""),snowy:Bt("editor.weather_condition.snowy","",""),"snowy-rainy":Bt("editor.weather_condition.snowy-rainy","",""),sunny:Bt("editor.weather_condition.sunny","",""),windy:Bt("editor.weather_condition.windy","",""),"windy-variant":Bt("editor.weather_condition.windy-variant","",""),exceptional:Bt("editor.weather_condition.exceptional","","")},Ge=1,Ye=2,Ze=4;let Xe=class extends gt{constructor(){super(...arguments),this._hourlyExtraOptions=[],this._dailyExtraOptions=[],this._forecastOptionsLoading={hourly:!1,daily:!1,twice_daily:!1},this._solarForecastOptions=[],this._solarForecastEntryIds=[],this._expandedSections={},this._forecastOptionSubscriptions={},this._solarForecastOptionsLoaded=!1,this._computeLabel=t=>{if(!this.hass)return t.name;const e=this.hass.localize(`ui.panel.lovelace.editor.card.generic.${t.name}`);if(e)return e;const i=`editor.main.${t.name}`,n=Bt(i);return n!==i?n:t.name}}setConfig(t){var e,i,n,r,o,a,s,l,c;const d=this._normalizeHeaderChips(t);this._config=Object.assign(Object.assign({type:"custom:detailed-weather-forecast-card"},t),{header_info:null!==(e=t.header_info)&&void 0!==e?e:[],daily_info:null!==(i=t.daily_info)&&void 0!==i?i:[],hourly_info:null!==(n=t.hourly_info)&&void 0!==n?n:[],nowcast_entity:t.nowcast_entity,nowcast_always_show:null!==(r=t.nowcast_always_show)&&void 0!==r&&r,show_header:null===(o=t.show_header)||void 0===o||o,hourly_forecast:null===(a=t.hourly_forecast)||void 0===a||a,daily_forecast:null===(s=t.daily_forecast)||void 0===s||s,orientation:null!==(l=t.orientation)&&void 0!==l?l:"vertical",compact_header:null!==(c=t.compact_header)&&void 0!==c&&c,header_chips:d,header_attributes:d.filter(t=>"attribute"===t.type).map(t=>t.attribute)}),this._refreshForecastOptions(),this._refreshSolarForecastOptions(!0)}render(){var t,e,i,n,r,o,a,s,l,c,d,h,u,p,f;if(!this.hass||!this._config)return Q``;this._refreshForecastOptions(),this._ensureSolarForecastOptions();const{general:_,header:m,nowcast:y,hourly:g,daily:v}=this._buildSchemas(),b=this._config;return Q`
      <ha-form
        .hass=${this.hass}
        .data=${b}
        .schema=${_}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="editor-section">
        ${this._renderExpander("gps-coordinates",Bt("editor.section.gps_coordinates","",""),Q`
            <p class="location-description">${Bt("editor.section.gps_coordinates_description","","")}</p>
            <div class="forecast-switch">
              <span>${Bt("editor.section.use_home_assistant_location","","")}</span>
              <ha-switch
                name="sun_use_home_coordinates"
                .checked=${null===(t=this._config.sun_use_home_coordinates)||void 0===t||t}
                @change=${this._handleSunToggleChange}
              ></ha-switch>
            </div>
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${Bt("editor.section.latitude","","")}</span>
                <input
                  type="text"
                  name="sun_latitude"
                  placeholder="e.g. 48.137"
                  .value=${String(null!==(e=this._config.sun_latitude)&&void 0!==e?e:"")}
                  ?disabled=${null===(i=this._config.sun_use_home_coordinates)||void 0===i||i}
                  @input=${this._handleSunInputChange}
                />
              </label>
              <label class="coordinate-field">
                <span>${Bt("editor.section.longitude","","")}</span>
                <input
                  type="text"
                  name="sun_longitude"
                  placeholder="e.g. 11.575"
                  .value=${String(null!==(n=this._config.sun_longitude)&&void 0!==n?n:"")}
                  ?disabled=${null===(r=this._config.sun_use_home_coordinates)||void 0===r||r}
                  @input=${this._handleSunInputChange}
                />
              </label>
            </div>
          `)}
      </div>
      <div class="editor-section">
        ${this._renderExpander("solar-forecast",Bt("editor.section.solar_forecast","",""),Q`
            <p class="location-description">${Bt("editor.section.solar_forecast_description","","")}</p>
            <ha-selector
              .hass=${this.hass}
              .selector=${{select:{options:this._solarForecastOptions,multiple:!0}}}
              .value=${this._getSolarForecastSelection()}
              .label=${Bt("editor.section.energy_solar_forecasts","","")}
              .required=${!1}
              .disabled=${!this._solarForecastEntryIds.length}
              @value-changed=${this._handleSolarForecastSelectionChange}
            ></ha-selector>
            ${this._solarForecastOptionsLoaded&&!this._solarForecastEntryIds.length?Q`<p class="location-description">
                  ${Bt("editor.section.no_energy_solar_forecasts_configured","","")}
                </p>`:it}
          `)}
      </div>
      <div class="editor-section">
        ${this._renderExpander("custom-icons",Bt("editor.section.custom_icons","",""),Q`
            <p class="location-description">${Bt("editor.section.custom_icons_description","","")}</p>
            <div class="icon-map-list">
              ${Ue.map(t=>{const e=this._getIconMapValue(t);return Q`
                  <div class="icon-map-row">
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{icon:{}}}
                      .value=${e}
                      .label=${qe[t]}
                      .required=${!1}
                      @value-changed=${e=>this._handleIconMapChange(t,e)}
                    ></ha-selector>
                  </div>
                `})}
            </div>
          `)}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander("header",Bt("editor.section.header","",""),"show_header",Q`
            <ha-form
              .hass=${this.hass}
              .data=${b}
              .schema=${m}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._renderExpander("header-chips",Bt("editor.section.chips","",""),Q`
                <p class="chips-hint">${Bt("editor.section.chips_description","","")}</p>
                ${[0,1,2].map(t=>{var e,i,n;return Q`
                    <div class="chip-editor">
                      <header-entity-editor
                        .hass=${this.hass}
                        .weatherEntity=${null===(e=this._config)||void 0===e?void 0:e.entity}
                        .config=${(null===(n=null===(i=this._config)||void 0===i?void 0:i.header_chips)||void 0===n?void 0:n[t])||{type:"attribute",attribute:"",name:""}}
                        @header-info-config-changed=${e=>this._headerChipChanged(e,t)}
                      ></header-entity-editor>
                    </div>
                  `})}
              `,{nested:!0})}
            ${this._renderExpander("header-nowcast",Bt("editor.section.nowcast","",""),Q`
                <p class="location-description">${Bt("editor.section.nowcast_description","","")}</p>
                <ha-form
                  .hass=${this.hass}
                  .data=${b}
                  .schema=${y}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
              `,{nested:!0})}
            ${this._renderExpander("header-info",Bt("editor.section.header_info","",""),Q`
                <p class="chips-hint">${Bt("editor.section.header_info_description","","")}</p>
                ${null===(o=this._config.header_info)||void 0===o?void 0:o.map((t,e)=>{var i;return Q`
                    <div class="header-info-item">
                      <header-entity-editor
                        .hass=${this.hass}
                        .weatherEntity=${null===(i=this._config)||void 0===i?void 0:i.entity}
                        .config=${t}
                        @header-info-config-changed=${t=>this._headerInfoChanged(t,e)}
                      ></header-entity-editor>
                      <ha-icon-button @click=${()=>this._deleteHeaderInfo(e)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `})}
                <ha-button @click=${this._addHeaderInfo}>
                  ${Bt("editor.section.add_attribute","","")}
                </ha-button>
              `,{nested:!0})}
          `)}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander("daily-forecast",Bt("editor.section.daily_forecast","",""),"daily_forecast",Q`
            <ha-form
              .hass=${this.hass}
              .data=${b}
              .schema=${v}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._forecastOptionsLoading.daily&&!this._dailyExtraOptions.length?Q`<p class="location-description">${Bt("editor.main.loading_forecast_attributes")}</p>`:it}
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${Bt("editor.section.extra_attribute_color","","")}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="daily_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.daily_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="daily_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(null!==(a=this._config.daily_extra_attribute_color)&&void 0!==a?a:"")}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${()=>this._clearOptionalField("daily_extra_attribute_color")}
                  >
                    ${Bt("editor.section.clear","","")}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${Bt("editor.section.dim_values_smaller_than","","")}</span>
                <input
                  type="number"
                  name="daily_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${Bt("editor.section.no_threshold","","")}
                  .value=${String(null!==(s=this._config.daily_extra_attribute_dim_below)&&void 0!==s?s:"")}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${Bt("editor.section.forecast_spacing","","")}</h5>
              <p class="location-description">${Bt("editor.section.forecast_spacing_description","","")}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${Bt("editor.section.daily_min_gap","","")}</span>
                  <input
                    type="number"
                    name="daily_min_gap"
                    min="10"
                    step="1"
                    placeholder=${Bt("editor.section.default_30","","")}
                    .value=${String(null!==(l=this._config.daily_min_gap)&&void 0!==l?l:"")}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander("daily-info",Bt("editor.section.daily_forecast_info","",""),Q`
                <p class="chips-hint">${Bt("editor.section.daily_forecast_info_description","","")}</p>
                ${null===(c=this._config.daily_info)||void 0===c?void 0:c.map((t,e)=>Q`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${t}
                        .extraAttributeOptions=${this._buildDailyExtraAttributeOptions(!0)}
                        @forecast-info-config-changed=${t=>this._dailyInfoChanged(t,e)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${()=>this._deleteDailyInfo(e)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `)}
                <ha-button @click=${this._addDailyInfo}>
                  ${Bt("editor.section.add_attribute","","")}
                </ha-button>
              `,{nested:!0})}
          `)}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander("hourly-forecast",Bt("editor.section.hourly_forecast","",""),"hourly_forecast",Q`
            <ha-form
              .hass=${this.hass}
              .data=${b}
              .schema=${g}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._forecastOptionsLoading.hourly&&!this._hourlyExtraOptions.length?Q`<p class="location-description">${Bt("editor.main.loading_forecast_attributes")}</p>`:it}
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${Bt("editor.section.extra_attribute_color","","")}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="hourly_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.hourly_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="hourly_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(null!==(d=this._config.hourly_extra_attribute_color)&&void 0!==d?d:"")}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${()=>this._clearOptionalField("hourly_extra_attribute_color")}
                  >
                    ${Bt("editor.section.clear","","")}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${Bt("editor.section.dim_values_smaller_than","","")}</span>
                <input
                  type="number"
                  name="hourly_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${Bt("editor.section.no_threshold","","")}
                  .value=${String(null!==(h=this._config.hourly_extra_attribute_dim_below)&&void 0!==h?h:"")}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${Bt("editor.section.sunrise_sunset","","")}</h5>
              <div class="forecast-switch">
                <span>${Bt("editor.section.show_sunrise_sunset","","")}</span>
                <ha-switch
                  name="show_sun_times"
                  .checked=${null!==(u=this._config.show_sun_times)&&void 0!==u&&u}
                  @change=${this._handleSunToggleChange}
                ></ha-switch>
              </div>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${Bt("editor.section.forecast_spacing","","")}</h5>
              <p class="location-description">${Bt("editor.section.forecast_spacing_description","","")}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${Bt("editor.section.hourly_min_gap","","")}</span>
                  <input
                    type="number"
                    name="hourly_min_gap"
                    min="10"
                    step="1"
                    placeholder=${Bt("editor.section.default_16","","")}
                    .value=${String(null!==(p=this._config.hourly_min_gap)&&void 0!==p?p:"")}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander("hourly-info",Bt("editor.section.hourly_forecast_info","",""),Q`
                <p class="chips-hint">${Bt("editor.section.hourly_forecast_info_description","","")}</p>
                ${null===(f=this._config.hourly_info)||void 0===f?void 0:f.map((t,e)=>Q`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${t}
                        .extraAttributeOptions=${this._buildHourlyExtraAttributeOptions(!0)}
                        @forecast-info-config-changed=${t=>this._hourlyInfoChanged(t,e)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${()=>this._deleteHourlyInfo(e)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `)}
                <ha-button @click=${this._addHourlyInfo}>
                  ${Bt("editor.section.add_attribute","","")}
                </ha-button>
              `,{nested:!0})}
          `)}
      </div>
    `}_headerChipChanged(t,e){var i;if(!this._config)return;const n=[...null!==(i=this._config.header_chips)&&void 0!==i?i:[]];for(;n.length<=e;)n.push({type:"attribute",attribute:"",name:""});const r=Object.assign({},t.detail);"entity"===r.type?(delete r.attribute,delete r.unit,delete r.divisor):delete r.entity,n[e]=r,this._updateConfig({header_chips:n})}_handleValueChanged(t){t.stopPropagation(),this._updateConfig(t.detail.value)}_handleSunToggleChange(t){var e;const i=t.currentTarget;if(!i)return;const n=null!==(e=i.getAttribute("name"))&&void 0!==e?e:i.name;if(!n)return;const r=n,o="boolean"==typeof i.checked&&i.checked;this._updateConfig({[r]:o})}_handleSunInputChange(t){const e=t.currentTarget;if(!e)return;const i=e.name,n=e.value.trim(),r={};r[i]=""===n?void 0:n,this._updateConfig(r)}_handleExpanderToggle(t,e){const i=t.currentTarget;i&&(this._expandedSections=Object.assign(Object.assign({},this._expandedSections),{[e]:i.open}))}_handleExpanderSummaryClick(t,e){e&&t.preventDefault()}_isToggleDisabled(t,e){return["show_header","daily_forecast","hourly_forecast"].reduce((t,i)=>this._isSectionEnabled(i,e)?t+1:t,0)<=1&&this._isSectionEnabled(t,e)}_handleOptionalNumberInputChange(t){const e=t.currentTarget;if(!e)return;const i=e.name,n=e.value.trim(),r={};if(""===n)r[i]=void 0;else{const t=Number(n);r[i]=Number.isFinite(t)?t:void 0}this._updateConfig(r)}_handleColorPickerChange(t){const e=t.currentTarget;if(!e)return;const i=e.name,n=e.value.trim(),r={};r[i]=""===n?void 0:n,this._updateConfig(r)}_clearOptionalField(t){this._updateConfig({[t]:void 0})}_headerInfoChanged(t,e){var i;if(!(null===(i=this._config)||void 0===i?void 0:i.header_info))return;const n=[...this._config.header_info],r=n[e];n[e]=Object.assign(Object.assign({},r),t.detail),this._updateConfig({header_info:n})}_deleteHeaderInfo(t){var e;if(!(null===(e=this._config)||void 0===e?void 0:e.header_info))return;const i=[...this._config.header_info];i.splice(t,1),this._updateConfig({header_info:i})}_addHeaderInfo(){var t;const e=(null===(t=this._config)||void 0===t?void 0:t.header_info)?[...this._config.header_info]:[];e.push({type:"attribute",attribute:"",name:""}),this._updateConfig({header_info:e})}_dailyInfoChanged(t,e){var i;if(!(null===(i=this._config)||void 0===i?void 0:i.daily_info))return;const n=[...this._config.daily_info],r=n[e];n[e]=Object.assign(Object.assign({},r),t.detail),this._updateConfig({daily_info:n})}_deleteDailyInfo(t){var e;if(!(null===(e=this._config)||void 0===e?void 0:e.daily_info))return;const i=[...this._config.daily_info];i.splice(t,1),this._updateConfig({daily_info:i})}_addDailyInfo(){var t;const e=(null===(t=this._config)||void 0===t?void 0:t.daily_info)?[...this._config.daily_info]:[];e.push({attribute:"",name:""}),this._updateConfig({daily_info:e})}_hourlyInfoChanged(t,e){var i;if(!(null===(i=this._config)||void 0===i?void 0:i.hourly_info))return;const n=[...this._config.hourly_info],r=n[e];n[e]=Object.assign(Object.assign({},r),t.detail),this._updateConfig({hourly_info:n})}_deleteHourlyInfo(t){var e;if(!(null===(e=this._config)||void 0===e?void 0:e.hourly_info))return;const i=[...this._config.hourly_info];i.splice(t,1),this._updateConfig({hourly_info:i})}_addHourlyInfo(){var t;const e=(null===(t=this._config)||void 0===t?void 0:t.hourly_info)?[...this._config.hourly_info]:[];e.push({attribute:"",name:""}),this._updateConfig({hourly_info:e})}_getIconMapValue(t){var e;const i=null===(e=this._config)||void 0===e?void 0:e.icon_map;if(!i)return"";const n=i[t];return"string"==typeof n?n:""}_handleIconMapChange(t,e){var i,n;if(e.stopPropagation(),!this._config)return;const r=null===(i=e.detail)||void 0===i?void 0:i.value,o="string"==typeof r?r.trim():"",a=Object.assign({},null!==(n=this._config.icon_map)&&void 0!==n?n:{});o?a[t]=o:delete a[t],this._updateConfig({icon_map:Object.keys(a).length?a:void 0})}_getColorPickerValue(t){if(!t)return"#000000";const e=t.trim();if(!/^#([0-9a-fA-F]{3}){1,2}$/.test(e))return"#000000";if(4===e.length){const[t,i,n]=e.slice(1).split("");return`#${t}${t}${i}${i}${n}${n}`}return e}_handleSolarForecastSelectionChange(t){var e;t.stopPropagation();const i=null===(e=t.detail)||void 0===e?void 0:e.value,n=Array.isArray(i)?i.filter(t=>"string"==typeof t):[],r=this._solarForecastEntryIds,o=n.filter(t=>r.includes(t)),a={};o.length?o.length===r.length?a.solar_forecast_entries=void 0:a.solar_forecast_entries=o:a.solar_forecast_entries=[],this._updateConfig(a)}_getSolarForecastSelection(){var t;return(null===(t=this._config)||void 0===t?void 0:t.solar_forecast_entries)?this._config.solar_forecast_entries:this._solarForecastEntryIds}_renderExpander(t,e,i,n={}){var r,o;const a=n.nested?"editor-expander nested":"editor-expander",s=null!==(o=null!==(r=this._expandedSections[t])&&void 0!==r?r:n.open)&&void 0!==o&&o;return Q`
      <details class=${a} ?open=${s} @toggle=${e=>this._handleExpanderToggle(e,t)}>
        <summary>
          <span>${e}</span>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="expander-content">${i}</div>
      </details>
    `}_renderToggleExpander(t,e,i,n,r={}){var o,a;const s=this._config;if(!s)return it;const l=this._isSectionEnabled(i,s),c=this._isToggleDisabled(i,s),d=l&&null!==(a=null!==(o=this._expandedSections[t])&&void 0!==o?o:r.open)&&void 0!==a&&a;return Q`
      <details class=${"editor-expander"+(l?"":" disabled")} ?open=${d} @toggle=${e=>this._handleExpanderToggle(e,t)}>
        <summary @click=${t=>this._handleExpanderSummaryClick(t,!l)}>
          <span>${e}</span>
          <span class="summary-actions">
            <ha-switch
              class="expander-toggle"
              name=${i}
              .checked=${l}
              ?disabled=${c}
              @click=${t=>t.stopPropagation()}
              @change=${this._handleSunToggleChange}
            ></ha-switch>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </span>
        </summary>
        <div class="expander-content">${n}</div>
      </details>
    `}_ensureSolarForecastOptions(){this._refreshSolarForecastOptions(!1)}_refreshSolarForecastOptions(t){this.hass&&!this._solarForecastOptionsPromise&&(!t&&this._solarForecastOptionsLoaded||(this._solarForecastOptionsPromise=this._fetchSolarForecastOptions().finally(()=>{this._solarForecastOptionsPromise=void 0})))}async _fetchSolarForecastOptions(){try{const t=await this.hass.callWS({type:"energy/get_prefs"}),e=this._extractSolarForecastEntries(t),i=await this.hass.callWS({type:"config_entries/get"}),n=new Map(i.map(t=>[t.entry_id,t])),r=e.map(t=>{var e,i;const r=n.get(t),o=null===(e=null==r?void 0:r.title)||void 0===e?void 0:e.trim(),a=null===(i=null==r?void 0:r.domain)||void 0===i?void 0:i.trim(),s=[];o&&s.push(o),a&&s.push(a);return{value:t,label:s.length?s.join(" - "):t}});this._solarForecastOptions=r,this._solarForecastEntryIds=e}catch(t){this._solarForecastOptions=[],this._solarForecastEntryIds=[]}this._solarForecastOptionsLoaded=!0}_extractSolarForecastEntries(t){var e;const i=null!==(e=null==t?void 0:t.energy_sources)&&void 0!==e?e:[],n=new Set;return i.forEach(t=>{if("solar"!==(null==t?void 0:t.type))return;const e=t.config_entry_solar_forecast;Array.isArray(e)&&e.forEach(t=>{"string"==typeof t&&t.trim().length&&n.add(t)})}),Array.from(n)}_buildAttributeOptions(){var t,e;if(!this.hass)return[{value:"",label:Bt("editor.common.none","","")}];const i=null===(t=this._config)||void 0===t?void 0:t.entity;if(!i)return[{value:"",label:Bt("editor.common.none","","")}];const n=this.hass.states[i];if(!n)return[{value:"",label:Bt("editor.common.none","","")}];const r=Object.keys(null!==(e=n.attributes)&&void 0!==e?e:{}).sort((t,e)=>t.localeCompare(e)),o=n;return[{value:"",label:Bt("editor.common.none","","")},...r.map(t=>({value:t,label:ue(this.hass,o,t)}))]}_buildHourlyExtraAttributeOptions(t=!1){var e;const i=new Set(["datetime","condition","precipitation","temperature","templow"]),n=this._hourlyExtraOptions.length?this._hourlyExtraOptions.filter(e=>t||!i.has(e)):[],r=this._solarForecastEntryIds.length?[{value:Ve,label:Bt("editor.common.solar_forecast","","")}]:[],o=(null===(e=this._config)||void 0===e?void 0:e.entity)?this.hass.states[this._config.entity]:void 0,a=n.map(t=>({value:t,label:o?ue(this.hass,o,t):t}));return[{value:"",label:Bt("editor.common.none","","")},...r,...a]}_buildDailyExtraAttributeOptions(t=!1){var e;const i=new Set(["datetime","condition","precipitation","temperature","templow"]),n=this._dailyExtraOptions.length?this._dailyExtraOptions.filter(e=>t||!i.has(e)):[],r=this._solarForecastEntryIds.length?[{value:Ve,label:Bt("editor.common.solar_forecast","","")}]:[],o=(null===(e=this._config)||void 0===e?void 0:e.entity)?this.hass.states[this._config.entity]:void 0,a=n.map(t=>({value:t,label:o?ue(this.hass,o,t):t}));return[{value:"",label:Bt("editor.common.none","","")},...r,...a]}_buildSchemas(){var t,e,i;const n=[{name:"header_temperature_entity",selector:{entity:{domain:"sensor",device_class:"temperature"}},optional:!0},{name:"header_tap_action_temperature",selector:{ui_action:{}},optional:!0},{name:"compact_header",selector:{boolean:{}}}];(null===(t=this._config)||void 0===t?void 0:t.compact_header)||n.push({name:"use_night_header_backgrounds",selector:{boolean:{}}});return{general:[{name:"entity",selector:{entity:{domain:"weather"}}}],header:n,nowcast:[{name:"nowcast_entity",selector:{entity:{domain:"weather"}},optional:!0},{name:"nowcast_always_show",selector:{boolean:{}},optional:!0,disabled:!(null===(e=this._config)||void 0===e?void 0:e.nowcast_entity)}],hourly:[{name:"hourly_extra_attribute",selector:{select:{options:this._buildHourlyExtraAttributeOptions(),custom_value:!0}},optional:!0},{name:"hourly_extra_attribute_unit",selector:{text:{}},optional:!0},{name:"hourly_extra_attribute_divisor",selector:{text:{}},optional:!0}],daily:[{name:"daily_extra_attribute",selector:{select:{options:this._buildDailyExtraAttributeOptions(),custom_value:!0}},optional:!0},{name:"daily_extra_attribute_unit",selector:{text:{}},optional:!0,disabled:"precipitation_probability"===(null===(i=this._config)||void 0===i?void 0:i.daily_extra_attribute)},{name:"daily_extra_attribute_divisor",selector:{number:{}},optional:!0}]}}_isSectionEnabled(t,e){return!1!==e[t]}_normalizeHeaderChips(t){var e,i;const n=[];if(Array.isArray(t.header_chips))for(const r of t.header_chips)if(!(n.length>=3)&&r&&"object"==typeof r){if("attribute"===r.type){const t="string"==typeof r.attribute?r.attribute.trim():"",i=r.tap_action,o="string"==typeof r.icon?r.icon.trim():void 0,a="string"==typeof r.unit?r.unit.trim():void 0,s=r.divisor;n.push({type:"attribute",attribute:t,name:null!==(e=r.name)&&void 0!==e?e:"",tap_action:i,icon:o,unit:a,divisor:s});continue}if("entity"===r.type){const t="string"==typeof r.entity?r.entity.trim():"",e=r.tap_action,o="string"==typeof r.icon?r.icon.trim():void 0;n.push({type:"entity",entity:t,name:null!==(i=r.name)&&void 0!==i?i:"",tap_action:e,icon:o})}}if(n.length)return n.slice(0,3);return(Array.isArray(t.header_attributes)?t.header_attributes.filter((t,e)=>e<3&&"string"==typeof t).map(t=>t.trim()).filter(t=>t.length>0):[]).map(t=>({type:"attribute",attribute:t,name:t}))}_updateConfig(t){if(!this._config)return;const e=Object.assign(Object.assign(Object.assign({},this._config),t),{type:"custom:detailed-weather-forecast-card"});"solar_forecast_entries"in t&&void 0===t.solar_forecast_entries&&delete e.solar_forecast_entries;const i=this._normalizeHeaderChips(e);var n,r;e.header_chips=i,e.header_attributes=i.filter(t=>"attribute"===t.type).map(t=>t.attribute).filter(t=>"string"==typeof t&&t.trim().length>0),this._config=e,n="config-changed",r={config:e},this.dispatchEvent(new CustomEvent(n,{detail:r,bubbles:!0,composed:!0}))}_refreshForecastOptions(){var t,e;try{if(!this.hass||!(null===(t=this._config)||void 0===t?void 0:t.entity))return this._teardownForecastOptionSubscriptions(),(this._hourlyExtraOptions.length||this._dailyExtraOptions.length)&&(this._hourlyExtraOptions=[],this._dailyExtraOptions=[]),this._forecastOptionsLoading={hourly:!1,daily:!1,twice_daily:!1},void(this._forecastOptionsEntity=void 0);const e=this._config.entity;if(this._forecastOptionsEntity!==e){this._teardownForecastOptionSubscriptions();const t=Ke.get(e);t?(this._hourlyExtraOptions=t.hourly,this._dailyExtraOptions=t.daily,this._forecastOptionsLoading={hourly:!1,daily:!1,twice_daily:!1}):this._forecastOptionsLoading={hourly:!1,daily:!1,twice_daily:!1},this._forecastOptionsEntity=e}const i=this.hass.states[e],n=this._getSupportedForecastTypes(i),r=new Set;n.includes("hourly")&&r.add("hourly"),(n.includes("daily")||n.includes("twice_daily"))&&r.add("daily"),r.size||r.add("daily"),["hourly","daily"].forEach(t=>{if(r.has(t))if(this._forecastOptionSubscriptions[t]){const e="hourly"===t?this._hourlyExtraOptions.length:this._dailyExtraOptions.length;this._forecastOptionsLoading=Object.assign(Object.assign({},this._forecastOptionsLoading),{[t]:!e})}else try{this._forecastOptionSubscriptions[t]=this._subscribeForecast(e,t,e=>this._handleForecastOptionsEvent(t,e));("hourly"===t?this._hourlyExtraOptions.length:this._dailyExtraOptions.length)||(this._forecastOptionsLoading=Object.assign(Object.assign({},this._forecastOptionsLoading),{[t]:!0}))}catch(t){}else this._teardownForecastOptionSubscriptions([t]),this._forecastOptionsLoading=Object.assign(Object.assign({},this._forecastOptionsLoading),{[t]:!1})})}catch(t){try{this.hass&&(null===(e=this._config)||void 0===e?void 0:e.entity)&&this._applyForecastOptionsFromAttributes(this.hass.states[this._config.entity])}catch(t){}}}_handleForecastOptionsEvent(t,e){const i=Array.isArray(null==e?void 0:e.forecast)?e.forecast:[];if(!i.length)return;const n=new Set;i.forEach(t=>{t&&"object"==typeof t&&Object.keys(t).forEach(t=>{n.add(t)})});const r=Array.from(n).sort((t,e)=>t.localeCompare(e));"hourly"===t?(r.join("|")!==this._hourlyExtraOptions.join("|")&&(this._hourlyExtraOptions=r),this._forecastOptionsLoading=Object.assign(Object.assign({},this._forecastOptionsLoading),{hourly:!1})):(r.join("|")!==this._dailyExtraOptions.join("|")&&(this._dailyExtraOptions=r),this._forecastOptionsLoading=Object.assign(Object.assign({},this._forecastOptionsLoading),{daily:!1})),this._cacheForecastOptions()}_applyForecastOptionsFromAttributes(t){var e;if(!(null===(e=null==t?void 0:t.attributes)||void 0===e?void 0:e.forecast))return;const i=Array.isArray(t.attributes.forecast)?t.attributes.forecast:[];if(!i.length)return;const n=new Set(["datetime","condition","precipitation","temperature","templow"]),r=new Set;i.forEach(t=>{t&&"object"==typeof t&&Object.keys(t).forEach(t=>{n.has(t)||r.add(t)})});const o=Array.from(r).sort((t,e)=>t.localeCompare(e));o.join("|")!==this._hourlyExtraOptions.join("|")&&(this._hourlyExtraOptions=o),o.join("|")!==this._dailyExtraOptions.join("|")&&(this._dailyExtraOptions=o),this._forecastOptionsLoading=Object.assign(Object.assign({},this._forecastOptionsLoading),{hourly:!1,daily:!1}),this._cacheForecastOptions()}_cacheForecastOptions(){this._forecastOptionsEntity&&(this._hourlyExtraOptions.length||this._dailyExtraOptions.length)&&Ke.set(this._forecastOptionsEntity,{hourly:[...this._hourlyExtraOptions],daily:[...this._dailyExtraOptions]})}_getSupportedForecastTypes(t){var e;if(!(null==t?void 0:t.attributes))return[];const i=[],n=null!==(e=t.attributes.supported_features)&&void 0!==e?e:0;return 0!==(n&Ge)&&i.push("daily"),0!==(n&Ze)&&i.push("twice_daily"),0!==(n&Ye)&&i.push("hourly"),i}_subscribeForecast(t,e,i){var n;if(null===(n=this.hass)||void 0===n?void 0:n.connection)return this.hass.connection.subscribeMessage(i,{type:"weather/subscribe_forecast",forecast_type:e,entity_id:t}).catch(()=>{});this._applyForecastOptionsFromAttributes(this.hass.states[t])}_teardownForecastOptionSubscriptions(t){(null!=t?t:["hourly","daily"]).forEach(t=>{const e=this._forecastOptionSubscriptions[t];null==e||e.then(t=>null==t?void 0:t()).catch(()=>{}),delete this._forecastOptionSubscriptions[t],this._forecastOptionsLoading=Object.assign(Object.assign({},this._forecastOptionsLoading),{[t]:!1})})}disconnectedCallback(){super.disconnectedCallback(),this._teardownForecastOptionSubscriptions()}};Xe.styles=_`
    .editor-section {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-section:first-of-type {
      margin-top: 16px;
    }

    .section-subtitle {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-subsection {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chips-hint {
      margin: 0;
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .location-description {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .sun-coordinates {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .color-input-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .color-input-row input[type='color'] {
      padding: 0;
      width: 40px;
      height: 32px;
      border: none;
      background: none;
    }

    .color-input-row input[type='text'] {
      flex: 1 1 120px;
      min-width: 120px;
    }

    .icon-map-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .icon-map-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-map-row ha-selector {
      flex: 1 1 auto;
    }

    .clear-button {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));

      cursor: pointer;
      font: inherit;
      color: var(--primary-text-color);
    }

    .clear-button:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .coordinate-field {
      display: flex;
      flex: 1 1 120px;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }

    .coordinate-field input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .coordinate-field input:disabled {
      opacity: 0.6;
    }

    .forecast-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .forecast-switch span {
      font-size: 14px;
    }

    .editor-expander {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color, #fff);
    }

    .editor-expander summary {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-expander summary::-webkit-details-marker {
      display: none;
    }

    .editor-expander > summary ha-icon {
      transition: transform 0.2s ease;
    }

    .editor-expander[open] > summary ha-icon {
      transform: rotate(180deg);
    }

    .editor-expander[open] summary {
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .editor-expander .summary-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .editor-expander.disabled summary {
      color: var(--secondary-text-color);
      cursor: default;
    }

    .editor-expander.disabled > summary ha-icon {
      opacity: 0.4;
    }

    .editor-expander .expander-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-expander.nested summary {
      padding: 10px 12px;
      font-size: 14px;
    }

    .editor-expander.nested .expander-content {
      padding: 12px;
    }

    .header-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .header-info-item > *:first-child {
      flex: 1;
    }

    .chip-editor {
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 12px;
    }

    .forecast-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .forecast-info-item > *:first-child {
      flex: 1;
    }

    .editor-expander.nested .expander-content > ha-button {
      align-self: flex-start;
    }
  `,t([$t({attribute:!1})],Xe.prototype,"hass",void 0),t([St()],Xe.prototype,"_config",void 0),t([St()],Xe.prototype,"_hourlyExtraOptions",void 0),t([St()],Xe.prototype,"_dailyExtraOptions",void 0),t([St()],Xe.prototype,"_forecastOptionsLoading",void 0),t([St()],Xe.prototype,"_solarForecastOptions",void 0),t([St()],Xe.prototype,"_solarForecastEntryIds",void 0),t([St()],Xe.prototype,"_expandedSections",void 0),Xe=t([bt("detailed-weather-forecast-editor")],Xe);var Je=Object.freeze({__proto__:null,get DetailedWeatherForecastEditor(){return Xe}});
