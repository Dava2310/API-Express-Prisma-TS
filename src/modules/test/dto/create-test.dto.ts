import { z } from 'zod';

export const createTestSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
});

export type CreateTestDto = z.infer<typeof createTestSchema>;
