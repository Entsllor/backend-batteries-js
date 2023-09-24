import vine from "@vinejs/vine";
import {withDefault} from "./with-default";
import {assert, test} from "vitest";
import {coalesce} from "./coalesce";
import {withParser} from "./with-parser";

const ThemeType = vine.enum(['dark', 'light', 'system'])


test('parse with default', async () => {
    const validator = vine.compile(withDefault(ThemeType, 'system'))
    assert.strictEqual(await validator.validate(undefined), 'system')
    await validator.validate(null).catch(e => assert.strictEqual(e.code, 'E_VALIDATION_ERROR'))
})

test('parse coalesce', async () => {
    const validator = vine.compile(coalesce(ThemeType, 'system'))
    assert.strictEqual(await validator.validate(undefined), 'system')
    assert.strictEqual(await validator.validate(null), 'system')
    assert.strictEqual(await validator.validate('dark'), 'dark')
    await validator.validate('solarized').catch(e => assert.strictEqual(e.code, 'E_VALIDATION_ERROR'))
})

test('with parser', async () => {
    const parser = (value: unknown) => (typeof value === "string" ? value.toLowerCase() : 'system') as 'dark' | 'light' | 'system'
    const validator = vine.compile(withParser(ThemeType, parser))
    assert.strictEqual(await validator.validate('DARK'), 'dark')
    assert.strictEqual(await validator.validate('lIghT'), 'light')
    assert.strictEqual(await validator.validate('system'), 'system')
    assert.strictEqual(await validator.validate(null), 'system')
    assert.strictEqual(await validator.validate(undefined), 'system')
})