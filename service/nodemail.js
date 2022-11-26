const nodemailer = require('nodemailer');

//mail author notifile admin have new manga và chaoter 
async function mailCreateMangaAuthor(user, manga) {
    // create reusable transporter object using the default SMTP transport
    // transport.sendMail()
    console.log(7, user);
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maivanducga@gmail.com", // generated ethereal user
            pass: "jyqgwmacrhfuawkh", // generated ethereal password
        },
    });
    let date = new Date();

    let email = 'finalprojectk7gre@gmail.com'
    let subject = 'author created new manga'
    // send mail with defined transport object
    try {
        let info = await transporter.sendMail(
            {
                from: '<maivanducga@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: `${subject + `by ${user.username}`}`, // Subject line
                text: "", // plain text body
                html: ` ${user.username} created manga with name ${manga.name} vào lúc ${date.toLocaleString()}`, // html body
            }
        );
        console.log(24, 'oke');
    } catch (e) {
        console.log(27, e);
    }
}


async function mailCreateNewChapterAuthor(user, chapter, manga) {
    // create reusable transporter object using the default SMTP transport
    // transport.sendMail()
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maivanducga@gmail.com", // generated ethereal user
            pass: "jyqgwmacrhfuawkh", // generated ethereal password
        },
    });

    let email = 'finalprojectk7gre@gmail.com'
    let subject = 'author created new chapter'
    // send mail with defined transport object
    // console.log(54, chapter.createdAt);
    let date = new Date();

    try {
        let info = await transporter.sendMail(
            {
                from: '<maivanducga@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: `${subject + `by ${user.username}`}`, // Subject line
                text: "new chapter", // plain text body
                html: ` ${user.username} created new chapter with manga name ${manga.name} vào lúc ${date.toLocaleString()} with title ${chapter.title}`, // html body
            }
        );
        console.log(68, 'oke');
    } catch (e) {
        console.log(27, e);
    }
}

// admin thông báo cho user có chapter mới khi user follow
async function noticeEmailNewChapter(users, chapter, manga) {
    // create reusable transporter object using the default SMTP transport
    // transport.sendMail()
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "maivanducga@gmail.com", // generated ethereal user
            pass: "jyqgwmacrhfuawkh", // generated ethereal password
        },
    });
    // console.log(87, users);
    let email = users.map((user) => {
        return user.userID.email
    })
    let date = new Date();
    // console.log(91, email);
    // let email = 'finalprojectk7gre@gmail.com'
    let subject = 'new chapter'
    // send mail with defined transport object
    try {
        let info = await transporter.sendMail(
            {
                from: '<maivanducga@gmail.com>', // sender address
                to: `${email}`, // list of receivers
                subject: `${subject + `by ${manga.name}`}`, // Subject line
                //${chapter.createAt.toLocalString()}
                text: ` The story you follow has a new chapter at ${date.toLocalString()} with title ${chapter.title}`, // plain text body
                html: "<b>Hello world?</b>", // html body
            }
        );
        console.log(107, 'oke');
    } catch (e) {
        console.log(27, e);
    }
}



module.exports = { mailCreateMangaAuthor, mailCreateNewChapterAuthor, noticeEmailNewChapter }




