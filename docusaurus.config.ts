import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Nominis API',
  tagline: 'Intelligent crypto compliance. Faster insights, smarter decisions.',
  favicon: 'img/Icons_3.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  

  // Set the production url of your site here
  url: 'https://www.docs.nominis.io',
  //url: 'https://yotamb-nominis.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  //baseUrl: '/docs.nominis.io/',
  trailingSlash: true, // explicit is better for GitHub Page
  
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yotamb-nominis', // Usually your GitHub org/user name.
  projectName: 'docs.nominis.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',},
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: '/img/tab_logo.png',
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      // IMPORTANT: remove or comment out the title so it doesn't show under the brand link
      // title: 'Home',

      logo: {
        alt: 'Nominis',
        src: 'img/white_transparent.png',
        href: 'https://www.nominis.io', // logo -> marketing site
        target: '_blank',
      },

      items: [
        {
          to: '/',            // docs homepage
          label: 'Home',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Endpoints',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Endpoints',
              to: '/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/nominisio/',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/nominis_official',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/nominisio',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/nominis',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Nominis',
              href: 'https://www.nominis.io/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Xplorisk. Ltd.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID || '',
      apiKey: process.env.ALGOLIA_SEARCH_API_KEY || '',
      indexName: 'Docs Crawler',
      contextualSearch: true,
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
