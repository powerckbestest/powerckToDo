const taskRouter = require('express').Router();
const { Task } = require('../db/models');

taskRouter.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRouter.post('/', async (req, res) => {
  try {
    const task = await Task.create({
      value: req.body.value,
      status: false,
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRouter.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

taskRouter.patch('/:id', async (req, res) => {
  try {
    await Task.update({ value: req.body.value }, { where: { id: req.params.id } });
    const sendUpdated = await Task.findByPk(req.params.id);
    res.status(200).json(sendUpdated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

taskRouter.patch('/status/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task.status) {
      await Task.update({ status: false }, { where: { id: req.params.id } });
    } else {
      await Task.update({ status: true }, { where: { id: req.params.id } });
    }
    const sendUpdated = await Task.findByPk(req.params.id);
    res.status(200).json(sendUpdated);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = taskRouter;
