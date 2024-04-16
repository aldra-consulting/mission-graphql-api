import { type Nullable } from './common';
import { type Operation } from './enums';
import { type GraphQL } from './graphql';
import { type Identifier } from './identifier';

export interface MissionOperations<Context extends object>
  extends GraphQL.Operations<Context> {
  [Operation.QUERY]: {
    listBookmarks: (
      args: GraphQL.OperationFunctionArguments<Context, never>
    ) => Promise<Identifier.Mission[]>;
  };

  [Operation.MUTATION]: {
    toggleBookmark: (
      args: GraphQL.OperationFunctionArguments<
        Context,
        {
          input: {
            missionId: Identifier.Mission;
          };
        }
      >
    ) => Promise<Nullable<boolean>>;
  };
}
