import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

  
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }
  
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: null,
          // error: false
        }
    }
    
    
    // When username is updated, update state
    usernameOnChange = (event) => {
    
      this.setState({
        username: event.target.value,
      });
    }
    
    // When username is submitted, check if username is valid
    // username can only have letters and numbers
    // max 15 chars
    usernameOnSubmit = (event) => {
      // event.preventDefault();
      
      // var username = this.state.username;
      if (this.state.username.match(/^[A-Za-z]{1,15}$/g)) { // valid match
        console.log("username is valid");
        console.log("submitting username = ", this.state.username);
        
        var payload = {
          "name": this.state.username
        }
        
        
        fetch("http://localhost:8080/user", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(res => res.json())
        .then(
          (result) => {
            console.log("POST returned");
            console.log(result.response);
          },
          (error) => {
            console.log("POST error: ", error);
            return;
          }
        )
        
        console.log("SUBMITTED");

        
      } else {
        // send post request
        console.log("invalid username");
      }
      
    }

    render() {        
      return (
        <div>
          <form autoComplete="off" onSubmit={this.usernameOnSubmit}>
            <TextField id="outlined-basic" label="Username" variant="outlined" onChange={this.usernameOnChange}/>
          </form>
          <Button variant="contained">Login</Button>
        </div>
        
      );
  
    }
}

export default LoginPage;
