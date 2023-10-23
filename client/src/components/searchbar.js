import React, { useState } from 'react';
// import makeStyles from '@mui/styles/makeStyles';
import {TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, Box, Grid, Typography} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import MultipleSelectCheckmarks from './multiple_select_box';
import SearchAll from '../api/services/search_all';
import SearchCategories from '../api/services/search_categories';
import { async } from 'q';

const theme = createTheme();
const rootStyles = {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2),
    justifyContent : 'center'
};

const searchInputStyles  = { 
    marginRight: theme.spacing(2),
    width:400
};

const searchButtonStyles = {
    marginRight: theme.spacing(2),
};

const dropdownStyles = {
    marginRight: theme.spacing(2),
};

const checkboxStyles = {
    // marginLeft: 'auto',
};


const SearchBar = ({setData}) => {
    // const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState([]);
    const [checked, setChecked] = useState(false);

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event) => {
      const {
        target: { value },
      } = event;
      setCategory(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSearch = async () => {
        if (category.length === 0) {
            try {
                const response = await SearchAll(searchTerm)
                setData(response.data.hits)
                console.log(response.data.hits)
            } catch (error) {
                console.log(error)
            }
        }
        else {  
            try {
                const response = await SearchCategories(searchTerm, category)
                setData(response.data.hits)
                console.log(response.data.hits)
            } catch (error) {
                console.log(error)
            }
        }
        // handle search logic here
    };

    return (
        <>
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <Box sx={{
                    display:'flex',
                    alignItems:'center'
                }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField 
                            label="Search" 
                            variant="standard" 
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            sx={searchInputStyles}
                        />
                    </Box>
                    <MultipleSelectCheckmarks category={category} handleCategoryChange={handleCategoryChange} sx={dropdownStyles}/>
                    <Button
                        sx={searchButtonStyles}
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        size='small'
                    >
                        Search
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={4}>

            </Grid>
        </Grid>
        </>
    );
};

export default SearchBar;
