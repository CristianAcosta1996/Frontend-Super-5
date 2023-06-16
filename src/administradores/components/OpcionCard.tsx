import {
  SvgIconTypeMap,
  Grid,
  Box,
  Paper,
  Typography,
  Link,
} from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useRef } from "react";
import { Link as RouterLink } from "react-router-dom";

type OpcionProductosProps = {
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
    muiName: string;
  };
  redirectTo: string;
};

export const OpcionCard = ({
  title,
  Icon,
  redirectTo,
}: OpcionProductosProps) => {
  const rippleRef = useRef<any>(null);
  const onRippleStart = (e: any) => {
    e.stopPropagation();
    rippleRef.current?.start(e);
  };
  const onRippleStop = (e: any) => {
    e.stopPropagation();
    rippleRef.current.stop(e);
  };
  return (
    <Grid item xs={12} sm={3}>
      <Box
        onMouseUp={(event) => {
          event.preventDefault();
          onRippleStop(event);
        }}
        onMouseDown={(event) => {
          event?.preventDefault();
          onRippleStart(event);
        }}
        onDragEnd={(e) => {
          e.preventDefault();
        }}
        sx={{
          position: "relative",
          transition: "all 0.3s",

          "&:hover": {
            transform: "translateY(-5px)",
          },
          "&:active": {
            transform: "translateY(-2px)",
          },
        }}
      >
        <Link underline="none" component={RouterLink} to={redirectTo}>
          <Paper
            sx={{
              py: 4,
              px: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              bgcolor: "#333",
              userSelect: "none",
              gap: 1,
            }}
            elevation={6}
          >
            {<Icon fontSize="medium" color="inherit" />}
            <Typography
              variant="button"
              component="h6"
              color="inherit"
              textAlign="center"
            >
              {title}
            </Typography>
            <TouchRipple ref={rippleRef} center={false} />
          </Paper>
        </Link>
      </Box>
    </Grid>
  );
};
