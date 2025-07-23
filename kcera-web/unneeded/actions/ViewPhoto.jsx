import { use, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const ApprovalPhoto = ({id,live}) => {
    const [open, setOpen] = useState(false);

    return(
        <div>
            <Button variant="contained" onClick={()=> setOpen(true)} className="w-full ">
                View Images
            </Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Photo Preview</DialogTitle>
        <DialogContent className="flex gap-[10px]" >
          <div className="w-[50%]">
            <h1>User's Photo</h1>
          {id ? (
            <img
              src={id}
              alt="ID Preview"
              style={{ width: "100%", maxWidth: "900px", height: "100%" }}
              className="outline"
            />
          ) : (
            <p>No Photo Available</p>
          )}
        </div>

        <div className="w-[50%]">
          <h1>User's ID</h1>
              {live ? (
                  <img
                    src={live}
                    alt="ID Preview"
                    style={{ width: "100%", maxWidth: "900px", height: "auto" }}
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

export default ApprovalPhoto