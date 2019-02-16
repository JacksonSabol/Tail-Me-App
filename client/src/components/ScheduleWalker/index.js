import React, { Component } from 'react';
import "../../index.css";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar/dist/fullcalendar.css';
import API from "../../utils/API";
import WalkerScheduleWalksWalker from "../../components/WalkerScheduleWalksWalker";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        zIndex:'1',
        transform: 'translate(-50%, -50%)'
        
    }
};

/* Modal.setAppElement('ScheduleWalker') */
class ScheduleWalker extends Component {
    state = {
        date: new Date(),
        events: [],
        username: this.props.username,
        modalIsOpen: false,
       
    };

    openModal = this.openModal.bind(this);
    afterOpenModal = this.afterOpenModal.bind(this);
    closeModal = this.closeModal.bind(this);


    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
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
        console.log("EventClick", calEvent);
        console.log("jsEvent", jsEvent);
        console.log("view", view);
  
    };

    render() {

        const myCustomButton = {
            text: 'custom!',
            click: function() {
              alert('clicked the custom button!');
            }
        }
        return (

            <div id="example-component" className="walkerFullscheduleWrap">

                <div className="walkerScheduleWalksContainer">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Schedule Modal"
                        ariaHideApp={false}
                    >

                        {/* <h2 ref={subtitle => this.subtitle = subtitle}>Test</h2> */}
                        <button onClick={this.closeModal}>X</button>
                        <WalkerScheduleWalksWalker
                            walkerID={this.props.walkerID}
                            username={this.state.username}
                            loadMyWalks={this.loadMyWalks}
                        />

                    </Modal>
                    <WalkerScheduleWalksWalker
                        walkerID={this.props.walkerID}
                        username={this.state.username}
                        loadMyWalks={this.loadMyWalks}
                    />
                    <main>
                        <button onClick={this.openModal}>Open Modal</button>
                    </main>
                </div>

                <div className="walkercalenderContainer">
                    <div className="walkerfullCalender" id="example-component">
                        <FullCalendar
                            id="your-custom-ID"
                            customButtons= {
                                myCustomButton
                            }
                            header={{
                                left: 'prev,next, today, myCustomButton ,<a href=text>text</a>' ,
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay,listMonth'
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