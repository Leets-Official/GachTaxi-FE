import { formatTimeToSelect } from '@/utils';
import { z } from 'zod';

// 개별 스키마
const routeSchema = z.enum(['BASIC', 'REVERSE']).default('BASIC');

const timeSchema = z.string().default(() => formatTimeToSelect(new Date()));

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
