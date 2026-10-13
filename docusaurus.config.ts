import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	title: 'OpenCDMP',
	tagline: 'Research Output Planning and Compliance Management Platform',
	url: 'https://opencdmp.github.io',
	baseUrl: '/',


	onBrokenLinks: 'throw',
	onBrokenAnchors: 'throw',
	favicon: 'img/favicon.ico',
	organizationName: 'OpenCDMP', // Usually your GitHub org/user name.
	projectName: 'docs', // Usually your repo name.
	trailingSlash: true,
	deploymentBranch: 'docs',

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	customFields: {
		// Shows the unreleased banner on the current (2.x) docs, linking to 1.x. Set to false when 2.0 is released.
		currentVersionUnreleased: false,
	},

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
					path:'docs',
					// One version per major release. `docs/` is the current major and is served at the root.
					// 1.x is a frozen snapshot of the 1.3.1 docs (versioned_docs/version-1.x, images in static/images-1.x).
					// The current version must stay the last version: the search plugin only finds the root index for it.
					// Until 2.0 is released, customFields.currentVersionUnreleased shows the "unreleased" banner on 2.x
					// (src/theme/DocVersionBanner). When 2.0 is released: set that flag to false, the current label to '2.x',
					// and the 1.x banner to 'unmaintained'.
					lastVersion: 'current',
					versions: {
						current: { label: '2.x', banner: 'none' },
						'1.x': { label: '1.x', path: '1.x', banner: 'unmaintained' },
					},

					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					// editUrl:
					// 	'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],

	plugins: [
		[
			'@docusaurus/plugin-client-redirects',
			{
				// The "Description" entity was renamed to "Asset" (v1 rename).
				// Redirects keep previously published URLs working.
				redirects: [
					{ from: '/using/descriptions', to: '/using/assets' },
					{ from: '/using/descriptions/my-descriptions', to: '/using/assets/my-assets' },
					{ from: '/using/descriptions/create-or-edit-a-description', to: '/using/assets/create-or-edit-an-asset' },
					{ from: '/using/descriptions/description-overview', to: '/using/assets/asset-overview' },
					{ from: '/using/descriptions/description-workflow', to: '/using/assets/asset-workflow' },
					{ from: '/using/descriptions/prefill-a-description', to: '/using/assets/prefill-an-asset' },
					{ from: '/using/descriptions/collaborations', to: '/using/plans/invite-collaborators' },
					{ from: '/using/descriptions/exports', to: '/using/download' },
					{ from: '/using/descriptions/imports', to: '/using/plans/imports' },
					{ from: '/using/descriptions/reviewing', to: '/using/comments' },
					{ from: '/administering/system-configuration/description-statuses', to: '/administering/system-configuration/workflows' },
					{ from: '/administering/system-configuration/description-workflow', to: '/administering/system-configuration/workflows' },
					// Pages merged when the docs were restructured (2026-10).
					{ from: ['/using/plans/reviewing', '/using/assets/reviewing'], to: '/using/comments' },
					{ from: ['/using/plans/exports', '/using/assets/exports'], to: '/using/download' },
					{ from: '/using/assets/collaborations', to: '/using/plans/invite-collaborators' },
					{ from: '/using/assets/imports', to: '/using/plans/imports' },
					{
						from: [
							'/administering/system-configuration/plan-statuses',
							'/administering/system-configuration/asset-statuses',
							'/administering/system-configuration/plan-workflow',
							'/administering/system-configuration/asset-workflow',
						],
						to: '/administering/system-configuration/workflows',
					},
					{ from: '/administering/content-management/blueprints/semantics', to: '/administering/content-management/templates/semantics' },
					{
						from: ['/administering/content-management/blueprints/blueprint-types', '/administering/content-management/templates/template-types'],
						to: '/administering/content-management/types',
					},
					{ from: '/administering/user-management/users', to: '/administering/user-management/tenant-users' },
					{ from: '/deployment/getting-started-workflows', to: '/administering/getting-started' },
					{ from: '/deployment/configuration/frontend/theming', to: '/administering/tenant-management/branding' },
					{ from: '/using/templates', to: '/using/blueprints' },
					{
						from: [
							'/deployment/configuration/infrastructure/docker',
							'/deployment/configuration/infrastructure/postgres',
							'/deployment/configuration/infrastructure/rabbitmq',
							'/deployment/configuration/infrastructure/elk',
						],
						to: '/deployment/configuration/infrastructure',
					},
					{ from: '/deployment/configuration/infrastructure/keycloak', to: '/deployment/configuration/keycloak' },
				],
			},
		],
	],

	themes: [
		'@docusaurus/theme-mermaid',
		[
			'@easyops-cn/docusaurus-search-local',
			{
				hashed: true,
				indexBlog: false,
				language: ['en'],
				docsRouteBasePath: '/',
				highlightSearchTermsOnTargetPage: true,
				forceIgnoreNoIndex: true,
			},
		],
	],

	markdown: {
		mermaid: true,
		hooks: {
			onBrokenMarkdownLinks: 'throw',
		},
	},

	themeConfig: {
		image: 'img/opencdmp-social-card.png',
		tableOfContents: {
			minHeadingLevel: 2,
			maxHeadingLevel: 5,
		},
		navbar: {
			title: '',
			logo: {
				alt: 'OpenCDMP Logo',
				src: 'img/logo.svg',
				srcDark: 'img/logo_dark.svg',
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
					type: 'docsVersionDropdown',
					position: 'right',
				},
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
