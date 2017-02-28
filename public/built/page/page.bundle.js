webpackJsonp([1],{

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(233);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();
	
	/**
	 * Colors.
	 */
	
	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];
	
	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */
	
	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}
	
	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */
	
	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};
	
	
	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */
	
	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	
	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);
	
	  if (!useColors) return args;
	
	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
	
	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });
	
	  args.splice(lastC, 0, c);
	  return args;
	}
	
	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */
	
	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}
	
	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */
	
	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}
	
	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */
	
	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}
	  return r;
	}
	
	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */
	
	exports.enable(load());
	
	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */
	
	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },

/***/ 13:
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks[event] = this._callbacks[event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  var self = this;
	  this._callbacks = this._callbacks || {};
	
	  function on() {
	    self.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks[event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks[event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks[event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks[event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var keys = __webpack_require__(240);
	var hasBinary = __webpack_require__(39);
	var sliceBuffer = __webpack_require__(221);
	var after = __webpack_require__(208);
	var utf8 = __webpack_require__(407);
	
	var base64encoder;
	if (global && global.ArrayBuffer) {
	  base64encoder = __webpack_require__(223);
	}
	
	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */
	
	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
	
	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);
	
	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;
	
	/**
	 * Current protocol version.
	 */
	
	exports.protocol = 3;
	
	/**
	 * Packet types.
	 */
	
	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};
	
	var packetslist = keys(packets);
	
	/**
	 * Premade error packet.
	 */
	
	var err = { type: 'error', data: 'parser error' };
	
	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */
	
	var Blob = __webpack_require__(224);
	
	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */
	
	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if ('function' == typeof supportsBinary) {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }
	
	  if ('function' == typeof utf8encode) {
	    callback = utf8encode;
	    utf8encode = null;
	  }
	
	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;
	
	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }
	
	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }
	
	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];
	
	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
	  }
	
	  return callback('' + encoded);
	
	};
	
	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}
	
	/**
	 * Encode packet helpers for binary types
	 */
	
	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);
	
	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }
	
	  return callback(resultBuffer.buffer);
	}
	
	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}
	
	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }
	
	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }
	
	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);
	
	  return callback(blob);
	}
	
	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */
	
	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }
	
	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};
	
	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */
	
	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data == 'string') {
	    if (data.charAt(0) == 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }
	
	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);
	
	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }
	
	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }
	
	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};
	
	function tryDecode(data) {
	  try {
	    data = utf8.decode(data);
	  } catch (e) {
	    return false;
	  }
	  return data;
	}
	
	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */
	
	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }
	
	  var data = base64encoder.decode(msg.substr(1));
	
	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }
	
	  return { type: type, data: data };
	};
	
	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary == 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }
	
	  var isBinary = hasBinary(packets);
	
	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }
	
	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }
	
	  if (!packets.length) {
	    return callback('0:');
	  }
	
	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};
	
	/**
	 * Async array map using after
	 */
	
	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);
	
	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };
	
	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}
	
	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */
	
	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data != 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }
	
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var packet;
	  if (data == '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	  var length = ''
	    , n, msg;
	
	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);
	
	    if (':' != chr) {
	      length += chr;
	    } else {
	      if ('' == length || (length != (n = Number(length)))) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      msg = data.substr(i + 1, n);
	
	      if (length != msg.length) {
	        // parser error - ignoring payload
	        return callback(err, 0, 1);
	      }
	
	      if (msg.length) {
	        packet = exports.decodePacket(msg, binaryType, true);
	
	        if (err.type == packet.type && err.data == packet.data) {
	          // parser error in individual packet - ignoring payload
	          return callback(err, 0, 1);
	        }
	
	        var ret = callback(packet, i + n, l);
	        if (false === ret) return;
	      }
	
	      // advance cursor
	      i += n;
	      length = '';
	    }
	  }
	
	  if (length != '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	
	};
	
	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */
	
	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }
	
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }
	
	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);
	
	    var resultArray = new Uint8Array(totalLength);
	
	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }
	
	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }
	
	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;
	
	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });
	
	    return callback(resultArray.buffer);
	  });
	};
	
	/**
	 * Encode as Blob
	 */
	
	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }
	
	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;
	
	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;
	
	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }
	
	  map(packets, encodeOne, function(err, results) {
	    return callback(new Blob(results));
	  });
	};
	
	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */
	
	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }
	
	  var bufferTail = data;
	  var buffers = [];
	
	  var numberTooLong = false;
	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';
	
	    for (var i = 1; ; i++) {
	      if (tailArray[i] == 255) break;
	
	      if (msgLength.length > 310) {
	        numberTooLong = true;
	        break;
	      }
	
	      msgLength += tailArray[i];
	    }
	
	    if(numberTooLong) return callback(err, 0, 1);
	
	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);
	
	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }
	
	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }
	
	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 21:
/***/ function(module, exports) {

	
	module.exports = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(14);
	var Emitter = __webpack_require__(13);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Transport;
	
	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */
	
	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;
	
	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Transport.prototype);
	
	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */
	
	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};
	
	/**
	 * Opens the transport.
	 *
	 * @api public
	 */
	
	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }
	
	  return this;
	};
	
	/**
	 * Closes the transport.
	 *
	 * @api private
	 */
	
	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }
	
	  return this;
	};
	
	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */
	
	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};
	
	/**
	 * Called upon open
	 *
	 * @api private
	 */
	
	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};
	
	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */
	
	Transport.prototype.onData = function (data) {
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};
	
	/**
	 * Called with a decoded packet.
	 */
	
	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon close.
	 *
	 * @api private
	 */
	
	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};


/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// browser shim for xmlhttprequest module
	
	var hasCORS = __webpack_require__(244);
	
	module.exports = function (opts) {
	  var xdomain = opts.xdomain;
	
	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;
	
	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;
	
	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }
	
	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }
	
	  if (!xdomain) {
	    try {
	      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) { }
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 29:
/***/ function(module, exports) {

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */
	
	exports.encode = function (obj) {
	  var str = '';
	
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }
	
	  return str;
	};
	
	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */
	
	exports.decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};


/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var debug = __webpack_require__(8)('socket.io-parser');
	var json = __webpack_require__(289);
	var Emitter = __webpack_require__(13);
	var binary = __webpack_require__(303);
	var isBuf = __webpack_require__(154);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = 4;
	
	/**
	 * Packet types.
	 *
	 * @api public
	 */
	
	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'ACK',
	  'ERROR',
	  'BINARY_EVENT',
	  'BINARY_ACK'
	];
	
	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */
	
	exports.CONNECT = 0;
	
	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */
	
	exports.DISCONNECT = 1;
	
	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */
	
	exports.EVENT = 2;
	
	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */
	
	exports.ACK = 3;
	
	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */
	
	exports.ERROR = 4;
	
	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */
	
	exports.BINARY_EVENT = 5;
	
	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */
	
	exports.BINARY_ACK = 6;
	
	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */
	
	exports.Encoder = Encoder;
	
	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */
	
	exports.Decoder = Decoder;
	
	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */
	
	function Encoder() {}
	
	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */
	
	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);
	
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    encodeAsBinary(obj, callback);
	  }
	  else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};
	
	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */
	
	function encodeAsString(obj) {
	  var str = '';
	  var nsp = false;
	
	  // first is type
	  str += obj.type;
	
	  // attachments if we have them
	  if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
	    str += obj.attachments;
	    str += '-';
	  }
	
	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' != obj.nsp) {
	    nsp = true;
	    str += obj.nsp;
	  }
	
	  // immediately followed by the id
	  if (null != obj.id) {
	    if (nsp) {
	      str += ',';
	      nsp = false;
	    }
	    str += obj.id;
	  }
	
	  // json data
	  if (null != obj.data) {
	    if (nsp) str += ',';
	    str += json.stringify(obj.data);
	  }
	
	  debug('encoded %j as %s', obj, str);
	  return str;
	}
	
	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */
	
	function encodeAsBinary(obj, callback) {
	
	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;
	
	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }
	
	  binary.removeBlobs(obj, writeEncoding);
	}
	
	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */
	
	function Decoder() {
	  this.reconstructor = null;
	}
	
	/**
	 * Mix in `Emitter` with Decoder.
	 */
	
	Emitter(Decoder.prototype);
	
	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */
	
	Decoder.prototype.add = function(obj) {
	  var packet;
	  if ('string' == typeof obj) {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);
	
	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuf(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};
	
	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */
	
	function decodeString(str) {
	  var p = {};
	  var i = 0;
	
	  // look up type
	  p.type = Number(str.charAt(0));
	  if (null == exports.types[p.type]) return error();
	
	  // look up attachments if type binary
	  if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
	    var buf = '';
	    while (str.charAt(++i) != '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) != '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }
	
	  // look up namespace (if any)
	  if ('/' == str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' == c) break;
	      p.nsp += c;
	      if (i == str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }
	
	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i == str.length) break;
	    }
	    p.id = Number(p.id);
	  }
	
	  // look up json data
	  if (str.charAt(++i)) {
	    p = tryParse(p, str.substr(i));
	  }
	
	  debug('decoded %s as %j', str, p);
	  return p;
	}
	
	function tryParse(p, str) {
	  try {
	    p.data = json.parse(str);
	  } catch(e){
	    return error();
	  }
	  return p; 
	};
	
	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */
	
	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};
	
	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */
	
	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}
	
	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */
	
	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length == this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};
	
	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */
	
	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};
	
	function error(data){
	  return {
	    type: exports.ERROR,
	    data: 'parser error'
	  };
	}


/***/ },

/***/ 31:
/***/ function(module, exports) {

	"use strict";
	var _name = "fxExecuteCmdResult", _module = _name + "Module";
	exports.module = angular.module(_module, ["ngAnimate", "ngMaterial"]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var action_model_1 = __webpack_require__(5);
	var interface_model_1 = __webpack_require__(22);
	var ExecuteCmdForm = (function () {
	    function ExecuteCmdForm() {
	        var actionModel = {
	            key: ExecuteCmdForm.key,
	            type: action_model_1.ActionType.form,
	            title: "",
	            icon: "",
	            form: {
	                dataSchema: {
	                    type: "object",
	                    required: ["command", "listIps"],
	                    properties: {
	                        command: {
	                            type: "object",
	                            title: "命令"
	                        },
	                        listIps: {
	                            type: "array",
	                            default: [],
	                            title: "服务器列表",
	                            minItems: 1,
	                            items: {
	                                type: "object"
	                            }
	                        }
	                    }
	                },
	                formSchema: [{
	                        key: "command",
	                        type: "autocomplete-1",
	                        placeHolder: "请选择命令",
	                        acOptions: {
	                            textField: "title",
	                            dataField: "rows",
	                            noCache: true,
	                            fields: [{ key: ["key"] }, { key: ["args"] }, { key: ["description"] }, { key: ["title"] }, { key: ["cmd"] }],
	                            search: "/where/key/$like",
	                            actionKey: "command"
	                        },
	                        htmlClass: "md-block"
	                    }, {
	                        key: "command.args[0]",
	                        type: "text",
	                        required: true,
	                        title: "命令参数",
	                        htmlClass: "md-block"
	                    }, {
	                        key: "listIps",
	                        type: "querytable",
	                        qtOptions: {
	                            key: "devices",
	                            resFilter: {
	                                "/online/match/-/and": 1
	                            }
	                        },
	                        startEmpty: true,
	                        htmlClass: "md-block"
	                    }]
	            },
	            refreshList: true,
	            closeDialog: true,
	            interfaces: [{
	                    key: "execute.cmd",
	                    method: interface_model_1.MethodType.POST,
	                    host: "",
	                    path: "/commands/manual/test",
	                    jpp: {
	                        set: [{ "from": "/queueItem", "to": "/data" }]
	                    },
	                    isRestful: false
	                }]
	        };
	        return actionModel;
	    }
	    return ExecuteCmdForm;
	}());
	ExecuteCmdForm.key = "execute.cmd";
	exports.ExecuteCmdForm = ExecuteCmdForm;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = function (module) {
	    var services = [ExecuteCmdForm];
	    _.each(services, function (model) {
	        module.service(model.key, model);
	    });
	};


/***/ },

/***/ 36:
/***/ function(module, exports) {

	/**
	 * Slice reference.
	 */
	
	var slice = [].slice;
	
	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */
	
	module.exports = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};


/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies
	 */
	
	var XMLHttpRequest = __webpack_require__(28);
	var XHR = __webpack_require__(238);
	var JSONP = __webpack_require__(237);
	var websocket = __webpack_require__(239);
	
	/**
	 * Export transports.
	 */
	
	exports.polling = polling;
	exports.websocket = websocket;
	
	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */
	
	function polling (opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;
	
	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }
	
	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);
	
	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(27);
	var parseqs = __webpack_require__(29);
	var parser = __webpack_require__(14);
	var inherit = __webpack_require__(21);
	var yeast = __webpack_require__(171);
	var debug = __webpack_require__(8)('engine.io-client:polling');
	
	/**
	 * Module exports.
	 */
	
	module.exports = Polling;
	
	/**
	 * Is XHR2 supported?
	 */
	
	var hasXHR2 = (function () {
	  var XMLHttpRequest = __webpack_require__(28);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();
	
	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */
	
	function Polling (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(Polling, Transport);
	
	/**
	 * Transport name.
	 */
	
	Polling.prototype.name = 'polling';
	
	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */
	
	Polling.prototype.doOpen = function () {
	  this.poll();
	};
	
	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */
	
	Polling.prototype.pause = function (onPause) {
	  var self = this;
	
	  this.readyState = 'pausing';
	
	  function pause () {
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }
	
	  if (this.polling || !this.writable) {
	    var total = 0;
	
	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }
	
	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};
	
	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */
	
	Polling.prototype.poll = function () {
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};
	
	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */
	
	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function (packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }
	
	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }
	
	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };
	
	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);
	
	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');
	
	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};
	
	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */
	
	Polling.prototype.doClose = function () {
	  var self = this;
	
	  function close () {
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }
	
	  if ('open' === this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};
	
	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */
	
	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function () {
	    self.writable = true;
	    self.emit('drain');
	  };
	
	  parser.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';
	
	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }
	
	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // avoid port if default for schema
	  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
	     ('http' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};


/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/*
	 * Module requirements.
	 */
	
	var isArray = __webpack_require__(41);
	
	/**
	 * Module exports.
	 */
	
	module.exports = hasBinary;
	
	/**
	 * Checks for binary data.
	 *
	 * Right now only Buffer and ArrayBuffer are supported..
	 *
	 * @param {Object} anything
	 * @api public
	 */
	
	function hasBinary(data) {
	
	  function _hasBinary(obj) {
	    if (!obj) return false;
	
	    if ( (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer) ||
	         (global.Blob && obj instanceof Blob) ||
	         (global.File && obj instanceof File)
	        ) {
	      return true;
	    }
	
	    if (isArray(obj)) {
	      for (var i = 0; i < obj.length; i++) {
	          if (_hasBinary(obj[i])) {
	              return true;
	          }
	      }
	    } else if (obj && 'object' == typeof obj) {
	      // see: https://github.com/Automattic/has-binary/pull/4
	      if (obj.toJSON && 'function' == typeof obj.toJSON) {
	        obj = obj.toJSON();
	      }
	
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
	          return true;
	        }
	      }
	    }
	
	    return false;
	  }
	
	  return _hasBinary(data);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 40:
/***/ function(module, exports) {

	
	var indexOf = [].indexOf;
	
	module.exports = function(arr, obj){
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ },

/***/ 41:
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },

/***/ 150:
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */
	
	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	
	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];
	
	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');
	
	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }
	
	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;
	
	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }
	
	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }
	
	    return uri;
	};


/***/ },

/***/ 151:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var eio = __webpack_require__(234);
	var Socket = __webpack_require__(153);
	var Emitter = __webpack_require__(13);
	var parser = __webpack_require__(30);
	var on = __webpack_require__(152);
	var bind = __webpack_require__(36);
	var debug = __webpack_require__(8)('socket.io-client:manager');
	var indexOf = __webpack_require__(40);
	var Backoff = __webpack_require__(222);
	
	/**
	 * IE6+ hasOwnProperty
	 */
	
	var has = Object.prototype.hasOwnProperty;
	
	/**
	 * Module exports
	 */
	
	module.exports = Manager;
	
	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */
	
	function Manager (uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' === typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};
	
	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  this.encoder = new parser.Encoder();
	  this.decoder = new parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}
	
	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */
	
	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};
	
	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */
	
	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.engine.id;
	    }
	  }
	};
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Manager.prototype);
	
	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};
	
	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};
	
	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};
	
	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};
	
	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};
	
	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */
	
	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};
	
	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */
	
	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};
	
	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */
	
	Manager.prototype.open =
	Manager.prototype.connect = function (fn, opts) {
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;
	
	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;
	
	  // emit `open`
	  var openSub = on(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });
	
	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function (data) {
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });
	
	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);
	
	    // set timer
	    var timer = setTimeout(function () {
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);
	
	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	
	  this.subs.push(openSub);
	  this.subs.push(errorSub);
	
	  return this;
	};
	
	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */
	
	Manager.prototype.onopen = function () {
	  debug('open');
	
	  // clear old subs
	  this.cleanup();
	
	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');
	
	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
	  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	};
	
	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */
	
	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};
	
	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */
	
	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};
	
	/**
	 * Called with data.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};
	
	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */
	
	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};
	
	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */
	
	Manager.prototype.onerror = function (err) {
	  debug('error', err);
	  this.emitAll('error', err);
	};
	
	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */
	
	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.engine.id;
	    });
	
	    if (this.autoConnect) {
	      // manually call here since connecting evnet is fired before listening
	      onConnecting();
	    }
	  }
	
	  function onConnecting () {
	    if (!~indexOf(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }
	
	  return socket;
	};
	
	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */
	
	Manager.prototype.destroy = function (socket) {
	  var index = indexOf(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;
	
	  this.close();
	};
	
	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Manager.prototype.packet = function (packet) {
	  debug('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;
	
	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};
	
	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */
	
	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};
	
	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */
	
	Manager.prototype.cleanup = function () {
	  debug('cleanup');
	
	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }
	
	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;
	
	  this.decoder.destroy();
	};
	
	/**
	 * Close the current socket.
	 *
	 * @api private
	 */
	
	Manager.prototype.close =
	Manager.prototype.disconnect = function () {
	  debug('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};
	
	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */
	
	Manager.prototype.onclose = function (reason) {
	  debug('onclose');
	
	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);
	
	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};
	
	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */
	
	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;
	
	  var self = this;
	
	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);
	
	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;
	
	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);
	
	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;
	
	      self.open(function (err) {
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);
	
	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	};
	
	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */
	
	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};


/***/ },

/***/ 152:
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 */
	
	module.exports = on;
	
	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */
	
	function on (obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function () {
	      obj.removeListener(ev, fn);
	    }
	  };
	}


/***/ },

/***/ 153:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var parser = __webpack_require__(30);
	var Emitter = __webpack_require__(13);
	var toArray = __webpack_require__(309);
	var on = __webpack_require__(152);
	var bind = __webpack_require__(36);
	var debug = __webpack_require__(8)('socket.io-client:socket');
	var hasBin = __webpack_require__(39);
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = Socket;
	
	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */
	
	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};
	
	/**
	 * Shortcut to `Emitter#emit`.
	 */
	
	var emit = Emitter.prototype.emit;
	
	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */
	
	function Socket (io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */
	
	Socket.prototype.subEvents = function () {
	  if (this.subs) return;
	
	  var io = this.io;
	  this.subs = [
	    on(io, 'open', bind(this, 'onopen')),
	    on(io, 'packet', bind(this, 'onpacket')),
	    on(io, 'close', bind(this, 'onclose'))
	  ];
	};
	
	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */
	
	Socket.prototype.open =
	Socket.prototype.connect = function () {
	  if (this.connected) return this;
	
	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};
	
	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.send = function () {
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};
	
	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }
	
	  var args = toArray(arguments);
	  var parserType = parser.EVENT; // default
	  if (hasBin(args)) { parserType = parser.BINARY_EVENT; } // binary
	  var packet = { type: parserType, data: args };
	
	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;
	
	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }
	
	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }
	
	  delete this.flags;
	
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};
	
	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */
	
	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');
	
	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      this.packet({type: parser.CONNECT, query: this.query});
	    } else {
	      this.packet({type: parser.CONNECT});
	    }
	  }
	};
	
	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */
	
	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};
	
	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onpacket = function (packet) {
	  if (packet.nsp !== this.nsp) return;
	
	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;
	
	    case parser.EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;
	
	    case parser.ACK:
	      this.onack(packet);
	      break;
	
	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;
	
	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;
	
	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};
	
	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);
	
	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }
	
	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};
	
	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */
	
	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);
	
	    var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
	    self.packet({
	      type: type,
	      id: id,
	      data: args
	    });
	  };
	};
	
	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */
	
	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};
	
	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */
	
	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};
	
	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */
	
	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];
	
	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};
	
	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */
	
	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};
	
	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */
	
	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }
	
	  this.io.destroy(this);
	};
	
	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.close =
	Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }
	
	  // remove socket from pool
	  this.destroy();
	
	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};
	
	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */
	
	Socket.prototype.compress = function (compress) {
	  this.flags = this.flags || {};
	  this.flags.compress = compress;
	  return this;
	};


/***/ },

/***/ 154:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {
	module.exports = isBuf;
	
	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */
	
	function isBuf(obj) {
	  return (global.Buffer && global.Buffer.isBuffer(obj)) ||
	         (global.ArrayBuffer && obj instanceof ArrayBuffer);
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 155:
/***/ function(module, exports) {

	"use strict";
	var _name = "fxPagesDir", _module = _name + "Module";
	exports.module = angular.module(_module, ["ngAnimate", "ngMaterial"]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 156:
/***/ function(module, exports) {

	"use strict";
	exports.module = angular.module('fxQueryTable', ["ngAnimate", "ngMaterial"]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 171:
/***/ function(module, exports) {

	'use strict';
	
	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;
	
	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';
	
	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);
	
	  return encoded;
	}
	
	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;
	
	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }
	
	  return decoded;
	}
	
	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());
	
	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode(seed++);
	}
	
	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;
	
	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;


/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	// support for Browserify
	
	__webpack_require__(7);
	__webpack_require__(214);
	
	module.exports = 'md.data.table';


/***/ },

/***/ 174:
/***/ function(module, exports) {

	/*
	 * @license
	 * angular-socket-io v0.7.0
	 * (c) 2014 Brian Ford http://briantford.com
	 * License: MIT
	 */
	
	angular.module('btford.socket-io', []).
	  provider('socketFactory', function () {
	
	    'use strict';
	
	    // when forwarding events, prefix the event name
	    var defaultPrefix = 'socket:',
	      ioSocket;
	
	    // expose to provider
	    this.$get = ['$rootScope', '$timeout', function ($rootScope, $timeout) {
	
	      var asyncAngularify = function (socket, callback) {
	        return callback ? function () {
	          var args = arguments;
	          $timeout(function () {
	            callback.apply(socket, args);
	          }, 0);
	        } : angular.noop;
	      };
	
	      return function socketFactory (options) {
	        options = options || {};
	        var socket = options.ioSocket || io.connect();
	        var prefix = options.prefix === undefined ? defaultPrefix : options.prefix ;
	        var defaultScope = options.scope || $rootScope;
	
	        var addListener = function (eventName, callback) {
	          socket.on(eventName, callback.__ng = asyncAngularify(socket, callback));
	        };
	
	        var addOnceListener = function (eventName, callback) {
	          socket.once(eventName, callback.__ng = asyncAngularify(socket, callback));
	        };
	
	        var wrappedSocket = {
	          on: addListener,
	          addListener: addListener,
	          once: addOnceListener,
	
	          emit: function (eventName, data, callback) {
	            var lastIndex = arguments.length - 1;
	            var callback = arguments[lastIndex];
	            if(typeof callback == 'function') {
	              callback = asyncAngularify(socket, callback);
	              arguments[lastIndex] = callback;
	            }
	            return socket.emit.apply(socket, arguments);
	          },
	
	          removeListener: function (ev, fn) {
	            if (fn && fn.__ng) {
	              arguments[1] = fn.__ng;
	            }
	            return socket.removeListener.apply(socket, arguments);
	          },
	
	          removeAllListeners: function() {
	            return socket.removeAllListeners.apply(socket, arguments);
	          },
	
	          disconnect: function (close) {
	            return socket.disconnect(close);
	          },
	
	          connect: function() {
	            return socket.connect();
	          },
	
	          // when socket.on('someEvent', fn (data) { ... }),
	          // call scope.$broadcast('someEvent', data)
	          forward: function (events, scope) {
	            if (events instanceof Array === false) {
	              events = [events];
	            }
	            if (!scope) {
	              scope = defaultScope;
	            }
	            events.forEach(function (eventName) {
	              var prefixedEvent = prefix + eventName;
	              var forwardBroadcast = asyncAngularify(socket, function () {
	                Array.prototype.unshift.call(arguments, prefixedEvent);
	                scope.$broadcast.apply(scope, arguments);
	              });
	              scope.$on('$destroy', function () {
	                socket.removeListener(eventName, forwardBroadcast);
	              });
	              socket.on(eventName, forwardBroadcast);
	            });
	          }
	        };
	
	        return wrappedSocket;
	      };
	    }];
	  });


/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(232);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var normal_1 = __webpack_require__(328);
	var pointer = __webpack_require__(9);
	var CompileDirective = (function () {
	    function CompileDirective() {
	    }
	    return CompileDirective;
	}());
	CompileDirective.directive = [
	    "$compile",
	    function ($compile) {
	        var directive = {
	            replace: false,
	            require: "ngModel",
	            restrict: "A",
	            scope: {
	                compareTo: "@",
	                compareType: "@",
	                compareOpt: "@",
	                compareForm: "=",
	                compareModel: "="
	            },
	            link: function ($scope, $element, $attrs, ngModel) {
	                if (!$scope["compareForm"] || !$scope["compareTo"] || !$scope["compareModel"]) {
	                    return;
	                }
	                var keys = [].concat($scope["compareForm"].key || []);
	                keys.pop();
	                keys.push($scope["compareTo"]);
	                ngModel.$validators["compareTo"] = (function (modelValue) {
	                    if (pointer.has($scope["compareModel"], "/" + keys.join("/"))) {
	                        return normal_1.compare.doCompare(modelValue, pointer.get($scope["compareModel"], "/" + keys.join("/")), $scope["compareType"] || "", $scope["compareOpt"] || "eq");
	                    }
	                    return true;
	                });
	                $scope.$watch(function () {
	                    if (pointer.has($scope["compareModel"], "/" + keys.join("/"))) {
	                        return pointer.get($scope["compareModel"], "/" + keys.join("/"));
	                    }
	                }, function (newValue, oldValue) {
	                    ngModel.$validate();
	                });
	            }
	        };
	        return directive;
	    }
	];
	var moduleName = "compareTo";
	var module = angular.module(moduleName + "Module", []).directive(moduleName, CompileDirective.directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 196:
/***/ function(module, exports) {

	"use strict";
	var CompileDirective = (function () {
	    function CompileDirective() {
	    }
	    return CompileDirective;
	}());
	CompileDirective._name = "dyCompile";
	CompileDirective.directive = [
	    "$compile",
	    function ($compile) {
	        var directive = {
	            replace: false,
	            restrict: "A",
	            scope: {
	                item: "=",
	                $index: "@",
	                parent: "="
	            },
	            link: function ($scope, $element, $attrs) {
	                var dummyScope = {
	                    $destroy: angular.noop
	                }, childScope, content, destoryChildScope = function () {
	                    (childScope || dummyScope).$destroy();
	                };
	                $attrs.$observe("html", function (html) {
	                    if (html) {
	                        destoryChildScope();
	                        childScope = $scope.$new(false);
	                        childScope["item"] = $scope["item"];
	                        childScope["$index"] = $scope["$index"];
	                        childScope["parent"] = $scope["parent"];
	                        if (html.search("<") === 0) {
	                            content = $compile(html)(childScope);
	                            $element.replaceWith(content);
	                        }
	                        else {
	                            content = childScope.$eval(html);
	                            $element.text(content);
	                        }
	                    }
	                });
	            }
	        };
	        return directive;
	    }
	];
	var moduleName = "dyCompile";
	var module = angular.module(moduleName, []).directive(CompileDirective._name, CompileDirective.directive);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + module.name;


/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(31);
	__webpack_require__(330);
	__webpack_require__(331);
	__webpack_require__(306);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(155);
	__webpack_require__(332);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(156);
	__webpack_require__(333);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = module_1.default;


/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var page_controller_1 = __webpack_require__(347);
	var page_d3_controller_1 = __webpack_require__(348);
	var page_allin_controller_1 = __webpack_require__(346);
	var page_execute_cmd_1 = __webpack_require__(349);
	exports.initRouter = function ($urlRouterProvider, $stateProvider) {
	    $stateProvider.state("home.page", {
	        url: "page/:key",
	        data: {
	            permissions: {
	                except: ["anonymous"],
	                only: ["user"]
	            }
	        },
	        views: {
	            "content": {
	                controller: page_controller_1.PageController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(285)()
	            }
	        }
	    }).state('home.d3', {
	        url: "d3/:key",
	        views: {
	            "content": {
	                controller: page_d3_controller_1.D3Controller,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(283)()
	            }
	        }
	    }).state('home.allin', {
	        url: "allin/:key",
	        views: {
	            "content": {
	                controller: page_allin_controller_1.AllInController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(282)()
	            }
	        }
	    }).state('home.executeCmd', {
	        url: "executeCmd/:key",
	        views: {
	            "content": {
	                controller: page_execute_cmd_1.PageExecuteCmdController,
	                controllerAs: "pageCtl",
	                template: __webpack_require__(284)()
	            }
	        }
	    });
	};


/***/ },

/***/ 208:
/***/ function(module, exports) {

	module.exports = after
	
	function after(count, callback, err_cb) {
	    var bail = false
	    err_cb = err_cb || noop
	    proxy.count = count
	
	    return (count === 0) ? callback() : proxy
	
	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count
	
	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true
	            callback(err)
	            // future error callbacks will go to error handler
	            callback = err_cb
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result)
	        }
	    }
	}
	
	function noop() {}


/***/ },

/***/ 214:
/***/ function(module, exports) {

	/*
	 * Angular Material Data Table
	 * https://github.com/daniel-nagy/md-data-table
	 * @license MIT
	 * v0.10.9
	 */
	(function(window, angular, undefined) {
	    'use strict';
	
	    angular.module('md.table.templates', ['md-table-pagination.html', 'md-table-progress.html', 'arrow-up.svg', 'navigate-before.svg', 'navigate-first.svg', 'navigate-last.svg', 'navigate-next.svg']);
	
	    angular.module('md-table-pagination.html', []).run(['$templateCache', function($templateCache) {
	        $templateCache.put('md-table-pagination.html',
	            '<div class="page-select" ng-if="$pagination.showPageSelect()">\n' +
	            '  <div class="label">{{$pagination.label.page}}</div>\n' +
	            '\n' +
	            '  <md-select virtual-page-select total="{{$pagination.pages()}}" class="md-table-select" ng-model="$pagination.page" md-container-class="md-pagination-select" ng-change="$pagination.onPaginationChange()" ng-disabled="$pagination.disabled" aria-label="Page">\n' +
	            '    <md-content>\n' +
	            '      <md-option ng-repeat="page in $pageSelect.pages" ng-value="page">{{page}}</md-option>\n' +
	            '    </md-content>\n' +
	            '  </md-select>\n' +
	            '</div>\n' +
	            '\n' +
	            '<div class="limit-select" ng-if="$pagination.limitOptions">\n' +
	            '  <div class="label">{{$pagination.label.rowsPerPage}}</div>\n' +
	            '\n' +
	            '  <md-select class="md-table-select" ng-model="$pagination.limit" md-container-class="md-pagination-select" ng-disabled="$pagination.disabled" aria-label="Rows" placeholder="{{ $pagination.limitOptions[0] }}">\n' +
	            '    <md-option ng-repeat="option in $pagination.limitOptions" ng-value="option.value ? $pagination.eval(option.value) : option">{{::option.label ? option.label : option}}</md-option>\n' +
	            '  </md-select>\n' +
	            '</div>\n' +
	            '\n' +
	            '<div class="buttons">\n' +
	            '  <div class="label">{{$pagination.min()}} - {{$pagination.max()}} {{$pagination.label.of}} {{$pagination.total}}</div>\n' +
	            '\n' +
	            '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.first()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="First">\n' +
	            '    <md-icon md-svg-icon="navigate-first.svg"></md-icon>\n' +
	            '  </md-button>\n' +
	            '\n' +
	            '  <md-button class="md-icon-button" type="button" ng-click="$pagination.previous()" ng-disabled="$pagination.disabled || !$pagination.hasPrevious()" aria-label="Previous">\n' +
	            '    <md-icon md-svg-icon="navigate-before.svg"></md-icon>\n' +
	            '  </md-button>\n' +
	            '\n' +
	            '  <md-button class="md-icon-button" type="button" ng-click="$pagination.next()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Next">\n' +
	            '    <md-icon md-svg-icon="navigate-next.svg"></md-icon>\n' +
	            '  </md-button>\n' +
	            '\n' +
	            '  <md-button class="md-icon-button" type="button" ng-if="$pagination.showBoundaryLinks()" ng-click="$pagination.last()" ng-disabled="$pagination.disabled || !$pagination.hasNext()" aria-label="Last">\n' +
	            '    <md-icon md-svg-icon="navigate-last.svg"></md-icon>\n' +
	            '  </md-button>\n' +
	            '</div>');
	    }]);
	
	    angular.module('md-table-progress.html', []).run(['$templateCache', function($templateCache) {
	        $templateCache.put('md-table-progress.html',
	            '<tr>\n' +
	            '  <th colspan="{{columnCount()}}">\n' +
	            '    <md-progress-linear ng-show="deferred()" md-mode="query"></md-progress-linear>\n' +
	            '  </th>\n' +
	            '</tr>');
	    }]);
	
	    angular.module('arrow-up.svg', []).run(['$templateCache', function($templateCache) {
	        $templateCache.put('arrow-up.svg',
	            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>');
	    }]);
	
	    angular.module('navigate-before.svg', []).run(['$templateCache', function($templateCache) {
	        $templateCache.put('navigate-before.svg',
	            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>');
	    }]);
	
	    angular.module('navigate-first.svg', []).run(['$templateCache', function($templateCache) {
	        $templateCache.put('navigate-first.svg',
	            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7 6 v12 h2 v-12 h-2z M17.41 7.41L16 6l-6 6 6 6 1.41-1.41L12.83 12z"/></svg>');
	    }]);
	
	    angular.module('navigate-last.svg', []).run(['$templateCache', function($templateCache) {
	        $templateCache.put('navigate-last.svg',
	            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 6 v12 h2 v-12 h-2z M8 6L6.59 7.41 11.17 12l-4.58 4.59L8 18l6-6z"/></svg>');
	    }]);
	
	    angular.module('navigate-next.svg', []).run(['$templateCache', function($templateCache) {
	        $templateCache.put('navigate-next.svg',
	            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>');
	    }]);
	
	
	    angular.module('md.data.table', ['md.table.templates']);
	
	    angular.module('md.data.table').directive('mdBody', mdBody);
	
	    function mdBody() {
	
	        function compile(tElement) {
	            tElement.addClass('md-body');
	        }
	
	        return {
	            compile: compile,
	            restrict: 'A'
	        };
	    }
	
	    angular.module('md.data.table').directive('mdCell', mdCell);
	
	    function mdCell() {
	
	        function compile(tElement) {
	            var select = tElement.find('md-select');
	
	            if (select.length) {
	                select.addClass('md-table-select').attr('md-container-class', 'md-table-select');
	            }
	
	            tElement.addClass('md-cell');
	
	            return postLink;
	        }
	
	        // empty controller to be bind properties to in postLink function
	        function Controller() {
	
	        }
	
	        function postLink(scope, element, attrs, ctrls) {
	            var select = element.find('md-select');
	            var cellCtrl = ctrls.shift();
	            var tableCtrl = ctrls.shift();
	
	            if (attrs.ngClick) {
	                element.addClass('md-clickable');
	            }
	
	            if (select.length) {
	                select.on('click', function(event) {
	                    event.stopPropagation();
	                });
	
	                element.addClass('md-clickable').on('click', function(event) {
	                    event.stopPropagation();
	                    select[0].click();
	                });
	            }
	
	            cellCtrl.getTable = tableCtrl.getElement;
	
	            function getColumn() {
	                return tableCtrl.$$columns[getIndex()];
	            }
	
	            function getIndex() {
	                return Array.prototype.indexOf.call(element.parent().children(), element[0]);
	            }
	
	            scope.$watch(getColumn, function(column) {
	                if (!column) {
	                    return;
	                }
	
	                if (column.numeric) {
	                    element.addClass('md-numeric');
	                } else {
	                    element.removeClass('md-numeric');
	                }
	            });
	        }
	
	        return {
	            controller: Controller,
	            compile: compile,
	            require: ['mdCell', '^^mdTable'],
	            restrict: 'A'
	        };
	    }
	
	    angular.module('md.data.table').directive('mdColumn', mdColumn);
	
	    function mdColumn($compile, $mdUtil) {
	
	        function compile(tElement) {
	            tElement.addClass('md-column');
	            return postLink;
	        }
	
	        function postLink(scope, element, attrs, ctrls) {
	            var headCtrl = ctrls.shift();
	            var tableCtrl = ctrls.shift();
	
	            function attachSortIcon() {
	                var sortIcon = angular.element('<md-icon md-svg-icon="arrow-up.svg">');
	
	                $compile(sortIcon.addClass('md-sort-icon').attr('ng-class', 'getDirection()'))(scope);
	
	                if (element.hasClass('md-numeric')) {
	                    element.prepend(sortIcon);
	                } else {
	                    element.append(sortIcon);
	                }
	            }
	
	            function detachSortIcon() {
	                Array.prototype.some.call(element.find('md-icon'), function(icon) {
	                    return icon.classList.contains('md-sort-icon') && element[0].removeChild(icon);
	                });
	            }
	
	            function disableSorting() {
	                detachSortIcon();
	                element.removeClass('md-sort').off('click', setOrder);
	            }
	
	            function enableSorting() {
	                attachSortIcon();
	                element.addClass('md-sort').on('click', setOrder);
	            }
	
	            function getIndex() {
	                return Array.prototype.indexOf.call(element.parent().children(), element[0]);
	            }
	
	            function isActive() {
	                return scope.orderBy && (headCtrl.order === scope.orderBy || headCtrl.order === '-' + scope.orderBy);
	            }
	
	            function isNumeric() {
	                return attrs.mdNumeric === '' || scope.numeric;
	            }
	
	            function setOrder() {
	                scope.$applyAsync(function() {
	                    if (isActive()) {
	                        headCtrl.order = scope.getDirection() === 'md-asc' ? '-' + scope.orderBy : scope.orderBy;
	                    } else {
	                        headCtrl.order = scope.getDirection() === 'md-asc' ? scope.orderBy : '-' + scope.orderBy;
	                    }
	
	                    if (angular.isFunction(headCtrl.onReorder)) {
	                        $mdUtil.nextTick(function() {
	                            headCtrl.onReorder(headCtrl.order);
	                        });
	                    }
	                });
	            }
	
	            function updateColumn(index, column) {
	                tableCtrl.$$columns[index] = column;
	
	                if (column.numeric) {
	                    element.addClass('md-numeric');
	                } else {
	                    element.removeClass('md-numeric');
	                }
	            }
	
	            scope.getDirection = function() {
	                if (isActive()) {
	                    return headCtrl.order.charAt(0) === '-' ? 'md-desc' : 'md-asc';
	                }
	
	                return attrs.mdDesc === '' || scope.$eval(attrs.mdDesc) ? 'md-desc' : 'md-asc';
	            };
	
	            scope.$watch(isActive, function(active) {
	                if (active) {
	                    element.addClass('md-active');
	                } else {
	                    element.removeClass('md-active');
	                }
	            });
	
	            scope.$watch(getIndex, function(index) {
	                updateColumn(index, { 'numeric': isNumeric() });
	            });
	
	            scope.$watch(isNumeric, function(numeric) {
	                updateColumn(getIndex(), { 'numeric': numeric });
	            });
	
	            scope.$watch('orderBy', function(orderBy) {
	                if (orderBy) {
	                    if (!element.hasClass('md-sort')) {
	                        enableSorting();
	                    }
	                } else if (element.hasClass('md-sort')) {
	                    disableSorting();
	                }
	            });
	        }
	
	        return {
	            compile: compile,
	            require: ['^^mdHead', '^^mdTable'],
	            restrict: 'A',
	            scope: {
	                numeric: '=?mdNumeric',
	                orderBy: '@?mdOrderBy'
	            }
	        };
	    }
	
	    mdColumn.$inject = ['$compile', '$mdUtil'];
	
	    angular.module('md.data.table')
	        .decorator('$controller', controllerDecorator)
	        .factory('$mdEditDialog', mdEditDialog);
	
	    /*
	     * A decorator for ng.$controller to optionally bind properties to the
	     * controller before invoking the constructor. Stolen from the ngMock.
	     *
	     * https://docs.angularjs.org/api/ngMock/service/$controller
	     */
	    function controllerDecorator($delegate) {
	        return function(expression, locals, later, ident) {
	            if (later && typeof later === 'object') {
	                var create = $delegate(expression, locals, true, ident);
	                angular.extend(create.instance, later);
	                return create();
	            }
	            return $delegate(expression, locals, later, ident);
	        };
	    }
	
	    controllerDecorator.$inject = ['$delegate'];
	
	    function mdEditDialog($compile, $controller, $document, $mdUtil, $q, $rootScope, $templateCache, $templateRequest, $window) {
	        /* jshint validthis: true */
	
	        var ESCAPE = 27;
	
	        var busy = false;
	        var body = angular.element($document.prop('body'));
	
	        /*
	         * bindToController
	         * controller
	         * controllerAs
	         * locals
	         * resolve
	         * scope
	         * targetEvent
	         * template
	         * templateUrl
	         */
	        var defaultOptions = {
	            clickOutsideToClose: true,
	            disableScroll: true,
	            escToClose: true,
	            focusOnOpen: true
	        };
	
	        function build(template, options) {
	            var scope = $rootScope.$new();
	            var element = $compile(template)(scope);
	            var backdrop = $mdUtil.createBackdrop(scope, 'md-edit-dialog-backdrop');
	            var controller;
	
	            if (options.controller) {
	                controller = getController(options, scope, { $element: element, $scope: scope });
	            } else {
	                angular.extend(scope, options.scope);
	            }
	
	            if (options.disableScroll) {
	                disableScroll(element);
	            }
	
	            body.prepend(backdrop).append(element.addClass('md-whiteframe-1dp'));
	
	            positionDialog(element, options.target);
	
	            if (options.focusOnOpen) {
	                focusOnOpen(element);
	            }
	
	            if (options.clickOutsideToClose) {
	                backdrop.on('click', function() {
	                    element.remove();
	                });
	            }
	
	            if (options.escToClose) {
	                escToClose(element);
	            }
	
	            element.on('$destroy', function() {
	                busy = false;
	                backdrop.remove();
	            });
	
	            return controller;
	        }
	
	        function disableScroll(element) {
	            var restoreScroll = $mdUtil.disableScrollAround(element, body);
	
	            element.on('$destroy', function() {
	                restoreScroll();
	            });
	        }
	
	        function getController(options, scope, inject) {
	            if (!options.controller) {
	                return;
	            }
	
	            if (options.resolve) {
	                angular.extend(inject, options.resolve);
	            }
	
	            if (options.locals) {
	                angular.extend(inject, options.locals);
	            }
	
	            if (options.controllerAs) {
	                scope[options.controllerAs] = {};
	
	                if (options.bindToController) {
	                    angular.extend(scope[options.controllerAs], options.scope);
	                } else {
	                    angular.extend(scope, options.scope);
	                }
	            } else {
	                angular.extend(scope, options.scope);
	            }
	
	            if (options.bindToController) {
	                return $controller(options.controller, inject, scope[options.controllerAs]);
	            } else {
	                return $controller(options.controller, inject);
	            }
	        }
	
	        function getTemplate(options) {
	            return $q(function(resolve, reject) {
	                var template = options.template;
	
	                function illegalType(type) {
	                    reject('Unexpected template value. Expected a string; received a ' + type + '.');
	                }
	
	                if (template) {
	                    return angular.isString(template) ? resolve(template) : illegalType(typeof template);
	                }
	
	                if (options.templateUrl) {
	                    template = $templateCache.get(options.templateUrl);
	
	                    if (template) {
	                        return resolve(template);
	                    }
	
	                    var success = function(template) {
	                        return resolve(template);
	                    };
	
	                    var error = function() {
	                        return reject('Error retrieving template from URL.');
	                    };
	
	                    return $templateRequest(options.templateUrl).then(success, error);
	                }
	
	                reject('Template not provided.');
	            });
	        }
	
	        function logError(error) {
	            busy = false;
	            console.error(error);
	        }
	
	        function escToClose(element) {
	            var keyup = function(event) {
	                if (event.keyCode === ESCAPE) {
	                    element.remove();
	                }
	            };
	
	            body.on('keyup', keyup);
	
	            element.on('$destroy', function() {
	                body.off('keyup', keyup);
	            });
	        }
	
	        function focusOnOpen(element) {
	            $mdUtil.nextTick(function() {
	                var autofocus = $mdUtil.findFocusTarget(element);
	
	                if (autofocus) {
	                    autofocus.focus();
	                }
	            }, false);
	        }
	
	        function positionDialog(element, target) {
	            var table = angular.element(target).controller('mdCell').getTable();
	
	            var getHeight = function() {
	                return element.prop('clientHeight');
	            };
	
	            var getSize = function() {
	                return {
	                    width: getWidth(),
	                    height: getHeight()
	                };
	            };
	
	            var getTableBounds = function() {
	                var parent = table.parent();
	
	                if (parent.prop('tagName') === 'MD-TABLE-CONTAINER') {
	                    return parent[0].getBoundingClientRect();
	                } else {
	                    return table[0].getBoundingClientRect();
	                }
	            };
	
	            var getWidth = function() {
	                return element.prop('clientWidth');
	            };
	
	            var reposition = function() {
	                var size = getSize();
	                var cellBounds = target.getBoundingClientRect();
	                var tableBounds = getTableBounds();
	
	                if (size.width > tableBounds.right - cellBounds.left) {
	                    element.css('left', tableBounds.right - size.width + 'px');
	                } else {
	                    element.css('left', cellBounds.left + 'px');
	                }
	
	                if (size.height > tableBounds.bottom - cellBounds.top) {
	                    element.css('top', tableBounds.bottom - size.height + 'px');
	                } else {
	                    element.css('top', cellBounds.top + 1 + 'px');
	                }
	
	                element.css('minWidth', cellBounds.width + 'px');
	            };
	
	            var watchWidth = $rootScope.$watch(getWidth, reposition);
	            var watchHeight = $rootScope.$watch(getHeight, reposition);
	
	            $window.addEventListener('resize', reposition);
	
	            element.on('$destroy', function() {
	                watchWidth();
	                watchHeight();
	
	                $window.removeEventListener('resize', reposition);
	            });
	        }
	
	        function preset(size, options) {
	
	            function getAttrs() {
	                var attrs = 'type="' + (options.type || 'text') + '"';
	
	                for (var attr in options.validators) {
	                    attrs += ' ' + attr + '="' + options.validators[attr] + '"';
	                }
	
	                return attrs;
	            }
	
	            return {
	                controller: ['$element', '$q', 'save', '$scope', function($element, $q, save, $scope) {
	                    function update() {
	                        if ($scope.editDialog.$invalid) {
	                            return $q.reject();
	                        }
	
	                        if (angular.isFunction(save)) {
	                            return $q.when(save($scope.editDialog.input));
	                        }
	
	                        return $q.resolve();
	                    }
	
	                    this.dismiss = function() {
	                        $element.remove();
	                    };
	
	                    this.getInput = function() {
	                        return $scope.editDialog.input;
	                    };
	
	                    $scope.dismiss = this.dismiss;
	
	                    $scope.submit = function() {
	                        update().then(function() {
	                            $scope.dismiss();
	                        });
	                    };
	                }],
	                locals: {
	                    save: options.save
	                },
	                scope: {
	                    cancel: options.cancel || 'Cancel',
	                    messages: options.messages,
	                    model: options.modelValue,
	                    ok: options.ok || 'Save',
	                    placeholder: options.placeholder,
	                    title: options.title,
	                    size: size
	                },
	                template: '<md-edit-dialog>' +
	                    '<div layout="column" class="md-content">' +
	                    '<div ng-if="size === \'large\'" class="md-title">{{title || \'Edit\'}}</div>' +
	                    '<form name="editDialog" layout="column" ng-submit="submit(model)">' +
	                    '<md-input-container md-no-float>' +
	                    '<input name="input" ng-model="model" md-autofocus placeholder="{{placeholder}} "' + getAttrs() + '>' +
	                    '<div ng-messages="editDialog.input.$error">' +
	                    '<div ng-repeat="(key, message) in messages" ng-message="{{key}}">{{message}}</div>' +
	                    '</div>' +
	                    '</md-input-container>' +
	                    '</form>' +
	                    '</div>' +
	                    '<div ng-if="size === \'large\'" layout="row" layout-align="end" class="md-actions">' +
	                    '<md-button class="md-primary" ng-click="dismiss()">{{cancel}}</md-button>' +
	                    '<md-button class="md-primary" ng-click="submit()">{{ok}}</md-button>' +
	                    '</div>' +
	                    '</md-edit-dialog>'
	            };
	        }
	
	        this.show = function(options) {
	            if (busy) {
	                return $q.reject();
	            }
	
	            busy = true;
	            options = angular.extend({}, defaultOptions, options);
	
	            if (!options.targetEvent) {
	                return logError('options.targetEvent is required to align the dialog with the table cell.');
	            }
	
	            if (!options.targetEvent.currentTarget.classList.contains('md-cell')) {
	                return logError('The event target must be a table cell.');
	            }
	
	            if (options.bindToController && !options.controllerAs) {
	                return logError('You must define options.controllerAs when options.bindToController is true.');
	            }
	
	            options.target = options.targetEvent.currentTarget;
	
	            var promise = getTemplate(options);
	            var promises = [promise];
	
	            for (var prop in options.resolve) {
	                promise = options.resolve[prop];
	                promises.push($q.when(angular.isFunction(promise) ? promise() : promise));
	            }
	
	            promise = $q.all(promises);
	
	            promise['catch'](logError);
	
	            return promise.then(function(results) {
	                var template = results.shift();
	
	                for (var prop in options.resolve) {
	                    options.resolve[prop] = results.shift();
	                }
	
	                return build(template, options);
	            });
	        };
	
	        this.small = function(options) {
	            return this.show(angular.extend({}, options, preset('small', options)));
	        }.bind(this);
	
	        this.large = function(options) {
	            return this.show(angular.extend({}, options, preset('large', options)));
	        }.bind(this);
	
	        return this;
	    }
	
	    mdEditDialog.$inject = ['$compile', '$controller', '$document', '$mdUtil', '$q', '$rootScope', '$templateCache', '$templateRequest', '$window'];
	
	
	    angular.module('md.data.table').directive('mdFoot', mdFoot);
	
	    function mdFoot() {
	
	        function compile(tElement) {
	            tElement.addClass('md-foot');
	        }
	
	        return {
	            compile: compile,
	            restrict: 'A'
	        };
	    }
	
	    angular.module('md.data.table').directive('mdHead', mdHead);
	
	    function mdHead($compile) {
	
	        function compile(tElement) {
	            tElement.addClass('md-head');
	            return postLink;
	        }
	
	        // empty controller to be bind scope properties to
	        function Controller() {
	
	        }
	
	        function postLink(scope, element, attrs, tableCtrl) {
	            // because scope.$watch is unpredictable
	            var oldValue = new Array(2);
	
	            function addCheckboxColumn() {
	                element.children().prepend('<th class="md-column md-checkbox-column">');
	            }
	
	            function attatchCheckbox() {
	                element.prop('lastElementChild').firstElementChild.appendChild($compile(createCheckBox())(scope)[0]);
	            }
	
	            function createCheckBox() {
	                return angular.element('<md-checkbox>').attr({
	                    'aria-label': 'Select All',
	                    'ng-click': 'toggleAll()',
	                    'ng-checked': 'allSelected()',
	                    'ng-disabled': '!getSelectableRows().length'
	                });
	            }
	
	            function detachCheckbox() {
	                var cell = element.prop('lastElementChild').firstElementChild;
	
	                if (cell.classList.contains('md-checkbox-column')) {
	                    angular.element(cell).empty();
	                }
	            }
	
	            function enableRowSelection() {
	                return tableCtrl.$$rowSelect;
	            }
	
	            function mdSelectCtrl(row) {
	                return angular.element(row).controller('mdSelect');
	            }
	
	            function removeCheckboxColumn() {
	                Array.prototype.some.call(element.find('th'), function(cell) {
	                    return cell.classList.contains('md-checkbox-column') && cell.remove();
	                });
	            }
	
	            scope.allSelected = function() {
	                var rows = scope.getSelectableRows();
	
	                return rows.length && rows.every(function(row) {
	                    return row.isSelected();
	                });
	            };
	
	            scope.getSelectableRows = function() {
	                return tableCtrl.getBodyRows().map(mdSelectCtrl).filter(function(ctrl) {
	                    return ctrl && !ctrl.disabled;
	                });
	            };
	
	            scope.selectAll = function() {
	                tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function(ctrl) {
	                    if (ctrl && !ctrl.isSelected()) {
	                        ctrl.select();
	                    }
	                });
	            };
	
	            scope.toggleAll = function() {
	                return scope.allSelected() ? scope.unSelectAll() : scope.selectAll();
	            };
	
	            scope.unSelectAll = function() {
	                tableCtrl.getBodyRows().map(mdSelectCtrl).forEach(function(ctrl) {
	                    if (ctrl && ctrl.isSelected()) {
	                        ctrl.deselect();
	                    }
	                });
	            };
	
	            scope.$watchGroup([enableRowSelection, tableCtrl.enableMultiSelect], function(newValue) {
	                if (newValue[0] !== oldValue[0]) {
	                    if (newValue[0]) {
	                        addCheckboxColumn();
	
	                        if (newValue[1]) {
	                            attatchCheckbox();
	                        }
	                    } else {
	                        removeCheckboxColumn();
	                    }
	                } else if (newValue[0] && newValue[1] !== oldValue[1]) {
	                    if (newValue[1]) {
	                        attatchCheckbox();
	                    } else {
	                        detachCheckbox();
	                    }
	                }
	
	                angular.copy(newValue, oldValue);
	            });
	        }
	
	        return {
	            bindToController: true,
	            compile: compile,
	            controller: Controller,
	            controllerAs: '$mdHead',
	            require: '^^mdTable',
	            restrict: 'A',
	            scope: {
	                order: '=?mdOrder',
	                onReorder: '=?mdOnReorder'
	            }
	        };
	    }
	
	    mdHead.$inject = ['$compile'];
	
	    angular.module('md.data.table').directive('mdRow', mdRow);
	
	    function mdRow() {
	
	        function compile(tElement) {
	            tElement.addClass('md-row');
	            return postLink;
	        }
	
	        function postLink(scope, element, attrs, tableCtrl) {
	            function enableRowSelection() {
	                return tableCtrl.$$rowSelect;
	            }
	
	            function isBodyRow() {
	                return tableCtrl.getBodyRows().indexOf(element[0]) !== -1;
	            }
	
	            function isChild(node) {
	                return element[0].contains(node[0]);
	            }
	
	            if (isBodyRow()) {
	                var cell = angular.element('<td class="md-cell">');
	
	                scope.$watch(enableRowSelection, function(enable) {
	                    // if a row is not selectable, prepend an empty cell to it
	                    if (enable && !attrs.mdSelect) {
	                        if (!isChild(cell)) {
	                            element.prepend(cell);
	                        }
	                        return;
	                    }
	
	                    if (isChild(cell)) {
	                        cell.remove();
	                    }
	                });
	            }
	        }
	
	        return {
	            compile: compile,
	            require: '^^mdTable',
	            restrict: 'A'
	        };
	    }
	
	    angular.module('md.data.table').directive('mdSelect', mdSelect);
	
	    function mdSelect($compile, $parse) {
	
	        // empty controller to bind scope properties to
	        function Controller() {
	
	        }
	
	        function postLink(scope, element, attrs, ctrls) {
	            var self = ctrls.shift();
	            var tableCtrl = ctrls.shift();
	            var getId = $parse(attrs.mdSelectId);
	
	            self.id = getId(self.model);
	
	            if (tableCtrl.$$rowSelect && self.id) {
	                if (tableCtrl.$$hash.has(self.id)) {
	                    var index = tableCtrl.selected.indexOf(tableCtrl.$$hash.get(self.id));
	
	                    // if the item is no longer selected remove it
	                    if (index === -1) {
	                        tableCtrl.$$hash.purge(self.id);
	                    }
	
	                    // if the item is not a reference to the current model update the reference
	                    else if (!tableCtrl.$$hash.equals(self.id, self.model)) {
	                        tableCtrl.$$hash.update(self.id, self.model);
	                        tableCtrl.selected.splice(index, 1, self.model);
	                    }
	
	                } else {
	
	                    // check if the item has been selected
	                    tableCtrl.selected.some(function(item, index) {
	                        if (getId(item) === self.id) {
	                            tableCtrl.$$hash.update(self.id, self.model);
	                            tableCtrl.selected.splice(index, 1, self.model);
	
	                            return true;
	                        }
	                    });
	                }
	            }
	
	            self.isSelected = function() {
	                if (!tableCtrl.$$rowSelect) {
	                    return false;
	                }
	
	                if (self.id) {
	                    return tableCtrl.$$hash.has(self.id);
	                }
	
	                return tableCtrl.selected.indexOf(self.model) !== -1;
	            };
	
	            self.select = function() {
	                if (self.disabled) {
	                    return;
	                }
	
	                if (tableCtrl.enableMultiSelect()) {
	                    tableCtrl.selected.push(self.model);
	                } else {
	                    tableCtrl.selected.splice(0, tableCtrl.selected.length, self.model);
	                }
	
	                if (angular.isFunction(self.onSelect)) {
	                    self.onSelect(self.model);
	                }
	            };
	
	            self.deselect = function() {
	                if (self.disabled) {
	                    return;
	                }
	
	                tableCtrl.selected.splice(tableCtrl.selected.indexOf(self.model), 1);
	
	                if (angular.isFunction(self.onDeselect)) {
	                    self.onDeselect(self.model);
	                }
	            };
	
	            self.toggle = function(event) {
	                if (event && event.stopPropagation) {
	                    event.stopPropagation();
	                }
	
	                return self.isSelected() ? self.deselect() : self.select();
	            };
	
	            function autoSelect() {
	                return attrs.mdAutoSelect === '' || self.autoSelect;
	            }
	
	            function createCheckbox() {
	                var checkbox = angular.element('<md-checkbox>').attr({
	                    'aria-label': 'Select Row',
	                    'ng-click': '$mdSelect.toggle($event)',
	                    'ng-checked': '$mdSelect.isSelected()',
	                    'ng-disabled': '$mdSelect.disabled'
	                });
	
	                return angular.element('<td class="md-cell md-checkbox-cell">').append($compile(checkbox)(scope));
	            }
	
	            function disableSelection() {
	                Array.prototype.some.call(element.children(), function(child) {
	                    return child.classList.contains('md-checkbox-cell') && element[0].removeChild(child);
	                });
	
	                if (autoSelect()) {
	                    element.off('click', toggle);
	                }
	            }
	
	            function enableSelection() {
	                element.prepend(createCheckbox());
	
	                if (autoSelect()) {
	                    element.on('click', toggle);
	                }
	            }
	
	            function enableRowSelection() {
	                return tableCtrl.$$rowSelect;
	            }
	
	            function onSelectChange(selected) {
	                if (!self.id) {
	                    return;
	                }
	
	                if (tableCtrl.$$hash.has(self.id)) {
	                    // check if the item has been deselected
	                    if (selected.indexOf(tableCtrl.$$hash.get(self.id)) === -1) {
	                        tableCtrl.$$hash.purge(self.id);
	                    }
	
	                    return;
	                }
	
	                // check if the item has been selected
	                if (selected.indexOf(self.model) !== -1) {
	                    tableCtrl.$$hash.update(self.id, self.model);
	                }
	            }
	
	            function toggle(event) {
	                scope.$applyAsync(function() {
	                    self.toggle(event);
	                });
	            }
	
	            scope.$watch(enableRowSelection, function(enable) {
	                if (enable) {
	                    enableSelection();
	                } else {
	                    disableSelection();
	                }
	            });
	
	            scope.$watch(autoSelect, function(newValue, oldValue) {
	                if (newValue === oldValue) {
	                    return;
	                }
	
	                if (tableCtrl.$$rowSelect && newValue) {
	                    element.on('click', toggle);
	                } else {
	                    element.off('click', toggle);
	                }
	            });
	
	            scope.$watch(self.isSelected, function(isSelected) {
	                return isSelected ? element.addClass('md-selected') : element.removeClass('md-selected');
	            });
	
	            scope.$watch(tableCtrl.enableMultiSelect, function(multiple) {
	                if (tableCtrl.$$rowSelect && !multiple) {
	                    // remove all but the first selected item
	                    tableCtrl.selected.splice(1);
	                }
	            });
	
	            tableCtrl.registerModelChangeListener(onSelectChange);
	
	            element.on('$destroy', function() {
	                tableCtrl.removeModelChangeListener(onSelectChange);
	            });
	        }
	
	        return {
	            bindToController: true,
	            controller: Controller,
	            controllerAs: '$mdSelect',
	            link: postLink,
	            require: ['mdSelect', '^^mdTable'],
	            restrict: 'A',
	            scope: {
	                model: '=mdSelect',
	                disabled: '=ngDisabled',
	                onSelect: '=?mdOnSelect',
	                onDeselect: '=?mdOnDeselect',
	                autoSelect: '=mdAutoSelect'
	            }
	        };
	    }
	
	    mdSelect.$inject = ['$compile', '$parse'];
	
	    angular.module('md.data.table').directive('mdTable', mdTable);
	
	    function Hash() {
	        var keys = {};
	
	        this.equals = function(key, item) {
	            return keys[key] === item;
	        };
	
	        this.get = function(key) {
	            return keys[key];
	        };
	
	        this.has = function(key) {
	            return keys.hasOwnProperty(key);
	        };
	
	        this.purge = function(key) {
	            delete keys[key];
	        };
	
	        this.update = function(key, item) {
	            keys[key] = item;
	        };
	    }
	
	    function mdTable() {
	
	        function compile(tElement, tAttrs) {
	            tElement.addClass('md-table');
	
	            if (tAttrs.hasOwnProperty('mdProgress')) {
	                var body = tElement.find('tbody')[0];
	                var progress = angular.element('<thead class="md-table-progress" md-table-progress>');
	
	                if (body) {
	                    tElement[0].insertBefore(progress[0], body);
	                }
	            }
	        }
	
	        function Controller($attrs, $element, $q, $scope) {
	            var self = this;
	            var queue = [];
	            var watchListener;
	            var modelChangeListeners = [];
	
	            self.$$hash = new Hash();
	            self.$$columns = {};
	
	            function enableRowSelection() {
	                self.$$rowSelect = true;
	
	                watchListener = $scope.$watchCollection('$mdTable.selected', function(selected) {
	                    modelChangeListeners.forEach(function(listener) {
	                        listener(selected);
	                    });
	                });
	
	                $element.addClass('md-row-select');
	            }
	
	            function disableRowSelection() {
	                self.$$rowSelect = false;
	
	                if (angular.isFunction(watchListener)) {
	                    watchListener();
	                }
	
	                $element.removeClass('md-row-select');
	            }
	
	            function resolvePromises() {
	                if (!queue.length) {
	                    return $scope.$applyAsync();
	                }
	
	                queue[0]['finally'](function() {
	                    queue.shift();
	                    resolvePromises();
	                });
	            }
	
	            function rowSelect() {
	                return $attrs.mdRowSelect === '' || self.rowSelect;
	            }
	
	            function validateModel() {
	                if (!self.selected) {
	                    return console.error('Row selection: ngModel is not defined.');
	                }
	
	                if (!angular.isArray(self.selected)) {
	                    return console.error('Row selection: Expected an array. Recived ' + typeof self.selected + '.');
	                }
	
	                return true;
	            }
	
	            self.columnCount = function() {
	                return self.getRows($element[0]).reduce(function(count, row) {
	                    return row.cells.length > count ? row.cells.length : count;
	                }, 0);
	            };
	
	            self.getRows = function(element) {
	                return Array.prototype.filter.call(element.rows, function(row) {
	                    return !row.classList.contains('ng-leave');
	                });
	            };
	
	            self.getBodyRows = function() {
	                return Array.prototype.reduce.call($element.prop('tBodies'), function(result, tbody) {
	                    return result.concat(self.getRows(tbody));
	                }, []);
	            };
	
	            self.getElement = function() {
	                return $element;
	            };
	
	            self.getHeaderRows = function() {
	                return self.getRows($element.prop('tHead'));
	            };
	
	            self.enableMultiSelect = function() {
	                return $attrs.multiple === '' || $scope.$eval($attrs.multiple);
	            };
	
	            self.waitingOnPromise = function() {
	                return !!queue.length;
	            };
	
	            self.queuePromise = function(promise) {
	                if (!promise) {
	                    return;
	                }
	
	                if (queue.push(angular.isArray(promise) ? $q.all(promise) : $q.when(promise)) === 1) {
	                    resolvePromises();
	                }
	            };
	
	            self.registerModelChangeListener = function(listener) {
	                modelChangeListeners.push(listener);
	            };
	
	            self.removeModelChangeListener = function(listener) {
	                var index = modelChangeListeners.indexOf(listener);
	
	                if (index !== -1) {
	                    modelChangeListeners.splice(index, 1);
	                }
	            };
	
	            if ($attrs.hasOwnProperty('mdProgress')) {
	                $scope.$watch('$mdTable.progress', self.queuePromise);
	            }
	
	            $scope.$watch(rowSelect, function(enable) {
	                if (enable && !!validateModel()) {
	                    enableRowSelection();
	                } else {
	                    disableRowSelection();
	                }
	            });
	        }
	
	        Controller.$inject = ['$attrs', '$element', '$q', '$scope'];
	
	        return {
	            bindToController: true,
	            compile: compile,
	            controller: Controller,
	            controllerAs: '$mdTable',
	            restrict: 'A',
	            scope: {
	                progress: '=?mdProgress',
	                selected: '=ngModel',
	                rowSelect: '=mdRowSelect'
	            }
	        };
	    }
	
	    angular.module('md.data.table').directive('mdTablePagination', mdTablePagination);
	
	    function mdTablePagination() {
	
	        function compile(tElement) {
	            tElement.addClass('md-table-pagination');
	        }
	
	        function Controller($attrs, $mdUtil, $scope) {
	            var self = this;
	            var defaultLabel = {
	                page: 'Page:',
	                rowsPerPage: 'Rows per page:',
	                of: 'of'
	            };
	
	            self.label = angular.copy(defaultLabel);
	
	            function isPositive(number) {
	                return parseInt(number, 10) > 0;
	            }
	
	            self.eval = function(expression) {
	                return $scope.$eval(expression);
	            };
	
	            self.first = function() {
	                self.page = 1;
	                self.onPaginationChange();
	            };
	
	            self.hasNext = function() {
	                return self.page * self.limit < self.total;
	            };
	
	            self.hasPrevious = function() {
	                return self.page > 1;
	            };
	
	            self.last = function() {
	                self.page = self.pages();
	                self.onPaginationChange();
	            };
	
	            self.max = function() {
	                return self.hasNext() ? self.page * self.limit : self.total;
	            };
	
	            self.min = function() {
	                return isPositive(self.total) ? self.page * self.limit - self.limit + 1 : 0;
	            };
	
	            self.next = function() {
	                self.page++;
	                self.onPaginationChange();
	            };
	
	            self.onPaginationChange = function() {
	                if (angular.isFunction(self.onPaginate)) {
	                    $mdUtil.nextTick(function() {
	                        self.onPaginate(self.page, self.limit);
	                    });
	                }
	            };
	
	            self.pages = function() {
	                return isPositive(self.total) ? Math.ceil(self.total / (isPositive(self.limit) ? self.limit : 1)) : 1;
	            };
	
	            self.previous = function() {
	                self.page--;
	                self.onPaginationChange();
	            };
	
	            self.showBoundaryLinks = function() {
	                return $attrs.mdBoundaryLinks === '' || self.boundaryLinks;
	            };
	
	            self.showPageSelect = function() {
	                return $attrs.mdPageSelect === '' || self.pageSelect;
	            };
	
	            $scope.$watch('$pagination.limit', function(newValue, oldValue) {
	                if (isNaN(newValue) || isNaN(oldValue) || newValue === oldValue) {
	                    return;
	                }
	
	                // find closest page from previous min
	                self.page = Math.floor(((self.page * oldValue - oldValue) + newValue) / (isPositive(newValue) ? newValue : 1));
	                self.onPaginationChange();
	            });
	
	            $attrs.$observe('mdLabel', function(label) {
	                angular.extend(self.label, defaultLabel, $scope.$eval(label));
	            });
	
	            $scope.$watch('$pagination.total', function(newValue, oldValue) {
	                if (isNaN(newValue) || newValue === oldValue) {
	                    return;
	                }
	
	                if (self.page > self.pages()) {
	                    self.last();
	                }
	            });
	        }
	
	        Controller.$inject = ['$attrs', '$mdUtil', '$scope'];
	
	        return {
	            bindToController: {
	                boundaryLinks: '=?mdBoundaryLinks',
	                disabled: '=ngDisabled',
	                limit: '=mdLimit',
	                page: '=mdPage',
	                pageSelect: '=?mdPageSelect',
	                onPaginate: '=?mdOnPaginate',
	                limitOptions: '=?mdLimitOptions',
	                total: '@mdTotal'
	            },
	            compile: compile,
	            controller: Controller,
	            controllerAs: '$pagination',
	            restrict: 'E',
	            scope: {},
	            templateUrl: 'md-table-pagination.html'
	        };
	    }
	
	    angular.module('md.data.table').directive('mdTableProgress', mdTableProgress);
	
	    function mdTableProgress() {
	
	        function postLink(scope, element, attrs, tableCtrl) {
	            scope.columnCount = tableCtrl.columnCount;
	            scope.deferred = tableCtrl.waitingOnPromise;
	        }
	
	        return {
	            link: postLink,
	            require: '^^mdTable',
	            restrict: 'A',
	            scope: {},
	            templateUrl: 'md-table-progress.html'
	        };
	    }
	
	    angular.module('md.data.table').directive('virtualPageSelect', virtualPageSelect);
	
	    function virtualPageSelect() {
	
	        function Controller($element, $scope) {
	            var self = this;
	            var content = $element.find('md-content');
	
	            self.pages = [];
	
	            function getMin(pages, total) {
	                return Math.min(pages, isFinite(total) && isPositive(total) ? total : 1);
	            }
	
	            function isPositive(number) {
	                return number > 0;
	            }
	
	            function setPages(max) {
	                if (self.pages.length > max) {
	                    return self.pages.splice(max);
	                }
	
	                for (var i = self.pages.length; i < max; i++) {
	                    self.pages.push(i + 1);
	                }
	            }
	
	            content.on('scroll', function() {
	                if ((content.prop('clientHeight') + content.prop('scrollTop')) >= content.prop('scrollHeight')) {
	                    $scope.$applyAsync(function() {
	                        setPages(getMin(self.pages.length + 10, self.total));
	                    });
	                }
	            });
	
	            $scope.$watch('$pageSelect.total', function(total) {
	                setPages(getMin(Math.max(self.pages.length, 10), total));
	            });
	
	            $scope.$watch('$pagination.page', function(page) {
	                for (var i = self.pages.length; i < page; i++) {
	                    self.pages.push(i + 1);
	                }
	            });
	        }
	
	        Controller.$inject = ['$element', '$scope'];
	
	        return {
	            bindToController: {
	                total: '@'
	            },
	            controller: Controller,
	            controllerAs: '$pageSelect'
	        };
	    }
	
	})(window, angular);

/***/ },

/***/ 221:
/***/ function(module, exports) {

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */
	
	module.exports = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;
	
	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }
	
	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }
	
	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }
	
	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};


/***/ },

/***/ 222:
/***/ function(module, exports) {

	
	/**
	 * Expose `Backoff`.
	 */
	
	module.exports = Backoff;
	
	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}
	
	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */
	
	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};
	
	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */
	
	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};
	
	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};
	
	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */
	
	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};
	
	/**
	 * Set the jitter
	 *
	 * @api public
	 */
	
	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};
	


/***/ },

/***/ 223:
/***/ function(module, exports) {

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(){
	  "use strict";
	
	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	
	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }
	
	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";
	
	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }
	
	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }
	
	    return base64;
	  };
	
	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;
	
	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }
	
	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);
	
	    for (i = 0; i < len; i+=4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i+1)];
	      encoded3 = lookup[base64.charCodeAt(i+2)];
	      encoded4 = lookup[base64.charCodeAt(i+3)];
	
	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }
	
	    return arraybuffer;
	  };
	})();


/***/ },

/***/ 224:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Create a blob builder even when vendor prefixes exist
	 */
	
	var BlobBuilder = global.BlobBuilder
	  || global.WebKitBlobBuilder
	  || global.MSBlobBuilder
	  || global.MozBlobBuilder;
	
	/**
	 * Check if Blob constructor is supported
	 */
	
	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();
	
	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */
	
	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();
	
	/**
	 * Check if BlobBuilder is supported
	 */
	
	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;
	
	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */
	
	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;
	
	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }
	
	      ary[i] = buf;
	    }
	  }
	}
	
	function BlobBuilderConstructor(ary, options) {
	  options = options || {};
	
	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);
	
	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }
	
	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	};
	
	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};
	
	module.exports = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".sidenav-80 {\n  width: 80%;\n  max-width: 80%; }\n\n.sidenav-100 {\n  width: 100%;\n  max-width: 100%; }\n", ""]);
	
	// exports


/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".link {\n  fill: none;\n  stroke: #666;\n  stroke-width: 1.5px; }\n\n#licensing {\n  fill: green; }\n\n.link.licensing {\n  stroke: green; }\n\n.link.resolved {\n  stroke-dasharray: 0, 2 1; }\n\n.md-cell {\n  white-space: nowrap; }\n\n.md-table-toolbar {\n  background-color: transparent !important; }\n", ""]);
	
	// exports


/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(292);
	
	/**
	 * The currently active debug mode names, and names to skip.
	 */
	
	exports.names = [];
	exports.skips = [];
	
	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */
	
	exports.formatters = {};
	
	/**
	 * Previously assigned color.
	 */
	
	var prevColor = 0;
	
	/**
	 * Previous log timestamp.
	 */
	
	var prevTime;
	
	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */
	
	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}
	
	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */
	
	function debug(namespace) {
	
	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;
	
	  // define the `enabled` version
	  function enabled() {
	
	    var self = enabled;
	
	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;
	
	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();
	
	    var args = Array.prototype.slice.call(arguments);
	
	    args[0] = exports.coerce(args[0]);
	
	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }
	
	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);
	
	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });
	
	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;
	
	  var fn = exports.enabled(namespace) ? enabled : disabled;
	
	  fn.namespace = namespace;
	
	  return fn;
	}
	
	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */
	
	function enable(namespaces) {
	  exports.save(namespaces);
	
	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	function disable() {
	  exports.enable('');
	}
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(235);


/***/ },

/***/ 235:
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(236);
	
	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(14);


/***/ },

/***/ 236:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var transports = __webpack_require__(37);
	var Emitter = __webpack_require__(13);
	var debug = __webpack_require__(8)('engine.io-client:socket');
	var index = __webpack_require__(40);
	var parser = __webpack_require__(14);
	var parseuri = __webpack_require__(150);
	var parsejson = __webpack_require__(298);
	var parseqs = __webpack_require__(29);
	
	/**
	 * Module exports.
	 */
	
	module.exports = Socket;
	
	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */
	
	function Socket (uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);
	
	  opts = opts || {};
	
	  if (uri && 'object' === typeof uri) {
	    opts = uri;
	    uri = null;
	  }
	
	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }
	
	  this.secure = null != opts.secure ? opts.secure
	    : (global.location && 'https:' === location.protocol);
	
	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }
	
	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port
	      ? location.port
	      : (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;
	
	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? null : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;
	
	  // other options for Node.js client
	  var freeGlobal = typeof global === 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }
	
	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }
	
	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;
	
	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;
	
	  this.open();
	}
	
	Socket.priorWebsocketSuccess = false;
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Socket.prototype);
	
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	Socket.protocol = parser.protocol; // this is an int
	
	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */
	
	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(27);
	Socket.transports = __webpack_require__(37);
	Socket.parser = __webpack_require__(14);
	
	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */
	
	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);
	
	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;
	
	  // transport name
	  query.transport = name;
	
	  // session id if we already have one
	  if (this.id) query.sid = this.id;
	
	  var transport = new transports[name]({
	    agent: this.agent,
	    hostname: this.hostname,
	    port: this.port,
	    secure: this.secure,
	    path: this.path,
	    query: query,
	    forceJSONP: this.forceJSONP,
	    jsonp: this.jsonp,
	    forceBase64: this.forceBase64,
	    enablesXDR: this.enablesXDR,
	    timestampRequests: this.timestampRequests,
	    timestampParam: this.timestampParam,
	    policyPort: this.policyPort,
	    socket: this,
	    pfx: this.pfx,
	    key: this.key,
	    passphrase: this.passphrase,
	    cert: this.cert,
	    ca: this.ca,
	    ciphers: this.ciphers,
	    rejectUnauthorized: this.rejectUnauthorized,
	    perMessageDeflate: this.perMessageDeflate,
	    extraHeaders: this.extraHeaders,
	    forceNode: this.forceNode,
	    localAddress: this.localAddress
	  });
	
	  return transport;
	};
	
	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}
	
	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';
	
	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }
	
	  transport.open();
	  this.setTransport(transport);
	};
	
	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */
	
	Socket.prototype.setTransport = function (transport) {
	  debug('setting transport %s', transport.name);
	  var self = this;
	
	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }
	
	  // set up transport
	  this.transport = transport;
	
	  // set up transport listeners
	  transport
	  .on('drain', function () {
	    self.onDrain();
	  })
	  .on('packet', function (packet) {
	    self.onPacket(packet);
	  })
	  .on('error', function (e) {
	    self.onError(e);
	  })
	  .on('close', function () {
	    self.onClose('transport close');
	  });
	};
	
	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */
	
	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;
	
	  Socket.priorWebsocketSuccess = false;
	
	  function onTransportOpen () {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;
	
	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;
	
	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug('changing transport and sending upgrade packet');
	
	          cleanup();
	
	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }
	
	  function freezeTransport () {
	    if (failed) return;
	
	    // Any callback called by transport should be ignored since now
	    failed = true;
	
	    cleanup();
	
	    transport.close();
	    transport = null;
	  }
	
	  // Handle any error that happens while probing
	  function onerror (err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;
	
	    freezeTransport();
	
	    debug('probe transport "%s" failed because of error: %s', name, err);
	
	    self.emit('upgradeError', error);
	  }
	
	  function onTransportClose () {
	    onerror('transport closed');
	  }
	
	  // When the socket is closed while we're probing
	  function onclose () {
	    onerror('socket closed');
	  }
	
	  // When the socket is upgraded while we're probing
	  function onupgrade (to) {
	    if (transport && to.name !== transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }
	
	  // Remove all listeners on the transport and on self
	  function cleanup () {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }
	
	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);
	
	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);
	
	  transport.open();
	};
	
	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */
	
	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();
	
	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};
	
	/**
	 * Handles a packet.
	 *
	 * @api private
	 */
	
	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState ||
	      'closing' === this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
	
	    this.emit('packet', packet);
	
	    // Socket is live - any packet counts
	    this.emit('heartbeat');
	
	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(parsejson(packet.data));
	        break;
	
	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;
	
	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;
	
	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};
	
	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */
	
	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();
	
	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};
	
	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */
	
	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};
	
	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};
	
	/**
	* Sends a ping packet.
	*
	* @api private
	*/
	
	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};
	
	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */
	
	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);
	
	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;
	
	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};
	
	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */
	
	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};
	
	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */
	
	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};
	
	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */
	
	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }
	
	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }
	
	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }
	
	  options = options || {};
	  options.compress = false !== options.compress;
	
	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};
	
	/**
	 * Closes the connection.
	 *
	 * @api private
	 */
	
	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';
	
	    var self = this;
	
	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }
	
	  function close () {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }
	
	  function cleanupAndClose () {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }
	
	  function waitForUpgrade () {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }
	
	  return this;
	};
	
	/**
	 * Called upon transport error
	 *
	 * @api private
	 */
	
	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};
	
	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */
	
	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;
	
	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);
	
	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');
	
	    // ensure transport won't stay open
	    this.transport.close();
	
	    // ignore further transport communication
	    this.transport.removeAllListeners();
	
	    // set ready state
	    this.readyState = 'closed';
	
	    // clear session id
	    this.id = null;
	
	    // emit close event
	    this.emit('close', reason, desc);
	
	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};
	
	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */
	
	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 237:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module requirements.
	 */
	
	var Polling = __webpack_require__(38);
	var inherit = __webpack_require__(21);
	
	/**
	 * Module exports.
	 */
	
	module.exports = JSONPPolling;
	
	/**
	 * Cached regular expressions.
	 */
	
	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;
	
	/**
	 * Global JSONP callbacks.
	 */
	
	var callbacks;
	
	/**
	 * Noop.
	 */
	
	function empty () { }
	
	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */
	
	function JSONPPolling (opts) {
	  Polling.call(this, opts);
	
	  this.query = this.query || {};
	
	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }
	
	  // callback identifier
	  this.index = callbacks.length;
	
	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });
	
	  // append to query string
	  this.query.j = this.index;
	
	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(JSONPPolling, Polling);
	
	/*
	 * JSONP only supports binary as base64 encoded strings
	 */
	
	JSONPPolling.prototype.supportsBinary = false;
	
	/**
	 * Closes the socket.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }
	
	  Polling.prototype.doClose.call(this);
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');
	
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }
	
	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };
	
	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;
	
	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);
	
	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};
	
	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;
	
	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;
	
	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);
	
	    this.form = form;
	    this.area = area;
	  }
	
	  this.form.action = this.uri();
	
	  function complete () {
	    initIframe();
	    fn();
	  }
	
	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }
	
	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }
	
	    iframe.id = self.iframeId;
	
	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }
	
	  initIframe();
	
	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');
	
	  try {
	    this.form.submit();
	  } catch (e) {}
	
	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 238:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module requirements.
	 */
	
	var XMLHttpRequest = __webpack_require__(28);
	var Polling = __webpack_require__(38);
	var Emitter = __webpack_require__(13);
	var inherit = __webpack_require__(21);
	var debug = __webpack_require__(8)('engine.io-client:polling-xhr');
	
	/**
	 * Module exports.
	 */
	
	module.exports = XHR;
	module.exports.Request = Request;
	
	/**
	 * Empty function
	 */
	
	function empty () {}
	
	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */
	
	function XHR (opts) {
	  Polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;
	
	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;
	
	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }
	
	    this.xd = opts.hostname !== global.location.hostname ||
	      port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  } else {
	    this.extraHeaders = opts.extraHeaders;
	  }
	}
	
	/**
	 * Inherits from Polling.
	 */
	
	inherit(XHR, Polling);
	
	/**
	 * XHR supports binary
	 */
	
	XHR.prototype.supportsBinary = true;
	
	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */
	
	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;
	
	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;
	
	  return new Request(opts);
	};
	
	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */
	
	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};
	
	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */
	
	XHR.prototype.doPoll = function () {
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};
	
	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */
	
	function Request (opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;
	
	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	
	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	
	  this.create();
	}
	
	/**
	 * Mix in `Emitter`.
	 */
	
	Emitter(Request.prototype);
	
	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */
	
	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	
	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;
	
	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}
	    if (this.supportsBinary) {
	      // This has to be done after open because Firefox is stupid
	      // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
	      xhr.responseType = 'arraybuffer';
	    }
	
	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }
	
	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}
	
	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }
	
	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }
	
	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }
	
	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }
	
	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};
	
	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */
	
	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};
	
	/**
	 * Called if we have data.
	 *
	 * @api private
	 */
	
	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};
	
	/**
	 * Called upon error.
	 *
	 * @api private
	 */
	
	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};
	
	/**
	 * Cleans up house.
	 *
	 * @api private
	 */
	
	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }
	
	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }
	
	  if (global.document) {
	    delete Request.requests[this.index];
	  }
	
	  this.xhr = null;
	};
	
	/**
	 * Called upon load.
	 *
	 * @api private
	 */
	
	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      if (!this.supportsBinary) {
	        data = this.xhr.responseText;
	      } else {
	        try {
	          data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
	        } catch (e) {
	          var ui8Arr = new Uint8Array(this.xhr.response);
	          var dataArray = [];
	          for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
	            dataArray.push(ui8Arr[idx]);
	          }
	
	          data = String.fromCharCode.apply(null, dataArray);
	        }
	      }
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};
	
	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */
	
	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};
	
	/**
	 * Aborts the request.
	 *
	 * @api public
	 */
	
	Request.prototype.abort = function () {
	  this.cleanup();
	};
	
	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */
	
	Request.requestsCount = 0;
	Request.requests = {};
	
	if (global.document) {
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}
	
	function unloadHandler () {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 239:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Module dependencies.
	 */
	
	var Transport = __webpack_require__(27);
	var parser = __webpack_require__(14);
	var parseqs = __webpack_require__(29);
	var inherit = __webpack_require__(21);
	var yeast = __webpack_require__(171);
	var debug = __webpack_require__(8)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = __webpack_require__(409);
	  } catch (e) { }
	}
	
	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */
	
	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  WebSocket = NodeWebSocket;
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = WS;
	
	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */
	
	function WS (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket = NodeWebSocket;
	  }
	  Transport.call(this, opts);
	}
	
	/**
	 * Inherits from Transport.
	 */
	
	inherit(WS, Transport);
	
	/**
	 * Transport name.
	 *
	 * @api public
	 */
	
	WS.prototype.name = 'websocket';
	
	/*
	 * WebSockets support binary
	 */
	
	WS.prototype.supportsBinary = true;
	
	/**
	 * Opens socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }
	
	  var uri = this.uri();
	  var protocols = void (0);
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };
	
	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }
	
	  try {
	    this.ws = this.usingBrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }
	
	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }
	
	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }
	
	  this.addEventListeners();
	};
	
	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */
	
	WS.prototype.addEventListeners = function () {
	  var self = this;
	
	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};
	
	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */
	
	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	
	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      parser.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }
	
	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }
	
	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug('websocket closed before onclose event');
	        }
	
	        --total || done();
	      });
	    })(packets[i]);
	  }
	
	  function done () {
	    self.emit('flush');
	
	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};
	
	/**
	 * Called upon close
	 *
	 * @api private
	 */
	
	WS.prototype.onClose = function () {
	  Transport.prototype.onClose.call(this);
	};
	
	/**
	 * Closes socket.
	 *
	 * @api private
	 */
	
	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};
	
	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */
	
	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';
	
	  // avoid port if default for schema
	  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
	    ('ws' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }
	
	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }
	
	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }
	
	  query = parseqs.encode(query);
	
	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }
	
	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};
	
	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */
	
	WS.prototype.check = function () {
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 240:
/***/ function(module, exports) {

	
	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */
	
	module.exports = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;
	
	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};


/***/ },

/***/ 244:
/***/ function(module, exports) {

	
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */
	
	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}


/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-sidenav md-component-id=\"executeCmdRight\" layout=\"column\" md-whiteframe=\"4\" md-is-open=\"executeCmdCtl.isOpen\" class=\"sidenav-100 md-sidenav-right\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-content flex layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-toolbar layout=\"row\" class=\"md-table-toolbar md-hue-3\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<div class=\"md-toolbar-tools\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<span flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
	buf.push("执行结果");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-button ng-click=\"executeCmdCtl.isOpen=false;\" class=\"md-icon-button\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<ng-md-icon icon=\"arrow_forward\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-toolbar>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-content flex layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-progress-linear ng-if=\"!executeCmdCtl.process.fail\" md-mode=\"buffer\" value=\"{{executeCmdCtl.process.complete}}\" md-buffer-value=\"{{executeCmdCtl.process.buffer}}\" class=\"md-accent\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-progress-linear>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-progress-linear ng-if=\"executeCmdCtl.process.fail\" md-mode=\"buffer\" value=\"{{executeCmdCtl.process.complete}}\" md-buffer-value=\"{{executeCmdCtl.process.buffer}}\" class=\"md-warn\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-progress-linear>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 13, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<div layout=\"row\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-title flex=\"none\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 16, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-title-text>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 17, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<span class=\"md-headline\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 17, jade_debug[0].filename ));
	buf.push("命令详情({{executeCmdCtl.command.key}})");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-title-text>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 18, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-title-media>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-card-title-media>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-title>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 19, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-content layout=\"column\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 20, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<h3>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 20, jade_debug[0].filename ));
	buf.push("命令说明：{{ executeCmdCtl.command.title }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</h3>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 21, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<h4>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 21, jade_debug[0].filename ));
	buf.push("命令：{{ executeCmdCtl.command.cmd }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</h4>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 22, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<p>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 22, jade_debug[0].filename ));
	buf.push("参数：{{ executeCmdCtl.command.args }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</p>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 23, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<p>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 23, jade_debug[0].filename ));
	buf.push("主机数量：{{ executeCmdCtl.process.total }}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</p>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 25, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 25, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 26, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-content layout=\"row\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 27, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<div ng-if=\"executeCmdCtl.jid\" fx-list-action key=\"{{executeCmdCtl.listKey}}\" selected=\"executeCmdCtl.deviceSelected\" flex multiple=\"true\" auto-select=\"true\" res-filter=\"executeCmdCtl.resFilter\" client-data=\"executeCmdCtl.cmdResClientData\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 28, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card flex=\"50\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 29, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-title flex=\"none\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 30, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-title-text>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 31, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<span class=\"md-headline\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 31, jade_debug[0].filename ));
	buf.push("结果反馈");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-title-text>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 32, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-title>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 33, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-card-content layout=\"column\" flex style=\"overflow:auto;\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 34, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-list flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 35, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<md-list-item ng-repeat=\"item in executeCmdCtl.deviceSelected\" class=\"md-3-line\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 36, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<div layout=\"column\" class=\"md-list-item-text\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 37, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<h2>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 37, jade_debug[0].filename ));
	buf.push("{{item._source.id}} -- {{item._source.deviceSn}}");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</h2>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 38, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	buf.push("<div angular-terminal=\"item._source.deviceSn\" greetings=\"{{item._source.return||'no info'}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-list-item>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-list>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 50, "/srv/blessing/public/src/directives/execute/tpls/execute.cmd.tmp.jade" ));
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-sidenav>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-sidenav.sidenav-100.md-sidenav-right(md-component-id=\"executeCmdRight\",layout=\"column\",md-whiteframe=\"4\",md-is-open=\"executeCmdCtl.isOpen\")\n    md-content(flex,layout=\"column\")\n        md-toolbar.md-table-toolbar.md-hue-3(layout=\"row\")\n            div.md-toolbar-tools\n                span(flex) 执行结果\n                md-button.md-icon-button(ng-click=\"executeCmdCtl.isOpen=false;\")\n                    md-icon\n                        ng-md-icon(icon=\"arrow_forward\")\n        md-divider\n        md-content(flex,layout=\"column\")\n            md-progress-linear.md-accent(ng-if=\"!executeCmdCtl.process.fail\",md-mode=\"buffer\",value=\"{{executeCmdCtl.process.complete}}\",md-buffer-value=\"{{executeCmdCtl.process.buffer}}\")\n            md-progress-linear.md-warn(ng-if=\"executeCmdCtl.process.fail\",md-mode=\"buffer\",value=\"{{executeCmdCtl.process.complete}}\",md-buffer-value=\"{{executeCmdCtl.process.buffer}}\")\n            div(layout=\"row\",flex)\n                md-card\n                    md-card-title(flex=\"none\")\n                        md-card-title-text\n                            span.md-headline 命令详情({{executeCmdCtl.command.key}})\n                        md-card-title-media\n                    md-card-content(layout=\"column\",flex)\n                        h3 命令说明：{{ executeCmdCtl.command.title }}\n                        h4 命令：{{ executeCmdCtl.command.cmd }}\n                        p 参数：{{ executeCmdCtl.command.args }}\n                        p 主机数量：{{ executeCmdCtl.process.total }}\n                        //- span {{executeCmdCtl.process | json}}\n                md-card(flex)\n                    md-card-content(layout=\"row\",flex)\n                        div(ng-if=\"executeCmdCtl.jid\",fx-list-action,key=\"{{executeCmdCtl.listKey}}\",selected=\"executeCmdCtl.deviceSelected\",flex,multiple=\"true\",auto-select=\"true\",res-filter=\"executeCmdCtl.resFilter\",client-data=\"executeCmdCtl.cmdResClientData\")\n                md-card(flex=\"50\")\n                    md-card-title(flex=\"none\")\n                        md-card-title-text\n                            span.md-headline 结果反馈\n                        md-divider\n                    md-card-content(layout=\"column\",flex,style=\"overflow:auto;\")\n                        md-list(flex)\n                            md-list-item.md-3-line(ng-repeat=\"item in executeCmdCtl.deviceSelected\")\n                                div.md-list-item-text(layout=\"column\")\n                                    h2 {{item._source.id}} -- {{item._source.deviceSn}}\n                                    div(angular-terminal=\"item._source.deviceSn\",greetings=\"{{item._source.return||'no info'}}\")\n            //- md-content(flex)\n                //- md-card(flex)\n                //-     md-card-title(flex=\"none\")\n                //-         md-card-title-text\n                //-             span.md-headline 结果反馈\n                //-     md-card-content(layout=\"column\",flex)\n                //-         md-divider\n                //-         md-list()\n                //-             md-list-item.md-3-line(ng-repeat=\"item in executeCmdCtl.deviceSelected\")\n                //-                 div.md-list-item-text(layout=\"column\")\n                //-                     h2 {{item._source.id}} -- {{item._source.deviceSn}}\n                //-                     div(angular-terminal=\"item._source.deviceSn\",greetings=\"{{item._source.return||'no info'}}\")");
	}
	}

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	buf.push("<section flex layout=\"{{qtCtl.layout}}\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	buf.push("<div fx-list-action key=\"{{qtCtl.key}}\" flex multiple=\"false\" auto-select=\"true\" local=\"true\" client-data=\"qtCtl.clientData\" item-toolbars=\"qtCtl.itemToolbars\" top-toolbars=\"qtCtl.topToolbars\" qt-ctl=\"qtCtl\" class=\"nga-fast nga-stagger nga-fade\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	buf.push("<md-divider ng-show=\"qtCtl.showSearchTable\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/directives/query.table/tpls/query.table.jade" ));
	buf.push("<div ng-show=\"qtCtl.showSearchTable\" fx-list-action key=\"{{qtCtl.key}}\" flex multiple=\"true\" selected=\"qtCtl.ngModel\" res_filter=\"qtCtl.resFilter\" class=\"nga-fast nga-stagger nga-fade\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "section(flex,layout=\"{{qtCtl.layout}}\")\n    //- div.lock-size\n    //- md-fab-speed-dial.md-scale.md-fab-bottom-left(md-direction=\"right\",md-open=\"qtCtl.isOpen\",ng-mouseenter=\"qtCtl.isOpen=true\" ng-mouseleave=\"qtCtl.isOpen=false\")\n    //-     md-fab-trigger\n    //-         md-button.md-fab.md-accent(aria-label=\"menu\")\n    //-             md-icon\n    //-                 ng-md-icon(icon=\"menu\")\n    //-     md-fab-actions\n    //-         div(fx-toolbar,layout=\"row\",items=\"qtCtl.toolbars\",ctls=\"qtCtl\")\n    div.nga-fast.nga-stagger.nga-fade(fx-list-action,key=\"{{qtCtl.key}}\",flex,multiple=\"false\",auto-select=\"true\",local=\"true\",client-data=\"qtCtl.clientData\",item-toolbars=\"qtCtl.itemToolbars\",top-toolbars=\"qtCtl.topToolbars\",qt-ctl=\"qtCtl\")\n    md-divider(ng-show=\"qtCtl.showSearchTable\")\n    div.nga-fast.nga-stagger.nga-fade(ng-show=\"qtCtl.showSearchTable\",fx-list-action,key=\"{{qtCtl.key}}\",flex,multiple=\"true\",selected=\"qtCtl.ngModel\",res_filter=\"qtCtl.resFilter\")");
	}
	}

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<md-content flex layout=\"row\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<md-card layout=\"column\" flex=\"40\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<section fx-list-action key=\"interface\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<section fx-list-action key=\"schemaListAction\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
	buf.push("  ");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<md-card layout=\"column\" flex=\"60\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/page/tpls/page.allin.template.jade" ));
	buf.push("<section fx-list-action key=\"action\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-card>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex,layout=\"row\")\n    md-card(layout=\"column\",flex=\"40\")\n        section(fx-list-action,key=\"interface\",flex)\n        md-divider\n        section(fx-list-action,key=\"schemaListAction\",flex)   \n    md-card(layout=\"column\",flex=\"60\")\n        section(fx-list-action,key=\"action\",flex)");
	}
	}

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-content layout=\"row\" flex style=\"overflow:hidden;\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-content layout=\"column\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<div class=\"lock-size\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-fab-speed-dial md-direction=\"down\" class=\"md-scale md-fab-top-right\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-fab-trigger>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-button aria-label=\"menu\" class=\"md-fab md-warn\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<ng-md-icon icon=\"menu\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-trigger>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-fab-actions>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<div fx-toolbar layout=\"column\" items=\"pageCtl.actionModel.list.toolbars\" ctls=\"pageCtl\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-actions>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-fab-speed-dial>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<md-content flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	buf.push("<div id=\"paged3\" flex style=\"width:100%;height:100%;\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 14, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 15, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 16, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 17, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 18, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 19, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 20, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 21, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 21, "/srv/blessing/public/src/pages/page/tpls/page.d3.template.jade" ));
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(layout=\"row\",flex,style=\"overflow:hidden;\")\n    md-content(layout=\"column\",flex)\n        div.lock-size\n            md-fab-speed-dial.md-scale.md-fab-top-right(md-direction=\"down\")\n                md-fab-trigger\n                    md-button.md-fab.md-warn(aria-label=\"menu\")\n                        md-icon\n                            ng-md-icon(icon=\"menu\")\n                md-fab-actions\n                    div(fx-toolbar,layout=\"column\",items=\"pageCtl.actionModel.list.toolbars\",ctls=\"pageCtl\")\n        md-content(flex)\n            div#paged3(flex,style=\"width:100%;height:100%;\")\n                //- div.card-container(flex)\n                //-     md-card.card(ng-repeat=\"item in pageCtl.clientData.rows\")\n                //-         md-card-title\n                //-             span.md-headline {{item.title}}\n                //-         md-card-content\n                //-             span {{item.description}}\n                //-         md-card-actions\n                //-             md-button(ng-click=\"pageCtl.rescaleX()\") 缩放X\n                //-             md-button(ng-click=\"pageCtl.rescaleY()\") 缩放Y");
	}
	}

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<md-content flex layout=\"column\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 2, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<md-toolbar md-style-color1=\"{'color': 'primary.A100'}\" class=\"md-table-toolbar md-hue-3\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 3, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<div fx-toolbar layout=\"row\" items=\"pageCtl.toolbars\" ctls=\"pageCtl\" class=\"md-toolbar-tools\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-toolbar>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 4, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 5, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<md-content flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 6, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<form layout=\"column\" name=\"executeForm\" flex class=\"md-padding\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 7, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<div fx-form-action key=\"{{pageCtl.key}}\" ng-model=\"pageCtl.formData\" ng-disabled=\"pageCtl.isBusy\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</div>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</form>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 8, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<md-divider>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</md-divider>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 9, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<md-button ng-click=\"pageCtl.doSubmit($event,executeForm)\" ng-disabled=\"pageCtl.isBusy\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 10, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<md-icon>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 11, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<ng-md-icon icon=\"apple-keyboard-command\">");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</ng-md-icon>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-icon>");
	jade_debug.shift();
	jade_debug.unshift(new jade.DebugItem( 12, "/srv/blessing/public/src/pages/page/tpls/page.execute.cmd.jade" ));
	buf.push("<span>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.unshift(new jade.DebugItem( 12, jade_debug[0].filename ));
	buf.push("执行命令");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</span>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-button>");
	jade_debug.shift();
	jade_debug.shift();
	buf.push("</md-content>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "md-content(flex,layout=\"column\")\n    md-toolbar.md-table-toolbar.md-hue-3(md-style-color1=\"{'color': 'primary.A100'}\")\n        div.md-toolbar-tools(fx-toolbar,layout=\"row\",items=\"pageCtl.toolbars\",ctls=\"pageCtl\")\n    md-divider\n    md-content(flex)\n        form.md-padding(layout=\"column\",name=\"executeForm\",flex)\n            div(fx-form-action,key=\"{{pageCtl.key}}\",ng-model=\"pageCtl.formData\",ng-disabled=\"pageCtl.isBusy\")\n    md-divider\n    md-button(ng-click=\"pageCtl.doSubmit($event,executeForm)\",ng-disabled=\"pageCtl.isBusy\")\n        md-icon\n            ng-md-icon(icon=\"apple-keyboard-command\")\n        span 执行命令");
	}
	}

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(2);
	
	module.exports = function template(locals) {
	var jade_debug = [ new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.template.jade" ) ];
	try {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	
	jade_debug.unshift(new jade.DebugItem( 0, "/srv/blessing/public/src/pages/page/tpls/page.template.jade" ));
	jade_debug.unshift(new jade.DebugItem( 1, "/srv/blessing/public/src/pages/page/tpls/page.template.jade" ));
	buf.push("<section fx-list-action key=\"{{pageCtl.key}}\" flex>");
	jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
	jade_debug.shift();
	buf.push("</section>");
	jade_debug.shift();
	jade_debug.shift();;return buf.join("");
	} catch (err) {
	  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "section(fx-list-action,key=\"{{pageCtl.key}}\",flex)");
	}
	}

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
	;(function () {
	  // Detect the `define` function exposed by asynchronous module loaders. The
	  // strict `define` check is necessary for compatibility with `r.js`.
	  var isLoader = "function" === "function" && __webpack_require__(406);
	
	  // A set of types used to distinguish objects from primitives.
	  var objectTypes = {
	    "function": true,
	    "object": true
	  };
	
	  // Detect the `exports` object exposed by CommonJS implementations.
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  // Use the `global` object exposed by Node (including Browserify via
	  // `insert-module-globals`), Narwhal, and Ringo as the default context,
	  // and the `window` object in browsers. Rhino exports a `global` function
	  // instead.
	  var root = objectTypes[typeof window] && window || this,
	      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;
	
	  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  // Public: Initializes JSON 3 using the given `context` object, attaching the
	  // `stringify` and `parse` functions to the specified `exports` object.
	  function runInContext(context, exports) {
	    context || (context = root["Object"]());
	    exports || (exports = root["Object"]());
	
	    // Native constructor aliases.
	    var Number = context["Number"] || root["Number"],
	        String = context["String"] || root["String"],
	        Object = context["Object"] || root["Object"],
	        Date = context["Date"] || root["Date"],
	        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
	        TypeError = context["TypeError"] || root["TypeError"],
	        Math = context["Math"] || root["Math"],
	        nativeJSON = context["JSON"] || root["JSON"];
	
	    // Delegate to the native `stringify` and `parse` implementations.
	    if (typeof nativeJSON == "object" && nativeJSON) {
	      exports.stringify = nativeJSON.stringify;
	      exports.parse = nativeJSON.parse;
	    }
	
	    // Convenience aliases.
	    var objectProto = Object.prototype,
	        getClass = objectProto.toString,
	        isProperty, forEach, undef;
	
	    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
	    var isExtended = new Date(-3509827334573292);
	    try {
	      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
	      // results for certain dates in Opera >= 10.53.
	      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
	        // Safari < 2.0.2 stores the internal millisecond time value correctly,
	        // but clips the values returned by the date methods to the range of
	        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
	        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
	    } catch (exception) {}
	
	    // Internal: Determines whether the native `JSON.stringify` and `parse`
	    // implementations are spec-compliant. Based on work by Ken Snyder.
	    function has(name) {
	      if (has[name] !== undef) {
	        // Return cached feature test result.
	        return has[name];
	      }
	      var isSupported;
	      if (name == "bug-string-char-index") {
	        // IE <= 7 doesn't support accessing string characters using square
	        // bracket notation. IE 8 only supports this for primitives.
	        isSupported = "a"[0] != "a";
	      } else if (name == "json") {
	        // Indicates whether both `JSON.stringify` and `JSON.parse` are
	        // supported.
	        isSupported = has("json-stringify") && has("json-parse");
	      } else {
	        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
	        // Test `JSON.stringify`.
	        if (name == "json-stringify") {
	          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
	          if (stringifySupported) {
	            // A test function object with a custom `toJSON` method.
	            (value = function () {
	              return 1;
	            }).toJSON = value;
	            try {
	              stringifySupported =
	                // Firefox 3.1b1 and b2 serialize string, number, and boolean
	                // primitives as object literals.
	                stringify(0) === "0" &&
	                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
	                // literals.
	                stringify(new Number()) === "0" &&
	                stringify(new String()) == '""' &&
	                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
	                // does not define a canonical JSON representation (this applies to
	                // objects with `toJSON` properties as well, *unless* they are nested
	                // within an object or array).
	                stringify(getClass) === undef &&
	                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
	                // FF 3.1b3 pass this test.
	                stringify(undef) === undef &&
	                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
	                // respectively, if the value is omitted entirely.
	                stringify() === undef &&
	                // FF 3.1b1, 2 throw an error if the given value is not a number,
	                // string, array, object, Boolean, or `null` literal. This applies to
	                // objects with custom `toJSON` methods as well, unless they are nested
	                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
	                // methods entirely.
	                stringify(value) === "1" &&
	                stringify([value]) == "[1]" &&
	                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
	                // `"[null]"`.
	                stringify([undef]) == "[null]" &&
	                // YUI 3.0.0b1 fails to serialize `null` literals.
	                stringify(null) == "null" &&
	                // FF 3.1b1, 2 halts serialization if an array contains a function:
	                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
	                // elides non-JSON values from objects and arrays, unless they
	                // define custom `toJSON` methods.
	                stringify([undef, getClass, null]) == "[null,null,null]" &&
	                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
	                // where character escape codes are expected (e.g., `\b` => `\u0008`).
	                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
	                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
	                stringify(null, value) === "1" &&
	                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
	                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
	                // serialize extended years.
	                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
	                // The milliseconds are optional in ES 5, but required in 5.1.
	                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
	                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
	                // four-digit years instead of six-digit years. Credits: @Yaffle.
	                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
	                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
	                // values less than 1000. Credits: @Yaffle.
	                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
	            } catch (exception) {
	              stringifySupported = false;
	            }
	          }
	          isSupported = stringifySupported;
	        }
	        // Test `JSON.parse`.
	        if (name == "json-parse") {
	          var parse = exports.parse;
	          if (typeof parse == "function") {
	            try {
	              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
	              // Conforming implementations should also coerce the initial argument to
	              // a string prior to parsing.
	              if (parse("0") === 0 && !parse(false)) {
	                // Simple parsing test.
	                value = parse(serialized);
	                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
	                if (parseSupported) {
	                  try {
	                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
	                    parseSupported = !parse('"\t"');
	                  } catch (exception) {}
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
	                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
	                      // certain octal literals.
	                      parseSupported = parse("01") !== 1;
	                    } catch (exception) {}
	                  }
	                  if (parseSupported) {
	                    try {
	                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
	                      // points. These environments, along with FF 3.1b1 and 2,
	                      // also allow trailing commas in JSON objects and arrays.
	                      parseSupported = parse("1.") !== 1;
	                    } catch (exception) {}
	                  }
	                }
	              }
	            } catch (exception) {
	              parseSupported = false;
	            }
	          }
	          isSupported = parseSupported;
	        }
	      }
	      return has[name] = !!isSupported;
	    }
	
	    if (!has("json")) {
	      // Common `[[Class]]` name aliases.
	      var functionClass = "[object Function]",
	          dateClass = "[object Date]",
	          numberClass = "[object Number]",
	          stringClass = "[object String]",
	          arrayClass = "[object Array]",
	          booleanClass = "[object Boolean]";
	
	      // Detect incomplete support for accessing string characters by index.
	      var charIndexBuggy = has("bug-string-char-index");
	
	      // Define additional utility methods if the `Date` methods are buggy.
	      if (!isExtended) {
	        var floor = Math.floor;
	        // A mapping between the months of the year and the number of days between
	        // January 1st and the first of the respective month.
	        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	        // Internal: Calculates the number of days between the Unix epoch and the
	        // first day of the given month.
	        var getDay = function (year, month) {
	          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
	        };
	      }
	
	      // Internal: Determines if a property is a direct property of the given
	      // object. Delegates to the native `Object#hasOwnProperty` method.
	      if (!(isProperty = objectProto.hasOwnProperty)) {
	        isProperty = function (property) {
	          var members = {}, constructor;
	          if ((members.__proto__ = null, members.__proto__ = {
	            // The *proto* property cannot be set multiple times in recent
	            // versions of Firefox and SeaMonkey.
	            "toString": 1
	          }, members).toString != getClass) {
	            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
	            // supports the mutable *proto* property.
	            isProperty = function (property) {
	              // Capture and break the object's prototype chain (see section 8.6.2
	              // of the ES 5.1 spec). The parenthesized expression prevents an
	              // unsafe transformation by the Closure Compiler.
	              var original = this.__proto__, result = property in (this.__proto__ = null, this);
	              // Restore the original prototype chain.
	              this.__proto__ = original;
	              return result;
	            };
	          } else {
	            // Capture a reference to the top-level `Object` constructor.
	            constructor = members.constructor;
	            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
	            // other environments.
	            isProperty = function (property) {
	              var parent = (this.constructor || constructor).prototype;
	              return property in this && !(property in parent && this[property] === parent[property]);
	            };
	          }
	          members = null;
	          return isProperty.call(this, property);
	        };
	      }
	
	      // Internal: Normalizes the `for...in` iteration algorithm across
	      // environments. Each enumerated key is yielded to a `callback` function.
	      forEach = function (object, callback) {
	        var size = 0, Properties, members, property;
	
	        // Tests for bugs in the current environment's `for...in` algorithm. The
	        // `valueOf` property inherits the non-enumerable flag from
	        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
	        (Properties = function () {
	          this.valueOf = 0;
	        }).prototype.valueOf = 0;
	
	        // Iterate over a new instance of the `Properties` class.
	        members = new Properties();
	        for (property in members) {
	          // Ignore all properties inherited from `Object.prototype`.
	          if (isProperty.call(members, property)) {
	            size++;
	          }
	        }
	        Properties = members = null;
	
	        // Normalize the iteration algorithm.
	        if (!size) {
	          // A list of non-enumerable properties inherited from `Object.prototype`.
	          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
	          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
	          // properties.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, length;
	            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
	            for (property in object) {
	              // Gecko <= 1.0 enumerates the `prototype` property of functions under
	              // certain conditions; IE does not.
	              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for each non-enumerable property.
	            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
	          };
	        } else if (size == 2) {
	          // Safari <= 2.0.4 enumerates shadowed properties twice.
	          forEach = function (object, callback) {
	            // Create a set of iterated properties.
	            var members = {}, isFunction = getClass.call(object) == functionClass, property;
	            for (property in object) {
	              // Store each property name to prevent double enumeration. The
	              // `prototype` property of functions is not enumerated due to cross-
	              // environment inconsistencies.
	              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
	                callback(property);
	              }
	            }
	          };
	        } else {
	          // No bugs detected; use the standard `for...in` algorithm.
	          forEach = function (object, callback) {
	            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
	            for (property in object) {
	              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
	                callback(property);
	              }
	            }
	            // Manually invoke the callback for the `constructor` property due to
	            // cross-environment inconsistencies.
	            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
	              callback(property);
	            }
	          };
	        }
	        return forEach(object, callback);
	      };
	
	      // Public: Serializes a JavaScript `value` as a JSON string. The optional
	      // `filter` argument may specify either a function that alters how object and
	      // array members are serialized, or an array of strings and numbers that
	      // indicates which properties should be serialized. The optional `width`
	      // argument may be either a string or number that specifies the indentation
	      // level of the output.
	      if (!has("json-stringify")) {
	        // Internal: A map of control characters and their escaped equivalents.
	        var Escapes = {
	          92: "\\\\",
	          34: '\\"',
	          8: "\\b",
	          12: "\\f",
	          10: "\\n",
	          13: "\\r",
	          9: "\\t"
	        };
	
	        // Internal: Converts `value` into a zero-padded string such that its
	        // length is at least equal to `width`. The `width` must be <= 6.
	        var leadingZeroes = "000000";
	        var toPaddedString = function (width, value) {
	          // The `|| 0` expression is necessary to work around a bug in
	          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	          return (leadingZeroes + (value || 0)).slice(-width);
	        };
	
	        // Internal: Double-quotes a string `value`, replacing all ASCII control
	        // characters (characters with code unit values between 0 and 31) with
	        // their escaped equivalents. This is an implementation of the
	        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
	        var unicodePrefix = "\\u00";
	        var quote = function (value) {
	          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
	          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
	          for (; index < length; index++) {
	            var charCode = value.charCodeAt(index);
	            // If the character is a control character, append its Unicode or
	            // shorthand escape sequence; otherwise, append the character as-is.
	            switch (charCode) {
	              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
	                result += Escapes[charCode];
	                break;
	              default:
	                if (charCode < 32) {
	                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
	                  break;
	                }
	                result += useCharIndex ? symbols[index] : value.charAt(index);
	            }
	          }
	          return result + '"';
	        };
	
	        // Internal: Recursively serializes an object. Implements the
	        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
	        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
	          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
	          try {
	            // Necessary for host object support.
	            value = object[property];
	          } catch (exception) {}
	          if (typeof value == "object" && value) {
	            className = getClass.call(value);
	            if (className == dateClass && !isProperty.call(value, "toJSON")) {
	              if (value > -1 / 0 && value < 1 / 0) {
	                // Dates are serialized according to the `Date#toJSON` method
	                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
	                // for the ISO 8601 date time string format.
	                if (getDay) {
	                  // Manually compute the year, month, date, hours, minutes,
	                  // seconds, and milliseconds if the `getUTC*` methods are
	                  // buggy. Adapted from @Yaffle's `date-shim` project.
	                  date = floor(value / 864e5);
	                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
	                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
	                  date = 1 + date - getDay(year, month);
	                  // The `time` value specifies the time within the day (see ES
	                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
	                  // to compute `A modulo B`, as the `%` operator does not
	                  // correspond to the `modulo` operation for negative numbers.
	                  time = (value % 864e5 + 864e5) % 864e5;
	                  // The hours, minutes, seconds, and milliseconds are obtained by
	                  // decomposing the time within the day. See section 15.9.1.10.
	                  hours = floor(time / 36e5) % 24;
	                  minutes = floor(time / 6e4) % 60;
	                  seconds = floor(time / 1e3) % 60;
	                  milliseconds = time % 1e3;
	                } else {
	                  year = value.getUTCFullYear();
	                  month = value.getUTCMonth();
	                  date = value.getUTCDate();
	                  hours = value.getUTCHours();
	                  minutes = value.getUTCMinutes();
	                  seconds = value.getUTCSeconds();
	                  milliseconds = value.getUTCMilliseconds();
	                }
	                // Serialize extended years correctly.
	                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
	                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
	                  // Months, dates, hours, minutes, and seconds should have two
	                  // digits; milliseconds should have three.
	                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
	                  // Milliseconds are optional in ES 5.0, but required in 5.1.
	                  "." + toPaddedString(3, milliseconds) + "Z";
	              } else {
	                value = null;
	              }
	            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
	              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
	              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
	              // ignores all `toJSON` methods on these objects unless they are
	              // defined directly on an instance.
	              value = value.toJSON(property);
	            }
	          }
	          if (callback) {
	            // If a replacement function was provided, call it to obtain the value
	            // for serialization.
	            value = callback.call(object, property, value);
	          }
	          if (value === null) {
	            return "null";
	          }
	          className = getClass.call(value);
	          if (className == booleanClass) {
	            // Booleans are represented literally.
	            return "" + value;
	          } else if (className == numberClass) {
	            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
	            // `"null"`.
	            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
	          } else if (className == stringClass) {
	            // Strings are double-quoted and escaped.
	            return quote("" + value);
	          }
	          // Recursively serialize objects and arrays.
	          if (typeof value == "object") {
	            // Check for cyclic structures. This is a linear search; performance
	            // is inversely proportional to the number of unique nested objects.
	            for (length = stack.length; length--;) {
	              if (stack[length] === value) {
	                // Cyclic structures cannot be serialized by `JSON.stringify`.
	                throw TypeError();
	              }
	            }
	            // Add the object to the stack of traversed objects.
	            stack.push(value);
	            results = [];
	            // Save the current indentation level and indent one additional level.
	            prefix = indentation;
	            indentation += whitespace;
	            if (className == arrayClass) {
	              // Recursively serialize array elements.
	              for (index = 0, length = value.length; index < length; index++) {
	                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
	                results.push(element === undef ? "null" : element);
	              }
	              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
	            } else {
	              // Recursively serialize object members. Members are selected from
	              // either a user-specified list of property names, or the object
	              // itself.
	              forEach(properties || value, function (property) {
	                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
	                if (element !== undef) {
	                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
	                  // is not the empty string, let `member` {quote(property) + ":"}
	                  // be the concatenation of `member` and the `space` character."
	                  // The "`space` character" refers to the literal space
	                  // character, not the `space` {width} argument provided to
	                  // `JSON.stringify`.
	                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
	                }
	              });
	              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
	            }
	            // Remove the object from the traversed object stack.
	            stack.pop();
	            return result;
	          }
	        };
	
	        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
	        exports.stringify = function (source, filter, width) {
	          var whitespace, callback, properties, className;
	          if (objectTypes[typeof filter] && filter) {
	            if ((className = getClass.call(filter)) == functionClass) {
	              callback = filter;
	            } else if (className == arrayClass) {
	              // Convert the property names array into a makeshift set.
	              properties = {};
	              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
	            }
	          }
	          if (width) {
	            if ((className = getClass.call(width)) == numberClass) {
	              // Convert the `width` to an integer and create a string containing
	              // `width` number of space characters.
	              if ((width -= width % 1) > 0) {
	                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
	              }
	            } else if (className == stringClass) {
	              whitespace = width.length <= 10 ? width : width.slice(0, 10);
	            }
	          }
	          // Opera <= 7.54u2 discards the values associated with empty string keys
	          // (`""`) only if they are used directly within an object member list
	          // (e.g., `!("" in { "": 1})`).
	          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
	        };
	      }
	
	      // Public: Parses a JSON source string.
	      if (!has("json-parse")) {
	        var fromCharCode = String.fromCharCode;
	
	        // Internal: A map of escaped control characters and their unescaped
	        // equivalents.
	        var Unescapes = {
	          92: "\\",
	          34: '"',
	          47: "/",
	          98: "\b",
	          116: "\t",
	          110: "\n",
	          102: "\f",
	          114: "\r"
	        };
	
	        // Internal: Stores the parser state.
	        var Index, Source;
	
	        // Internal: Resets the parser state and throws a `SyntaxError`.
	        var abort = function () {
	          Index = Source = null;
	          throw SyntaxError();
	        };
	
	        // Internal: Returns the next token, or `"$"` if the parser has reached
	        // the end of the source string. A token may be a string, number, `null`
	        // literal, or Boolean literal.
	        var lex = function () {
	          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
	          while (Index < length) {
	            charCode = source.charCodeAt(Index);
	            switch (charCode) {
	              case 9: case 10: case 13: case 32:
	                // Skip whitespace tokens, including tabs, carriage returns, line
	                // feeds, and space characters.
	                Index++;
	                break;
	              case 123: case 125: case 91: case 93: case 58: case 44:
	                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
	                // the current position.
	                value = charIndexBuggy ? source.charAt(Index) : source[Index];
	                Index++;
	                return value;
	              case 34:
	                // `"` delimits a JSON string; advance to the next character and
	                // begin parsing the string. String tokens are prefixed with the
	                // sentinel `@` character to distinguish them from punctuators and
	                // end-of-string tokens.
	                for (value = "@", Index++; Index < length;) {
	                  charCode = source.charCodeAt(Index);
	                  if (charCode < 32) {
	                    // Unescaped ASCII control characters (those with a code unit
	                    // less than the space character) are not permitted.
	                    abort();
	                  } else if (charCode == 92) {
	                    // A reverse solidus (`\`) marks the beginning of an escaped
	                    // control character (including `"`, `\`, and `/`) or Unicode
	                    // escape sequence.
	                    charCode = source.charCodeAt(++Index);
	                    switch (charCode) {
	                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
	                        // Revive escaped control characters.
	                        value += Unescapes[charCode];
	                        Index++;
	                        break;
	                      case 117:
	                        // `\u` marks the beginning of a Unicode escape sequence.
	                        // Advance to the first character and validate the
	                        // four-digit code point.
	                        begin = ++Index;
	                        for (position = Index + 4; Index < position; Index++) {
	                          charCode = source.charCodeAt(Index);
	                          // A valid sequence comprises four hexdigits (case-
	                          // insensitive) that form a single hexadecimal value.
	                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
	                            // Invalid Unicode escape sequence.
	                            abort();
	                          }
	                        }
	                        // Revive the escaped character.
	                        value += fromCharCode("0x" + source.slice(begin, Index));
	                        break;
	                      default:
	                        // Invalid escape sequence.
	                        abort();
	                    }
	                  } else {
	                    if (charCode == 34) {
	                      // An unescaped double-quote character marks the end of the
	                      // string.
	                      break;
	                    }
	                    charCode = source.charCodeAt(Index);
	                    begin = Index;
	                    // Optimize for the common case where a string is valid.
	                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
	                      charCode = source.charCodeAt(++Index);
	                    }
	                    // Append the string as-is.
	                    value += source.slice(begin, Index);
	                  }
	                }
	                if (source.charCodeAt(Index) == 34) {
	                  // Advance to the next character and return the revived string.
	                  Index++;
	                  return value;
	                }
	                // Unterminated string.
	                abort();
	              default:
	                // Parse numbers and literals.
	                begin = Index;
	                // Advance past the negative sign, if one is specified.
	                if (charCode == 45) {
	                  isSigned = true;
	                  charCode = source.charCodeAt(++Index);
	                }
	                // Parse an integer or floating-point value.
	                if (charCode >= 48 && charCode <= 57) {
	                  // Leading zeroes are interpreted as octal literals.
	                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
	                    // Illegal octal literal.
	                    abort();
	                  }
	                  isSigned = false;
	                  // Parse the integer component.
	                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
	                  // Floats cannot contain a leading decimal point; however, this
	                  // case is already accounted for by the parser.
	                  if (source.charCodeAt(Index) == 46) {
	                    position = ++Index;
	                    // Parse the decimal component.
	                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal trailing decimal.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Parse exponents. The `e` denoting the exponent is
	                  // case-insensitive.
	                  charCode = source.charCodeAt(Index);
	                  if (charCode == 101 || charCode == 69) {
	                    charCode = source.charCodeAt(++Index);
	                    // Skip past the sign following the exponent, if one is
	                    // specified.
	                    if (charCode == 43 || charCode == 45) {
	                      Index++;
	                    }
	                    // Parse the exponential component.
	                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
	                    if (position == Index) {
	                      // Illegal empty exponent.
	                      abort();
	                    }
	                    Index = position;
	                  }
	                  // Coerce the parsed value to a JavaScript number.
	                  return +source.slice(begin, Index);
	                }
	                // A negative sign may only precede numbers.
	                if (isSigned) {
	                  abort();
	                }
	                // `true`, `false`, and `null` literals.
	                if (source.slice(Index, Index + 4) == "true") {
	                  Index += 4;
	                  return true;
	                } else if (source.slice(Index, Index + 5) == "false") {
	                  Index += 5;
	                  return false;
	                } else if (source.slice(Index, Index + 4) == "null") {
	                  Index += 4;
	                  return null;
	                }
	                // Unrecognized token.
	                abort();
	            }
	          }
	          // Return the sentinel `$` character if the parser has reached the end
	          // of the source string.
	          return "$";
	        };
	
	        // Internal: Parses a JSON `value` token.
	        var get = function (value) {
	          var results, hasMembers;
	          if (value == "$") {
	            // Unexpected end of input.
	            abort();
	          }
	          if (typeof value == "string") {
	            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
	              // Remove the sentinel `@` character.
	              return value.slice(1);
	            }
	            // Parse object and array literals.
	            if (value == "[") {
	              // Parses a JSON array, returning a new JavaScript array.
	              results = [];
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing square bracket marks the end of the array literal.
	                if (value == "]") {
	                  break;
	                }
	                // If the array literal contains elements, the current token
	                // should be a comma separating the previous element from the
	                // next.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "]") {
	                      // Unexpected trailing `,` in array literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each array element.
	                    abort();
	                  }
	                }
	                // Elisions and leading commas are not permitted.
	                if (value == ",") {
	                  abort();
	                }
	                results.push(get(value));
	              }
	              return results;
	            } else if (value == "{") {
	              // Parses a JSON object, returning a new JavaScript object.
	              results = {};
	              for (;; hasMembers || (hasMembers = true)) {
	                value = lex();
	                // A closing curly brace marks the end of the object literal.
	                if (value == "}") {
	                  break;
	                }
	                // If the object literal contains members, the current token
	                // should be a comma separator.
	                if (hasMembers) {
	                  if (value == ",") {
	                    value = lex();
	                    if (value == "}") {
	                      // Unexpected trailing `,` in object literal.
	                      abort();
	                    }
	                  } else {
	                    // A `,` must separate each object member.
	                    abort();
	                  }
	                }
	                // Leading commas are not permitted, object property names must be
	                // double-quoted strings, and a `:` must separate each property
	                // name and value.
	                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
	                  abort();
	                }
	                results[value.slice(1)] = get(lex());
	              }
	              return results;
	            }
	            // Unexpected token encountered.
	            abort();
	          }
	          return value;
	        };
	
	        // Internal: Updates a traversed object member.
	        var update = function (source, property, callback) {
	          var element = walk(source, property, callback);
	          if (element === undef) {
	            delete source[property];
	          } else {
	            source[property] = element;
	          }
	        };
	
	        // Internal: Recursively traverses a parsed JSON object, invoking the
	        // `callback` function for each value. This is an implementation of the
	        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
	        var walk = function (source, property, callback) {
	          var value = source[property], length;
	          if (typeof value == "object" && value) {
	            // `forEach` can't be used to traverse an array in Opera <= 8.54
	            // because its `Object#hasOwnProperty` implementation returns `false`
	            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
	            if (getClass.call(value) == arrayClass) {
	              for (length = value.length; length--;) {
	                update(value, length, callback);
	              }
	            } else {
	              forEach(value, function (property) {
	                update(value, property, callback);
	              });
	            }
	          }
	          return callback.call(source, property, value);
	        };
	
	        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
	        exports.parse = function (source, callback) {
	          var result, value;
	          Index = 0;
	          Source = "" + source;
	          result = get(lex());
	          // If a JSON string contains multiple tokens, it is invalid.
	          if (lex() != "$") {
	            abort();
	          }
	          // Reset the parser state.
	          Index = Source = null;
	          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
	        };
	      }
	    }
	
	    exports["runInContext"] = runInContext;
	    return exports;
	  }
	
	  if (freeExports && !isLoader) {
	    // Export for CommonJS environments.
	    runInContext(root, freeExports);
	  } else {
	    // Export for web browsers and JavaScript engines.
	    var nativeJSON = root.JSON,
	        previousJSON = root["JSON3"],
	        isRestored = false;
	
	    var JSON3 = runInContext(root, (root["JSON3"] = {
	      // Public: Restores the original value of the global `JSON` object and
	      // returns a reference to the `JSON3` object.
	      "noConflict": function () {
	        if (!isRestored) {
	          isRestored = true;
	          root.JSON = nativeJSON;
	          root["JSON3"] = previousJSON;
	          nativeJSON = previousJSON = null;
	        }
	        return JSON3;
	      }
	    }));
	
	    root.JSON = {
	      "parse": JSON3.parse,
	      "stringify": JSON3.stringify
	    };
	  }
	
	  // Export for asynchronous module loaders.
	  if (isLoader) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return JSON3;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module), (function() { return this; }())))

/***/ },

/***/ 292:
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */
	
	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;
	
	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */
	
	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};
	
	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */
	
	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}
	
	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}
	
	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */
	
	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}
	
	/**
	 * Pluralization helper.
	 */
	
	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },

/***/ 298:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * JSON parse.
	 *
	 * @see Based on jQuery#parseJSON (MIT) and JSON2
	 * @api private
	 */
	
	var rvalidchars = /^[\],:{}\s]*$/;
	var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
	var rtrimLeft = /^\s+/;
	var rtrimRight = /\s+$/;
	
	module.exports = function parsejson(data) {
	  if ('string' != typeof data || !data) {
	    return null;
	  }
	
	  data = data.replace(rtrimLeft, '').replace(rtrimRight, '');
	
	  // Attempt to parse using the native JSON parser first
	  if (global.JSON && JSON.parse) {
	    return JSON.parse(data);
	  }
	
	  if (rvalidchars.test(data.replace(rvalidescape, '@')
	      .replace(rvalidtokens, ']')
	      .replace(rvalidbraces, ''))) {
	    return (new Function('return ' + data))();
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var url = __webpack_require__(302);
	var parser = __webpack_require__(30);
	var Manager = __webpack_require__(151);
	var debug = __webpack_require__(8)('socket.io-client');
	
	/**
	 * Module exports.
	 */
	
	module.exports = exports = lookup;
	
	/**
	 * Managers cache.
	 */
	
	var cache = exports.managers = {};
	
	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */
	
	function lookup (uri, opts) {
	  if (typeof uri === 'object') {
	    opts = uri;
	    uri = undefined;
	  }
	
	  opts = opts || {};
	
	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] ||
	                      false === opts.multiplex || sameNamespace;
	
	  var io;
	
	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  } else if (opts && 'object' === typeof opts.query) {
	    opts.query = encodeQueryString(opts.query);
	  }
	  return io.socket(parsed.path, opts);
	}
	/**
	 *  Helper method to parse query objects to string.
	 * @param {object} query
	 * @returns {string}
	 */
	function encodeQueryString (obj) {
	  var str = [];
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
	    }
	  }
	  return str.join('&');
	}
	/**
	 * Protocol version.
	 *
	 * @api public
	 */
	
	exports.protocol = parser.protocol;
	
	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */
	
	exports.connect = lookup;
	
	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */
	
	exports.Manager = __webpack_require__(151);
	exports.Socket = __webpack_require__(153);


/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	/**
	 * Module dependencies.
	 */
	
	var parseuri = __webpack_require__(150);
	var debug = __webpack_require__(8)('socket.io-client:url');
	
	/**
	 * Module exports.
	 */
	
	module.exports = url;
	
	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */
	
	function url (uri, loc) {
	  var obj = uri;
	
	  // default to window.location
	  loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;
	
	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }
	
	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }
	
	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }
	
	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }
	
	  obj.path = obj.path || '/';
	
	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;
	
	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));
	
	  return obj;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*global Blob,File*/
	
	/**
	 * Module requirements
	 */
	
	var isArray = __webpack_require__(41);
	var isBuf = __webpack_require__(154);
	
	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */
	
	exports.deconstructPacket = function(packet){
	  var buffers = [];
	  var packetData = packet.data;
	
	  function _deconstructPacket(data) {
	    if (!data) return data;
	
	    if (isBuf(data)) {
	      var placeholder = { _placeholder: true, num: buffers.length };
	      buffers.push(data);
	      return placeholder;
	    } else if (isArray(data)) {
	      var newData = new Array(data.length);
	      for (var i = 0; i < data.length; i++) {
	        newData[i] = _deconstructPacket(data[i]);
	      }
	      return newData;
	    } else if ('object' == typeof data && !(data instanceof Date)) {
	      var newData = {};
	      for (var key in data) {
	        newData[key] = _deconstructPacket(data[key]);
	      }
	      return newData;
	    }
	    return data;
	  }
	
	  var pack = packet;
	  pack.data = _deconstructPacket(packetData);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};
	
	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */
	
	exports.reconstructPacket = function(packet, buffers) {
	  var curPlaceHolder = 0;
	
	  function _reconstructPacket(data) {
	    if (data && data._placeholder) {
	      var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
	      return buf;
	    } else if (isArray(data)) {
	      for (var i = 0; i < data.length; i++) {
	        data[i] = _reconstructPacket(data[i]);
	      }
	      return data;
	    } else if (data && 'object' == typeof data) {
	      for (var key in data) {
	        data[key] = _reconstructPacket(data[key]);
	      }
	      return data;
	    }
	    return data;
	  }
	
	  packet.data = _reconstructPacket(packet.data);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};
	
	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */
	
	exports.removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;
	
	    // convert any blob
	    if ((global.Blob && obj instanceof Blob) ||
	        (global.File && obj instanceof File)) {
	      pendingBlobs++;
	
	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }
	
	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };
	
	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (obj && 'object' == typeof obj && !isBuf(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }
	
	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(227);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 309:
/***/ function(module, exports) {

	module.exports = toArray
	
	function toArray(list, index) {
	    var array = []
	
	    index = index || 0
	
	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i]
	    }
	
	    return array
	}


/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var number_1 = __webpack_require__(329);
	var NormalCompare = (function () {
	    function NormalCompare() {
	        this.registers = {};
	    }
	    NormalCompare.prototype.compare = function (origin, target) {
	        return origin == target;
	    };
	    NormalCompare.prototype.register = function () {
	        this.registers["number"] = new number_1.NumberCompare();
	    };
	    NormalCompare.prototype.doCompare = function (origin, target, type, opt) {
	        if (opt === void 0) { opt = "eq"; }
	        if (this.registers.hasOwnProperty(type)) {
	            return this.registers[type].compare(origin, target, opt);
	        }
	        return this.compare(origin, target);
	    };
	    return NormalCompare;
	}());
	exports.compare = new NormalCompare();


/***/ },

/***/ 329:
/***/ function(module, exports) {

	"use strict";
	var NumberCompare = (function () {
	    function NumberCompare() {
	    }
	    NumberCompare.prototype.compare = function (origin, target, type) {
	        switch (type) {
	            case "eqeqeq":
	                return origin === target;
	            case "lt":
	                return origin < target;
	            case "gt":
	                return origin > target;
	            default:
	                return origin == target;
	        }
	    };
	    return NumberCompare;
	}());
	exports.NumberCompare = NumberCompare;


/***/ },

/***/ 330:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	var module_1 = __webpack_require__(31);
	var pointer = __webpack_require__(9);
	var PageExecuteCmdResultController = (function () {
	    function PageExecuteCmdResultController($scope, fxAction, sockets, $q, $timeout, toolbarUtils, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.sockets = sockets;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.cmdClientData = {};
	        this.cmdResClientData = {};
	        this.deviceSelected = [];
	        this.cmdResMap = {};
	        this.listKey = 'executeCmdResList';
	        this.process = { fail: 0, success: 0, total: 0 };
	        if (this.realTime) {
	            this.$scope.$on("socket:connect", function () { });
	            this.$scope.$on("socket:events", function (event, msg) {
	                console.log("socket", msg._source.jid, _this.jid);
	                if (msg._source.jid !== _this.jid) {
	                    return;
	                }
	                _this.cmdResMap[msg._id] = msg;
	                if (_.isArray(_this.cmdResClientData.rows)) {
	                    var devices_1 = _.filter(_this.cmdResClientData.rows, function (item) {
	                        return item._id == msg._id;
	                    });
	                    if (devices_1.length == 0) {
	                        _this.cmdResClientData.rows.push(msg);
	                    }
	                    else {
	                        _.each(devices_1, function (dev, key) {
	                            _.extend(devices_1[key], msg);
	                        });
	                    }
	                }
	                _this.$scope.$emit(_this.listKey + ":refresh");
	            });
	            this.$scope.$watch(function () {
	                return _this.isOpen;
	            }, function (newValue, oldValue) {
	                if (_this.isOpen === false) {
	                    _this.jid = "";
	                }
	            });
	        }
	        this.$scope.$on("showExecuteCmdResult", function (event, cmdId) {
	            _this.cmdClientData = {};
	            _this.cmdResClientData = {};
	            _this.deviceSelected = [];
	            _this.cmdResMap = { len: 0 };
	            _this.jid = "";
	            _this.getCommandResult(cmdId);
	        });
	        this.$scope.$on(this.listKey + ":searchComplete", function (event, data) {
	            _this.deviceSelected = [];
	            _.each(data.rows, function (item, key) {
	                if (_this.cmdResMap.hasOwnProperty(item._id)) {
	                    _.extend(data.rows[key], _this.cmdResMap[item._id]);
	                }
	                _this.deviceSelected.push(_.extend({}, item));
	            });
	            _this.process.total = data.total;
	            _this.setProcess(data['aggregations']);
	        });
	        this.cmdResClientData = {};
	        this.toolbars = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
	            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
	        ];
	    }
	    PageExecuteCmdResultController.prototype.resetProcess = function () {
	        this.process.fail = 0;
	        this.process.success = 0;
	        this.process.total = 0;
	        this.process.complete = 0;
	        this.process.buffer = 0;
	    };
	    PageExecuteCmdResultController.prototype.setProcess = function (aggregations) {
	        var _this = this;
	        _.each(aggregations.count_success.buckets, function (bucket) {
	            switch (bucket.key_as_string) {
	                case "true":
	                    _this.process.success = bucket.doc_count;
	                    break;
	                case "false":
	                    _this.process.fail = bucket.doc_count;
	                    break;
	                default:
	            }
	        });
	        this.process.complete = (this.process.success + this.process.fail) / this.process.total * 100;
	        this.process.buffer = 100;
	    };
	    PageExecuteCmdResultController.prototype.getCommandResult = function (cmdId) {
	        var _this = this;
	        var filter = {};
	        if (!cmdId) {
	            return;
	        }
	        this.resetProcess();
	        this.resFilter = {};
	        this.cmdResMap = {};
	        this.jid = cmdId;
	        this.realTime = true;
	        this.isBusy = true;
	        this.isOpen = true;
	        pointer.set(filter, "/_id/match/-/and", cmdId);
	        this.resFilter = { "/jid/match/-/and": cmdId };
	        this.$q.all([
	            this.fxAction.doAction("executeCmdList", { where: filter })
	        ]).then(function (results) {
	            _this.fxAction.doDealResult(results[0].actionModel, results[0], _this.cmdClientData);
	        }).then(function () {
	            if (_this.cmdClientData.rows.length) {
	                _this.command = _this.cmdClientData.rows[0]._source.command;
	            }
	            else {
	                return _this.getCommandResult(cmdId);
	            }
	        }).finally(function () {
	            _this.isBusy = false;
	        });
	    };
	    return PageExecuteCmdResultController;
	}());
	PageExecuteCmdResultController.$inject = ["$scope", "fxAction", "sockets", "$q", "$timeout", "toolbarUtils", "materialUtils"];
	exports.PageExecuteCmdResultController = PageExecuteCmdResultController;
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: {},
	        bindToController: {
	            "realTime": '@?'
	        },
	        template: __webpack_require__(266),
	        controller: PageExecuteCmdResultController,
	        controllerAs: "executeCmdCtl"
	    };
	}
	module_1.module.directive("executeCmd", [Directive]);
	module_1.module.filter('to_trusted', ['$sce', function ($sce) {
	        return function (text) {
	            return $sce.trustAsHtml(text);
	        };
	    }]);
	module_1.module.directive('angularTerminal', ['$rootScope', function ($rootScope) {
	        return {
	            restrict: 'A',
	            link: function (scope, element, attrs) {
	                var namespace = 'terminal.' + (attrs.angularTerminal || 'default'), t;
	                t = element["terminal"](function (input, terminal) {
	                    $rootScope.$emit(namespace, input, terminal);
	                }, {
	                    greetings: attrs.greetings || '',
	                    enabled: false
	                });
	                $rootScope.$on(namespace + '.echo', function (e, msg) {
	                    t.echo(msg);
	                });
	            }
	        };
	    }]);


/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(31);
	var io = __webpack_require__(301);
	module_1.module.factory("sockets", ["socketFactory", "$rootScope", function (socketFactory, $rootScope) {
	        var Sockets = (function () {
	            function Sockets() {
	                var _this = this;
	                $rootScope.$watch($rootScope.config, function () {
	                    if ($rootScope.config && $rootScope.config.events) {
	                        _this.init();
	                    }
	                });
	            }
	            Sockets.prototype.init = function () {
	                this.events = socketFactory({
	                    ioSocket: io($rootScope.config.events)
	                });
	                this.events.forward("error");
	                this.events.forward("events");
	                this.events.forward("connect");
	                this.events.forward("disconnect");
	            };
	            return Sockets;
	        }());
	        return {
	            events: new Sockets()
	        };
	    }]);


/***/ },

/***/ 332:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	var module_1 = __webpack_require__(155);
	var Controller = (function () {
	    function Controller() {
	        this.selected = this.selected || [];
	        this.key = this.key || "key";
	    }
	    Controller.prototype.isChecked = function (item, selected) {
	        var _this = this;
	        return _.some(selected || this.selected, function (selectItem) {
	            return item[_this.key] == selectItem[_this.key];
	        });
	    };
	    Controller.prototype.isCheckAll = function () {
	        var _this = this;
	        return _.every(this.selected, function (item) {
	            return _this.isChecked(item, item.perGroupActions);
	        });
	    };
	    Controller.prototype.selectAll = function () {
	        var _this = this;
	        _.each(this.selected, function (item) {
	            _this.toggle(item, item.perGroupActions);
	        });
	    };
	    Controller.prototype.toggle = function (item, selected) {
	        var _this = this;
	        var remove = _.remove(selected || this.selected, function (selectItem) {
	            return item[_this.key] == selectItem[_this.key];
	        });
	        if (!remove.length) {
	            item = _.extend({}, item);
	            delete item.perGroupActions;
	            (selected || this.selected).push(item);
	        }
	    };
	    return Controller;
	}());
	exports.Controller = Controller;
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: false,
	        bindToController: {
	            "key": "@?",
	            "selected": "=modandact"
	        },
	        controller: Controller,
	        controllerAs: 'modandactCtl'
	    };
	}
	module_1.module.directive("modandact", [Directive]);


/***/ },

/***/ 333:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var module_1 = __webpack_require__(156);
	var _ = __webpack_require__(3);
	var Controller = (function () {
	    function Controller($scope, fxAction, toolbarUtils, $mdDialog, materialUtils) {
	        var _this = this;
	        this.$scope = $scope;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.$mdDialog = $mdDialog;
	        this.materialUtils = materialUtils;
	        this.itemToolbars = [];
	        this.toolbars = [];
	        this.topToolbars = [];
	        this.layout = "row";
	        this.showSearchTable = true;
	        if (!this.clientData) {
	            this.clientData = {};
	        }
	        this.topToolbars.push(this.toolbarUtils.labelBuilder("\u6240\u9009\u9879\u76EE").attrBuilder({ flex: "" }).toValue());
	        this.itemToolbars.push(this.toolbarUtils.btnBuilder("删除", "md-icon-button", false).iconBuilder("delete", {}).btnClick(function ($event, item, index) {
	            _this.clientData.rows.splice(index, 1);
	        }).toValue());
	        this.closeFn && this.toolbars.push(this.toolbarUtils.btnBuilder("关闭", "md-icon-button", false).iconBuilder("close", {}).btnClick(function ($event, item, index) {
	            console.log(_this.closeFn);
	            _this.closeFn && _this.closeFn();
	        }).toValue());
	        this.topToolbars.push(this.toolbarUtils.btnBuilder("改变布局方向", "md-icon-button", false).iconBuilder("{{listCtl.qtCtl.layout=='column'?'format-vertical-align-center':'format-horizontal-align-center'}}", {}).btnClick(function ($event, item, index) {
	            _this.layout === "column" ? _this.layout = "row" : _this.layout = "column";
	        }).toValue());
	        this.topToolbars.push(this.toolbarUtils.btnBuilder("{{!listCtl.qtCtl.showSearchTable?'显示资产信息':'隐藏资产信息'}}", "md-icon-button", false).iconBuilder("{{!listCtl.qtCtl.showSearchTable?'arrow-down-bold-circle-outline':'arrow-up-bold-circle-outline'}}", {}).btnClick(function ($event, item, index) {
	            _this.showSearchTable = !_this.showSearchTable;
	        }).toValue());
	        this.topToolbars.push(this.toolbarUtils.btnBuilder("清空所有数据", "md-icon-button", false).iconBuilder("clear_all", {}).conditionBuilder("listCtl.qtCtl.clientData.rows.length", false).btnClick(function ($event, item, index) {
	            _this.clientData.rows && (_this.clientData.rows.length = 0);
	        }).toValue());
	        this.$scope.$watch(function () {
	            return _this.ngModel;
	        }, function (newValue) {
	            if (_.isArray(newValue)) {
	                _this.clientData.rows = newValue;
	                _this.clientData.count = _this.clientData.rows.length;
	            }
	        });
	    }
	    return Controller;
	}());
	Controller.$inject = ["$scope", "fxAction", "toolbarUtils", "$mdDialog", "materialUtils"];
	function Directive() {
	    return {
	        restrict: 'EA',
	        scope: false,
	        require: "^ngModel",
	        transclude: true,
	        bindToController: {
	            key: '@fxQueryTable',
	            closeFn: '&?closeFn',
	            ngModel: '=?',
	            resFilter: '=?'
	        },
	        template: __webpack_require__(268),
	        controller: Controller,
	        controllerAs: 'qtCtl',
	        link: function ($scope, $element, $attrs, $ctrl) {
	            $scope.$watch($attrs["_filter"], function (n, o) {
	                console.log(n, o);
	            });
	        }
	    };
	}
	module_1.module.directive('fxQueryTable', Directive);


/***/ },

/***/ 346:
/***/ function(module, exports) {

	"use strict";
	var AllInController = (function () {
	    function AllInController($stateParams, fxAction, toolbarUtils, materialUtils) {
	        this.$stateParams = $stateParams;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	    }
	    return AllInController;
	}());
	AllInController.$inject = ["$stateParams", "fxAction", "toolbarUtils", "materialUtils"];
	exports.AllInController = AllInController;


/***/ },

/***/ 347:
/***/ function(module, exports) {

	"use strict";
	var PageController = (function () {
	    function PageController($stateParams) {
	        this.$stateParams = $stateParams;
	        this.key = $stateParams["key"];
	    }
	    return PageController;
	}());
	PageController.$inject = ["$stateParams"];
	exports.PageController = PageController;


/***/ },

/***/ 348:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	var force_d3_1 = __webpack_require__(350);
	var action_model_1 = __webpack_require__(5);
	var D3Controller = (function () {
	    function D3Controller($stateParams, fxAction, toolbarUtils, materialUtils) {
	        this.$stateParams = $stateParams;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.materialUtils = materialUtils;
	        this.clientData = {};
	        this.key = $stateParams["key"];
	        this.doInit();
	    }
	    D3Controller.prototype.doClickActionMenu = function ($event, actionModel, item) {
	        var _this = this;
	        this.fxAction.doActionModel($event, actionModel, item).then(function (result) {
	            _this.materialUtils.showMsg("" + (actionModel.successMsg || "操作成功!"));
	            if (actionModel.refreshList) {
	            }
	        });
	    };
	    D3Controller.prototype.doGetData = function () {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, { limit: 100, where: {} });
	        if (!promise) {
	            return;
	        }
	        this.isBusy = true;
	        promise.then(function (result) {
	            return _this.fxAction.doDealResult(_this.actionModel, result, _this.clientData);
	        }).then(function (results) {
	        }).finally(function () {
	            _this.isBusy = false;
	            setTimeout(function () {
	                new force_d3_1.Force("#paged3", _this.clientData.rows);
	            }, 200);
	        });
	    };
	    D3Controller.prototype.doInit = function () {
	        var _this = this;
	        this.fxAction.getModel(this.key).then(function (actionModel) {
	            _this.actionModel = actionModel;
	            _this.actionModel.list.toolbars = [];
	            _this.doGetData();
	            return _this.fxAction.getModels(_this.actionModel.actions);
	        }).then(function (actionModels) {
	            _.forEach(actionModels, function (actionModel) {
	                if (actionModel.type !== action_model_1.ActionType.list) {
	                    _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder(actionModel.title, "md-fab md-raised md-mini", false).tooltipBuilder("").iconBuilder(actionModel.icon, { fill: "black" }).btnClick(function ($event, item) {
	                        _this.doClickActionMenu($event, actionModel, item || {});
	                    }).toValue());
	                }
	            });
	            if (_this.actionModel.list.showRefreshBtn) {
	                _this.actionModel.list.toolbars.push(_this.toolbarUtils.btnBuilder("刷新", "md-fab md-raised md-mini", false).iconBuilder("refresh", { fill: "black" }).btnClick(function ($event) {
	                    _this.doGetData();
	                }).toValue());
	            }
	        });
	    };
	    return D3Controller;
	}());
	D3Controller.$inject = ["$stateParams", "fxAction", "toolbarUtils", "materialUtils"];
	exports.D3Controller = D3Controller;


/***/ },

/***/ 349:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var execute_cmd_1 = __webpack_require__(35);
	var PageExecuteCmdController = (function () {
	    function PageExecuteCmdController($rootScope, $stateParams, $timeout, materilUtils, fxAction, toolbarUtils) {
	        this.$rootScope = $rootScope;
	        this.$stateParams = $stateParams;
	        this.$timeout = $timeout;
	        this.materilUtils = materilUtils;
	        this.fxAction = fxAction;
	        this.toolbarUtils = toolbarUtils;
	        this.executeResult = {};
	        this.key = execute_cmd_1.ExecuteCmdForm.key;
	        this.doInitToolbar();
	        this.formData = {
	            listIps: []
	        };
	    }
	    PageExecuteCmdController.prototype.doInitToolbar = function () {
	        this.toolbars = [
	            this.toolbarUtils.noneBuilder("icon").iconBuilder('apple-keyboard-command', {}).toValue(),
	            this.toolbarUtils.labelBuilder('执行命令').attrBuilder({ flex: "" }).toValue()
	        ];
	    };
	    PageExecuteCmdController.prototype.doSubmit = function ($event, form) {
	        var _this = this;
	        var promise = this.fxAction.doAction(this.key, this.formData, form);
	        var results;
	        if (promise) {
	            this.isBusy = true;
	            promise.then(function (res) {
	                _this.materilUtils.showMsg("执行命令成功！");
	                results = res;
	                return _this.fxAction.getModel(_this.key);
	            }).then(function (actionModel) {
	                _this.actionModel = actionModel;
	                return _this.fxAction.doDealResult(actionModel, results, _this.executeResult);
	            }).then(function (res) {
	                _this.$rootScope.$broadcast("showExecuteCmdResult", res.data.cmdid);
	            }).finally(function () {
	                _this.isBusy = false;
	            });
	        }
	    };
	    return PageExecuteCmdController;
	}());
	PageExecuteCmdController.$inject = ["$rootScope", "$stateParams", "$timeout", "materialUtils", "fxAction", "toolbarUtils"];
	exports.PageExecuteCmdController = PageExecuteCmdController;


/***/ },

/***/ 350:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var d3 = __webpack_require__(24);
	var _ = __webpack_require__(3);
	var defaultLinks = [
	    { source: "Microsoft", target: "Amazon", type: "licensing" },
	    { source: "Microsoft", target: "HTC", type: "licensing" },
	    { source: "Samsung", target: "Apple", type: "suit" },
	    { source: "Motorola", target: "Apple", type: "suit" },
	    { source: "Nokia", target: "Apple", type: "resolved" },
	    { source: "HTC", target: "Apple", type: "suit" },
	    { source: "Kodak", target: "Apple", type: "suit" },
	    { source: "Microsoft", target: "Barnes & Noble", type: "suit" },
	    { source: "Microsoft", target: "Foxconn", type: "suit" },
	    { source: "Oracle", target: "Google", type: "suit" },
	    { source: "Apple", target: "HTC", type: "suit" },
	    { source: "Microsoft", target: "Inventec", type: "suit" },
	    { source: "Samsung", target: "Kodak", type: "resolved" },
	    { source: "LG", target: "Kodak", type: "resolved" },
	    { source: "RIM", target: "Kodak", type: "suit" },
	    { source: "Sony", target: "LG", type: "suit" },
	    { source: "Kodak", target: "LG", type: "resolved" },
	    { source: "Apple", target: "Nokia", type: "resolved" },
	    { source: "Qualcomm", target: "Nokia", type: "resolved" },
	    { source: "Apple", target: "Motorola", type: "suit" },
	    { source: "Microsoft", target: "Motorola", type: "suit" },
	    { source: "Motorola", target: "Microsoft", type: "suit" },
	    { source: "Huawei", target: "ZTE", type: "suit" },
	    { source: "Ericsson", target: "ZTE", type: "suit" },
	    { source: "Kodak", target: "Samsung", type: "resolved" },
	    { source: "Apple", target: "Samsung", type: "suit" },
	    { source: "Kodak", target: "RIM", type: "suit" },
	    { source: "Nokia", target: "Qualcomm", type: "suit" }
	];
	var Force = (function () {
	    function Force(select, nodes, links) {
	        var _this = this;
	        this.nodes = nodes;
	        this.links = links;
	        var covNodes = {};
	        this.nodes = [];
	        this.links = _.clone(defaultLinks);
	        _.each(this.links, function (link) {
	            link.source = covNodes[link.source] || (covNodes[link.source] = { title: link.source });
	            link.target = covNodes[link.target] || (covNodes[link.target] = { title: link.target });
	        });
	        this.nodes = d3.values(covNodes);
	        var width = innerWidth, height = innerHeight;
	        this.simulation = d3.forceSimulation(this.nodes)
	            .force("link", d3.forceLink(this.links || []).distance(60))
	            .force("charge", d3.forceManyBody().strength(-300))
	            .force("center", d3.forceCenter(width / 2, height / 2));
	        d3.select(select).select("*").remove();
	        var svg = d3.select(select)
	            .append("svg")
	            .attr("width", "100%")
	            .attr("height", "100%");
	        svg.append("defs").selectAll("marker")
	            .data(["suit", "licensing", "resolved"])
	            .enter().append("marker")
	            .attr("id", function (d) { return d; })
	            .attr("viewBox", "0 -5 10 10")
	            .attr("refX", 15)
	            .attr("refY", -1.5)
	            .attr("markerWidth", 6)
	            .attr("markerHeight", 6)
	            .attr("orient", "auto")
	            .append("path")
	            .attr("d", "M0,-5L10,0L0,5");
	        var path = svg.append("g").selectAll("path")
	            .data(this.links)
	            .enter()
	            .append("path")
	            .attr("class", function (d) {
	            return "link " + d["type"];
	        })
	            .attr("marker-end", function (d) {
	            return "url(#" + d['type'] + ")";
	        });
	        var circle = svg.append("g").selectAll("circle")
	            .data(this.nodes)
	            .enter().append("circle")
	            .attr("r", 6)
	            .call(d3.drag()
	            .on("start", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0.5).restart();
	            }
	            d.fx = d.x;
	            d.fy = d.y;
	        })
	            .on("drag", function (d) {
	            d.fx = d3.event.x;
	            d.fy = d3.event.y;
	        })
	            .on("end", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0);
	            }
	            d.fx = null;
	            d.fy = null;
	        }));
	        var text = svg.append("g").selectAll("text")
	            .data(this.nodes)
	            .enter().append("text")
	            .attr("x", 8)
	            .attr("y", ".31em")
	            .text(function (d) { return d.title; });
	        svg.selectAll("g").attr("width", width).attr("height", height);
	        this.simulation.nodes(this.nodes)
	            .force("link", d3.forceLink(this.links))
	            .on("tick", tick);
	        function tick() {
	            path.attr("d", linkArc);
	            circle.attr("transform", transform);
	            text.attr("transform", transform);
	        }
	        function linkArc(d) {
	            if (d.target.x === undefined)
	                return;
	            var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
	            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
	        }
	        function transform(d) {
	            return "translate(" + d.x + "," + d.y + ")";
	        }
	    }
	    return Force;
	}());
	exports.Force = Force;
	var Force1 = (function () {
	    function Force1(select, nodes, links) {
	        var _this = this;
	        this.nodes = nodes;
	        this.links = links;
	        var defaultNodes = [
	            { title: "桂林" }, { title: "广州" },
	            { title: "厦门" }, { title: "杭州" },
	            { title: "上海" }, { title: "青岛" },
	            { title: "天津" }
	        ];
	        var defaultLinks = [{ source: 2, target: 4 }];
	        this.nodes = this.nodes || defaultNodes;
	        this.links = this.links || defaultLinks;
	        _.each(this.nodes, function (node, index) {
	            node.fy = null;
	            node.fx = null;
	            _this.links.push({ source: 0, target: index + 1 });
	        });
	        this.nodes.unshift({ title: "Ἀσάνα" });
	        this.svg = d3.select(select);
	        this.svg.select("*").remove();
	        this.svg = this.svg.append("svg")
	            .attr("width", "100%")
	            .attr("height", "100%");
	        this.doDraw();
	    }
	    Force1.prototype.doZoom = function () {
	        var _this = this;
	        this.zoom = d3.zoom()
	            .scaleExtent([0.5, 10])
	            .duration(400)
	            .on("zoom", function () {
	            _this.svg.select(".nodes").attr("transform", d3.event.transform);
	            _this.svg.select(".texts").attr("transform", d3.event.transform);
	            _this.svg.select(".lines").attr("transform", d3.event.transform);
	        });
	        this.svg.call(this.zoom);
	    };
	    Force1.prototype.doDrawNodes = function () {
	        var _this = this;
	        this.svgEdges = this.svg.append("g")
	            .attr("class", "nodes")
	            .selectAll("circle")
	            .data(this.nodes)
	            .enter()
	            .append("circle")
	            .attr("r", 5)
	            .attr("cx", 100)
	            .attr("cy", 100)
	            .style("fill", "black")
	            .call(d3.drag()
	            .on("start", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0.5).restart();
	            }
	            d.fx = d.x;
	            d.fy = d.y;
	        })
	            .on("drag", function (d) {
	            d.fx = d3.event.x;
	            d.fy = d3.event.y;
	        })
	            .on("end", function (d) {
	            if (!d3.event.active) {
	                _this.simulation.alphaTarget(0);
	            }
	            d.fx = null;
	            d.fy = null;
	        }));
	        return this.svgEdges;
	    };
	    Force1.prototype.doDrawEdges = function () {
	        this.svgEdges = this.svg.append("g")
	            .attr("class", "lines")
	            .selectAll("line")
	            .data(this.links)
	            .enter()
	            .append("line")
	            .style("stroke", "#ccc")
	            .style("stroke-width", 1);
	        return this.svgEdges;
	    };
	    Force1.prototype.doDrawTexts = function () {
	        this.svgTexts = this.svg.append("g")
	            .attr("class", "texts")
	            .selectAll("text")
	            .data(this.nodes)
	            .enter()
	            .append("text")
	            .style("fill", "black")
	            .attr("dx", 20)
	            .attr("dy", 8)
	            .text(function (d) {
	            return d.title;
	        });
	        this.svgTexts.append("title")
	            .text(function (d) { return d.title; });
	        this.svgTexts.append("text")
	            .attr("dy", ".3em")
	            .attr("class", "nodetext")
	            .style("text-anchor", "middle")
	            .text(function (d) { return d.title; });
	        return this.svgTexts;
	    };
	    Force1.prototype.doDraw = function () {
	        var width = innerWidth, height = innerHeight;
	        this.doZoom();
	        this.simulation = d3.forceSimulation(this.nodes)
	            .force("link", d3.forceLink(this.links))
	            .force("charge", d3.forceManyBody().strength(-5000).theta(200).distanceMin(200))
	            .force("center", d3.forceCenter(width / 3, height / 2));
	        var edges = this.doDrawEdges();
	        var texts = this.doDrawTexts();
	        var nodes = this.doDrawNodes();
	        this.simulation.nodes(this.nodes)
	            .on("tick", tick)
	            .force("link");
	        function tick() {
	            edges && edges
	                .attr("x1", function (d) {
	                return d.source.x || 0;
	            })
	                .attr("y1", function (d) {
	                return d.source.y || 0;
	            })
	                .attr("x2", function (d) {
	                return d.target.x || 0;
	            })
	                .attr("y2", function (d) {
	                return d.target.y || 0;
	            });
	            nodes && nodes.attr("cx", function (datum) {
	                return datum.x || 0;
	            }).attr("cy", function (datum) {
	                return datum.y || 0;
	            });
	            texts && texts.attr("x", function (d) {
	                return d.x || 0;
	            }).attr("y", function (d) {
	                return d.y || 0;
	            });
	        }
	    };
	    return Force1;
	}());
	exports.Force1 = Force1;
	var Force2 = (function () {
	    function Force2(select, nodes, links) {
	        this.nodes = nodes;
	        this.links = links;
	        var defaultLinks = [{ source: 2, target: 4 }, { source: 2, target: 5 }, { source: 2, target: 3 }];
	        this.links = defaultLinks;
	        this.container = d3.select(select);
	        this.cardContainer = this.container.select(".card-container");
	        this.doZoom();
	        this.doDrawEdges();
	        this.doDraw();
	    }
	    Force2.prototype.doZoom = function () {
	        var _this = this;
	        this.zoom = d3.zoom()
	            .scaleExtent([0.5, 10])
	            .duration(400)
	            .on("zoom", function () {
	            _this.container.select(".card-container").style("transform", "scale(" + d3.event.transform.k + ") translate(" + d3.event.transform.x + "px," + d3.event.transform.y + "px)");
	            _this.container.select(".lines").attr("transform", d3.event.transform);
	        });
	        this.container.call(this.zoom);
	    };
	    Force2.prototype.doDrawEdges = function () {
	        this.svgEdges = this.cardContainer.append("svg")
	            .attr("class", "lines")
	            .selectAll("line")
	            .data(this.links)
	            .enter()
	            .append("line")
	            .style("stroke", "#ccc")
	            .style("stroke-width", 1);
	        this.dragLine = this.cardContainer.select("svg")
	            .append("line")
	            .attr("class", "drag_line")
	            .attr("x1", 0)
	            .attr("y1", 0)
	            .attr("x2", 0)
	            .attr("y2", 0);
	    };
	    Force2.prototype.doDraw = function () {
	        var _this = this;
	        var width = innerWidth, height = innerHeight;
	        this.simulation = d3.forceSimulation(this.nodes)
	            .force("link", d3.forceLink(this.links || []))
	            .force("charge", d3.forceManyBody().strength(-50))
	            .force("center", d3.forceCenter(width / 2, height / 2));
	        this.container
	            .on("mousemove", function () {
	            _this.currentNode && _this.dragLine
	                .attr("x1", _this.currentNode.x)
	                .attr("y1", _this.currentNode.y)
	                .attr("x2", d3.event.layerX)
	                .attr("y2", d3.event.layerY)
	                .style("stroke", "#000")
	                .style("stroke-width", 1);
	            return false;
	        });
	        this.cardContainer
	            .selectAll(".card")
	            .data(this.nodes)
	            .enter();
	        this.cardContainer
	            .selectAll(".card")
	            .on("mousedown", function (d) {
	            _this.currentNode = d;
	        })
	            .on("mouseup", function () {
	        });
	        this.simulation.nodes(this.nodes)
	            .force("link", d3.forceLink(this.links))
	            .on("tick", ticked)
	            .force("link");
	        var container = this.cardContainer;
	        var edges = this.svgEdges;
	        function ticked() {
	            edges
	                .attr("x1", function (d) {
	                return (d.source.x || 0);
	            })
	                .attr("y1", function (d) {
	                return d.source.y || 0;
	            })
	                .attr("x2", function (d) {
	                return d.target.x || 0;
	            })
	                .attr("y2", function (d) {
	                return (d.target.y || 0);
	            });
	            container.selectAll(".card").style("left", function (d) {
	                return (d.x || 0) + "px";
	            }).style("top", function (d) {
	                return (d.y || 0) + "px";
	            });
	        }
	    };
	    return Force2;
	}());
	exports.Force2 = Force2;


/***/ },

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var ngMaterial = __webpack_require__(7);
	var ngMaterialIcons = __webpack_require__(19);
	var mdDataTable = __webpack_require__(173);
	var router_1 = __webpack_require__(204);
	var material_service_1 = __webpack_require__(16);
	var rest_service_1 = __webpack_require__(20);
	var action_1 = __webpack_require__(15);
	var dycompile_1 = __webpack_require__(196);
	var query_table_1 = __webpack_require__(200);
	var compare_1 = __webpack_require__(195);
	var execute_cmd_1 = __webpack_require__(35);
	var execute_1 = __webpack_require__(197);
	var pages_1 = __webpack_require__(199);
	__webpack_require__(174);
	__webpack_require__(26);
	__webpack_require__(194);
	exports.module = angular.module("pageModule", [pages_1.default, execute_1.default, compare_1.default, ngMaterialIcons, dycompile_1.default, action_1.default, mdDataTable, ngMaterial, 'ui.router', 'gridster', 'btford.socket-io', material_service_1.default, rest_service_1.default, query_table_1.default]);
	execute_cmd_1.default(exports.module);
	exports.module.config([
	    "$stateProvider",
	    "$urlRouterProvider",
	    function ($stateProvider, $urlRouterProvider) {
	        router_1.initRouter($urlRouterProvider, $stateProvider);
	    }
	])
	    .run(["$rootScope", "$state", "restUtils", "materialUtils", "fxAction", function ($rootScope, $state, restUtils, materialUtils, fxAction) {
	        restUtils.setConfig(function (restAngularConfigure) {
	            restAngularConfigure.setErrorInterceptor(function (response) {
	                if (response.status !== 401) {
	                    response.data && materialUtils.showErrMsg(response.data.msg);
	                }
	            });
	        });
	        $rootScope.$on("executeCmdList:clickItem", function (event, actionModel, item) {
	            if (actionModel.key === "executeCmdResList-detail") {
	                $rootScope.$broadcast("showExecuteCmdResult", item._id);
	                actionModel.cancel = true;
	            }
	        });
	    }]);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = "" + exports.module.name;


/***/ },

/***/ 406:
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },

/***/ 407:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/wtf8 v1.0.0 by @mathias */
	;(function(root) {
	
		// Detect free variables `exports`
		var freeExports = typeof exports == 'object' && exports;
	
		// Detect free variable `module`
		var freeModule = typeof module == 'object' && module &&
			module.exports == freeExports && module;
	
		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof global == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}
	
		/*--------------------------------------------------------------------------*/
	
		var stringFromCharCode = String.fromCharCode;
	
		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}
	
		function encodeCodePoint(codePoint) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}
	
		function wtf8encode(string) {
			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint);
			}
			return byteString;
		}
	
		/*--------------------------------------------------------------------------*/
	
		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}
	
			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}
	
			// If we end up here, it’s not a continuation byte.
			throw Error('Invalid continuation byte');
		}
	
		function decodeSymbol() {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;
	
			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}
	
			if (byteIndex == byteCount) {
				return false;
			}
	
			// Read the first byte.
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;
	
			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}
	
			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				var byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}
	
			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}
	
			throw Error('Invalid WTF-8 detected');
		}
	
		var byteArray;
		var byteCount;
		var byteIndex;
		function wtf8decode(byteString) {
			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol()) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}
	
		/*--------------------------------------------------------------------------*/
	
		var wtf8 = {
			'version': '1.0.0',
			'encode': wtf8encode,
			'decode': wtf8decode
		};
	
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return wtf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}	else if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = wtf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in wtf8) {
					hasOwnProperty.call(wtf8, key) && (freeExports[key] = wtf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.wtf8 = wtf8;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)(module), (function() { return this; }())))

/***/ },

/***/ 409:
/***/ function(module, exports) {

	/* (ignored) */

/***/ }

},[351]);
//# sourceMappingURL=page.bundle.js.map