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
    componentDidMount() {
        this.loadCustomers();
    }
    // Function to load all TodayWalks from the database
    loadCustomers = () => {
        const id = 1;
        API.getWalkerCustomers(id)
            .then(res => {
             
                const dataFormat = res.data.map(data => {
                    const users = {

                        customerName: data.firstName + " " + data.lastName,
                        firstName:data.firstName,
                        lastName:data.lastName,
                        address: data.address,
                        city: data.City,
                        state: data.State,
                        zipCode: data.zipCode,
                        dog: data.dogOwner.dogName,
                        emergencyContact: data.dogOwner.emergencyContact,
                        dogOwnerId: data.dogOwner.id
                    }
                    return (users)
                })


                this.setState({
                    customers: dataFormat
                })

            })
            .catch(err => console.log(err));
    };

    editMethod = (row) => {
        console.log("test", row)
    }
    deleteMethod = (row) => {
        console.log("test", row)
    }

    render() {


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
            Cell: row => (
                <div >
                    <button className="TodayWalks__past--list-publish-button" onClick={() => this.editMethod(row.original.dogOwnerId)}>Edit</button>

                </div>
            ),
            filterable: false

        }, {
            Cell: row => (
                <div>
                    <button className="TodayWalks__past--list-publish-button" onClick={() => this.deleteMethod(row.original.dogOwnerId)}>Delete</button>

                </div>
            ),
            filterable: false
        }
        ]
        return (
            <div style={{ width: "80%", margin: "0 auto"}}>
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
                    className='-striped -highlight' 
                    pivotBy={["customerName"]}
                    
                    SubComponent={row => {
                        // a SubComponent just for the final detail
                        const columns = [
                            {
                                Header: "Property",
                                accessor: "property",
                                width: 200,
                                Cell: ci => {
                                    return `${ci.value}:`;
                                },
                                style: {
                                    backgroundColor: "#DDD",
                                    textAlign: "right",
                                    fontWeight: "bold"
                                }
                            },
                            { Header: "Value", accessor: "value" }
                        ];
                        const rowData = Object.keys(row.original).map(key => {
                            return {
                                property: key,
                                value: row.original[key].toString()
                            };
                        });
                        return (
                            <div style={{ padding: "10px", width: "40%" }}>
                                <ReactTable
                                    data={rowData}
                                    columns={columns}
                                    pageSize={rowData.length}
                                    showPagination={false}
                                />
                            </div>
                        );
                    }}
                />
            </div>

        )
    }

}
export default CustomerList;