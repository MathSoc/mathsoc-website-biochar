The MathSoc website is hosted on the below infrastructure.

# Code

All code for MathSoc exists within the MathSoc GitHub organization. Key repositories for the website are:

- `mathsoc-website-biochar`: This repository, hosting the MathSoc website.
- `mathsoc-exam-bank-gate`: A private repository, hosting the Cloudflare worker that serves MathSoc exams. You should never need to edit this. Please please please endeavour to never edit this. <3

As a MathSoc web developer, you may also be interested in

- `mathsoc-verify`: The Discord bot MathSoc uses to verify accounts attempting to access the MathSoc Discord server.
- `mathSocDocuments`: The repository in which MathSoc stores all of its governance documents.

# Authentication

We have two layers of authentication: student-level, powered by the University of Waterloo's DUO OIDC, and admin-level, powered by MathSoc's Google organization.

Each is powered on the website by the `next-auth` package.

We had to work with Waterloo IST to get the DUO OIDC set up. Google permissions are easier; they're just configurable within our own Federation of Students Google organization.

# Website Hosting

The website is hosted on Vercel.

# Deployments

Deployments are automatic. Whenever code is merged to `main`, it will trigger a new automatic deploy.

# Exam bank

The exam bank is a bit complex.

This repository serves the frontend for the MathSoc website. The general student-facing frontend is served at `/resources/exam-bank`, while admin options are served at `/admin`.

All exam bank frontend and backend routes on the website are gated behind authentication. Students (UW DUO auth) can access read-only endpoints, while only admins (Google auth) can access write endpoints.

The exams themselves are **not** hosted by this website. They exist in a separate Cloudflare R2 bucket. We gate access to those exams using a Cloudflare worker, as specified in `mathsoc-exam-bank-gate`.

The worker ensures that only requests made with a specific secret access key attached can access the exams. This key is known only to the Cloudflare worker and the server-side NextJS environment. For security, frontend clients are never made aware of the key.

You really, _really_ shouldn't ever need to touch the Cloudflare worker.

If you've decided to move away from Cloudflare as an exams host, and you need to mass download the exams from our R2 bucket, the `rclone` package is your friend.

# Legacy

none of the below is still relevant today, but i list it here in case you get any weird questions:

- There used to be MathSoc code hosted on the UW GitLab environment. Rose can probably grant you access to this if you want to poke around.
- There also used to be / remains legacy MathSoc code found on the MathSoc GitHub account. `mathsoc-website` and `MathSocWebsiteRebuild` are two such examples.
- our hosting used to be... in a state. At various points in history, the website's infrastructure looked like:
  - A Python Django site hosted on MFCF
  - A WUSA-hosted WordPress site serving the bulk of the frontend, with the old Python Django MFCF-hosted MathSoc site still kicking around for the exam bank
  - A WUSA-hosted WordPress site serving the bulk of the frontend, with a MFCF-hosted nodejs site hosting the exam bank
  - A Vercel-hosted NextJS site serving the bulk of the frontend, with a MFCF-hosted nodejs site hosting the exam bank
