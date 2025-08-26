export type NavItem = { title: string; ref?: string; children?: NavItem[] };

export const navItems: NavItem[] = [
  {
    title: "Get involved",
    children: [
      {
        title: "Volunteer opportunities",
        ref: "/community/volunteer",
      },
      {
        title: "Leadership opportunities",
        ref: "/community/leadership",
      },
      {
        title: "Community",
        ref: "/community/community",
      },
      {
        title: "Contact us",
        ref: "/community/contact-us",
      },
    ],
  },
  {
    title: "Services",
    children: [
      {
        title: "MathSoc office",
        ref: "/services/office",
      },
      {
        title: "Lockers",
        ref: "/services/lockers",
      },
      {
        title: "Math CnD",
        ref: "/services/cnd",
      },
    ],
  },
  {
    title: "Resources",
    children: [
      {
        title: "Exam bank",
        ref: "https://services.mathsoc.uwaterloo.ca/resources/exam-bank",
      },
      {
        title: "Forms",
        ref: "/resources/forms",
      },
      {
        title: "Meetings",
        ref: "/resources/meetings",
      },
      {
        title: "Policies",
        ref: "/resources/policies",
      },
      {
        title: "Budgets",
        ref: "/resources/budgets",
      },
      {
        title: "Elections",
        ref: "/resources/elections",
      },
      {
        title: "Cartoons",
        ref: "/resources/cartoons",
      },
    ],
  },
  {
    title: "Inventory",
    ref: "/inventory",
  },
];
