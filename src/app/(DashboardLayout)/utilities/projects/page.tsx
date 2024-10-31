'use client';
import { useRouter } from 'next/navigation';
import { Typography, Box, Paper, Button } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const ProjectDetail = () => {
  const router = useRouter();
  // const { id } = router.query; // Get project ID from the URL
const id = 1
  return (
    <PageContainer title="Project Detail" description="Detail of selected project">
      <DashboardCard title={`Project Details - ${id}`}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>Project ID: {id}</Typography>
          <Typography variant="body1">This page would contain detailed information for project ID: {id}</Typography>
          <Box mt={2}>
            <Button variant="outlined" onClick={() => router.back()}>
              Back to List
            </Button>
          </Box>
        </Paper>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProjectDetail;
