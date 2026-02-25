import React from "react";
import {
  Card,
  CardContent,
  Skeleton,
  Stack,
  Box,
  useTheme,
} from "@mui/material";

const OwnerItemSkeleton = ({item=8}) => {
  const theme = useTheme();

  return (
    <Stack gap={2} p={2}>
      <Skeleton variant="text" height={50} width="9rem" animation="wave" />

      <Stack width={"100%"} direction={"row"} gap={2} flexWrap={"wrap"}>
        {[...Array(item)].map((_, index) => (
          <Card
            sx={{
              borderRadius: "18px",
              overflow: "hidden",
              width: "17em",
              height: "28rem",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 8px 25px rgba(0,0,0,0.6)"
                  : "0 10px 30px rgba(0,0,0,0.08)",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(0,0,0,0.8)"
                  : theme.palette.background.paper,
            }}
          >
            {/* IMAGE */}
            <Skeleton variant="rectangular" height={180} animation="wave" />

            <CardContent sx={{ pb: 1 }}>
              <Stack spacing={1}>
                {/* NAME */}
                <Skeleton
                  variant="text"
                  height={24}
                  width="70%"
                  animation="wave"
                />

                {/* RATING */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Skeleton
                    variant="rectangular"
                    width={90}
                    height={20}
                    animation="wave"
                  />
                  <Skeleton variant="text" width={30} animation="wave" />
                </Stack>

                {/* PRICE */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="text" width={60} animation="wave" />
                  <Skeleton variant="text" width={70} animation="wave" />
                  <Skeleton
                    variant="rounded"
                    width={40}
                    height={20}
                    animation="wave"
                  />
                </Stack>

                {/* DESCRIPTION */}
                <Skeleton variant="text" width="100%" animation="wave" />
                <Skeleton variant="text" width="85%" animation="wave" />

                {/* STOCK */}
                <Skeleton variant="text" width={80} animation="wave" />
              </Stack>
            </CardContent>

            {/* ACTIONS */}
            <Stack direction="row" spacing={1} p={2} pt={0}>
              <Skeleton
                variant="rounded"
                height={36}
                width="100%"
                animation="wave"
              />
              <Skeleton
                variant="rounded"
                height={36}
                width="100%"
                animation="wave"
              />
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default OwnerItemSkeleton;
