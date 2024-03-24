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

const usersToCreate = [
  {
    id: "1",
    username: "epsilono@gmail.com",
    hashed_password: "password",
  },
  {
    id: "2",
    username: "anon@gmail.com",
    hashed_password: "password1",
  },
];

const seed = async (posts, users) => {
  console.log("Seeding data ...");

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log("Creating post:", post);
    await client.post.upsert({
      where: { id: post.id },
      update: post,
      create: post,
    });
  }

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log("Creating user:", user);
    await client.user.upsert({
      where: { id: user.id },
      update: user,
      create: user,
    });
  }
};

seed(postsToCreate, usersToCreate)
  .then(() => {
    console.log("Seed created/updated successfully.");
  })
  .catch((error) => {
    console.error("Seed error:", error);
  })
  .finally(() => {
    client.$disconnect();
    console.log("Seed disconnected Prisma Client, exiting.");
  });
