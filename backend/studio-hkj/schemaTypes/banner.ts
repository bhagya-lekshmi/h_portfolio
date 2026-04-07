import { Rule } from '@sanity/types'; // Import the Rule type

export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
        {
            name:'bannerNote',
            title:'Banner Note',
            type:'string',
            validation: (Rule: Rule) => Rule.max(50).warning('Banner Note must not exceed 50 characters'), // Explicitly type Rule
        },
        {
            name:'imgUrl',
            title:'ImgUrl',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
  ]
}
