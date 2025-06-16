export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'platform',
      type: 'string',
      title: 'Platform',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'Medium', value: 'medium' }
        ],
        layout: 'radio'
      }
    },
    {
      name: 'embedUrl',
      type: 'url',
      title: 'Embed URL'
    }
  ]
};

