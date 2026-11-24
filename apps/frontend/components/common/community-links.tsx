'use client';

import type { ReactNode } from 'react';
import { Globe } from '@phosphor-icons/react';
import { BrandIcon } from '@/components/ui/brand-icon';
import { buttonClass } from '@/components/ui/button';
import { COMMUNITY_LINKS, type CommunityLinkId } from '@/lib/constants/community-links';
import { useTranslations } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * The same marks everywhere: Star is the monochrome GitHub mark, Follow a person-plus,
 * Sponsor a hand holding a heart (the plain Heart and Star icons are banned by the Swiss
 * guard as decorative; these are the functional stand-ins).
 */
const ICONS: Record<CommunityLinkId, ReactNode> = {
  repository: <BrandIcon name="github" className="size-4 shrink-0" />,
  studio: <Globe aria-hidden="true" className="size-4 shrink-0" />,
};

export type CommunityLinksVariant = 'hero' | 'strip' | 'builder' | 'settings' | 'about';

/** Which links each placement shows, in order, with the label key each one uses there. */
const LAYOUTS: Record<CommunityLinksVariant, ReadonlyArray<readonly [CommunityLinkId, string]>> = {
  hero: [
    ['repository', 'community.repository'],
    ['studio', 'community.studio'],
  ],
  strip: [
    ['repository', 'community.repository'],
    ['studio', 'community.studio'],
  ],
  settings: [
    ['repository', 'community.repository'],
    ['studio', 'community.studio'],
  ],
  builder: [
    ['repository', 'community.repository'],
    ['studio', 'community.studio'],
  ],
  about: [
    ['repository', 'community.repository'],
    ['studio', 'community.studio'],
  ],
};

/** Quiet text links for the hero and the dashboard strip: steel at rest, orange on hover. */
const QUIET_LINK = cn(
  'inline-flex items-center gap-2 py-1 font-mono text-xs uppercase tracking-wide text-steel',
  'underline-offset-4 hover:text-primary hover:underline',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  'focus-visible:ring-offset-2 focus-visible:ring-offset-canvas'
);

/**
 * `label` set means the label collapses to an icon below 2xl (still read aloud, and shown as
 * a tooltip), so the builder header keeps its single row at laptop widths.
 */
const STYLES: Record<CommunityLinksVariant, { list: string; link: string; label?: string }> = {
  hero: { list: 'gap-x-6 gap-y-2', link: QUIET_LINK },
  strip: { list: 'gap-x-6 gap-y-2', link: QUIET_LINK },
  settings: { list: 'gap-x-4 gap-y-1', link: cn(QUIET_LINK, 'text-primary underline') },
  builder: {
    list: 'gap-x-1 gap-y-1',
    link: cn(buttonClass({ variant: 'ghost', size: 'sm' }), 'max-2xl:px-2'),
    label: 'max-2xl:sr-only',
  },
  about: { list: 'gap-3', link: buttonClass({ variant: 'outline', size: 'sm' }) },
};

/** An official project link: icon, label, always a new tab. */
export function CommunityLink({
  id,
  className,
  title,
  children,
}: {
  id: CommunityLinkId;
  className?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={COMMUNITY_LINKS[id]}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      className={className}
    >
      {ICONS[id]}
      {children}
    </a>
  );
}

/** The official project links in the shape each placement needs. */
export function CommunityLinks({
  variant,
  className,
}: {
  variant: CommunityLinksVariant;
  className?: string;
}) {
  const { t } = useTranslations();
  const style = STYLES[variant];

  return (
    <ul className={cn('flex flex-wrap items-center', style.list, className)}>
      {LAYOUTS[variant].map(([id, labelKey]) => (
        <li key={id}>
          <CommunityLink id={id} className={style.link} title={style.label && t(labelKey)}>
            {style.label ? <span className={style.label}>{t(labelKey)}</span> : t(labelKey)}
          </CommunityLink>
        </li>
      ))}
    </ul>
  );
}
