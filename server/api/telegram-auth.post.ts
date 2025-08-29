import { models } from '~/db';
import jwt from 'jsonwebtoken';
import { parse, isValid } from '@telegram-apps/init-data-node';
import { BOT_TOKEN } from '~/const/bot';

type requestBody = {
  initDataRaw: string | undefined;
};

export default defineEventHandler(async (event) => {
  const { initDataRaw }: requestBody = await readBody(event);

  const { auth } = useRuntimeConfig(event);
  const isInitDataValid = isValid(initDataRaw, BOT_TOKEN);
  if (!isInitDataValid) {
    throw createError({ statusCode: 403, message: 'Invalid Telegram data' });
  }

  const userData = parse(initDataRaw);

  const [user] = await models.User.findOrCreate({
    where: { id_tg: String(userData.user.id) },
    defaults: { username: userData.user.username ?? String(userData.user.id) },
  });

  await updataFarmBalanceOneHour(user);

  const token = jwt.sign(
    { id: user.getDataValue('id'), tg_id: userData.id, username: userData.username },
    auth.secret,
    {
      expiresIn: '7d',
    }
  );

  return { status: 'success', token, user };
});
