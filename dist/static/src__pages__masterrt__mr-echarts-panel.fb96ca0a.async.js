webpackJsonp([10],{TzNo:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"default",function(){return q});var l=n("0qmw"),a=n.n(l),r=n("Z60a"),c=n.n(r),m=n("C9uT"),u=n.n(m),s=n("T/v0"),i=n.n(s),E=n("j/rp"),d=n.n(E),o=n("GiK3"),h=(n.n(o),n("SeCA")),p=(n.n(h),n("H0wm")),M=n("qNGt"),v=n.n(M),y=n("rpGq"),q=function(e){function t(){var e;return c()(this,t),e=i()(this,(t.__proto__||a()(t)).apply(this,arguments)),e.req={api:"line",method:"get",transform:function(e){return h.map(e,function(e){return e.name=e.type,e.x=e.date,e.value=e.volume,e})}},e.pie=[{value:78499,name:"A0"},{value:131536,name:"A Entry"},{value:246050,name:"A Main"},{value:284390,name:"A Plus"},{value:394088,name:"B"},{value:35022,name:"C"},{value:316762,name:"SUV"},{value:34069,name:"MPV"}],e.state={req:e.req},e.code="\n        <MrEchartsPanel\n                title=\"Use Data\"\n                style={{height: 400}} chartTypes={'pie::ring::rose'} data={pie} />\n\n        <MrEchartsPanel\n            title=\"Use Req\"\n            style={{height: 400}} chartTypes={'line'} req={req} />\n    ",e}return d()(t,e),u()(t,[{key:"render",value:function(){var e=this.pie,t=this.state.req;return o.createElement("article",{className:"mrs-article mrs-MrFill"},o.createElement("header",null,"MrEchartsPanel ",o.createElement("small",null,"\u4e00\u4e2a\u57fa\u4e8eMrPanel, MrReq, MrEcharts \u96c6\u6210\u7684\u663e\u793aUI")),o.createElement("ins",null,"\u652f\u6301\u5404\u79cd\u6fc0\u6d3bEcharts\u65b9\u5f0f\uff0c\u4ee5\u53ca\u4f7f\u7528Tool\u63a7\u5236Echarts\u663e\u793a\u65b9\u5f0f"),o.createElement("main",null,o.createElement(v.a,{bindings:{pie:e,req:t},components:{MrFill:p.f,MrCol:p.b,MrEchartsPanel:p.d},jsx:this.code})),o.createElement("details",{className:"mt-16"},o.createElement("summary",null,"\u67e5\u770b\u6e90\u7801"),o.createElement(y.a,{code:this.code})),o.createElement("aside",{className:"mt-16"},o.createElement(p.i,{title:"MrEchartsPanel",border:"none"},o.createElement("table",null,o.createElement("tbody",null,o.createElement("tr",null,o.createElement("td",null,"title?: string"),o.createElement("td",null,"@MrPanel")),o.createElement("tr",null,o.createElement("td",null,"downloadName?: string = $title + $timestamp  "),o.createElement("td",null,"Echarts DataView \u6570\u636e\u4e0b\u8f7d\u6587\u4ef6\u540d\uff08\u9700\u8981\u540e\u7f00\u540d\uff09")),o.createElement("tr",null,o.createElement("td",null,"data?: any[","]"),o.createElement("td",null,"@MrEcharts")),o.createElement("tr",null,o.createElement("td",null,"dataType?: string"),o.createElement("td",null,"@MrEcharts")),o.createElement("tr",null,o.createElement("td",null,"dataModel?: string"),o.createElement("td",null,"@MrEcharts")),o.createElement("tr",null,o.createElement("td",null,"chartTypes?: string"),o.createElement("td",null,"@MrEcharts")),o.createElement("tr",null,o.createElement("td",null,"h100?: boolean = true"),o.createElement("td",null,"style.height = 100% !important")))))))}}]),t}(o.Component)}});