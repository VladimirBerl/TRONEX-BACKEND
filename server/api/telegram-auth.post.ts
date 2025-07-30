import { models } from '~/db';
import jwt from 'jsonwebtoken';
import { parse, isValid } from '@telegram-apps/init-data-node';
import { TELEGRAM_BOT_TOKEN } from '~/const/bot';

type requestBody = {
  initDataRaw: string | undefined;
};

export default defineEventHandler(async (event) => {
  const { initDataRaw }: requestBody = await readBody(event);

  const { auth } = useRuntimeConfig(event);
  const isInitDataValid = isValid(initDataRaw, TELEGRAM_BOT_TOKEN);
  if (!isInitDataValid) {
    throw createError({ statusCode: 403, message: 'Invalid Telegram data' });
  }

  const userData = parse(initDataRaw);

  let user = await models.User.findOne({ where: { tg_id: userData.id } });

  if (!user) {
    user = await modelUser.create({
      first_name: userData.first_name,
      last_name: userData.last_name,
      user_name: userData.username,
      tg_id: userData.id,
    });
  }

  const token = jwt.sign(
    { id: user.getDataValue('id'), tg_id: userData.id, username: userData.username },
    auth.secret,
    {
      expiresIn: '7d',
    }
  );

  return { status: 'success', token, user };
});
