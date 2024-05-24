import { productMock } from '../product-mock'

const processorsFileNames = [
    'intel-core-i5-12400f-2544ghz-18mb-s1700-box.png',
    'intel-core-i5-11400f-26ghz-12mb-s1200-tray.png',
    'amd-ryzen-5-3600-3642ghz-32mb-sam4-box(1).png',
    'amd-ryzen-5-3600-3642ghz-32mb-sam4-box(2).jpg',
    'amd-ryzen-5-3600-3642ghz-32mb-sam4-box(3).jpg',
    'amd-ryzen-7-7800x3d-4250ghz-96mb-sam5-box(1).jpg',
    'amd-ryzen-7-7800x3d-4250ghz-96mb-sam5-box(2).png',
    'intel-pentium-gold-g6405-41ghz-4mb-s1200-box.png',
]

export const processorsMock = [
    //Процесор Intel Core i5-12400F 2.5(4.4)GHz 18MB s1700 Box
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000000',
        fileName: processorsFileNames[0],
        productUid: productMock[27].uid,
    },

    //Процесор Intel Core i5-11400F 2.6(4.4)GHz 12MB s1200 Tray 
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000001',
        fileName: processorsFileNames[1],
        productUid: productMock[28].uid,
    },

    //Процесор AMD Ryzen 5 3600 3.6(4.2)GHz 32MB sAM4 Box
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000002',
        fileName: processorsFileNames[2],
        productUid: productMock[29].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000003',
        fileName: processorsFileNames[3],
        productUid: productMock[29].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000004',
        fileName: processorsFileNames[4],
        productUid: productMock[29].uid,
    },

    //Процесор AMD Ryzen 7 7800X3D 4.2(5.0)GHz 96MB sAM5 Box
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000005',
        fileName: processorsFileNames[5],
        productUid: productMock[30].uid,
    },
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000006',
        fileName: processorsFileNames[6],
        productUid: productMock[30].uid,
    },

    //Процесор Intel Pentium Gold G6405 4.1GHz 4MB s1200 Box
    {
        uid: '2d4d3f2e-c31c-0000-0060-000000000007',
        fileName: processorsFileNames[7],
        productUid: productMock[31].uid,
    },
]