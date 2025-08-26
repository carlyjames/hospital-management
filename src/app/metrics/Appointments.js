import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Chip } from '@mui/material';
import dayjs from 'dayjs';

// Create a custom theme for white text
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
    background: {
      default: 'transparent',
      paper: 'transparent',
    },
  },
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
        label: {
          color: '#ffffff',
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
        },
      },
    },
  },
});

export default function Appointments() {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (newValue) => {
    if (newValue) {
      const dateString = newValue.format('YYYY-MM-DD');
      
      // Check if date is already selected
      const isAlreadySelected = selectedDates.some(
        date => date.format('YYYY-MM-DD') === dateString
      );

      if (isAlreadySelected) {
        // Remove date if already selected
        setSelectedDates(prev => 
          prev.filter(date => date.format('YYYY-MM-DD') !== dateString)
        );
      } else {
        // Add date if not selected
        setSelectedDates(prev => [...prev, newValue]);
      }
    }
  };

  const removeDateFromSelection = (dateToRemove) => {
    setSelectedDates(prev => 
      prev.filter(date => 
        date.format('YYYY-MM-DD') !== dateToRemove.format('YYYY-MM-DD')
      )
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ color: 'white' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar 
            onChange={handleDateChange}
            sx={{
              color: 'white',
              '& .MuiTypography-root': {
                color: 'white',
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
              '& .MuiPickersDay-root': {
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
              },
            }}
          />
        </LocalizationProvider>

        {selectedDates.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
              Selected Appointment Dates:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedDates
                .sort((a, b) => a.unix() - b.unix())
                .map((date, index) => (
                  <Chip
                    key={index}
                    label={date.format('MMM DD, YYYY')}
                    onDelete={() => removeDateFromSelection(date)}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      '& .MuiChip-deleteIcon': {
                        color: 'white',
                        '&:hover': {
                          color: '#ff6b6b',
                        },
                      },
                    }}
                  />
                ))}
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}