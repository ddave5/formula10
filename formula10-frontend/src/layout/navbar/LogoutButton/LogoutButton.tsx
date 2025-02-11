import { useTranslation } from "react-i18next";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/AuthSlice";
import { Button, ButtonProps, styled } from "@mui/material";
import { purple } from "@mui/material/colors";

const Logout = () => {

    const dispatch = useDispatch();

    const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
      }));


    const { t } = useTranslation();
    return (
        <ColorButton variant="text" endIcon={<IoMdLogOut />} onClick={() => dispatch(logout())}>
            { t('navbar.logout') } 
        </ColorButton>
  )
}

export default Logout