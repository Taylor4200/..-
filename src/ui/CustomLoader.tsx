import {Backdrop, CircularProgress} from "@mui/material";

export default function CustomLoader() {
    return <Backdrop
        sx={{color: '#D7571F'}}
        open={true}>
        <CircularProgress color="inherit" size={100} thickness={4}/>
    </Backdrop>
}