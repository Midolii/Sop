const models = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');

const conn = mysql.createConnection(models.mysql);
conn.connect();

// company的登录接口
router.post('/logincompany',(req,res)=>{
	const user = req.body;
	const sel_username = $sql.company.select + " where username = '" + user.username + "'";
	console.log(sel_username);
	conn.query(sel_username, user.username, (error, results)=>{
		if (error) {
			throw error;
		}
		console.log(results)
		if (results[0] === undefined) {
			res.send("-1");  // -1 表示查询不到，用户不存在，即账户填写错误
		} else{
			if (results[0].username == user.username && results[0].password == user.password) {
				res.send("0");  // 0 表示用户存在并且账户密码正确
			} else{
				res.send("1");  // 1 表示用户存在，但密码不正确
			}
		}
	})
});

// 注册接口
router.post('/add', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.company.select + " where username = '" + params.username + "'";
	const add_sql = $sql.company.add;
	console.log(sel_sql);
	
	conn.query(sel_sql, params.username, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0 && params.username == results[0].username) {
			res.send("-1");   // -1 表示用户名已经存在
		} else {
			conn.query(add_sql, [params.username, params.password], (err, rst) => {
				if (err) {
					console.log(err);
				} else{
					console.log(rst);
					res.send("0"); // 0 表示用户创建成功
				}
			});
		}
	});
});

// review的登录接口
router.post('/loginreview',(req,res)=>{
	const user = req.body;
	const sel_userid = $sql.review.select + " where userid = '" + user.userid + "'";
	console.log(sel_userid);
	conn.query(sel_userid, user.userid, (error, results)=>{
		if (error) {
			throw error;
		}
		console.log(results)
		if (results[0] === undefined) {
			res.send("-1");  // -1 表示查询不到，用户不存在，即邮箱填写错误
		} else{
			if (results[0].userid == user.userid && results[0].password == user.password) {
				res.send("0");  // 0 表示用户存在并且邮箱密码正确
			} else{
				res.send("1");  // 1 表示用户存在，但密码不正确
			}
		}
	})
});

// admin的登录接口
router.post('/loginadmin',(req,res)=>{
	const user = req.body;
	const sel_userid = $sql.admin.select + " where userid = '" + user.userid + "'";
	console.log(sel_userid);
	conn.query(sel_userid, user.userid, (error, results)=>{
		if (error) {
			throw error;
		}
		console.log(results)
		if (results[0] === undefined) {
			res.send("-1");  // -1 表示查询不到，用户不存在，即邮箱填写错误
		} else{
			if (results[0].userid == user.userid && results[0].password == user.password) {
				res.send("0");  // 0 表示用户存在并且邮箱密码正确
			} else{
				res.send("1");  // 1 表示用户存在，但密码不正确
			}
		}
	})
});

//提交审核接口
router.post('/submititle', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.content.select + " where title = '" + params.title + "'";
	const add_sql = $sql.content.add;
	console.log(sel_sql);
	
	conn.query(sel_sql, params.titlee, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0 && params.title == results[0].title) {
			res.send("1");   // 1 表示该条审核存在
		} else {
			conn.query(add_sql, [params.username, params.title, params.text], (err, rst) => {
				if (err) {
					console.log(err);
					res.send("-1");// -1 表示没有username传递过来
				} else{
					console.log(rst);
					res.send("0"); // 0 表示审核提交成功
				}
			});
		}
	});
});

//获取apply数据接口
router.post('/getapply',(req,res)=>{
	const params = req.body;
	const sel_sql = $sql.content.select;
	console.log(sel_sql);

	conn.query(sel_sql, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0) {
			res.send(results);   //返回查询结果
			console.log(results);
		}
	});
});

//审核驳回
router.post('/refuse',(req,res)=>{
	const params = req.body;
	const sel_sql = $sql.content.del +" where title = '" + params.title + "'";
	console.log(sel_sql);

	conn.query(sel_sql, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0) {
			res.send("0");
		}else{
			res.send("-1");
		}
	});
});

//审核通过
router.post('/allow', (req, res) => {
	const params = req.body;
	const sel_sql = $sql.access.select + " where title = '" + params.title + "'";
	const add_sql = $sql.access.add;
	console.log(sel_sql);
	
	conn.query(sel_sql, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0 && params.title == results[0].title) {
			res.send("-1");   // -1 表示审核已经存在
		} else {
			conn.query(add_sql, [params.title, params.text, params.username, params.reviewer], (err, rst) => {
				if (err) {
					console.log(err);
				} else{
					console.log(rst);
					res.send("0"); // 0 表示用户添加成功
				}
			});
		}
	});

	const del_sql = $sql.content.del +" where title = '" + params.title + "'";
	conn.query(del_sql, (error, results) => {
		console.log("ok");
	});

});

//查询已通过审核接口
router.post('/full',(req,res)=>{
	const params = req.body;
	const sel_sql = $sql.access.select;
	console.log(sel_sql);

	conn.query(sel_sql, (error, results) => {
		if(error) {
			console.log(err);
		}
		if (results.length != 0) {
			res.send(results);   //返回查询结果
			console.log(results);
		}
	});
});

//删除已通过审核接口
router.post('/delete', (req, res) => {
	const params = req.body;

	const del_sql = $sql.access.del +" where title = '" + params.title + "'";
	conn.query(del_sql, (error, results) => {
		if(error){
			res.send("1")// 删除出错
		}
		else{console.log("ok Already deleted.");
		res.send("0");// 删除成功
		}
		
	});

});
module.exports = router;