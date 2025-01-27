// Sample announcements data
const announcements = [
    {
        title: "Municipal Budget Meeting",
        date: "February 15, 2025",
        content: "Join us for the annual budget meeting to discuss municipal plans for the upcoming fiscal year.",
        category: "public"
    },
    {
        title: "Road Maintenance Notice",
        date: "January 30, 2025",
        content: "Scheduled road maintenance on Main Street from January 30-February 2. Please use alternate routes.",
        category: "public"
    },
    {
        title: "Community Clean-up Day",
        date: "February 10, 2025",
        content: "Volunteer for our monthly community clean-up initiative. Meeting point: Municipal Park at 9 AM.",
        category: "events"
    },
    {
        title: "Emergency Water Main Break",
        date: "February 5, 2025",
        content: "Water service disruption in downtown area. Repair crews are on site.",
        category: "emergency"
    },
    {
        title: "Spring Festival Planning",
        date: "February 20, 2025",
        content: "Community meeting to discuss the upcoming Spring Festival. All are welcome.",
        category: "events"
    }
];

// Load announcements
document.addEventListener('DOMContentLoaded', () => {
    const announcementsContainer = document.querySelector('.announcements-list');
    const announcementCategory = document.getElementById('announcement-category');
    const loadMoreButton = document.getElementById('load-more');

    let displayedAnnouncements = 0;
    const announcementsPerLoad = 3;

    function createAnnouncementCard(announcement) {
        const card = document.createElement('div');
        card.className = 'service-card announcement-card';
        card.innerHTML = `
            <h3>${announcement.title}</h3>
            <p><small>${announcement.date}</small></p>
            <p>${announcement.content}</p>
        `;
        return card;
    }

    function loadAnnouncements(category = 'all') {
        // Clear existing announcements
        announcementsContainer.innerHTML = '';
        displayedAnnouncements = 0;

        // Filter announcements based on category
        const filteredAnnouncements = category === 'all' 
            ? announcements 
            : announcements.filter(a => a.category === category);

        // Load initial set of announcements
        filteredAnnouncements.slice(0, announcementsPerLoad).forEach(announcement => {
            announcementsContainer.appendChild(createAnnouncementCard(announcement));
            displayedAnnouncements++;
        });

        // Update load more button visibility
        loadMoreButton.style.display = displayedAnnouncements < filteredAnnouncements.length ? 'block' : 'none';
    }

    // Event listener for category filter
    if (announcementCategory) {
        announcementCategory.addEventListener('change', (e) => {
            loadAnnouncements(e.target.value);
        });
    }

    // Event listener for load more button
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            const category = announcementCategory ? announcementCategory.value : 'all';
            const filteredAnnouncements = category === 'all' 
                ? announcements 
                : announcements.filter(a => a.category === category);

            const nextAnnouncements = filteredAnnouncements.slice(
                displayedAnnouncements, 
                displayedAnnouncements + announcementsPerLoad
            );

            nextAnnouncements.forEach(announcement => {
                announcementsContainer.appendChild(createAnnouncementCard(announcement));
                displayedAnnouncements++;
            });

            // Hide load more button if all announcements are displayed
            loadMoreButton.style.display = displayedAnnouncements < filteredAnnouncements.length ? 'block' : 'none';
        });
    }

    // Initial load of announcements
    if (announcementsContainer) {
        loadAnnouncements();
    }

    // Contact Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill out all fields.');
                return;
            }

            // In a real-world scenario, you would send this data to a backend service
            console.log('Form Submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = document.querySelector('.theme-toggle-icon');

    // Check for saved theme preference or default to dark theme
    const savedTheme = localStorage.getItem('babma-theme') || 'dark';
    document.body.classList.toggle('light-theme', savedTheme === 'light');
    updateThemeIcon();

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Toggle light/dark theme
            document.body.classList.toggle('light-theme');
            
            // Update saved theme preference
            const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('babma-theme', currentTheme);
            
            // Update theme toggle icon
            updateThemeIcon();
        });
    }

    // Function to update theme toggle icon
    function updateThemeIcon() {
        if (themeToggleIcon) {
            themeToggleIcon.textContent = document.body.classList.contains('light-theme') ? '🌞' : '🌓';
        }
    }
});

// Add scroll event listener for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
    }
});
