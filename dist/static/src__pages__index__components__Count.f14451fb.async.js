webpackJsonp([5],{"4D4U":function(e,t,n){"use strict";function i(e){var t=e.dispatch,n=e.count,i=e.global;return r.a.createElement("div",null,r.a.createElement("h2",null,i.text),r.a.createElement("div",null,"Count: ",n),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(o.a,{type:"primary",onClick:function(){t({type:"count/increase"})}},"Increase"),r.a.createElement(o.a,{type:"ghost",onClick:function(){t({type:"count/decrease"})}},"Decrease")))}Object.defineProperty(t,"__esModule",{value:!0});var o=(n("crfj"),n("zwGx")),a=n("GiK3"),r=n.n(a),l=n("S6G3");n.n(l);t.default=Object(l.connect)(function(e){return{count:e.count,global:e.global}})(i)},I11u:function(e,t){},crfj:function(e,t,n){"use strict";var i=n("vtiu"),o=(n.n(i),n("I11u"));n.n(o)},zwGx:function(e,t,n){"use strict";function i(e){return"string"==typeof e}function o(e,t){if(null!=e){var n=t?" ":"";return"string"!=typeof e&&"number"!=typeof e&&i(e.type)&&j(e.props.children)?g.cloneElement(e,{},e.props.children.split("").join(n)):"string"==typeof e?(j(e)&&(e=e.split("").join(n)),g.createElement("span",null,e)):e}}var a=n("Dd8w"),r=n.n(a),l=n("bOdI"),s=n.n(l),c=n("Zrlr"),u=n.n(c),h=n("wxAW"),p=n.n(h),f=n("zwoO"),d=n.n(f),m=n("Pf15"),y=n.n(m),g=n("GiK3"),v=n("O27J"),C=n("KSGD"),b=n.n(C),O=n("HW6M"),w=n.n(O),T=n("JkBm"),k=n("FC3+"),N=this&&this.__rest||function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&(n[i[o]]=e[i[o]]);return n},x=/^[\u4e00-\u9fa5]{2}$/,j=x.test.bind(x),_=function(e){function t(e){u()(this,t);var n=d()(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleClick=function(e){n.setState({clicked:!0}),clearTimeout(n.timeout),n.timeout=window.setTimeout(function(){return n.setState({clicked:!1})},500);var t=n.props.onClick;t&&t(e)},n.state={loading:e.loading,clicked:!1,hasTwoCNChar:!1},n}return y()(t,e),p()(t,[{key:"componentDidMount",value:function(){this.fixTwoCNChar()}},{key:"componentWillReceiveProps",value:function(e){var t=this,n=this.props.loading,i=e.loading;n&&clearTimeout(this.delayTimeout),"boolean"!=typeof i&&i&&i.delay?this.delayTimeout=window.setTimeout(function(){return t.setState({loading:i})},i.delay):this.setState({loading:i})}},{key:"componentDidUpdate",value:function(){this.fixTwoCNChar()}},{key:"componentWillUnmount",value:function(){this.timeout&&clearTimeout(this.timeout),this.delayTimeout&&clearTimeout(this.delayTimeout)}},{key:"fixTwoCNChar",value:function(){var e=Object(v.findDOMNode)(this),t=e.textContent||e.innerText;this.isNeedInserted()&&j(t)?this.state.hasTwoCNChar||this.setState({hasTwoCNChar:!0}):this.state.hasTwoCNChar&&this.setState({hasTwoCNChar:!1})}},{key:"isNeedInserted",value:function(){var e=this.props,t=e.loading,n=e.icon,i=e.children,o=t?"loading":n;return 1===g.Children.count(i)&&(!o||"loading"===o)}},{key:"render",value:function(){var e,t=this,n=this.props,i=n.type,a=n.shape,l=n.size,c=n.className,u=n.htmlType,h=n.children,p=n.icon,f=n.prefixCls,d=n.ghost,m=N(n,["type","shape","size","className","htmlType","children","icon","prefixCls","ghost"]),y=this.state,v=y.loading,C=y.clicked,b=y.hasTwoCNChar,O="";switch(l){case"large":O="lg";break;case"small":O="sm"}var x=m.href?"a":"button",j=w()(f,c,(e={},s()(e,f+"-"+i,i),s()(e,f+"-"+a,a),s()(e,f+"-"+O,O),s()(e,f+"-icon-only",!h&&p),s()(e,f+"-loading",v),s()(e,f+"-clicked",C),s()(e,f+"-background-ghost",d),s()(e,f+"-two-chinese-chars",b),e)),_=v?"loading":p,E=_?g.createElement(k.a,{type:_}):null,S=h||0===h?g.Children.map(h,function(e){return o(e,t.isNeedInserted())}):null;return g.createElement(x,r()({},Object(T.a)(m,["loading"]),{type:m.href?void 0:u||"button",className:j,onClick:this.handleClick}),E,S)}}]),t}(g.Component),E=_;_.__ANT_BUTTON=!0,_.defaultProps={prefixCls:"ant-btn",loading:!1,ghost:!1},_.propTypes={type:b.a.string,shape:b.a.oneOf(["circle","circle-outline"]),size:b.a.oneOf(["large","default","small"]),htmlType:b.a.oneOf(["submit","button","reset"]),onClick:b.a.func,loading:b.a.oneOfType([b.a.bool,b.a.object]),className:b.a.string,icon:b.a.string};var S=this&&this.__rest||function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var o=0,i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&(n[i[o]]=e[i[o]]);return n},P=function(e){var t=e.prefixCls,n=void 0===t?"ant-btn-group":t,i=e.size,o=e.className,a=S(e,["prefixCls","size","className"]),l="";switch(i){case"large":l="lg";break;case"small":l="sm"}var c=w()(n,s()({},n+"-"+l,l),o);return g.createElement("div",r()({},a,{className:c}))},z=P;E.Group=z;t.a=E}});