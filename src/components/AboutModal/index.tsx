import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "@/reducers/Store";

import Modal from "@/components/Modal";
import { EMAIL_SUPPORT, TEAM_MEMBERS, TOOL_DESCRIPTION } from "@/constants/about";
import { setModalVisibility } from "@/reducers/Modal";

const AboutModal: React.FC = () => {
  const open = useSelector((state: RootState) => state.modal.showAboutModal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setModalVisibility({
      key: "showAboutModal",
      value: false,
    }));
  };

  useEffect(() => {
    handleCloseModal();
  }, []);

  return (
    <Modal open={open} width={825} onClose={handleCloseModal} disableAutoFocus={true} title={<></>} noMarginBottom={true}>
      <Box display="flex" flexDirection="column" gap="20px" lineHeight="24px" px="10px">
        <Box className="about" textAlign="justify">
          <Typography variant="subtitle2" fontWeight="700" fontSize="18px">
            About
          </Typography>
          <Box className="divider" py="5px"></Box>
          <Typography variant="caption" fontSize="14px">
            The
            {" "}
            <strong>Supply-Demand Forecast tool</strong>
            {" "}
            {TOOL_DESCRIPTION}
          </Typography>
        </Box>
        <Box className="team-composition" textAlign="justify">
          <Typography variant="subtitle2" fontWeight="700" fontSize="16px">
            Team Composition
          </Typography>
          <Box className="divider" py="5px"></Box>
          <Box marginLeft="10px">
            <Typography variant="caption" fontSize="14px">
              {TEAM_MEMBERS?.map((d, i) => (
                <li key={`${d?.role}-${i}`}>
                  <strong>
                    {d?.role}
                  </strong>
                  :
                  {" "}
                  {(d?.names as string[]).join(", ")}
                </li>
              ))}
            </Typography>
          </Box>
        </Box>
        <Box className="team-composition">
          <Typography variant="subtitle2" fontWeight="700" fontSize="16px">
            Need Help?
          </Typography>
          <Box className="team-composition">
            <Typography variant="caption" fontSize="14px">
              If you need assistance with the Supply-Demand Forecast Tool, please reach out with your administrator immediately at
              {" "}
              <strong>
                {EMAIL_SUPPORT}
              </strong>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default AboutModal;
