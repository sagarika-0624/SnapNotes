import React, { useState, useEffect } from 'react';
import './Notes.css';

const NotesPage = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false); // Controls the full-screen view
  const [expandedNote, setExpandedNote] = useState(null); // Stores the note to view in full screen
  const [categories, setCategories] = useState(['Work', 'Important', 'Personal', 'Business', 'Other']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newCategory, setNewCategory] = useState('');

  // Handle adding a new note
  const addNote = () => {
    if (noteTitle.trim() !== '' && noteText.trim() !== '') {
      const newNote = { title: noteTitle, text: noteText, category: selectedCategory };

      if (editingIndex !== null) {
        const updatedNotes = [...notes];
        updatedNotes[editingIndex] = newNote;
        setNotes(updatedNotes);
        setEditingIndex(null);
      } else {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
        setFilteredNotes(updatedNotes);
      }

      setNoteTitle(''); // Clear the title input
      setNoteText('');  // Clear the text input
    }
  };

  // Handle editing a note
  const editNote = (index) => {
    setNoteTitle(notes[index].title);
    setNoteText(notes[index].text);
    setEditingIndex(index);
  };

  // Handle deleting a note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
  };

  // Handle searching notes
  const handleSearch = () => {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  };

  // Sync filtered notes with notes list when search is cleared
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredNotes(notes);
    }
  }, [notes, searchQuery]);

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Handle expanding a note to full screen
  const expandNote = (note) => {
    setExpandedNote(note);
    setIsExpanded(true);
  };

  // Handle closing the expanded view
  const closeExpandedView = () => {
    setIsExpanded(false);
    setExpandedNote(null);
  };

  // Handle adding a new category
  const addCategory = () => {
    if (newCategory.trim() !== '' && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  // Filter notes by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) => note.category === selectedCategory);
      setFilteredNotes(filtered);
    }
  }, [notes, selectedCategory]);

  return (
    <div>
      {/* Background Video */}
      <video className="video-background" autoPlay loop muted>
        <source src="/src/Videos/SnapNotes.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="notes-page">
        <h2>My Notes</h2>

        <div className="notes-container">
          {/* Sidebar for categories */}
          <div className="sidebar">
            <h3>Categories</h3>
            <ul>
              <li 
                className={selectedCategory === 'All' ? 'active' : ''}
                onClick={() => setSelectedCategory('All')}>All</li>
              {categories.map((category, index) => (
                <li 
                  key={index} 
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => setSelectedCategory(category)}>
                  {category}
                </li>
              ))}
            </ul>
            <div className="add-category">
              <input
                type="text"
                placeholder="Add category..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button onClick={addCategory} className="add-category-button">
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>

          <div className="main-content">
            {/* Search bar */}
            <div className="note-controls">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className="search-button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            {/* Add note section */}
            <div className="add-note">
              <input
                type="text"
                placeholder="Title of the note..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Write a note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button onClick={addNote}>{editingIndex !== null ? 'Update' : 'Add'}</button>
            </div>

            {/* Notes grid */}
            <div className="notes-grid">
              {searchQuery !== '' && filteredNotes.length === 0 ? (
                <div className="no-results">No results found</div>
              ) : (
                filteredNotes.map((note, index) => (
                  <div key={index} className="note-item">
                    <h3>{note.title}</h3>
                    <p>{note.text}</p>
                    <div className="note-actions">
                      <button className="icon-button edit-button" onClick={() => editNote(index)}>
                        <i className="fas fa-pen"></i>
                      </button>
                      <button className="icon-button delete-button" onClick={() => deleteNote(index)}>
                        <i className="fas fa-trash"></i>
                      </button>
                      <button className="icon-button expand-button" onClick={() => expandNote(note)}>
                        <i className="fas fa-expand"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Full-screen modal for expanded note */}
            {isExpanded && expandedNote && (
              <div className="modal-overlay" onClick={closeExpandedView}>
                <div className="expanded-note" onClick={(e) => e.stopPropagation()}>
                  <button className="close-button" onClick={closeExpandedView}>
                    <i className="fas fa-times"></i>
                  </button>
                  <h3>{expandedNote.title}</h3>
                  <p>{expandedNote.text}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
