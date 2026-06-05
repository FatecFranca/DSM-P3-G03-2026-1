import prisma from '../database/client.js'

const controller = {}

controller.create = async (req, res) => {
  try {
    const result = await prisma.profissionais.create({ data: req.body })
    res.status(201).send(result)
  } catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveAll = async (req, res) => {
  try {
    const result = await prisma.profissionais.findMany({
      include: { especialidades: true }
    })
    res.send(result)
  } catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}

controller.retrieveOne = async (req, res) => {
  try {
    const result = await prisma.profissionais.findUnique({
      where: { id: req.params.id },
      include: { especialidades: true }
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
    await prisma.profissionais.update({ where: { id: req.params.id }, data: req.body })
    res.status(204).end()
  } catch(error) {
    if(error.code === 'P2025') res.status(404).end()
    else { console.error(error); res.status(500).send(error) }
  }
}

controller.delete = async (req, res) => {
  try {
    await prisma.profissionais.delete({ where: { id: req.params.id } })
    res.status(204).end()
  } catch(error) {
    if(error.code === 'P2025') res.status(404).end()
    else { console.error(error); res.status(500).send(error) }
  }
}

controller.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const profissional = await prisma.profissionais.findFirst({
      where: { email, senha }
    });

    if (!profissional) {
      return res.status(401).send({ message: "Email ou senha incorretos" });
    }

    res.send(profissional);

  } catch(error) {
    console.error(error);
    res.status(500).send(error);
  }
}

export default controller