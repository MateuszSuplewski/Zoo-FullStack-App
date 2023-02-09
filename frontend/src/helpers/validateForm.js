const validateForm = (fields, state) => {
  const errors = {}

  fields.forEach(({ required, name, label, error, pattern }) => {
    if (required && state[name].length === 0) errors[label] = `${label} field requires data`
    if (pattern && !pattern.test(state[name]) && state[name]) errors[label] = error
  })

  return errors
}

export default validateForm
