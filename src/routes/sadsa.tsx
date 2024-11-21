import { TextField } from "@mui/material";


const [searchTerm, setSearchTerm] = React.useState('');


const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
};


<TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                    onChange={handleSearch}
                    value={searchTerm}
                    placeholder="Search desserts..."
                    sx={{ mb: 2 }}
                />