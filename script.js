
// main.js - shared frontend behaviors
document.addEventListener('DOMContentLoaded', ()=>{

  // open image lightbox
  window.openImage = function(src){
    const img = document.getElementById('modalImage');
    img.src = src;
    const myModal = new bootstrap.Modal(document.getElementById('imageModal'));
    myModal.show();
  }

  // Calendar popup for home
  window.openCalendar = function(){
    const calModal = new bootstrap.Modal(document.getElementById('calendarModal'));
    calModal.show();
  }

  window.openLiveAarti = function(){
    // Customize: open your live url or page
    // example: window.location.href = 'https://youtube.com/live/yourlink';
    alert('Opening Live Aarti... (set live URL in main.js)');
  }

  window.confirmBookingFromHome = function(){
    const date = document.getElementById('aartiDate').value;
    if(!date){ alert('Please select a date'); return; }
    // Save to localStorage for demo; replace with API call to backend later
    const bookings = JSON.parse(localStorage.getItem('tapi_bookings')||'[]');
    bookings.push({name:'Guest', phone:'', email:'', date: date, slot:'Evening - 6:30 PM', notes:''});
    localStorage.setItem('tapi_bookings', JSON.stringify(bookings));
    alert('Booking requested for ' + date + '. Trustees will confirm.');
    const calModalEl = document.getElementById('calendarModal');
    const calModal = bootstrap.Modal.getInstance(calModalEl) || new bootstrap.Modal(calModalEl);
    calModal.hide();
  }

const bookForm = document.getElementById('book-form');

if (bookForm) {
  bookForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      date: document.getElementById('date').value,
      slot: document.getElementById('slot').value,
      notes: document.getElementById('notes').value
    };

    // Save booking locally (temporary / demo)
    const bookings = JSON.parse(localStorage.getItem('tapi_bookings') || '[]');
    bookings.push(data);
    localStorage.setItem('tapi_bookings', JSON.stringify(bookings));

    // Redirect to Razorpay payment page
    window.location.href =
      "https://pages.razorpay.com/pl_Pi3eU6S91Mxclb/view";
  });
}


  // Donate simulation
  const donateForm = document.getElementById('donate-form');
  if(donateForm){
    donateForm.addEventListener('submit', function(e){
      e.preventDefault();
      alert('Thank you! Donation simulated. Integrate payment gateway for real payments.');
      donateForm.reset();
    });
  }

});
// When user clicks BOOK button → open date picker
document.getElementById("bookBtn").addEventListener("click", function () {
    document.getElementById("calendarPopup").showPicker();
});
