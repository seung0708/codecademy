import '../styles/Dropdown.css';

const Dropdown = ({categories, selectedCategory, setSelectedCategory}) => {
  return (
    <div className="dropdown">
      <button>
        <select className="dropdown-content" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            {categories.map(category => (
                <option key={category} value={category} defaultValue={category === 'hot'}>{category}</option>
            ))}
        </select>
        <svg 
          height="16" 
          fill="currentColor" 
          viewBox="0 0 20 20" 
          width="16" 
          xmlns="http://www.w3.org/2000/svg"> 
            <path d="M10 13.02a.755.755 0 0 1-.53-.22L4.912 8.242A.771.771 0 0 1 4.93 7.2a.771.771 0 0 1 1.042-.018L10 11.209l4.028-4.027a.771.771 0 0 1 1.042.018.771.771 0 0 1 .018 1.042L10.53 12.8a.754.754 0 0 1-.53.22Z"></path>
        </svg>
      </button>
    </div>
  )
}

export default Dropdown;