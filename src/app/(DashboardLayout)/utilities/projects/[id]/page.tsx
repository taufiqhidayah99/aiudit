'use client';
import { ChipProps } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Typography, Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, TableSortLabel } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

type MarketPrices = {
  Tokopedia: number;
  Shopee: number;
};

type Item = {
  name: string;
  price: number;
  marketPrices: MarketPrices;
};

// Mock data for project details and marketplace prices
const mockProjectData = {
  id: 1,
  projectName: 'Pembangunan Jembatan',
  location: 'Sleman',
  organization: 'Pemda',
  budgetTotal: '100000000',
  items: [
    { name: 'Semen', price: 5000000, marketPrices: { Tokopedia: 920000, Shopee: 950000 } },
    { name: 'Pasir', price: 800000, marketPrices: { Tokopedia: 820000, Shopee: 830000 } },
    { name: 'Besi', price: 1500000, marketPrices: { Tokopedia: 1480000, Shopee: 1550000 } },
  ] as Item[],
};

// Function to determine if the price is fair
const getPriceIndicator = (itemPrice: number, marketPrices: { [key: string]: number }): { label: string; color: ChipProps['color'] } => {
  const averageMarketPrice =
    Object.values(marketPrices).reduce((sum, price) => sum + price, 0) / Object.values(marketPrices).length;

  if (itemPrice < averageMarketPrice * 0.9) return { label: 'Rendah', color: 'primary' };
  if (itemPrice <= averageMarketPrice * 1.1) return { label: 'Wajar', color: 'success' };
  return { label: 'Tinggi', color: 'error' };
};

// Sorting helper
const sortData = (items: Item[], orderBy: Extract<keyof Item, 'name' | 'price'>, order: 'asc' | 'desc') => {
  return [...items].sort((a, b) => {
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

const ProjectDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const project = mockProjectData;

  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<Extract<keyof Item, 'name' | 'price'>>('name');

  const handleRequestSort = (property: Extract<keyof Item, 'name' | 'price'>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedItems = sortData(project.items, orderBy, order);

  return (
    <PageContainer title="Project Detail" description="Detail of selected project">
      <DashboardCard title={`Project Details - ${project.projectName}`}>
        <Paper elevation={2} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>Project ID: {id}</Typography>
          <Typography variant="body1" gutterBottom><strong>Project Name:</strong> {project.projectName}</Typography>
          <Typography variant="body1" gutterBottom><strong>Location:</strong> {project.location}</Typography>
          <Typography variant="body1" gutterBottom><strong>Organization:</strong> {project.organization}</Typography>
          <Typography variant="body1" gutterBottom><strong>Total Budget:</strong> Rp {project.budgetTotal}</Typography>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>Keperluan (Items)</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'name'}
                        direction={orderBy === 'name' ? order : 'asc'}
                        onClick={() => handleRequestSort('name')}
                      >
                        Item Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === 'price'}
                        direction={orderBy === 'price' ? order : 'asc'}
                        onClick={() => handleRequestSort('price')}
                      >
                        Anggaran (Rp)
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Price Indicator</TableCell>
                    <TableCell>Marketplace Prices</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedItems.map((item, index) => {
                    const priceIndicator = getPriceIndicator(item.price, item.marketPrices);
                    return (
                      <TableRow key={index}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price.toLocaleString('id-ID')}</TableCell>
                        <TableCell>
                          <Chip label={priceIndicator.label} color={priceIndicator.color} />
                        </TableCell>
                        <TableCell>
                          {Object.entries(item.marketPrices).map(([market, marketPrice]) => (
                            <Typography key={market} variant="body2">
                              {market}: Rp {marketPrice.toLocaleString('id-ID')}
                            </Typography>
                          ))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box mt={3}>
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
