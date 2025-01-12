import { z } from 'zod';

// 개별 스키마
const routeSchema = z.enum(['BASIC', 'REVERSE']).default('BASIC');

const timeSchema = z
  .string()
  .regex(
    /^\d{2}:\d{2}:\d{2}$/, // HH:MM:SS 형식
    'Invalid time format. Expected HH:MM:SS',
  )
  .default(() => new Date().toLocaleTimeString('en-GB'));

const membersSchema = z.string().array().default([]);

const tagsSchema = z.string().array().default([]);

const contentSchema = z.string().optional();

// 복합 스키마
export const manualMatchingSchema = z.object({
  route: routeSchema,
  time: timeSchema,
  members: membersSchema,
  tags: tagsSchema,
  content: contentSchema,
});

export const autoMatchingSchema = z.object({
  route: routeSchema,
  members: membersSchema,
  tags: tagsSchema,
});
