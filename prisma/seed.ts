import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(): Promise<void> {
    const first = await prisma.employee.create({
        data: {
            name: 'John',
            token: '#1234567',
        },
    });

    const second = await prisma.employee.create({
        data: {
            name: 'Jane',
            token: '#7654321',
        },
    });

    await prisma.workhour.create({
        data: {
            employeeId: first.id,
            startDate: new Date('2023-04-15T08:00:00'),
            endDate: new Date('2023-04-15T16:00:00'),
        },
    });

    await prisma.workhour.create({
        data: {
            employeeId: first.id,
            startDate: new Date('2023-04-18T14:30:00'),
            endDate: new Date('2023-04-18T16:00:00'),
        },
    });

    await prisma.workhour.create({
        data: {
            employeeId: first.id,
            startDate: new Date('2023-04-21T08:00:00'),
            endDate: new Date('2023-04-21T10:15:32'),
        },
    });

    await prisma.workhour.create({
        data: {
            employeeId: second.id,
            startDate: new Date('2023-04-15T08:00:00'),
            endDate: new Date('2023-04-15T16:00:00'),
        },
    });

    await prisma.workhour.create({
        data: {
            employeeId: second.id,
            startDate: new Date('2023-04-18T14:30:00'),
            endDate: new Date('2023-04-18T16:00:00'),
        },
    });

    await prisma.workhour.create({
        data: {
            employeeId: second.id,
            startDate: new Date('2023-04-21T08:00:00'),
            endDate: new Date('2023-04-21T10:15:32'),
        },
    });

    console.log('Seeding completed');
}

main()
    .catch(async (e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
