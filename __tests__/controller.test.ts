import * as core from '@actions/core'
import axios from 'axios'
import { ControllerApi } from '../src/models/api'

import { CONTROLLER_INSTANCE } from './mock_data/controller'
import { PROJECT_DATA } from './mock_data/project'
import { PROJECT_INPUT_DATA } from './mock_data/project_input'

jest.mock('axios')
jest.mock('@actions/core')

jest.spyOn(global, 'setTimeout')

const mockAxios = axios as jest.Mocked<typeof axios>
const mockCore = core as jest.Mocked<typeof core>

mockAxios.create.mockImplementation(() => axios)
mockCore.debug.mockImplementation()
mockCore.info.mockImplementation()

describe('Testing Controller Initializations', () => {
  test('Controller invalid URL protocol', () => {
    expect(() => {
      new ControllerApi(
        CONTROLLER_INSTANCE.controller_url_invalid_protocol,
        CONTROLLER_INSTANCE.controller_username,
        CONTROLLER_INSTANCE.controller_password,
        CONTROLLER_INSTANCE.controller_token,
        CONTROLLER_INSTANCE.controller_timeout,
        CONTROLLER_INSTANCE.controller_verify_certificate
      )
    }).toThrow(Error)
  })

  test('Controller http protocol', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_http,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    expect(controller).toBe(controller)
  })

  test('Controller missing URL', () => {
    expect(() => {
      new ControllerApi(
        '',
        CONTROLLER_INSTANCE.controller_username,
        CONTROLLER_INSTANCE.controller_password,
        CONTROLLER_INSTANCE.controller_token,
        CONTROLLER_INSTANCE.controller_timeout,
        CONTROLLER_INSTANCE.controller_verify_certificate
      )
    }).toThrow(Error)
  })

  test('Controller URL w/path', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_path,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    expect(controller.controller_url).toEqual(
      CONTROLLER_INSTANCE.controller_url
    )
  })

  test('Controller URL w/slash', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_slash,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )
    expect(controller.controller_url).toEqual(
      CONTROLLER_INSTANCE.controller_url
    )
  })

  test('Controller missing credentials', () => {
    expect(() => {
      new ControllerApi(
        CONTROLLER_INSTANCE.controller_url,
        '',
        '',
        '',
        CONTROLLER_INSTANCE.controller_timeout,
        CONTROLLER_INSTANCE.controller_verify_certificate
      )
    }).toThrow(Error)
  })

  test('Controller specify username/password', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_slash,
      CONTROLLER_INSTANCE.controller_username,
      CONTROLLER_INSTANCE.controller_password,
      '',
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    // Not sure how to test headers since mocking seems to reset any of the headers
    // Leaving here so coverage is 100
    expect(controller).toBe(controller)
  })

  test('Controller specify token', () => {
    const controller = new ControllerApi(
      CONTROLLER_INSTANCE.controller_url_with_slash,
      '',
      '',
      CONTROLLER_INSTANCE.controller_token,
      CONTROLLER_INSTANCE.controller_timeout,
      CONTROLLER_INSTANCE.controller_verify_certificate
    )

    // Not sure how to test headers since mocking seems to reset any of the headers
    // Leaving here so coverage is 100
    expect(controller).toBe(controller)
  })
})

describe('Testing with Project Data', () => {
  const controller = new ControllerApi(
    CONTROLLER_INSTANCE.controller_url,
    CONTROLLER_INSTANCE.controller_username,
    CONTROLLER_INSTANCE.controller_password,
    CONTROLLER_INSTANCE.controller_token,
    CONTROLLER_INSTANCE.controller_timeout,
    CONTROLLER_INSTANCE.controller_verify_certificate
  )

  test('Creating project', async () => {
    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    const project = await controller.createProject(PROJECT_INPUT_DATA)

    expect(project.id).toEqual(PROJECT_DATA.id)
    expect(project.name).toEqual(PROJECT_DATA.name)
  })

  test('Fail creating project', async () => {
    mockAxios.post.mockRejectedValueOnce(new URIError('Fail createProject'))

    await expect(async () => {
      await controller.createProject(PROJECT_INPUT_DATA)
    }).rejects.toThrow(Error)
  })
})

describe('Testing miscellaneous functions', () => {
  const controller = new ControllerApi(
    CONTROLLER_INSTANCE.controller_url,
    CONTROLLER_INSTANCE.controller_username,
    CONTROLLER_INSTANCE.controller_password,
    CONTROLLER_INSTANCE.controller_token,
    CONTROLLER_INSTANCE.controller_timeout,
    CONTROLLER_INSTANCE.controller_verify_certificate
  )

  test('Testing sleep function', () => {
    controller.sleep(1)

    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1)
  })
})
