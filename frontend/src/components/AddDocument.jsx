import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import DeleteIcon from "@mui/icons-material/Delete";

const AddDocumentDialog = ({ open, onClose, onSubmit }) => {
  const initialFormState = {
    documentType: "",
    documentId: "",
    issuerName: "",
    additionalFields: [],
  };
  const [formData, setFormData] = useState(initialFormState);

  const [selectedField, setSelectedField] = useState("");
  const handleReset = () => {
    setFormData(initialFormState);
    setSelectedField("");
  };
  const availableFields = [
    { label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    { label: "Date of Birth", type: "date" },
    { label: "Mobile Number", type: "number" },
    { label: "Email", type: "email" },
    { label: "Address", type: "text" },
  ];

  const handleAddField = () => {
    if (selectedField) {
      const field = availableFields.find((f) => f.label === selectedField);
      setFormData((prev) => ({
        ...prev,
        additionalFields: [...prev.additionalFields, { ...field, value: "" }],
      }));
      setSelectedField("");
    }
  };

  const handleFieldChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      additionalFields: prev.additionalFields.map((field, i) =>
        i === index ? { ...field, value } : field
      ),
    }));
  };

  const handleRemoveField = (index) => {
    setFormData((prev) => ({
      ...prev,
      additionalFields: prev.additionalFields.filter((_, i) => i !== index),
    }));
  };

  const renderField = (field, index) => {
    switch (field.type) {
      case "select":
        return (
          <FormControl fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={field.value}
              label={field.label}
              onChange={(e) => handleFieldChange(index, e.target.value)}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "date":
        return (
          <TextField
            fullWidth
            type="date"
            label={field.label}
            value={field.value}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            type={field.type}
            label={field.label}
            value={field.value}
            onChange={(e) => handleFieldChange(index, e.target.value)}
          />
        );
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          mb: 2,
        }}
      >
        Add Verification Request
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            pt: 2,
            borderRadius: "0px",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Document Type</InputLabel>
            <Select
              value={formData.documentType}
              label="Document Type"
              onChange={(e) =>
                setFormData({ ...formData, documentType: e.target.value })
              }
            >
              <MenuItem value="Aadhar">Aadhar Card</MenuItem>
              <MenuItem value="PAN">PAN Card</MenuItem>
              <MenuItem value="Passport">Passport</MenuItem>
              <MenuItem value="DrivingLicense">Driving License</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Document ID"
            variant="outlined"
            value={formData.documentId}
            onChange={(e) =>
              setFormData({ ...formData, documentId: e.target.value })
            }
          />

          <FormControl fullWidth>
            <InputLabel>Issuer</InputLabel>
            <Select
              value={formData.issuerName}
              label="Issuer"
              onChange={(e) =>
                setFormData({ ...formData, issuerName: e.target.value })
              }
            >
              <MenuItem value="UIDAI">UIDAI</MenuItem>
              <MenuItem value="Income Tax Department">
                Income Tax Department
              </MenuItem>
              <MenuItem value="Passport Office">Passport Office</MenuItem>
              <MenuItem value="RTO">RTO</MenuItem>
            </Select>
          </FormControl>

          {/* Add Field Section */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <FormControl fullWidth>
              <InputLabel>Add Field</InputLabel>
              <Select
                value={selectedField}
                label="Add Field"
                onChange={(e) => setSelectedField(e.target.value)}
              >
                {availableFields
                  .filter(
                    (field) =>
                      !formData.additionalFields.some(
                        (f) => f.label === field.label
                      )
                  )
                  .map((field) => (
                    <MenuItem key={field.label} value={field.label}>
                      {field.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={handleAddField}
              color="primary"
              disabled={!selectedField}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {/* Additional Fields */}
          {formData.additionalFields.map((field, index) => (
            <Box
              key={index}
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              {renderField(field, index)}
              <IconButton
                onClick={() => handleRemoveField(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={() => {
            handleReset();
            onClose();
          }}
          color="error"
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          onClick={() => onSubmit(formData)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Submit Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDocumentDialog;
