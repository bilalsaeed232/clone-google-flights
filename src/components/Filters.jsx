import React, { useState } from 'react'
import { Slider, FormControlLabel, MenuItem, RadioGroup, Radio } from '@mui/material'
import {
    FilterContainer,
    FilterContent,
    FilterTitle,
    FilterSection,
    SectionTitle,
    PriceDisplay,
    PriceText,
    StyledSelect,
    sliderStyles,
    radioGroupStyles,
    menuProps
} from './styles/FiltersStyles'

const Filters = () => {
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [stops, setStops] = useState([]);
    const [airlines, setAirlines] = useState([]);

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleStopsChange = (event) => {
        setStops(event.target.value);
    }

    return (
        <FilterContainer elevation={0}>
            <FilterContent>
                <FilterTitle variant='h6'>Filters</FilterTitle>

                {/* Price range filter */}
                <FilterSection>
                    <SectionTitle>Price</SectionTitle>
                    <Slider
                        min={0}
                        max={1000}
                        onChange={handlePriceChange}
                        value={priceRange}
                        valueLabelDisplay="auto"
                        sx={sliderStyles}
                    />
                    <PriceDisplay>
                        <PriceText>${priceRange[0]}</PriceText>
                        <PriceText>${priceRange[1]}</PriceText>
                    </PriceDisplay>
                </FilterSection>

                {/* Stops filter */}
                <FilterSection>
                    <SectionTitle>Stops</SectionTitle>
                    <RadioGroup 
                        value={stops} 
                        onChange={handleStopsChange}
                        sx={radioGroupStyles}
                    >
                        <FormControlLabel value="any" control={<Radio size="small" />} label="Any number of stops" />
                        <FormControlLabel value="non-stop" control={<Radio size="small" />} label="Nonstop only"/>
                        <FormControlLabel value="1-stop" control={<Radio size="small" />} label="1 stop or fewer" />
                        <FormControlLabel value="2-stops" control={<Radio size="small" />} label="2 stops or fewer" />
                    </RadioGroup>
                </FilterSection>

                {/* Airlines filter */}
                <FilterSection>
                    <SectionTitle>Airlines</SectionTitle>
                    <StyledSelect 
                        multiple 
                        value={airlines} 
                        onChange={(e) => setAirlines(e.target.value)}
                        MenuProps={menuProps}
                    >
                        <MenuItem value="Airline 1">Airline 1</MenuItem>
                        <MenuItem value="Airline 2">Airline 2</MenuItem>
                    </StyledSelect>
                </FilterSection>
            </FilterContent>
        </FilterContainer>
    )
}

export default Filters