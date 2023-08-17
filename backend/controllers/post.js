const Post = require("../models/Post");

exports.createPost = async (req, res) => {
	try {
		const post = await new Post(req.body).save();
		// console.log(req.json(post));
		return res.status(200).json({ message: "success" });
	} catch (error) {
		return res.status(500).json({ message: "ERROR" + error.message });
	}
};
