// schema.js

// Import the GraphQL library
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

const _ = require('lodash');

// Dummy data
const tasks = [
    {
    id: '1',
    title: 'Create your first webpage',
    weight: 1,
    description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag. Open your file in your browser (the page should be blank)'
    },
    {
    id: '2',
    title: 'Structure your webpage',
    weight: 1,
    description: 'Copy the content of 0-index.html into 1-index.html. Create the head and body sections inside the html tag, create the head and body tags (empty) in this order'
    }
];

// Define TaskType
const TaskType = new GraphQLObjectType({
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
                // use lodash and id from args to find the
                // task in the tasks array and return it
                return _.find(tasks, { id: args.id });

            },
        },
    },
});

// update schema to include root query
module.exports = new GraphQLSchema({
  query: RootQuery,
});
