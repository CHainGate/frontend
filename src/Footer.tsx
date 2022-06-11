import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const links = ["Terms", "Privacy", "Licenses"];

export default function Footer() {
  return (
    <Box component="footer" bgcolor="primary.main" sx={{marginTop: 3}}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            py: 4,
          }}
        >
          <Typography color="secondary.main" variant="body2">
            © 2022 CHainGate
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ mt: { xs: 3, md: 0 }, ml: { xs: 0, md: 3 } }}
          >
            {links.map((link) => (
              <Link
                color="secondary.main"
                key={link}
                underline="none"
                variant="body2"
              >
                {link}
              </Link>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}