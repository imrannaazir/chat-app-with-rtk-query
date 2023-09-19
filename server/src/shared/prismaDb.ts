import { PrismaClient } from "@prisma/client";

const prismaDb = new PrismaClient({
    errorFormat:"minimal"
})

export default prismaDb