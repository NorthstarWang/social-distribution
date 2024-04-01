export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Social Distribution",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  mainNav: [
    {
      title: "Discover",
      href: "/",
    },
    {
      title: "Search",
      href: "/",
    },
    {
      title: "Notification",
      href: "/",
      requireAuth: true,
    },
  ],
  sidebarNav: [
    {
      title: "Browse",
      items: [
        {
          title: "Post",
          href: "/browse/post",
          items: [],
        },
        {
          title: "Author",
          href: "/browse/post",
          items: [],
        },
      ],
    },
    {
      title: "Account",
      requireAuth: true,
      items: [
        {
          title: "Profile",
          href: "/",
          requireAuth: true,
          items: [],
        },
        {
          title: "Post",
          href: "/",
          requireAuth: true,
          items: [],
        },
        {
          title: "Comment",
          href: "/",
          requireAuth: true,
          items: [],
        },
        {
          title: "Liked",
          href: "/",
          requireAuth: true,
          items: [],
        },
        {
          title: "Following",
          href: "/",
          requireAuth: true,
          items: [],
        },
        {
          title: "Friend",
          href: "/",
          requireAuth: true,
          items: [],
        },
      ],
    },
  ],
  links: {
    github: "https://github.com/NorthstarWang/social-distribution"
  },
}