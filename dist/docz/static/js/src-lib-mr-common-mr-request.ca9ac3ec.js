(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"./src/lib/mr-common/mr-request.mdx":function(e,n,t){"use strict";t.r(n);var s=t("./node_modules/react/index.js"),a=t.n(s),o=t("./node_modules/@mdx-js/tag/dist/index.js");t("./node_modules/docz/dist/index.m.js"),t("./src/lib/mr-common/mr-request.ts");function r(e,n){if(null==e)return{};var t,s,a=function(e,n){if(null==e)return{};var t,s,a={},o=Object.keys(e);for(s=0;s<o.length;s++)t=o[s],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(s=0;s<o.length;s++)t=o[s],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}n.default=function(e){var n=e.components;r(e,["components"]);return a.a.createElement(o.MDXTag,{name:"wrapper",components:n},a.a.createElement(o.MDXTag,{name:"h1",components:n,props:{id:"mrrequest"}},"MrRequest"),a.a.createElement(o.MDXTag,{name:"p",components:n},"\u57fa\u4e8e axios\uff0c\u505a\u4e86\u4e00\u5c42\u7b80\u5355\u7684\u5c01\u88c5\uff0c\u652f\u6301\u62e6\u622a\u5668\uff0c\u9519\u8bef\u5904\u7406\u7b49"),a.a.createElement(o.MDXTag,{name:"p",components:n},a.a.createElement(o.MDXTag,{name:"a",components:n,parentName:"p",props:{href:"https://github.com/axios/axios"}},"axios: Promise based HTTP client for the browser and node.js")),a.a.createElement(o.MDXTag,{name:"h2",components:n,props:{id:"basic-usage"}},"Basic usage"),a.a.createElement(o.MDXTag,{name:"pre",components:n},a.a.createElement(o.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-javascript"}},"    // \u8bf7\u6c42\n    let $req = MrRequest(url: string, options: AxiosOptions): Promise<any>;\n\n    $req.then((response) => {\n\n        ...\n\n    }).catch((error) => {\n\n        ...\n\n    });\n\n    // --\n\n    async function getUser() {\n        try {\n            const response = await MrRequest('/user', {method: 'get'});\n            console.log(response);\n          } catch (error) {\n            console.error(error);\n          }\n    }\n")),a.a.createElement(o.MDXTag,{name:"h2",components:n,props:{id:"axios-options"}},"Axios Options"),a.a.createElement(o.MDXTag,{name:"pre",components:n},a.a.createElement(o.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-javascript"}},"const AxiosOptions = {\n  // `url` is the server URL that will be used for the request\n  url: '/user',\n\n  // `method` is the request method to be used when making the request\n  method: 'get', // default\n\n  // `baseURL` will be prepended to `url` unless `url` is absolute.\n  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs\n  // to methods of that instance.\n  baseURL: 'https://some-domain.com/api/',\n\n  // `transformRequest` allows changes to the request data before it is sent to the server\n  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'\n  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,\n  // FormData or Stream\n  // You may modify the headers object.\n  transformRequest: [function (data, headers) {\n    // Do whatever you want to transform the data\n\n    return data;\n  }],\n\n  // `transformResponse` allows changes to the response data to be made before\n  // it is passed to then/catch\n  transformResponse: [function (data) {\n    // Do whatever you want to transform the data\n\n    return data;\n  }],\n\n  // `headers` are custom headers to be sent\n  headers: {'X-Requested-With': 'XMLHttpRequest'},\n\n  // `params` are the URL parameters to be sent with the request\n  // Must be a plain object or a URLSearchParams object\n  params: {\n    ID: 12345\n  },\n\n  // `paramsSerializer` is an optional function in charge of serializing `params`\n  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)\n  paramsSerializer: function(params) {\n    return Qs.stringify(params, {arrayFormat: 'brackets'})\n  },\n\n  // `data` is the data to be sent as the request body\n  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'\n  // When no `transformRequest` is set, must be of one of the following types:\n  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams\n  // - Browser only: FormData, File, Blob\n  // - Node only: Stream, Buffer\n  data: {\n    firstName: 'Fred'\n  },\n\n  // `timeout` specifies the number of milliseconds before the request times out.\n  // If the request takes longer than `timeout`, the request will be aborted.\n  timeout: 1000, // default is `0` (no timeout)\n\n  // `withCredentials` indicates whether or not cross-site Access-Control requests\n  // should be made using credentials\n  withCredentials: false, // default\n\n  // `adapter` allows custom handling of requests which makes testing easier.\n  // Return a promise and supply a valid response (see lib/adapters/README.md).\n  adapter: function (config) {\n    /* ... */\n  },\n\n  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.\n  // This will set an `Authorization` header, overwriting any existing\n  // `Authorization` custom headers you have set using `headers`.\n  auth: {\n    username: 'janedoe',\n    password: 's00pers3cret'\n  },\n\n  // `responseType` indicates the type of data that the server will respond with\n  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'\n  responseType: 'json', // default\n\n  // `responseEncoding` indicates encoding to use for decoding responses\n  // Note: Ignored for `responseType` of 'stream' or client-side requests\n  responseEncoding: 'utf8', // default\n\n  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token\n  xsrfCookieName: 'XSRF-TOKEN', // default\n\n  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value\n  xsrfHeaderName: 'X-XSRF-TOKEN', // default\n\n  // `onUploadProgress` allows handling of progress events for uploads\n  onUploadProgress: function (progressEvent) {\n    // Do whatever you want with the native progress event\n  },\n\n  // `onDownloadProgress` allows handling of progress events for downloads\n  onDownloadProgress: function (progressEvent) {\n    // Do whatever you want with the native progress event\n  },\n\n  // `maxContentLength` defines the max size of the http response content in bytes allowed\n  maxContentLength: 2000,\n\n  // `validateStatus` defines whether to resolve or reject the promise for a given\n  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`\n  // or `undefined`), the promise will be resolved; otherwise, the promise will be\n  // rejected.\n  validateStatus: function (status) {\n    return status >= 200 && status < 300; // default\n  },\n\n  // `maxRedirects` defines the maximum number of redirects to follow in node.js.\n  // If set to 0, no redirects will be followed.\n  maxRedirects: 5, // default\n\n  // `socketPath` defines a UNIX Socket to be used in node.js.\n  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.\n  // Only either `socketPath` or `proxy` can be specified.\n  // If both are specified, `socketPath` is used.\n  socketPath: null, // default\n\n  // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http\n  // and https requests, respectively, in node.js. This allows options to be added like\n  // `keepAlive` that are not enabled by default.\n  httpAgent: new http.Agent({ keepAlive: true }),\n  httpsAgent: new https.Agent({ keepAlive: true }),\n\n  // 'proxy' defines the hostname and port of the proxy server.\n  // You can also define your proxy using the conventional `http_proxy` and\n  // `https_proxy` environment variables. If you are using environment variables\n  // for your proxy configuration, you can also define a `no_proxy` environment\n  // variable as a comma-separated list of domains that should not be proxied.\n  // Use `false` to disable proxies, ignoring environment variables.\n  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and\n  // supplies credentials.\n  // This will set an `Proxy-Authorization` header, overwriting any existing\n  // `Proxy-Authorization` custom headers you have set using `headers`.\n  proxy: {\n    host: '127.0.0.1',\n    port: 9000,\n    auth: {\n      username: 'mikeymike',\n      password: 'rapunz3l'\n    }\n  },\n\n  // `cancelToken` specifies a cancel token that can be used to cancel the request\n  // (see Cancellation section below for details)\n  cancelToken: new CancelToken(function (cancel) {\n  })\n}\n")),a.a.createElement(o.MDXTag,{name:"h2",components:n,props:{id:"response-schema"}},"Response Schema"),a.a.createElement(o.MDXTag,{name:"p",components:n},"The response for a request contains the following information."),a.a.createElement(o.MDXTag,{name:"pre",components:n},a.a.createElement(o.MDXTag,{name:"code",components:n,parentName:"pre",props:{className:"language-javascript"}},"{\n  // `data` is the response that was provided by the server\n  data: {},\n\n  // `status` is the HTTP status code from the server response\n  status: 200,\n\n  // `statusText` is the HTTP status message from the server response\n  statusText: 'OK',\n\n  // `headers` the headers that the server responded with\n  // All header names are lower cased\n  headers: {},\n\n  // `config` is the config that was provided to `axios` for the request\n  config: {},\n\n  // `request` is the request that generated this response\n  // It is the last ClientRequest instance in node.js (in redirects)\n  // and an XMLHttpRequest instance the browser\n  request: {}\n}\n")))}}}]);