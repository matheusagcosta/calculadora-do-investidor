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
exports.reset = exports.wipeOut = exports.attFooter = exports.onAddClick = void 0;
var avgPrice = 0;
var tot = 0;
var products = 0;
var arrValues = [];
var activedForm = 0;
var valueQ = "";
var valueP = "";
var z = 0;
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
  validateInputs(activedForm);
  calcNewValues(valueQ, valueP);
  generateNewForm(activedForm);
  setBiggerForm(activedForm);
  showTrashButton();
  keepValuesOnDisplay(arrValues);
  attFooter();
  activedForm += 1;
};

exports.onAddClick = onAddClick;

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

var wipeOut = function wipeOut(z) {
  // redo calculations and remove itens from the array
  if (arrValues[z]) {
    tot -= arrValues[z][0];
    products -= arrValues[z][0] * arrValues[z][1];
    arrValues.splice(z, 1);
  } // change next sections' id's


  for (u = z + 1; u < document.forms.length; u++) {
    if (u == document.forms.length - 1) {
      document.getElementById("add").setAttribute("onclick", "calcPrice(".concat(document.forms.length - 2, ")"));
      document.getElementById("trash".concat(u)).id = "trash".concat(u - 1);
    } else {
      document.getElementById("trash".concat(u)).setAttribute("onclick", "wipeOut(".concat(u - 1, ")"));
      document.getElementById("trash".concat(u)).id = "trash".concat(u - 1);
    }
  } // remove specified section


  document.forms[z].remove(); // att values from forms

  for (u = 0; u < document.forms.length - 1; u++) {
    document.getElementsByName("quantityN")[u].setAttribute("value", "".concat(arrValues[u][0]));
    document.getElementsByName("priceN")[u].setAttribute("value", "".concat(arrValues[u][1].toFixed(2)));
  } // att footer


  if (arrValues.length == 0) {
    tot = 0;
    avgPrice = 0.0;
    avgPrice = avgPrice.toFixed(2);
  } else if (arrValues.length == 1) {
    avgPrice = arrValues[0][1].toFixed(2);
  } else {
    avgPrice = (products / tot).toFixed(2);
  }

  attFooter(); // change unique form size

  if (document.forms.length == 1) {
    document.getElementsByClassName("form")[0].setAttribute("class", "form");
  }
};

exports.wipeOut = wipeOut;

var reset = function reset() {
  if (document.forms.length > 1) {
    if (document.forms.length > 2) {
      for (w = document.forms.length - 2; w > 0; w--) {
        wipeOut(w);
      }

      wipeOut(0);
    } else {
      wipeOut(0);
    }
  }
};

exports.reset = reset;

var validateInputs = function validateInputs(activedForm) {
  var validateQuantity = new RegExp("[0-9]+");
  var validatePrice = new RegExp("[0-9]+(,|.)?[0-9]*");
  valueQ = document.getElementsByName("quantityN")[activedForm].value;
  valueP = document.getElementsByName("priceN")[activedForm].value;
  valueQ = validateQuantity.exec(valueQ)[0];
  valueP = validatePrice.exec(valueP)[0];

  if (valueP.replace(/,/g, ".")) {
    valueP = valueP.replace(/,/g, ".");
  }

  ;
  valueQ = parseInt(valueQ);
  valueP = parseFloat(valueP);
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

var keepValuesOnDisplay = function keepValuesOnDisplay(arrValues) {
  for (var _u = 0; _u < document.forms.length - 1; _u++) {
    document.getElementsByName("quantityN")[_u].setAttribute("value", "".concat(arrValues[_u][0]));

    document.getElementsByName("priceN")[_u].setAttribute("value", "".concat(arrValues[_u][1].toFixed(2)));
  }

  ;
};

var setBiggerForm = function setBiggerForm(activedForm) {
  if (document.forms.length == 2) {
    document.getElementsByClassName("form")[0].setAttribute("class", "form is-bigger");
  }

  document.getElementsByClassName("form")[activedForm + 1].setAttribute("class", "form is-bigger");
};

var showTrashButton = function showTrashButton() {
  document.getElementsByClassName("trash_button")[activedForm].className = "trash_button is-shown";
};

var generateNewForm = function generateNewForm(activedForm) {
  var html = "\n    <form class=\"form\">\n      <div id=\"qForm\">\n        <label for=\"quantityN\"  class=\"textForm\" id=\"quantidade\">Quantidade:</label>\n        <input type=\"text\" class=\"valuesForm\" name=\"quantityN\" id=\"quantityN\" placeholder=\"0\" autocomplete=\"off\" min=\"0\" value=\"\" required>\n      </div>\n      <div id=\"pForm\">\n        <label for=\"priceN\" class=\"textForm\" id=\"preco\">Pre\xE7o:</label>\n        <input type=\"text\" class=\"valuesForm\" name=\"priceN\" id=\"priceN\" placeholder=\"R$ 0,00\" autocomplete=\"off\" min=\"0\" value=\"\" required> \n      </div>\n      <div class=\"trash_button\" id=\"trash_button\">\n        <button class=\"trash\" id=\"trash".concat(activedForm + 1, "\"></button>\n      </div>\n    </form>\n  ");
  document.getElementById("section").innerHTML += html;
  document.getElementById("trash".concat(activedForm)).setAttribute("onclick", "wipeOut(".concat(activedForm, ")"));
};
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _code = require("./code");

document.querySelector("#add").addEventListener("click", _code.onAddClick); //document.querySelector('#trash0').addEventListener('click', wipeOut);
//document.querySelector('#reset').addEventListener('click', reset);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49864" + '/');

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