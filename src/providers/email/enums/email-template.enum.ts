export const emailTemplates = ['verify-email'] as const;

export type EmailTemplate = (typeof emailTemplates)[number];
