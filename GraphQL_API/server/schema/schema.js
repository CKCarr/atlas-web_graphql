// schema.js

// Import the GraphQL library
// Import the GraphQL library using CommonJS module syntax
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');
const _ = require('lodash');
const Project = require('../models/project'); // No need for .js extension
const Task = require('../models/task');

// Dummy data gor GRAPHQI API
const tasks = [
    {
        id: '1',
        title: 'Create your first webpage',
        weight: 1,
        description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag. Open your file in your browser (the page should be blank)',
        projectId: '1',
    },
    {
        id: '2',
        title: 'Structure your webpage',
        weight: 1,
        description: 'Copy the content of 0-index.html into 1-index.html. Create the head and body sections inside the html tag, create the head and body tags (empty) in this order',
        projectId: '1',
    }
];

const projects = [
    {
        id: '1',
        title: 'Advanced HTML',
        weight: 1,
        description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don’t worry, the final page will be “ugly” it’s normal, it’s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!',
    },
    {
        id: '2',
        title: 'Bootstrap',
        weight: 1,
        description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.',
    }
]

// Define TaskType
const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        projectId: { type: GraphQLID },
        project: {
        type: ProjectType,
        resolve(parent, args) {
            return _.find(projects, { id: parent.projectId });
            }
        }
    }),
});

// Define ProjectType with a tasks list
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        tasks: {
        type: new GraphQLList(TaskType),
        resolve(parent, args) {
            return _.filter(tasks, { projectId: parent.id });
            }
        }
    }),
});

// Mutation Types For GraphQL API
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // field Define the Mutation Type for Projects
        addProject: {
            // return type after mutation is done
            type: ProjectType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                weight: { type: GraphQLNonNull(GraphQLInt) },
                description: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description
                });
                return project.save();
            }
        },
        // field Define the Mutation Type for Tasks
        addTask: {
            type: TaskType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) },
                weight: { type: GraphQLNonNull(GraphQLInt) },
                description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description
                });
                return task.save();
            }
        }
    }
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
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                // return all tasks
                return Task.find({});
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                // return all projects
                return Project.find({});
            }
        }
    },
});

// update schema to include root query
// Export the schema using CommonJS
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
