import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const shopping = await prisma.todoList.upsert({
    where: {
      userId_title: {
        userId: '101248486762785730760',
        title: 'Shopping list',
      }
    },
    update: {},
    create: {
      userId: '101248486762785730760',
      title: 'Shopping list',
      todos: {
        create: [
          {
            title: 'Prisma book'
          },
          {
            title: 'Mango milkshake'
          },
        ],
      },
    },
  })
  console.log({ shopping })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })