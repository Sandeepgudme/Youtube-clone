import React from "react"; 
 
// list of category options
const categories = [ 
  "All", 
  "Music", 
  "Gaming", 
  "Live", 
  "News", 
  "Sports", 
  "Learning", 
  "Technology" 
]; 
 
const Categories = ({ setCategory }) => { // receive function to update selected category
  return ( 
    <div className="flex gap-3 p-3 overflow-x-auto bg-black text-white"> 
      {categories.map((cat, index) => ( // loop through categories
        <button 
          key={index} 
          onClick={() => setCategory(cat)} // set selected category on click
          className="bg-gray-800 px-4 py-1 rounded hover:bg-gray-600 whitespace-nowrap" 
        > 
          {cat} 
        </button> 
      ))} 
    </div> 
  ); 
}; 
 
export default Categories; // export component