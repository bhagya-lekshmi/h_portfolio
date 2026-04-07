// schemas/contact.js
import { Rule } from '@sanity/types'; // Import the Rule type

export default {
  name: 'contact',
  title: 'Contact Form Submissions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(), // Explicitly type Rule
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => // Explicitly type Rule
        Rule.required().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
          name: 'email',
          invert: false,
        }),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(), // Explicitly type Rule
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(), // Explicitly type Rule
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm:ss',
      },
      readOnly: true,
    },
  ],
};