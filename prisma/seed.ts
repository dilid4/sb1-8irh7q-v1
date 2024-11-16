import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user with new password
  const hashedPassword = await bcrypt.hash('ABCabc-1-2-3', 10);
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      status: 'active',
    },
  });

  // Create leverage configurations
  await prisma.leverageConfig.createMany({
    data: [
      {
        marketType: 'forex',
        defaultValue: 200,
        minLeverage: 50,
        maxLeverage: 5000,
      },
      {
        marketType: 'crypto',
        defaultValue: 20,
        minLeverage: 2,
        maxLeverage: 100,
      },
      {
        marketType: 'stocks',
        defaultValue: 10,
        minLeverage: 2,
        maxLeverage: 20,
      },
      {
        marketType: 'indices',
        defaultValue: 50,
        minLeverage: 10,
        maxLeverage: 200,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });