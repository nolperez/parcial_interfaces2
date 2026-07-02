import React from 'react'

export default function Bebidas() {
    const secciones = [
        {
            titulo: 'Coctelería Tradicional Peruana',
            items: [
                {
                    nombre: 'Pisco Sour Clásico',
                    precio: 'S/ 28.00',
                    descripcion: 'Nuestra bebida bandera. Pisco Quebranta premium, jugo de limón fresco, jarabe de goma, clara de huevo y gotas de amargo de angostura.'
                },
                {
                    nombre: 'Chilcano de Pisco Premium',
                    precio: 'S/ 26.00',
                    descripcion: 'Refrescante combinación de Pisco Acholado, Canada Dry ginger ale, zumo de limón y un toque de amargo de angostura.'
                },
                {
                    nombre: 'Chilcano de Maracuyá o Aguaymanto',
                    precio: 'S/ 28.00',
                    descripcion: 'Variación frutal con pulpa natural de maracuyá exótica o aguaymanto andino, pisco y ginger ale.'
                },
                {
                    nombre: 'Pisco Tonic',
                    precio: 'S/ 29.00',
                    descripcion: 'Pisco Mosto Verde Italia artesanal, agua tónica premium, rodaja de limón y una rama de romero ahumado.'
                }
            ]
        },
        {
            titulo: 'Tragos de la Casa e Internacionales',
            items: [
                {
                    nombre: 'Fire Pit Smoked Old Fashioned',
                    precio: 'S/ 36.00',
                    descripcion: 'Bourbon infusionado, bíter de naranja, azúcar rubia, ahumado al momento con madera de manzano en mesa. Perfecto para acompañar cortes premium.'
                },
                {
                    nombre: 'Maracuyá Sour al Fuego',
                    precio: 'S/ 29.00',
                    descripcion: 'Pisco, néctar de maracuyá y un toque secreto especiado de la casa con borde de sal volcánica.'
                },
                {
                    nombre: 'Gin Tonic de la Casa',
                    precio: 'S/ 34.00',
                    descripcion: 'Gin premium, agua tónica, bayas de enebro, rodaja de pepino y perfumado con piel de toronja.'
                }
            ]
        },
        {
            titulo: 'Vinos por Copa y Botella',
            items: [
                {
                    nombre: 'Malbec Gran Reserva (Argentina)',
                    precio: 'S/ 140.00',
                    descripcion: 'Copa / Botella. Un tinto robusto de excelente cuerpo, notas de frutos rojos maduros y vainilla. El maridaje perfecto para nuestro Combo Parrillero.'
                },
                {
                    nombre: 'Cabernet Sauvignon Reserva (Chile)',
                    precio: 'S/ 120.00',
                    descripcion: 'Copa / Botella. Estructurado, con taninos firmes y notas de pimienta negra y chocolate negro. Especial para cortes de carne intensos.'
                },
                {
                    nombre: 'Tempranillo Crianza (España)',
                    precio: 'S/ 150.00',
                    descripcion: 'Copa / Botella. Elegante y equilibrado, con sutiles notas de madera noble y frutos del bosque.'
                }
            ]
        },
        {
            titulo: 'Bebidas Tradicionales sin Alcohol',
            items: [
                {
                    nombre: 'Chicha Morada de la Casa (Jarra / Vaso)',
                    precio: 'S/ 29.00 - S/ 10.00',
                    descripcion: 'Preparada artesanalmente con maíz morado selecto, piña, manzana, membrillo, canela y clavo de olor, con un toque fresco de limón.'
                },
                {
                    nombre: 'Limonada Cero / Hierbaluisa',
                    precio: 'S/ 10.00',
                    descripcion: 'Refrescante limonada natural o infusión fría de hierbaluisa con hielo.'
                },
                {
                    nombre: 'Limonada Cero / Hierbaluisa',
                    precio: 'S/ 8.00',
                    descripcion: 'Botella de vidrio de 350ml. Variedades regular y zero.'
                }
            ]
        }
    ]

    return (
        <div className="bg-black text-white min-vh-100 py-3">
            <div className="container">

                <div className="text-center mb-4">
                    <div className="d-inline-block px-4 py-2">
                        <h1 className="text-white fw-bold text-uppercase mb-0">
                            Gourmet Fire Pit
                        </h1>
                        <p className="text-danger text-uppercase fw-bold fst-italic mb-0">
                            Parrilla de Calidad
                        </p>
                        <p className="text-warning text-uppercase mb-0">
                            Carta de Bebidas
                        </p>
                    </div>
                </div>

                <div className="border-top border-danger border-3 mb-4"></div>

                {secciones.map((seccion, index) => (
                    <div key={index} className="mb-4">
                        <h6 className="text-danger text-uppercase mb-2">
                            {seccion.titulo}
                        </h6>

                        {seccion.items.map((item, i) => (
                            <div key={i} className="border-bottom border-secondary pb-2 mb-2">
                                <div className="d-flex justify-content-between gap-3">
                                    <h6 className="text-warning mb-1">
                                        {item.nombre}
                                    </h6>
                                    <p className="text-white mb-0 text-nowrap">
                                        {item.precio}
                                    </p>
                                </div>

                                <p className="mb-0">
                                    {item.descripcion}
                                </p>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </div>
    )
}