import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.json({
        message: 'Данное имя занято',
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    await newUser.save();

    res.json({
      user: newUser,
      token,
      message: 'Вы зарегистрированны!',
    });
  } catch (error) {
    res.json({
      message: 'Зарегистрироваться не удалось',
    });
  }
};
//Login user
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: 'Данный пользователь не найден' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        message: 'Неверный пароль',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    return res.json({
      token,
      user,
      message: 'Вход выполнен.',
    });
  } catch (error) {
    res.json({ message: 'Ошибка авторизации' });
  }
};
//Get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        message: 'Доступа нет',
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: 'Доступа нет',
    });
  }
};
