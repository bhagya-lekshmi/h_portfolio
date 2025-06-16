export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime', initialValue: () => new Date().toISOString() }
  ],
};
