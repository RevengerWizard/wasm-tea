var f;f||(f=typeof Module !== 'undefined' ? Module : {});var aa=Object.assign({},f),ba="./this.program",ca=(a,b)=>{throw b;},da="object"==typeof window,h="function"==typeof importScripts,m="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,t="",ea,u,fa;
if(m){var fs=require("fs"),ha=require("path");t=h?ha.dirname(t)+"/":__dirname+"/";ea=(a,b)=>{a=a.startsWith("file://")?new URL(a):ha.normalize(a);return fs.readFileSync(a,b?void 0:"utf8")};fa=a=>{a=ea(a,!0);a.buffer||(a=new Uint8Array(a));return a};u=(a,b,c,d=!0)=>{a=a.startsWith("file://")?new URL(a):ha.normalize(a);fs.readFile(a,d?void 0:"utf8",(e,g)=>{e?c(e):b(d?g.buffer:g)})};!f.thisProgram&&1<process.argv.length&&(ba=process.argv[1].replace(/\\/g,"/"));process.argv.slice(2);"undefined"!=typeof module&&
(module.exports=f);process.on("uncaughtException",a=>{if(!("unwind"===a||a instanceof ia||a.context instanceof ia))throw a;});if(15>process.versions.node.split(".")[0])process.on("unhandledRejection",a=>{throw a;});ca=(a,b)=>{process.exitCode=a;throw b;};f.inspect=()=>"[Emscripten Module object]"}else if(da||h)h?t=self.location.href:"undefined"!=typeof document&&document.currentScript&&(t=document.currentScript.src),t=0!==t.indexOf("blob:")?t.substr(0,t.replace(/[?#].*/,"").lastIndexOf("/")+1):"",
ea=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText},h&&(fa=a=>{var b=new XMLHttpRequest;b.open("GET",a,!1);b.responseType="arraybuffer";b.send(null);return new Uint8Array(b.response)}),u=(a,b,c)=>{var d=new XMLHttpRequest;d.open("GET",a,!0);d.responseType="arraybuffer";d.onload=()=>{200==d.status||0==d.status&&d.response?b(d.response):c()};d.onerror=c;d.send(null)};var ja=f.print||console.log.bind(console),v=f.printErr||console.error.bind(console);
Object.assign(f,aa);aa=null;f.thisProgram&&(ba=f.thisProgram);f.quit&&(ca=f.quit);var w;f.wasmBinary&&(w=f.wasmBinary);var noExitRuntime=f.noExitRuntime||!0;"object"!=typeof WebAssembly&&x("no native wasm support detected");var ka,la=!1,z,A,ma,C,D;
function na(){var a=ka.buffer;f.HEAP8=z=new Int8Array(a);f.HEAP16=ma=new Int16Array(a);f.HEAP32=C=new Int32Array(a);f.HEAPU8=A=new Uint8Array(a);f.HEAPU16=new Uint16Array(a);f.HEAPU32=D=new Uint32Array(a);f.HEAPF32=new Float32Array(a);f.HEAPF64=new Float64Array(a)}var oa,pa=[],qa=[],ra=[];function sa(){var a=f.preRun.shift();pa.unshift(a)}var E=0,ta=null,F=null;
function x(a){if(f.onAbort)f.onAbort(a);a="Aborted("+a+")";v(a);la=!0;throw new WebAssembly.RuntimeError(a+". Build with -sASSERTIONS for more info.");}function ua(a){return a.startsWith("data:application/octet-stream;base64,")}var G;G="index.wasm";if(!ua(G)){var va=G;G=f.locateFile?f.locateFile(va,t):t+va}function wa(a){try{if(a==G&&w)return new Uint8Array(w);if(fa)return fa(a);throw"both async and sync fetching of the wasm failed";}catch(b){x(b)}}
function xa(a){if(!w&&(da||h)){if("function"==typeof fetch&&!a.startsWith("file://"))return fetch(a,{credentials:"same-origin"}).then(b=>{if(!b.ok)throw"failed to load wasm binary file at '"+a+"'";return b.arrayBuffer()}).catch(()=>wa(a));if(u)return new Promise((b,c)=>{u(a,d=>b(new Uint8Array(d)),c)})}return Promise.resolve().then(()=>wa(a))}function ya(a,b,c){return xa(a).then(d=>WebAssembly.instantiate(d,b)).then(d=>d).then(c,d=>{v("failed to asynchronously prepare wasm: "+d);x(d)})}
function za(a,b){var c=G;w||"function"!=typeof WebAssembly.instantiateStreaming||ua(c)||c.startsWith("file://")||m||"function"!=typeof fetch?ya(c,a,b):fetch(c,{credentials:"same-origin"}).then(d=>WebAssembly.instantiateStreaming(d,a).then(b,function(e){v("wasm streaming compile failed: "+e);v("falling back to ArrayBuffer instantiation");return ya(c,a,b)}))}var I,Aa;function ia(a){this.name="ExitStatus";this.message=`Program terminated with exit(${a})`;this.status=a}
function Ba(a){for(;0<a.length;)a.shift()(f)}
var Ca=(a,b)=>{for(var c=0,d=a.length-1;0<=d;d--){var e=a[d];"."===e?a.splice(d,1):".."===e?(a.splice(d,1),c++):c&&(a.splice(d,1),c--)}if(b)for(;c;c--)a.unshift("..");return a},J=a=>{var b="/"===a.charAt(0),c="/"===a.substr(-1);(a=Ca(a.split("/").filter(d=>!!d),!b).join("/"))||b||(a=".");a&&c&&(a+="/");return(b?"/":"")+a},Da=a=>{var b=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);a=b[0];b=b[1];if(!a&&!b)return".";b&&(b=b.substr(0,b.length-1));return a+b},Ea=a=>{if("/"===
a)return"/";a=J(a);a=a.replace(/\/$/,"");var b=a.lastIndexOf("/");return-1===b?a:a.substr(b+1)};function Fa(){if("object"==typeof crypto&&"function"==typeof crypto.getRandomValues)return c=>crypto.getRandomValues(c);if(m)try{var a=require("crypto");if(a.randomFillSync)return c=>a.randomFillSync(c);var b=a.randomBytes;return c=>(c.set(b(c.byteLength)),c)}catch(c){}x("initRandomDevice")}function Ga(a){return(Ga=Fa())(a)}
function Ia(){for(var a="",b=!1,c=arguments.length-1;-1<=c&&!b;c--){b=0<=c?arguments[c]:"/";if("string"!=typeof b)throw new TypeError("Arguments to path.resolve must be strings");if(!b)return"";a=b+"/"+a;b="/"===b.charAt(0)}a=Ca(a.split("/").filter(d=>!!d),!b).join("/");return(b?"/":"")+a||"."}function Ja(a){for(var b=0,c=0;c<a.length;++c){var d=a.charCodeAt(c);127>=d?b++:2047>=d?b+=2:55296<=d&&57343>=d?(b+=4,++c):b+=3}return b}
function Ka(a,b,c,d){if(!(0<d))return 0;var e=c;d=c+d-1;for(var g=0;g<a.length;++g){var k=a.charCodeAt(g);if(55296<=k&&57343>=k){var n=a.charCodeAt(++g);k=65536+((k&1023)<<10)|n&1023}if(127>=k){if(c>=d)break;b[c++]=k}else{if(2047>=k){if(c+1>=d)break;b[c++]=192|k>>6}else{if(65535>=k){if(c+2>=d)break;b[c++]=224|k>>12}else{if(c+3>=d)break;b[c++]=240|k>>18;b[c++]=128|k>>12&63}b[c++]=128|k>>6&63}b[c++]=128|k&63}}b[c]=0;return c-e}var La="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;
function K(a,b){for(var c=b+NaN,d=b;a[d]&&!(d>=c);)++d;if(16<d-b&&a.buffer&&La)return La.decode(a.subarray(b,d));for(c="";b<d;){var e=a[b++];if(e&128){var g=a[b++]&63;if(192==(e&224))c+=String.fromCharCode((e&31)<<6|g);else{var k=a[b++]&63;e=224==(e&240)?(e&15)<<12|g<<6|k:(e&7)<<18|g<<12|k<<6|a[b++]&63;65536>e?c+=String.fromCharCode(e):(e-=65536,c+=String.fromCharCode(55296|e>>10,56320|e&1023))}}else c+=String.fromCharCode(e)}return c}var Ma=[];
function Na(a,b){Ma[a]={input:[],output:[],A:b};Oa(a,Pa)}
var Pa={open:function(a){var b=Ma[a.node.rdev];if(!b)throw new L(43);a.tty=b;a.seekable=!1},close:function(a){a.tty.A.fsync(a.tty)},fsync:function(a){a.tty.A.fsync(a.tty)},read:function(a,b,c,d){if(!a.tty||!a.tty.A.N)throw new L(60);for(var e=0,g=0;g<d;g++){try{var k=a.tty.A.N(a.tty)}catch(n){throw new L(29);}if(void 0===k&&0===e)throw new L(6);if(null===k||void 0===k)break;e++;b[c+g]=k}e&&(a.node.timestamp=Date.now());return e},write:function(a,b,c,d){if(!a.tty||!a.tty.A.G)throw new L(60);try{for(var e=
0;e<d;e++)a.tty.A.G(a.tty,b[c+e])}catch(g){throw new L(29);}d&&(a.node.timestamp=Date.now());return e}},Qa={N:function(a){if(!a.input.length){var b=null;if(m){var c=Buffer.alloc(256),d=0;try{d=fs.readSync(process.stdin.fd,c,0,256,-1)}catch(e){if(e.toString().includes("EOF"))d=0;else throw e;}0<d?b=c.slice(0,d).toString("utf-8"):b=null}else"undefined"!=typeof window&&"function"==typeof window.prompt?(b=window.prompt("Input: "),null!==b&&(b+="\n")):"function"==typeof readline&&(b=readline(),null!==
b&&(b+="\n"));if(!b)return null;c=Array(Ja(b)+1);b=Ka(b,c,0,c.length);c.length=b;a.input=c}return a.input.shift()},G:function(a,b){null===b||10===b?(ja(K(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},fsync:function(a){a.output&&0<a.output.length&&(ja(K(a.output,0)),a.output=[])}},Ra={G:function(a,b){null===b||10===b?(v(K(a.output,0)),a.output=[]):0!=b&&a.output.push(b)},fsync:function(a){a.output&&0<a.output.length&&(v(K(a.output,0)),a.output=[])}},M={l:null,s:function(){return M.createNode(null,
"/",16895,0)},createNode:function(a,b,c,d){if(24576===(c&61440)||4096===(c&61440))throw new L(63);M.l||(M.l={dir:{node:{u:M.h.u,m:M.h.m,lookup:M.h.lookup,C:M.h.C,rename:M.h.rename,unlink:M.h.unlink,rmdir:M.h.rmdir,readdir:M.h.readdir,symlink:M.h.symlink},stream:{v:M.i.v}},file:{node:{u:M.h.u,m:M.h.m},stream:{v:M.i.v,read:M.i.read,write:M.i.write,I:M.i.I,O:M.i.O,R:M.i.R}},link:{node:{u:M.h.u,m:M.h.m,readlink:M.h.readlink},stream:{}},J:{node:{u:M.h.u,m:M.h.m},stream:Sa}});c=Ta(a,b,c,d);16384===(c.mode&
61440)?(c.h=M.l.dir.node,c.i=M.l.dir.stream,c.g={}):32768===(c.mode&61440)?(c.h=M.l.file.node,c.i=M.l.file.stream,c.j=0,c.g=null):40960===(c.mode&61440)?(c.h=M.l.link.node,c.i=M.l.link.stream):8192===(c.mode&61440)&&(c.h=M.l.J.node,c.i=M.l.J.stream);c.timestamp=Date.now();a&&(a.g[b]=c,a.timestamp=c.timestamp);return c},$:function(a){return a.g?a.g.subarray?a.g.subarray(0,a.j):new Uint8Array(a.g):new Uint8Array(0)},K:function(a,b){var c=a.g?a.g.length:0;c>=b||(b=Math.max(b,c*(1048576>c?2:1.125)>>>
0),0!=c&&(b=Math.max(b,256)),c=a.g,a.g=new Uint8Array(b),0<a.j&&a.g.set(c.subarray(0,a.j),0))},W:function(a,b){if(a.j!=b)if(0==b)a.g=null,a.j=0;else{var c=a.g;a.g=new Uint8Array(b);c&&a.g.set(c.subarray(0,Math.min(b,a.j)));a.j=b}},h:{u:function(a){var b={};b.dev=8192===(a.mode&61440)?a.id:1;b.ino=a.id;b.mode=a.mode;b.nlink=1;b.uid=0;b.gid=0;b.rdev=a.rdev;16384===(a.mode&61440)?b.size=4096:32768===(a.mode&61440)?b.size=a.j:40960===(a.mode&61440)?b.size=a.link.length:b.size=0;b.atime=new Date(a.timestamp);
b.mtime=new Date(a.timestamp);b.ctime=new Date(a.timestamp);b.S=4096;b.blocks=Math.ceil(b.size/b.S);return b},m:function(a,b){void 0!==b.mode&&(a.mode=b.mode);void 0!==b.timestamp&&(a.timestamp=b.timestamp);void 0!==b.size&&M.W(a,b.size)},lookup:function(){throw Ua[44];},C:function(a,b,c,d){return M.createNode(a,b,c,d)},rename:function(a,b,c){if(16384===(a.mode&61440)){try{var d=Va(b,c)}catch(g){}if(d)for(var e in d.g)throw new L(55);}delete a.parent.g[a.name];a.parent.timestamp=Date.now();a.name=
c;b.g[c]=a;b.timestamp=a.parent.timestamp;a.parent=b},unlink:function(a,b){delete a.g[b];a.timestamp=Date.now()},rmdir:function(a,b){var c=Va(a,b),d;for(d in c.g)throw new L(55);delete a.g[b];a.timestamp=Date.now()},readdir:function(a){var b=[".",".."],c;for(c in a.g)a.g.hasOwnProperty(c)&&b.push(c);return b},symlink:function(a,b,c){a=M.createNode(a,b,41471,0);a.link=c;return a},readlink:function(a){if(40960!==(a.mode&61440))throw new L(28);return a.link}},i:{read:function(a,b,c,d,e){var g=a.node.g;
if(e>=a.node.j)return 0;a=Math.min(a.node.j-e,d);if(8<a&&g.subarray)b.set(g.subarray(e,e+a),c);else for(d=0;d<a;d++)b[c+d]=g[e+d];return a},write:function(a,b,c,d,e,g){b.buffer===z.buffer&&(g=!1);if(!d)return 0;a=a.node;a.timestamp=Date.now();if(b.subarray&&(!a.g||a.g.subarray)){if(g)return a.g=b.subarray(c,c+d),a.j=d;if(0===a.j&&0===e)return a.g=b.slice(c,c+d),a.j=d;if(e+d<=a.j)return a.g.set(b.subarray(c,c+d),e),d}M.K(a,e+d);if(a.g.subarray&&b.subarray)a.g.set(b.subarray(c,c+d),e);else for(g=0;g<
d;g++)a.g[e+g]=b[c+g];a.j=Math.max(a.j,e+d);return d},v:function(a,b,c){1===c?b+=a.position:2===c&&32768===(a.node.mode&61440)&&(b+=a.node.j);if(0>b)throw new L(28);return b},I:function(a,b,c){M.K(a.node,b+c);a.node.j=Math.max(a.node.j,b+c)},O:function(a,b,c,d,e){if(32768!==(a.node.mode&61440))throw new L(43);a=a.node.g;if(e&2||a.buffer!==z.buffer){if(0<c||c+b<a.length)a.subarray?a=a.subarray(c,c+b):a=Array.prototype.slice.call(a,c,c+b);c=!0;x();b=void 0;if(!b)throw new L(48);z.set(a,b)}else c=!1,
b=a.byteOffset;return{ba:b,Z:c}},R:function(a,b,c,d){M.i.write(a,b,0,d,c,!1);return 0}}};function Wa(a,b){var c=0;a&&(c|=365);b&&(c|=146);return c}
var Xa=null,Ya={},N=[],Za=1,O=null,$a=!0,L=null,Ua={},P=(a,b={})=>{a=Ia(a);if(!a)return{path:"",node:null};b=Object.assign({M:!0,H:0},b);if(8<b.H)throw new L(32);a=a.split("/").filter(k=>!!k);for(var c=Xa,d="/",e=0;e<a.length;e++){var g=e===a.length-1;if(g&&b.parent)break;c=Va(c,a[e]);d=J(d+"/"+a[e]);c.D&&(!g||g&&b.M)&&(c=c.D.root);if(!g||b.L)for(g=0;40960===(c.mode&61440);)if(c=ab(d),d=Ia(Da(d),c),c=P(d,{H:b.H+1}).node,40<g++)throw new L(32);}return{path:d,node:c}},bb=a=>{for(var b;;){if(a===a.parent)return a=
a.s.P,b?"/"!==a[a.length-1]?`${a}/${b}`:a+b:a;b=b?`${a.name}/${b}`:a.name;a=a.parent}},cb=(a,b)=>{for(var c=0,d=0;d<b.length;d++)c=(c<<5)-c+b.charCodeAt(d)|0;return(a+c>>>0)%O.length},Va=(a,b)=>{var c;if(c=(c=db(a,"x"))?c:a.h.lookup?0:2)throw new L(c,a);for(c=O[cb(a.id,b)];c;c=c.V){var d=c.name;if(c.parent.id===a.id&&d===b)return c}return a.h.lookup(a,b)},Ta=(a,b,c,d)=>{a=new eb(a,b,c,d);b=cb(a.parent.id,a.name);a.V=O[b];return O[b]=a},fb=a=>{var b=["r","w","rw"][a&3];a&512&&(b+="w");return b},db=
(a,b)=>{if($a)return 0;if(!b.includes("r")||a.mode&292){if(b.includes("w")&&!(a.mode&146)||b.includes("x")&&!(a.mode&73))return 2}else return 2;return 0},gb=(a,b)=>{try{return Va(a,b),20}catch(c){}return db(a,"wx")},hb=()=>{for(var a=0;4096>=a;a++)if(!N[a])return a;throw new L(33);},ib=(a,b=-1)=>{Q||(Q=function(){this.B={}},Q.prototype={},Object.defineProperties(Q.prototype,{object:{get:function(){return this.node},set:function(c){this.node=c}},flags:{get:function(){return this.B.flags},set:function(c){this.B.flags=
c}},position:{get:function(){return this.B.position},set:function(c){this.B.position=c}}}));a=Object.assign(new Q,a);-1==b&&(b=hb());a.fd=b;return N[b]=a},Sa={open:a=>{a.i=Ya[a.node.rdev].i;a.i.open&&a.i.open(a)},v:()=>{throw new L(70);}},Oa=(a,b)=>{Ya[a]={i:b}},jb=(a,b)=>{var c="/"===b,d=!b;if(c&&Xa)throw new L(10);if(!c&&!d){var e=P(b,{M:!1});b=e.path;e=e.node;if(e.D)throw new L(10);if(16384!==(e.mode&61440))throw new L(54);}b={type:a,aa:{},P:b,U:[]};a=a.s(b);a.s=b;b.root=a;c?Xa=a:e&&(e.D=b,e.s&&
e.s.U.push(b))},R=(a,b,c)=>{var d=P(a,{parent:!0}).node;a=Ea(a);if(!a||"."===a||".."===a)throw new L(28);var e=gb(d,a);if(e)throw new L(e);if(!d.h.C)throw new L(63);return d.h.C(d,a,b,c)},kb=(a,b,c)=>{"undefined"==typeof c&&(c=b,b=438);R(a,b|8192,c)},lb=(a,b)=>{if(!Ia(a))throw new L(44);var c=P(b,{parent:!0}).node;if(!c)throw new L(44);b=Ea(b);var d=gb(c,b);if(d)throw new L(d);if(!c.h.symlink)throw new L(63);c.h.symlink(c,b,a)},ab=a=>{a=P(a).node;if(!a)throw new L(44);if(!a.h.readlink)throw new L(28);
return Ia(bb(a.parent),a.h.readlink(a))},nb=(a,b,c)=>{if(""===a)throw new L(44);if("string"==typeof b){var d={r:0,"r+":2,w:577,"w+":578,a:1089,"a+":1090}[b];if("undefined"==typeof d)throw Error(`Unknown file open mode: ${b}`);b=d}c=b&64?("undefined"==typeof c?438:c)&4095|32768:0;if("object"==typeof a)var e=a;else{a=J(a);try{e=P(a,{L:!(b&131072)}).node}catch(g){}}d=!1;if(b&64)if(e){if(b&128)throw new L(20);}else e=R(a,c,0),d=!0;if(!e)throw new L(44);8192===(e.mode&61440)&&(b&=-513);if(b&65536&&16384!==
(e.mode&61440))throw new L(54);if(!d&&(c=e?40960===(e.mode&61440)?32:16384===(e.mode&61440)&&("r"!==fb(b)||b&512)?31:db(e,fb(b)):44))throw new L(c);if(b&512&&!d){c=e;c="string"==typeof c?P(c,{L:!0}).node:c;if(!c.h.m)throw new L(63);if(16384===(c.mode&61440))throw new L(31);if(32768!==(c.mode&61440))throw new L(28);if(d=db(c,"w"))throw new L(d);c.h.m(c,{size:0,timestamp:Date.now()})}b&=-131713;e=ib({node:e,path:bb(e),flags:b,seekable:!0,position:0,i:e.i,Y:[],error:!1});e.i.open&&e.i.open(e);!f.logReadFiles||
b&1||(mb||(mb={}),a in mb||(mb[a]=1));return e},ob=(a,b,c)=>{if(null===a.fd)throw new L(8);if(!a.seekable||!a.i.v)throw new L(70);if(0!=c&&1!=c&&2!=c)throw new L(28);a.position=a.i.v(a,b,c);a.Y=[]},pb=()=>{L||(L=function(a,b){this.name="ErrnoError";this.node=b;this.X=function(c){this.o=c};this.X(a);this.message="FS error"},L.prototype=Error(),L.prototype.constructor=L,[44].forEach(a=>{Ua[a]=new L(a);Ua[a].stack="<generic error, no stack>"}))},qb,S=(a,b,c)=>{a=J("/dev/"+a);var d=Wa(!!b,!!c);rb||(rb=
64);var e=rb++<<8|0;Oa(e,{open:g=>{g.seekable=!1},close:()=>{c&&c.buffer&&c.buffer.length&&c(10)},read:(g,k,n,r)=>{for(var l=0,p=0;p<r;p++){try{var q=b()}catch(y){throw new L(29);}if(void 0===q&&0===l)throw new L(6);if(null===q||void 0===q)break;l++;k[n+p]=q}l&&(g.node.timestamp=Date.now());return l},write:(g,k,n,r)=>{for(var l=0;l<r;l++)try{c(k[n+l])}catch(p){throw new L(29);}r&&(g.node.timestamp=Date.now());return l}});kb(a,d,e)},rb,T={},Q,mb;
function sb(a,b){if("/"===b.charAt(0))return b;a=-100===a?"/":U(a).path;if(0==b.length)throw new L(44);return J(a+"/"+b)}var V=void 0;function Z(){V+=4;return C[V-4>>2]}function U(a){a=N[a];if(!a)throw new L(8);return a}m&&(global.performance=require("perf_hooks").performance);var tb={};
function ub(){if(!vb){var a={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:("object"==typeof navigator&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:ba||"./this.program"},b;for(b in tb)void 0===tb[b]?delete a[b]:a[b]=tb[b];var c=[];for(b in a)c.push(`${b}=${a[b]}`);vb=c}return vb}var vb,wb=[];
function xb(a,b,c,d){var e={string:l=>{var p=0;if(null!==l&&void 0!==l&&0!==l){p=Ja(l)+1;var q=yb(p);Ka(l,A,q,p);p=q}return p},array:l=>{var p=yb(l.length);z.set(l,p);return p}};a=f["_"+a];var g=[],k=0;if(d)for(var n=0;n<d.length;n++){var r=e[c[n]];r?(0===k&&(k=zb()),g[n]=r(d[n])):g[n]=d[n]}c=a.apply(null,g);return c=function(l){0!==k&&Ab(k);return"string"===b?l?K(A,l):"":"boolean"===b?!!l:l}(c)}
function eb(a,b,c,d){a||(a=this);this.parent=a;this.s=a.s;this.D=null;this.id=Za++;this.name=b;this.mode=c;this.h={};this.i={};this.rdev=d}Object.defineProperties(eb.prototype,{read:{get:function(){return 365===(this.mode&365)},set:function(a){a?this.mode|=365:this.mode&=-366}},write:{get:function(){return 146===(this.mode&146)},set:function(a){a?this.mode|=146:this.mode&=-147}}});pb();O=Array(4096);jb(M,"/");R("/tmp",16895,0);R("/home",16895,0);R("/home/web_user",16895,0);
(()=>{R("/dev",16895,0);Oa(259,{read:()=>0,write:(d,e,g,k)=>k});kb("/dev/null",259);Na(1280,Qa);Na(1536,Ra);kb("/dev/tty",1280);kb("/dev/tty1",1536);var a=new Uint8Array(1024),b=0,c=()=>{0===b&&(b=Ga(a).byteLength);return a[--b]};S("random",c);S("urandom",c);R("/dev/shm",16895,0);R("/dev/shm/tmp",16895,0)})();
(()=>{R("/proc",16895,0);var a=R("/proc/self",16895,0);R("/proc/self/fd",16895,0);jb({s:()=>{var b=Ta(a,"fd",16895,73);b.h={lookup:(c,d)=>{var e=N[+d];if(!e)throw new L(8);c={parent:null,s:{P:"fake"},h:{readlink:()=>e.path}};return c.parent=c}};return b}},"/proc/self/fd")})();
var Db={__syscall_fcntl64:function(a,b,c){V=c;try{var d=U(a);switch(b){case 0:var e=Z();return 0>e?-28:ib(d,e).fd;case 1:case 2:return 0;case 3:return d.flags;case 4:return e=Z(),d.flags|=e,0;case 5:return e=Z(),ma[e+0>>1]=2,0;case 6:case 7:return 0;case 16:case 8:return-28;case 9:return C[Bb()>>2]=28,-1;default:return-28}}catch(g){if("undefined"==typeof T||"ErrnoError"!==g.name)throw g;return-g.o}},__syscall_getcwd:function(a,b){try{if(0===b)return-28;var c=Ja("/")+1;if(b<c)return-68;Ka("/",A,a,
b);return c}catch(d){if("undefined"==typeof T||"ErrnoError"!==d.name)throw d;return-d.o}},__syscall_ioctl:function(a,b,c){V=c;try{var d=U(a);switch(b){case 21509:case 21505:return d.tty?0:-59;case 21510:case 21511:case 21512:case 21506:case 21507:case 21508:return d.tty?0:-59;case 21519:if(!d.tty)return-59;var e=Z();return C[e>>2]=0;case 21520:return d.tty?-28:-59;case 21531:a=e=Z();if(!d.i.T)throw new L(59);return d.i.T(d,b,a);case 21523:return d.tty?0:-59;case 21524:return d.tty?0:-59;default:return-28}}catch(g){if("undefined"==
typeof T||"ErrnoError"!==g.name)throw g;return-g.o}},__syscall_openat:function(a,b,c,d){V=d;try{b=b?K(A,b):"";b=sb(a,b);var e=d?Z():0;return nb(b,c,e).fd}catch(g){if("undefined"==typeof T||"ErrnoError"!==g.name)throw g;return-g.o}},__syscall_readlinkat:function(a,b,c,d){try{b=b?K(A,b):"";b=sb(a,b);if(0>=d)return-28;var e=ab(b),g=Math.min(d,Ja(e)),k=z[c+g];Ka(e,A,c,d+1);z[c+g]=k;return g}catch(n){if("undefined"==typeof T||"ErrnoError"!==n.name)throw n;return-n.o}},_emscripten_get_now_is_monotonic:function(){return!0},
_emscripten_throw_longjmp:function(){throw Infinity;},emscripten_date_now:function(){return Date.now()},emscripten_get_now:()=>performance.now(),emscripten_memcpy_big:function(a,b,c){A.copyWithin(a,b,b+c)},emscripten_resize_heap:function(a){var b=A.length;a>>>=0;if(2147483648<a)return!1;for(var c=1;4>=c;c*=2){var d=b*(1+.2/c);d=Math.min(d,a+100663296);var e=Math;d=Math.max(a,d);a:{e=e.min.call(e,2147483648,d+(65536-d%65536)%65536)-ka.buffer.byteLength+65535>>>16;try{ka.grow(e);na();var g=1;break a}catch(k){}g=
void 0}if(g)return!0}return!1},environ_get:function(a,b){var c=0;ub().forEach(function(d,e){var g=b+c;e=D[a+4*e>>2]=g;for(g=0;g<d.length;++g)z[e++>>0]=d.charCodeAt(g);z[e>>0]=0;c+=d.length+1});return 0},environ_sizes_get:function(a,b){var c=ub();D[a>>2]=c.length;var d=0;c.forEach(function(e){d+=e.length+1});D[b>>2]=d;return 0},exit:function(a){if(!noExitRuntime){if(f.onExit)f.onExit(a);la=!0}ca(a,new ia(a))},fd_close:function(a){try{var b=U(a);if(null===b.fd)throw new L(8);b.F&&(b.F=null);try{b.i.close&&
b.i.close(b)}catch(c){throw c;}finally{N[b.fd]=null}b.fd=null;return 0}catch(c){if("undefined"==typeof T||"ErrnoError"!==c.name)throw c;return c.o}},fd_read:function(a,b,c,d){try{a:{var e=U(a);a=b;for(var g,k=b=0;k<c;k++){var n=D[a>>2],r=D[a+4>>2];a+=8;var l=e,p=n,q=r,y=g,Ha=z;if(0>q||0>y)throw new L(28);if(null===l.fd)throw new L(8);if(1===(l.flags&2097155))throw new L(8);if(16384===(l.node.mode&61440))throw new L(31);if(!l.i.read)throw new L(28);var W="undefined"!=typeof y;if(!W)y=l.position;else if(!l.seekable)throw new L(70);
var X=l.i.read(l,Ha,p,q,y);W||(l.position+=X);var B=X;if(0>B){var Y=-1;break a}b+=B;if(B<r)break;"undefined"!==typeof g&&(g+=B)}Y=b}D[d>>2]=Y;return 0}catch(H){if("undefined"==typeof T||"ErrnoError"!==H.name)throw H;return H.o}},fd_seek:function(a,b,c,d,e){try{b=c+2097152>>>0<4194305-!!b?(b>>>0)+4294967296*c:NaN;if(isNaN(b))return 61;var g=U(a);ob(g,b,d);Aa=[g.position>>>0,(I=g.position,1<=+Math.abs(I)?0<I?+Math.floor(I/4294967296)>>>0:~~+Math.ceil((I-+(~~I>>>0))/4294967296)>>>0:0)];C[e>>2]=Aa[0];
C[e+4>>2]=Aa[1];g.F&&0===b&&0===d&&(g.F=null);return 0}catch(k){if("undefined"==typeof T||"ErrnoError"!==k.name)throw k;return k.o}},fd_write:function(a,b,c,d){try{a:{var e=U(a);a=b;for(var g,k=b=0;k<c;k++){var n=D[a>>2],r=D[a+4>>2];a+=8;var l=e,p=n,q=r,y=g,Ha=z;if(0>q||0>y)throw new L(28);if(null===l.fd)throw new L(8);if(0===(l.flags&2097155))throw new L(8);if(16384===(l.node.mode&61440))throw new L(31);if(!l.i.write)throw new L(28);l.seekable&&l.flags&1024&&ob(l,0,2);var W="undefined"!=typeof y;
if(!W)y=l.position;else if(!l.seekable)throw new L(70);var X=l.i.write(l,Ha,p,q,y,void 0);W||(l.position+=X);var B=X;if(0>B){var Y=-1;break a}b+=B;"undefined"!==typeof g&&(g+=B)}Y=b}D[d>>2]=Y;return 0}catch(H){if("undefined"==typeof T||"ErrnoError"!==H.name)throw H;return H.o}},invoke_vii:Cb,system:function(a){if(m){if(!a)return 1;a=a?K(A,a):"";if(!a.length)return 0;a=require("child_process").ea(a,[],{da:!0,stdio:"inherit"});var b=(c,d)=>c<<8|d;return null===a.status?b(0,(c=>{switch(c){case "SIGHUP":return 1;
case "SIGQUIT":return 3;case "SIGFPE":return 8;case "SIGKILL":return 9;case "SIGALRM":return 14;case "SIGTERM":return 15}return 2})(a.signal)):a.status<<8|0}if(!a)return 0;C[Bb()>>2]=52;return-1}};
(function(){function a(c){c=c.exports;f.asm=c;ka=f.asm.memory;na();oa=f.asm.__indirect_function_table;qa.unshift(f.asm.__wasm_call_ctors);E--;f.monitorRunDependencies&&f.monitorRunDependencies(E);if(0==E&&(null!==ta&&(clearInterval(ta),ta=null),F)){var d=F;F=null;d()}return c}var b={env:Db,wasi_snapshot_preview1:Db};E++;f.monitorRunDependencies&&f.monitorRunDependencies(E);if(f.instantiateWasm)try{return f.instantiateWasm(b,a)}catch(c){return v("Module.instantiateWasm callback failed with error: "+
c),!1}za(b,function(c){a(c.instance)});return{}})();f._new_state=function(){return(f._new_state=f.asm.new_state).apply(null,arguments)};f._free_state=function(){return(f._free_state=f.asm.free_state).apply(null,arguments)};f._run_tea=function(){return(f._run_tea=f.asm.run_tea).apply(null,arguments)};function Bb(){return(Bb=f.asm.__errno_location).apply(null,arguments)}function Eb(){return(Eb=f.asm.setThrew).apply(null,arguments)}function zb(){return(zb=f.asm.stackSave).apply(null,arguments)}
function Ab(){return(Ab=f.asm.stackRestore).apply(null,arguments)}function yb(){return(yb=f.asm.stackAlloc).apply(null,arguments)}f.dynCall_jiji=function(){return(f.dynCall_jiji=f.asm.dynCall_jiji).apply(null,arguments)};function Cb(a,b,c){var d=zb();try{var e=wb[a];e||(a>=wb.length&&(wb.length=a+1),wb[a]=e=oa.get(a));e(b,c)}catch(g){Ab(d);if(g!==g+0)throw g;Eb(1,0)}}f.ccall=xb;
f.cwrap=function(a,b,c,d){var e=!c||c.every(g=>"number"===g||"boolean"===g);return"string"!==b&&e&&!d?f["_"+a]:function(){return xb(a,b,c,arguments,d)}};var Fb;F=function Gb(){Fb||Hb();Fb||(F=Gb)};
function Hb(){function a(){if(!Fb&&(Fb=!0,f.calledRun=!0,!la)){f.noFSInit||qb||(qb=!0,pb(),f.stdin=f.stdin,f.stdout=f.stdout,f.stderr=f.stderr,f.stdin?S("stdin",f.stdin):lb("/dev/tty","/dev/stdin"),f.stdout?S("stdout",null,f.stdout):lb("/dev/tty","/dev/stdout"),f.stderr?S("stderr",null,f.stderr):lb("/dev/tty1","/dev/stderr"),nb("/dev/stdin",0),nb("/dev/stdout",1),nb("/dev/stderr",1));$a=!1;Ba(qa);if(f.onRuntimeInitialized)f.onRuntimeInitialized();if(f.postRun)for("function"==typeof f.postRun&&(f.postRun=
[f.postRun]);f.postRun.length;){var b=f.postRun.shift();ra.unshift(b)}Ba(ra)}}if(!(0<E)){if(f.preRun)for("function"==typeof f.preRun&&(f.preRun=[f.preRun]);f.preRun.length;)sa();Ba(pa);0<E||(f.setStatus?(f.setStatus("Running..."),setTimeout(function(){setTimeout(function(){f.setStatus("")},1);a()},1)):a())}}if(f.preInit)for("function"==typeof f.preInit&&(f.preInit=[f.preInit]);0<f.preInit.length;)f.preInit.pop()();Hb();