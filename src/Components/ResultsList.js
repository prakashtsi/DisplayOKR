// npm imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ResultsList = ({ list }) => {
    return (
        <Fragment>
            {
            list.map((result, idx) => (
                <Accordion defaultActiveKey={result.id} key={result.id}>
                    <Card>
                        {/* Objective */}
                        <Card.Header className="text-left">
                            <Accordion.Toggle as={Button} variant="link" eventKey={result.id}>
                                {idx + 1}. {result.title}
                            </Accordion.Toggle>
                        </Card.Header>

                        {/* Key Results */}
                        <Accordion.Collapse eventKey={result.id}>
                            <Fragment>
                            {
                                result.keyResults?.length > 0 ? (
                                    result.keyResults.map((item, count) => {
                                        return <Card.Body key={item.id} className="text-left pl-5">
                                            {String.fromCharCode(97 + count)}. {item.title}
                                        </Card.Body>
                                    })
                                ) : <Card.Body className="text-left pl-5">No Key Results found</Card.Body>
                            }
                            </Fragment>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>))
            }
        </Fragment>
    )
}

ResultsList.propTypes = {
    list: PropTypes.array.isRequired
};

export default ResultsList; 