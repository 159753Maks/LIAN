import { productMock } from '../product-mock'

const ramFileNames = [
  'kingston-ddr5-32gb-2x16gb-6000mhz(1).jpg',
  'kingston-ddr5-32gb-2x16gb-6000mhz(2).jpg',
  'kingston-ddr5-32gb-2x16gb-6000mhz(3).jpg',
  'kingston-ddr5-32gb-2x16gb-6000mhz(4).jpg',
  'goodram-ddr4-16gb-2x8gb-3200mhz(1).png',
  'goodram-ddr4-16gb-2x8gb-3200mhz(2).png',
  'goodram-ddr4-16gb-2x8gb-3200mhz(3).png',
  'gskill-ddr4-16gb-2x8gb-3200mhz(1).png',
  'gskill-ddr4-16gb-2x8gb-3200mhz(2).png',
  'gskill-ddr4-16gb-2x8gb-3200mhz(3).png',
  'geil-ddr4-8gb-2400mhz(1).jpg',
  'geil-ddr4-8gb-2400mhz(2).jpg',
  'crucial-ddr4-8gb-3200mhz(1).png',
]

export const ramMock = [
  //ОЗП Kingston DDR5 32GB (2x16GB) 6000Mhz FURY Beast RGB
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000000',
    fileName: ramFileNames[0],
    productUid: productMock[22].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000001',
    fileName: ramFileNames[1],
    productUid: productMock[22].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000002',
    fileName: ramFileNames[2],
    productUid: productMock[22].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000003',
    fileName: ramFileNames[3],
    productUid: productMock[22].uid,
  },

  //ОЗП GoodRAM DDR4 16GB (2x8GB) 3200Mhz Iridium X Black
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000004',
    fileName: ramFileNames[4],
    productUid: productMock[23].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000005',
    fileName: ramFileNames[5],
    productUid: productMock[23].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000006',
    fileName: ramFileNames[6],
    productUid: productMock[23].uid,
  },

  //ОЗП G.Skill DDR4 16GB (2x8GB) 3200Mhz Ripjaws V
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000007',
    fileName: ramFileNames[7],
    productUid: productMock[24].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000008',
    fileName: ramFileNames[8],
    productUid: productMock[24].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000009',
    fileName: ramFileNames[9],
    productUid: productMock[24].uid,
  },

  //ОЗП Geil DDR4 8GB 2400MHz
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000010',
    fileName: ramFileNames[10],
    productUid: productMock[25].uid,
  },
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000011',
    fileName: ramFileNames[11],
    productUid: productMock[25].uid,
  },

  //ОЗП Crucial DDR4 8GB 3200Mhz
  {
    uid: '2d4d3f2e-c31c-0000-0050-000000000012',
    fileName: ramFileNames[12],
    productUid: productMock[26].uid,
  },
]
