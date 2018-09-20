(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"./src/lib/mr-echarts/mr-echarts.mdx":function(e,a,n){"use strict";n.r(a);var t=n("./node_modules/react/index.js"),r=n.n(t),s=n("./node_modules/@mdx-js/tag/dist/index.js"),o=n("./node_modules/docz/dist/index.m.js"),c=n("./src/lib/mr-echarts/mr-echarts.component.tsx");function m(e,a){if(null==e)return{};var n,t,r=function(e,a){if(null==e)return{};var n,t,r={},s=Object.keys(e);for(t=0;t<s.length;t++)n=s[t],a.indexOf(n)>=0||(r[n]=e[n]);return r}(e,a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(t=0;t<s.length;t++)n=s[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}a.default=function(e){var a=e.components,n=m(e,["components"]);return r.a.createElement(s.MDXTag,{name:"wrapper",components:a},r.a.createElement(s.MDXTag,{name:"h1",components:a,props:{id:"mrecharts"}},"MrEcharts"),r.a.createElement(s.MDXTag,{name:"blockquote",components:a},r.a.createElement(s.MDXTag,{name:"p",components:a,parentName:"blockquote"},"\u5feb\u901f\u6784\u5efaEcharts\u56fe\u8868")),r.a.createElement(s.MDXTag,{name:"h2",components:a,props:{id:"basic-usage"}},"Basic usage"),r.a.createElement(o.Playground,{__position:0,__code:"<section style={{ height: 300 }}>\n  <MrEcharts\n    data={[\n      { name: 'A', value: 80 },\n      { name: 'B', value: 150 },\n      { name: 'c', value: 120 },\n      { name: 'd', value: 190 },\n    ]}\n    chartTypes=\"pie\"\n  />\n</section>",__scope:{props:n,MrEcharts:c.a}},r.a.createElement("section",{style:{height:300}},r.a.createElement(c.a,{data:[{name:"A",value:80},{name:"B",value:150},{name:"c",value:120},{name:"d",value:190}],chartTypes:"pie"}))),r.a.createElement(s.MDXTag,{name:"h2",components:a,props:{id:"subtypes"}},"SubTypes"),r.a.createElement(o.Playground,{__position:1,__code:"<section style={{ height: 300 }}>\n  <MrEcharts\n    data={[\n      { name: 'A', value: 80 },\n      { name: 'B', value: 150 },\n      { name: 'c', value: 120 },\n      { name: 'd', value: 190 },\n    ]}\n    chartTypes=\"pie::ring::rose\"\n  />\n</section>",__scope:{props:n,MrEcharts:c.a}},r.a.createElement("section",{style:{height:300}},r.a.createElement(c.a,{data:[{name:"A",value:80},{name:"B",value:150},{name:"c",value:120},{name:"d",value:190}],chartTypes:"pie::ring::rose"}))),r.a.createElement(s.MDXTag,{name:"h2",components:a,props:{id:"properties"}},"Properties"),r.a.createElement(o.PropsTable,{of:c.a}))}}}]);