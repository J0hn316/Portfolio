interface SocialLink {
  label: string;
  description: string;
  href: string;
  external: boolean;
}

interface SiteConfig {
  name: string;
  tagline: string;
  socialLinks: SocialLink[];
}

export const siteConfig: SiteConfig = {
  name: "Developer Portfolio",
  tagline: "Software Development & IT",

  socialLinks: [
    {
      label: "GitHub",
      description: "Explore my software development projects.",
      href: "https://github.com/J0hn316",
      external: true,
    },
    {
      label: "LinkedIn",
      description: "Connect with me professionally.",
      href: "https://www.linkedin.com/in/john-wrimene-3b0735228/",
      external: true,
    },
  ],
};
