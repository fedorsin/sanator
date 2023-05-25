import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const CityBar = observer(() => {

    const {item} = useContext(Context)

    return (
        <Row className="d-flex" >
            {item.cities.map(city =>
                <Card
                    style={{cursor:'pointer', width: 'min-content'}}

                    key={city.id}
                    className="p-3"
                    onClick={() => item.setSelectedCity(city)}
                    border={city.id === item.selectedCity.id ? 'primary' : 'light'}
                >
                    {city.name}
                </Card>
            )}
        </Row>
    );
});

export default CityBar;