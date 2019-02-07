import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import API from "../../utils/API";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Moment from "moment";

class WalkerScheduleWalks extends Component {
  state = {
    date: new Date(),
    onwnerList: [],
    selectedOptions: []
  }

  componentDidMount() {
    this.loadOwners();
  }

  loadOwners = () => {
    const idWalker = this.props.walkerID;
    API.getDogOwners(idWalker)
      .then(res => {
        const dataDogOwners = res.data.map(data => {
          const dataOwners = {
            label: `${data.user.firstName} ${data.user.lastName} - ${data.dogName}`,
            value: data.id
          }
          return (dataOwners)
        })
        this.setState({ onwnerList: dataDogOwners })
      })
      .catch(err => console.log(err));
  }

  handleChangeList = (options) => {
    this.setState({ selectedOptions: options });
  }

  onChange = date => this.setState({ date })

  handleSchedule = () => {
    const idWalker = this.props.walkerID;
    console.log(this.state.selectedOptions)
    const selectedOwners = this.state.selectedOptions.map(data => {
      const idOwner = data.value;
      console.log('date', this.state.date)
      const dataOwners = {
        walkerId: idWalker,
        dogOwnerId: idOwner,
        status: 'pending',
        finish: 0,
        walkDate: Moment(this.state.date).format("YYYY-MM-DD HH:mm")
      }
      return (dataOwners)
    })

    API.addSchedule(selectedOwners, idWalker)
      .then(res => {
        //this.props.history.push("/userProfile/this.props.username#fullschedule")
        console.log("username",this.props.username)
      })
    }

  render() {
    return (
      <div>
        
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
          className='class1'
          disableClock={true}
          calendarClassName='class1'
        />
      
        <ReactMultiSelectCheckboxes
          options={this.state.onwnerList}
          onChange={this.handleChangeList} />
     
        <button onClick={this.handleSchedule}>schedule</button>
      </div>
    );
  }
}

export default WalkerScheduleWalks;