import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Paper, IconButton} from '@mui/material';
import {Search} from '@mui/icons-material';

/* Paper is some white background with some elevation that seems to be floating on the top */
/* mr = margin on small devices sm = 5 -> specific styles for specific devices */
/* The value of the key press is stored in here at 'e.target.value' */

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

  // a regular function that will accept a submit event 
  // prevent reload of page again and again with form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
        navigate(`/search/${searchTerm}`); // navigates to that search term then 'searchid' gets populated in SearchFeed
        // In the SearchFeed, we can read this search term recall our api using useEffect to give us the search videos
        // Finally, render out the videos using our already built-in videos component

        // reset the search term to an empty string at the end
        setSearchTerm('');
    }
  }

  return (
    <Paper
        component="form"
        onSubmit={handleSubmit} // we pass our query over to the url using handleSubmit
        sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            pl: 2,
            boxShadow: 'none',
            mr: {sm:5}
        }}
    >  
        <input
            className="search-bar"
            placeholder="Search..."
            value={searchTerm} // allow us to query
            onChange={(e)=>setSearchTerm(e.target.value)} // update search term after key press event
        />
        <IconButton type="submit" sx={{p:'10px', color: 'red'}}>
            <Search/>
        </IconButton> 
    </Paper>
  )
}

export default SearchBar