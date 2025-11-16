import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient({
  log: process.env.DEBUG ? ['query', 'error', 'warn'] : ['error'],
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    console.log('=== Create Admin User ===\n');

    // Test database connection
    await prisma.$connect();
    console.log('✓ Database connected\n');

    const email = await question('Enter email: ');
    if (!email || !email.includes('@')) {
      console.error('Invalid email address');
      process.exit(1);
    }

    // Check if admin already exists
    const existing = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing) {
      console.error('Admin with this email already exists');
      process.exit(1);
    }

    const password = await question('Enter password: ');
    if (!password || password.length < 6) {
      console.error('Password must be at least 6 characters');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log('\n✅ Admin created successfully!');
    console.log(`Email: ${admin.email}`);
    console.log(`ID: ${admin.id}`);
  } catch (error: any) {
    console.error('\n❌ Error creating admin:', error.message);
    if (error.code === 'P2002') {
      console.error('Admin with this email already exists');
    } else if (error.message.includes('findUnique') || error.message.includes('admin')) {
      console.error('\n⚠️  Prisma Client may not be generated or database schema not pushed.');
      console.error('Please run:');
      console.error('  1. npm run db:generate');
      console.error('  2. npm run db:push');
      console.error('  3. Then try again: npm run create-admin');
    }
    process.exit(1);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createAdmin();

