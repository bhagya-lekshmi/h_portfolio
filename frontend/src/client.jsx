import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'b9tqby99',
  dataset: 'production',
  apiVersion: '2024-01-01', // 🔁 Add this line
  useCdn: false,          
  token: 'skfhEOM3ngf1Gd854fqKMnkYBaj9xfW9fVlFAT7EMqN4lVAe1P86e8bMX9NukSd03hyZykBBUkdWqsoWG3BrKQRFTiXyYkUS270WS1PJNY85t5UIEicoRZbWsaL9Jb8ZQcUWmiXZBrE5stExTCJUEBKLKrYdleGtx2Tc20tvoBA1YFENKzCq',   // ✅ Optional but recommended
});
