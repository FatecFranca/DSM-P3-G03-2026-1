import prisma from '../database/client.js'

const controller = {}

controller.create = async (req, res) => {
  try {
    const result = await prisma.relatos.create({
      data: req.body
    })
    res.status(201).send(result)
  } catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    const result = await prisma.relatos.findMany({
    })
    res.send(result)
  } catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const result = await prisma.relatos.findUnique({
      where: { id: req.params.id },
      include: { usuario: true }
    })
    if(result) res.send(result)
    else res.status(404).end()
  } catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.update = async (req, res) => {
  try {
    await prisma.relatos.update({
      where: { id: req.params.id },
      data: req.body
    })
    res.status(204).end()
  } catch(error) {
    if(error.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

controller.delete = async (req, res) => {
  try {
    await prisma.relatos.delete({
      where: { id: req.params.id }
    })
    res.status(204).end()
  } catch(error) {
    if(error.code === 'P2025') res.status(404).end()
    else {
      console.error(error)
      res.status(500).send(error)
    }
  }
}

export default controller