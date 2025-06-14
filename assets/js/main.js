// Set copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Load and display recent notes
async function loadRecentNotes() {
    const notesContainer = document.getElementById('recentNotes');
    if (!notesContainer) return;

    // Show loading state
    notesContainer.innerHTML = '<p class="loading">Loading recent notes...</p>';

    try {
        // Fetch notes data
        const response = await fetch('/notes.json');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const notes = await response.json();
        
        // Process and display notes
        if (notes.length > 0) {
            notesContainer.innerHTML = notes
                .slice(0, 3) // Get 3 most recent
                .map(note => `
                    <div class="note-card">
                        <h3><a href="${note.url}">${note.title}</a></h3>
                        <div class="note-meta">
                            <time datetime="${note.date}">
                                ${new Date(note.date).toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric', 
                                    year: 'numeric'
                                })}
                            </time>
                        </div>
                        <div class="note-excerpt">${note.excerpt}</div>
                        <a href="${note.url}" class="read-more">
                            Read more <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                `)
                .join('');
        } else {
            notesContainer.innerHTML = '<p>No notes found.</p>';
        }
    } catch (error) {
        console.error('Error loading notes:', error);
        notesContainer.innerHTML = `
            <p class="error">Failed to load notes. 
            <a href="/notes/">View all notes</a></p>
        `;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadRecentNotes();
    
    // Set active navigation link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});