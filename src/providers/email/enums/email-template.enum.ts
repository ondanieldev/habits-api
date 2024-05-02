export const emailTemplates = ['verify-email', 'reset-password'] as const;

export type EmailTemplate = (typeof emailTemplates)[number];
