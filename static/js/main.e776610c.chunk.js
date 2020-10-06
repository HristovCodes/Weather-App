(this["webpackJsonpweather-app"]=this["webpackJsonpweather-app"]||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(20)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),i=a.n(c),s=(a(15),a(6)),o=a.n(s),l=a(9),u=a(2),h=a(3),p=a(1),m=a(5),d=a(4);a(17),a(18),a(19);var g=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={weather:"",city:"London",img:""},n.handleChange=n.handleChange.bind(Object(p.a)(n)),n.getWeather=n.getWeather.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"handleChange",value:function(e){this.setState({city:e})}},{key:"getWeather",value:function(){var e=Object(l.a)(o.a.mark((function e(){var t,a,n,r,c,i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=this.state.city,"COlR5onLXsJ6oE1BvpkdrXcuIniiF-eV-3Btzzx49yQ",a="10c5fbc8f53a296d3b3b5286da23dc96",e.next=6,fetch("https://geocode.search.hereapi.com/v1/geocode?q="+t+"&apiKey=COlR5onLXsJ6oE1BvpkdrXcuIniiF-eV-3Btzzx49yQ",{mode:"cors"});case 6:return n=e.sent,e.next=9,n.json();case 9:return r=e.sent,e.next=12,fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+r.items[0].position.lat+"&lon="+r.items[0].position.lng+"&units=imperial&exclude=minutely,daily,hourly&appid="+a,{mode:"cors"});case 12:return c=e.sent,e.next=15,c.json();case 15:return i=e.sent,s=i.current.weather[0].icon,this.setState({img:"http://openweathermap.org/img/wn/"+s+"@2x.png",weather:i}),e.abrupt("return",i);case 21:e.prev=21,e.t0=e.catch(0),console.log(e.t0);case 24:case"end":return e.stop()}}),e,this,[[0,21]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return""===this.state.weather&&this.getWeather(),r.a.createElement("div",{className:"Main"},r.a.createElement(f,{onSearch:this.getWeather,onChange:this.handleChange}),r.a.createElement(v,{data:this.state.weather,img:this.state.img}))}}]),a}(r.a.Component),f=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).handleChange=n.handleChange.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"handleChange",value:function(e){this.props.onChange(e.target.value)}},{key:"render",value:function(){return r.a.createElement("div",{className:"Search"},r.a.createElement("input",{className:"Input",onChange:this.handleChange,placeholder:"City name",type:"text"}),r.a.createElement("button",{className:"Button",onClick:this.props.onSearch},"Search"))}}]),a}(r.a.Component),v=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).state={unit:"c"},n.changeUnit=n.changeUnit.bind(Object(p.a)(n)),n}return Object(h.a)(a,[{key:"changeUnit",value:function(){"c"===this.state.unit?(document.getElementById("Switch").classList.replace("c","f"),this.setState({unit:"f"})):(this.setState({unit:"c"}),document.getElementById("Switch").classList.replace("f","c"))}},{key:"render",value:function(){var e="",t="";return""!==this.props.data&&(e=this.props.data,t=this.props.data.current.weather[0].description),r.a.createElement("div",{className:"Forecast"},r.a.createElement("p",{className:"Timezone"},e.timezone),r.a.createElement("button",{className:"Switch c",id:"Switch",onClick:this.changeUnit},this.state.unit),r.a.createElement(b,{desc:t,img:this.props.img}),r.a.createElement(E,{unit:this.state.unit,data:e,desc:t}))}}]),a}(r.a.Component),b=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"Image"},r.a.createElement("img",{src:this.props.img,alt:this.props.desc}))}}]),a}(r.a.Component),E=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(h.a)(a,[{key:"render",value:function(){if(""===this.props.data)return r.a.createElement("div",{className:"Description"},r.a.createElement("div",{className:"Loading"},"Loading\u2026"));var e="c"===this.props.unit?function(e,t){if("number"!==typeof e||"number"!==typeof t)return!1;var a=e>=0?1:-1;return(Math.round(e*Math.pow(10,t)+1e-4*a)/Math.pow(10,t)).toFixed(t)}(5*(this.props.data.current.temp-32)/9,1):this.props.data.current.temp;return r.a.createElement("div",{className:"Description"},r.a.createElement("p",null,r.a.createElement("span",null,"Weather Description:")," ",this.props.desc),r.a.createElement("p",null,r.a.createElement("span",null,"Temperature:")," ",e+" "+this.props.unit),r.a.createElement("p",null,r.a.createElement("span",null,"Humidity:")," ",this.props.data.current.humidity," %"),r.a.createElement("p",null,r.a.createElement("span",null,"Wind Speed:")," ",this.props.data.current.wind_speed," mph"),r.a.createElement("p",null,r.a.createElement("span",null,"Wind Direction:")," ",this.props.data.current.wind_deg,"\xb0"))}}]),a}(r.a.Component);var y=function(){return r.a.createElement(g,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.e776610c.chunk.js.map