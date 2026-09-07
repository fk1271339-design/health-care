/* ============================================================
   MERIDIAN CLINIC — INTERACTIVE APPLICATION LOGIC
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     0. INITIAL SEED BOOKINGS & THEME SWITCHER
     ------------------------------------------------------------ */
  const seedBookings = [
    {
      bookingId: 'MER-2026-8941',
      fullName: 'Rajesh Kumar',
      phone: '+91 98100 45210',
      email: 'rajesh.kumar@gmail.com',
      department: 'Cardiology',
      doctor: 'Dr. Aanya Kapoor',
      appointmentDate: '2026-09-08',
      timeSlot: '10:00 AM - 10:30 AM',
      status: 'Pending',
      createdAt: '04 Sep 2026'
    },
    {
      bookingId: 'MER-2026-7230',
      fullName: 'Priya Sharma',
      phone: '+91 98711 34982',
      email: 'priya.sharma@yahoo.com',
      department: 'Dermatology',
      doctor: 'Dr. Rohan Mehta',
      appointmentDate: '2026-09-06',
      timeSlot: '02:00 PM - 02:30 PM',
      status: 'Confirmed',
      createdAt: '03 Sep 2026'
    },
    {
      bookingId: 'MER-2026-5541',
      fullName: 'Amit Patel',
      phone: '+91 99102 88319',
      email: 'amit.patel@outlook.com',
      department: 'General Medicine',
      doctor: 'Dr. Arjun Verma',
      appointmentDate: '2026-09-05',
      timeSlot: '11:30 AM - 12:00 PM',
      status: 'Pending',
      createdAt: '04 Sep 2026'
    },
    {
      bookingId: 'MER-2026-4190',
      fullName: 'Sunita Aggarwal',
      phone: '+91 98112 00192',
      email: 'sunita.aggarwal@gmail.com',
      department: "Women's Health",
      doctor: 'Dr. Neha Bhatia',
      appointmentDate: '2026-09-07',
      timeSlot: '04:00 PM - 04:30 PM',
      status: 'Confirmed',
      createdAt: '02 Sep 2026'
    },
    {
      bookingId: 'MER-2026-3012',
      fullName: 'Vikram Singh',
      phone: '+91 97109 44321',
      email: 'vikram.singh@hotmail.com',
      department: 'Dental Care',
      doctor: 'Dr. Kabir Anand',
      appointmentDate: '2026-09-04',
      timeSlot: '05:00 PM - 05:30 PM',
      status: 'Completed',
      createdAt: '01 Sep 2026'
    }
  ];

  if (!localStorage.getItem('meridian_bookings')) {
    localStorage.setItem('meridian_bookings', JSON.stringify(seedBookings));
  }

  // Theme Switcher Init
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('meridian_theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('meridian_theme', 'dark');
        showToast('Theme Switch', 'Switched to Midnight Emerald Theme', 'info');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('meridian_theme', 'light');
        showToast('Theme Switch', 'Switched to Clinical Sage Theme', 'info');
      }
    });
  }

  /* ------------------------------------------------------------
     1. DOCTOR DATA STORE
     ------------------------------------------------------------ */
  const doctorsData = {
    'aanya-kapoor': {
      name: 'Dr. Aanya Kapoor',
      title: 'Senior Cardiologist & Medical Director',
      specialty: 'Cardiology',
      degrees: 'MD, DM Cardiology (AIIMS New Delhi), FACC',
      experience: '15+ Years',
      days: 'Monday – Friday (09:00 AM - 03:00 PM)',
      photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=600&auto=format&fit=crop',
      bio: 'Dr. Aanya Kapoor is a renowned interventional cardiologist specializing in preventive cardiovascular care, hypertension management, echocardiography, and non-invasive cardiac evaluation. She completed her advanced training at AIIMS and has treated over 8,000 patients across India.',
      services: ['Echocardiogram', 'Holter Monitoring', 'Cardiac Risk Assessment', 'Hypertension Management', 'Coronary Angiography Guidance']
    },
    'rohan-mehta': {
      name: 'Dr. Rohan Mehta',
      title: 'Consultant Dermatologist & Dermatosurgeon',
      specialty: 'Dermatology',
      degrees: 'MD Dermatology, Venereology & Leprosy (MAMC)',
      experience: '10+ Years',
      days: 'Tuesday – Saturday (10:00 AM - 05:00 PM)',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop',
      bio: 'Dr. Rohan Mehta is an expert in clinical dermatology, laser aesthetics, and pediatric skin care. Known for evidence-based treatments, he emphasizes holistic skin health, acne therapeutics, and anti-aging care without unnecessary procedures.',
      services: ['Acne & Scar Management', 'Laser Skin Resurfacing', 'Allergy & Eczema Care', 'Hair Loss Therapy (PRP)', 'Cosmetic Dermatology']
    },
    'simran-chadha': {
      name: 'Dr. Simran Chadha',
      title: 'Lead Pediatrician & Neonatologist',
      specialty: 'Pediatrics',
      degrees: 'MD Pediatrics, DCH, Fellowship in Neonatology',
      experience: '12+ Years',
      days: 'Monday – Saturday (09:00 AM - 04:00 PM)',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=600&auto=format&fit=crop',
      bio: 'Dr. Simran Chadha provides warm, empathetic care for newborns, children, and young adults. She focuses on pediatric growth monitoring, immunizations, childhood nutrition, and acute pediatric illness management.',
      services: ['Newborn Screening', 'Pediatric Vaccination', 'Growth & Milestone Tracking', 'Childhood Asthma Management', 'Nutritional Counseling']
    },
    'arjun-verma': {
      name: 'Dr. Arjun Verma',
      title: 'Internal Medicine Specialist & Physician',
      specialty: 'General Medicine',
      degrees: 'MBBS, MD Internal Medicine (Delhi University)',
      experience: '18+ Years',
      days: 'Monday – Friday (08:30 AM - 02:30 PM)',
      photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
      bio: 'Dr. Arjun Verma brings nearly two decades of clinical experience in managing chronic adult diseases, diabetes, thyroid disorders, and complex multi-system fever diagnostics with a thorough bedside manner.',
      services: ['Executive Health Screening', 'Diabetes Management', 'Thyroid & Endocrine Care', 'Geriatric Health', 'Infectious Disease Care']
    },
    'neha-bhatia': {
      name: 'Dr. Neha Bhatia',
      title: 'Gynecologist, Obstetrician & Laparoscopic Surgeon',
      specialty: "Women's Health",
      degrees: 'MD, DNB (Obstetrics & Gynecology), FICOG',
      experience: '14+ Years',
      days: 'Monday – Friday (10:00 AM - 04:30 PM)',
      photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=600&auto=format&fit=crop',
      bio: 'Dr. Neha Bhatia is a compassionate specialist in women’s wellness, high-risk pregnancy management, PCOS/PCOD care, adolescent gynecology, and minimally invasive laparoscopic procedures.',
      services: ['Prenatal & Postnatal Care', 'PCOS & Hormonal Care', 'High-Risk Pregnancy', 'Pap Smear & Cervical Screening', 'Menopause Counseling']
    },
    'kabir-anand': {
      name: 'Dr. Kabir Anand',
      title: 'Prosthodontist & Implantologist',
      specialty: 'Dental Care',
      degrees: 'BDS, MDS Prosthodontics & Crown Bridge',
      experience: '9+ Years',
      days: 'Tuesday – Sunday (11:00 AM - 07:00 PM)',
      photo: 'https://images.unsplash.com/photo-1637059824899-a441006a6875?q=80&w=600&auto=format&fit=crop',
      bio: 'Dr. Kabir Anand is an accomplished specialist in dental implants, smile design, painless root canals, and full mouth rehabilitation, using state-of-the-art digital scanners for optimal precision.',
      services: ['Dental Implants', 'Painless Root Canal (RCT)', 'Digital Smile Designing', 'Teeth Whitening', 'Full Mouth Crowns & Bridges']
    }
  };

  /* ------------------------------------------------------------
     1B. DEPARTMENT → DOCTOR FILTERING
     ------------------------------------------------------------ */
  const departmentSelect = document.getElementById('department');
  const preferredDoctorSelect = document.getElementById('preferredDoctor');

  const departmentDoctorMap = {
    'General Consultation': ['Dr. Arjun Verma'],
    'Cardiology': ['Dr. Aanya Kapoor'],
    'Dermatology': ['Dr. Rohan Mehta'],
    'Pediatrics': ['Dr. Simran Chadha'],
    "Women's Health": ['Dr. Neha Bhatia'],
    'Dental Care': ['Dr. Kabir Anand'],
    'Diagnostics & Imaging': [],
    'Preventive Health Checkup': ['Dr. Arjun Verma']
  };

  const allDoctorOptions = [
    { value: 'Any Specialist', label: 'Any Available Senior Specialist', spec: '' },
    { value: 'Dr. Aanya Kapoor', label: 'Dr. Aanya Kapoor (Cardiology)', spec: 'Cardiology' },
    { value: 'Dr. Rohan Mehta', label: 'Dr. Rohan Mehta (Dermatology)', spec: 'Dermatology' },
    { value: 'Dr. Simran Chadha', label: 'Dr. Simran Chadha (Pediatrics)', spec: 'Pediatrics' },
    { value: 'Dr. Arjun Verma', label: 'Dr. Arjun Verma (General Medicine)', spec: 'General Medicine' },
    { value: 'Dr. Neha Bhatia', label: 'Dr. Neha Bhatia (Women\'s Health)', spec: "Women's Health" },
    { value: 'Dr. Kabir Anand', label: 'Dr. Kabir Anand (Dental Care)', spec: 'Dental Care' }
  ];

  function updateDoctorDropdown(selectedDept) {
    if (!preferredDoctorSelect) return;
    const relatedDoctors = departmentDoctorMap[selectedDept];
    const previousValue = preferredDoctorSelect.value;
    preferredDoctorSelect.innerHTML = '';

    if (!selectedDept || selectedDept === '' || !relatedDoctors || relatedDoctors.length === 0) {
      allDoctorOptions.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        preferredDoctorSelect.appendChild(option);
      });
    } else {
      const anyOpt = document.createElement('option');
      anyOpt.value = 'Any Specialist';
      anyOpt.textContent = 'Any Available Senior Specialist';
      preferredDoctorSelect.appendChild(anyOpt);

      relatedDoctors.forEach(docName => {
        const docOption = allDoctorOptions.find(d => d.value === docName);
        if (docOption) {
          const option = document.createElement('option');
          option.value = docOption.value;
          option.textContent = docOption.label;
          preferredDoctorSelect.appendChild(option);
        }
      });
    }

    if (preferredDoctorSelect.querySelector(`option[value="${previousValue}"]`)) {
      preferredDoctorSelect.value = previousValue;
    } else {
      preferredDoctorSelect.value = 'Any Specialist';
    }
  }

  if (departmentSelect) {
    departmentSelect.addEventListener('change', (e) => {
      updateDoctorDropdown(e.target.value);
    });
  }

  /* ------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & MOBILE MENU TOGGLE
     ------------------------------------------------------------ */
  /* ------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & MOBILE MENU TOGGLE WITH SMOOTH NAV
     ------------------------------------------------------------ */
  const siteHeader = document.getElementById('siteHeader');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  });

  function closeMobileMenu() {
    if (hamburgerBtn && mobileMenu) {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('is-open');
      if (mobileMenu.classList.contains('is-open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking any mobile link
    document.querySelectorAll('.mobile-menu a, .mobile-nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        closeMobileMenu();
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          } else if (targetId === '#home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });
    });

    // Mobile Action Buttons inside menu
    const mobileDoctorPortalBtn = document.getElementById('mobileDoctorPortalBtn');
    const mobilePortalBtn = document.getElementById('mobilePortalBtn');
    const mobileTrackBtn = document.getElementById('mobileTrackBtn');

    if (mobileDoctorPortalBtn) {
      mobileDoctorPortalBtn.addEventListener('click', () => {
        closeMobileMenu();
        if (typeof openDoctorPortalHandler === 'function') openDoctorPortalHandler();
      });
    }
    if (mobilePortalBtn) {
      mobilePortalBtn.addEventListener('click', () => {
        closeMobileMenu();
        if (typeof openPortalHandler === 'function') openPortalHandler();
      });
    }
    if (mobileTrackBtn) {
      mobileTrackBtn.addEventListener('click', () => {
        closeMobileMenu();
        if (typeof openTrackModalHandler === 'function') openTrackModalHandler();
      });
    }
  }

  // Brand Logo Click -> Smooth Scroll to Home
  document.querySelectorAll('.brand').forEach(brandEl => {
    brandEl.addEventListener('click', (e) => {
      closeMobileMenu();
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  /* ------------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------
     4. CATEGORY FILTERING FOR TREATMENTS & DOCTORS
     ------------------------------------------------------------ */
  // Service Filters
  const serviceFilterBtns = document.querySelectorAll('.service-filters .filter-btn');
  const serviceRows = document.querySelectorAll('#serviceList .service-row');

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      serviceRows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          row.classList.remove('is-hidden');
        } else {
          row.classList.add('is-hidden');
        }
      });
    });
  });

  // Doctor Specialty Filters
  const docFilterBtns = document.querySelectorAll('.doctor-filters .filter-btn');
  const doctorCards = document.querySelectorAll('#doctorGrid .doctor-card');

  docFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      docFilterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.getAttribute('data-doc-filter');

      doctorCards.forEach(card => {
        const specialty = card.getAttribute('data-specialty');
        if (filter === 'all' || specialty === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* ------------------------------------------------------------
     5. TESTIMONIALS SLIDER
     ------------------------------------------------------------ */
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;
  let slideTimer;

  function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (slides.length > 0) {
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        resetTimer();
      });
    });

    function startTimer() {
      slideTimer = setInterval(nextSlide, 6000);
    }
    function resetTimer() {
      clearInterval(slideTimer);
      startTimer();
    }
    startTimer();
  }

  /* ------------------------------------------------------------
     6. FAQ ACCORDION
     ------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      
      // Close all other items
      faqItems.forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------
     7. TOAST NOTIFICATION SYSTEM
     ------------------------------------------------------------ */
  function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5ab898" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e85a6f" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5fb8d8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div>
        <strong>${title}</strong>
        <span>${message}</span>
      </div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));

    setTimeout(() => {
      removeToast(toast);
    }, 4500);
  }

  function removeToast(toast) {
    if (toast.classList.contains('is-leaving')) return;
    toast.classList.add('is-leaving');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  }

  /* ------------------------------------------------------------
     8. DOCTOR PROFILE MODAL LOGIC
     ------------------------------------------------------------ */
  const doctorModal = document.getElementById('doctorModal');
  const closeDoctorModal = document.getElementById('closeDoctorModal');
  const doctorModalBackdrop = document.getElementById('doctorModalBackdrop');
  const doctorModalBody = document.getElementById('doctorModalBody');

  function openDoctorProfile(doctorId) {
    const doc = doctorsData[doctorId];
    if (!doc || !doctorModalBody) return;

    doctorModalBody.innerHTML = `
      <div class="doctor-modal-header">
        <img class="doctor-modal-photo" src="${doc.photo}" alt="${doc.name}">
        <div class="doctor-modal-info">
          <h3>${doc.name}</h3>
          <p>${doc.title}</p>
          <span style="font-size:0.82rem;color:var(--muted);">${doc.degrees}</span>
        </div>
      </div>
      <div class="doctor-modal-bio">
        <p>${doc.bio}</p>
      </div>
      <div class="doctor-modal-details">
        <div><strong>Specialty:</strong> ${doc.specialty}</div>
        <div><strong>Clinical Experience:</strong> ${doc.experience}</div>
        <div><strong>Consultation Days:</strong> ${doc.days}</div>
        <div><strong>Services &amp; Procedures:</strong> ${doc.services.join(', ')}</div>
      </div>
      <div style="margin-top:24px;">
        <button type="button" class="btn btn-primary btn-block direct-book-doc-btn" data-doc-name="${doc.name}" data-doc-spec="${doc.specialty}">
          Book Consultation with ${doc.name}
        </button>
      </div>
    `;

    doctorModal.classList.add('is-open');
    doctorModal.setAttribute('aria-hidden', 'false');

    const directBookBtn = doctorModalBody.querySelector('.direct-book-doc-btn');
    if (directBookBtn) {
      directBookBtn.addEventListener('click', () => {
        closeDoctorProfileModal();
        const deptSelect = document.getElementById('department');
        const doctorSelect = document.getElementById('preferredDoctor');
        if (deptSelect && doctorSelect) {
          deptSelect.value = doc.specialty;
          updateDoctorDropdown(doc.specialty);
          doctorSelect.value = doc.name;
        }
        const contactSec = document.getElementById('contact');
        if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function closeDoctorProfileModal() {
    if (doctorModal) {
      doctorModal.classList.remove('is-open');
      doctorModal.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('.view-profile-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const docId = btn.getAttribute('data-doc-id');
      openDoctorProfile(docId);
    });
  });

  if (closeDoctorModal) closeDoctorModal.addEventListener('click', closeDoctorProfileModal);
  if (doctorModalBackdrop) doctorModalBackdrop.addEventListener('click', closeDoctorProfileModal);

  // Quick book links from treatment rows
  document.querySelectorAll('.quick-book-service').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-service');
      const deptSelect = document.getElementById('department');
      if (deptSelect) {
        deptSelect.value = serviceName;
        updateDoctorDropdown(serviceName);
      }
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      showToast('Department Pre-selected', `Selected ${serviceName} in booking form.`, 'info');
    });
  });

  /* ------------------------------------------------------------
     9. APPOINTMENT FORM VALIDATION & BOOKING RECEIPT GENERATOR
     ------------------------------------------------------------ */
  const appointmentForm = document.getElementById('appointmentForm');
  const submitBookingBtn = document.getElementById('submitBookingBtn');
  const successModal = document.getElementById('successModal');
  const receiptCardDetails = document.getElementById('receiptCardDetails');
  const closeSuccessModal = document.getElementById('closeSuccessModal');
  const dismissSuccessModal = document.getElementById('dismissSuccessModal');
  const closeSuccessModalBackdrop = document.getElementById('closeSuccessModalBackdrop');

  // Set min date for date input to today
  const dateInput = document.getElementById('appointmentDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear existing errors
      document.querySelectorAll('.field-error').forEach(err => err.textContent = '');
      document.querySelectorAll('.form-field').forEach(ff => ff.classList.remove('has-error'));

      let isValid = true;
      const fullName = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const department = document.getElementById('department').value;
      const doctor = document.getElementById('preferredDoctor').value;
      const appointmentDate = document.getElementById('appointmentDate').value;
      const timeSlotRadio = appointmentForm.querySelector('input[name="timeSlot"]:checked');
      const timeSlot = timeSlotRadio ? timeSlotRadio.value : '';

      // Validation Rules
      if (!fullName || fullName.length < 2) {
        showFieldError('fullName', 'Please enter your full name (at least 2 characters).');
        isValid = false;
      }

      if (!phone || !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{8,15}$/.test(phone)) {
        showFieldError('phone', 'Please enter a valid contact phone number.');
        isValid = false;
      }

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showFieldError('email', 'Please enter a valid email address.');
        isValid = false;
      }

      if (!department) {
        showFieldError('department', 'Please select a specialty department.');
        isValid = false;
      }

      if (!appointmentDate) {
        showFieldError('appointmentDate', 'Please select a preferred appointment date.');
        isValid = false;
      }

      if (!timeSlot) {
        document.getElementById('timeSlotError').textContent = 'Please choose a preferred time slot chip.';
        isValid = false;
      }

      if (!isValid) {
        showToast('Validation Error', 'Please fix the highlighted fields in the booking form.', 'error');
        return;
      }

      // Show spinner state
      if (submitBookingBtn) submitBookingBtn.classList.add('is-loading');

      // Generate random booking ID (e.g. MER-2026-8941)
      const bookingId = `MER-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const bookingRecord = {
        bookingId,
        fullName,
        phone,
        email,
        department,
        doctor,
        appointmentDate,
        timeSlot,
        status: 'Confirmed',
        createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      // Save to localStorage for demo lookup
      saveBooking(bookingRecord);

      setTimeout(() => {
        if (submitBookingBtn) submitBookingBtn.classList.remove('is-loading');

        // Render confirmation receipt
        if (receiptCardDetails) {
          receiptCardDetails.innerHTML = `
            <div class="receipt-row"><span class="receipt-label">Booking Reference:</span><span class="receipt-val" style="color:var(--teal);">${bookingRecord.bookingId}</span></div>
            <div class="receipt-row"><span class="receipt-label">Patient Name:</span><span class="receipt-val">${bookingRecord.fullName}</span></div>
            <div class="receipt-row"><span class="receipt-label">Specialty Department:</span><span class="receipt-val">${bookingRecord.department}</span></div>
            <div class="receipt-row"><span class="receipt-label">Assigned Consultant:</span><span class="receipt-val">${bookingRecord.doctor}</span></div>
            <div class="receipt-row"><span class="receipt-label">Date &amp; Time Slot:</span><span class="receipt-val">${bookingRecord.appointmentDate} (${bookingRecord.timeSlot})</span></div>
            <div class="receipt-row"><span class="receipt-label">Clinic Location:</span><span class="receipt-val">Vasant Vihar, New Delhi</span></div>
            <div class="receipt-row"><span class="receipt-label">Status:</span><span class="receipt-val" style="color:var(--success);">● Confirmed</span></div>
          `;
        }

        if (successModal) {
          successModal.classList.add('is-open');
          successModal.setAttribute('aria-hidden', 'false');
        }

        appointmentForm.reset();
        showToast('Appointment Booked!', `Reference ID: ${bookingId}. Confirmation sent to ${email}`, 'success');

      }, 1000);
    });
  }

  function showFieldError(fieldId, msg) {
    const errorEl = document.getElementById(`${fieldId}Error`);
    if (errorEl) errorEl.textContent = msg;
    const input = document.getElementById(fieldId);
    if (input && input.parentElement) input.parentElement.classList.add('has-error');
  }

  function saveBooking(record) {
    try {
      let existing = JSON.parse(localStorage.getItem('meridian_bookings') || '[]');
      existing.unshift(record);
      localStorage.setItem('meridian_bookings', JSON.stringify(existing));
    } catch (e) {
      console.error(e);
    }
  }

  function hideSuccessModal() {
    if (successModal) {
      successModal.classList.remove('is-open');
      successModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (closeSuccessModal) closeSuccessModal.addEventListener('click', hideSuccessModal);
  if (dismissSuccessModal) dismissSuccessModal.addEventListener('click', hideSuccessModal);
  if (closeSuccessModalBackdrop) closeSuccessModalBackdrop.addEventListener('click', hideSuccessModal);

  /* ------------------------------------------------------------
     10. APPOINTMENT STATUS TRACKER LOGIC
     ------------------------------------------------------------ */
  const trackModal = document.getElementById('trackModal');
  const openTrackBtn = document.getElementById('openTrackBtn');
  const mobileTrackBtn = document.getElementById('mobileTrackBtn');
  const footerTrackBtn = document.getElementById('footerTrackBtn');
  const closeTrackModal = document.getElementById('closeTrackModal');
  const closeTrackModalBackdrop = document.getElementById('closeTrackModalBackdrop');
  const trackForm = document.getElementById('trackForm');
  const trackResultArea = document.getElementById('trackResultArea');

  function openTrackModalHandler() {
    if (trackModal) {
      trackModal.classList.add('is-open');
      trackModal.setAttribute('aria-hidden', 'false');
    }
  }
  function closeTrackModalHandler() {
    if (trackModal) {
      trackModal.classList.remove('is-open');
      trackModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (openTrackBtn) openTrackBtn.addEventListener('click', openTrackModalHandler);
  if (mobileTrackBtn) mobileTrackBtn.addEventListener('click', openTrackModalHandler);
  if (footerTrackBtn) footerTrackBtn.addEventListener('click', openTrackModalHandler);
  if (closeTrackModal) closeTrackModal.addEventListener('click', closeTrackModalHandler);
  if (closeTrackModalBackdrop) closeTrackModalBackdrop.addEventListener('click', closeTrackModalHandler);

  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = document.getElementById('trackIdInput').value.trim();
      if (!query) return;

      const stored = JSON.parse(localStorage.getItem('meridian_bookings') || '[]');
      const match = stored.find(b => b.bookingId.toLowerCase() === query.toLowerCase() || b.phone === query);

      trackResultArea.style.display = 'block';

      if (match) {
        trackResultArea.innerHTML = `
          <div style="background:var(--bg-alt);border:1px solid var(--teal-deep);padding:18px;border-radius:var(--radius-md);">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="color:var(--teal);">${match.bookingId}</strong>
              <span style="background:var(--teal);color:#000;font-size:0.75rem;padding:2px 8px;border-radius:99px;font-weight:700;">${match.status}</span>
            </div>
            <div style="margin-top:10px;font-size:0.88rem;color:var(--ivory-dim);display:flex;flex-direction:column;gap:4px;">
              <span><strong>Patient:</strong> ${match.fullName}</span>
              <span><strong>Department:</strong> ${match.department}</span>
              <span><strong>Doctor:</strong> ${match.doctor}</span>
              <span><strong>Slot:</strong> ${match.appointmentDate} (${match.timeSlot})</span>
              <span><strong>Clinic Suite:</strong> Suite 3B, Meridian Vasant Vihar</span>
            </div>
          </div>
        `;
        showToast('Record Found', `Displaying booking details for ${match.bookingId}`, 'success');
      } else {
        trackResultArea.innerHTML = `
          <div style="background:var(--bg-alt);border:1px solid var(--danger);padding:18px;border-radius:var(--radius-md);text-align:center;">
            <p style="color:var(--danger);font-weight:600;">No Booking Record Found</p>
            <p style="font-size:0.84rem;color:var(--muted);margin-top:4px;">Please verify your Booking ID (e.g., MER-2026-XXXX) or phone number. For urgent assistance call +91 (011) 4982-7000.</p>
          </div>
        `;
      }
    });
  }

  /* ------------------------------------------------------------
     11. PATIENT PORTAL & DOCTOR PORTAL MANAGEMENT LOGIC
     ------------------------------------------------------------ */
  const portalModal = document.getElementById('portalModal');
  const openPortalBtn = document.getElementById('openPortalBtn');
  const mobilePortalBtn = document.getElementById('mobilePortalBtn');
  const footerPortalBtn = document.getElementById('footerPortalBtn');
  const closePortalModal = document.getElementById('closePortalModal');
  const closePortalModalBackdrop = document.getElementById('closePortalModalBackdrop');
  const portalLoginForm = document.getElementById('portalLoginForm');

  function getBookings() {
    return JSON.parse(localStorage.getItem('meridian_bookings') || '[]');
  }

  function openPortalHandler() {
    if (portalModal) {
      renderPatientPortal();
      portalModal.classList.add('is-open');
      portalModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closePortalHandler() {
    if (portalModal) {
      portalModal.classList.remove('is-open');
      portalModal.setAttribute('aria-hidden', 'true');
    }
  }
  window.closePortalHandler = closePortalHandler;

  if (openPortalBtn) openPortalBtn.addEventListener('click', openPortalHandler);
  if (mobilePortalBtn) mobilePortalBtn.addEventListener('click', openPortalHandler);
  if (footerPortalBtn) footerPortalBtn.addEventListener('click', openPortalHandler);
  if (closePortalModal) closePortalModal.addEventListener('click', closePortalHandler);
  if (closePortalModalBackdrop) closePortalModalBackdrop.addEventListener('click', closePortalHandler);

  function renderPatientPortal() {
    const listEl = document.getElementById('patientApptList');
    if (!listEl) return;

    const bookings = getBookings();
    if (bookings.length === 0) {
      listEl.innerHTML = `<p style="text-align:center;color:var(--muted);padding:20px;">No appointments found. Click 'Book New Appointment' below to schedule one.</p>`;
      return;
    }

    listEl.innerHTML = bookings.map(b => {
      let statusClass = 'pending';
      if (b.status === 'Confirmed') statusClass = 'confirmed';
      if (b.status === 'Completed') statusClass = 'completed';
      if (b.status === 'Rejected') statusClass = 'rejected';

      return `
        <div class="patient-appt-card">
          <div class="patient-appt-info">
            <span style="font-size:0.78rem;font-weight:700;color:var(--blue);">${b.bookingId}</span>
            <h4 style="margin:2px 0 4px;color:var(--ivory);">${b.department} Consultation</h4>
            <p><strong>Patient:</strong> ${b.fullName}</p>
            <p><strong>Doctor:</strong> ${b.doctor || 'Assigned Specialist'}</p>
            <p><strong>Date &amp; Slot:</strong> ${b.appointmentDate} (${b.timeSlot})</p>
          </div>
          <div>
            <span class="status-pill ${statusClass}">● ${b.status}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ------------------------------------------------------------
     11B. DOCTOR PORTAL LOGIC & AUTHENTICATION PROTECTION
     ------------------------------------------------------------ */
  const doctorPortalModal = document.getElementById('doctorPortalModal');
  const openDoctorPortalBtn = document.getElementById('openDoctorPortalBtn');
  const mobileDoctorPortalBtn = document.getElementById('mobileDoctorPortalBtn');
  const closeDoctorPortalModal = document.getElementById('closeDoctorPortalModal');
  const closeDoctorPortalModalBackdrop = document.getElementById('closeDoctorPortalModalBackdrop');
  const doctorSelectFilter = document.getElementById('doctorSelectFilter');
  const statusSelectFilter = document.getElementById('statusSelectFilter');
  const doctorApptTableBody = document.getElementById('doctorApptTableBody');

  // Auth elements
  const docPortalLoginView = document.getElementById('docPortalLoginView');
  const docPortalDashboardView = document.getElementById('docPortalDashboardView');
  const docLoginForm = document.getElementById('docLoginForm');
  const docUsernameInput = document.getElementById('docUsernameInput');
  const docPasswordInput = document.getElementById('docPasswordInput');
  const docAuthError = document.getElementById('docAuthError');
  const fillDocDemoCreds = document.getElementById('fillDocDemoCreds');
  const docLogoutBtn = document.getElementById('docLogoutBtn');
  const docActiveUserLabel = document.getElementById('docActiveUserLabel');

  function isDocLoggedIn() {
    return sessionStorage.getItem('meridian_doc_auth') === 'true';
  }

  function syncDoctorPortalState() {
    if (isDocLoggedIn()) {
      if (docPortalLoginView) docPortalLoginView.style.display = 'none';
      if (docPortalDashboardView) docPortalDashboardView.style.display = 'block';
      const user = sessionStorage.getItem('meridian_doc_user') || 'Dr. Aanya Kapoor (Admin)';
      if (docActiveUserLabel) docActiveUserLabel.textContent = user;
      renderDoctorPortal();
    } else {
      if (docPortalLoginView) docPortalLoginView.style.display = 'block';
      if (docPortalDashboardView) docPortalDashboardView.style.display = 'none';
    }
  }

  function openDoctorPortalHandler() {
    if (doctorPortalModal) {
      syncDoctorPortalState();
      doctorPortalModal.classList.add('is-open');
      doctorPortalModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeDoctorPortalHandler() {
    if (doctorPortalModal) {
      doctorPortalModal.classList.remove('is-open');
      doctorPortalModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (openDoctorPortalBtn) openDoctorPortalBtn.addEventListener('click', openDoctorPortalHandler);
  if (mobileDoctorPortalBtn) mobileDoctorPortalBtn.addEventListener('click', openDoctorPortalHandler);
  if (closeDoctorPortalModal) closeDoctorPortalModal.addEventListener('click', closeDoctorPortalHandler);
  if (closeDoctorPortalModalBackdrop) closeDoctorPortalModalBackdrop.addEventListener('click', closeDoctorPortalHandler);

  // Doctor Login Form Handling
  if (docLoginForm) {
    docLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = docUsernameInput ? docUsernameInput.value.trim().toLowerCase() : '';
      const password = docPasswordInput ? docPasswordInput.value.trim() : '';

      // Valid Credentials: username 'doctor' or 'dr.kapoor' or 'admin', password 'admin123' or 'clinic2026'
      const validUsers = ['doctor', 'dr.kapoor', 'admin', 'dr.mehta'];
      const validPasswords = ['admin123', 'clinic2026', 'pass123'];

      if (validUsers.includes(username) && validPasswords.includes(password)) {
        sessionStorage.setItem('meridian_doc_auth', 'true');
        const formattedUser = username === 'dr.mehta' ? 'Dr. Rohan Mehta (Dermatology)' : 'Dr. Aanya Kapoor (Senior Specialist)';
        sessionStorage.setItem('meridian_doc_user', formattedUser);
        if (docAuthError) docAuthError.style.display = 'none';
        syncDoctorPortalState();
        showToast('Access Granted', `Welcome back, ${formattedUser}! Portal Unlocked.`, 'success');
      } else {
        if (docAuthError) {
          docAuthError.innerHTML = '⚠️ <strong>Invalid Credentials!</strong> Please use Username: <code>doctor</code> & Password: <code>admin123</code>';
          docAuthError.style.display = 'block';
        }
        showToast('Authentication Failed', 'Invalid Doctor ID or Passcode.', 'error');
      }
    });
  }

  // Auto-fill Demo Passcode Button
  if (fillDocDemoCreds) {
    fillDocDemoCreds.addEventListener('click', () => {
      if (docUsernameInput) docUsernameInput.value = 'doctor';
      if (docPasswordInput) docPasswordInput.value = 'admin123';
      if (docAuthError) docAuthError.style.display = 'none';
      showToast('Passcode Auto-filled', 'Credentials pre-filled. Click "Verify & Enter Portal".', 'info');
    });
  }

  // Doctor Logout Handler
  if (docLogoutBtn) {
    docLogoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('meridian_doc_auth');
      sessionStorage.removeItem('meridian_doc_user');
      syncDoctorPortalState();
      showToast('Portal Locked', 'You have been logged out of the Doctor Portal.', 'info');
    });
  }

  if (doctorSelectFilter) doctorSelectFilter.addEventListener('change', renderDoctorPortal);
  if (statusSelectFilter) statusSelectFilter.addEventListener('change', renderDoctorPortal);

  function updateAppointmentStatus(bookingId, newStatus) {
    let bookings = getBookings();
    const idx = bookings.findIndex(b => b.bookingId === bookingId);
    if (idx !== -1) {
      bookings[idx].status = newStatus;
      localStorage.setItem('meridian_bookings', JSON.stringify(bookings));
      renderDoctorPortal();
      renderPatientPortal();
      const toastType = newStatus === 'Rejected' ? 'error' : 'success';
      showToast('Status Updated!', `Appointment ${bookingId} has been marked as ${newStatus}.`, toastType);
    }
  }
  window.updateAppointmentStatus = updateAppointmentStatus;

  function renderDoctorPortal() {
    const bookings = getBookings();
    const selectedDoc = doctorSelectFilter ? doctorSelectFilter.value : 'ALL';
    const selectedStatus = statusSelectFilter ? statusSelectFilter.value : 'ALL';

    // Calculate metrics
    let total = bookings.length;
    let pending = bookings.filter(b => b.status === 'Pending').length;
    let confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    let completed = bookings.filter(b => b.status === 'Completed').length;

    const elTotal = document.getElementById('docStatTotal');
    const elPending = document.getElementById('docStatPending');
    const elConfirmed = document.getElementById('docStatConfirmed');
    const elCompleted = document.getElementById('docStatCompleted');

    if (elTotal) elTotal.textContent = total;
    if (elPending) elPending.textContent = pending;
    if (elConfirmed) elConfirmed.textContent = confirmed;
    if (elCompleted) elCompleted.textContent = completed;

    // Filter
    let filtered = bookings.filter(b => {
      const matchDoc = selectedDoc === 'ALL' || b.doctor === selectedDoc;
      const matchStatus = selectedStatus === 'ALL' || b.status === selectedStatus;
      return matchDoc && matchStatus;
    });

    if (!doctorApptTableBody) return;

    if (filtered.length === 0) {
      doctorApptTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center;padding:30px;color:var(--muted);">
            No patient appointments match the selected doctor/status filters.
          </td>
        </tr>
      `;
      return;
    }

    doctorApptTableBody.innerHTML = filtered.map(b => {
      let statusClass = 'pending';
      if (b.status === 'Confirmed') statusClass = 'confirmed';
      if (b.status === 'Completed') statusClass = 'completed';
      if (b.status === 'Rejected') statusClass = 'rejected';

      let actionsHtml = '';
      if (b.status === 'Pending') {
        actionsHtml = `
          <div class="action-btn-group">
            <button class="act-btn act-btn-accept" onclick="updateAppointmentStatus('${b.bookingId}', 'Confirmed')">✔ Accept</button>
            <button class="act-btn act-btn-reject" onclick="updateAppointmentStatus('${b.bookingId}', 'Rejected')">✖ Reject</button>
          </div>
        `;
      } else if (b.status === 'Confirmed') {
        actionsHtml = `
          <div class="action-btn-group">
            <button class="act-btn act-btn-complete" onclick="updateAppointmentStatus('${b.bookingId}', 'Completed')">✔ Complete</button>
            <button class="act-btn act-btn-reject" onclick="updateAppointmentStatus('${b.bookingId}', 'Rejected')">✖ Cancel</button>
          </div>
        `;
      } else {
        actionsHtml = `<span style="font-size:0.8rem;color:var(--muted);font-style:italic;">Updated (${b.status})</span>`;
      }

      return `
        <tr>
          <td>
            <strong style="color:var(--blue);display:block;font-size:0.88rem;">${b.bookingId}</strong>
            <span style="color:var(--ivory);font-weight:600;">${b.fullName}</span><br>
            <span style="font-size:0.8rem;color:var(--muted);">${b.phone}</span>
          </td>
          <td>
            <strong style="color:var(--ivory);display:block;font-size:0.88rem;">${b.department}</strong>
            <span style="font-size:0.82rem;color:var(--muted);">${b.doctor || 'Unassigned Doctor'}</span>
          </td>
          <td>
            <span style="color:var(--ivory);display:block;font-size:0.88rem;">${b.appointmentDate}</span>
            <span style="font-size:0.82rem;color:var(--muted);">${b.timeSlot}</span>
          </td>
          <td>
            <span class="status-pill ${statusClass}">● ${b.status}</span>
          </td>
          <td>${actionsHtml}</td>
        </tr>
      `;
    }).join('');
  }

  // Tab switching in portal
  const portalTabs = document.querySelectorAll('.portal-tab');
  portalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      portalTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const targetPtab = tab.getAttribute('data-ptab');
      document.querySelectorAll('.ptab-content').forEach(c => c.classList.remove('is-active'));
      const activeContent = document.getElementById(`ptab-${targetPtab}`);
      if (activeContent) activeContent.classList.add('is-active');
    });
  });

  if (portalLoginForm) {
    portalLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const phoneVal = document.getElementById('portalPhone').value;
      showToast('Portal Login Successful', `Welcome back, Patient (${phoneVal}).`, 'success');
      const apptTab = document.querySelector('.portal-tab[data-ptab="appointments"]');
      if (apptTab) apptTab.click();
    });
  }

  document.querySelectorAll('.demo-download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Report Download', 'Simulating secure encrypted PDF report download...', 'info');
    });
  });

  /* ------------------------------------------------------------
     12. FACILITY LIGHTBOX VIEWER
     ------------------------------------------------------------ */
  const facilityItems = document.querySelectorAll('.facility-item');
  const facilityLightbox = document.getElementById('facilityLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const closeLightbox = document.getElementById('closeLightbox');
  const closeLightboxBackdrop = document.getElementById('closeLightboxBackdrop');

  facilityItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.getAttribute('data-lightbox');
      const desc = item.getAttribute('data-desc');

      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxDesc) lightboxDesc.textContent = desc;

      if (facilityLightbox) {
        facilityLightbox.classList.add('is-open');
        facilityLightbox.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeLightboxHandler() {
    if (facilityLightbox) {
      facilityLightbox.classList.remove('is-open');
      facilityLightbox.setAttribute('aria-hidden', 'true');
    }
  }

  if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxHandler);
  if (closeLightboxBackdrop) closeLightboxBackdrop.addEventListener('click', closeLightboxHandler);

  /* ------------------------------------------------------------
     13. NEWSLETTER FORM HANDLING
     ------------------------------------------------------------ */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed!', 'Thank you for subscribing to Meridian Health Updates.', 'success');
      newsletterForm.reset();
    });
  }

  /* ------------------------------------------------------------
     14. DYNAMIC YEAR IN FOOTER
     ------------------------------------------------------------ */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------
     15. AI CHATBOT ENGINE & CONVERSATIONAL LOGIC
     ------------------------------------------------------------ */
  const aiChatFab = document.getElementById('aiChatFab');
  const aiChatWindow = document.getElementById('aiChatWindow');
  const aiChatCloseBtn = document.getElementById('aiChatCloseBtn');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatMessages = document.getElementById('aiChatMessages');
  const aiChatChips = document.getElementById('aiChatChips');
  const aiChatBody = document.getElementById('aiChatBody');

  if (aiChatFab && aiChatWindow) {
    aiChatFab.addEventListener('click', () => {
      const isActive = aiChatWindow.classList.contains('is-active');
      if (isActive) {
        aiChatWindow.classList.remove('is-active');
        aiChatWindow.setAttribute('aria-hidden', 'true');
      } else {
        aiChatWindow.classList.add('is-active');
        aiChatWindow.setAttribute('aria-hidden', 'false');
        if (aiChatInput) aiChatInput.focus();
      }
    });
  }

  if (aiChatCloseBtn && aiChatWindow) {
    aiChatCloseBtn.addEventListener('click', () => {
      aiChatWindow.classList.remove('is-active');
      aiChatWindow.setAttribute('aria-hidden', 'true');
    });
  }

  let activeUserMsgElem = null;

  function appendChatMessage(text, sender = 'bot', actionBtn = null) {
    if (!aiChatMessages) return null;
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-${sender}`;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    let btnHtml = '';
    if (actionBtn) {
      btnHtml = `<br><button type="button" class="ai-chat-btn">${actionBtn.label}</button>`;
    }

    msgDiv.innerHTML = `
      <div class="ai-msg-bubble">
        ${text}
        ${btnHtml}
      </div>
      <span class="ai-msg-time">${timeStr}</span>
    `;

    if (actionBtn) {
      const btn = msgDiv.querySelector('.ai-chat-btn');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (typeof actionBtn.handler === 'function') {
            actionBtn.handler();
          } else if (actionBtn.onClick) {
            try {
              new Function(actionBtn.onClick)();
            } catch (err) {
              console.error(err);
            }
          }
        });
      }
    }

    aiChatMessages.appendChild(msgDiv);

    // Always keep suggestion options below the newest response
    if (aiChatChips) {
      aiChatMessages.appendChild(aiChatChips);
    }

    if (sender === 'user') {
      activeUserMsgElem = msgDiv;
      scrollChatToTarget(msgDiv);
    } else {
      scrollChatToTarget(activeUserMsgElem || msgDiv);
    }

    return msgDiv;
  }

  function showTypingIndicator() {
    if (!aiChatMessages) return null;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-msg ai-msg-bot';
    typingDiv.id = 'aiTypingIndicator';
    typingDiv.innerHTML = `
      <div class="ai-msg-bubble typing-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    aiChatMessages.appendChild(typingDiv);
    if (aiChatChips) {
      aiChatMessages.appendChild(aiChatChips);
    }
    scrollChatToTarget(typingDiv);
    return typingDiv;
  }

  function removeTypingIndicator() {
    const typing = document.getElementById('aiTypingIndicator');
    if (typing) typing.remove();
  }

  function scrollChatToTarget(targetElem) {
    if (!aiChatBody) return;
    setTimeout(() => {
      if (targetElem) {
        const targetTop = targetElem.offsetTop - 12;
        const maxScroll = aiChatBody.scrollHeight - aiChatBody.clientHeight;
        const scrollPos = Math.min(targetTop, Math.max(0, maxScroll));
        aiChatBody.scrollTo({
          top: Math.max(0, scrollPos),
          behavior: 'smooth'
        });
      } else {
        aiChatBody.scrollTo({
          top: aiChatBody.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 60);
  }

  function processAiResponse(userQuery) {
    const q = userQuery.toLowerCase().trim();
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();

      if (q.includes('book') || q.includes('appointment') || q.includes('slot') || q.includes('schedule')) {
        appendChatMessage(
          `📅 <strong>Schedule a Consultation:</strong><br>You can instantly book with top doctors (Cardiology, Dermatology, Pediatrics, Dental, etc.) directly on our portal.`,
          'bot',
          {
            label: '⚡ Open Booking Form',
            handler: () => {
              if (aiChatCloseBtn) aiChatCloseBtn.click();
              const contactSec = document.getElementById('contact');
              if (contactSec) {
                contactSec.scrollIntoView({ behavior: 'smooth' });
              }
              const formWrap = document.querySelector('.appointment-form-wrap') || document.getElementById('appointmentForm');
              if (formWrap) {
                formWrap.classList.add('form-highlight-pulse');
                setTimeout(() => formWrap.classList.remove('form-highlight-pulse'), 2500);
              }
              setTimeout(() => {
                const fullNameInput = document.getElementById('fullName');
                if (fullNameInput) fullNameInput.focus();
              }, 450);
            }
          }
        );
      } else if (q.includes('doctor') || q.includes('specialist') || q.includes('staff') || q.includes('fee')) {
        appendChatMessage(
          `👨‍⚕️ <strong>Our Senior Medical Team:</strong><br>• <strong>Dr. Aanya Kapoor</strong> (Senior Cardiologist)<br>• <strong>Dr. Rohan Mehta</strong> (Consultant Dermatant)<br>• <strong>Dr. Simran Chadha</strong> (Pediatrics Lead)<br>• <strong>Dr. Arjun Verma</strong> (Internal Medicine)<br>Consultation Fee: ₹1,200 – ₹1,500.`,
          'bot',
          {
            label: 'Explore All Specialists',
            handler: () => {
              if (aiChatCloseBtn) aiChatCloseBtn.click();
              const docSec = document.getElementById('doctors');
              if (docSec) {
                docSec.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }
        );
      } else if (q.includes('login') || q.includes('portal') || q.includes('passcode') || q.includes('password') || q.includes('doctor portal')) {
        appendChatMessage(
          `🔐 <strong>Doctor Portal Security:</strong><br>The Doctor &amp; Clinical Staff Portal requires login credentials.<br><strong>Demo Passcode:</strong><br>• Username: <code>doctor</code><br>• Password: <code>admin123</code>`,
          'bot',
          {
            label: '🔑 Open Doctor Portal',
            handler: () => {
              if (aiChatCloseBtn) aiChatCloseBtn.click();
              const openPortalBtn = document.getElementById('openDoctorPortalBtn');
              if (openPortalBtn) {
                openPortalBtn.click();
              }
            }
          }
        );
      } else if (q.includes('time') || q.includes('timing') || q.includes('hour') || q.includes('address') || q.includes('location') || q.includes('where')) {
        appendChatMessage(
          `📍 <strong>Location & Hours:</strong><br>🏢 <strong>Meridian Clinic:</strong> 42 Healthcare Boulevard, Connaught Place, New Delhi 110001<br>🕒 <strong>Consultation Hours:</strong> Mon–Sat: 8:00 AM – 8:00 PM<br>🚨 <strong>Emergency &amp; ICU:</strong> 24 Hours Open`
        );
      } else if (q.includes('emergency') || q.includes('urgent') || q.includes('help') || q.includes('call') || q.includes('phone')) {
        appendChatMessage(
          `🚨 <strong>Emergency Medical Helpline:</strong><br>For immediate trauma, cardiac emergency, or urgent care:<br>📞 <strong>24/7 Hotline:</strong> +91 (011) 4050 9999<br>🚑 Ambulance dispatch available 24/7.`
        );
      } else {
        appendChatMessage(
          `🤖 <strong>Meridian AI Assistant:</strong><br>I can help you with:<br>1. Booking doctor appointments<br>2. Checking doctor schedules &amp; specialties<br>3. Accessing the secure Doctor Portal<br>4. Finding clinic locations &amp; helpline.<br>What would you like to do?`
        );
      }
    }, 550);
  }

  // Handle Input Form Submit
  if (aiChatForm && aiChatInput) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = aiChatInput.value.trim();
      if (!val) return;
      appendChatMessage(val, 'user');
      aiChatInput.value = '';
      processAiResponse(val);
    });
  }

  // Handle Quick Chips Click
  if (aiChatChips) {
    const chips = aiChatChips.querySelectorAll('.ai-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          appendChatMessage(query, 'user');
          processAiResponse(query);
        }
      });
    });
  }

  /* ------------------------------------------------------------
     13. INTERACTIVE CARDIAC HEALING LAB (MOUSE & PARTICLE ENGINE)
     ------------------------------------------------------------ */
  const cardiacHealerContainer = document.getElementById('cardiacHealerContainer');
  const healerStage = document.getElementById('healerStage');
  const particleCanvas = document.getElementById('heartParticleCanvas');
  const mainHeartSvg = document.getElementById('mainHeartSvg');
  const mainHeartBody = document.getElementById('mainHeartBody');
  const mainHeartAura = document.getElementById('mainHeartAura');
  const mainHeartVeins = document.getElementById('mainHeartVeins');
  const mainHeartCracks = document.getElementById('mainHeartCracks');
  const mainHeartHealingLines = document.getElementById('mainHeartHealingLines');
  const healerStatusText = document.getElementById('healerStatusText');
  const healerBpmText = document.getElementById('healerBpmText');
  const healerProgressBar = document.getElementById('healerProgressBar');
  const healerPercentText = document.getElementById('healerPercentText');
  const healerHintText = document.getElementById('healerHintText');
  const resetHeartBtn = document.getElementById('resetHeartBtn');
  const instantHealBtn = document.getElementById('instantHealBtn');

  // Nav Heart elements
  const navHeartWidget = document.getElementById('navHeartWidget');
  const navHeartSvg = document.getElementById('navHeartSvg');
  const navHeartLabel = document.getElementById('navHeartLabel');
  const navHeartBarFill = document.getElementById('navHeartBarFill');

  let healProgress = 0; // 0 to 100
  let isMouseOverStage = false;
  let particles = [];
  let ctx = null;

  if (particleCanvas) {
    ctx = particleCanvas.getContext('2d');
    
    function resizeCanvas() {
      if (!healerStage) return;
      const rect = healerStage.getBoundingClientRect();
      particleCanvas.width = rect.width;
      particleCanvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y, isBurst = false) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = isBurst ? (Math.random() * 5 + 2) : (Math.random() * 2.5 + 0.8);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (isBurst ? 1 : 0.5);
        this.radius = isBurst ? (Math.random() * 4 + 2) : (Math.random() * 3 + 1.5);
        const colors = ['#ff4b72', '#5ab898', '#38bdf8', '#ffd166', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = 1;
        this.decay = isBurst ? (Math.random() * 0.02 + 0.01) : (Math.random() * 0.03 + 0.015);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.fillStyle = this.color;
        c.shadowColor = this.color;
        c.shadowBlur = 8;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    function animateParticles() {
      if (ctx && particleCanvas) {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          particles[i].draw(ctx);
          if (particles[i].alpha <= 0) {
            particles.splice(i, 1);
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    function spawnParticles(x, y, count = 3, isBurst = false) {
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y, isBurst));
      }
    }

    function updateHeartUI() {
      const p = Math.min(100, Math.max(0, healProgress));

      // 1. Progress Bar & Percent text
      if (healerProgressBar) healerProgressBar.style.width = p + '%';
      if (healerPercentText) healerPercentText.textContent = Math.round(p) + '% Healed';
      if (navHeartBarFill) navHeartBarFill.style.width = p + '%';

      // 2. SpO2 Monitor & BPM calculation
      const healerSpo2Text = document.getElementById('healerSpo2Text');
      const dashBubbleText = document.getElementById('dashBubbleText');
      const currentSpo2 = Math.round(92 + (p / 100) * 6);
      if (healerSpo2Text) healerSpo2Text.textContent = currentSpo2 + '%';

      const currentBpm = Math.round(38 + (p / 100) * 37);
      if (healerBpmText) {
        healerBpmText.textContent = p === 100 ? `${currentBpm} BPM (Optimal)` : `${currentBpm} BPM (${p < 50 ? 'Critical' : 'Restoring'})`;
      }

      // 3. Main SVG interpolation
      if (mainHeartBody) {
        mainHeartBody.setAttribute('fill', 'url(#anatomicalHealthyGrad)');
        mainHeartBody.setAttribute('stroke', '#c084fc');
      }

      // Aura & Glow lines
      if (mainHeartAura) mainHeartAura.style.opacity = (p / 100).toString();
      if (mainHeartHealingLines) mainHeartHealingLines.style.opacity = (p / 100).toString();

      // Veins color transition
      if (mainHeartVeins) {
        const veinsPaths = mainHeartVeins.querySelectorAll('path');
        veinsPaths.forEach(path => {
          path.setAttribute('stroke', p > 50 ? '#38bdf8' : '#1e293b');
        });
      }

      // Sick Cracks opacity fade
      if (mainHeartCracks) {
        mainHeartCracks.style.opacity = (1 - p / 100).toString();
      }

      // Heart state classes
      if (p >= 100) {
        if (mainHeartSvg) {
          mainHeartSvg.classList.remove('sick');
          mainHeartSvg.classList.add('healthy');
        }
        if (cardiacHealerContainer) cardiacHealerContainer.classList.add('is-healed');
        if (healerStatusText) healerStatusText.innerHTML = '💖 100% Restored & Healthy!';
        if (healerHintText) healerHintText.textContent = '🎉 Heart Fully Healed! Powerful Rhythmic Beat';
        if (dashBubbleText) dashBubbleText.textContent = '✨ The valve is working perfectly!';

        // Nav Widget
        if (navHeartSvg) {
          navHeartSvg.classList.remove('sick-state');
          navHeartSvg.classList.add('healed-state');
        }
        if (navHeartLabel) {
          navHeartLabel.textContent = '100% Healed';
          navHeartLabel.style.color = '#5ab898';
        }
      } else {
        if (mainHeartSvg) {
          mainHeartSvg.classList.remove('healthy');
          mainHeartSvg.classList.add('sick');
        }
        if (cardiacHealerContainer) cardiacHealerContainer.classList.remove('is-healed');
        
        if (p === 0) {
          if (healerStatusText) healerStatusText.innerHTML = '💔 Sick / Dead Heart';
          if (healerHintText) healerHintText.textContent = '✨ Move cursor over heart to heal!';
          if (dashBubbleText) dashBubbleText.textContent = 'The valve is resting — Hover/Touch cursor to heal & activate 3D heart!';
          if (navHeartLabel) {
            navHeartLabel.textContent = 'Sick Heart';
            navHeartLabel.style.color = '#a0aec0';
          }
        } else {
          if (healerStatusText) healerStatusText.innerHTML = '🩹 Healing in Progress...';
          if (healerHintText) healerHintText.textContent = '✨ Keep moving cursor to repair blood flow!';
          if (dashBubbleText) dashBubbleText.textContent = `🩹 Healing Cardiac Flow: ${Math.round(p)}%`;
          if (navHeartLabel) {
            navHeartLabel.textContent = `${Math.round(p)}% Healing`;
            navHeartLabel.style.color = '#ff4b72';
          }
        }

        if (navHeartSvg) {
          navHeartSvg.classList.remove('healed-state');
          navHeartSvg.classList.add('sick-state');
        }
      }
    }

    // Mousemove / Touchmove Healer interaction
    let lastX = null;
    let lastY = null;

    function handleMove(clientX, clientY) {
      if (!healerStage) return;
      const rect = healerStage.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        if (lastX !== null && lastY !== null) {
          const dist = Math.hypot(x - lastX, y - lastY);
          if (dist > 2 && healProgress < 100) {
            healProgress = Math.min(100, healProgress + dist * 0.15);
            updateHeartUI();
          }
        }
        spawnParticles(x, y, 4, false);
        lastX = x;
        lastY = y;
      }
    }

    if (healerStage) {
      healerStage.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
      healerStage.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }, { passive: true });

      healerStage.addEventListener('mouseleave', () => {
        lastX = null;
        lastY = null;
      });
    }

    // Hover on Navbar mini heart widget heals it too!
    if (navHeartWidget) {
      navHeartWidget.addEventListener('mousemove', (e) => {
        if (healProgress < 100) {
          healProgress = Math.min(100, healProgress + 2.5);
          updateHeartUI();
        }
        if (healerStage && particleCanvas) {
          const rect = healerStage.getBoundingClientRect();
          spawnParticles(rect.width / 2, rect.height / 2, 2, false);
        }
      });
    }

    // Reset button
    if (resetHeartBtn) {
      resetHeartBtn.addEventListener('click', () => {
        healProgress = 0;
        updateHeartUI();
        if (window.showToast) showToast('Cardiac Lab', 'Heart state reset to damaged state.', 'info');
      });
    }

    // Instant Heal button
    if (instantHealBtn) {
      instantHealBtn.addEventListener('click', () => {
        healProgress = 100;
        updateHeartUI();
        if (particleCanvas && healerStage) {
          const rect = healerStage.getBoundingClientRect();
          spawnParticles(rect.width / 2, rect.height / 2, 40, true);
        }
        if (window.showToast) showToast('Heart Restored!', '100% Heart health achieved with optimal rhythmic pulse!', 'success');
      });
    }

    // Initial sync
    updateHeartUI();
  }

  /* ------------------------------------------------------------
     STAT COUNTER ANIMATION — Count-Up on Scroll into View
     ------------------------------------------------------------ */
  (function initStatCounters() {
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    if (!statNums.length) return;

    let hasAnimated = false;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animateCounter(el, delay) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      let startTime = null;

      setTimeout(() => {
        function tick(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuart(progress);
          const currentValue = Math.round(easedProgress * target);

          el.textContent = currentValue + suffix;

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target + suffix;
          }
        }
        requestAnimationFrame(tick);
      }, delay);
    }

    function startAllCounters() {
      if (hasAnimated) return;
      hasAnimated = true;

      statNums.forEach((el, index) => {
        // Read stagger delay from CSS custom property or use index-based fallback
        const style = getComputedStyle(el.closest('.stat-item'));
        const cssDelay = parseFloat(style.getPropertyValue('--delay')) || (index * 150);
        animateCounter(el, cssDelay);
      });
    }

    if ('IntersectionObserver' in window) {
      const statsSection = document.querySelector('.stats-strip');
      if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              startAllCounters();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: '0px 0px 100px 0px' });
        observer.observe(statsSection);

        // Immediate check if element is already in or close to viewport
        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight + 100 && rect.bottom >= -100) {
          startAllCounters();
        }
      } else {
        startAllCounters();
      }
    } else {
      startAllCounters();
    }

    // Safety fallback timer so stat numbers never remain 0
    setTimeout(() => {
      startAllCounters();
    }, 600);
  })();

  /* ------------------------------------------------------------
     INTERACTIVE BMI CALCULATOR HANDLER
     ------------------------------------------------------------ */
  const bmiForm = document.getElementById('bmiForm');
  if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const height = parseFloat(document.getElementById('bmiHeight').value);
      const weight = parseFloat(document.getElementById('bmiWeight').value);

      if (!height || !weight || height <= 0 || weight <= 0) return;

      const heightM = height / 100;
      const bmi = (weight / (heightM * heightM)).toFixed(1);
      const bmiNumVal = document.getElementById('bmiNumberVal');
      const statusBadge = document.getElementById('bmiStatusBadge');
      const barFill = document.getElementById('bmiBarFill');
      const adviceText = document.getElementById('bmiAdviceText');

      if (bmiNumVal) bmiNumVal.textContent = bmi;

      let category = 'normal';
      let badgeLabel = 'Normal Weight';
      let fillWidth = '50%';
      let message = 'Your BMI is in the healthy range! Keep up balanced nutrition and regular exercise.';

      if (bmi < 18.5) {
        category = 'underweight';
        badgeLabel = 'Underweight';
        fillWidth = '22%';
        message = 'Your BMI indicates underweight status. We recommend consulting our nutrition & internal medicine team.';
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'normal';
        badgeLabel = 'Normal Weight';
        fillWidth = '48%';
        message = 'Your BMI is in the healthy range! Keep up balanced nutrition and regular cardiovascular exercise.';
      } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'overweight';
        badgeLabel = 'Overweight';
        fillWidth = '74%';
        message = 'Your BMI indicates overweight status. Consider scheduling a preventative cardiology & metabolic checkup.';
      } else {
        category = 'obese';
        badgeLabel = 'Obesity Class';
        fillWidth = '96%';
        message = 'Your BMI indicates obesity. We strongly recommend a comprehensive internal medicine & cardiac evaluation.';
      }

      if (statusBadge) {
        statusBadge.className = `bmi-status-badge ${category}`;
        statusBadge.textContent = badgeLabel;
      }
      if (barFill) barFill.style.width = fillWidth;
      if (adviceText) adviceText.textContent = message;

      if (window.showToast) {
        showToast('BMI Calculated', `Your BMI is ${bmi} (${badgeLabel})`, 'success');
      }
    });
  }

  /* ------------------------------------------------------------
     AI CHATBOT WIDGET EVENT HANDLERS
     ------------------------------------------------------------ */
  const aiChatFab = document.getElementById('aiChatFab');
  const aiChatWindow = document.getElementById('aiChatWindow');
  const aiChatCloseBtn = document.getElementById('aiChatCloseBtn');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatMessages = document.getElementById('aiChatMessages');
  const aiChatChips = document.getElementById('aiChatChips');

  function toggleAiChat() {
    if (!aiChatWindow) return;
    const isActive = aiChatWindow.classList.contains('is-active');
    if (isActive) {
      aiChatWindow.classList.remove('is-active');
      aiChatWindow.setAttribute('aria-hidden', 'true');
    } else {
      aiChatWindow.classList.add('is-active');
      aiChatWindow.setAttribute('aria-hidden', 'false');
      if (aiChatInput) aiChatInput.focus();
    }
  }

  if (aiChatFab) {
    aiChatFab.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAiChat();
    });
  }

  if (aiChatCloseBtn) {
    aiChatCloseBtn.addEventListener('click', () => {
      if (aiChatWindow) {
        aiChatWindow.classList.remove('is-active');
        aiChatWindow.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function appendAiMessage(sender, text) {
    if (!aiChatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-msg ai-msg-${sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    bubble.innerHTML = text;

    const time = document.createElement('span');
    time.className = 'ai-msg-time';
    time.textContent = 'Just now';

    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);
    aiChatMessages.appendChild(msgDiv);

    const chatBody = document.getElementById('aiChatBody');
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getAiResponse(userText) {
    const text = userText.toLowerCase();
    if (text.includes('book') || text.includes('appointment')) {
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
      return "📅 I've scrolled down to our <strong>Appointment Booking Form</strong> for you. You can pick your department, doctor, and date right away!";
    }
    if (text.includes('doctor') || text.includes('specialist')) {
      const docSec = document.getElementById('doctors');
      if (docSec) docSec.scrollIntoView({ behavior: 'smooth' });
      return "👨‍⚕️ We have 6 renowned specialists including <strong>Dr. Aanya Kapoor</strong> (Cardiology) and <strong>Dr. Rohan Mehta</strong> (Dermatology). Scrolled to doctors!";
    }
    if (text.includes('timing') || text.includes('hour') || text.includes('location')) {
      return "🕒 <strong>Meridian Clinic Hours:</strong><br>Mon – Sat: 08:30 AM – 08:00 PM<br>Sun: 09:00 AM – 02:00 PM<br>📍 Location: Vasant Vihar, New Delhi.";
    }
    if (text.includes('portal') || text.includes('login') || text.includes('doctor portal')) {
      return "🔐 <strong>Doctor Portal Access:</strong> Click the 'Doctor Portal' button in the navbar. Authorized doctors can log in to manage live appointment schedules.";
    }
    return "Thank you for reaching out to Meridian Clinic AI! How else can I assist you with your health or consultation booking today?";
  }

  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = aiChatInput.value.trim();
      if (!val) return;

      appendAiMessage('user', val);
      aiChatInput.value = '';

      setTimeout(() => {
        const reply = getAiResponse(val);
        appendAiMessage('bot', reply);
      }, 500);
    });
  }

  if (aiChatChips) {
    aiChatChips.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-query') || chip.textContent;
        appendAiMessage('user', q);
        setTimeout(() => {
          const reply = getAiResponse(q);
          appendAiMessage('bot', reply);
        }, 400);
      });
    });
  }

});





