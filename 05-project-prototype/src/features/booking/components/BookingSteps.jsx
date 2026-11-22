import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

const steps = ['選出發日', '填寫資料', '送出確認'];

export default function BookingSteps({ activeStep }) {
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      className="mb-10"
      sx={{
        '& .MuiStepLabel-label': {
          fontSize: '1.125rem',
          fontWeight: 700,
          marginTop: '8px',
        },
      }}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
