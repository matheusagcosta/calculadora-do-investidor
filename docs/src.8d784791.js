parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"mT7B":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.reset=exports.setBorderColor=exports.onAddClick=exports.updateVal=void 0;var e=0,t=0,n=0,i=[],s=[],o=[],a=0,m="",r="";window.addEventListener("keydown",function(e){if(("U+000A"==e.keyIdentifier||"Enter"==e.keyIdentifier||13==e.keyCode)&&"INPUT"==e.target.nodeName&&"text"==e.target.type)return e.preventDefault(),!1},!0);var c=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",minimumFractionDigits:2}),u=function(e){if(d(e)){B(m,r,"update",e),L(i),w();for(var t=0;t<document.getElementsByClassName("mid-price--info").length;t++)g("quantity".concat(t),"none"),g("price".concat(t),"none")}};exports.updateVal=u;var l=function(){if(d(a)){B(m,r,"new"),C(a),_(a),b(a),L(i),p(),w();for(var e=0;e<document.getElementsByClassName("mid-price--info").length-1;e++)s[e]&&I(e),x(e);for(var t=0;t<document.getElementsByClassName("mid-price--info").length;t++)g("quantity".concat(t),"none"),g("price".concat(t),"none");a+=1}};exports.onAddClick=l;var d=function(e){return m=document.getElementsByName("quantity-mp__input")[e].value,r=document.getElementsByName("price-mp__input")[e].value,!!y(m,r,e)&&(m=parseInt(m),r=parseFloat(f(r)),!0)},p=function(){for(var e=0;e<document.getElementsByClassName("mid-price--info").length-1;e++)document.getElementsByName("quantity-mp__input")[e].setAttribute("class","values--info values-mp--info readonly"),document.getElementsByName("quantity-mp__input")[e].setAttribute("readonly","true"),document.getElementsByName("price-mp__input")[e].setAttribute("class","values--info values-mp--info readonly"),document.getElementsByName("price-mp__input")[e].setAttribute("readonly","true")},f=function(e){return e.replace(/,/g,".")&&(e=e.replace(/,/g,".")),e},g=function(e,t){document.getElementById("".concat(e)).setAttribute("style","border-color: ".concat(t,";"))};exports.setBorderColor=g;var y=function(e,t,n){return v(e,t,n),E(e,t,n)},v=function(e,t,n){var i=!0;return 0==e&&(g("quantity".concat(n),"red"),document.getElementById("results-mp--total").innerHTML="-",document.getElementById("results-mp--average").innerHTML="R$ -",i=!1),0==t&&(g("price".concat(n),"red"),document.getElementById("results-mp--total").innerHTML="-",document.getElementById("results-mp--average").innerHTML="R$ -",i=!1),i},E=function(e,t,n){var i=!0,s=new RegExp("[0-9]+"),o=new RegExp("[0-9]+(,|.)?[0-9]*"),a=s.exec(e),m=o.exec(t);return null==a&&(g("quantity".concat(n),"red"),document.getElementById("results-mp--total").innerHTML="-",document.getElementById("results-mp--average").innerHTML="R$ -",i=!1),null==m&&(g("price".concat(n),"red"),document.getElementById("results-mp--total").innerHTML="-",document.getElementById("results-mp--average").innerHTML="R$ -",i=!1),i},B=function(s,o){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",m=arguments.length>3?arguments[3]:void 0;"new"==a&&N(s,o),"update"==a&&h(s,o,m),e=1==i.length?i[0][1].toFixed(2):(n/t).toFixed(2)},N=function(e,s){var o=[];o.push(e),o.push(s),i.push(o),o=[],t+=e,n+=e*s},h=function(e,s,o){t-=i[o][0],n-=i[o][0]*i[o][1],i[o][0]=e,i[o][1]=s,t+=e,n+=e*s},_=function(e){2==document.getElementsByClassName("mid-price--info").length&&document.getElementsByClassName("mid-price--info")[0].setAttribute("class","info mid-price--info is-bigger"),document.getElementsByClassName("mid-price--info")[e+1].setAttribute("class","info mid-price--info is-bigger")},b=function(e){document.getElementsByClassName("trash-button")[e].className="trash-button is-shown"},C=function(e){var t='\n    <div class="info mid-price--info">\n      <div class="quantity--info">\n        <label for="quantity-mp__input"  class="text--info">Quantidade:</label>\n        <input type="text" class="values--info values-mp--info" name="quantity-mp__input" id="quantity'.concat(e+1,'" placeholder="0" autocomplete="off" min="0" value="">\n      </div>\n      <div class="price--info">\n        <label for="price-mp__input" class="text--info">Preço:</label>\n        <input type="text" class="values--info values-mp--info" name="price-mp__input" id="price').concat(e+1,'" placeholder="R$ 0,00" autocomplete="off" min="0" value=""> \n      </div>\n      <div class="trash-button">\n        <button class="trash" id="trash').concat(e+1,'" title="Limpar"></button>\n      </div>\n    </div>\n  ');document.getElementById("mid-price--section").innerHTML+=t},x=function(e){var t=function(){q(e)},n=function(){u(e)};document.getElementsByClassName("trash")[e].addEventListener("click",t),document.getElementsByName("quantity-mp__input")[e].addEventListener("input",n),document.getElementsByName("price-mp__input")[e].addEventListener("input",n),s[e]?s[e]=t:s.push(t),o[e]?o[e]=n:o.push(n)},I=function(e){document.getElementsByClassName("trash")[e].removeEventListener("click",s[e]),document.getElementsByName("quantity-mp__input")[e].removeEventListener("input",o[e]),document.getElementsByName("price-mp__input")[e].removeEventListener("input",o[e])},L=function(e){for(var t=0;t<document.getElementsByClassName("mid-price--info").length-1;t++)document.getElementsByName("quantity-mp__input")[t].setAttribute("value","".concat(e[t][0])),document.getElementsByName("price-mp__input")[t].setAttribute("value","".concat(c.format(e[t][1].toFixed(2))))},q=function(e){for(var t=0;t<document.getElementsByClassName("trash").length-1;t++)s[t]&&I(t);document.getElementsByClassName("mid-price--info")[e].remove();for(var n=0;n<document.getElementsByClassName("trash").length-1;n++)x(n);for(var o=0;o<document.getElementsByClassName("mid-price--info").length;o++)M(o);A(i,e),L(i),T(i),w(),a-=1,1==document.getElementsByClassName("mid-price--info").length&&H()},A=function(e,i){e[i]&&(t-=e[i][0],n-=e[i][0]*e[i][1],e.splice(i,1))},M=function(e){document.getElementsByClassName("trash")[e].setAttribute("id","trash".concat(e)),document.getElementsByName("quantity-mp__input")[e].setAttribute("id","quantity".concat(e)),document.getElementsByName("price-mp__input")[e].setAttribute("id","price".concat(e))},T=function(i){0==i.length?(t=0,e=(e=0).toFixed(2)):e=1==i.length?i[0][1].toFixed(2):(n/t).toFixed(2)},H=function(){document.getElementsByClassName("mid-price--info")[0].setAttribute("class","info mid-price--info"),a=0},w=function(){document.getElementById("results-mp--total").innerHTML="".concat(t),document.getElementById("results-mp--average").innerHTML="R$ ".concat(e),0==t&&0==e?(document.getElementById("results-mp").className="results",document.getElementById("reset").className="reset"):(document.getElementById("results-mp").className="results is-bigger",document.getElementById("reset").className="reset is-shown")},R=function(){if(document.getElementsByClassName("mid-price--info").length>1)if(document.getElementsByClassName("mid-price--info").length>2){for(var e=document.getElementsByClassName("mid-price--info").length-2;e>0;e--)q(e);q(0)}else q(0)};exports.reset=R;
},{}],"qlpM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.attSimuResults=exports.handleComma=exports.blockChar=void 0;var e=function(e){var t=e.charCode;0!=t&&(t<44||t>57||45==t||47==t)&&e.preventDefault()};exports.blockChar=e;var t=function(e){return e.replace(/,/g,".")&&(e=e.replace(/,/g,".")),e};exports.handleComma=t;var n=function(){var e=c();e[0][0]&&e[0][1]?document.getElementById("results-simu-starter").innerHTML="R$ ".concat(e[1]):document.getElementById("results-simu-starter").innerHTML="R$ 0,00",e[0][1]&&e[0][2]?(document.getElementById("results-simu-percent").innerHTML="R$ 0,00 (".concat(e[3],"%)"),i(e[3])):(document.getElementById("results-simu-percent").innerHTML="R$ 0,00 (0%)",a("results-simu-percent","#DBDEF9")),e[0][0]&&e[0][2]?document.getElementById("results-simu-total").innerHTML="R$ ".concat(e[4]):document.getElementById("results-simu-total").innerHTML="R$ 0,00",e[0][0]&&e[0][1]&&e[0][2]&&(document.getElementById("results-simu-percent").innerHTML="R$ ".concat(e[2]," (").concat(e[3],"%)"),i(e[3]))};exports.attSimuResults=n;var r=function(){var e=document.getElementById("quantity-simu").value;return""==e?e:(e=t(e),e=parseInt(e),parseInt(e))},u=function(){var e=document.getElementById("Bprice-simu").value;return""==e?e:(e=t(e),e=parseFloat(e).toFixed(2),parseFloat(e))},o=function(){var e=document.getElementById("Tprice-simu").value;return""==e?e:(e=t(e),e=parseFloat(e).toFixed(2),parseFloat(e))},s=function(e,t,n){var r=[!0,!0,!0];return""==e&&(r[0]=!1),""==t&&(r[1]=!1),""==n&&(r[2]=!1),r},c=function(){var e=r(),t=u(),n=o(),c=100*(n/t-1);return[s(e,t,n),(e*t).toFixed(2),(e*(n-t)).toFixed(2),c=c.toFixed(2),(e*n).toFixed(2)]},a=function(e,t){document.getElementById("".concat(e)).setAttribute("style","color: ".concat(t,";"))},i=function(e){a("results-simu-percent",e>0?"#89F5E2":e<0?"#F5899D":"#DBDEF9")};
},{}],"n5Do":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.attLeftPercentResults=void 0;var e=require("./simulation"),t=function(e){if("left"==e){var t=a();t[0]?document.getElementById("results-percent-left").innerHTML="".concat(t[1].toFixed(2)):document.getElementById("results-percent-left").innerHTML="0"}if("middle"==e){var n=u();n[0]?(document.getElementById("results-percent-middle").innerHTML="".concat(n[1].toFixed(2)),console.log(n)):document.getElementById("results-percent-middle").innerHTML="0"}if("right"==e){var r=m();r[0]?(document.getElementById("results-percent-right").innerHTML="".concat(r[1].toFixed(2),"%"),console.log(r)):document.getElementById("results-percent-right").innerHTML="0%"}};exports.attLeftPercentResults=t;var n=function(){var t=document.getElementById("percentage-percentLeft").value;return""==t?t:(t=(0,e.handleComma)(t),t=parseFloat(t),parseFloat(t))},r=function(){var t=document.getElementById("amount-percentLeft").value;return""==t?t:(t=(0,e.handleComma)(t),t=parseFloat(t),parseFloat(t))},a=function(){var e=n(),t=r();return""==e||""==t?[!1]:[!0,t*(e/100)]},o=function(){var t=document.getElementById("portion-percentMiddle").value;return""==t?t:(t=(0,e.handleComma)(t),t=parseFloat(t),parseFloat(t))},l=function(){var t=document.getElementById("percentage-percentMiddle").value;return""==t?t:(t=(0,e.handleComma)(t),t=parseFloat(t),parseFloat(t))},u=function(){var e=o(),t=l();return""==e||""==t||0==t?[!1]:[!0,e/(t/100)]},c=function(){var t=document.getElementById("portion-percentRight").value;return""==t?t:(t=(0,e.handleComma)(t),t=parseFloat(t),parseFloat(t))},d=function(){var t=document.getElementById("total-percentRight").value;return""==t?t:(t=(0,e.handleComma)(t),t=parseFloat(t),parseFloat(t))},m=function(){var e=c(),t=d();return""==e||""==t||0==t?[!1]:[!0,e/t*100]};
},{"./simulation":"qlpM"}],"Focm":[function(require,module,exports) {
"use strict";var e=require("./js/midprice"),t=require("./js/simulation"),r=require("./js/percentage");document.querySelector("#add").addEventListener("click",e.onAddClick),document.querySelector("#reset").addEventListener("click",e.reset),document.querySelector("#quantity-simu").addEventListener("keypress",t.blockChar),document.querySelector("#quantity-simu").addEventListener("input",t.attSimuResults),document.querySelector("#Bprice-simu").addEventListener("keypress",t.blockChar),document.querySelector("#Bprice-simu").addEventListener("input",t.attSimuResults),document.querySelector("#Tprice-simu").addEventListener("keypress",t.blockChar),document.querySelector("#Tprice-simu").addEventListener("input",t.attSimuResults),document.querySelector("#percentage-percentLeft").addEventListener("keypress",t.blockChar),document.querySelector("#percentage-percentLeft").addEventListener("input",function(){(0,r.attLeftPercentResults)("left")}),document.querySelector("#amount-percentLeft").addEventListener("keypress",t.blockChar),document.querySelector("#amount-percentLeft").addEventListener("input",function(){(0,r.attLeftPercentResults)("left")}),document.querySelector("#portion-percentMiddle").addEventListener("keypress",t.blockChar),document.querySelector("#portion-percentMiddle").addEventListener("input",function(){(0,r.attLeftPercentResults)("middle")}),document.querySelector("#percentage-percentMiddle").addEventListener("keypress",t.blockChar),document.querySelector("#percentage-percentMiddle").addEventListener("input",function(){(0,r.attLeftPercentResults)("middle")}),document.querySelector("#portion-percentRight").addEventListener("keypress",t.blockChar),document.querySelector("#portion-percentRight").addEventListener("input",function(){(0,r.attLeftPercentResults)("right")}),document.querySelector("#total-percentRight").addEventListener("keypress",t.blockChar),document.querySelector("#total-percentRight").addEventListener("input",function(){(0,r.attLeftPercentResults)("right")});
},{"./js/midprice":"mT7B","./js/simulation":"qlpM","./js/percentage":"n5Do"}]},{},["Focm"], null)
//# sourceMappingURL=src.8d784791.js.map