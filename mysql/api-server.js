const fs = require('fs');
const path = require('path');

var bodyParser = require('body-parser');
const express = require("express");
const con = require("./mysql-connection");
const Router = express.Router();
const formidable = require('formidable');
const uuidv1 = require("uuid/v1");
const jwt = require('jsonwebtoken');

Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(bodyParser.json());
const multer = require('multer')
var upload = multer({ dest: path.join(__dirname, 'Public', 'images', 'books') })
var cpUpload = upload.fields([{ name: 'book_image', maxCount: 8 }])

// users hardcoded for simplicity, store in a db for production applications

async function authenticate({ username, password }) {
    return new Promise((resolve, reject) => {


        con.query(`SELECT * FROM user where (username ="${username}" and password="${password}") or (email ="${username}" and 	password="${password}")`, (err, result, fields) => {
            if (err) {
                console.log("error in handling authentication", err);
                reject({ 'error': err })
            }
            if (result === []) {

                console.log("failed attempt by user", username);
                reject({ message: "Account Dont exists or Incorrect password" });
            }
            else {
                const token = jwt.sign({ sub: result[0]['username'] }, "here is the secreat");
                const { password, ...UserWithoutPassword } = result[0]
                con.query(`delete from jwtoken where userID='${result[0].user_id}' ; insert into jwtoken values('${result[0].user_id}','${token}','${Date.now()}')`, (err, result) => {
                    if (err) {
                        return reject({ 'error': err });
                    }
                    else {
                        return resolve({ ...UserWithoutPassword, token: token });
                    }
                });

            }

        })
    })
}


function isAuthenticated(req, res, next) {
    console.log('checked')
    if (req.headers.authorization !== undefined) {
        con.query(`select * from jwtoken where data='${req.headers.authorization.split(" ")[0]}'`, (err, result) => {

            if (err) {
                res.json({ 'alert': 'Failed to verify' })
                console.log(`select * from jwtoken where data='${req.headers.authorization.split(" ")}'`, err)
            }
            else if (result !== []) {
                next()
            }
            else {
                res.json({ 'alert': 'session Expired' })
            }
        })
    }
    else {
        res.send({ 'alert': "Unauthenticated User" })
    }
}


function UserId(token) {
    return new Promise((resolve, reject) => {
        con.query(`select * from jwtoken where data='${token}'`, (err, result) => {

            if (err) {
                console.log(`select * from jwtoken where data='${req.headers.authorization.split(" ")}'`, err)
                return reject(0)
            }
            else if (result.length > 0) {
                return resolve(result[0].userId)
            }
            else return reject(0)

        })
    })
}

function UserDetails(userId) {
    return new Promise((resolve, reject) => {

        con.query("select * from user where user_id='" + userId + "'", (err, details) => {
            if (err) { console.log("error in finding the userID", err); reject(err) }
            else {

                // console.log(details)
                resolve(details[0])
            }
        })
    })
}





//to show books with bookname 
Router.get("/book", (req, res) => {

    if (req.query.availible === '1') {
        con.query(`SELECT * FROM book where available_now=1 and title  like "%${req.query.title}%" limit ${req.query.limit},12`, (err, result, fields) => {
            if (err) console.log(err);
            res.json({
                "data": result
            });
        });
    }
    else if (req.query.availible === '2') {
        con.query(`SELECT * FROM book where available_now=0 and  title  like "%${req.query.title}%" limit ${req.query.limit},12`, (err, result, fields) => {
            if (err) console.log(err);
            res.json({
                "data": result
            });


        });
    }
    else {
        con.query(`SELECT * FROM book where title  like "%${req.query.title}%" limit ${req.query.limit},12`, (err, result, fields) => {
            if (err) console.log(err);
            res.json({
                "data": result
            });
        });

    }
});




//is used for getting near result
Router.get("/bookHint", (req, res) => {
    con.query(`SELECT Distinct(title) FROM book where title like "%${req.query.title}%" `, (err, result, fields) => {
        console.log(`SELECT Distinct(title) FROM book where title like "%${req.query.title}%"`)
        if (err) { console.log(err); return res.send({ data: [] }); }
        else if (result.length !== 0) {
            var ret = []
            for (var k in result) {
                ret.push(result[k]['title'])
            }
            res.json({ 'data': ret })
        }
        else {
            res.json({ "data": [] })
        }
    });
});


//once the book is booked
Router.get("/issueBook", isAuthenticated, (req, res) => {
    UserDetails(UserId(req.headers.authorization.split(" ")[0]))
    console.log('book issue request')
    sql = "select *  from book where book_id ='" + req.query['book_id'] + "'";
    con.query(sql, (err, result_book_details) => {
        if (err || result_book_details.length === 0) res.json({ "error": "Problem with finding the book!!!" });
        else {

            var bAvailibility = result_book_details[0]['available_now']
            var bDonated_to = result_book_details[0]['donated_to']
            var bOwner_id = result_book_details[0]['owner_id']
            if (bAvailibility === '0') {
                //if the user is again looking for the same book when issuing
                if (bDonated_to === req.user[0].user_id) {
                    res.json({ 'alert': 'You have Already issued it' })
                }
                else
                    res.send({ "alert": "already reffered sorry" });
            }
            else {
                var book_issued_by_user = req.user[0]['book_issued']
                if (book_issued_by_user < 4) {
                    //books less then 4
                    if ((bOwner_id === req.user[0].user_id)) {
                        res.send({ "alert": "not allowed to issue own books" });
                    } else {
                        //updating book availability 
                        sql = "update book set available_now = 0 , donated_to ='" + req.user[0]['user_id'] + "' where book_id='" + req.query['book_id'] + "'";
                        con.query(sql, (err, result_temp) => {
                            if (err) return res.send(err);
                            res.json({ 'sucess': 'Book Issued' })
                        })
                    }

                } else {
                    res.send({ "alert": "You Have Issued more than 4 books" })
                }
            }
        }
    });
})
//new book registration


Router.get("/recent_books/", (req, res) => {

    console.log("a request was recived")
    if (req.query.index) {
        con.query(`SELECT * FROM book order by donated_on desc limit ${req.query.index}, 12`, (err, result, fields) => {
            if (err) console.log(err);
            res.json({
                "recent_books": result
            });
            console.log('sent 12 books', `SELECT * FROM book order by donated_on desc limit ${req.query.index},12}`);
        });
    } else {
        con.query(`SELECT * FROM book order by donated_on desc limit 12`, (err, result, fields) => {
            if (err) console.log(err);
            res.json({
                "recent_books": result
            });
        });
    }

});

//once the book is booked
Router.post("/authentication", (req, res, next) => {
    authenticate({ username: req.body.username, password: req.body.password }).then((AllDetails) => {
        res.send({ ...AllDetails })

    }).catch(err => {
        console.log(err)
        res.sendStatus(400)

    })

});

Router.get('/connectionCheck/', isAuthenticated, (req, res, next) => {
    UserId(req.headers.authorization.split(" ")[1]).then(
        (UserID) => {
            UserId
            con.query('select * from user where user_id="' + UserID + '"', (err, result) => {
                var { password, ...restOfData } = result[0]
                token = req.headers.authorization.split(" ")[1]
                restOfData = { ...restOfData, token }

                if (!err) { res.send(restOfData) }
            })

        }
    )
})

Router.get('/isLogged', (req, res) => {
    if (req.headers.authorization === undefined) {
        res.json({ "isLogged": false })
    } else {
        // console.log("Data", req.headers.authorization.split(" ")[0])
        con.query('select * from jwtoken where data="' + req.headers.authorization.split(" ")[0] + '"', (err, result) => {
            if (result !== []) {
                res.json({ "isLogged": false })
            }
            else {
                res.json({ "isLogged": true })
            }
        })
    }
})

Router.post("/Signup", (req, res, next) => {
    con.query(`SELECT * FROM user where username ="${req.body.username}" or email="${req.body.email}"`, (err, result, fields) => {
        if (err) next(err);
        if (result.length !== 0)
            {console.log('User alerady exits '+ req.body.username)

        res.json({ 'alert': 'Failed memeber already exits' })}
        else {

            con.query(`INSERT into user ( user_id,username,email,password) values("${uuidv1()}","${req.body.username}","${req.body.email}","${req.body.password}")`, (err, result, fields) => {
                if (err) {
                    console.log("err", err);
                    res.send(400)
                } else {
                    console.log("new account created by ", req.body.username);
                    // res.sendStatus(200)
                    res.json({'sucess':'account sucessfully created'})
                }
            });
        }
    });
});

Router.get('/Logout', (req, res, next) => {
    con.query(`delete from jwtoken where data='${req.header.au}'`, (err, result) => {
        if (err) {
            res.json({ 'alert': 'unsucessfull' })
            console.log("error in logout for user " + req.body.userId + "\n", err)
        }
        else {
            res.json({ 'sucess': 'sucessfully logout', 'event': 'passed' });
            console.log("sucessfully logged out a user!!!")
        }
    })

})

Router.get("/notification", isAuthenticated, (req, res) => {
    UserId(req.headers.authorization.split(" ")[1]).then(
        (userID) => {
            // console.log(userID)
            if (userID) {

                fs.readFile(path.resolve(__dirname, '..', 'noti', 'doner', userID + ".txt"), (err, data) => {
                    var data1 = { "doner": data ? data.toString().split("\r\n") : "no messages" };
                    fs.readFile(path.resolve(__dirname, '..', 'noti', 'reciever', userID + ".txt"), (err, data) => {
                        var data2 = { 'reciver': data ? data.toString().split("\r\n") : " " };
                        data3 = { ...data1, ...data2 }
                        res.json({
                            ...data3
                        });

                    })
                })
            }
            else (res.send(userID))
        }).catch((errr) => { console.log(errr) })

})


//address and phone no and other data
Router.post("/update_user/", (req, res) => {
    var form2 = new formidable.IncomingForm();
    form2.uploadDir = path.resolve(__dirname, "..", "Public", "images", "user");
    form2.parse(req, function (err, fields, files) {
        function imgEXT(file_object) {
            if (file_object['type'] === 'image/jpeg')
                return '.jpeg'
            else if (file_object['type'] === 'image/png')
                return '.png'
        }

        if (files['file'] !== undefined) {
            var file_name = files['file'].path.split("\\")[files['file'].path.split("\\").length - 1] + imgEXT(files['file']);
            fs.rename(files['file']['path'], path.join(__dirname, "..", "public", "images", "user", file_name), (err) => {
                if (err) console.log("file not saved", err);
            });
            sql = "update user set address='" + fields['address'] + "' ,phone_no = '" + fields['phone_no'] + "',prof_img_id = '" + file_name + "' where user_id='" + fields['user_id'] + "'";
            con.query(sql, (err, result) => {
                console.log(sql, "here is the query")
            });
            res.send("ok")
        } else {
            sql = "update user set address='" + fields['address'] + "' ,phone_no = '" + fields['phone_no'] + "' where user_id='" + fields['user_id'] + "'";
            con.query(sql, (err, result) => {
                if (err) console.log(err);
                else {
                    console.log(sql, "here is the query")
                    res.send('ok');
                }
            });
        }
    })
});


Router.post("/advance_search", (req, res) => {

    var form2 = new formidable.IncomingForm();

    form2.parse(req, function (err, fields, files) {
        const AllDetails = fields;
        var sql = 'select * from book where ';
        var all_options = Object.keys(AllDetails);
        if (AllDetails['donation_from'] === "")
            sql += "donated_on <= current_time() "
        else
            sql += `donated_on >= "'${AllDetails['donation_from']}'" `

        if (AllDetails['book_title'] !== '')
            sql += ` and title like "%${AllDetails['book_title']}%"`;
        sql += `and edition >= ${AllDetails['lower']} and edition < ${AllDetails['upper']} `;
        if (AllDetails['owner'])
            sql += `and owner_id like '%${AllDetails['owner']}%' `;
        if (AllDetails['publisher'])
            sql += `and publisher like "%${AllDetails['publisher']}%"`;
        if (AllDetails['subject'])
            sql += `and subject = "${AllDetails['subject']}" `
        if (AllDetails['available_now']) {
            if (AllDetails['available_now'] === "availible")
                sql += 'and available_now = 1';
            else if (AllDetails['available_now'] === "not availible")
                sql += 'and available_now = 0'
        }
        sql = sql + " limit " + AllDetails['index'] + ",12"
        con.query(sql, (err, result, fields) => {
            res.json({
                "book_find": result
            });
            // console.log(sql, AllDetails, req.params, req.query);

        });

    });
})

Router.use('/book_entry', cpUpload, (req, res, next) => {
    ;

    index = 1;
    con.query("select count from bookCount where subject='" + req.body['subject'] + "'", (err, result) => {
        if (result.length !== 0) { index = result['count']; }
    })
    var file_name = req.files['book_image'][0]['filename']
    var bTitle = req.body['title'] || "unknown"
    var bAuthor = req.body['author'] || "Unknown"
    var bPublisher = req.body['publisher'] || "Unknown"
    var bEdition = req.body['edition'] || 1
    var bSubject = req.body['subject'] || undefined
    var bPrice = req.body['book_pr'] || 0
    var bUserID = req.body['user_id'] || undefined
    var bFor_year = req.body['for_year']
    var sql = "insert into book values('" + req.body['subject'] + String(index) + "','" + bTitle + "','" + bAuthor + "','" + bPublisher + "'," + bEdition + ",'" + bUserID + "','" + (new Date().toISOString().slice(0, 19).replace('T', ' ')) + "',1,'" + bFor_year + "','" + bSubject + "',NULL,'" + file_name + "',0," + bPrice + ")";
    con.query(sql, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log("book donated!!!");
            res.json({ "sucess": 'Book Donated' })
        }
    });

    // // fetching number of already donated books
    sql = "select book_donated from user where user_id='" + "u18ec031" + "'";
    con.query(sql, (error, result) => {
        if (error) {
            return console.log(error);
        }
        // console.log(result[0], "at 368")
        var book_donated = result[0] === undefined ? 0 : parseInt(result[0].book_donated) + 1;
        console.log("books donated by user ", req.body['user_id'], " total", book_donated, result[0]);
        //updating number of books donated in the user database 
        sql = "update user set book_donated=" + book_donated + " where user_id = '" + req.body['user_id'] + "'";
        con.query(sql, (error, result) => {
            if (error) {
                return console.log(error);
            }
            console.log("user data updated");
        })
    });
    // console.log('request resolved')
})



Router.get("/updatenoti", (req, res) => {
    const setTime = req.query['notiSeenAt'];
    UserId(req.headers.authorization.split(" ")[1]).then(reciever_user_Id => {
        // for setting notification Seen parameter
        fs.access(path.resolve(__dirname, "..", "noti", "reciever", reciever_user_Id + ".txt"), (err) => {
            if (err) {
                return console.log("no noti to update");
            }
            fs.readFile(path.resolve(__dirname, "..", "noti", "reciever", reciever_user_Id + ".txt"), (err, data) => {
                const notiData = [];
                var update = 0;
                var j = 0;
                const data1 = data.toString().split("\r\n")
                for (let i = 0; i < data1.length; i++) {
                    if (data[i] === "\\n") {
                        continue;
                    }
                    notiData.push(JSON.parse(data1[i]));
                }
                for (let i = 0; i < notiData.length; i++) {
                    if (notiData[i]["seen"] === "") {
                        notiData[i]["seen"] = setTime;
                        update = 1;
                    }
                }
                var neatData = JSON.stringify(notiData[0]);
                for (let i = 1; i < notiData.length; i++) {
                    neatData = neatData + "\r\n" + JSON.stringify(notiData[i])
                }
                if (update) {
                    fs.writeFile(path.resolve(__dirname, "..", "noti", "reciever", reciever_user_Id + ".txt"), neatData, (err) => {
                        if (err) { console.log("failed to update notification when writting seen data", err) }
                    })
                }
            })


        })
        fs.access(path.resolve(__dirname, "..", "noti", "doner", reciever_user_Id + ".txt"), (err) => {
            if (err) {
                return console.log("no noti to update");
            }
            fs.readFile(path.resolve(__dirname, "..", "noti", "doner", reciever_user_Id + ".txt"), (err, data) => {
                const notiData = [];
                var update = 0;
                var j = 0;
                const data1 = data.toString().split("\r\n")
                for (let i = 0; i < data1.length; i++) {
                    if (data[i] === "\\n") {
                        continue;
                    }
                    notiData.push(JSON.parse(data1[i]));
                } for (let i = 0; i < notiData.length; i++) {
                    if (notiData[i]["seen"] === "") {
                        notiData[i]["seen"] = setTime;
                        update = 1;
                    }
                }

                var neatData = JSON.stringify(notiData[0]);
                for (let i = 1; i < notiData.length; i++) {
                    neatData = neatData + "\r\n" + JSON.stringify(notiData[i])
                }
                if (update) {
                    fs.writeFile(path.resolve(__dirname, "..", "noti", "reciever", reciever_user_Id + ".txt"), neatData, (err) => {
                        if (err) { console.log("failed to update notification when writting seen data", err) }
                    })
                }
            })


        })

    })
    res.send({ "sucess": "true" });
})


Router.get("/Deletenoti", (req, res) => {
    const messageID = req.query['messageID'];
    const don_rec = req.query["don_rec"]
    UserId(req.headers.authorization.split(" ")[1]).then(reciever_user_Id => {
        if (don_rec)
            fs.access(path.resolve(__dirname, "..", "noti", "reciever", reciever_user_Id + ".txt"), (err) => {
                if (err) {
                    return console.log("no noti to update");
                }
                fs.readFile(path.resolve(__dirname, "..", "noti", "reciever", reciever_user_Id + ".txt"), (err, data) => {
                    const notiData = [];
                    const data1 = data.toString().split("\r\n")
                    for (let i = 0; i < data1.length; i++) {
                        if (data[i] === "\\n") {
                            continue;
                        }
                        notiData.push(JSON.parse(data1[i]));
                    }
                    if (notiData[0].messageID !== messageID) {
                        var neatData = JSON.stringify(notiData[0]);
                        for (let i = 1; i < notiData.length; i++) {
                            if (notiData[i].messageID !== messageID)
                                neatData = neatData + "\r\n" + JSON.stringify(notiData[i])
                        }
                    }
                    else {
                        if (notiData.length > 1) {
                            var neatData = JSON.stringify(notiData[1]);
                            for (let i = 2; i < notiData.length; i++) {
                                if (notiData[i].messageID !== messageID)
                                    neatData = neatData + "\r\n" + JSON.stringify(notiData[i])
                            }
                        }
                        else
                            var neatData = ""
                        console.log("updated reciever detials", neatData, "\n", messageID, reciever_user_Id)
                        fs.writeFile(path.resolve(__dirname, "..", "noti", "reciever", reciever_user_Id + ".txt"), neatData, (err) => {
                            if (err) { console.log("failed to update notification when writting seen data", err) }
                        })
                    }
                })
            })
        else
            fs.access(path.resolve(__dirname, "..", "noti", "doner", reciever_user_Id + ".txt"), (err) => {
                if (err) {
                    return console.log("no noti to update");
                }
                fs.readFile(path.resolve(__dirname, "..", "noti", "doner", reciever_user_Id + ".txt"), (err, data) => {
                    const notiData = [];
                    const data1 = data.toString().split("\r\n")
                    for (let i = 0; i < data1.length; i++) {
                        if (data[i] === "\\n") {
                            continue;
                        }
                        notiData.push(JSON.parse(data1[i]));
                    }
                    if (notiData[0].messageID !== messageID) {
                        var neatData = JSON.stringify(notiData[0]);
                        for (let i = 1; i < notiData.length; i++) {
                            if (notiData[i].messageID !== messageID)
                                neatData = neatData + "\r\n" + JSON.stringify(notiData[i])
                        }
                    }
                    else {
                        if (notiData.length > 1) {
                            var neatData = JSON.stringify(notiData[1]);
                            for (let i = 2; i < notiData.length; i++) {
                                if (notiData[i].messageID !== messageID)
                                    neatData = neatData + "\r\n" + JSON.stringify(notiData[i])
                            }
                        }
                        else
                            var neatData = ""
                        fs.writeFile(path.resolve(__dirname, "..", "noti", "doner", reciever_user_Id + ".txt"), neatData, (err) => {
                            if (err) { console.log("failed to update notification when writting seen data", err) }
                        })
                    }
                })

            })

    })
    res.send({ "sucess": "true" });
})

Router.get("/book_booked/", isAuthenticated, (req, res) => {
    UserId(req.headers.authorization.split(" ")[1]).then(reciever_user_Id => {
        sql = "select *  from book where book_id ='" + req.query['book_id'] + "'";
        con.query(sql, (err, book_details) => {
            if (err) {
                return res.send("error in finding the requested book", err);
            }
            const doner_user_id = book_details[0]["owner_id"]
            book_details = book_details[0]
            // console.log("\n line 415 book_details",book_details)
            if (book_details['available_now'] === '0') {
                if (book_details['donated_to'] === reciever_user_Id) {
                    return res.send("you already booked it")
                }
                else
                    return res.send("already reffered sorry");
            }

            else {
                UserDetails(reciever_user_Id).then(recieverDetials => {
                    var book_issued_by_user = recieverDetials['book_issued']

                    if (book_issued_by_user < 4) {
                        if ((doner_user_id === recieverDetials["user_id"])) {
                            return res.send("not allowed to issue own books");
                        }
                        else {
                            //updating book availability 
                            sql = "update book set available_now =0 , donated_to ='" + recieverDetials['user_id'] + "' where book_id='" + book_details['book_id'] + "'";
                            // console.log(sql,"\n for anom books update query")
                            con.query(sql, (err, result_temp) => {
                                if (err) {
                                    console.log(err);
                                    return res.send("failed while updating book info")
                                }
                                // searching weather the books is donated by anom
                                book_is_anom = parseInt(book_details['book_anom']);
                                sql = "select * from user where user_id ='" + book_details['owner_id'] + "'";
                                console.log(sql, "\nbefore anom try")
                                con.query(sql, (err, doner_details) => {
                                    sql = "select * from anom_user where user_id ='" + book_details['owner_id'] + "'";
                                    con.query(sql, (err, doner_details2) => {
                                        if (doner_details[0] === undefined) {
                                            doner_details = doner_details2
                                        }
                                        console.log("after anom log\n", sql)
                                        doner_details = doner_details[0]
                                        //writing into reciver notify file
                                        fs.access(path.resolve(__dirname, "..", "noti", "reciever", recieverDetials['user_id'] + ".txt"), fs.constants.F_OK, (err) => {
                                            if (err) {
                                                fs.writeFile(path.resolve(__dirname, "..", "noti", "reciever", recieverDetials['user_id'] + ".txt"),
                                                    `{"messageID":"${uuidv1()}" ,"message":"you have requested a book with name ${book_details['title']} and id ${book_details['book_id']} from  by user ${doner_details['username']} his phone no ${doner_details['phone_no']}","sent":"${Date()}","seen":""}`,
                                                    (err) => {
                                                        if (err) { console.log("error in writing to the newly created user Reciever file for non anom book", err); }
                                                    })
                                            }
                                            else {
                                                fs.appendFile(path.resolve(__dirname, "..", "noti", "reciever", recieverDetials['user_id'] + ".txt"), `\r\n{"messageID":"${uuidv1()}" ,"message":"you have requested a book with name ${book_details['title']} and id ${book_details['book_id']} from  by user ${doner_details['username']} his phone no ${recieverDetials['phone_no']}","sent":"${Date()}","seen":""}`, (err) => {
                                                    console.log("file not appended for reciever in non anom book registration", err);
                                                });

                                            }
                                        });
                                        if (book_is_anom === 0) {
                                            if (doner_details === undefined) { return res.send("this user dont exist now") }
                                            fs.access(path.resolve(__dirname, "..", "noti", "doner", doner_details['user_id'] + ".txt"), fs.constants.F_OK, (err) => {
                                                if (err) {
                                                    fs.writeFile(path.resolve(__dirname, "..", "noti", "doner", doner_details['user_id'] + ".txt"),
                                                        `{"messageID": "${uuidv1()}" ,"message":"your book with name ${book_details['title']} and id ${book_details['book_id']} from  by user ${recieverDetials['username']} his phone no ${recieverDetials['phone_no']}","sent":"${Date()}","seen":""}`,
                                                        (err) => {
                                                            console.log("error in writing to the newly created user Reciever file for anom", err);
                                                        })
                                                }
                                                else {
                                                    fs.appendFile(path.resolve(__dirname, "..", "noti", "doner", doner_details['user_id'] + ".txt"),
                                                        `\r\n{"messageID": "${uuidv1()}" ,"message":"your book with name ${book_details['title']} and id ${book_details['book_id']} from  by user ${recieverDetials['username']} his phone no ${recieverDetials['phone_no']}","sent":"${Date()}","seen":""}`,
                                                        (err) => {
                                                            console.log("file not appended for reciever in anom book registration", err);
                                                        });

                                                }
                                            });
                                        }

                                        sql = "update user set book_issued=" + (parseInt(recieverDetials["book_issued"]) + 1) + " where user_id='" + recieverDetials["user_id"] + "'";
                                        con.query(sql, (error, result) => {
                                            if (err) {
                                                console.log("error in updating issued book of reciever")
                                            }
                                        })

                                        return res.send("the book has been booked")
                                    })
                                }

                                )
                            })
                        }

                    }
                    else
                        return res.send("Already booked 4 books this year")
                })

            }

        })

    })
})

Router.get("/user_books/", (req, res) => {
    console.log("request for USer Books")
    UserId(req.headers.authorization.split(" ")[1]).then(user_id => {
        sql = `SELECT * FROM book  where owner_id = '${user_id}' order by donated_on desc limit ${req.query['index']},12 `;
        con.query(sql, (err, result, fields) => {
            if (err) console.log(err);

            res.json({
                "user_books": result
            });

        });

    });
})

Router.get("/usersDetails", isAuthenticated, (req, res) => {
    var token = req.headers.authorization.split(" ")[0]
    res.send(UserDetails(UserId(token)))
})

Router.get("/user_book_issued/", (req, res) => {
    UserId(req.headers.authorization.split(" ")[1]).then(user_id => {
        var sql_smt = "select * from book where donated_to ='" + user_id + "' limit " + req.query["index"] + ",12";
        console.log(sql_smt)
        con.query(sql_smt, (err, data) => {
            res.json({
                "issued_books": data
            })
        })

    })
})


module.exports = Router