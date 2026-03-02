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

    if (mode === 'view') {
      if (selectedDates[formatted]) {
        onDayClick(clickedDate);
      }
      return;
    }

    onDayClick(clickedDate);
  };

  return (
    <Calendar
      onClickDay={handleClick}
      tileDisabled={({ date }) => {
        if (mode === 'edit') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date < today;
        }
        return false;
      }}
      tileClassName={({ date }) => {
        const formatted = formatDate(date);

        if (formatted === activeDate) return 'active-day';
        if (selectedDates[formatted]) return 'selected-day';

        return null;
      }}
    />
  );
}
