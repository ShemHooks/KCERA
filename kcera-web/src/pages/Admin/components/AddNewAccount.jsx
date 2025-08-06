import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import { GetDocTitle } from "../../../utils/hooks/useDocumentTitle";
import React, { useState } from "react";
import CreateNewAccount from "../API/CreateNewAccount";

const NewAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");

  const handleCreateAccount = async () => {
    try {
      const response = await CreateNewAccount(
        name,
        email,
        address,
        role,
        gender,
        phone
      );
      console.log("Account created successfully:", response);
    } catch (error) {
      console.log("Error creating account:", error);
    }
  };
  return (
    <>
      <h1 className="mt-6 ml-10 text-3xl">Add New Account</h1>
      <GetDocTitle title="KCERA: Add New Account" />
      <div className="flex flex-col gap-4 p-6">
        <TextField
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          required
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <TextField
          label="Address"
          type="text"
          variant="outlined"
          required
          fullWidth
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />

        <TextField
          label="Phone"
          type="tel"
          variant="outlined"
          required
          fullWidth
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="non-binary"
              control={<Radio />}
              label="Non Binary"
            />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="responder">Responder</MenuItem>
            <MenuItem value="driver">Driver</MenuItem>
            <MenuItem value="residents">Resident</MenuItem>
          </Select>
          <FormHelperText>Select the role for the new account</FormHelperText>
        </FormControl>

        <Button variant="contained" onClick={handleCreateAccount}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default NewAccount;
