// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/code.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.attFooter = exports.onAddClick = void 0;
var avgPrice = 0;
var tot = 0;
var products = 0;
var arrValues = [];
var arrFunct = [];
var activedInfo = 0;
var valueQ = "";
var valueP = "";
window.addEventListener("keydown", function (e) {
  if (e.keyIdentifier == "U+000A" || e.keyIdentifier == "Enter" || e.keyCode == 13) {
    if (e.target.nodeName == "INPUT" && e.target.type == "text") {
      e.preventDefault();
      return false;
    }
  }
}, true);
var money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2
});

var onAddClick = function onAddClick() {
  if (validateInputs(activedInfo)) {
    calcNewValues(valueQ, valueP);
    generateNewInfo(activedInfo);
    setBiggerInfo(activedInfo);
    showTrashButton(activedInfo);
    keepValuesOnDisplay(arrValues);
    attFooter();

    for (var index = 0; index < document.getElementsByClassName("trash").length - 1; index++) {
      if (arrFunct[index]) {
        remTrashClick(index);
      }

      ;
      addTrashClick(index);
    }

    ;

    for (var count = 0; count < document.getElementsByClassName("info").length; count++) {
      setBorderColor("quantity".concat(activedInfo), "none");
      setBorderColor("price".concat(activedInfo), "none");
    }

    activedInfo += 1;
  }

  ;
};

exports.onAddClick = onAddClick;

var handleComma = function handleComma(valueP) {
  if (valueP.replace(/,/g, ".")) {
    valueP = valueP.replace(/,/g, ".");
  }

  ;
  return valueP;
};

var setBorderColor = function setBorderColor(id, color) {
  document.getElementById("".concat(id)).setAttribute("style", "border-color: ".concat(color, ";"));
};

var visualError = function visualError(valueQ, valueP, activedInfo) {
  var result = true;

  if (valueQ == 0) {
    setBorderColor("quantity".concat(activedInfo), "red");
    result = false;
  }

  ;

  if (valueP == 0) {
    setBorderColor("price".concat(activedInfo), "red");
    result = false;
  }

  ;
  return result;
};

var validateInputs = function validateInputs(activedInfo) {
  var validateQuantity = new RegExp("[0-9]+");
  var validatePrice = new RegExp("[0-9]+(,|.)?[0-9]*");
  valueQ = document.getElementsByName("quantityN")[activedInfo].value;
  valueP = document.getElementsByName("priceN")[activedInfo].value;

  if (visualError(valueQ, valueP, activedInfo)) {
    valueQ = parseInt(validateQuantity.exec(valueQ)[0]);
    valueP = parseFloat(handleComma(validatePrice.exec(valueP)[0]));
    return true;
  } else {
    return false;
  }

  ;
};

var calcNewValues = function calcNewValues(valueQ, valueP) {
  var arrTemp = [];
  arrTemp.push(valueQ);
  arrTemp.push(valueP);
  arrValues.push(arrTemp);
  arrTemp = [];
  tot += valueQ;
  products += valueQ * valueP;

  if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2);
  } else {
    avgPrice = (products / tot).toFixed(2);
  }

  ;
};

var setBiggerInfo = function setBiggerInfo(activedInfo) {
  if (document.getElementsByClassName("info").length == 2) {
    document.getElementsByClassName("info")[0].setAttribute("class", "info is-bigger");
  }

  document.getElementsByClassName("info")[activedInfo + 1].setAttribute("class", "info is-bigger");
};

var showTrashButton = function showTrashButton(activedInfo) {
  document.getElementsByClassName("trash_button")[activedInfo].className = "trash_button is-shown";
};

var generateNewInfo = function generateNewInfo(activedInfo) {
  var html = "\n    <div class=\"info\">\n      <div class=\"qInfo\">\n        <label for=\"quantityN\"  class=\"textInfo\">Quantidade:</label>\n        <input type=\"text\" class=\"valuesInfo\" name=\"quantityN\" id=\"quantity".concat(activedInfo + 1, "\" placeholder=\"0\" autocomplete=\"off\" min=\"0\" value=\"\">\n      </div>\n      <div class=\"pInfo\">\n        <label for=\"priceN\" class=\"textInfo\">Pre\xE7o:</label>\n        <input type=\"text\" class=\"valuesInfo\" name=\"priceN\" id=\"price").concat(activedInfo + 1, "\" placeholder=\"R$ 0,00\" autocomplete=\"off\" min=\"0\" value=\"\"> \n      </div>\n      <div class=\"trash_button\" id=\"trash_button\">\n        <button class=\"trash\" id=\"trash").concat(activedInfo + 1, "\"></button>\n      </div>\n    </div>\n  ");
  document.getElementById("section").innerHTML += html;
};

var addTrashClick = function addTrashClick(selector) {
  var callRemove = function callRemove() {
    removeInfo(selector);
  };

  document.getElementsByClassName("trash")[selector].addEventListener("click", callRemove);

  if (arrFunct[selector]) {
    arrFunct[selector] = callRemove;
  } else {
    arrFunct.push(callRemove);
  }

  ;
};

var remTrashClick = function remTrashClick(selector) {
  document.getElementsByClassName("trash")[selector].removeEventListener("click", arrFunct[selector]);
};

var keepValuesOnDisplay = function keepValuesOnDisplay(arrValues) {
  for (var u = 0; u < document.getElementsByClassName("info").length - 1; u++) {
    document.getElementsByName("quantityN")[u].setAttribute("value", "".concat(arrValues[u][0]));
    document.getElementsByName("priceN")[u].setAttribute("value", "".concat(arrValues[u][1].toFixed(2)));
  }

  ;
};

var removeInfo = function removeInfo(trashID) {
  for (var index = 0; index < document.getElementsByClassName("trash").length - 1; index++) {
    if (arrFunct[index]) {
      remTrashClick(index);
    }

    ;
  }

  ;
  document.getElementsByClassName("info")[trashID].remove();

  for (var _index = 0; _index < document.getElementsByClassName("trash").length - 1; _index++) {
    addTrashClick(_index);
  }

  ;

  for (var id = 0; id < document.getElementsByClassName("info").length; id++) {
    changeId(id);
  }

  ;
  recalcValues(arrValues, trashID);
  keepValuesOnDisplay(arrValues);
  handleValues(arrValues);
  attFooter();
  activedInfo -= 1;

  if (document.getElementsByClassName("info").length == 1) {
    uniqueInfo();
  }

  ;
};

var recalcValues = function recalcValues(arrValues, trashID) {
  if (arrValues[trashID]) {
    tot -= arrValues[trashID][0];
    products -= arrValues[trashID][0] * arrValues[trashID][1];
    arrValues.splice(trashID, 1);
  }

  ;
};

var changeId = function changeId(id) {
  document.getElementsByClassName("trash")[id].setAttribute("id", "trash".concat(id));
  document.getElementsByName("quantityN")[id].setAttribute("id", "quantity".concat(id));
  document.getElementsByName("priceN")[id].setAttribute("id", "price".concat(id));
};

var handleValues = function handleValues(arrValues) {
  if (arrValues.length == 0) {
    tot = 0;
    avgPrice = 0.0;
    avgPrice = avgPrice.toFixed(2);
  } else if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2);
  } else {
    avgPrice = (products / tot).toFixed(2);
  }

  ;
};

var uniqueInfo = function uniqueInfo() {
  document.getElementsByClassName("info")[0].setAttribute("class", "info");
  activedInfo = 0;
};

var attFooter = function attFooter() {
  document.getElementById("vTot").innerHTML = "".concat(tot);
  document.getElementById("vPM").innerHTML = "R$ ".concat(avgPrice);

  if (tot == 0 && avgPrice == 0) {
    document.getElementById("foot").className = "foot";
    document.getElementById("reset").className = "reset";
  } else {
    document.getElementById("foot").className = "foot is-bigger";
    document.getElementById("reset").className = "reset is-shown";
  }
};

exports.attFooter = attFooter;

var reset = function reset() {
  if (document.getElementsByClassName("info").length > 1) {
    if (document.getElementsByClassName("info").length > 2) {
      for (var w = document.getElementsByClassName("info").length - 2; w > 0; w--) {
        removeInfo(w);
      }

      removeInfo(0);
    } else {
      removeInfo(0);
    }
  }
};

exports.reset = reset;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _code = require("./code");

document.querySelector("#add").addEventListener("click", _code.onAddClick);
document.querySelector('#reset').addEventListener('click', _code.reset); //document.querySelector('#trash0').addEventListener('click', removeForm);
},{"./code":"js/code.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57887" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map