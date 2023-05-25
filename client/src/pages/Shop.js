import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import ItemList from '../components/ItemList';
import Pages from '../components/Pages';
import TypeBar from '../components/TypeBar';
import { fetchItems, fetchTypes, fetchCities } from '../http/itemAPI';
import '../index.css'
import Hero from "../components/Hero";
import CityBar from "../components/CityBar";
import {Col, Row} from "react-bootstrap";
import {Container} from "react-bootstrap";

const Shop = observer(() => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))
        fetchCities().then(data => item.setCities(data))
        fetchItems(null, null, 1, 6).then(data => {
            item.setItems(data.rows)
            item.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchItems(item.selectedType.id, item.selectedCity.id, item.page, 6).then(data => {
            item.setItems(data.rows)
            item.setTotalCount(data.count)
        })
    }, [item.page, item.selectedType, item.selectedCity,])

    return (
            <div>
                <Hero/>

                <Container>

                    <Row className="mt-2">
                        <Col md={3}>
                            <TypeBar />
                        </Col>
                        <Col md={9}>
                            <CityBar/>
                            <ItemList />
                            <Pages/>
                        </Col>
                    </Row>
                </Container>
            </div>
    );
});

export default Shop;