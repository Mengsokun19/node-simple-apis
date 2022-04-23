const express = require('express');

const app = express();

// Express middleware to accept the body as json
app.use(express.json());

let tasks = [];

// GET All the Tasks
app.get('/', (req, res) => {
  res.status(200).send({ message: tasks });
});

// CREATE the new task
app.post('/:id', (req, res) => {
  const { id } = req.params;
  const { taskDescription } = req.body;

  if (!taskDescription) {
    res.status(404).send({ message: "Task's description is required." });
  } else {
    tasks.push({ id, taskDescription });
    console.log(tasks);
    res.status(201).send({ message: `Task Created with ${id}.` });
  }
});

// UPDATE the task
app.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { taskDescription } = req.body;

  const updatedTask = tasks.find((t) =>
    t.id === id
      ? (t.taskDescription = taskDescription)
      : res.send({ message: 'Id does not exist.' })
  );
  res.status(200).send({ updatedTask });
});

// DELETE the task
app.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deletedTask = tasks.filter((task) => task.id !== id);
  tasks = deletedTask;

  res.status(200).send(tasks);
});

app.listen(7000, () => console.log('server running'));
