const yearSelect = document.getElementById('year-select');
const monthBoxes = document.getElementById('month-boxes');
const dayPicker = document.getElementById('day-picker');

function renderYearSelect() {
  const currentYear = new Date().getFullYear();

  for (let year = currentYear - 10; year <= currentYear + 10; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  yearSelect.addEventListener('change', function() {
    const selectedYear = parseInt(yearSelect.value);
    renderMonthBoxes(selectedYear);
  });

  yearSelect.value = currentYear;
}

function renderMonthBoxes(selectedYear) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  monthBoxes.innerHTML = '';

  months.forEach((month, index) => {
    const monthBox = document.createElement('div');
    monthBox.classList.add('month-box');
    monthBox.textContent = month;
    monthBox.addEventListener('click', function() {
      showDayPicker(selectedYear, index);
    });
    monthBoxes.appendChild(monthBox);
  });
}

function showDayPicker(year, monthIndex) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const dayPickerContent = document.createElement('div');
  dayPickerContent.classList.add('day-picker-content');

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day;
    dayElement.addEventListener('click', function() {
      const selectedDate = new Date(year, monthIndex, day).toLocaleDateString();
      window.location.href = `todo.html?date=${selectedDate}`;
    });
    dayPickerContent.appendChild(dayElement);
  }

  dayPicker.innerHTML = '';
  dayPicker.appendChild(dayPickerContent);
}

window.addEventListener('load', function() {
  const currentYear = new Date().getFullYear();
  renderYearSelect();
  renderMonthBoxes(currentYear);
});

function updateDateTime() {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  document.getElementById('current-date').textContent = currentDate;
  document.getElementById('current-time').textContent = currentTime;
}

window.addEventListener('load', function() {
  updateDateTime();
  setInterval(updateDateTime, 1000); // Update every second
});

console.log(current-time);
