import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'fc0db7ib',
  dataset: 'production',
  apiVersion: '2023-01-01', // 🔁 Add this line
  useCdn: true,             // ✅ Optional but recommended
});
