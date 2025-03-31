import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ViewDocument = ({ 
  open, 
  onClose, 
  selectedRequest, 
  onUpdateStatus 
}) => {
  const getBooleanText = (value) => value === 1 ? 'Yes' : 'No';

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Document Details</DialogTitle>
      <DialogContent dividers>
        {selectedRequest && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Name</Typography>
              <Typography>{selectedRequest.name||"N/A"}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Date of Birth</Typography>
              <Typography>{selectedRequest.dob||"N/A"}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Sex</Typography>
              <Typography>{selectedRequest.sex||"N/A"}</Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Contact Information</Typography>
              <Typography>Email: {selectedRequest.email||"N/A"}</Typography>
              <Typography>Mobile: {selectedRequest.mobile||"N/A"}</Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Education</Typography>
              <Typography>College: {selectedRequest.college||"N/A"}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">Verification Status</Typography>
              <Typography>Over 18: {getBooleanText(selectedRequest.isOver18)||"N/A"}</Typography>
              <Typography>College Student: {getBooleanText(selectedRequest.isCollegeStudent)||"N/A"}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        {selectedRequest?.status === "Pending" && (
          <>
            <Button
              onClick={() => onUpdateStatus(selectedRequest.id, "Rejected")}
              color="error"
              variant="contained"
              startIcon={<CloseIcon />}
            >
              Reject
            </Button>
            <Button
              onClick={() => onUpdateStatus(selectedRequest.id, "Approved")}
              color="success"
              variant="contained"
              startIcon={<CheckIcon />}
            >
              Approve
            </Button>
          </>
        )}
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewDocument;