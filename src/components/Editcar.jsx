import React from 'react';
import { Button,DialogContent } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


export default function Editcar(props) {

    const [car, setCar] = React.useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        modelYear: '',
        price:''
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setCar({ // Tämä tuo auton tiedot valmiiksi lomakkeelle!
        brand: props.params.data.brand,
        model: props.params.data.model,
        color: props.params.data.color,
        fuel: props.params.data.fuel,
        modelYear: props.params.data.modelYear,
        price: props.params.data.price
        })
        setOpen(true);
    }
    const handleSave = () => {
        props.updateCar(props.params.data._links.car.href, car)
        setOpen(false);
    }
    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <>
          <Button size="small" onClick={handleClickOpen}>Edit</Button>
        <Dialog open = {open}>
            <DialogTitle>Edit car</DialogTitle>
            <DialogContent>
                <TextField 
                    margin= "dense"
                    label='Brand'
                    value={car.brand}
                    onChange={(e) => setCar({...car, brand: e.target.value})}
                    variant='standard'>
                </TextField>
                <TextField
                    margin= "dense"
                    label='Model'
                    value={car.model}
                    onChange={(e) => setCar({...car, model: e.target.value})}
                    variant='standard'>
                </TextField>
                <TextField
                    margin= "dense"
                    label='Color'
                    value={car.color}
                    onChange={(e) => setCar({...car, color: e.target.value})}
                    variant='standard'>
                </TextField>
                <TextField
                    margin= "dense"
                    label='Fuel'
                    value={car.fuel}
                    onChange={(e) => setCar({...car, fuel: e.target.value})}
                    variant='standard'>
                </TextField>
                <TextField
                    margin= "dense"
                    label='Year'
                    value={car.modelYear}
                    onChange={(e) => setCar({...car, modelYear: e.target.value})}
                    variant='standard'>
                </TextField>
                <TextField
                    margin= "dense"
                    label='Price'
                    value={car.price}
                    onChange={(e) => setCar({...car, price: e.target.value})}
                    variant='standard'>
                </TextField>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}
