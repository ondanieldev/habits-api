export const emailLocales = ['en-US', 'pt-BR'] as const;

export type EmailLocales = (typeof emailLocales)[number];
