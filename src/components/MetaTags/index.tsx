import Head from 'next/head'

import { MetaTagsProps } from './types'

export const MetaTags = ({
  title,
  description,
  canonical,
  image,
}: MetaTagsProps) => {
  const pageTitle = title ? `${title} | letmeAsk 2021` : 'letmeAsk 2021'
  const pageDescription =
    description ??
    `letmeAsk => A app to help you awnser most votes question in live.`
  const pageImage = image ?? `/thumb.svg`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="tmowes, tech, ama, question" />

      <meta property="og:site_name" content="letmeAsk" />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={pageTitle} />
      <meta
        name="og:description"
        property="og:description"
        content={pageDescription}
      />
      <meta property="og:url" content={`${canonical}`} />
      <meta property="og:image" content={pageImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="letmeAsk" />
      <meta name="twitter:creator" content="Julius Mowes" />
      <meta name="twitter:image:alt" content="Thumbnail" />
      {pageImage && <meta name="twitter:image" content={pageImage} />}

      {canonical && <link rel="canonical" href={canonical} />}

      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
    </Head>
  )
}
