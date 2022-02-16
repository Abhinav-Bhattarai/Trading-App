import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { GraphQLObjectType, GraphQLSchema, GraphQLString } =  require('graphql');

const RootQuery = new GraphQLObjectType({
    name: 'rootQuery',
    fields: {
        GetCryptoData: {
            type: GraphQLString,
            resolve: (_, args, context) => {
                const {  } = context.cookies;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

    }
});

export const MainSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});