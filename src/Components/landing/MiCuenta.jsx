import React from 'react';
import { ClienteLayout, PerfilCliente } from './MisReservas';

const DataField = ({ label, value }) => (
    <div className="mb-2">
        <div className="bg-black text-white px-3 py-2 text-uppercase fw-bold small">
            {label}
        </div>
        <div
            className="px-3 py-2 text-dark"
            style={{ backgroundColor: '#c4c4c4' }}
        >
            {value}
        </div>
    </div>
);

export default function MiCuenta() {
    return (
        <ClienteLayout>
            <PerfilCliente />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                <h2 className="text-uppercase fw-bold mb-0">Gestion de cuenta</h2>
                <button
                    type="button"
                    className="btn text-white border-0 rounded-3 px-4 py-2 fw-bold text-uppercase"
                    style={{ backgroundColor: '#3a3a3a' }}
                >
                    Editar datos personales
                </button>
            </div>

            <div
                className="rounded-3 p-3 p-md-4"
                style={{ backgroundColor: '#2b2b2b' }}
            >
                <div className="row g-4">
                    <div className="col-12 col-lg-6">
                        <DataField label="Nombre Completo" value="Folanito Abecedario Silaba" />
                        <DataField label="Fecha Nacimiento" value="15/08/1990" />
                        <DataField label="Correo Electronico" value="f.abecedario@gmail.com" />
                        <DataField label="Telefono" value="956896523" />
                        <DataField label="Direccion" value="Av. Aviacion S/N" />
                    </div>

                    <div className="col-12 col-lg-6">
                        <DataField
                            label="Metodos de Pago"
                            value={
                                <>
                                    VISA ****5678(EXP:12/26)
                                    <br />
                                    MASTERCARD ****2598(EXP:09/29)
                                </>
                            }
                        />
                        <DataField label="Preferencias Alimentarias" value="Sin Gluten" />
                        <DataField label="Preferencias de Asientos" value="Cerca a la ventana" />
                    </div>
                </div>
            </div>
        </ClienteLayout>
    );
}
