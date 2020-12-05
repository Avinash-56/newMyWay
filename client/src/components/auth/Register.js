import { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios'
import {setAlert} from '../../actions/alert'
import {  register } from "../../actions/auth";
import {connect} from 'react-redux'


const Register = ({setAlert, register})=> {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const {name, email, password, password2} = formData
  const [open, setOpen] = useState(true);

  const onClick = async (e) =>{
    setOpen(false)
    if(password2 !==password){
        setAlert("Passwords do not match", "danger");
    }
    else{
        register({name,email,password})
    }
    setFormData({name: '', description: '', price: '', lbh: '' })
  }
  const onChange = e =>
  setFormData({ ...formData, [e.target.id]: e.target.value });


  return (
    <div className="App">
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
            id="name"
            label="Name"
            type="name"
            value = {name}
            fullWidth
            onChange = {(e)=>onChange(e)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            value = {email}
            onChange = {(e)=>onChange(e)}

            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="string"
            fullWidth
            value={password}
            onChange = {(e)=>onChange(e)}

          />
           <TextField
            autoFocus
            margin="dense"
            id="password2"
            label="Confirm Password"
            type="string"
            fullWidth
            value = {password2}
            onChange = {(e)=>onChange(e)}

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



export default connect(null, {setAlert, register})(Register);
