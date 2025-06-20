// utils/default-options.ts
export interface JodieThemeOptions {
  basePath?: string;
  projectsPath?: string;
  projectsUrl?: string;
  projectsPrefix?: string;
  pagesPath?: string;
  blogPath?: string;   // RENAMED
  blogUrl?: string;    // RENAMED
  blogPrefix?: string; // RENAMED
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
  const blogPath = themeOptions.blogPath ?? `content/blog`; // RENAMED default path
  const blogUrl = themeOptions.blogUrl ?? `/blog`;       // RENAMED default URL
  const blogPrefix = themeOptions.blogPrefix ?? `/`;     // RENAMED default slug prefix
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
    blogPath,
    blogUrl,
    blogPrefix,
    formatString,
    navigation,
    homepagePageLimit,
    homepageProjectLimit,
    mdx,
    sharp,
  };
};