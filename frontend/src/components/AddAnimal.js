import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Stack, TextField } from '@mui/material'
import { createActionAdd } from '../state/animals'
import validateForm from '../helpers/validateForm'
import animalFields from '../data/animalFields'
import useForm from '../hooks/useForm'

const AddAnimal = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const storeDispatch = useDispatch()

  const onSubmit = (state) => {
    const animalData = {
      ...state,
      species: {
        name: state.species
      }
    }
    storeDispatch(createActionAdd(animalData))
  }

  const [handleInputChange, handleFormSubmit, state, errors] = useForm(validateForm, animalFields, onSubmit)

  return (
    <div>
      <Button fullWidth size="large" variant="contained" onClick={handleOpen}>
        Add new animal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form
          style={{
            margin: '5rem auto',
            backgroundColor: 'white',
            maxWidth: '420px',
            padding: '1rem',
          }}
          onSubmit={handleFormSubmit}
          noValidate
        >
          <Stack spacing={2}>
            {animalFields.map(({ name, label, type }) => (
              <TextField
                error={errors[label] === null}
                helperText={errors[label]}
                multiline={type === 'textarea'}
                key={name}
                id={name}
                type={type === 'textarea' ? 'text' : type}
                label={label}
                name={name}
                variant="outlined"
                value={state[name]}
                onChange={(e) => handleInputChange(e, type)}
              />
            ))}
          </Stack>
          <Button
            variant={'contained'}
            sx={{ mt: 0.75 }}
            fullWidth
            type={'submit'}
          >
            ADD ANIMAL
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default AddAnimal