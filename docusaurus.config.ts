import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	title: 'OpenCDMP',
	tagline: 'Research Output Planning and Compliance Management Platform',
	url: 'https://opencdmp-docs.github.io',
	baseUrl: '/',


	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'OpenCDMP', // Usually your GitHub org/user name.
	projectName: 'docs', // Usually your repo name.
	trailingSlash: true,
	deploymentBranch: 'docs',

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
					sidebarPath: './sidebars.ts',
					path:'docs'
					
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					// 	'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				blog: {
					showReadingTime: false,
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					// 	'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: 'img/docusaurus-social-card.jpg',
		tableOfContents: {
			minHeadingLevel: 2,
			maxHeadingLevel: 5,
		},
		navbar: {
			title: '',
			logo: {
				alt: 'OpenCDMP Logo',
				src: 'img/logo.svg',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'documentationSidebar',
					position: 'left',
					label: 'Docs',
				},


				// { to: '/docs/introduction', label: 'Docs', position: 'left' },
				{
					href: 'https://github.com/OpenCDMP/OpenCDMP',
					label: 'GitHub',
					position: 'right',
				},
			],
		},
		footer: {
			style: 'dark',
			links: [
				{
					title: 'Docs',
					items: [
						{ label: 'Getting Started', to: '/' },
					],
				},
				{
					title: 'Community',
					items: [
						{ label: 'GitHub', href: 'https://github.com/OpenCDMP/OpenCDMP' },
					],
				}
			],
			copyright: `Copyright © ${new Date().getFullYear()} OpenCDMP.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
