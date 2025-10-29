import { Box, Typography } from "@mui/material";
import React from "react";

import NoResults from "@/assets/tables/no_result.svg";

type NoResultsFoundProps = {
  page: string | "demand" | "supply" | "reports";
  hasFilter?: boolean;
};

const NoResultsFound: React.FC<NoResultsFoundProps> = ({ page, hasFilter = false }) => {
  let title = "No Results Found";

  switch (page) {
    case "Demand":
      title = "No demand entries found";
      break;
    case "Supply":
      title = "No supply entries found";
      break;
    case "Reports":
      title = "No report entries found";
      break;
    default:
      break;
  }

  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <NoResults style={{ width: 400, height: 300, marginBottom: 16 }} />
      {
        hasFilter
          ? (
              <>
                <Typography variant="h6" fontWeight={600}>
                  No Results Found
                </Typography>
                <Typography fontWeight={400}>
                  Please try using another keyword or filter
                </Typography>
              </>
            )
          : (
              <>
                <Typography variant="h6" fontWeight={600}>
                  {title}
                </Typography>
              </>
            )
      }
    </Box>
  );
};

export default NoResultsFound;
