import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Chip,
  CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddDocumentDialog from "../components/AddDocument";
const UserDashboard = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const mockRequests = [
    {
      id: 1,
      documentId: "DOC001",
      documentType: "Aadhar Card",
      issuerName: "UIDAI",
      status: "Approved",
      timestamp: Date.now()
    },
    {
      id: 2,
      documentId: "DOC002",
      documentType: "Pan Card",
      issuerName: "Income Tax Dept",
      status: "Pending",
      timestamp: Date.now() - 86400000
    }
  ];
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRequests(mockRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDocument = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSubmitDocument = (formData) => {
    console.log('Submitted:', formData);
    setOpenDialog(false);
  };
  const getStatusChipProps = (status) => {
    switch (status) {
      case 'Approved':
        return { color: 'success', variant: 'filled' };
      case 'Pending':
        return { color: 'warning', variant: 'filled' };
      default:
        return { color: 'error', variant: 'filled' };
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Documents
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddDocument}
        >
          Add Verification Request
        </Button>
      </Box>

      <Paper elevation={3}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : requests.length === 0 ? (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <Typography color="text.secondary">
              No verification requests found
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Document ID</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Issuer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow 
                    key={request.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {request.documentId}
                    </TableCell>
                    <TableCell>{request.documentType}</TableCell>
                    <TableCell>{request.issuerName}</TableCell>
                    <TableCell>
                      <Chip 
                        label={request.status}
                        size="small"
                        {...getStatusChipProps(request.status)}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(request.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
      <AddDocumentDialog 
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDocument}
      />
    </Container>
  );
};

export default UserDashboard;