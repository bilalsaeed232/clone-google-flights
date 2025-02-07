import React from 'react'
import { 
    Box, 
    Typography, 
    Slider, 
    FormControlLabel, 
    RadioGroup, 
    Radio,
    Divider,
    Checkbox,
    Avatar
} from '@mui/material'
import {
    FilterContainer,
    FilterContent,
    FilterSection,
    SectionTitle,
    PriceDisplay,
    PriceText,
} from './styles/FiltersStyles'

const Filters = ({ filters, onFilterChange, flights }) => {
    const handlePriceChange = (event, newValue) => {
        onFilterChange({
            ...filters,
            priceRange: newValue
        });
    };

    const handleStopsChange = (event) => {
        onFilterChange({
            ...filters,
            stops: event.target.value
        });
    };

    const handleAirlineChange = (airline) => {
        const newAirlines = filters.airlines?.includes(airline)
            ? filters.airlines.filter(a => a !== airline)
            : [...(filters.airlines || []), airline];
        
        onFilterChange({
            ...filters,
            airlines: newAirlines
        });
    };

    // Calculate price range from actual flights
    const getPriceRange = () => {
        if (!flights.length) return [0, 2000];
        const prices = flights.map(flight => parseFloat(flight.price.replace('$', '')));
        return [Math.min(...prices), Math.max(...prices)];
    };

    // Get airlines from filterStats
    const getAirlines = () => {
        if (!flights.length) return [];
        // Access carriers from the first flight's filterStats
        return flights[0]?.filterStats?.carriers || [];
    };

    const airlines = getAirlines();
    const [minPrice, maxPrice] = getPriceRange();

    return (
        <FilterContainer elevation={0}>
            <FilterContent>
                <Typography 
                    variant="subtitle1" 
                    sx={{ 
                        fontSize: '20px',
                        fontWeight: 400,
                        color: '#202124',
                        mb: 3
                    }}
                >
                    Filters
                </Typography>

                {/* Price range filter */}
                <FilterSection>
                    <SectionTitle>Price</SectionTitle>
                    <Box sx={{ px: 1 }}>
                        <Slider
                            min={minPrice}
                            max={maxPrice}
                            value={filters.priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay="off"
                            sx={{
                                color: '#1a73e8',
                                '& .MuiSlider-thumb': {
                                    height: 16,
                                    width: 16,
                                    backgroundColor: '#fff',
                                    border: '2px solid currentColor',
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: '0 0 0 8px rgba(26, 115, 232, 0.16)'
                                    }
                                },
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#dadce0'
                                }
                            }}
                        />
                        <PriceDisplay>
                            <PriceText>${filters.priceRange[0]}</PriceText>
                            <PriceText>${filters.priceRange[1]}</PriceText>
                        </PriceDisplay>
                    </Box>
                </FilterSection>

                <Divider sx={{ my: 2 }} />

                {/* Stops filter */}
                <FilterSection>
                    <SectionTitle>Stops</SectionTitle>
                    <RadioGroup 
                        value={filters.stops} 
                        onChange={handleStopsChange}
                        sx={{
                            '& .MuiFormControlLabel-root': {
                                my: 0.5
                            }
                        }}
                    >
                        <FormControlLabel 
                            value="any" 
                            control={
                                <Radio 
                                    size="small"
                                    sx={{
                                        color: '#5f6368',
                                        '&.Mui-checked': {
                                            color: '#1a73e8'
                                        }
                                    }}
                                />
                            } 
                            label={
                                <Typography sx={{ fontSize: '14px', color: '#202124' }}>
                                    Any number of stops
                                </Typography>
                            }
                        />
                        <FormControlLabel 
                            value="nonstop" 
                            control={
                                <Radio 
                                    size="small"
                                    sx={{
                                        color: '#5f6368',
                                        '&.Mui-checked': {
                                            color: '#1a73e8'
                                        }
                                    }}
                                />
                            } 
                            label={
                                <Typography sx={{ fontSize: '14px', color: '#202124' }}>
                                    Nonstop only
                                </Typography>
                            }
                        />
                        <FormControlLabel 
                            value="1-stop" 
                            control={
                                <Radio 
                                    size="small"
                                    sx={{
                                        color: '#5f6368',
                                        '&.Mui-checked': {
                                            color: '#1a73e8'
                                        }
                                    }}
                                />
                            } 
                            label={
                                <Typography sx={{ fontSize: '14px', color: '#202124' }}>
                                    1 stop or fewer
                                </Typography>
                            }
                        />
                    </RadioGroup>
                </FilterSection>

                <Divider sx={{ my: 2 }} />

                {/* Airlines filter */}
                <FilterSection>
                    <SectionTitle>Airlines</SectionTitle>
                    <Box sx={{ mt: 1 }}>
                        {airlines.length > 0 ? (
                            airlines.map((airline) => (
                                <FormControlLabel
                                    key={airline.id}
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={filters.airlines?.includes(airline.name) || false}
                                            onChange={() => handleAirlineChange(airline.name)}
                                            sx={{
                                                color: '#5f6368',
                                                '&.Mui-checked': {
                                                    color: '#1a73e8'
                                                }
                                            }}
                                        />
                                    }
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Avatar 
                                                src={airline.logoUrl} 
                                                alt={airline.name}
                                                sx={{ width: 20, height: 20 }}
                                            />
                                            <Typography sx={{ fontSize: '14px', color: '#202124' }}>
                                                {airline.name}
                                            </Typography>
                                        </Box>
                                    }
                                    sx={{ display: 'flex', mb: 1 }}
                                />
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No airlines available for this route
                            </Typography>
                        )}
                    </Box>
                </FilterSection>
            </FilterContent>
        </FilterContainer>
    )
}

export default Filters