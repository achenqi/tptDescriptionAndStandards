const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password!23',
  database: 'SandD',
});
const dataMaker = require('./dataGenerator.js');

const standards = dataMaker.standardGenerator();

con.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

for (let j = 0; j < standards.length - 1; j += 1) {
  con.query(`insert into Standards (standards, standardsDescription ) values ('${standards[j]}', '${dataMaker.standardDescriptionGenerator()}');`, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}
for (let i = 0; i < 100; i += 1) {
  con.query(`insert into Product (productDescription, pageLength, answerKeyIncluded, teachingDuration) values ('${dataMaker.descriptionGenerator()}', ${dataMaker.pagesGenerator()}, ${dataMaker.answerKeyGenerator()}, '${dataMaker.teachingDurationGenerator()}');`, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

for (let i = 0; i < 101; i += 1) {
  const rand = Math.floor(Math.random() * 4);
  const randomStandard = Math.floor(Math.random() * standards.length);

  for (let j = 0; j < rand; j += 1) {
    console.log(i, j);

    con.query(`insert into StandardsandDescriptions (Product_id, Standards_id) values (${i}, ${randomStandard + j});`, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  }
}
