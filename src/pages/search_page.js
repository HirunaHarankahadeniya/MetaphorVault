import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchBar from "../components/searchbar";
import MetaphorTable from "../components/metaphor_table";

export const SearchPage = () => {
    const [data, setData] = useState([])
    return (
        <Box margin={"3rem"}>
            <SearchBar setData={setData}/>
            <MetaphorTable data={data}/>
        </Box>
    );
}