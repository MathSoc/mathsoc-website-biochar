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

Unfortunately, over the years of development, this project had become technically overcomplex. Architectural decisions that had been made in the name of simplicity - such as using `pug` and `express`, or preferring a JSON filesystem to a structured database - had led to overcomplexity. Rather than continue with the existing project, it was determined to be a better idea to restart from the ground up.

In Spring 2025, this static NextJS site was created in a week, and affectionately named `biochar`, after a charcoal-like material made from burning previous things to the ground and starting anew. :)
