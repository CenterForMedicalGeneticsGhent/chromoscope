import pako from 'pako';
import base64Js from 'base64-js';

//const pako = require('pako');
//const base64Js = require('base64-js');

class UrlsafeCodec {
    static encode(dictionary) {
        const string = JSON.stringify(dictionary);
        const encoder = new TextEncoder();
        const stringAsUint8Array = encoder.encode(string);
        const compressedUint8Array = pako.deflate(stringAsUint8Array);
        const base64Bytes = base64Js.fromByteArray(compressedUint8Array);
        const base64Blob = base64Bytes.toString();
        const base64UrlsafeBlob = base64Blob.replace(/\+/g, '.').replace(/\//g, '_').replace(/=/g, '-');
        return base64UrlsafeBlob;
    }

    static decode(encodedString) {
        const base64Blob = encodedString.replace(/\./g, '+').replace(/_/g, '/').replace(/-/g, '=');
        const compressedUint8Array = base64Js.toByteArray(base64Blob);
        const bytes = pako.inflate(compressedUint8Array);
        const decoder = new TextDecoder();
        const string = decoder.decode(bytes);
        const dictionary = JSON.parse(string);
        return dictionary;
    }
}

//module.exports = UrlsafeCodec;
export default UrlsafeCodec;