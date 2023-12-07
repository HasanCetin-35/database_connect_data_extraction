const express = require("express");
const bodyParser = require("body-parser");
const getData = require("./api.js");
const { Client } = require("pg");
const readline = require("readline");

const app = express();
const port = 3000;

// PostgreSQL bağlantı bilgileri
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123456",
  database: "Users",
});
client
  .connect()
  .then(() => {
    console.log("PostgreSQL veritabanına başarıyla bağlandı");

    // Veritabanındaki bir tablodan veri çekme örneği
    return client.query("SELECT * FROM foods");
  })
  .then((result) => {
    // Çekilen veriyi konsola yazdır
    console.log("Tablo verisi:", result.rows);
  })
  .catch((err) => {
    console.error("PostgreSQL bağlantı hatası:", err);
  });

// JSON verileri işlemek için body-parser kullanma
app.use(express.json());

// Elma ve miktarı gibi verileri eklemek için POST endpoint'i
app.get("/api/kaydet", async (req, res) => {
  try {
    const data = await getData; // getData fonksiyonunu çağırarak veriyi al
    console.log("DATAM", data);

    const sql =
      "INSERT INTO foods(food_name,food_calorie,protein,carbohydrate,sugar,fat,category) VALUES ($1,$2,$3,$4,$5,$6,'dinner')";
    const values = [
      data[0].name,
      data[0].calories,
      data[0].protein_g,
      data[0].carbohydrates_total_g,
      data[0].sugar_g,
      data[0].fat_total_g,
    ];
    console.log(values);
    // BURADA SIKINTI VAR
    client.query(sql, values);
    //Başarılı olduğunu yanıt olarak gönder
    //console.log(`Data saved successfully: ${JSON.stringify(result.rows)}`);

    res.status(201).json({ message: "Veri başarıyla eklendi" });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({ error: "Bir hata oluştu" });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalisiyor`);
});
