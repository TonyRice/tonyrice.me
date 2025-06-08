// utils/default-options.ts
export interface JodieThemeOptions {
  basePath?: string;
  projectsPath?: string;
  projectsUrl?: string;
  projectsPrefix?: string;
  pagesPath?: string;
  thoughtsPath?: string;   // NEW
  thoughtsUrl?: string;    // NEW
  thoughtsPrefix?: string; // NEW
  formatString?: string;
  navigation?: { name: string; slug: string }[];
  homepagePageLimit?: number;
  homepageProjectLimit?: number;
  mdx?: boolean;
  sharp?: boolean;
}

export const withDefaults = (themeOptions: JodieThemeOptions): Required<JodieThemeOptions> => {
  const basePath = themeOptions.basePath ?? `/`;
  const projectsPath = themeOptions.projectsPath ?? `content/projects`;
  const projectsUrl = themeOptions.projectsUrl ?? `/projects`;
  const projectsPrefix = themeOptions.projectsPrefix ?? `/`;
  const pagesPath = themeOptions.pagesPath ?? `content/pages`;
  const thoughtsPath = themeOptions.thoughtsPath ?? `content/thoughts`; // NEW default path
  const thoughtsUrl = themeOptions.thoughtsUrl ?? `/thoughts`;       // NEW default URL
  const thoughtsPrefix = themeOptions.thoughtsPrefix ?? `/`;     // NEW default slug prefix
  const formatString = themeOptions.formatString ?? `DD.MM.YYYY`;
  const navigation = themeOptions.navigation ?? [];
  const homepagePageLimit = themeOptions.homepagePageLimit ?? 9999;
  const homepageProjectLimit = themeOptions.homepageProjectLimit ?? 3;
  const mdx = themeOptions.mdx ?? true;
  const sharp = themeOptions.sharp ?? true;

  return {
    basePath,
    projectsPath,
    projectsUrl,
    projectsPrefix,
    pagesPath,
    thoughtsPath,    // NEW
    thoughtsUrl,     // NEW
    thoughtsPrefix,  // NEW
    formatString,
    navigation,
    homepagePageLimit,
    homepageProjectLimit,
    mdx,
    sharp,
  };
};