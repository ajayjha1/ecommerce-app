import React from 'react'

export const LocalSearch = ({keyword, setKeyword, categories, setCopyCategories}) => {
    const handleSearchChange = (e) => {
        const keyword = e.target.value.toLowerCase();
        setKeyword(keyword);
        
        if (keyword.length > 0) {
          setCopyCategories(
            categories.filter(category =>
              [category.name].some(value =>
                String(value).toLowerCase().includes(keyword)
              )
            )
          );
        } else {
          setCopyCategories(categories);
        }
    };
  return (
    
    <input 
        type='search' 
        placeholder='filter' 
        value={keyword} 
        onChange={handleSearchChange} 
        className='form-control mb-4' 
    />
   
  )
}
