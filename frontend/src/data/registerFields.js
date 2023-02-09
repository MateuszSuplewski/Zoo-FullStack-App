export const registerFields = [
  {
    name: 'firstname',
    label: 'First name',
    pattern: /[a-ząćęłńóśźż]{3,}/i,
    error: 'Correct entered first name',
    type: 'text',
    required: true
  },
  {
    name: 'lastname',
    label: 'Last name',
    pattern: /[a-ząćęłńóśźż]{3,}/i,
    error: 'Correct entered last name',
    type: 'text',
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    pattern: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
    error: 'Correct entered email - example@domain.com',
    type: 'text',
    required: true
  },
  {
    name: 'password',
    label: 'Password',
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    error: 'Password needs to be atleast 8 characters, 1 lower, 1 upper',
    type: 'password',
    required: true
  }
]

export default registerFields
