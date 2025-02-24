import { useTranslation } from "react-i18next";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/AuthSlice";
import { Button, ButtonProps, styled } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
      color: theme.palette.getContrastText(purple[500]),
    }));

  const logOut = () => {
    dispatch(logout());
    navigate('/');
  }

  const { t } = useTranslation();
  return (
      <ColorButton variant="text" endIcon={<IoMdLogOut />} onClick={() => logOut()}>
          { t('navbar.logout') } 
      </ColorButton>
  )
}

export default Logout