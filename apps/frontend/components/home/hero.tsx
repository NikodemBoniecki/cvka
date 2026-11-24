'use client';

import React from 'react';
import Link from 'next/link';
import { CommunityLinks } from '@/components/common/community-links';
import { CvkaWordmark } from '@/components/common/cvka-wordmark';
import { BackgroundEffect } from '@/components/effects/background-effect';
import { buttonClass } from '@/components/ui/button';
import { useBlockDissolveNavigate } from '@/lib/effects/use-block-dissolve-navigate';
import { useTranslations } from '@/lib/i18n';

export default function Hero() {
  const { t } = useTranslations();
  const dashboardLink = useBlockDissolveNavigate();

  return (
    <section className="relative isolate h-screen w-full bg-canvas p-4 md:p-12 lg:p-24">
      <BackgroundEffect />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center border border-ink text-primary bg-canvas shadow-sw-xl">
        <h1 className="hero-enter mb-12 text-center selection:bg-primary selection:text-on-accent">
          <CvkaWordmark size="large" />
        </h1>

        <div className="hero-enter hero-enter-delay-2 flex flex-col gap-4 md:flex-row md:gap-12">
          <a
            href="https://github.com/NikodemBoniecki/cvka"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ variant: 'outline', size: 'lg' })}
          >
            GitHub
          </a>
          <a
            href="https://github.com/NikodemBoniecki/cvka/blob/main/SETUP.md"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ variant: 'outline', size: 'lg' })}
          >
            {t('home.docs')}
          </a>
          <Link
            href="/dashboard"
            className={buttonClass({ size: 'lg' })}
            onClick={dashboardLink.onClick}
            onMouseEnter={dashboardLink.prepare}
            onFocus={dashboardLink.prepare}
          >
            {t('home.launchApp')}
          </Link>
        </div>

        <CommunityLinks
          variant="hero"
          className="hero-enter hero-enter-delay-2 mt-8 justify-center"
        />
      </div>
    </section>
  );
}
