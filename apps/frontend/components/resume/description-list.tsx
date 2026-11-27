import React from 'react';
import { cn } from '@/lib/utils';
import { SafeHtml } from './safe-html';
import baseStyles from './styles/_base.module.css';

export type DescriptionStyle = 'bullet' | 'plain';

interface DescriptionListProps {
  items?: string[];
  styles?: DescriptionStyle[];
  textClassName?: string;
  marker?: string;
  markerClassName?: string;
  renderItem?: (item: string, index: number) => React.ReactNode;
}

export const DescriptionList: React.FC<DescriptionListProps> = ({
  items,
  styles,
  textClassName = baseStyles['resume-text-sm'],
  marker = '•',
  markerClassName = 'mr-1.5 flex-shrink-0',
  renderItem,
}) => {
  if (!items || items.length === 0) return null;

  return (
    <ul className={cn(baseStyles['resume-list'], textClassName)}>
      {items.map((desc, index) => {
        const showMarker = styles?.[index] !== 'plain';

        return (
          <li key={index} className={cn('flex', showMarker && 'ml-4')}>
            {showMarker && (
              <span className={markerClassName} aria-hidden="true">
                {marker}
                {'\u00A0'}
              </span>
            )}
            <span>{renderItem ? renderItem(desc, index) : <SafeHtml html={desc} />}</span>
          </li>
        );
      })}
    </ul>
  );
};
