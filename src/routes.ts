import Router from 'express-promise-router'
// import * as cache from './cache'
// import * as db from './db'
// import logger from './lib/logger'
import { RequestHandler } from 'express'

import { createUrl, getUrl } from './db'

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
  const url = await getUrl(_req.params.slug)
  if (url === null) {
    res.status(501).send('Cannot find the slug')
  }
  res.status(200).json(url)
  // res.redirect(302, url as string).json(url)
  // res.status(200).json({ data: url as string })
  // res.status(501).send('Not Implemented')
}) as RequestHandler)

export default router
