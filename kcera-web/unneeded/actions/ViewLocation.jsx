import React from "react";
import { use, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const ViewLocation = ({ latitude, longitude }) => {
  const [open, setOpen] = useState(false);

  const googleMapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        className="w-full "
      >
        View Location
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Request Location Preview</DialogTitle>
        <DialogContent className="flex gap-[10px]">
          <div className="w-[500px] h-[500px]">
            <iframe
              src={googleMapUrl}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              style={{ border: 0 }}
              title="Google Maps Location"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewLocation;
