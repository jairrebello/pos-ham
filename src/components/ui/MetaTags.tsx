import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const MetaTags: React.FC<MetaTagsProps> = ({ title, description, image, url }) => {
  useEffect(() => {
    document.title = title;

    const currentUrl = url || window.location.href;
    const defaultImage = image || `${window.location.origin}/logo-ham.png`;

    const metaTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: defaultImage },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: defaultImage },
      { name: 'description', content: description },
    ];

    metaTags.forEach(({ property, name, content }) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);

      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', property);
        } else if (name) {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }

      metaTag.setAttribute('content', content);
    });

    return () => {
      metaTags.forEach(({ property, name }) => {
        const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
        const metaTag = document.querySelector(selector);
        if (metaTag && metaTag.parentNode) {
          metaTag.parentNode.removeChild(metaTag);
        }
      });
    };
  }, [title, description, image, url]);

  return null;
};
