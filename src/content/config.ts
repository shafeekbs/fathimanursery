import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const PLANT_CATEGORIES = [
  'indoor',
  'outdoor',
  'flowering',
  'fruit',
  'palms',
  'avenue',
  'hedging',
  'ground-cover',
  'landscape-specimen',
] as const;

const plants = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plants' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      botanical: z.string(),
      slug: z.string(),
      category: z.enum(PLANT_CATEGORIES),
      potSizes: z.array(z.string()),
      heightRange: z.string(),
      light: z.enum(['full sun', 'partial shade', 'shade']),
      availability: z.enum(['year round', 'seasonal', 'on order']),
      minOrder: z.number().optional(),
      railDispatch: z.boolean(),
      featured: z.boolean(),
      images: z.array(image()),
      order: z.number(),
      notes: z.string().max(200).optional(),
    }),
});

// Loose page-copy collection: about, packing-and-dispatch, projects intro copy, etc.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      location: z.string().optional(),
      year: z.number().optional(),
      summary: z.string().optional(),
      images: z.array(image()).optional(),
      order: z.number().optional(),
    }),
});

export const collections = { plants, pages, projects };
