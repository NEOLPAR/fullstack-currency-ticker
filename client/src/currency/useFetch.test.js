import {render, screen, waitFor} from "@testing-library/react";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { renderHook, act  } from '@testing-library/react'
import '@testing-library/jest-dom'
import {useFetch} from "./useFetch";

const CURRENCY_API = 'http://localhost:3001/api'
const RESPONSE_SUCCESS = [
  { "currency": "AED", "rate": 3.672896, "diff": 0 },
  { "currency": "AFN", "rate": 66.9585,  "diff": 0 },
  { "currency": "ALL", "rate": 128.298385, "diff": 0 }
]
const RESPONSE_ERROR = { error: "Random 500 error" }
const SUCCESS_PARAM = '/currency/2017-01-01'
const SUCCESS_EMPTY_PARAM = '/currency/2017-01-20'
const ERROR_PARAM = '/currency/2017-01-30'

const server = setupServer(
  rest.get(`${CURRENCY_API}${SUCCESS_PARAM}`, (req, res, ctx) => {
    return res(ctx.json(RESPONSE_SUCCESS))
  }),
  rest.get(`${CURRENCY_API}${SUCCESS_EMPTY_PARAM}`, (req, res, ctx) => {
    return res(ctx.json([]))
  }),
  rest.get(`${CURRENCY_API}${ERROR_PARAM}`, (req, res, ctx) => {
    return res(ctx.status(500), ctx.json(RESPONSE_ERROR))
  }),
)

describe('Testing currency API', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('currency success with data', async () => {
    const { result } = renderHook(() => useFetch(SUCCESS_PARAM))

    expect(result.current).toMatchObject({
      data: undefined,
      error: undefined,
      loading: true
    })

    await waitFor(() => {
      expect(result.current).toMatchObject({
        data: RESPONSE_SUCCESS,
        error: undefined,
        loading: false
      })
    });

  })

  test('currency success with no data', async () => {
    const { result } = renderHook(() => useFetch(SUCCESS_EMPTY_PARAM))

    expect(result.current).toMatchObject({
      data: undefined,
      error: undefined,
      loading: true
    })

    await waitFor(() => {
      expect(result.current).toMatchObject({
        data: [],
        error: undefined,
        loading: false
      })
    });

  })

  test('currency error', async () => {
    const { result } = renderHook(() => useFetch(ERROR_PARAM))

    expect(result.current).toMatchObject({
      data: undefined,
      error: undefined,
      loading: true
    })

    await waitFor(() => {
      expect(result.current).toMatchObject({
        data: RESPONSE_ERROR,
        error: RESPONSE_ERROR.error,
        loading: false
      })
    });

  })
})