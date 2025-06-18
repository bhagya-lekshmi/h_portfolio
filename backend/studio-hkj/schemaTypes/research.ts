export default {
  name: 'research',
  title: 'Research',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'country', title: 'Country', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
{
  name: 'image',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'progress',
      type: 'number',
      readOnly: true,
    }
  ]
},
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }
  ]
}
