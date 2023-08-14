const fs = require("fs");
module.exports = async function (req, res, next) {
	try {
		// basically the initial format of req.files was little wierd
		// it was  {[ {}, {} ] }
		// adding Object.values will turn it into array.
		// now it would look like this [[ {}, {} ]]
		// adding .flat() will flatten the array which means it will create a new array with all sub-array elements concatenated into it
		// finally it would look like [ {} ]
		// console.log(Object.values(req.files).flat());

		if (!req.files || Object.values(req.files).flat().length === 0) {
			return res.status(400).json({ message: "no files selected." });
		}
		let files = Object.values(req.files).flat();
		files.forEach((file) => {
			if (
				file.mimetype !== "image/jpeg" &&
				file.mimetype !== "image/jpg" &&
				file.mimetype !== "image/png" &&
				file.mimetype !== "image/gif" &&
				file.mimetype !== "image/webp"
			) {
				removeTemp(file.tempFilePath);
				return res.status(400).json({ message: "Unsupported Format" });
			}
			if (file.size > 1024 * 1024 * 5) {
				removeTemp(file.tempFilePath);
				return res.status(400).json({ message: "File size is too large" });
			}
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const removeTemp = (path) => {
	fs.unlink(path, (err) => {
		if (err) throw err;
	});
};
