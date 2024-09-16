export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "خطایی از سمت سرور رخ داده است";
  const data = err.data;
  res.status(status).json({ message, data });
};
