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
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
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
        walkerId: this.props.walkerID,
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
        this.loadMyWalks(this.state.walkerId);
        this.setState({ modalIsOpen: false });
    };
    // Event click modal
    closeEventModal() {
        this.setState({ eventModalOpen: false });
    };

    componentDidMount() {
        this.loadMyWalks(this.state.walkerId);
    };

    loadMyWalks(id) {
        API.getMyWalks(id)
            .then(res => {
                const dataFormat = res.data.map(data => {
                    const dataFormatted = {
                        start: data.walkDate,
                        end: data.checkOutTime,
                        title: data.dogOwner.dogName,
                        id: data.id
                    }
                    return (dataFormatted)
                });
                this.setState({ events: dataFormat });
            })
            .catch(err => console.log(err));
    };

    // Cancel a walk
    cancelWalk(id) {
        API.deleteWalk(id)
            .then(res => {
                this.closeEventModal();
                this.loadMyWalks(this.state.walkerId);
            })
            .catch(err => console.log(err));
    };

    handleDropEvent(event) {
        const data = {
            walkDate: event.start
        }
        API.updateWalk(event.id, data)
            .then(res => {

            })
            .catch(err => console.log(err));
    }

    handleEventClick(event, jsEvent, view) {
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

            <div className="walkerFullscheduleWrap">
                <div className="walkerFullscheduleWrap__modals" style={{ zIndex: '2' }}>
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
                            <button onClick={this.cancelWalk.bind(this, walkId)}>Cancel Walk</button>
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
                            walkerID={this.state.walkerId}
                            username={this.state.username}
                            loadMyWalks={this.loadMyWalks}
                            closeModal={this.closeModal}
                        />
                    </Modal>
                </div>
                {/* <div className="walkerScheduleWalksContainer">
                    <WalkerScheduleWalksWalker
                        walkerID={this.state.walkerId}
                        username={this.state.username}
                        loadMyWalks={this.loadMyWalks}
                    />
                </div> */}

                <div className="walkercalenderContainer">
                    <div className="walkerfullCalender">
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