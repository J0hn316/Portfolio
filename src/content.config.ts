
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),

  schema: z.object({
    title: z.string().trim().min(1).max(120),

    description: z.string().trim().min(20).max(300),

    category: z.string().trim().min(1),

    technologies: z.array(z.string().trim().min(1)).min(1),

    highlights: z.array(z.string().trim().min(1)).min(1),

    featured: z.boolean().default(false),

    status: z.enum(["completed", "in-progress", "archived"]),

    repositoryUrl: z.url().startsWith("https://").optional(),

    demoUrl: z.url().startsWith("https://").optional(),

    order: z.number().int().nonnegative().default(100),
  }),
});

export const collections = { projects };
