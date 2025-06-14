// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Function to load recent notes on homepage
function loadRecentNotes() {
    if (document.getElementById('recentNotes')) {
        fetchNotes().then(notes => {
            const recentNotesContainer = document.getElementById('recentNotes');
            const recentNotes = notes.slice(0, 3); // Get 3 most recent notes
            
            recentNotes.forEach(note => {
                const noteCard = document.createElement('div');
                noteCard.className = 'note-card';
                noteCard.innerHTML = `
                    <h3>${note.title}</h3>
                    <div class="note-date">${note.date}</div>
                    <div class="note-excerpt">${note.excerpt}</div>
                    <a href="notes/${note.filename}" class="read-more">
                        Read more <i class="fas fa-arrow-right"></i>
                    </a>
                `;
                recentNotesContainer.appendChild(noteCard);
            });
        });
    }
}

// Function to load all notes in notes page
function loadAllNotes() {
    if (document.getElementById('allNotes')) {
        fetchNotes().then(notes => {
            const allNotesContainer = document.getElementById('allNotes');
            
            notes.forEach(note => {
                const noteItem = document.createElement('div');
                noteItem.className = 'note-item';
                noteItem.innerHTML = `
                    <h3><a href="${note.filename}">${note.title}</a></h3>
                    <div class="note-date">${note.date}</div>
                `;
                allNotesContainer.appendChild(noteItem);
            });
        });
    }
}

// Function to fetch notes from the notes directory
async function fetchNotes() {
    try {
        // In a real implementation, you would fetch this from your GitHub repo
        // For now, we'll simulate with some example notes
        return [
            {
                title: "Learning React Hooks",
                date: "June 10, 2023",
                excerpt: "Today I explored the useState and useEffect hooks in React...",
                filename: "react-hooks.md"
            },
            {
                title: "CSS Grid Deep Dive",
                date: "June 8, 2023",
                excerpt: "Spent the day mastering CSS Grid layout techniques...",
                filename: "css-grid.md"
            },
            {
                title: "JavaScript Closures",
                date: "June 5, 2023",
                excerpt: "Finally understood how closures work in JavaScript...",
                filename: "js-closures.md"
            }
        ];
    } catch (error) {
        console.error("Error fetching notes:", error);
        return [];
    }
}

// Initialize functions based on current page
document.addEventListener('DOMContentLoaded', function() {
    loadRecentNotes();
    loadAllNotes();
});