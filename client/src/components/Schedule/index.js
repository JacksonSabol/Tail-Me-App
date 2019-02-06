import React from "react";
import "../../index.css";
import Moment from "moment";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar/dist/fullcalendar.css';
import API from "../../utils/API";
class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [


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