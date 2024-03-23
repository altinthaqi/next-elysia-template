const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

const postsToCreate = [
  {
    id: 1,
    title: "First Post :)",
    content: "The first post made",
  },
  {
    id: 2,
    title: "My Second Post Ever",
    content: "Only my second post, still working on this",
  },
  {
    id: 3,
    title: "One more for good measure",
    content:
      "I don't  write a lot but when I do, we end up with this many posts",
  },
  {
    id: 4,
    title: "Final Post, Thank You",
    content: "This should be enough posts for testing!",
  },
];

const seed = async (posts) => {
  console.log("Creating posts ...");

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log("Creating post:", post);
    await client.post.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }
};

seed(postsToCreate)
  .then(() => {
    console.log("Seed created/updated posts successfully.");
  })
  .catch((error) => {
    console.error("Seed error:", error);
  })
  .finally(() => {
    client.$disconnect();
    console.log("Seed disconnected Prisma Client, exiting.");
  });
