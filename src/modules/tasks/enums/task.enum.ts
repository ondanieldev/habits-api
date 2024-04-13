export const taskKinds = ['habit', 'event', 'reminder'] as const;
export type TaskKind = (typeof taskKinds)[number];
