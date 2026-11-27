import React from 'react';

export interface CertificationEntry {
  name: string;
  url: string;
}

export function parseCertificationEntry(value: string): CertificationEntry {
  const match = value.match(/^\s*(.*?)\s*\|\s*(\S.*?)\s*$/);
  return match ? { name: match[1].trim(), url: match[2].trim() } : { name: value, url: '' };
}

export function formatCertificationEntry(name: string, url: string): string {
  const cleanName = name.trim();
  const cleanUrl = url.trim();
  if (cleanUrl) return `${cleanName} | ${cleanUrl}`;
  return cleanName || cleanUrl;
}

export function CertificationLinkText({ value }: { value: string }): React.ReactElement {
  const { name, url: rawUrl } = parseCertificationEntry(value);
  if (!rawUrl) return <>{name}</>;
  if (!/^https?:\/\//i.test(rawUrl)) return <>{value}</>;

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return <>{value}</>;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return <>{value}</>;
  return (
    <a
      href={url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 decoration-current/40 hover:decoration-current"
    >
      {name}
    </a>
  );
}

export function CertificationLinkList({
  items,
  separator = ' • ',
}: {
  items: string[];
  separator?: string;
}): React.ReactElement {
  return (
    <>
      {items.map((item, index) => (
        <React.Fragment key={`${item}-${index}`}>
          {index > 0 ? separator : null}
          <CertificationLinkText value={item} />
        </React.Fragment>
      ))}
    </>
  );
}
