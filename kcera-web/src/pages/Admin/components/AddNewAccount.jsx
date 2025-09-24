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
      <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <main className="flex-1 p-6">
          <h1 className="mb-6 text-2xl font-semibold">Add New Account</h1>
          <GetDocTitle title="KCERA: Add New Account" />

          <div className="flex flex-col gap-4 p-6 text-white rounded-lg shadow bg-black/30 backdrop-blur-sm">
            <TextField
              label="Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              fullWidth
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />

            <TextField
              label="Email"
              type="email"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />

            <TextField
              label="Address"
              type="text"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />

            <TextField
              label="Phone"
              type="tel"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
            />

            <FormControl>
              <FormLabel sx={{ color: "white" }}>Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
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
              <InputLabel id="role-select-label " className="text-white">
                Role
              </InputLabel>
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
              <FormHelperText sx={{ color: "white" }}>
                Select the role for the new account
              </FormHelperText>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateAccount}
              sx={{ alignSelf: "flex-start" }}
            >
              Submit
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};

export default NewAccount;
