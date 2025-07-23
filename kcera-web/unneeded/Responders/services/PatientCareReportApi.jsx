import React from 'react'
import { io } from 'socket.io-client';

const PatientCareReportApi = async (data) => {

  const socket = io("http://localhost:8080");

    const payload = {
  request_id : data.requestId,
  history_id : data.reportNo,
  triage : data.triage,
  trauma : data.trauma,
  medical : data.medical,
  patientLastName : data.lastName,
  patientFirstName : data.firstName,
  patientMiddleName : data.middleInitial,
  patientBirthDate : data.birthdDate,
  patientSex : data.gender,
  patientCivilStatus : data.civilStatus,
  address : data.address,
  care_onprogress_upon_arrival : Array.isArray(data.careBy) ? data.careBy[0] : data.careBy,
  time : data.VStime,
  bp : data.VSBP,
  pr : data.VSPR,
  rr : data.VSRR,
  temp : data.VStemp,

    }

 try{
    const response = await fetch("http://127.0.0.1:8000/api/storeReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload ),

    });

    if(response.ok){
        alert('submitted')
        socket.emit('SendPatientCareReport')
    }
 }catch(e){
    console.log(e)
 }


 
}

export default PatientCareReportApi
