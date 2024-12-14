import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { CalendarOptions, EventChangeArg, EventInput } from '@fullcalendar/core';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EventService } from 'src/Services/event.service';
import Swal from 'sweetalert2';
import { ModalComponent } from 'src/app/components/modal/modal.component';

@Component({
  selector: "app-adminEvents",
  templateUrl: "./adminEvents.component.html",
  styleUrls: ['./tools.component.css']

})
export class AdminEventsComponent implements OnInit {
  currentEvent = signal<EventInput[]>([]);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    // initialEvents :this.currentEvent()  ,
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    droppable:false,
    editable:false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    // eventChange:this.handleEventsChange.bind(this),
    events: () => this.currentEvent(),
    eventsSet: this.handleEvents.bind(this),
  });
  currentYear = new Date().getFullYear();
  currentEvents = signal<EventApi[]>([]);


  get filteredEvents(): EventApi[] {
    return this.currentEvents().filter(event => {
      const eventDate = event.start; // Assure la compatibilité avec EventApi
      return eventDate?.getFullYear() === this.currentYear;
    });
  }  
  constructor(private changeDetector: ChangeDetectorRef,private dialog:MatDialog,private evtService:EventService) {}

  ngOnInit(): void {
     this.loadEvents();
  }
  loadEvents(): void {
    this.evtService.getAllEvents().subscribe((events) => {
      console.log(events)
      const fullCalendarEvents: EventInput[] = events.map((evt) => ({
        id: evt.id,
        title: evt.title,
        start: evt.dateDebut,
        end:evt.dateFin,
        extendedProps: {
          lieu: evt.lieu,
        },
      }));
     this.currentEvent.set(fullCalendarEvents);
     this.changeDetector.detectChanges();
      this.calendarOptions.mutate((options) => {
        options.events = this.currentEvent();
      });
    });
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }
  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event)
    Swal.fire({
      title: "Do you want to edit or delete?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Edit",
      denyButtonText: `Delete`
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleEdit(clickInfo.event.id)
      } else if (result.isDenied) {
        this.handleDelete(clickInfo)
      }
    });
  }

//create new 
  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data = {src:'Calendar',dateDebut:selectInfo.start ,dateFin:selectInfo.start};

    let dialogRef = this.dialog.open(ModalComponent,dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
        const calendarApi = selectInfo.view.calendar;
        calendarApi.unselect();
        this.evtService.add(data).subscribe(()=>{
        if (data.title) {
          calendarApi.addEvent({
            id: this.currentEvents.length.toString(),
            title:data.title,
            start: data.dateDebut,
            end: data.dateFin,
            extendedProps: {
              lieu: data.lieu,
            },          
          });
        } 
      })
    }})
      this.loadEvents()
  }
//delete event 
  handleDelete(clickInfo: EventClickArg) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: "Deleted!",
          text: "Your event has been deleted.",
          icon: "success"
        });
        clickInfo.event.remove();
        this.evtService.delete(clickInfo.event.id).subscribe(()=>{
        this.loadEvents()
       })
      }
    });  
  }
  
  handleEdit(id:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {id};

    let dialogRef = this.dialog.open(ModalComponent,dialogConfig);
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
        this.evtService.edit(id , data).subscribe(()=>{
           this.loadEvents()
          // this.currentEvents.mutate
          this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
        })
      }})
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
