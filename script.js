// Language Toggle
let currentLang = 'en';

function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'hi' : 'en';
  document.getElementById('langText').textContent = currentLang === 'en' ? 'हिंदी' : 'English';
  
  // Update all elements with data attributes
  const elements = document.querySelectorAll('[data-en][data-hi]');
  elements.forEach(element => {
    element.textContent = element.getAttribute(`data-${currentLang}`);
  });
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (navMenu.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Package Modal
const packageImages = [
  'images/package1.jpeg',
  'images/package2.jpeg',
  'images/package3.jpeg'
];

function openPackageModal(index) {
  const modal = document.getElementById('packageModal');
  const modalImage = document.getElementById('modalImage');
  modalImage.src = packageImages[index];
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closePackageModal() {
  const modal = document.getElementById('packageModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('packageModal');
  if (event.target == modal) {
    closePackageModal();
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closePackageModal();
  }
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.service-card, .facility-card, .info-card, .package-card, .contact-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Interactive Map with Directions
const clinicLocation = {
  lat: 26.7833,
  lng: 79.0167,
  address: "Dr. Navneet Agarwal (Consultant Neurologist), UDAY HEALTH CARE, Papa complex, Infront of 3rd gate of 28, BN PAC, Kunaira, Etawah, Uttar Pradesh 206002"
};

function initMap() {
  const mapElement = document.getElementById('map');
  const mapLoading = document.getElementById('mapLoading');
  
  if (!mapElement) return;
  
  // Try to get user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        // Create iframe with directions
        const directionsUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&origin=${userLat},${userLng}&destination=${clinicLocation.lat},${clinicLocation.lng}&mode=driving`;
        
        mapElement.innerHTML = `<iframe src="${directionsUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
        
        if (mapLoading) {
          mapLoading.style.display = 'none';
        }
      },
      (error) => {
        // If location access denied, show static map
        showStaticMap();
      }
    );
  } else {
    // Browser doesn't support geolocation
    showStaticMap();
  }
}

function showStaticMap() {
  const mapElement = document.getElementById('map');
  const mapLoading = document.getElementById('mapLoading');
  
  // Show static map centered on clinic
  const staticMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.8!2d${clinicLocation.lng}!3d${clinicLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDQ2JzU5LjkiTiA3OcKwMDEnMDAuMSJF!5e0!3m2!1sen!2sin!4v1234567890`;
  
  mapElement.innerHTML = `<iframe src="${staticMapUrl}" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
  
  if (mapLoading) {
    mapLoading.style.display = 'none';
  }
}

function getDirections() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        // Open Google Maps with directions
        const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${clinicLocation.lat},${clinicLocation.lng}`;
        window.open(directionsUrl, '_blank');
      },
      (error) => {
        // If location access denied, open Google Maps with destination only
        openInGoogleMaps();
      }
    );
  } else {
    openInGoogleMaps();
  }
}

function openInGoogleMaps() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${clinicLocation.lat},${clinicLocation.lng}`;
  window.open(mapsUrl, '_blank');
}

// Reviews Carousel
let currentReviewIndex = 0;
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewCards = document.querySelectorAll('.review-card');
let reviewsPerView = 3;

function updateReviewsPerView() {
  if (window.innerWidth <= 768) {
    reviewsPerView = 1;
  } else if (window.innerWidth <= 1200) {
    reviewsPerView = 2;
  } else {
    reviewsPerView = 3;
  }
}

function moveReviews(direction) {
  if (!reviewsTrack || reviewCards.length === 0) return;
  
  updateReviewsPerView();
  const maxIndex = Math.max(0, reviewCards.length - reviewsPerView);
  
  currentReviewIndex += direction;
  
  if (currentReviewIndex < 0) {
    currentReviewIndex = maxIndex;
  } else if (currentReviewIndex > maxIndex) {
    currentReviewIndex = 0;
  }
  
  updateReviewsPosition();
}

function updateReviewsPosition() {
  if (!reviewsTrack || reviewCards.length === 0) return;
  
  const cardWidth = reviewCards[0].offsetWidth;
  const gap = 30;
  const offset = -(currentReviewIndex * (cardWidth + gap));
  reviewsTrack.style.transform = `translateX(${offset}px)`;
}

// Auto-play reviews
let reviewsAutoPlay;

function startReviewsAutoPlay() {
  reviewsAutoPlay = setInterval(() => {
    moveReviews(1);
  }, 6000);
}

function stopReviewsAutoPlay() {
  clearInterval(reviewsAutoPlay);
}

// Pause autoplay on hover
if (reviewsTrack) {
  reviewsTrack.addEventListener('mouseenter', stopReviewsAutoPlay);
  reviewsTrack.addEventListener('mouseleave', startReviewsAutoPlay);
}

// Gallery Carousel
let currentGalleryIndex = 0;
const galleryTrack = document.getElementById('galleryTrack');
const galleryItems = document.querySelectorAll('.gallery-item');
let itemsPerView = 3;

function updateItemsPerView() {
  if (window.innerWidth <= 768) {
    itemsPerView = 1;
  } else if (window.innerWidth <= 1200) {
    itemsPerView = 2;
  } else {
    itemsPerView = 3;
  }
}

function moveGallery(direction) {
  updateItemsPerView();
  const maxIndex = Math.max(0, galleryItems.length - itemsPerView);
  
  currentGalleryIndex += direction;
  
  if (currentGalleryIndex < 0) {
    currentGalleryIndex = maxIndex;
  } else if (currentGalleryIndex > maxIndex) {
    currentGalleryIndex = 0;
  }
  
  updateGalleryPosition();
  updateGalleryIndicators();
}

function updateGalleryPosition() {
  const itemWidth = galleryItems[0].offsetWidth;
  const gap = 20;
  const offset = -(currentGalleryIndex * (itemWidth + gap));
  galleryTrack.style.transform = `translateX(${offset}px)`;
}

function createGalleryIndicators() {
  updateItemsPerView();
  const indicatorsContainer = document.getElementById('galleryIndicators');
  indicatorsContainer.innerHTML = '';
  
  const totalPages = Math.ceil(galleryItems.length / itemsPerView);
  
  for (let i = 0; i < totalPages; i++) {
    const indicator = document.createElement('div');
    indicator.className = 'gallery-indicator';
    if (i === 0) indicator.classList.add('active');
    indicator.onclick = () => goToGalleryPage(i);
    indicatorsContainer.appendChild(indicator);
  }
}

function goToGalleryPage(pageIndex) {
  currentGalleryIndex = pageIndex;
  updateGalleryPosition();
  updateGalleryIndicators();
}

function updateGalleryIndicators() {
  const indicators = document.querySelectorAll('.gallery-indicator');
  const currentPage = Math.floor(currentGalleryIndex / itemsPerView);
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentPage);
  });
}

// Auto-play gallery
let galleryAutoPlay;

function startGalleryAutoPlay() {
  galleryAutoPlay = setInterval(() => {
    moveGallery(1);
  }, 5000);
}

function stopGalleryAutoPlay() {
  clearInterval(galleryAutoPlay);
}

// Pause autoplay on hover
if (galleryTrack) {
  galleryTrack.addEventListener('mouseenter', stopGalleryAutoPlay);
  galleryTrack.addEventListener('mouseleave', startGalleryAutoPlay);
}

// Full Gallery Modal
function openFullGallery() {
  const modal = document.getElementById('fullGalleryModal');
  const grid = document.getElementById('galleryGrid');
  
  // Clone all gallery items to the grid
  grid.innerHTML = '';
  galleryItems.forEach((item, index) => {
    const clone = item.cloneNode(true);
    clone.onclick = () => openMediaViewer(index);
    grid.appendChild(clone);
  });
  
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  stopGalleryAutoPlay();
}

function closeFullGallery() {
  const modal = document.getElementById('fullGalleryModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  startGalleryAutoPlay();
}

// Media Viewer Modal
let currentMediaIndex = 0;

function openMediaViewer(index) {
  currentMediaIndex = index;
  const modal = document.getElementById('mediaViewerModal');
  updateMediaViewer();
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeMediaViewer() {
  const modal = document.getElementById('mediaViewerModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  // Pause any playing videos
  const videos = modal.querySelectorAll('video');
  videos.forEach(video => video.pause());
}

function navigateMedia(direction) {
  currentMediaIndex += direction;
  
  if (currentMediaIndex < 0) {
    currentMediaIndex = galleryItems.length - 1;
  } else if (currentMediaIndex >= galleryItems.length) {
    currentMediaIndex = 0;
  }
  
  updateMediaViewer();
}

function updateMediaViewer() {
  const content = document.getElementById('mediaViewerContent');
  const caption = document.getElementById('mediaViewerCaption');
  const item = galleryItems[currentMediaIndex];
  
  // Clear previous content
  content.innerHTML = '';
  
  // Get media element
  const mediaElement = item.querySelector('.gallery-media img, .gallery-media video');
  const captionElement = item.querySelector('.gallery-caption');
  
  if (mediaElement) {
    const clone = mediaElement.cloneNode(true);
    if (clone.tagName === 'VIDEO') {
      clone.controls = true;
      clone.autoplay = false;
    }
    content.appendChild(clone);
  }
  
  // Update caption
  if (captionElement) {
    caption.innerHTML = captionElement.innerHTML;
  }
}

// Keyboard navigation for media viewer
document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('mediaViewerModal');
  if (modal.style.display === 'block') {
    if (e.key === 'ArrowLeft') {
      navigateMedia(-1);
    } else if (e.key === 'ArrowRight') {
      navigateMedia(1);
    } else if (e.key === 'Escape') {
      closeMediaViewer();
    }
  }
  
  const fullGalleryModal = document.getElementById('fullGalleryModal');
  if (fullGalleryModal.style.display === 'block' && e.key === 'Escape') {
    closeFullGallery();
  }
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
  const fullGalleryModal = document.getElementById('fullGalleryModal');
  const mediaViewerModal = document.getElementById('mediaViewerModal');
  
  if (event.target === fullGalleryModal) {
    closeFullGallery();
  }
  
  if (event.target === mediaViewerModal) {
    closeMediaViewer();
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  updateItemsPerView();
  updateGalleryPosition();
  createGalleryIndicators();
});

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize map
  initMap();
  
  // Initialize gallery
  if (galleryTrack) {
    createGalleryIndicators();
    startGalleryAutoPlay();
  }
  
  // Initialize reviews carousel
  if (reviewsTrack) {
    startReviewsAutoPlay();
  }
  
  const animatedElements = document.querySelectorAll('.service-card, .facility-card, .info-card, .package-card, .contact-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  updateItemsPerView();
  updateGalleryPosition();
  createGalleryIndicators();
  updateReviewsPerView();
  updateReviewsPosition();
});

// Sticky Header Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = 'var(--primary-blue)';
    }
  });
});

// Loading Animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});
