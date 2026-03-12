import { defineCollection, z } from 'astro:content';

const MetricSchema = z.object({
  val:   z.string(),
  label: z.string(),
  color: z.enum(['accent','teal','amber','rose','emerald','sky']),
});

const CalloutSchema = z.object({
  icon:  z.string(),
  title: z.string(),
  color: z.enum(['accent','teal','amber']),
  body:  z.string(),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    order:      z.number(),
    title:      z.string(),
    titleKo:    z.string().optional(),
    group:      z.enum(['company', 'personal']),
    featured:   z.boolean().default(false),
    category:   z.string(),
    badge:      z.string().optional(),
    year:       z.string(),
    role:       z.string(),
    summary:    z.string(),          // hero card 한 줄 요약
    accentColor: z.string().default('accent'),
    metrics:    z.array(MetricSchema).default([]),
    callouts:   z.array(CalloutSchema).default([]),
    tech:       z.array(z.string()),
    link:       z.string().url().optional(),
    github:     z.string().url().optional(),
  }),
});

export const collections = { projects };
