import './App.css';
import Carlist from './components/Carlist';
import { AppBar, Typography } from '@mui/material'

function App() {
return (
<>
<div className='App'>
<AppBar position="static">
<Typography variant="h3">
Car Shop
</Typography>
</AppBar>
<Carlist />
</div>
</>
)
}

export default App;
