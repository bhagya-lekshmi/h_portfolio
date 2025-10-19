import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    
    // --- CATEGORY FIELD (No change) ---
    defineField({ 
      name: 'category', 
      title: 'Category', 
      type: 'string',
      options: {
        list: [
          { title: 'Article in Periodical', value: 'periodical' },
          { title: 'Article in Journals', value: 'journals' },
          { title: 'Books', value: 'books' },
          { title: 'Book Chapters/Articles', value: 'chapters' },
          { title: 'Participation in Seminars/Conferences/Symposium', value: 'participation' },
          { title: 'Invited Talks', value: 'talks' },
          { title: 'Patents', value: 'patents' },
          { title: 'PhD Thesis', value: 'thesis' },
          { title: 'PhD Guided/Adjudicated', value: 'guided' },
          { title: 'Research Projects', value: 'projects' },
          { title: 'Workshop / FDP / Training Programme', value: 'workshops' },
          { title: 'Awards / Achievements /Others', value: 'awards' },
          { title: 'copyright', value: 'copyright' },
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required().error('Category is required for grouping.')
    }),
    
    // --- CONDITIONAL FIELDS (No change) ---
    defineField({ 
      name: 'periodicalName', 
      title: 'Publication / Venue Name',
      type: 'string',
      hidden: ({ parent }) => !['periodical', 'journals'].includes(parent?.category as string)
    }),
    
    defineField({ 
      name: 'periodicity', 
      title: 'Periodicity', 
      type: 'string',
      hidden: ({ parent }) => !['periodical', 'journals'].includes(parent?.category as string)
    }),
    
    // --- Existing Fields (No change) ---
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'country', title: 'Country', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'string', description: 'Use YYYY-MM-DD format for proper sorting.' }),
    
    // 💥 UPDATED FIELD: DESCRIPTION to Rich Text Editor (Portable Text)
    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'array', // Must be an array
      of: [
        { 
          type: 'block', // The main text block
          styles: [
            { title: 'Normal', value: 'normal' },
            // Add other styles like H1, H2 if needed, but 'normal' is often sufficient for descriptions
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' }, 
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' }, // Bold
              { title: 'Emphasis', value: 'em' }     // Italics
            ],
            annotations: [
              // Add a field for links if you want to allow hyperlinking text
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        // You can add other types here, like images or code blocks, if your description needs them.
        // { type: 'image' } 
      ]
    }),
    

    
    // --- Slug Field (No change) ---
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } })
  ]
});