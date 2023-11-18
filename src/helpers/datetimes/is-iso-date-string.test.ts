import {assert, test} from "vitest";
import {isIsoDateString} from "./is-iso-date-string";

test('isIsoDateString', () => {
    // Test valid ISO date strings
    assert.isTrue(isIsoDateString('2023-09-24T12:34:56.789Z'));
    assert.isTrue(isIsoDateString('2010-01-01T00:00:00.000Z'));
    assert.isTrue(isIsoDateString('1999-12-31T23:59:59.999Z'));

    // Test invalid ISO date strings
    assert.isFalse(isIsoDateString('1999-13-31T23:59:59.999Z')); // Invalid date
    assert.isFalse(isIsoDateString('2023/09/24T12:34:56.789Z')); // Invalid delimiter
    assert.isFalse(isIsoDateString('2023-09-24')); // Date without time
    assert.isFalse(isIsoDateString('abc')); // Non-date string
    assert.isFalse(isIsoDateString(123)); // Non-string input
});
