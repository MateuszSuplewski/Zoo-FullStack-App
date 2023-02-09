import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Modal, Stack, TextField } from '@mui/material'
import { createActionUpdate } from '../state/animals'
import validateForm from '../helpers/validateForm'
import animalFields from '../data/animalFields'
import useForm from '../hooks/useForm'

const UpdateAnimal = ({ animal }) => {
  const storeDispatch = useDispatch()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onSubmit = (state) => {
    const animalData = {
      ...state,
      species: {
        name: state.species
      }
    }

    storeDispatch(createActionUpdate(animalData.id, animalData))
    handleClose()
  }

  const [handleInputChange, handleFormSubmit, state, errors, handleSetState] = useForm(validateForm, animalFields, onSubmit)

  useEffect(() => {handleSetState({ ...animal, species: animal.species.name })}, [])

  return (
    <div>
      <Button fullWidth size="large" variant="contained" onClick={handleOpen}>
        UPDATE
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
                rows={type === 'textarea' ? 5 : 1}
              />
            ))}
          </Stack>
          <Button
            variant={'contained'}
            sx={{ mt: 0.75 }}
            fullWidth
            type={'submit'}
          >
            UPDATE ANIMAL
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default UpdateAnimal