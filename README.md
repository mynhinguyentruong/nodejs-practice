## Requirements

- Docker
- NodeJS (>=16)

## Instructions

Today we're going to build a URL shortener.

First, read through the [requirements](#general-requirements). Then, check out Part 1.

### General Requirements

**Technical Requirements**

- Shortened URL slugs are randomly generated
- Shortened URLs are persisted
- Shortened URL slugs should be a minimum of 4 characters
- It should be fast
- It should be possible to host this on any domain (e.g., links.supermojo.com/<SLUG>, )

**Code Requirements**

- Pay attention to code quality.
- Please use `git` and stick to the strategy of atomic commits

#### API Interface

The backend should expose two routes:

1. Create a short URL

```
PUT /url
{"url": "https://www.google.com/"}

200 {"slug": "as983Hn"}
```

2. Navigate to the short-url

```
GET /as983Hn

302 https://www.google.com/
```

### Part 1: API

#### First Start

1. Install deps: `yarn`
2. Copy .env.example file `cp .env.example .env`
3. Start the databases `yarn docker`
4. Run database migrations `yarn prisma migrate dev`
5. Run the compiler in watch mode `yarn build-watch`
6. Run tests `yarn test`

Now you should be able to start writing and editing, while the Typescript compiler runs in watch mode. Keep an eye on the output for errors.

#### How to start

- Start the API server with `yarn dev`
- Test that it works `curl localhost:9000/hello`

- We're using an Express API server.
  - The routes are defined in [routes.ts](src/routes.ts)
  - The database client is in [db.ts](src/db.ts)
    - It already has two helper functions to create and get URLs
    - You shouldn't need to make any changes here
- There is a Redis client (if you need or want to use a server-side cache) in [cache.ts](src/cache.ts)
- There is a single test file, [app.test.ts](src/app.test.ts)
  - We're using [jest](https://jestjs.io/) for testing
  - You can run tests with `yarn test` (make sure to run the through the [first start](#first-start) instructions first

### Part 2: Front-End
  
### How to start
- Navigate to client folder with `cd client`
- Start the Front-end with with `yarn dev`
- Open in `http://localhost:${PORT}`
- Navigate to `http://localhost:${PORT}/name`, fill in the URL and click Submit
- Get the slug from the response. Example:
- `{
  "url": "https://www.youtube.com/watch?v=OGe1bTccCyg&t=1254s",
  "slug": "lXtIF"
  }`
- Now you can test it out by adding the slug as endpoint at `http://localhost:${PORT}/:slug`

### Discussion

- How might we track link opens?
  Well, one way to track is to update when a user access our endpoint with slug and update it in the Database, this has been implemented in the codebase. Alternatively, we can use a URL tracking tool like Google Analytics or Matomo to track link clicks and user behavior on your website.
- We will likely be used by spammers. How might we prevent the use of our link shortener for spam?
  To prevent the use of your link shortener for spam, you can implement several measures such as:
  * CAPTCHA: Implementing a captcha or other verification mechanism to ensure that users are not bots.
  * Manual approval process: Implementing a manual approval process for all links before they are shortened and made public.
  * Rate limiting: Implementing rate limits to prevent users from generating large numbers of links in a short amount of time.
  * User accounts: Requiring users to create accounts before generating shortened links can help prevent spam. User accounts can help track the activity of individual users and can also make it easier to block spam accounts. (To be implemented)
* Implementing these strategies can help reduce spam, but it may not eliminate spam completely. Spammers can use a variety of tactics to evade detection, so it's important to stay vigilant and monitor the link shortener for signs of spam
- How might we create authenticated or password-protected links?
  - There are many ways, but let's use NextAuth.js as a solution. We will require user to login, once authenticated user can be directed to the right url
  - First, we need Prisma Adapter,...etc -> migrate it. Guide available here: https://authjs.dev/reference/adapter/prisma
  - Then get server session when making req to /api/[slug]
  - If session is invalid, we redirect user to a login page. 
  - Else continue to forward user to the link

## Notes

- If you want to modify the database schema,

  - Edit [schema.prisma](prisma/schema.prisma)
  - Then, generate a new migration, `yarn prisma migrate dev --name <name-of-your-migration>`
    - This will also apply the migration
  - [Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model)
  - [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

- To inspect the database:
  - With a UI, `yarn prisma studio`
  - postgres cli, `yarn pg-cli`
