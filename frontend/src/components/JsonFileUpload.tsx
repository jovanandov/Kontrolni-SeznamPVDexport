import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface JsonFileUploadProps {
    onFileSelect: (file: File) => void;
}

const JsonFileUpload: React.FC<JsonFileUploadProps> = ({ onFileSelect }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith('.json')) {
            alert('Prosimo, izberite JSON datoteko.');
            return;
        }

        setIsUploading(true);
        try {
            onFileSelect(file);
        } catch (error) {
            console.error('Napaka pri nalaganju:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <input
                accept=".json"
                style={{ display: 'none' }}
                id="json-file-upload"
                type="file"
                onChange={handleFileChange}
                disabled={isUploading}
            />
            <label htmlFor="json-file-upload">
                <Button
                    variant="contained"
                    component="span"
                    disabled={isUploading}
                    startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                >
                    {isUploading ? 'Nalaganje...' : 'Naloži JSON datoteko'}
                </Button>
            </label>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Podprte so samo .json datoteke
            </Typography>
        </Box>
    );
};

export default JsonFileUpload; 