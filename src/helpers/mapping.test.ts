import {assert, assertType, describe, it, test} from "vitest";
import {keysOf, mapArray, skipFalsy, valuesOf} from "./mapping";

test("skipFalsy", () => {
    assert.sameOrderedMembers(skipFalsy(0, 1, -1, undefined, null), [1, -1]);
    assert.sameOrderedMembers(skipFalsy("", "a", "b", "0", undefined, null), ["a", "b", "0"]);
    assert.sameDeepOrderedMembers(skipFalsy(undefined, {a: "test"}), [{a: "test"}]);
});

describe("mapArray", () => {
    it("should convert if key is string", () => {
        const value = [
            {id: "1", name: "a"},
            {id: "2", name: "b"},
        ];
        const result = mapArray(value, "id");
        assert.deepOwnInclude(result, {
            "1": {id: "1", name: "a"},
            "2": {id: "2", name: "b"},
        });
        assertType<string[]>(Object.keys(result));
    });

    it("should convert if key is number", () => {
        const value = [
            {id: 1, name: "a"},
            {id: 2, name: "b"},
        ];
        const result = mapArray(value, "id");
        assert.deepOwnInclude(result, {
            "1": {id: 1, name: "a"},
            "2": {id: 2, name: "b"},
        });
        assertType<string[]>(keysOf(result));
    });
});

describe("valuesOf", () => {
    it("should return values (numbers) of obj", () => {
        const obj = {a: 1, b: 2, c: 3};
        const result = valuesOf(obj);
        assert.sameMembers(result, [1, 2, 3]);
        assertType<number[]>(result);
    });

    it("should return values (strings) of obj", () => {
        const obj = {a: "1", b: "2", c: "3"};
        const result = valuesOf(obj);
        assert.sameMembers(result, ["1", "2", "3"]);
        assertType<string[]>(result);
    });

    it("should return array items", () => {
        const obj = [1, 2, "4"];
        const result = valuesOf(obj);
        assert.sameMembers(result, obj);
        assertType<(string | number)[]>(result);
    });
});

describe("keysOf", () => {
    it("should return obj keys", () => {
        const obj = {a: "1", b: "2", "3": "3"};
        const result = keysOf(obj);
        assert.sameMembers(result, ["a", "b", "3"]);
        assertType<(keyof typeof obj)[]>(result);
    });

    it("should return array keys", () => {
        const obj = [1, 2, "4"];
        const result = keysOf(obj);
        assert.sameMembers(result, ["0", "1", "2"]);
        assertType<string[]>(result);
    });
});
