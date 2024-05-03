export const userTokenStrategies = ['jwt', 'uuid'] as const;

export type UserTokenStrategy = (typeof userTokenStrategies)[number];
