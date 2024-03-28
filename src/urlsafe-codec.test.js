import UrlsafeCodec from "./urlsafe-codec";

describe('UrlsafeCodec', () => {
    test('should produce URL safe encoded strings', () => {
        const sampleDict = { key: 'value', anotherKey: 'another_value' };
        const encoded = UrlsafeCodec.encode(sampleDict);
        const isUrlSafe = encoded === encodeURIComponent(encoded);

        expect(isUrlSafe).toBeTruthy();
    });

    test('should return the original dictionary after encoding and then decoding', () => {
        const sampleDict = { key: 'value', anotherKey: 'another_value' };
        const encoded = UrlsafeCodec.encode(sampleDict);
        const decoded = UrlsafeCodec.decode(encoded);

        expect(decoded).toEqual(sampleDict);
    });
});