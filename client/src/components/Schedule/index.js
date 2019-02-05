import React from "react";
import "../../index.css";
import Moment from "moment";
import FullCalendar from 'fullcalendar-reactwrapper';
//import 'fullcalendar/dist/fullcalendar.css';
//import 'fullcalendar/dist/fullcalendar.print.min.css';
//import 'fullcalendar/dist/fullcalendar.js';
//import 'fullcalendar-scheduler/dist/scheduler.min.css';
import 'fullcalendar/dist/fullcalendar.css';
import API from "../../utils/API";
class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [

/*                 {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2017-05-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2017-05-11',
                    end: '2017-05-13'
                },
                {
                    title: 'Meeting',
                    start: '2017-05-12T10:30:00',
                    end: '2017-05-12T12:30:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2017-05-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2017-05-28'
                } */
            ],
        };
    }
    componentDidMount() {
        this.loadMyWalks();
    };
    loadMyWalks = () => {

        API.getMyWalks(1)
          .then(res => {
    
            const dataFormat = res.data.map(data => {
    
        
              
            console.log("checkin",data.checkInTime)
              const dataFormatted = {
                start: data.walkDate,
                end: data.checkOutTime,
                title: data.dogOwner.dogName,
                id:data.id
              }
    
    
              return (dataFormatted)
            });
            console.log("Data Format", dataFormat)
    
            this.setState({ events: dataFormat })
          })
    
          .catch(err => console.log(err));
        }
      handleSelection(event) {
        alert('Event: ');
        alert('Coordinates: ');
        alert('View: ');
    }
    handleDropEvent(event) {
        console.log(event.id)
        console.log(event.start)
        const data = {
            walkDate:event.start
        }

        API.updateWalk(event.id,data)
        .then(res => {
  
          
        })
  
        .catch(err => console.log(err));
      
       
    }
    handleEventClick(event) {
        alert('Event: ');
        alert('Coordinates: ');
        alert('View: ');
    }
  render() {
    return (
        <div id="example-component">
            <FullCalendar
                id="your-custom-ID"
                header={{
                    left: 'prev,next today myCustomButton',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                }}
                defaultDate={'2019-02-03'}
                navLinks={true} // can click day/week names to navigate views
                editable={true}
                eventLimit={true} // allow "more" link when too many events
                events={this.state.events}
               select={ this.handleSelection.bind(this)}
               eventDrop={this.handleDropEvent.bind(this)}
               eventClick={ this.handleEventClick.bind(this)}
                selectable= {true}
                selectHelper= {true}
            />
        </div>
    );
}
}


export default Schedule;