import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
} from "@mui/material";
import { GetDocTitle } from "../../../utils/hooks/useDocumentTitle";

const NewAccount = () => {
  return (
    <>
      <h1 className="mt-6 ml-10 text-3xl">Add New Account</h1>
      <GetDocTitle title="KCERA: Add New Account" />
      <div></div>
    </>
  );
};

export default NewAccount;
