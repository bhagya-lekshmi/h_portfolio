export default {
  name: 'academic',
  title: 'Academic',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {dateFormat: 'MMMM YYYY'},
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {dateFormat: 'MMMM YYYY'},
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'iconClass',
      title: 'Icon Class',
      type: 'string',
      description: 'CSS class for icon, e.g. flaticon-development',
    },
  ],
};
