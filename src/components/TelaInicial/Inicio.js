import React, { useEffect } from 'react';
import { useContext, useState } from 'react'
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import styled from 'styled-components';
import Titulo from '../../global/Titulo';
import { Bebidas, Bebida } from '../../global/Bebidas';
import Swal from 'sweetalert2';

export default function Inicio() {
    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [compras, setCompras] = useState([]);
    const { carrinho, token, setCarrinho, tipo } = useContext(UserContext);
    setCarrinho(compras);

    useEffect(() => carregarBebidas(), []);
    
    async function carregarBebidas() {
        try {
            const infoBebidas = await axios.get('http://localhost:5000/bebidas', { 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setInfo(infoBebidas.data);
            setIsLoading(false);
        } catch (e) {
            console.error(e)
        }
    };

    async function escolherQte(nomeBebida, preco) {
        const { value: quantidade } = await Swal.fire({ title: "Selecionar quantidade",
                    input: "number",
                    confirmButtonText: 'Adicionar ao carrinho',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    inputAttributes: {
                        min: 0,
                        max: 100,
                        step: 1
                    },
                    inputValue: ""
        });

        const qtd = parseInt(quantidade)
        const carrinhoUnico = [...carrinho];
        const bebida = carrinho.find(bebida => bebida.nomeBebida === nomeBebida)

        if (bebida) {
            carrinhoUnico.find(bebida => bebida.nomeBebida === nomeBebida).qtd += qtd;
            setCompras(carrinhoUnico);
            return;
        }

        setCompras([...compras, {nomeBebida, preco, qtd}]);
    };

    if (isLoading) {
        return (
            <h1 style={{color: 'white', fontSize: '25px', display: 'flex', justifyContent: 'center', padding: '50%'}}>
                Carregando...
            </h1>
        )
    };

    if (tipo === "bebidas") {
        return (
            <Container>
                <Titulo>
                    <div className="barra"></div>
                    <h1>Cervejas</h1>
                </Titulo>
                <Bebidas>
                    {info.filter(bebida => bebida.tipo === "Cerveja")
                        .map(bebida =>
                        <Bebida onClick={() => escolherQte(bebida.nome, bebida.valor)}>
                            <img src={bebida.img} alt={bebida.nome}/>
                            <p>{bebida.nome}</p>
                            <span>R$ {bebida.valor}</span>
                        </Bebida>
                    )}
                </Bebidas>
                <Titulo>
                    <div className="barra"></div>
                    <h1>Vinhos</h1>
                </Titulo>
                <Bebidas>
                    {info.filter(bebida => bebida.tipo === 'Vinho')
                        .map(bebida =>
                        <Bebida onClick={() => escolherQte(bebida.nome, bebida.valor)}>
                            <img src={bebida.img} alt={bebida.nome}/>
                            <p>{bebida.nome}</p>
                            <span>R$ {bebida.valor}</span>
                        </Bebida>
                    )}
                </Bebidas>
                <Titulo>
                    <div className="barra"></div>
                    <h1>Destilados</h1>
                </Titulo>
                <Bebidas>
                    {info.filter(bebida => bebida.tipo === 'Destilado')
                        .map(bebida =>
                        <Bebida onClick={() => escolherQte(bebida.nome, bebida.valor)}>
                            <img src={bebida.img} alt={bebida.nome}/>
                            <p>{bebida.nome}</p>
                            <span>R$ {bebida.valor}</span>
                        </Bebida>
                    )}
                </Bebidas>
                <Titulo>
                    <div className="barra"></div>
                    <h1>Drinks</h1>
                </Titulo>
                <Bebidas>
                    {info.filter(bebida => bebida.tipo === 'Drink')
                        .map(bebida =>
                        <Bebida onClick={() => escolherQte(bebida.nome, bebida.valor)}>
                            <img src={bebida.img} alt={bebida.nome}/>
                            <p>{bebida.nome}</p>
                            <span>R$ {bebida.valor}</span>
                        </Bebida>
                    )}
                </Bebidas>
            </Container>
        )
    };

    if (tipo !== "bebidas") {
        return (
        <Container>
            <Titulo>
                <div className="barra"></div>
                <h1>{tipo}s</h1>
            </Titulo>
            <Bebidas>
                {info.filter(bebida => bebida.tipo === tipo)
                    .map(bebida =>
                    <Bebida onClick={() => escolherQte(bebida.nome, bebida.valor)}>
                        <img src={bebida.img} alt={bebida.nome}/>
                        <p>{bebida.nome}</p>
                        <span>R$ {bebida.valor}</span>
                    </Bebida>
                )}
            </Bebidas>
        </Container>
    )
    };
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 118px 10px 60px;
    overflow-y: scroll;
`

