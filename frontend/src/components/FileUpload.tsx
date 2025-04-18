import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { uploadXlsxFile } from '../api/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploadProps {
    tipId: number;
    onUploadSuccess: (data: any) => void;
    onUploadError: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ tipId, onUploadSuccess, onUploadError }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith('.xlsx')) {
            onUploadError('Prosimo, izberite XLSX datoteko.');
            return;
        }

        setIsUploading(true);
        try {
            const response = await uploadXlsxFile(tipId, file);
            onUploadSuccess(response);
        } catch (error) {
            onUploadError('Prišlo je do napake pri nalaganju datoteke.');
            console.error('Napaka pri nalaganju:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', p: 2 }}>
            <input
                accept=".xlsx"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
                disabled={isUploading}
            />
            <label htmlFor="raised-button-file">
                <Button
                    variant="contained"
                    component="span"
                    disabled={isUploading}
                    startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                >
                    {isUploading ? 'Nalaganje...' : 'Naloži XLSX datoteko'}
                </Button>
            </label>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                Podprte so samo .xlsx datoteke
            </Typography>
        </Box>
    );
};

export default FileUpload; 