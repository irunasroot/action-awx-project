import * as core from '@actions/core'
import axios from 'axios'

import { run } from '../src/main'
import { getInput } from './mock_functions/getInput'
import { PROJECT_INPUT_DATA } from './mock_data/project_input'
import { Project } from '../src/models'
import {
  PROJECT_DATA,
  PROJECT_DATA_BY_NAME,
  PROJECT_DATA_BY_NAME_NONE_FOUND
} from './mock_data/project'
import { GITHUB_DATA } from './mock_data/github'

jest.mock('axios')
jest.mock('@actions/core')

const mockAxios = axios as jest.Mocked<typeof axios>
const mockCore = core as jest.Mocked<typeof core>

mockAxios.create.mockImplementation(() => axios)
mockCore.debug.mockImplementation()
mockCore.info.mockImplementation()
mockCore.startGroup.mockImplementation()
mockCore.endGroup.mockImplementation()
mockCore.setFailed.mockImplementation()
mockCore.setSecret.mockImplementation()
mockCore.getInput.mockImplementation(getInput)

process.env.GITHUB_REPOSITORY = GITHUB_DATA.GITHUB_REPOSITORY
process.env.INPUT_CONTROLLER_URL = PROJECT_INPUT_DATA.controller_url
process.env.INPUT_CONTROLLER_USERNAME = PROJECT_INPUT_DATA.controller_username
process.env.INPUT_CONTROLLER_PASSWORD = PROJECT_INPUT_DATA.controller_password
process.env.INPUT_CONTROLLER_TOKEN = PROJECT_INPUT_DATA.controller_token
process.env.INPUT_CONTROLLER_TIMEOUT = String(
  PROJECT_INPUT_DATA.controller_timeout
)
process.env.INPUT_CONTROLLER_VERIFY_CERTIFICATE = String(
  PROJECT_INPUT_DATA.controller_verify_certificate
)
const OLDENV = process.env

beforeEach(() => {
  jest.resetModules()
  jest.spyOn(Project.prototype, 'sleep').mockImplementation()
  jest.spyOn(Project.prototype, 'sleep').mockImplementation()
  process.env = { ...OLDENV }
})

afterAll(() => {
  process.env = OLDENV
})

describe('Test main run function', () => {
  test('Testing creating Project', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_DESCRIPTION = String(PROJECT_DATA.description)

    process.env.INPUT_LOCAL_PATH = PROJECT_DATA.local_path
    process.env.INPUT_SCM_TYPE = PROJECT_DATA.scm_type
    process.env.INPUT_SCM_URL = PROJECT_DATA.scm_url
    process.env.INPUT_SCM_BRANCH = 'master'
    process.env.INPUT_SCM_REFSPEC = 'refs/head/master'
    process.env.INPUT_SCM_CLEAN = String(PROJECT_DATA.scm_clean)
    process.env.INPUT_SCM_TRACK_SUBMODULES = String(
      PROJECT_DATA.scm_track_submodules
    )
    process.env.INPUT_SCM_DELETE_ON_UPDATE = String(
      PROJECT_DATA.scm_delete_on_update
    )
    process.env.INPUT_CREDENTIAL = String(PROJECT_DATA.credential)
    process.env.INPUT_TIMEOUT = String(PROJECT_DATA.timeout)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_UPDATE_ON_LAUNCH = String(
      PROJECT_DATA.scm_update_on_launch
    )
    process.env.INPUT_SCM_UPDATE_CACHE_TIMEOUT = String(
      PROJECT_DATA.scm_update_cache_timeout
    )
    process.env.INPUT_ALLOW_OVERRIDE = String(PROJECT_DATA.allow_override)
    process.env.INPUT_DEFAULT_ENVIRONMENT = String(
      PROJECT_DATA.default_environment
    )
    process.env.INPUT_SIGNATURE_VALIDATION_CREDENTIAL = String(
      PROJECT_DATA.signature_validation_credential
    )

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.put.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Testing correct scm_type no URL', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_SCM_TYPE = 'git'
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.put.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    // Unsure how to validate that the scm_url was properly set
    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Testing correct scm_type different URL', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_DESCRIPTION = 'Demo Project'
    process.env.INPUT_SCM_TYPE = 'git'
    process.env.INPUT_SCM_URL =
      'https://github.com/minsis/actions-awx-project-test'
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.put.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    // Unsure how to validate that the scm_url was properly set
    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Failing missing scm_type', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_SCM_TYPE = ''
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    // Unsure how to validate that the scm_url was properly set
    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(1)
  })

  test('Testing project update with project_id', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.put.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    // Unsure how to validate that the scm_url was properly set
    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Failing project update with project_id', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.put.mockRejectedValue(new URIError('failing updateProject'))

    // Unsure how to validate that the scm_url was properly set
    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(1)
  })

  test('Testing project update with project_id - none found', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 404,
        data: {
          detail: 'Not found.'
        }
      }
    })

    mockAxios.put.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Failing project update with project_id - general error', async () => {
    process.env.INPUT_PROJECT_ID = String(PROJECT_DATA.id)
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 500
      }
    })

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(1)
  })

  test('Testing project update with name and org', async () => {
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockResolvedValueOnce({
      data: PROJECT_DATA_BY_NAME
    })

    mockAxios.put.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    // Unsure how to validate that the scm_url was properly set
    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Failing project update with name and org - none found', async () => {
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockResolvedValueOnce({
      data: PROJECT_DATA_BY_NAME_NONE_FOUND
    })

    mockAxios.put.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    // Unsure how to validate that the scm_url was properly set
    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Failing project update with name and org - error 404', async () => {
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 404
      }
    })

    mockAxios.post.mockResolvedValueOnce({
      data: PROJECT_DATA
    })

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(0)
  })

  test('Failing project update with name and org - error general', async () => {
    process.env.INPUT_NAME = String(PROJECT_DATA.name)
    process.env.INPUT_ORGANIZATION = String(PROJECT_DATA.organization)
    process.env.INPUT_SCM_TYPE = 'git'

    mockAxios.get.mockResolvedValueOnce({
      // Initialization call
      headers: {}
    })

    mockAxios.get.mockRejectedValueOnce({
      response: {
        status: 400
      }
    })

    expect(await run()).toBeUndefined()
    expect(mockCore.setFailed).toHaveBeenCalledTimes(1)
  })
})
