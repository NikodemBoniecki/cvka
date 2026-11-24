import Image from 'next/image';
import { cn } from '@/lib/utils';

/** The square CVKA mark uses 221 Supreme Extrabold outlines in a centered 2×2 grid. */
export function CvkaWordmark({
  size = 'small',
  className,
}: {
  size?: 'small' | 'large';
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-label="CVKA"
      className={cn(
        'inline-flex aspect-square items-center justify-center',
        size === 'large' ? 'size-40 md:size-56 lg:size-64' : 'size-5',
        className
      )}
    >
      <Image
        src="/icon.svg"
        alt=""
        width={256}
        height={256}
        priority={size === 'large'}
        className="size-full"
      />
    </span>
  );
}
