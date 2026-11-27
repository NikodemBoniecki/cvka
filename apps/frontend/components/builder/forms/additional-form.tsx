'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdditionalInfo } from '@/components/dashboard/resume-component';
import { useTranslations } from '@/lib/i18n';
import {
  formatCertificationEntry,
  parseCertificationEntry,
} from '@/components/resume/certification-link';

interface AdditionalFormProps {
  data: AdditionalInfo;
  onChange: (data: AdditionalInfo) => void;
}

export const AdditionalForm: React.FC<AdditionalFormProps> = ({ data, onChange }) => {
  const { t } = useTranslations();

  // Helper to handle array conversions (text -> string[])
  const handleArrayChange = (field: keyof AdditionalInfo, value: string) => {
    // Split by newlines only. Blank/whitespace lines are preserved while editing
    // so pressing Enter creates a new line (issue #763); consumers filter empty
    // entries at render time, and the backend drops them on save.
    const items = value.split('\n');
    onChange({
      ...data,
      [field]: items,
    });
  };

  const formatArray = (arr?: string[]) => {
    return arr?.join('\n') || '';
  };

  const certifications = data.certificationsTraining ?? [];
  const updateCertification = (index: number, field: 'name' | 'url', value: string) => {
    const next = [...certifications];
    const current = parseCertificationEntry(next[index] ?? '');
    next[index] = formatCertificationEntry(
      field === 'name' ? value : current.name,
      field === 'url' ? value : current.url
    );
    onChange({ ...data, certificationsTraining: next });
  };

  const addCertification = () =>
    onChange({ ...data, certificationsTraining: [...certifications, ''] });

  const removeCertification = (index: number) =>
    onChange({
      ...data,
      certificationsTraining: certifications.filter((_, itemIndex) => itemIndex !== index),
    });

  // Explicitly allow Enter key to create newlines (prevent form submission interference)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Allow default behavior (newline insertion)
      e.stopPropagation();
    }
  };

  return (
    <div className="space-y-6">
      <p className="font-mono text-xs uppercase tracking-wider text-ink">
        {t('builder.additionalForm.instructions')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="technicalSkills">{t('resume.additional.technicalSkills')}</Label>
          <Textarea
            id="technicalSkills"
            value={formatArray(data.technicalSkills)}
            onChange={(e) => handleArrayChange('technicalSkills', e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('builder.additionalForm.placeholders.technicalSkills')}
            className="min-h-[120px]"
            aria-describedby="technicalSkillsHint"
          />
          <p id="technicalSkillsHint" className="text-xs text-steel">
            {t('builder.additionalForm.technicalSkillsHint')}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="languages">{t('resume.sections.languages')}</Label>
          <Textarea
            id="languages"
            value={formatArray(data.languages)}
            onChange={(e) => handleArrayChange('languages', e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('builder.additionalForm.placeholders.languages')}
            className="min-h-[120px]"
          />
        </div>
        <div className="space-y-2">
          <Label>{t('resume.sections.certifications')}</Label>
          <div className="space-y-3">
            {certifications.map((certification, index) => {
              const entry = parseCertificationEntry(certification);
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_1fr_auto]"
                >
                  <Input
                    value={entry.name}
                    onChange={(event) => updateCertification(index, 'name', event.target.value)}
                    placeholder={t('builder.additionalForm.certificationNamePlaceholder')}
                    aria-label={`${t('builder.additionalForm.certificationNamePlaceholder')} ${index + 1}`}
                  />
                  <Input
                    type="url"
                    value={entry.url}
                    onChange={(event) => updateCertification(index, 'url', event.target.value)}
                    placeholder={t('builder.additionalForm.certificationUrlPlaceholder')}
                    aria-label={`${t('builder.additionalForm.certificationUrlPlaceholder')} ${index + 1}`}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCertification(index)}
                    aria-label={`${t('builder.additionalForm.removeCertification')} ${index + 1}`}
                  >
                    {t('builder.additionalForm.removeCertification')}
                  </Button>
                </div>
              );
            })}
            <Button type="button" size="sm" variant="outline" onClick={addCertification}>
              {t('builder.additionalForm.addCertification')}
            </Button>
          </div>
          <p className="text-xs text-ink-soft">
            {t('builder.additionalForm.certificationLinkHint')}
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="awards">{t('resume.sections.awards')}</Label>
          <Textarea
            id="awards"
            value={formatArray(data.awards)}
            onChange={(e) => handleArrayChange('awards', e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('builder.additionalForm.placeholders.awards')}
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );
};
