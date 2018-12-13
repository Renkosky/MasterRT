(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./src/lib/assets/styles/mr-loader.less":function(e,t,n){},"./src/lib/assets/styles/mr-process.less":function(e,t,n){},"./src/lib/mr-common/mr-request.ts":function(e,t,n){"use strict";n.d(t,"a",function(){return f});var r=n("./src/lib/mr-common/mr.services.ts"),o=n("./node_modules/mzmu/index.js"),a=n.n(o),s=n("./node_modules/axios/index.js"),i=n.n(s);function u(e){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var c=i.a.CancelToken;function l(e){var t,n=e.config.resultType,o=e.config.mock;switch(n){case"response":t=e;break;default:t=e.data}return o&&"object"===u(t)&&(t=r.a.mock(t)),Promise.resolve(t)}function p(e){if(i.a.isCancel(e))return Promise.reject(e);var t=e.response;if(!t)return Promise.reject(e);var n=t.headers,o=t.status,a=t.statusText,s=t.data,u=new Promise(function(e){return e(s)}),c={headers:n,status:o,statusText:a,data:s,$message:u,response:t,error:e},l=r.a._reqCatch;return l&&(c=l(c)),"[object Promise]"===Object.prototype.toString.call(c)?c:Promise.reject(c)}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.a.getHeaders();return n=a.a.map(n||{},function(e){return"function"===typeof e?e():e}),t.headers=a.a.extend(!0,n,t.headers),t.url=e,a.a.run("function"===typeof t.cancelToken,function(){t.cancelToken=new c(t.cancelToken)}),i()(t).then(l).catch(p)}try{mrrequest.displayName="mrrequest",mrrequest.__docgenInfo={description:'Requests a URL, returning a promise.\n@param url The URL we want to request\n@param options The options we want to pass to "fetch"\n@return An object containing either "data" or "err"',displayName:"mrrequest",props:{}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/mr-common/mr-request.ts#mrrequest"]={docgenInfo:mrrequest.__docgenInfo,name:"mrrequest",path:"src/lib/mr-common/mr-request.ts#mrrequest"})}catch(d){}},"./src/lib/mr-common/mr-resource.ts":function(e,t,n){"use strict";var r=n("./node_modules/mzmu/index.js"),o=n.n(r),a=n("./src/lib/mr-common/mr-request.ts"),s=n("./src/lib/mr-common/mr.services.ts"),i=n("./node_modules/lodash/lodash.js");function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(u){o=!0,a=u}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function c(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,r;return t=e,(n=[{key:"getParams",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=u(e.replace(/^{(.*)}$/,"$1").split(":"),3),r=n[0],a=n[1],s=n[2],i=t[a];return o.a.isExist(i)&&(i=[r=o.a.ifnvl(r,""),i,s=o.a.ifnvl(s,"")].join("")),{key:a,value:i=o.a.ifnvl(i,"")}}},{key:"restful",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};e=e||"";var a=o.a.clone(n||{}),s={},i=e.match(/{(.*?)(:.+?)}/g);return i&&i.length&&o.a.each(i,function(o){var a=t.getParams(o,n);a.key&&(r.holdParams||delete n[a.key],e=e.replace(o,a.value))}),{url:e=e.replace(/\{(.+?)\}/g,function(e,t){var i=o.a.run(a[t],function(e){return s[t]=e,a=o.a.remove(a,t),r.holdParams||delete n[t],e});return o.a.ifnvl(i,"")}),fullUrl:e,search:a,params:n,restParams:s}}},{key:"get",value:function(e,t,n){var r=this.restful(e,t,n).fullUrl;return n=o.a.extend(!0,{method:"get",params:t},n||{}),Object(a.a)(r,n)}},{key:"post",value:function(e,t,n,r){switch(arguments.length){case 1:n={},t={},r={};break;case 2:n=arguments[1],t={},r={};break;case 3:r={}}var i=this.restful(e,t,r);s.a.getHeaders();return r=o.a.extend(!0,{method:"post",headers:{"Content-Type":"application/json;"},data:n,params:t},r||{}),Object(a.a)(i.fullUrl,r)}},{key:"patch",value:function(e,t,n,r){switch(arguments.length){case 1:t={},n={},r={};break;case 2:t={},n=arguments[1],r={};break;case 3:r={}}var s=this.restful(e,t,r),i=this.restful(s.url,n,r);return r=o.a.extend(!0,{method:"patch",headers:{"Content-Type":"application/json;"},data:n,params:t},r||{}),Object(a.a)(i.fullUrl,r)}},{key:"put",value:function(e,t,n,r){switch(arguments.length){case 1:t={},n={},r={};break;case 2:t={},n=arguments[1],r={};break;case 3:r={}}var s=this.restful(e,t,r),i=this.restful(s.url,n,r);return r=o.a.extend(!0,{method:"put",headers:{"Content-Type":"application/json;"},data:n,params:t},r||{}),Object(a.a)(i.fullUrl,r)}},{key:"delete",value:function(e,t,n){var r=this.restful(e,t,n).fullUrl;return n=o.a.extend(!0,{method:"delete",params:t},n||{}),Object(a.a)(r,n)}},{key:"pool",value:function(e){var t=this;return{_url:e,get:function(n,r,a){return o.a.run(r,function(){n=o.a.extend(!0,n,r)}),t.get(e,n,a)},post:function(n,r,o){var a=Array.from(arguments);return a.unshift(e),t.post.apply(t,a)},upload:function(n,r,o){return o=o||{},i.set(o,"headers.Content-Type","multipart/form-data;"),t.post(e,n,r,o)},delete:function(n,r,o){var a=Array.from(arguments);return a.unshift(e),t.delete.apply(t,a)},patch:function(n,r,o){var a=Array.from(arguments);return a.unshift(e),t.patch.apply(t,a)},put:function(n,r,o){var a=Array.from(arguments);return a.unshift(e),t.put.apply(t,a)},save:function(n,r,o){var a=(n||r||{})[(n||r||{}).__primary__]?"patch":"post",s=Array.from(arguments);return s.unshift(e),t[a].apply(t,s)},download:function(n,r){var o=Array.from(arguments);return(r=r||{}).responseType="blob",o.unshift(e),t.get.apply(t,o).then(function(e){s.a.download(e,n.downloadName)})},mrdown:function(n,r,o){return r=r||{},o=o||{},(n=n||{}).downloadName?(n.directDownload=!0,o.responseType="blob",t.post(e,n,r,o).then(function(e){s.a.download(e,n.downloadName)})):(console.error("downloadName \u672a\u8bbe\u7f6e"),!1)}}}}])&&c(t.prototype,n),r&&c(t,r),e}();t.a=new l},"./src/lib/mr-component/mr-component.component.tsx":function(e,t,n){"use strict";var r=n("./node_modules/react/index.js");function o(e){return(o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==o(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,c(t).apply(this,arguments))}var n,o,p;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(t,r["Component"]),n=t,(o=[{key:"render",value:function(){var e=this.props,t=e.component,n=e.children,o=s(e,["component","children"]);return r.createElement(t,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){a(e,t,n[t])})}return e}({},o),n)}}])&&i(n.prototype,o),p&&i(n,p),t}();t.a=p;try{p.displayName="MrComponent",p.__docgenInfo={description:"",displayName:"MrComponent",props:{component:{defaultValue:null,description:"\u52a8\u6001\u8c03\u7528component",name:"component",required:!0,type:{name:"ComponentClass<{}, any> | StatelessComponent<{}>"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/mr-component/mr-component.component.tsx#MrComponent"]={docgenInfo:p.__docgenInfo,name:"MrComponent",path:"src/lib/mr-component/mr-component.component.tsx#MrComponent"})}catch(f){}},"./src/lib/mr-process/mr-loader.component.tsx":function(e,t,n){"use strict";var r=n("./node_modules/react/index.js"),o=n("./node_modules/antd/es/spin/index.js");n("./src/lib/assets/styles/mr-loader.less");function a(e){return(a="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function i(e,t){return!t||"object"!==a(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var l=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),i(this,u(t).apply(this,arguments))}var n,a,l;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}(t,r["Component"]),n=t,(a=[{key:"render",value:function(){var e=this.props.start;return r.createElement(r.Fragment,null,e>=0&&e<100?r.createElement(o.a,null):null)}}])&&s(n.prototype,a),l&&s(n,l),t}();t.a=l;try{l.displayName="MrLoader",l.__docgenInfo={description:"",displayName:"MrLoader",props:{start:{defaultValue:null,description:"loader \u8f7d\u5165\n@values 0-100 | boolean",name:"start",required:!0,type:{name:"number | boolean"}},type:{defaultValue:null,description:"\u8fdb\u5ea6\u6761\u7c7b\u578b\uff0c\u76ee\u524d\u4ec5\u652f\u6301 antd spin",name:"type",required:!0,type:{name:"string"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/mr-process/mr-loader.component.tsx#MrLoader"]={docgenInfo:l.__docgenInfo,name:"MrLoader",path:"src/lib/mr-process/mr-loader.component.tsx#MrLoader"})}catch(p){}},"./src/lib/mr-process/mr-nodata.component.tsx":function(e,t,n){"use strict";var r=n("./node_modules/react/index.js");function o(e){return(o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return!t||"object"!==o(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e,t){return(u=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var c=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),s(this,i(t).apply(this,arguments))}var n,o,c;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&u(e,t)}(t,r["Component"]),n=t,(o=[{key:"render",value:function(){return r.createElement("div",{style:{padding:16,textAlign:"center"}},"NO DATA")}}])&&a(n.prototype,o),c&&a(n,c),t}();t.a=c;try{c.displayName="MrNodataComponent",c.__docgenInfo={description:"",displayName:"MrNodataComponent",props:{}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/mr-process/mr-nodata.component.tsx#MrNodataComponent"]={docgenInfo:c.__docgenInfo,name:"MrNodataComponent",path:"src/lib/mr-process/mr-nodata.component.tsx#MrNodataComponent"})}catch(l){}},"./src/lib/mr-process/mr-process.component.tsx":function(e,t,n){"use strict";var r=n("./node_modules/react/index.js"),o=n("./node_modules/mzmu/index.js"),a=n.n(o),s=(n("./src/lib/assets/styles/mr-process.less"),n("./src/lib/mr-process/mr-loader.component.tsx")),i=n("./src/lib/mr-process/mr-nodata.component.tsx"),u=n("./src/lib/mr-component/mr-component.component.tsx"),c=n("./src/lib/mr-common/mr.services.ts");function l(e){return(l="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t){return!t||"object"!==l(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var y=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),f(this,d(t).apply(this,arguments))}var n,o,l;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,r["Component"]),n=t,(o=[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e,t=this.props,n=t.start,o=t.type,l=this.props,p=l.data,f=l.nodata,d=l.children,m=l.showLoading,y=l.showNodata;return e=f||c.a.getNoDataComponent()||i.a,r.createElement("section",{className:"mr-process"},n>=0&&n<100&&m&&r.createElement("section",{className:"mr-process-loader"},r.createElement(s.a,{start:n,type:o})),n>99&&a.a.isEmpty(p)&&y?r.createElement("section",{className:"mr-process-nodata"},r.createElement(u.a,{component:e})):d)}}])&&p(n.prototype,o),l&&p(n,l),t}();y.defaultProps={start:0,showLoading:!0,showNodata:!0},t.a=y;try{y.displayName="MrProcess",y.__docgenInfo={description:"",displayName:"MrProcess",props:{start:{defaultValue:{value:"0"},description:"MrLoader.start",name:"start",required:!1,type:{name:"number | boolean"}},type:{defaultValue:null,description:"MrLoader.type",name:"type",required:!1,type:{name:"string"}},data:{defaultValue:null,description:"",name:"data",required:!1,type:{name:"any"}},nodata:{defaultValue:{value:"MrNodataComponent"},description:"nodata \u663e\u793a\u6a21\u677f\n\nMrServices.getNodataComponent\u4e2d\u8bfb\u53d6",name:"nodata",required:!1,type:{name:"any"}},showLoading:{defaultValue:{value:"true"},description:"showLoading?: boolean = true\n\u662f\u5426\u663e\u793a loading",name:"showLoading",required:!1,type:{name:"boolean"}},showNodata:{defaultValue:{value:"true"},description:"showLoading?: boolean = true\n\u662f\u5426\u663e\u793a loading",name:"showNodata",required:!1,type:{name:"boolean"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/mr-process/mr-process.component.tsx#MrProcess"]={docgenInfo:y.__docgenInfo,name:"MrProcess",path:"src/lib/mr-process/mr-process.component.tsx#MrProcess"})}catch(h){}},"./src/lib/mr-req/mr-req.component.tsx":function(e,t,n){"use strict";var r=n("./node_modules/react/index.js"),o=n("./node_modules/mzmu/index.js"),a=n.n(o),s=n("./src/lib/mr-common/mr.services.ts"),i=n("./node_modules/lodash/lodash.js"),u=n("./src/lib/mr-process/mr-process.component.tsx");function c(e){return(c="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],r=!0,o=!1,a=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done)&&(n.push(s.value),!t||n.length!==t);r=!0);}catch(u){o=!0,a=u}finally{try{r||null==i.return||i.return()}finally{if(o)throw a}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function m(e,t,n){return t&&d(e.prototype,t),n&&d(e,n),e}function y(e,t){return!t||"object"!==c(t)&&"function"!==typeof t?g(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var _=function(e){function t(){var e,n;f(this,t);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(n=y(this,(e=h(t)).call.apply(e,[this].concat(o))))._data=void 0,n._start=0,n.cancel=[],n._transmit=void 0,n._gene=void 0,n._childEmitReload=a.a.bind(function(e){!0===e()&&n.getRequests(n.props)},g(g(n))),n.state={},n}return b(t,r["Component"]),m(t,[{key:"result",value:function(e){var t=this.props.result;t&&t(e)}},{key:"oneRequest",value:function(e,t){var n=this,r=t.method,o=void 0===r?"post":r,s=t.payload,i=void 0===s?{}:s,u=t.search,c=void 0===u?{}:u,l=t.transform,p=t.resource,f=t.options,d=void 0===f?{}:f;o=o.toLowerCase(),p=a.a.ifempty(p,e[t.api]);var m=d.cancelToken;return a.a.run(p,function(){var e=p[o];return d.cancelToken=function(e){m&&m(e),n.cancel.push(e)},e(c,i,d).then(function(e){return l?l(e):e})})}},{key:"getRequests",value:function(e){var t,n=this,r=e.req,o=e.pool,i=(e.result,e.transmit,e.data);if(a.a.isEmpty(r))return this._data=i,void(this._start=100);this._data=void 0,this._start=0,o=o||s.a.getResourcePool(),r=s.a.upArray(r),t=a.a.map(r,function(e){return n.oneRequest(o,e)}),Promise.all(t).then(function(e){n._data=1==r.length?e[0]:e,n._start=100,n.result(n._data),n.transmit(),n.forceUpdate()}).catch(function(e){return n._gene=null,n.forceUpdate(),n.result(null),Promise.reject(e)})}},{key:"transmit",value:function(){var e=this.props,t=e.transmit,n=void 0===t?["data:res.data"]:t,r=(e.req,this._data),o=s.a.upArray(n);o=a.a.map(o,function(e){var t=p(e.split(":"),2),n=t[0],o=t[1],a=void 0===o?"res.data":o;return{name:n,path:a,data:i.get({res:r},a)}}),this._transmit=o}},{key:"getGene",value:function(e){var t={res:e};return a.a.map(this._transmit,function(e){var n=e.name,r=e.path;return{__key__:n,__val__:i.get(t,r)}},{})}},{key:"inheritance",value:function(e){var t=this;if(a.a.isNotExist(e))return null;var n=this.props,o=n.children,s=n.transform;e=s?s(e):e;var i=this.getGene(e);return this._gene=i,a.a.isNotExist(o)?null:"function"===typeof o?(this.transmit(),o(this._transmit[0].data)):r.Children.count(o)?r.Children.map(o,function(e){if(!e)return null;if("function"===typeof e.type){var n={};return(n=a.a.extend(!0,{},n,i))._gene=i,n._mrReqReload=t._childEmitReload,n=a.a.extend(!0,n,e.props||{}),r.cloneElement(e,n)}return e}):null}},{key:"isRender",value:function(e,t){return e.force||!i.isEqual(e.req,this.props.req)||!i.isEqual(t,this.state)}},{key:"componentWillMount",value:function(){this.getRequests(this.props)}},{key:"componentWillReceiveProps",value:function(e,t){this.isRender(e,t)&&(this.cancel.length&&this.cancel.forEach(function(e){return"function"===typeof e&&e()}),this.getRequests(e))}},{key:"shouldComponentUpdate",value:function(e,t){return this.isRender(e,t)}},{key:"componentWillUnmount",value:function(){this.setState=function(){},this.forceUpdate=function(){},this.result=function(){},this.transmit=function(){},this.cancel.length&&this.cancel.forEach(function(e){return"function"===typeof e&&e()})}},{key:"render",value:function(){var e=this.inheritance(this._data)||null,t=a.a.map(this._transmit||[],function(e){return e.data}),n=this._transmit?1===t.length?t[0]:t:this._data,o=this.props,s={showLoading:o.showLoading,showNodata:o.showNodata,nodata:o.nodata,loading:o.loading};return r.createElement(r.Fragment,null,r.createElement(u.a,Object.assign({start:this._start,data:n},s),e))}}]),t}(),O=function(e){function t(){return f(this,t),y(this,h(t).apply(this,arguments))}return b(t,r["Component"]),m(t,[{key:"render",value:function(){var e=this.props,t=e.children,n=l(e,["children"]);return n=a.a.clone(n),r.createElement(_,n,t)}}]),t}();t.a=O;try{_.displayName="MrReqInner",_.__docgenInfo={description:"\u4ec5\u5bf9 MrResource \u652f\u6301\u7684\u4e00\u79cd\u5f02\u6b65\u52a0\u8f7d\u65b9\u5f0f",displayName:"MrReqInner",props:{req:{defaultValue:null,description:"MrResource\n\u8bf7\u6c42\u63a5\u53e3\n\n\u4e0edata\u4e8c\u8005\u5b58\u4e00\uff0c\u82e5\u5171\u5b58 req > data\n\nOneOnly(req, data)",name:"req",required:!1,type:{name:"IMrResource | IMrResource[]"}},pool:{defaultValue:null,description:"pool?: MrResource\n\u8fde\u63a5\u6c60\n@match \u5c31\u8fd1\u539f\u5219 >> MrServices.getResourcePool()",name:"pool",required:!1,type:{name:"any"}},data:{defaultValue:null,description:"data: any\n\u63a5\u53d7\u76f4\u63a5\u6570\u636e\n\n\u4e0ereq\u4e8c\u8005\u5b58\u4e00\uff0c\u82e5\u5171\u5b58 req > data",name:"data",required:!1,type:{name:"any"}},transmit:{defaultValue:{value:"'data:res.data'"},description:"transmit?: string | string[] = ['data:res.data'];\n\u57fa\u56e0\u9057\u4f20\u65b9\u5f0f\n@values {string}\n::=> child.prop:_.get({res}, path)\n::=> \u8981\u4f20\u9012\u7ed9\u5b50\u5143\u7d20\u7684 prop : \u53d6\u503c\u8def\u5f84",name:"transmit",required:!1,type:{name:"string | string[]"}},transform:{defaultValue:null,description:"transform?: function\n\u6570\u636e\u5904\u7406\n\u533a\u522b\u4e8e req.transform,  req.transform \u7528\u4e8e\u5355\u4e2a\u8bf7\u6c42\uff0c\u800c transform \u7528\u4e8e\u6240\u6709\u8bf7\u6c42\n@v0 .1.20.20180515",name:"transform",required:!1,type:{name:"any"}},force:{defaultValue:{value:"false"},description:"force?: boolean = ifnvl(null, false)\n\u662f\u5426\u89e3\u9664 MrReq\u8bbe\u8ba1req\u672a\u4ea7\u751f\u53d8\u5316\u963b\u6b62\u6e32\u67d3\u7684\u884c\u4e3a",name:"force",required:!1,type:{name:"boolean"}},result:{defaultValue:null,description:"result?: function(res);\n\u8fd4\u56de\u8c03\u7528\n@mark \u6ce8\u610f\uff0c\u5f53\u53ea\u6709\u4e00\u4e2a\u8fd4\u56de\u503c\u5f97\u65f6\u5019\uff0c\u8fd4\u56de\u5bf9\u8c61 res = res[0]",name:"result",required:!1,type:{name:"any"}},showLoading:{defaultValue:{value:"true"},description:"showLoading?: boolean = true\n@extend MrProcessProps",name:"showLoading",required:!1,type:{name:"boolean"}},showNodata:{defaultValue:{value:"true"},description:"showNodata?: boolean = true\n@extend MrProcessProps",name:"showNodata",required:!1,type:{name:"boolean"}},loading:{defaultValue:null,description:"loading?: string | React.Component\n@extend MrProcessProps",name:"loading",required:!1,type:{name:"string | Component<{}, {}, any>"}},nodata:{defaultValue:{value:"MrNodataComponent"},description:"nodata?: React.Component\n@extend MrProcessProps",name:"nodata",required:!1,type:{name:"Component<{}, {}, any> | StatelessComponent<{}>"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/mr-req/mr-req.component.tsx#MrReqInner"]={docgenInfo:_.__docgenInfo,name:"MrReqInner",path:"src/lib/mr-req/mr-req.component.tsx#MrReqInner"})}catch(w){}try{O.displayName="MrReq",O.__docgenInfo={description:"",displayName:"MrReq",props:{req:{defaultValue:null,description:"MrResource\n\u8bf7\u6c42\u63a5\u53e3\n\n\u4e0edata\u4e8c\u8005\u5b58\u4e00\uff0c\u82e5\u5171\u5b58 req > data\n\nOneOnly(req, data)",name:"req",required:!1,type:{name:"IMrResource | IMrResource[]"}},pool:{defaultValue:null,description:"pool?: MrResource\n\u8fde\u63a5\u6c60\n@match \u5c31\u8fd1\u539f\u5219 >> MrServices.getResourcePool()",name:"pool",required:!1,type:{name:"any"}},data:{defaultValue:null,description:"data: any\n\u63a5\u53d7\u76f4\u63a5\u6570\u636e\n\n\u4e0ereq\u4e8c\u8005\u5b58\u4e00\uff0c\u82e5\u5171\u5b58 req > data",name:"data",required:!1,type:{name:"any"}},transmit:{defaultValue:{value:"'data:res.data'"},description:"transmit?: string | string[] = ['data:res.data'];\n\u57fa\u56e0\u9057\u4f20\u65b9\u5f0f\n@values {string}\n::=> child.prop:_.get({res}, path)\n::=> \u8981\u4f20\u9012\u7ed9\u5b50\u5143\u7d20\u7684 prop : \u53d6\u503c\u8def\u5f84",name:"transmit",required:!1,type:{name:"string | string[]"}},transform:{defaultValue:null,description:"transform?: function\n\u6570\u636e\u5904\u7406\n\u533a\u522b\u4e8e req.transform,  req.transform \u7528\u4e8e\u5355\u4e2a\u8bf7\u6c42\uff0c\u800c transform \u7528\u4e8e\u6240\u6709\u8bf7\u6c42\n@v0 .1.20.20180515",name:"transform",required:!1,type:{name:"any"}},force:{defaultValue:{value:"false"},description:"force?: boolean = ifnvl(null, false)\n\u662f\u5426\u89e3\u9664 MrReq\u8bbe\u8ba1req\u672a\u4ea7\u751f\u53d8\u5316\u963b\u6b62\u6e32\u67d3\u7684\u884c\u4e3a",name:"force",required:!1,type:{name:"boolean"}},result:{defaultValue:null,description:"result?: function(res);\n\u8fd4\u56de\u8c03\u7528\n@mark \u6ce8\u610f\uff0c\u5f53\u53ea\u6709\u4e00\u4e2a\u8fd4\u56de\u503c\u5f97\u65f6\u5019\uff0c\u8fd4\u56de\u5bf9\u8c61 res = res[0]",name:"result",required:!1,type:{name:"any"}},showLoading:{defaultValue:{value:"true"},description:"showLoading?: boolean = true\n@extend MrProcessProps",name:"showLoading",required:!1,type:{name:"boolean"}},showNodata:{defaultValue:{value:"true"},description:"showNodata?: boolean = true\n@extend MrProcessProps",name:"showNodata",required:!1,type:{name:"boolean"}},loading:{defaultValue:null,description:"loading?: string | React.Component\n@extend MrProcessProps",name:"loading",required:!1,type:{name:"string | Component<{}, {}, any>"}},nodata:{defaultValue:{value:"MrNodataComponent"},description:"nodata?: React.Component\n@extend MrProcessProps",name:"nodata",required:!1,type:{name:"Component<{}, {}, any> | StatelessComponent<{}>"}}}},"undefined"!==typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/lib/mr-req/mr-req.component.tsx#MrReq"]={docgenInfo:O.__docgenInfo,name:"MrReq",path:"src/lib/mr-req/mr-req.component.tsx#MrReq"})}catch(w){}}}]);
//# sourceMappingURL=src-lib-mr-echarts-panel-mr-echarts-panel~src-lib-mr-req-mr-req.fa41dde49e26e627a17a.js.map