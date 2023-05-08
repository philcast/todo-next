# Database (Prisma/PostgreSQL)



## 1. Update your `prisma/schema.prisma` model

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

model TodoList {
  id        String   @id @default(uuid())
  title     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  todos     Todo[]
}

model Todo {
  id        String   @id @default(uuid())
  title     String
  done      Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  todoList  TodoList @relation(fields: [todoListId], references: [id])
  todoListId String
}
```


## 2. Generate the `down.sql` file for the down migration


```console
npm run prisma:migrate:down
```

This scripts uses `prisma migrate diff` to make a comparison:
* from the newly edited schema
* to the state of the schema after the last migration

and output this to a SQL script: `prisma/migrations/down.sql`.

## 3. Generate and apply the up migration

```console
npm run prisma:migrate:dev"
```

This will create a new `<timestamp>_<migration_name>` directory inside the `prisma/migrations` directory, with your new `migration.sql` up migration file inside.

Copy your `down.sql` file into the new directory along with the up migration file.

