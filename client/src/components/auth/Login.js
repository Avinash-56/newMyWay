import { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {setAlert} from '../../actions/alert'
import { login } from "../../actions/auth";
import {connect} from 'react-redux'

const Login = ({setAlert, login})=> {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {email, password} = formData
  const [open, setOpen] = useState(true);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const onClick = async (e) =>{
    setOpen(false)
    console.log('hello')
    login(email, password)
    
    setFormData({name: '', description: '', price: '', lbh: '' })
  }
  const onChange = e =>
  setFormData({ ...formData, [e.target.id]: e.target.value });


  return (
    <div className="App">
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen} >
        Open Form
      </Button> */}
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            value = {email}
            fullWidth
            onChange = {(e)=>onChange(e)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="string"
            value = {password}
            onChange = {(e)=>onChange(e)}

            fullWidth
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>onClick(e)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}



export default connect(null, {setAlert, login})(Login);
