import * as React from 'react';
import {Button, Modal, Stack, TextField} from '@mui/material';
import { createActionAdd } from '../state/animals';
import { useDispatch } from 'react-redux';

const AddAnimal = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const storeDispatch = useDispatch()

  const initialState = {
    name: '',
    age: 0,
    weight: 0,
    description: '',
    species: ''
  }

  const fields = ['Name','Age','Weight','Species']
  const fieldTypes = ['text','number','number','text']

  const [values, setValues] = React.useState(initialState)

  const handleInputChange = (e,fieldType) => {
    const { name, value } = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: fieldType === 'number' ? Number(value) : value
    }))
  }

  const resetForm = () => {
    setValues(initialState)
  }

  const handleFormSubmit = (e) => {
    const {name,age,weight,description, species} = values
    const preparedAnimal = {
        name,
        age,
        weight,
        description,
        species: {
            name: species
        }
    }

    e.preventDefault()
    storeDispatch(createActionAdd(preparedAnimal))
    resetForm()
  }

  return (
    <div>
      <Button fullWidth size='large' variant='contained' onClick={handleOpen}>Add new animal</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <form
        style={{margin: "5rem auto", backgroundColor: 'white',maxWidth: '420px', padding: '1rem'}}
        onSubmit={handleFormSubmit}
      >
        <Stack spacing={2}>
            {
                fields.map((fieldName, index) => (
                    <TextField key={index} required type={fieldTypes[index]} label={fieldName} name={fieldName.toLowerCase()} variant="outlined" value={values[fieldName.toLowerCase()]}
                    onChange={(e) => handleInputChange(e,fieldTypes[index])}/>
                ))
            }
              <TextField
                 required
                 multiline
                 rows={2}
                 name={'description'}
                 label={'Description'}
                value={values.description}
                onChange={(e) => handleInputChange(e,'text')}
              />
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

