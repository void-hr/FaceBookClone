const jwt = require("jsonwebtoken");

<<<<<<< HEAD
exports.authUser = async(req, res, next)=>{
    try{
        const token = tmp?tmp.slice(7, tmp.length):"";
        if(!token){
            return res.status(400).json({message: "Invalid Authentication"});
        }
        jwt.verify(token, process.env.TOKEN_SECRET,(err, user) => {
            if(err){
                return res.status(400).json({message:"Invalid Authentication"});
                
            }else{
                req.user = user;
                next();
            }
        })
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
=======
exports.authUser = async (req, res, next) => {
	try {
		let tmp = req.header("Authorization");
		const token = tmp ? tmp.slice(7, tmp.length) : "";
		console.log(token);
		if (!token) {
			return res.status(400).json({ message: "Invalid abz" });
		}
		jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
			if (err) {
				return res.status(400).json({ message: "Invalid Authentication" });
			} else {
				req.user = user;
				next();
			}
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
>>>>>>> 34c244ee49f49335887106571a5d66dc029aefbf
