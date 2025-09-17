import { useState } from 'react';

const DropDown = ({ categoriesData, setDropDown }) => {
  const [filterTerm, setFilterTerm] = useState('');
  const filteredCategories = categoriesData.filter((category) =>
    category.title.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  };

  const submitHandle = (category) => {
    const encodedCategory = encodeURIComponent(category.title);
    window.location.href = `/products?category=${encodedCategory}`;
    setDropDown(false);
  };

  return (
    <div className='w-full bg-white border border-t-0 border-gray-200 rounded-b-md shadow-lg z-30'>
      <input
        type='search'
        value={filterTerm}
        onChange={handleFilterChange}
        placeholder='Search categories'
        className='w-full p-2'
      />
      {filteredCategories.map((category, index) => (
        <div
          key={index}
          className='flex items-center px-5 py-4 cursor-pointer hover:bg-blue-50 transition'
          onClick={() => submitHandle(category)}
        >
          <img
            src={category.image_Url}
            alt={category.title}
            className='w-6 h-6 object-contain mr-3 select-none'
            draggable={false}
          />
          <h3 className='text-[#393c41] font-medium select-none'>
            {category.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
