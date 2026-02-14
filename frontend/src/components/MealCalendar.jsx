import Calendar from 'react-calendar';

export default function MealCalendar({
  mode = 'edit',
  selectedDates,
  activeDate,
  onDayClick,
  formatDate
}) {
  const handleClick = (clickedDate) => {
    const formatted = formatDate(clickedDate);

    // view -> select only highlighted days (selected by meal train creator) to see meals
    if (mode === 'view') {
      if (selectedDates[formatted]) {
        onDayClick(clickedDate);
      }
      return;
    }

    // edit
    onDayClick(clickedDate);
  };

  return (
    <Calendar
      onClickDay={handleClick}
      tileClassName={({ date }) => {
        const formatted = formatDate(date);

        if (formatted === activeDate) return 'active-day';
        if (selectedDates[formatted]) return 'selected-day';

        return null;
      }}
    />
  );
}
