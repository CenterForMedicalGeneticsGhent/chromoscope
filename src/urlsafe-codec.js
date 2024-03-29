const { deflateSync, inflateSync } = require('zlib');
const { fromByteArray, toByteArray } = require('base64-js');

class UrlsafeCodec {
    static encode(dictionary) {
        const string = JSON.stringify(dictionary);
        const stringAsBuffer = Buffer.from(string);
        const compressedBuffer = deflateSync(stringAsBuffer);
        const base64Bytes = fromByteArray(compressedBuffer);
        const base64Blob = base64Bytes.toString();
        const base64UrlsafeBlob = base64Blob.replace(/\+/g, '.').replace(/\//g, '_').replace(/=/g, '-');
        return base64UrlsafeBlob;
    }

    static decode(encodedString) {
        const base64Blob = encodedString.replace(/\./g, '+').replace(/_/g, '/').replace(/-/g, '=');
        const compressedBuffer = toByteArray(base64Blob);
        const bytes = inflateSync(Buffer.from(compressedBuffer));
        const string = bytes.toString();
        const dictionary = JSON.parse(string);
        return dictionary;
    }
}


module.exports = UrlsafeCodec;