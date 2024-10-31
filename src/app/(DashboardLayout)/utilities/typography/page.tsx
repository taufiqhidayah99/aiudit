'use client';
import React, { useState } from 'react';
import { Typography, Grid, CardContent, TextField, Button, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BlankCard from '@/app/(DashboardLayout)/components/shared/BlankCard';

type Item = {
  name: string;
  price: string;
};

type FormData = {
  projectName: string;
  location: string;
  organization: string;
  budgetTotal: string;
  items: Item[];
};

const TypographyPage = () => {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    location: '',
    organization: '',
    budgetTotal: '',
    items: [{ name: '', price: '' }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, items: updatedItems });
  };

  const addNewItem = () => {
    setFormData({ ...formData, items: [...formData.items, { name: '', price: '' }] });
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Project Form">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        Project Form
                      </Typography>
                      <TextField
                        label="Nama Projek"
                        fullWidth
                        margin="normal"
                        value={formData.projectName}
                        onChange={(e) => handleInputChange(e, 'projectName')}
                      />
                      <TextField
                        label="Lokasi"
                        fullWidth
                        margin="normal"
                        value={formData.location}
                        onChange={(e) => handleInputChange(e, 'location')}
                      />
                      <TextField
                        label="Lembaga"
                        fullWidth
                        margin="normal"
                        value={formData.organization}
                        onChange={(e) => handleInputChange(e, 'organization')}
                      />
                      <TextField
                        label="Total Budget"
                        fullWidth
                        margin="normal"
                        value={formData.budgetTotal}
                        onChange={(e) => handleInputChange(e, 'budgetTotal')}
                      />

                      <Typography variant="h6" sx={{ marginTop: 3, marginBottom: 2 }}>
                        Keperluan
                      </Typography>
                      {formData.items.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 2 }}>
                          <TextField
                            label="Nama"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            fullWidth
                          />
                          <TextField
                            label="Anggaran"
                            value={item.price}
                            onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                            fullWidth
                          />
                          <IconButton color="secondary" onClick={() => removeItem(index)}>
                            <Delete />
                          </IconButton>
                        </Box>
                      ))}
                      <Button variant="outlined" onClick={addNewItem} sx={{ marginBottom: 2 }}>
                        Add Item
                      </Button>
                      <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                      </Button>
                    </Box>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TypographyPage;
