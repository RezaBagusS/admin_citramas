import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || '';

interface TokenPayload {
  id: number;
  email: string;
  createdAt: Date;
}

const generateToken = (payload: TokenPayload): string => {
    const options: jwt.SignOptions = {
      expiresIn: '2h',
    };
  
    return jwt.sign(payload, SECRET_KEY, options);
  };

const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error:any) {
    console.error('Invalid token:', error.message);
    return null;
  }
};

export { generateToken, verifyToken };