const fs = require('fs');
const faker = require('faker');

const numFiles = 10;
const numRowsPerFile = 2000;
const minPrice = 500;
const maxPrice = 20000;
const minStock = 0;
const maxStock = 500;

const generateCsv = (startId) => {
  let csv = 'id,name,price,stock\n';
  const usedNames = new Set();

  for (let i = startId; i < startId + numRowsPerFile; i++) {
    let name = faker.commerce.productName();
    while (usedNames.has(name)) {
      name = faker.commerce.productName();
    }
    usedNames.add(name);

    const price = faker.datatype.number({ min: minPrice, max: maxPrice });
    const stock = faker.datatype.number({ min: minStock, max: maxStock });

    csv += `${i},${name},${price},${stock}\n`;
  }

  return csv;
};

let currentId = 1;

for (let i = 1; i <= numFiles; i++) {
  const csvData = generateCsv(currentId);
  const fileName = `output/product_master_${i.toString().padStart(4, '0')}.csv`;
  fs.writeFileSync(fileName, csvData);
  console.log(`${fileName} generated successfully.`);
  currentId += numRowsPerFile;
}