var lastScrollTop = 0;
navbar = document.getElementById("navbar");
window.addEventListener("scroll", function(){
    var scrollTop = window.pageYOffset || document
    .documentElement.scrollTop;
    if(scrollTop > lastScrollTop){
        navbar.style.top = "-100px";
    } else{
        navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
})


let isDown = false;
let startX, scrollLeft;

// Select all .flex-card-berita-lainnya elements
const sliders = document.querySelectorAll('.flex-card-berita-lainnya');

sliders.forEach((slider) => {
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
});



const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                      "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDate = null;

  document.getElementById('prev').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  document.getElementById('next').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  function renderCalendar() {
    const monthYear = document.getElementById('monthYear');
    const calendarDays = document.getElementById('calendarDays');
    const firstDay = new Date(currentYear, currentMonth).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    monthYear.innerText = `${monthNames[currentMonth]} ${currentYear}`;
    calendarDays.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
      calendarDays.innerHTML += `<div></div>`;
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = selectedDate && selectedDate.getDate() === i &&
                         selectedDate.getMonth() === currentMonth &&
                         selectedDate.getFullYear() === currentYear;
      calendarDays.innerHTML += `<div class="${isSelected ? 'selected' : ''}" onclick="selectDate(${i})">${i}</div>`;
    }
  }

  function selectDate(day) {
    selectedDate = new Date(currentYear, currentMonth, day);
    const dayName = dayNames[selectedDate.getDay()];
    document.getElementById('selectedDate').innerText = `Tanggal Penjemputan: ${dayName}, ${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
    renderCalendar();
  }

  renderCalendar();