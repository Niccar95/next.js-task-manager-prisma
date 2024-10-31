// import prisma from "@/app/db";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     const { orderedTodos } = req.body;

//     try {
//       const updatePromises = orderedTodos.map(
//         (todo: { id: string }, index: number) => {
//           return prisma.todo.update({
//             where: { id: todo.id },
//             data: { order: index },
//           });
//         }
//       );

//       await Promise.all(updatePromises);

//       res.status(200).json({ message: "Order updated successfully" });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Error updating order" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
