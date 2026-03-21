function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var $bb166217b384746d$var$extendStatics =
  function (d, b) {
    $bb166217b384746d$var$extendStatics =
      Object.setPrototypeOf ||
      ({
        __proto__: [],
      } instanceof Array &&
        function (d, b) {
          d.__proto__ = b;
        }) ||
      function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };
    return $bb166217b384746d$var$extendStatics(d, b);
  };
function $bb166217b384746d$export$a8ba968b8961cb8a(d, b) {
  if (typeof b !== 'function' && b !== null)
    throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
  $bb166217b384746d$var$extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}
var $bb166217b384746d$export$18ce0697a983be9b = function () {
  $bb166217b384746d$export$18ce0697a983be9b =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return $bb166217b384746d$export$18ce0697a983be9b.apply(this, arguments);
};
function $bb166217b384746d$export$3c9a16f847548506(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === 'function') {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function $bb166217b384746d$export$29e00dfd3077644b(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function $bb166217b384746d$export$d5ad3fd78186038f(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function $bb166217b384746d$export$3a84e1ae4e97e9b0(
  ctor,
  descriptorIn,
  decorators,
  contextIn,
  initializers,
  extraInitializers,
) {
  function accept(f) {
    if (f !== void 0 && typeof f !== 'function') throw new TypeError('Function expected');
    return f;
  }
  var kind = contextIn.kind,
    key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
  var target = !descriptorIn && ctor ? (contextIn['static'] ? ctor : ctor.prototype) : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _,
    done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function (f) {
      if (done) throw new TypeError('Cannot add initializers after decoration has completed');
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(
      kind === 'accessor'
        ? {
            get: descriptor.get,
            set: descriptor.set,
          }
        : descriptor[key],
      context,
    );
    if (kind === 'accessor') {
      if (result === void 0) continue;
      if (result === null || typeof result !== 'object') throw new TypeError('Object expected');
      if ((_ = accept(result.get))) descriptor.get = _;
      if ((_ = accept(result.set))) descriptor.set = _;
      if ((_ = accept(result.init))) initializers.unshift(_);
    } else if ((_ = accept(result))) {
      if (kind === 'field') initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}
function $bb166217b384746d$export$d831c04e792af3d(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++)
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  return useValue ? value : void 0;
}
function $bb166217b384746d$export$6a2a36740a146cb8(x) {
  return typeof x === 'symbol' ? x : ''.concat(x);
}
function $bb166217b384746d$export$d1a06452d3489bc7(f, name, prefix) {
  if (typeof name === 'symbol') name = name.description ? '['.concat(name.description, ']') : '';
  return Object.defineProperty(f, 'name', {
    configurable: true,
    value: prefix ? ''.concat(prefix, ' ', name) : name,
  });
}
function $bb166217b384746d$export$f1db080c865becb9(metadataKey, metadataValue) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
    return Reflect.metadata(metadataKey, metadataValue);
}
function $bb166217b384746d$export$1050f835b63b671e(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function $bb166217b384746d$export$67ebef60e6f28a6(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g = Object.create((typeof Iterator === 'function' ? Iterator : Object).prototype);
  return (
    (g.next = verb(0)),
    (g['throw'] = verb(1)),
    (g['return'] = verb(2)),
    typeof Symbol === 'function' &&
      (g[Symbol.iterator] = function () {
        return this;
      }),
    g
  );
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while ((g && ((g = 0), op[0] && (_ = 0)), _))
      try {
        if (
          ((f = 1),
          y &&
            (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false,
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true,
    };
  }
}
var $bb166217b384746d$export$45d3717a4c69092e = Object.create
  ? function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable))
        desc = {
          enumerable: true,
          get: function () {
            return m[k];
          },
        };
      Object.defineProperty(o, k2, desc);
    }
  : function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    };
function $bb166217b384746d$export$f33643c0debef087(m, o) {
  for (var p in m)
    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(o, p))
      $bb166217b384746d$export$45d3717a4c69092e(o, m, p);
}
function $bb166217b384746d$export$19a8beecd37a4c45(o) {
  var s = typeof Symbol === 'function' && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === 'number')
    return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return {
          value: o && o[i++],
          done: !o,
        };
      },
    };
  throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function $bb166217b384746d$export$8d051b38c9118094(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error,
    };
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
function $bb166217b384746d$export$afc72e2116322959() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat($bb166217b384746d$export$8d051b38c9118094(arguments[i]));
  return ar;
}
function $bb166217b384746d$export$6388937ca91ccae8() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}
function $bb166217b384746d$export$1216008129fb82ed(to, from, pack) {
  if (pack || arguments.length === 2) {
    for (var i = 0, l = from.length, ar; i < l; i++)
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function $bb166217b384746d$export$10c90e4f7922046c(v) {
  return this instanceof $bb166217b384746d$export$10c90e4f7922046c
    ? ((this.v = v), this)
    : new $bb166217b384746d$export$10c90e4f7922046c(v);
}
function $bb166217b384746d$export$e427f37a30a4de9b(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return (
    (i = Object.create((typeof AsyncIterator === 'function' ? AsyncIterator : Object).prototype)),
    verb('next'),
    verb('throw'),
    verb('return', awaitReturn),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function awaitReturn(f) {
    return function (v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof $bb166217b384746d$export$10c90e4f7922046c
      ? Promise.resolve(r.value.v).then(fulfill, reject)
      : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume('next', value);
  }
  function reject(value) {
    resume('throw', value);
  }
  function settle(f, v) {
    if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
  }
}
function $bb166217b384746d$export$bbd80228419bb833(o) {
  var i, p;
  return (
    (i = {}),
    verb('next'),
    verb('throw', function (e) {
      throw e;
    }),
    verb('return'),
    (i[Symbol.iterator] = function () {
      return this;
    }),
    i
  );
  function verb(n, f) {
    i[n] = o[n]
      ? function (v) {
          return (p = !p)
            ? {
                value: $bb166217b384746d$export$10c90e4f7922046c(o[n](v)),
                done: false,
              }
            : f
            ? f(v)
            : v;
        }
      : f;
  }
}
function $bb166217b384746d$export$e3b29a3d6162315f(o) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var m = o[Symbol.asyncIterator],
    i;
  return m
    ? m.call(o)
    : ((o =
        typeof $bb166217b384746d$export$19a8beecd37a4c45 === 'function'
          ? $bb166217b384746d$export$19a8beecd37a4c45(o)
          : o[Symbol.iterator]()),
      (i = {}),
      verb('next'),
      verb('throw'),
      verb('return'),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i);
  function verb(n) {
    i[n] =
      o[n] &&
      function (v) {
        return new Promise(function (resolve, reject) {
          (v = o[n](v)), settle(resolve, reject, v.done, v.value);
        });
      };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d,
      });
    }, reject);
  }
}
function $bb166217b384746d$export$4fb47efe1390b86f(cooked, raw) {
  if (Object.defineProperty)
    Object.defineProperty(cooked, 'raw', {
      value: raw,
    });
  else cooked.raw = raw;
  return cooked;
}
var $bb166217b384746d$var$__setModuleDefault = Object.create
  ? function (o, v) {
      Object.defineProperty(o, 'default', {
        enumerable: true,
        value: v,
      });
    }
  : function (o, v) {
      o['default'] = v;
    };
var $bb166217b384746d$var$ownKeys = function (o) {
  $bb166217b384746d$var$ownKeys =
    Object.getOwnPropertyNames ||
    function (o) {
      var ar = [];
      for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
      return ar;
    };
  return $bb166217b384746d$var$ownKeys(o);
};
function $bb166217b384746d$export$c21735bcef00d192(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) {
    for (var k = $bb166217b384746d$var$ownKeys(mod), i = 0; i < k.length; i++)
      if (k[i] !== 'default') $bb166217b384746d$export$45d3717a4c69092e(result, mod, k[i]);
  }
  $bb166217b384746d$var$__setModuleDefault(result, mod);
  return result;
}
function $bb166217b384746d$export$da59b14a69baef04(mod) {
  return mod && mod.__esModule
    ? mod
    : {
        default: mod,
      };
}
function $bb166217b384746d$export$d5dcaf168c640c35(receiver, state, kind, f) {
  if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
  if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError('Cannot read private member from an object whose class did not declare it');
  return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function $bb166217b384746d$export$d40a35129aaff81f(receiver, state, value, kind, f) {
  if (kind === 'm') throw new TypeError('Private method is not writable');
  if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
  if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError('Cannot write private member to an object whose class did not declare it');
  return kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
}
function $bb166217b384746d$export$81fdc39f203e4e04(state, receiver) {
  if (receiver === null || (typeof receiver !== 'object' && typeof receiver !== 'function'))
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === 'function' ? receiver === state : state.has(receiver);
}
function $bb166217b384746d$export$88ac25d8e944e405(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== 'object' && typeof value !== 'function') throw new TypeError('Object expected.');
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError('Symbol.asyncDispose is not defined.');
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError('Symbol.dispose is not defined.');
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== 'function') throw new TypeError('Object not disposable.');
    if (inner)
      dispose = function () {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
    env.stack.push({
      value: value,
      dispose: dispose,
      async: async,
    });
  } else if (async)
    env.stack.push({
      async: true,
    });
  return value;
}
var $bb166217b384746d$var$_SuppressedError =
  typeof SuppressedError === 'function'
    ? SuppressedError
    : function (error, suppressed, message) {
        var e = new Error(message);
        return (e.name = 'SuppressedError'), (e.error = error), (e.suppressed = suppressed), e;
      };
function $bb166217b384746d$export$8f076105dc360e92(env) {
  function fail(e) {
    env.error = env.hasError
      ? new $bb166217b384746d$var$_SuppressedError(e, env.error, 'An error was suppressed during disposal.')
      : e;
    env.hasError = true;
  }
  var r,
    s = 0;
  function next() {
    while ((r = env.stack.pop()))
      try {
        if (!r.async && s === 1) return (s = 0), env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async)
            return (
              (s |= 2),
              Promise.resolve(result).then(next, function (e) {
                fail(e);
                return next();
              })
            );
        } else s |= 1;
      } catch (e) {
        fail(e);
      }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}
function $bb166217b384746d$export$889dfb5d17574b0b(path, preserveJsx) {
  if (typeof path === 'string' && /^\.\.?\//.test(path))
    return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
      return tsx ? (preserveJsx ? '.jsx' : '.js') : d && (!ext || !cm) ? m : d + ext + '.' + cm.toLowerCase() + 'js';
    });
  return path;
}
var $bb166217b384746d$export$2e2bcd8739ae039 = {
  __extends: $bb166217b384746d$export$a8ba968b8961cb8a,
  __assign: $bb166217b384746d$export$18ce0697a983be9b,
  __rest: $bb166217b384746d$export$3c9a16f847548506,
  __decorate: $bb166217b384746d$export$29e00dfd3077644b,
  __param: $bb166217b384746d$export$d5ad3fd78186038f,
  __esDecorate: $bb166217b384746d$export$3a84e1ae4e97e9b0,
  __runInitializers: $bb166217b384746d$export$d831c04e792af3d,
  __propKey: $bb166217b384746d$export$6a2a36740a146cb8,
  __setFunctionName: $bb166217b384746d$export$d1a06452d3489bc7,
  __metadata: $bb166217b384746d$export$f1db080c865becb9,
  __awaiter: $bb166217b384746d$export$1050f835b63b671e,
  __generator: $bb166217b384746d$export$67ebef60e6f28a6,
  __createBinding: $bb166217b384746d$export$45d3717a4c69092e,
  __exportStar: $bb166217b384746d$export$f33643c0debef087,
  __values: $bb166217b384746d$export$19a8beecd37a4c45,
  __read: $bb166217b384746d$export$8d051b38c9118094,
  __spread: $bb166217b384746d$export$afc72e2116322959,
  __spreadArrays: $bb166217b384746d$export$6388937ca91ccae8,
  __spreadArray: $bb166217b384746d$export$1216008129fb82ed,
  __await: $bb166217b384746d$export$10c90e4f7922046c,
  __asyncGenerator: $bb166217b384746d$export$e427f37a30a4de9b,
  __asyncDelegator: $bb166217b384746d$export$bbd80228419bb833,
  __asyncValues: $bb166217b384746d$export$e3b29a3d6162315f,
  __makeTemplateObject: $bb166217b384746d$export$4fb47efe1390b86f,
  __importStar: $bb166217b384746d$export$c21735bcef00d192,
  __importDefault: $bb166217b384746d$export$da59b14a69baef04,
  __classPrivateFieldGet: $bb166217b384746d$export$d5dcaf168c640c35,
  __classPrivateFieldSet: $bb166217b384746d$export$d40a35129aaff81f,
  __classPrivateFieldIn: $bb166217b384746d$export$81fdc39f203e4e04,
  __addDisposableResource: $bb166217b384746d$export$88ac25d8e944e405,
  __disposeResources: $bb166217b384746d$export$8f076105dc360e92,
  __rewriteRelativeImportExtension: $bb166217b384746d$export$889dfb5d17574b0b,
};

var $66c23fc25bd0d735$var$__assign =
  (undefined && undefined.__assign) ||
  function () {
    $66c23fc25bd0d735$var$__assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return $66c23fc25bd0d735$var$__assign.apply(this, arguments);
  };
var $66c23fc25bd0d735$var$MS_PER_SECOND = 1e3;
var $66c23fc25bd0d735$var$SECS_PER_MIN = 60;
var $66c23fc25bd0d735$var$SECS_PER_HOUR = $66c23fc25bd0d735$var$SECS_PER_MIN * 60;
var $66c23fc25bd0d735$var$SECS_PER_DAY = $66c23fc25bd0d735$var$SECS_PER_HOUR * 24;
var $66c23fc25bd0d735$var$SECS_PER_WEEK = $66c23fc25bd0d735$var$SECS_PER_DAY * 7;
function $66c23fc25bd0d735$export$b8f7189986dd5395(from, to, thresholds) {
  if (to === void 0) to = Date.now();
  if (thresholds === void 0) thresholds = {};
  var resolvedThresholds = $66c23fc25bd0d735$var$__assign(
    $66c23fc25bd0d735$var$__assign({}, $66c23fc25bd0d735$export$f4fd60e41371f80d),
    thresholds || {},
  );
  var secs = (+from - +to) / $66c23fc25bd0d735$var$MS_PER_SECOND;
  if (Math.abs(secs) < resolvedThresholds.second)
    return {
      value: Math.round(secs),
      unit: 'second',
    };
  var mins = secs / $66c23fc25bd0d735$var$SECS_PER_MIN;
  if (Math.abs(mins) < resolvedThresholds.minute)
    return {
      value: Math.round(mins),
      unit: 'minute',
    };
  var hours = secs / $66c23fc25bd0d735$var$SECS_PER_HOUR;
  if (Math.abs(hours) < resolvedThresholds.hour)
    return {
      value: Math.round(hours),
      unit: 'hour',
    };
  var days = secs / $66c23fc25bd0d735$var$SECS_PER_DAY;
  if (Math.abs(days) < resolvedThresholds.day)
    return {
      value: Math.round(days),
      unit: 'day',
    };
  var fromDate = new Date(from);
  var toDate = new Date(to);
  var years = fromDate.getFullYear() - toDate.getFullYear();
  if (Math.round(Math.abs(years)) > 0)
    return {
      value: Math.round(years),
      unit: 'year',
    };
  var months = years * 12 + fromDate.getMonth() - toDate.getMonth();
  if (Math.round(Math.abs(months)) > 0)
    return {
      value: Math.round(months),
      unit: 'month',
    };
  var weeks = secs / $66c23fc25bd0d735$var$SECS_PER_WEEK;
  return {
    value: Math.round(weeks),
    unit: 'week',
  };
}
var $66c23fc25bd0d735$export$f4fd60e41371f80d = {
  second: 45,
  minute: 45,
  hour: 22,
  day: 5,
};

var $27baed8aea9cf78c$export$27bce688931fdfcc,
  $27baed8aea9cf78c$export$7fd1ce15b01d50ca,
  $27baed8aea9cf78c$export$1a0dc7c974e8444d = function (e, t) {
    return $27baed8aea9cf78c$var$i(t).format(e);
  },
  $27baed8aea9cf78c$var$i = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  },
  $27baed8aea9cf78c$export$3ae94a2503e890a1 = function (e, t) {
    return $27baed8aea9cf78c$var$o(t).format(e);
  },
  $27baed8aea9cf78c$var$o = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  $27baed8aea9cf78c$export$fbb9ef859002af37 = function (e, t) {
    return $27baed8aea9cf78c$var$c(t).format(e);
  },
  $27baed8aea9cf78c$var$c = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  },
  $27baed8aea9cf78c$export$7813392c1f00426f = function (e, t) {
    return $27baed8aea9cf78c$var$s(t).format(e);
  },
  $27baed8aea9cf78c$var$s = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      day: 'numeric',
      month: 'short',
    });
  },
  $27baed8aea9cf78c$export$295e1e57d6713bf4 = function (e, t) {
    return $27baed8aea9cf78c$var$d(t).format(e);
  },
  $27baed8aea9cf78c$var$d = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      month: 'long',
      year: 'numeric',
    });
  },
  $27baed8aea9cf78c$export$cbc7ca92d37b9650 = function (e, t) {
    return $27baed8aea9cf78c$var$g(t).format(e);
  },
  $27baed8aea9cf78c$var$g = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      month: 'long',
    });
  },
  $27baed8aea9cf78c$export$5a252a405018366 = function (e, t) {
    return $27baed8aea9cf78c$var$h(t).format(e);
  },
  $27baed8aea9cf78c$var$h = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      year: 'numeric',
    });
  };
!(function (e) {
  (e.language = 'language'),
    (e.system = 'system'),
    (e.comma_decimal = 'comma_decimal'),
    (e.decimal_comma = 'decimal_comma'),
    (e.space_comma = 'space_comma'),
    (e.none = 'none');
})($27baed8aea9cf78c$export$27bce688931fdfcc || ($27baed8aea9cf78c$export$27bce688931fdfcc = {})),
  (function (e) {
    (e.language = 'language'), (e.system = 'system'), (e.am_pm = '12'), (e.twenty_four = '24');
  })($27baed8aea9cf78c$export$7fd1ce15b01d50ca || ($27baed8aea9cf78c$export$7fd1ce15b01d50ca = {}));
var $27baed8aea9cf78c$var$b = function (e) {
    if (
      e.time_format === $27baed8aea9cf78c$export$7fd1ce15b01d50ca.language ||
      e.time_format === $27baed8aea9cf78c$export$7fd1ce15b01d50ca.system
    ) {
      var t = e.time_format === $27baed8aea9cf78c$export$7fd1ce15b01d50ca.language ? e.language : void 0,
        n = new Date().toLocaleString(t);
      return n.includes('AM') || n.includes('PM');
    }
    return e.time_format === $27baed8aea9cf78c$export$7fd1ce15b01d50ca.am_pm;
  },
  $27baed8aea9cf78c$export$8b492ed8828f789c = function (e, t) {
    return $27baed8aea9cf78c$var$_(t).format(e);
  },
  $27baed8aea9cf78c$var$_ = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: $27baed8aea9cf78c$var$b(e) ? 'numeric' : '2-digit',
      minute: '2-digit',
      hour12: $27baed8aea9cf78c$var$b(e),
    });
  },
  $27baed8aea9cf78c$export$c2c7ff0067c06a13 = function (e, t) {
    return $27baed8aea9cf78c$var$w(t).format(e);
  },
  $27baed8aea9cf78c$var$w = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: $27baed8aea9cf78c$var$b(e) ? 'numeric' : '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: $27baed8aea9cf78c$var$b(e),
    });
  },
  $27baed8aea9cf78c$export$c8a72f22956ccab0 = function (e, t) {
    return $27baed8aea9cf78c$var$x(t).format(e);
  },
  $27baed8aea9cf78c$var$x = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: $27baed8aea9cf78c$var$b(e),
    });
  },
  $27baed8aea9cf78c$export$3203edd9e5edd663 = function (e, t) {
    return $27baed8aea9cf78c$var$S(t).format(e);
  },
  $27baed8aea9cf78c$var$S = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: $27baed8aea9cf78c$var$b(e),
    });
  },
  $27baed8aea9cf78c$export$ec86e83f20e68cd8 = function (e, t) {
    return $27baed8aea9cf78c$var$T(t).format(e);
  },
  $27baed8aea9cf78c$var$T = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      hour: $27baed8aea9cf78c$var$b(e) ? 'numeric' : '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: $27baed8aea9cf78c$var$b(e),
    });
  },
  $27baed8aea9cf78c$export$ad627f6ad084f5a2 = function (e, t) {
    return $27baed8aea9cf78c$var$N(t).format(e);
  },
  $27baed8aea9cf78c$var$N = function (e) {
    return new Intl.DateTimeFormat(e.language, {
      hour: $27baed8aea9cf78c$var$b(e) ? 'numeric' : '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: $27baed8aea9cf78c$var$b(e),
    });
  },
  $27baed8aea9cf78c$export$caddcc104251c1d7 = function (t, r, n, i) {
    void 0 === i && (i = !0);
    var a = (0, $66c23fc25bd0d735$export$b8f7189986dd5395)(t, n);
    return i
      ? (function (e) {
          return new Intl.RelativeTimeFormat(e.language, {
            numeric: 'auto',
          });
        })(r).format(a.value, a.unit)
      : Intl.NumberFormat(r.language, {
          style: 'unit',
          unit: a.unit,
          unitDisplay: 'long',
        }).format(Math.abs(a.value));
  };
function $27baed8aea9cf78c$export$50fe296bd2427aef(e) {
  var t,
    r = 3600 * (t = e.attributes.remaining.split(':').map(Number))[0] + 60 * t[1] + t[2];
  if ('active' === e.state) {
    var n = new Date().getTime(),
      i = new Date(e.last_changed).getTime();
    r = Math.max(r - (n - i) / 1e3, 0);
  }
  return r;
}
function $27baed8aea9cf78c$var$O() {
  return ($27baed8aea9cf78c$var$O =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }).apply(this, arguments);
}
var $27baed8aea9cf78c$export$2a5af2efac2f8dc = function (e, t, r, n) {
    void 0 === n && (n = !1), e._themes || (e._themes = {});
    var i = t.default_theme;
    ('default' === r || (r && t.themes[r])) && (i = r);
    var a = $27baed8aea9cf78c$var$O({}, e._themes);
    if ('default' !== i) {
      var o = t.themes[i];
      Object.keys(o).forEach(function (t) {
        var r = '--' + t;
        (e._themes[r] = ''), (a[r] = o[t]);
      });
    }
    if ((e.updateStyles ? e.updateStyles(a) : window.ShadyCSS && window.ShadyCSS.styleSubtree(e, a), n)) {
      var u = document.querySelector('meta[name=theme-color]');
      if (u) {
        u.hasAttribute('default-content') || u.setAttribute('default-content', u.getAttribute('content'));
        var c = a['--primary-color'] || u.getAttribute('default-content');
        u.setAttribute('content', c);
      }
    }
  },
  $27baed8aea9cf78c$export$67835a66b9f6da52 = function (e) {
    return 'function' == typeof e.getCardSize ? e.getCardSize() : 4;
  };
function $27baed8aea9cf78c$export$2044bdc9670769ab(e) {
  return e.substr(0, e.indexOf('.'));
}
function $27baed8aea9cf78c$export$4c7757901b2ff860(e) {
  return e.substr(e.indexOf('.') + 1);
}
function $27baed8aea9cf78c$export$5cacf63e4bbfecae(e) {
  var t,
    r = (null == e || null == (t = e.locale) ? void 0 : t.language) || 'en';
  return (e.translationMetadata.translations[r] && e.translationMetadata.translations[r].isRTL) || !1;
}
function $27baed8aea9cf78c$export$703829fe2802931b(e) {
  return $27baed8aea9cf78c$export$5cacf63e4bbfecae(e) ? 'rtl' : 'ltr';
}
function $27baed8aea9cf78c$export$5b7b50e8043fabe(e) {
  return $27baed8aea9cf78c$export$2044bdc9670769ab(e.entity_id);
}
var $27baed8aea9cf78c$export$88bfc1035e667f37 = function (e) {
    return !!e.attributes.unit_of_measurement || !!e.attributes.state_class;
  },
  $27baed8aea9cf78c$export$5e25e39d6a8c0c11 = function (e) {
    switch (e.number_format) {
      case $27baed8aea9cf78c$export$27bce688931fdfcc.comma_decimal:
        return ['en-US', 'en'];
      case $27baed8aea9cf78c$export$27bce688931fdfcc.decimal_comma:
        return ['de', 'es', 'it'];
      case $27baed8aea9cf78c$export$27bce688931fdfcc.space_comma:
        return ['fr', 'sv', 'cs'];
      case $27baed8aea9cf78c$export$27bce688931fdfcc.system:
        return;
      default:
        return e.language;
    }
  },
  $27baed8aea9cf78c$export$2077e0241d6afd3c = function (e, t) {
    return void 0 === t && (t = 2), Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
  },
  $27baed8aea9cf78c$export$f5dd818bff069720 = function (e, r, n) {
    var i = r ? $27baed8aea9cf78c$export$5e25e39d6a8c0c11(r) : void 0;
    if (
      ((Number.isNaN =
        Number.isNaN ||
        function e(t) {
          return 'number' == typeof t && e(t);
        }),
      (null == r ? void 0 : r.number_format) !== $27baed8aea9cf78c$export$27bce688931fdfcc.none &&
        !Number.isNaN(Number(e)) &&
        Intl)
    )
      try {
        return new Intl.NumberFormat(i, $27baed8aea9cf78c$var$V(e, n)).format(Number(e));
      } catch (t) {
        return console.error(t), new Intl.NumberFormat(void 0, $27baed8aea9cf78c$var$V(e, n)).format(Number(e));
      }
    return 'string' == typeof e
      ? e
      : $27baed8aea9cf78c$export$2077e0241d6afd3c(e, null == n ? void 0 : n.maximumFractionDigits).toString() +
          ('currency' === (null == n ? void 0 : n.style) ? ' ' + n.currency : '');
  },
  $27baed8aea9cf78c$var$V = function (e, t) {
    var r = $27baed8aea9cf78c$var$O(
      {
        maximumFractionDigits: 2,
      },
      t,
    );
    if ('string' != typeof e) return r;
    if (!t || (!t.minimumFractionDigits && !t.maximumFractionDigits)) {
      var n = e.indexOf('.') > -1 ? e.split('.')[1].length : 0;
      (r.minimumFractionDigits = n), (r.maximumFractionDigits = n);
    }
    return r;
  },
  $27baed8aea9cf78c$export$278f9ea9192cff94 = function (e, t, r, n) {
    var i = void 0 !== n ? n : t.state;
    if ('unknown' === i || 'unavailable' === i) return e('state.default.' + i);
    if ($27baed8aea9cf78c$export$88bfc1035e667f37(t)) {
      if ('monetary' === t.attributes.device_class)
        try {
          return $27baed8aea9cf78c$export$f5dd818bff069720(i, r, {
            style: 'currency',
            currency: t.attributes.unit_of_measurement,
          });
        } catch (e) {}
      return (
        $27baed8aea9cf78c$export$f5dd818bff069720(i, r) +
        (t.attributes.unit_of_measurement ? ' ' + t.attributes.unit_of_measurement : '')
      );
    }
    var o = $27baed8aea9cf78c$export$5b7b50e8043fabe(t);
    if ('input_datetime' === o) {
      var u;
      if (void 0 === n)
        return t.attributes.has_date && t.attributes.has_time
          ? ((u = new Date(
              t.attributes.year,
              t.attributes.month - 1,
              t.attributes.day,
              t.attributes.hour,
              t.attributes.minute,
            )),
            $27baed8aea9cf78c$export$8b492ed8828f789c(u, r))
          : t.attributes.has_date
          ? ((u = new Date(t.attributes.year, t.attributes.month - 1, t.attributes.day)),
            $27baed8aea9cf78c$export$3ae94a2503e890a1(u, r))
          : t.attributes.has_time
          ? ((u = new Date()).setHours(t.attributes.hour, t.attributes.minute),
            $27baed8aea9cf78c$export$3203edd9e5edd663(u, r))
          : t.state;
      try {
        var c = n.split(' ');
        if (2 === c.length) return $27baed8aea9cf78c$export$8b492ed8828f789c(new Date(c.join('T')), r);
        if (1 === c.length) {
          if (n.includes('-')) return $27baed8aea9cf78c$export$3ae94a2503e890a1(new Date(n + 'T00:00'), r);
          if (n.includes(':')) {
            var m = new Date();
            return $27baed8aea9cf78c$export$3203edd9e5edd663(new Date(m.toISOString().split('T')[0] + 'T' + n), r);
          }
        }
        return n;
      } catch (e) {
        return n;
      }
    }
    return 'humidifier' === o && 'on' === i && t.attributes.humidity
      ? t.attributes.humidity + ' %'
      : 'counter' === o || 'number' === o || 'input_number' === o
      ? $27baed8aea9cf78c$export$f5dd818bff069720(i, r)
      : (t.attributes.device_class && e('component.' + o + '.state.' + t.attributes.device_class + '.' + i)) ||
        e('component.' + o + '.state._.' + i) ||
        i;
  },
  $27baed8aea9cf78c$export$25978a5d5a562f09 = 'mdi:bookmark',
  $27baed8aea9cf78c$export$f78a3169a0f9f31b = 'lovelace',
  $27baed8aea9cf78c$export$6df9924792233bc = [
    'climate',
    'cover',
    'configurator',
    'input_select',
    'input_number',
    'input_text',
    'lock',
    'media_player',
    'scene',
    'script',
    'timer',
    'vacuum',
    'water_heater',
    'weblink',
  ],
  $27baed8aea9cf78c$export$b9a2b37e93bb73f2 = [
    'alarm_control_panel',
    'automation',
    'camera',
    'climate',
    'configurator',
    'cover',
    'fan',
    'group',
    'history_graph',
    'input_datetime',
    'light',
    'lock',
    'media_player',
    'script',
    'sun',
    'updater',
    'vacuum',
    'water_heater',
    'weather',
  ],
  $27baed8aea9cf78c$export$ca927753507128f6 = ['input_number', 'input_select', 'input_text', 'scene', 'weblink'],
  $27baed8aea9cf78c$export$60e836dfbaf943c5 = ['camera', 'configurator', 'history_graph', 'scene'],
  $27baed8aea9cf78c$export$23bace2b7923e5d1 = ['closed', 'locked', 'off'],
  $27baed8aea9cf78c$export$1b64f44bed0feb66 = new Set([
    'fan',
    'input_boolean',
    'light',
    'switch',
    'group',
    'automation',
  ]),
  $27baed8aea9cf78c$export$3ed39d80c7b24b62 = '\xb0C',
  $27baed8aea9cf78c$export$5c7f540eb0eef6a6 = '\xb0F',
  $27baed8aea9cf78c$export$2c7beb20637e0bd1 = 'group.default_view',
  $27baed8aea9cf78c$export$43835e9acf248a15 = function (e, t, r, n) {
    (n = n || {}), (r = null == r ? {} : r);
    var i = new Event(t, {
      bubbles: void 0 === n.bubbles || n.bubbles,
      cancelable: Boolean(n.cancelable),
      composed: void 0 === n.composed || n.composed,
    });
    return (i.detail = r), e.dispatchEvent(i), i;
  },
  $27baed8aea9cf78c$var$ie = new Set(['call-service', 'divider', 'section', 'weblink', 'cast', 'select']),
  $27baed8aea9cf78c$var$ae = {
    alert: 'toggle',
    automation: 'toggle',
    climate: 'climate',
    cover: 'cover',
    fan: 'toggle',
    group: 'group',
    input_boolean: 'toggle',
    input_number: 'input-number',
    input_select: 'input-select',
    input_text: 'input-text',
    light: 'toggle',
    lock: 'lock',
    media_player: 'media-player',
    remote: 'toggle',
    scene: 'scene',
    script: 'script',
    sensor: 'sensor',
    timer: 'timer',
    switch: 'toggle',
    vacuum: 'toggle',
    water_heater: 'climate',
    input_datetime: 'input-datetime',
  },
  $27baed8aea9cf78c$export$5ad555b55cd85e0c = function (e, t) {
    void 0 === t && (t = !1);
    var r = function (e, t) {
        return n('hui-error-card', {
          type: 'error',
          error: e,
          config: t,
        });
      },
      n = function (e, t) {
        var n = window.document.createElement(e);
        try {
          if (!n.setConfig) return;
          n.setConfig(t);
        } catch (n) {
          return console.error(e, n), r(n.message, t);
        }
        return n;
      };
    if (!e || 'object' != typeof e || (!t && !e.type)) return r('No type defined', e);
    var i = e.type;
    if (i && i.startsWith('custom:')) i = i.substr(7);
    else if (t) {
      if ($27baed8aea9cf78c$var$ie.has(i)) i = 'hui-' + i + '-row';
      else {
        if (!e.entity) return r('Invalid config given.', e);
        var a = e.entity.split('.', 1)[0];
        i = 'hui-' + ($27baed8aea9cf78c$var$ae[a] || 'text') + '-entity-row';
      }
    } else i = 'hui-' + i + '-card';
    if (customElements.get(i)) return n(i, e);
    var o = r("Custom element doesn't exist: " + e.type + '.', e);
    o.style.display = 'None';
    var u = setTimeout(function () {
      o.style.display = '';
    }, 2e3);
    return (
      customElements.whenDefined(e.type).then(function () {
        clearTimeout(u), $27baed8aea9cf78c$export$43835e9acf248a15(o, 'll-rebuild', {}, o);
      }),
      o
    );
  },
  $27baed8aea9cf78c$export$61fc7d43ac8f84b0 = function (e, t, r) {
    var n;
    return (
      void 0 === r && (r = !1),
      function () {
        var i = [].slice.call(arguments),
          a = this,
          o = function () {
            (n = null), r || e.apply(a, i);
          },
          u = r && !n;
        clearTimeout(n), (n = setTimeout(o, t)), u && e.apply(a, i);
      }
    );
  },
  $27baed8aea9cf78c$export$a76407ec79ca4ea3 = {
    alert: 'mdi:alert',
    automation: 'mdi:playlist-play',
    calendar: 'mdi:calendar',
    camera: 'mdi:video',
    climate: 'mdi:thermostat',
    configurator: 'mdi:settings',
    conversation: 'mdi:text-to-speech',
    device_tracker: 'mdi:account',
    fan: 'mdi:fan',
    group: 'mdi:google-circles-communities',
    history_graph: 'mdi:chart-line',
    homeassistant: 'mdi:home-assistant',
    homekit: 'mdi:home-automation',
    image_processing: 'mdi:image-filter-frames',
    input_boolean: 'mdi:drawing',
    input_datetime: 'mdi:calendar-clock',
    input_number: 'mdi:ray-vertex',
    input_select: 'mdi:format-list-bulleted',
    input_text: 'mdi:textbox',
    light: 'mdi:lightbulb',
    mailbox: 'mdi:mailbox',
    notify: 'mdi:comment-alert',
    person: 'mdi:account',
    plant: 'mdi:flower',
    proximity: 'mdi:apple-safari',
    remote: 'mdi:remote',
    scene: 'mdi:google-pages',
    script: 'mdi:file-document',
    sensor: 'mdi:eye',
    simple_alarm: 'mdi:bell',
    sun: 'mdi:white-balance-sunny',
    switch: 'mdi:flash',
    timer: 'mdi:timer',
    updater: 'mdi:cloud-upload',
    vacuum: 'mdi:robot-vacuum',
    water_heater: 'mdi:thermometer',
    weblink: 'mdi:open-in-new',
  };
function $27baed8aea9cf78c$export$13fcd5035aa1446(e, t) {
  if (e in $27baed8aea9cf78c$export$a76407ec79ca4ea3) return $27baed8aea9cf78c$export$a76407ec79ca4ea3[e];
  switch (e) {
    case 'alarm_control_panel':
      switch (t) {
        case 'armed_home':
          return 'mdi:bell-plus';
        case 'armed_night':
          return 'mdi:bell-sleep';
        case 'disarmed':
          return 'mdi:bell-outline';
        case 'triggered':
          return 'mdi:bell-ring';
        default:
          return 'mdi:bell';
      }
    case 'binary_sensor':
      return t && 'off' === t ? 'mdi:radiobox-blank' : 'mdi:checkbox-marked-circle';
    case 'cover':
      return 'closed' === t ? 'mdi:window-closed' : 'mdi:window-open';
    case 'lock':
      return t && 'unlocked' === t ? 'mdi:lock-open' : 'mdi:lock';
    case 'media_player':
      return t && 'off' !== t && 'idle' !== t ? 'mdi:cast-connected' : 'mdi:cast';
    case 'zwave':
      switch (t) {
        case 'dead':
          return 'mdi:emoticon-dead';
        case 'sleeping':
          return 'mdi:sleep';
        case 'initializing':
          return 'mdi:timer-sand';
        default:
          return 'mdi:z-wave';
      }
    default:
      return console.warn('Unable to find icon for domain ' + e + ' (' + t + ')'), 'mdi:bookmark';
  }
}
var $27baed8aea9cf78c$export$e2b36fa5c60547b2 = function (e, t) {
    var r = t.value || t,
      n = t.attribute ? e.attributes[t.attribute] : e.state;
    switch (t.operator || '==') {
      case '==':
        return n === r;
      case '<=':
        return n <= r;
      case '<':
        return n < r;
      case '>=':
        return n >= r;
      case '>':
        return n > r;
      case '!=':
        return n !== r;
      case 'regex':
        return n.match(r);
      default:
        return !1;
    }
  },
  $27baed8aea9cf78c$export$8bcf112cf396c716 = function (e) {
    $27baed8aea9cf78c$export$43835e9acf248a15(window, 'haptic', e);
  },
  $27baed8aea9cf78c$export$ff7962acd6052c28 = function (e, t, r) {
    void 0 === r && (r = !1),
      r ? history.replaceState(null, '', t) : history.pushState(null, '', t),
      $27baed8aea9cf78c$export$43835e9acf248a15(window, 'location-changed', {
        replace: r,
      });
  },
  $27baed8aea9cf78c$export$3303cc16da6bc061 = function (e, t, r) {
    void 0 === r && (r = !0);
    var n,
      i = $27baed8aea9cf78c$export$2044bdc9670769ab(t),
      a = 'group' === i ? 'homeassistant' : i;
    switch (i) {
      case 'lock':
        n = r ? 'unlock' : 'lock';
        break;
      case 'cover':
        n = r ? 'open_cover' : 'close_cover';
        break;
      default:
        n = r ? 'turn_on' : 'turn_off';
    }
    return e.callService(a, n, {
      entity_id: t,
    });
  },
  $27baed8aea9cf78c$export$4f6896672dcf12b1 = function (e, t) {
    var r = $27baed8aea9cf78c$export$23bace2b7923e5d1.includes(e.states[t].state);
    return $27baed8aea9cf78c$export$3303cc16da6bc061(e, t, r);
  },
  $27baed8aea9cf78c$export$fe63bc0ae3396800 = function (e, t, r, n) {
    if (
      (n ||
        (n = {
          action: 'more-info',
        }),
      !n.confirmation ||
        (n.confirmation.exemptions &&
          n.confirmation.exemptions.some(function (e) {
            return e.user === t.user.id;
          })) ||
        ($27baed8aea9cf78c$export$8bcf112cf396c716('warning'),
        confirm(n.confirmation.text || 'Are you sure you want to ' + n.action + '?')))
    )
      switch (n.action) {
        case 'more-info':
          (r.entity || r.camera_image) &&
            $27baed8aea9cf78c$export$43835e9acf248a15(e, 'hass-more-info', {
              entityId: r.entity ? r.entity : r.camera_image,
            });
          break;
        case 'navigate':
          n.navigation_path && $27baed8aea9cf78c$export$ff7962acd6052c28(0, n.navigation_path);
          break;
        case 'url':
          n.url_path && window.open(n.url_path);
          break;
        case 'toggle':
          r.entity &&
            ($27baed8aea9cf78c$export$4f6896672dcf12b1(t, r.entity),
            $27baed8aea9cf78c$export$8bcf112cf396c716('success'));
          break;
        case 'call-service':
          if (!n.service) return void $27baed8aea9cf78c$export$8bcf112cf396c716('failure');
          var i = n.service.split('.', 2);
          t.callService(i[0], i[1], n.service_data, n.target), $27baed8aea9cf78c$export$8bcf112cf396c716('success');
          break;
        case 'fire-dom-event':
          $27baed8aea9cf78c$export$43835e9acf248a15(e, 'll-custom', n);
      }
  },
  $27baed8aea9cf78c$export$6c6c3f4b7541eaf1 = function (e, t, r, n) {
    var i;
    'double_tap' === n && r.double_tap_action
      ? (i = r.double_tap_action)
      : 'hold' === n && r.hold_action
      ? (i = r.hold_action)
      : 'tap' === n && r.tap_action && (i = r.tap_action),
      $27baed8aea9cf78c$export$fe63bc0ae3396800(e, t, r, i);
  },
  $27baed8aea9cf78c$export$b981489921ee18cd = function (e, t, r, n, i) {
    var a;
    if (
      (i && r.double_tap_action
        ? (a = r.double_tap_action)
        : n && r.hold_action
        ? (a = r.hold_action)
        : !n && r.tap_action && (a = r.tap_action),
      a ||
        (a = {
          action: 'more-info',
        }),
      !a.confirmation ||
        (a.confirmation.exemptions &&
          a.confirmation.exemptions.some(function (e) {
            return e.user === t.user.id;
          })) ||
        confirm(a.confirmation.text || 'Are you sure you want to ' + a.action + '?'))
    )
      switch (a.action) {
        case 'more-info':
          (a.entity || r.entity || r.camera_image) &&
            ($27baed8aea9cf78c$export$43835e9acf248a15(e, 'hass-more-info', {
              entityId: a.entity ? a.entity : r.entity ? r.entity : r.camera_image,
            }),
            a.haptic && $27baed8aea9cf78c$export$8bcf112cf396c716(a.haptic));
          break;
        case 'navigate':
          a.navigation_path &&
            ($27baed8aea9cf78c$export$ff7962acd6052c28(0, a.navigation_path),
            a.haptic && $27baed8aea9cf78c$export$8bcf112cf396c716(a.haptic));
          break;
        case 'url':
          a.url_path && window.open(a.url_path), a.haptic && $27baed8aea9cf78c$export$8bcf112cf396c716(a.haptic);
          break;
        case 'toggle':
          r.entity &&
            ($27baed8aea9cf78c$export$4f6896672dcf12b1(t, r.entity),
            a.haptic && $27baed8aea9cf78c$export$8bcf112cf396c716(a.haptic));
          break;
        case 'call-service':
          if (!a.service) return;
          var o = a.service.split('.', 2),
            u = o[0],
            c = o[1],
            m = $27baed8aea9cf78c$var$O({}, a.service_data);
          'entity' === m.entity_id && (m.entity_id = r.entity),
            t.callService(u, c, m, a.target),
            a.haptic && $27baed8aea9cf78c$export$8bcf112cf396c716(a.haptic);
          break;
        case 'fire-dom-event':
          $27baed8aea9cf78c$export$43835e9acf248a15(e, 'll-custom', a),
            a.haptic && $27baed8aea9cf78c$export$8bcf112cf396c716(a.haptic);
      }
  };
function $27baed8aea9cf78c$export$e217e69099d082f5(e) {
  return void 0 !== e && 'none' !== e.action;
}
function $27baed8aea9cf78c$export$695b4dbcc1028091(e, t, r) {
  if (t.has('config') || r) return !0;
  if (e.config.entity) {
    var n = t.get('hass');
    return !n || n.states[e.config.entity] !== e.hass.states[e.config.entity];
  }
  return !1;
}
function $27baed8aea9cf78c$export$72d503079d05a3cf(e) {
  return void 0 !== e && 'none' !== e.action;
}
var $27baed8aea9cf78c$export$8d080c28108db9dd = function (e, t, r) {
    void 0 === r && (r = !0);
    var n = {};
    t.forEach(function (t) {
      if ($27baed8aea9cf78c$export$23bace2b7923e5d1.includes(e.states[t].state) === r) {
        var i = $27baed8aea9cf78c$export$2044bdc9670769ab(t),
          a = ['cover', 'lock'].includes(i) ? i : 'homeassistant';
        a in n || (n[a] = []), n[a].push(t);
      }
    }),
      Object.keys(n).forEach(function (t) {
        var i;
        switch (t) {
          case 'lock':
            i = r ? 'unlock' : 'lock';
            break;
          case 'cover':
            i = r ? 'open_cover' : 'close_cover';
            break;
          default:
            i = r ? 'turn_on' : 'turn_off';
        }
        e.callService(t, i, {
          entity_id: n[t],
        });
      });
  },
  $27baed8aea9cf78c$export$b5e56594b0d6a61e = function () {
    var e = document.querySelector('home-assistant');
    if (
      (e =
        (e =
          (e =
            (e =
              ((e =
                (e = (e = (e = e && e.shadowRoot) && e.querySelector('home-assistant-main')) && e.shadowRoot) &&
                e.querySelector('app-drawer-layout partial-panel-resolver')) &&
                e.shadowRoot) ||
              e) && e.querySelector('ha-panel-lovelace')) && e.shadowRoot) && e.querySelector('hui-root'))
    ) {
      var t = e.lovelace;
      return (t.current_view = e.___curView), t;
    }
    return null;
  },
  $27baed8aea9cf78c$var$xe = {
    humidity: 'mdi:water-percent',
    illuminance: 'mdi:brightness-5',
    temperature: 'mdi:thermometer',
    pressure: 'mdi:gauge',
    power: 'mdi:flash',
    signal_strength: 'mdi:wifi',
  },
  $27baed8aea9cf78c$var$De = {
    binary_sensor: function (e, t) {
      var r = 'off' === e;
      switch (null == t ? void 0 : t.attributes.device_class) {
        case 'battery':
          return r ? 'mdi:battery' : 'mdi:battery-outline';
        case 'battery_charging':
          return r ? 'mdi:battery' : 'mdi:battery-charging';
        case 'cold':
          return r ? 'mdi:thermometer' : 'mdi:snowflake';
        case 'connectivity':
          return r ? 'mdi:server-network-off' : 'mdi:server-network';
        case 'door':
          return r ? 'mdi:door-closed' : 'mdi:door-open';
        case 'garage_door':
          return r ? 'mdi:garage' : 'mdi:garage-open';
        case 'power':
          return r ? 'mdi:power-plug-off' : 'mdi:power-plug';
        case 'gas':
        case 'problem':
        case 'safety':
        case 'tamper':
          return r ? 'mdi:check-circle' : 'mdi:alert-circle';
        case 'smoke':
          return r ? 'mdi:check-circle' : 'mdi:smoke';
        case 'heat':
          return r ? 'mdi:thermometer' : 'mdi:fire';
        case 'light':
          return r ? 'mdi:brightness-5' : 'mdi:brightness-7';
        case 'lock':
          return r ? 'mdi:lock' : 'mdi:lock-open';
        case 'moisture':
          return r ? 'mdi:water-off' : 'mdi:water';
        case 'motion':
          return r ? 'mdi:walk' : 'mdi:run';
        case 'occupancy':
          return r ? 'mdi:home-outline' : 'mdi:home';
        case 'opening':
          return r ? 'mdi:square' : 'mdi:square-outline';
        case 'plug':
          return r ? 'mdi:power-plug-off' : 'mdi:power-plug';
        case 'presence':
          return r ? 'mdi:home-outline' : 'mdi:home';
        case 'running':
          return r ? 'mdi:stop' : 'mdi:play';
        case 'sound':
          return r ? 'mdi:music-note-off' : 'mdi:music-note';
        case 'update':
          return r ? 'mdi:package' : 'mdi:package-up';
        case 'vibration':
          return r ? 'mdi:crop-portrait' : 'mdi:vibrate';
        case 'window':
          return r ? 'mdi:window-closed' : 'mdi:window-open';
        default:
          return r ? 'mdi:radiobox-blank' : 'mdi:checkbox-marked-circle';
      }
    },
    cover: function (e) {
      var t = 'closed' !== e.state;
      switch (e.attributes.device_class) {
        case 'garage':
          return t ? 'mdi:garage-open' : 'mdi:garage';
        case 'door':
          return t ? 'mdi:door-open' : 'mdi:door-closed';
        case 'shutter':
          return t ? 'mdi:window-shutter-open' : 'mdi:window-shutter';
        case 'blind':
          return t ? 'mdi:blinds-open' : 'mdi:blinds';
        case 'window':
          return t ? 'mdi:window-open' : 'mdi:window-closed';
        default:
          return $27baed8aea9cf78c$export$13fcd5035aa1446('cover', e.state);
      }
    },
    sensor: function (e) {
      var t = e.attributes.device_class;
      if (t && t in $27baed8aea9cf78c$var$xe) return $27baed8aea9cf78c$var$xe[t];
      if ('battery' === t) {
        var r = Number(e.state);
        if (isNaN(r)) return 'mdi:battery-unknown';
        var n = 10 * Math.round(r / 10);
        return n >= 100 ? 'mdi:battery' : n <= 0 ? 'mdi:battery-alert' : 'hass:battery-' + n;
      }
      var i = e.attributes.unit_of_measurement;
      return '\xb0C' === i || '\xb0F' === i ? 'mdi:thermometer' : $27baed8aea9cf78c$export$13fcd5035aa1446('sensor');
    },
    input_datetime: function (e) {
      return e.attributes.has_date
        ? e.attributes.has_time
          ? $27baed8aea9cf78c$export$13fcd5035aa1446('input_datetime')
          : 'mdi:calendar'
        : 'mdi:clock';
    },
  },
  $27baed8aea9cf78c$export$d138d1363acbec1f = function (e) {
    if (!e) return 'mdi:bookmark';
    if (e.attributes.icon) return e.attributes.icon;
    var t = $27baed8aea9cf78c$export$2044bdc9670769ab(e.entity_id);
    return t in $27baed8aea9cf78c$var$De
      ? $27baed8aea9cf78c$var$De[t](e)
      : $27baed8aea9cf78c$export$13fcd5035aa1446(t, e.state);
  };

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $ddfb2c29b2cf8c31$var$t = window,
  $ddfb2c29b2cf8c31$export$b4d10f6001c083c2 =
    $ddfb2c29b2cf8c31$var$t.ShadowRoot &&
    (void 0 === $ddfb2c29b2cf8c31$var$t.ShadyCSS || $ddfb2c29b2cf8c31$var$t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  $ddfb2c29b2cf8c31$var$s = Symbol(),
  $ddfb2c29b2cf8c31$var$n = new WeakMap();
class $ddfb2c29b2cf8c31$export$505d1e8739bad805 {
  constructor(t, e, n) {
    if (((this._$cssResult$ = !0), n !== $ddfb2c29b2cf8c31$var$s))
      throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if ($ddfb2c29b2cf8c31$export$b4d10f6001c083c2 && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = $ddfb2c29b2cf8c31$var$n.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && $ddfb2c29b2cf8c31$var$n.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const $ddfb2c29b2cf8c31$export$8d80f9cac07cdb3 = (t) =>
    new $ddfb2c29b2cf8c31$export$505d1e8739bad805('string' == typeof t ? t : t + '', void 0, $ddfb2c29b2cf8c31$var$s),
  $ddfb2c29b2cf8c31$export$dbf350e5966cf602 = (t, ...e) => {
    const n =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, s, n) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(s) +
              t[n + 1],
            t[0],
          );
    return new $ddfb2c29b2cf8c31$export$505d1e8739bad805(n, t, $ddfb2c29b2cf8c31$var$s);
  },
  $ddfb2c29b2cf8c31$export$2ca4a66ec4cecb90 = (s, n) => {
    $ddfb2c29b2cf8c31$export$b4d10f6001c083c2
      ? (s.adoptedStyleSheets = n.map((t) => (t instanceof CSSStyleSheet ? t : t.styleSheet)))
      : n.forEach((e) => {
          const n = document.createElement('style'),
            o = $ddfb2c29b2cf8c31$var$t.litNonce;
          void 0 !== o && n.setAttribute('nonce', o), (n.textContent = e.cssText), s.appendChild(n);
        });
  },
  $ddfb2c29b2cf8c31$export$ee69dfd951e24778 = $ddfb2c29b2cf8c31$export$b4d10f6001c083c2
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = '';
              for (const s of t.cssRules) e += s.cssText;
              return $ddfb2c29b2cf8c31$export$8d80f9cac07cdb3(e);
            })(t)
          : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $b6dc6f00f14c505a$var$s;
const $b6dc6f00f14c505a$var$e = window,
  $b6dc6f00f14c505a$var$r = $b6dc6f00f14c505a$var$e.trustedTypes,
  $b6dc6f00f14c505a$var$h = $b6dc6f00f14c505a$var$r ? $b6dc6f00f14c505a$var$r.emptyScript : '',
  $b6dc6f00f14c505a$var$o = $b6dc6f00f14c505a$var$e.reactiveElementPolyfillSupport,
  $b6dc6f00f14c505a$export$7312b35fbf521afb = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? $b6dc6f00f14c505a$var$h : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  $b6dc6f00f14c505a$export$53a6892c50694894 = (t, i) => i !== t && (i == i || t == t),
  $b6dc6f00f14c505a$var$l = {
    attribute: !0,
    type: String,
    converter: $b6dc6f00f14c505a$export$7312b35fbf521afb,
    reflect: !1,
    hasChanged: $b6dc6f00f14c505a$export$53a6892c50694894,
  },
  $b6dc6f00f14c505a$var$d = 'finalized';
class $b6dc6f00f14c505a$export$c7c07a37856565d extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this._$Eu();
  }
  static addInitializer(t) {
    var i;
    this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : (this.h = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this._$Ep(s, i);
        void 0 !== e && (this._$Ev.set(e, s), t.push(e));
      }),
      t
    );
  }
  static createProperty(t, i = $b6dc6f00f14c505a$var$l) {
    if (
      (i.state && (i.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, i),
      !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const r = this[t];
        (this[i] = e), this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || $b6dc6f00f14c505a$var$l;
  }
  static finalize() {
    if (this.hasOwnProperty($b6dc6f00f14c505a$var$d)) return !1;
    this[$b6dc6f00f14c505a$var$d] = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      void 0 !== t.h && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());
      for (const i of e) s.unshift((0, $ddfb2c29b2cf8c31$export$ee69dfd951e24778)(i));
    } else void 0 !== i && s.push((0, $ddfb2c29b2cf8c31$export$ee69dfd951e24778)(i));
    return s;
  }
  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : 'string' == typeof s ? s : 'string' == typeof t ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      null === (t = this.constructor.h) || void 0 === t || t.forEach((t) => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : (this._$ES = [])).push(t),
      void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const s =
      null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return (0, $ddfb2c29b2cf8c31$export$2ca4a66ec4cecb90)(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$ES) ||
        void 0 === t ||
        t.forEach((t) => {
          var i;
          return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((t) => {
        var i;
        return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
      });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i, s = $b6dc6f00f14c505a$var$l) {
    var e;
    const r = this.constructor._$Ep(t, s);
    if (void 0 !== r && !0 === s.reflect) {
      const h = (
        void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute)
          ? s.converter
          : $b6dc6f00f14c505a$export$7312b35fbf521afb
      ).toAttribute(i, s.type);
      (this._$El = t), null == h ? this.removeAttribute(r) : this.setAttribute(r, h), (this._$El = null);
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      r = e._$Ev.get(t);
    if (void 0 !== r && this._$El !== r) {
      const t = e.getPropertyOptions(r),
        h =
          'function' == typeof t.converter
            ? {
                fromAttribute: t.converter,
              }
            : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute)
            ? t.converter
            : $b6dc6f00f14c505a$export$7312b35fbf521afb;
      (this._$El = r), (this[r] = h.fromAttribute(i, t.type)), (this._$El = null);
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || $b6dc6f00f14c505a$export$53a6892c50694894)(
        this[t],
        i,
      )
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => (this[i] = t)), (this._$Ei = void 0));
    let i = !1;
    const s = this._$AL;
    try {
      (i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach((t) => {
                var i;
                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
              }),
            this.update(s))
          : this._$Ek();
    } catch (t) {
      throw ((i = !1), this._$Ek(), t);
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$ES) ||
      void 0 === i ||
      i.forEach((t) => {
        var i;
        return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), (this._$EC = void 0)), this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
($b6dc6f00f14c505a$export$c7c07a37856565d[$b6dc6f00f14c505a$var$d] = !0),
  ($b6dc6f00f14c505a$export$c7c07a37856565d.elementProperties = new Map()),
  ($b6dc6f00f14c505a$export$c7c07a37856565d.elementStyles = []),
  ($b6dc6f00f14c505a$export$c7c07a37856565d.shadowRootOptions = {
    mode: 'open',
  }),
  null == $b6dc6f00f14c505a$var$o ||
    $b6dc6f00f14c505a$var$o({
      ReactiveElement: $b6dc6f00f14c505a$export$c7c07a37856565d,
    }),
  (null !== ($b6dc6f00f14c505a$var$s = $b6dc6f00f14c505a$var$e.reactiveElementVersions) &&
  void 0 !== $b6dc6f00f14c505a$var$s
    ? $b6dc6f00f14c505a$var$s
    : ($b6dc6f00f14c505a$var$e.reactiveElementVersions = [])
  ).push('1.6.3');

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $d33ef1320595a3ac$var$t;
const $d33ef1320595a3ac$var$i = window,
  $d33ef1320595a3ac$var$s = $d33ef1320595a3ac$var$i.trustedTypes,
  $d33ef1320595a3ac$var$e = $d33ef1320595a3ac$var$s
    ? $d33ef1320595a3ac$var$s.createPolicy('lit-html', {
        createHTML: (t) => t,
      })
    : void 0,
  $d33ef1320595a3ac$var$o = '$lit$',
  $d33ef1320595a3ac$var$n = `lit$${(Math.random() + '').slice(9)}$`,
  $d33ef1320595a3ac$var$l = '?' + $d33ef1320595a3ac$var$n,
  $d33ef1320595a3ac$var$h = `<${$d33ef1320595a3ac$var$l}>`,
  $d33ef1320595a3ac$var$r = document,
  $d33ef1320595a3ac$var$u = () => $d33ef1320595a3ac$var$r.createComment(''),
  $d33ef1320595a3ac$var$d = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  $d33ef1320595a3ac$var$c = Array.isArray,
  $d33ef1320595a3ac$var$v = (t) =>
    $d33ef1320595a3ac$var$c(t) || 'function' == typeof (null == t ? void 0 : t[Symbol.iterator]),
  $d33ef1320595a3ac$var$a = '[ \t\n\f\r]',
  $d33ef1320595a3ac$var$f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  $d33ef1320595a3ac$var$_ = /-->/g,
  $d33ef1320595a3ac$var$m = />/g,
  $d33ef1320595a3ac$var$p = RegExp(
    `>|${$d33ef1320595a3ac$var$a}(?:([^\\s"'>=/]+)(${$d33ef1320595a3ac$var$a}*=${$d33ef1320595a3ac$var$a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    'g',
  ),
  $d33ef1320595a3ac$var$g = /'/g,
  $d33ef1320595a3ac$var$$ = /"/g,
  $d33ef1320595a3ac$var$y = /^(?:script|style|textarea|title)$/i,
  $d33ef1320595a3ac$var$w =
    (t) =>
    (i, ...s) => ({
      _$litType$: t,
      strings: i,
      values: s,
    }),
  $d33ef1320595a3ac$export$c0bb0b647f701bb5 = $d33ef1320595a3ac$var$w(1),
  $d33ef1320595a3ac$export$7ed1367e7fa1ad68 = $d33ef1320595a3ac$var$w(2),
  $d33ef1320595a3ac$export$9c068ae9cc5db4e8 = Symbol.for('lit-noChange'),
  $d33ef1320595a3ac$export$45b790e32b2810ee = Symbol.for('lit-nothing'),
  $d33ef1320595a3ac$var$E = new WeakMap(),
  $d33ef1320595a3ac$var$C = $d33ef1320595a3ac$var$r.createTreeWalker($d33ef1320595a3ac$var$r, 129, null, !1);
function $d33ef1320595a3ac$var$P(t, i) {
  if (!Array.isArray(t) || !t.hasOwnProperty('raw')) throw Error('invalid template strings array');
  return void 0 !== $d33ef1320595a3ac$var$e ? $d33ef1320595a3ac$var$e.createHTML(i) : i;
}
const $d33ef1320595a3ac$var$V = (t, i) => {
  const s = t.length - 1,
    e = [];
  let l,
    r = 2 === i ? '<svg>' : '',
    u = $d33ef1320595a3ac$var$f;
  for (let i = 0; i < s; i++) {
    const s = t[i];
    let d,
      c,
      v = -1,
      a = 0;
    for (; a < s.length && ((u.lastIndex = a), (c = u.exec(s)), null !== c); )
      (a = u.lastIndex),
        u === $d33ef1320595a3ac$var$f
          ? '!--' === c[1]
            ? (u = $d33ef1320595a3ac$var$_)
            : void 0 !== c[1]
            ? (u = $d33ef1320595a3ac$var$m)
            : void 0 !== c[2]
            ? ($d33ef1320595a3ac$var$y.test(c[2]) && (l = RegExp('</' + c[2], 'g')), (u = $d33ef1320595a3ac$var$p))
            : void 0 !== c[3] && (u = $d33ef1320595a3ac$var$p)
          : u === $d33ef1320595a3ac$var$p
          ? '>' === c[0]
            ? ((u = null != l ? l : $d33ef1320595a3ac$var$f), (v = -1))
            : void 0 === c[1]
            ? (v = -2)
            : ((v = u.lastIndex - c[2].length),
              (d = c[1]),
              (u =
                void 0 === c[3]
                  ? $d33ef1320595a3ac$var$p
                  : '"' === c[3]
                  ? $d33ef1320595a3ac$var$$
                  : $d33ef1320595a3ac$var$g))
          : u === $d33ef1320595a3ac$var$$ || u === $d33ef1320595a3ac$var$g
          ? (u = $d33ef1320595a3ac$var$p)
          : u === $d33ef1320595a3ac$var$_ || u === $d33ef1320595a3ac$var$m
          ? (u = $d33ef1320595a3ac$var$f)
          : ((u = $d33ef1320595a3ac$var$p), (l = void 0));
    const w = u === $d33ef1320595a3ac$var$p && t[i + 1].startsWith('/>') ? ' ' : '';
    r +=
      u === $d33ef1320595a3ac$var$f
        ? s + $d33ef1320595a3ac$var$h
        : v >= 0
        ? (e.push(d), s.slice(0, v) + $d33ef1320595a3ac$var$o + s.slice(v) + $d33ef1320595a3ac$var$n + w)
        : s + $d33ef1320595a3ac$var$n + (-2 === v ? (e.push(void 0), i) : w);
  }
  return [$d33ef1320595a3ac$var$P(t, r + (t[s] || '<?>') + (2 === i ? '</svg>' : '')), e];
};
class $d33ef1320595a3ac$var$N {
  constructor({ strings: t, _$litType$: i }, e) {
    let h;
    this.parts = [];
    let r = 0,
      d = 0;
    const c = t.length - 1,
      v = this.parts,
      [a, f] = $d33ef1320595a3ac$var$V(t, i);
    if (
      ((this.el = $d33ef1320595a3ac$var$N.createElement(a, e)),
      ($d33ef1320595a3ac$var$C.currentNode = this.el.content),
      2 === i)
    ) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (h = $d33ef1320595a3ac$var$C.nextNode()) && v.length < c; ) {
      if (1 === h.nodeType) {
        if (h.hasAttributes()) {
          const t = [];
          for (const i of h.getAttributeNames())
            if (i.endsWith($d33ef1320595a3ac$var$o) || i.startsWith($d33ef1320595a3ac$var$n)) {
              const s = f[d++];
              if ((t.push(i), void 0 !== s)) {
                const t = h.getAttribute(s.toLowerCase() + $d33ef1320595a3ac$var$o).split($d33ef1320595a3ac$var$n),
                  i = /([.?@])?(.*)/.exec(s);
                v.push({
                  type: 1,
                  index: r,
                  name: i[2],
                  strings: t,
                  ctor:
                    '.' === i[1]
                      ? $d33ef1320595a3ac$var$H
                      : '?' === i[1]
                      ? $d33ef1320595a3ac$var$L
                      : '@' === i[1]
                      ? $d33ef1320595a3ac$var$z
                      : $d33ef1320595a3ac$var$k,
                });
              } else
                v.push({
                  type: 6,
                  index: r,
                });
            }
          for (const i of t) h.removeAttribute(i);
        }
        if ($d33ef1320595a3ac$var$y.test(h.tagName)) {
          const t = h.textContent.split($d33ef1320595a3ac$var$n),
            i = t.length - 1;
          if (i > 0) {
            h.textContent = $d33ef1320595a3ac$var$s ? $d33ef1320595a3ac$var$s.emptyScript : '';
            for (let s = 0; s < i; s++)
              h.append(t[s], $d33ef1320595a3ac$var$u()),
                $d33ef1320595a3ac$var$C.nextNode(),
                v.push({
                  type: 2,
                  index: ++r,
                });
            h.append(t[i], $d33ef1320595a3ac$var$u());
          }
        }
      } else if (8 === h.nodeType) {
        if (h.data === $d33ef1320595a3ac$var$l)
          v.push({
            type: 2,
            index: r,
          });
        else {
          let t = -1;
          for (; -1 !== (t = h.data.indexOf($d33ef1320595a3ac$var$n, t + 1)); )
            v.push({
              type: 7,
              index: r,
            }),
              (t += $d33ef1320595a3ac$var$n.length - 1);
        }
      }
      r++;
    }
  }
  static createElement(t, i) {
    const s = $d33ef1320595a3ac$var$r.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function $d33ef1320595a3ac$var$S(t, i, s = t, e) {
  var o, n, l, h;
  if (i === $d33ef1320595a3ac$export$9c068ae9cc5db4e8) return i;
  let r = void 0 !== e ? (null === (o = s._$Co) || void 0 === o ? void 0 : o[e]) : s._$Cl;
  const u = $d33ef1320595a3ac$var$d(i) ? void 0 : i._$litDirective$;
  return (
    (null == r ? void 0 : r.constructor) !== u &&
      (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1),
      void 0 === u ? (r = void 0) : ((r = new u(t)), r._$AT(t, s, e)),
      void 0 !== e ? ((null !== (l = (h = s)._$Co) && void 0 !== l ? l : (h._$Co = []))[e] = r) : (s._$Cl = r)),
    void 0 !== r && (i = $d33ef1320595a3ac$var$S(t, r._$AS(t, i.values), r, e)),
    i
  );
}
class $d33ef1320595a3ac$var$M {
  constructor(t, i) {
    (this._$AV = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    var i;
    const {
        el: { content: s },
        parts: e,
      } = this._$AD,
      o = (
        null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : $d33ef1320595a3ac$var$r
      ).importNode(s, !0);
    $d33ef1320595a3ac$var$C.currentNode = o;
    let n = $d33ef1320595a3ac$var$C.nextNode(),
      l = 0,
      h = 0,
      u = e[0];
    for (; void 0 !== u; ) {
      if (l === u.index) {
        let i;
        2 === u.type
          ? (i = new $d33ef1320595a3ac$var$R(n, n.nextSibling, this, t))
          : 1 === u.type
          ? (i = new u.ctor(n, u.name, u.strings, this, t))
          : 6 === u.type && (i = new $d33ef1320595a3ac$var$Z(n, this, t)),
          this._$AV.push(i),
          (u = e[++h]);
      }
      l !== (null == u ? void 0 : u.index) && ((n = $d33ef1320595a3ac$var$C.nextNode()), l++);
    }
    return ($d33ef1320595a3ac$var$C.currentNode = $d33ef1320595a3ac$var$r), o;
  }
  v(t) {
    let i = 0;
    for (const s of this._$AV)
      void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), (i += s.strings.length - 2)) : s._$AI(t[i])), i++;
  }
}
class $d33ef1320595a3ac$var$R {
  constructor(t, i, s, e) {
    var o;
    (this.type = 2),
      (this._$AH = $d33ef1320595a3ac$export$45b790e32b2810ee),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this._$Cp = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o);
  }
  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cp;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === (null == t ? void 0 : t.nodeType) && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    (t = $d33ef1320595a3ac$var$S(this, t, i)),
      $d33ef1320595a3ac$var$d(t)
        ? t === $d33ef1320595a3ac$export$45b790e32b2810ee || null == t || '' === t
          ? (this._$AH !== $d33ef1320595a3ac$export$45b790e32b2810ee && this._$AR(),
            (this._$AH = $d33ef1320595a3ac$export$45b790e32b2810ee))
          : t !== this._$AH && t !== $d33ef1320595a3ac$export$9c068ae9cc5db4e8 && this._(t)
        : void 0 !== t._$litType$
        ? this.g(t)
        : void 0 !== t.nodeType
        ? this.$(t)
        : $d33ef1320595a3ac$var$v(t)
        ? this.T(t)
        : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.k(t)));
  }
  _(t) {
    this._$AH !== $d33ef1320595a3ac$export$45b790e32b2810ee && $d33ef1320595a3ac$var$d(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.$($d33ef1320595a3ac$var$r.createTextNode(t)),
      (this._$AH = t);
  }
  g(t) {
    var i;
    const { values: s, _$litType$: e } = t,
      o =
        'number' == typeof e
          ? this._$AC(t)
          : (void 0 === e.el &&
              (e.el = $d33ef1320595a3ac$var$N.createElement($d33ef1320595a3ac$var$P(e.h, e.h[0]), this.options)),
            e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.v(s);
    else {
      const t = new $d33ef1320595a3ac$var$M(o, this),
        i = t.u(this.options);
      t.v(s), this.$(i), (this._$AH = t);
    }
  }
  _$AC(t) {
    let i = $d33ef1320595a3ac$var$E.get(t.strings);
    return void 0 === i && $d33ef1320595a3ac$var$E.set(t.strings, (i = new $d33ef1320595a3ac$var$N(t))), i;
  }
  T(t) {
    $d33ef1320595a3ac$var$c(this._$AH) || ((this._$AH = []), this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const o of t)
      e === i.length
        ? i.push(
            (s = new $d33ef1320595a3ac$var$R(
              this.k($d33ef1320595a3ac$var$u()),
              this.k($d33ef1320595a3ac$var$u()),
              this,
              this.options,
            )),
          )
        : (s = i[e]),
        s._$AI(o),
        e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM && ((this._$Cp = t), null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class $d33ef1320595a3ac$var$k {
  constructor(t, i, s, e, o) {
    (this.type = 1),
      (this._$AH = $d33ef1320595a3ac$export$45b790e32b2810ee),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = o),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())), (this.strings = s))
        : (this._$AH = $d33ef1320595a3ac$export$45b790e32b2810ee);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o)
      (t = $d33ef1320595a3ac$var$S(this, t, i, 0)),
        (n = !$d33ef1320595a3ac$var$d(t) || (t !== this._$AH && t !== $d33ef1320595a3ac$export$9c068ae9cc5db4e8)),
        n && (this._$AH = t);
    else {
      const e = t;
      let l, h;
      for (t = o[0], l = 0; l < o.length - 1; l++)
        (h = $d33ef1320595a3ac$var$S(this, e[s + l], i, l)),
          h === $d33ef1320595a3ac$export$9c068ae9cc5db4e8 && (h = this._$AH[l]),
          n || (n = !$d33ef1320595a3ac$var$d(h) || h !== this._$AH[l]),
          h === $d33ef1320595a3ac$export$45b790e32b2810ee
            ? (t = $d33ef1320595a3ac$export$45b790e32b2810ee)
            : t !== $d33ef1320595a3ac$export$45b790e32b2810ee && (t += (null != h ? h : '') + o[l + 1]),
          (this._$AH[l] = h);
    }
    n && !e && this.j(t);
  }
  j(t) {
    t === $d33ef1320595a3ac$export$45b790e32b2810ee
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '');
  }
}
class $d33ef1320595a3ac$var$H extends $d33ef1320595a3ac$var$k {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === $d33ef1320595a3ac$export$45b790e32b2810ee ? void 0 : t;
  }
}
const $d33ef1320595a3ac$var$I = $d33ef1320595a3ac$var$s ? $d33ef1320595a3ac$var$s.emptyScript : '';
class $d33ef1320595a3ac$var$L extends $d33ef1320595a3ac$var$k {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    t && t !== $d33ef1320595a3ac$export$45b790e32b2810ee
      ? this.element.setAttribute(this.name, $d33ef1320595a3ac$var$I)
      : this.element.removeAttribute(this.name);
  }
}
class $d33ef1320595a3ac$var$z extends $d33ef1320595a3ac$var$k {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), (this.type = 5);
  }
  _$AI(t, i = this) {
    var s;
    if (
      (t =
        null !== (s = $d33ef1320595a3ac$var$S(this, t, i, 0)) && void 0 !== s
          ? s
          : $d33ef1320595a3ac$export$45b790e32b2810ee) === $d33ef1320595a3ac$export$9c068ae9cc5db4e8
    )
      return;
    const e = this._$AH,
      o =
        (t === $d33ef1320595a3ac$export$45b790e32b2810ee && e !== $d33ef1320595a3ac$export$45b790e32b2810ee) ||
        t.capture !== e.capture ||
        t.once !== e.once ||
        t.passive !== e.passive,
      n = t !== $d33ef1320595a3ac$export$45b790e32b2810ee && (e === $d33ef1320595a3ac$export$45b790e32b2810ee || o);
    o && this.element.removeEventListener(this.name, this, e),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var i, s;
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s
            ? s
            : this.element,
          t,
        )
      : this._$AH.handleEvent(t);
  }
}
class $d33ef1320595a3ac$var$Z {
  constructor(t, i, s) {
    (this.element = t), (this.type = 6), (this._$AN = void 0), (this._$AM = i), (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    $d33ef1320595a3ac$var$S(this, t);
  }
}
const $d33ef1320595a3ac$export$8613d1ca9052b22e = {
    O: $d33ef1320595a3ac$var$o,
    P: $d33ef1320595a3ac$var$n,
    A: $d33ef1320595a3ac$var$l,
    C: 1,
    M: $d33ef1320595a3ac$var$V,
    L: $d33ef1320595a3ac$var$M,
    R: $d33ef1320595a3ac$var$v,
    D: $d33ef1320595a3ac$var$S,
    I: $d33ef1320595a3ac$var$R,
    V: $d33ef1320595a3ac$var$k,
    H: $d33ef1320595a3ac$var$L,
    N: $d33ef1320595a3ac$var$z,
    U: $d33ef1320595a3ac$var$H,
    F: $d33ef1320595a3ac$var$Z,
  },
  $d33ef1320595a3ac$var$B = $d33ef1320595a3ac$var$i.litHtmlPolyfillSupport;
null == $d33ef1320595a3ac$var$B || $d33ef1320595a3ac$var$B($d33ef1320595a3ac$var$N, $d33ef1320595a3ac$var$R),
  (null !== ($d33ef1320595a3ac$var$t = $d33ef1320595a3ac$var$i.litHtmlVersions) && void 0 !== $d33ef1320595a3ac$var$t
    ? $d33ef1320595a3ac$var$t
    : ($d33ef1320595a3ac$var$i.litHtmlVersions = [])
  ).push('2.8.0');
const $d33ef1320595a3ac$export$b3890eb0ae9dca99 = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;
  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new $d33ef1320595a3ac$var$R(
      i.insertBefore($d33ef1320595a3ac$var$u(), t),
      t,
      void 0,
      null != s ? s : {},
    );
  }
  return l._$AI(t), l;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $2251e60b8c61d355$var$t = window,
  $2251e60b8c61d355$export$b4d10f6001c083c2 =
    $2251e60b8c61d355$var$t.ShadowRoot &&
    (void 0 === $2251e60b8c61d355$var$t.ShadyCSS || $2251e60b8c61d355$var$t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  $2251e60b8c61d355$var$s = Symbol(),
  $2251e60b8c61d355$var$n = new WeakMap();
class $2251e60b8c61d355$export$505d1e8739bad805 {
  constructor(t, e, n) {
    if (((this._$cssResult$ = !0), n !== $2251e60b8c61d355$var$s))
      throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    (this.cssText = t), (this.t = e);
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if ($2251e60b8c61d355$export$b4d10f6001c083c2 && void 0 === t) {
      const e = void 0 !== s && 1 === s.length;
      e && (t = $2251e60b8c61d355$var$n.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && $2251e60b8c61d355$var$n.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const $2251e60b8c61d355$export$8d80f9cac07cdb3 = (t) =>
    new $2251e60b8c61d355$export$505d1e8739bad805('string' == typeof t ? t : t + '', void 0, $2251e60b8c61d355$var$s),
  $2251e60b8c61d355$export$dbf350e5966cf602 = (t, ...e) => {
    const n =
      1 === t.length
        ? t[0]
        : e.reduce(
            (e, s, n) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                );
              })(s) +
              t[n + 1],
            t[0],
          );
    return new $2251e60b8c61d355$export$505d1e8739bad805(n, t, $2251e60b8c61d355$var$s);
  },
  $2251e60b8c61d355$export$2ca4a66ec4cecb90 = (s, n) => {
    $2251e60b8c61d355$export$b4d10f6001c083c2
      ? (s.adoptedStyleSheets = n.map((t) => (t instanceof CSSStyleSheet ? t : t.styleSheet)))
      : n.forEach((e) => {
          const n = document.createElement('style'),
            o = $2251e60b8c61d355$var$t.litNonce;
          void 0 !== o && n.setAttribute('nonce', o), (n.textContent = e.cssText), s.appendChild(n);
        });
  },
  $2251e60b8c61d355$export$ee69dfd951e24778 = $2251e60b8c61d355$export$b4d10f6001c083c2
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let e = '';
              for (const s of t.cssRules) e += s.cssText;
              return $2251e60b8c61d355$export$8d80f9cac07cdb3(e);
            })(t)
          : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $0f940d56d4712cb2$var$s;
const $0f940d56d4712cb2$var$e = window,
  $0f940d56d4712cb2$var$r = $0f940d56d4712cb2$var$e.trustedTypes,
  $0f940d56d4712cb2$var$h = $0f940d56d4712cb2$var$r ? $0f940d56d4712cb2$var$r.emptyScript : '',
  $0f940d56d4712cb2$var$o = $0f940d56d4712cb2$var$e.reactiveElementPolyfillSupport,
  $0f940d56d4712cb2$export$7312b35fbf521afb = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? $0f940d56d4712cb2$var$h : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  $0f940d56d4712cb2$export$53a6892c50694894 = (t, i) => i !== t && (i == i || t == t),
  $0f940d56d4712cb2$var$l = {
    attribute: !0,
    type: String,
    converter: $0f940d56d4712cb2$export$7312b35fbf521afb,
    reflect: !1,
    hasChanged: $0f940d56d4712cb2$export$53a6892c50694894,
  },
  $0f940d56d4712cb2$var$d = 'finalized';
class $0f940d56d4712cb2$export$c7c07a37856565d extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this._$Eu();
  }
  static addInitializer(t) {
    var i;
    this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : (this.h = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this._$Ep(s, i);
        void 0 !== e && (this._$Ev.set(e, s), t.push(e));
      }),
      t
    );
  }
  static createProperty(t, i = $0f940d56d4712cb2$var$l) {
    if (
      (i.state && (i.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, i),
      !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const r = this[t];
        (this[i] = e), this.requestUpdate(t, r, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || $0f940d56d4712cb2$var$l;
  }
  static finalize() {
    if (this.hasOwnProperty($0f940d56d4712cb2$var$d)) return !1;
    this[$0f940d56d4712cb2$var$d] = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      void 0 !== t.h && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(i) {
    const s = [];
    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());
      for (const i of e) s.unshift((0, $2251e60b8c61d355$export$ee69dfd951e24778)(i));
    } else void 0 !== i && s.push((0, $2251e60b8c61d355$export$ee69dfd951e24778)(i));
    return s;
  }
  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : 'string' == typeof s ? s : 'string' == typeof t ? t.toLowerCase() : void 0;
  }
  _$Eu() {
    var t;
    (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      null === (t = this.constructor.h) || void 0 === t || t.forEach((t) => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : (this._$ES = [])).push(t),
      void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var t;
    const s =
      null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return (0, $2251e60b8c61d355$export$2ca4a66ec4cecb90)(s, this.constructor.elementStyles), s;
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$ES) ||
        void 0 === t ||
        t.forEach((t) => {
          var i;
          return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((t) => {
        var i;
        return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
      });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i, s = $0f940d56d4712cb2$var$l) {
    var e;
    const r = this.constructor._$Ep(t, s);
    if (void 0 !== r && !0 === s.reflect) {
      const h = (
        void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute)
          ? s.converter
          : $0f940d56d4712cb2$export$7312b35fbf521afb
      ).toAttribute(i, s.type);
      (this._$El = t), null == h ? this.removeAttribute(r) : this.setAttribute(r, h), (this._$El = null);
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      r = e._$Ev.get(t);
    if (void 0 !== r && this._$El !== r) {
      const t = e.getPropertyOptions(r),
        h =
          'function' == typeof t.converter
            ? {
                fromAttribute: t.converter,
              }
            : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute)
            ? t.converter
            : $0f940d56d4712cb2$export$7312b35fbf521afb;
      (this._$El = r), (this[r] = h.fromAttribute(i, t.type)), (this._$El = null);
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || $0f940d56d4712cb2$export$53a6892c50694894)(
        this[t],
        i,
      )
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => (this[i] = t)), (this._$Ei = void 0));
    let i = !1;
    const s = this._$AL;
    try {
      (i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach((t) => {
                var i;
                return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
              }),
            this.update(s))
          : this._$Ek();
    } catch (t) {
      throw ((i = !1), this._$Ek(), t);
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$ES) ||
      void 0 === i ||
      i.forEach((t) => {
        var i;
        return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)), (this._$EC = void 0)), this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
($0f940d56d4712cb2$export$c7c07a37856565d[$0f940d56d4712cb2$var$d] = !0),
  ($0f940d56d4712cb2$export$c7c07a37856565d.elementProperties = new Map()),
  ($0f940d56d4712cb2$export$c7c07a37856565d.elementStyles = []),
  ($0f940d56d4712cb2$export$c7c07a37856565d.shadowRootOptions = {
    mode: 'open',
  }),
  null == $0f940d56d4712cb2$var$o ||
    $0f940d56d4712cb2$var$o({
      ReactiveElement: $0f940d56d4712cb2$export$c7c07a37856565d,
    }),
  (null !== ($0f940d56d4712cb2$var$s = $0f940d56d4712cb2$var$e.reactiveElementVersions) &&
  void 0 !== $0f940d56d4712cb2$var$s
    ? $0f940d56d4712cb2$var$s
    : ($0f940d56d4712cb2$var$e.reactiveElementVersions = [])
  ).push('1.6.3');

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $528e4332d1e3099e$var$l, $528e4332d1e3099e$var$o;
const $528e4332d1e3099e$export$8bf27daf9e8907c9 = (0, $0f940d56d4712cb2$export$c7c07a37856565d);
class $528e4332d1e3099e$export$3f2f9f5909897157 extends (0, $0f940d56d4712cb2$export$c7c07a37856565d) {
  constructor() {
    super(...arguments),
      (this.renderOptions = {
        host: this,
      }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) || (e.renderBefore = i.firstChild), i;
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = (0, $d33ef1320595a3ac$export$b3890eb0ae9dca99)(i, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return 0, $d33ef1320595a3ac$export$9c068ae9cc5db4e8;
  }
}
($528e4332d1e3099e$export$3f2f9f5909897157.finalized = !0),
  ($528e4332d1e3099e$export$3f2f9f5909897157._$litElement$ = !0),
  null === ($528e4332d1e3099e$var$l = globalThis.litElementHydrateSupport) ||
    void 0 === $528e4332d1e3099e$var$l ||
    $528e4332d1e3099e$var$l.call(globalThis, {
      LitElement: $528e4332d1e3099e$export$3f2f9f5909897157,
    });
const $528e4332d1e3099e$var$n = globalThis.litElementPolyfillSupport;
null == $528e4332d1e3099e$var$n ||
  $528e4332d1e3099e$var$n({
    LitElement: $528e4332d1e3099e$export$3f2f9f5909897157,
  });
const $528e4332d1e3099e$export$f5c524615a7708d6 = {
  _$AK: (t, e, i) => {
    t._$AK(e, i);
  },
  _$AL: (t) => t._$AL,
};
(null !== ($528e4332d1e3099e$var$o = globalThis.litElementVersions) && void 0 !== $528e4332d1e3099e$var$o
  ? $528e4332d1e3099e$var$o
  : (globalThis.litElementVersions = [])
).push('3.3.3');

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $56239b0c931b817c$export$6acf61af03e62db = !1;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $e7518269073182cc$export$da64fc29f17f9d0e = (e) => (n) =>
  'function' == typeof n
    ? ((e, n) => (customElements.define(e, n), n))(e, n)
    : ((e, n) => {
        const { kind: t, elements: s } = n;
        return {
          kind: t,
          elements: s,
          finisher(n) {
            customElements.define(e, n);
          },
        };
      })(e, n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $f4e90adcbfd05ac8$var$i = (i, e) =>
    'method' === e.kind && e.descriptor && !('value' in e.descriptor)
      ? {
          ...e,
          finisher(n) {
            n.createProperty(e.key, i);
          },
        }
      : {
          kind: 'field',
          key: Symbol(),
          placement: 'own',
          descriptor: {},
          originalKey: e.key,
          initializer() {
            'function' == typeof e.initializer && (this[e.key] = e.initializer.call(this));
          },
          finisher(n) {
            n.createProperty(e.key, i);
          },
        },
  $f4e90adcbfd05ac8$var$e = (i, e, n) => {
    e.constructor.createProperty(n, i);
  };
function $f4e90adcbfd05ac8$export$d541bacb2bda4494(n) {
  return (t, o) => (void 0 !== o ? $f4e90adcbfd05ac8$var$e(n, t, o) : $f4e90adcbfd05ac8$var$i(n, t));
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $75942718c8e5e237$export$ca000e230c0caa3e(t) {
  return (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
    ...t,
    state: !0,
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $453006e5e60c3948$export$29fd0ed4087278b5 = (e, t, o) => {
    Object.defineProperty(t, o, e);
  },
  $453006e5e60c3948$export$18eb0154d0069a01 = (e, t) => ({
    kind: 'method',
    placement: 'prototype',
    key: t.key,
    descriptor: e,
  }),
  $453006e5e60c3948$export$757d561a932dc1cb =
    ({ finisher: e, descriptor: t }) =>
    (o, n) => {
      var r;
      if (void 0 === n) {
        const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key,
          i =
            null != t
              ? {
                  kind: 'method',
                  placement: 'prototype',
                  key: n,
                  descriptor: t(o.key),
                }
              : {
                  ...o,
                  key: n,
                };
        return (
          null != e &&
            (i.finisher = function (t) {
              e(t, n);
            }),
          i
        );
      }
      {
        const r = o.constructor;
        void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n);
      }
    };

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $3dadbc6c74440e7e$export$b2b799818fbabcf3(e) {
  return (0, $453006e5e60c3948$export$757d561a932dc1cb)({
    finisher: (r, t) => {
      Object.assign(r.prototype[t], e);
    },
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $085de2d19856317e$export$2fa187e846a241c4(i, n) {
  return (0, $453006e5e60c3948$export$757d561a932dc1cb)({
    descriptor: (o) => {
      const t = {
        get() {
          var o, n;
          return null !== (n = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) &&
            void 0 !== n
            ? n
            : null;
        },
        enumerable: !0,
        configurable: !0,
      };
      if (n) {
        const n = 'symbol' == typeof o ? Symbol() : '__' + o;
        t.get = function () {
          var o, t;
          return (
            void 0 === this[n] &&
              (this[n] =
                null !== (t = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) &&
                void 0 !== t
                  ? t
                  : null),
            this[n]
          );
        };
      }
      return t;
    },
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $9e5a8650fca570ee$export$dcd0d083aa86c355(e) {
  return (0, $453006e5e60c3948$export$757d561a932dc1cb)({
    descriptor: (r) => ({
      get() {
        var r, o;
        return null !== (o = null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelectorAll(e)) &&
          void 0 !== o
          ? o
          : [];
      },
      enumerable: !0,
      configurable: !0,
    }),
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $d1ceaa018c9a1641$export$163dfc35cc43f240(e) {
  return (0, $453006e5e60c3948$export$757d561a932dc1cb)({
    descriptor: (r) => ({
      async get() {
        var r;
        return await this.updateComplete, null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelector(e);
      },
      enumerable: !0,
      configurable: !0,
    }),
  });
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var $b6a21e6bb342e726$var$n;
const $b6a21e6bb342e726$var$e =
  null !=
  (null === ($b6a21e6bb342e726$var$n = window.HTMLSlotElement) || void 0 === $b6a21e6bb342e726$var$n
    ? void 0
    : $b6a21e6bb342e726$var$n.prototype.assignedElements)
    ? (o, n) => o.assignedElements(n)
    : (o, n) => o.assignedNodes(n).filter((o) => o.nodeType === Node.ELEMENT_NODE);
function $b6a21e6bb342e726$export$4682af2d9ee91415(n) {
  const { slot: l, selector: t } = null != n ? n : {};
  return (0, $453006e5e60c3948$export$757d561a932dc1cb)({
    descriptor: (o) => ({
      get() {
        var o;
        const r = 'slot' + (l ? `[name=${l}]` : ':not([name])'),
          i = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(r),
          s = null != i ? $b6a21e6bb342e726$var$e(i, n) : [];
        return t ? s.filter((o) => o.matches(t)) : s;
      },
      enumerable: !0,
      configurable: !0,
    }),
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $ad365f4b69f12973$export$1bdbe53f9df1b8(o, n, r) {
  let l,
    s = o;
  return (
    'object' == typeof o
      ? ((s = o.slot), (l = o))
      : (l = {
          flatten: n,
        }),
    r
      ? (0, $b6a21e6bb342e726$export$4682af2d9ee91415)({
          slot: s,
          flatten: n,
          selector: r,
        })
      : (0, $453006e5e60c3948$export$757d561a932dc1cb)({
          descriptor: (e) => ({
            get() {
              var e, t;
              const o = 'slot' + (s ? `[name=${s}]` : ':not([name])'),
                n = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(o);
              return null !== (t = null == n ? void 0 : n.assignedNodes(l)) && void 0 !== t ? t : [];
            },
            enumerable: !0,
            configurable: !0,
          }),
        })
  );
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $f62b4c9bce56f3ae$export$9ba3b3f20a85bfa = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6,
  },
  $f62b4c9bce56f3ae$export$99b43ad1ed32e735 =
    (t) =>
    (...e) => ({
      _$litDirective$: t,
      values: e,
    });
class $f62b4c9bce56f3ae$export$befdefbdce210f91 {
  constructor(t) {}
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    (this._$Ct = t), (this._$AM = e), (this._$Ci = i);
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $da98d0425d3716de$export$56cc687933817664 = (0, $f62b4c9bce56f3ae$export$99b43ad1ed32e735)(
  class extends (0, $f62b4c9bce56f3ae$export$befdefbdce210f91) {
    constructor(t) {
      var i;
      if (
        (super(t),
        t.type !== (0, $f62b4c9bce56f3ae$export$9ba3b3f20a85bfa).ATTRIBUTE ||
          'class' !== t.name ||
          (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2)
      )
        throw Error(
          '`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.',
        );
    }
    render(t) {
      return (
        ' ' +
        Object.keys(t)
          .filter((i) => t[i])
          .join(' ') +
        ' '
      );
    }
    update(i, [s]) {
      var r, o;
      if (void 0 === this.it) {
        (this.it = new Set()),
          void 0 !== i.strings &&
            (this.nt = new Set(
              i.strings
                .join(' ')
                .split(/\s/)
                .filter((t) => '' !== t),
            ));
        for (const t in s) s[t] && !(null === (r = this.nt) || void 0 === r ? void 0 : r.has(t)) && this.it.add(t);
        return this.render(s);
      }
      const e = i.element.classList;
      this.it.forEach((t) => {
        t in s || (e.remove(t), this.it.delete(t));
      });
      for (const t in s) {
        const i = !!s[t];
        i === this.it.has(t) ||
          (null === (o = this.nt) || void 0 === o ? void 0 : o.has(t)) ||
          (i ? (e.add(t), this.it.add(t)) : (e.remove(t), this.it.delete(t)));
      }
      return 0, $d33ef1320595a3ac$export$9c068ae9cc5db4e8;
    }
  },
);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $814a01f0ca5c43f6$var$i = 'important',
  $814a01f0ca5c43f6$var$n = ' !' + $814a01f0ca5c43f6$var$i,
  $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a = (0, $f62b4c9bce56f3ae$export$99b43ad1ed32e735)(
    class extends (0, $f62b4c9bce56f3ae$export$befdefbdce210f91) {
      constructor(t) {
        var e;
        if (
          (super(t),
          t.type !== (0, $f62b4c9bce56f3ae$export$9ba3b3f20a85bfa).ATTRIBUTE ||
            'style' !== t.name ||
            (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2)
        )
          throw Error(
            'The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.',
          );
      }
      render(t) {
        return Object.keys(t).reduce((e, r) => {
          const s = t[r];
          return null == s
            ? e
            : e +
                `${(r = r.includes('-')
                  ? r
                  : r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, '-$&').toLowerCase())}:${s};`;
        }, '');
      }
      update(e, [r]) {
        const { style: s } = e.element;
        if (void 0 === this.ht) {
          this.ht = new Set();
          for (const t in r) this.ht.add(t);
          return this.render(r);
        }
        this.ht.forEach((t) => {
          null == r[t] && (this.ht.delete(t), t.includes('-') ? s.removeProperty(t) : (s[t] = ''));
        });
        for (const t in r) {
          const e = r[t];
          if (null != e) {
            this.ht.add(t);
            const r = 'string' == typeof e && e.endsWith($814a01f0ca5c43f6$var$n);
            t.includes('-') || r
              ? s.setProperty(t, r ? e.slice(0, -11) : e, r ? $814a01f0ca5c43f6$var$i : '')
              : (s[t] = e);
          }
        }
        return 0, $d33ef1320595a3ac$export$9c068ae9cc5db4e8;
      }
    },
  );

var $cc1282133b958b24$exports = {};
/*
 (c) 2011-2015, Vladimir Agafonkin
 SunCalc is a JavaScript library for calculating sun/moon position and light phases.
 https://github.com/mourner/suncalc
*/ (function () {
  'use strict';
  // shortcuts for easier to read formulas
  var PI = Math.PI,
    sin = Math.sin,
    cos = Math.cos,
    tan = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad = PI / 180;
  // sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas
  // date/time constants and conversions
  var dayMs = 86400000,
    J1970 = 2440588,
    J2000 = 2451545;
  function toJulian(date) {
    return date.valueOf() / dayMs - 0.5 + J1970;
  }
  function fromJulian(j) {
    return new Date((j + 0.5 - J1970) * dayMs);
  }
  function toDays(date) {
    return toJulian(date) - J2000;
  }
  // general calculations for position
  var e = rad * 23.4397; // obliquity of the Earth
  function rightAscension(l, b) {
    return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l));
  }
  function declination(l, b) {
    return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l));
  }
  function azimuth(H, phi, dec) {
    return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi));
  }
  function altitude(H, phi, dec) {
    return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H));
  }
  function siderealTime(d, lw) {
    return rad * (280.16 + 360.9856235 * d) - lw;
  }
  function astroRefraction(h) {
    if (h < 0) h = 0; // if h = -0.08901179 a div/0 would occur.
    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
  }
  // general sun calculations
  function solarMeanAnomaly(d) {
    return rad * (357.5291 + 0.98560028 * d);
  }
  function eclipticLongitude(M) {
    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)),
      P = rad * 102.9372; // perihelion of the Earth
    return M + C + P + PI;
  }
  function sunCoords(d) {
    var M = solarMeanAnomaly(d),
      L = eclipticLongitude(M);
    return {
      dec: declination(L, 0),
      ra: rightAscension(L, 0),
    };
  }
  var SunCalc = {};
  // calculates sun position for a given date and latitude/longitude
  SunCalc.getPosition = function (date, lat, lng) {
    var lw = rad * -lng,
      phi = rad * lat,
      d = toDays(date),
      c = sunCoords(d),
      H = siderealTime(d, lw) - c.ra;
    return {
      azimuth: azimuth(H, phi, c.dec),
      altitude: altitude(H, phi, c.dec),
    };
  };
  // sun times configuration (angle, morning name, evening name)
  var times = (SunCalc.times = [
    [-0.833, 'sunrise', 'sunset'],
    [-0.3, 'sunriseEnd', 'sunsetStart'],
    [-6, 'dawn', 'dusk'],
    [-12, 'nauticalDawn', 'nauticalDusk'],
    [-18, 'nightEnd', 'night'],
    [6, 'goldenHourEnd', 'goldenHour'],
  ]);
  // adds a custom time to the times config
  SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
  };
  // calculations for sun times
  var J0 = 0.0009;
  function julianCycle(d, lw) {
    return Math.round(d - J0 - lw / (2 * PI));
  }
  function approxTransit(Ht, lw, n) {
    return J0 + (Ht + lw) / (2 * PI) + n;
  }
  function solarTransitJ(ds, M, L) {
    return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L);
  }
  function hourAngle(h, phi, d) {
    return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d)));
  }
  function observerAngle(height) {
    return (-2.076 * Math.sqrt(height)) / 60;
  }
  // returns set time for the given sun altitude
  function getSetJ(h, lw, phi, dec, n, M, L) {
    var w = hourAngle(h, phi, dec),
      a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
  }
  // calculates sun times for a given date, latitude/longitude, and, optionally,
  // the observer height (in meters) relative to the horizon
  SunCalc.getTimes = function (date, lat, lng, height) {
    height = height || 0;
    var lw = rad * -lng,
      phi = rad * lat,
      dh = observerAngle(height),
      d = toDays(date),
      n = julianCycle(d, lw),
      ds = approxTransit(0, lw, n),
      M = solarMeanAnomaly(ds),
      L = eclipticLongitude(M),
      dec = declination(L, 0),
      Jnoon = solarTransitJ(ds, M, L),
      i,
      len,
      time,
      h0,
      Jset,
      Jrise;
    var result = {
      solarNoon: fromJulian(Jnoon),
      nadir: fromJulian(Jnoon - 0.5),
    };
    for (i = 0, len = times.length; i < len; i += 1) {
      time = times[i];
      h0 = (time[0] + dh) * rad;
      Jset = getSetJ(h0, lw, phi, dec, n, M, L);
      Jrise = Jnoon - (Jset - Jnoon);
      result[time[1]] = fromJulian(Jrise);
      result[time[2]] = fromJulian(Jset);
    }
    return result;
  };
  // moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas
  function moonCoords(d) {
    var L = rad * (218.316 + 13.176396 * d),
      M = rad * (134.963 + 13.064993 * d),
      F = rad * (93.272 + 13.22935 * d),
      l = L + rad * 6.289 * sin(M),
      b = rad * 5.128 * sin(F),
      dt = 385001 - 20905 * cos(M); // distance to the moon in km
    return {
      ra: rightAscension(l, b),
      dec: declination(l, b),
      dist: dt,
    };
  }
  SunCalc.getMoonPosition = function (date, lat, lng) {
    var lw = rad * -lng,
      phi = rad * lat,
      d = toDays(date),
      c = moonCoords(d),
      H = siderealTime(d, lw) - c.ra,
      h = altitude(H, phi, c.dec), // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
      pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));
    h = h + astroRefraction(h); // altitude correction for refraction
    return {
      azimuth: azimuth(H, phi, c.dec),
      altitude: h,
      distance: c.dist,
      parallacticAngle: pa,
    };
  };
  // calculations for illumination parameters of the moon,
  // based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
  // Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
  SunCalc.getMoonIllumination = function (date) {
    var d = toDays(date || new Date()),
      s = sunCoords(d),
      m = moonCoords(d),
      sdist = 149598000,
      phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
      inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
      angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) - cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));
    return {
      fraction: (1 + cos(inc)) / 2,
      phase: 0.5 + (0.5 * inc * (angle < 0 ? -1 : 1)) / Math.PI,
      angle: angle,
    };
  };
  function hoursLater(date, h) {
    return new Date(date.valueOf() + (h * dayMs) / 24);
  }
  // calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article
  SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);
    var hc = 0.133 * rad,
      h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
      h1,
      h2,
      rise,
      set,
      a,
      b,
      xe,
      ye,
      d,
      roots,
      x1,
      x2,
      dx;
    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
      h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
      h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;
      a = (h0 + h2) / 2 - h1;
      b = (h2 - h0) / 2;
      xe = -b / (2 * a);
      ye = (a * xe + b) * xe + h1;
      d = b * b - 4 * a * h1;
      roots = 0;
      if (d >= 0) {
        dx = Math.sqrt(d) / (Math.abs(a) * 2);
        x1 = xe - dx;
        x2 = xe + dx;
        if (Math.abs(x1) <= 1) roots++;
        if (Math.abs(x2) <= 1) roots++;
        if (x1 < -1) x1 = x2;
      }
      if (roots === 1) {
        if (h0 < 0) rise = i + x1;
        else set = i + x1;
      } else if (roots === 2) {
        rise = i + (ye < 0 ? x2 : x1);
        set = i + (ye < 0 ? x1 : x2);
      }
      if (rise && set) break;
      h0 = h2;
    }
    var result = {};
    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);
    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;
    return result;
  };
  $cc1282133b958b24$exports = SunCalc;
})();

// Code adapted from frontend/src/data/weather.ts to make it useable in custom cards

var $c4aa2ec16ac8c28c$var$safeIsNaN =
  Number.isNaN ||
  function ponyfill(value) {
    return typeof value === 'number' && value !== value;
  };
function $c4aa2ec16ac8c28c$var$isEqual(first, second) {
  if (first === second) return true;
  if ($c4aa2ec16ac8c28c$var$safeIsNaN(first) && $c4aa2ec16ac8c28c$var$safeIsNaN(second)) return true;
  return false;
}
function $c4aa2ec16ac8c28c$var$areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) return false;
  for (var i = 0; i < newInputs.length; i++) {
    if (!$c4aa2ec16ac8c28c$var$isEqual(newInputs[i], lastInputs[i])) return false;
  }
  return true;
}
function $c4aa2ec16ac8c28c$export$2e2bcd8739ae039(resultFn, isEqual) {
  if (isEqual === void 0) isEqual = $c4aa2ec16ac8c28c$var$areInputsEqual;
  var cache = null;
  function memoized() {
    var newArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) newArgs[_i] = arguments[_i];
    if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) return cache.lastResult;
    var lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult: lastResult,
      lastArgs: newArgs,
      lastThis: this,
    };
    return lastResult;
  }
  memoized.clear = function clear() {
    cache = null;
  };
  return memoized;
}

var $0e777479b7249a00$export$8b3032c22c6f26e6 = /*#__PURE__*/ (function (WeatherEntityFeature) {
  WeatherEntityFeature[(WeatherEntityFeature['FORECAST_DAILY'] = 1)] = 'FORECAST_DAILY';
  WeatherEntityFeature[(WeatherEntityFeature['FORECAST_HOURLY'] = 2)] = 'FORECAST_HOURLY';
  WeatherEntityFeature[(WeatherEntityFeature['FORECAST_TWICE_DAILY'] = 4)] = 'FORECAST_TWICE_DAILY';
  return WeatherEntityFeature;
})({});
const $0e777479b7249a00$export$6f2fd9da44cdd139 = {
  humidity: 'mdi:water-percent',
  pressure: 'mdi:gauge',
  wind_speed: 'mdi:weather-windy-variant',
  wind_gust_speed: 'mdi:weather-windy',
  visibility: 'mdi:eye',
  ozone: 'mdi:molecule',
  uv_index: 'mdi:weather-sunny-alert',
  dew_point: 'mdi:water-thermometer-outline',
  apparent_temperature: 'mdi:thermometer',
  cloud_coverage: 'mdi:cloud-outline',
};
const $0e777479b7249a00$export$8f7ca90fe05ed3ab = new Set([
  'clear-night',
  'cloudy',
  'fog',
  'lightning',
  'lightning-rainy',
  'partlycloudy',
  'pouring',
  'rainy',
  'hail',
  'snowy',
  'snowy-rainy',
  'sunny',
  'windy',
  'windy-variant',
]);
const $0e777479b7249a00$var$cloudyStates = new Set([
  'partlycloudy',
  'cloudy',
  'fog',
  'windy',
  'windy-variant',
  'hail',
  'rainy',
  'snowy',
  'snowy-rainy',
  'pouring',
  'lightning',
  'lightning-rainy',
]);
const $0e777479b7249a00$var$rainStates = new Set(['hail', 'rainy', 'pouring']);
const $0e777479b7249a00$var$windyStates = new Set(['windy', 'windy-variant']);
const $0e777479b7249a00$var$snowyStates = new Set(['snowy', 'snowy-rainy']);
const $0e777479b7249a00$var$lightningStates = new Set(['lightning', 'lightning-rainy']);
const $0e777479b7249a00$var$cardinalDirections = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
  'N',
];
const $0e777479b7249a00$var$getWindBearingText = (degree) => {
  const degreenum = typeof degree === 'number' ? degree : parseInt(degree, 10);
  if (isFinite(degreenum))
    // eslint-disable-next-line no-bitwise
    return $0e777479b7249a00$var$cardinalDirections[(((degreenum + 11.25) / 22.5) | 0) % 16];
  return typeof degree === 'number' ? degree.toString() : degree;
};
const $0e777479b7249a00$var$getWindBearing = (bearing) => {
  if (bearing != null) return $0e777479b7249a00$var$getWindBearingText(bearing);
  return '';
};
const $0e777479b7249a00$var$getWind = (hass, stateObj, speed, bearing) => {
  const speedText =
    speed !== undefined && speed !== null ? hass.formatEntityAttributeValue(stateObj, 'wind_speed', speed) : '-';
  if (bearing !== undefined && bearing !== null) {
    const cardinalDirection = $0e777479b7249a00$var$getWindBearing(bearing);
    return `${speedText} (${
      hass.localize(`ui.card.weather.cardinal_direction.${cardinalDirection.toLowerCase()}`) || cardinalDirection
    })`;
  }
  return speedText;
};
const $0e777479b7249a00$var$getWeatherStateSVG = (state, nightTime) => (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 17 17"
  >
  ${
    state === 'sunny'
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="sun"
            d="m 14.39303,8.4033507 c 0,3.3114723 -2.684145,5.9956173 -5.9956169,5.9956173 -3.3114716,0 -5.9956168,-2.684145 -5.9956168,-5.9956173 0,-3.311471 2.6841452,-5.995617 5.9956168,-5.995617 3.3114719,0 5.9956169,2.684146 5.9956169,5.995617"
          />
        `
      : ''
  }
  ${
    state === 'clear-night'
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="moon"
            d="m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752"
          />
        `
      : ''
  }
  ${
    state === 'partlycloudy' && nightTime
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="moon"
            transform="scale(0.65 0.65) translate(11 -3)"
            d="m 13.502891,11.382935 c -1.011285,1.859223 -2.976664,3.121381 -5.2405751,3.121381 -3.289929,0 -5.953329,-2.663833 -5.953329,-5.9537625 0,-2.263911 1.261724,-4.228856 3.120948,-5.240575 -0.452782,0.842738 -0.712753,1.806363 -0.712753,2.832381 0,3.289928 2.663833,5.9533275 5.9533291,5.9533275 1.026017,0 1.989641,-0.259969 2.83238,-0.712752"
          />
        `
      : state === 'partlycloudy'
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="sun"
            d="m14.981 4.2112c0 1.9244-1.56 3.4844-3.484 3.4844-1.9244 0-3.4844-1.56-3.4844-3.4844s1.56-3.484 3.4844-3.484c1.924 0 3.484 1.5596 3.484 3.484"
          />
        `
      : ''
  }
  ${
    $0e777479b7249a00$var$cloudyStates.has(state)
      ? state === 'partlycloudy' && nightTime
        ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
            <g transform="translate(-1 1) scale(1 1)">
              <path
                class="cloud-back"
                d="m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679"
              />
              <path
                class="cloud-front"
                d="m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586"
              />
            </g>
          `
        : (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
            <path
              class="cloud-back"
              d="m3.8863 5.035c-0.54892 0.16898-1.04 0.46637-1.4372 0.8636-0.63077 0.63041-1.0206 1.4933-1.0206 2.455 0 1.9251 1.5589 3.4682 3.4837 3.4682h6.9688c1.9251 0 3.484-1.5981 3.484-3.5232 0-1.9251-1.5589-3.5232-3.484-3.5232h-1.0834c-0.25294-1.6916-1.6986-2.9083-3.4463-2.9083-1.7995 0-3.2805 1.4153-3.465 3.1679"
            />
            <path
              class="cloud-front"
              d="m4.1996 7.6995c-0.33902 0.10407-0.64276 0.28787-0.88794 0.5334-0.39017 0.38982-0.63147 0.92322-0.63147 1.5176 0 1.1896 0.96414 2.1431 2.1537 2.1431h4.3071c1.1896 0 2.153-0.98742 2.153-2.1777 0-1.1896-0.96344-2.1777-2.153-2.1777h-0.66992c-0.15593-1.0449-1.0499-1.7974-2.1297-1.7974-1.112 0-2.0274 0.87524-2.1417 1.9586"
            />
          `
      : ''
  }
  ${
    $0e777479b7249a00$var$rainStates.has(state)
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="rain"
            d="m5.2852 14.734c-0.22401 0.24765-0.57115 0.2988-0.77505 0.11395-0.20391-0.1845-0.18732-0.53481 0.036689-0.78281 0.14817-0.16298 0.59126-0.32914 0.87559-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.065617 0.2921-0.18732 0.74965-0.33514 0.91299"
          />
          <path
            class="rain"
            d="m11.257 14.163c-0.22437 0.24765-0.57115 0.2988-0.77505 0.11395-0.2039-0.1845-0.18768-0.53481 0.03669-0.78281 0.14817-0.16298 0.59126-0.32914 0.8756-0.42369 0.12453-0.04092 0.22684 0.05186 0.19791 0.17956-0.06562 0.2921-0.18732 0.74965-0.33514 0.91299"
          />
          <path
            class="rain"
            d="m8.432 15.878c-0.15452 0.17039-0.3937 0.20567-0.53446 0.07867-0.14041-0.12735-0.12876-0.36865 0.025753-0.53975 0.10195-0.11218 0.40711-0.22684 0.60325-0.29175 0.085725-0.02858 0.15628 0.03563 0.13652 0.12382-0.045508 0.20108-0.12912 0.51647-0.23107 0.629"
          />
          <path
            class="rain"
            d="m7.9991 14.118c-0.19226 0.21237-0.49001 0.25612-0.66499 0.09737-0.17462-0.15804-0.16051-0.45861 0.03175-0.67098 0.12665-0.14005 0.50729-0.28293 0.75071-0.36336 0.10689-0.03563 0.19473 0.0441 0.17004 0.15346-0.056092 0.25082-0.16051 0.64347-0.28751 0.78352"
          />
        `
      : ''
  }
  ${
    state === 'pouring'
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="rain"
            d="m10.648 16.448c-0.19226 0.21449-0.49001 0.25894-0.66499 0.09878-0.17498-0.16016-0.16087-0.4639 0.03175-0.67874 0.12665-0.14146 0.50694-0.2854 0.75071-0.36724 0.10689-0.03563 0.19473 0.0448 0.17004 0.15558-0.05645 0.25365-0.16051 0.65017-0.28751 0.79163"
          />
          <path
            class="rain"
            d="m5.9383 16.658c-0.22437 0.25012-0.5715 0.30162-0.77505 0.11501-0.20391-0.18627-0.18768-0.54046 0.036689-0.79093 0.14817-0.1651 0.59126-0.33267 0.87559-0.42827 0.12418-0.04127 0.22648 0.05221 0.19791 0.18168-0.065617 0.29528-0.18732 0.75741-0.33514 0.92251"
          />
        `
      : ''
  }
  ${
    $0e777479b7249a00$var$windyStates.has(state)
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="cloud-back"
            d="m 13.59616,15.30968 c 0,0 -0.09137,-0.0071 -0.250472,-0.0187 -0.158045,-0.01235 -0.381353,-0.02893 -0.64382,-0.05715 -0.262466,-0.02716 -0.564444,-0.06385 -0.877358,-0.124531 -0.156986,-0.03034 -0.315383,-0.06844 -0.473781,-0.111478 -0.157691,-0.04551 -0.313266,-0.09842 -0.463902,-0.161219 l -0.267406,-0.0949 c -0.09984,-0.02646 -0.205669,-0.04904 -0.305153,-0.06738 -0.193322,-0.02716 -0.3838218,-0.03316 -0.5640912,-0.02011 -0.3626556,0.02611 -0.6847417,0.119239 -0.94615,0.226483 -0.2617611,0.108656 -0.4642556,0.230364 -0.600075,0.324203 -0.1358195,0.09419 -0.2049639,0.160514 -0.2049639,0.160514 0,0 0.089958,-0.01623 0.24765,-0.04445 0.1559278,-0.02575 0.3764139,-0.06174 0.6367639,-0.08714 0.2596444,-0.02646 0.5591527,-0.0441 0.8678333,-0.02328 0.076905,0.0035 0.1538111,0.01658 0.2321278,0.02293 0.077611,0.01058 0.1534581,0.02893 0.2314221,0.04022 0.07267,0.01834 0.1397,0.03986 0.213078,0.05644 l 0.238125,0.08925 c 0.09207,0.03281 0.183444,0.07055 0.275872,0.09878 0.09243,0.0261 0.185208,0.05327 0.277636,0.07161 0.184856,0.0388 0.367947,0.06174 0.543983,0.0702 0.353131,0.01905 0.678745,-0.01341 0.951442,-0.06456 0.27305,-0.05292 0.494595,-0.123119 0.646642,-0.181681 0.152047,-0.05785 0.234597,-0.104069 0.234597,-0.104069"
          />
          <path
            class="cloud-back"
            d="m 4.7519154,13.905801 c 0,0 0.091369,-0.0032 0.2511778,-0.0092 0.1580444,-0.0064 0.3820583,-0.01446 0.6455833,-0.03281 0.2631722,-0.01729 0.5662083,-0.04269 0.8812389,-0.09137 0.1576916,-0.02434 0.3175,-0.05609 0.4776611,-0.09384 0.1591027,-0.03951 0.3167944,-0.08643 0.4699,-0.14358 l 0.2702277,-0.08467 c 0.1008945,-0.02222 0.2074334,-0.04127 0.3072695,-0.05574 0.1943805,-0.01976 0.3848805,-0.0187 0.5651499,0.0014 0.3608917,0.03951 0.67945,0.144639 0.936625,0.261761 0.2575278,0.118534 0.4554364,0.247297 0.5873754,0.346781 0.132291,0.09913 0.198966,0.168275 0.198966,0.168275 0,0 -0.08925,-0.01976 -0.245886,-0.05397 C 9.9423347,14.087088 9.7232597,14.042988 9.4639681,14.00736 9.2057347,13.97173 8.9072848,13.94245 8.5978986,13.95162 c -0.077258,7.06e-4 -0.1541638,0.01058 -0.2328333,0.01411 -0.077964,0.0078 -0.1545166,0.02328 -0.2331861,0.03175 -0.073025,0.01588 -0.1404055,0.03422 -0.2141361,0.04798 l -0.2420055,0.08008 c -0.093486,0.02963 -0.1859139,0.06421 -0.2794,0.0889 C 7.3028516,14.23666 7.2093653,14.2603 7.116232,14.27512 6.9303181,14.30722 6.7465209,14.3231 6.5697792,14.32486 6.2166487,14.33046 5.8924459,14.28605 5.6218654,14.224318 5.3505793,14.161565 5.1318571,14.082895 4.9822793,14.01869 4.8327015,13.95519 4.7519154,13.905801 4.7519154,13.905801"
          />
        `
      : ''
  }
  ${
    $0e777479b7249a00$var$snowyStates.has(state)
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="snow"
            d="m 8.4319893,15.348341 c 0,0.257881 -0.209197,0.467079 -0.467078,0.467079 -0.258586,0 -0.46743,-0.209198 -0.46743,-0.467079 0,-0.258233 0.208844,-0.467431 0.46743,-0.467431 0.257881,0 0.467078,0.209198 0.467078,0.467431"
          />
          <path
            class="snow"
            d="m 11.263878,14.358553 c 0,0.364067 -0.295275,0.659694 -0.659695,0.659694 -0.364419,0 -0.6596937,-0.295627 -0.6596937,-0.659694 0,-0.364419 0.2952747,-0.659694 0.6596937,-0.659694 0.36442,0 0.659695,0.295275 0.659695,0.659694"
          />
          <path
            class="snow"
            d="m 5.3252173,13.69847 c 0,0.364419 -0.295275,0.660047 -0.659695,0.660047 -0.364067,0 -0.659694,-0.295628 -0.659694,-0.660047 0,-0.364067 0.295627,-0.659694 0.659694,-0.659694 0.36442,0 0.659695,0.295627 0.659695,0.659694"
          />
        `
      : ''
  }
  ${
    $0e777479b7249a00$var$lightningStates.has(state)
      ? (0, $d33ef1320595a3ac$export$7ed1367e7fa1ad68)`
          <path
            class="sun"
            d="m 9.9252695,10.935875 -1.6483986,2.341014 1.1170184,0.05929 -1.2169864,2.02141 3.0450261,-2.616159 H 9.8864918 L 10.97937,11.294651 10.700323,10.79794 h -0.508706 l -0.2663475,0.137936"
          />
        `
      : ''
  }
  </svg>`;
const $0e777479b7249a00$export$e0801f527146069 = (item, element, nightTime, dailyForecast, iconMap) => {
  const state = item.condition;
  const isPartlyCloudyNight = state === 'partlycloudy' && nightTime;
  const mapKey = isPartlyCloudyNight ? 'partlycloudy-night' : state;
  const mappedIcon = iconMap?.[mapKey];
  const normalizedIcon = typeof mappedIcon === 'string' ? mappedIcon.trim() : '';
  const pictocode = item['pictocode'];
  if (pictocode) {
    let pictoCodeIcon;
    if (dailyForecast) pictoCodeIcon = 'local:' + pictocode.toString().padStart(2, '0') + '_iday';
    else if (nightTime) pictoCodeIcon = 'local:' + pictocode.toString().padStart(2, '0') + '_night';
    else pictoCodeIcon = 'local:' + pictocode.toString().padStart(2, '0') + '_day';
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<ha-icon icon=${pictoCodeIcon}></ha-icon>`;
  }
  if (normalizedIcon) return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<ha-icon icon=${normalizedIcon}></ha-icon>`;
  const userDefinedIcon = getComputedStyle(element).getPropertyValue(`--weather-icon-${state}`);
  if (userDefinedIcon)
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div
        style="background-size: cover;${(0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
          'background-image': userDefinedIcon,
        })}"
      ></div>
    `;
  if ($0e777479b7249a00$export$8f7ca90fe05ed3ab.has(state))
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`${$0e777479b7249a00$var$getWeatherStateSVG(
      state,
      nightTime,
    )}`;
  return undefined;
};
const $0e777479b7249a00$export$ace10bd47409a000 = (hass, entity_id, forecast_type, callback) =>
  hass.connection.subscribeMessage(callback, {
    type: 'weather/subscribe_forecast',
    forecast_type: forecast_type,
    entity_id: entity_id,
  });
const $0e777479b7249a00$export$327ac2cf77ab3c0a = (stateObj) => {
  const supported = [];
  if ($0e777479b7249a00$var$supportsFeature(stateObj, 1)) supported.push('daily');
  if ($0e777479b7249a00$var$supportsFeature(stateObj, 4)) supported.push('twice_daily');
  if ($0e777479b7249a00$var$supportsFeature(stateObj, 2)) supported.push('hourly');
  return supported;
};
// Copied from frontend/src/common/entity/supports-feature.ts
const $0e777479b7249a00$var$supportsFeature = (stateObj, feature) =>
  $0e777479b7249a00$var$supportsFeatureFromAttributes(stateObj.attributes, feature);
// Copied from frontend/src/common/entity/supports-feature.ts
const $0e777479b7249a00$var$supportsFeatureFromAttributes = (
  attributes,
  feature, // eslint-disable-next-line no-bitwise
) => (attributes.supported_features & feature) !== 0;
const $0e777479b7249a00$export$b2983052dc371198 = (hass, weather, attribute, name, unit, icon, divisor) => {
  if (!weather || !hass) return undefined;
  // Check if attribute exists on the entity
  const hasAttribute = Object.prototype.hasOwnProperty.call(weather.attributes, attribute);
  if (!hasAttribute) return undefined;
  const rawValue = weather.attributes[attribute];
  if (rawValue === undefined || rawValue === null) return undefined;
  let display;
  if (typeof rawValue === 'number') {
    if (attribute === 'wind_speed') {
      const bearingValue = weather.attributes['wind_bearing'];
      display = $0e777479b7249a00$var$getWind(
        hass,
        weather,
        rawValue,
        typeof bearingValue === 'number' ? bearingValue : undefined,
      );
    } else if (attribute === 'wind_bearing') display = $0e777479b7249a00$var$getWindBearing(rawValue);
    else if (divisor) {
      const value = rawValue / divisor;
      display = value.toLocaleString(hass?.locale?.language, {
        maximumFractionDigits: 0,
      });
    } else
      display =
        hass?.formatEntityAttributeValue?.(weather, attribute, rawValue) ||
        rawValue.toLocaleString(hass?.locale?.language, {
          maximumFractionDigits: 1,
        });
  } else if (typeof rawValue === 'string') {
    const trimmed = rawValue.trim();
    if (!trimmed.length) return undefined;
    display = hass?.formatEntityAttributeValue?.(weather, attribute, trimmed) || trimmed;
  } else
    try {
      display = JSON.stringify(rawValue);
    } catch (_err) {
      return undefined;
    }
  if (display === undefined || display === null) return undefined;
  const value = display + (unit ? ` ${unit}` : '');
  const resolvedIcon = icon ? icon : $0e777479b7249a00$export$6f2fd9da44cdd139[attribute];
  name =
    name ||
    hass.formatEntityAttributeName(weather, attribute) ||
    hass.localize($0e777479b7249a00$var$getLocalizationKey(attribute)) ||
    attribute.replace(/_/g, ' ');
  return {
    value: value,
    name: name,
    icon: resolvedIcon,
  };
};
const $0e777479b7249a00$export$9376eeb236ca7e9a = (hass, weather, forecast, attribute, name, unit, icon, divisor) => {
  if (!weather || !hass || !forecast) return undefined;
  // Check if attribute exists on the entity
  const rawValue = forecast?.[attribute];
  if (rawValue === undefined || rawValue === null) return undefined;
  let display;
  if (typeof rawValue === 'number') {
    if (attribute === 'wind_speed') {
      const bearingValue = weather.attributes['wind_bearing'];
      display = $0e777479b7249a00$var$getWind(
        hass,
        weather,
        rawValue,
        typeof bearingValue === 'number' ? bearingValue : undefined,
      );
    } else if (attribute === 'wind_bearing') display = $0e777479b7249a00$var$getWindBearing(rawValue);
    else if (divisor) {
      const value = rawValue / divisor;
      display = value.toLocaleString(hass?.locale?.language, {
        maximumFractionDigits: 0,
      });
    } else
      display =
        hass?.formatEntityAttributeValue?.(weather, attribute, rawValue) ||
        rawValue.toLocaleString(hass?.locale?.language, {
          maximumFractionDigits: 1,
        });
  } else if (typeof rawValue === 'string') {
    const trimmed = rawValue.trim();
    if (!trimmed.length) return undefined;
    display = hass?.formatEntityAttributeValue?.(weather, attribute, trimmed) || trimmed;
  } else
    try {
      display = JSON.stringify(rawValue);
    } catch (_err) {
      return undefined;
    }
  // Try to format the attribute value using Home Assistant's built-in formatter
  if (display === undefined || display === null) return undefined;
  const value = display + (unit ? ` ${unit}` : '');
  const resolvedIcon = icon ? icon : $0e777479b7249a00$export$6f2fd9da44cdd139[attribute];
  name = name || $0e777479b7249a00$export$34eb39cb0547b64f(hass, weather, attribute);
  return {
    value: value,
    name: name,
    icon: resolvedIcon,
  };
};
const $0e777479b7249a00$export$34eb39cb0547b64f = (hass, weather, attribute) => {
  return (
    hass.formatEntityAttributeName(weather, attribute) ||
    hass.localize($0e777479b7249a00$var$getLocalizationKey(attribute)) ||
    attribute.replace(/_/g, ' ')
  );
};
const $0e777479b7249a00$var$getLocalizationKey = (0, $c4aa2ec16ac8c28c$export$2e2bcd8739ae039)((attribute) => {
  switch (attribute) {
    case 'pressure':
      return 'ui.card.weather.attributes.air_pressure';
    default:
      return `ui.card.weather.attributes.${attribute}`;
  }
});

class $19dceebd25e12c5c$export$afaa23c7706bed5a extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  createRenderRoot() {
    return this;
  }
  render() {
    if (!this.hass || !this.weatherEntity || this.attributeConfigs.length === 0)
      return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const attributeTemplates = this.attributeConfigs
      .map((attrConfig) => this._renderAttribute(attrConfig))
      .filter((template) => template !== (0, $d33ef1320595a3ac$export$45b790e32b2810ee));
    if (attributeTemplates.length === 0) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    return (0,
    $d33ef1320595a3ac$export$c0bb0b647f701bb5)` <div class="dwf-current-attributes">${attributeTemplates}</div> `;
  }
  _renderAttribute(attrConfig) {
    let stateObj;
    let value;
    let icon;
    let attribute;
    let name;
    if (attrConfig.type == 'entity') {
      // HeaderEntity
      stateObj = this.hass.states[attrConfig.entity];
      if (!stateObj) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
      const formattedSensor = this.hass?.formatEntityState?.(stateObj);
      if (formattedSensor && typeof formattedSensor === 'string') value = formattedSensor;
      else value = stateObj.attributes?.assumed_state ?? stateObj.state;
      icon = stateObj.attributes.icon;
      attribute = undefined;
      name = attrConfig.name || stateObj.attributes.friendly_name || attrConfig.entity;
    } else {
      // HeaderWeatherAttribute
      const formatted = (0, $0e777479b7249a00$export$b2983052dc371198)(
        this.hass,
        this.weatherEntity,
        attrConfig.attribute,
        attrConfig.name,
        attrConfig.unit,
        attrConfig.icon,
        attrConfig.divisor,
      );
      if (!formatted) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
      stateObj = this.weatherEntity;
      value = formatted.value;
      icon = formatted.icon;
      attribute = attrConfig.attribute;
      name = formatted.name;
    }
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class="dwf-current-attribute">
        <ha-attribute-icon
          class="dwf-current-attribute-icon"
          .hass=${this.hass}
          .stateObj=${stateObj}
          .attribute=${attribute}
          .icon=${icon}
        ></ha-attribute-icon>
        <span class="dwf-current-attribute-name"> ${name} </span>
        <span class="dwf-current-attribute-value">${value}</span>
      </div>
    `;
  }
  constructor(...args) {
    super(...args), (this.attributeConfigs = []);
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $19dceebd25e12c5c$export$afaa23c7706bed5a.prototype,
  'hass',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $19dceebd25e12c5c$export$afaa23c7706bed5a.prototype,
  'weatherEntity',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $19dceebd25e12c5c$export$afaa23c7706bed5a.prototype,
  'attributeConfigs',
  void 0,
);
$19dceebd25e12c5c$export$afaa23c7706bed5a = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('dwf-current-weather-attributes')],
  $19dceebd25e12c5c$export$afaa23c7706bed5a,
);

// Collection of functions from HA frontend

const $31f1e04390b2b3c2$export$e86782e02be44113 = (dateObj, locale, config) =>
  $31f1e04390b2b3c2$var$formatDateWeekdayShortMem(locale, config.time_zone).format(dateObj);
const $31f1e04390b2b3c2$var$formatDateWeekdayShortMem = (0, $c4aa2ec16ac8c28c$export$2e2bcd8739ae039)(
  (locale, serverTimeZone) =>
    new Intl.DateTimeFormat(locale.language, {
      weekday: 'short',
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
    }),
);
const $31f1e04390b2b3c2$export$3203edd9e5edd663 = (dateObj, locale, config) =>
  $31f1e04390b2b3c2$var$formatTimeMem(locale, config.time_zone).format(dateObj);
const $31f1e04390b2b3c2$var$formatTimeMem = (0, $c4aa2ec16ac8c28c$export$2e2bcd8739ae039)(
  (locale, serverTimeZone) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: $31f1e04390b2b3c2$export$98b044737b007ca6(locale) ? 'h12' : 'h23',
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
    }),
);
const $31f1e04390b2b3c2$export$af90a3ef075406ce = (dateObj, locale, config) => {
  const parts = $31f1e04390b2b3c2$var$formatTimeMem(locale, config.time_zone).formatToParts(dateObj);
  const hour = parts.find((part) => part.type === 'hour')?.value ?? '';
  const minute = parts.find((part) => part.type === 'minute')?.value ?? '';
  return `${hour}:${minute}`;
};
var $31f1e04390b2b3c2$export$7fd1ce15b01d50ca = /*#__PURE__*/ (function (TimeFormat) {
  TimeFormat['language'] = 'language';
  TimeFormat['system'] = 'system';
  TimeFormat['am_pm'] = '12';
  TimeFormat['twenty_four'] = '24';
  return TimeFormat;
})({});
const $31f1e04390b2b3c2$export$98b044737b007ca6 = (0, $c4aa2ec16ac8c28c$export$2e2bcd8739ae039)((locale) => {
  if (locale.time_format === 'language' || locale.time_format === 'system') {
    const testLanguage = locale.time_format === 'language' ? locale.language : undefined;
    const test = new Date('January 1, 2023 22:00:00').toLocaleString(testLanguage);
    return test.includes('10');
  }
  return locale.time_format === '12';
});
const $31f1e04390b2b3c2$export$9ba7591c5b128371 = (dateObj, locale, config) =>
  $31f1e04390b2b3c2$var$formatDateDayTwoDigitMem(locale, config.time_zone).format(dateObj);
const $31f1e04390b2b3c2$var$formatDateDayTwoDigitMem = (0, $c4aa2ec16ac8c28c$export$2e2bcd8739ae039)(
  (locale, serverTimeZone) =>
    new Intl.DateTimeFormat(locale.language, {
      day: '2-digit',
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
    }),
);
const $31f1e04390b2b3c2$export$86a5557e1d677e29 = (dateObj, locale, config) => {
  const parts = $31f1e04390b2b3c2$var$formatHourMem(locale, config.time_zone).formatToParts(dateObj);
  return parts.find((part) => part.type === 'hour').value;
};
const $31f1e04390b2b3c2$export$f57482e5e4ce715a = (dateObj, locale, config) => {
  const parts = $31f1e04390b2b3c2$var$formatHourMem(locale, config.time_zone).formatToParts(dateObj);
  return parts.find((part) => part.type === 'dayPeriod')?.value;
};
const $31f1e04390b2b3c2$var$formatHourMem = (0, $c4aa2ec16ac8c28c$export$2e2bcd8739ae039)(
  (locale, serverTimeZone) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: '2-digit',
      //minute: "2-digit",
      hourCycle: $31f1e04390b2b3c2$export$98b044737b007ca6(locale) ? 'h12' : 'h23',
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined,
    }),
);
const $31f1e04390b2b3c2$export$824eefb57336d873 = (dateObj, config) => {
  const formatter = new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    timeZone: config.time_zone,
    hour12: false,
  });
  const parts = formatter.formatToParts(dateObj);
  const hourPart = parts.find((part) => part.type === 'hour');
  return hourPart.value === '00';
};

const $b89bac6f5573fa85$var$PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const $b89bac6f5573fa85$var$DAILY_PRECIPITATION_MIN_SCALE = 4;
const $b89bac6f5573fa85$var$DAILY_PRECIPITATION_MAX_SCALE = 20;
class $b89bac6f5573fa85$export$7edf3521b67cbe51 extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  createRenderRoot() {
    // Render in light DOM so parent CSS applies
    return this;
  }
  updated(changedProperties) {
    if (changedProperties.has('forecast')) {
      if (this.forecast?.length && !this._selectedForecast) this._selectedForecast = this.forecast[0];
    }
  }
  render() {
    if (!this.forecast?.length) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const precipitationScale = this._computePrecipitationScale(
      $b89bac6f5573fa85$var$DAILY_PRECIPITATION_MIN_SCALE,
      $b89bac6f5573fa85$var$DAILY_PRECIPITATION_MAX_SCALE,
    );
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)` ${this.forecast.map((item) =>
      this._renderDailyItem(item, precipitationScale),
    )} `;
  }
  _hasValidValue(item) {
    return typeof item !== 'undefined' && item !== null;
  }
  _renderDailyItem(item, precipitationScale) {
    if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition))
      return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const date = new Date(item.datetime);
    const newDay = (0, $31f1e04390b2b3c2$export$824eefb57336d873)(date, this.hass.config);
    const tempColor = this._getTemperatureColor(item.temperature);
    const tempLowColor = this._hasValidValue(item.templow) ? this._getTemperatureColor(item.templow) : undefined;
    const isSelected = this._selectedForecast?.datetime === item.datetime;
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class="forecast-item" @click=${() => this._handleSelect(item)}>
        <div class="date ${isSelected ? 'selected' : ''}">
          ${(0, $31f1e04390b2b3c2$export$e86782e02be44113)(date, this.hass.locale, this.hass.config)}
        </div>
        <div class="day-of-month ${isSelected ? 'selected' : ''}">
          ${!newDay ? (0, $31f1e04390b2b3c2$export$9ba7591c5b128371)(date, this.hass.locale, this.hass.config) : ''}
        </div>
        <div class="forecast-image-icon">${(0, $0e777479b7249a00$export$e0801f527146069)(
          item,
          this,
          false,
          true,
          this.iconMap,
        )}</div>
        <div class="temp" style=${(0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
          color: tempColor,
        })}>${Math.round(item.temperature)}°</div>
        <div class="templow" style=${
          tempLowColor
            ? (0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
                color: tempLowColor,
              })
            : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
        }>
          ${
            this._hasValidValue(item.templow)
              ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`${Math.round(item.templow)}°`
              : '\u2014'
          }
        </div>
        ${this._renderPrecipitationInfo(item, precipitationScale)} ${this._renderExtraAttribute(item)}
      </div>
    `;
  }
  _handleSelect(item) {
    if (!item?.datetime) return;
    let detailShow = null;
    if (this._showForecastAttribute && this._selectedForecast?.datetime !== item.datetime) detailShow = item;
    else if (!this._showForecastAttribute && this._selectedForecast?.datetime === item.datetime) detailShow = item;
    else detailShow = undefined;
    if (detailShow?.datetime !== this._showForecastAttribute?.datetime) {
      this._showForecastAttribute = detailShow;
      this.dispatchEvent(
        new CustomEvent('dwf-daily-list-item-show-attributes', {
          detail: detailShow,
          bubbles: true,
          composed: true,
        }),
      );
    }
    // Select the new item
    if (item.datetime !== this._selectedForecast?.datetime) {
      this._selectedForecast = item;
      this.dispatchEvent(
        new CustomEvent('dwf-daily-list-item-selected', {
          detail: item,
          bubbles: true,
          composed: true,
        }),
      );
    }
  }
  selectDate(date) {
    const targetDay = date.getDate();
    const targetMonth = date.getMonth();
    const targetYear = date.getFullYear();
    const forecastItemIndex = this.forecast.findIndex((item) => {
      const itemDate = new Date(item.datetime);
      return (
        itemDate.getDate() === targetDay && itemDate.getMonth() === targetMonth && itemDate.getFullYear() === targetYear
      );
    });
    if (forecastItemIndex > -1) {
      this._selectedForecast = this.forecast[forecastItemIndex];
      // Wait for the update to complete, so we can get the correct element
      this.updateComplete.then(() => {
        const forecastElements = this.querySelectorAll('.forecast-item');
        const selectedElement = forecastElements[forecastItemIndex];
        if (selectedElement) {
          const scrollContainer = this.closest('.forecast');
          if (!scrollContainer) return;
          const containerRect = scrollContainer.getBoundingClientRect();
          const elementRect = selectedElement.getBoundingClientRect();
          // Check if the element is fully visible horizontally
          const isVisible = elementRect.left >= containerRect.left && elementRect.right <= containerRect.right;
          if (!isVisible) {
            const scrollLeft = scrollContainer.scrollLeft;
            const elementLeftInContainer = elementRect.left - containerRect.left;
            const containerWidth = containerRect.width;
            const elementWidth = elementRect.width;
            // Calculate the desired scroll position to center the element
            const targetScrollLeft = scrollLeft + elementLeftInContainer - containerWidth / 2 + elementWidth / 2;
            scrollContainer.scrollTo({
              left: targetScrollLeft,
              behavior: 'smooth',
            });
          }
        }
      });
    }
  }
  _getTemperatureColor(temperature) {
    if (temperature < 0) return 'var(--blue-color, #2196f3)';
    if (temperature < 15) return 'var(--green-color, #4caf50)';
    if (temperature < 25) return 'var(--orange-color, #ff9800)';
    return 'var(--red-color, #f44336)';
  }
  _renderPrecipitationInfo(item, precipitationScale) {
    const hasPrecipitation = this._hasValidValue(item.precipitation);
    const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);
    if (!hasPrecipitation && !hasPrecipitationProbability) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const precipitationValue = hasPrecipitation ? item.precipitation : undefined;
    const precipitationClasses = ['precipitation'];
    if ((precipitationValue ?? 0) > $b89bac6f5573fa85$var$PRECIPITATION_DISPLAY_THRESHOLD)
      precipitationClasses.push('active');
    let overflow = false;
    let precipitationStyle = (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    if (
      precipitationScale !== undefined &&
      precipitationValue !== undefined &&
      precipitationValue >= $b89bac6f5573fa85$var$PRECIPITATION_DISPLAY_THRESHOLD
    ) {
      const normalized = precipitationScale > 0 ? Math.min(precipitationValue / precipitationScale, 1) : 0;
      const percent = `${(normalized * 100).toFixed(2)}%`;
      precipitationStyle = `--precipitation-fill: ${percent};`;
      overflow = precipitationValue > precipitationScale;
    }
    if (overflow) precipitationClasses.push('overflow');
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      ${
        hasPrecipitation
          ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="${precipitationClasses.join(
              ' ',
            )}" style=${precipitationStyle}>
            ${item.precipitation.toFixed(1) + (this.precipitationUnit ?? '')}
          </div>`
          : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
      }
      ${
        hasPrecipitationProbability
          ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div
            class="precipitationprobability ${(item.precipitation_probability ?? 0) > 30 ? 'active' : ''}"
          >
            ${item.precipitation_probability >= 0 ? item.precipitation_probability + '%' : ''}
          </div>`
          : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
      }
    `;
  }
  _renderExtraAttribute(item) {
    const key = this.extraAttribute?.trim();
    if (!key) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const rawValue = item?.[key];
    if (rawValue === undefined || rawValue === null) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const formatted = (0, $0e777479b7249a00$export$9376eeb236ca7e9a)(
      this.hass,
      this.weatherEntity,
      item,
      key,
      undefined,
      this.extraAttributeUnit,
      undefined,
      this.extraAttributeDivisor,
    );
    if (!formatted) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const dimBelow = this._normalizeDimBelow(this.extraAttributeDimBelow);
    const numericValue = this._parseNumericValue(rawValue);
    const isDimmed = dimBelow !== undefined && numericValue !== undefined && numericValue < dimBelow;
    const classes = ['daily-extra'];
    if (isDimmed) classes.push('dimmed');
    const color = this.extraAttributeColor?.trim();
    const style = color
      ? (0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
          color: color,
          opacity: isDimmed ? '0.3' : '1',
        })
      : (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class=${classes.join(' ')} style=${style}>${
      formatted?.value
    }</div>`;
  }
  _normalizeDimBelow(value) {
    return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
  }
  _parseNumericValue(rawValue) {
    const numericValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);
    return Number.isFinite(numericValue) ? numericValue : undefined;
  }
  _computePrecipitationScale(minScale, maxScale) {
    if (!this.forecast?.length) return undefined;
    const values = this.forecast
      .map((item) => (typeof item?.precipitation === 'number' ? item.precipitation : undefined))
      .filter((value) => typeof value === 'number');
    if (!values.length) return undefined;
    const highestValue = Math.max(...values);
    const unconstrained = Math.max(minScale, highestValue);
    return Math.min(unconstrained, maxScale);
  }
  constructor(...args) {
    super(...args), (this.forecast = []);
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'hass',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'weatherEntity',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'forecast',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'precipitationUnit',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'extraAttribute',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'extraAttributeUnit',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'extraAttributeDivisor',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'extraAttributeColor',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'extraAttributeDimBelow',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  'iconMap',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  '_selectedForecast',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b89bac6f5573fa85$export$7edf3521b67cbe51.prototype,
  '_showForecastAttribute',
  void 0,
);
$b89bac6f5573fa85$export$7edf3521b67cbe51 = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('dwf-daily-list')],
  $b89bac6f5573fa85$export$7edf3521b67cbe51,
);

var $fd4c17ccf6afd3da$export$2e2bcd8739ae039 = {
  editor: {
    card: {
      type: 'Typ',
      divisor: 'Teiler',
    },
    main: {
      entity: 'Wetter-Entit\xe4t',
      header_temperature_entity:
        'Lokaler Temperatursensor (\xdcberschreibt den aktuellen Temperaturwert der Vorhersage)',
      header_tap_action_temperature: 'Temperatur-Tipp-Aktion',
      use_night_header_backgrounds: 'Separate Header-Hintergr\xfcnde f\xfcr n\xe4chtliche Bedingungen verwenden',
      nowcast_entity:
        'Nowcast-Entit\xe4t (F\xfcr den Niederschlag der n\xe4chsten Stunde. Die Entit\xe4tsintegration muss eine `get_minute_forecast`-Aktion bereitstellen, um die Daten abzurufen.)',
      nowcast_layout: 'Nowcast-Layout',
      nowcast_always_show: 'Nowcast immer anzeigen',
      hourly_extra_attribute: 'Zus\xe4tzliches st\xfcndliches Attribut (dritte Zeile)',
      hourly_extra_attribute_unit: 'Einheit f\xfcr zus\xe4tzliches st\xfcndliches Attribut',
      hourly_extra_attribute_divisor: 'Teiler f\xfcr zus\xe4tzliches st\xfcndliches Attribut',
      daily_extra_attribute: 'Zus\xe4tzliches t\xe4gliches Attribut (dritte Zeile)',
      daily_extra_attribute_unit: 'Einheit f\xfcr zus\xe4tzliches t\xe4gliches Attribut',
      daily_extra_attribute_divisor: 'Teiler f\xfcr zus\xe4tzliches t\xe4gliches Attribut',
      loading_forecast_attributes: 'Lade verf\xfcgbare Wetterattribute...',
      header_chip: {
        type: 'Header-Chip {index}: Modus',
        attribute: 'Header-Chip {index}: Attribut',
        icon: 'Header-Chip {index}: Icon',
        tap_action: 'Header-Chip {index}: Tipp-Aktion',
        unit: 'Header-Chip {index}: Einheit',
        divisor: 'Header-Chip {index}: Teiler',
        label: 'Header-Chip {index}',
      },
    },
    chip: {
      attribute: 'Attribut',
      entity: 'Entit\xe4t',
    },
    weather_condition: {
      'clear-night': 'Klare Nacht',
      cloudy: 'Wolkig',
      fog: 'Nebel',
      hail: 'Hagel',
      lightning: 'Blitz',
      'lightning-rainy': 'Gewitterregen',
      partlycloudy: 'Teilweise wolkig',
      'partlycloudy-night': 'Teilweise wolkige Nacht',
      pouring: 'Starkregen',
      rainy: 'Regnerisch',
      snowy: 'Schneefall',
      'snowy-rainy': 'Schneeregen',
      sunny: 'Sonnig',
      windy: 'Windig',
      'windy-variant': 'Wind-Variante',
      exceptional: 'Au\xdfergew\xf6hnlich',
    },
    section: {
      gps_coordinates: 'GPS-Koordinaten',
      gps_coordinates_description:
        'Wird f\xfcr Sonnenaufgangs-/Sonnenuntergangsmarkierungen und Tag-/Nachthintergr\xfcnde ben\xf6tigt',
      use_home_assistant_location: 'Home Assistant-Standort verwenden',
      latitude: 'Breitengrad',
      longitude: 'L\xe4ngengrad',
      solar_forecast: 'Solarenergie-Vorhersage',
      solar_forecast_description:
        'Die Vorhersage muss einer Solarmodul-Konfiguration in den Energie-Dashboard-Einstellungen zugewiesen werden. Andernfalls kann sie hier nicht verwendet werden.',
      energy_solar_forecasts: 'Energie-Solar-Vorhersagen',
      no_energy_solar_forecasts_configured: 'Keine Energie-Solar-Vorhersagen konfiguriert.',
      custom_icons: 'Benutzerdefinierte Icons',
      custom_icons_description:
        '\xdcberschreiben Sie die Standard-Wettersymbole mit einem beliebigen in Home Assistant verf\xfcgbaren Symbol.',
      header: 'Kopfzeile',
      chips: 'Chips',
      chips_description: 'W\xe4hlen Sie Attribut oder Entit\xe4t f\xfcr bis zu drei Header-Chips.',
      nowcast: 'Nowcast',
      nowcast_description: 'Steuert das minutengenaue Niederschlagsdiagramm, das in der Kopfzeile angezeigt wird.',
      header_info: 'Wetterbedingung-Info',
      header_info_description:
        'Attribute und Entit\xe4ten konfigurieren, die bei Klick auf die Wetterbedingung unterhalb der Kopfzeile angezeigt werden sollen.',
      add_attribute: 'Attribut hinzuf\xfcgen',
      daily_forecast: 'T\xe4gliche Vorhersage',
      extra_attribute_color: 'Zus\xe4tzliche Attributfarbe',
      clear: 'L\xf6schen',
      dim_values_smaller_than: 'Werte dimmen, die kleiner sind als:',
      no_threshold: 'Kein Schwellenwert',
      forecast_spacing: 'Vorhersage-Abstand',
      forecast_spacing_description: 'Mindestabstand zwischen den Vorhersageelementen in Pixel (10px oder gr\xf6\xdfer)',
      daily_min_gap: 'T\xe4glicher Mindestabstand (px)',
      default_30: 'Standard 30',
      daily_forecast_info: 'T\xe4gliche Vorhersage-Info',
      daily_forecast_info_description:
        'Attribute konfigurieren, die unterhalb der t\xe4glichen Vorhersage angezeigt werden sollen, wenn ein Tag ausgew\xe4hlt wurde.',
      hourly_forecast: 'St\xfcndliche Vorhersage',
      sunrise_sunset: 'Sonnenaufgang & Sonnenuntergang',
      show_sunrise_sunset: 'Sonnenaufgang & Sonnenuntergang anzeigen',
      hourly_min_gap: 'St\xfcndlicher Mindestabstand (px)',
      default_16: 'Standard 16',
      hourly_forecast_info: 'St\xfcndliche Vorhersage-Info',
      hourly_forecast_info_description:
        'Attribute konfigurieren, die unterhalb der st\xfcndlichen Vorhersage angezeigt werden sollen, wenn eine Stunde ausgew\xe4hlt wurde.',
    },
    common: {
      none: 'Keine',
      solar_forecast: 'Solarenergie-Vorhersage',
    },
    selector: {
      weather_attribute: 'Wetter-Attribut',
      entity: 'Entit\xe4t',
    },
  },
  card: {
    pictocode_day: {
      1: 'Sonnig, wolkenloser Himmel',
      2: 'Sonnig mit einigen Wolken',
      3: 'Wechselnd bew\xf6lkt',
      4: 'Bedeckt',
      5: 'Nebel',
      6: 'Bedeckt mit Regen',
      7: 'Wechselhaft, Schauer m\xf6glich',
      8: 'Schauer, Gewitter m\xf6glich',
      9: 'Bedeckt mit Schneefall',
      10: 'Wechselhaft mit Schneeschauern',
      11: '\xdcberwiegend bew\xf6lkt mit Schnee und Regen',
      12: 'Bedeckt mit leichtem Regen',
      13: 'Bedeckt mit leichtem Schneefall',
      14: '\xdcberwiegend bew\xf6lkt mit Regen',
      15: '\xdcberwiegend bew\xf6lkt mit Schneefall',
      16: '\xdcberwiegend bew\xf6lkt mit leichtem Regen',
      17: '\xdcberwiegend bew\xf6lkt mit leichtem Schneefall',
    },
    pictocode_hour: {
      1: 'Klar, wolkenlos',
      2: 'Klar, vereinzelt Cirrus-Wolken',
      3: 'Klar mit Cirrus-Wolken',
      4: 'Klar mit einigen niederen Wolken',
      5: 'Klar mit einigen niederen Wolken sowie vereinzelt Cirrus-Wolken',
      6: 'Klar mit einigen niederen Wolken sowie Cirrus-Wolken',
      7: 'Wechselnd bew\xf6lkt',
      8: 'Teilweise bew\xf6lkt mit vereinzelt Cirrus-Wolken',
      9: 'Teilweise bew\xf6lkt mit Cirrus-Wolken',
      10: 'Wechselhaft, vereinzelt Gewitter m\xf6glich',
      11: 'Wechselhaft, vereinzelt Cirrus-Wolken und Gewitter m\xf6glich',
      12: 'Wechselhaft mit Cirrus-Wolken, Gewitter m\xf6glich',
      13: 'Klar, aber dunstig',
      14: 'Klar, aber dunstig mit einigen Cirrus-Wolken',
      15: 'Klar, aber dunstig mit Cirrus-Wolken',
      16: 'Nebel/niedere Schichtwolken',
      17: 'Nebel/niedere Schichtwolken mit vereinzelt Cirrus-Wolken',
      18: 'Nebel/niedere Schichtwolken mit Cirrus-Wolken',
      19: '\xdcberwiegend bew\xf6lkt',
      20: '\xdcberwiegend bew\xf6lkt, vereinzelt Cirrus-Wolken',
      21: '\xdcberwiegend bew\xf6lkt mit Cirrus-Wolken',
      22: 'Bedeckt',
      23: 'Bedeckt mit Regen',
      24: 'Bedeckt mit Schneefall',
      25: 'Bedeckt mit starkem Regen',
      26: 'Bedeckt mit starkem Schneefall',
      27: 'Regen, Gewitter m\xf6glich',
      28: 'Leichter Regen, Gewitter m\xf6glich',
      29: 'Sturm mit starkem Schneefall',
      30: 'Starker Regen, Gewitter m\xf6glich',
      31: 'Wechselhaft, Schauer m\xf6glich',
      32: 'Wechselhaft mit Schneeschauern',
      33: 'Bedeckt mit leichtem Regen',
      34: 'Bedeckt mit leichtem Schneefall',
      35: 'Bedeckt mit Schnee und Regen',
    },
  },
};

var $af9dea4213935d68$export$2e2bcd8739ae039 = {
  editor: {
    card: {
      type: 'Type',
      divisor: 'Divisor',
    },
    main: {
      entity: 'Weather Entity',
      header_temperature_entity:
        'Local Temperature Sensor Entity (Overrides the current temperature value of the forecast)',
      header_tap_action_temperature: 'Temperature tap action',
      use_night_header_backgrounds: 'Use separate header backgrounds for nightly conditions',
      nowcast_entity:
        'Nowcast Entity (For next-hour precipitation. The entity integration must provide a get_minute_forecast action to fetch the data.)',
      nowcast_layout: 'Nowcast layout',
      nowcast_always_show: 'Always show nowcast',
      hourly_extra_attribute: 'Hourly extra attribute (third line)',
      hourly_extra_attribute_unit: 'Unit for hourly extra attribute',
      hourly_extra_attribute_divisor: 'Divisor for hourly extra attribute',
      daily_extra_attribute: 'Daily extra attribute (third line)',
      daily_extra_attribute_unit: 'Unit for daily extra attribute',
      daily_extra_attribute_divisor: 'Divisor for daily extra attribute',
      loading_forecast_attributes: 'Loading available weather attributes...',
      header_chip: {
        type: 'Header chip {index}: mode',
        attribute: 'Header chip {index}: attribute',
        icon: 'Header chip {index}: icon',
        tap_action: 'Header chip {index}: tap action',
        unit: 'Header chip {index}: unit',
        divisor: 'Header chip {index}: divisor',
        label: 'Header chip {index}',
      },
    },
    chip: {
      attribute: 'Attribute',
      entity: 'Entity',
    },
    weather_condition: {
      'clear-night': 'Clear night',
      cloudy: 'Cloudy',
      fog: 'Fog',
      hail: 'Hail',
      lightning: 'Lightning',
      'lightning-rainy': 'Lightning rainy',
      partlycloudy: 'Partly cloudy',
      'partlycloudy-night': 'Partly cloudy night',
      pouring: 'Pouring',
      rainy: 'Rainy',
      snowy: 'Snowy',
      'snowy-rainy': 'Snowy rainy',
      sunny: 'Sunny',
      windy: 'Windy',
      'windy-variant': 'Windy variant',
      exceptional: 'Exceptional',
    },
    section: {
      gps_coordinates: 'GPS Coordinates',
      gps_coordinates_description: 'Needed for sunrise/sunset markers and day/night backgrounds',
      use_home_assistant_location: 'Use Home Assistant location',
      latitude: 'Latitude',
      longitude: 'Longitude',
      solar_forecast: 'Solar Forecast',
      solar_forecast_description:
        "The forecast needs to be assigned to a solar panel configuration in the Energy dashboard settings. Otherwise it can't be used here.",
      energy_solar_forecasts: 'Energy solar forecasts',
      no_energy_solar_forecasts_configured: 'No Energy solar forecasts configured.',
      custom_icons: 'Custom Icons',
      custom_icons_description: 'Override the default weather icons with any icon available in Home Assistant.',
      header: 'Header',
      chips: 'Chips',
      chips_description: 'Choose Attribute or entity for up to three header chips.',
      nowcast: 'Nowcast',
      nowcast_description: 'Controls the minute-by-minute precipitation chart shown inside the header.',
      header_info: 'Weather condition info',
      header_info_description:
        'Configure attributes and entities to be displayed below the header when the weather condition is clicked.',
      add_attribute: 'Add Attribute',
      daily_forecast: 'Daily forecast',
      extra_attribute_color: 'Extra attribute color',
      clear: 'Clear',
      dim_values_smaller_than: 'Dim values smaller than:',
      no_threshold: 'No threshold',
      forecast_spacing: 'Forecast spacing',
      forecast_spacing_description: 'Minimum distance between forecast items in pixels (10px or greater)',
      daily_min_gap: 'Daily min gap (px)',
      default_30: 'Default 30',
      daily_forecast_info: 'Daily Forecast Info',
      daily_forecast_info_description:
        'Configure attributes to be displayed below the daily forecast when a day is selected.',
      hourly_forecast: 'Hourly forecast',
      sunrise_sunset: 'Sunrise & Sunset',
      show_sunrise_sunset: 'Show sunrise & sunset',
      hourly_min_gap: 'Hourly min gap (px)',
      default_16: 'Default 16',
      hourly_forecast_info: 'Hourly Forecast Info',
      hourly_forecast_info_description:
        'Configure attributes to be displayed below the hourly forecast when an hour is selected.',
    },
    common: {
      none: 'None',
      solar_forecast: 'Solar forecast',
    },
    selector: {
      weather_attribute: 'Weather Attribute',
      entity: 'Entity',
    },
  },
  card: {
    pictocode_day: {
      1: 'Sunny, cloudless sky',
      2: 'Sunny and few clouds',
      3: 'Partly cloudy',
      4: 'Overcast',
      5: 'Fog',
      6: 'Overcast with rain',
      7: 'Mixed with showers',
      8: 'Showers, thunderstorms likely',
      9: 'Overcast with snow',
      10: 'Mixed with snow showers',
      11: 'Mostly cloudy with a mixture of snow and rain',
      12: 'Overcast with light rain',
      13: 'Overcast with light snow',
      14: 'Mostly cloudy with rain',
      15: 'Mostly cloudy with snow',
      16: 'Mostly cloudy with light rain',
      17: 'Mostly cloudy with light snow',
    },
    pictocode_hour: {
      1: 'Clear, cloudless sky',
      2: 'Clear, few cirrus',
      3: 'Clear with cirrus',
      4: 'Clear with few low clouds',
      5: 'Clear with few low clouds and few cirrus',
      6: 'Clear with few low clouds and cirrus',
      7: 'Partly cloudy',
      8: 'Partly cloudy and few cirrus',
      9: 'Partly cloudy and cirrus',
      10: 'Mixed with some thunderstorm clouds possible',
      11: 'Mixed with few cirrus with some thunderstorm clouds possible',
      12: 'Mixed with cirrus and some thunderstorm clouds possible',
      13: 'Clear but hazy',
      14: 'Clear but hazy with few cirrus',
      15: 'Clear but hazy with cirrus',
      16: 'Fog/low stratus clouds',
      17: 'Fog/low stratus clouds with few cirrus',
      18: 'Fog/low stratus clouds with cirrus',
      19: 'Mostly cloudy',
      20: 'Mostly cloudy and few cirrus',
      21: 'Mostly cloudy and cirrus',
      22: 'Overcast',
      23: 'Overcast with rain',
      24: 'Overcast with snow',
      25: 'Overcast with heavy rain',
      26: 'Overcast with heavy snow',
      27: 'Rain, thunderstorms likely',
      28: 'Light rain, thunderstorms likely',
      29: 'Storm with heavy snow',
      30: 'Heavy rain, thunderstorms likely',
      31: 'Mixed with showers',
      32: 'Mixed with snow showers',
      33: 'Overcast with light rain',
      34: 'Overcast with light snow',
      35: 'Overcast with mixture of snow and rain',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let $f7e2ebf6156dc08b$var$hass;
function $f7e2ebf6156dc08b$export$7a9dbe976b949275(newHass) {
  $f7e2ebf6156dc08b$var$hass = newHass;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function $f7e2ebf6156dc08b$var$getTranslated(key, lang, translations) {
  const keys = key.split('.');
  let result = translations[lang];
  for (const k of keys) {
    if (result === undefined) break;
    result = result[k];
  }
  return result;
}
function $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63(key, search = '', replace = '') {
  const lang = $f7e2ebf6156dc08b$var$hass?.locale?.language || 'en';
  const translations = {
    de: $fd4c17ccf6afd3da$export$2e2bcd8739ae039,
    en: $af9dea4213935d68$export$2e2bcd8739ae039,
  };
  let translated = $f7e2ebf6156dc08b$var$getTranslated(key, lang, translations);
  if (translated === undefined)
    // Try english as a fallback
    translated = $f7e2ebf6156dc08b$var$getTranslated(key, 'en', translations);
  if (translated === undefined)
    // Fallback to the key itself
    translated = key;
  if (search !== '' && replace !== '') translated = translated.replace(search, replace);
  return translated;
}

class $e1d6dc26094eedae$export$b2d0e3ce4f7eb09a extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  createRenderRoot() {
    return this;
  }
  render() {
    if (!this.hass || !this.forecastAttribute) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const date = new Date(this.forecastAttribute.datetime);
    const dateFormatted = this.dailyForecast
      ? `${(0, $31f1e04390b2b3c2$export$e86782e02be44113)(date, this.hass.locale, this.hass.config)}`
      : `${(0, $31f1e04390b2b3c2$export$e86782e02be44113)(date, this.hass.locale, this.hass.config)}, ${(0,
        $31f1e04390b2b3c2$export$3203edd9e5edd663)(date, this.hass.locale, this.hass.config)}`;
    let headerCondition = undefined;
    if (this.forecastAttribute['pictocode'] !== undefined) {
      const key = this.dailyForecast ? 'card.pictocode_day' : 'card.pictocode_hour';
      headerCondition = (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(`${key}.${this.forecastAttribute['pictocode']}`);
    } else
      headerCondition =
        this.hass.formatEntityState?.({
          ...this.weatherEntity,
          state: this.forecastAttribute.condition,
        }) || this.forecastAttribute.condition;
    const attributeTemplates = (this.attributeConfigs || [])
      .map((attrConfig) => this._renderAttribute(attrConfig))
      .filter((template) => template !== (0, $d33ef1320595a3ac$export$45b790e32b2810ee));
    let heading = dateFormatted;
    if (headerCondition) heading += ` - ${headerCondition}`;
    if (attributeTemplates.length === 0 && !heading) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class="forecast-condition">${heading}</div>
      ${
        attributeTemplates.length > 0
          ? (0,
            $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="dwf-current-attributes">${attributeTemplates}</div>`
          : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
      }
    `;
  }
  _renderAttribute(attrConfig) {
    const stateObj = this.weatherEntity;
    const forecast = this.forecastAttribute;
    const formatted = (0, $0e777479b7249a00$export$9376eeb236ca7e9a)(
      this.hass,
      stateObj,
      forecast,
      attrConfig.attribute,
      attrConfig.name,
      attrConfig.unit,
      attrConfig.icon,
      attrConfig.divisor,
    );
    if (!formatted) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const value = formatted.value;
    const icon = formatted.icon;
    const attribute = attrConfig.attribute;
    const name = formatted.name;
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class="dwf-current-attribute">
        <ha-attribute-icon
          class="dwf-current-attribute-icon"
          .hass=${this.hass}
          .stateObj=${stateObj}
          .attribute=${attribute}
          .icon=${icon}
        ></ha-attribute-icon>
        <span class="dwf-current-attribute-name"> ${name} </span>
        <span class="dwf-current-attribute-value">${value}</span>
      </div>
    `;
  }
  constructor(...args) {
    super(...args), (this.attributeConfigs = []), (this.dailyForecast = false);
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $e1d6dc26094eedae$export$b2d0e3ce4f7eb09a.prototype,
  'hass',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $e1d6dc26094eedae$export$b2d0e3ce4f7eb09a.prototype,
  'weatherEntity',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $e1d6dc26094eedae$export$b2d0e3ce4f7eb09a.prototype,
  'forecastAttribute',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $e1d6dc26094eedae$export$b2d0e3ce4f7eb09a.prototype,
  'attributeConfigs',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $e1d6dc26094eedae$export$b2d0e3ce4f7eb09a.prototype,
  'dailyForecast',
  void 0,
);
$e1d6dc26094eedae$export$b2d0e3ce4f7eb09a = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('dwf-forecast-attributes')],
  $e1d6dc26094eedae$export$b2d0e3ce4f7eb09a,
);

const $f1a317500ce85cf3$var$PRECIPITATION_DISPLAY_THRESHOLD = 0.3;
const $f1a317500ce85cf3$var$HOURLY_PRECIPITATION_MIN_SCALE = 1;
const $f1a317500ce85cf3$var$HOURLY_PRECIPITATION_MAX_SCALE = 5;
class $f1a317500ce85cf3$export$c9c54dc28d564056 extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  createRenderRoot() {
    // Render in light DOM so parent CSS applies
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
    this.closest('.forecast.hourly')?.addEventListener('scroll', this._boundHandleScroll, {
      passive: true,
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
    this.closest('.forecast.hourly')?.removeEventListener('scroll', this._boundHandleScroll);
  }
  updated() {
    // Recalculate after DOM updates (including when forecast changes)
    this.updateComplete.then(() => this._recalculateTranslationHeights());
  }
  willUpdate(changedProps) {
    if (changedProps.has('forecast') || changedProps.has('sunCoordinates') || changedProps.has('showSunTimes'))
      this._calculateSunTimes();
  }
  render() {
    if (!this.forecast?.length) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const parts = [];
    let currentDay;
    const precipitationScale = this._computePrecipitationScale(
      $f1a317500ce85cf3$var$HOURLY_PRECIPITATION_MIN_SCALE,
      $f1a317500ce85cf3$var$HOURLY_PRECIPITATION_MAX_SCALE,
    );
    if (this.forecast.length > 0 && !this._currentDayKey) {
      const firstDate = new Date(this.forecast[0].datetime);
      this._currentDayKey = this._formatDayKey(firstDate);
    }
    this.forecast.forEach((item, index) => {
      if (!item?.datetime) return;
      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) return;
      const dayKey = this._formatDayKey(date);
      if (dayKey !== currentDay) {
        currentDay = dayKey;
        parts.push(this._renderDayMarker(date));
      }
      const hourlyItem = this._renderHourlyItem(item, index, precipitationScale);
      if (hourlyItem !== (0, $d33ef1320595a3ac$export$45b790e32b2810ee)) parts.push(hourlyItem);
    });
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`${parts}`;
  }
  _handleScroll(event) {
    const container = event.target;
    const containerRect = container.getBoundingClientRect();
    const items = this.querySelectorAll('.forecast-item');
    let firstVisibleItem;
    for (const item of Array.from(items)) {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.left >= containerRect.left) {
        firstVisibleItem = item;
        break;
      }
    }
    if (firstVisibleItem) {
      const datetime = firstVisibleItem.dataset.datetime;
      if (datetime) {
        const date = new Date(datetime);
        const dayKey = this._formatDayKey(date);
        if (this._currentDayKey !== dayKey) {
          this._currentDayKey = dayKey;
          this.dispatchEvent(
            new CustomEvent('dwf-hourly-scrolled-to-new-day', {
              detail: {
                date: date,
              },
              bubbles: true,
              composed: true,
            }),
          );
        }
      }
    }
  }
  _handleItemClick(item) {
    let detail;
    if (this.selectedItem?.datetime === item.datetime) {
      this.selectedItem = undefined;
      detail = null;
    } else {
      this.selectedItem = item;
      detail = item;
    }
    this.dispatchEvent(
      new CustomEvent('dwf-hourly-list-item-selected', {
        detail: detail,
        bubbles: true,
        composed: true,
      }),
    );
  }
  _renderDayMarker(date) {
    const label = (0, $31f1e04390b2b3c2$export$e86782e02be44113)(date, this.hass?.locale, this.hass?.config);
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="day-marker">${label}</div>`;
  }
  _setupResizeObserver() {
    if (this._resizeObserver) return;
    const forecastEl = this.closest('.forecast.hourly');
    if (!forecastEl) return;
    this._resizeObserver = new ResizeObserver(() => {
      this._recalculateTranslationHeights();
    });
    this._resizeObserver.observe(forecastEl);
  }
  _recalculateTranslationHeights() {
    const forecastEl = this.closest('.forecast.hourly') ?? this;
    // Query first item as reference for heights
    const translateContainer = this.querySelector('.translate-container');
    const iconContainer = this.querySelector('.icon-container');
    if (!translateContainer || !iconContainer || !forecastEl) return;
    const containerHeight = translateContainer.offsetHeight;
    const contentHeight = iconContainer.offsetHeight;
    //forecastEl.style.setProperty('--translate-container-height', `${containerHeight}px`);
    //forecastEl.style.setProperty('--translate-content-height', `${contentHeight}px`);
  }
  _hasValidValue(item) {
    return typeof item !== 'undefined' && item !== null;
  }
  _renderHourlyItem(item, index, precipitationScale) {
    if (!this._hasValidValue(item.temperature) || !this._hasValidValue(item.condition))
      return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const date = new Date(item.datetime);
    const sunEvent = this._getSunEventForHour(date, index);
    const eventDate = sunEvent ? new Date(sunEvent.timestamp) : undefined;
    const isSelected = this.selectedItem?.datetime === item.datetime;
    const dateClasses = ['date'];
    if (sunEvent) dateClasses.push(sunEvent.type);
    if (isSelected) dateClasses.push('selected');
    const showAmPm = (0, $31f1e04390b2b3c2$export$98b044737b007ca6)(this.hass.locale);
    const itemClasses = ['forecast-item'];
    if (!showAmPm) itemClasses.push('no-ampm');
    if (isSelected) itemClasses.push('selected');
    const dateLabel = sunEvent
      ? (0, $31f1e04390b2b3c2$export$af90a3ef075406ce)(eventDate, this.hass.locale, this.hass.config)
      : (0, $31f1e04390b2b3c2$export$86a5557e1d677e29)(date, this.hass.locale, this.hass.config);
    const amPmDate = eventDate ?? date;
    const amPmLabel = showAmPm
      ? (0, $31f1e04390b2b3c2$export$f57482e5e4ce715a)(amPmDate, this.hass.locale, this.hass.config)
      : undefined;
    const tempColor = this._getTemperatureColor(item.temperature);
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class="${itemClasses.join(' ')}" data-datetime=${item.datetime} @click=${() => this._handleItemClick(item)}>
        <div class="${dateClasses.join(' ')}">${dateLabel}</div>
        ${showAmPm ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="ampm">${amPmLabel ?? ''}</div>` : ''}
        <div class="forecast-image-icon">
          ${(0, $0e777479b7249a00$export$e0801f527146069)(
            item,
            this,
            this._shouldUseNightIcon(item, date),
            false,
            this.iconMap,
          )}
        </div>
        <div class="temp" style=${(0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
          color: tempColor,
        })}>${Math.round(item.temperature)}°</div>
        ${this._renderPrecipitationInfo(item, precipitationScale)} ${this._renderExtraAttribute(item)}
      </div>
    `;
  }
  _getTemperatureColor(temperature) {
    if (temperature < 0) return 'var(--blue-color, #2196f3)';
    if (temperature < 15) return 'var(--green-color, #4caf50)';
    if (temperature < 25) return 'var(--orange-color, #ff9800)';
    return 'var(--red-color, #f44336)';
  }
  _renderPrecipitationInfo(item, precipitationScale) {
    const hasPrecipitation = this._hasValidValue(item.precipitation);
    const hasPrecipitationProbability = this._hasValidValue(item.precipitation_probability);
    if (!hasPrecipitation && !hasPrecipitationProbability) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const precipitationValue = hasPrecipitation ? item.precipitation : undefined;
    const precipitationClasses = ['precipitation'];
    if ((precipitationValue ?? 0) > $f1a317500ce85cf3$var$PRECIPITATION_DISPLAY_THRESHOLD)
      precipitationClasses.push('active');
    let overflow = false;
    let precipitationStyle = (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    if (
      precipitationScale !== undefined &&
      precipitationValue !== undefined &&
      precipitationValue >= $f1a317500ce85cf3$var$PRECIPITATION_DISPLAY_THRESHOLD
    ) {
      const normalized = precipitationScale > 0 ? Math.min(precipitationValue / precipitationScale, 1) : 0;
      const percent = `${(normalized * 100).toFixed(2)}%`;
      precipitationStyle = `--precipitation-fill: ${percent};`;
      overflow = precipitationValue > precipitationScale;
    }
    if (overflow) precipitationClasses.push('overflow');
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      ${
        hasPrecipitation
          ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="${precipitationClasses.join(
              ' ',
            )}" style=${precipitationStyle}>
            ${item.precipitation.toFixed(1) + (this.precipitationUnit ?? '')}
          </div>`
          : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
      }
      ${
        hasPrecipitationProbability
          ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div
            class="precipitationprobability ${(item.precipitation_probability ?? 0) > 30 ? 'active' : ''}"
          >
            ${item.precipitation_probability >= 0 ? item.precipitation_probability + '%' : ''}
          </div>`
          : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
      }
    `;
  }
  _renderExtraAttribute(item) {
    const key = this.extraAttribute?.trim();
    if (!key) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const rawValue = item?.[key];
    if (rawValue === undefined || rawValue === null) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const formatted = (0, $0e777479b7249a00$export$9376eeb236ca7e9a)(
      this.hass,
      this.weatherEntity,
      item,
      key,
      undefined,
      this.extraAttributeUnit,
      undefined,
      this.extraAttributeDivisor,
    );
    if (!formatted) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const dimBelow = this._normalizeDimBelow(this.extraAttributeDimBelow);
    const numericValue = this._parseNumericValue(rawValue);
    const isDimmed = dimBelow !== undefined && numericValue !== undefined && numericValue < dimBelow;
    const classes = ['hourly-extra'];
    if (isDimmed) classes.push('dimmed');
    const color = this.extraAttributeColor?.trim();
    const style = color
      ? (0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
          color: color,
          opacity: isDimmed ? '0.3' : '1',
        })
      : (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class=${classes.join(' ')} style=${style}>${
      formatted.value
    }</div>`;
  }
  _normalizeDimBelow(value) {
    return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
  }
  _parseNumericValue(rawValue) {
    const numericValue = typeof rawValue === 'number' ? rawValue : Number(rawValue);
    return Number.isFinite(numericValue) ? numericValue : undefined;
  }
  _computePrecipitationScale(minScale, maxScale) {
    if (!this.forecast?.length) return undefined;
    const values = this.forecast
      .map((item) => (typeof item?.precipitation === 'number' ? item.precipitation : undefined))
      .filter((value) => typeof value === 'number');
    if (!values.length) return undefined;
    const highestValue = Math.max(...values);
    const unconstrained = Math.max(minScale, highestValue);
    return Math.min(unconstrained, maxScale);
  }
  _calculateSunTimes() {
    if (!this.sunCoordinates || !this.forecast?.length) {
      this._sunTimesByDay = {};
      return;
    }
    const { latitude: latitude, longitude: longitude } = this.sunCoordinates;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      this._sunTimesByDay = {};
      return;
    }
    const sunTimes = {};
    for (const item of this.forecast) {
      if (!item?.datetime) continue;
      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) continue;
      const key = this._formatDayKey(date);
      if (sunTimes[key]) continue;
      const baseDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      let times = (0, /*@__PURE__*/ $parcel$interopDefault($cc1282133b958b24$exports)).getTimes(
        baseDate,
        latitude,
        longitude,
      );
      let sunrise = this._toTimestamp(times.sunrise);
      let sunset = this._toTimestamp(times.sunset);
      // Keep rendered day aligned with the calendar day of the forecast even if
      // user and forecast locations sit in very different time zones.
      const dayShift = this._determineDayShift(key, sunrise, sunset);
      if (dayShift !== 0) {
        const shiftedDate = new Date(baseDate);
        shiftedDate.setDate(shiftedDate.getDate() + dayShift);
        times = (0, /*@__PURE__*/ $parcel$interopDefault($cc1282133b958b24$exports)).getTimes(
          shiftedDate,
          latitude,
          longitude,
        );
        sunrise = this._toTimestamp(times.sunrise);
        sunset = this._toTimestamp(times.sunset);
      }
      sunTimes[key] = {};
      if (sunrise !== undefined) sunTimes[key].sunrise = sunrise;
      if (sunset !== undefined) sunTimes[key].sunset = sunset;
    }
    this._sunTimesByDay = sunTimes;
  }
  _shouldUseNightIcon(item, date) {
    if (item.is_daytime === false) return true;
    if (item.is_daytime === true) return false;
    const derived = this._isNightFromSunTimes(date);
    return derived ?? false;
  }
  _isNightFromSunTimes(date) {
    const times = this._sunTimesByDay?.[this._formatDayKey(date)];
    if (!times || times.sunrise === undefined || times.sunset === undefined) return undefined;
    const timestamp = date.getTime();
    if (!Number.isFinite(timestamp)) return undefined;
    if (times.sunrise <= times.sunset) return timestamp < times.sunrise || timestamp >= times.sunset;
    return !(timestamp >= times.sunrise && timestamp < times.sunset);
  }
  _getSunEventForHour(date, index) {
    if (!this.showSunTimes || !this._sunTimesByDay) return undefined;
    const key = this._formatDayKey(date);
    const times = this._sunTimesByDay[key];
    if (!times) return undefined;
    const start = date.getTime();
    if (!Number.isFinite(start)) return undefined;
    const end = this._getIntervalEnd(index, start);
    if (times.sunrise !== undefined && times.sunrise >= start && times.sunrise < end)
      return {
        type: 'sunrise',
        timestamp: times.sunrise,
      };
    if (times.sunset !== undefined && times.sunset >= start && times.sunset < end)
      return {
        type: 'sunset',
        timestamp: times.sunset,
      };
    return undefined;
  }
  _getIntervalEnd(index, start) {
    const next = this.forecast?.[index + 1];
    if (next?.datetime) {
      const nextDate = new Date(next.datetime);
      const nextTime = nextDate.getTime();
      if (Number.isFinite(nextTime) && nextTime > start) return nextTime;
    }
    // Fallback to one hour window if we can't determine the next step
    return start + 3600000;
  }
  _formatDayKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  _toTimestamp(value) {
    if (!value) return undefined;
    const time = value.getTime();
    return Number.isFinite(time) ? time : undefined;
  }
  _determineDayShift(targetKey, sunrise, sunset) {
    // Returns +1/-1 when sunrise/sunset fall on the previous/next day once
    // rendered in the user's local time zone. That happens when the forecast
    // location is many hours away from the viewer.
    const evaluate = (timestamp) => {
      if (timestamp === undefined) return 0;
      const eventKey = this._formatDayKey(new Date(timestamp));
      if (eventKey === targetKey) return 0;
      return eventKey < targetKey ? 1 : -1;
    };
    const sunriseShift = evaluate(sunrise);
    if (sunriseShift !== 0) return sunriseShift;
    return evaluate(sunset);
  }
  constructor(...args) {
    super(...args),
      (this.forecast = []),
      (this.showSunTimes = false),
      (this._sunTimesByDay = {}),
      (this._boundHandleScroll = this._handleScroll.bind(this));
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'hass',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'weatherEntity',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'forecast',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'showSunTimes',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'sunCoordinates',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'precipitationUnit',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'extraAttribute',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'extraAttributeUnit',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'extraAttributeDivisor',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'extraAttributeColor',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'extraAttributeDimBelow',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'iconMap',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $f1a317500ce85cf3$export$c9c54dc28d564056.prototype,
  'selectedItem',
  void 0,
);
$f1a317500ce85cf3$export$c9c54dc28d564056 = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('dwf-hourly-list')],
  $f1a317500ce85cf3$export$c9c54dc28d564056,
);

const $7f109566751a65b5$var$NOWCAST_MINUTES = 60;
const $7f109566751a65b5$var$NOWCAST_MIN_BAR_WIDTH_PX = 5;
const $7f109566751a65b5$var$NOWCAST_MAX_BAR_WIDTH_PX = 7;
const $7f109566751a65b5$var$NOWCAST_BASE_GAP_PX = 5;
const $7f109566751a65b5$var$NOWCAST_PRECIPITATION_MIN_SCALE = 1;
const $7f109566751a65b5$var$NOWCAST_LABEL_HYSTERESIS_MINUTES = 2;
class $7f109566751a65b5$export$b48955384eb43fb8 extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    this._setupResizeObserver();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = undefined;
    }
  }
  render() {
    const series = this._buildMinuteSeries();
    const bars = this._reduceSeries(series, this._barStride);
    const maxValue = bars.reduce((max, value) => Math.max(max, value), 0);
    const scale = Math.max($7f109566751a65b5$var$NOWCAST_PRECIPITATION_MIN_SCALE, maxValue);
    const labelOffset = this._computeLabelOffset(this._containerWidth || this.clientWidth);
    const labels =
      this._barStride > 1 ? ['Now', '20m', '40m', '60m'] : ['Now', '10m', '20m', '30m', '40m', '50m', '60m'];
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class=${(0, $da98d0425d3716de$export$56cc687933817664)({
        'nowcast-bars': true,
      })} style=${(0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
      '--dwf-nowcast-gap': `${this._barGap}px`,
    })}>
        ${bars.map((value) => {
          const ratio = Math.min(1, value / scale);
          return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <div class="nowcast-bar">
              <div class="nowcast-bar-fill" style=${(0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
                height: `${Math.round(ratio * 100)}%`,
              })}></div>
            </div>
          `;
        })}
      </div>
      <div class="nowcast-labels" style=${(0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
        transform: `translateX(${labelOffset}px)`,
      })}>
        ${labels.map((label) => (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<span>${label}</span>`)}
      </div>
    `;
  }
  _setupResizeObserver() {
    if (this._resizeObserver) return;
    this._resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect?.width ?? this.clientWidth;
      if (Number.isFinite(width) && width > 0 && width !== this._containerWidth) this._containerWidth = width;
      this._updateResolution(width);
    });
    this._resizeObserver.observe(this);
  }
  _updateResolution(width) {
    if (!Number.isFinite(width) || width <= 0) return;
    const { stride: stride, gap: gap } = this._resolveLayout(width);
    if (stride !== this._barStride) this._barStride = stride;
    if (gap !== this._barGap) this._barGap = gap;
  }
  _computeLabelOffset(width) {
    if (!this.forecast?.length || !Number.isFinite(width) || width <= 0) return 0;
    const timestamps = this.forecast
      .map((item) => new Date(item.datetime).getTime())
      .filter((timestamp) => Number.isFinite(timestamp))
      .sort((a, b) => a - b);
    if (!timestamps.length) return 0;
    const firstTimestamp = timestamps[0];
    const diffMinutes = Math.round((Date.now() - firstTimestamp) / 60000);
    if (Math.abs(diffMinutes) <= $7f109566751a65b5$var$NOWCAST_LABEL_HYSTERESIS_MINUTES) return 0;
    const pixelsPerMinute = width / $7f109566751a65b5$var$NOWCAST_MINUTES;
    return diffMinutes * pixelsPerMinute;
  }
  _buildMinuteSeries() {
    const normalized = (Array.isArray(this.forecast) ? this.forecast : [])
      .map((item) => {
        const timestamp = new Date(item.datetime).getTime();
        return {
          timestamp: timestamp,
          value: Number.isFinite(item.precipitation) ? Math.max(0, item.precipitation) : 0,
        };
      })
      .filter((item) => Number.isFinite(item.timestamp))
      .sort((a, b) => a.timestamp - b.timestamp);
    const values = normalized.map((item) => item.value);
    const series = values.slice(0, $7f109566751a65b5$var$NOWCAST_MINUTES);
    while (series.length < $7f109566751a65b5$var$NOWCAST_MINUTES) series.push(0);
    return series;
  }
  _reduceSeries(series, stride) {
    if (stride <= 1) return series;
    const grouped = [];
    for (let index = 0; index < series.length; index += stride) {
      const chunk = series.slice(index, index + stride);
      grouped.push(chunk.reduce((max, value) => Math.max(max, value), 0));
    }
    return grouped;
  }
  _resolveLayout(width) {
    let stride = 1;
    let gap = $7f109566751a65b5$var$NOWCAST_BASE_GAP_PX;
    while (stride < $7f109566751a65b5$var$NOWCAST_MINUTES) {
      const barWidth = this._computeBarWidth(width, stride, gap);
      if (barWidth >= $7f109566751a65b5$var$NOWCAST_MIN_BAR_WIDTH_PX) break;
      stride += 1;
    }
    const barCount = Math.ceil($7f109566751a65b5$var$NOWCAST_MINUTES / stride);
    if (barCount > 1) {
      const maxGap = (width - barCount * $7f109566751a65b5$var$NOWCAST_MAX_BAR_WIDTH_PX) / (barCount - 1);
      if (maxGap > gap) gap = maxGap;
    }
    return {
      stride: stride,
      gap: Math.max(0, gap),
    };
  }
  _computeBarWidth(width, stride, gap) {
    const barCount = Math.ceil($7f109566751a65b5$var$NOWCAST_MINUTES / stride);
    if (barCount <= 0) return 0;
    if (barCount === 1) return width;
    return (width - gap * (barCount - 1)) / barCount;
  }
  constructor(...args) {
    super(...args),
      (this.forecast = []),
      (this._barStride = 1),
      (this._barGap = $7f109566751a65b5$var$NOWCAST_BASE_GAP_PX),
      (this._containerWidth = 0);
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $7f109566751a65b5$export$b48955384eb43fb8.prototype,
  'forecast',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $7f109566751a65b5$export$b48955384eb43fb8.prototype,
  '_barStride',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $7f109566751a65b5$export$b48955384eb43fb8.prototype,
  '_barGap',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $7f109566751a65b5$export$b48955384eb43fb8.prototype,
  '_containerWidth',
  void 0,
);
$7f109566751a65b5$export$b48955384eb43fb8 = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('dwf-nowcast')],
  $7f109566751a65b5$export$b48955384eb43fb8,
);

const $047001ccb4558fd5$var$DEFAULT_OPTIONS = {
  threshold: 0.005,
  maxVelocity: 5,
  deceleration: 0.00375,
  snapSelector: '.forecast-item',
};
const $047001ccb4558fd5$var$stateMap = new WeakMap();
const $047001ccb4558fd5$var$DRAG_ACTIVATION_THRESHOLD = 4;
const $047001ccb4558fd5$var$createDragState = () => ({
  active: false,
  pointerId: null,
  startX: 0,
  scrollLeft: 0,
  lastTime: 0,
  lastScrollLeft: 0,
  velocity: 0,
  hasMoved: false,
  captured: false,
});
const $047001ccb4558fd5$export$81657173a9670ea5 = (container, customOptions = {}) => {
  const existing = $047001ccb4558fd5$var$stateMap.get(container);
  if (existing) return existing.cleanup;
  const options = {
    ...$047001ccb4558fd5$var$DEFAULT_OPTIONS,
    ...customOptions,
  };
  const state = {
    drag: $047001ccb4558fd5$var$createDragState(),
    options: options,
    momentumFrame: undefined,
    cleanup: () => {
      stopMomentum();
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerEnd);
      container.removeEventListener('pointercancel', onPointerEnd);
      $047001ccb4558fd5$var$stateMap.delete(container);
    },
  };
  const cancelMomentumFrame = () => {
    if (state.momentumFrame !== undefined) {
      cancelAnimationFrame(state.momentumFrame);
      state.momentumFrame = undefined;
    }
  };
  const stopMomentum = () => {
    cancelMomentumFrame();
    container.classList.remove('momentum');
    container.classList.remove('dragging');
  };
  const alignToNearestItem = () => {
    cancelMomentumFrame();
    const items = Array.from(container.querySelectorAll(options.snapSelector));
    if (!items.length) {
      stopMomentum();
      return;
    }
    const style = getComputedStyle(container);
    const paddingLeft = parseFloat(style.paddingLeft || '0');
    const containerRect = container.getBoundingClientRect();
    const alignStart = containerRect.left + paddingLeft;
    let closest = null;
    let minDistance = Number.POSITIVE_INFINITY;
    for (const item of items) {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left - alignStart);
      if (distance < minDistance) {
        minDistance = distance;
        closest = item;
      }
    }
    if (!closest) {
      stopMomentum();
      return;
    }
    const maxScroll = container.scrollWidth - container.clientWidth;
    const target = container.scrollLeft + (closest.getBoundingClientRect().left - alignStart);
    const clampedTarget = Math.max(0, Math.min(target, maxScroll));
    if (Math.abs(container.scrollLeft - clampedTarget) <= 0.5) {
      container.scrollLeft = clampedTarget;
      stopMomentum();
      return;
    }
    container.classList.add('momentum');
    container.classList.remove('dragging');
    const settle = () => {
      if (!container.isConnected) {
        stopMomentum();
        return;
      }
      const diff = Math.abs(container.scrollLeft - clampedTarget);
      if (diff <= 0.5) {
        container.scrollLeft = clampedTarget;
        stopMomentum();
        return;
      }
      state.momentumFrame = requestAnimationFrame(settle);
    };
    container.scrollTo({
      left: clampedTarget,
      behavior: 'smooth',
    });
    state.momentumFrame = requestAnimationFrame(settle);
  };
  const startMomentum = (initialVelocity) => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) {
      stopMomentum();
      return;
    }
    stopMomentum();
    let velocity = initialVelocity;
    if (Math.abs(velocity) > options.maxVelocity) velocity = Math.sign(velocity) * options.maxVelocity;
    let lastTimestamp = null;
    container.classList.remove('dragging');
    container.classList.add('momentum');
    const step = (timestamp) => {
      if (!container.isConnected) {
        stopMomentum();
        return;
      }
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
        state.momentumFrame = requestAnimationFrame(step);
        return;
      }
      const dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      container.scrollLeft += velocity * dt;
      const maxScrollable = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft <= 0 || container.scrollLeft >= maxScrollable) {
        container.scrollLeft = Math.max(0, Math.min(container.scrollLeft, maxScrollable));
        alignToNearestItem();
        return;
      }
      const deceleration = options.deceleration;
      const deltaV = deceleration * dt;
      if (Math.abs(velocity) <= deltaV) {
        alignToNearestItem();
        return;
      }
      velocity -= Math.sign(velocity) * deltaV;
      state.momentumFrame = requestAnimationFrame(step);
    };
    state.momentumFrame = requestAnimationFrame(step);
  };
  const resetDragState = () => {
    state.drag = $047001ccb4558fd5$var$createDragState();
  };
  const onPointerDown = (ev) => {
    if (!container.isConnected) {
      stopMomentum();
      return;
    }
    stopMomentum();
    if (ev.button !== undefined && ev.button !== 0) return;
    if (ev.pointerType !== 'mouse' && ev.pointerType !== 'pen') return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    state.drag = {
      active: true,
      pointerId: ev.pointerId,
      startX: ev.clientX,
      scrollLeft: container.scrollLeft,
      lastTime: ev.timeStamp,
      lastScrollLeft: container.scrollLeft,
      velocity: 0,
      hasMoved: false,
      captured: false,
    };
    container.classList.add('grabbing');
  };
  const onPointerMove = (ev) => {
    if (!state.drag.active || ev.pointerId !== state.drag.pointerId) return;
    const deltaX = ev.clientX - state.drag.startX;
    if (!state.drag.hasMoved && Math.abs(deltaX) > $047001ccb4558fd5$var$DRAG_ACTIVATION_THRESHOLD) {
      state.drag.hasMoved = true;
      state.drag.lastTime = ev.timeStamp;
      state.drag.lastScrollLeft = container.scrollLeft;
      container.classList.add('dragging');
      try {
        container.setPointerCapture(ev.pointerId);
        state.drag.captured = true;
      } catch (err) {
        state.drag.captured = false;
      }
    }
    if (!state.drag.hasMoved) return;
    container.scrollLeft = state.drag.scrollLeft - deltaX;
    const dt = ev.timeStamp - state.drag.lastTime;
    if (dt > 0) {
      const velocity = (container.scrollLeft - state.drag.lastScrollLeft) / dt;
      state.drag.velocity = velocity;
    }
    state.drag.lastTime = ev.timeStamp;
    state.drag.lastScrollLeft = container.scrollLeft;
    ev.preventDefault();
  };
  const onPointerEnd = (ev) => {
    if (ev.pointerId !== state.drag.pointerId) return;
    const { velocity: velocity, captured: captured, pointerId: pointerId, hasMoved: hasMoved } = state.drag;
    resetDragState();
    try {
      if (captured && pointerId !== null && container.hasPointerCapture?.(pointerId))
        container.releasePointerCapture(pointerId);
    } catch (err) {
      /* Ignore release errors */
    }
    container.classList.remove('grabbing');
    if (!hasMoved) {
      container.classList.remove('dragging');
      return;
    }
    if (Math.abs(velocity) > options.threshold) startMomentum(velocity);
    else {
      container.classList.remove('dragging');
      alignToNearestItem();
    }
  };
  container.addEventListener('pointerdown', onPointerDown);
  container.addEventListener('pointermove', onPointerMove, {
    passive: false,
  });
  container.addEventListener('pointerup', onPointerEnd);
  container.addEventListener('pointercancel', onPointerEnd);
  state.cleanup = () => {
    stopMomentum();
    container.removeEventListener('pointerdown', onPointerDown);
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerup', onPointerEnd);
    container.removeEventListener('pointercancel', onPointerEnd);
    $047001ccb4558fd5$var$stateMap.delete(container);
  };
  $047001ccb4558fd5$var$stateMap.set(container, state);
  return state.cleanup;
};
const $047001ccb4558fd5$export$3bc24c4fed096b83 = (container) => {
  const state = $047001ccb4558fd5$var$stateMap.get(container);
  if (state) state.cleanup();
};

var $9a338a40f5d4f14b$exports = {};
$9a338a40f5d4f14b$exports =
  'ha-card {\n  flex-direction: column;\n  height: 100%;\n  display: flex;\n  overflow: hidden;\n}\n\n.weather {\n  width: 100%;\n  min-height: var(--dwf-header-height, calc(2.3 * var(--row-height, 56px)));\n  border-top-left-radius: var(--ha-card-border-radius, 12px);\n  border-top-right-radius: var(--ha-card-border-radius, 12px);\n  color: #fff;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  flex-direction: column;\n  flex-shrink: 0;\n  display: flex;\n}\n\n.weather.header-only {\n  border-bottom-left-radius: var(--ha-card-border-radius, 12px);\n  border-bottom-right-radius: var(--ha-card-border-radius, 12px);\n  flex: auto;\n  height: 100%;\n}\n\n.weather .header-content {\n  padding-block: var(--dwf-header-padding-block, 16px);\n  padding-inline: var(--dwf-header-padding-inline, 16px);\n  gap: var(--dwf-header-content-gap, 12px);\n  box-sizing: border-box;\n  flex-direction: column;\n  flex: auto;\n  width: 100%;\n  min-width: 0;\n  display: flex;\n}\n\n.weather .header-layout {\n  flex-direction: row;\n  flex: none;\n  justify-content: flex-start;\n  align-items: stretch;\n  gap: 0;\n  width: 100%;\n  min-width: 0;\n  display: flex;\n}\n\n.weather .header-main {\n  padding-left: var(--dwf-header-columns-gap, 16px);\n  justify-content: space-between;\n  align-items: flex-end;\n  gap: var(--dwf-header-main-gap, 10px);\n  flex-direction: column;\n  flex: 0 auto;\n  align-self: stretch;\n  min-width: 0;\n  min-height: 0;\n  margin-left: auto;\n  display: flex;\n}\n\n.weather .header-attributes {\n  justify-content: space-between;\n  gap: var(--dwf-header-attribute-gap, 8px);\n  flex-direction: column;\n  flex: 1 1 0;\n  align-self: stretch;\n  min-width: 30%;\n  min-height: 0;\n  display: flex;\n}\n\n.weather .attribute-chip {\n  font-size: var(--ha-font-size-m);\n  line-height: calc(6px + var(--ha-font-size-m));\n  color: inherit;\n  background-color: #00000059;\n  border-radius: 25px;\n  align-self: flex-start;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n  padding: 4px 12px;\n  display: inline-flex;\n  overflow: hidden;\n}\n\n.weather .attribute-chip .chip-icon {\n  --mdc-icon-size: 20px;\n  color: inherit;\n  margin-right: 6px;\n}\n\n.weather .attribute-chip.has-action {\n  cursor: pointer;\n}\n\n.weather .attribute-chip.has-action:focus-visible {\n  outline-offset: 2px;\n  outline: 2px solid #ffffffe6;\n}\n\n.weather .attribute-chip.missing {\n  opacity: .8;\n  font-style: italic;\n}\n\n.weather .condition {\n  font-size: var(--ha-font-size-xl);\n  line-height: calc(10px + var(--ha-font-size-xl));\n  background-color: #0000004d;\n  border-radius: 25px;\n  justify-content: center;\n  align-items: center;\n  min-width: 0;\n  max-width: 70%;\n  padding: 4px 15px;\n  display: inline-flex;\n  overflow: hidden;\n}\n\n.weather .temp.has-action, .weather .condition.has-action {\n  cursor: pointer;\n}\n\n.weather .temp.has-action:focus-visible, .weather .condition.has-action:focus-visible {\n  outline-offset: 2px;\n  outline: 2px solid #ffffffe6;\n}\n\n.weather .temp {\n  font-size: var(--ha-font-size-5xl);\n  line-height: calc(10px + var(--ha-font-size-xl));\n  background-color: #0000004d;\n  border-radius: 25px;\n  justify-content: center;\n  align-items: center;\n  min-width: 0;\n  max-width: 100%;\n  padding: 2px 17px;\n  font-weight: bolder;\n  display: inline-flex;\n  overflow: hidden;\n}\n\n.weather .header-pill-text {\n  white-space: normal;\n  flex: 0 auto;\n  min-width: 0;\n}\n\n.weather .nowcast-panel {\n  background: #0000004d;\n  border-radius: 16px;\n  flex-direction: column;\n  flex: auto;\n  min-height: 0;\n  padding: 12px 12px 6px;\n  display: flex;\n}\n\n.weather dwf-nowcast {\n  flex-direction: column;\n  flex: auto;\n  gap: 0;\n  width: 100%;\n  min-width: 0;\n  height: 100%;\n  min-height: 0;\n  display: flex;\n  overflow: hidden;\n}\n\n.weather .nowcast-bars {\n  align-items: stretch;\n  gap: var(--dwf-nowcast-gap, 5px);\n  flex: auto;\n  min-height: 24px;\n  display: flex;\n}\n\n.weather .nowcast-bar {\n  background: #ffffff06;\n  border-radius: 999px;\n  flex: 1 1 0;\n  align-self: stretch;\n  align-items: flex-end;\n  height: auto;\n  min-height: 6px;\n  display: flex;\n  overflow: hidden;\n}\n\n.weather .nowcast-bar-fill {\n  background: var(--dwf-nowcast-fill-color, #4aafff);\n  border-radius: inherit;\n  width: 100%;\n  height: 0%;\n  transition: height .35s;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .weather .nowcast-bar-fill, .weather .nowcast-labels {\n    transition: none;\n  }\n}\n\n.weather .nowcast-labels {\n  font-size: var(--ha-font-size-s);\n  color: #fff;\n  will-change: transform;\n  justify-content: space-between;\n  transition: transform .35s;\n  display: flex;\n}\n\n.forecast-container {\n  flex-direction: column;\n  flex: 0 auto;\n  gap: 4px;\n  width: 100%;\n  padding-top: 4px;\n  padding-bottom: 20px;\n  display: flex;\n}\n\n.divider {\n  background-color: var(--primary-background-color);\n}\n\n.card-divider {\n  height: 4px;\n}\n\n.forecast-divider {\n  border-radius: 2px;\n}\n\n.forecast-container > .forecast-divider {\n  height: 4px;\n  margin: 14px 16px 4px;\n}\n\n.forecast-daily-container, .forecast-hourly-container {\n  touch-action: pan-x;\n  overscroll-behavior-x: contain;\n  flex-direction: column;\n  flex: 0 auto;\n  justify-content: flex-start;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\n\n.fade-left, .fade-right {\n  pointer-events: none;\n  z-index: 2;\n  width: 16px;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n}\n\n.fade-left {\n  background: linear-gradient(to right,\n    var(--card-background-color) 0%,\n    var(--card-background-color) 2px,\n    transparent 100%);\n  left: 0;\n}\n\n.fade-right {\n  background: linear-gradient(to left,\n    var(--card-background-color) 0%,\n    var(--card-background-color) 2px,\n    transparent 100%);\n  right: 0;\n}\n\n.forecast {\n  --forecast-inline-padding: 16px;\n  scroll-snap-type: x mandatory;\n  height: auto;\n  scroll-padding-left: var(--forecast-inline-padding);\n  scroll-padding-right: var(--forecast-inline-padding);\n  justify-content: space-around;\n  align-items: stretch;\n  gap: var(--dynamic-gap, 20px);\n  padding: 8px var(--forecast-inline-padding) 0px;\n  flex: 0 auto;\n  display: flex;\n  overflow: auto clip;\n}\n\n@supports (-webkit-touch-callout: none) {\n  .forecast {\n    padding-bottom: 12px;\n  }\n}\n\n.forecast dwf-daily-list, .forecast dwf-hourly-list {\n  display: contents;\n}\n\n.forecast.daily {\n  --min-gap: 30px;\n  --icon-size: 60px;\n  --icon-container-width: 60px;\n  cursor: grab;\n  -webkit-user-select: none;\n  user-select: none;\n}\n\n.forecast.hourly {\n  --min-gap: 16px;\n  --icon-size: 60px;\n  --icon-container-width: 60px;\n  --day-marker-width: 60px;\n  cursor: grab;\n  -webkit-user-select: none;\n  user-select: none;\n  padding-top: 32px;\n}\n\n.forecast.hourly.dragging, .forecast.hourly.momentum, .forecast.daily.dragging, .forecast.daily.momentum {\n  scroll-snap-type: none;\n}\n\n.forecast.hourly.grabbing, .forecast.daily.grabbing {\n  cursor: grabbing;\n}\n\n.forecast::-webkit-scrollbar {\n  height: 0;\n}\n\n.forecast::-webkit-scrollbar-thumb {\n  background: none;\n}\n\n.forecast::-webkit-scrollbar-track {\n  background: none;\n}\n\n.forecast::-webkit-scrollbar-corner {\n  background: none;\n}\n\n.forecast {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n\n.forecast::-webkit-scrollbar {\n  display: none;\n}\n\n.forecast-item {\n  scroll-snap-align: start;\n  text-align: center;\n  flex-direction: column;\n  height: 100%;\n  display: flex;\n}\n\n.forecast.hourly .forecast-item {\n  width: var(--icon-container-width);\n  align-items: center;\n  overflow: visible;\n}\n\n.forecast.hourly .day-marker {\n  --day-marker-translate-x: calc((var(--dynamic-gap, 20px) + var(--icon-container-width) - var(--day-marker-width)) / 2);\n  left: calc((((var(--day-marker-width) - var(--icon-container-width)) / 2) * -1) - var(--day-marker-translate-x));\n  transform: translateX(var(--day-marker-translate-x)) translateY(-100%);\n  color: #fff;\n  background-color: var(--state-climate-cool-color);\n  pointer-events: none;\n  white-space: nowrap;\n  z-index: 3;\n  scroll-snap-align: none;\n  width: var(--day-marker-width);\n  margin-right: calc(var(--day-marker-width) * -1 - var(--dynamic-gap) / 2);\n  margin-right: calc(round(up, var(--day-marker-width) * -1 - var(--dynamic-gap) / 2, 1px));\n  margin-left: calc(var(--dynamic-gap) * -1 / 2);\n  border-radius: 999px;\n  flex: none;\n  justify-content: center;\n  align-self: start;\n  align-items: center;\n  font-weight: 600;\n  display: inline-flex;\n  position: sticky;\n}\n\n.forecast .day-of-month {\n  opacity: .3;\n  margin-top: -4px;\n  font-size: 13px;\n}\n\n.forecast .date.sunrise {\n  color: var(--orange-color, #ff9800);\n  font-weight: 500;\n}\n\n.forecast .date.sunset {\n  color: var(--purple-color, #926bc7);\n  font-weight: 500;\n}\n\n.forecast.daily .date.selected {\n  background-color: var(--state-climate-cool-color);\n  color: #fff;\n  border-radius: 999px;\n}\n\n.forecast.hourly .date {\n  width: var(--icon-container-width);\n  text-align: center;\n  white-space: nowrap;\n  justify-content: center;\n  align-items: center;\n  margin: 0 auto;\n  display: flex;\n}\n\n.forecast.hourly .date.selected {\n  background-color: var(--state-climate-cool-color);\n  color: #fff;\n  border-radius: 999px;\n}\n\n.forecast .ampm {\n  opacity: .3;\n  font-size: 11px;\n}\n\n.forecast .temp {\n  font-size: var(--ha-font-size-xl);\n  font-weight: bolder;\n}\n\n.forecast .templow {\n  opacity: .5;\n  font-weight: bolder;\n  font-size: var(--ha-font-size-l);\n}\n\n.forecast .precipitation, .forecast .precipitationprobability {\n  opacity: .3;\n  color: var(--state-climate-cool-color);\n  min-height: 20px;\n}\n\n.forecast .hourly-extra {\n  opacity: .6;\n  color: var(--primary-text-color);\n  white-space: nowrap;\n  min-height: 20px;\n  font-weight: 500;\n}\n\n.forecast .hourly-extra.dimmed {\n  opacity: .3;\n}\n\n.forecast .precipitation {\n  --precipitation-fill: 0%;\n  --dwf-precipitation-indicator-color: var(--state-climate-cool-color);\n  --dwf-precipitation-indicator-opacity: .2;\n  --dwf-precipitation-indicator-padding-inline: 8px;\n  --dwf-precipitation-indicator-padding-block: 0px;\n  --dwf-precipitation-indicator-offset-top: 0px;\n  --dwf-precipitation-indicator-offset-bottom: 0px;\n  padding-inline: var(--dwf-precipitation-indicator-padding-inline);\n  padding-block: var(--dwf-precipitation-indicator-padding-block);\n  border-radius: var(--dwf-precipitation-indicator-radius, 4px);\n  z-index: 0;\n  display: inline-block;\n  position: relative;\n  overflow: hidden;\n}\n\n.forecast .precipitation:before {\n  content: "";\n  inset-inline: 0;\n  top: calc(100% - var(--precipitation-fill, 0%) - var(--dwf-precipitation-indicator-offset-top, 0px));\n  bottom: calc(0px - var(--dwf-precipitation-indicator-offset-bottom, 0px));\n  background-color: var(--dwf-precipitation-indicator-color, var(--state-climate-cool-color));\n  opacity: var(--dwf-precipitation-indicator-opacity, .2);\n  border-radius: inherit;\n  pointer-events: none;\n  z-index: -1;\n  transition: top .15s ease-in-out, background-color .15s ease-in-out;\n  position: absolute;\n}\n\n.forecast .precipitation.overflow {\n  --dwf-precipitation-indicator-color: var(--red-color, #f44336);\n  color: var(--red-color, #f44336);\n}\n\n.forecast.daily .forecast-item > .precipitation {\n  line-height: 18px;\n}\n\n.forecast .precipitation.active, .forecast .precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast .daily-extra {\n  opacity: .6;\n  color: var(--primary-text-color);\n  white-space: nowrap;\n  min-height: 20px;\n  font-weight: 500;\n}\n\n.forecast .daily-extra.dimmed {\n  opacity: .3;\n}\n\n.forecast.daily .daily-extra.precipitationprobability {\n  color: var(--state-climate-cool-color);\n  opacity: .3;\n  display: block !important;\n}\n\n.forecast .daily-extra.precipitationprobability.active {\n  opacity: 1;\n}\n\n.forecast.daily .forecast-item {\n  grid-auto-rows: max-content;\n  align-content: start;\n  display: grid;\n}\n\n.forecast.daily .forecast-item > .date, .forecast.daily .forecast-item > .day-of-month, .forecast.daily .forecast-item > .precipitation, .forecast.daily .forecast-item > .precipitationprobability, .forecast.daily .forecast-item > .daily-extra {\n  min-height: auto;\n}\n\n.forecast.daily .forecast-item > .date {\n  grid-row: 1;\n}\n\n.forecast.daily .forecast-item > .day-of-month {\n  grid-row: 2;\n}\n\n.forecast.daily .forecast-item > .forecast-image-icon {\n  grid-row: 3;\n}\n\n.forecast.daily .forecast-item > .temp {\n  grid-row: 4;\n}\n\n.forecast.daily .forecast-item > .templow {\n  grid-row: 5;\n}\n\n.forecast.daily .forecast-item > .precipitation {\n  grid-row: 6;\n}\n\n.forecast.daily .forecast-item > .precipitationprobability {\n  grid-row: 7;\n}\n\n.forecast.daily .forecast-item > .daily-extra {\n  text-align: center;\n  width: var(--icon-size);\n  grid-row: 8;\n  justify-self: center;\n}\n\n.forecast-image-icon {\n  justify-content: center;\n  display: flex;\n}\n\n.forecast-image-icon > * {\n  width: var(--icon-size);\n  height: var(--icon-size);\n}\n\n.forecast-image-icon ha-icon {\n  --mdc-icon-size: var(--icon-size);\n}\n\n.rain {\n  fill: var(--weather-icon-rain-color, #30b3ff);\n}\n\n.sun {\n  fill: var(--weather-icon-sun-color, #fdd93c);\n}\n\n.moon {\n  fill: var(--weather-icon-moon-color, #fcf497);\n}\n\n.cloud-back {\n  fill: var(--weather-icon-cloud-back-color, #d4d4d4);\n}\n\n.cloud-front {\n  fill: var(--weather-icon-cloud-front-color, #f9f9f9);\n}\n\n.snow {\n  fill: var(--weather-icon-snow-color, #f9f9f9);\n  stroke: var(--weather-icon-snow-stroke-color, #d4d4d4);\n  stroke-width: 1px;\n  paint-order: stroke;\n}\n\ndwf-current-weather-attributes {\n  display: contents;\n}\n\n.dwf-current-attributes {\n  gap: var(--ha-space-1, 4px);\n  flex-direction: column;\n  min-width: 0;\n  padding: 8px 16px;\n  display: flex;\n}\n\n.dwf-current-attribute {\n  justify-content: space-between;\n  align-items: center;\n  gap: var(--ha-space-1, 4px);\n  font-size: var(--ha-font-size-m, 14px);\n  line-height: var(--ha-line-height-condensed);\n  color: var(--primary-text-color, #212121);\n  white-space: nowrap;\n  flex-direction: row;\n  display: flex;\n}\n\n.dwf-current-attribute-icon {\n  color: var(--state-icon-color, #616161);\n  padding-left: var(--ha-space-2, 8px);\n}\n\n.dwf-current-attribute-value, .dwf-current-attribute-name {\n  white-space: nowrap;\n  overflow: hidden;\n}\n\n.dwf-current-attribute-name {\n  text-overflow: ellipsis;\n  padding-left: var(--ha-space-4, 16px);\n  flex: 1;\n}\n\n.forecast-condition {\n  text-align: center;\n  font-weight: bold;\n  font-size: var(--ha-font-size-m, 14px);\n  color: var(--primary-text-color, #212121);\n  padding: 8px 16px;\n}\n';

const $fa281dacb802e5da$export$9dd6ff9ea0189349 = (0, $2251e60b8c61d355$export$dbf350e5966cf602)`
  ${(0, $2251e60b8c61d355$export$8d80f9cac07cdb3)($9a338a40f5d4f14b$exports.default || $9a338a40f5d4f14b$exports)}
`;

const $4113940370bb8e3c$export$d0bd520bd5ddb657 = {
  pouring: {
    day: (0, {}),
    night: (0, {}),
  },
  sunny: {
    day: (0, {}),
    night: (0, {}),
  },
  clearnight: {
    day: (0, {}),
    night: (0, {}),
  },
  cloudy: {
    day: (0, {}),
    night: (0, {}),
  },
  partlycloudy: {
    day: (0, {}),
    night: (0, {}),
  },
  fog: {
    day: (0, {}),
    night: (0, {}),
  },
  hail: {
    day: (0, {}),
    night: (0, {}),
  },
  lightningrainy: {
    day: (0, {}),
    night: (0, {}),
  },
  lightning: {
    day: (0, {}),
    night: (0, {}),
  },
  rainy: {
    day: (0, {}),
    night: (0, {}),
  },
  snowyrainy: {
    day: (0, {}),
    night: (0, {}),
  },
  snowy: {
    day: (0, {}),
    night: (0, {}),
  },
  windyvariant: {
    day: (0, {}),
    night: (0, {}),
  },
  windy: {
    day: (0, {}),
    night: (0, {}),
  },
};
const $4113940370bb8e3c$export$80688e1fcf715020 = $4113940370bb8e3c$export$d0bd520bd5ddb657.partlycloudy;

// Collection of types from HA frontend
const $24b1361a8f4eb21b$export$7f18ae76d74a6de0 = [
  'clear-night',
  'cloudy',
  'fog',
  'hail',
  'lightning',
  'lightning-rainy',
  'partlycloudy',
  'partlycloudy-night',
  'pouring',
  'rainy',
  'snowy',
  'snowy-rainy',
  'sunny',
  'windy',
  'windy-variant',
  'exceptional',
];

const $32ab6297cc68a1fe$var$fireEvent = (node, type, detail) => {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail: detail,
      bubbles: true,
      composed: true,
    }),
  );
};
const $32ab6297cc68a1fe$var$computeSchema = (type, attributeOptions) => {
  const schema = [
    {
      name: 'type',
      selector: {
        select: {
          options: [
            {
              value: 'attribute',
              label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.selector.weather_attribute'),
            },
            {
              value: 'entity',
              label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.selector.entity'),
            },
          ],
        },
      },
    },
  ];
  if (type === 'entity')
    schema.push({
      name: 'entity',
      selector: {
        entity: {},
      },
    });
  // attribute
  else
    schema.push({
      name: 'attribute',
      selector: {
        select: {
          options: attributeOptions,
          custom_value: true,
        },
      },
    });
  schema.push({
    name: 'name',
    selector: {
      text: {},
    },
  });
  schema.push({
    name: 'icon',
    selector: {
      icon: {},
    },
  });
  if (type === 'attribute') {
    schema.push({
      name: 'unit',
      selector: {
        text: {},
      },
    });
    schema.push({
      name: 'divisor',
      selector: {
        number: {},
      },
    });
  }
  return schema;
};
class $32ab6297cc68a1fe$export$36fcb699c9edd272 extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('config')) this._type = this.config?.type ?? 'attribute';
  }
  render() {
    if (!this.hass || !this.config) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const attributeOptions = this._buildAttributeOptions();
    const schema = $32ab6297cc68a1fe$var$computeSchema(this._type, attributeOptions);
    const data = {
      ...this.config,
    };
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _valueChanged(ev) {
    ev.stopPropagation();
    const config = ev.detail.value;
    this._type = config.type;
    $32ab6297cc68a1fe$var$fireEvent(this, 'header-info-config-changed', config);
  }
  _buildAttributeOptions() {
    if (!this.hass || !this.weatherEntity)
      return [
        {
          value: '',
          label: 'None',
        },
      ];
    const entityState = this.hass.states[this.weatherEntity];
    if (!entityState)
      return [
        {
          value: '',
          label: 'None',
        },
      ];
    const weather = entityState;
    const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b) => a.localeCompare(b));
    return [
      {
        value: '',
        label: 'None',
      },
      ...attributeNames.map((attribute) => ({
        value: attribute,
        label: (0, $0e777479b7249a00$export$34eb39cb0547b64f)(this.hass, weather, attribute),
      })),
    ];
  }
  constructor(...args) {
    super(...args),
      (this._type = 'attribute'),
      (this._computeLabel = (schema) => {
        if (!this.hass) return schema.name;
        return (
          this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`) ||
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(`editor.card.${schema.name}`) ||
          schema.name
        );
      });
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $32ab6297cc68a1fe$export$36fcb699c9edd272.prototype,
  'hass',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $32ab6297cc68a1fe$export$36fcb699c9edd272.prototype,
  'weatherEntity',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $32ab6297cc68a1fe$export$36fcb699c9edd272.prototype,
  'config',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $32ab6297cc68a1fe$export$36fcb699c9edd272.prototype,
  '_type',
  void 0,
);
$32ab6297cc68a1fe$export$36fcb699c9edd272 = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('header-entity-editor')],
  $32ab6297cc68a1fe$export$36fcb699c9edd272,
);

const $8d6472a4c65f9859$var$fireEvent = (node, type, detail) => {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail: detail,
      bubbles: true,
      composed: true,
    }),
  );
};
const $8d6472a4c65f9859$var$computeSchema = (attributeOptions) => {
  const schema = [
    {
      name: 'attribute',
      selector: {
        select: {
          options: attributeOptions,
          custom_value: true,
        },
      },
    },
    {
      name: 'name',
      selector: {
        text: {},
      },
    },
    {
      name: 'icon',
      selector: {
        icon: {},
      },
    },
    {
      name: 'unit',
      selector: {
        text: {},
      },
    },
    {
      name: 'divisor',
      selector: {
        number: {},
      },
    },
  ];
  return schema;
};
class $8d6472a4c65f9859$export$ae477bd7d152d363 extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  render() {
    if (!this.hass || !this.config) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const attributeOptions = this._buildAttributeOptions();
    const schema = $8d6472a4c65f9859$var$computeSchema(attributeOptions);
    const data = {
      ...this.config,
    };
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
  _valueChanged(ev) {
    ev.stopPropagation();
    $8d6472a4c65f9859$var$fireEvent(this, 'forecast-info-config-changed', ev.detail.value);
  }
  _buildAttributeOptions() {
    if (this.extraAttributeOptions && this.extraAttributeOptions.length > 0) return this.extraAttributeOptions;
    return [
      {
        value: '',
        label: 'None',
      },
    ];
  }
  constructor(...args) {
    super(...args),
      (this._computeLabel = (schema) => {
        if (!this.hass) return schema.name;
        return (
          this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`) ||
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(`editor.card.${schema.name}`) ||
          schema.name
        );
      });
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $8d6472a4c65f9859$export$ae477bd7d152d363.prototype,
  'hass',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $8d6472a4c65f9859$export$ae477bd7d152d363.prototype,
  'config',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $8d6472a4c65f9859$export$ae477bd7d152d363.prototype,
  'extraAttributeOptions',
  void 0,
);
$8d6472a4c65f9859$export$ae477bd7d152d363 = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('forecast-attribute-editor')],
  $8d6472a4c65f9859$export$ae477bd7d152d363,
);

const $b491b0e080b6102f$var$HEADER_CHIP_INDEXES = [0, 1, 2];
const $b491b0e080b6102f$var$chipTypeFieldName = (index) => `header_chip_${index + 1}_type`;
const $b491b0e080b6102f$var$chipAttributeFieldName = (index) => `header_chip_${index + 1}_attribute`;
const $b491b0e080b6102f$var$chipEntityFieldName = (index) => `header_chip_${index + 1}_entity`;
const $b491b0e080b6102f$var$chipIconFieldName = (index) => `header_chip_${index + 1}_icon`;
const $b491b0e080b6102f$var$chipActionFieldName = (index) => `header_chip_${index + 1}_tap_action`;
const $b491b0e080b6102f$var$chipUnitFieldName = (index) => `header_chip_${index + 1}_unit`;
const $b491b0e080b6102f$var$chipDivisorFieldName = (index) => `header_chip_${index + 1}_divisor`;
const $b491b0e080b6102f$var$CHIP_FORM_FIELD_NAMES = $b491b0e080b6102f$var$HEADER_CHIP_INDEXES.reduce((names, index) => {
  names.push(
    $b491b0e080b6102f$var$chipTypeFieldName(index),
    $b491b0e080b6102f$var$chipAttributeFieldName(index),
    $b491b0e080b6102f$var$chipEntityFieldName(index),
    $b491b0e080b6102f$var$chipIconFieldName(index),
    $b491b0e080b6102f$var$chipActionFieldName(index),
    $b491b0e080b6102f$var$chipUnitFieldName(index),
    $b491b0e080b6102f$var$chipDivisorFieldName(index),
  );
  return names;
}, []);
const $b491b0e080b6102f$var$CHIP_TYPE_OPTIONS = [
  {
    value: 'attribute',
    label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.chip.attribute', '', ''),
  },
  {
    value: 'entity',
    label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.chip.entity', '', ''),
  },
];
const $b491b0e080b6102f$var$SOLAR_FORECAST_OPTION = 'solar_forecast';
const $b491b0e080b6102f$var$FORECAST_OPTIONS_CACHE = new Map();
const $b491b0e080b6102f$var$ICON_MAP_LABELS = {
  'clear-night': (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.clear-night', '', ''),
  cloudy: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.cloudy', '', ''),
  fog: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.fog', '', ''),
  hail: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.hail', '', ''),
  lightning: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.lightning', '', ''),
  'lightning-rainy': (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.lightning-rainy', '', ''),
  partlycloudy: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.partlycloudy', '', ''),
  'partlycloudy-night': (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
    'editor.weather_condition.partlycloudy-night',
    '',
    '',
  ),
  pouring: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.pouring', '', ''),
  rainy: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.rainy', '', ''),
  snowy: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.snowy', '', ''),
  'snowy-rainy': (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.snowy-rainy', '', ''),
  sunny: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.sunny', '', ''),
  windy: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.windy', '', ''),
  'windy-variant': (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.windy-variant', '', ''),
  exceptional: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.weather_condition.exceptional', '', ''),
};
const $b491b0e080b6102f$var$fireEvent = (node, type, detail) => {
  node.dispatchEvent(
    new CustomEvent(type, {
      detail: detail,
      bubbles: true,
      composed: true,
    }),
  );
};
const $b491b0e080b6102f$var$WeatherEntityFeature = {
  FORECAST_DAILY: 1,
  FORECAST_HOURLY: 2,
  FORECAST_TWICE_DAILY: 4,
};
class $b491b0e080b6102f$export$4f33cd896d7e371b extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  static {
    this.styles = (0, $2251e60b8c61d355$export$dbf350e5966cf602)`
    .editor-section {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-section:first-of-type {
      margin-top: 16px;
    }

    .section-subtitle {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-subsection {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .chips-hint {
      margin: 0;
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .location-description {
      font-size: 14px;
      color: var(--secondary-text-color);
    }

    .sun-coordinates {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .color-input-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }

    .color-input-row input[type='color'] {
      padding: 0;
      width: 40px;
      height: 32px;
      border: none;
      background: none;
    }

    .color-input-row input[type='text'] {
      flex: 1 1 120px;
      min-width: 120px;
    }

    .icon-map-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .icon-map-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .icon-map-row ha-selector {
      flex: 1 1 auto;
    }

    .clear-button {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));

      cursor: pointer;
      font: inherit;
      color: var(--primary-text-color);
    }

    .clear-button:hover {
      background: var(--secondary-background-color, #f5f5f5);
    }

    .coordinate-field {
      display: flex;
      flex: 1 1 120px;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
    }

    .coordinate-field input {
      font: inherit;
      padding: 6px 8px;
      border-radius: 4px;
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      color: var(--primary-text-color);
    }

    .coordinate-field input:disabled {
      opacity: 0.6;
    }

    .forecast-switch {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .forecast-switch span {
      font-size: 14px;
    }

    .editor-expander {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color, #fff);
    }

    .editor-expander summary {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 12px 16px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
    }

    .editor-expander summary::-webkit-details-marker {
      display: none;
    }

    .editor-expander > summary ha-icon {
      transition: transform 0.2s ease;
    }

    .editor-expander[open] > summary ha-icon {
      transform: rotate(180deg);
    }

    .editor-expander[open] summary {
      border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .editor-expander .summary-actions {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .editor-expander.disabled summary {
      color: var(--secondary-text-color);
      cursor: default;
    }

    .editor-expander.disabled > summary ha-icon {
      opacity: 0.4;
    }

    .editor-expander .expander-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .editor-expander.nested summary {
      padding: 10px 12px;
      font-size: 14px;
    }

    .editor-expander.nested .expander-content {
      padding: 12px;
    }

    .header-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .header-info-item > *:first-child {
      flex: 1;
    }

    .forecast-info-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    .forecast-info-item > *:first-child {
      flex: 1;
    }

    .editor-expander.nested .expander-content > ha-button {
      align-self: flex-start;
    }
  `;
  }
  setConfig(config) {
    const normalizedChips = this._normalizeHeaderChips(config);
    this._chipTypes = this._buildChipTypeState(normalizedChips);
    this._config = {
      type: 'custom:detailed-weather-forecast-card',
      ...config,
      header_info: config.header_info ?? [],
      daily_info: config.daily_info ?? [],
      hourly_info: config.hourly_info ?? [],
      nowcast_entity: config.nowcast_entity,
      nowcast_always_show: config.nowcast_always_show ?? false,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? 'vertical',
      header_chips: normalizedChips,
      header_attributes: normalizedChips.filter((chip) => chip.type === 'attribute').map((chip) => chip.attribute),
    };
    this._refreshForecastOptions();
    this._refreshSolarForecastOptions(true);
  }
  render() {
    if (!this.hass || !this._config) return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)``;
    this._refreshForecastOptions();
    this._ensureSolarForecastOptions();
    const {
      general: generalSchema,
      header: headerSchema,
      nowcast: nowcastSchema,
      chips: chipSchema,
      hourly: hourlySchema,
      daily: dailySchema,
    } = this._buildSchemas();
    const formData = this._createFormData();
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <ha-form
        .hass=${this.hass}
        .data=${formData}
        .schema=${generalSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._handleValueChanged}
      ></ha-form>
      <div class="editor-section">
        ${this._renderExpander(
          'gps-coordinates',
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.gps_coordinates', '', ''),
          (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <p class="location-description">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
              'editor.section.gps_coordinates_description',
              '',
              '',
            )}</p>
            <div class="forecast-switch">
              <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                'editor.section.use_home_assistant_location',
                '',
                '',
              )}</span>
              <ha-switch
                name="sun_use_home_coordinates"
                .checked=${this._config.sun_use_home_coordinates ?? true}
                @change=${this._handleSunToggleChange}
              ></ha-switch>
            </div>
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.latitude', '', '')}</span>
                <input
                  type="text"
                  name="sun_latitude"
                  placeholder="e.g. 48.137"
                  .value=${String(this._config.sun_latitude ?? '')}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
              <label class="coordinate-field">
                <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.longitude', '', '')}</span>
                <input
                  type="text"
                  name="sun_longitude"
                  placeholder="e.g. 11.575"
                  .value=${String(this._config.sun_longitude ?? '')}
                  ?disabled=${this._config.sun_use_home_coordinates ?? true}
                  @input=${this._handleSunInputChange}
                />
              </label>
            </div>
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderExpander(
          'solar-forecast',
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.solar_forecast', '', ''),
          (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <p class="location-description">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
              'editor.section.solar_forecast_description',
              '',
              '',
            )}</p>
            <ha-selector
              .hass=${this.hass}
              .selector=${{
                select: {
                  options: this._solarForecastOptions,
                  multiple: true,
                },
              }}
              .value=${this._getSolarForecastSelection()}
              .label=${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.energy_solar_forecasts', '', '')}
              .required=${false}
              .disabled=${!this._solarForecastEntryIds.length}
              @value-changed=${this._handleSolarForecastSelectionChange}
            ></ha-selector>
            ${
              this._solarForecastOptionsLoaded && !this._solarForecastEntryIds.length
                ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<p class="location-description">
                  ${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                    'editor.section.no_energy_solar_forecasts_configured',
                    '',
                    '',
                  )}
                </p>`
                : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
            }
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderExpander(
          'custom-icons',
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.custom_icons', '', ''),
          (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <p class="location-description">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
              'editor.section.custom_icons_description',
              '',
              '',
            )}</p>
            <div class="icon-map-list">
              ${(0, $24b1361a8f4eb21b$export$7f18ae76d74a6de0).map((condition) => {
                const value = this._getIconMapValue(condition);
                return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                  <div class="icon-map-row">
                    <ha-selector
                      .hass=${this.hass}
                      .selector=${{
                        icon: {},
                      }}
                      .value=${value}
                      .label=${$b491b0e080b6102f$var$ICON_MAP_LABELS[condition]}
                      .required=${false}
                      @value-changed=${(event) => this._handleIconMapChange(condition, event)}
                    ></ha-selector>
                  </div>
                `;
              })}
            </div>
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'header',
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.header', '', ''),
          'show_header',
          (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${headerSchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${this._renderExpander(
              'header-chips',
              (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.chips', '', ''),
              (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                <p class="chips-hint">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.chips_description',
                  '',
                  '',
                )}</p>
                <ha-form
                  .hass=${this.hass}
                  .data=${formData}
                  .schema=${chipSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
              `,
              {
                nested: true,
              },
            )}
            ${this._renderExpander(
              'header-nowcast',
              (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.nowcast', '', ''),
              (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                <p class="location-description">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.nowcast_description',
                  '',
                  '',
                )}</p>
                <ha-form
                  .hass=${this.hass}
                  .data=${formData}
                  .schema=${nowcastSchema}
                  .computeLabel=${this._computeLabel}
                  @value-changed=${this._handleValueChanged}
                ></ha-form>
              `,
              {
                nested: true,
              },
            )}
            ${this._renderExpander(
              'header-info',
              (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.header_info', '', ''),
              (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                <p class="chips-hint">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.header_info_description',
                  '',
                  '',
                )}</p>
                ${this._config.header_info?.map((info, index) => {
                  return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                        <div class="header-info-item">
                            <header-entity-editor
                                .hass=${this.hass}
                                .weatherEntity=${this._config?.entity}
                                .config=${info}
                                @header-info-config-changed=${(e) => this._headerInfoChanged(e, index)}
                            ></header-entity-editor>
                            <ha-icon-button @click=${() => this._deleteHeaderInfo(index)}>
                                <ha-icon icon="mdi:delete"></ha-icon>
                            </mwc-icon-button>
                        </div>
                    `;
                })}
                <ha-button @click=${this._addHeaderInfo}>
                  ${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              {
                nested: true,
              },
            )}
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'daily-forecast',
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.daily_forecast', '', ''),
          'daily_forecast',
          (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${dailySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${
              this._forecastOptionsLoading.daily && !this._dailyExtraOptions.length
                ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<p class="location-description">${(0,
                  $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.main.loading_forecast_attributes')}</p>`
                : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
            }
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.extra_attribute_color',
                  '',
                  '',
                )}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="daily_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.daily_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="daily_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.daily_extra_attribute_color ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${() => this._clearOptionalField('daily_extra_attribute_color')}
                  >
                    ${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.clear', '', '')}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.dim_values_smaller_than',
                  '',
                  '',
                )}</span>
                <input
                  type="number"
                  name="daily_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.no_threshold', '', '')}
                  .value=${String(this._config.daily_extra_attribute_dim_below ?? '')}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                'editor.section.forecast_spacing',
                '',
                '',
              )}</h5>
              <p class="location-description">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                'editor.section.forecast_spacing_description',
                '',
                '',
              )}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.daily_min_gap', '', '')}</span>
                  <input
                    type="number"
                    name="daily_min_gap"
                    min="10"
                    step="1"
                    placeholder=${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.default_30', '', '')}
                    .value=${String(this._config.daily_min_gap ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander(
              'daily-info',
              (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.daily_forecast_info', '', ''),
              (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                <p class="chips-hint">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.daily_forecast_info_description',
                  '',
                  '',
                )}</p>
                ${this._config.daily_info?.map((info, index) => {
                  return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${info}
                        .extraAttributeOptions=${this._buildDailyExtraAttributeOptions(true)}
                        @forecast-info-config-changed=${(e) => this._dailyInfoChanged(e, index)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${() => this._deleteDailyInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `;
                })}
                <ha-button @click=${this._addDailyInfo}>
                  ${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              {
                nested: true,
              },
            )}
          `,
        )}
      </div>
      <div class="editor-section">
        ${this._renderToggleExpander(
          'hourly-forecast',
          (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.hourly_forecast', '', ''),
          'hourly_forecast',
          (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <ha-form
              .hass=${this.hass}
              .data=${formData}
              .schema=${hourlySchema}
              .computeLabel=${this._computeLabel}
              @value-changed=${this._handleValueChanged}
            ></ha-form>
            ${
              this._forecastOptionsLoading.hourly && !this._hourlyExtraOptions.length
                ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<p class="location-description">${(0,
                  $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.main.loading_forecast_attributes')}</p>`
                : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
            }
            <div class="sun-coordinates">
              <label class="coordinate-field">
                <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.extra_attribute_color',
                  '',
                  '',
                )}</span>
                <div class="color-input-row">
                  <input
                    type="color"
                    name="hourly_extra_attribute_color"
                    .value=${this._getColorPickerValue(this._config.hourly_extra_attribute_color)}
                    @input=${this._handleColorPickerChange}
                  />
                  <input
                    type="text"
                    name="hourly_extra_attribute_color"
                    placeholder="#30b3ff"
                    .value=${String(this._config.hourly_extra_attribute_color ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                  <button
                    class="clear-button"
                    type="button"
                    @click=${() => this._clearOptionalField('hourly_extra_attribute_color')}
                  >
                    ${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.clear', '', '')}
                  </button>
                </div>
              </label>
              <label class="coordinate-field">
                <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.dim_values_smaller_than',
                  '',
                  '',
                )}</span>
                <input
                  type="number"
                  name="hourly_extra_attribute_dim_below"
                  step="0.1"
                  placeholder=${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.no_threshold', '', '')}
                  .value=${String(this._config.hourly_extra_attribute_dim_below ?? '')}
                  @input=${this._handleOptionalNumberInputChange}
                />
              </label>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                'editor.section.sunrise_sunset',
                '',
                '',
              )}</h5>
              <div class="forecast-switch">
                <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.show_sunrise_sunset',
                  '',
                  '',
                )}</span>
                <ha-switch
                  name="show_sun_times"
                  .checked=${this._config.show_sun_times ?? false}
                  @change=${this._handleSunToggleChange}
                ></ha-switch>
              </div>
            </div>
            <div class="editor-subsection">
              <h5 class="section-subtitle">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                'editor.section.forecast_spacing',
                '',
                '',
              )}</h5>
              <p class="location-description">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                'editor.section.forecast_spacing_description',
                '',
                '',
              )}</p>
              <div class="sun-coordinates">
                <label class="coordinate-field">
                  <span>${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                    'editor.section.hourly_min_gap',
                    '',
                    '',
                  )}</span>
                  <input
                    type="number"
                    name="hourly_min_gap"
                    min="10"
                    step="1"
                    placeholder=${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.default_16', '', '')}
                    .value=${String(this._config.hourly_min_gap ?? '')}
                    @input=${this._handleSunInputChange}
                  />
                </label>
              </div>
            </div>
            ${this._renderExpander(
              'hourly-info',
              (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.hourly_forecast_info', '', ''),
              (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                <p class="chips-hint">${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
                  'editor.section.hourly_forecast_info_description',
                  '',
                  '',
                )}</p>
                ${this._config.hourly_info?.map((info, index) => {
                  return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                    <div class="forecast-info-item">
                      <forecast-attribute-editor
                        .hass=${this.hass}
                        .config=${info}
                        .extraAttributeOptions=${this._buildHourlyExtraAttributeOptions(true)}
                        @forecast-info-config-changed=${(e) => this._hourlyInfoChanged(e, index)}
                      ></forecast-attribute-editor>
                      <ha-icon-button @click=${() => this._deleteHourlyInfo(index)}>
                        <ha-icon icon="mdi:delete"></ha-icon>
                      </ha-icon-button>
                    </div>
                  `;
                })}
                <ha-button @click=${this._addHourlyInfo}>
                  ${(0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.section.add_attribute', '', '')}
                </ha-button>
              `,
              {
                nested: true,
              },
            )}
          `,
        )}
      </div>
    `;
  }
  _handleValueChanged(event) {
    event.stopPropagation();
    const mergedFormValue = {
      ...this._createFormData(),
      ...event.detail.value,
    };
    const chipTypesUpdate = {
      ...this._chipTypes,
    };
    $b491b0e080b6102f$var$HEADER_CHIP_INDEXES.forEach((index) => {
      const typeField = $b491b0e080b6102f$var$chipTypeFieldName(index);
      const typeValue = mergedFormValue[typeField] ?? 'attribute';
      chipTypesUpdate[index] = !typeValue ? 'attribute' : typeValue;
    });
    this._chipTypes = chipTypesUpdate;
    const headerChips = this._extractHeaderChips(mergedFormValue);
    const configUpdate = {
      ...mergedFormValue,
      header_chips: headerChips,
      header_attributes: headerChips
        .filter((chip) => chip.type === 'attribute')
        .map((chip) => chip.attribute)
        .filter((attribute) => typeof attribute === 'string' && attribute.trim().length > 0),
    };
    $b491b0e080b6102f$var$CHIP_FORM_FIELD_NAMES.forEach((name) => {
      delete configUpdate[name];
    });
    this._updateConfig(configUpdate);
  }
  _handleSunToggleChange(event) {
    const target = event.currentTarget;
    if (!target) return;
    const name = target.getAttribute('name') ?? target.name;
    if (!name) return;
    const key = name;
    const isChecked = typeof target.checked === 'boolean' ? target.checked : false;
    this._updateConfig({
      [key]: isChecked,
    });
  }
  _handleSunInputChange(event) {
    const target = event.currentTarget;
    if (!target) return;
    const key = target.name;
    const value = target.value.trim();
    const update = {};
    update[key] = value === '' ? undefined : value;
    this._updateConfig(update);
  }
  _handleExpanderToggle(event, id) {
    const target = event.currentTarget;
    if (!target) return;
    this._expandedSections = {
      ...this._expandedSections,
      [id]: target.open,
    };
  }
  _handleExpanderSummaryClick(event, disabled) {
    if (!disabled) return;
    event.preventDefault();
  }
  _isToggleDisabled(name, config) {
    const toggleNames = ['show_header', 'daily_forecast', 'hourly_forecast'];
    const enabledCount = toggleNames.reduce(
      (count, key) => (this._isSectionEnabled(key, config) ? count + 1 : count),
      0,
    );
    return enabledCount <= 1 && this._isSectionEnabled(name, config);
  }
  _handleOptionalNumberInputChange(event) {
    const target = event.currentTarget;
    if (!target) return;
    const key = target.name;
    const raw = target.value.trim();
    const update = {};
    if (raw === '') update[key] = undefined;
    else {
      const numericValue = Number(raw);
      update[key] = Number.isFinite(numericValue) ? numericValue : undefined;
    }
    this._updateConfig(update);
  }
  _handleColorPickerChange(event) {
    const target = event.currentTarget;
    if (!target) return;
    const key = target.name;
    const value = target.value.trim();
    const update = {};
    update[key] = value === '' ? undefined : value;
    this._updateConfig(update);
  }
  _clearOptionalField(field) {
    this._updateConfig({
      [field]: undefined,
    });
  }
  _headerInfoChanged(e, index) {
    if (!this._config?.header_info) return;
    const newInfo = [...this._config.header_info];
    const oldItem = newInfo[index];
    newInfo[index] = {
      ...oldItem,
      ...e.detail,
    };
    this._updateConfig({
      header_info: newInfo,
    });
  }
  _deleteHeaderInfo(index) {
    if (!this._config?.header_info) return;
    const newInfo = [...this._config.header_info];
    newInfo.splice(index, 1);
    this._updateConfig({
      header_info: newInfo,
    });
  }
  _addHeaderInfo() {
    const newInfo = this._config?.header_info ? [...this._config.header_info] : [];
    newInfo.push({
      type: 'attribute',
      attribute: '',
      name: '',
    });
    this._updateConfig({
      header_info: newInfo,
    });
  }
  _dailyInfoChanged(e, index) {
    if (!this._config?.daily_info) return;
    const newInfo = [...this._config.daily_info];
    const oldItem = newInfo[index];
    newInfo[index] = {
      ...oldItem,
      ...e.detail,
    };
    this._updateConfig({
      daily_info: newInfo,
    });
  }
  _deleteDailyInfo(index) {
    if (!this._config?.daily_info) return;
    const newInfo = [...this._config.daily_info];
    newInfo.splice(index, 1);
    this._updateConfig({
      daily_info: newInfo,
    });
  }
  _addDailyInfo() {
    const newInfo = this._config?.daily_info ? [...this._config.daily_info] : [];
    newInfo.push({
      attribute: '',
      name: '',
    });
    this._updateConfig({
      daily_info: newInfo,
    });
  }
  _hourlyInfoChanged(e, index) {
    if (!this._config?.hourly_info) return;
    const newInfo = [...this._config.hourly_info];
    const oldItem = newInfo[index];
    newInfo[index] = {
      ...oldItem,
      ...e.detail,
    };
    this._updateConfig({
      hourly_info: newInfo,
    });
  }
  _deleteHourlyInfo(index) {
    if (!this._config?.hourly_info) return;
    const newInfo = [...this._config.hourly_info];
    newInfo.splice(index, 1);
    this._updateConfig({
      hourly_info: newInfo,
    });
  }
  _addHourlyInfo() {
    const newInfo = this._config?.hourly_info ? [...this._config.hourly_info] : [];
    newInfo.push({
      attribute: '',
      name: '',
    });
    this._updateConfig({
      hourly_info: newInfo,
    });
  }
  _getIconMapValue(condition) {
    const iconMap = this._config?.icon_map;
    if (!iconMap) return '';
    const value = iconMap[condition];
    return typeof value === 'string' ? value : '';
  }
  _handleIconMapChange(condition, event) {
    event.stopPropagation();
    if (!this._config) return;
    const raw = event.detail?.value;
    const value = typeof raw === 'string' ? raw.trim() : '';
    const nextMap = {
      ...(this._config.icon_map ?? {}),
    };
    if (!value) delete nextMap[condition];
    else nextMap[condition] = value;
    this._updateConfig({
      icon_map: Object.keys(nextMap).length ? nextMap : undefined,
    });
  }
  _getColorPickerValue(value) {
    if (!value) return '#000000';
    const trimmed = value.trim();
    const hexMatch = /^#([0-9a-fA-F]{3}){1,2}$/.test(trimmed);
    if (!hexMatch) return '#000000';
    if (trimmed.length === 4) {
      const [r, g, b] = trimmed.slice(1).split('');
      return `#${r}${r}${g}${g}${b}${b}`;
    }
    return trimmed;
  }
  _handleSolarForecastSelectionChange(event) {
    event.stopPropagation();
    const raw = event.detail?.value;
    const selection = Array.isArray(raw) ? raw.filter((item) => typeof item === 'string') : [];
    const available = this._solarForecastEntryIds;
    const normalized = selection.filter((entryId) => available.includes(entryId));
    const update = {};
    if (!normalized.length) update.solar_forecast_entries = [];
    else if (normalized.length === available.length) update.solar_forecast_entries = undefined;
    else update.solar_forecast_entries = normalized;
    this._updateConfig(update);
  }
  _getSolarForecastSelection() {
    if (this._config?.solar_forecast_entries) return this._config.solar_forecast_entries;
    return this._solarForecastEntryIds;
  }
  _createFormData() {
    if (!this._config) return {};
    const formData = {
      ...this._config,
    };
    const headerChips = this._config.header_chips ?? [];
    $b491b0e080b6102f$var$HEADER_CHIP_INDEXES.forEach((index) => {
      const typeField = $b491b0e080b6102f$var$chipTypeFieldName(index);
      const attributeField = $b491b0e080b6102f$var$chipAttributeFieldName(index);
      const entityField = $b491b0e080b6102f$var$chipEntityFieldName(index);
      const iconField = $b491b0e080b6102f$var$chipIconFieldName(index);
      const actionField = $b491b0e080b6102f$var$chipActionFieldName(index);
      const unitField = $b491b0e080b6102f$var$chipUnitFieldName(index);
      const divisorField = $b491b0e080b6102f$var$chipDivisorFieldName(index);
      const configuredChip = headerChips[index];
      const type = this._chipTypes[index] ?? configuredChip?.type ?? 'attribute';
      formData[typeField] = type;
      formData[actionField] = configuredChip?.tap_action;
      formData[iconField] = configuredChip?.icon ?? '';
      if (type === 'entity') {
        formData[entityField] = configuredChip?.type === 'entity' ? configuredChip.entity : '';
        formData[attributeField] = '';
        formData[unitField] = '';
      } else {
        formData[attributeField] = configuredChip?.type === 'attribute' ? configuredChip.attribute : '';
        formData[entityField] = '';
        formData[unitField] = configuredChip?.type === 'attribute' ? configuredChip.unit : '';
        formData[divisorField] = configuredChip?.type === 'attribute' ? configuredChip.divisor : undefined;
      }
    });
    return formData;
  }
  _renderExpander(id, title, content, options = {}) {
    const className = options.nested ? 'editor-expander nested' : 'editor-expander';
    const isOpen = this._expandedSections[id] ?? options.open ?? false;
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <details class=${className} ?open=${isOpen} @toggle=${(event) => this._handleExpanderToggle(event, id)}>
        <summary>
          <span>${title}</span>
          <ha-icon icon="mdi:chevron-down"></ha-icon>
        </summary>
        <div class="expander-content">${content}</div>
      </details>
    `;
  }
  _renderToggleExpander(id, title, toggleName, content, options = {}) {
    const config = this._config;
    if (!config) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    const isEnabled = this._isSectionEnabled(toggleName, config);
    const toggleDisabled = this._isToggleDisabled(toggleName, config);
    const isOpen = isEnabled && (this._expandedSections[id] ?? options.open ?? false);
    const className = `editor-expander${isEnabled ? '' : ' disabled'}`;
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <details class=${className} ?open=${isOpen} @toggle=${(event) => this._handleExpanderToggle(event, id)}>
        <summary @click=${(event) => this._handleExpanderSummaryClick(event, !isEnabled)}>
          <span>${title}</span>
          <span class="summary-actions">
            <ha-switch
              class="expander-toggle"
              name=${toggleName}
              .checked=${isEnabled}
              ?disabled=${toggleDisabled}
              @click=${(event) => event.stopPropagation()}
              @change=${this._handleSunToggleChange}
            ></ha-switch>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </span>
        </summary>
        <div class="expander-content">${content}</div>
      </details>
    `;
  }
  _ensureSolarForecastOptions() {
    this._refreshSolarForecastOptions(false);
  }
  _refreshSolarForecastOptions(force) {
    if (!this.hass || this._solarForecastOptionsPromise) return;
    if (!force && this._solarForecastOptionsLoaded) return;
    this._solarForecastOptionsPromise = this._fetchSolarForecastOptions().finally(() => {
      this._solarForecastOptionsPromise = undefined;
    });
  }
  async _fetchSolarForecastOptions() {
    try {
      const prefs = await this.hass.callWS({
        type: 'energy/get_prefs',
      });
      const entryIds = this._extractSolarForecastEntries(prefs);
      const entries = await this.hass.callWS({
        type: 'config_entries/get',
      });
      const entryMap = new Map(entries.map((entry) => [entry.entry_id, entry]));
      const options = entryIds.map((entryId) => {
        const entry = entryMap.get(entryId);
        const title = entry?.title?.trim();
        const domain = entry?.domain?.trim();
        const labelParts = [];
        if (title) labelParts.push(title);
        if (domain) labelParts.push(domain);
        const label = labelParts.length ? labelParts.join(' - ') : entryId;
        return {
          value: entryId,
          label: label,
        };
      });
      this._solarForecastOptions = options;
      this._solarForecastEntryIds = entryIds;
    } catch (_err) {
      this._solarForecastOptions = [];
      this._solarForecastEntryIds = [];
    }
    this._solarForecastOptionsLoaded = true;
  }
  _extractSolarForecastEntries(prefs) {
    const energySources = prefs?.energy_sources ?? [];
    const entries = new Set();
    energySources.forEach((source) => {
      if (source?.type !== 'solar') return;
      const configured = source.config_entry_solar_forecast;
      if (!Array.isArray(configured)) return;
      configured.forEach((entryId) => {
        if (typeof entryId === 'string' && entryId.trim().length) entries.add(entryId);
      });
    });
    return Array.from(entries);
  }
  _extractHeaderChips(formValue) {
    const chips = [];
    $b491b0e080b6102f$var$HEADER_CHIP_INDEXES.forEach((index) => {
      const typeField = $b491b0e080b6102f$var$chipTypeFieldName(index);
      const attributeField = $b491b0e080b6102f$var$chipAttributeFieldName(index);
      const entityField = $b491b0e080b6102f$var$chipEntityFieldName(index);
      const actionField = $b491b0e080b6102f$var$chipActionFieldName(index);
      const iconField = $b491b0e080b6102f$var$chipIconFieldName(index);
      const unitField = $b491b0e080b6102f$var$chipUnitFieldName(index);
      const divisorField = $b491b0e080b6102f$var$chipDivisorFieldName(index);
      const type = formValue[typeField] ?? 'attribute';
      const tapAction = formValue[actionField];
      const iconRaw = formValue[iconField];
      const iconValue = typeof iconRaw === 'string' ? iconRaw.trim() : '';
      if (type === 'entity') {
        const entityRaw = formValue[entityField];
        const entityValue = typeof entityRaw === 'string' ? entityRaw.trim() : '';
        const chip = {
          type: 'entity',
          entity: entityValue,
        };
        if (tapAction) chip.tap_action = tapAction;
        if (tapAction) chip.tap_action = tapAction;
        if (iconValue) chip.icon = iconValue;
        chips.push(chip);
        return;
      }
      const attributeRaw = formValue[attributeField];
      const attributeValue = typeof attributeRaw === 'string' ? attributeRaw.trim() : '';
      const unitRaw = formValue[unitField];
      const unitValue = typeof unitRaw === 'string' ? unitRaw.trim() : '';
      const divisorRaw = formValue[divisorField];
      const divisorValue = Number(divisorRaw);
      const chip = {
        type: 'attribute',
        attribute: attributeValue,
        unit: unitValue,
      };
      if (Number.isFinite(divisorValue)) chip.divisor = divisorValue;
      if (tapAction) chip.tap_action = tapAction;
      if (iconValue) chip.icon = iconValue;
      chips.push(chip);
    });
    return chips;
  }
  _buildAttributeOptions() {
    if (!this.hass)
      return [
        {
          value: '',
          label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.none', '', ''),
        },
      ];
    const entityId = this._config?.entity;
    if (!entityId)
      return [
        {
          value: '',
          label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.none', '', ''),
        },
      ];
    const entityState = this.hass.states[entityId];
    if (!entityState)
      return [
        {
          value: '',
          label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.none', '', ''),
        },
      ];
    const attributeNames = Object.keys(entityState.attributes ?? {}).sort((a, b) => a.localeCompare(b));
    const weather = entityState;
    return [
      {
        value: '',
        label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.none', '', ''),
      },
      ...attributeNames.map((attribute) => ({
        value: attribute,
        label: (0, $0e777479b7249a00$export$34eb39cb0547b64f)(this.hass, weather, attribute),
      })),
    ];
  }
  _buildHourlyExtraAttributeOptions(includeDisallowed = false) {
    const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
    const options = this._hourlyExtraOptions.length
      ? this._hourlyExtraOptions.filter((opt) => includeDisallowed || !disallowed.has(opt))
      : [];
    const solarOption = this._solarForecastEntryIds.length
      ? [
          {
            value: $b491b0e080b6102f$var$SOLAR_FORECAST_OPTION,
            label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.solar_forecast', '', ''),
          },
        ]
      : [];
    const weather = this._config?.entity ? this.hass.states[this._config.entity] : undefined;
    const attributeOptions = options.map((attribute) => {
      const name = weather ? (0, $0e777479b7249a00$export$34eb39cb0547b64f)(this.hass, weather, attribute) : attribute;
      return {
        value: attribute,
        label: name,
      };
    });
    return [
      {
        value: '',
        label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.none', '', ''),
      },
      ...solarOption,
      ...attributeOptions,
    ];
  }
  _buildDailyExtraAttributeOptions(includeDisallowed = false) {
    const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
    const options = this._dailyExtraOptions.length
      ? this._dailyExtraOptions.filter((opt) => includeDisallowed || !disallowed.has(opt))
      : [];
    const solarOption = this._solarForecastEntryIds.length
      ? [
          {
            value: $b491b0e080b6102f$var$SOLAR_FORECAST_OPTION,
            label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.solar_forecast', '', ''),
          },
        ]
      : [];
    const weather = this._config?.entity ? this.hass.states[this._config.entity] : undefined;
    const attributeOptions = options.map((attribute) => {
      const name = weather ? (0, $0e777479b7249a00$export$34eb39cb0547b64f)(this.hass, weather, attribute) : attribute;
      return {
        value: attribute,
        label: name,
      };
    });
    return [
      {
        value: '',
        label: (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)('editor.common.none', '', ''),
      },
      ...solarOption,
      ...attributeOptions,
    ];
  }
  _buildSchemas() {
    const generalSchema = [
      {
        name: 'entity',
        selector: {
          entity: {
            domain: 'weather',
          },
        },
      },
    ];
    const headerSchema = [
      {
        name: 'header_temperature_entity',
        selector: {
          entity: {
            domain: 'sensor',
            device_class: 'temperature',
          },
        },
        optional: true,
      },
      {
        name: 'header_tap_action_temperature',
        selector: {
          ui_action: {},
        },
        optional: true,
      },
      {
        name: 'use_night_header_backgrounds',
        selector: {
          boolean: {},
        },
      },
    ];
    const nowcastSchema = [
      {
        name: 'nowcast_entity',
        selector: {
          entity: {
            domain: 'weather',
          },
        },
        optional: true,
      },
      {
        name: 'nowcast_always_show',
        selector: {
          boolean: {},
        },
        optional: true,
        disabled: !this._config?.nowcast_entity,
      },
    ];
    const attributeOptions = this._buildAttributeOptions();
    const hourlySchema = [
      {
        name: 'hourly_extra_attribute',
        selector: {
          select: {
            options: this._buildHourlyExtraAttributeOptions(),
            custom_value: true,
          },
        },
        optional: true,
      },
      {
        name: 'hourly_extra_attribute_unit',
        selector: {
          text: {},
        },
        optional: true,
      },
      {
        name: 'hourly_extra_attribute_divisor',
        selector: {
          text: {},
        },
        optional: true,
      },
    ];
    const dailySchema = [
      {
        name: 'daily_extra_attribute',
        selector: {
          select: {
            options: this._buildDailyExtraAttributeOptions(),
            custom_value: true,
          },
        },
        optional: true,
      },
      {
        name: 'daily_extra_attribute_unit',
        selector: {
          text: {},
        },
        optional: true,
        disabled: this._config?.daily_extra_attribute === 'precipitation_probability',
      },
      {
        name: 'daily_extra_attribute_divisor',
        selector: {
          number: {},
        },
        optional: true,
      },
    ];
    const chipsSchema = [];
    $b491b0e080b6102f$var$HEADER_CHIP_INDEXES.forEach((index) => {
      const typeField = $b491b0e080b6102f$var$chipTypeFieldName(index);
      chipsSchema.push({
        name: typeField,
        selector: {
          select: {
            options: $b491b0e080b6102f$var$CHIP_TYPE_OPTIONS,
          },
        },
        optional: true,
      });
      const chipType = this._chipTypes[index] ?? 'attribute';
      if (chipType === 'entity')
        chipsSchema.push({
          name: $b491b0e080b6102f$var$chipEntityFieldName(index),
          selector: {
            entity: {},
          },
          optional: true,
        });
      else {
        chipsSchema.push({
          name: $b491b0e080b6102f$var$chipAttributeFieldName(index),
          selector: {
            select: {
              options: attributeOptions,
              custom_value: true,
            },
          },
          optional: true,
          disabled: !this._config?.entity,
        });
        chipsSchema.push({
          name: $b491b0e080b6102f$var$chipUnitFieldName(index),
          selector: {
            text: {},
          },
          optional: true,
        });
        chipsSchema.push({
          name: $b491b0e080b6102f$var$chipDivisorFieldName(index),
          selector: {
            text: {},
          },
          optional: true,
        });
      }
      chipsSchema.push({
        name: $b491b0e080b6102f$var$chipIconFieldName(index),
        selector: {
          icon: {},
        },
        optional: true,
      });
      chipsSchema.push({
        name: $b491b0e080b6102f$var$chipActionFieldName(index),
        selector: {
          ui_action: {},
        },
        optional: true,
      });
    });
    return {
      general: generalSchema,
      header: headerSchema,
      nowcast: nowcastSchema,
      chips: chipsSchema,
      hourly: hourlySchema,
      daily: dailySchema,
    };
  }
  _isSectionEnabled(name, config) {
    const value = config[name];
    return value !== false;
  }
  _normalizeHeaderChips(config) {
    const limit = $b491b0e080b6102f$var$HEADER_CHIP_INDEXES.length;
    const normalized = [];
    if (Array.isArray(config.header_chips))
      for (const chip of config.header_chips) {
        if (normalized.length >= limit || !chip || typeof chip !== 'object') continue;
        if (chip.type === 'attribute') {
          const attribute = typeof chip.attribute === 'string' ? chip.attribute.trim() : '';
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          const unit = typeof chip.unit === 'string' ? chip.unit.trim() : undefined;
          const divisor = chip.divisor;
          normalized.push({
            type: 'attribute',
            attribute: attribute,
            tap_action: tap_action,
            icon: icon,
            unit: unit,
            divisor: divisor,
          });
          continue;
        }
        if (chip.type === 'entity') {
          const entity = typeof chip.entity === 'string' ? chip.entity.trim() : '';
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          normalized.push({
            type: 'entity',
            entity: entity,
            tap_action: tap_action,
            icon: icon,
          });
        }
      }
    if (normalized.length) return normalized.slice(0, limit);
    const attributeEntries = Array.isArray(config.header_attributes)
      ? config.header_attributes
          .filter((attr, index) => index < limit && typeof attr === 'string')
          .map((attr) => attr.trim())
          .filter((attr) => attr.length > 0)
      : [];
    return attributeEntries.map((attribute) => ({
      type: 'attribute',
      attribute: attribute,
    }));
  }
  _buildChipTypeState(chips) {
    const types = {
      0: 'attribute',
      1: 'attribute',
      2: 'attribute',
    };
    chips.slice(0, $b491b0e080b6102f$var$HEADER_CHIP_INDEXES.length).forEach((chip, index) => {
      if (chip.type === 'entity') types[index] = 'entity';
    });
    return types;
  }
  _updateConfig(changes) {
    if (!this._config) return;
    const updated = {
      ...this._config,
      ...changes,
      type: 'custom:detailed-weather-forecast-card',
    };
    if ('solar_forecast_entries' in changes && changes.solar_forecast_entries === undefined)
      delete updated.solar_forecast_entries;
    const normalizedChips = this._normalizeHeaderChips(updated);
    updated.header_chips = normalizedChips;
    updated.header_attributes = normalizedChips
      .filter((chip) => chip.type === 'attribute')
      .map((chip) => chip.attribute)
      .filter((attribute) => typeof attribute === 'string' && attribute.trim().length > 0);
    this._config = updated;
    $b491b0e080b6102f$var$fireEvent(this, 'config-changed', {
      config: updated,
    });
  }
  _refreshForecastOptions() {
    try {
      if (!this.hass || !this._config?.entity) {
        this._teardownForecastOptionSubscriptions();
        if (this._hourlyExtraOptions.length || this._dailyExtraOptions.length) {
          this._hourlyExtraOptions = [];
          this._dailyExtraOptions = [];
        }
        this._forecastOptionsLoading = {
          hourly: false,
          daily: false,
          twice_daily: false,
        };
        this._forecastOptionsEntity = undefined;
        return;
      }
      const entityId = this._config.entity;
      if (this._forecastOptionsEntity !== entityId) {
        this._teardownForecastOptionSubscriptions();
        const cached = $b491b0e080b6102f$var$FORECAST_OPTIONS_CACHE.get(entityId);
        if (cached) {
          this._hourlyExtraOptions = cached.hourly;
          this._dailyExtraOptions = cached.daily;
          this._forecastOptionsLoading = {
            hourly: false,
            daily: false,
            twice_daily: false,
          };
        } else
          this._forecastOptionsLoading = {
            hourly: false,
            daily: false,
            twice_daily: false,
          };
        this._forecastOptionsEntity = entityId;
      }
      const stateObj = this.hass.states[entityId];
      const supported = this._getSupportedForecastTypes(stateObj);
      const needed = new Set();
      if (supported.includes('hourly')) needed.add('hourly');
      if (supported.includes('daily') || supported.includes('twice_daily')) needed.add('daily');
      if (!needed.size) needed.add('daily');
      ['hourly', 'daily'].forEach((type) => {
        if (!needed.has(type)) {
          this._teardownForecastOptionSubscriptions([type]);
          this._forecastOptionsLoading = {
            ...this._forecastOptionsLoading,
            [type]: false,
          };
        } else if (!this._forecastOptionSubscriptions[type])
          try {
            this._forecastOptionSubscriptions[type] = this._subscribeForecast(entityId, type, (event) =>
              this._handleForecastOptionsEvent(type, event),
            );
            const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
            if (!hasOptions)
              this._forecastOptionsLoading = {
                ...this._forecastOptionsLoading,
                [type]: true,
              };
          } catch (_err) {
            // ignore subscription errors to avoid breaking the editor
          }
        else {
          const hasOptions = type === 'hourly' ? this._hourlyExtraOptions.length : this._dailyExtraOptions.length;
          this._forecastOptionsLoading = {
            ...this._forecastOptionsLoading,
            [type]: !hasOptions,
          };
        }
      });
    } catch (_err) {
      // Fall back to attribute-based detection to keep the editor alive
      try {
        if (this.hass && this._config?.entity)
          this._applyForecastOptionsFromAttributes(this.hass.states[this._config.entity]);
      } catch (_e) {
        // ignore
      }
    }
  }
  _handleForecastOptionsEvent(type, event) {
    const entries = Array.isArray(event?.forecast) ? event.forecast : [];
    if (!entries.length) return;
    const keys = new Set();
    entries.forEach((entry) => {
      if (entry && typeof entry === 'object')
        Object.keys(entry).forEach((key) => {
          keys.add(key);
        });
    });
    const next = Array.from(keys).sort((a, b) => a.localeCompare(b));
    if (type === 'hourly') {
      if (next.join('|') !== this._hourlyExtraOptions.join('|')) this._hourlyExtraOptions = next;
      this._forecastOptionsLoading = {
        ...this._forecastOptionsLoading,
        hourly: false,
      };
    } else {
      if (next.join('|') !== this._dailyExtraOptions.join('|')) this._dailyExtraOptions = next;
      this._forecastOptionsLoading = {
        ...this._forecastOptionsLoading,
        daily: false,
      };
    }
    this._cacheForecastOptions();
  }
  _applyForecastOptionsFromAttributes(stateObj) {
    if (!stateObj?.attributes?.forecast) return;
    const entries = Array.isArray(stateObj.attributes.forecast) ? stateObj.attributes.forecast : [];
    if (!entries.length) return;
    const disallowed = new Set(['datetime', 'condition', 'precipitation', 'temperature', 'templow']);
    const keys = new Set();
    entries.forEach((entry) => {
      if (entry && typeof entry === 'object')
        Object.keys(entry).forEach((key) => {
          if (!disallowed.has(key)) keys.add(key);
        });
    });
    const options = Array.from(keys).sort((a, b) => a.localeCompare(b));
    if (options.join('|') !== this._hourlyExtraOptions.join('|')) this._hourlyExtraOptions = options;
    if (options.join('|') !== this._dailyExtraOptions.join('|')) this._dailyExtraOptions = options;
    this._forecastOptionsLoading = {
      ...this._forecastOptionsLoading,
      hourly: false,
      daily: false,
    };
    this._cacheForecastOptions();
  }
  _cacheForecastOptions() {
    if (!this._forecastOptionsEntity) return;
    if (!this._hourlyExtraOptions.length && !this._dailyExtraOptions.length) return;
    $b491b0e080b6102f$var$FORECAST_OPTIONS_CACHE.set(this._forecastOptionsEntity, {
      hourly: [...this._hourlyExtraOptions],
      daily: [...this._dailyExtraOptions],
    });
  }
  _getSupportedForecastTypes(stateObj) {
    if (!stateObj?.attributes) return [];
    const supported = [];
    const features = stateObj.attributes.supported_features ?? 0;
    if ((features & $b491b0e080b6102f$var$WeatherEntityFeature.FORECAST_DAILY) !== 0) supported.push('daily');
    if ((features & $b491b0e080b6102f$var$WeatherEntityFeature.FORECAST_TWICE_DAILY) !== 0)
      supported.push('twice_daily');
    if ((features & $b491b0e080b6102f$var$WeatherEntityFeature.FORECAST_HOURLY) !== 0) supported.push('hourly');
    return supported;
  }
  _subscribeForecast(entityId, forecastType, callback) {
    if (!this.hass?.connection) {
      this._applyForecastOptionsFromAttributes(this.hass.states[entityId]);
      return undefined;
    }
    return this.hass.connection
      .subscribeMessage(callback, {
        type: 'weather/subscribe_forecast',
        forecast_type: forecastType,
        entity_id: entityId,
      })
      .catch(() => undefined);
  }
  _teardownForecastOptionSubscriptions(types) {
    const targets = types ?? ['hourly', 'daily'];
    targets.forEach((type) => {
      const sub = this._forecastOptionSubscriptions[type];
      sub?.then((unsub) => unsub?.()).catch(() => undefined);
      delete this._forecastOptionSubscriptions[type];
      this._forecastOptionsLoading = {
        ...this._forecastOptionsLoading,
        [type]: false,
      };
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardownForecastOptionSubscriptions();
  }
  constructor(...args) {
    super(...args),
      (this._chipTypes = {
        0: 'attribute',
        1: 'attribute',
        2: 'attribute',
      }),
      (this._hourlyExtraOptions = []),
      (this._dailyExtraOptions = []),
      (this._forecastOptionsLoading = {
        hourly: false,
        daily: false,
        twice_daily: false,
      }),
      (this._solarForecastOptions = []),
      (this._solarForecastEntryIds = []),
      (this._expandedSections = {}),
      (this._forecastOptionSubscriptions = {}),
      (this._solarForecastOptionsLoaded = false),
      (this._computeLabel = (schema) => {
        if (!this.hass) return schema.name;
        const haTranslation = this.hass.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
        if (haTranslation) return haTranslation;
        if (typeof schema.name === 'string' && schema.name.startsWith('header_chip_')) {
          const parts = schema.name.split('_');
          const indexStr = parts[2];
          const index = Number(indexStr);
          const labelIndex = Number.isFinite(index) && index > 0 ? index : 1;
          let key = 'label';
          if (schema.name.endsWith('_type')) key = 'type';
          else if (schema.name.endsWith('_attribute')) key = 'attribute';
          else if (schema.name.endsWith('_icon')) key = 'icon';
          else if (schema.name.endsWith('_tap_action')) key = 'tap_action';
          else if (schema.name.endsWith('_unit')) key = 'unit';
          else if (schema.name.endsWith('_divisor')) key = 'divisor';
          return (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
            `editor.main.header_chip.${key}`,
            '{index}',
            String(labelIndex),
          );
        }
        const customKey = `editor.main.${schema.name}`;
        const localized = (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(customKey);
        if (localized !== customKey) return localized;
        return schema.name;
      });
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [
    (0, $f4e90adcbfd05ac8$export$d541bacb2bda4494)({
      attribute: false,
    }),
  ],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  'hass',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_config',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_chipTypes',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_hourlyExtraOptions',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_dailyExtraOptions',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_forecastOptionsLoading',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_solarForecastOptions',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_solarForecastEntryIds',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $b491b0e080b6102f$export$4f33cd896d7e371b.prototype,
  '_expandedSections',
  void 0,
);
$b491b0e080b6102f$export$4f33cd896d7e371b = (0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $e7518269073182cc$export$da64fc29f17f9d0e)('detailed-weather-forecast-editor')],
  $b491b0e080b6102f$export$4f33cd896d7e371b,
);

const $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT = 'missing';
const $33736e685cd4ccca$var$SOLAR_FORECAST_ATTRIBUTE = 'solar_forecast';
const $33736e685cd4ccca$var$NOWCAST_SERVICE_NAME = 'get_minute_forecast';
const $33736e685cd4ccca$var$isAttributeHeaderChip = (chip) => chip.type === 'attribute';
class $33736e685cd4ccca$export$adb56434d0008518 extends (0, $528e4332d1e3099e$export$3f2f9f5909897157) {
  // Called by HA
  setConfig(config) {
    const previousNowcastEntity = this._config?.nowcast_entity;
    const normalizedHeaderChips = this._normalizeHeaderChips(config);
    const normalizedHeaderAttributes = normalizedHeaderChips
      .filter($33736e685cd4ccca$var$isAttributeHeaderChip)
      .map((chip) => chip.attribute)
      .filter((attribute) => typeof attribute === 'string' && attribute.trim().length > 0);
    const normalizedDailyMinGap = this._normalizeMinGapValue(config.daily_min_gap);
    const normalizedHourlyMinGap = this._normalizeMinGapValue(config.hourly_min_gap);
    const normalizedHourlyDimBelow = this._normalizeOptionalNumber(config.hourly_extra_attribute_dim_below);
    const normalizedDailyDimBelow = this._normalizeOptionalNumber(config.daily_extra_attribute_dim_below);
    const normalizedHourlyColor = this._normalizeOptionalText(config.hourly_extra_attribute_color);
    const normalizedDailyColor = this._normalizeOptionalText(config.daily_extra_attribute_color);
    const normalizedIconMap = this._normalizeIconMap(config.icon_map);
    const normalizedMasonryRows = this._normalizeMasonryRows(config.masonry_rows);
    const defaults = {
      type: 'custom:detailed-weather-forecast-card',
      ...config,
      nowcast_entity: config.nowcast_entity,
      nowcast_always_show: config.nowcast_always_show ?? false,
      show_header: config.show_header ?? true,
      hourly_forecast: config.hourly_forecast ?? true,
      daily_forecast: config.daily_forecast ?? true,
      orientation: config.orientation ?? 'vertical',
      show_sun_times: config.show_sun_times ?? false,
      sun_use_home_coordinates: config.sun_use_home_coordinates ?? true,
      use_night_header_backgrounds: config.use_night_header_backgrounds ?? true,
      header_chips: normalizedHeaderChips,
      header_attributes: normalizedHeaderAttributes,
      icon_map: normalizedIconMap,
      daily_min_gap: normalizedDailyMinGap,
      hourly_min_gap: normalizedHourlyMinGap,
      hourly_extra_attribute: config.hourly_extra_attribute,
      hourly_extra_attribute_unit: config.hourly_extra_attribute_unit,
      hourly_extra_attribute_divisor: config.hourly_extra_attribute_divisor,
      hourly_extra_attribute_color: normalizedHourlyColor,
      hourly_extra_attribute_dim_below: normalizedHourlyDimBelow,
      daily_extra_attribute: config.daily_extra_attribute,
      daily_extra_attribute_unit: config.daily_extra_attribute_unit,
      daily_extra_attribute_divisor: config.daily_extra_attribute_divisor,
      daily_extra_attribute_color: normalizedDailyColor,
      daily_extra_attribute_dim_below: normalizedDailyDimBelow,
      solar_forecast_entries: Array.isArray(config.solar_forecast_entries) ? config.solar_forecast_entries : undefined,
      masonry_rows: normalizedMasonryRows,
      header_info: config.header_info ?? [],
      daily_info: config.daily_info ?? [],
      hourly_info: config.hourly_info ?? [],
    };
    this._config = defaults;
    if (previousNowcastEntity !== defaults.nowcast_entity) this._resetNowcastState();
    this._entity = defaults.entity;
    // call set hass() to immediately adjust to a changed entity
    // while editing the entity in the card editor
    if (this._hass) this.hass = this._hass;
    this._setupNowcastRefreshTimer();
  }
  set hass(hass) {
    this._hass = hass;
    (0, $f7e2ebf6156dc08b$export$7a9dbe976b949275)(hass);
    this._state = hass.states[this._entity];
    if (this._state) {
      this._status = this._state.state;
      const fn = this._state.attributes.friendly_name;
      this._name = fn ? fn : this._entity;
    }
    const headerTemperatureEntity = this._config?.header_temperature_entity;
    this._headerTemperatureState = headerTemperatureEntity ? hass.states[headerTemperatureEntity] : undefined;
    this._handleNowcastHassUpdate();
    this._setupNowcastRefreshTimer();
  }
  _normalizeHeaderChips(config) {
    const limit = 3;
    const normalized = [];
    if (Array.isArray(config.header_chips))
      for (const chip of config.header_chips) {
        if (normalized.length >= limit || !chip || typeof chip !== 'object') continue;
        if (chip.type === 'attribute') {
          const attr = typeof chip.attribute === 'string' ? chip.attribute.trim() : '';
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          const unit = typeof chip.unit === 'string' ? chip.unit.trim() : undefined;
          const divisor = chip.divisor;
          normalized.push({
            type: 'attribute',
            attribute: attr,
            tap_action: tap_action,
            icon: icon,
            unit: unit,
            divisor: divisor,
          });
          continue;
        }
        if (chip.type === 'entity') {
          const entity = typeof chip.entity === 'string' ? chip.entity.trim() : '';
          const tap_action = chip.tap_action;
          const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
          normalized.push({
            type: 'entity',
            entity: entity,
            tap_action: tap_action,
            icon: icon,
          });
        }
      }
    if (normalized.length) return normalized.slice(0, limit);
    const attributeEntries = Array.isArray(config.header_attributes)
      ? config.header_attributes
          .filter((attr, index) => index < limit && typeof attr === 'string')
          .map((attr) => attr.trim())
          .filter((attr) => attr.length > 0)
      : [];
    return attributeEntries.map((attribute) => ({
      type: 'attribute',
      attribute: attribute,
    }));
  }
  _normalizeMinGapValue(value) {
    if (value === null || typeof value === 'undefined') return undefined;
    const numericValue = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(numericValue)) return undefined;
    const clamped = Math.max(10, numericValue);
    return Math.round(clamped);
  }
  _normalizeOptionalNumber(value) {
    if (value === null || typeof value === 'undefined') return undefined;
    const numericValue = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(numericValue) ? numericValue : undefined;
  }
  _normalizeOptionalText(value) {
    if (value === null || typeof value === 'undefined') return undefined;
    const trimmed = String(value).trim();
    return trimmed.length ? trimmed : undefined;
  }
  _normalizeMasonryRows(value) {
    if (value === null || typeof value === 'undefined') return undefined;
    const numericValue = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(numericValue)) return undefined;
    if (numericValue <= 0) return undefined;
    return Math.max(1, Math.round(numericValue));
  }
  _normalizeIconMap(iconMap) {
    if (!iconMap || typeof iconMap !== 'object') return undefined;
    const normalized = {};
    Object.entries(iconMap).forEach(([key, value]) => {
      if (typeof value !== 'string') return;
      const trimmed = value.trim();
      if (trimmed.length) normalized[key] = trimmed;
    });
    return Object.keys(normalized).length ? normalized : undefined;
  }
  _shouldApplyMasonryHeight() {
    if (!this._config?.masonry_rows) return false;
    if (!this.isConnected) return true;
    const rowHeight = getComputedStyle(this).getPropertyValue('--row-height').trim();
    if (rowHeight) return false;
    return !Boolean(
      this.closest('hui-sections-view') || this.closest('hui-section-view') || this.closest('hui-section'),
    );
  }
  _getHeaderChips() {
    if (!this._config) return [];
    if (Array.isArray(this._config.header_chips) && this._config.header_chips.length)
      return this._config.header_chips.slice(0, 3);
    const attributeEntries = this._config.header_attributes ?? [];
    return attributeEntries.slice(0, 3).map((attribute) => ({
      type: 'attribute',
      attribute: attribute,
    }));
  }
  static get styles() {
    return 0, $fa281dacb802e5da$export$9dd6ff9ea0189349;
  }
  static getConfigElement() {
    return document.createElement('detailed-weather-forecast-editor');
  }
  static getStubConfig(hass) {
    const weatherEntity = Object.keys(hass?.states ?? {}).find((entityId) => entityId.startsWith('weather.'));
    return {
      type: 'custom:detailed-weather-forecast-card',
      entity: weatherEntity ?? 'weather.home',
      header_attributes: [],
      show_header: true,
      hourly_forecast: true,
      daily_forecast: true,
      orientation: 'vertical',
      use_night_header_backgrounds: true,
    };
  }
  // Forecast subscriptions
  _needForecastSubscription() {
    return this._config.daily_forecast || this._config.hourly_forecast;
  }
  _unsubscribeForecastEvents() {
    Object.values(this._subscriptions).forEach((sub) => {
      sub?.then((unsub) => unsub());
    });
    this._subscriptions = {
      hourly: undefined,
      daily: undefined,
    };
  }
  async _subscribeForecast(type) {
    if (this._subscriptions[type]) return;
    this._subscriptions[type] = (0, $0e777479b7249a00$export$ace10bd47409a000)(
      this._hass,
      this._entity,
      type,
      (event) => {
        if (type === 'hourly') this._forecastHourlyEvent = event;
        if (type === 'daily') this._forecastDailyEvent = event;
      },
    ).catch((e) => {
      this._subscriptions[type] = undefined;
      throw e;
    });
  }
  async _subscribeForecastEvents() {
    this._unsubscribeForecastEvents();
    const shouldSubscribe =
      this.isConnected &&
      this._hass &&
      this._config &&
      this._needForecastSubscription() &&
      this._hass.config.components.includes('weather') &&
      this._state;
    if (!shouldSubscribe) return;
    const supportedForecastTypes = (0, $0e777479b7249a00$export$327ac2cf77ab3c0a)(this._state);
    ['hourly', 'daily'].forEach((type) => {
      const configKey = `${type}_forecast`;
      if (this._config[configKey] && supportedForecastTypes.includes(type)) this._subscribeForecast(type);
    });
  }
  // Lit callbacks
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && this._config && this._hass) this._subscribeForecastEvents();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeForecastEvents();
    this._clearNowcastRefreshTimer();
    if (this._resizeObserver) this._resizeObserver.disconnect();
    Object.values(this._momentumCleanup).forEach((cleanup) => cleanup?.());
    this._momentumCleanup = {};
    this._momentumElement = {};
  }
  updated(changedProps) {
    super.updated(changedProps);
    const forecastHourlyChanged = changedProps.has('_forecastHourlyEvent');
    const forecastDailyChanged = changedProps.has('_forecastDailyEvent');
    if (!this._config || !this._hass) return;
    if (changedProps.has('_config') || (!this._subscriptions.hourly && !this._subscriptions.daily))
      this._subscribeForecastEvents();
    if (changedProps.has('_config') || forecastHourlyChanged || forecastDailyChanged) this._refreshSolarForecastData();
    if (changedProps.has('_config')) this._refreshNowcastData();
    const card = this.shadowRoot.querySelector('ha-card');
    const daily = this.shadowRoot.querySelector('.forecast.daily');
    const hourly = this.shadowRoot.querySelector('.forecast.hourly');
    if (daily) this._initDragScroll('daily', daily);
    else this._teardownDragScroll('daily');
    if (hourly) this._initDragScroll('hourly', hourly);
    else this._teardownDragScroll('hourly');
    if (!this._resizeObserver) {
      if (!card || (!daily && !hourly)) return;
      this._resizeObserver = new ResizeObserver(() => {
        this._updateGap();
      });
      this._resizeObserver.observe(card);
      // Call once for the initial size
      this._updateGap();
      // Hourly translation heights are handled inside dwf-hourly-list
    }
  }
  // Render methods
  render() {
    if (!this._config || !this._hass) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
    if (!this._state)
      return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)` <hui-warning> ${this._name} not found. </hui-warning> `;
    if (this._status === 'unavailable')
      return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
        <ha-card class="unavailable">
          <p>${this._name} is unavailable.</p>
        </ha-card>
      `;
    const dailyEnabled = this._config.daily_forecast !== false;
    const hourlyEnabled = this._config.hourly_forecast !== false;
    const showHeader = this._config.show_header !== false;
    const showForecasts = dailyEnabled || hourlyEnabled;
    const showForecastDivider = dailyEnabled && hourlyEnabled;
    const dailyForecastRaw = this._forecastDailyEvent?.forecast ?? [];
    const hourlyForecastRaw = this._forecastHourlyEvent?.forecast ?? [];
    const dailyForecast = this._applySolarForecastToForecast(dailyForecastRaw, 'daily');
    const hourlyForecast = this._applySolarForecastToForecast(hourlyForecastRaw, 'hourly');
    const sunCoordinates = this._getLocationCoordinates();
    const showSunTimes = Boolean(this._config.show_sun_times && sunCoordinates && hourlyEnabled);
    const orientation = this._config.orientation ?? 'vertical';
    const temperatureTapAction = this._config.header_tap_action_temperature;
    const temperatureActionEntity = this._config.header_temperature_entity || this._entity;
    const hasTemperatureTapAction = (0, $27baed8aea9cf78c$export$e217e69099d082f5)(temperatureTapAction);
    const hasConditionTapAction = this._config.header_info.length > 0;
    const headerTemperature = this._computeHeaderTemperature();
    let headerCondition = undefined;
    if (this._state.attributes['pictocode'] !== undefined)
      headerCondition = (0, $f7e2ebf6156dc08b$export$b3bd0bc58e36cd63)(
        `card.pictocode_hour.${this._state.attributes['pictocode']}`,
      );
    else headerCondition = this._hass?.formatEntityState?.(this._state) || this._state.state;
    const headerOnly = showHeader && !showForecasts;
    const nowcastEnabled = this._isNowcastEnabled();
    const showInlineNowcast =
      nowcastEnabled && (this._config.nowcast_always_show || this._nowcastHasRain || headerOnly);
    const headerClassMap = {
      weather: true,
      'header-only': headerOnly,
      'nowcast-inline': showInlineNowcast,
    };
    const hasContent = showHeader || dailyEnabled || hourlyEnabled;
    const dailyStyle = (() => {
      const styles = {};
      if (this._dailyGap !== undefined) styles['--dynamic-gap'] = `${this._dailyGap}px`;
      if (this._config?.daily_min_gap !== undefined) styles['--min-gap'] = `${this._config.daily_min_gap}px`;
      return Object.keys(styles).length
        ? (0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)(styles)
        : (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    })();
    const hourlyStyle = (() => {
      const styles = {};
      if (this._hourlyGap !== undefined) styles['--dynamic-gap'] = `${this._hourlyGap}px`;
      if (this._config?.hourly_min_gap !== undefined) styles['--min-gap'] = `${this._config.hourly_min_gap}px`;
      return Object.keys(styles).length
        ? (0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)(styles)
        : (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    })();
    const cardStyle = (() => {
      if (!this._shouldApplyMasonryHeight()) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
      const rowCount = this._config?.masonry_rows ?? 0;
      if (!Number.isFinite(rowCount) || rowCount <= 0) return 0, $d33ef1320595a3ac$export$45b790e32b2810ee;
      return (0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
        'min-height': `${rowCount * 50}px`,
      });
    })();
    if (!hasContent) {
      const cardLabel = this._name || this._entity;
      return (0,
      $d33ef1320595a3ac$export$c0bb0b647f701bb5)` <hui-warning> ${cardLabel} has no sections enabled. </hui-warning> `;
    }
    const headerChips = this._computeHeaderChipDisplays();
    const useSnowNowcastFill = this._shouldUseSnowNowcastFill();
    const headerStyles = {
      'background-image': `url(${this._getWeatherBgImage(this._state.state)})`,
    };
    if (showInlineNowcast && !headerOnly) headerStyles['--dwf-header-height'] = 'calc(4 * var(--row-height, 56px))';
    const headerChipsTemplate = headerChips.length
      ? headerChips.map((chip) => {
          const hasChipAction = (0, $27baed8aea9cf78c$export$e217e69099d082f5)(chip.action);
          const chipClassMap = {
            'attribute-chip': true,
            missing: chip.missing,
            'has-action': hasChipAction,
          };
          const chipTitle = chip.tooltip || `${chip.label}: ${chip.display}`;
          return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
            <div
              class=${(0, $da98d0425d3716de$export$56cc687933817664)(chipClassMap)}
              title=${chipTitle}
              role=${hasChipAction ? 'button' : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)}
              tabindex=${hasChipAction ? 0 : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)}
              @click=${
                hasChipAction
                  ? () => this._handleHeaderChipTap(chip.action, chip.type === 'entity' ? chip.entity : undefined)
                  : undefined
              }
              @keydown=${
                hasChipAction
                  ? (ev) =>
                      this._handleHeaderChipKeydown(ev, chip.action, chip.type === 'entity' ? chip.entity : undefined)
                  : undefined
              }
            >
              ${
                chip.icon
                  ? (0,
                    $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<ha-icon class="chip-icon" .icon=${chip.icon}></ha-icon>`
                  : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
              }
              <span class="header-pill-text">${chip.display}</span>
            </div>
          `;
        })
      : (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    const headerAttributesTemplate = headerChips.length
      ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)` <div class="header-attributes">${headerChipsTemplate}</div> `
      : (0, $d33ef1320595a3ac$export$45b790e32b2810ee);
    const headerMainTemplate = (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class="header-main">
        <div
          class=${(0, $da98d0425d3716de$export$56cc687933817664)({
            temp: true,
            'has-action': hasTemperatureTapAction,
          })}
          role=${hasTemperatureTapAction ? 'button' : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)}
          tabindex=${hasTemperatureTapAction ? 0 : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)}
          @click=${
            hasTemperatureTapAction
              ? () => this._handleHeaderTap(temperatureTapAction, temperatureActionEntity)
              : undefined
          }
          @keydown=${
            hasTemperatureTapAction
              ? (ev) => this._handleHeaderKeydown(ev, temperatureTapAction, temperatureActionEntity)
              : undefined
          }
        >
          <span class="header-pill-text">${headerTemperature}</span>
        </div>
        <div
          class=${(0, $da98d0425d3716de$export$56cc687933817664)({
            condition: true,
            'has-action': hasConditionTapAction,
          })}
          role=${hasConditionTapAction ? 'button' : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)}
          tabindex=${hasConditionTapAction ? 0 : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)}
          @click=${hasConditionTapAction ? () => this._handleConditionTap() : undefined}
          @keydown=${hasConditionTapAction ? (ev) => this._handleConditionKeydown(ev) : undefined}
        >
          <span class="header-pill-text"> ${headerCondition} </span>
        </div>
      </div>
    `;
    const headerLayoutTemplate = (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div class="header-layout">${headerAttributesTemplate} ${headerMainTemplate}</div>
    `;
    const nowcastPanelTemplate = (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <div
        class="nowcast-panel"
        style=${
          useSnowNowcastFill
            ? (0, $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)({
                '--dwf-nowcast-fill-color': 'rgba(255, 255, 255, 0.9)',
              })
            : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
        }
      >
        <dwf-nowcast .forecast=${this._nowcastForecast}></dwf-nowcast>
      </div>
    `;
    return (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
      <ha-card style=${cardStyle}>
        ${
          showHeader
            ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
              <div class=${(0, $da98d0425d3716de$export$56cc687933817664)(headerClassMap)} style=${(0,
              $814a01f0ca5c43f6$export$1e5b4ce2fa884e6a)(headerStyles)}>
                <div class="header-content">
                  ${(0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)` ${headerLayoutTemplate} ${
                    showInlineNowcast ? nowcastPanelTemplate : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
                  } `}
                </div>
              </div>
            `
            : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
        }
        ${
          showHeader && showForecasts
            ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="divider card-divider"></div>`
            : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
        }
        ${
          this._config.header_info.length > 0 && this._showAttributes
            ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<dwf-current-weather-attributes
                .hass=${this._hass}
                .weatherEntity=${this._state}
                .attributeConfigs=${this._config.header_info}
              ></dwf-current-weather-attributes>
              <div class="divider card-divider"></div>`
            : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
        }
        ${
          showForecasts
            ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
              <div class="forecast-container">
                ${
                  dailyEnabled
                    ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                      <div class="forecast-daily-container">
                        <div class="fade-left"></div>
                        <div class="fade-right"></div>
                        <div class="forecast daily" style=${dailyStyle}>
                          <dwf-daily-list
                            .hass=${this._hass}
                            .weatherEntity=${this._state}
                            .forecast=${dailyForecast}
                            .precipitationUnit=${this._state.attributes.precipitation_unit}
                            .extraAttribute=${this._config.daily_extra_attribute}
                            .extraAttributeUnit=${this._config.daily_extra_attribute_unit}
                            .extraAttributeDivisor=${this._config.daily_extra_attribute_divisor}
                            .extraAttributeColor=${this._config.daily_extra_attribute_color}
                            .extraAttributeDimBelow=${this._config.daily_extra_attribute_dim_below}
                            .iconMap=${this._config.icon_map}
                            @dwf-daily-list-item-selected=${this._handleDailySelected}
                            @dwf-daily-list-item-show-attributes=${this._handleDailyShowAttributes}
                          ></dwf-daily-list>
                        </div>
                      </div>
                    `
                    : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
                }
                ${
                  this._selectedDailyForecast && this._config.daily_info.length > 0
                    ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="divider card-divider"></div>
                      <dwf-forecast-attributes
                        .hass=${this._hass}
                        .weatherEntity=${this._state}
                        .forecastAttribute=${this._selectedDailyForecast}
                        .attributeConfigs=${this._config.daily_info}
                        .dailyForecast=${true}
                      ></dwf-forecast-attributes>`
                    : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
                }
                ${
                  showForecastDivider
                    ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="divider forecast-divider"></div>`
                    : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
                }
                ${
                  hourlyEnabled
                    ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`
                      <div class="forecast-hourly-container">
                        <div class="fade-left"></div>
                        <div class="fade-right"></div>
                        <div class="forecast hourly" style=${hourlyStyle}>
                          <dwf-hourly-list
                            .hass=${this._hass}
                            .weatherEntity=${this._state}
                            .forecast=${hourlyForecast}
                            .showSunTimes=${showSunTimes}
                            .sunCoordinates=${sunCoordinates}
                            .precipitationUnit=${this._state.attributes.precipitation_unit}
                            .extraAttribute=${this._config.hourly_extra_attribute}
                            .extraAttributeUnit=${this._config.hourly_extra_attribute_unit}
                            .extraAttributeDivisor=${this._config.hourly_extra_attribute_divisor}
                            .extraAttributeColor=${this._config.hourly_extra_attribute_color}
                            .extraAttributeDimBelow=${this._config.hourly_extra_attribute_dim_below}
                            .iconMap=${this._config.icon_map}
                            @dwf-hourly-scrolled-to-new-day=${this._handleHourlyNewDay}
                            @dwf-hourly-list-item-selected=${this._handleHourlySelected}
                          ></dwf-hourly-list>
                        </div>
                      </div>
                    `
                    : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
                }
              </div>
            `
            : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
        }
        ${
          this._selectedHourlyForecast && this._config.hourly_info.length > 0
            ? (0, $d33ef1320595a3ac$export$c0bb0b647f701bb5)`<div class="divider card-divider"></div>
              <dwf-forecast-attributes
                .hass=${this._hass}
                .weatherEntity=${this._state}
                .forecastAttribute=${this._selectedHourlyForecast}
                .attributeConfigs=${this._config.hourly_info}
              ></dwf-forecast-attributes>`
            : (0, $d33ef1320595a3ac$export$45b790e32b2810ee)
        }
      </ha-card>
    `;
  }
  // Private methods
  _handleHourlyNewDay(e) {
    if (this._isProgrammaticScroll) return;
    const date = e.detail.date;
    const dailyList = this.shadowRoot?.querySelector('dwf-daily-list');
    if (dailyList) dailyList.selectDate(date);
  }
  // Header temperature from configured sensor or weather entity attribute
  _computeHeaderTemperature() {
    if (!this._hass || !this._state) return '';
    const sensorState = this._headerTemperatureState;
    if (sensorState && !this._isStateUnavailable(sensorState.state)) {
      const formattedSensor = this._hass?.formatEntityState?.(sensorState);
      if (formattedSensor && typeof formattedSensor === 'string') return formattedSensor;
      return sensorState.state;
    }
    const formattedWeather = this._hass?.formatEntityAttributeValue?.(this._state, 'temperature');
    if (formattedWeather && typeof formattedWeather === 'string') return formattedWeather;
    return this._state.state || '';
  }
  _isStateUnavailable(state) {
    if (!state) return true;
    const normalized = state.toLowerCase();
    return normalized === 'unavailable' || normalized === 'unknown';
  }
  // Header chips (attribute / entity)
  _computeHeaderChipDisplays() {
    if (!this._config) return [];
    const chips = this._getHeaderChips();
    if (!chips.length) return [];
    const displays = [];
    chips.forEach((chip, index) => {
      const action = (0, $27baed8aea9cf78c$export$e217e69099d082f5)(chip.tap_action) ? chip.tap_action : undefined;
      const icon = typeof chip.icon === 'string' ? chip.icon.trim() : undefined;
      if (chip.type === 'entity') {
        const entity = chip.entity?.trim() ?? '';
        if (!entity) return;
        const formatted = this._formatHeaderEntity(entity);
        const tooltip = `${entity}: ${formatted.display}`;
        const label = entity;
        const entityIcon = icon || formatted.icon;
        displays.push({
          label: label,
          display: formatted.display,
          missing: formatted.missing,
          tooltip: tooltip,
          type: chip.type,
          action: action,
          icon: entityIcon,
          entity: entity,
        });
        return;
      }
      const attribute = chip.attribute?.trim() ?? '';
      if (!attribute) return;
      const formatted = this._formatHeaderAttribute(attribute, chip.unit, chip.divisor);
      const label = attribute;
      const tooltip = `${attribute}: ${formatted.display}`;
      const attrIcon = icon || (0, $0e777479b7249a00$export$6f2fd9da44cdd139)[attribute];
      displays.push({
        label: label,
        display: formatted.display,
        missing: formatted.missing,
        tooltip: tooltip,
        type: chip.type,
        action: action,
        icon: attrIcon,
      });
    });
    return displays;
  }
  _formatHeaderEntity(entity) {
    if (!this._state || !this._hass)
      return {
        entity: entity,
        display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
        missing: true,
        icon: undefined,
      };
    const stateObj = this._hass.states[entity];
    if (!stateObj)
      return {
        entity: entity,
        display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
        missing: true,
        icon: undefined,
      };
    const display = this._hass?.formatEntityState?.(stateObj);
    if (display === undefined)
      return {
        entity: entity,
        display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
        missing: true,
        icon: undefined,
      };
    return {
      entity: stateObj.attributes.friendly_name || entity,
      display: display,
      missing: false,
      icon: stateObj.attributes.icon,
    };
  }
  // Format a single header attribute
  _formatHeaderAttribute(attribute, unit, divisor) {
    if (!this._state || !this._hass)
      return {
        attribute: attribute,
        display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
        missing: true,
      };
    // Check if attribute exists on the entity
    const hasAttribute = Object.prototype.hasOwnProperty.call(this._state.attributes, attribute);
    if (!hasAttribute)
      return {
        attribute: attribute,
        display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
        missing: true,
      };
    const rawValue = this._state.attributes[attribute];
    if (rawValue === undefined || rawValue === null)
      return {
        attribute: attribute,
        display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
        missing: true,
      };
    let display;
    if (typeof rawValue === 'number') {
      if (divisor && typeof divisor === 'number') {
        const hour_value = rawValue / divisor;
        display = hour_value.toLocaleString(this.hass?.locale?.language, {
          maximumFractionDigits: 0,
        });
      } else
        display = rawValue.toLocaleString(this.hass?.locale?.language, {
          maximumFractionDigits: 1,
        });
    } else if (typeof rawValue === 'string') {
      const trimmed = rawValue.trim();
      if (!trimmed.length)
        return {
          attribute: attribute,
          display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
          missing: true,
        };
      display = trimmed;
    } else
      try {
        display = JSON.stringify(rawValue);
      } catch (_err) {
        return {
          attribute: attribute,
          display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
          missing: true,
        };
      }
    // Try to format the attribute value using Home Assistant's built-in formatter
    const formattedValue = this._hass?.formatEntityAttributeValue?.(this._state, attribute, display);
    const resolvedValue =
      formattedValue !== undefined && formattedValue !== null && formattedValue !== '' ? formattedValue : display;
    if (resolvedValue === undefined || resolvedValue === null)
      return {
        attribute: attribute,
        display: $33736e685cd4ccca$var$MISSING_ATTRIBUTE_TEXT,
        missing: true,
      };
    return {
      attribute: attribute,
      display: resolvedValue + (unit ? ` ${unit}` : ''),
      missing: false,
    };
  }
  _needsSolarForecast() {
    if (!this._config) return false;
    return (
      this._config.hourly_extra_attribute === $33736e685cd4ccca$var$SOLAR_FORECAST_ATTRIBUTE ||
      this._config.daily_extra_attribute === $33736e685cd4ccca$var$SOLAR_FORECAST_ATTRIBUTE ||
      this._config.hourly_info.some((info) => info.attribute === $33736e685cd4ccca$var$SOLAR_FORECAST_ATTRIBUTE) ||
      this._config.daily_info.some((info) => info.attribute === $33736e685cd4ccca$var$SOLAR_FORECAST_ATTRIBUTE)
    );
  }
  _refreshSolarForecastData() {
    if (!this._needsSolarForecast()) {
      if (Object.keys(this._solarForecastByHour).length || Object.keys(this._solarForecastByDay).length) {
        this._solarForecastByHour = {};
        this._solarForecastByDay = {};
      }
      return;
    }
    if (!this._hass?.callWS) return;
    const requestId = ++this._solarForecastRequestId;
    this._loadSolarForecastData(requestId);
  }
  async _loadSolarForecastData(requestId) {
    try {
      const prefs = await this._hass.callWS({
        type: 'energy/get_prefs',
      });
      if (requestId !== this._solarForecastRequestId) return;
      const availableEntries = this._extractSolarForecastEntries(prefs);
      const selectedEntries = this._selectSolarForecastEntries(availableEntries);
      if (!selectedEntries.length) {
        this._solarForecastByHour = {};
        this._solarForecastByDay = {};
        return;
      }
      const forecasts = await this._hass.callWS({
        type: 'energy/solar_forecast',
      });
      if (requestId !== this._solarForecastRequestId) return;
      const { hourly: hourly, daily: daily } = this._buildSolarForecastMaps(forecasts, selectedEntries);
      this._solarForecastByHour = hourly;
      this._solarForecastByDay = daily;
    } catch (_err) {
      this._solarForecastByHour = {};
      this._solarForecastByDay = {};
    }
  }
  _extractSolarForecastEntries(prefs) {
    const energySources = prefs?.energy_sources ?? [];
    const entries = new Set();
    energySources.forEach((source) => {
      if (source?.type !== 'solar') return;
      const configured = source.config_entry_solar_forecast;
      if (!Array.isArray(configured)) return;
      configured.forEach((entryId) => {
        if (typeof entryId === 'string' && entryId.trim().length) entries.add(entryId);
      });
    });
    return Array.from(entries);
  }
  _selectSolarForecastEntries(availableEntries) {
    if (!this._config) return [];
    if (this._config.solar_forecast_entries) {
      if (!this._config.solar_forecast_entries.length) return [];
      const selected = new Set(this._config.solar_forecast_entries);
      return availableEntries.filter((entryId) => selected.has(entryId));
    }
    return availableEntries;
  }
  _buildSolarForecastMaps(forecasts, selectedEntries) {
    const hourly = {};
    const daily = {};
    selectedEntries.forEach((entryId) => {
      const data = forecasts?.[entryId];
      const whHours = data?.wh_hours ?? {};
      Object.entries(whHours).forEach(([timestamp, rawValue]) => {
        const valueWh = typeof rawValue === 'number' ? rawValue : Number(rawValue);
        if (!Number.isFinite(valueWh)) return;
        const date = new Date(timestamp);
        if (!Number.isFinite(date.getTime())) return;
        const valueKwh = valueWh / 1000;
        const hourKey = this._formatSolarHourKey(date);
        const dayKey = this._formatSolarDayKey(date);
        hourly[hourKey] = (hourly[hourKey] ?? 0) + valueKwh;
        daily[dayKey] = (daily[dayKey] ?? 0) + valueKwh;
      });
    });
    return {
      hourly: hourly,
      daily: daily,
    };
  }
  _applySolarForecastToForecast(forecast, type) {
    const source = type === 'hourly' ? this._solarForecastByHour : this._solarForecastByDay;
    if (!forecast?.length || !Object.keys(source).length) return forecast;
    return forecast.map((item) => {
      if (!item?.datetime) return item;
      const date = new Date(item.datetime);
      if (!Number.isFinite(date.getTime())) return item;
      const key = type === 'hourly' ? this._formatSolarHourKey(date) : this._formatSolarDayKey(date);
      const value = source[key];
      if (value === undefined) return item;
      return {
        ...item,
        solar_forecast: value,
      };
    });
  }
  _resetNowcastState() {
    this._nowcastRequestId += 1;
    this._nowcastEntityId = undefined;
    this._nowcastServiceDomain = undefined;
    this._nowcastLastUpdated = undefined;
    this._nowcastForecast = [];
    this._nowcastHasRain = false;
    this._clearNowcastRefreshTimer();
  }
  _clearNowcastForecast() {
    if (this._nowcastForecast.length || this._nowcastHasRain) {
      this._nowcastForecast = [];
      this._nowcastHasRain = false;
    }
  }
  _refreshNowcastData() {
    if (!this._isNowcastEnabled() || !this._hass?.callWS) {
      this._clearNowcastForecast();
      return;
    }
    const entityId = this._config?.nowcast_entity;
    if (!entityId) {
      this._clearNowcastForecast();
      return;
    }
    const requestId = ++this._nowcastRequestId;
    this._loadNowcastData(requestId, entityId);
  }
  async _loadNowcastData(requestId, entityId) {
    try {
      const serviceDomain = await this._resolveNowcastServiceDomain(entityId, requestId);
      if (!serviceDomain || requestId !== this._nowcastRequestId) {
        this._clearNowcastForecast();
        return;
      }
      const response = await this._hass.callWS({
        type: 'call_service',
        domain: serviceDomain,
        service: $33736e685cd4ccca$var$NOWCAST_SERVICE_NAME,
        target: {
          entity_id: entityId,
        },
        return_response: true,
      });
      if (requestId !== this._nowcastRequestId) return;
      const forecast = this._extractNowcastForecast(response, entityId);
      this._setNowcastForecast(forecast);
    } catch (_err) {
      this._clearNowcastForecast();
    }
  }
  async _resolveNowcastServiceDomain(entityId, requestId) {
    if (this._nowcastEntityId === entityId && this._nowcastServiceDomain) return this._nowcastServiceDomain;
    try {
      const entry = await this._hass.callWS({
        type: 'config/entity_registry/get',
        entity_id: entityId,
      });
      if (requestId !== this._nowcastRequestId) return undefined;
      const platform = entry?.platform;
      this._nowcastEntityId = entityId;
      this._nowcastServiceDomain = typeof platform === 'string' && platform.trim().length ? platform : undefined;
      return this._nowcastServiceDomain;
    } catch (_err) {
      this._nowcastEntityId = entityId;
      this._nowcastServiceDomain = undefined;
      return undefined;
    }
  }
  _extractNowcastForecast(response, entityId) {
    const items = [];
    const entries = response?.response?.[entityId]?.forecast;
    if (!Array.isArray(entries)) return items;
    entries.forEach((entry) => {
      const datetime = typeof entry?.datetime === 'string' ? entry.datetime : undefined;
      if (!datetime) return;
      const timestamp = new Date(datetime).getTime();
      if (!Number.isFinite(timestamp)) return;
      const rawValue = entry?.precipitation;
      const precipitation = typeof rawValue === 'number' ? rawValue : Number(rawValue);
      if (!Number.isFinite(precipitation)) return;
      items.push({
        datetime: datetime,
        precipitation: Math.max(0, precipitation),
      });
    });
    return items.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
  }
  _setNowcastForecast(forecast) {
    const hasRain = forecast.some((item) => item.precipitation > 0);
    const hadRain = this._nowcastHasRain;
    this._nowcastForecast = forecast;
    this._nowcastHasRain = hasRain;
  }
  _handleNowcastHassUpdate() {
    if (!this._isNowcastEnabled() || !this._hass) return;
    const entityId = this._config?.nowcast_entity;
    if (!entityId) return;
    const state = this._hass.states[entityId];
    if (!state) {
      this._clearNowcastForecast();
      return;
    }
    const lastUpdated = state.last_updated ?? state.last_changed;
    if (!lastUpdated || lastUpdated === this._nowcastLastUpdated) return;
    this._nowcastLastUpdated = lastUpdated;
    this._refreshNowcastData();
  }
  _isNowcastEnabled() {
    return Boolean(this._config?.nowcast_entity);
  }
  _setupNowcastRefreshTimer() {
    if (!this._isNowcastEnabled() || !this._hass) {
      this._clearNowcastRefreshTimer();
      return;
    }
    this._clearNowcastRefreshTimer();
    const now = Date.now();
    const nextMinuteDelay = 60000 - (now % 60000);
    this._nowcastRefreshTimeout = window.setTimeout(() => {
      this._refreshNowcastData();
      this._nowcastRefreshInterval = window.setInterval(() => {
        this._refreshNowcastData();
      }, 60000);
    }, nextMinuteDelay);
  }
  _clearNowcastRefreshTimer() {
    if (this._nowcastRefreshTimeout !== undefined) {
      window.clearTimeout(this._nowcastRefreshTimeout);
      this._nowcastRefreshTimeout = undefined;
    }
    if (this._nowcastRefreshInterval !== undefined) {
      window.clearInterval(this._nowcastRefreshInterval);
      this._nowcastRefreshInterval = undefined;
    }
  }
  _formatSolarHourKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    return `${year}-${month}-${day}T${hour}`;
  }
  _formatSolarDayKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  _getLocationCoordinates() {
    if (!this._config) {
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }
    const useHome = this._config.sun_use_home_coordinates ?? true;
    const latitude = useHome
      ? this._parseCoordinate(this._hass?.config?.latitude, -90, 90)
      : this._parseCoordinate(this._config.sun_latitude, -90, 90);
    const longitude = useHome
      ? this._parseCoordinate(this._hass?.config?.longitude, -180, 180)
      : this._parseCoordinate(this._config.sun_longitude, -180, 180);
    if (latitude === undefined || longitude === undefined) {
      this._sunCoordinateCacheKey = undefined;
      this._sunCoordinateCache = undefined;
      return undefined;
    }
    const key = `${latitude},${longitude}`;
    if (this._sunCoordinateCacheKey === key && this._sunCoordinateCache) return this._sunCoordinateCache;
    const coords = {
      latitude: latitude,
      longitude: longitude,
    };
    this._sunCoordinateCacheKey = key;
    this._sunCoordinateCache = coords;
    return coords;
  }
  _parseCoordinate(value, min, max) {
    if (value === undefined || value === null) return undefined;
    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    if (!Number.isFinite(numericValue)) return undefined;
    if (numericValue < min || numericValue > max) return undefined;
    return numericValue;
  }
  _getWeatherBgImage(state) {
    const variants = (0, $4113940370bb8e3c$export$d0bd520bd5ddb657)[state.replace(/-/g, '')];
    const useNightBackgrounds = this._config?.use_night_header_backgrounds !== false;
    const isDaytime = useNightBackgrounds ? this._isDaytimeNow() : true;
    const fallback =
      useNightBackgrounds && !isDaytime
        ? (0, $4113940370bb8e3c$export$80688e1fcf715020).night
        : (0, $4113940370bb8e3c$export$80688e1fcf715020).day;
    if (!variants) return fallback;
    if (!useNightBackgrounds) return variants.day;
    return isDaytime ? variants.day : variants.night;
  }
  _shouldUseSnowNowcastFill() {
    const condition = this._state?.state;
    return condition === 'snowy' || condition === 'snowy-rainy';
  }
  _isDaytimeNow() {
    const attributeValue = this._state?.attributes?.is_daytime;
    if (typeof attributeValue === 'boolean') return attributeValue;
    const coordinates = this._getLocationCoordinates();
    if (!coordinates) return true;
    const now = new Date();
    const times = (0, /*@__PURE__*/ $parcel$interopDefault($cc1282133b958b24$exports)).getTimes(
      now,
      coordinates.latitude,
      coordinates.longitude,
    );
    const sunrise = times.sunrise?.getTime();
    const sunset = times.sunset?.getTime();
    if (typeof sunrise !== 'number' || Number.isNaN(sunrise) || typeof sunset !== 'number' || Number.isNaN(sunset))
      return true;
    const nowTime = now.getTime();
    if (sunrise <= sunset) return nowTime >= sunrise && nowTime < sunset;
    return nowTime >= sunrise || nowTime < sunset;
  }
  _updateGap() {
    const container = this.shadowRoot.querySelector('ha-card');
    const daily = this.shadowRoot.querySelector('.forecast.daily');
    const hourly = this.shadowRoot.querySelector('.forecast.hourly');
    if (!container || (!daily && !hourly)) return;
    const containerWidth = container.clientWidth;
    if (containerWidth === this._oldContainerWidth) return;
    const computeGap = (elem) => {
      if (!elem) return undefined;
      const styles = getComputedStyle(elem);
      const itemWidth = parseInt(styles.getPropertyValue('--icon-container-width'));
      const minGap = parseInt(styles.getPropertyValue('--min-gap'));
      if (Number.isNaN(itemWidth) || Number.isNaN(minGap)) return undefined;
      const padding = 16;
      const maxItems = Math.floor((containerWidth + minGap - 2 * padding) / (itemWidth + minGap));
      if (maxItems < 2) return undefined;
      const totalItemWidth = maxItems * itemWidth;
      return Math.round((containerWidth - 2 * padding - totalItemWidth) / (maxItems - 1));
    };
    const dailyGap = computeGap(daily);
    if (dailyGap !== undefined && dailyGap !== this._dailyGap) this._dailyGap = dailyGap;
    else if (dailyGap === undefined && this._dailyGap !== undefined) this._dailyGap = undefined;
    const hourlyGap = computeGap(hourly);
    if (hourlyGap !== undefined && hourlyGap !== this._hourlyGap) this._hourlyGap = hourlyGap;
    else if (hourlyGap === undefined && this._hourlyGap !== undefined) this._hourlyGap = undefined;
    this._oldContainerWidth = containerWidth;
  }
  _teardownDragScroll(type) {
    if (this._momentumCleanup[type]) {
      this._momentumCleanup[type]();
      delete this._momentumCleanup[type];
      delete this._momentumElement[type];
    }
  }
  _initDragScroll(type, container) {
    if (this._momentumElement[type] === container) return;
    this._teardownDragScroll(type);
    this._momentumElement[type] = container;
    this._momentumCleanup[type] = (0, $047001ccb4558fd5$export$81657173a9670ea5)(container, {
      snapSelector: '.forecast-item',
    });
  }
  _handleDailySelected(ev) {
    const forecastItem = ev.detail;
    if (!forecastItem || !this._forecastHourlyEvent?.forecast?.length) return;
    const datetime = forecastItem.datetime;
    if (!datetime) return;
    const targetDate = new Date(datetime);
    const targetDay = targetDate.getDate();
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();
    const hourlyForecast = this._forecastHourlyEvent.forecast;
    const targetIndex = hourlyForecast.findIndex((entry) => {
      const entryDate = new Date(entry.datetime);
      return (
        entryDate.getDate() === targetDay &&
        entryDate.getMonth() === targetMonth &&
        entryDate.getFullYear() === targetYear
      );
    });
    const hourlyContainer = this.shadowRoot?.querySelector('.forecast.hourly');
    if (!hourlyContainer) return;
    let offset = 0;
    if (targetIndex > 0) {
      const hourlyItems = Array.from(hourlyContainer.querySelectorAll('.forecast-item'));
      const targetItem = hourlyItems[targetIndex];
      if (targetItem) {
        const containerRect = hourlyContainer.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        offset = itemRect.left - containerRect.left + hourlyContainer.scrollLeft - 16; // account for padding
      }
    }
    this._isProgrammaticScroll = true;
    hourlyContainer.scrollTo({
      left: Math.max(0, offset),
      behavior: 'smooth',
    });
    window.setTimeout(() => {
      this._isProgrammaticScroll = false;
    }, 1000);
  }
  _handleHourlySelected(e) {
    this._selectedHourlyForecast = e.detail ?? undefined;
  }
  _handleDailyShowAttributes(e) {
    this._selectedDailyForecast = e.detail ?? undefined;
  }
  _handleHeaderTap(actionConfig, entity) {
    this._executeTapAction(actionConfig, entity);
  }
  _handleHeaderKeydown(event, actionConfig, entity) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this._handleHeaderTap(actionConfig, entity);
  }
  _handleConditionTap() {
    this._showAttributes = !this._showAttributes;
  }
  _handleConditionKeydown(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this._handleConditionTap();
  }
  _handleHeaderChipTap(actionConfig, entity) {
    this._executeTapAction(actionConfig, entity);
  }
  _handleHeaderChipKeydown(event, actionConfig, entity) {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    this._handleHeaderChipTap(actionConfig, entity);
  }
  _executeTapAction(actionConfig, entityOverride) {
    if (!this._hass || !this._config || !actionConfig || !(0, $27baed8aea9cf78c$export$e217e69099d082f5)(actionConfig))
      return;
    const actionType = actionConfig.action;
    const performAction = actionConfig.perform_action;
    if (actionType === 'perform-action' && performAction) {
      const [domain, service] = performAction.split('.', 2);
      if (domain && service) {
        const data = actionConfig.data ?? actionConfig.service_data;
        const target = actionConfig.target;
        this._hass.callService(domain, service, data, target);
        return;
      }
    }
    (0, $27baed8aea9cf78c$export$6c6c3f4b7541eaf1)(
      this,
      this._hass,
      {
        entity: entityOverride || this._entity,
        tap_action: actionConfig,
      },
      'tap',
    );
  }
  constructor(...args) {
    super(...args),
      (this._solarForecastByHour = {}),
      (this._solarForecastByDay = {}),
      (this._nowcastForecast = []),
      (this._nowcastHasRain = false),
      (this._showAttributes = false), // private property
      (this._subscriptions = {
        hourly: undefined,
        daily: undefined,
      }),
      (this._momentumCleanup = {}),
      (this._momentumElement = {}),
      (this._solarForecastRequestId = 0),
      (this._nowcastRequestId = 0),
      (this._isProgrammaticScroll = false);
  }
}
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_config',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_entity',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_name',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_state',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_status',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_headerTemperatureState',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_forecastDailyEvent',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_forecastHourlyEvent',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_dailyGap',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_hourlyGap',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_solarForecastByHour',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_solarForecastByDay',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_nowcastForecast',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_nowcastHasRain',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_showAttributes',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_selectedHourlyForecast',
  void 0,
);
(0, $bb166217b384746d$export$29e00dfd3077644b)(
  [(0, $75942718c8e5e237$export$ca000e230c0caa3e)()],
  $33736e685cd4ccca$export$adb56434d0008518.prototype,
  '_selectedDailyForecast',
  void 0,
);

customElements.define('detailed-weather-forecast-card', (0, $33736e685cd4ccca$export$adb56434d0008518));
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'detailed-weather-forecast-card',
  name: 'Detailed Weather Forecast',
  description: 'Weather forecast similar to the default HA card, but with some additional information',
});
