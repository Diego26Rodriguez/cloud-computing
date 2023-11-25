import React, { useState, useEffect } from 'react';
import axios from 'axios';

const endpoint = 'http://localhost:3333/facturas'
const endpoint2 = 'http://localhost:3333/terceros'
const endpoint3 = 'http://localhost:3333/bodegas'
const endpoint4 = 'http://localhost:3333/productos'

const RegistrarFacturas = ({ Actualizar }) => {

    const [Id, setId] = useState("")
    const [nroFactura, setNroFactura] = useState("")
    const [tipoFactura, setTipoFactura] = useState("")
    const [tercero, setTercero] = useState([]);
    const [fecha, setFecha] = useState("")
    const [bodega, setBodega] = useState([]);
    const [count, setcount] = useState([]);
    const [itemsFactura, setitemsFactura] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [totalOperacion, setTotalOperacion] = useState("")
    const [Accion, setAccion] = useState("")
    const [EstadoAlertAccion, setEstadoAlertAccion] = useState(false)
    const [EstadoAgregarProductos, setEstadoAgregarProductos] = useState(false)
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const Save = async (e) => {
        e.preventDefault();
        if (Actualizar === undefined) {
            const response = await axios.post(endpoint, {
                nroFactura: nroFactura,
                tipoFactura: tipoFactura,
                tercero: tercero,
                fecha: fecha,
                bodega: bodega,
                elementos: elementos,
                totalOperacion: totalOperacion
            })
            if (response.data !== undefined) {
                setAccion("guardo")
                setNroFactura("")
                setTercero("")
                setTipoFactura("")
                setFecha("")
                setBodega("")
                setElementos("")
                setTotalOperacion("")
            }
        } else {
            const response = await axios.patch(`${endpoint}/`, {
                id: Id,
                nroFactura: nroFactura,
                tipoFactura: tipoFactura,
                tercero: tercero,
                fecha: fecha,
                bodega: bodega,
                elementos: elementos,
                totalOperacion: totalOperacion
            })
            if (response.data !== undefined) {
                setNroFactura("")
                setTercero("")
                setTipoFactura("")
                setFecha("")
                setBodega("")
                setElementos("")
                setTotalOperacion("")
                setAccion("actualizo")
            }
        }
        setEstadoAlertAccion(!EstadoAlertAccion)
    }
    const handleAgregarProductos = (producto) => {
        setProductosSeleccionados([...productosSeleccionados, producto]);
    };
    useEffect(() => {
        TodosTerceros()
        TodosBodega()
        TodosElementos()
        handleAgregarProductos()
        if (Actualizar != undefined) {
            const getIdFactura = async () => {
                const response = await axios.post(`${endpoint}/filtronro`, { nroFactura: Actualizar })
                response.data.facturas.forEach((item) => {
                    setId(item._id)
                    setNroFactura(item.nroFactura)
                    setTipoFactura(item.tipoFactura)
                    setFecha(item.fecha)
                    setTotalOperacion(item.totalOperacion)
                })
                console.log(tercero);
            }

            getIdFactura()

        }

    }, [])

    const TodosTerceros = async () => {
        await axios.get(`${endpoint2}/`).then(datos => {
            if (Array.isArray(datos.data.thirds)) {
                setTercero(datos.data.thirds);
            }
        });
        console.log(tercero);
    }
    const TodosBodega = async () => {
        await axios.get(`${endpoint3}/`).then(datos => {
            if (Array.isArray(datos.data.bodegas)) {
                setBodega(datos.data.bodegas);
            }
        });
        console.log(bodega);
    }
    const TodosElementos = async () => {
        await axios.get(`${endpoint4}/`).then((datos) => {
            if (Array.isArray(datos.data.products)) {
                setElementos(datos.data.products);
            }
        });
    };
    const handleCheckboxChange = (productId) => {
        const selectedProduct = elementos.find(product => product._id === productId);

        if (selectedProduct) {
            const countValue = Number(count[productId]) || 0;
            const totalValueProduct = countValue * selectedProduct.valorUnitario;

            setProductosSeleccionados(prevProductos => [
                ...prevProductos,
                {
                    product: selectedProduct.nombre,
                    unidad: selectedProduct.unidadMedida,
                    count: countValue,
                    valorUnitario: selectedProduct.valorUnitario,
                    productos_id: productId,
                    totalValueProduct: totalValueProduct
                }
            ]);

            setitemsFactura(prevItems => [
                ...prevItems,
                {
                    count: countValue,
                    valorUnitario: selectedProduct.valorUnitario,
                    productos_id: productId,
                    totalValueProduct: totalValueProduct
                }
            ]);
        }
    };
    const handleInputChange = (productId, value) => {
        setElementos((prevElementos) => ({
            ...prevElementos,
            [productId]: value,
        }));
    };



    return (
        <div className='container-RegistroTercero'>
            <h1 className='container-titulo'>
                Registrar factura
            </h1>
            <div className='container-interno-Tercero field'>
                <div className='container-Input'>
                    <input className='Input-text' type="text"
                        name="nroFactura"
                        placeholder='nroFactura'
                        id='nroFactura'
                        value={nroFactura}
                        onChange={(e) => setNroFactura(e.target.value)} />
                    <label className='label-tercero' for="">Numero de Factura</label>
                </div>
                <div className='container-Input'>
                    <input className='Input-text' type="text"
                        name="tipoFactura"
                        placeholder='tipoFactura'
                        id='tipoFactura'
                        value={tipoFactura}
                        onChange={(e) => setTipoFactura(e.target.value)} />
                    <label className='label-tercero' for="">Tipo de Factura</label>
                </div>
                <div className='container-Input'>
                    <select className='Input-text' name='selectName'>
                        {tercero.map((item) => (
                            <option value={item.nombre}>{item.nombre}</option>
                        ))}
                    </select>
                    <label className='label-tercero' for="">Tercero</label>
                </div>
                <div className='container-Input'>
                    <select className='Input-text' name='selectName'>
                        {bodega.map((item) => (
                            <option value={item.nombre}>{item.nombre}</option>
                        ))}
                    </select>
                    <label className='label-tercero' for="">Tercero</label>
                </div>
                <div className='container-Input'>
                    <input className='Input-text' type="date"
                        name="fecha"
                        placeholder='fecha'
                        id='fecha'
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)} />
                    <label className='label-tercero' for="">Fecha</label>
                </div>
                <div className='container-elementos'>
                    <div className='container-agregar'>
                        <label for="">Elementos</label>
                        <button type="submit"
                            className='Button-acciones'
                            onClick={() => setEstadoAgregarProductos(!EstadoAgregarProductos)}>
                            +
                        </button>
                    </div>
                    {EstadoAgregarProductos && (
                        <div className='container-productos'>
                            <h2>Seleccionar Productos</h2>
                            {elementos.map((producto) => (
                                <div key={producto._id} className='producto'>
                                    <div>{producto.nombre}</div>
                                    <button type='button' onClick={() => handleAgregarProductos(producto)}>
                                        Agregar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <div className='container-Input'>
                    <input className='Input-text' type="text" disabled
                        name="totalOperacion"
                        placeholder='totalOperacion'
                        id='totalOperacion'
                        value={totalOperacion}
                        onChange={(e) => setTotalOperacion(e.target.value)} />
                    <label className='label-tercero' for="">Total Operacion</label>
                </div>

                <div className='container-Input'>
                    <button className='Button-Entrar' type="submit">Enviar</button>
                </div>
            </div>
            {EstadoAlertAccion &&
                <div className='container-Fondo'>
                    <div className='Container-Alert'>
                        <div className='Container-Alert-interno'>
                            <p className='Text-Alert'>
                                <span>Se {Accion} la factura</span>
                                <button className='button-Alert' type="submit" onClick={() => setEstadoAlertAccion(!EstadoAlertAccion)}>Volver</button>
                            </p>
                        </div>
                    </div>
                </div>
            }
            {EstadoAgregarProductos && (
                <div className='container-Fondo'>
                    <div className='container-RegistroTercero3'>
                        <button
                            type="submit"
                            className='Button-Exit2'
                            onClick={() => setEstadoAgregarProductos(!EstadoAgregarProductos)}
                        >
                            X
                        </button>
                        <div className='container-info'>
                            <h1>Agregar Producto</h1>
                            <div className='caja-lista'>
                                {elementos.map((item) => (
                                    <div className='listaProductos' key={item._id}>
                                        <div>
                                            Producto: {item.nombre}
                                        </div>
                                        <div>
                                            {item.unidadMedida}
                                        </div>
                                        <input
                                            type="text"
                                            id={item._id}
                                            value={count[item._id] || ''}
                                            placeholder='cantidad'
                                            onChange={(e) => handleInputChange(item._id, e.target.value)}
                                            className='Input-texto'
                                        />
                                        <div>
                                            {item.valorUnitario}
                                        </div>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(item._id)}
                                        />
                                    </div>
                                ))}
                                <button
                                    type="submit"
                                    className='Button-acciones'
                                    onClick={() => setEstadoAgregarProductos(!EstadoAgregarProductos)}
                                >
                                    agregar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default RegistrarFacturas