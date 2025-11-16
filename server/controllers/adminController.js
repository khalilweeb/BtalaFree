import User   from "../models/User.js";



// all users
export const getAllUsers = async (req,res) =>{
    try {
        const users =await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// changeeer user admin
export const updateUserRole= async (req,res) => {
    const { id } = req.params;
    const { role } = req.body;


    if (!["admin", "client", "freelancer"].includes(role)){
        return res.status(400).json({message:"invalide role"});
    }
    try{
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found"});
        
        user.role = role
        await user.save();

        res.json({ message:"User role Updated",user});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};


// delete user
export const deleteUser = async (req,res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).json({message: "User not found"});
        res.json({ message : "User deleted"});
    } catch (error) {
        res.status(500).json({message:error.message});
    };
}