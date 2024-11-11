import prisma from "../db";

export const getUser = async (id: string) => {
  "use server";
  return await prisma.user.findFirst({
    where: { id: id },
  });
};

export const updateImage = async (id: string, image: string) => {
  "use server";

  const user = await getUser(id);

  return await prisma.user.update({
    where: { id: user.id },
    data: { image: image },
  });
};
