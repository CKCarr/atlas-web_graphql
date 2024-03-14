/* models/task.js:
Require mongoose
Create a constant Schema contains mongoose.Schema
Create a schema for the task: taskSchema,
then add the properties in the example tasks in the file schema.js
with the adequate type (String, Number …)
except the id because MongoDB is automatically going to create a new ID.
Make sure you export the model,
you define the model which will be the collection in MongoDB “Task”
and base it to the particular schema “taskSchema”
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    weight: Number,
    description: String,
    projectId: String
});

module.exports = mongoose.model('Task', taskSchema);
// Path: GraphQL_API/server/models/task.js
