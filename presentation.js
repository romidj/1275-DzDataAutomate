document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const progressFill = document.querySelector('.progress-bar-fill');
    const menuList = document.querySelector('.slide-menu-list');
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const notesPanel = document.querySelector('.presenter-notes-panel');
    const notesContent = document.querySelector('.notes-content');
    const notesClose = document.querySelector('.notes-close');
    const currentSlideNumEl = document.querySelector('.current-slide-num');
    const totalSlidesEl = document.querySelector('.total-slides-num');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    if (totalSlidesEl) totalSlidesEl.textContent = totalSlides;

    // Build sidebar menu links dynamically
    slides.forEach((slide, index) => {
        const titleEl = slide.querySelector('h1') || slide.querySelector('h2');
        let titleText = titleEl ? titleEl.textContent : `Slide ${index + 1}`;
        // Clean title text from elements like spans
        titleText = titleText.replace(/Highlight|highlight/gi, '').trim();
        if (titleText.length > 30) titleText = titleText.substring(0, 30) + '...';
        
        const listItem = document.createElement('li');
        listItem.className = `slide-menu-item ${index === 0 ? 'active' : ''}`;
        listItem.textContent = `${index + 1}. ${titleText}`;
        listItem.addEventListener('click', () => {
            goToSlide(index);
            sidebar.classList.remove('open');
        });
        menuList.appendChild(listItem);
    });

    const menuItems = document.querySelectorAll('.slide-menu-item');

    // Slide Navigation
    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlideIndex) {
                slide.classList.add('active');
                // Update body class for styling adjustments based on slide theme
                if (slide.classList.contains('light-theme')) {
                    document.body.style.backgroundColor = '#ffffff';
                } else {
                    document.body.style.backgroundColor = '#080c09';
                }
            } else {
                slide.classList.remove('active');
            }
        });

        // Update active sidebar menu item
        menuItems.forEach((item, index) => {
            if (index === currentSlideIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Progress Bar
        const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;
        if (progressFill) progressFill.style.width = `${progressPercentage}%`;
        
        // Update Slide Number
        if (currentSlideNumEl) currentSlideNumEl.textContent = currentSlideIndex + 1;

        // Load Presenter Notes
        loadPresenterNotes();

        // Trigger animations for charts/SVGs if active
        handleChartAnimations();
    }

    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlideIndex = index;
            updateSlides();
        }
    }

    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlides();
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlides();
        }
    }

    // Chart Animations
    function handleChartAnimations() {
        const activeSlide = slides[currentSlideIndex];
        
        // Donut Chart on Slide 12
        if (currentSlideIndex === 11) { // 12th slide
            const segments = activeSlide.querySelectorAll('.donut-segment');
            segments.forEach(seg => {
                const totalLength = seg.getTotalLength ? seg.getTotalLength() : 283; // 2 * PI * r
                seg.style.strokeDasharray = totalLength;
                const percent = parseFloat(seg.getAttribute('data-percent')) || 0;
                const offset = totalLength - (totalLength * percent / 100);
                
                // Reset first
                seg.style.strokeDashoffset = totalLength;
                // Animate
                setTimeout(() => {
                    seg.style.strokeDashoffset = offset;
                }, 100);
            });
        }

        // Line Chart on Slide 13
        if (currentSlideIndex === 12) { // 13th slide
            const paths = activeSlide.querySelectorAll('.line-chart-path');
            paths.forEach(path => {
                const totalLength = path.getTotalLength ? path.getTotalLength() : 1000;
                path.style.strokeDasharray = totalLength;
                path.style.strokeDashoffset = totalLength;
                
                setTimeout(() => {
                    path.style.strokeDashoffset = 0;
                }, 100);
            });
        }
    }

    // Presenter Notes
    function loadPresenterNotes() {
        const activeSlide = slides[currentSlideIndex];
        const notes = activeSlide.querySelector('.speaker-notes');
        if (notes && notesContent) {
            notesContent.innerHTML = notes.innerHTML;
        } else if (notesContent) {
            notesContent.innerHTML = '<p>No speaker notes for this slide.</p>';
        }
    }

    // Toggle Presenter Notes
    function toggleNotes() {
        if (notesPanel) {
            notesPanel.classList.toggle('open');
        }
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight' || e.code === 'Space') {
            e.preventDefault();
            nextSlide();
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.code === 'KeyN') {
            toggleNotes();
        } else if (e.code === 'Home') {
            e.preventDefault();
            goToSlide(0);
        } else if (e.code === 'End') {
            e.preventDefault();
            goToSlide(totalSlides - 1);
        }
    });

    // Touch Swipe Controls
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        if (deltaX < -50) {
            nextSlide(); // Swiped left
        } else if (deltaX > 50) {
            prevSlide(); // Swiped right
        }
    }

    // Sidebar Toggle Click
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar && sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // Notes panel close button
    if (notesClose) {
        notesClose.addEventListener('click', () => {
            if (notesPanel) notesPanel.classList.remove('open');
        });
    }

    // Navigation buttons in overlay
    const nextBtn = document.querySelector('.control-btn.next');
    const prevBtn = document.querySelector('.control-btn.prev');
    const notesBtn = document.querySelector('.control-btn.notes');

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (notesBtn) notesBtn.addEventListener('click', toggleNotes);

    // Initial setup
    updateSlides();
});
