import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Title', 
      type: 'string',
      validation: Rule => Rule.required().error('Title is required.')
    }),

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
          { title: 'Copyrights', value: 'copyright' },
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required().error('Category is required.')
    }),

    defineField({ 
      name: 'date', 
      title: 'Date', 
      type: 'string', 
      description: 'Use YYYY-MM-DD format for proper sorting.',
      validation: Rule => Rule.required().error('Date is required.')
    }),

    defineField({ 
      name: 'description', 
      title: 'Description', 
      type: 'array',
      of: [
        { 
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' }, 
            { title: 'Numbered', value: 'number' }
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' }
            ],
            annotations: [
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
      ],
      validation: Rule => Rule.required().error('Description is required.')
    }),
  ]
});
