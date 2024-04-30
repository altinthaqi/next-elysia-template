# [Next.js & ElysiaJS Template - @altinthaqi](https://github.com/altinthaqi/next-elysia-template)

Hey hey! This project provides a robust foundation for building modern web applications with ElysiaJS on the backend and Next.js on the client. It's already configured and ready to be used so you move faster and save time by not spending hours configuring and setting up your environment before you can actually start the work.

## Features

- **ElysiaJS Backend**: Utilize the power of ElysiaJS for building scalable and efficient server-side code, supercharged by Bun runtime, Static Code Analysis, and Dynamic Code Injection. Being one of the top-performing TypeScript frameworks.
- **Next.js Integration**: Use Next.js for server-side rendering, routing, and more on the frontend.
- **Eden Connector**: Achieve seamless type-safe communication between the client and server with Next.js Eden connector integration. Synchronize types across all applications and move fast without breaking anything, like tRPC.
- **Prisma ORM and PostgreSQL Integration**: Simplify database operations with pre-configured Prisma ORM and PostgreSQL setup.
- **Lucia Authentication**: Implement secure authentication flows including sign-up, sign-in, and log-in with ease. Comes with already configured middlewares, passed down sessions and contexts accessible through every endpoint, protected routes, and/or public ones.
- **Swagger Plugin**: Document your API endpoints effortlessly with Swagger, accessible via `/api/swagger`.
- **Logestic Logging**: Keep track of application events and actions with Logestic logger plugin for enhanced monitoring and debugging. An advanced and customizable logging library for ElysiaJS built by the community.
- **Dockerized DB**: Easily containerize your postgres in a Docker container. Your dev environment parallelly starts your client, server & composes docker, all in one command.
- **CORS Plugin**: Ensure secure communication between client and server with CORS integration plugin developed by the community.
- **ESLinting and Prettier**: Maintain code quality and consistency with ESLint and Prettier, easily runnable with commands in package.json.
- **Continuous Integration (CI)**: GitHub CI set up to check if your code meets standards on each push you make.

## Getting Started

To get started with the Next.js & ElysiaJS template application, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:altinthaqi/next-elysia-template.git
   ```

2. **Install Dependencies**:

   ```bash
   cd next-elysia-template
   bun install
   ```

3. **Configure Environment Variables**:

   `.env` comes readily configured; feel free to update/fill in the necessary variables.

4. **Run the Development Server** (this will docker-compose in parallel):

   ```bash
   bun --bun run dev
   ```

   or, if you want to run the server with node then you can omit `--bun`:

   ```bash
   bun run dev
   ```

5. **Run Docker separately** (optional):

   You can build and start the Docker containers separately from the development environment using Docker Compose:

   ```bash
   docker-compose up
   ```

   just make sure to update `package.json` from:

   ```bash
   "dev": "concurrently \"docker-compose up\" \"next dev\"",
   ```

   to:

   ```bash
   "dev": "next dev",
   ```

6. **Start Building!**:

   With the development server running, you're all set to start building your application.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://github.com/altinthaqi/next-elysia-template/blob/main/license).
