'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const mockData = [
  { id: 1, projectName: 'Pembangunan Jembatan', location: 'Sleman', organization: 'Pemda', budgetTotal: '100000000' },
  { id: 2, projectName: 'Renovasi Gedung', location: 'Jakarta', organization: 'Kementerian PU', budgetTotal: '50000000' },
  { id: 3, projectName: 'Pembangunan Sekolah', location: 'Bandung', organization: 'Dinas Pendidikan', budgetTotal: '75000000' },
];

const Shadow = () => {
  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/utilities/projects/${id}`);
  };

  return (
    <PageContainer title="Project List" description="List of all projects">
      <DashboardCard title="Project List">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama Projek</TableCell>
                <TableCell>Lokasi</TableCell>
                <TableCell>Organisasi</TableCell>
                <TableCell>Total Anggaran</TableCell>
                <TableCell>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((project) => (
                <TableRow key={project.id} hover onClick={() => handleRowClick(project.id)} style={{ cursor: 'pointer' }}>
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.location}</TableCell>
                  <TableCell>{project.organization}</TableCell>
                  <TableCell>{project.budgetTotal}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={(e) => { e.stopPropagation(); handleRowClick(project.id); }}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
