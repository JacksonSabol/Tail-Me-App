import React, { Component } from 'react';
import API from "../../utils/API";
import "../../index.css";

class WalkerList extends Component {
    state = {

        walkerList: []
    }
    componentDidMount() {
        this.loadWalkers();
    }

    loadWalkers = () => {

        API.getWalkers()
            .then(res => {
                console.log("res" ,res.data)
                const dataWalkers = res.data.map(data => {
                    const dataWalkers = {
                        label: `${data.user.firstName} ${data.user.lastName} `,
                        id:data.user.id,
                        url: `/publicProfile/${data.username}`
                    }
                    return (dataWalkers)
                })
                console.log(dataWalkers)
                this.setState({ walkerList: dataWalkers })
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <ul>
             {this.state.walkerList.map(walker => (
                 <li key={walker.id}><a href={walker.url}>{walker.label}</a></li>
             ))}
            </ul>
        )
    }
}
export default WalkerList;