import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { nanoid } from 'nanoid-cjs';

const prismaClient = new PrismaClient();

async function main() {
  const user1 = await prismaClient.user.upsert({
    where: { username: 'misno12' },
    update: {},
    create: {
      id: `U-${nanoid(10)}`,
      username: 'misno12',
      password: hashSync('password12', 10),
    },
  });
  const user2 = await prismaClient.user.upsert({
    where: { username: 'misno22' },
    update: {},
    create: {
      id: `U-${nanoid(10)}`,
      username: 'misno22',
      password: hashSync('password22', 10),
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
