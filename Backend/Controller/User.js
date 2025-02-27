const  {Users}  = require("../Model/UserModel");
const bcrypt = require('bcrypt');
const JWT=require('jsonwebtoken')
const AddUser = async (req, res) => {
    const { name, email, Ph, Age, Role, password } = req.body;
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            name,
            email,
            Ph,
            Age,
            Role,
            password: hashedPassword
        });

        if (!newUser) {
            return res.status(404).json({ Msg: "User cannot be added" });
        }

        return res.status(200).json({ Msg: "User added successfully", user: newUser });
    } catch (err) {
        return res.status(500).json({
            Msg: "Server Error",
            error: err.message
        });
    }
};



const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ Msg: "Enter all the fields" });
        }

        const Ex_user = await Users.findOne({ email });
        if (!Ex_user) {
            return res.status(404).json({ Msg: "User not found" });
        }

        const Ac_pass = await bcrypt.compare(password, Ex_user.password);
        if (!Ac_pass) {
            return res.status(400).json({ Msg: "Login failed, password did not match" });
        }else{

            const {Role}=Ex_user;
            const Token = JWT.sign(
                { email: Ex_user.email, role: Ex_user.Role }, 
                "Y+88p4NldTYqVNWLSVKODcprx0g59PackkQWqGwxow0=",
                { expiresIn: "2h" }
            );
            
            if(!Token){
                res.send("you are an unauthorized user!")
            }
            return res.status(200).json({  Msg: "Login successful", 
                Token, 
                Role: Role, 
                Data: { id: Ex_user._id, email: Ex_user.email, role: Ex_user.role }  });
        }
        
    } catch (err) {
        return res.status(500).json({
            Msg: "Internal server error",
            error: err.message
        });
    }
};

module.exports = { Login, AddUser };
