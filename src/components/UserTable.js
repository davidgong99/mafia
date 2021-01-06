import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ReadyButton from './ReadyButton';

  
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

class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            users: [],
        }
    }
    
    componentDidMount() {
        fetch("http://localhost:8080/user", {
          method: "GET",
        })
        .then(res => res.json())
        .then(
            (result) => {
              console.log("GET result: ", result);
                this.setState({
                    isLoaded: true,
                    users: result.users
                });
            },
            // Handle errors here to catch issues with components
            (error) => {
                console.log("error = " + error);

                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
            
    }

    render() {
        const { error, isLoaded, users } = this.state;
        
        if (error) {
            return <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                <TableContainer component={Paper}>
                  <Table styles={{ minWidth: "650" }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">User list</TableCell>
                        <TableCell align="center">Ready</TableCell>

                      </TableRow>
                      
                    </TableHead>
                    <TableBody>
                      {users.map((name) => (
                        <TableRow key={name}>
                          <TableCell align="center" component="th" scope="row">
                            {name}
                          </TableCell>
                          <TableCell align="center" component="th" scope="row">
                            <ReadyButton username={name}/>
                            {/* Todo add username as prop to button */}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer></div>
            );
        }
    }
}

export default UserTable;
