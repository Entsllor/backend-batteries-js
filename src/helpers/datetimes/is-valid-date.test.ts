import {isValidDate} from "./is-valid-date";
import {assert, describe, it} from "vitest";

describe('isValidDate', () => {
    it('should return true for valid ISO format dates', () => {
        assert.isTrue(isValidDate('2023-09-24T10:15:30Z'));
        assert.isTrue(isValidDate('2023-09-24T10:15:30+02:00'));
        assert.isTrue(isValidDate('2023-09-24T10:15:30.123Z'));
    });

    it('should return true for valid date strings', () => {
        assert.isTrue(isValidDate('2023-09-24'));
        assert.isTrue(isValidDate('September 24, 2023'));
    });

    it('should return true for valid timestamp numbers', () => {
        assert.isTrue(isValidDate(1632470400000),); // 2023-09-24T00:00:00.000Z
    });

    it('should return false for invalid date strings', () => {
        assert.isFalse(isValidDate('invalid-date'));
        assert.isFalse(isValidDate('2023-09-32'));
    });

    it('should return false for invalid timestamp numbers', () => {
        assert.isFalse(isValidDate(NaN));
        assert.isFalse(isValidDate(Infinity));
    });

    it('should return true for valid Date objects', () => {
        assert.isTrue(isValidDate(new Date()));
        assert.isTrue(isValidDate(new Date('2023-09-24')));
    });

    it('should return false for invalid Date objects', () => {
        assert.isFalse(isValidDate(new Date('invalid-date')));
        assert.isFalse(isValidDate(new Date('2023-09-32')));
    });

    it('should return false for non-date values', () => {
        assert.isFalse(isValidDate(null));
        assert.isFalse(isValidDate(undefined));
        assert.isFalse(isValidDate({}));
        assert.isFalse(isValidDate([]));
        assert.isFalse(isValidDate(true));
    });
});
