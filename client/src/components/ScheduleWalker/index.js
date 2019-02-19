import React, { Component } from 'react';
import "../../index.css";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar/dist/fullcalendar.css';
import API from "../../utils/API";
import WalkerScheduleWalksWalker from "../../components/WalkerScheduleWalksWalker";
import Moment from "moment";
import Modal from 'react-modal';
Modal.setAppElement('#root');

const customStyles = {
    content: {
        position: 'relative',
        top: '50%',
        left: '40%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        zIndex: '9999!important',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(17,144,202)',
        opacity: '1'
    }
};

class ScheduleWalker extends Component {
    state = {
        date: new Date(),
        events: [],
        username: this.props.username,
        modalIsOpen: false,
        walkId: 0,
        walkStart: "",
        walkEnd: "",
        walkTitle: "",
        eventModalOpen: false
    };

    openModal = this.openModal.bind(this);
    afterOpenModal = this.afterOpenModal.bind(this);
    closeModal = this.closeModal.bind(this);

    openEventModal = this.openEventModal.bind(this);
    afterOpenEventModal = this.afterOpenEventModal.bind(this);
    closeEventModal = this.closeEventModal.bind(this);

    openModal() {
        this.setState({ modalIsOpen: true });
    };
    // Event click modal - probably unnecessary
    openEventModal() {
        this.setState({ eventModalOpen: true });
    };
    afterOpenModal() {
        // references are now sync'd and can be accessed.

    };
    // Event click modal
    afterOpenEventModal() {

    };

    closeModal() {
        this.setState({ modalIsOpen: false });
    };
    // Event click modal
    closeEventModal() {
        this.setState({ eventModalOpen: false });
    };

    componentDidMount() {
        this.loadMyWalks();
    };

    loadMyWalks() {
        // this.setState({ username: this.props.username });
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
                this.setState({ events: dataFormat });
            })
            .catch(err => console.log(err));
    };

    // Cancel a walk
    cancelWalk(id) {
        API.deleteWalk(id)
            .then(res => {
                // this.loadMyWalks();
            })
            .catch(err => console.log(err));
    };

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

    handleEventClick(event, jsEvent, view) {
        console.log("EventClick", event);
        if (event.end) {
            this.setState({
                walkId: event.id,
                walkTitle: event.title,
                walkStart: Moment(event.start._i, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm"),
                walkEnd: Moment(event.end._i, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm"),
                eventModalOpen: true
            });
        } else {
            this.setState({
                walkId: event.id,
                walkTitle: event.title,
                walkStart: Moment(event.start._i, "YYYY-MM-DD  HH:mm:ss").format("MM/DD/YYYY - HH:mm"),
                walkEnd: "In-Progress",
                eventModalOpen: true
            });
        }
        // console.log("jsEvent", jsEvent);
        // console.log("view", view);
    };

    render() {
        const {
            walkId,
            walkStart,
            walkEnd,
            walkTitle
        } = this.state;

        const customButtons = {
            scheduleButton: {
                text: 'Schedule a Walk',
                click: this.openModal
            }
        }

        return (

            <div id="example-component" className="walkerFullscheduleWrap">
                <Modal
                    isOpen={this.state.eventModalOpen}
                    onAfterOpen={this.afterOpenEventModal}
                    onRequestClose={this.closeEventModal}
                    // className="walkerFullscheduleWrap__eventModal"
                    style={customStyles}
                    contentLabel="Event Modal"
                    aria-labelledby="event-modal"
                >
                    <button className="walkerFullscheduleWrap__eventModal--closeButton" onClick={this.closeEventModal}>X</button>
                    <p className="walkerFullscheduleWrap__eventModal--eventTitle">Walk for {walkTitle}</p>
                    <div className="walkerFullscheduleWrap__eventModal--eventBody">
                        <p className="walkerFullscheduleWrap__eventModal--startTime"> Start Time: {walkStart}</p>
                        <p className="walkerFullscheduleWrap__eventModal--endTime"> End Time: {walkEnd} </p>
                    </div>
                    <div className="walkerFullscheduleWrap__eventModal--footer">
                        <button onClick={this.closeEventModal}>Close</button>
                        <button onClick={this.cancelWalk(walkId)}>Cancel Walk</button>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Schedule Modal"
                    ariaHideApp={false}
                >
                    <button onClick={this.closeModal}>X</button>
                    <WalkerScheduleWalksWalker
                        walkerID={this.props.walkerID}
                        username={this.state.username}
                        loadMyWalks={this.loadMyWalks}
                    />
                </Modal>
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
                            customButtons={customButtons}
                            header={{
                                left: 'prev,next,today scheduleButton',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay,listMonth'
                            }}
                            defaultDate={this.state.date}
                            navLinks={true} // can click day/week names to navigate views
                            editable={true}
                            handleWindowResize={true} // currently does nothing
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