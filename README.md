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
