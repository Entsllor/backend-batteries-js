import {describe, expect, it} from "vitest";
import {createSchema} from "./index.js";

describe("createSchema", () => {
    it("should accept constructor", () => {
        const now = new Date();
        expect(createSchema(Date).parse(now.getTime()).getTime()).eq(now.getTime());
        expect(createSchema(Number).parse("42")).eq(42);
        expect(createSchema(String).parse(42)).eq("42");
        expect(createSchema(Boolean).parse(1)).eq(true);
    });

    it("should accept primitives", () => {
        expect(createSchema(42).parse(undefined)).eq(42);
        expect(createSchema(42).parse("30")).eq(30);

        expect(createSchema("foo").parse(undefined)).eq("foo");
        expect(createSchema("foo").parse(30)).eq("30");

        expect(createSchema(true).parse(undefined)).eq(true);
        expect(createSchema(true).parse(0)).eq(false);

        const now = new Date();
        const past = new Date(2020, 0, 1);
        expect(createSchema(now).parse(undefined)).eq(now);
        expect(createSchema(now).parse(past).getTime()).eq(past.getTime());
    });

    // Complex schemas
    it("should accept objects with constructors as fields", () => {
        const schema = createSchema({name: String, cost: Number});
        expect(schema.parse({name: 42, cost: "100"})).deep.eq({name: "42", cost: 100});
    });

    it("should accept objects with primitives as fields", () => {
        const schema = createSchema({name: "foo", cost: 40});
        expect(schema.parse({name: 42, cost: "100"})).deep.eq({name: "42", cost: 100});
        expect(schema.parse({})).deep.eq({name: "foo", cost: 40});
    });

    it("should support object with sub schema", () => {
        const subSchema = createSchema({firstName: String, lastName: String});
        const schema = createSchema({user: subSchema, position: String});
        expect(schema.parse({user: {firstName: "John", lastName: "Weak"}, position: "Gunholder"})).deep.eq({
            user: {firstName: "John", lastName: "Weak"},
            position: "Gunholder",
        });
    });

    it("should support object as sub schema", () => {
        const schema = createSchema({user: {firstName: String, lastName: 'foo'}, position: String, birthdate: Date});
        const now = new Date();
        expect(
            schema.parse({user: {firstName: "John", lastName: "Weak"}, position: "Gunholder", birthdate: now})
        ).deep.eq({
            user: {firstName: "John", lastName: "Weak"},
            position: "Gunholder",
            birthdate: now,
        });
    });
});
