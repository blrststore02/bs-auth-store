"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";

export const BSDatePicker = (props: {dateSelected: Function}) => {
  const longPressDelay = 1;
  const selectConstraint = {
    start: '00:01', 
    end: '23:59', 
  }

  const selectInfo = (selectInfo: any) => {
    return (selectInfo.end.getTime() / 1000 - selectInfo.start.getTime() / 1000 <= 86400);
  }

  const dateSelected = (selectedDate: any) => {
    console.log(selectedDate.startStr);
    const date = moment(selectedDate!.startStr).format('YYYY-MM-DD');
    props.dateSelected(date || "");
  }

  return (
    <div className="flex items-center w-full py-2 px-12 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
      <div className="mx-auto w-full p-6 shadow-md bg-[#F8F8FF] border-t-2 border-sky-500 flex-grow mt-1 max-w-screen-sm text-center">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            interactionPlugin
          ]}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: "next"
          }}
          aspectRatio={1.27}
          initialView='dayGridMonth'
          nowIndicator={true}
          longPressDelay={longPressDelay}
          editable={true}
          selectable={true}
          selectMirror={true}
          selectAllow={selectInfo}
          selectConstraint={selectConstraint}
          select={dateSelected}
        />
      </div>
    </div>
  )
}