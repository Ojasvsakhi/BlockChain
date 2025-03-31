import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const ViewDocument = ({ 
  open, 
  onClose, 
  selectedRequest, 
  onUpdateStatus 
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Document Details</DialogTitle>
      <DialogContent dividers>
        {selectedRequest && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="subtitle2">Document Type</Typography>
            <Typography>{selectedRequest.documentType}</Typography>

            <Typography variant="subtitle2">Document ID</Typography>
            <Typography>{selectedRequest.documentId}</Typography>

            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Additional Information
            </Typography>
            {selectedRequest.additionalFields.map((field, index) => (
              <Box key={index}>
                <Typography variant="subtitle2">{field.label}</Typography>
                <Typography>{field.value}</Typography>
              </Box>
            ))}
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