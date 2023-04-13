import Router from 'express-promise-router'
// import * as cache from './cache'
// import * as db from './db'
// import logger from './lib/logger'
import { RequestHandler } from 'express'

import { createUrl, getUrl, updateShortUrlLastOpened } from './db'

import generateRandomSlug from './slug'

import cors from 'cors'

const router = Router()

router.get('/health', (_, res) => res.sendStatus(200))

router.get('/hello', (_, res) => {
  res.json({ message: 'hello' })
})

router.put('/url', cors(), (async (_req, res) => {
  const randomSlug = generateRandomSlug(5);
  const { url } = _req.body;
  await createUrl(url, randomSlug);
  res.status(201).json({ url, slug: randomSlug })
}) as RequestHandler)

router.get('/:slug', (async (_req, res) => {
  const { slug } = _req.params
  const url = await getUrl(slug)
  if (url === null) {
    res.status(501).send('Cannot find the slug')
  }

  // Track the link open by logging the user's IP address and other information
  const ip = _req.ip
  const userAgent = _req.headers['user-agent'] ?? ''
  const time = new Date()
  console.log(`Slug ${slug} opened by ${ip} at ${time.toISOString()} (User Agent: ${userAgent})`);
  await updateShortUrlLastOpened(slug, time)
  // Slug Zu4Y7 opened by ::1 at 2023-04-13T17:29:49.429Z (User Agent: PostmanRuntime/7.30.0) Fetch through POSTMAN
  // Slug pGfaE opened by ::ffff:127.0.0.1 at 2023-04-13T17:31:49.035Z (User Agent: node-fetch/1.0 (+https://github.com/bitinn/node-fetch)) Fetch through localhost:3002/:slug


  res.status(200).json(url)
  // res.redirect(302, url as string).json(url)
  // res.status(200).json({ data: url as string })
  // res.status(501).send('Not Implemented')
}) as RequestHandler)

export default router
