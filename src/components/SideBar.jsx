
import React from "react";
import {Stack}from '@mui/material';
import {categories} from '../utils/constants';

/* prepared a constants file that illustrates all the categories of sidebar */
/* sidebar as a row on mobile devices and column in a larger screen like desktop */
/* map each category and return a regular button for each, in-line style applied */
/* inline styling allows particular category to be selected and background color to be applied */
/* only the selected part is colored red and the rest of the side bar present */
/* opacity adds a bit more greyness */

/* const selectedCategory = 'New'; no need to do it manually as they are coming from props */
/* onClick={() => setSelectedCategory(category.name) ensures we update the category name */

const SideBar = ({selectedCategory, setSelectedCategory}) =>  (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: {sx: 'auto', md: '95%'},
        flexDirection: { md: 'column'},
      }}
    >
      {categories.map((category) => (
        <button
         className="category-btn"
         onClick={() => setSelectedCategory(category.name)}
         style ={{
            background: category.name === selectedCategory && '#FC1503',
            color: 'white'
         }}
         key={category.name}
        >
          <span 
           style ={{color: category.name === selectedCategory ? 'white' : 'red', 
           marginRight: '15px'}}
          >{category.icon}
          </span>
          <span
           style ={{opacity: category.name === selectedCategory ? '1' : '0.8'
           }}
          >{category.name}
          </span>  
        </button>
      ))}
    </Stack>
);

export default SideBar