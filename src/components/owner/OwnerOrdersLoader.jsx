import React from "react";
import {
  Box,
  Stack,
  Skeleton,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

const OwnerOrdersSkeleton = ({ rows = 5 }) => {
  return (
    <Box px={{ xs: 1, md: 3 }} py={4}>
      {/* HEADER */}
      <Skeleton
        variant="text"
        width={280}
        height={40}
        sx={{ mb: 3 }}
      />

      {/* FILTER BUTTONS */}
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
        {[...Array(7)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={90}
            height={32}
          />
        ))}
      </Stack>

      {/* TABLE */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "rgba(0,0,0,.05)",
        }}
      >
        <TableContainer>
          <Table size="small">
            {/* HEADER */}
            <TableHead>
              <TableRow>
                {[
                  "#",
                  "Order",
                  "Customer",
                  "Items",
                  "Amount",
                  "Status",
                  "Date",
                  "Actions",
                ].map((col) => (
                  <TableCell key={col}>
                    <Skeleton width={70} height={20} />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/* BODY */}
            <TableBody>
              {[...Array(rows)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton width={20} />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={70} />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={140} />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={70} />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={60} />
                  </TableCell>

                  <TableCell>
                    <Skeleton
                      variant="rounded"
                      width={85}
                      height={24}
                      sx={{ borderRadius: 5 }}
                    />
                  </TableCell>

                  <TableCell>
                    <Skeleton width={160} />
                  </TableCell>

                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Skeleton
                        variant="rounded"
                        width={100}
                        height={30}
                      />
                      <Skeleton
                        variant="circular"
                        width={28}
                        height={28}
                      />
                      <Skeleton
                        variant="circular"
                        width={28}
                        height={28}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* PAGINATION */}
      <Stack alignItems="center" mt={3}>
        <Skeleton variant="rounded" width={200} height={32} />
      </Stack>
    </Box>
  );
};

export default OwnerOrdersSkeleton;
