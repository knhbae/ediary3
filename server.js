// import express from "express";
// import { json, urlencoded } from "body-parser";

const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});
connection.connect();

app.get("/api/test/", (req, res) => {
  res.send([
    {
      id: 1,
      text: {
        goal: "뇌와 과학",
        quantity: "459",
        unit: "pages",
        startDate: "2020-01-01",
        endDate: "2020-04-01",
        period: "91",
        desc: "재밌는 뇌과학 책",
        categoryTag: "#뇌과학 #심리학 #마케팅",
      },
      done: 1,
    },
    {
      id: 2,
      text: {
        goal: "영어회화",
        quantity: "300",
        unit: "Hrs",
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        period: "365",
        desc: "가벼운 Talk가 가능한 수준",
        categoryTag: "#영어 #영어회화 #미드",
      },
      done: 0,
    },
    {
      id: 3,
      text: {
        goal: "2020운동",
        quantity: "100",
        unit: "Hrs",
        startDate: "2020-01-01",
        endDate: "2020-12-31",
        period: "365",
        desc: "2020년 동안 열심히 운동",
        categoryTag: "#운동",
      },
      done: 0,
    },
  ]);
});

app.get("/api/test2/", (req, res) => {
  res.send([
    {
      id: 1,
      text: {
        yyyyww: "2020-13",
        goal: "독서",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        unit: "",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 2,
      text: {
        yyyyww: "2020-13",
        goal: "영어",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        unit: "",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 3,
      text: {
        yyyyww: "2020-14",
        goal: "독서",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        unit: "",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 4,
      text: {
        yyyyww: "2020-15",
        goal: "운동",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        unit: "",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 5,
      text: {
        yyyyww: "2020-16",
        goal: "네트워킹",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        unit: "",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 6,
      text: {
        yyyyww: "2020-17",
        goal: "영어",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        unit: "",
        memo: "aaa",
      },
      done: false,
    },
  ]);
});

app.get("/api/test3/", (req, res) => {
  res.send([
    {
      id: 1,
      text: {
        date: "2020-03-22",
        goal: "독서",
        timeToSpend: "1",
        startRange: "1",
        endRange: "2",
        emotion: "#행복",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 2,
      text: {
        date: "2020-03-22",
        goal: "영어",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        emotion: "#행복",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 3,
      text: {
        date: "2020-03-23",
        goal: "독서",
        timeToSpend: "2",
        startRange: "1",
        endRange: "2",
        emotion: "#행복",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 4,
      text: {
        date: "2020-03-24",
        goal: "운동",
        timeToSpend: "10",
        startRange: "1",
        endRange: "2",
        emotion: "#우울",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 5,
      text: {
        date: "2020-03-24",
        goal: "영어",
        timeToSpend: "2",
        startRange: "1",
        endRange: "2",
        emotion: "#화남",
        memo: "aaa",
      },
      done: false,
    },
    {
      id: 6,
      text: {
        date: "2020-03-24",
        goal: "수학",
        timeToSpend: "2",
        startRange: "1",
        endRange: "2",
        emotion: "#기쁨",
        memo: "aaa",
      },
      done: false,
    },
  ]);
});

app.get("/api/userItems/", (req, res) => {
  connection.query(`select * from user_items`, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/userWeeklyItems/", (req, res) => {
  connection.query(`select * from user_weekly_goals`, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/api/userDailyItems/", (req, res) => {
  connection.query(`select * from user_daily_goals`, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/addUserItem/", (req, res) => {
  let sql =
    "insert into user_items values (null,1,?,?,?,?,?,?,?,?,0,0,now(),now())";
  let goal = req.body.goal === "" ? null : req.body.goal;
  let quantity = req.body.quantity === "" ? null : req.body.quantity;
  let unit = req.body.unit === "" ? null : req.body.unit;
  let startDate = req.body.startDate === "" ? null : req.body.startDate;
  let endDate = req.body.endDate === "" ? null : req.body.endDate;
  let period = req.body.period === "" ? null : req.body.period;
  let description = req.body.desc === "" ? null : req.body.desc;
  let categoryTag = req.body.categoryTag === "" ? null : req.body.categoryTag;
  let params = [
    goal,
    quantity,
    unit,
    startDate,
    endDate,
    period,
    description,
    categoryTag,
  ];
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

app.post("/api/addUserWGoal/", (req, res) => {
  let sql = `insert into user_weekly_goals values (null,1,1,?,?,?,?,?,?,?,0,now(),now(),0)`;
  let yyyyww = req.body.yyyyww === "" ? null : req.body.yyyyww;
  let goal = req.body.goal === "" ? null : req.body.goal;
  let timeToSpend = req.body.timeToSpend === "" ? null : req.body.timeToSpend;
  let startRange = req.body.startRange === "" ? null : req.body.startRange;
  let endRange = req.body.endRange === "" ? null : req.body.endRange;
  let unit = req.body.unit === "" ? null : req.body.unit;
  let memo = req.body.memo === "" ? null : req.body.memo;
  let params = [yyyyww, goal, timeToSpend, startRange, endRange, unit, memo];
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

app.post("/api/addUserDGoal/", (req, res) => {
  let sql = `insert into user_daily_goals values (null,1,?,1,?,?,?,?,?,0,?,0,0,now(),now())`;
  let date = req.body.date === "" ? null : req.body.date;
  let goal = req.body.goal === "" ? null : req.body.goal;
  let timeToSpend = req.body.timeToSpend === "" ? null : req.body.timeToSpend;
  let startRange = req.body.startRange === "" ? null : req.body.startRange;
  let endRange = req.body.endRange === "" ? null : req.body.endRange;
  let emotion = req.body.emotion === "" ? null : req.body.emotion;
  let memo = req.body.memo === "" ? null : req.body.memo;
  let params = [date, goal, timeToSpend, startRange, endRange, emotion, memo];
  console.log(params);
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

app.delete("/api/deleteItem/:id", (req, res) => {
  let sql = "update user_items set isDeleted = 1 where id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/api/deleteWGoal/:id", (req, res) => {
  let sql = "update user_weekly_goals set isDeleted = 1 where id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/api/deleteDGoal/:id", (req, res) => {
  let sql = "update user_daily_goals set isDeleted = 1 where id = ?";
  let params = [req.params.id];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/editUserItem/:id", (req, res) => {
  let sql = `update user_items set 
              goal = ?,
              quantity = ?,
              unit = ?,
              startDate = ?,
              endDate = ?,
              period = ?,
              desciption = ?,
              categoryTag = ?
            where id = ?`;
  let goal = req.body.goal === "" ? null : req.body.goal;
  let quantity = req.body.quantity === "" ? null : req.body.quantity;
  let unit = req.body.unit === "" ? null : req.body.unit;
  let startDate = req.body.startDate === "" ? null : req.body.startDate;
  let endDate = req.body.endDate === "" ? null : req.body.endDate;
  let period = req.body.period === "" ? null : req.body.period;
  let desciption = req.body.desc === "" ? null : req.body.desc;
  let categoryTag = req.body.categoryTag === "" ? null : req.body.categoryTag;
  let params = [
    goal,
    quantity,
    unit,
    startDate,
    endDate,
    period,
    desciption,
    categoryTag,
    req.params.id,
  ];
  console.log(params);
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

app.post("/api/editUserWGoal/:id", (req, res) => {
  console.log(req.body);
  let sql = `update user_weekly_goals set 
              yyyyww = ?,
              goal = ?,
              timeToSpend = ?,
              startRange = ?,
              endRange = ?,
              unit = ?,
              memo = ?,
              updatedate = now()
            where id = ?`;
  let yyyyww = req.body.yyyyww === "" ? null : req.body.yyyyww;
  let goal = req.body.goal === "" ? null : req.body.goal;
  let timeToSpend =
    req.body.timeToSpend * 1.0 === "" ? null : req.body.timeToSpend * 1.0;
  let startRange =
    req.body.startRange * 1.0 === "" ? null : req.body.startRange * 1.0;
  let endRange =
    req.body.endRange * 1.0 === "" ? null : req.body.endRange * 1.0;
  let unit = req.body.unit === "" ? null : req.body.unit;
  let memo = req.body.memo === "" ? null : req.body.memo;
  let params = [
    yyyyww,
    goal,
    timeToSpend,
    startRange,
    endRange,
    unit,
    memo,
    req.params.id,
  ];
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

app.post("/api/editUserDGoal/:id", (req, res) => {
  console.log(req.body);
  let sql = `update user_daily_goals set 
              dodate = ?,
              goal = ?,
              timeToSpend = ?,
              startRange = ?,
              endRange = ?,
              emotion = ?,
              memo = ?,
              updatedate = now()
            where id = ?`;
  let date = req.body.date === "" ? null : req.body.date;
  let goal = req.body.goal === "" ? null : req.body.goal;
  let timeToSpend = req.body.timeToSpend === "" ? null : req.body.timeToSpend;
  let startRange = req.body.startRange === "" ? null : req.body.startRange;
  let endRange = req.body.endRange === "" ? null : req.body.endRange;
  let emotion = req.body.emotion === "" ? null : req.body.emotion;
  let memo = req.body.memo === "" ? null : req.body.memo;
  let params = [
    date,
    goal,
    timeToSpend,
    startRange,
    endRange,
    emotion,
    memo,
    req.params.id,
  ];
  connection.query(sql, params, (err, rows, fileds) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
