module.exports = async (req, res) => {
  res.json({
    hasPostgres: !!process.env.POSTGRES_URL,
    hasPostgresUrl: !!process.env.POSTGRES_URL_NON_POOLING,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    node: process.version
  });
};
