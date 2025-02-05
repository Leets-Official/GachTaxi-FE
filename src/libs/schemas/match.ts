import { z } from 'zod';

// 개별 스키마
const startPointSchema = z
  .string()
  .min(1, '시작지의 위도, 경도가 설정되지 않았어요!');

const startNameSchema = z.string().min(1, '시작 지점을 설정해주세요!');

const destinationPointSchema = z
  .string()
  .min(1, '목적지의 위도, 경도가 설정되지 않았어요!');

const destinationNameSchema = z.string().min(1, '종료 지점을 설정해주세요!');

const timeSchema = z.string();

const membersSchema = z.string().array().default([]);

const criteriaSchema = z.string().array().default([]);

const descriptionSchema = z.string().optional();

const expectedTotalChargeSchema = z.number();

// 복합 스키마
export const manualMatchingSchema = z.object({
  startName: startNameSchema,
  destinationName: destinationNameSchema,
  criteria: criteriaSchema,
  members: membersSchema,
  expectedTotalCharge: expectedTotalChargeSchema,
  time: timeSchema,
  description: descriptionSchema,
});

export const autoMatchingSchema = z.object({
  startPoint: startPointSchema,
  startName: startNameSchema,
  destinationPoint: destinationPointSchema,
  destinationName: destinationNameSchema,
  criteria: criteriaSchema,
  members: membersSchema,
  expectedTotalCharge: expectedTotalChargeSchema,
});
