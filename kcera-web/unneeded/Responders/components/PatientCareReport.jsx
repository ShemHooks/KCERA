import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  TextField,
  Box,
  Stack,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper

} from '@mui/material';

  import PatientCareReportApi from '../services/PatientCareReportApi';

const PatientCareReport = ({ details }) => {

 const requestId = details.alert_request.id

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    // console.log('details', requestId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [selected, setSelected] = useState(null);

  const handleChange = (value) => {
    setSelected(prev => (prev === value ? null : value));
  };


    const [civilStatus, setCivilStatus] = useState('')

    const [gender, setGender] = useState('')

  const [careBy, setCareBy] = useState([]);

  const handleCareByChange = (value) => {
    setCareBy((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );

  };

  const [trauma, setTrauma] = useState(false)
  const [medical, setMedical] = useState(false)

  const [levelOfConciousness, setLevelofConsiousness] = useState('')

  const handleConsiousnessChange = (value) => {
    setLevelofConsiousness(prev => (prev === value ? null : value));
  };


  const [formData, setFormData] = useState({
      reportNo: '',
      lastName: '',
      firstName: '',
      middleInitial: '',
      birthDate: '',
      address: '',
      chiefComplaint: '',
      // signsAndSymptoms: '',
      // allergies: '',
      // medication: '',
      // pastHistory: '',
      // oralIntake: '',
      // priorEvent: '',
      VStime: '',
      VSBP:'',
      VSPR:'',
      VSRR:'',
      VStemp: '',
      // VSsp02: '',
      // VSgcs: '',
      // VScr:''
});

  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const submitPatientCareReport = () => {
      
      const payload = {
          requestId,
        ...formData,
          triage: selected,
          trauma,
          medical, 
          gender,
          civilStatus,
          careBy,
          levelOfConciousness
      }

      PatientCareReportApi(payload)
  }

  return (
    <div>


      <div className='mt-4'>
        <Button onClick={handleClick} variant="contained">
          Submit Patient Care Report
        </Button>

      </div>

      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>
          Patient Care Report

        </DialogTitle>

        <DialogContent dividers>
          <FormControl component="fieldset">
            <div>
              <TextField 
              label=' Report No.' 
              name='reportNo'
              value={formData.reportNo}
              onChange={handleInputChange}
              />
            </div>
            <div>
              <FormLabel component="legend">Triage</FormLabel>

              <FormControlLabel value="red" control={<Checkbox sx={{ color: 'red', '&.Mui-checked': { color: 'red' } }} checked={selected === 'red'} onChange={() => handleChange('red')} />} label="Red / Immediate" />
              <FormControlLabel value="yellow" control={<Checkbox sx={{ color: 'yellow', '&.Mui-checked': { color: 'yellow' } }} checked={selected === 'yellow'} onChange={() => handleChange('yellow')} />} label="Yellow / Delayed" />
              <FormControlLabel value="green" control={<Checkbox sx={{ color: 'green', '&.Mui-checked': { color: 'green' } }} checked={selected === 'green'} onChange={() => handleChange('green')} />} label="Green / Minor" />
              <FormControlLabel value="black" control={<Checkbox sx={{ color: 'black', '&.Mui-checked': { color: 'black' } }} checked={selected === 'black'} onChange={() => handleChange('black')} />} label="Black / Deceased" />
            </div>
            <hr />
            <div>
              <FormControlLabel value='true' control={<Checkbox checked={trauma} onChange={(e)=>setTrauma(e.target.checked)} />} label='Trauma' />
              <FormControlLabel value='true' control={< Checkbox checked={medical} onChange={(e)=>setMedical(e.target.checked)} />} label='Medical' />
            </div>
            <hr />
            <div>
              <FormLabel>Patient Information</FormLabel>
              <Box component="form" noValidate autoComplete="off" sx={{ width: '100%' }}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                
                <TextField 
                  fullWidth 
                  name='lastName'
                  variant="outlined" 
                  label="Last Name" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  />

                  <TextField 
                  fullWidth 
                  name='firstName'
                  variant="outlined" 
                  label="First Name" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  />

                  <TextField 
                  fullWidth 
                  name='middleInitial'
                  variant="outlined" 
                  label="Middle Initial" 
                  value={formData.middleInitial

                  }
                  onChange={handleInputChange}
                  />

                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Birth Date"
                    name='birthDate'
                    type="date"
                    focused
                    value={formData.birthDate}
                    onChange={handleInputChange}
                  />

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Sex"
                    select
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value=""></MenuItem >
                    <MenuItem value="Male">Male</MenuItem >
                    <MenuItem value="Female">Female</MenuItem >
                  </TextField>

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Civil Status"
                    select
                    onChange={(e) => setCivilStatus(e.target.value)}
                  >
                    <MenuItem value=""></MenuItem >
                    <MenuItem value="Single">Single</MenuItem >
                    <MenuItem value="Married">Married</MenuItem >
                    <MenuItem value="Widowed">Widowed</MenuItem >
                    <MenuItem value="Separated">Separated</MenuItem >
                  </TextField>
                </Stack>
              </Box>

              <hr />
              <br />
              <TextField 
              variant='outlined' 
              fullWidth 
              label='Address' 
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              />
              <br />
              <br />
              <hr />

            </div>

            <div>
              <FormLabel>Care on Progress upon Arrival</FormLabel><br />

              <FormControlLabel value='bystander'
                control={
                  <Checkbox
                    checked={careBy.includes('bystander')}
                    onChange={() => handleCareByChange('bystander')}
                  />
                }
                label='Bystander' />

              <FormControlLabel value='family'
                control={
                  <Checkbox
                    checked={careBy.includes('family')}
                    onChange={() => handleCareByChange('family')}
                  />
                }
                label='Family' />

              <FormControlLabel value='brgy personnel'
                control={
                  <Checkbox
                    checked={careBy.includes('brgy personnel')}
                    onChange={() => handleCareByChange('brgy personnel')} />
                } label='Brgy Personnel' />

              <FormControlLabel value='pnp/cttramo'
                control={
                  <Checkbox
                    checked={careBy.includes('pnp/cttramoRAMO')}
                    onChange={() => handleCareByChange('pnp/cttramo')}
                  />
                } label='PNP/CTTRAMO' />

              <FormControlLabel value='medical proffesional'
                control={
                  <Checkbox
                    checked={careBy.includes('medical proffesional')}
                    onChange={() => handleCareByChange('medical proffesional')}
                  />
                } label='Medical Personnel' />

              <FormControlLabel value='ems'
                control={
                  <Checkbox
                    checked={careBy.includes('ems')}
                    onChange={() => handleCareByChange('ems')}
                  />} label='EMS' />

              <FormControlLabel value='others'
                control={
                  <Checkbox
                    checked={careBy.includes('others')}
                    onChange={() => handleCareByChange('others')}
                  />
                } label='Others' />

            </div>

            <hr />

            <div>
              <FormLabel>Level of Consciousness</FormLabel>
              <br />
              <FormControlLabel value='Alert' control={<Checkbox checked={levelOfConciousness === 'Alert'} onChange={() => handleConsiousnessChange('Alert')} />} label='Alert' />
              <FormControlLabel value='Pain' control={<Checkbox  checked={levelOfConciousness === 'Pain'} onChange={() => handleConsiousnessChange('Pain')} />} label='Pain' />
              <FormControlLabel value='Verbal' control={<Checkbox  checked={levelOfConciousness === 'Verbal'} onChange={() => handleConsiousnessChange('Verbal')}/>} label='Verbal' />
              <FormControlLabel value='Unresponsive'  control={<Checkbox checked={levelOfConciousness === 'Unresponsive'} onChange={() => handleConsiousnessChange('Unresponsive')} />} label='Unresponsive' />

            </div>

            <hr />

            <div>
              <FormLabel>Chief Complaint</FormLabel>
             
              <TextField 
              variant='outlined' 
              fullWidth 
              name='chiefComplaint'
              label='Chief Complaint' 
              value={formData.chiefComplaint}
              onChange={handleInputChange}
              />

            </div>

            <br />
            <hr />

            {/* <div>

              <FormLabel>SAMPLE</FormLabel><br />

              <TextField 
              variant='outlined' 
              label='Signs & Symtoms' 
              name='signAndSyntoms'
              value={formData.signsAndSymptoms}
              onChange={handleInputChange}
              />

              <TextField 
              variant='outlined' 
              label='Allergies' 
              name='allergies'
              value={formData.allergies}
              onChange={handleInputChange}
              />

              <TextField 
              variant='outlined' 
              label='Medication' 
              name='medication'
              value={formData.medication}
              onChange={handleInputChange}
              />

              <TextField 
              variant='outlined' 
              label='Past Med. History' 
              name='passMed'
              value={formData.pastHistory}
              onChange={handleInputChange}
              />

              <TextField 
              variant='outlined' 
              label='Last Oral Intake'
              name='lastOral'
              value={formData.oralIntake}
              onChange={handleInputChange} 
              />

              <TextField 
              variant='outlined' 
              name='eventPrior'
              label='Event Prior to Illness'
              value={formData.priorEvent}
              onChange={handleInputChange} 
              />

            </div>

            <br />
            <hr /> */}

            {/* <div>
              <FormLabel>Glassgow Coma Scale</FormLabel>

              <TextField
                fullWidth
                variant="outlined"
                label="EYE"
                select
              >
                <MenuItem ></MenuItem>
                <MenuItem>Open Sponteneously</MenuItem>
                <MenuItem>Open to Voice</MenuItem>
                <MenuItem>Open to Pain</MenuItem>
                <MenuItem>No Response</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="outlined"
                label="Verbal"
                select
              >
                <MenuItem ></MenuItem>
                <MenuItem>Oriented/ Converse normaly</MenuItem>
                <MenuItem>Confused/ Disoreinted</MenuItem>
                <MenuItem>Incoherent words</MenuItem>
                <MenuItem>Incomprehensible</MenuItem>
                <MenuItem>No Verbal response</MenuItem>
              </TextField>

              <TextField
                fullWidth
                variant="outlined"
                label="Motor"
                select
              >
                <MenuItem ></MenuItem>
                <MenuItem>Obey Commands</MenuItem>
                <MenuItem>Localized Pain</MenuItem>
                <MenuItem>Withdraws from Pain</MenuItem>
                <MenuItem>Flexion/ Decorticate</MenuItem>
                <MenuItem>Extension/ Decerebrate</MenuItem>
                <MenuItem>No Motor Response</MenuItem>
              </TextField>


            </div>
            <br />
            <hr /> */}

            <div>
              <FormLabel>Vital Signs</FormLabel>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Time</TableCell>
                      <TableCell>Blood Pressure</TableCell>
                      <TableCell>Pulse Rate</TableCell>
                      <TableCell>Respiratory Rate</TableCell>
                      <TableCell>Temperature</TableCell>
                      {/* <TableCell>Sp02</TableCell>
                      <TableCell>GCS</TableCell>
                      <TableCell>Capillary Refill</TableCell> */}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      {/* time */}
                      <TableCell >
                        <TextField 
                       
                          fullWidth 
                          name='VStime'
                          type='time'
                          label='' 
                          value={formData.VStime}
                          onChange={handleInputChange}
                          
                          />
                      </TableCell>

                      {/* BP */}
                      <TableCell>
                        <TextField 
                        fullWidth 
                        name='VSBP'
                        label='mm/HG' 
                        value={formData.VSBP}
                        onChange={handleInputChange}
                        />
                      </TableCell>

                      {/* PR */}
                      <TableCell>
                        <TextField 
                        fullWidth 
                        name='VSPR'
                        label='bpm' 
                        value={formData.VSPR}
                        onChange={handleInputChange}
                        />

                      </TableCell>

                      {/* RR */}
                      <TableCell>
                        <TextField 
                        fullWidth 
                        name='VSRR'
                        label='cbpm' 
                        value={formData.VSRR}
                        onChange={handleInputChange}
                        />

                      </TableCell>

                      {/* temp */}
                      <TableCell >
                        <TextField 
                        fullWidth 
                        name='VStemp'
                        label='℃' 
                        value={formData.VStemp}
                        onChange={handleInputChange}
                        />
                      </TableCell>

                      {/* sp02
                      <TableCell>
                        <TextField 
                        fullWidth 
                        name='VSsp02'
                        label='%' 
                        value={formData.VSsp02}
                        onChange={handleInputChange}
                        />
                      </TableCell>

                      {/* GCS */}
                      {/* <TableCell>
                        <TextField 
                        fullWidth 
                        name='VSgcs'
                        label=''
                        value={formData.VSgcs}
                        onChange={handleInputChange}
                        />
                      </TableCell> */}

                      {/* CR */}
                      {/* <TableCell>
                        <TextField 
                        fullWidth 
                        name='VScr'
                        label='seconds' 
                        value={formData.VScr  }
                        onChange={handleInputChange}
                        />
                      </TableCell> */} 

                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

            </div>

            <br />
            <hr />

            {/* <div>
              <FormLabel>Pulse</FormLabel>
              <br />

              <FormControlLabel control={<Checkbox />} label='Normal' />
              <FormControlLabel control={<Checkbox />} label='Bounding' />
              <FormControlLabel control={<Checkbox />} label='Thready' />
              <FormControlLabel control={<Checkbox />} label='Regular' />
              <FormControlLabel control={<Checkbox />} label='Irregular' />
            </div>

            <br />
            <hr />

            <div>

              <center><h1>SKIN</h1></center>

              <div>
                <FormLabel>Color</FormLabel>
                <br />

                <FormControlLabel control={<Checkbox />} label='Normal' />
                <FormControlLabel control={<Checkbox />} label='Cynotie' />
                <FormControlLabel control={<Checkbox />} label='Pale' />
                <FormControlLabel control={<Checkbox />} label='Flushed' />
                <FormControlLabel control={<Checkbox />} label='Jaundice' />
                <FormControlLabel control={<Checkbox />} label='Mottled' />
                <FormControlLabel control={<Checkbox />} label='Rashed' />

              </div>

              <br />
              <hr />

              <div>
                <FormLabel>Temperature</FormLabel>

                <br />

                <FormControlLabel control={<Checkbox />} label='Normal' />
                <FormControlLabel control={<Checkbox />} label='Warm' />
                <FormControlLabel control={<Checkbox />} label='Cold' />

              </div>

              <br />
              <hr />

              <div>
                <FormLabel>Moisture</FormLabel>
                <br />

                <FormControlLabel control={<Checkbox />} label='Normal' />
                <FormControlLabel control={<Checkbox />} label='Moist' />
                <FormControlLabel control={<Checkbox />} label='Diaphoretic' />
                <FormControlLabel control={<Checkbox />} label='Dry' />

              </div>

            </div>

            <br /> */}



          </FormControl>


        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={submitPatientCareReport}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PatientCareReport;
