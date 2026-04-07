export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Work Vibes', value: 'career' },
          { title: 'Miles & Moments', value: 'travel' },
          { title: 'Off Hours', value: 'hobbies' },
          { title: 'Bits & Pieces', value: 'misc' }
        ], // "All" is handled in frontend by including all
        layout: 'dropdown'
      }
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ]
}
