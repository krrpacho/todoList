import React from 'react';
import './Calendar.css';

const Calendar = ({ translations }) => {

  const daysOfWeek = [
    translations.monday, translations.tuesday, translations.wednesday,
    translations.thursday, translations.friday, translations.saturday, translations.sunday
  ];

  const today = new Date();
  const todayDate = today.getDate();
  const todayDay = today.getDay(); 

  const adjustedTodayDay = todayDay === 0 ? 7 : todayDay;

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="calendar">
      <div className="calendar-header">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="calendar-header-day">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-body">
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`calendar-day ${day === todayDate ? 'today' : ''}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
