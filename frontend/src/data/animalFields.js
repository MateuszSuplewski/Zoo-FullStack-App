export const animalFields = [
  {
    name: 'name',
    label: 'Animal name',
    placeholder: 'Rookie',
    pattern: /[a-ząćęłńóśźż]{3,}/i,
    error: 'Correct entered name',
    type: 'text',
    required: true
  },
  {
    name: 'age',
    label: 'Age',
    placeholder: '1',
    pattern: /^[0-9]+$/,
    error: 'Correct entered age',
    type: 'number',
    required: true
  },
  {
    name: 'weight',
    label: 'Weight',
    pattern: /^\d{0,2}(\.\d{0,2}){0,1}$/,
    error: 'Correct entered weight',
    type: 'number',
    required: true
  },
  {
    name: 'image',
    label: 'Image URL',
    pattern:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    error: 'Correct entered URL',
    type: 'text',
    required: true
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: true
  },
  {
    name: 'species',
    label: 'Species',
    type: 'text',
    required: true
  }
]

export default animalFields