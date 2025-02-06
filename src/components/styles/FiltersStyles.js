import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Select } from '@mui/material';

export const FilterContainer = styled(Paper)({
    width: '268px',
    border: '1px solid #dadce0',
    borderRadius: '8px',
    backgroundColor: '#fff',
    padding: 0,
    margin: '16px'
});

export const FilterContent = styled(Box)({
    padding: '24px 24px 16px'
});

export const FilterTitle = styled(Typography)({
    fontSize: '16px',
    fontWeight: 500,
    color: '#202124',
    marginBottom: '24px'
});

export const FilterSection = styled(Box)(({ theme }) => ({
    marginBottom: '32px',
    '&:not(:first-of-type)': {
        borderTop: '1px solid #dadce0',
        paddingTop: '24px'
    }
}));

export const SectionTitle = styled(Typography)({
    fontSize: '14px',
    fontWeight: 500,
    color: '#202124',
    marginBottom: '8px'
});

export const PriceDisplay = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '8px',
    paddingRight: '8px',
    marginTop: '8px'
});

export const PriceText = styled(Typography)({
    fontSize: '12px',
    color: '#5f6368'
});

export const StyledSelect = styled(Select)({
    width: '100%',
    marginBottom: '16px',
    fontSize: '14px',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#dadce0'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#202124'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1a73e8'
    }
});

export const sliderStyles = {
    color: '#1a73e8',
    width: "90%",
    marginLeft: '8px',
    '& .MuiSlider-thumb': {
        height: 20,
        width: 20,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(26, 115, 232, 0.16)'
        }
    },
    '& .MuiSlider-rail': {
        backgroundColor: '#dadce0'
    }
};

export const radioGroupStyles = {
    '& .MuiRadio-root': {
        color: '#5f6368',
        '&.Mui-checked': {
            color: '#1a73e8'
        }
    },
    '& .MuiFormControlLabel-label': {
        fontSize: '14px',
        color: '#202124'
    }
};

export const menuProps = {
    PaperProps: {
        sx: {
            '& .MuiMenuItem-root': {
                fontSize: '14px',
                color: '#202124'
            }
        }
    }
}; 