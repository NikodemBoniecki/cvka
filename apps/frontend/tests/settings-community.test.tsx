import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SettingsAbout, SettingsSupportStrip } from '@/components/settings/community';
import { APP_VERSION } from '@/lib/config/version';

vi.mock('@/lib/i18n', () => {
  const t = (key: string) => key;
  return { useTranslations: () => ({ t }) };
});

describe('settings community strip', () => {
  it('shows the project and studio links', () => {
    render(<SettingsSupportStrip />);

    expect(screen.getByText('community.settingsPrompt')).toBeInTheDocument();
    const sponsor = screen.getByRole('link', { name: 'community.repository' });
    const discord = screen.getByRole('link', { name: 'community.studio' });
    expect(sponsor).toHaveAttribute('href', 'https://221studio.pl/');
    expect(discord).toHaveAttribute('href', 'https://221studio.pl/');
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});

describe('settings About section', () => {
  it('shows the app version and official project links', () => {
    render(<SettingsAbout />);

    expect(screen.getByRole('heading', { level: 2, name: 'community.aboutTitle' })).toBeVisible();
    expect(screen.getByText(`v${APP_VERSION}`)).toBeInTheDocument();
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://github.com/NikodemBoniecki/cvka',
      'https://221studio.pl/',
    ]);
  });
});
