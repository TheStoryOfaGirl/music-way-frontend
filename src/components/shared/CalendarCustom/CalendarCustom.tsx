import Calendar, { CalendarProps } from "react-calendar";
import "./CalendarCustom.css";
import ChevronRight from "@assets/icons/chevron-right.svg?react";
import ChevronLeft from "@assets/icons/chevron-left.svg?react";

export const CalendarCustom = (props: CalendarProps) => {
  return (
    <Calendar
      prevLabel={<ChevronLeft />}
      nextLabel={<ChevronRight />}
      selectRange={true}
      next2Label={null}
      prev2Label={null}
      minDetail="month"
      navigationLabel={({ date }) => (
        <span className="unclickable-month">
          {date.toLocaleString("ru-RU", { month: "long" })[0].toUpperCase() +
            date.toLocaleString("ru-RU", { month: "long" }).slice(1)}
        </span>
      )}
      {...props}
    />
  );
};
