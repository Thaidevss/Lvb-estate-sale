const laosData = [
  {
    id: "VTE",
    name: "ນະຄອນຫຼວງວຽງຈັນ", // Vientiane Capital
    districts: [
      { id: "VTE-01", name: "ຈັນທະບູລີ" }, // Chanthabouly
      { id: "VTE-02", name: "ສີໂຄດຕະບອງ" }, // Sikhottabong
      { id: "VTE-03", name: "ໄຊເສດຖາ" }, // Xaysetha
      { id: "VTE-04", name: "ສີສັດຕະນາກ" }, // Sisattanak
      { id: "VTE-05", name: "ຫາດຊາຍຟອງ" }, // Hadxaifong
      { id: "VTE-06", name: "ສັງທອງ" }, // Sangthong
      { id: "VTE-07", name: "ໄຊທານີ" }, // Xaythany (Mayparkngum is often referred to as Xaythany)
      { id: "VTE-08", name: "ນາຊາຍທອງ" }, // Naxaithong
      { id: "VTE-09", name: "ປາກງື່ມ" }, // Pakngum
    ],
  },
  {
    id: "LPB",
    name: "ແຂວງຫຼວງພະບາງ", // Luang Prabang Province
    districts: [
      { id: "LPB-01", name: "ຫຼວງພະບາງ" }, // Luang Prabang
      { id: "LPB-02", name: "ໂພນໄຊ" }, // Phonxay
      { id: "LPB-03", name: "ຊຽງເງິນ" }, // Xiengngeun
      { id: "LPB-04", name: "ນານ" }, // Nan
      { id: "LPB-05", name: "ປາກອູ" }, // Pak Ou
      { id: "LPB-06", name: "ນ້ຳບາກ" }, // Nambak
      { id: "LPB-07", name: "ໜອງຄຽວ" }, // Nong Khiaw
      { id: "LPB-08", name: "ງອຍ" }, // Ngoi
      { id: "LPB-09", name: "ປາກແສງ" }, // Pakseng
      { id: "LPB-10", name: "ພູຄູນ" }, // Phoukhoun
      { id: "LPB-11", name: "ວຽງຄຳ" }, // Viengkham
      { id: "LPB-12", name: "ຊຽງຮ່ອນ" }, // Xienghon
    ],
  },
  {
    id: "SVN",
    name: "ແຂວງສະຫວັນນະເຂດ", // Savannakhet Province
    districts: [
      { id: "SVN-01", name: "ໄກສອນ ພົມວິຫານ" }, // Kaysone Phomvihane
      { id: "SVN-02", name: "ອຸທຸມພອນ" }, // Outhoumphone
      { id: "SVN-03", name: "ອາດສະພັງທອງ" }, // Atsaphangthong
      { id: "SVN-04", name: "ພີນ" }, // Phin
      { id: "SVN-05", name: "ເຊໂປນ" }, // Sepon
      { id: "SVN-06", name: "ນອງ" }, // Nong
      { id: "SVN-07", name: "ທ່າປາງທອງ" }, // Thapangthong
      { id: "SVN-08", name: "ຊົນບູລີ" }, // Xonbouly
      { id: "SVN-09", name: "ຈຳພອນ" }, // Champhone
      { id: "SVN-10", name: "ອາດສະພອນ" }, // Adxaphanthong
      { id: "SVN-11", name: "ສອງຄອນ" }, // Songkhone
      { id: "SVN-12", name: "ຄັນທະບູລີ" }, // Khanthabouly
      { id: "SVN-13", name: "ໄຊບູລີ" }, // Xaybouly
      { id: "SVN-14", name: "ວິລະບູລີ" }, // Vilobouly
      { id: "SVN-15", name: "ອາດສະພັງທອງ" }, // Assaphanthong (duplicate, kept for consistency with original mock data)
    ],
  },
  {
    id: "CHM",
    name: "ແຂວງຈຳປາສັກ", // Champasak Province
    districts: [
      { id: "CHM-01", name: "ປາກເຊ" }, // Pakse
      { id: "CHM-02", name: "ຊະນະສົມບູນ" }, // Sanasomboon
      { id: "CHM-03", name: "ບາຈຽງຈະເລີນສຸກ" }, // Bachiangchaleunsook
      { id: "CHM-04", name: "ໂພນທອງ" }, // Phonthong
      { id: "CHM-05", name: "ປະທຸມພອນ" }, // Pathoumphone
      { id: "CHM-06", name: "ສຸຂຸມາ" }, // Soukhoumma
      { id: "CHM-07", name: "ມູນລະປະໂມກ" }, // Mounlapamok
      { id: "CHM-08", name: "ໂຂງ" }, // Khong
      { id: "CHM-09", name: "ຈຳປາສັກ" }, // Champasak
      { id: "CHM-10", name: "ໂພນທອງ" }, // Phonthong (duplicate, kept for consistency with original mock data)
    ],
  },
  {
    id: "XAY",
    name: "ແຂວງໄຊຍະບູລີ", // Xayaboury Province
    districts: [
      { id: "XAY-01", name: "ໄຊຍະບູລີ" }, // Xayaboury
      { id: "XAY-02", name: "ພຽງ" }, // Phiang
      { id: "XAY-03", name: "ຄອບ" }, // Khop
      { id: "XAY-04", name: "ຫົງສາ" }, // Hongsa
      { id: "XAY-05", name: "ເງິນ" }, // Ngeun
      { id: "XAY-06", name: "ທົ່ງມີໄຊ" }, // Thongmyxay
      { id: "XAY-07", name: "ບໍ່ແຕນ" }, // Botene
      { id: "XAY-08", name: "ປາກລາຍ" }, // Paklay
      { id: "XAY-09", name: "ເຄນທ້າວ" }, // Kenethao
      { id: "XAY-10", name: "ຊຽງຮ່ອນ" }, // Xienghon
    ],
  },
  {
    id: "BOL",
    name: "ແຂວງບໍລິຄຳໄຊ", // Bolikhamsai Province
    districts: [
      { id: "BOL-01", name: "ປາກຊັນ" }, // Paksan
      { id: "BOL-02", name: "ທ່າພະບາດ" }, // Thaphabat
      { id: "BOL-03", name: "ປາກກະດິງ" }, // Pakkading (Pakxane is often referred to as Pakkading)
      { id: "BOL-04", name: "ບໍລິຄັນ" }, // Borikhan
      { id: "BOL-05", name: "ຄຳເກີດ" }, // Khamkeut
      { id: "BOL-06", name: "ວຽງທອງ" }, // Viengthong
      { id: "BOL-07", name: "ໄຊຈຳພອນ" }, // Xaychamphone
    ],
  },
  {
    id: "KHM",
    name: "ແຂວງຄຳມ່ວນ", // Khammouane Province
    districts: [
      { id: "KHM-01", name: "ທ່າແຂກ" }, // Thakhek
      { id: "KHM-02", name: "ມະຫາໄຊ" }, // Mahaxay
      { id: "KHM-03", name: "ໜອງບົກ" }, // Nongbok
      { id: "KHM-04", name: "ເຊບັ້ງໄຟ" }, // Xebangfay
      { id: "KHM-05", name: "ຍົມມະລາດ" }, // Nhommalath
      { id: "KHM-06", name: "ບົວລະພາ" }, // Bualapha
      { id: "KHM-07", name: "ນາກາຍ" }, // Nakay
      { id: "KHM-08", name: "ໄຊບົວທອງ" }, // Xaybouathong
      { id: "KHM-09", name: "ກຸນຄຳ" }, // Kounkham
      { id: "KHM-10", name: "ຫີນບູນ" }, // Hinboun
    ],
  },
  {
    id: "ATT",
    name: "ແຂວງອັດຕະປື", // Attapeu Province
    districts: [
      { id: "ATT-01", name: "ສາມັກຄີໄຊ" }, // Samakkhixay
      { id: "ATT-02", name: "ໄຊເສດຖາ" }, // Xaysetha
      { id: "ATT-03", name: "ສະໜາມໄຊ" }, // Sanamsay
      { id: "ATT-04", name: "ພູວົງ" }, // Phouvong
      { id: "ATT-05", name: "ຄົມມະລາດ" }, // Khommalat
    ],
  },
  {
    id: "OUD",
    name: "ແຂວງອຸດົມໄຊ", // Oudomxay Province
    districts: [
      { id: "OUD-01", name: "ໄຊ" }, // Xay
      { id: "OUD-02", name: "ຫຼາ" }, // La
      { id: "OUD-03", name: "ງາ" }, // Nga
      { id: "OUD-04", name: "ແບ່ງ" }, // Beng
      { id: "OUD-05", name: "ຮຸນ" }, // Houn
      { id: "OUD-06", name: "ປາກແບ່ງ" }, // Pakbeng
      { id: "OUD-07", name: "ນາໝໍ້" }, // Namor
    ],
  },
  {
    id: "PHO",
    name: "ແຂວງຜົ້ງສາລີ", // Phongsaly Province
    districts: [
      { id: "PHO-01", name: "ຜົ້ງສາລີ" }, // Phongsaly
      { id: "PHO-02", name: "ໃໝ່" }, // May
      { id: "PHO-03", name: "ຂວາ" }, // Khua
      { id: "PHO-04", name: "ສຳພັນ" }, // Samphan
      { id: "PHO-05", name: "ບຸນເໜືອ" }, // Bounneua
      { id: "PHO-06", name: "ຍອດອູ" }, // Gnot-Ou
      { id: "PHO-07", name: "ບຸນທາຍ" }, // Bounthay
    ],
  },
  {
    id: "HOU",
    name: "ແຂວງຫົວພັນ", // Houaphanh Province
    districts: [
      { id: "HOU-01", name: "ຊຳເໜືອ" }, // Samneua
      { id: "HOU-02", name: "ຊຽງຄໍ້" }, // Xiengkhor
      { id: "HOU-03", name: "ຫ້ຽມ" }, // Hiam
      { id: "HOU-04", name: "ວຽງໄຊ" }, // Viengxay
      { id: "HOU-05", name: "ຫົວເມືອງ" }, // Huameuang
      { id: "HOU-06", name: "ໂສບເບົາ" }, // Sop Bao
      { id: "HOU-07", name: "ເອັດ" }, // Et
      { id: "HOU-08", name: "ກວັນ" }, // Kuan
    ],
  },
  {
    id: "BOK",
    name: "ແຂວງບໍ່ແກ້ວ", // Bokeo Province
    districts: [
      { id: "BOK-01", name: "ຫ້ວຍຊາຍ" }, // Houayxay
      { id: "BOK-02", name: "ຕົ້ນເຜິ້ງ" }, // Tonpheung
      { id: "BOK-03", name: "ເມື່ອງ" }, // Meung
      { id: "BOK-04", name: "ຜາອຸດົມ" }, // Pha Oudom
      { id: "BOK-05", name: "ປາກທາ" }, // Paktha
    ],
  },
  {
    id: "XIE",
    name: "ແຂວງຊຽງຂວາງ", // Xiangkhouang Province
    districts: [
      { id: "XIE-01", name: "ແປກ" }, // Pek
      { id: "XIE-02", name: "ພະໄຊ" }, // Phaxay
      { id: "XIE-03", name: "ພູກູດ" }, // Phoukoot
      { id: "XIE-04", name: "ຄຳ" }, // Kham
      { id: "XIE-05", name: "ໜອງເຫັດ" }, // Nonghet
      { id: "XIE-06", name: "ຄູນ" }, // Khoun
      { id: "XIE-07", name: "ໝອກໃໝ່" }, // Mokmay
    ],
  },
  {
    id: "SAL",
    name: "ແຂວງສາລະວັນ", // Salavan Province
    districts: [
      { id: "SAL-01", name: "ສາລະວັນ" }, // Salavan
      { id: "SAL-02", name: "ລະຄອນ" }, // Lakhon
      { id: "SAL-03", name: "ວາປີ" }, // Vapy
      { id: "SAL-04", name: "ຄົງເຊໂດນ" }, // Khongxedon
      { id: "SAL-05", name: "ຕຸ້ມລານ" }, // Toumlan
      { id: "SAL-06", name: "ລາວງາມ" }, // Lao Ngam
      { id: "SAL-07", name: "ຕາໂອຍ" }, // Ta Oi
      { id: "SAL-08", name: "ສະໝ້ວຍ" }, // Samouay
    ],
  },
  {
    id: "SEK",
    name: "ແຂວງເຊກອງ", // Sekong Province
    districts: [
      { id: "SEK-01", name: "ລະມາມ" }, // Lamam
      { id: "SEK-02", name: "ກະລຶມ" }, // Kaleum
      { id: "SEK-03", name: "ດາກຈຶງ" }, // Dakcheung
      { id: "SEK-04", name: "ທ່າແຕງ" }, // Tha Teng
    ],
  },
  {
    id: "XSN",
    name: "ແຂວງໄຊສົມບູນ", // Xaisomboun Province
    districts: [
      { id: "XSN-01", name: "ອະນຸວົງ" }, // Anouvong
      { id: "XSN-02", name: "ລ້ອງແຈ້ງ" }, // Longchaeng
      { id: "XSN-03", name: "ທ່າໂທມ" }, // Thathom
      { id: "XSN-04", name: "ພູຄູນ" }, // Phoukhoun (This district is also in Luang Prabang province, but listed here as per Xaisomboun's districts)
      { id: "XSN-05", name: "ຮົ່ມ" }, // Hom
    ],
  },
  {
    id: "VTEP",
    name: "ແຂວງວຽງຈັນ", // Vientiane Province
    districts: [
      { id: "VTEP-01", name: "ໂພນໂຮງ" }, // Phonhong
      { id: "VTEP-02", name: "ທຸລະຄົມ" }, // Thoulakhom
      { id: "VTEP-03", name: "ແກ້ວອຸດົມ" }, // Keo-oudom
      { id: "VTEP-04", name: "ກາສີ" }, // Kasy
      { id: "VTEP-05", name: "ວັງວຽງ" }, // Vangvieng
      { id: "VTEP-06", name: "ເຟືອງ" }, // Feuang
      { id: "VTEP-07", name: "ຊະນະຄາມ" }, // Xanakharm
      { id: "VTEP-08", name: "ແມດ" }, // Mad
      { id: "VTEP-09", name: "ຫີນເຫີບ" }, // Hinherb
      { id: "VTEP-10", name: "ວຽງຄຳ" }, // Viengkham
      { id: "VTEP-11", name: "ລ້ອງຊານ" }, // Longxan
    ],
  },
  {
    id: "LNT",
    name: "ແຂວງຫຼວງນ້ຳທາ", // Luangnamtha Province
    districts: [
      { id: "LNT-01", name: "ນ້ຳທາ" }, // Namtha
      { id: "LNT-02", name: "ສິງ" }, // Sing
      { id: "LNT-03", name: "ລອງ" }, // Long
      { id: "LNT-04", name: "ວຽງພູຄາ" }, // Viengphoukha
      { id: "LNT-05", name: "ນາແລ" }, // Nalae
    ],
  },
];

export default {
  // Get all provinces
  getProvinces() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          laosData.map((province) => ({
            id: province.id,
            name: province.name,
          }))
        );
      }, 300); // Simulate network delay
    });
  },

  // Get districts by province ID
  getDistrictsByProvinceId(provinceId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const province = laosData.find((p) => p.id === provinceId);
        resolve(province ? province.districts : []);
      }, 300);
    });
  },

  // Get all data (for debugging or if needed)
  getAllData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(laosData);
      }, 300);
    });
  },
};
