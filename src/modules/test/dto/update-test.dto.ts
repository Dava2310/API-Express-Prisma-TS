import { z } from 'zod';
import { createTestSchema } from './create-test.dto';

export const updateTestSchema = createTestSchema.partial();
export type UpdateTestDto = z.infer<typeof updateTestSchema>;
