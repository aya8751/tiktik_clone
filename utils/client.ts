import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'kiyjk6xy',
  dataset: 'production',
  apiVersion: '2022-07-29',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
