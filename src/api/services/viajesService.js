export const getViajes = async (limit, offset) => {
    const viajes = [
        {id: 1, destination: 'Buenos Aires', origin: 'Córdoba', datetime: '2023-10-01 14:00hs', price: '5000.00', applicants: 3, published: 23},
        {id: 2, destination: 'Mendoza', origin: 'Rosario', datetime: '2023-10-03 10:30hs', price: '6200.00', applicants: 2, published: 18},
        {id: 3, destination: 'Salta', origin: 'Tucumán', datetime: '2023-10-05 08:00hs', price: '4500.00', applicants: 5, published: 25},
        {id: 4, destination: 'Córdoba', origin: 'Buenos Aires', datetime: '2023-10-07 12:45hs', price: '5100.00', applicants: 1, published: 10},
        {id: 5, destination: 'Rosario', origin: 'Mendoza', datetime: '2023-10-09 17:15hs', price: '4800.00', applicants: 4, published: 30},
        {id: 6, destination: 'Tucumán', origin: 'Salta', datetime: '2023-10-11 09:00hs', price: '4600.00', applicants: 2, published: 12},
        {id: 7, destination: 'Mar del Plata', origin: 'La Plata', datetime: '2023-10-13 06:30hs', price: '4300.00', applicants: 6, published: 20},
        {id: 8, destination: 'La Plata', origin: 'Rosario', datetime: '2023-10-15 15:00hs', price: '5500.00', applicants: 3, published: 27},
        {id: 9, destination: 'Neuquén', origin: 'Bariloche', datetime: '2023-10-17 13:00hs', price: '7000.00', applicants: 2, published: 8},
        {id: 10, destination: 'Bariloche', origin: 'Neuquén', datetime: '2023-10-19 11:00hs', price: '7100.00', applicants: 1, published: 5},
        {id: 11, destination: 'Jujuy', origin: 'Salta', datetime: '2023-10-21 16:30hs', price: '4200.00', applicants: 4, published: 22},
        {id: 12, destination: 'San Juan', origin: 'Mendoza', datetime: '2023-10-23 18:00hs', price: '4700.00', applicants: 3, published: 19},
        {id: 13, destination: 'Formosa', origin: 'Resistencia', datetime: '2023-10-25 07:45hs', price: '5100.00', applicants: 5, published: 13},
        {id: 14, destination: 'Corrientes', origin: 'Santa Fe', datetime: '2023-10-27 20:00hs', price: '4900.00', applicants: 2, published: 16},
        {id: 15, destination: 'Santa Fe', origin: 'Córdoba', datetime: '2023-10-29 10:00hs', price: '5000.00', applicants: 4, published: 21},
        {id: 16, destination: 'CABA', origin: 'La Plata', datetime: '2023-10-31 19:30hs', price: '5200.00', applicants: 3, published: 26},
        {id: 17, destination: 'San Luis', origin: 'San Juan', datetime: '2023-11-02 09:30hs', price: '5300.00', applicants: 2, published: 14},
        {id: 18, destination: 'Bahía Blanca', origin: 'La Pampa', datetime: '2023-11-04 13:00hs', price: '4900.00', applicants: 1, published: 7},
        {id: 19, destination: 'Concordia', origin: 'Paraná', datetime: '2023-11-06 07:00hs', price: '4600.00', applicants: 3, published: 17},
        {id: 20, destination: 'Ushuaia', origin: 'Río Grande', datetime: '2023-11-08 12:30hs', price: '8000.00', applicants: 5, published: 28},
        {id: 21, destination: 'Río Gallegos', origin: 'Comodoro Rivadavia', datetime: '2023-11-10 14:45hs', price: '7800.00', applicants: 2, published: 15},
        {id: 22, destination: 'Trelew', origin: 'Puerto Madryn', datetime: '2023-11-12 10:15hs', price: '6000.00', applicants: 1, published: 9},
        {id: 23, destination: 'Esquel', origin: 'Bariloche', datetime: '2023-11-14 11:30hs', price: '7100.00', applicants: 4, published: 24},
        {id: 24, destination: 'San Rafael', origin: 'Mendoza', datetime: '2023-11-16 16:45hs', price: '5500.00', applicants: 2, published: 11},
        {id: 25, destination: 'Posadas', origin: 'Corrientes', datetime: '2023-11-18 18:00hs', price: '5000.00', applicants: 3, published: 20},
        {id: 26, destination: 'Goya', origin: 'Resistencia', datetime: '2023-11-20 06:30hs', price: '4700.00', applicants: 2, published: 6},
        {id: 27, destination: 'Catamarca', origin: 'La Rioja', datetime: '2023-11-22 17:15hs', price: '4800.00', applicants: 4, published: 18},
        {id: 28, destination: 'Santiago del Estero', origin: 'Tucumán', datetime: '2023-11-24 08:45hs', price: '4400.00', applicants: 1, published: 12},
        {id: 29, destination: 'Villa María', origin: 'Córdoba', datetime: '2023-11-26 14:00hs', price: '5200.00', applicants: 3, published: 19},
        {id: 30, destination: 'Merlo', origin: 'San Luis', datetime: '2023-11-28 09:00hs', price: '5100.00', applicants: 2, published: 16},
        {id: 31, destination: 'Azul', origin: 'Tandil', datetime: '2023-11-30 11:30hs', price: '4700.00', applicants: 2, published: 8},
        {id: 32, destination: 'Pergamino', origin: 'Junín', datetime: '2023-12-02 15:30hs', price: '4500.00', applicants: 3, published: 22}
    ]

    await new Promise(resolve => setTimeout(resolve, 500))

    return {
        data: viajes.slice(offset, offset + limit),
        total: viajes.length
    }
}