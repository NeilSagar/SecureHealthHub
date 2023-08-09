import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function CardNotif(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{padding:'30px'}}>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {props.message}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Redirecting you to Log In page.
        </Typography>
      </CardContent>
    </Card>
  );
}