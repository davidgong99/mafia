import React from 'react';
import Button from '@material-ui/core/Button';

// Receive username in props
class ReadyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          username: null,
          // error: false
        }
    }

    readyOnClick = (event) => {
        console.log("button clicked for username:", this.props.username);
    }    
    
    render() {        
      return (
        <div>
          <Button onClick={this.readyOnClick} variant="outlined" color="primary">Ready</Button>
        </div>
        
      );
  
    }
}

export default ReadyButton;
