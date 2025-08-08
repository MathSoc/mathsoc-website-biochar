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

This website is hosted entirely on Vercel. Any time new code is merged to the `main` branch, it will trigger an automatic deploy.

The exam bank is not (yet) a part of this project. It is instead found in the [MathSoc/mathsoc-website](https://github.com/MathSoc/mathsoc-website) repository, on GitHub.

## A brief history of the MathSoc website.

There's been a few iterations of the MathSoc website over the past decade.

Before 2015, MathSoc seems to have had a NodeJS-based website, which can still be found on the private MathSoc GitLab. We then moved to a Python/Django-based website in 2015, the code for which can also be found on the private MathSoc GitLab.

Around 2019, MathSoc hired a co-op student to build them yet another new website. They decided that MathSoc's needs were best met by a WordPress website, and so provided MathSoc with a WordPress site. While this website had strong content management capabilities, allowing non-technical executive teams to modify the site, MathSoc very quickly found itself encountering difficulties making any technically complex additions to the site. In particular, we still had to serve the exam bank from the old Django site, which was now being hosted at `services.mathsoc.uwaterloo.ca`. Further, we found it hard to make any style changes. Our CSS hands were often tied.

In Fall 2022, efforts started on yet another MathSoc website, found at [MathSoc/mathsoc-website](https://github.com/MathSoc/mathsoc-website). On the advice of upper-year students and based on what had worked for PMC's rebuilt website, we chose a tech stack based on `pug` and `express`. React was notably exempt, as there was worries it would fall out of fashion quickly.

This new project had a few key priorities:

1. **Replace the old exam bank.** No one understood the infrastructure behind the website, nor how to edit it going forward. Further, it was hosted directly on MFCF servers, making it infrastructurally complex - if it ever went down, there was a chance we wouldn't know how to fix it.
2. **Visually overhaul the website.** It was really necessary.
3. **Allow non-technical executives to edit content.** While planning the new website project, some feared that MathSoc may struggle to find CS students willing and able to maintain the website. Executives wanted to be able to directly modify the website with ease - that is, no IDE required.

In Winter 2025, MFCF presented us with a pressing problem: they had a vital security upgrade they needed to perform on the servers running the old exam bank, and we had no idea how the Django site would respond to it. In response, we fast-tracked the exam bank elements of the website, and replaced the old exam bank with the new `pug` site.

Unfortunately, over the years of development, this project had become technically overcomplex. Architectural decisions that had been made in the name of simplicity - such as using `pug` and `express`, or preferring a JSON filesystem to a structured database - had led to overcomplexity. It became clear that this project, like every website before it, would become unmaintainable.

In Spring 2025, this static NextJS site was created in a week, and affectionately named `biochar`, after a charcoal-like material made from burning previous things to the ground and starting anew. :)
