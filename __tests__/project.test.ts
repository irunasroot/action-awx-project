import * as core from '@actions/core'
import axios from 'axios'

import { PROJECT_INPUT_DATA } from './mock_data/project_input'
import { Project } from '../src/models'

jest.mock('axios')
jest.mock('@actions/core')

const mockAxios = axios as jest.Mocked<typeof axios>
const mockCore = core as jest.Mocked<typeof core>

mockAxios.create.mockImplementation(() => axios)
mockCore.debug.mockImplementation()
mockCore.info.mockImplementation()
mockCore.setFailed.mockImplementation()

describe('Testing Project object', () => {
  test('Failing creating Project - null name', async () => {
    expect(() => {
      new Project(
        PROJECT_INPUT_DATA.controller_url,
        PROJECT_INPUT_DATA.controller_username,
        PROJECT_INPUT_DATA.controller_password,
        PROJECT_INPUT_DATA.controller_token,
        PROJECT_INPUT_DATA.controller_timeout,
        PROJECT_INPUT_DATA.controller_verify_certificate,
        PROJECT_INPUT_DATA.project_id,
        null, // name
        PROJECT_INPUT_DATA.description,
        PROJECT_INPUT_DATA.local_path,
        PROJECT_INPUT_DATA.scm_type,
        PROJECT_INPUT_DATA.scm_url,
        PROJECT_INPUT_DATA.scm_branch,
        PROJECT_INPUT_DATA.scm_refspec,
        PROJECT_INPUT_DATA.scm_clean,
        PROJECT_INPUT_DATA.scm_track_submodules,
        PROJECT_INPUT_DATA.scm_delete_on_update,
        PROJECT_INPUT_DATA.credential,
        PROJECT_INPUT_DATA.timeout,
        PROJECT_INPUT_DATA.organization,
        PROJECT_INPUT_DATA.scm_update_on_launch,
        PROJECT_INPUT_DATA.scm_update_cache_timeout,
        PROJECT_INPUT_DATA.allow_override,
        PROJECT_INPUT_DATA.default_environment,
        PROJECT_INPUT_DATA.signature_validation_credential
      )
    }).toThrow(Error)
  })

  test('Failing creating Project - null organization', async () => {
    expect(() => {
      new Project(
        PROJECT_INPUT_DATA.controller_url,
        PROJECT_INPUT_DATA.controller_username,
        PROJECT_INPUT_DATA.controller_password,
        PROJECT_INPUT_DATA.controller_token,
        PROJECT_INPUT_DATA.controller_timeout,
        PROJECT_INPUT_DATA.controller_verify_certificate,
        PROJECT_INPUT_DATA.project_id,
        'The iRunAsRoot project', //name
        PROJECT_INPUT_DATA.description,
        PROJECT_INPUT_DATA.local_path,
        PROJECT_INPUT_DATA.scm_type,
        PROJECT_INPUT_DATA.scm_url,
        PROJECT_INPUT_DATA.scm_branch,
        PROJECT_INPUT_DATA.scm_refspec,
        PROJECT_INPUT_DATA.scm_clean,
        PROJECT_INPUT_DATA.scm_track_submodules,
        PROJECT_INPUT_DATA.scm_delete_on_update,
        PROJECT_INPUT_DATA.credential,
        PROJECT_INPUT_DATA.timeout,
        null, //organization
        PROJECT_INPUT_DATA.scm_update_on_launch,
        PROJECT_INPUT_DATA.scm_update_cache_timeout,
        PROJECT_INPUT_DATA.allow_override,
        PROJECT_INPUT_DATA.default_environment,
        PROJECT_INPUT_DATA.signature_validation_credential
      )
    }).toThrow(Error)
  })

  test('Failing incorrect scm_type', async () => {
    expect(() => {
      new Project(
        PROJECT_INPUT_DATA.controller_url,
        PROJECT_INPUT_DATA.controller_username,
        PROJECT_INPUT_DATA.controller_password,
        PROJECT_INPUT_DATA.controller_token,
        PROJECT_INPUT_DATA.controller_timeout,
        PROJECT_INPUT_DATA.controller_verify_certificate,
        PROJECT_INPUT_DATA.project_id,
        'The iRunAsRoot project', //name
        PROJECT_INPUT_DATA.description,
        PROJECT_INPUT_DATA.local_path,
        'irunasroot', // scm_type
        PROJECT_INPUT_DATA.scm_url,
        PROJECT_INPUT_DATA.scm_branch,
        PROJECT_INPUT_DATA.scm_refspec,
        PROJECT_INPUT_DATA.scm_clean,
        PROJECT_INPUT_DATA.scm_track_submodules,
        PROJECT_INPUT_DATA.scm_delete_on_update,
        PROJECT_INPUT_DATA.credential,
        PROJECT_INPUT_DATA.timeout,
        1, // organization
        PROJECT_INPUT_DATA.scm_update_on_launch,
        PROJECT_INPUT_DATA.scm_update_cache_timeout,
        PROJECT_INPUT_DATA.allow_override,
        PROJECT_INPUT_DATA.default_environment,
        PROJECT_INPUT_DATA.signature_validation_credential
      )
    }).toThrow(Error)
  })

  test('Failing null scm_type', async () => {
    expect(() => {
      new Project(
        PROJECT_INPUT_DATA.controller_url,
        PROJECT_INPUT_DATA.controller_username,
        PROJECT_INPUT_DATA.controller_password,
        PROJECT_INPUT_DATA.controller_token,
        PROJECT_INPUT_DATA.controller_timeout,
        PROJECT_INPUT_DATA.controller_verify_certificate,
        PROJECT_INPUT_DATA.project_id,
        'The iRunAsRoot project', //name
        PROJECT_INPUT_DATA.description,
        PROJECT_INPUT_DATA.local_path,
        null, // scm_type
        PROJECT_INPUT_DATA.scm_url,
        PROJECT_INPUT_DATA.scm_branch,
        PROJECT_INPUT_DATA.scm_refspec,
        PROJECT_INPUT_DATA.scm_clean,
        PROJECT_INPUT_DATA.scm_track_submodules,
        PROJECT_INPUT_DATA.scm_delete_on_update,
        PROJECT_INPUT_DATA.credential,
        PROJECT_INPUT_DATA.timeout,
        1, // organization
        PROJECT_INPUT_DATA.scm_update_on_launch,
        PROJECT_INPUT_DATA.scm_update_cache_timeout,
        PROJECT_INPUT_DATA.allow_override,
        PROJECT_INPUT_DATA.default_environment,
        PROJECT_INPUT_DATA.signature_validation_credential
      )
    }).toThrow(Error)
  })
})
