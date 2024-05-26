import { productMock } from '../product-mock'

const memoryFileNames = [
    'toshiba-p300-1tb-64mb-7200rpm(1).png',
    'toshiba-p300-1tb-64mb-7200rpm(2).png',
    'toshiba-p300-1tb-64mb-7200rpm(3).png',
    'western-digital-caviar-blue-1tb-64mb-7200rpm(1).png',
    'seagate-barracuda-2tb-128mb-5400rpm(1).jpg',
    'seagate-barracuda-2tb-128mb-5400rpm(2).jpg',
    'seagate-barracuda-2tb-128mb-5400rpm(3).jpg',
    'kingston-nv2-3d-nand-1tb-m2-2280(1).jpg',
    'kingston-nv2-3d-nand-1tb-m2-2280(2).jpg',
    'kingston-nv2-3d-nand-1tb-m2-2280(3).jpg',
    'kingston-kc3000-3d-nand-tlc-1tb-m2-2280(1).jpg',
    'kingston-kc3000-3d-nand-tlc-1tb-m2-2280(2).jpg',
    'kingston-kc3000-3d-nand-tlc-1tb-m2-2280(3).jpg',
    'samsung-970-evo-plus-v-nand-mlc-1tb-m2(1).jpg',
    'samsung-970-evo-plus-v-nand-mlc-1tb-m2(2).jpg',
    'samsung-970-evo-plus-v-nand-mlc-1tb-m2(3).jpg',
]

export const memoryMock = [
    //Жорсткий диск Toshiba P300 1TB 64MB 7200RPM 3.5"
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000000',
        fileName: memoryFileNames[0],
        productUid: productMock[11].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000001',
        fileName: memoryFileNames[1],
        productUid: productMock[11].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000002',
        fileName: memoryFileNames[2],
        productUid: productMock[11].uid,
    },

    //Жорсткий диск Western Digital Blue 1TB 64MB 3.5"
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000003',
        fileName: memoryFileNames[3],
        productUid: productMock[12].uid,
    },

    //Жорсткий диск Seagate BarraCuda 2TB 128MB 5400RPM 2.5"
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000004',
        fileName: memoryFileNames[4],
        productUid: productMock[13].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000005',
        fileName: memoryFileNames[5],
        productUid: productMock[13].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000006',
        fileName: memoryFileNames[6],
        productUid: productMock[13].uid,
    },

    //SSD-диск Kingston NV2 3D NAND 1TB M.2 NVMe x4
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000007',
        fileName: memoryFileNames[7],
        productUid: productMock[14].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000008',
        fileName: memoryFileNames[8],
        productUid: productMock[14].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000009',
        fileName: memoryFileNames[9],
        productUid: productMock[14].uid,
    },

    //SSD-диск Kingston KC3000 3D NAND TLC 1TB M.2 NVMe x4
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000010',
        fileName: memoryFileNames[10],
        productUid: productMock[15].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000011',
        fileName: memoryFileNames[11],
        productUid: productMock[15].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000012',
        fileName: memoryFileNames[12],
        productUid: productMock[15].uid,
    },

    //SSD-диск Samsung 970 Evo Plus V-NAND MLC 1TB M.2
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000013',
        fileName: memoryFileNames[13],
        productUid: productMock[16].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000014',
        fileName: memoryFileNames[14],
        productUid: productMock[16].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0030-000000000015',
        fileName: memoryFileNames[15],
        productUid: productMock[16].uid,
    },

]