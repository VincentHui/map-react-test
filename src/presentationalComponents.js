import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const List = styled.ul`
  overflow-y: scroll;
  height: 200px;
  list-style: none;
  padding: 2px;
  margin: 0px;
`;

const GetHighlightColor = (isHighlighted) =>
  isHighlighted ? "rgba(66, 120, 245,1)" : "white";

const ListItem = styled.li`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  border-radius: 5px;
  padding: 5px;
  background-color: ${(props) => GetHighlightColor(props.selected)};
  color: ${(props) => GetHighlightColor(!props.selected)};
`;
class KeyList extends React.Component {
  render() {
    return (
      <List>
        {this.props.list.map((item, i) => (
          <ListItem
            selected={item === this.props.selected}
            onClick={() => this.props.onClick(item)}
            key={i}
          >
            {item}
          </ListItem>
        ))}
      </List>
    );
  }
}
KeyList.propTypes = {
  list: PropTypes.arrayOf(String).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

const Column = styled.div`
  width: 20%;
`;

const ColumnTitle = styled.div`
  padding: 5px;
  border-bottom: 2px solid black;
  font-weight: bold;
`;
export class ColumnList extends React.Component {
  render() {
    return (
      <Column>
        <ColumnTitle>{this.props.title}</ColumnTitle>
        <KeyList
          selected={this.props.selected}
          onClick={this.props.onItemClick}
          list={this.props.list}
        />
      </Column>
    );
  }
}
ColumnList.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(String),
  onItemClick: PropTypes.func,
  selected: PropTypes.string,
};
const apiKey = "AIzaSyC1SA1G7XEhZjEVHC75fu7i88V2_mafnKc";
const MapFrame = styled.iframe`
  flex-grow: 1;
`;
export class MapColumn extends React.Component {
  render() {
    return (
      <Column style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <ColumnTitle>Map</ColumnTitle>
        <MapFrame
          title="map"
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}
                &q=${this.props.company},
                ${this.props.city}+${this.props.country}`}
        />
      </Column>
    );
  }
}
MapColumn.propTypes = {
  company: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
};
