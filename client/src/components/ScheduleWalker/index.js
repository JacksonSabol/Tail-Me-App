import React, { Component } from 'react';
import "../../index.css";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar/dist/fullcalendar.css';
import API from "../../utils/API";
import WalkerScheduleWalksWalker from "../../components/WalkerScheduleWalksWalker";

class ScheduleWalker extends Component {
    state = {
        date: new Date(),
        events: [],
        username: this.props.username
    };

    componentDidMount() {
        this.loadMyWalks();
    };

    loadMyWalks = () => {
        this.setState({ username: this.props.username });
        const idWalker = this.props.walkerID
        API.getMyWalks(idWalker)
            .then(res => {
                const dataFormat = res.data.map(data => {
                    console.log("checkin", data.checkInTime)
                    const dataFormatted = {
                        start: data.walkDate,
                        end: data.checkOutTime,
                        title: data.dogOwner.dogName,
                        id: data.id
                    }
                    return (dataFormatted)
                });
                console.log("Data Format", dataFormat)
                this.setState({ events: dataFormat })
            })
            .catch(err => console.log(err));
    }

    handleDropEvent(event) {
        console.log(event.id)
        console.log(event.start)
        const data = {
            walkDate: event.start
        }
        API.updateWalk(event.id, data)
            .then(res => {

            })
            .catch(err => console.log(err));
    }

    handleEventClick(calEvent, jsEvent, view) {
        console.log(calEvent);
        // console.log(jsEvent);
        // console.log(view);
    };

    render() {
        return (

            <div id="example-component" className="walkerFullscheduleWrap">

                <div className="walkerScheduleWalksContainer">
                
                    <WalkerScheduleWalksWalker
                        walkerID={this.props.walkerID}
                        username={this.state.username}
                        loadMyWalks={this.loadMyWalks}
                    />
                </div>

                <div className="walkercalenderContainer">
                    <div className="walkerfullCalender" id="example-component">
                        <FullCalendar
                            id="your-custom-ID"
                            header={{
                                left: 'prev,next today myCustomButton',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            }}
                            defaultDate={this.state.date}
                            navLinks={true} // can click day/week names to navigate views
                            editable={true}
                            eventLimit={true} // allow "more" link when too many events
                            events={this.state.events}
                            // select={this.handleSelection.bind(this)}
                            eventDrop={this.handleDropEvent.bind(this)}
                            eventClick={this.handleEventClick.bind(this)}
                            selectable={true}
                            selectHelper={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ScheduleWalker;