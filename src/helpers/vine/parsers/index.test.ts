import vine from "@vinejs/vine";
import {withDefault} from "./with-default";
import {assert, test} from "vitest";
import {coalesce} from "./coalesce";
import {withParser} from "./with-parser";

const ThemeType = vine.enum(['dark', 'light', 'system'])


test('parse with default', async () => {
    const validator = vine.compile(withDefault(ThemeType, 'system'))
    assert.equal(await validator.validate(undefined), 'system')
    await validator.validate(null).catch(e => assert.equal(e.code, 'E_VALIDATION_ERROR'))
})

test('parse coalesce', async () => {
    const validator = vine.compile(coalesce(ThemeType, 'system'))
    assert.equal(await validator.validate(undefined), 'system')
    assert.equal(await validator.validate(null), 'system')
    assert.equal(await validator.validate('dark'), 'dark')
    await validator.validate('solarized').catch(e => assert.equal(e.code, 'E_VALIDATION_ERROR'))
})

test('with parser', async () => {
    const parser = (value: unknown) => typeof value === "string" ? value.toLowerCase() : 'system'
    const validator = vine.compile(withParser(ThemeType, parser))
    assert.equal(await validator.validate('DARK'), 'dark')
    assert.equal(await validator.validate('lIghT'), 'light')
    assert.equal(await validator.validate('system'), 'system')
    assert.equal(await validator.validate(null), 'system')
    assert.equal(await validator.validate(undefined), 'system')
})