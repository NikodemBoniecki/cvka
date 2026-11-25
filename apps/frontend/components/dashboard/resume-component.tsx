import React from 'react';
import Image from 'next/image';
import {
  ResumeSingleColumn,
  ResumeTwoColumn,
  ResumeModern,
  ResumeModernTwoColumn,
  ResumeLatex,
  ResumeClean,
  ResumeVivid,
  ResumeVividSingle,
  ResumeModernDeedy,
  ResumeDeedy,
} from '@/components/resume';
import {
  type TemplateSettings,
  type TemplateType,
  DEFAULT_TEMPLATE_SETTINGS,
  RESUME_PHOTO_DIMENSIONS,
  settingsToCssVars,
} from '@/lib/types/template-settings';
import baseStyles from '@/components/resume/styles/_base.module.css';
// The Serif, Sans and Mono faces (lib/types/template-settings.ts), one file per weight
// the templates use. The preview renders in the reader's browser and the PDF in the
// server's Chromium, which have different local fonts, so both load these files to
// wrap lines and break pages the same way. Static on purpose: Chromium writes variable
// fonts into PDFs as Type 3 fonts, which space letters unevenly ("RESUM EN") in the
// page and in the extracted text an ATS reads. next/font/google only serves these
// families as variable fonts.
import '@fontsource/noto-sans/300.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/600.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/noto-sans/800.css';
import '@fontsource/noto-sans/400-italic.css';
import '@fontsource/noto-sans/700-italic.css';
import '@fontsource/noto-serif/300.css';
import '@fontsource/noto-serif/400.css';
import '@fontsource/noto-serif/600.css';
import '@fontsource/noto-serif/700.css';
import '@fontsource/noto-serif/800.css';
import '@fontsource/noto-serif/400-italic.css';
import '@fontsource/noto-serif/700-italic.css';
import '@fontsource/noto-sans-mono/300.css';
import '@fontsource/noto-sans-mono/400.css';
import '@fontsource/noto-sans-mono/600.css';
import '@fontsource/noto-sans-mono/700.css';
import '@fontsource/noto-sans-mono/800.css';

export interface PersonalInfo {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

export interface Experience {
  condensed?: boolean;
  id: number;
  title?: string;
  company?: string;
  location?: string;
  years?: string;
  description?: string[];
  descriptionStyles?: ('bullet' | 'plain')[];
}

export interface Education {
  id: number;
  institution?: string;
  degree?: string;
  years?: string;
  description?: string;
}

export interface Project {
  id: number;
  name?: string;
  role?: string;
  years?: string;
  github?: string;
  website?: string;
  description?: string[];
  descriptionStyles?: ('bullet' | 'plain')[];
}

export interface AdditionalInfo {
  technicalSkills?: string[];
  languages?: string[];
  certificationsTraining?: string[];
  awards?: string[];
}

export interface AdditionalSectionLabels {
  technicalSkills: string;
  languages: string;
  certifications: string;
  awards: string;
}

export interface ResumeSectionHeadings {
  summary: string;
  experience: string;
  education: string;
  projects: string;
  certifications: string;
  skills: string;
  languages: string;
  awards: string;
  links: string;
  earlierExperience?: string;
}

export interface ResumeFallbackLabels {
  name: string;
}

// Section Type for dynamic sections
export type SectionType = 'personalInfo' | 'text' | 'itemList' | 'stringList';

// Section Metadata for dynamic section management
export interface SectionMeta {
  id: string; // Unique identifier (e.g., "summary", "custom_1")
  key: string; // Data key (matches ResumeData field or customSections key)
  displayName: string; // User-visible name
  sectionType: SectionType; // Type of section
  isDefault: boolean; // True for built-in sections
  isVisible: boolean; // Whether to show in resume
  order: number; // Display order (0 = first after personalInfo)
}

// Generic item for custom item-based sections
export interface CustomSectionItem {
  id: number;
  title?: string; // Primary title
  subtitle?: string; // Secondary info (company, institution, etc.)
  location?: string;
  years?: string;
  description?: string[];
  descriptionStyles?: ('bullet' | 'plain')[];
}

// Custom section data container
export interface CustomSection {
  sectionType: SectionType;
  items?: CustomSectionItem[]; // For itemList type
  strings?: string[]; // For stringList type
  text?: string; // For text type
}

export interface ResumeData {
  personalInfo?: PersonalInfo;
  summary?: string;
  workExperience?: Experience[];
  education?: Education[];
  personalProjects?: Project[];
  additional?: AdditionalInfo;
  // NEW: Section metadata and custom sections
  sectionMeta?: SectionMeta[];
  customSections?: Record<string, CustomSection>;
}

interface ResumeProps {
  resumeData: ResumeData;
  template?: TemplateType;
  settings?: TemplateSettings;
  additionalSectionLabels?: Partial<AdditionalSectionLabels>;
  sectionHeadings?: Partial<ResumeSectionHeadings>;
  fallbackLabels?: Partial<ResumeFallbackLabels>;
  /**
   * Content locale ("zh" | "ja" | "ko" | ...). Orders the CJK font fallback
   * stack so a shared codepoint resolves to the right regional face.
   */
  locale?: string;
}

/**
 * Resume Component
 *
 * Main wrapper component that delegates rendering to template-specific components.
 * Applies CSS custom properties from settings for consistent styling.
 *
 * Templates:
 * - swiss-single: Traditional single-column layout (default)
 * - swiss-two-column: Two-column layout with experience sidebar
 * - modern: Single-column with user-selectable accent colors
 * - modern-two-column: Two-column layout with modern colorful accents
 */
const Resume: React.FC<ResumeProps> = ({
  resumeData,
  template = 'swiss-single',
  settings,
  additionalSectionLabels,
  sectionHeadings,
  fallbackLabels,
  locale,
}) => {
  // Merge provided settings with defaults
  const mergedSettings: TemplateSettings = {
    ...DEFAULT_TEMPLATE_SETTINGS,
    ...settings,
    margins: { ...DEFAULT_TEMPLATE_SETTINGS.margins, ...settings?.margins },
    spacing: { ...DEFAULT_TEMPLATE_SETTINGS.spacing, ...settings?.spacing },
    fontSize: { ...DEFAULT_TEMPLATE_SETTINGS.fontSize, ...settings?.fontSize },
  };

  // If template is provided as prop but not in settings, use the prop
  if (template && !settings?.template) {
    mergedSettings.template = template;
  }

  // Convert settings to CSS variables
  const cssVars = settingsToCssVars(mergedSettings, locale);
  const gdprText =
    mergedSettings.gdprConsent === 'current'
      ? 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).'
      : mergedSettings.gdprConsent === 'current_future'
        ? 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu tej oraz przyszłych rekrutacji (zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO)).'
        : null;
  const photoDimensions = mergedSettings.photo
    ? RESUME_PHOTO_DIMENSIONS[mergedSettings.photo.size]
    : undefined;
  const photoHeight = photoDimensions?.height;
  const photoWidth = photoDimensions?.width;

  return (
    <div
      className={`${baseStyles['resume-body']} relative bg-brand-white text-black w-full mx-auto resume-template-${mergedSettings.template}`}
      data-photo-position={mergedSettings.photo?.position}
      style={
        {
          ...cssVars,
          ...(photoWidth ? { '--resume-photo-width': `${photoWidth}px` } : {}),
          ...(photoHeight ? { '--resume-photo-height': `${photoHeight}px` } : {}),
        } as React.CSSProperties
      }
    >
      {mergedSettings.photo?.dataUrl && photoWidth && photoHeight && (
        <div
          className="absolute z-10 overflow-hidden"
          style={{
            top: 'var(--margin-top)',
            [mergedSettings.photo.position]:
              mergedSettings.photo.position === 'left'
                ? 'var(--margin-left)'
                : 'var(--margin-right)',
            width: photoWidth,
            height: photoHeight,
          }}
        >
          <Image
            src={mergedSettings.photo.dataUrl}
            alt={resumeData.personalInfo?.name || 'Zdjęcie'}
            width={photoWidth}
            height={photoHeight}
            unoptimized
            draggable={false}
            className="size-full object-cover"
            style={{
              transform: `scale(${mergedSettings.photo.zoom ?? 1}) translate(${-(mergedSettings.photo.cropX ?? 0)}%, ${-(mergedSettings.photo.cropY ?? 0)}%)`,
              transformOrigin: 'center',
            }}
          />
        </div>
      )}
      {mergedSettings.template === 'swiss-single' && (
        <ResumeSingleColumn
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          additionalSectionLabels={additionalSectionLabels}
        />
      )}
      {mergedSettings.template === 'swiss-two-column' && (
        <ResumeTwoColumn
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          sectionHeadings={sectionHeadings}
        />
      )}
      {mergedSettings.template === 'modern' && (
        <ResumeModern
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          additionalSectionLabels={additionalSectionLabels}
        />
      )}
      {mergedSettings.template === 'modern-two-column' && (
        <ResumeModernTwoColumn
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          sectionHeadings={sectionHeadings}
          fallbackLabels={fallbackLabels}
        />
      )}
      {mergedSettings.template === 'latex' && (
        <ResumeLatex
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          additionalSectionLabels={additionalSectionLabels}
        />
      )}
      {mergedSettings.template === 'clean' && (
        <ResumeClean
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          additionalSectionLabels={additionalSectionLabels}
        />
      )}
      {mergedSettings.template === 'vivid' && (
        <ResumeVivid
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          sectionHeadings={sectionHeadings}
          fallbackLabels={fallbackLabels}
        />
      )}
      {mergedSettings.template === 'vivid-single' && (
        <ResumeVividSingle
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          sectionHeadings={sectionHeadings}
          fallbackLabels={fallbackLabels}
        />
      )}
      {mergedSettings.template === 'modern-deedy' && (
        <ResumeModernDeedy
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          showContactIcons={mergedSettings.showContactIcons}
          additionalSectionLabels={additionalSectionLabels}
        />
      )}
      {mergedSettings.template === 'deedy' && (
        <ResumeDeedy
          earlierExperienceLabel={sectionHeadings?.earlierExperience}
          data={resumeData}
          sectionHeadings={sectionHeadings}
          additionalSectionLabels={additionalSectionLabels}
          fallbackLabels={fallbackLabels}
        />
      )}
      {gdprText && (
        <footer className="mt-5 break-inside-avoid border-t border-black/20 pt-2 text-[8px] leading-[1.25] text-black/75">
          {gdprText}
        </footer>
      )}
    </div>
  );
};

export default Resume;
