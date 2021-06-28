// npm imports
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CategoriesFilter = ({ categories, filterByCategory }) => {
    return (
        <Row className="mx-3">
            {
                categories.map((category, index) => {
                    return (
                        <Col xs={3} key={index} className="text-left">
                            <label>
                                <input type="checkbox"
                                    onChange={e => filterByCategory(e, category)}
                                /> {category}
                            </label>
                        </Col>
                    )
                })
            }
        </Row>
    )
}

CategoriesFilter.propTypes = {
    categories: PropTypes.array.isRequired,
    filterByCategory: PropTypes.func.isRequired
};

export default CategoriesFilter; 