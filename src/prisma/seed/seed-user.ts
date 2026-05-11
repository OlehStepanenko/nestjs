import {PrismaClient, UserRole} from "generated/prisma/client";
import {config, Hasher} from "src/common";
import {randomUUID} from "node:crypto";
import {UserStatus} from "src/users/dto";

export const seedUser = async (prisma: PrismaClient): Promise<void > => {
    const {email, password, firstName, lastName} = config.seedUser

    console.log('Seeding user')

    if (!(email && password && firstName && lastName)) {
        console.log('Seed user is not configured. skipping')
        return
    }
    const user = await prisma.user.findFirst({
        where: {
            email: {
                equals: email,
                mode: 'insensitive'
            }
        }
    })

    if (user) {
        console.log(`User ${email} already exists. Skipping`)
        return
    }

    const id = randomUUID();
    const hash = await Hasher.hash(password)
    await prisma.user.create({
        data: {
            id,
            email,
            role: UserRole.admin,
            firstName,
            lastName,
            status: UserStatus.Active,
            createdBy: id,
            hash,
        }
    })

    console.log(`User ${email} has been seeded successfully`)
}