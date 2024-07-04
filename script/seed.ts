const  { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    const data = await db.category.createMany({
      data: [
        { name: "Hardware"},
        { name: "Music"},
        { name: "Fitness"},
        { name: "Photography"},
        { name: "Accounting"},
        { name: "Engineering"},
        { name: "Children"},
        { name: "Sports"},
        { name: "Filming"},
        { name: "Comedy"},
        { name: "Software"},
        { name: "Development"},

      ],
    });
    console.log(data)
  } catch (error) {
    console.log("error aayo ta ");
  } finally {
    await db.$disconnect();
  }
}

main()
