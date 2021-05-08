const { count } = require("console");
const https = require("https");

https
  .get(
    "https://raw.githubusercontent.com/gunasekharravilla/code-07052021-Gunasekhar-Ravilla/master/users",
    (res) => {
      let data = [];

      res.on("data", (chunk) => {
        data.push(chunk);
      });

      res.on("end", () => {
        console.log("NodeJs BMI Calculator Coding Challenge");
        const users = JSON.parse(Buffer.concat(data).toString());

        for (user of users) {
          user.HeightMt = user.HeightCm / 100;
          user.BMI = (user.WeightKg / (user.HeightMt * user.HeightMt)).toFixed(
            2
          );
        }

        for (user of users) {
          user.Category = "";
          if (user.BMI < 18.4) {
            user.Category = "Underweight";
          } else if (18.5 <= user.BMI && user.BMI <= 24.9) {
            user.Category = "Normal Weight";
          } else if (25 <= user.BMI && user.BMI <= 29.9) {
            user.Category = "Overweight";
          } else if (30 <= user.BMI && user.BMI <= 34.9) {
            user.Category = "Moderately Obese";
          } else if (35 <= user.BMI && user.BMI <= 39.9) {
            user.Category = "Severely obese";
          } else if (40 <= user.BMI) {
            user.Category = "Very Severely obese";
          }
        }
        for (user of users) {
          user.Health_Risk = "";
          if (user.BMI < 18.4) {
            user.Health_Risk = "Malnutrition Risk";
          } else if (18.5 <= user.BMI && user.BMI <= 24.9) {
            user.Health_Risk = "Low Risk";
          } else if (25 <= user.BMI && user.BMI <= 29.9) {
            user.Health_Risk = "Enhanced Risk";
          } else if (30 <= user.BMI && user.BMI <= 34.9) {
            user.Health_Risk = "Medium Risk";
          } else if (35 <= user.BMI && user.BMI <= 39.9) {
            user.Health_Risk = "High Risk";
          } else if (40 <= user.BMI) {
            user.Health_Risk = "Very High Risk";
          }
        }
        console.table(users);
        var count = [];
        for (user of users) {
          if (
            user.Category == "Overweight" ||
            user.Category == "Moderately Obese" ||
            user.Category == "Severely obese" ||
            user.Category == "Very Severely obese"
          ) {
            // I considered above 25 BMI is overweight people
            count++;
          }
        }
        console.log("Total No.of above overweight");
        console.log(count);
      });
    }
  )

  .on("error", (err) => {
    console.log("Error: ", err.message);
  });
