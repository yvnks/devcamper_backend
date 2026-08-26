// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = (req, res, next) => {
  res.status(200).json({ enroll: true, msg: `GET bootcamp ${req.params.id}` });
};

// @desc    Get a single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = (req, res, next) => {
  res.status(200).json({ enroll: true, msg: `GET Single bootcamp ` });
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/:id
// @access  Private
export const createBootcamp = (req, res, next) => {
  res.status(200).json({ enroll: true, msg: `POST new bootcamp` });
};

// @desc    Update specific bootcamp
// @route   PATCH /api/v1/bootcamps/:id
// @access  Public
export const updateBootcamp = (req, res, next) => {
  res.status(201).json({ enroll: true, msg: `PATCH new bootcamp` });
};

// @desc    Delete specific bootcamp
// @route   Delete /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = (req, res, next) => {
  res.status(200).json({ enroll: true, msg: `Delete new bootcamp` });
};
