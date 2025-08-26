import User from "../model/user.model.js";

//signup
export const signup = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(400).json({message: "User already exists"});      
        }
        const user = await User.create({name, email, password});

        //auth token
        

        res.status(201).json({user, message: "User created successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }    
}

export const login = async(req, res) => {
    res.send("Login route called");
}

export const logout = async(req, res) => {
    res.send("Logout route called");
}