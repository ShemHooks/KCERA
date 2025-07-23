import React from 'react'
import { use, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";


const ViewImage = ({img}) => {
  
    const [open, setOpen] = useState(false);

    return(
        <div>
            <Button variant="contained" onClick={()=> setOpen(true)} className="w-full ">
                View Images
            </Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Request Photo Preview</DialogTitle>
        <DialogContent className="flex gap-[10px]" >
          <div className="w-full">
            
          {img ? (
            <img
              src={img}
              alt="ID Preview"
              style={{ width: "100%", maxWidth: "900px", height: "100%" }}
              className="outline"
            />
          ) : (
            <p>No Photo Available</p>
          )}
        </div>

        
        </DialogContent>
      </Dialog>
        </div>
  )
}

export default ViewImage
