import { ChangeDetectorRef, Component, signal, OnInit } from '@angular/core';
import { CalendarOptions, EventChangeArg, EventInput } from '@fullcalendar/core';
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
})
export class EventsComponent implements OnInit {
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
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    droppable:false,
    editable:false,
    
    // eventChange:this.handleEventsChange.bind(this),
    events: () => this.currentEvent(),
    // eventsSet: this.handleEvents.bind(this),
  });
  constructor(private changeDetector: ChangeDetectorRef,
    // private evtService:EventService
  ) {}

  ngOnInit(): void {
    //  this.loadEvents();
  }
  // loadEvents(): void {
  //   this.evtService.getAllEvents().subscribe((events: any[]) => {
  //     const fullCalendarEvents: EventInput[] = events.map((evt) => ({
  //       id: evt.id,
  //       title: evt.title,
  //       start: evt.dateDebut,
  //       end:evt.dateFin,
  //       extendedProps: {
  //         lieu: evt.lieu,
  //       },
  //     }));
  //    this.currentEvent.set(fullCalendarEvents);
  //    this.changeDetector.detectChanges();
  //     this.calendarOptions.mutate((options) => {
  //       options.events = this.currentEvent();
  //     });
  //   });
  // }
}
