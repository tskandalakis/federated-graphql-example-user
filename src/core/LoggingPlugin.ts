
import {ApolloServerPlugin, GraphQLRequestContext, GraphQLRequestListener} from 'apollo-server-plugin-base';
import { ApolloError } from 'apollo-server-express';

export const LoggingPlugin: ApolloServerPlugin = {
  async requestDidStart<MyApolloContext >(
      requestContext: GraphQLRequestContext<MyApolloContext >,
  ): Promise<GraphQLRequestListener<MyApolloContext >> {
    return {
      async willSendResponse(context) {
        // @ts-ignore
        const endTime = process.hrtime(context.context.timer);
        if(context.response.data) {
          for(const propName in context.response.data) {
            if(context.response.data[propName]) {
              console.info(`${new Date().toISOString()} - Success - ${propName} - ${(endTime[0] * 1000000000 + endTime[1]) / 1000000} ms`);
            }
          }
        }
        if(context.errors) {
          context.errors.forEach((error: any) => {
            if (error.name !== 'GraphQLError') {
              if (error.originalError && error.originalError.extensions && error.originalError.extensions.response) {
                const originalError = error.originalError as ApolloError;
                originalError.message = `${error.message} - ${originalError.extensions.response.url}`;
              }
              console.info(`${new Date().toISOString()} - ${error.name} - ${error.path} - ${(endTime[0] * 1000000000 + endTime[1])
              / 1000000} ms\nError Message: ${error.message}`);
            } else {
              console.info(`${new Date().toISOString()} - ${error.name} - ${error.path} - ${(endTime[0] * 1000000000 + endTime[1])
              / 1000000} ms\nError Message: ${error.message}`);
            }
          });
        }
      },
    }
  }
}