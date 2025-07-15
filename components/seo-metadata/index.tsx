import React, { ReactNode } from 'react';
import Head from 'next/head';
import { FB_APP_ID, GA_TRACKING_ID } from '@/const/common.const';
import { ISeoMetadata } from '@/types/seo-metadata.type';

export interface SEOMetadataProps {
  metadata: ISeoMetadata;
  children?: ReactNode;
}

export default function SEOMetadata(props: SEOMetadataProps) {
  const { metadata } = props;
  return (
    <Head>
      <title>{ metadata.title }</title>
      <meta charSet='UTF-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:locale' content='vi_VN' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />

      { metadata.disableCrawling && <meta name='robots' content='noindex, nofollow' />}
      { metadata.description && <meta itemProp='description' content={ metadata.description }/> }
      { metadata.image && <meta itemProp='image' content={ metadata.image }/> }
      { metadata.description && <meta name='description' content={ metadata.description }/> }

      <meta property='og:title' content={ metadata.title } />
      { metadata.description && <meta property='og:description' content={ metadata.description } /> }
      <meta property='og:type' content={ metadata.type || 'website' } />
      { metadata.url && <meta property='og:url' content={ metadata.url } /> }
      { metadata.siteName && <meta property='og:site_name' content={ metadata.siteName } /> }
      { metadata.image && <meta property='og:image' content={ metadata.image } /> }

      <meta property='fb:app_id' content={ FB_APP_ID } />

      <meta name='twitter:card' content='summary' />
      { metadata.siteName && <meta property='twitter:site' content={ metadata.siteName } /> }
      <meta name='twitter:title' content={ metadata.title } />
      { metadata.description && <meta property='twitter:description' content={ metadata.description } /> }
      { metadata.image && <meta property='twitter:image' content={ metadata.image } /> }
      { metadata.url && <meta property='twitter:url' content={ metadata.url } /> }

      { metadata.canonical && <link rel='canonical' href={ metadata.canonical } /> }

      <link rel='shortcut icon' href='/favicon.ico'/>
      { props.children }
      {/* Global site tag (gtag.js) - Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ GA_TRACKING_ID }`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}gtag('js', new Date());
            gtag('config', '${ GA_TRACKING_ID }');
            `,
        }
        }
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: `{
            "@context": "http://schema.org",
            "@type": "Organization",
            "url": "${metadata.url}"
          }`,
        }}
      />
    </Head>
  )
}