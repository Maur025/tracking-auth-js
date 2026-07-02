export const userController = () => {
	/**
	 * @param {import('express').Request} req
	 * @param {import('express').Response} res
	 */
	const findAll = (req, res) => {
		res.status(200).json({ message: "find all users is working!" });
	};

	return {
		findAll,
	};
};
