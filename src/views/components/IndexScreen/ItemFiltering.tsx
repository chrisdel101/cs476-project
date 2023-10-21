import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { ItemStates } from '../../../../constants';

const ItemFiltering = ({
  selectedLocation,
  handleLocationChange,
  selectedItemType,
  handleItemTypeChange,
  items,
  onFilterSubmit
}) => {
  const uniqueLocations = new Set();
  items.forEach((item) => {
    if (item.itemState === ItemStates.AVAILABLE)
        uniqueLocations.add(item.location);
  });

  const uniqueItemTypes = new Set();
  items.forEach((item) => {
    if (item.itemState === ItemStates.AVAILABLE)
        uniqueItemTypes.add(item.itemType);
  });

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterSubmit(searchKeyword);
  };

  const resetSearch = (event) => {
    event.preventDefault();
    setSearchKeyword('');
    onFilterSubmit('all');
  };

  return (
    <Row>
      <Col>
        <Form.Select value={selectedLocation} onChange={handleLocationChange}>
          <option value="all">All Locations</option>
          {Array.from(uniqueLocations).map((location, i) => (
            <option key={i} value={location}>
              {location}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form.Select value={selectedItemType} onChange={handleItemTypeChange}>
          <option value="all">All Item Types</option>
          {Array.from(uniqueItemTypes).map((itemType, i) => (
            <option key={i} value={itemType}>
              {itemType}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
                <Form.Control
                    type="text" 
                    name="search"
                    placeholder="Search Keyword"
                    value={searchKeyword}
                    onChange={handleSearchKeywordChange}
                    />
            </Col>
            <Col xs="auto">
              <button type="submit" className="btn btn-primary">
                🔍
              </button>
            </Col>
            <Col xs="auto">
              <button className="btn btn-primary" onClick={resetSearch}>
                Reset Search
              </button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ItemFiltering;