/* eslint-disable */
import { Buffer } from "buffer/";
window.Buffer = Buffer;

/**
 * Encodes data in bencode.
 *
 * @param  {Buffer|Array|String|Object|Number|Boolean} data
 * @return {Buffer}
 */
export function encode(data, buffer, offset) {
  var buffers = [];
  var result = null;

  encode._encode(buffers, data);
  result = Buffer.concat(buffers);
  encode.bytes = result.length;

  if (Buffer.isBuffer(buffer)) {
    result.copy(buffer, offset);
    return buffer;
  }

  return result;
}

encode.bytes = -1;
encode._floatConversionDetected = false;

encode._encode = function (buffers, data) {
  if (Buffer.isBuffer(data)) {
    buffers.push(Buffer.from(data.length + ":"));
    buffers.push(data);
    return;
  }

  if (data == null) {
    return;
  }

  switch (typeof data) {
    case "string":
      encode.buffer(buffers, data);
      break;
    case "number":
      if (!!(data % 1)) {
        encode.float(buffers, data);
        break;
      } else {
        encode.number(buffers, data);
        break;
      }
    case "object":
      data.constructor === Array
        ? encode.list(buffers, data)
        : encode.dict(buffers, data);
      break;
    case "boolean":
      encode.boolean(buffers, data);
      break;
    case "float":
      encode.float(buffers, data);
      break;
  }
};

var buffE = Buffer.from("e");
var buffD = Buffer.from("d");
var buffL = Buffer.from("l");

encode.buffer = function (buffers, data) {
  buffers.push(Buffer.from(Buffer.byteLength(data) + ":" + data));
};

encode.number = function (buffers, data) {
  var maxLo = 0x80000000;
  var hi = (data / maxLo) << 0;
  var lo = data % maxLo << 0;
  var val = hi * maxLo + lo;

  buffers.push(Buffer.from("i" + val + "e"));
};

encode.float = function (buffers, data) {
  var val = String(data);
  buffers.push(Buffer.from("f" + val + "e"));
};

encode.boolean = function (buffers, data) {
  var val = data ? 1 : 0;
  buffers.push(Buffer.from("j" + val + "e"));

  if (!(true == data || false == data)) {
    console.warn(
      "WARNING: Possible data corruption detected with value " + data
    );
    console.trace();
  }
};

encode.dict = function (buffers, data) {
  buffers.push(buffD);

  var j = 0;
  var k;
  // fix for issue #13 - sorted dicts
  var keys = Object.keys(data).sort();
  var kl = keys.length;

  for (; j < kl; j++) {
    k = keys[j];
    if (data[k] == null) continue;
    encode.buffer(buffers, k);
    encode._encode(buffers, data[k]);
  }

  buffers.push(buffE);
};

encode.list = function (buffers, data) {
  var i = 0;
  var c = data.length;
  buffers.push(buffL);

  for (; i < c; i++) {
    if (data[i] == null) continue;
    encode._encode(buffers, data[i]);
  }

  buffers.push(buffE);
};
