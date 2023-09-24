import {isIsoDateString, isValidDate} from "./is-valid-date";
import {assert, describe, it, test} from "vitest";

describe('isValidDate', () => {
    it('should return true for valid ISO format dates', () => {
        assert.strictEqual(isValidDate('2023-09-24T10:15:30Z'), true);
        assert.strictEqual(isValidDate('2023-09-24T10:15:30+02:00'), true);
        assert.strictEqual(isValidDate('2023-09-24T10:15:30.123Z'), true);
    });

    it('should return true for valid date strings', () => {
        assert.strictEqual(isValidDate('2023-09-24'), true);
        assert.strictEqual(isValidDate('September 24, 2023'), true);
    });

    it('should return true for valid timestamp numbers', () => {
        assert.strictEqual(isValidDate(1632470400000), true); // 2023-09-24T00:00:00.000Z
    });

    it('should return false for invalid date strings', () => {
        assert.strictEqual(isValidDate('invalid-date'), false);
        assert.strictEqual(isValidDate('2023-09-32'), false);
    });

    it('should return false for invalid timestamp numbers', () => {
        assert.strictEqual(isValidDate(NaN), false);
        assert.strictEqual(isValidDate(Infinity), false);
    });

    it('should return true for valid Date objects', () => {
        assert.strictEqual(isValidDate(new Date()), true);
        assert.strictEqual(isValidDate(new Date('2023-09-24')), true);
    });

    it('should return false for invalid Date objects', () => {
        assert.strictEqual(isValidDate(new Date('invalid-date')), false);
        assert.strictEqual(isValidDate(new Date('2023-09-32')), false);
    });

    it('should return false for non-date values', () => {
        assert.strictEqual(isValidDate(null), false);
        assert.strictEqual(isValidDate(undefined), false);
        assert.strictEqual(isValidDate({}), false);
        assert.strictEqual(isValidDate([]), false);
        assert.strictEqual(isValidDate(true), false);
    });
});

test('isIsoDateString', () => {
    // Test valid ISO date strings
    assert.ok(isIsoDateString('2023-09-24T12:34:56.789Z'));
    assert.ok(isIsoDateString('2010-01-01T00:00:00.000Z'));
    assert.ok(isIsoDateString('1999-12-31T23:59:59.999Z'));

    // Test invalid ISO date strings
    assert.notOk(isIsoDateString('1999-13-31T23:59:59.999Z')); // Invalid date
    assert.notOk(isIsoDateString('2023/09/24T12:34:56.789Z')); // Invalid delimiter
    assert.notOk(isIsoDateString('2023-09-24')); // Date without time
    assert.notOk(isIsoDateString('abc')); // Non-date string
    assert.notOk(isIsoDateString(123)); // Non-string input
});