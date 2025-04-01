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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

export const Popup = ({ 
  open, 
  onClose,
  websiteName = "Example Website", // Add default value
}) => {
  const handleReject = () => {
    console.log("Access denied");
    onClose();
  };

  const handleApprove = () => {
    console.log("Access granted");
    onClose();
  };

  const requestedData = [
    "Name",
    "Aadhaar Number"
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        fontWeight: "bold",
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <WarningIcon color="warning" />
        Data Sharing Request
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle1" color="text.primary">
            <strong>{websiteName}</strong> is requesting access to your Aadhaar information:
          </Typography>

          <List>
            {requestedData.map((item, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <InfoIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>

          <Divider />

          <Box sx={{ 
            backgroundColor: '#fff3e0', 
            p: 2, 
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <WarningIcon color="warning" />
            <Typography variant="body2" color="text.secondary">
              By approving, you consent to share this information with {websiteName}.
              Make sure you trust this website before proceeding.
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1, backgroundColor: '#f5f5f5' }}>
        <Button
          onClick={handleReject}
          color="error"
          variant="contained"
          startIcon={<CloseIcon />}
        >
          Deny Access
        </Button>
        <Button
          onClick={handleApprove}
          color="success"
          variant="contained"
          startIcon={<CheckIcon />}
        >
          Allow Access
        </Button>
      </DialogActions>
    </Dialog>
  );
};
