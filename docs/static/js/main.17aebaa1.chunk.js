(this.webpackJsonpdocs=this.webpackJsonpdocs||[]).push([[0],{11:function(e,n,t){e.exports={view:"demo_view__3WA2d",appWrapper:"demo_appWrapper__fgOro",app:"demo_app__21s33",darkMode:"demo_darkMode__75EcZ",content:"demo_content__1ou7d",appBar:"demo_appBar__1wE_C",bottomNavHeader:"demo_bottomNavHeader__HIv0o",bottomNav:"demo_bottomNav__OwTRM",callout:"demo_callout__3gmYC"}},13:function(e,n,t){"use strict";var a=t(5),r=function(){var e={};return{name:"inMemoryStore",get:function(n){return e[n]||null},set:function(n,t){e[n]=t},remove:function(n){return delete e[n]},all:function(){return e}}},o=function(){var e=function(e){return Object(a.e)(window.sessionStorage.getItem(Object(a.c)(e)))};return{name:"sessionStore",get:e,set:function(e,n){return window.sessionStorage.setItem(Object(a.c)(e),JSON.stringify(n))},remove:function(e){return window.sessionStorage.removeItem(Object(a.c)(e))},all:function(){return Object(a.d)(window.sessionStorage,e)}}};t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return o}))},16:function(e,n,t){e.exports={homeCard:"home_homeCard__2nPym",banner:"home_banner__1loZD"}},18:function(e,n,t){"use strict";t.d(n,"flagg",(function(){return v}));var a=t(2),r=t(24),o=t.n(r),i=t(15),l=t(13),c=t(28);t.o(c,"sessionStore")&&t.d(n,"sessionStore",(function(){return c.sessionStore}));var f=function(e){return Array.isArray(e)?e:e?[e]:[]},s=function(e){var n,t=f(e);return t.reduce((function(e,n){return e[n.name]=n,e}),(n={},Object(i.a)(n,"__default",t[0]),Object(i.a)(n,"__frozen",Object(l.a)()),n))},g=function(e){var n=e.flagDef;return void 0===n.default?null:n.default},u=function(e){var n=e.frozen,t=e.definitions,a=e.flagName,r=e.storeMap;if(a in n)return r.__frozen.get(a);var o=d({definitions:t,flagName:a}),i=g({flagDef:o}),l=function(e){var n=e.flagDef,t=e.flagName,a=e.storeMap;return p({flagDef:n,storeMap:a}).get(t)}({flagDef:o,flagName:a,storeMap:r});return void 0===l||null===l?i:l},m=function(e){var n=e.frozen,t=e.definitions,a=e.flagName,r=e.value,o=e.storeMap;if(a in n)console.warn("Feature Flag ".concat(a," is frozen"));else{var i=d({definitions:t,flagName:a}),l=p({flagDef:i,storeMap:o}),c=g({flagDef:i});JSON.stringify(r)===JSON.stringify(c)?"remove"in l?l.remove(a):console.warn("Flagg: Attempting to write to readOnly store ".concat(l.name)):"set"in l?l.set(a,r):console.warn("Flagg: Attempting to write to readOnly store ".concat(l.name))}},d=function(e){var n=e.definitions,t=e.flagName;return t in n?n[t]:{}},p=function(e){var n=e.flagDef,t=e.storeMap,a=n.store;return t[a]?t[a]:(void 0!==a&&console.warn('Flagg store "'.concat(a,'" not available. Did you forget to include it? Using default store instead.')),t.__default)},v=function(e){var n=e.store,t=e.definitions,r={definitions:void 0===t?{}:t,frozen:{},storeMap:s(n)},i=function(e){return u({frozen:r.frozen,definitions:r.definitions,flagName:String(e),storeMap:r.storeMap})},l=function(e){return g({flagDef:d({definitions:r.definitions,flagName:String(e)})})},c=function(e,n){"string"===typeof e?m({frozen:r.frozen,value:n,definitions:r.definitions,flagName:String(e),storeMap:r.storeMap}):Object.entries(e).forEach((function(e){var n=Object(a.a)(e,2),t=n[0],o=n[1];m({frozen:r.frozen,value:o,definitions:r.definitions,flagName:String(t),storeMap:r.storeMap})}))},p=function(e){return"boolean"===function(e){var n=e.flagDef;return n.options?"select":"string"===typeof n.default?"string":"boolean"}({flagDef:d({flagName:String(e),definitions:r.definitions})})?!!i(e)!==!!l(e):i(e)!==l(e)},v=function(e){r.storeMap.__frozen.set(String(e),i(e)),r.frozen[e]=!0},b=function(e){return c(e,l(e))};return{get:i,set:c,getDefault:l,isOverridden:p,setDefinitions:function(e){r.definitions=e},getDefinitions:function(){return r.definitions},getAllResolved:function(){return Object.keys(r.definitions).reduce((function(e,n){return e[n]=i(n),e}),{})},getAllOverridden:function(){return Object.keys(r.definitions).reduce((function(e,n){return p(n)&&(e[n]=i(n)),e}),{})},freeze:v,freezeAll:function(){Object.keys(r.definitions).forEach((function(e){return v(e)}))},reset:b,resetAll:function(){return Object.keys(r.definitions).forEach((function(e){return b(e)}))},isFrozen:function(e){return!!r.frozen[e]},hydrateFrom:function(e){var n=f(e);return Promise.all(n.map((function(e){var n;return o.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.awrap(e.all());case 2:n=t.sent,c(n);case 4:case"end":return t.stop()}}))})))}}}},25:function(e,n,t){"use strict";var a=t(18);t.o(a,"flagg")&&t.d(n,"flagg",(function(){return a.flagg})),t.o(a,"sessionStore")&&t.d(n,"sessionStore",(function(){return a.sessionStore}));var r=t(13);t.d(n,"sessionStore",(function(){return r.b}));t(8)},28:function(e,n){},30:function(e,n,t){e.exports={view:"app_view__2DuWx"}},37:function(e,n,t){e.exports=t(50)},44:function(e,n,t){},5:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"a",(function(){return o})),t.d(n,"c",(function(){return i})),t.d(n,"e",(function(){return l})),t.d(n,"d",(function(){return c}));var a=t(2),r="ff",o="_",i=function(e){return r+o+e},l=function(e){try{return JSON.parse(e)}catch(n){}return e},c=function(e,n){return Object.entries(e).reduce((function(e,t){var i=Object(a.a)(t,2),l=i[0];i[1];if(function(e){return e.startsWith(r+o)}(l)){var c=function(e){return e.slice(r.length+1)}(l);e[c]=n(c)}return e}),{})}},50:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(20),i=t.n(o),l=(t(44),t(30)),c=t.n(l),f=t(8),s=t(15),g=t(2),u=(t(46),t(11)),m=t.n(u),d=t(10),p=t.n(d),v=t(62),b=t(63),h=t(64),E=t(65),_=t(66),w=t(61),y=t(33),O=t(31),k=t(59),N=t(60),L=t(16),x=t.n(L),j=function(e){return Object(f.c)(e)};function C(){var e=Object(y.a)(Array(5)),n=j("home_enableV2OptIn"),t=Object(g.a)(n,1)[0],a=j("home_v2"),o=Object(g.a)(a,2)[1];return r.a.createElement("div",null,t&&r.a.createElement("div",{className:x.a.banner,onClick:function(){return o(!0)}},"\ud83c\udf88 Try the new home experience! ",r.a.createElement(O.a,null,"Try It")),e.map((function(e,n){return r.a.createElement(z,{key:n,index:n+1})})))}function z(e){var n=e.index;return r.a.createElement(k.a,{className:x.a.homeCard},r.a.createElement(k.h,null,r.a.createElement(k.g,{sixteenByNine:!0,style:{backgroundImage:"url(images/backgrounds/mb-bg-fb-2".concat(n,".png)")}}),r.a.createElement("div",{style:{padding:"0 1rem 1rem 1rem"}},r.a.createElement(N.a,{use:"headline6",tag:"h2"},"Our Changing Planet"),r.a.createElement(N.a,{use:"subtitle2",tag:"h3",theme:"textSecondaryOnBackground",style:{marginTop:"-1rem"}},"by Kurt Wagner"),r.a.createElement(N.a,{use:"body1",tag:"div",theme:"textSecondaryOnBackground"},"Visit ten places on our planet that are undergoing the biggest changes today."))),r.a.createElement(k.f,null,r.a.createElement(k.c,null,r.a.createElement(k.b,null,"Comment")),r.a.createElement(k.e,null,r.a.createElement(k.d,{onIcon:"favorite",icon:"favorite_border"}),r.a.createElement(k.d,{icon:"share"}),r.a.createElement(k.d,{icon:"more_vert"}))))}function F(){var e=Object(f.c)("home.v2"),n=Object(g.a)(e,2),t=(n[0],n[1]);return r.a.createElement("div",null,r.a.createElement("div",{className:x.a.banner,onClick:function(){return t(!1)}},"Use the old home instead... ",r.a.createElement(O.a,null,"Go Back")),"New Home")}function S(){var e=Object(a.useState)("home"),n=Object(g.a)(e,2),t=n[0],o=n[1],i=Object(a.useState)(!1),l=Object(g.a)(i,2),c=l[0],u=l[1],d=j("app_darkMode"),E=Object(g.a)(d,1)[0],_=j("app_title"),w=Object(g.a)(_,1)[0],y=j("app_brandColor"),O=Object(g.a)(y,1)[0],k=j("app_bottomNav"),N=Object(g.a)(k,1)[0],L=j("home_v2"),x=Object(g.a)(L,1)[0],z=j("developer_enableFlagg"),S=Object(g.a)(z,1)[0],D=null;switch(t){case"home":D=x?r.a.createElement(F,null):r.a.createElement(C,null);break;case"featureflags":D=S?r.a.createElement(f.a,null):null}return r.a.createElement("div",{className:m.a.view,style:{"--mdc-theme-primary":O}},r.a.createElement("div",{className:m.a.callout},r.a.createElement("h1",null,"Flagg Demo"),"This demo is to showcase how a real app might react to Feature Flags specified using Flagg. The admin interface (pictured left) is an optional React component that you can mount at a secret route of your app that provides visibility and control of your Feature Flags when developing."),r.a.createElement("div",{className:m.a.appWrapper},r.a.createElement("div",{className:p()(m.a.app,Object(s.a)({},m.a.darkMode,E))},N?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:m.a.bottomNavHeader},w),r.a.createElement("div",{className:m.a.bottomNav},r.a.createElement(v.a,null,r.a.createElement(b.a,{stacked:!0,icon:"chrome_reader_mode",label:"Feed"}),r.a.createElement(b.a,{stacked:!0,icon:"person",label:"Profile"}),r.a.createElement(b.a,{stacked:!0,icon:"more_horiz",label:"More",onClick:function(){return u(!0)}})))):r.a.createElement(h.a,{navigationIcon:{onClick:function(){return u(!0)}},title:w,className:m.a.appBar}),r.a.createElement(M,{open:c,setOpen:u,setRoute:function(e){o(e),u(!1)}}),r.a.createElement("div",{className:m.a.content},D))))}function M(e){var n=e.open,t=e.setOpen,a=e.setRoute,o=j("developer_enableFlagg"),i=Object(g.a)(o,1)[0],l=j("app_title"),c=Object(g.a)(l,1)[0];return r.a.createElement(E.a,{modal:!0,open:n,onClose:function(){return t(!1)}},r.a.createElement(E.c,null,r.a.createElement(E.d,null,c)),r.a.createElement(E.b,null,r.a.createElement(_.a,null,r.a.createElement(w.a,{onClick:function(){return a("home")}},"Feed"),r.a.createElement(w.a,{onClick:function(){return a("home")}},"Profile"),i&&r.a.createElement(w.a,{onClick:function(){return a("featureflags")}},"Feature Flags"),r.a.createElement(w.a,{onClick:function(){return a("home")}},"Logout"))))}var D=function(){return r.a.createElement("div",{className:c.a.view},r.a.createElement(f.a,null),r.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var V=t(25),A=Object(V.flagg)({store:Object(V.sessionStore)(),definitions:{app_title:{default:"InstaSnap"},app_darkMode:{default:!1},app_brandColor:{default:"#6200ee",options:["#6200ee","#009688","#e91e64"]},app_bottomNav:{default:!1},app_whitelabel:{options:["Corp 1","Corp 2","Another Company"],default:!1},developer_debug:{default:!1},developer_enableFlagg:{default:!0,description:"Very meta... A feature flag to enable Flagg."},developer_enableExperimentalFeatures:{},developer_apiUrl:{default:"http://www.example.com/graphql"},home_enableV2OptIn:{default:!0},home_v2:{default:!1}}});A.freeze("developer_enableFlagg"),i.a.render(r.a.createElement(f.b,{featureFlags:A},r.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,n,t){"use strict";var a=t(23),r=t(26),o=t(2),i=t(0),l=t.n(i),c=t(13),f=t(18),s=l.a.createContext({featureFlags:Object(f.flagg)({store:Object(c.a)()}),iteration:0}),g='\n\n.flagg {\n\ttext-align: left;\n\tposition: relative;\n\tbackground-color: white;\n\tcolor: black;\n\tpadding-bottom: 3rem;\n\toverflow-y: auto;\n\tmax-height: 100vh;\n\tbox-sizing: border-box;\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.flagg * {\n\toutline: none;\n}\n\n.flagg-flag-icon {\n\tcolor: #f44436;\n\tmargin-right: 0.5rem;\n}\n\n.flagg-header {\n\theight: 4rem;\n\tline-height: 4rem;\n\tposition: sticky;\n\ttop: 0;\n\tbackground: black;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\tpadding: 0 1.5rem;\n\tmargin-bottom: 1rem;\n\tz-index: 3;\n}\n\n.flagg-header .flagg-flag-icon {\n\tposition: relative;\n\ttop: 4px;\n\tmargin-right: 1rem;\n}\n\n.flagg-header__name {\n\tfont-size: 1.25rem;\n\tfont-weight: bold;\n\tcolor: white;\n\ttext-transform: uppercase;\n\tletter-spacing: 1.5px;\n\tdisplay: inline-block;\n\tmargin-right: 2rem;\n}\n\n.flagg-header__lead {\n\tdisplay: flex;\n\tflex: 1;\n\talign-items: center;\n}\n\n.flagg-header__end {\n\tdisplay: flex;\n\talign-items: center;\n}\n\n.flagg-category--search {\n\tposition: relative;\n}\n\n.flagg-category--search:focus-within .flagg-search-icon {\n\tcolor: #f44436;\n}\n\n.flagg-search {\n\theight: 4rem;\n\tpadding: 1rem;\n\t-webkit-appearance: none;\n\tfont-size: 1.25rem;\n\tbackground: whitesmoke;\n\tborder: 0;\n\tflex: 1;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\twidth: 100%;\n\theight: 100%;\n\ttext-indent: 4rem;\n\tborder-radius: 0.5rem;\n}\n\n.flagg-search-icon {\n\tposition: relative;\n\ttop: 4px;\n\ttransition: 0.3s;\n\tz-index: 1;\n}\n\n.flagg-categories {\n\tpadding: 0 0.5rem;\n\tflex: 1;\n}\n\n.flagg-category {\n\tpadding: 1rem 1rem 1rem 2.5rem;\n\t\n\tborder-radius: 0.75rem;\n\tmax-width: 50rem;\n\tmargin: 1rem auto;\n\tbackground: white;\n}\n\n.flagg-control {\n\tdisplay: flex;\n\talign-items: center;\n\tflex: 1;\n\tmargin-left: 0.5rem;\n\tjustify-content: flex-end;\n}\n\n.flagg-snowflake-icon {\n\tcolor: deepskyblue;\n}\n\n.flagg-flag .flagg-flag-icon, .flagg-flag .flagg-snowflake-icon {\n\ttransition: 0.2s;\n\topacity: 0;\n\ttransform: scale(0);\t\n\tposition: absolute;\n\tleft: 0.6rem;\n}\n\n.flagg-flag--override .flagg-flag-icon, .flagg-flag--frozen .flagg-snowflake-icon {\n\topacity: 1;\n\ttransform: scale(0.85);\n}\n\n.flagg-control--override .flagg-flag-icon:hover, .flagg-control--override .flagg-snowflake-icon:hover {\n\tcursor: pointer;\n\t\n}\n\n.flagg-zero {\n\ttext-align: center;\n\tfont-size: 2rem;\n\tpadding: 4rem;\n\topacity: 0.5;\n}\n\n.flagg-category__name {\n\ttext-transform: capitalize;\n\tfont-size: 1.75rem;\n\tfont-weight: bold;\n\tmargin-bottom: 1rem;\n}\n\n.flagg-button {\n\t-webkit-appearance: none;\n\tbackground: none;\n\tcolor: white;\n\tborder: 0;\n\ttext-transform: uppercase;\n\tfont-size: 1rem;\n\tfont-weight: 500;\n\tletter-spacing: 1px;\n\theight: 2.25rem;\n\tmargin: 0 0.5rem;\n\tcursor: pointer;\n\tborder-radius: 9999px;\n\tdisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n\n.flagg-button:hover, .flagg-button:focus {\n\tbackground-color: rgba(255,255,255, 0.2);\n}\n\n.flagg-flag {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: center;\n\tjustify-content: space-between;\n\tfont-size: 1.25rem;\n\tmargin: 0 -1rem 0 -2.5rem;\n\tpadding: 0.5rem 1rem 0.5rem 2.5rem;\n\tcursor: pointer;\n\tposition: relative;\n}\n\n.flagg-flag > div:first-child {\n\tmax-width: calc(100% - 7rem);\n}\n\n.flagg-flag:hover {\n\t\n}\n\n.flagg-flag__category-name {\n\topacity: 0.7;\n}\n\n.flagg-flag__name {\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n}\n\n.flagg-flag__flag-name {\n\tfont-weight: 500;\n\tfont-size: 1.125rem;\n}\n\n.flagg-flag__description {\n\tfont-size: 0.875rem;\n\topacity: 0.7;\n\tmargin-top: 0.25rem;\n}\n\n.flagg-select {\n\tfont-size: 1rem;\n\theight: 2rem;\n}\n\n.flagg-input {\n\tfont-size: 1rem;\n\ttext-align: center;\n\tline-height: 2rem;\n\theight: 2rem;\n\tpadding: 0 0.5rem;\n\tborder-radius: 0.375rem;\n\tborder: 1px solid rgba(0,0,0,.3);\n\tbox-sizing: border-box;\n\twidth: 100%;\n\tmargin-left: 1rem;\n\tmax-width: 30rem;\n\tbackground: #f8f8f8;\n}\n\n.flagg-toggle {\n\t-webkit-appearance: none;\n\t-moz-appearance: none;\n\tappearance: none;\n\twidth: 3.875rem;\n\theight: 1.75rem;\n\tdisplay: inline-block;\n\tposition: relative;\n\tborder-radius: 3.125rem;\n\toverflow: hidden;\n\toutline: none;\n\tborder: none;\n\tcursor: pointer;\n\tbackground-color: #A0A0A0;\n\ttransition: background-color ease 0.3s;\n\t\n}\n\n.flagg-toggle:before {\n\tcontent: "on off";\n\tdisplay: block;\n\tposition: absolute;\n\tz-index: 2;\n\twidth: 1.5rem;\n\theight: 1.5rem;\n\tbackground: #fff;\n\tleft: 2px;\n\ttop: 2px;\n\tborder-radius: 50%;\n\tfont: 0.625rem/1.5rem Helvetica;\n\ttext-transform: uppercase;\n\tfont-weight: bold;\n\ttext-indent: -1.375rem;\n\tword-spacing: 2.3125rem;\n\tcolor: #fff;\n\twhite-space: nowrap;\n\tbox-shadow: 0 1px 2px rgba(0,0,0,0.2);\n\ttransition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;\n}\n\n.flagg-toggle:checked {\n\tbackground-color: limegreen;\n}\n\n.flagg-toggle:checked:before {\n\tleft: 2.25rem;\n}\n\n.flagg-footer {\n\ttext-align: center;\n\tfont-size: 0.875rem;\n\tpadding-top: 1rem;\n}\n',u=t(5);function m(e){var n=e.onDone,t=Object(i.useState)(""),a=Object(o.a)(t,2),r=a[0],c=a[1],f=Object(i.useContext)(s).featureFlags,u=y(f.getDefinitions(),r.toLowerCase().trim()),m="".concat(window.location.href,"?ff=").concat(encodeURIComponent(JSON.stringify(f.getAllOverridden())));return l.a.createElement("div",{className:"flagg"},l.a.createElement("style",null,g),l.a.createElement("div",{className:"flagg-header"},l.a.createElement("div",{className:"flagg-header__lead"},l.a.createElement("span",{className:"flagg-header__name"},l.a.createElement(v,{icon:"flag"}),l.a.createElement("span",null,"Flagg"))),l.a.createElement("div",{className:"flagg-header__end"},l.a.createElement("button",{title:"Copy URL",className:"flagg-button",onClick:function(){return navigator.clipboard.writeText(m)}},l.a.createElement(v,{icon:"link"})),l.a.createElement("button",{className:"flagg-button",onClick:function(){Object.entries(f.getDefinitions()).forEach((function(e){var n=Object(o.a)(e,2),t=n[0];n[1];f.set(t,f.getDefault(t))}))},title:"Reset"},l.a.createElement(v,{icon:"refresh"})),n&&l.a.createElement("button",{className:"flagg-button",onClick:n},l.a.createElement(v,{icon:"checkCircle"})))),l.a.createElement("div",{className:"flagg-categories"},l.a.createElement("div",{className:"flagg-category flagg-category--search"},l.a.createElement(v,{icon:"search"}),l.a.createElement("input",{value:r,onChange:function(e){return c(e.currentTarget.value)},className:"flagg-search",type:"search",placeholder:"Search Feature Flags"})),!u.length&&l.a.createElement("div",{className:"flagg-zero"},"Nothing to see here..."),u.map((function(e){var n=e.categoryName,t=e.values;return l.a.createElement("div",{key:n,className:"flagg-category"},l.a.createElement("div",{className:"flagg-category__name"},n||"Flags"),t.map((function(e){var t=e.flagName,a=e.name,r=e.definition;return l.a.createElement(b,{key:t,name:a,categoryName:n,flagName:t,definition:r,ff:f})})))}))),l.a.createElement(d,null))}function d(){return l.a.createElement("div",{className:"flagg-footer"},"Made with \u2764\ufe0f in Sunny FL \xb7"," ",l.a.createElement("a",{href:"https://github.com/jamesmfriedman/flagg"},"Visit Github"))}var p={flag:"M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z",search:"M7,0 C3.1458514,0 0,3.1458514 0,7 C0,10.854149 3.1458514,14 7,14 C8.747998,14 10.345009,13.348024 11.574219,12.28125 L12,12.707031 L12,14 L18,20 L20,18 L14,12 L12.707031,12 L12.28125,11.574219 C13.348024,10.345009 14,8.747998 14,7 C14,3.1458514 10.854149,0 7,0 Z M7,2 C9.773268,2 12,4.2267316 12,7 C12,9.773268 9.773268,12 7,12 C4.2267316,12 2,9.773268 2,7 C2,4.2267316 4.2267316,2 7,2 Z",refresh:"M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",checkCircle:"M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",link:"M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z",snowflake:"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z"};function v(e){var n=e.icon,t=Object(r.a)(e,["icon"]),a=p[n];return l.a.createElement("svg",Object.assign({width:"24",height:"24",viewBox:"0 0 24 24"},t,{className:"flagg-".concat(n,"-icon")}),l.a.createElement("path",{fill:"currentColor",d:a}))}function b(e){var n=e.definition,t=e.flagName,a=e.name,r=e.ff,o=(e.categoryName,null),i=w(n),c=r.isOverridden(t),f=r.isFrozen(t);switch(i){case"select":o=l.a.createElement(_,{value:r.get(t),options:n.options,defaultValue:n.default,onChange:function(e){return r.set(t,""===e.currentTarget.value?n.default:e.currentTarget.value)}});break;case"input":o=l.a.createElement(E,{value:r.get(t),onChange:function(e){return r.set(t,e.currentTarget.value)}});break;case"toggle":default:o=l.a.createElement(h,{checked:!!r.get(t),onChange:function(){}})}return l.a.createElement("div",{key:t,className:["flagg-flag",c&&"flagg-flag--override",f&&"flagg-flag--frozen"].filter(Boolean).join(" "),onClick:"toggle"===i?function(){return r.set(t,!r.get(t))}:void 0},f&&l.a.createElement(v,{icon:"snowflake"}),!f&&l.a.createElement(v,{icon:"flag",onClick:function(e){e.stopPropagation(),r.set(t,r.getDefault(t))}}),l.a.createElement("div",null,l.a.createElement("div",{className:"flagg-flag__name"},l.a.createElement("span",{className:"flagg-flag__flag-name"},n.name||a)),(!!n.description||void 0!==n.default)&&l.a.createElement("div",{className:"flagg-flag__description"},n.description)),l.a.createElement("div",{title:t+" - Default: "+String(r.getDefault(t)),className:["flagg-control"].filter(Boolean).join(" ")},o))}function h(e){var n=Object(a.a)({},e);return l.a.createElement("input",Object.assign({type:"checkbox",className:"flagg-toggle"},n))}function E(e){var n=Object(a.a)({},e);return l.a.createElement("input",Object.assign({type:"text",className:"flagg-input"},n))}function _(e){var n=e.options,t=e.defaultValue,a=e.value,o=Object(r.a)(e,["options","defaultValue","value"]);return l.a.createElement("select",Object.assign({className:"flagg-select",value:a||""},o),!t&&l.a.createElement("option",{value:""},"-- OFF --"),n.map((function(e){return l.a.createElement("option",{key:e,value:e},e)})))}var w=function(e){return e.options?"select":"string"===typeof e.default?"input":"toggle"},y=function(e,n){var t=Object.entries(e).reduce((function(e,t){var a=Object(o.a)(t,2),r=a[0],i=a[1],l=r.split(u.a,2),c=l.length>1?l[0]:"",f=l.pop();return e[c]=e[c]||[],(!n||r.toLowerCase().includes(n)||(i.name||"").toLowerCase().includes(n)||(i.description||"").toLowerCase().includes(n))&&e[c].push({flagName:r,name:f,definition:i}),e}),{});return Object.entries(t).filter((function(e){return Object(o.a)(e,2)[1].length})).map((function(e){var n=Object(o.a)(e,2);return{categoryName:n[0],values:n[1].sort((function(e,n){return e.name>n.name?1:-1}))}})).sort((function(e,n){return e.categoryName>n.categoryName?1:-1}))};function O(e){var n=e.children,t=e.featureFlags,a=Object(i.useState)(0),r=Object(o.a)(a,2),c=r[0],f=r[1],g=t;return Object(i.useEffect)((function(){var e=t.set;g.set=function(){var n=e.apply(void 0,arguments);return f((function(e){return e+1})),n}}),[]),l.a.createElement(s.Provider,{value:{featureFlags:g,iteration:c}},n)}var k=function(e){var n=Object(i.useContext)(s).featureFlags;return[n.get(e),function(t){return n.set(e,t)}]};t.d(n,"a",(function(){return m})),t.d(n,"b",(function(){return O})),t.d(n,"c",(function(){return k}))}},[[37,1,2]]]);
//# sourceMappingURL=main.17aebaa1.chunk.js.map