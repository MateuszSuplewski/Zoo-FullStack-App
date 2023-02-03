import * as React from 'react';
import {Button, Modal, Stack, TextField} from '@mui/material';
import { createActionUpdate } from '../state/animals';
import { useDispatch } from 'react-redux';

const UpdateAnimal = ({animal}) => {
    const {id, name, age, weight, description, species, imgSrc} = animal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const storeDispatch = useDispatch()

  const initialState = {
    name: name,
    age: age,
    weight: weight,
    description: description
  }


  const fields = ['Name','Age','Weight']
  const fieldTypes = ['text','number','number']

  const [values, setValues] = React.useState(initialState)

  const handleInputChange = (e,fieldType) => {
    const { name, value } = e.target
    setValues((prevValues) => ({
      ...prevValues,
      [name]: fieldType === 'number' ? Number(value) : value
    }))
  }

  const handleFormSubmit = (e) => {
    const {name,age,weight,description} = values
    const preparedAnimal = {
        id,
        name,
        age,
        weight,
        description,
        species
    }

    e.preventDefault()
    storeDispatch(createActionUpdate(id, preparedAnimal))
    handleClose()
  }

  return (
    <div>
      <Button fullWidth size='large' variant='contained' onClick={handleOpen}>UPDATE</Button>
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
          UPDATE ANIMAL
        </Button>
      </form>
      </Modal>
    </div>
  )
}

export default UpdateAnimal

