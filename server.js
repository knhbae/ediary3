// import express from "express";
// import { json, urlencoded } from "body-parser";
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const data = fs.readFileSync("./database.json");
// const conf = JSON.parse(data);
// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: conf.host,
//   user: conf.user,
//   password: conf.password,
//   port: conf.port,
//   database: conf.database
// });
// connection.connect();

app.get("/api/test", (req, res) => {
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
        categoryTag: "#뇌과학 #심리학 #마케팅"
      },
      done: true
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
        categoryTag: "#영어 #영어회화 #미드"
      },
      done: false
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
        categoryTag: "#운동"
      },
      done: false
    }
  ]);
});

// app.get("/api/objectItems", (req, res) => {
//   connection.query("select * from object_item", (err, rows, fields) => {
//     res.send(rows);
//   });
// });

// app.get("/api/userEmotions", (req, res) => {
//   connection.query("select * from User_Emotion", (err, rows, fields) => {
//     res.send(rows);
//   });
// });

// /* 2020.02.22 deleted for adding rank
// app.get("/api/userHistory", (req, res) => {
//   connection.query(
//     "select * from user_history where isDeleted = 0",
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   );
// }); */

// app.get("/api/userHistory", (req, res) => {
//   connection.query(
//     `select 	c.*, d.percent
//     from 	user_history c left join
//         (select  y.item_id, ifnull(x.a_cnt, 0)/y.q_cnt as percent
//         from	(select 	b.item_id, count(b.item_id) as q_cnt
//         from	object_item a left join
//             item_questions b
//         on		a.id = b.item_id
//         group	by b.item_id) y left join
//         (select 	b.item_id, count(b.item_id) as a_cnt
//         from	object_item a,
//             question_answers b
//         where	a.id = b.item_id
//         group 	by b.item_id) x
//         on	x.item_id = y.item_id) d
//     on		c.item_id = d.item_id
//     where	c.isDeleted = 0`,
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   );
// });

// app.post("/api/historys", (req, res) => {
//   let sql = "insert into user_history values (null,?,?,now(),0,?,?)";
//   let item = req.body.item;
//   let emotion = req.body.emotion;
//   let item_id = req.body.item_id;
//   let emotion_id = req.body.emotion_id;
//   console.log(item, emotion, item_id, emotion_id);
//   let params = [item, emotion, item_id, emotion_id];
//   connection.query(sql, params, (err, rows, fileds) => {
//     res.send(rows);
//   });
// });

// app.delete("/api/historys/:id", (req, res) => {
//   let sql = "update user_history set isDeleted = 1 where id = ?";
//   let params = [req.params.id];
//   connection.query(sql, params, (err, rows, fields) => {
//     res.send(rows);
//   });
// });

// app.post("/api/addQuestionAnswers", (req, res) => {
//   let sql = "insert into question_answers values (null,?,?,?,0,now(),?)";
//   let history_id = req.body.history_id;
//   let question_id = req.body.question_id;
//   let answer = req.body.answer;
//   let item_id = req.body.item_id;
//   console.log(history_id, question_id, answer, item_id);
//   debugger;
//   let params = [history_id, question_id, answer, item_id];
//   connection.query(sql, params, (err, rows, fileds) => {
//     res.send(rows);
//   });
// });

// app.get("/api/userQuestion/:id", (req, res) => {
//   // let params = 1;
//   let sql =
//     "select 	a.*,b.*, a.id as qid, a.item_id as qitem_id from	item_questions a left join question_answers b on  a.id = b.question_id where	b.question_id is null and		a.item_id = ? limit   1";
//   let params = [req.params.id];
//   connection.query(sql, params, (err, rows, fields) => {
//     res.send(rows);
//   });
// });

// app.post("/api/addHistoryDetails", (req, res) => {
//   let sql =
//     "insert into user_history_details values (null,?,?,?,?,?,?,?,0,now())";
//   let history_id = req.body.history_id;
//   let item_id = req.body.item_id;
//   let sub_item_id = req.body.sub_item_id;
//   let sub_title = req.body.sub_title;
//   let duration = req.body.duration;
//   let progress = req.body.progress;
//   let memo = req.body.memo;

//   let params = [
//     history_id,
//     item_id,
//     sub_item_id,
//     sub_title,
//     duration,
//     progress,
//     memo
//   ];
//   console.log(params);
//   connection.query(sql, params, (err, rows, fileds) => {
//     res.send(rows);
//   });
//   // console.log(err);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
