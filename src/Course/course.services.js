const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createCourse = async ({
  nombre,
  categoria_id,
  descripcion,
  precio,
  instructor_id,
  fecha_inicio,
  fecha_fin,
}) => {
  const isValidCategorie = await prisma.categoria.findUnique({
    where: {
      id: categoria_id,
    },
  });
  if (!isValidCategorie) {
    throw new Error("Categoria no es valida");
  }
  const isValidInstructor = await prisma.instructor.findUnique({
    where: {
      id: instructor_id,
    },
  });
  if (!isValidInstructor) {
    throw new Error("Instructor no es valida");
  }
  const curso = await prisma.curso.create({
    data: {
      nombre,
      categoria_id,
      descripcion,
      precio,
      instructor_id,
      fecha_inicio,
      fecha_fin,
    },
  });
  return curso;
};
const getCourseDetail = async (id) => {
  const curso = await prisma.curso.findUnique({
    where: {
      id,
    },
  });
  if (!curso) {
    throw new Error("Curso no encontrado");
  }
  return curso;
};
module.exports = { createCourse, getCourseDetail };
