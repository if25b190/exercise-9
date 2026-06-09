import { PrismaClient } from "@prisma/client";

export async function ping(prisma: PrismaClient): Promise<number> {
    await prisma.counter.create({
        data: {},
    });

    const count = await prisma.counter.count();
    return count;
}