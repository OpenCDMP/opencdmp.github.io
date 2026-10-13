import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';
import DocVersionBanner from '@theme-original/DocVersionBanner';
import type DocVersionBannerType from '@theme/DocVersionBanner';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof DocVersionBannerType>;

// The current docs stay the "last" version so that search works at the root;
// while the next major is unreleased, this wrapper shows the unreleased banner itself.
export default function DocVersionBannerWrapper(props: Props): React.JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	const version = useDocsVersion();
	if (version.version === 'current' && siteConfig.customFields?.currentVersionUnreleased) {
		return (
			<div
				className={clsx(props.className, ThemeClassNames.docs.docVersionBanner, 'alert alert--warning margin-bottom--md')}
				role="alert">
				<div>
					This documentation is for OpenCDMP <b>{version.label}</b>, which is not released yet.
				</div>
				<div className="margin-top--md">
					For the current release, see the <Link to="/1.x/">1.x documentation</Link>.
				</div>
			</div>
		);
	}
	return <DocVersionBanner {...props} />;
}
