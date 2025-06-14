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
        return [
            {
                title: "Installing Arch Linux on Macbook Air 2019",
                date: "June 7, 2025",
                excerpt: "I might have made a mistake...",
                filename: "250607.md"
            },
            {
                title: "Fixing Arch Linux on my Macbook",
                date: "June 10, 2023",
                excerpt: "Spent the day trying to fix my laptop...",
                filename: "250610.md"
            },
            {
                title: "Making this website",
                date: "June 14, 2023",
                excerpt: "AI really made it easy...",
                filename: "250614.md"
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