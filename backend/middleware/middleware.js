const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Look for token in cookie named 'token'
  
    if (!token) return res.sendStatus(401); // Unauthorized
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user;
      next();
    });
  };
  