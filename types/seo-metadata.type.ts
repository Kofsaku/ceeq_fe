export interface ISeoMetadata {
    title: string,
    url: string,
    description?: string,
    type?: 'website' | 'object' | 'article' | 'book',
    siteName?: string,
    image?: string,
    canonical?: string,
    disableCrawling?: boolean
  }