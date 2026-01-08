import React, { useState } from 'react';
import hogsData from '../porkers_data';

function App() {
  const [hogs, setHogs] = useState(hogsData);
  const [showGreasedOnly, setShowGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [expandedHogs, setExpandedHogs] = useState({});
  const [hiddenHogs, setHiddenHogs] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    specialty: '',
    greased: false
  });

  const handleToggleDetails = (hogName) => {
    setExpandedHogs(prev => ({
      ...prev,
      [hogName]: !prev[hogName]
    }));
  };

  const handleHideHog = (hogName) => {
    setHiddenHogs(prev => ({
      ...prev,
      [hogName]: true
    }));
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddHog = () => {
    const newHog = {
      ...formData,
      weight: parseFloat(formData.weight),
      "highest medal achieved": "none",
      image: "https://via.placeholder.com/200"
    };
    setHogs(prev => [...prev, newHog]);
    setFormData({
      name: '',
      weight: '',
      specialty: '',
      greased: false
    });
  };

  const getFilteredAndSortedHogs = () => {
    let filtered = hogs.filter(hog => !hiddenHogs[hog.name]);
    
    if (showGreasedOnly) {
      filtered = filtered.filter(hog => hog.greased);
    }

    if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'weight') {
      filtered = [...filtered].sort((a, b) => a.weight - b.weight);
    }

    return filtered;
  };

  const displayedHogs = getFilteredAndSortedHogs();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hogwarts Hogs</h1>
      
      {/* Filters and Sorting */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '20px' }}>
          <input
            type="checkbox"
            checked={showGreasedOnly}
            onChange={(e) => setShowGreasedOnly(e.target.checked)}
          />
          {' '}Greased Pigs Only?
        </label>

        <label>
          Sort by:
          {' '}
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="name">Name</option>
            <option value="weight">Weight</option>
          </select>
        </label>
      </div>

      {/* Add Hog Form */}
      <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h2>Add New Hog</h2>
        <div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Name:
              {' '}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Weight:
              {' '}
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleFormChange}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              Specialty:
              {' '}
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleFormChange}
                required
              />
            </label>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                name="greased"
                checked={formData.greased}
                onChange={handleFormChange}
              />
              {' '}Greased?
            </label>
          </div>
          <button onClick={handleAddHog}>Add Hog</button>
        </div>
      </div>

      {/* Hog Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {displayedHogs.map((hog) => (
          <div
            key={hog.name}
            className="ui card"
            aria-label="hog card"
            style={{ width: '250px', cursor: 'pointer' }}
          >
            <div className="content" onClick={() => handleToggleDetails(hog.name)}>
              <h3>{hog.name}</h3>
              <img
                src={hog.image}
                alt={`Photo of ${hog.name}`}
                style={{ width: '100%', height: 'auto' }}
              />
              
              {expandedHogs[hog.name] && (
                <div style={{ marginTop: '10px' }}>
                  <p>Specialty: {hog.specialty}</p>
                  <p>{hog.weight}</p>
                  <p>{hog.greased ? "Greased" : "Nongreased"}</p>
                  <p>{hog["highest medal achieved"]}</p>
                </div>
              )}
            </div>
            <div className="extra content">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleHideHog(hog.name);
                }}
              >
                Hide Me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;