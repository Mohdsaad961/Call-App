/**
 * ============================================================================
 * Contact Manager - Modern Contact Management System
 * ============================================================================
 * 
 * @version     1.0.0
 * @author      Mohammad Saad Raza / Your Company
 * @copyright   Copyright (c) 2026 Contact Manager Project
 * @license     MIT License
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * ============================================================================
 * 
 * THIRD-PARTY LIBRARIES:
 * - Font Awesome (Free) v6.5.0 - Font Awesome Free License
 * 
 * ============================================================================
 */

/**
 * Contact Manager Application
 * A modern contact management system with card-based UI
 */

// ============================================
// GLOBAL STATE
// ============================================

let contacts = [];
let currentIndex = 0;


// ============================================
// DOM ELEMENTS
// ============================================

const DOM = {
    formContainer: document.querySelector('.form-container'),
    contactForm: document.getElementById('contactForm'),
    closeBtn: document.querySelector('.close-btn'),
    addNoteBtn: document.getElementById('addNote'),
    cardStack: document.getElementById('cardStack'),
    prevCardBtn: document.getElementById('prevCard'),
    nextCardBtn: document.getElementById('nextCard'),
    colorOptions: document.querySelectorAll('.color-option'),
    
    // Form inputs
    inputs: {
        url: document.getElementById('URL'),
        fullName: document.getElementById('fullName'),
        homeTown: document.getElementById('homeTown'),
        purpose: document.getElementById('Purpose')
    }
};


// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    loadContactsFromStorage();
    renderCards();
    initializeEventListeners();
    loadSavedTheme();
}


// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Form controls
    DOM.addNoteBtn.addEventListener('click', openForm);
    DOM.closeBtn.addEventListener('click', closeForm);
    DOM.contactForm.addEventListener('submit', handleFormSubmit);
    
    // Close form when clicking outside
    DOM.formContainer.addEventListener('click', (e) => {
        if (e.target === DOM.formContainer) {
            closeForm();
        }
    });

    // Card navigation
    DOM.prevCardBtn.addEventListener('click', showPreviousCard);
    DOM.nextCardBtn.addEventListener('click', showNextCard);

    // Theme colors
    DOM.colorOptions.forEach(option => {
        option.addEventListener('click', handleColorChange);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Navbar functionality
    initializeNavbar();
}


// ============================================
// NAVBAR FUNCTIONS
// ============================================

function initializeNavbar() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const dropdownItems = document.querySelectorAll('.navbar-item.dropdown');

    // Mobile menu toggle
    if (navbarToggle) {
        navbarToggle.addEventListener('click', () => {
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
    }

    // Mobile dropdown toggle
    dropdownItems.forEach(item => {
        const link = item.querySelector('.navbar-link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('dropdown-active');
            }
        });
    });

    // Update card list in navbar
    updateNavbarCardList();
    
    // Update card count
    updateCardCount();
}

function updateNavbarCardList() {
    const cardListMenu = document.getElementById('cardListMenu');
    
    if (!cardListMenu) return;
    
    if (contacts.length === 0) {
        cardListMenu.innerHTML = `
            <div class="card-list-empty">
                <i class="fas fa-inbox"></i>
                <p>No contacts available</p>
            </div>
        `;
        return;
    }
    
    cardListMenu.innerHTML = contacts.map((contact, index) => `
        <a href="#" class="card-list-item" onclick="navigateToCard(${index}); return false;">
            <img src="${contact.imageUrl}" alt="${contact.fullName}" 
                 onerror="this.src='https://i.pravatar.cc/150?img=${contact.id}'">
            <div class="card-list-info">
                <span class="card-list-name">${contact.fullName}</span>
                <span class="card-list-town">${contact.homeTown}</span>
            </div>
            <span class="card-list-badge">${contact.category}</span>
        </a>
    `).join('');
}

function updateCardCount() {
    const cardCountElement = document.getElementById('card-count');
    if (cardCountElement) {
        cardCountElement.textContent = contacts.length;
    }
}

function navigateToCard(index) {
    currentIndex = index;
    renderCards();
    
    // Close mobile menu if open
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarToggle = document.getElementById('navbarToggle');
    if (navbarMenu && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        navbarToggle.classList.remove('active');
    }
    
    showNotification(`Navigated to ${contacts[index].fullName}`, 'info');
}


// ============================================
// NAVBAR MENU ACTIONS
// ============================================

function showAbout() {
    const aboutMessage = `📞 Contact Manager v1.0.0

A modern contact management system with a beautiful card-based UI.

Features:
• Card-based interface
• Local storage persistence
• Theme customization
• Keyboard shortcuts
• Responsive design

Developed by: Mohammad Saad Raza
License: MIT`;
    alert(aboutMessage);
}

function showFeatures() {
    const features = `✨ Key Features:

🎴 Card-based Interface - Beautiful stacked card design
📱 Fully Responsive - Works on all devices
🎨 Theme Customization - Multiple color themes
💾 Local Storage - Automatic data persistence
⌨️ Keyboard Shortcuts - Navigate with arrow keys
🔍 Contact Search - Built-in search functionality
✅ Verified Badges - X/Instagram style verification
🌈 Smooth Animations - Professional transitions
♿ Accessible - ARIA labels and semantic HTML`;
    alert(features);
}

function showVersion() {
    const version = `📌 Version Information:

Version: 1.0.0
Release Date: February 8, 2026
Author: Mohammad Saad Raza
License: MIT License

Changelog:
• Initial release
• Card-based UI implementation
• LocalStorage integration
• Theme customization
• Responsive design
• Keyboard shortcuts
• Navigation bar`;
    alert(version);
}

function showAllCards() {
    if (contacts.length === 0) {
        showNotification('No contacts available', 'info');
        return;
    }
    
    const cardList = contacts.map((contact, index) => 
        `${index + 1}. ${contact.fullName} - ${contact.homeTown} (${contact.category})`
    ).join('\n');
    
    alert(`📇 All Contacts (${contacts.length}):\n\n${cardList}`);
}

function showCardStats() {
    if (contacts.length === 0) {
        showNotification('No contacts available', 'info');
        return;
    }
    
    const stats = {
        total: contacts.length,
        emergency: contacts.filter(c => c.category === 'Emergency').length,
        important: contacts.filter(c => c.category === 'Important').length,
        urgent: contacts.filter(c => c.category === 'Urgent').length,
        noRush: contacts.filter(c => c.category === 'No Rush').length,
        online: contacts.filter(c => c.status === 'online').length,
        offline: contacts.filter(c => c.status === 'offline').length,
        busy: contacts.filter(c => c.status === 'busy').length
    };
    
    const statsMessage = `📊 Contact Statistics:

Total Contacts: ${stats.total}

By Category:
🚨 Emergency: ${stats.emergency}
⭐ Important: ${stats.important}
⚡ Urgent: ${stats.urgent}
😌 No Rush: ${stats.noRush}

By Status:
🟢 Online: ${stats.online}
⚫ Offline: ${stats.offline}
🔴 Busy: ${stats.busy}`;
    
    alert(statsMessage);
}

function exportCards() {
    if (contacts.length === 0) {
        showNotification('No contacts to export', 'info');
        return;
    }
    
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contacts_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Contacts exported successfully!', 'success');
}

function clearAllContacts() {
    if (contacts.length === 0) {
        showNotification('No contacts to clear', 'info');
        return;
    }
    
    const confirmed = confirm(`Are you sure you want to delete all ${contacts.length} contacts? This action cannot be undone.`);
    
    if (confirmed) {
        contacts = [];
        saveContactsToStorage();
        renderCards();
        updateNavbarCardList();
        updateCardCount();
        showNotification('All contacts cleared!', 'success');
    }
}

function importContacts() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const importedContacts = JSON.parse(event.target.result);
                
                if (!Array.isArray(importedContacts)) {
                    showNotification('Invalid file format', 'error');
                    return;
                }
                
                contacts = importedContacts;
                saveContactsToStorage();
                renderCards();
                updateNavbarCardList();
                updateCardCount();
                showNotification(`Imported ${importedContacts.length} contacts!`, 'success');
            } catch (error) {
                showNotification('Error importing file', 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function showHelp() {
    const help = `❓ Help & Keyboard Shortcuts:

Navigation:
• ↑ / ← : Previous contact
• ↓ / → : Next contact
• Ctrl/Cmd + N : New contact
• Esc : Close form

Features:
• Click + button to add contact
• Use navbar to navigate and manage
• Click color circles to change theme
• All data saved automatically

Console Commands:
• contactManager.help() - Show all commands
• contactManager.getAll() - View all contacts
• contactManager.add(...) - Add contact

For more help, press F12 and type:
contactManager.help()`;
    alert(help);
}


// ============================================
// FORM MODAL FUNCTIONS
// ============================================

function openForm() {
    DOM.formContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Smooth entrance animation
    DOM.formContainer.style.opacity = '0';
    DOM.formContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';
    
    requestAnimationFrame(() => {
        DOM.formContainer.style.opacity = '1';
        DOM.formContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

function closeForm() {
    // Smooth exit animation
    DOM.formContainer.style.opacity = '0';
    DOM.formContainer.style.transform = 'translate(-50%, -50%) scale(0.9)';
    
    setTimeout(() => {
        DOM.formContainer.classList.remove('active');
        DOM.contactForm.reset();
        document.body.style.overflow = 'auto';
        DOM.formContainer.style.transform = 'translate(-50%, -50%)';
    }, 300);
}


// ============================================
// FORM SUBMISSION & VALIDATION
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
        imageUrl: DOM.inputs.url.value.trim(),
        fullName: DOM.inputs.fullName.value.trim(),
        homeTown: DOM.inputs.homeTown.value.trim(),
        purpose: DOM.inputs.purpose.value.trim(),
        priority: document.querySelector('input[name="priority"]:checked')
    };

    if (!validateFormData(formData)) {
        return;
    }

    const newContact = createContact(formData);
    contacts.push(newContact);
    
    saveContactsToStorage();
    renderCards();
    closeForm();
    
    showNotification('Contact added successfully!', 'success');
}

function validateFormData(data) {
    // Validate image URL
    if (!data.imageUrl || !isValidUrl(data.imageUrl)) {
        showNotification('Please enter a valid image URL', 'error');
        return false;
    }

    // Validate full name
    if (!data.fullName || data.fullName.length < 2) {
        showNotification('Please enter a valid name (minimum 2 characters)', 'error');
        return false;
    }

    // Validate home town
    if (!data.homeTown || data.homeTown.length < 2) {
        showNotification('Please enter a valid home town (minimum 2 characters)', 'error');
        return false;
    }

    // Validate purpose
    if (!data.purpose || data.purpose.length < 3) {
        showNotification('Please enter a valid purpose (minimum 3 characters)', 'error');
        return false;
    }

    // Validate category selection
    if (!data.priority) {
        showNotification('Please select a category', 'error');
        return false;
    }

    return true;
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

function createContact(data) {
    return {
        id: Date.now(),
        imageUrl: data.imageUrl,
        fullName: data.fullName,
        homeTown: data.homeTown,
        purpose: data.purpose,
        category: data.priority.value,
        status: getRandomStatus(),
        rating: getRandomRating(),
        timestamp: new Date().toISOString()
    };
}


// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}


// ============================================
// LOCAL STORAGE FUNCTIONS
// ============================================

function saveContactsToStorage() {
    try {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
        console.error('Error saving contacts:', error);
        showNotification('Failed to save contacts', 'error');
    }
}

function loadContactsFromStorage() {
    try {
        const storedContacts = localStorage.getItem('contacts');
        contacts = storedContacts ? JSON.parse(storedContacts) : getDefaultContacts();
        
        if (!storedContacts) {
            saveContactsToStorage();
        }
    } catch (error) {
        console.error('Error loading contacts:', error);
        contacts = getDefaultContacts();
    }
}

function getDefaultContacts() {
    return [
        {
            id: 1,
            imageUrl: 'https://i.pinimg.com/736x/9c/d2/aa/9cd2aaa05f5bb582e77af885c106a6b8.jpg',
            fullName: 'Sara Khan',
            homeTown: 'Mumbai',
            purpose: 'Business meeting',
            category: 'Important',
            status: 'online',
            rating: 4,
            timestamp: new Date().toISOString()
        },
        {
            id: 2,
            imageUrl: 'https://i.pravatar.cc/150?img=12',
            fullName: 'Alex Morgan',
            homeTown: 'Delhi',
            purpose: 'Project discussion',
            category: 'Urgent',
            status: 'offline',
            rating: 3,
            timestamp: new Date().toISOString()
        },
        {
            id: 3,
            imageUrl: 'https://i.pinimg.com/736x/9f/af/ef/9fafefb81b17627e4bc6fe2d4fb4864c.jpg',
            fullName: 'Priya Singh',
            homeTown: 'Kolkata',
            purpose: 'Follow up call',
            category: 'Emergency',
            status: 'busy',
            rating: 5,
            timestamp: new Date().toISOString()
        }
    ];
}


// ============================================
// CARD RENDERING
// ============================================

function renderCards() {
    DOM.cardStack.innerHTML = '';

    if (contacts.length === 0) {
        renderEmptyState();
        updateNavbarCardList();
        updateCardCount();
        return;
    }

    // Ensure current index is valid
    if (currentIndex >= contacts.length) {
        currentIndex = 0;
    }

    // Render up to 3 visible cards in stack
    const maxVisibleCards = Math.min(3, contacts.length);

    for (let i = 0; i < maxVisibleCards; i++) {
        const contactIndex = (currentIndex + i) % contacts.length;
        const contact = contacts[contactIndex];
        const card = createCardElement(contact, i + 1);
        DOM.cardStack.appendChild(card);
    }
    
    // Update navbar
    updateNavbarCardList();
    updateCardCount();
}

function createCardElement(contact, position) {
    const card = document.createElement('div');
    card.className = `card card${position}`;
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', `Contact: ${contact.fullName}`);

    card.innerHTML = `
        <div class="profile">
            <img 
                src="${contact.imageUrl}" 
                alt="${contact.fullName}" 
                loading="lazy"
                onerror="this.src='https://i.pravatar.cc/150?img=${contact.id}'">
            <div class="status ${contact.status}" 
                 aria-label="Status: ${contact.status}"
                 title="${capitalize(contact.status)}">
            </div>
        </div>
        
        <div class="content">
            <h3>
                ${contact.fullName}
                <span class="verified-badge" aria-label="Verified" title="Verified contact">
                    <svg viewBox="0 0 22 22" aria-hidden="true">
                        <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                    </svg>
                </span>
            </h3>
            
            <p>
                <span class="label">Home town</span>
                <span class="value">${contact.homeTown}</span>
            </p>
            
            <p>
                <span class="label">Purpose</span>
                <span class="value">${contact.purpose}</span>
            </p>
            
            <p>
                <span class="label">Category</span>
                <span class="value">${contact.category}</span>
            </p>
            
            <div class="rating" aria-label="Rating: ${contact.rating} out of 5 stars">
                ${generateStarRating(contact.rating)}
            </div>
        </div>
        
        <div class="buttons">
            <button 
                class="call-button" 
                aria-label="Call ${contact.fullName}"
                onclick="handleCall('${escapeHtml(contact.fullName)}')">
                <i class="fas fa-phone" aria-hidden="true"></i>
                Call
            </button>
            
            <button 
                class="message-button" 
                aria-label="Message ${contact.fullName}"
                onclick="handleMessage('${escapeHtml(contact.fullName)}')">
                <i class="fas fa-comment" aria-hidden="true"></i>
                Message
            </button>
        </div>
    `;

    return card;
}

function renderEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <i class="fas fa-address-book"></i>
        <h3>No Contacts Yet</h3>
        <p>Click the + button to add your first contact</p>
    `;
    DOM.cardStack.appendChild(emptyState);
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= rating ? 'fas fa-star' : 'far fa-star';
        stars += `<i class="${starClass}" aria-hidden="true"></i>`;
    }
    return stars;
}


// ============================================
// CARD NAVIGATION
// ============================================

function showNextCard() {
    if (contacts.length === 0) return;
    
    // Add transitioning class for smooth animation
    DOM.cardStack.classList.add('transitioning');
    
    currentIndex = (currentIndex + 1) % contacts.length;
    renderCards();
    
    // Remove transitioning class after animation
    setTimeout(() => {
        DOM.cardStack.classList.remove('transitioning');
    }, 600);
}

function showPreviousCard() {
    if (contacts.length === 0) return;
    
    // Add transitioning class for smooth animation
    DOM.cardStack.classList.add('transitioning');
    
    currentIndex = (currentIndex - 1 + contacts.length) % contacts.length;
    renderCards();
    
    // Remove transitioning class after animation
    setTimeout(() => {
        DOM.cardStack.classList.remove('transitioning');
    }, 600);
}


// ============================================
// KEYBOARD SHORTCUTS
// ============================================

function handleKeyboardShortcuts(e) {
    // Don't intercept if form is open
    if (DOM.formContainer.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeForm();
        }
        return;
    }
    
    switch(e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
            e.preventDefault();
            showPreviousCard();
            break;
            
        case 'ArrowDown':
        case 'ArrowRight':
            e.preventDefault();
            showNextCard();
            break;
            
        case 'n':
        case 'N':
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                openForm();
            }
            break;
    }
}


// ============================================
// THEME COLOR FUNCTIONS
// ============================================

function handleColorChange(e) {
    const colorOption = e.currentTarget;
    const color = colorOption.getAttribute('data-color');

    // Update active state
    DOM.colorOptions.forEach(option => {
        option.querySelector('.color-preview').classList.remove('active');
    });
    colorOption.querySelector('.color-preview').classList.add('active');

    // Apply theme color
    applyThemeColor(color);
    
    // Save preference
    saveThemePreference(color);
}

function applyThemeColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-dark', adjustColor(color, -20));
}

function adjustColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amount = Math.round(2.55 * percent);
    
    const R = Math.min(255, Math.max(0, (num >> 16) + amount));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    
    return `#${((R << 16) | (G << 8) | B).toString(16).padStart(6, '0')}`;
}

function saveThemePreference(color) {
    try {
        localStorage.setItem('themeColor', color);
    } catch (error) {
        console.error('Error saving theme:', error);
    }
}

function loadSavedTheme() {
    try {
        const savedColor = localStorage.getItem('themeColor');
        
        if (savedColor) {
            applyThemeColor(savedColor);
            
            DOM.colorOptions.forEach(option => {
                const color = option.getAttribute('data-color');
                const preview = option.querySelector('.color-preview');
                
                if (color === savedColor) {
                    preview.classList.add('active');
                } else {
                    preview.classList.remove('active');
                }
            });
        }
    } catch (error) {
        console.error('Error loading theme:', error);
    }
}


// ============================================
// CARD ACTION HANDLERS
// ============================================

function handleCall(name) {
    showNotification(`Calling ${name}...`, 'info');
    // Add your call functionality here
}

function handleMessage(name) {
    showNotification(`Opening message to ${name}...`, 'info');
    // Add your messaging functionality here
}


// ============================================
// UTILITY FUNCTIONS
// ============================================

function getRandomStatus() {
    const statuses = ['online', 'offline', 'busy'];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomRating() {
    return Math.floor(Math.random() * 3) + 3; // Returns 3, 4, or 5
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
