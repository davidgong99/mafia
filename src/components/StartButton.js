import React from 'react';
import Button from '@material-ui/core/Button';

// Receive username in props
class ReadyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    startOnClick = (event) => {
        console.log("starting game..");
        
        fetch("http://localhost:8080/startgame", {
            method: "POST"
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log("Game starting.. ", result.response);
            },
            (error) => {
                console.log("Game could not start: ", error);
                return;
            }
        )
        
    }    
    
    render() {        
      return (
        <div>
          <Button onClick={this.startOnClick} variant="outlined" color="primary">Start</Button>
        </div>
        
      );
  
    }
}

export default ReadyButton;
