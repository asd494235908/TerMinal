// const mysql = require('mysql')
// const cors = require('cors');
// const jwt = require('jsonwebtoken')
// const bodyParser = require('body-parser');
// // connection.query('SELECT * FROM `user`', function (error, results, fields) {
// //     if (error) throw error;
// //     console.log(results)
// //     res.json({
// //         data: results
// //     })
// //     console.log('The solution is: ', results);
// //   });
// // connection.query('INSERT INTO user VALUES(NULL, "admin","123456")', function (error, results, fields) {
// //     if (error) throw error;
// //     res.send("提交成功")
// //     console.log('The solution is: ', results);
// //   });
// module.exports = {
//     devServer: {
//         before(app, server) {
//             app.use(cors());
//             app.use(bodyParser.json());
//             app.use(bodyParser.urlencoded({ extended: false }))
//             const connection = mysql.createConnection({
//                 host: '192.168.2.202',
//                 user: 'root',
//                 password: 'dc494235908',
//                 database: 'data'
//             });
//             connection.connect((err) => {
//                 if (err) throw err;
//                 console.log('连接mysql成功')
//             });
//             // 存入sup表
//             function uploadSup(item, item2) {
//                 connection.query(`INSERT INTO sup(id,spu_title,spu_sub_title,spu_sub_title_hover,spu_defall_show,spec_id,search,price) VALUES(NULL,"${item.spu_title}","${item.spu_sub_title}","${item.spu_sub_title_hover}","${item.spu_defall_show}",${item.spec_id},"${item.search}",${item.price})`, function (error, results, fields) {
//                     if (error) throw error;
//                     uploadSupList(item, item2)
//                     console.log('sup提交成功')
//                 });
//             }
//             //存入suplist表
//             function uploadSupList(item, arr) {
//                 if (arr.length === 0) return
//                 arr.forEach((item, index) => {
//                     uploadSupListItem(item)
//                 });
//                 //存入suplistimg表
//                 connection.query(`INSERT INTO suplistimg(spec_id,list_url,spu_title)
//                 VALUES("${item.spec_id}","${item.imglist}","${item.spu_title}")`, function (error, results, fields) {
//                     if (error) throw error;
//                     console.log('suplistimg提交成功')
//                 });
//             }
//             function uploadSupListItem(item) {
//                 console.log(item)
//                 connection.query(`INSERT INTO suplist(id,spec_id,spu_title,show_name,price,oldprice,img_url1,
//                     img_url2,img_url3,img_url4,img_url5) VALUES(NULL,"${item.spec_id}","${item.spu_title}",
//                     "${item.color}","${numbber(item.price)}","${numbber(item.oldPrice)}","${item.img1}",
//                     "${item.img2}","${item.img3}","${item.img4}","${item.img5}")`, function (error, results, fields) {
//                     if (error) throw error;
//                 });
//             }
//             function numbber(str) {
//                 return Number(str)
//             }
//             // 获取商品详情列表
//             function getDataList(res, index) {
//                 let str;
//                 if (index === 1) {
//                     str = 'SELECT * FROM `suplist` ORDER BY price ASC'
//                 } else if (index === 2) {
//                     str = 'SELECT * FROM `suplist` ORDER BY price DESC'
//                 } else if (index === 3) {
//                     str = 'SELECT * FROM `suplist` ORDER BY oldprice ASC'
//                 } else if (index === 4) {
//                     str = 'SELECT * FROM `suplist` ORDER BY oldprice DESC'
//                 } else if (index === 6) {
//                     str = 'SELECT * FROM `suplist` ORDER BY spec_id DESC'
//                 } else {
//                     str = 'SELECT * FROM `suplist`'
//                 }
//                 connection.query(str, (error, resultsA, fields) => {
//                     if (error) throw error;
//                     connection.query('SELECT * FROM `supdetail`', (error, resultsB, fields) => {
//                         if (error) throw error;
//                         resultsA.forEach(element => {
//                             if (element.detal_id === null) return
//                             element.size = []
//                             resultsB.forEach(item => {
//                                 if (element.detal_id == item.detal_id) {
//                                     element.size.push(item)
//                                 }
//                             })
//                         });
//                         res.json({
//                             sucss: true,
//                             code: 200,
//                             data: resultsA
//                         })
//                     });
//                 });
//             }
//             function addDetal(item) {
//                 connection.query(`INSERT INTO supdetail(id,detal_id,price,size,img) VALUES(NULL,"${item.detal_id}","${item.price}","${item.size}","${item.img}")`, function (error, results, fields) {
//                     if (error) throw error;
//                     console.log(results)
//                 });
//             }
//             function mysqlSentence(a, res, callBack) {
//                 const str = a;
//                 connection.query(str, function (error, results, fields) {
//                     if (error) throw error;
//                     if (typeof callBack === 'function') {
//                         callBack()
//                     } else {
//                         if (res) {
//                             res.json({
//                                 cood: 200,
//                                 success: true
//                             })
//                         }
//                     }
//                 });

//             }
//             function mysqlSentenceb(a) {
//                 const str = a;
//                 connection.query(str, function (error, results, fields) {
//                     if (error) throw error;
//                 });

//             }
//             app.post('/api/submitSup', (req, res) => {
//                 const { data } = req.body
//                 const str =`UPDATE sup SET spu_title='${data.spu_title}',spu_sub_title='${data.spu_sub_title}',spu_sub_title_hover='${data.spu_sub_title_hover}',spu_defall_show=${data.spu_defall_show},spec_id=${data.spec_id},hot_id=${data.hot_id},search='${data.search}',price=${data.price} WHERE id=${data.id}`
//                 mysqlSentenceb(str)
//                 res.json({
//                     cood: 200,
//                     success: true
//                 })
//             })
//             app.get('/api/modifygood', (req, res) => {
//                 const id = req.query.id
//                 let srt;
//                 if (id ==1){
//                      str = `SELECT * FROM sup ORDER BY spec_id ASC`
//                 }else if (id ==2 ){
//                      str = `SELECT * FROM sup ORDER BY spec_id DESC`
//                 }else if(id ==3) {
//                      str = `SELECT * FROM sup ORDER BY price ASC`
//                 } else if(id == 4){
//                      str = `SELECT * FROM sup ORDER BY price DESC`
//                 }else{
//                      str = `SELECT * FROM sup`
//                 }
//                 connection.query(str, function (error, results, fields) {
//                     if (error) throw error;
//                     res.json({
//                         cood: 200,
//                         success: true,
//                         data: results
//                     })
//                 });
//             })
//             app.post('/api/dellData', (req, res) => {
//                 const { data } = req.body
//                 data.list.forEach(item => {
//                     item.dtail_list.forEach(o => {
//                         const str = `DELETE FROM nav_list_dtail WHERE id=${o.id}`
//                         mysqlSentenceb(str)
//                     })
//                     const str = `DELETE FROM nav_list WHERE id=${item.id}`
//                     mysqlSentenceb(str)
//                 })
//                 const str = `DELETE FROM nav WHERE id=${data.id}`
//                 mysqlSentenceb(str)
//                 res.json({
//                     cood: 200,
//                     success: true
//                 })
//             })
//             app.post('/api/addNav', (req, res) => {
//                 const { isListAdd, data } = req.body
//                 if (isListAdd) {
//                     const str = `INSERT INTO nav(id, name, img, nav_link, nav_id) VALUES(NULL, '${data.name}', '${data.img}', '${data.nav_link}',${data.nav_id})`
//                     mysqlSentenceb(str)
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 } else {
//                     const str = `UPDATE nav SET name='${data.name}', img='${data.img}', nav_link='${data.nav_link}',nav_id=${data.nav_id} WHERE id=${data.id}`
//                     mysqlSentenceb(str)
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 }
//             })
//             app.post('/api/dellList', (req, res) => {
//                 const { data } = req.body
//                 const { dtail_list } = data
//                 dtail_list.forEach(item => {
//                     const str = `DELETE FROM nav_list_dtail WHERE id=${item.id}`
//                     mysqlSentenceb(str)
//                 })
//                 const str = `DELETE FROM nav_list WHERE id=${data.id}`
//                 mysqlSentenceb(str)
//                 res.json({
//                     success: true,
//                     code: 200
//                 })
//             })
//             app.post('/api/dellListDetail', (req, res) => {
//                 const { data } = req.body
//                 const str = `DELETE FROM nav_list_dtail WHERE id=${data.id}`
//                 mysqlSentenceb(str)
//                 res.json({
//                     success: true,
//                     code: 200
//                 })
//             })
//             app.post('/api/submitlistDtail', (req, res) => {
//                 const { isListAdd_detail, data } = req.body
//                 if (isListAdd_detail) {
//                     const str = `INSERT INTO nav_list_dtail(id, name, img, search, dtail_id) VALUES(NULL, '${data.name}', '${data.img}', '${data.search}', ${data.dtail_id})`
//                     mysqlSentenceb(str)
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 } else {
//                     const str = `UPDATE nav_list_dtail SET name='${data.name}',img='${data.img}',search='${data.search}',dtail_id=${data.dtail_id} WHERE id=${data.id}`
//                     mysqlSentenceb(str)
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 }
//             })
//             app.post('/api/submitlist', (req, res) => {
//                 const { isListAdd, data } = req.body
//                 if (isListAdd) {
//                     const str = `INSERT INTO nav_list(id, list_name, nav_id, dtail_id) VALUES(NULL, '${data.list_name}', ${data.nav_id}, ${data.dtail_id})`
//                     connection.query(str, function (error, results, fields) {
//                         if (error) throw error;
//                     });
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 } else {
//                     const str = `UPDATE nav_list SET list_name=${data.list_name} WHERE id=${data.id}`
//                     connection.query(str, function (error, results, fields) {
//                         if (error) throw error;
//                     });
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 }
//             })
//             app.get('/api/getNavId', (req, res) => {
//                 connection.query(`select MAX(nav_id)FROM nav_list`, function (error, results, fields) {
//                     if (error) throw error;
//                     connection.query(`select MAX(dtail_id)FROM nav_list`, function (error, resultsa, fields) {
//                         if (error) throw error;
//                         let id;
//                         for (let i in results[0]) {
//                             id = results[0][i]
//                         }
//                         let ids;
//                         for (let i in resultsa[0]) {
//                             ids = resultsa[0][i]
//                         }
//                         res.json({
//                             cood: 200,
//                             success: true,
//                             nav_id: id,
//                             dtail_id: ids,
//                         })
//                     });
//                 });
//             })
//             app.get('/api/navData', (req, res) => {
//                 const str = `SELECT * FROM nav`
//                 connection.query(str, function (error, results, fields) {
//                     if (error) throw error;
//                     const str1 = `SELECT * FROM nav_list`
//                     connection.query(str1, function (error, results1, fields) {
//                         if (error) throw error;
//                         const str2 = `SELECT * FROM nav_list_dtail`
//                         connection.query(str2, function (error, results2, fields) {
//                             if (error) throw error;
//                             results1.forEach(element => {
//                                 element.dtail_list = []
//                                 results2.forEach(item => {
//                                     if (element.dtail_id === item.dtail_id) {
//                                         element.dtail_list.push(item)
//                                     }
//                                 })
//                             });
//                             results.forEach(element => {
//                                 element.list = []
//                                 results1.forEach(item => {
//                                     if (element.nav_id === item.nav_id) {
//                                         element.list.push(item)
//                                     }
//                                 })
//                             });
//                             res.json({
//                                 success: true,
//                                 code: 200,
//                                 data: results
//                             })
//                         })
//                     })
//                 })
//             })
//             app.post('/api/clerSwiper', (req, res) => {
//                 const { data } = req.body
//                 const str = `DELETE FROM swiper_img WHERE id=${data.id}`
//                 mysqlSentenceb(str)
//                 res.json({
//                     success: true,
//                     code: 200
//                 })
//             })
//             app.post('/api/dellSwiper', (req, res) => {
//                 const { isadd, data } = req.body
//                 if (isadd) {
//                     const str = `INSERT INTO swiper_img(id,img_url,sort,alt,link) VALUES(NULL,'${data.img_url}',${data.sort},'${data.alt}','${data.link}')`
//                     mysqlSentenceb(str)
//                     res.json({
//                         success: true,
//                         code: 200
//                     })
//                 } else {
//                     const str = `UPDATE swiper_img SET img_url='${data.img_url}',sort=${data.sort},alt='${data.alt}',link='${data.link}' WHERE id=${data.id}`
//                     mysqlSentenceb(str)
//                     res.json({
//                         success: true,
//                         code: 200
//                     })
//                 }
//             })
//             // 删除热门板块
//             app.post('/api/dellHot', (req, res) => {
//                 const { data } = req.body
//                 const { listArr } = data
//                 const str = `UPDATE sup SET hot_id=NULL WHERE hot_id=${data.hot_id}`
//                 mysqlSentenceb(str)
//                 const b = `DELETE FROM hot_surface WHERE id='${data.id}'`
//                 mysqlSentenceb(b)
//                 res.json({
//                     cood: 200,
//                     success: true
//                 })
//             })
//             // 获取轮播图
//             app.post('/api/getSwiper', (req, res) => {
//                 str = 'SELECT * FROM `swiper_img` ORDER BY sort ASC'
//                 connection.query(str, function (error, results, fields) {
//                     if (error) throw error;
//                     res.json({
//                         success: true,
//                         code: 200,
//                         data: results
//                     })
//                 });

//             })
//             //添加修改 分类板块
//             app.post('/api/addHotList', (req, res) => {
//                 const { isAdd, data } = req.body
//                 if (isAdd) {
//                     const { listArr } = data
//                     listArr.forEach(item => {
//                         const str = `UPDATE sup SET hot_id=${data.hot_id} WHERE id=${item.id}`
//                         connection.query(str, function (error, results, fields) {
//                             if (error) throw error;
//                         });
//                     })
//                     const sentence = `INSERT INTO hot_surface(id, type, activity, activity_ative, hot_img, hot_id, sort) VALUES(NULL, '${data.type}', '${data.activity}', '${data.activity_ative}', '${data.hot_img}', '${data.hot_id}','${data.sort}')`
//                     connection.query(sentence, function (error, results, fields) {
//                         if (error) throw error;
//                     });
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 } else {
//                     const { listArr } = data
//                     const str = `UPDATE sup SET hot_id=NULL WHERE hot_id=${data.hot_id}`
//                     mysqlSentenceb(str)
//                     listArr.forEach(item => {
//                         const str = `UPDATE sup SET hot_id=${data.hot_id} WHERE id=${item.id}`
//                         mysqlSentenceb(str)
//                     })
//                     const sentence = `UPDATE hot_surface SET activity='${data.activity}',activity_ative='${data.activity_ative}',sort=${data.sort},hot_img='${data.hot_img}' WHERE id=${data.id}`
//                     mysqlSentenceb(sentence)
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 }
//             })
//             //获取 商品信息 sup
//             app.post('/api/getSupList', (req, res) => {
//                 const str = `SELECT * FROM sup`
//                 connection.query(str, function (error, results, fields) {
//                     if (error) throw error;
//                     res.json({
//                         sucss: true,
//                         code: 200,
//                         data: results
//                     })
//                 })
//             })
//             //添加 修改分类板块
//             app.post('/api/addClassList', (req, res) => {
//                 const { isadd, data } = req.body
//                 if (isadd === false) {
//                     const { listArr } = data
//                     listArr.forEach(item => {
//                         const sentence = `UPDATE hot_list SET hot_name='${item.hot_name}',hot_id=${item.hot_id},hot_link='${item.hot_link}',img='${item.img}',icon='${item.icon}' WHERE id=${item.id}`
//                         connection.query(sentence, function (error, results, fields) {
//                             if (error) throw error;
//                         });
//                     })
//                     const str = `UPDATE hot_surface SET hot_id='${data.hot_id}',type=${data.type},activity='${data.activity}',activity_ative='${data.activity_ative}',sort='${data.sort}',hot_img='${data.hot_img}' WHERE id=${data.id}`
//                     connection.query(str, function (error, results, fields) {
//                         if (error) throw error;
//                     });
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 } else {
//                     const { listArr } = data
//                     listArr.forEach(item => {
//                         const sentence = `INSERT INTO hot_list(id,hot_id,hot_name,hot_link,img,icon)
//                         VALUES(NULL,'${item.hot_id}','${item.hot_name}','${item.hot_link}','${item.img}','${item.icon}')`
//                         connection.query(sentence, function (error, results, fields) {
//                             if (error) throw error;
//                         });
//                         console.log(sentence)
//                     })
//                     const str = `INSERT INTO data.hot_surface(id, type, activity, activity_ative, hot_id, sort) VALUES(NULL,"${data.type}","${data.activity}","${data.activity_ative}","${data.hot_id}","${data.sort}")`
//                     connection.query(str, function (error, results, fields) {
//                         if (error) throw error;
//                     });
//                     res.json({
//                         cood: 200,
//                         success: true
//                     })
//                 }
//             })
//             //获得分类板块的编号
//             app.get('/api/classId', (req, res) => {
//                 connection.query(`select MAX(hot_id)FROM hot_surface`, function (error, results, fields) {
//                     if (error) throw error;
//                     let id;
//                     for (let i in results[0]) {
//                         id = results[0][i]
//                     }
//                     // console.log(results[0])
//                     res.json({
//                         cood: 200,
//                         success: true,
//                         data: id
//                     })
//                 });
//             })
//             //获得板块管理的数据
//             app.post('/api/plate', (req, res) => {
//                 const str = `SELECT * FROM hot_surface`
//                 connection.query(str, function (error, resultsa, fields) {
//                     if (error) throw error;
//                     const str = `SELECT * FROM hot_list`
//                     connection.query(str, function (error, resultsb, fields) {
//                         if (error) throw error;
//                         resultsa.forEach(element => {
//                             element.listArr = []
//                             resultsb.forEach(elementb => {
//                                 if (element.hot_id === elementb.hot_id) {
//                                     element.listArr.push(elementb)
//                                 }
//                             })
//                         });
//                         const str = 'SELECT * FROM sup WHERE hot_id IS NOT NULL'
//                         connection.query(str, function (error, resultsc, fields) {
//                             if (error) throw error;
//                             const str = 'SELECT * FROM suplist'
//                             connection.query(str, function (error, resultsd, fields) {
//                                 resultsc.forEach(elem => {
//                                     elem.list = []
//                                     resultsd.forEach(item => {
//                                         if (elem.spec_id === item.spec_id) { elem.list.push(item) }
//                                     })
//                                 })
//                                 resultsa.forEach(elem => {
//                                     resultsc.forEach(item => {
//                                         if (elem.hot_id === item.hot_id) {
//                                             elem.listArr.push(item)
//                                         }
//                                     })
//                                 })
//                                 res.json({
//                                     sucss: true,
//                                     code: 200,
//                                     data: resultsa
//                                 })
//                             });
//                         });
//                     });
//                 });
//             })
//             //删除分类板块
//             app.post('/api/dellClass', (req, res) => {
//                 const { isadd, data } = req.body
//                 const a = `DELETE FROM hot_surface WHERE id='${data.id}'`
//                 mysqlSentence(a)
//                 const arr = data.listArr
//                 arr.forEach(item => {
//                     const b = `DELETE FROM hot_list WHERE id='${item.id}'`
//                     mysqlSentence(b)
//                 })
//                 res.json({
//                     cood: 200,
//                     success: true
//                 })
//             })
//             // 删除商品
//             app.post('/api/dellItem', (req, res) => {
//                 const { lastItem, data } = req.body
//                 const size = data.size
//                 if (size !== undefined) {
//                     size.forEach(item => {
//                         const str = `DELETE FROM supdetail WHERE id='${item.id}'`
//                         mysqlSentence(str)
//                     })
//                 }
//                 if (lastItem === true) {
//                     const a = `DELETE FROM suplistimg WHERE spec_id='${data.spec_id}'`
//                     mysqlSentence(a)
//                     const sentence = `DELETE FROM suplist WHERE id='${data.id}'`
//                     mysqlSentence(sentence)
//                     const str = `DELETE FROM sup WHERE spec_id='${data.spec_id}'`
//                     mysqlSentence(str)
//                 } else {
//                     const sentence = `DELETE FROM suplist WHERE id='${data.id}'`
//                     mysqlSentence(sentence)
//                 }
//                 res.json({
//                     cood: 200,
//                     success: true
//                 })
//             })
//             //登录
//             app.post('/api/Login', (req, res) => {
//                 const { username, pwd } = req.body.userInfo
//                 const str = `SELECT * FROM users WHERE username='${username}'`
//                 connection.query(str, function (error, results, fields) {
//                     if (error) throw error;
//                     if (results[0] === undefined) {
//                         console.log('账号密码有误')
//                         res.json({
//                             message: '账号密码有误',
//                             success: false
//                         })
//                     } else {
//                         const { id, username, password, uid, userinfo, add, dell } = results[0]
//                         if (pwd === password) {
//                             res.json({
//                                 token: jwt.sign({ id: id, username: username, uid: uid, userinfo: userinfo, add: add, dell: dell }, 'abcd', {
//                                     expiresIn: "3000s"
//                                 }),
//                                 code: 200,
//                                 success: true,
//                                 id,
//                                 username,
//                                 uid,
//                                 userinfo,
//                                 add,
//                                 dell
//                             })
//                         } else {
//                             res.json({
//                                 message: '账号密码有误',
//                                 success: false
//                             })
//                         }
//                     }
//                 });
//             })
//             //登录持久化验证
//             app.post('/api/validate', (req, res) => {
//                 let token = req.headers.authorization;
//                 jwt.verify(token, 'abcd', function (err, decode) {
//                     if (err) {
//                         res.json({
//                             msg: '当前用户未登录',
//                             success: false
//                         })
//                     } else {
//                         // 证明用户已经登录
//                         res.json({
//                             token: jwt.sign({
//                                 id: decode.id,
//                                 username: decode.username,
//                                 uid: decode.uid,
//                                 userinfo: decode.userinfo,
//                                 add: decode.add,
//                                 dell: decode.dell
//                             }, 'abcd', {
//                                 // 过期时间
//                                 expiresIn: "12000s"
//                             }),
//                             code: 200,
//                             success: true,
//                             id: decode.id,
//                             username: decode.username,
//                             uid: decode.uid,
//                             userinfo: decode.userinfo,
//                             add: decode.add,
//                             dell: decode.dell
//                         })
//                     }
//                 })
//             })
//             //修改商品
//             app.post('/api/modifyItem', (req, res) => {
//                 const { data } = req.body
//                 const sentence = `UPDATE suplist SET spec_id=${data.spec_id},spu_title=${data.spu_title},show_name=${data.show_name},price=${data.price},price=${data.price},oldprice=${data.oldprice},img_url1=${data.img_url1},img_url2=${data.img_url2},img_url3=${data.img_url3},img_url4=${data.img_url4},img_url5=${data.img_url5} WHERE id=${data.id}`
//                 mysqlSentence(sentence, res)
//             })
//             // 删除商品尺寸
//             app.post('/api/operation', (req, res) => {
//                 const { type, data } = req.body
//                 //tyep 为0 的是修改， type为1的是为删除
//                 if (type === 0) {
//                     const sentence = `UPDATE supdetail SET detal_id=${data.detal_id},price=${data.price},size=${data.size},img=${data.img} WHERE id=${data.id}`
//                     mysqlSentence(sentence, res)
//                 } else if (type === 1) {
//                     const { sizeLngth, sizeList } = data
//                     // sizeLngth = ture是删除的最后一个 要把上级表的dtal_id设置为NUll
//                     if (sizeLngth) {
//                         // 要把上级表的dtal_id设置为NUll
//                         const sentence = `DELETE FROM supdetail WHERE id=${sizeList.id}`
//                         mysqlSentence(sentence, res, () => {
//                             connection.query(`UPDATE suplist SET detal_id=NULL WHERE detal_id=${sizeList.detal_id}`, function (error, results, fields) {
//                                 if (error) throw error;
//                                 res.json({
//                                     cood: 200,
//                                     success: true
//                                 })
//                             });
//                         })
//                     } else {
//                         //不要把上级表的dtal_id设置为NUll
//                         const sentence = `DELETE FROM supdetail WHERE id=${sizeList.id}`
//                         mysqlSentence(sentence, res)
//                     }
//                 }
//             })
//             app.post('/api/getGooList', (req, res) => {
//                 const { index } = req.body
//                 getDataList(res, index)
//             })
//             app.post('/api/addSupDetal', (req, res) => {
//                 const { id, detalId, dataDtal } = req.body
//                 //UPDATE suplist SET detal_id=5 WHERE id=0 
//                 connection.query(`UPDATE suplist SET detal_id=${detalId} WHERE id=${id}`, function (error, results, fields) {
//                     if (error) throw error;
//                     dataDtal.forEach(item => {
//                         addDetal(item)
//                     })
//                 });
//                 res.json({
//                     cood: 200,
//                     success: true
//                 })
//             })
//             app.get('/api/getdetalid', (req, res) => {
//                 connection.query(`select MAX(detal_id)FROM suplist`, function (error, results, fields) {
//                     if (error) throw error;
//                     let id;
//                     for (let i in results[0]) {
//                         id = results[0][i]
//                     }
//                     // console.log(results[0])
//                     res.json({
//                         cood: 200,
//                         success: true,
//                         data: id
//                     })
//                 });
//             })
//             app.get('/api/getspecid', (req, res) => {
//                 connection.query(`select MAX(spec_id)FROM sup`, function (error, results, fields) {
//                     if (error) throw error;
//                     let id;
//                     for (let i in results[0]) {
//                         id = results[0][i]
//                     }
//                     // console.log(results[0])
//                     res.json({
//                         cood: 200,
//                         success: true,
//                         data: id
//                     })
//                 });
//             })
//             app.get('/api/home', (req, res) => {
//                 res.json({
//                     data: '1'
//                 })
//             })
//             app.post('/api/addDeta', (req, res) => {
//                 const { dataTitel, dataList } = req.body
//                 uploadSup(dataTitel, dataList)
//                 res.json({
//                     cood: 200,
//                     success: true
//                 })
//             })
//         }
//     }
// }