import { buildSubgraphSchema } from '@apollo/subgraph';

import { applyDirectives } from '../directives';
import resolvers from '../resolvers';
import typeDefs from '../type-defs';

export default applyDirectives(buildSubgraphSchema([{ typeDefs, resolvers }]));
