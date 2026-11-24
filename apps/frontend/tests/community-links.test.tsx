import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CommunityLinks, type CommunityLinksVariant } from '@/components/common/community-links';

// Real English labels, so a missing locale key (which renders as the key) fails here too.
vi.mock('@/lib/context/language-context', () => ({
  useLanguage: () => ({ uiLanguage: 'en' }),
}));

const VARIANTS: CommunityLinksVariant[] = ['hero', 'strip', 'builder', 'settings', 'about'];

const names = (variant: CommunityLinksVariant) => {
  const { unmount } = render(<CommunityLinks variant={variant} />);
  const found = screen.getAllByRole('link').map((link) => link.textContent);
  unmount();
  return found;
};

describe('community links', () => {
  it('links to the CVKA repository and 221 Studio', () => {
    render(<CommunityLinks variant="strip" />);
    expect(screen.getByRole('link', { name: 'CVKA on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/NikodemBoniecki/cvka'
    );
    expect(screen.getByRole('link', { name: '221 Studio' })).toHaveAttribute(
      'href',
      'https://221studio.pl/'
    );
  });

  it.each(VARIANTS)('opens every %s link in a new tab, with no referrer leak', (variant) => {
    render(<CommunityLinks variant={variant} />);
    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('is links only: no external images', () => {
    const { container } = render(<CommunityLinks variant="about" />);
    expect(container.querySelector('img')).toBeNull();
    expect(within(container).getAllByRole('link')).toHaveLength(2);
  });

  it('shows the same two official links in each placement', () => {
    for (const variant of VARIANTS) {
      expect(names(variant)).toEqual(['CVKA on GitHub', '221 Studio']);
    }
  });
});
