const calcAgeBtn = document.getElementById("calc-age-btn");

const ageCalculate = () => {
  const today = new Date();
  const inputDate = new Date(document.getElementById("date-input").value);

  const birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth(),
    year: inputDate.getFullYear(),
  };

  const currentDate = {
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  };

  const { years, months, days } = calculateAge(birthDetails, currentDate);
  if (isFutureDate(years, months, days)) {
    alert("Not Born Yet");
    displayResult("-", "-", "-");
  } else {
    displayResult(years, months, days)
  }
};

const isFutureDate = (years, months, days) => {
  return days < 0 || months < 0 || years < 0;
};

const calculateAge = (birthDetails, currentDate) => {
  let years = currentDate.year - birthDetails.year;
  let months, days;

  if (currentDate.month < birthDetails.month) {
    years--;
    months = 12 - (birthDetails.month - currentDate.month);
  } else {
    months = currentDate.month - birthDetails.month;
  }

  if (currentDate.date < birthDetails.date) {
    months--;
    const lastMonth = currentDate.month === 1 ? 12 : currentDate.month - 1;
    const daysInLastMonth = getDaysInMonth(lastMonth, currentDate.year);
    days = daysInLastMonth - (birthDetails.date - currentDate.date);
  } else {
    days = currentDate.date - birthDetails.date;
  }

  return { years, months, days };
};

const getDaysInMonth = (month, year) => {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
  const getDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  return getDaysInMonth[month - 1];
};

const displayResult = (year, month, days) => {
    document.getElementById('years').textContent = year;
    document.getElementById('months').textContent = month;
    document.getElementById('days').textContent = days;
};

calcAgeBtn.addEventListener("click", ageCalculate);
