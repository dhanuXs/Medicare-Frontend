import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const AlertComp = ({
                            severity = "info", // Default alert type
                            message = "This is a default alert message!",
                            autoClose = false, // Determines if the alert should disappear automatically
                            duration = 5000, // Auto dismiss duration in milliseconds (only works if `autoClose` is true)
                            onCloseCallback = null // Optional prop to handle additional close functionality
                        }) => {
    const [open, setOpen] = useState(true);

    // Auto-close functionality (if enabled)
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                setOpen(false);
                if (onCloseCallback) onCloseCallback(); // Trigger onClose callback if provided
            }, duration);

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [autoClose, duration, onCloseCallback]);

    const handleClose = () => {
        setOpen(false);
        if (onCloseCallback) onCloseCallback(); // Trigger onClose callback when alert is manually closed
    };

    return (
        <Collapse in={open}>
            <Alert
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }} // Adds space below the alert
            >
                {message}
            </Alert>
        </Collapse>
    );
};

export default AlertComp;