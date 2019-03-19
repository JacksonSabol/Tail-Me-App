import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import API from "../../utils/API";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import Moment from "moment";
import "../../index.css"

class WalkerScheduleWalksWalker extends Component {
  state = {
    date: new Date(),
    ownerList: [],
    selectedOptions: [],

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
            value: data.id,
            userId: data.userId
          }
          return (dataOwners)
        })
        this.setState({ ownerList: dataDogOwners })
      })
      .catch(err => console.log(err));
  }

  handleChangeList = (options) => {
    this.setState({ selectedOptions: options });
  }

  onChange = date => this.setState({ date })

  handleSchedule = () => {
    const idWalker = this.props.walkerID;
    const selectedOwners = this.state.selectedOptions.map(data => {
      const idOwner = data.value;
      const dataOwners = {
        walkerId: idWalker,
        userId: data.userId,
        dogOwnerId: idOwner,
        status: 'pending',
        finish: 0,
        walkDate: Moment(this.state.date).format("YYYY-MM-DD HH:mm")
      }
      return (dataOwners)
    })

    API.addSchedule(selectedOwners, idWalker)
      .then(res => {
        this.props.closeModal();
      })
  }

  render() {
    return (
      <div className="walkerrdtPicker">
      <button className="walkerrdtPicker__closeButton" onClick={this.props.closeModal}>Close</button>
        <p className="walkerrdtPicker__title">Schedule a Walk</p>
        <div className="walkerrdtPicker__picker">
        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
          className="class1"
          disableClock={true}
          calendarClassName='class1'
          />
          </div>
        <div className="walkerrdtPicker__select">
          <ReactMultiSelectCheckboxes
            options={this.state.ownerList}
            onChange={this.handleChangeList} />
        </div>
        <button className="walkerrdtPicker__button" onClick={this.handleSchedule}>Schedule</button>
      </div>
    );
  }
}

export default WalkerScheduleWalksWalker;