import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css';
import API from "../../utils/API";
import treeTableHOC from "react-table/lib/hoc/treeTable";
const TreeTable = treeTableHOC(ReactTable);


class CustomerList extends Component {
    state = {
        customers: []

    }
    handleSubmit = this.handleSubmit.bind(this);
    componentDidMount() {
        this.loadCustomers();
    }
    // Function to load all Customer Info from the database
    loadCustomers = () => {
        const id = this.props.walkerId;
        API.getWalkerCustomers(id)
            .then(res => {

                const dataFormat = res.data.map(data => {
                    const users = {

                        customerName: data.firstName + " " + data.lastName,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        address: data.address,
                        city: data.City,
                        state: data.State,
                        zipCode: data.zipCode,
                        dog: data.dogOwner.dogName,
                        emergencyContact: data.dogOwner.emergencyContact,
                        dogOwnerId: data.dogOwner.id,
                        userId: data.id
                    }
                    return (users)
                })


                this.setState({
                    customers: dataFormat
                })

            })
            .catch(err => console.log(err));
    };

    //Delete User
    deleteMethod = (userId) => {
        console.log("test", userId)
        API.deleteUserData(userId).then(res => {
            this.loadCustomers();
        })


    }

    //Edit User Data
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        const editUserData = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            address: data.get('address'),
            City: data.get('city'),
            State: data.get('state'),
            zipCode: data.get('zipCode')

        }
        const editDogOwnerData = {
            dogName: data.get('dog'),
            emergencyContact: data.get('emergencyContact')
        }

        const userId = data.get('userId');
        const dogOwnerId = data.get('dogOwnerId');

        //Create an Object of Objects, one to upadate user table and  the other one to update dogOwner table
        const userData = {
            userDataObj: editUserData,
            dogOwnerDataObj: editDogOwnerData
        }

        API.editUserData(userId, dogOwnerId, userData).then(res => {
            //prevent reload of the table.. uncomment if reaload wanted.
            /*  this.loadCustomers(); */
        })
    }

    render() {

        //Data table headers
        const columns = [{
            Header: 'Customer Name',
            accessor: 'customerName',
        },
        {
            Header: 'First Name',
            accessor: 'firstName',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
        },
        {
            Header: 'Dog',
            accessor: 'dog'
        },
        {
            Header: 'Address',
            accessor: 'address',

        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'State',
            accessor: 'state'
        },
        {
            Header: 'Zip Code',
            accessor: 'zipCode'
        },
        {
            Header: 'Emergency Contact',
            accessor: 'emergencyContact',
            filterable: false
        },
        {
            id: 'delete',
            Cell: row => (
                <div>
                    <button className="TodayWalks__past--list-publish-button" onClick={() => this.deleteMethod(row.original.userId)}>Delete</button>

                </div>
            ),
            filterable: false
        }
        ]
        return (
            <div className="TodayWalks">
             
                 <div /* className="TodayWalks__reactTableUpcoming" */ /* style={{ width: "80%", margin: "0 auto" }} */> 
                 <span className="TodayWalks__reactTableUpcoming--title">Customer List: </span> 
                <TreeTable
                    filterable
                    defaultFilterMethod={(filter, row, column) => {
                        const id = filter.pivotId || filter.id;
                        return row[id] !== undefined
                            ? String(row[id])
                                .toLowerCase()
                                .includes(filter.value.toLowerCase())
                            : true;
                    }}
                    data={this.state.customers}
                    columns={columns}
                    minWidth={100}
                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                    showPagination={true}
                    sortable={true}
                    multiSort={true}
                    resizable={true}
                    defaultPageSize={5}
                    minRows={3}
                    className="TodayWalks__reactTableUpcoming--table -striped -highlight"
                    pivotBy={["customerName"]}

                    SubComponent={row => {
                        // a SubComponent to display edit form
                        // Dynamic creation of the input fields
                        const rowData = Object.keys(row.original).map(key => {
                            return (
                                <tr key={row.original[key].toString()} >
                                    {(() => {
                                        //create hidden fields for ids.
                                        if (key == 'dogOwnerId' || key == 'userId' || key == 'customerName') {
                                            return (
                                                <React.Fragment>
                                                    <td>
                                                        <input type='hidden' name={key} defaultValue={row.original[key].toString()} />
                                                    </td>
                                                </React.Fragment>
                                            )
                                        } else {
                                            return (
                                                <React.Fragment>

                                                    <td style={{ textAlign: "right" }}>
                                                        <label>
                                                            {(() => {
                                                                //Modify the display name of each field
                                                                switch (key) {
                                                                    case "firstName": return "First Name:";
                                                                    case "lastName": return "Last Name:";
                                                                    case "address": return "Address:";
                                                                    case "city": return "City:";
                                                                    case "state": return "State:";
                                                                    case "zipCode": return "Zip Code:";
                                                                    case "dog": return "Dog:";
                                                                    case "emergencyContact": return "Emergency Contact";
                                                                    default: return "N/A";
                                                                }
                                                            })()}
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <input type='text' name={key} defaultValue={row.original[key].toString()} onChange={this.handleInputChange} style={{ width: "100%" }} />
                                                    </td>

                                                </React.Fragment>
                                            )
                                        }
                                    })()}

                                </tr>

                            );
                        });
                        return (<form onSubmit={this.handleSubmit}>
                            {/* Create table for edit Form */}
                            <table style={{ width: "50%" }}>
                                <tbody>
                                    {rowData}
                                    <tr><td style={{ textAlign: "center" }} colSpan={2}>
                                        <button type="submit" value="Edit" className="TodayWalks__past--list-publish-button">Edit Customer Info.</button>
                                    </td></tr>
                                </tbody>
                            </table>
                        </form>
                        )

                    }}
                />
                </div>
            </div>
        )
    }

}
export default CustomerList;