import React, { useState } from "react";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);

  const handleSearch = () => {
    // Perform search logic here
    // Update the items state with the search results
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
