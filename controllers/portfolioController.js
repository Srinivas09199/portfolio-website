const nodemailer = require('nodemailer')
const sendInBlueTransport = require('nodemailerv6-sendinbluev3-transport')

//transport
const transporter = nodemailer.createTransport(
    sendInBlueTransport({
        auth:{
            api_key: process.env.API_SENDINBLUE,
        }
    })
)


const sendEmailController = (req, res) => {
    try {
        const { name, email, msg } = req.body
            
        //validation
        if(!name || !email || !msg) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fields'
            })
        }

        //email matter
        transporter.sendMail({
            to: "techinfosrinivas@gmail.com",
            from: "techinfosrinivas@gmail.com",
            subject: 'Regarding Mern Portfolio App',
            html:`
                <h5>Details Information</h5>
                <ul>
                    <li><p>Name : ${name}</p></li>
                    <li><p>Email : ${email}</p></li>
                    <li><p>Message : ${msg}</p></li>
                </ul>
            `
        })
        
        return res.status(200).send({
            success: true,
            message: "Your Message Send Successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Something went wrong",
            error,
        })
    }
}


module.exports = { sendEmailController }