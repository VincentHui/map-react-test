import React from "react";
import styled from "styled-components";
import { Countries } from "./countryParser";
import { ColumnList, MapColumn } from "./presentationalComponents";

const ColumnsParent = styled.div`
  width: 750px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
`;

const Aligner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const orderedCountries = Object.keys(Countries).sort(
  (a, b) => Countries[b].length - Countries[a].length
);

const orderedCities = Object.keys(Countries).reduce((acc, country) => {
  acc[country] = Object.keys(Countries[country]).sort();
  return acc;
}, {});

class App extends React.Component {
  constructor(props) {
    super(props);
    const initalCountry = orderedCountries[0];
    const initialCity = orderedCities[initalCountry][0];
    const initialCompany = Countries[initalCountry][initialCity][0];
    this.state = {
      SelectedCountry: initalCountry,
      SelectedCity: initialCity,
      SelectedCompany: initialCompany,
    };
  }

  onCountryClick = (country) => {
    this.setState({
      ...this.state,
      SelectedCountry: country,
      SelectedCity: null,
    });
  };

  onCityClick = (country) => (city) => {
    this.setState({
      ...this.state,
      SelectedCity: city,
      SelectedCompany: Countries[country][city][0],
    });
  };

  onCompanyClick = (country, city) => (company) => {
    this.setState({
      ...this.state,
      SelectedCompany: Countries[country][city].find(
        (comp) => comp.CompanyName === company
      ),
    });
  };

  render() {
    const { SelectedCountry, SelectedCity, SelectedCompany } = this.state;
    const companyList = SelectedCity
      ? Countries[SelectedCountry][SelectedCity].map((c) => c.CompanyName)
      : [];

    return (
      <Aligner>
        <ColumnsParent>
          <ColumnList
            title="Countries"
            list={orderedCountries}
            onItemClick={(c) => this.onCountryClick(c)}
            selected={SelectedCountry}
          />
          <ColumnList
            title="Cities"
            list={orderedCities[SelectedCountry]}
            onItemClick={this.onCityClick(SelectedCountry)}
            selected={SelectedCity}
          />
          <ColumnList
            title="Company"
            list={companyList}
            onItemClick={this.onCompanyClick(SelectedCountry, SelectedCity)}
            selected={SelectedCompany.CompanyName}
          />
          <MapColumn
            city={SelectedCity}
            company={SelectedCompany.CompanyName.replace(/ /g, "+")}
            country={SelectedCountry}
          />
        </ColumnsParent>
      </Aligner>
    );
  }
}

export default App;
