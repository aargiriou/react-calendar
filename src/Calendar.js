import { useState } from 'react';
import moment from 'moment';
import './Calendar.scss';

import { WEEKDAYS, MONTH_FORMAT, YEAR_FORMAT } from './helpers/constants';
import { getToday, getInitialMonth, getInitialYear } from './helpers/functions';
import CalendarDays from './CalendarDays';
import HeaderAction from './HeaderAction';

export default function Calendar({
  month = getInitialMonth(),
  year = getInitialYear()
}) {
  const initialMonthDate = moment(new Date(year, month - 1, 1));
  const [monthSelected, setMonthSelected] = useState({
    date: initialMonthDate
  });

  console.log(monthSelected.date.toString());
  function handleClickPreviousMonth() {
    setMonthSelected((prevState) => ({
      date: prevState.date.clone().subtract(1, 'month')
    }));
  }

  function handleClickToday() {
    setMonthSelected({ date: moment(getToday()) });
  }

  function handleClickNextMonth() {
    setMonthSelected((prevState) => ({
      date: prevState.date.clone().add(1, 'month')
    }));
  }

  return (
    <article className="calendar">
      <header className="calendar-header">
        <HeaderAction
          title="Previous month"
          iconName="left"
          callback={handleClickPreviousMonth}
          cssClass="action-previous"
        />

        <div className="header-selected-month">
          {monthSelected.date.format('MMMM YYYY')}
        </div>

        <HeaderAction
          title="Today"
          iconName="today"
          callback={handleClickToday}
        />

        <HeaderAction
          title="Next month"
          iconName="right"
          callback={handleClickNextMonth}
          cssClass="action-next"
        />
      </header>

      <section className="day-of-week">
        {WEEKDAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </section>

      <CalendarDays
        month={monthSelected.date.format(MONTH_FORMAT)}
        year={monthSelected.date.format(YEAR_FORMAT)}
      />
    </article>
  );
}
