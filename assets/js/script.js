/* =========================================================
   Internet Card Agency - Main JS
   Menu + Review Slideshow + WhatsApp Order
   ========================================================= */

// ================= মোবাইল মেনু =================
function toggleMenu(){
  document.querySelector('.menu')?.classList.toggle('active');
}

// ================= Review Slideshow =================
let reviewIndex = 0;

function moveReviews(step){
  const track = document.querySelector('.review-track');
  const items = document.querySelectorAll('.review-item');
  if(!track || !items.length) return;

  const visible = window.innerWidth <= 900 ? 1 : 3;
  const maxIndex = Math.max(0, items.length - visible);

  reviewIndex += step;
  if(reviewIndex < 0) reviewIndex = maxIndex;
  if(reviewIndex > maxIndex) reviewIndex = 0;

  const itemWidth = items[0].offsetWidth + 18;
  track.style.transform = `translateX(-${reviewIndex * itemWidth}px)`;
}

setInterval(()=>moveReviews(1), 3500);
window.addEventListener('resize', ()=>{ reviewIndex = 0; moveReviews(0); });

// ================= Package Price Data =================
const prices = {
  "৩ কার্ড": "১৬৫০ টাকা",
  "৫ কার্ড": "২৫৫০ টাকা",
  "১০ কার্ড": "৩৫০০ টাকা",
  "১০ কার্ড - বিশেষ অফার": "৩১৫০ টাকা",
  "২০ কার্ড": "৬৫০০ টাকা",
  "৪০ কার্ড": "১০৫০০ টাকা",
  "৫০ কার্ড": "১২৫০০ টাকা"
};

// ================= Order Page: URL country auto select =================
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const countryFromUrl = params.get('country');
  const countrySelect = document.getElementById('country');

  if(countryFromUrl && countrySelect){
    countrySelect.value = countryFromUrl;
  }

  updatePrice();
});

// ================= Order Page: Price Preview =================
function updatePrice(){
  const pkg = document.getElementById('package')?.value;
  const preview = document.getElementById('pricePreview');

  if(preview){
    preview.innerText = pkg && prices[pkg]
      ? `মোট মূল্য: ${prices[pkg]}`
      : 'প্যাকেজ নির্বাচন করলে মূল্য দেখাবে';
  }
}

// ================= Order Submit to WhatsApp =================
function submitOrder(e){
  e.preventDefault();

  const country = document.getElementById('country').value;
  const pkg = document.getElementById('package').value;
  const last4 = document.getElementById('last4').value.trim();
  const name = document.getElementById('customerName').value.trim();

  if(!country || !pkg || !last4){
    alert('দেশ, প্যাকেজ এবং শেষ ৪ ডিজিট পূরণ করুন।');
    return;
  }

  if(!/^[0-9]{4}$/.test(last4)){
    alert('শেষ ৪ ডিজিট শুধু ৪টি সংখ্যা হতে হবে।');
    return;
  }

  const price = prices[pkg] || 'N/A';

  const message =
`আসসালামু আলাইকুম,
আমি Internet Card Agency থেকে স্ক্র্যাচ কার্ড অর্ডার করতে চাই।

নাম: ${name || 'উল্লেখ করা হয়নি'}
দেশ: ${country}
প্যাকেজ: ${pkg}
মূল্য: ${price}
WhatsApp নম্বরের শেষ ৪ ডিজিট: ${last4}

অনুগ্রহ করে আমার অর্ডারটি কনফার্ম করুন।`;

  const whatsappNumber = "8801540001811";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}
