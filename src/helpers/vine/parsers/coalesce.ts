import {WithDefaultParser} from "../../../types/vine/parsers";

export const coalesce: WithDefaultParser = (vineType, defaultValue) => {
    // If value is undefined or null then validator return default value
    return vineType.parse(value => value ?? defaultValue)
};