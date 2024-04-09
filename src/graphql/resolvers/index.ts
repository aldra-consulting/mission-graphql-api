import { createRootResolver } from '@project/utils/graphql';

import MissionOperations from './mission';

export default createRootResolver([MissionOperations]);
