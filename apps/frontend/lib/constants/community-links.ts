/**
 * Where the community and support links point. Plain links only: nothing here is fetched at
 * runtime (no star counts, no avatars), so the app stays local-first.
 */
export const COMMUNITY_LINKS = {
  repository: 'https://github.com/NikodemBoniecki/cvka',
  studio: 'https://221studio.pl/',
} as const;

export type CommunityLinkId = keyof typeof COMMUNITY_LINKS;
