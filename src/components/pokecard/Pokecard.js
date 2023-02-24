import { useRef } from 'react'
import '../pokecard/Pokecard.css'
import { Button, Card, Col, Row, Tag } from 'antd'
import { atom, useAtom } from 'jotai'
import pokeBall from '../../assets/poke-ball.png'
import { findByLabelText } from '@testing-library/react'
import { CloseCircleOutlined } from '@ant-design/icons';
export const accPokemon = atom([]);

const Pokecard = ({ title, id, weight, height, abilities, remove }) => {
    const Title = () => {
        return (
            <Row>
                <Col span={4}>
                </Col>
                <Col span={16}>
                    <p style={{ margin: 0 }}>{`${title}`}</p>
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {remove && <CloseCircleOutlined style={{ fontSize: '16px' }} onClick={removePokemon} />}
                </Col>
            </Row>
        )
    }

    const [selectedPokemons, setSelectedPokemons] = useAtom(accPokemon);

    const selectPokemon = () => {
        setSelectedPokemons(selectedPokemons =>
            (!selectedPokemons?.some(pokemon => pokemon.id == id)) ?
                ([...selectedPokemons, {
                    title: title,
                    id: id,
                    weight: weight,
                    height: height,
                    abilities: abilities
                }]) : (
                    [...selectedPokemons]
                )

        )
    }

    const removePokemon = () => {
        console.log(selectedPokemons, id);
        setSelectedPokemons(selectedPokemons => selectedPokemons.filter(pokemon => pokemon.id != id));
    }

    return (
        <Row gutter={[0, 5]} className='card'>
            <Col span={24} className='card-head'>
                <Title />
            </Col>
            <Col span={12}>
                {id && <img src={require(`/vercel/path0/src/assets/pokemon/${id}.png`)} alt={{}}></img>}
            </Col>
            <Col span={12} className='pokemon-stats'>
                <p>Height: {height}</p>
                <p>Weight: {weight}</p>
                <p>Height: {height}</p>
                <p>Weight: {weight}</p>
            </Col>
            <Col className='abilities' span={24}>
                <p>Abilities: </p> {abilities?.map(abi => <Tag className='abilities-tag'>{` ${abi} `}</Tag>)}
            </Col>
            <Col span={24}>
                <Row justify="end">
                    <Col span={6} >
                        {!remove && <Button className='select-pokemon' onClick={selectPokemon}>< img src={pokeBall} /></Button>}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Pokecard