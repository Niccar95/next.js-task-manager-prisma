import prisma from "../db";

export const getColumns = async (userId: string) => {
  "use server";
  return await prisma.column.findMany({ where: { userId } });
};

export const createColumns = async (title: string, userId: string) => {
  return await prisma.column.create({
    data: { title, userId },
  });
};

export const deleteColumns = async (id: string) => {
  "use server";
  return await prisma.column.delete({
    where: { id },
  });
};
