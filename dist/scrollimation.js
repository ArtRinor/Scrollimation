!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.Scrollimation=e()}(this,function(){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function t(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}var e=function(){function i(){o(this,i);var e=[];this.instances=e;var n=i.requestAnimationFrame;n(function t(){e.forEach(function(t){"requestAnimationFrame"===t.mode&&t._handler()}),n(t)})}return t(i,[{key:"addInstance",value:function(n){function t(){if("play"===n.status){var t=n.scrollContainer===window?i.scrollTop:n.scrollContainer.scrollTop,e=n.scrollContainer===window?i.scrollLeft:n.scrollContainer.scrollLeft;i.animate(t,e,n)}}n.fpsLimit?n._handler=i.Throttle(t,1e3/n.fpsLimit):n._handler=t,"onscroll"===n.mode&&n.scrollContainer.addEventListener("scroll",n._handler),this.instances.push(n)}}],[{key:"animate",value:function(t,e,n){n.scrollTop=t,n.scrollLeft=e;var i="top"===n.direction?t:e;i>=n.from&&!n.startEmitted?("top"===n.direction?n.scrollTop=n.from:n.scrollLeft=n.from,n.startEmitted=!0,n.start(n),n.step(n)):i<=n.from&&n.startEmitted&&("top"===n.direction?n.scrollTop=n.from:n.scrollLeft=n.from,n.startEmitted=!1,n.step(n),n.reverseEnd(n)),i>=n.to&&!n.endEmitted?("top"===n.direction?n.scrollTop=n.to:n.scrollLeft=n.to,n.endEmitted=!0,n.step(n),n.end(n)):i<=n.to&&n.endEmitted&&("top"===n.direction?n.scrollTop=n.to:n.scrollLeft=n.to,n.endEmitted=!1,n.reverseStart(n),n.step(n)),i>n.from&&i<n.to&&n.step(n)}},{key:"Throttle",value:function(e,n){var i,o,r=!1;return function t(){if(r)return i=arguments,void(o=this);e.apply(this,arguments),r=!0,setTimeout(function(){r=!1,i&&(t.apply(o,i),i=o=null)},n)}}},{key:"requestAnimationFrame",get:function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}},{key:"scrollTop",get:function(){return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop}},{key:"scrollLeft",get:function(){return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft}}]),i}(),n=new e,r=function(){function l(t){o(this,l),this.id=Math.random().toString(36).substr(2,9),this.scrollContainer="string"==typeof t.scrollContainer?document.querySelector(t.scrollContainer):t.scrollContainer||window,this.from=t.from||0,this.to=t.to||0,this.direction=t.direction||"top",this.mode=t.mode||"requestAnimationFrame",this.fpsLimit=t.fpsLimit,this.init=t.init||function(){},this.step=t.step||function(){},this.start=t.start||function(){},this.end=t.end||function(){},this.reverseStart=t.reverseStart||function(){},this.reverseEnd=t.reverseEnd||function(){},this.startEmitted=!1,this.endEmitted=!1,this.target=window.NodeList.prototype.isPrototypeOf(t.target)?[].slice.call(t.target):t.target,this.target=t.target,window.NodeList.prototype.isPrototypeOf(t.target)&&(this.target=[].slice.call(t.target)),("string"==typeof t.target||t.target instanceof String)&&(this.target=[].slice.call(document.querySelectorAll(t.target))),this.easing=t.easing||"linear",this.scrollTop=this.scrollContainer===window?e.scrollTop:this.scrollContainer.scrollTop,this.scrollLeft=this.scrollContainer===window?e.scrollLeft:this.scrollContainer.scrollLeft,this.status="play",n.addInstance(this),this.init(this)}return t(l,[{key:"calc",value:function(t,e,n){var i=this,o=(2<arguments.length&&void 0!==n||this.easing,/(^#[0-9A-F]{3}$)|(^#[0-9A-F]{4}$)|(^#[0-9A-F]{6}$)|(^#[0-9A-F]{8}$)/i);if(o.test(t)&&o.test(e)){var r=[],s=l.HexToNums(t),a=l.HexToNums(e);return s.forEach(function(t,e){r.push(l.Calculate("top"===i.direction?i.scrollTop:i.scrollLeft,i.from,i.to,t,a[e],"function"==typeof i.easing?i.easing:l.Easing[i.easing]||l.Easing.linear))}),"rgba(".concat(r[0],", ").concat(r[1],", ").concat(r[2],", ").concat(r[3],")")}return l.Calculate("top"===this.direction?this.scrollTop:this.scrollLeft,this.from,this.to,t,e,"function"==typeof this.easing?this.easing:l.Easing[this.easing]||l.Easing.linear)}},{key:"stop",value:function(){this.status="pause"}},{key:"play",value:function(){this.status="play"}},{key:"remove",value:function(){var e=this;this.status="pause","onscroll"===this.mode&&this.scrollContainer.removeEventListener("scroll",this._handler),n.instances=n.instances.filter(function(t){return t.id!==e.id})}}],[{key:"Calculate",value:function(t,e,n,i,o,r){var s=0<arguments.length&&void 0!==t?t:0,a=1<arguments.length&&void 0!==e?e:0,l=2<arguments.length&&void 0!==n?n:0,u=3<arguments.length&&void 0!==i?i:0;return u+((4<arguments.length&&void 0!==o?o:0)-u)*(5<arguments.length&&void 0!==r?r:function(t){return t})(((s=l<(s=s<a?a:s)?l:s)-a)/(l-a))}},{key:"HexToNums",value:function(t){var e;if(4===t.length)e=t.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i).slice(1,4).map(function(t){return 17*parseInt(t,16)});else if(5===t.length){e=t.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])$/i).slice(1,5).map(function(t){return 17*parseInt(t,16)})}else if(7===t.length){e=t.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i).slice(1,4).map(function(t){return parseInt(t,16)})}else if(9===t.length){e=t.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i).slice(1,5).map(function(t){return parseInt(t,16)})}return e[3]=e[3]/255||1,e}},{key:"Easing",get:function(){return{linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return t<.5?2*t*t:(4-2*t)*t-1},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t}}}}]),l}();"undefined"==typeof jQuery&&"undefined"==typeof $||(("undefined"!=typeof jQuery?jQuery:$).fn.scrollimation=function(t){return t.target=this,new r(t)});return function(t){return new r(t)}});
//# sourceMappingURL=scrollimation.js.map
