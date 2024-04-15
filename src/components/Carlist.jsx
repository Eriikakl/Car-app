import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Snackbar, Button } from '@mui/material';
import Addcar from './Addcar';
import Editcar from './Editcar';



export default function Carlist() {

const [cars, setCars] = useState([]);
const [open, setOpen] = useState(false);
const [msg, setMsg] = useState("");
const link = 'https://carrestservice-carshop.rahtiapp.fi/cars'

const [columnDefs] = useState([
    {field: 'brand', sortable: true, filter: true},
    {field: 'model', sortable: true, filter: true},
    {field: 'color', sortable: true, filter: true},
    {field: 'fuel', sortable: true, filter: true},
    {field: 'modelYear', sortable: true, filter: true},
    {field: 'price', sortable: true, filter: true},
    {cellRenderer: params => 
    <Button size="small" color='error' onClick={() => deleteCar(params.data._links.self.href)}>Delete</Button> },
    {cellRenderer: params => 
    <Editcar updateCar={updateCar} params= {params}/>, width: 120}
])


const gridRef = useRef();

useEffect(() => fetchData(), []);  // fetchData() == getCars()  

    const fetchData = () => { //getCars 
        fetch(link, { method: 'GET'})
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(error => console.error(error))
    }

    const deleteCar = (carID) => {
        console.log(carID);
        const confirmed = window.confirm("Are you sure?");
            if (!confirmed) {
            return;
            }
        
        fetch(carID, {method: 'DELETE'})
        .then(response => {
            if (response.ok) {
            setMsg("Car deleted successfully");
            setOpen(true);
            fetchData(); //getCars();
            } else {
            setMsg("Failed to delete car"); // window.alert("Something goes wrong with deleting")
            setOpen(true);
            }
            })
        .catch(error => {
        console.error(error => console.error(error)); // .catch(error => console.error(error))
        setMsg("Something went wrong");
        setOpen(true);
        });
    }

    const addCar = (car) => {
        fetch(link, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok) {
                setMsg("onnistui");
                setOpen(true);
                return response.json(); 
            } else {
                throw new Error('vienti ei onnistu')
            }
        })
        .then(data => {
            fetchData(); //getCars()
        })
    }
    const updateCar = (link, updateCar) => {
        fetch(link, { 
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(updateCar)
        })
        .then(response => {
            if(response.ok) {
                setMsg("onnistui");
                setOpen(true);
                return response.json; 
            } else {
                throw new Error('vienti ei onnistu')
            }
        })
        .then(data => {
            fetchData(); //getCars()
        })
    }

    return (
        <div>
            <Addcar addCar={addCar} />
            
            <div id="root" className="ag-theme-material" style={{ height: '80vh', width: '90vw' } }>
            <AgGridReact                                        
                rowData={cars}
                columnDefs={columnDefs}
                rowSelection="single" 
                ref={gridRef}
                paginationAutoPageSize={10} // onko oikea??
                pagination={true} //onko oikea?
            ></AgGridReact>
            <Snackbar
                open= {open}
                autoHideDuration={3000}
                onClose={() => {setOpen(false); setMsg("")}}
                message= {msg} >
                    
            </Snackbar>
            </div>
       
        </div>
    );
}