import {uuid4} from "./uuid4";
import {assert, test} from "vitest";

test('generate uuid', () => {
    const result = uuid4()
    assert.match(result, /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
})