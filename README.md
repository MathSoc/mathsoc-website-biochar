## Getting Started

### For experienced developers

1. `npm install`
2. `npm run dev`

### For absolute newcomers

Welcome! You'll need a few things to start development.

First, you need to get this code copied to your computer. We do so using `git`, a program you were or will be taught about in CS 136L. If you're unfamiliar with it, ask any upper-year CS student for help.

With `git` installed, we need to first install NodeJS. You can do so either

- From the NodeJS website [here](https://nodejs.org/en)
- Or, by downloading the most recent edition through Node Version Manager (nvm), [found here](https://github.com/nvm-sh/nvm)

Once that's done, open your terminal / console / command prompt, and type `node -v`. You should see it produce something like the following:

```sh
$ v22.16.0
```

Don't worry if it's not exactly like that; the important part is that the command is recognized at all.

Next, you'll need to install the packages we need for this project. Type the following into your terminal (ensure you are connected to Wifi while doing so):

```sh
npm install
```

This will run for a little while, creating and populating a `node_modules` folder within your local codebase.

Finally, to run the website, enter

```sh
npm run dev
```

You should see something like the below appear in your terminal:

```sh
> mathsoc-website@0.1.0 dev
> next dev --turbopack

   ▲ Next.js 15.4.5 (Turbopack)
   - Local:        http://localhost:3000

```

Follow the link it gives you (likely http://localhost:3000) to see the website.

## Infrastructure

- **Deployments**: This website is hosted entirely on Vercel. Any time new code is merged to the `main` branch, it will trigger an automatic deploy.
- **Authentication**: Authentication is powered by `next-auth`. We have two layers of authentication: student-level, powered by the University of Waterloo's DUO OIDC, and admin-level, powered by MathSoc's Google organization.
- **Exam bank**: MathSoc uses a Cloudflare R2 bucket to store exam files. The code powering this bucket can be found in a private repository within the MathSoc GitHub organization.

## Contact information

If you need help with the website, contact any of:

- The MathSoc web infrastructure director
- The MathSoc VPC, [vpc@mathsoc.uwaterloo.ca](mailto:vpc@mathsoc.uwaterloo.ca)
- River Stanley, [river.stanley@uwaterloo.ca](mailto:river.stanley@uwaterloo.ca)
