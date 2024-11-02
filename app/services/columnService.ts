import prisma from "../db";

export const getColumns = async () => {
  "use server";
  return await prisma.column.findMany();
};

export const createColumns = async (title: string) => {
  return await prisma.column.create({
    data: { title },
  });
};

export const deleteColumns = async (id: string) => {
  "use server";
  return await prisma.column.delete({
    where: { id },
  });
};
