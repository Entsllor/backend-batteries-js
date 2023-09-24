import {WithParserType} from "../../../types/vine/parsers";

export const withParser: WithParserType = (vineType, parser) => {
    // If value extends undefined (not null) then validator return default value
    return vineType.parse(parser)
};