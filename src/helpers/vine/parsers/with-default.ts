import {WithDefaultParser} from "../../../types/vine/parsers";

export const withDefault: WithDefaultParser = (vineType, defaultValue) => {
    // If value extends undefined (not null) then validator return default value
    return vineType.parse((value: unknown) => value === undefined ? defaultValue : value)
};
