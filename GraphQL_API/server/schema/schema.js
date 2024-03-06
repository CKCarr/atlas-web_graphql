// schema.js

// Import the GraphQL library
const graphql {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

const _ = require('lodash');

// Define TaskType
const TaskType = new GraphQLObjecType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
    }),
});

// Define RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // empty for now
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
