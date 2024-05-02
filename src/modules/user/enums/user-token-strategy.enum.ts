export const userTokenStrategies = ['uuid'] as const;

export type UserTokenStrategy = (typeof userTokenStrategies)[number];
