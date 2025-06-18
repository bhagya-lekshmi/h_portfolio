import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'b9tqby99',
  dataset: 'production',
  apiVersion: '2024-01-01', // 🔁 Add this line
  useCdn: false,          
  token: 'skJwyGZ1h5EhRSCDs96qZ6xLIiQUFF01nSPLbMW4fePC1U81DPy5hpYtJVer3sSGGFLDscoLhmr1zj95oLzWTAfUerRjkQT3IPftcQmW0X2mB6d7tUFRM6gRZ6UuJZQ6tg4w00CktJUqIAVaaa0x7ES98DbA1qPB5TeSgqJTBs4k6R4nHjLV',   // ✅ Optional but recommended
});
